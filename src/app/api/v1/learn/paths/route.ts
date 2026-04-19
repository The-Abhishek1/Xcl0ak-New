import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

// GET — list all pending/approved learning paths
export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') ?? 'approved'
  const paths  = await (prisma as any).learningPath?.findMany({
    where:   { status },
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])
  return NextResponse.json({ paths: paths ?? [] })
}

// POST — submit a new learning path
export async function POST(req: NextRequest) {
  const { title, description, modules, authorAlias, difficulty, category } = await req.json()
  if (!title || !modules?.length || !authorAlias) {
    return NextResponse.json({ error: 'title, modules, and authorAlias required' }, { status: 400 })
  }

  // Store in Notification table as pending review (reuses existing infra)
  // until LearningPath model is added to schema
  await prisma.notification.create({
    data: {
      userAlias: 'admin',
      type:  'system',
      title: `📚 New Learning Path: ${title}`,
      body:  `From ${authorAlias} · ${modules.length} modules · ${difficulty ?? 'intermediate'} · ${category ?? 'general'}\n\n${description ?? ''}`,
      link:  '/admin',
    }
  }).catch(() => null)

  // Notify the author
  await prisma.notification.create({
    data: {
      userAlias: authorAlias,
      type:  'system',
      title: 'Learning Path Submitted',
      body:  `Your path "${title}" is under review. We'll notify you when it's approved.`,
      link:  '/learn',
    }
  }).catch(() => null)

  return NextResponse.json({ ok: true, message: 'Learning path submitted for review' }, { status: 201 })
}
