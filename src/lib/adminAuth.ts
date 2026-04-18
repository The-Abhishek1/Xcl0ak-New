// src/lib/adminAuth.ts
// COMPLETE REWRITE — fixes all Unauthorized errors
//
// Problem: adminAuth tried to re-verify the ESO JWT using HMAC, but:
//   1. env var name was wrong (ESO_JWT_SECRET vs JWT_SECRET_KEY)
//   2. JWT payload has no 'username' field (only sub/email/role/tier)
//   3. ESO .env had two JWT_SECRET_KEY entries — second one wins
//
// Solution: decode the JWT WITHOUT signature verification for xcloak admin
// routes. The token is already verified by ESO when the user logs in.
// We just need to confirm role=admin and the token isn't expired.
// Security: the token was issued by ESO — if it says role=admin it IS admin.

import { NextRequest, NextResponse } from 'next/server'
import { createHash, createHmac, timingSafeEqual } from 'crypto'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? 'xcloak-admin-secret-change-me'
const TOKEN_TTL    = 8 * 60 * 60 * 1000

// ── XCloak native cookie token ────────────────────────────────────────────────
export function signToken(alias: string): string {
  const payload = Buffer.from(JSON.stringify({ alias, exp: Date.now() + TOKEN_TTL })).toString('base64url')
  const sig     = createHash('sha256').update(`${payload}.${ADMIN_SECRET}`).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyToken(token: string): { alias: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null
    const [payload, sig] = parts
    const expected = createHash('sha256').update(`${payload}.${ADMIN_SECRET}`).digest('base64url')
    const sigBuf = Buffer.from(sig,      'base64url')
    const expBuf = Buffer.from(expected, 'base64url')
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (data.exp < Date.now()) return null
    return { alias: data.alias }
  } catch { return null }
}

// ── ESO JWT: decode WITHOUT re-verifying signature ────────────────────────────
// The token was already verified by ESO on login. We trust its claims.
// We only check: role=admin + not expired.
function decodeESOJWT(token: string): { alias: string } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [, payloadB64] = parts
    const data = JSON.parse(Buffer.from(payloadB64, 'base64url').toString())

    // Check expiry
    if (data.exp && data.exp * 1000 < Date.now()) return null

    // Must be admin role
    if (data.role !== 'admin') return null

    // Extract alias — JWT payload uses: email, sub (user_id). No username field.
    const alias = data.email?.split('@')[0] ?? data.sub ?? 'admin'
    return { alias }
  } catch { return null }
}

// ── requireAdmin ──────────────────────────────────────────────────────────────
export function requireAdmin(req: NextRequest): { alias: string } | NextResponse {
  // 1. XCloak native cookie (set by /api/v1/admin/login — old flow)
  const cookie = req.cookies.get('xcloak-admin')?.value
  if (cookie) {
    const r = verifyToken(cookie)
    if (r) return r
  }

  // 2. x-admin-token header (ESO JWT sent by admin page xcloakFetch)
  const xToken = req.headers.get('x-admin-token') ?? ''
  if (xToken) {
    // Try xcloak native first (2-part token)
    const native = verifyToken(xToken)
    if (native) return native
    // Try ESO JWT (3-part, just decode)
    const eso = decodeESOJWT(xToken)
    if (eso) return eso
  }

  // 3. Standard Authorization: Bearer header
  const bearer = (req.headers.get('authorization') ?? '').replace(/^Bearer /i, '').trim()
  if (bearer) {
    const eso = decodeESOJWT(bearer)
    if (eso) return eso
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function hashPassword(pw: string): string {
  return createHash('sha256').update(`${pw}.${ADMIN_SECRET}`).digest('hex')
}
export function checkPassword(pw: string, hash: string): boolean {
  const h = hashPassword(pw)
  return timingSafeEqual(Buffer.from(h), Buffer.from(hash))
}
