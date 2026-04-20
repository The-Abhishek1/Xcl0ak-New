import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import { sendEmail, templates } from '@/lib/email'

type Ctx = { params: Promise<{ id: string }> }

async function getUserEmail(alias: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.ESO_API_URL ?? 'http://localhost:8000'}/api/v1/admin/users?search=${alias}`, {
      headers: { 'X-Internal': 'true' },
    })
    if (res.ok) {
      const d = await res.json()
      const user = (d.users ?? []).find((u: any) => u.username === alias)
      return user?.email ?? null
    }
  } catch {}
  return null
}

export async function POST(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  const { id }                 = await params
  const { status, reviewNote } = await req.json()
  if (!['approved','rejected'].includes(status))
    return NextResponse.json({ error: 'status must be approved or rejected' }, { status: 400 })

  const challenge = await prisma.cTFChallenge.update({
    where: { id },
    data: { status, reviewNote: reviewNote ?? null, reviewedBy: auth.alias, reviewedAt: new Date() },
  })

  // DB notification
  await prisma.notification.create({
    data: {
      userAlias: challenge.authorAlias ?? 'anonymous',
      type: 'system',
      title: status === 'approved' ? '✅ CTF Challenge Approved!' : '❌ CTF Challenge Rejected',
      body: status === 'approved'
        ? `Your challenge "${challenge.title}" is now live.`
        : `Your challenge "${challenge.title}" was not approved. ${reviewNote ?? ''}`,
      link: '/ctf',
    },
  }).catch(() => null)

  // Email
  if (challenge.authorAlias && challenge.authorAlias !== 'anonymous') {
    const email = await getUserEmail(challenge.authorAlias)
    if (email && status === 'approved') {
      await sendEmail({ to: email, ...templates.ctfApproved(challenge.authorAlias, challenge.title) }).catch(() => null)
    }
  }

  return NextResponse.json({ ok: true, challenge })
}

export async function PATCH(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  const { id }  = await params
  const body    = await req.json()
  const status  = body.status ?? (body.action === 'approve' ? 'approved' : 'rejected')
  const challenge = await prisma.cTFChallenge.update({
    where: { id },
    data: { status, reviewNote: body.note ?? null, reviewedBy: auth.alias, reviewedAt: new Date() },
  })
  return NextResponse.json(challenge)
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth
  const { id } = await params
  await prisma.cTFChallenge.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
