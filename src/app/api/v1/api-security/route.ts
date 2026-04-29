/**
 * /api/v1/api-security
 *
 * POST ?action=parse   → parse spec, return endpoints
 * POST ?action=scan    → start scan, return scan_id
 * GET  ?scan_id=xxx    → poll scan results
 */
import { NextRequest, NextResponse } from 'next/server'

const ESO = process.env.ESO_API_URL ?? 'http://localhost:8000'

function esoHeaders(req: NextRequest): Record<string, string> {
  const cookie = req.cookies.get('eso_token')?.value
  const auth   = req.headers.get('authorization') ?? ''
  const token  = cookie ?? auth.replace(/^Bearer /i, '').trim()
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
}

async function proxyESO(req: NextRequest, path: string, method = 'POST', body?: unknown) {
  const res = await fetch(`${ESO}/api/v1/api-security/${path}`, {
    method,
    headers: esoHeaders(req),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  const data = await res.json().catch(() => ({ error: `ESO error ${res.status}` }))
  return NextResponse.json(data, { status: res.ok ? 200 : res.status })
}

export async function POST(req: NextRequest) {
  const action = req.nextUrl.searchParams.get('action') ?? 'scan'
  const body   = await req.json().catch(() => ({}))
  return proxyESO(req, action === 'parse' ? 'parse' : 'scan', 'POST', body)
}

export async function GET(req: NextRequest) {
  const scan_id = req.nextUrl.searchParams.get('scan_id')
  if (!scan_id) return NextResponse.json({ error: 'scan_id required' }, { status: 400 })
  return proxyESO(req, `scan/${scan_id}`, 'GET')
}
