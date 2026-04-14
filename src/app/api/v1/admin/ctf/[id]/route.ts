import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

// PATCH /api/v1/admin/ctf/[id]
// body: { action: 'approve'|'reject', note?, points?, flag? }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  const { action, note, points, flag } = await req.json()

  if (!['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'action must be approve or reject' }, { status: 400 })
  }

  const updateData: any = {
    status:     action === 'approve' ? 'approved' : 'rejected',
    reviewNote: note ?? null,
    reviewedBy: auth.alias,
    reviewedAt: new Date(),
  }

  // Admin can adjust points or reset flag hash on approval
  if (action === 'approve') {
    if (points) updateData.points = Number(points)
    if (flag) {
      const { createHash } = await import('crypto')
      updateData.flagHash = createHash('sha256').update(flag.trim()).digest('hex')
    }
  }

  const challenge = await prisma.cTFChallenge.update({ where: { id }, data: updateData })

  // Award rep to author
  if (action === 'approve' && challenge.authorAlias !== 'anonymous') {
    await prisma.user.upsert({
      where:  { alias: challenge.authorAlias },
      create: { alias: challenge.authorAlias, fp: challenge.authorAlias, reputation: 30 },
      update: { reputation: { increment: 30 } },
    }).catch(() => null)
  }

  return NextResponse.json(challenge)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id } = await params
  await prisma.cTFChallenge.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
