import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/v1/learn/enroll
export async function POST(req: NextRequest) {
  const { pathId, alias } = await req.json()
  if (!pathId || !alias) return NextResponse.json({ error: 'pathId and alias required' }, { status: 400 })
  try {
    await prisma.learnEnroll.create({ data: { pathId, alias } })
    await prisma.learningPath.update({ where: { id: pathId }, data: { views: { increment: 1 } } })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: true }) } // already enrolled = ok
}
