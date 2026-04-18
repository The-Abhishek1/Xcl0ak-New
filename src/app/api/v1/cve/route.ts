// src/app/api/v1/cve/route.ts
// FIXED: fetchRecentCVEs called with opts object not positional args
import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'
import { fetchRecentCVEs, searchCVEs } from '@/lib/nvd'

export const revalidate = 3600

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const severity    = searchParams.get('severity')?.toUpperCase()
  const exploitable = searchParams.get('exploitable') === 'true'
  const q           = searchParams.get('q')
  const limit       = Math.min(Number(searchParams.get('limit') ?? 50), 200)

  try {
    // Search query → hit NVD directly
    if (q) {
      const results = await searchCVEs(q, limit)
      return NextResponse.json(results)
    }

    // Serve from Postgres cache
    const where: any = {}
    if (severity)    where.severity       = severity
    if (exploitable) where.exploitableNow = true

    let cves = await prisma.cVECache.findMany({
      where,
      orderBy: { cvssScore: 'desc' },
      take: limit,
    })

    // Bootstrap cache if empty — FIXED: use opts object not positional
    if (cves.length === 0) {
      console.log('[CVE] Cache empty, fetching from NVD...')
      const { vulns: fresh } = await fetchRecentCVEs({ daysBack: 30, limit: 200 })
      await Promise.all(
        fresh.map(cve =>
          prisma.cVECache.upsert({
            where:  { cveId: cve.cveId },
            create: {
              cveId:            cve.cveId,
              description:      cve.description,
              cvssScore:        cve.cvssScore,
              cvssVector:       cve.cvssVector,
              severity:         cve.severity,
              vendor:           cve.vendor,
              product:          cve.product,
              affectedVersions: cve.affectedVersions,
              patchAvailable:   cve.patchAvailable,
              publishedAt:      cve.publishedAt,
              modifiedAt:       cve.modifiedAt,
              syncedAt:         new Date(),
            },
            update: {
              cvssScore:    cve.cvssScore,
              severity:     cve.severity,
              modifiedAt:   cve.modifiedAt,
              syncedAt:     new Date(),
            },
          }).catch(() => null)
        )
      )
      cves = await prisma.cVECache.findMany({
        where,
        orderBy: { cvssScore: 'desc' },
        take: limit,
      })
    }

    return NextResponse.json(cves)
  } catch (err: any) {
    console.error('[CVE API]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
