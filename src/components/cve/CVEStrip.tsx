import Link from 'next/link'
import { cvssBg, timeAgo } from '@/lib/utils'

interface CVE {
  cveId: string
  description: string
  cvssScore: number
  severity: string
  vendor?: string | null
  product?: string | null
  publishedAt: Date | string
}

interface Props { cves: CVE[] }

export function CVEStrip({ cves }: Props) {
  return (
    <div className="glass overflow-hidden animate-float-in-d2">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="live-dot live-dot-red" style={{ animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
          <span className="font-mono text-[11px] tracking-widest text-accent uppercase">
            Latest CVEs — NVD
          </span>
        </div>
        <Link href="/cve" className="font-mono text-[10px] text-slate-600 hover:text-accent2 transition-colors">
          FULL TRACKER →
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-2 p-3" style={{ scrollbarWidth: 'none' }}>
        {cves.map((cve) => (
          <Link key={cve.cveId} href={`/cve?q=${cve.cveId}`}
            className="shrink-0 w-[240px] p-3 rounded-lg border border-white/[0.06] hover:border-accent/20
                       transition-all duration-200 hover:-translate-y-0.5 cursor-pointer block"
            style={{ background: 'rgba(255,255,255,0.025)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] text-accent2 font-bold">{cve.cveId}</span>
              <span className={`font-mono text-[10px] font-bold px-2 py-[2px] rounded border ${cvssBg(cve.cvssScore)}`}>
                {cve.cvssScore.toFixed(1)}
              </span>
            </div>
            <div className="text-[11.5px] text-slate-300 leading-snug line-clamp-2 mb-2">
              {cve.description}
            </div>
            <div className="flex items-center gap-2">
              {cve.vendor && (
                <span className="font-mono text-[9px] text-slate-600">{cve.vendor}</span>
              )}
              <span className="font-mono text-[9px] text-slate-700 ml-auto">
                {timeAgo(cve.publishedAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
