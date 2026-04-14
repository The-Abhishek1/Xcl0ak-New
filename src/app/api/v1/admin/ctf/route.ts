import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

// GET /api/v1/admin/ctf?status=pending
export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const status = req.nextUrl.searchParams.get('status') ?? 'pending'

  const challenges = await prisma.cTFChallenge.findMany({
    where:   { status },
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { solves: true } } },
  })

  return NextResponse.json(challenges)
}
