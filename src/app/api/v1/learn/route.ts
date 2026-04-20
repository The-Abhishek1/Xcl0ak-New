import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/v1/learn?status=approved&category=web&alias=xxx
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const status   = searchParams.get('status') ?? 'approved'
  const category = searchParams.get('category')
  const alias    = searchParams.get('alias')

  const where: any = { status }
  if (category && category !== 'all') where.category = category

  const paths = await prisma.learningPath.findMany({
    where,
    include: {
      modules: { orderBy: { order: 'asc' }, select: { id: true, title: true, type: true, order: true, xpReward: true } },
      enrollments: alias ? { where: { alias } } : false,
    },
    orderBy: { upvotes: 'desc' },
  })

  // Attach completion data if alias provided
  if (alias) {
    const completions = await prisma.learnCompletion.findMany({
      where: { alias },
      select: { moduleId: true },
    })
    const completedIds = new Set(completions.map((c: any) => c.moduleId))
    return NextResponse.json(paths.map((p: any) => ({
      ...p,
      enrolled: p.enrollments?.length > 0,
      completedModules: p.modules.filter((m: any) => completedIds.has(m.id)).length,
      enrollments: undefined,
    })))
  }

  return NextResponse.json(paths.map((p: any) => ({ ...p, enrolled: false, completedModules: 0, enrollments: undefined })))
}

// POST /api/v1/learn — submit new learning path
export async function POST(req: NextRequest) {
  const { title, description, category, difficulty, authorAlias, modules } = await req.json()

  if (!title || !authorAlias || !modules?.length) {
    return NextResponse.json({ error: 'title, authorAlias, and modules are required' }, { status: 400 })
  }
  if (modules.length < 2) {
    return NextResponse.json({ error: 'A learning path needs at least 2 modules' }, { status: 400 })
  }

  const path = await prisma.learningPath.create({
    data: {
      title: title.trim(),
      description: description?.trim() ?? '',
      category: category ?? 'web',
      difficulty: difficulty ?? 'beginner',
      authorAlias,
      status: 'pending',
      modules: {
        create: modules.map((m: any, i: number) => ({
          order:     i,
          title:     m.title.trim(),
          type:      m.type ?? 'read',
          content:   m.content ?? '',
          xpReward:  m.xpReward ?? 10,
        })),
      },
    },
    include: { modules: true },
  })

  // Notify author
  try {
    await prisma.notification.create({
      data: {
        userAlias: authorAlias,
        type:  'system',
        title: 'Learning Path Submitted',
        body:  `Your path "${title}" is under review. We'll notify you when it's approved.`,
        link:  '/learn',
      },
    })
  } catch {}

  return NextResponse.json(path, { status: 201 })
}
