'use client'
import { useEffect, useState } from 'react'
import { esoApi } from '@/lib/eso/api'
import Link from 'next/link'

const SEV_COLOR: Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff', info:'#64748b' }
const SEV_BG_BAR: Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff', info:'#334155' }

export default function AttackSurfacePage() {
  const [data, setData]     = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ esoApi.get('/attack-surface/').then(setData).catch(()=>{}).finally(()=>setLoading(false)) },[])

  if (loading) return <div className="p-5 font-mono text-[11px] text-slate-600 animate-pulse">Loading attack surface...</div>
  if (!data)   return <div className="p-5 text-center"><div className="font-mono text-[13px] text-slate-600 mb-3">No data yet</div><Link href="/scan/new" className="font-mono text-[11px] text-accent hover:underline">Run a scan to populate →</Link></div>

  const s   = data.summary || {}
  const sev = s.severity_breakdown || {}
  const total = s.total_findings || 0

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Attack <span className="text-accent">Surface</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">Aggregated security posture across all scanned assets</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {label:'Assets',       val:s.total_assets||0,                          color:'#00aaff'},
          {label:'Total Scans',  val:s.total_scans||0,                           color:'#a78bfa'},
          {label:'Findings',     val:total,                                       color:'#ffd700'},
          {label:'Critical+High',val:(sev.critical||0)+(sev.high||0),            color:'#ff3a5c'},
        ].map((st,i)=>(
          <div key={i} className="glass px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${st.color}40,transparent)`}}/>
            <div className="font-mono text-2xl font-bold" style={{color:st.color}}>{st.val}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-1">{st.label}</div>
          </div>
        ))}
      </div>

      {/* Severity bar */}
      {total>0&&(
        <div className="glass p-4 mb-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Severity Distribution</div>
          <div className="flex h-6 rounded-lg overflow-hidden gap-0.5 mb-3">
            {['critical','high','medium','low','info'].map(sv=>{
              const count=sev[sv]||0; if(!count) return null
              const pct=total>0?(count/total*100):0
              return <div key={sv} className="transition-all" style={{width:`${Math.max(pct,2)}%`,background:SEV_BG_BAR[sv]}} title={`${sv}: ${count}`}/>
            })}
          </div>
          <div className="flex flex-wrap gap-4">
            {['critical','high','medium','low','info'].map(sv=>(
              <div key={sv} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{background:SEV_BG_BAR[sv]}}/>
                <span className="font-mono text-[10px] text-slate-500 capitalize">{sv}</span>
                <span className="font-mono text-[10px] font-bold" style={{color:SEV_COLOR[sv]}}>{sev[sv]||0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Open ports */}
        <div className="glass overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-accent2 uppercase tracking-widest">Open Ports</span>
          </div>
          {!(data.open_ports?.length) ? (
            <div className="p-8 text-center font-mono text-[11px] text-slate-600">No open ports discovered</div>
          ) : (data.open_ports||[]).map((p:any,i:number)=>(
            <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.03]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] font-bold text-accent2">{p.port}</span>
                <span className="font-mono text-[10px] text-slate-600">/{p.protocol}</span>
                <span className="font-mono text-[11px] text-slate-400">{p.service}</span>
              </div>
              <span className="font-mono text-[10px] text-slate-600">{p.count}x</span>
            </div>
          ))}
        </div>

        {/* Top vulns */}
        <div className="glass overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">Top Vulnerabilities</span>
          </div>
          {!(data.top_vulnerabilities?.length) ? (
            <div className="p-8 text-center font-mono text-[11px] text-slate-600">No vulnerabilities found yet</div>
          ) : (data.top_vulnerabilities||[]).map((v:any,i:number)=>(
            <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-white/[0.03]">
              <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border shrink-0"
                style={{color:SEV_COLOR[v.severity]??'#64748b',borderColor:`${SEV_COLOR[v.severity]??'#334155'}40`,background:`${SEV_COLOR[v.severity]??'#334155'}10`}}>
                {v.severity?.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] text-slate-300 truncate">{v.finding||v.type}</div>
                <div className="font-mono text-[10px] text-slate-600">{v.source}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Assets */}
        <div className="glass overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Assets ({(data.risk_by_target||[]).length})</span>
          </div>
          {!(data.risk_by_target?.length) ? (
            <div className="p-8 text-center font-mono text-[11px] text-slate-600">No assets scanned</div>
          ) : (data.risk_by_target||[]).map((t:any,i:number)=>(
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-white/[0.03]">
              <div>
                <div className="text-[13px] font-semibold text-slate-200">{t.target}</div>
                <div className="font-mono text-[10px] text-slate-600">{t.findings_count} findings · {t.scan_count} scans</div>
              </div>
              <span className="font-mono text-[11px] font-bold" style={{color:SEV_COLOR[t.risk_level]??'#64748b'}}>
                {(t.risk_level||'—').toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Scan trends */}
        <div className="glass overflow-hidden">
          <div className="px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-a78bfa uppercase tracking-widest" style={{color:'#a78bfa'}}>Scan Trend</span>
          </div>
          {!(data.scan_trends?.length) ? (
            <div className="p-8 text-center font-mono text-[11px] text-slate-600">No scan history</div>
          ) : (data.scan_trends||[]).slice(0,10).map((t:any,i:number)=>(
            <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.03]">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-600 w-20">{t.scan_date}</span>
                <span className="text-[12px] text-slate-300">{t.target}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-600">{t.findings_count}f</span>
                <span className="font-mono text-[10px] font-bold" style={{color:SEV_COLOR[t.risk_level]??'#64748b'}}>{(t.risk_level||'—').toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
