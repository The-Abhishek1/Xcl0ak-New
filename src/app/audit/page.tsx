'use client'
import { useEffect, useState, useRef } from 'react'
import { esoSystem } from '@/lib/eso/api'

export default function AuditPage() {
  const [logs,    setLogs]    = useState<any[]>([])
  const [total,   setTotal]   = useState(0)
  const [loading, setLoading] = useState(true)
  const filterRef = useRef<HTMLInputElement>(null)

  const load = async (filter?: string) => {
    setLoading(true)
    try {
      const params = filter ? `?action=${encodeURIComponent(filter)}&limit=100` : '?limit=100'
      const r = await esoSystem.audit(params)
      setLogs(r.logs??[]); setTotal(r.total??0)
    } catch {}
    setLoading(false)
  }

  useEffect(()=>{ load() },[])

  const statusColor = (s: string) => s==='success'?'#00ffaa':s==='denied'?'#ff3a5c':'#ffd700'

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Audit <span className="text-accent">Log</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">{total} events · Full action trail</p>
        </div>
      </div>

      <div className="glass p-3 mb-4">
        <div className="flex gap-2">
          <input ref={filterRef} defaultValue=""
            placeholder="Filter by action (e.g. scan, login, POST)..."
            onKeyDown={e=>e.key==='Enter'&&load(filterRef.current?.value)}
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"/>
          <button onClick={()=>load(filterRef.current?.value)}
            className="px-4 py-2 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-400 hover:text-accent hover:border-accent/25 cursor-pointer transition-all">
            Search
          </button>
          <button onClick={()=>{ if(filterRef.current) filterRef.current.value=''; load() }}
            className="px-3 py-2 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-600 hover:text-slate-400 cursor-pointer transition-all">
            Clear
          </button>
        </div>
      </div>

      <div className="glass overflow-hidden">
        {loading ? (
          <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading audit log...</div>
        ) : logs.length===0 ? (
          <div className="p-12 text-center font-mono text-[11px] text-slate-600">No audit events found</div>
        ) : (
          <>
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                    {['Time','User','Action','Status','IP','Details'].map(h=>(
                      <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log,i)=>(
                    <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-600 whitespace-nowrap">
                        {log.timestamp?new Date(log.timestamp).toLocaleString():'—'}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-accent">{log.user_id}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-300">{log.action}</td>
                      <td className="px-4 py-2.5">
                        <span className="font-mono text-[10px] font-bold" style={{color:statusColor(log.status)}}>{log.status}</span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-600">{log.ip_address||'—'}</td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-slate-600 max-w-[200px] truncate">
                        {log.details?.path||log.details?.method||'—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y divide-white/[0.04]">
              {logs.map((log,i)=>(
                <div key={i} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-accent">{log.action}</span>
                    <span className="font-mono text-[10px] font-bold" style={{color:statusColor(log.status)}}>{log.status}</span>
                  </div>
                  <div className="font-mono text-[10px] text-slate-600">{log.user_id} · {log.timestamp?new Date(log.timestamp).toLocaleTimeString():'—'}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
