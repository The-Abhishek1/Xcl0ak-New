/**
 * /api/v1/darkweb
 *
 * GET              → list all monitors for user
 * GET ?id=xxx      → single monitor with exposures
 * POST             → add monitor + run initial check
 * DELETE           → remove monitor
 * PATCH            → internal callback from ESO with new exposures
 * PUT              → acknowledge exposure
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ESO = process.env.ESO_API_URL ?? 'http://localhost:8000'
const INTERNAL_SECRET = process.env.INTERNAL_EMAIL_SECRET ?? ''

function alias(req: NextRequest) {
  return req.headers.get('x-user-alias') ?? null
}

function esoHeaders(req: NextRequest): Record<string, string> {
  const cookie = req.cookies.get('eso_token')?.value
  const auth   = req.headers.get('authorization') ?? ''
  const token  = cookie ?? auth.replace(/^Bearer /i, '').trim()
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

// ── GET ──────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const id = req.nextUrl.searchParams.get('id')

  if (id) {
    const monitor = await prisma.darkWebMonitor.findFirst({
      where:   { id, userAlias },
      include: { exposures: { orderBy: { foundAt: 'desc' } } },
    })
    if (!monitor) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ monitor })
  }

  const monitors = await prisma.darkWebMonitor.findMany({
    where:   { userAlias },
    orderBy: { createdAt: 'desc' },
    include: {
      exposures: {
        orderBy: { foundAt: 'desc' },
        take: 5,
      },
    },
  })
  return NextResponse.json({ monitors })
}

// ── POST — add monitor ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { identifier, type, hibpKey, intelxKey } = await req.json()
  if (!identifier || !type) return NextResponse.json({ error: 'identifier and type required' }, { status: 400 })
  if (!['email', 'domain'].includes(type)) return NextResponse.json({ error: 'type must be email or domain' }, { status: 400 })

  const cleaned = identifier.trim().toLowerCase()

  // Check duplicate
  const existing = await prisma.darkWebMonitor.findFirst({ where: { userAlias, identifier: cleaned } })
  if (existing) return NextResponse.json({ error: `Already monitoring ${cleaned}` }, { status: 409 })

  // Create monitor
  const monitor = await prisma.darkWebMonitor.create({
    data: {
      userAlias,
      identifier: cleaned,
      type,
      hibpKey:    hibpKey    ? _encrypt(hibpKey)    : null,
      intelxKey:  intelxKey  ? _encrypt(intelxKey)  : null,
    },
  })

  // Fire initial check — don't await
  _triggerCheck(monitor.id, cleaned, type, { hibp: hibpKey ?? '', intelx: intelxKey ?? '' }, req).catch(
    e => console.error('[darkweb] initial check dispatch failed:', e?.message)
  )

  return NextResponse.json({ ok: true, monitor })
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  const monitor = await prisma.darkWebMonitor.findFirst({ where: { id, userAlias } })
  if (!monitor) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.darkWebMonitor.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

// ── PATCH — ESO callback ──────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const secret = req.headers.get('X-Internal-Secret')
  if (!INTERNAL_SECRET || secret !== INTERNAL_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { monitorId, exposures, error } = await req.json()
  if (!monitorId) return NextResponse.json({ error: 'monitorId required' }, { status: 400 })

  await prisma.darkWebMonitor.update({
    where: { id: monitorId },
    data:  { lastCheckedAt: new Date(), status: error ? 'error' : 'active' },
  })

  if (exposures?.length > 0) {
    await prisma.darkWebExposure.createMany({
      data: exposures.map((e: any) => ({
        monitorId,
        source:      e.source      ?? 'Unknown',
        identifier:  e.identifier  ?? '',
        type:        e.type        ?? 'unknown',
        severity:    e.severity    ?? 'low',
        title:       e.title       ?? '',
        description: e.description ?? '',
        dataTypes:   e.dataTypes   ?? [],
        url:         e.url         ?? '',
        breachDate:  e.breachDate  ?? null,
        pwnCount:    e.pwnCount    ?? null,
        foundAt:     new Date(),
      })),
      skipDuplicates: true,
    })
  }

  return NextResponse.json({ ok: true })
}

// ── PUT — acknowledge exposure ────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  const userAlias = alias(req)
  if (!userAlias) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { exposureId } = await req.json()
  await prisma.darkWebExposure.update({
    where: { id: exposureId },
    data:  { acknowledged: true },
  })
  return NextResponse.json({ ok: true })
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function _triggerCheck(
  monitorId:  string,
  identifier: string,
  type:       string,
  apiKeys:    Record<string, string>,
  req:        NextRequest,
) {
  const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/v1/darkweb`
  await fetch(`${ESO}/api/v1/darkweb/monitor`, {
    method:  'POST',
    headers: { ...esoHeaders(req), 'X-Internal-Secret': INTERNAL_SECRET },
    body: JSON.stringify({
      monitor_id:   monitorId,
      identifier,
      id_type:      type,
      api_keys:     { hibp: apiKeys.hibp ?? '', intelx: apiKeys.intelx ?? '' },
      callback_url: callbackUrl,
    }),
  })
}

function _encrypt(value: string): string {
  // Simple base64 for now — replace with AES-256 using CREDENTIAL_ENCRYPTION_KEY
  return Buffer.from(value).toString('base64')
}
