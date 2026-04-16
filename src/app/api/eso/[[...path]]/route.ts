import { NextRequest, NextResponse } from 'next/server'

const ESO_BACKEND = process.env.ESO_BACKEND_URL ?? 'http://localhost:8000'

async function proxy(req: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params
  const url = `${ESO_BACKEND}/api/v1/${path.join('/')}${req.nextUrl.search}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Forward auth cookie as Bearer token
  const cookie = req.cookies.get('eso_token')
  if (cookie) headers['Authorization'] = `Bearer ${cookie.value}`

  // Also forward any existing Authorization header
  const authHeader = req.headers.get('Authorization')
  if (authHeader && !cookie) headers['Authorization'] = authHeader

  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await req.text()
    : undefined

  try {
    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    })

    const data = await res.text()
    return new NextResponse(data, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('Content-Type') ?? 'application/json' },
    })
  } catch (err: any) {
    return NextResponse.json({ error: 'ESO backend unreachable', detail: err.message }, { status: 503 })
  }
}

export const GET     = proxy
export const POST    = proxy
export const PUT     = proxy
export const PATCH   = proxy
export const DELETE  = proxy
