import { NextRequest, NextResponse } from 'next/server'
import { prisma }        from '@/lib/prisma'
import { signToken, hashPassword, checkPassword } from '@/lib/adminAuth'

// POST /api/v1/admin/login
export async function POST(req: NextRequest) {
  const body = await req.json()
  // Accept both {alias} and {email} for compatibility with login page
  const alias    = (body.alias ?? body.email ?? '').trim()
  const password = body.password ?? ''

  if (!alias || !password) {
    return NextResponse.json({ error: 'email/alias and password required' }, { status: 400 })
  }

  // First-time setup: if no admins exist, create one automatically
  const count = await prisma.adminUser.count()
  if (count === 0) {
    await prisma.adminUser.create({
      data: { alias, passwordHash: hashPassword(password) },
    })
    const token = signToken(alias)
    const res   = NextResponse.json({ ok: true, alias, firstSetup: true })
    res.cookies.set('xcloak-admin', token, { httpOnly: true, sameSite: 'lax', maxAge: 28800 })
    return res
  }

  // Try alias match first, then email-style match (alias contains @)
  const admin = await prisma.adminUser.findFirst({
    where: { OR: [{ alias }, { alias: alias.split('@')[0] }] },
  })
  if (!admin || !checkPassword(password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = signToken(alias)
  const res   = NextResponse.json({ ok: true, alias })
  res.cookies.set('xcloak-admin', token, { httpOnly: true, sameSite: 'lax', maxAge: 28800 })
  return res
}

// DELETE /api/v1/admin/login  — logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('xcloak-admin')
  return res
}
