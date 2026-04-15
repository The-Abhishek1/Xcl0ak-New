import { NextRequest, NextResponse } from 'next/server'
import { prisma }          from '@/lib/prisma'
import { fetchRecentCVEs, searchCVEs, NVDVuln } from '@/lib/nvd'

export const revalidate = 3600

function toDBRecord(cve: NVDVuln) {
  const { references: _r, ...rest } = cve
  return { ...rest, exploitableNow: false, syncedAt: new Date() }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const severity    = searchParams.get('severity')?.toUpperCase()
  const exploitable = searchParams.get('exploitable') === 'true'
  const q           = searchParams.get('q')
  const limit       = Math.min(Number(searchParams.get('limit') ?? 20), 200)
  const page        = Math.max(Number(searchParams.get('page') ?? 1), 1)
  const skip        = (page - 1) * limit

  try {
    // Live NVD search — always fresh, paginates via NVD API
    if (q) {
      const vulns = await searchCVEs(q, limit)
      return NextResponse.json({ vulns, total: vulns.length, page: 1, pages: 1 })
    }

    const where: any = {}
    if (severity)    where.severity       = severity
    if (exploitable) where.exploitableNow = true

    let [cves, total] = await Promise.all([
      prisma.cVECache.findMany({ where, orderBy:{ cvssScore:'desc' }, take:limit, skip }),
      prisma.cVECache.count({ where }),
    ])

    // Seed DB from NVD if empty
    if (total === 0) {
      const { vulns } = await fetchRecentCVEs({ daysBack:30, limit:200 })
      for (const cve of vulns) {
        await prisma.cVECache.upsert({
          where:  { cveId: cve.cveId },
          create: toDBRecord(cve),
          update: toDBRecord(cve),
        }).catch(()=>null)
      }
      ;[cves, total] = await Promise.all([
        prisma.cVECache.findMany({ where, orderBy:{ cvssScore:'desc' }, take:limit, skip }),
        prisma.cVECache.count({ where }),
      ])
    }

    return NextResponse.json({ cves, total, page, pages: Math.ceil(total/limit) })
  } catch (err: any) {
    console.error('[CVE API]', err)
    return NextResponse.json({ error: err.message }, { status:500 })
  }
}
