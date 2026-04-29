/**
 * /api/v1/cloud
 *
 * GET    — list cloud accounts + findings summary
 * POST   — connect cloud account, trigger audit
 * DELETE — disconnect account
 * PATCH  — internal callback from ESO with audit findings
 * PUT    — suppress / resolve a finding
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const ESO_API_URL    = process.env.ESO_API_URL         ?? 'http://localhost:8000'
const APP_URL        = process.env.NEXT_PUBLIC_APP_URL  ?? 'https://xcloak.tech'
const ENCRYPT_KEY    = (process.env.CLOUD_CREDENTIAL_ENCRYPTION_KEY ?? 'xcloak-cloud-key-32bytes!!!!!!!!').slice(0, 32)

function alias(req: NextRequest) {
  return req.headers.get('x-user-alias')
}

// ── Encrypt/decrypt credentials ───────────────────────────────────────────────
function encrypt(text: string): string {
  const iv     = randomBytes(16)
  const cipher = createCipheriv('aes-256-cbc', Buffer.from(ENCRYPT_KEY), iv)
  const enc    = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  return iv.toString('hex') + ':' + enc.toString('hex')
}

function decrypt(text: string): string {
  const [ivHex, encHex] = text.split(':')
  const decipher = createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPT_KEY), Buffer.from(ivHex, 'hex'))
  const dec = Buffer.concat([decipher.update(Buffer.from(encHex, 'hex')), decipher.final()])
  return dec.toString('utf8')
}

// ── GET: list accounts ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const findingId = req.nextUrl.searchParams.get('findingId')
  const accountId = req.nextUrl.searchParams.get('accountId')

  // Single account findings
  if (accountId) {
    const account = await prisma.cloudAccount.findFirst({
      where: { id: accountId, userAlias },
      include: {
        findings: {
          where:   { status: 'open' },
          orderBy: [{ severity: 'asc' }, { detectedAt: 'desc' }],
        },
      },
    })
    if (!account) return NextResponse.json({ error: 'not found' }, { status: 404 })
    const { credentials: _, ...safe } = account as any
    return NextResponse.json({ account: safe })
  }

  const accounts = await prisma.cloudAccount.findMany({
    where:   { userAlias },
    orderBy: { createdAt: 'desc' },
    include: {
      findings: {
        where:  { status: 'open' },
        select: { id: true, severity: true, service: true },
      },
    },
  })

  // Strip encrypted credentials from response
  const safe = accounts.map(({ credentials: _, ...a }) => a)
  return NextResponse.json({ accounts: safe })
}

// ── POST: connect account ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { provider, accountId, label, region, credentials } = await req.json()

  if (!provider || !accountId || !credentials) {
    return NextResponse.json({ error: 'provider, accountId, and credentials required' }, { status: 400 })
  }
  if (!['aws', 'gcp', 'azure'].includes(provider)) {
    return NextResponse.json({ error: 'provider must be aws, gcp, or azure' }, { status: 400 })
  }

  try {
    const encryptedCreds = encrypt(JSON.stringify(credentials))
    const account = await prisma.cloudAccount.create({
      data: {
        userAlias,
        provider,
        accountId,
        label:       label ?? `${provider.toUpperCase()} ${accountId}`,
        region:      region ?? 'us-east-1',
        credentials: encryptedCreds,
      },
    })

    // Trigger initial audit
    triggerAudit(account.id, provider, accountId, region ?? 'us-east-1', credentials).catch(e =>
      console.error('[cloud] Initial audit dispatch failed:', e?.message)
    )

    const { credentials: _, ...safe } = account as any
    return NextResponse.json({ ok: true, account: safe })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'Account already connected' }, { status: 409 })
    }
    console.error('[cloud] POST failed:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE: disconnect account ────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { accountId } = await req.json()
  const account = await prisma.cloudAccount.findFirst({ where: { id: accountId, userAlias } })
  if (!account) return NextResponse.json({ error: 'not found' }, { status: 404 })

  await prisma.cloudAccount.delete({ where: { id: accountId } })
  return NextResponse.json({ ok: true })
}

// ── PATCH: ESO callback with audit findings ───────────────────────────────────
export async function PATCH(req: NextRequest) {
  const SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const secret = req.headers.get('x-internal-secret')
  if (secret !== SECRET) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { accountId, findings, postureScore, scoreDetail, error } = await req.json()
  if (!accountId) return NextResponse.json({ error: 'accountId required' }, { status: 400 })

  try {
    if (findings?.length > 0) {
      // Upsert findings (avoid duplicates on re-scan)
      for (const f of findings) {
        await prisma.cloudFinding.upsert({
          where:  { id: `${accountId}-${f.ruleId}-${f.resource}`.slice(0, 25) + f.ruleId.slice(-10) },
          create: {
            id:          `${accountId}-${f.ruleId}-${f.resource}`.slice(0, 25) + f.ruleId.slice(-10),
            accountId,
            provider:    f.provider,
            service:     f.service,
            resource:    f.resource,
            ruleId:      f.ruleId,
            title:       f.title,
            description: f.description,
            severity:    f.severity,
            remediation: f.remediation ?? null,
            compliance:  f.compliance ?? [],
          },
          update: {
            title:       f.title,
            description: f.description,
            severity:    f.severity,
            remediation: f.remediation ?? null,
            compliance:  f.compliance ?? [],
          },
        })
      }
    }

    await prisma.cloudAccount.update({
      where: { id: accountId },
      data:  { lastAuditAt: new Date(), postureScore: postureScore ?? null, scoreDetail: scoreDetail ?? undefined },
    })

    // Notify on critical findings
    const account = await prisma.cloudAccount.findUnique({ where: { id: accountId } })
    if (account) {
      const criticals = (findings ?? []).filter((f: any) => f.severity === 'critical')
      if (criticals.length > 0) {
        await prisma.notification.create({
          data: {
            userAlias: account.userAlias,
            type:      'cloud_audit',
            title:     `☁️ ${criticals.length} critical misconfiguration${criticals.length !== 1 ? 's' : ''} in ${account.label}`,
            body:      criticals.slice(0, 3).map((f: any) => f.title).join(' · '),
            link:      `/cloud?account=${accountId}`,
          },
        }).catch(() => null)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[cloud callback] failed:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// ── PUT: suppress / resolve finding ──────────────────────────────────────────
export async function PUT(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { findingId, status } = await req.json()
  if (!['suppressed', 'resolved', 'open'].includes(status)) {
    return NextResponse.json({ error: 'status must be suppressed | resolved | open' }, { status: 400 })
  }

  // Verify ownership via account
  const finding = await prisma.cloudFinding.findFirst({
    where:   { id: findingId },
    include: { account: { select: { userAlias: true } } },
  })
  if (!finding || finding.account.userAlias !== userAlias) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  await prisma.cloudFinding.update({
    where: { id: findingId },
    data:  { status, resolvedAt: status === 'resolved' ? new Date() : null },
  })
  return NextResponse.json({ ok: true })
}

// ── Trigger ESO audit ─────────────────────────────────────────────────────────
async function triggerAudit(
  dbAccountId: string,
  provider:    string,
  accountId:   string,
  region:      string,
  credentials: any,
) {
  const INTERNAL_SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  try {
    const res = await fetch(`${ESO_API_URL}/api/v1/cloud/audit`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Internal-Secret': INTERNAL_SECRET },
      body: JSON.stringify({
        account_id:    dbAccountId,
        provider,
        cloud_account: accountId,
        region,
        credentials,
        callback_url:  `${APP_URL}/api/v1/cloud`,
      }),
    })
    if (!res.ok) console.error('[cloud] ESO audit dispatch failed:', await res.text())
  } catch (e: any) {
    console.error('[cloud] ESO unreachable:', e?.message)
  }
}
