import { NextRequest, NextResponse } from 'next/server'
import { prisma }        from '@/lib/prisma'
import { signToken, hashPassword, checkPassword } from '@/lib/adminAuth'

// POST /api/v1/admin/login
export async function POST(req: NextRequest) {
  const { alias, password } = await req.json()

  if (!alias || !password) {
    return NextResponse.json({ error: 'alias and password required' }, { status: 400 })
  }

  // First-time setup: if no admins exist, create one
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

  const admin = await prisma.adminUser.findUnique({ where: { alias } })
  if (!admin || !checkPassword(password, admin.passwordHash)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
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
