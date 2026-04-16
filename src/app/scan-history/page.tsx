'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { esoHistory } from '@/lib/eso/api'

const RISK_COLOR: Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff' }
const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', timeout:'#ff3a5c', running:'#00aaff', planning:'#ffd700' }

export default function HistoryPage() {
  const [data, setData]   = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    esoHistory.list(50).then(r=>{ setData(r.scans??[]); setTotal(r.total??0) }).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Scan <span className="text-accent">History</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">{total} total scans</p>
        </div>
        <Link href="/scan/new"
          className="px-4 py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all"
          style={{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.25)',color:'#00ffaa'}}>
          ⚡ New Scan
        </Link>
      </div>

      <div className="glass overflow-hidden">
        {loading ? (
          <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading history...</div>
        ) : data.length===0 ? (
          <div className="p-12 text-center">
            <div className="font-mono text-[13px] text-slate-600 mb-3">No scan history</div>
            <Link href="/scan/new" className="font-mono text-[11px] text-accent hover:underline">Run your first scan →</Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                    {['Target','Status','Risk','Findings','Duration','Date'].map(h=>(
                      <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map(s=>(
                    <tr key={s.process_id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <Link href={`/scan/${s.process_id}`} className="text-[13px] font-semibold text-slate-200 hover:text-accent transition-colors">{s.target||'—'}</Link>
                        <div className="font-mono text-[10px] text-slate-600 mt-0.5">{s.process_id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[10px] font-bold px-2 py-[2px] rounded"
                          style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>{s.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] font-bold" style={{color:RISK_COLOR[s.risk_level]??'#64748b'}}>
                          {(s.risk_level||'—').toUpperCase()}
                        </span>
                        {s.risk_score>0&&<span className="font-mono text-[10px] text-slate-600 ml-1">({s.risk_score.toFixed(1)})</span>}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-accent2">{s.findings_count||0}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">{s.duration_seconds?`${(s.duration_seconds/60).toFixed(1)}m`:'—'}</td>
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-600">{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-white/[0.04]">
              {data.map(s=>(
                <Link key={s.process_id} href={`/scan/${s.process_id}`} className="flex items-center gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold text-slate-200 truncate">{s.target||'—'}</div>
                    <div className="font-mono text-[10px] text-slate-600">{s.findings_count||0} findings · {s.duration_seconds?`${(s.duration_seconds/60).toFixed(1)}m`:'—'}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-[10px] font-bold" style={{color:RISK_COLOR[s.risk_level]??'#64748b'}}>{(s.risk_level||'—').toUpperCase()}</div>
                    <div className="font-mono text-[9px] text-slate-600">{new Date(s.created_at).toLocaleDateString()}</div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
