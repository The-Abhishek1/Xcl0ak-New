import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { fetchCVEById } from '@/lib/nvd'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cveId  = decodeURIComponent(id).toUpperCase()

  const cached = await prisma.cVECache.findUnique({ where:{ cveId } }).catch(()=>null)
  if (cached) return NextResponse.json(cached)

  try {
    const nvd = await fetchCVEById(cveId)
    if (!nvd) return NextResponse.json({ error:'not found' }, { status:404 })
    const { references, ...rest } = nvd
    await prisma.cVECache.upsert({
      where:  { cveId },
      create: { ...rest, exploitableNow:false, syncedAt:new Date() },
      update: { ...rest, syncedAt:new Date() },
    }).catch(()=>null)
    return NextResponse.json({ ...nvd })
  } catch {
    return NextResponse.json({ error:'not found' }, { status:404 })
  }
}
