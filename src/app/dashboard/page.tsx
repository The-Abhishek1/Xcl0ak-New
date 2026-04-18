// src/app/dashboard/page.tsx
// FIXED:
// 1. Imports use correct function names (getThreatEvents, getLatestPulses)
// 2. fetchRecentCVEs called with correct signature (opts object, not positional args)
// 3. All data fetches have .catch(() => fallback) — dashboard never crashes on API failure
// 4. CVE count comes from DB cache (fast) not live NVD (slow)
// 5. Exploit query filters only approved exploits

import { fetchRecentCVEs }              from '@/lib/nvd'
import { getThreatEvents, getLatestPulses } from '@/lib/otx'
import { prisma }                        from '@/lib/prisma'
import { StatCards }                     from '@/components/layout/StatCards'
import { ThreatMapPanel }                from '@/components/map/ThreatMapPanel'
import { LiveFeed }                      from '@/components/layout/LiveFeed'
import { CVEStrip }                      from '@/components/cve/CVEStrip'
import { ExploitGrid }                   from '@/components/exploit/ExploitGrid'
import { AIPanel }                       from '@/components/ai/AIPanel'
import { Leaderboard }                   from '@/components/layout/Leaderboard'

export const metadata = { title: 'Dashboard — Xcloak' }

// Revalidate every 5 minutes — real data, not static
export const revalidate = 300

async function getDashboardData() {
  const [nvdResult, threats, pulses, exploits, exploitCount, cveCount] =
    await Promise.all([
      // NVD: last 7 days, 12 CVEs for the strip
      fetchRecentCVEs({ daysBack: 7, limit: 12 }).catch(() => ({ vulns: [], total: 0 })),

      // OTX: threat events for the globe map
      getThreatEvents(40).catch(() => []),

      // OTX: latest pulses for the live feed
      getLatestPulses(8).catch(() => []),

      // Prisma: top exploits by score (approved only)
      prisma.exploit.findMany({
        where:   { verified: true },
        orderBy: { score: 'desc' },
        take:    4,
        include: { _count: { select: { comments: true } } },
      }).catch(() => []),

      // Prisma: total exploit count
      prisma.exploit.count().catch(() => 0),

      // Prisma: CVEs synced in our local cache (fast — no network)
      prisma.cVECache.count().catch(() => 0),
    ])

  const cves        = nvdResult.vulns
  const critical    = cves.filter(c => c.severity === 'CRITICAL').length
  const exploitable = cves.filter(c => c.cvssScore >= 9.0).length

  return {
    cves,
    threats,
    pulses,
    exploits,
    exploitCount,
    cveCount,
    critical,
    exploitable,
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  return (
    <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">

      {/* ── Stat cards row ── */}
      <StatCards
        cveCount={data.cveCount}
        critical={data.critical}
        exploitable={data.exploitable}
        exploitCount={data.exploitCount}
        threatCount={data.threats.length}
        pulseCount={data.pulses.length}
      />

      {/* ── Threat map + live feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-3 sm:gap-4">
        <ThreatMapPanel events={data.threats} />
        <div className="hidden lg:block">
          <LiveFeed pulses={data.pulses} />
        </div>
      </div>

      {/* Live feed on mobile below map */}
      <div className="lg:hidden">
        <LiveFeed pulses={data.pulses} />
      </div>

      {/* ── CVE strip ── */}
      <CVEStrip cves={data.cves.slice(0, 6)} />

      {/* ── Exploits + AI + leaderboard ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-3 sm:gap-4">
        <ExploitGrid exploits={data.exploits} title="Trending Exploits" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
          <AIPanel />
          <Leaderboard />
        </div>
      </div>

    </div>
  )
}
