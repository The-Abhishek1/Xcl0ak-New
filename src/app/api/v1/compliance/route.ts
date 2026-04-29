/**
 * /api/v1/compliance
 *
 * GET  ?framework=soc2        → run gap analysis (pulls cloud findings + calls ESO)
 * GET  ?frameworks=1          → list supported frameworks
 * GET  ?report=soc2&scan=<id> → download compliance PDF (proxied from ESO)
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ESO = process.env.ESO_API_URL ?? 'http://localhost:8000'

/** Extract ESO JWT from cookie OR Authorization header (whichever is present) */
function getBearerToken(req: NextRequest): string | null {
  const cookie = req.cookies.get('eso_token')?.value
  if (cookie) return cookie
  const auth = req.headers.get('authorization') ?? ''
  const bearer = auth.replace(/^Bearer /i, '').trim()
  return bearer || null
}

function esoHeaders(req: NextRequest): Record<string, string> {
  const token = getBearerToken(req)
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/** Parse ESO error response into a readable string */
async function parseEsoError(res: Response): Promise<string> {
  try {
    const body = await res.json()
    // ESO FastAPI returns {"detail": "..."} for validation errors
    // and {"code":"NOT_FOUND","message":"..."} for 404s
    return body.detail ?? body.message ?? body.error ?? `ESO error ${res.status}`
  } catch {
    return `ESO error ${res.status}`
  }
}

/** Get user alias from ESO JWT payload (no verification — just decode) */
function getUserAlias(req: NextRequest): string | null {
  const token = getBearerToken(req)
  if (!token) return null
  try {
    const parts   = token.split('.')
    if (parts.length < 2) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    // ESO puts username in "sub" field
    return payload.username ?? payload.sub ?? payload.email?.split('@')[0] ?? null
  } catch {
    return null
  }
}

// ── GET /api/v1/compliance ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  // ── List frameworks ─────────────────────────────────────────────────────────
  if (searchParams.has('frameworks')) {
    try {
      const res = await fetch(`${ESO}/api/v1/compliance/frameworks`, {
        headers: esoHeaders(req),
      })
      if (res.ok) return NextResponse.json(await res.json())
    } catch {}
    // Fallback — ESO not yet deployed
    return NextResponse.json({
      frameworks: [
        { id: 'soc2',     name: 'SOC 2 Type II',       controls: 32 },
        { id: 'iso27001', name: 'ISO 27001:2022',       controls: 27 },
        { id: 'pcidss',   name: 'PCI-DSS v4.0',        controls: 17 },
        { id: 'nist',     name: 'NIST CSF v2.0',       controls: 21 },
        { id: 'hipaa',    name: 'HIPAA Security Rule',  controls: 15 },
      ],
    })
  }

  // ── Download compliance PDF ─────────────────────────────────────────────────
  if (searchParams.has('report')) {
    const reportFw = searchParams.get('report')!
    const scanId   = searchParams.get('scan') ?? ''
    const url      = `${ESO}/api/v1/compliance/report/${reportFw}${scanId ? `?scan_id=${scanId}` : ''}`

    let res: Response
    try {
      res = await fetch(url, { headers: esoHeaders(req) })
    } catch {
      return NextResponse.json({ error: 'ESO backend unreachable' }, { status: 503 })
    }

    if (!res.ok) {
      const err = await parseEsoError(res)
      // Give a user-friendly message for the common "no completed scan" case
      const friendly = res.status === 404
        ? 'No completed scan found. Run a scan first, then download the PDF report.'
        : err
      return NextResponse.json({ error: friendly }, { status: res.status })
    }

    const pdf = await res.arrayBuffer()
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': res.headers.get('Content-Disposition') ?? `attachment; filename="xcloak-${reportFw}-compliance.pdf"`,
      },
    })
  }

  // ── Run gap analysis ────────────────────────────────────────────────────────
  const framework = (searchParams.get('framework') ?? 'soc2').toLowerCase()
  const userAlias = getUserAlias(req)

  // Fetch cloud findings from Prisma
  let cloudFindings: any[] = []
  if (userAlias) {
    try {
      const accounts = await prisma.cloudAccount.findMany({
        where:   { userAlias },
        include: {
          findings: {
            where:  { status: 'open' },
            select: {
              id: true, ruleId: true, service: true, provider: true,
              title: true, description: true, severity: true, compliance: true,
            },
          },
        },
      })
      for (const acc of accounts) cloudFindings.push(...acc.findings)
    } catch (e) {
      console.error('[compliance] Prisma cloud fetch failed:', e)
    }
  }

  // Call ESO
  let res: Response
  try {
    res = await fetch(`${ESO}/api/v1/compliance/assess-with-cloud`, {
      method:  'POST',
      headers: esoHeaders(req),
      body: JSON.stringify({
        framework,
        cloud_findings: cloudFindings,
        max_findings:   500,
      }),
    })
  } catch {
    return NextResponse.json({ error: 'ESO backend unreachable — ensure ESO is running and compliance route is registered' }, { status: 503 })
  }

  if (!res.ok) {
    const err = await parseEsoError(res)
    return NextResponse.json({ error: err }, { status: res.status })
  }

  const data = await res.json()
  data.cloud_finding_count = cloudFindings.length
  return NextResponse.json(data)
}
