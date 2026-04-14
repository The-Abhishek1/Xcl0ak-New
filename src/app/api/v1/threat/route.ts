import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSubscribedPulses, getLiveThreatPoints } from '@/lib/otx'

export const revalidate = 300

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const view  = searchParams.get('view') ?? 'events'
  const limit = Math.min(Number(searchParams.get('limit') ?? 50), 100)

  try {
    if (view === 'pulses') {
      const pulses = await getSubscribedPulses(limit)
      return NextResponse.json(pulses)
    }

    if (view === 'stats') {
      const [totalEvents, critical] = await Promise.all([
        prisma.threatEvent.count(),
        prisma.threatEvent.count({ where: { severity: { gte: 4 } } }),
      ])
      // Extract CVE IDs mentioned in recent pulses
      const pulses = await getSubscribedPulses(30)
      const cveSet = new Set<string>()
      for (const p of pulses) {
        for (const tag of p.tags ?? []) {
          if (/^CVE-\d{4}-\d+$/i.test(tag)) cveSet.add(tag.toUpperCase())
        }
        const matches = (p.description ?? '').match(/CVE-\d{4}-\d+/gi) ?? []
        matches.forEach((m: string) => cveSet.add(m.toUpperCase()))
      }
      return NextResponse.json({
        total: totalEvents,
        critical,
        activeCVEs: cveSet.size,
        cveIds: [...cveSet].slice(0, 10),
      })
    }

    // Default: threat map points
    const dbEvents = await prisma.threatEvent.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 24 * 3600_000) } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    if (dbEvents.length >= 10) return NextResponse.json(dbEvents)

    // Fetch fresh from OTX and persist
    const points = await getLiveThreatPoints()
    for (const pt of points) {
      await prisma.threatEvent.create({
        data: {
          type:       pt.type,
          srcCountry: pt.country,
          dstCountry: pt.country,
          srcLat:     pt.lat,
          srcLng:     pt.lng,
          dstLat:     pt.lat + (Math.random() - 0.5) * 20,
          dstLng:     pt.lng + (Math.random() - 0.5) * 20,
          severity:   pt.severity,
          details:    pt.label,
        },
      }).catch(() => null)
    }
    return NextResponse.json(points.map(pt => ({
      type: pt.type, srcCountry: pt.country, dstCountry: pt.country,
      srcLat: pt.lat, srcLng: pt.lng,
      dstLat: pt.lat + (Math.random() - 0.5) * 20,
      dstLng: pt.lng + (Math.random() - 0.5) * 20,
      severity: pt.severity, details: pt.label,
    })))
  } catch (err: any) {
    console.error('[Threat API]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
