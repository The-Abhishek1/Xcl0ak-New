import { fetchRecentCVEs } from '@/lib/nvd'
import { getSubscribedPulses, getLiveThreatPoints } from '@/lib/otx'
import { prisma } from '@/lib/prisma'
import { StatCards }      from '@/components/layout/StatCards'
import { ThreatMapPanel } from '@/components/map/ThreatMapPanel'
import { LiveFeed }       from '@/components/layout/LiveFeed'
import { CVEStrip }       from '@/components/cve/CVEStrip'
import { ExploitGrid }    from '@/components/exploit/ExploitGrid'
import { AIPanel }        from '@/components/ai/AIPanel'
import { Leaderboard }    from '@/components/layout/Leaderboard'

export const metadata = { title:'Dashboard' }
export const revalidate = 300

async function getData() {
  const [nvd, pulses, threatPoints, exploits, exploitCount, cveCount] = await Promise.all([
    fetchRecentCVEs({ daysBack:7, limit:12 }).catch(()=>({ vulns:[], total:0 })),
    getSubscribedPulses(10).catch(()=>[]),
    getLiveThreatPoints().catch(()=>[]),
    prisma.exploit.findMany({
      where:   { status:'approved' },
      orderBy: { score:'desc' },
      take:    4,
      include: { _count:{ select:{ comments:true } } },
    }).catch(()=>[]),
    prisma.exploit.count({ where:{ status:'approved' } }).catch(()=>0),
    prisma.cVECache.count().catch(()=>0),
  ])
  const cves        = nvd.vulns
  const critical    = cves.filter(c=>c.severity==='CRITICAL').length
  const exploitable = cves.filter(c=>c.cvssScore>=9.0).length
  return { cves, pulses, threatPoints, exploits, exploitCount, cveCount, critical, exploitable }
}

export default async function DashboardPage() {
  const d = await getData()
  return (
    <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">

      {/* Stats — 2 cols mobile → 3 tablet → 6 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {[
          { label:'Critical CVEs',   value:d.critical,              color:'#ff3a5c' },
          { label:'Exploitable Now', value:d.exploitable,           color:'#ff3a5c' },
          { label:'CVEs in DB',      value:d.cveCount,              color:'#ff8c42' },
          { label:'Active Exploits', value:d.exploitCount,          color:'#ffd700' },
          { label:'Threat Events',   value:d.threatPoints.length,   color:'#00ffaa' },
          { label:'OTX Pulses',      value:d.pulses.length,         color:'#00aaff' },
        ].map((c,i) => (
          <div key={i} className="glass px-3 sm:px-4 py-3 relative overflow-hidden animate-fin" style={{animationDelay:`${i*0.05}s`}}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${c.color},transparent)`}}/>
            <div className="font-mono text-[8px] sm:text-[9px] tracking-widest text-slate-600 uppercase mb-1">{c.label}</div>
            <div className="font-mono text-xl sm:text-2xl font-bold" style={{color:c.color}}>{c.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* Threat map + live feed */}
      {/* Mobile: stacked. Desktop: side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-3 sm:gap-4">
        <ThreatMapPanel points={d.threatPoints} />
        <div className="hidden lg:block">
          <LiveFeed pulses={d.pulses} />
        </div>
      </div>

      {/* Live feed on mobile (below map) */}
      <div className="lg:hidden">
        <LiveFeed pulses={d.pulses} />
      </div>

      {/* CVE strip */}
      <CVEStrip cves={d.cves.slice(0,6)} />

      {/* Exploits + AI + Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-3 sm:gap-4">
        <ExploitGrid exploits={d.exploits} title="Trending Exploits" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
          <AIPanel />
          <Leaderboard />
        </div>
      </div>

    </div>
  )
}
