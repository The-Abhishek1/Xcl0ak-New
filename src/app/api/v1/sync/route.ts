import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchRecentCVEs, NVDVuln } from '@/lib/nvd'
import { getSubscribedPulses, getLiveThreatPoints } from '@/lib/otx'

function toDBRecord(cve: NVDVuln) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { references: _r, ...rest } = cve
  return { ...rest, exploitableNow: false, syncedAt: new Date() }
}

export async function POST(_req: NextRequest) {
  const results: Record<string, any> = {}

  // 1. NVD CVEs
  try {
    const { vulns, total } = await fetchRecentCVEs({ daysBack: 30, limit: 200 })
    let upserted = 0
    for (const cve of vulns) {
      await prisma.cVECache.upsert({
        where:  { cveId: cve.cveId },
        create: toDBRecord(cve),
        update: toDBRecord(cve),
      }).catch(() => null)
      upserted++
    }
    results.cves = { fetched: vulns.length, total, upserted }
  } catch (err: any) { results.cves = { error: err.message } }

  // 2. OTX threat points
  try {
    const points = await getLiveThreatPoints()
    let created = 0
    for (const pt of points) {
      await prisma.threatEvent.create({
        data: {
          type: pt.type, srcCountry: pt.country, dstCountry: pt.country,
          srcLat: pt.lat, srcLng: pt.lng,
          dstLat: pt.lat + (Math.random() - 0.5) * 20,
          dstLng: pt.lng + (Math.random() - 0.5) * 20,
          severity: pt.severity, details: pt.label,
        },
      }).catch(() => null)
      created++
    }
    results.threats = { fetched: points.length, created }
  } catch (err: any) { results.threats = { error: err.message } }

  // 3. OTX news
  try {
    const pulses = await getSubscribedPulses(30)
    let newsCreated = 0
    for (const p of pulses) {
      const text = [...(p.tags ?? []), ...(p.malware_families ?? []), p.adversary ?? ''].join(' ').toLowerCase()
      const category = /ransomware/.test(text) ? 'malware' : /breach|leak/.test(text) ? 'breach' : /cve|exploit|vuln/.test(text) ? 'vulnerability' : 'threat'
      await prisma.newsArticle.upsert({
        where: { url: `https://otx.alienvault.com/pulse/${p.id}` },
        create: {
          title: p.name, url: `https://otx.alienvault.com/pulse/${p.id}`,
          source: `OTX · ${p.author_name}`, category,
          country: p.targeted_countries?.[0] ?? null,
          summary: p.description?.substring(0, 300) ?? '',
          publishedAt: new Date(p.created),
        },
        update: { title: p.name },
      }).catch(() => null)
      newsCreated++
    }
    results.news = { fetched: pulses.length, created: newsCreated }
  } catch (err: any) { results.news = { error: err.message } }

  return NextResponse.json({ ok: true, syncedAt: new Date().toISOString(), results })
}

export async function GET() {
  const [cveCount, threatCount, newsCount] = await Promise.all([
    prisma.cVECache.count(), prisma.threatEvent.count(), prisma.newsArticle.count(),
  ])
  const lastCVE = await prisma.cVECache.findFirst({ orderBy: { syncedAt: 'desc' } })
  return NextResponse.json({ cves: { count: cveCount, lastSync: lastCVE?.syncedAt }, threats: { count: threatCount }, news: { count: newsCount } })
}
