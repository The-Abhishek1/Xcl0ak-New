import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/v1/notifications/read — mark all read for alias
export async function PATCH(req: NextRequest) {
  const { alias, id } = await req.json()
  if (!alias) return NextResponse.json({ error: 'alias required' }, { status: 400 })

  if (id) {
    await prisma.notification.update({ where: { id }, data: { read: true } })
  } else {
    await prisma.notification.updateMany({ where: { userAlias: alias, read: false }, data: { read: true } })
  }
  return NextResponse.json({ ok: true })
}
