'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { cvssBg, timeAgo } from '@/lib/utils'

interface CVE {
  id?:string; cveId:string; description:string; cvssScore:number
  severity:string; vendor?:string|null; product?:string|null
  affectedVersions:string[]; exploitableNow?:boolean; publishedAt:string
}

const SEVERITIES = ['ALL','CRITICAL','HIGH','MEDIUM','LOW']
const PER_PAGE = 20

export default function CVEPage() {
  const router = useRouter()
  const [cves,      setCves]      = useState<CVE[]>([])
  const [total,     setTotal]     = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [severity,  setSeverity]  = useState('ALL')
  const [exploitable,setExploitable]=useState(false)
  const [page,      setPage]      = useState(1)
  const searchRef = useRef<HTMLInputElement>(null)
  const [searchVal, setSearchVal] = useState('')
  const debounceRef = useRef<NodeJS.Timeout>()

  const fetchCVEs = useCallback(async (q: string, sev: string, exp: boolean, pg: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: String(PER_PAGE), page: String(pg) })
      if (sev !== 'ALL') params.set('severity', sev)
      if (exp)           params.set('exploitable', 'true')
      if (q)             params.set('q', q)

      const res  = await fetch(`/api/v1/cve?${params}`)
      const data = await res.json()
      const arr  = Array.isArray(data) ? data : (data.vulns ?? data.cves ?? [])
      setCves(arr)
      setTotal(data.total ?? arr.length)
    } catch { setCves([]) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchCVEs(searchVal, severity, exploitable, page)
    }, searchVal ? 400 : 0)
    return () => clearTimeout(debounceRef.current)
  }, [fetchCVEs, searchVal, severity, exploitable, page])

  // Severity counts from loaded data
  const counts = SEVERITIES.reduce((a,s) => {
    a[s] = s==='ALL' ? cves.length : cves.filter(c=>c.severity===s).length
    return a
  }, {} as Record<string,number>)

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">CVE <span className="text-accent">Tracker</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Live data from NVD API · CVSS v3.1 scoring · {total.toLocaleString()} CVEs loaded
          </p>
        </div>
        <button onClick={() => fetchCVEs(searchVal, severity, exploitable, page)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[11px] font-bold cursor-pointer transition-all"
          style={{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>
          ↻ SYNC NVD
        </button>
      </div>

      {/* Severity stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {SEVERITIES.filter(s=>s!=='ALL').map(s => {
          const n = cves.filter(c=>c.severity===s).length
          const colors:Record<string,string> = {CRITICAL:'#ff3a5c',HIGH:'#ff8c42',MEDIUM:'#ffd700',LOW:'#64748b'}
          return (
            <button key={s} onClick={()=>{setSeverity(s);setPage(1)}}
              className="glass px-3 py-2.5 text-left cursor-pointer transition-all hover:border-white/20"
              style={severity===s?{borderColor:colors[s]+'50',background:colors[s]+'10'}:{}}>
              <div className="font-mono text-xl font-bold" style={{color:colors[s]}}>{n}</div>
              <div className="font-mono text-[9px] text-slate-600 uppercase">{s}</div>
            </button>
          )
        })}
        <button onClick={()=>{setExploitable(v=>!v);setPage(1)}}
          className="glass px-3 py-2.5 text-left cursor-pointer transition-all hover:border-white/20"
          style={exploitable?{borderColor:'rgba(255,58,92,0.5)',background:'rgba(255,58,92,0.08)'}:{}}>
          <div className="font-mono text-xl font-bold text-red-400">{cves.filter(c=>c.exploitableNow).length}</div>
          <div className="font-mono text-[9px] text-slate-600 uppercase">Exploitable Now</div>
        </button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">

        {/* Filter sidebar */}
        <div className="glass p-4 space-y-4 h-fit">
          {/* Search — live NVD fetch */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Search NVD</label>
            <input
              ref={searchRef}
              value={searchVal}
              onChange={e => { setSearchVal(e.target.value); setPage(1) }}
              placeholder="Search CVE ID, product, vendor..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5
                         font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30
                         transition-colors placeholder-slate-700" />
            {searchVal && (
              <div className="font-mono text-[9px] text-accent mt-1">⟳ Fetching live from NVD API...</div>
            )}
          </div>

          {/* Severity filter */}
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Severity</div>
            {SEVERITIES.map(s => {
              const colors:Record<string,string> = {CRITICAL:'#ff3a5c',HIGH:'#ff8c42',MEDIUM:'#ffd700',LOW:'#64748b',ALL:'#00ffaa'}
              const n = s==='ALL' ? cves.length : cves.filter(c=>c.severity===s).length
              return (
                <button key={s} onClick={()=>{setSeverity(s);setPage(1)}}
                  className="w-full flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer transition-all mb-0.5"
                  style={{background:severity===s?colors[s]+'12':'transparent',borderLeft:severity===s?`3px solid ${colors[s]}`:'3px solid transparent'}}>
                  <span className="font-mono text-[11px]" style={{color:colors[s]}}>{s}</span>
                  <span className="font-mono text-[10px] text-slate-600">{n}</span>
                </button>
              )
            })}
          </div>

          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Filters</div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={exploitable} onChange={e=>{setExploitable(e.target.checked);setPage(1)}} className="accent-red-500 w-3.5 h-3.5" />
              <span className="font-mono text-[11px] text-slate-400">Exploitable Now</span>
            </label>
          </div>
        </div>

        {/* CVE table */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="live-dot"/>
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest">NVD Database</span>
              <span className="font-mono text-[10px] text-slate-600">{total.toLocaleString()} results</span>
            </div>
            <span className="font-mono text-[10px] text-slate-600">CVSS 6+</span>
          </div>

          {loading ? (
            <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Fetching from NVD API...</div>
          ) : cves.length === 0 ? (
            <div className="p-12 text-center font-mono text-[11px] text-slate-600">No CVEs found. Try a different search.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                    {['CVE ID','Description','CVSS','Severity','Published'].map(h=>(
                      <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cves.map(cve => (
                    <tr key={cve.cveId}
                      onClick={()=>router.push(`/cve/${encodeURIComponent(cve.cveId)}`)}
                      className="border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.03] transition-colors hover:border-accent/10">
                      <td className="px-4 py-3 font-mono text-[11px] font-bold text-accent2 whitespace-nowrap">{cve.cveId}</td>
                      <td className="px-4 py-3 text-[11px] text-slate-400 max-w-[280px]">
                        <div className="line-clamp-2">{cve.description}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-[2px] rounded border ${cvssBg(cve.cvssScore)}`}>
                          {cve.cvssScore.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[10px]" style={{color:cve.severity==='CRITICAL'?'#ff3a5c':cve.severity==='HIGH'?'#ff8c42':cve.severity==='MEDIUM'?'#ffd700':'#64748b'}}>
                          {cve.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-600 whitespace-nowrap">
                        {new Date(cve.publishedAt).toISOString().split('T')[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
              <span className="font-mono text-[11px] text-slate-600">
                Page {page} of {totalPages} · {total.toLocaleString()} total
              </span>
              <div className="flex items-center gap-1">
                <button disabled={page===1} onClick={()=>setPage(1)}
                  className="font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer transition-all">
                  «
                </button>
                <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
                  className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer transition-all">
                  ← PREV
                </button>
                {/* Page number pills */}
                {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
                  const pg = Math.max(1,Math.min(page-2,totalPages-4))+i
                  return (
                    <button key={pg} onClick={()=>setPage(pg)}
                      className="font-mono text-[10px] px-2.5 py-1.5 rounded border cursor-pointer transition-all"
                      style={pg===page?{borderColor:'rgba(0,255,170,0.3)',background:'rgba(0,255,170,0.1)',color:'#00ffaa'}:{borderColor:'rgba(255,255,255,0.08)',color:'#64748b'}}>
                      {pg}
                    </button>
                  )
                })}
                <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}
                  className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer transition-all">
                  NEXT →
                </button>
                <button disabled={page===totalPages} onClick={()=>setPage(totalPages)}
                  className="font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer transition-all">
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
