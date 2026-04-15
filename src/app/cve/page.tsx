'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { cvssBg, timeAgo } from '@/lib/utils'

interface CVE {
  id?: string
  cveId: string
  description: string
  cvssScore: number
  severity: string
  vendor?: string | null
  product?: string | null
  affectedVersions: string[]
  exploitableNow?: boolean
  publishedAt: string | Date
}

const SEVERITIES = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW']

export default function CVEPage() {
  const router = useRouter()
  const [cves, setCves]         = useState<CVE[]>([])
  const [total, setTotal]       = useState(0)
  const [loading, setLoading]   = useState(true)
  const [severity, setSeverity] = useState('ALL')
  const [exploitable, setExploitable] = useState(false)
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<CVE | null>(null)
  const [sort, setSort]         = useState<'cvss'|'date'>('cvss')
  const [syncing, setSyncing]   = useState(false)

  const fetchCVEs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: '100' })
      if (severity !== 'ALL') params.set('severity', severity)
      if (exploitable)        params.set('exploitable', 'true')
      if (search)             params.set('q', search)

      const res  = await fetch(`/api/v1/cve?${params}`)
      const data = await res.json()

      const arr: CVE[] = Array.isArray(data) ? data : []
      // Sort client-side
      arr.sort((a, b) => sort === 'cvss'
        ? b.cvssScore - a.cvssScore
        : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      setCves(arr)
      setTotal(arr.length)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [severity, exploitable, search, sort])

  useEffect(() => {
    const t = setTimeout(fetchCVEs, search ? 600 : 0)
    return () => clearTimeout(t)
  }, [fetchCVEs])

  async function syncNow() {
    setSyncing(true)
    await fetch('/api/v1/sync', { method: 'POST' })
    setSyncing(false)
    fetchCVEs()
  }

  const counts = {
    CRITICAL: cves.filter(c => c.severity === 'CRITICAL').length,
    HIGH:     cves.filter(c => c.severity === 'HIGH').length,
    MEDIUM:   cves.filter(c => c.severity === 'MEDIUM').length,
    LOW:      cves.filter(c => c.severity === 'LOW').length,
    exploitable: cves.filter(c => c.exploitableNow).length,
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black">CVE <span className="text-accent">Tracker</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Live data from NVD API · CVSS v3.1 scoring · {total} CVEs loaded
          </p>
        </div>
        <button onClick={syncNow} disabled={syncing}
          className="font-mono text-[11px] px-4 py-2 rounded-lg border border-accent/30
                     bg-accent/8 text-accent hover:bg-accent/15 transition-all disabled:opacity-50">
          {syncing ? '⟳ SYNCING NVD...' : '↻ SYNC NVD'}
        </button>
      </div>

      {/* Stat chips */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { label: 'Critical', count: counts.CRITICAL, color: '#ff3a5c' },
          { label: 'High',     count: counts.HIGH,     color: '#ff8c42' },
          { label: 'Medium',   count: counts.MEDIUM,   color: '#ffd700' },
          { label: 'Low',      count: counts.LOW,       color: '#64748b' },
          { label: 'Exploitable Now', count: counts.exploitable, color: '#ff3a5c', pulse: true },
        ].map(s => (
          <div key={s.label} className="glass-sm px-4 py-2.5 flex items-center gap-2">
            <span className="font-mono text-xl font-bold" style={{ color: s.color }}>{s.count}</span>
            <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[260px_1fr] gap-4">

        {/* Filter sidebar */}
        <div className="glass overflow-hidden h-fit sticky top-[72px]">
          {/* Search */}
          <div className="p-3 border-b border-white/[0.06]">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search CVE ID, product, vendor..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2
                         font-mono text-[11px] text-slate-300 outline-none placeholder-slate-700
                         focus:border-accent/30 transition-colors" />
          </div>

          {/* Severity filter */}
          <div className="p-3 border-b border-white/[0.06]">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Severity</div>
            {SEVERITIES.map(s => (
              <button key={s} onClick={() => setSeverity(s)}
                className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg mb-0.5
                            text-[12px] font-semibold transition-all duration-150
                            ${severity === s
                              ? 'text-accent border-l-2 border-accent'
                              : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'}`}
                style={severity === s ? { background: 'rgba(0,255,170,0.06)', paddingLeft: '8px' } : {}}>
                <span className={
                  s === 'CRITICAL' ? 'text-red-400' :
                  s === 'HIGH'     ? 'text-orange-400' :
                  s === 'MEDIUM'   ? 'text-yellow-400' : ''
                }>{s}</span>
                <span className="font-mono text-[9px] bg-white/[0.04] px-1.5 py-[1px] rounded text-slate-600">
                  {s === 'ALL' ? total : cves.filter(c => c.severity === s).length}
                </span>
              </button>
            ))}
          </div>

          {/* Special filters */}
          <div className="p-3">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Filters</div>
            <label className="flex items-center gap-2 cursor-pointer py-1">
              <input type="checkbox" checked={exploitable} onChange={e => setExploitable(e.target.checked)}
                className="accent-accent w-3 h-3" />
              <span className="text-[12px] text-slate-400">Exploitable Now</span>
            </label>
          </div>
        </div>

        {/* CVE Table */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="live-dot live-dot-red" />
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest">NVD Database</span>
              <span className="font-mono text-[10px] text-slate-600">{total} results</span>
            </div>
            <div className="flex gap-1">
              {(['cvss','date'] as const).map(s => (
                <button key={s} onClick={() => setSort(s)}
                  className={`font-mono text-[10px] px-2.5 py-1 rounded border transition-all
                    ${sort === s
                      ? 'border-accent/30 text-accent bg-accent/8'
                      : 'border-white/[0.08] text-slate-500 hover:text-slate-300'}`}>
                  {s === 'cvss' ? 'CVSS ↓' : 'DATE ↓'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">
              Fetching from NVD API...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.015)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['CVE ID','Description','Vendor / Product','CVSS','Status','Published'].map(h => (
                      <th key={h} className="font-mono text-[9px] tracking-widest text-slate-600 uppercase
                                             text-left px-4 py-2.5 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cves.map((cve) => (
                    <tr key={cve.cveId}
                      onClick={() => router.push(`/cve/${encodeURIComponent(cve.cveId)}`)}
                      className="border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.03] transition-colors hover:border-accent/10">
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] font-bold text-accent2">{cve.cveId}</span>
                      </td>
                      <td className="px-4 py-3 max-w-[300px]">
                        <div className="text-[12px] text-slate-300 truncate">{cve.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-mono text-[10px] text-slate-500">{cve.vendor ?? '—'}</div>
                        <div className="font-mono text-[9px] text-slate-700">{cve.product ?? ''}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[11px] font-bold px-2 py-[2px] rounded border ${cvssBg(cve.cvssScore)}`}>
                          {cve.cvssScore.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {cve.exploitableNow && (
                          <span className="font-mono text-[9px] px-1.5 py-[1px] rounded border
                                           bg-red-500/15 text-red-400 border-red-500/25
                                           animate-pulse whitespace-nowrap">
                            ● LIVE
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-600 whitespace-nowrap">
                        {timeAgo(cve.publishedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {cves.length === 0 && !loading && (
                <div className="p-12 text-center font-mono text-[11px] text-slate-600">
                  No CVEs match your filters. Try syncing or broadening the search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-[200]" onClick={() => setSelected(null)}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="absolute right-0 top-0 bottom-0 w-[520px] overflow-y-auto"
            style={{ background: 'rgba(8,13,23,0.97)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            onClick={e => e.stopPropagation()}>

            <div className="p-6 border-b border-white/[0.06]">
              <div className="font-mono text-[11px] text-accent2 font-bold mb-1">{selected.cveId}</div>
              <div className="text-lg font-bold leading-snug">{selected.description.substring(0, 120)}</div>
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 font-mono text-[11px] px-2 py-1 rounded border
                           border-white/[0.08] text-slate-500 hover:text-red-400 hover:border-red-500/30 transition-all">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* CVSS */}
              <div>
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">CVSS Score</div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-4xl font-bold" style={{ color: selected.cvssScore >= 9 ? '#ff3a5c' : selected.cvssScore >= 7 ? '#ff8c42' : '#ffd700' }}>
                    {selected.cvssScore.toFixed(1)}
                  </span>
                  <div>
                    <div className={`font-mono text-[11px] font-bold px-2 py-1 rounded border ${cvssBg(selected.cvssScore)}`}>
                      {selected.severity}
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-white/[0.06] rounded overflow-hidden">
                  <div className="h-full rounded transition-all duration-700"
                    style={{
                      width: `${(selected.cvssScore / 10) * 100}%`,
                      background: `linear-gradient(90deg, #ffd700, #ff8c42, #ff3a5c)`,
                    }} />
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Description</div>
                <p className="text-[13px] text-slate-300 leading-relaxed">{selected.description}</p>
              </div>

              {/* Affected */}
              {selected.affectedVersions?.length > 0 && (
                <div>
                  <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Affected Versions</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.affectedVersions.slice(0, 8).map((v, i) => (
                      <span key={i} className="font-mono text-[9px] px-1.5 py-[2px] rounded border
                                               bg-red-500/10 text-red-400 border-red-500/20">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* NVD link */}
              <a href={`https://nvd.nist.gov/vuln/detail/${selected.cveId}`}
                target="_blank" rel="noreferrer"
                className="block w-full text-center font-mono text-[12px] font-bold py-3 rounded-lg border
                           border-accent2/30 bg-accent2/8 text-accent2 hover:bg-accent2/15 transition-all">
                VIEW ON NVD ↗
              </a>

              {/* OTX threat intel */}
              <a href={`https://otx.alienvault.com/indicator/cve/${selected.cveId}`}
                target="_blank" rel="noreferrer"
                className="block w-full text-center font-mono text-[12px] font-bold py-3 rounded-lg border
                           border-orange-500/30 bg-orange-500/8 text-orange-400 hover:bg-orange-500/15 transition-all">
                OTX THREAT INTEL ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
