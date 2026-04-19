import { NextRequest, NextResponse } from 'next/server'

const ESO = process.env.ESO_BACKEND_URL ?? 'http://localhost:8000'

// Proxy to ESO which has the user email in its PostgreSQL
export async function POST(req: NextRequest) {
  const body = await req.json()

  try {
    const res = await fetch(`${ESO}/api/v1/auth/forgot-password`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({ ok: true }))
    // Always return 200 — prevent email enumeration
    return NextResponse.json({ ok: true, message: data.message ?? 'If that email exists, a reset link has been sent.' })
  } catch {
    // Still return 200 even on network error
    return NextResponse.json({ ok: true, message: 'If that email exists, a reset link has been sent.' })
  }
}
