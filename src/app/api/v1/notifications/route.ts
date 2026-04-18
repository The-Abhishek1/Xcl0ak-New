import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/v1/notifications?alias=xxx&limit=30
export async function GET(req: NextRequest) {
  const alias = req.nextUrl.searchParams.get('alias')
  const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 30), 50)
  if (!alias) return NextResponse.json({ error: 'alias required' }, { status: 400 })

  const [notifs, unread] = await Promise.all([
    prisma.notification.findMany({
      where:   { userAlias: alias },
      orderBy: { createdAt: 'desc' },
      take:    limit,
    }),
    prisma.notification.count({ where: { userAlias: alias, read: false } }),
  ])

  return NextResponse.json({ notifications: notifs, unread })
}

// POST /api/v1/notifications — create (internal use / triggered by events)
export async function POST(req: NextRequest) {
  const { userAlias, type, title, body, link } = await req.json()
  if (!userAlias || !type || !title) return NextResponse.json({ error: 'missing fields' }, { status: 400 })

  const notif = await prisma.notification.create({
    data: { userAlias, type, title, body: body ?? '', link },
  })
  return NextResponse.json(notif, { status: 201 })
}
