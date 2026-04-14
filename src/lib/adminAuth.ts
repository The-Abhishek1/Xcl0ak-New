import { NextRequest, NextResponse } from 'next/server'
import { createHash, timingSafeEqual } from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'xcloak-admin-secret-change-me'
const TOKEN_TTL    = 8 * 60 * 60 * 1000 // 8 hours

// Simple signed token: base64(payload).signature
export function signToken(alias: string): string {
  const payload = Buffer.from(JSON.stringify({ alias, exp: Date.now() + TOKEN_TTL })).toString('base64url')
  const sig     = createHash('sha256').update(`${payload}.${ADMIN_SECRET}`).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyToken(token: string): { alias: string } | null {
  try {
    const [payload, sig] = token.split('.')
    const expected = createHash('sha256').update(`${payload}.${ADMIN_SECRET}`).digest('base64url')
    const sigBuf  = Buffer.from(sig, 'base64url')
    const expBuf  = Buffer.from(expected, 'base64url')
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (data.exp < Date.now()) return null
    return { alias: data.alias }
  } catch { return null }
}

export function requireAdmin(req: NextRequest): { alias: string } | NextResponse {
  const token = req.cookies.get('xcloak-admin')?.value
             ?? req.headers.get('x-admin-token')
             ?? ''
  const admin = verifyToken(token)
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return admin
}

// Hash password with SHA-256 + secret
export function hashPassword(pw: string): string {
  return createHash('sha256').update(`${pw}.${ADMIN_SECRET}`).digest('hex')
}

export function checkPassword(pw: string, hash: string): boolean {
  const h = hashPassword(pw)
  return timingSafeEqual(Buffer.from(h), Buffer.from(hash))
}
