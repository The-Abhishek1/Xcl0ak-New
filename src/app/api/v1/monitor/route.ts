/**
 * /api/v1/monitor
 *
 * GET    — list monitored assets (with latest snapshot + unacked changes)
 * POST   — add asset to monitor
 * DELETE — remove asset
 * PATCH  — internal callback from ESO with new snapshot data
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ESO_API_URL = process.env.ESO_API_URL ?? 'http://localhost:8000'

function alias(req: NextRequest) {
  return req.headers.get('x-user-alias')
}

// ── GET: list assets ──────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const assetId = req.nextUrl.searchParams.get('assetId')

  // Single asset with full snapshot + change history
  if (assetId) {
    const asset = await prisma.monitoredAsset.findFirst({
      where: { id: assetId, userAlias },
      include: {
        snapshots: { orderBy: { takenAt: 'desc' }, take: 2 },
        changes:   { orderBy: { detectedAt: 'desc' }, take: 50 },
      },
    })
    if (!asset) return NextResponse.json({ error: 'not found' }, { status: 404 })
    return NextResponse.json({ asset })
  }

  // List all assets with latest snapshot + unacked change count
  const assets = await prisma.monitoredAsset.findMany({
    where:   { userAlias },
    orderBy: { createdAt: 'desc' },
    include: {
      snapshots: { orderBy: { takenAt: 'desc' }, take: 1 },
      changes:   { where: { acknowledged: false }, select: { id: true, severity: true, changeType: true } },
    },
  })

  return NextResponse.json({ assets })
}

// ── POST: add asset ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { target, type, label, scanInterval } = await req.json()
  if (!target || !type) {
    return NextResponse.json({ error: 'target and type required' }, { status: 400 })
  }
  if (!['domain', 'ip', 'cidr'].includes(type)) {
    return NextResponse.json({ error: 'type must be domain, ip, or cidr' }, { status: 400 })
  }

  // Basic validation
  const cleaned = target.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')

  try {
    const asset = await prisma.monitoredAsset.create({
      data: {
        userAlias,
        target:       cleaned,
        type,
        label:        label ?? cleaned,
        scanInterval: scanInterval ?? 24,
      },
    })

    // Kick off initial scan — fire and forget, never crash the response
    triggerScan(asset.id, cleaned, type, userAlias).catch(e =>
      console.error('[monitor] Initial scan dispatch failed (non-fatal):', e?.message ?? e)
    )

    return NextResponse.json({ ok: true, asset })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'Already monitoring this target' }, { status: 409 })
    }
    console.error('[monitor] POST failed:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE: remove asset ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { assetId } = await req.json()
  if (!assetId) return NextResponse.json({ error: 'assetId required' }, { status: 400 })

  const asset = await prisma.monitoredAsset.findFirst({ where: { id: assetId, userAlias } })
  if (!asset) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await prisma.monitoredAsset.delete({ where: { id: assetId } })
  return NextResponse.json({ ok: true })
}

// ── PATCH: ESO callback with snapshot data ────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const SECRET   = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const secret   = req.headers.get('x-internal-secret')
  if (secret !== SECRET) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { assetId, snapshot, changes } = await req.json()
  if (!assetId) return NextResponse.json({ error: 'assetId required' }, { status: 400 })

  try {
    // Save new snapshot
    if (snapshot) {
      await prisma.assetSnapshot.create({
        data: {
          assetId,
          subdomains: snapshot.subdomains ?? [],
          openPorts:  snapshot.openPorts  ?? [],
          techs:      snapshot.techs      ?? [],
          cves:       snapshot.cves       ?? [],
          sslExpiry:  snapshot.sslExpiry  ? new Date(snapshot.sslExpiry) : null,
          httpStatus: snapshot.httpStatus ?? null,
          dnsRecords: snapshot.dnsRecords ?? {},
        },
      })
    }

    // Save detected changes
    if (changes?.length > 0) {
      await prisma.assetChange.createMany({
        data: changes.map((c: any) => ({
          assetId,
          changeType:  c.changeType,
          severity:    c.severity ?? 'medium',
          oldValue:    c.oldValue ?? null,
          newValue:    c.newValue ?? null,
          description: c.description,
        })),
      })

      // Create notification + send email for high/critical changes
      const asset = await prisma.monitoredAsset.findUnique({ where: { id: assetId } })
      if (asset) {
        const critical = changes.filter((c: any) => ['critical', 'high'].includes(c.severity))
        if (critical.length > 0) {
          const title = `🚨 ${critical.length} change${critical.length !== 1 ? 's' : ''} detected on ${asset.label ?? asset.target}`
          const body  = critical.map((c: any) => c.description).slice(0, 3).join(' · ')

          // In-app notification
          await prisma.notification.create({
            data: {
              userAlias: asset.userAlias,
              type:      'asset_change',
              title,
              body,
              link: `/monitor?asset=${assetId}`,
            },
          }).catch(() => null)

          // Email notification
          sendAlertEmail(asset, critical).catch(console.error)
        }
      }
    }

    // Update lastScannedAt
    await prisma.monitoredAsset.update({
      where: { id: assetId },
      data:  { lastScannedAt: new Date() },
    })

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[monitor callback] failed:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// ── PUT: acknowledge changes ──────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { assetId, changeIds } = await req.json()

  // Verify ownership
  const asset = await prisma.monitoredAsset.findFirst({ where: { id: assetId, userAlias } })
  if (!asset) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await prisma.assetChange.updateMany({
    where: { assetId, id: { in: changeIds ?? [] } },
    data:  { acknowledged: true },
  })
  return NextResponse.json({ ok: true })
}

// ── Send alert email ─────────────────────────────────────────────────────────
async function sendAlertEmail(asset: any, changes: any[]) {
  try {
    const ESO    = process.env.ESO_API_URL ?? 'http://localhost:8000'
    const secret = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'

    // Get user email from ESO
    const emailRes = await fetch(
      `${ESO}/api/v1/admin/users/email?alias=${encodeURIComponent(asset.userAlias)}`,
      { headers: { 'X-Internal-Secret': secret } }
    )
    if (!emailRes.ok) return
    const { email, username } = await emailRes.json()

    const { sendEmail } = await import('@/lib/email')
    const hasCritical = changes.some((c: any) => c.severity === 'critical')
    const target      = asset.label ?? asset.target

    const rows = changes.slice(0, 10).map((c: any) => `
      <tr>
        <td style="padding:6px 8px;font-mono;font-size:11px;color:${
          c.severity === 'critical' ? '#ff3a5c' : '#fb923c'
        };font-weight:bold;text-transform:uppercase">${c.severity}</td>
        <td style="padding:6px 8px;font-family:'Courier New',monospace;font-size:11px;color:#94a3b8">${c.description}</td>
      </tr>`).join('')

    await sendEmail({
      to:      email,
      subject: `${hasCritical ? '🚨 CRITICAL' : '⚠️ HIGH'}: ${changes.length} change${changes.length !== 1 ? 's' : ''} on ${target}`,
      html: `
        <div style="font-family:'Courier New',monospace;background:#03050a;padding:32px;color:#e2e8f0;">
          <div style="max-width:600px;margin:0 auto;">
            <div style="font-size:20px;font-weight:900;color:#00ffaa;margin-bottom:4px;">XCloak Monitor Alert</div>
            <div style="font-size:12px;color:#475569;margin-bottom:20px;">Attack Surface Monitoring</div>

            <p style="color:#94a3b8;font-size:13px;">Hi ${username},</p>
            <p style="color:#94a3b8;font-size:13px;">
              XCloak detected <strong style="color:#ff3a5c">${changes.length} change${changes.length !== 1 ? 's' : ''}</strong>
              on <strong style="color:#00aaff">${target}</strong>.
            </p>

            <table style="width:100%;border-collapse:collapse;margin:16px 0;background:rgba(255,255,255,0.03);border-radius:8px;overflow:hidden">
              <thead>
                <tr style="background:rgba(255,255,255,0.05)">
                  <th style="padding:8px;text-align:left;font-size:10px;color:#64748b;text-transform:uppercase">Severity</th>
                  <th style="padding:8px;text-align:left;font-size:10px;color:#64748b;text-transform:uppercase">Change</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>

            <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'}/monitor"
               style="display:inline-block;margin-top:8px;padding:12px 24px;
                      background:rgba(255,58,92,0.12);border:1px solid rgba(255,58,92,0.35);
                      border-radius:10px;color:#ff3a5c;font-size:13px;font-weight:700;text-decoration:none;">
              View in Monitor →
            </a>

            <p style="margin-top:24px;font-size:10px;color:#334155;">
              XCloak Security Platform · <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'}" style="color:#475569;">xcloak.tech</a>
              · <a href="${process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'}/settings" style="color:#475569;">Manage alerts</a>
            </p>
          </div>
        </div>
      `,
    })
  } catch (e) {
    console.error('[monitor] email failed:', e)
  }
}

// ── Trigger ESO scan ──────────────────────────────────────────────────────────
async function triggerScan(assetId: string, target: string, type: string, userAlias: string) {
  const INTERNAL_SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const APP_URL         = process.env.NEXT_PUBLIC_APP_URL   ?? 'http://localhost:3000'

  try {
    const res = await fetch(`${ESO_API_URL}/api/v1/monitor/scan`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Internal-Secret': INTERNAL_SECRET },
      body: JSON.stringify({
        asset_id:     assetId,
        target,
        type,
        user_alias:   userAlias,
        callback_url: `${APP_URL}/api/v1/monitor`,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`[monitor] ESO dispatch failed for ${target}:`, err)
    }
  } catch (e: any) {
    console.error(`[monitor] ESO unreachable for ${target}:`, e?.message ?? e)
  }
}
