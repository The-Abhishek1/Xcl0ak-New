import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Called by cron every Sunday — ESO sends the actual emails
// XCloak just computes the stats and calls ESO's email endpoint
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  // Get all users from Prisma (community data)
  const users = await prisma.user.findMany({
    select: { alias: true, reputation: true },
    orderBy: { reputation: 'desc' },
  })

  // Get top CVEs this week
  const topCVEs = await prisma.cVECache.findMany({
    where:   { publishedAt: { gte: oneWeekAgo } },
    orderBy: { cvssScore: 'desc' },
    take:    3,
    select:  { cveId: true, cvssScore: true, severity: true },
  }).catch(() => [])

  const topCVELabels = topCVEs.map(c =>
    `${c.cveId} (CVSS ${c.cvssScore?.toFixed(1) ?? '?'} · ${c.severity?.toUpperCase() ?? '?'})`
  )

  let processed = 0
  const ESO = process.env.ESO_BACKEND_URL ?? 'http://localhost:8000'

  for (const [i, user] of users.entries()) {
    try {
      const [ctfSolves, exploitsUploaded] = await Promise.all([
        prisma.cTFSolve.count({
          where: { userAlias: user.alias, solvedAt: { gte: oneWeekAgo } },
        }).catch(() => 0),
        prisma.exploit.count({
          where: { authorAlias: user.alias, createdAt: { gte: oneWeekAgo } },
        }).catch(() => 0),
      ])

      // Call ESO to send the email (ESO has user emails)
      await fetch(`${ESO}/api/v1/auth/weekly-report`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json',
                   'x-cron-secret': process.env.CRON_SECRET ?? '' },
        body: JSON.stringify({
          alias:            user.alias,
          ctfSolves,
          exploitsUploaded,
          reputation:       user.reputation ?? 0,
          rank:             i + 1,
          topCVEs:          topCVELabels,
        }),
      }).catch(() => null)

      processed++
    } catch (e) {
      console.error('[weekly-report] failed for', user.alias, e)
    }
  }

  return NextResponse.json({ ok: true, processed, total: users.length })
}
