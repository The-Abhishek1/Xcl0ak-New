import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'

// GET - public: only approved challenges
export async function GET() {
  const challenges = await prisma.cTFChallenge.findMany({
    where: {
      status: 'approved',
      OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
    },
    orderBy: { points: 'asc' },
    include: { _count: { select: { solves: true } } },
  })
  return NextResponse.json(challenges)
}

// POST - submit a new CTF challenge (goes to pending)
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, category, difficulty, description, flag, points, authorAlias, hints } = body

  if (!title || !category || !flag || !points || !authorAlias)
    return NextResponse.json({ error: 'title, category, flag, points, authorAlias required' }, { status: 400 })

  if (typeof flag !== 'string' || !flag.startsWith('xcloak{'))
    return NextResponse.json({ error: 'Flag must start with xcloak{' }, { status: 400 })

  const flagHash = createHash('sha256').update(flag.trim()).digest('hex')

  const challenge = await prisma.cTFChallenge.create({
    data: {
      title,
      category:    category.toLowerCase(),
      difficulty:  difficulty ?? 'medium',
      description,
      flagHash,
      points:      Number(points),
      authorAlias: authorAlias,
      hints:       Array.isArray(hints) ? hints.slice(0, 3) : [],
      status:      'pending',
    },
  })

  return NextResponse.json({
    id: challenge.id, status: 'pending',
    message: 'Challenge submitted for admin review. Goes live once approved.',
  }, { status: 201 })
}
