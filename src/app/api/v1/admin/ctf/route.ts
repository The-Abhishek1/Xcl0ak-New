// src/app/api/v1/admin/ctf/route.ts
// FIXED: returns { challenges: [], total } — admin page does r.challenges
import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const status = req.nextUrl.searchParams.get('status') ?? 'pending'
  const limit  = Math.min(Number(req.nextUrl.searchParams.get('limit') ?? 50), 200)

  const [challenges, total] = await Promise.all([
    prisma.cTFChallenge.findMany({
      where:   { status },
      orderBy: { createdAt: 'desc' },
      take:    limit,
      include: { _count: { select: { solves: true } } },
    }),
    prisma.cTFChallenge.count({ where: { status } }),
  ])

  return NextResponse.json({ challenges, total, status })
}
