import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/v1/learn/module?id=xxx&alias=yyy
export async function GET(req: NextRequest) {
  const moduleId = req.nextUrl.searchParams.get('id')
  const alias    = req.nextUrl.searchParams.get('alias')
  if (!moduleId) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const mod = await prisma.learnModule.findUnique({
    where: { id: moduleId },
    include: { path: { select: { id:true, title:true, authorAlias:true, modules: { orderBy:{ order:'asc' }, select:{ id:true, title:true, type:true, order:true } } } } },
  })
  if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 })

  // Check completion
  let completed = false
  if (alias) {
    const c = await prisma.learnCompletion.findUnique({ where: { moduleId_alias: { moduleId, alias } } })
    completed = !!c
  }

  // Increment path views
  await prisma.learningPath.update({ where: { id: mod.pathId }, data: { views: { increment: 1 } } }).catch(() => null)

  return NextResponse.json({ ...mod, completed })
}

// PATCH /api/v1/learn/module — update module content (author/admin only)
export async function PATCH(req: NextRequest) {
  const { id, content, title, type } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const mod = await prisma.learnModule.update({
    where: { id },
    data: { ...(content !== undefined && { content }), ...(title && { title }), ...(type && { type }) },
  })
  return NextResponse.json(mod)
}
