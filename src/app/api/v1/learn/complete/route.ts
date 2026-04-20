import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { moduleId, alias } = await req.json()
  if (!moduleId || !alias) return NextResponse.json({ error: 'moduleId and alias required' }, { status: 400 })
  try {
    // upsert = no crash if already completed
    const result = await prisma.learnCompletion.upsert({
      where:  { moduleId_alias: { moduleId, alias } },
      create: { moduleId, alias },
      update: {},
    })
    // Only award XP on first completion (check if record was just created)
    const mod = await prisma.learnModule.findUnique({ where: { id: moduleId } })
    const isNew = result.completedAt && (Date.now() - new Date(result.completedAt).getTime()) < 3000
    if (mod?.xpReward && isNew) {
      await prisma.user.updateMany({ where: { alias }, data: { reputation: { increment: mod.xpReward } } })
    }
    return NextResponse.json({ ok: true, xp: isNew ? (mod?.xpReward ?? 10) : 0 })
  } catch(e: any) {
    console.error('[complete]', e.message)
    return NextResponse.json({ ok: true, xp: 0 })
  }
}
