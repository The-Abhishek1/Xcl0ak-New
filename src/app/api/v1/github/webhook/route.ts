/**
 * POST /api/v1/github/webhook
 * Receives push and pull_request events from GitHub.
 * Validates HMAC-SHA256 signature, creates RepoScan record, triggers ESO SAST scan.
 *
 * GitHub sends X-Hub-Signature-256: sha256=<hmac>
 * We verify against the connection's webhookSecret.
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHmac, timingSafeEqual } from 'crypto'

const ESO_URL             = process.env.ESO_API_URL           ?? 'http://localhost:8000'

export async function POST(req: NextRequest) {
  const event     = req.headers.get('x-github-event')    ?? ''
  const sigHeader = req.headers.get('x-hub-signature-256') ?? ''
  const delivery  = req.headers.get('x-github-delivery')  ?? ''

  // Only handle push and pull_request events
  if (!['push', 'pull_request'].includes(event)) {
    return NextResponse.json({ ok: true, skipped: `event ${event} not handled` })
  }

  const rawBody = await req.text()
  let payload: any
  try { payload = JSON.parse(rawBody) } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  // ── Find the repo in our DB ─────────────────────────────────────────────────
  const repoId   = String(payload.repository?.id ?? '')
  const fullName = payload.repository?.full_name ?? ''
  if (!repoId) {
    return NextResponse.json({ error: 'no repository in payload' }, { status: 400 })
  }

  const repo = await prisma.gitHubRepo.findFirst({
    where:   { repoId },
    include: { connection: true },
  })

  if (!repo) {
    // Repo not connected — ignore silently (another app's webhook hitting same URL)
    return NextResponse.json({ ok: true, skipped: 'repo not connected' })
  }

  // ── Verify HMAC signature ───────────────────────────────────────────────────
  const webhookSecret = repo.connection.webhookSecret
  if (webhookSecret) {
    const expected = `sha256=${createHmac('sha256', webhookSecret).update(rawBody).digest('hex')}`
    try {
      const sigBuf  = Buffer.from(sigHeader)
      const expBuf  = Buffer.from(expected)
      if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
        return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
      }
    } catch {
      return NextResponse.json({ error: 'signature verification failed' }, { status: 401 })
    }
  }

  // ── Skip if scanning disabled for this repo ─────────────────────────────────
  if (!repo.scanEnabled) {
    return NextResponse.json({ ok: true, skipped: 'scan disabled for repo' })
  }

  // ── Extract commit info ─────────────────────────────────────────────────────
  let commitSha: string
  let branch:    string
  let prNumber:  number | null = null
  let cloneUrl:  string

  if (event === 'push') {
    commitSha = payload.after
    branch    = (payload.ref as string).replace('refs/heads/', '')
    cloneUrl  = payload.repository.clone_url
    // Skip branch deletions (after = 000...000)
    if (!commitSha || commitSha === '0000000000000000000000000000000000000000') {
      return NextResponse.json({ ok: true, skipped: 'branch deletion' })
    }
  } else {
    // pull_request
    const action = payload.action
    if (!['opened', 'synchronize', 'reopened'].includes(action)) {
      return NextResponse.json({ ok: true, skipped: `PR action ${action} not scanned` })
    }
    commitSha = payload.pull_request.head.sha
    branch    = payload.pull_request.head.ref
    prNumber  = payload.pull_request.number
    cloneUrl  = payload.pull_request.head.repo.clone_url
  }

  // ── Create RepoScan record ──────────────────────────────────────────────────
  const scan = await prisma.repoScan.create({
    data: {
      repoId:     repo.id,
      commitSha,
      branch,
      prNumber,
      status:     'queued',
      triggeredBy: 'webhook',
    },
  })

  // ── Trigger ESO SAST scan (fire and forget) ─────────────────────────────────
  triggerESOScan({
    scanId:       scan.id,
    repoFullName: fullName,
    cloneUrl,
    commitSha,
    branch,
    prNumber,
    userAlias:    repo.connection.userAlias,
    accessToken:  repo.connection.accessToken,
  }).catch(err => {
    console.error('[github/webhook] ESO scan trigger failed:', err)
    prisma.repoScan.update({
      where: { id: scan.id },
      data:  { status: 'failed', error: String(err) },
    }).catch(() => null)
  })

  return NextResponse.json({ ok: true, scanId: scan.id, delivery })
}

async function triggerESOScan(params: {
  scanId:       string
  repoFullName: string
  cloneUrl:     string
  commitSha:    string
  branch:       string
  prNumber:     number | null
  userAlias:    string
  accessToken:  string
}) {
  const res = await fetch(`${ESO_URL}/api/v1/github/scan`, {
    method:  'POST',
    headers: {
      'Content-Type':    'application/json',
      'X-Internal-Secret': process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal',
    },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`ESO returned ${res.status}: ${text}`)
  }
}
