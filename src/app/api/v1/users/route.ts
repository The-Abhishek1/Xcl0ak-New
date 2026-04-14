import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/v1/users?view=leaderboard OR ?alias=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const view  = searchParams.get('view')
  const alias = searchParams.get('alias')

  if (view === 'leaderboard') {
    const users = await prisma.user.findMany({
      orderBy: { reputation: 'desc' },
      take: 50,
      select: { id: true, alias: true, reputation: true, badges: true, createdAt: true },
    })
    return NextResponse.json(users.map((u, i) => ({ rank: i + 1, ...u })))
  }

  if (alias) {
    const user = await prisma.user.findUnique({ where: { alias } })
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(user)
  }

  return NextResponse.json({ error: 'Provide view=leaderboard or alias=xxx' }, { status: 400 })
}

// POST /api/v1/users — create or return existing user by fingerprint
export async function POST(req: NextRequest) {
  const { alias, fp } = await req.json()

  if (!alias || !fp) {
    return NextResponse.json({ error: 'alias and fp required' }, { status: 400 })
  }

  // Upsert by fingerprint
  const user = await prisma.user.upsert({
    where:  { fp },
    create: { alias, fp },
    update: { alias },  // allow alias updates
  })

  return NextResponse.json(user, { status: 200 })
}

// PATCH /api/v1/users — add reputation points
export async function PATCH(req: NextRequest) {
  const { alias, points } = await req.json()

  if (!alias || typeof points !== 'number') {
    return NextResponse.json({ error: 'alias and points required' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { alias },
    data:  { reputation: { increment: points } },
  })

  // Auto-badge logic
  const newBadges: string[] = []
  const BADGE_THRESHOLDS = [
    { id: 'first_blood', threshold: 1,    label: '🩸 First Blood' },
    { id: 'centurion',   threshold: 100,   label: '⚔ Centurion' },
    { id: 'elite',       threshold: 1000,  label: '💎 Elite' },
    { id: 'legend',      threshold: 10000, label: '🏆 Legend' },
  ]
  for (const badge of BADGE_THRESHOLDS) {
    if (user.reputation >= badge.threshold && !user.badges.includes(badge.id)) {
      newBadges.push(badge.id)
    }
  }
  if (newBadges.length > 0) {
    await prisma.user.update({
      where: { alias },
      data:  { badges: { push: newBadges } },
    })
  }

  return NextResponse.json({ reputation: user.reputation, newBadges })
}
