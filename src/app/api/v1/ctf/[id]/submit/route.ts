import { notifyEvent } from '@/lib/notify'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { flag, userAlias } = await req.json()

  if (!flag || !userAlias) {
    return NextResponse.json({ error: 'flag and userAlias required' }, { status: 400 })
  }

  const challenge = await prisma.cTFChallenge.findUnique({ where: { id } })
  if (!challenge) return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })

  // Check expiry
  if (challenge.expiresAt && challenge.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Challenge expired', correct: false })
  }

  const submitted = createHash('sha256').update(flag.trim()).digest('hex')
  const correct   = submitted === challenge.flagHash

  if (correct) {
    // Record solve (idempotent)
    await prisma.cTFSolve.upsert({
      where:  { challengeId_userAlias: { challengeId: id, userAlias } },
      create: { challengeId: id, userAlias },
      update: {},
    }).catch(() => null)

    // Award reputation
    await prisma.user.upsert({
      where:  { alias: userAlias },
      create: { alias: userAlias, fp: userAlias, reputation: challenge.points },
      update: { reputation: { increment: challenge.points } },
    }).catch(() => null)

    // Fire notification + broadcast to ctf-help room
    await notifyEvent({
      userAlias,
      type: 'ctf_solve',
      title: `🏆 CTF Solved: ${challenge.title}`,
      body:  `You solved "${challenge.title}" for ${challenge.points} points!`,
      link:  '/ctf',
      broadcastRoom: 'ctf-help',
    }).catch(() => null)

    // Email sent via ESO internal callback (ESO has user emails, not Prisma)
  }

  return NextResponse.json({ correct, points: correct ? challenge.points : 0 })
}
