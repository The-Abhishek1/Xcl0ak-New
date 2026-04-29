/**
 * /api/v1/auth-scan
 * POST ?action=start  → start authenticated scan
 * GET  ?scan_id=xxx   → poll results
 */
import { NextRequest, NextResponse } from 'next/server'

const ESO = process.env.ESO_API_URL ?? 'http://localhost:8000'

function esoHeaders(req: NextRequest) {
  const cookie = req.cookies.get('eso_token')?.value
  const auth   = req.headers.get('authorization') ?? ''
  const token  = cookie ?? auth.replace(/^Bearer /i, '').trim()
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  let res: Response
  try {
    res = await fetch(`${ESO}/api/v1/auth-scan/start`, {
      method: 'POST', headers: esoHeaders(req), body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json({ error: 'ESO backend unreachable' }, { status: 503 })
  }
  const data = await res.json().catch(() => ({ error: `ESO error ${res.status}` }))
  return NextResponse.json(data, { status: res.ok ? 200 : res.status })
}

export async function GET(req: NextRequest) {
  const scan_id = req.nextUrl.searchParams.get('scan_id')
  if (!scan_id) return NextResponse.json({ error: 'scan_id required' }, { status: 400 })
  let res: Response
  try {
    res = await fetch(`${ESO}/api/v1/auth-scan/${scan_id}`, { headers: esoHeaders(req) })
  } catch {
    return NextResponse.json({ error: 'ESO backend unreachable' }, { status: 503 })
  }
  const data = await res.json().catch(() => ({ error: `ESO error ${res.status}` }))
  return NextResponse.json(data, { status: res.ok ? 200 : res.status })
}
