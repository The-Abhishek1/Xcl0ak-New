/**
 * /api/v1/ai-scan
 *
 * POST  — start a new prompt injection scan
 * GET   — get scan status/results by scanId
 * PATCH — internal callback from ESO to update scan status (same as scan-update but for AI scans)
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ESO_API_URL = process.env.ESO_API_URL ?? 'http://localhost:8000'
const APP_URL     = process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'

function getAlias(req: NextRequest): string | null {
  return req.headers.get('x-user-alias')
}

// ── POST: start scan ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const alias = getAlias(req)
  if (!alias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  const { targetUrl, apiKey, model, systemPrompt, categories, maxPrompts } = await req.json()

  if (!targetUrl || !apiKey || !model) {
    return NextResponse.json(
      { error: 'targetUrl, apiKey, and model are required' },
      { status: 400 }
    )
  }

  // Validate URL is a real LLM endpoint
  try { new URL(targetUrl) } catch {
    return NextResponse.json({ error: 'Invalid targetUrl' }, { status: 400 })
  }

  // Create scan record in Prisma
  const scan = await prisma.aiScan.create({
    data: {
      userAlias:    alias,
      targetUrl,
      model,
      systemPrompt: systemPrompt ?? null,
      categories:   categories ?? [],
      maxPrompts:   maxPrompts ?? 50,
      status:       'queued',
    },
  })

  // Dispatch to ESO (fire and forget)
  dispatchToESO(scan.id, targetUrl, apiKey, model, systemPrompt, categories, maxPrompts, alias).catch(
    e => console.error('[ai-scan] ESO dispatch failed:', e)
  )

  return NextResponse.json({ ok: true, scanId: scan.id })
}

// ── GET: get scan by id ───────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const alias  = getAlias(req)
  const scanId = req.nextUrl.searchParams.get('scanId')

  if (!alias) return NextResponse.json({ error: 'x-user-alias required' }, { status: 401 })

  if (scanId) {
    const scan = await prisma.aiScan.findFirst({
      where: { id: scanId, userAlias: alias },
    })
    if (!scan) return NextResponse.json({ error: 'scan not found' }, { status: 404 })
    return NextResponse.json({ scan })
  }

  // Return all scans for this user
  const scans = await prisma.aiScan.findMany({
    where:   { userAlias: alias },
    orderBy: { createdAt: 'desc' },
    take:    20,
    select: {
      id: true, targetUrl: true, model: true, status: true,
      findings: true, criticals: true, highs: true,
      createdAt: true, completedAt: true,
    },
  })
  return NextResponse.json({ scans })
}

// ── PATCH: internal callback from ESO ────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const secret = req.headers.get('x-internal-secret')
  if (secret !== SECRET) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { scanId, status, findings, criticals, highs, result, error } = await req.json()
  if (!scanId || !status) {
    return NextResponse.json({ error: 'scanId and status required' }, { status: 400 })
  }

  try {
    const scan = await prisma.aiScan.update({
      where: { id: scanId },
      data: {
        status,
        findings:    findings   ?? undefined,
        criticals:   criticals  ?? undefined,
        highs:       highs      ?? undefined,
        result:      result     ?? undefined,
        error:       error      ?? undefined,
        startedAt:   status === 'running'                      ? new Date() : undefined,
        completedAt: ['completed', 'failed'].includes(status)  ? new Date() : undefined,
      },
    })

    // Create notification
    if (status === 'completed') {
      const count    = findings ?? 0
      const hasCrit  = (criticals ?? 0) > 0
      await prisma.notification.create({
        data: {
          userAlias: scan.userAlias,
          type:      'ai_scan_complete',
          title:     count === 0
            ? `✅ AI scan clean — ${scan.targetUrl}`
            : `${hasCrit ? '🔴' : '🟠'} AI scan: ${count} injection${count !== 1 ? 's' : ''} found`,
          body: count === 0
            ? 'No prompt injection vulnerabilities detected.'
            : `${criticals ?? 0} critical, ${highs ?? 0} high severity findings. Review in AI Security Scanner.`,
          link: '/ai-scan',
        },
      }).catch(() => null)
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[ai-scan callback] failed:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

// ── Dispatch to ESO ───────────────────────────────────────────────────────────
async function dispatchToESO(
  scanId:       string,
  targetUrl:    string,
  apiKey:       string,
  model:        string,
  systemPrompt: string | undefined,
  categories:   string[] | undefined,
  maxPrompts:   number | undefined,
  userAlias:    string,
) {
  const INTERNAL_SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const res = await fetch(`${ESO_API_URL}/api/v1/ai-scanner/scan`, {
    method:  'POST',
    headers: {
      'Content-Type':    'application/json',
      'X-Internal-Secret': INTERNAL_SECRET,
    },
    body: JSON.stringify({
      scan_id:       scanId,
      target_url:    targetUrl,
      api_key:       apiKey,
      model,
      system_prompt: systemPrompt,
      categories,
      max_prompts:   maxPrompts ?? 50,
      user_alias:    userAlias,
      callback_url:  `${APP_URL}/api/v1/ai-scan`,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`[ai-scan] ESO dispatch failed:`, err)
    await prisma.aiScan.update({
      where: { id: scanId },
      data:  { status: 'failed', error: `ESO dispatch failed: ${err}`, completedAt: new Date() },
    })
  }
}
