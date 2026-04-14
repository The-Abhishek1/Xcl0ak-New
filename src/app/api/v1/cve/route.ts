import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { fetchRecentCVEs, searchCVEs, NVDVuln } from '@/lib/nvd'

export const revalidate = 3600

function toDBRecord(cve: NVDVuln) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { references: _r, ...rest } = cve
  return { ...rest, exploitableNow: false, syncedAt: new Date() }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const severity    = searchParams.get('severity')?.toUpperCase()
  const exploitable = searchParams.get('exploitable') === 'true'
  const q           = searchParams.get('q')
  const limit       = Math.min(Number(searchParams.get('limit') ?? 50), 200)

  try {
    if (q) {
      const vulns = await searchCVEs(q, limit)
      return NextResponse.json(vulns)
    }

    const where: any = {}
    if (severity)    where.severity       = severity
    if (exploitable) where.exploitableNow = true

    let cves = await prisma.cVECache.findMany({
      where, orderBy: { cvssScore: 'desc' }, take: limit,
    })

    if (cves.length === 0) {
      const { vulns } = await fetchRecentCVEs({ daysBack: 30, limit: 200 })
      for (const cve of vulns) {
        await prisma.cVECache.upsert({
          where:  { cveId: cve.cveId },
          create: toDBRecord(cve),
          update: toDBRecord(cve),
        }).catch(() => null)
      }
      cves = await prisma.cVECache.findMany({ where, orderBy: { cvssScore: 'desc' }, take: limit })
    }

    return NextResponse.json(cves)
  } catch (err: any) {
    console.error('[CVE API]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
