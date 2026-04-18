// src/app/api/v1/admin/ctf/[id]/route.ts
// FIXED: added POST handler — admin page calls POST .../review
import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { createHash }   from 'crypto'

type Ctx = { params: Promise<{ id: string }> }

// POST /api/v1/admin/ctf/[id]/review
export async function POST(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id }                          = await params
  const { status, reviewNote, points, flag } = await req.json()

  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'status must be approved or rejected' }, { status: 400 })
  }

  const data: any = {
    status,
    reviewNote: reviewNote ?? null,
    reviewedBy: auth.alias,
    reviewedAt: new Date(),
  }
  if (status === 'approved') {
    if (points) data.points   = Number(points)
    if (flag)   data.flagHash = createHash('sha256').update(flag.trim()).digest('hex')
  }

  const challenge = await prisma.cTFChallenge.update({ where: { id }, data })

  if (status === 'approved' && challenge.authorAlias !== 'anonymous') {
    await prisma.user.upsert({
      where:  { alias: challenge.authorAlias },
      create: { alias: challenge.authorAlias, fp: challenge.authorAlias, reputation: 30, badges: [] },
      update: { reputation: { increment: 30 } },
    }).catch(() => null)
    await prisma.notification.create({
      data: {
        userAlias: challenge.authorAlias,
        type:  'system',
        title: 'CTF Challenge Approved!',
        body:  `Your challenge "${challenge.title}" is now live.`,
        link:  '/ctf',
      },
    }).catch(() => null)
  }

  return NextResponse.json({ ok: true, challenge })
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { id }  = await params
  const body    = await req.json()
  const status  = body.status ?? (body.action === 'approve' ? 'approved' : body.action === 'reject' ? 'rejected' : null)

  if (!status || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Provide status or action' }, { status: 400 })
  }

  const data: any = {
    status,
    reviewNote: body.note ?? body.reviewNote ?? null,
    reviewedBy: auth.alias,
    reviewedAt: new Date(),
  }
  if (status === 'approved') {
    if (body.points) data.points   = Number(body.points)
    if (body.flag)   data.flagHash = createHash('sha256').update(body.flag.trim()).digest('hex')
  }

  return NextResponse.json(await prisma.cTFChallenge.update({ where: { id }, data }))
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  const { id } = await params
  await prisma.cTFChallenge.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
