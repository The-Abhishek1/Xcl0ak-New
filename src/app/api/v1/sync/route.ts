// src/app/api/v1/sync/route.ts
// FIXED: ThreatEvent.create uses correct fields that match Prisma schema
// Old code passed ThreatMapPoint shape (lat/lng) but schema needs srcLat/srcLng/dstLat/dstLng

import { NextRequest, NextResponse } from 'next/server'
import { prisma }                    from '@/lib/prisma'
import { fetchRecentCVEs }           from '@/lib/nvd'
import { getThreatEvents }           from '@/lib/otx'

export const runtime = 'nodejs'

// POST /api/v1/sync — manually trigger a full data sync (Topbar SYNC button)
export async function POST(_req: NextRequest) {
  const results: Record<string, any> = {}

  // 1. Sync CVEs from NVD → CVECache table
  try {
    console.log('[Sync] Fetching CVEs from NVD...')
    const { vulns } = await fetchRecentCVEs({ daysBack: 30, limit: 200 })
    let upserted = 0

    for (const cve of vulns) {
      try {
        await prisma.cVECache.upsert({
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
            description:      cve.description,
            cvssScore:        cve.cvssScore,
            severity:         cve.severity,
            patchAvailable:   cve.patchAvailable,
            modifiedAt:       cve.modifiedAt,
            syncedAt:         new Date(),
          },
        })
        upserted++
      } catch { /* skip duplicates */ }
    }

    results.cves = { fetched: vulns.length, upserted }
  } catch (err: any) {
    console.error('[Sync] CVE error:', err)
    results.cves = { error: err.message }
  }

  // 2. Sync threat events from OTX → ThreatEvent table
  try {
    console.log('[Sync] Fetching threat events from OTX...')
    const events = await getThreatEvents(50)
    let created = 0

    for (const ev of events) {
      try {
        await prisma.threatEvent.create({
          data: {
            type:       ev.type,
            srcCountry: ev.srcCountry,
            dstCountry: ev.dstCountry,
            srcLat:     ev.srcLat,
            srcLng:     ev.srcLng,
            dstLat:     ev.dstLat,
            dstLng:     ev.dstLng,
            severity:   ev.severity,
            details:    ev.details,
            sourceUrl:  ev.sourceUrl,
          },
        })
        created++
      } catch { /* skip duplicates */ }
    }

    results.threats = { fetched: events.length, created }
  } catch (err: any) {
    console.error('[Sync] Threat error:', err)
    results.threats = { error: err.message }
  }

  return NextResponse.json({
    ok:       true,
    syncedAt: new Date().toISOString(),
    results,
  })
}

// GET /api/v1/sync — sync status
export async function GET() {
  const [cveCount, threatCount] = await Promise.all([
    prisma.cVECache.count(),
    prisma.threatEvent.count(),
  ])

  const [lastCVE, lastThreat] = await Promise.all([
    prisma.cVECache.findFirst({ orderBy: { syncedAt: 'desc' } }),
    prisma.threatEvent.findFirst({ orderBy: { createdAt: 'desc' } }),
  ])

  return NextResponse.json({
    cves:    { count: cveCount,    lastSync: lastCVE?.syncedAt ?? null },
    threats: { count: threatCount, lastSync: lastThreat?.createdAt ?? null },
  })
}
