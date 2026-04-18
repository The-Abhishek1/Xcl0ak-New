'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { esoScans, esoHistory, esoSystem } from '@/lib/eso/api'
import { timeAgo } from '@/lib/utils'

const RISK_COLOR:   Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff' }
const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', running:'#00aaff', planning:'#ffd700', queued:'#ffd700', validating:'#a78bfa', timeout:'#ff3a5c', pending:'#475569' }

export default function ScanDashboardPage() {
  const [dbScans,     setDbScans]     = useState<any[]>([])
  const [activeScans, setActiveScans] = useState<any[]>([])
  const [health,      setHealth]      = useState<any>(null)
  const [loading,     setLoading]     = useState(true)

  const load = () => {
    // DB history (completed/persisted scans)
    esoHistory.list(20).then(r => setDbScans(r.scans ?? [])).catch(()=>{})
    // In-memory active scans (running, planning, pending etc)
    esoScans.list().then(r => {
      setActiveScans(r.executions ?? [])
    }).catch(()=>{})
    esoSystem.health().then(setHealth).catch(()=>{}).finally(()=>setLoading(false))
  }

  useEffect(() => { load(); const t=setInterval(load, 5000); return()=>clearInterval(t) }, [])

  // Merge: active scans first, then DB scans — deduplicate by process_id
  const activePids = new Set(activeScans.map((s:any)=>s.process_id))
  const mergedScans = [
    ...activeScans,
    ...dbScans.filter((s:any) => !activePids.has(s.process_id))
  ]

  const running   = activeScans.filter((s:any)=>['running','planning','queued','validating','pending'].includes(s.status))
  const completed = dbScans.filter(s=>s.status==='completed').length
  const failed    = dbScans.filter(s=>['failed','timeout'].includes(s.status)).length

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Scan <span className="text-accent">Engine</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">AI-powered penetration testing · 7 Docker tools</p>
        </div>
        <Link href="/scan/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all"
          style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
          ⚡ New Scan
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          {label:'Total',     val:mergedScans.length,  color:'#00aaff'},
          {label:'Completed', val:completed,            color:'#00ffaa'},
          {label:'Running',   val:running.length,       color:'#ffd700'},
          {label:'Failed',    val:failed,               color:'#ff3a5c'},
        ].map((s,i)=>(
          <div key={i} className="glass px-4 py-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${s.color}40,transparent)`}}/>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1">{s.label}</div>
            <div className="font-mono text-2xl font-bold" style={{color:s.color}}>{s.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
        {/* All scans — active + completed merged */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">All Scans</span>
            {running.length>0 && (
              <div className="flex items-center gap-1.5">
                <div className="live-dot"/>
                <span className="font-mono text-[10px] text-accent">{running.length} running</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>
          ) : mergedScans.length===0 ? (
            <div className="p-12 text-center">
              <div className="font-mono text-[13px] text-slate-600 mb-3">No scans yet</div>
              <Link href="/scan/new" className="font-mono text-[11px] text-accent hover:underline">Launch your first scan →</Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.03]">
              {mergedScans.map((s:any) => {
                const isActive = ['running','planning','queued','validating','pending'].includes(s.status)
                return (
                  <Link key={s.process_id} href={`/scan/${s.process_id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
                    style={isActive?{background:'rgba(0,170,255,0.02)'}:{}}>
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Active pulse indicator */}
                      {isActive && <div className="live-dot shrink-0" style={{background:STATUS_COLOR[s.status]??'#ffd700'}}/>}
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-slate-200">{s.target||'—'}</div>
                        <div className="font-mono text-[10px] text-slate-600 mt-0.5">{s.process_id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {s.findings_count>0 && <span className="font-mono text-[10px] text-accent2">{s.findings_count} findings</span>}
                      {s.risk_level && <span className="font-mono text-[10px] font-bold" style={{color:RISK_COLOR[s.risk_level]??'#64748b'}}>{s.risk_level.toUpperCase()}</span>}
                      <span className="font-mono text-[9px] px-2 py-[2px] rounded"
                        style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                        {s.status?.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* System Health */}
        <div className="glass p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">System Health</div>
          {health ? (
            <div className="space-y-2">
              {Object.entries(health.services||{}).map(([name,status]:any) => {
                const ok = String(status).includes('healthy')||String(status).includes('connect')
                return (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-[12px] capitalize text-slate-300">{name}</span>
                    <span className="font-mono text-[10px] font-bold" style={{color:ok?'#00ffaa':'#ff3a5c'}}>
                      {ok?'● Online':'○ Offline'}
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between py-2">
                <span className="text-[12px] text-slate-300">Tools</span>
                <span className="font-mono text-[10px] font-bold text-accent2">7 Available</span>
              </div>
            </div>
          ) : (
            <div className="font-mono text-[11px] text-slate-600">
              {loading?'Connecting...':'ESO backend offline — start with: uvicorn src.api.app:app --port 8000'}
            </div>
          )}
          {/*<div className="mt-4 pt-3 border-t border-white/[0.06]">
            <Link href="/scan/new"
              className="block w-full text-center py-2.5 rounded-lg border font-mono text-[11px] font-bold transition-all"
              style={{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.25)',color:'#00ffaa'}}>
              ⚡ Launch New Scan
            </Link>
          </div>*/}
        </div>
      </div>
    </div>
  )
}
