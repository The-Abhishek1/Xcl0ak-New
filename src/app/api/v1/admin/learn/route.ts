import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, templates } from '@/lib/email'

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

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') ?? 'pending'
  const paths = await prisma.learningPath.findMany({
    where: { status },
    include: { modules: { orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(paths)
}

export async function PATCH(req: NextRequest) {
  const { id, action, reviewNote, reviewedBy } = await req.json()
  if (!id || !action) return NextResponse.json({ error: 'id and action required' }, { status: 400 })
  const status = action === 'approve' ? 'approved' : 'rejected'

  const path = await prisma.learningPath.update({
    where: { id },
    data: { status, reviewNote, reviewedBy, reviewedAt: new Date() },
  })

  // DB notification
  await prisma.notification.create({
    data: {
      userAlias: path.authorAlias,
      type: 'system',
      title: status === 'approved' ? '🎉 Learning Path Approved!' : 'Learning Path Not Approved',
      body: status === 'approved'
        ? `Your path "${path.title}" is now live on XCloak!`
        : `Your path "${path.title}" was not approved. ${reviewNote ?? ''}`,
      link: '/learn',
    },
  }).catch(() => null)

  // Email notification
  const email = await getUserEmail(path.authorAlias)
  if (email) {
    const tpl = status === 'approved'
      ? templates.learningPathApproved(path.authorAlias, path.title)
      : templates.learningPathRejected(path.authorAlias, path.title, reviewNote ?? '')
    await sendEmail({ to: email, ...tpl }).catch(() => null)
  }

  return NextResponse.json(path)
}
