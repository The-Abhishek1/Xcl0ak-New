import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getIdentity } from '@/lib/identity'

const VALID_ROOMS = ['general','cve-alerts','ctf-help','exploits','offtopic','pro-lounge']
const MAX_LEN     = 500
const RATE_LIMIT  = new Map<string, number>()  // alias → last msg timestamp

export async function GET(req: NextRequest) {
  const room   = req.nextUrl.searchParams.get('room') ?? 'general'
  const before = req.nextUrl.searchParams.get('before')  // cursor for older messages
  const limit  = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 50), 100)

  if (!VALID_ROOMS.includes(room)) return NextResponse.json({ error: 'Invalid room' }, { status: 400 })

  const msgs = await prisma.chatMessage.findMany({
    where:   { room, ...(before ? { createdAt: { lt: new Date(before) } } : {}) },
    orderBy: { createdAt: 'desc' },
    take:    limit,
  })

  return NextResponse.json({ messages: msgs.reverse() })
}

export async function POST(req: NextRequest) {
  const { room, content, alias, tier } = await req.json()

  if (!VALID_ROOMS.includes(room))           return NextResponse.json({ error: 'Invalid room' }, { status: 400 })
  if (!content?.trim())                      return NextResponse.json({ error: 'Empty message' }, { status: 400 })
  if (content.length > MAX_LEN)             return NextResponse.json({ error: 'Too long' }, { status: 400 })
  if (!alias)                                return NextResponse.json({ error: 'alias required' }, { status: 400 })

  // Rate limit: 1 message per 1.5s per alias
  const now  = Date.now()
  const last = RATE_LIMIT.get(alias) ?? 0
  if (now - last < 1500) return NextResponse.json({ error: 'Slow down' }, { status: 429 })
  RATE_LIMIT.set(alias, now)

  const msg = await prisma.chatMessage.create({
    data: { room, alias, tier: tier ?? 'free', content: content.trim() },
  })

  return NextResponse.json(msg, { status: 201 })
}
