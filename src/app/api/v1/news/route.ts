import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSubscribedPulses } from '@/lib/otx'

export const revalidate = 600

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category')
  const limit    = Math.min(Number(searchParams.get('limit') ?? 30), 100)

  try {
    const where: any = {}
    if (category && category !== 'all') where.category = category

    let news = await prisma.newsArticle.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    })

    if (news.length === 0) {
      const pulses = await getSubscribedPulses(30)
      for (const p of pulses) {
        const text = [...(p.tags ?? []), ...(p.malware_families ?? []), p.adversary ?? ''].join(' ').toLowerCase()
        const cat =
          /ransomware/.test(text) ? 'malware' :
          /breach|leak/.test(text) ? 'breach' :
          /cve|exploit|vuln/.test(text) ? 'vulnerability' : 'threat'

        await prisma.newsArticle.upsert({
          where: { url: `https://otx.alienvault.com/pulse/${p.id}` },
          create: {
            title: p.name,
            url:   `https://otx.alienvault.com/pulse/${p.id}`,
            source: `OTX · ${p.author_name}`,
            category: cat,
            country: p.targeted_countries?.[0] ?? null,
            summary: p.description?.substring(0, 300) ?? '',
            publishedAt: new Date(p.created),
          },
          update: {},
        }).catch(() => null)
      }

      news = await prisma.newsArticle.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        take: limit,
      })
    }

    return NextResponse.json(news)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
