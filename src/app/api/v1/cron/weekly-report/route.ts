import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWeeklyReport } from '@/lib/email'

// Called by a cron job every Sunday
// Secure with CRON_SECRET env var
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  // Get all users with emails
  const users = await prisma.user.findMany({
    where: { email: { not: null } },
    select: { alias: true, email: true, reputation: true },
  })

  const allUsers = await prisma.user.findMany({
    select: { alias: true, reputation: true },
    orderBy: { reputation: 'desc' },
    take: 500,
  })

  // Get top CVEs from this week
  const topCVEs = await prisma.cVECache.findMany({
    where: { publishedAt: { gte: oneWeekAgo } },
    orderBy: { cvssScore: 'desc' },
    take: 3,
    select: { cveId: true, cvssScore: true, severity: true },
  }).catch(() => [])

  const topCVELabels = topCVEs.map(c => `${c.cveId} (CVSS ${c.cvssScore?.toFixed(1) ?? '?'} · ${c.severity?.toUpperCase() ?? '?'})`)

  let sent = 0
  for (const user of users) {
    if (!user.email) continue
    try {
      // Per-user stats for this week
      const [ctfSolves, exploitsUploaded] = await Promise.all([
        prisma.cTFSolve.count({
          where: { userAlias: user.alias, solvedAt: { gte: oneWeekAgo } },
        }).catch(() => 0),
        prisma.exploit.count({
          where: { authorAlias: user.alias, createdAt: { gte: oneWeekAgo } },
        }).catch(() => 0),
      ])

      const rank = allUsers.findIndex(u => u.alias === user.alias) + 1

      await sendWeeklyReport(user.email, user.alias, {
        scans:             0, // ESO tracks this — placeholder
        findings:          0,
        ctfSolves,
        exploitsUploaded,
        reputation:        user.reputation ?? 0,
        rank:              rank || 999,
        topCVEs:           topCVELabels,
      })
      sent++
    } catch (e) {
      console.error('[weekly-report] failed for', user.alias, e)
    }
  }

  return NextResponse.json({ ok: true, sent, total: users.length })
}
