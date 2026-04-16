'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { esoApi } from '@/lib/eso/api'

const SEV_COLOR: Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff', info:'#64748b' }
const SEV_BG:    Record<string,string> = { critical:'rgba(255,58,92,0.1)', high:'rgba(255,140,66,0.1)', medium:'rgba(255,215,0,0.1)', low:'rgba(0,170,255,0.1)', info:'rgba(100,116,139,0.1)' }
const SEVS = ['critical','high','medium','low','info']

export default function FindingsPage() {
  const [findings, setFindings] = useState<any[]>([])
  const [stats,    setStats]    = useState<any>(null)
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [filters,  setFilters]  = useState({severity:'',source:'',search:'',port:''})
  const [selected, setSelected] = useState<any>(null)
  const [aiResp,   setAiResp]   = useState('')
  const [aiLoad,   setAiLoad]   = useState(false)

  const loadFindings = async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams()
      if (filters.severity) p.set('severity',filters.severity)
      if (filters.source)   p.set('source',filters.source)
      if (filters.search)   p.set('search',filters.search)
      if (filters.port)     p.set('port',filters.port)
      p.set('limit','100')
      const r = await esoApi.get(`/auth/findings?${p}`)
      setFindings(r.findings??[]); setTotal(r.total??0)
    } catch {}
    setLoading(false)
  }

  useEffect(()=>{ loadFindings() },[filters])
  useEffect(()=>{ esoApi.get('/auth/findings/stats').then(setStats).catch(()=>{}) },[])

  const askAI = async (type: string) => {
    if (!selected) return
    setAiLoad(true); setAiResp('')
    try {
      const r = await esoApi.post('/ai/chat',{ finding_id:selected.finding_id, process_id:selected.process_id, chat_type:type, finding_data:selected })
      setAiResp(r.answer||'No response')
    } catch (e:any) { setAiResp(`Error: ${e.message}`) }
    setAiLoad(false)
  }

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Findings <span className="text-accent">Explorer</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">All vulnerabilities across scans · AI-powered analysis</p>
      </div>

      {/* Severity stats */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
        {SEVS.map(s=>(
          <button key={s} onClick={()=>setFilters(f=>({...f,severity:f.severity===s?'':s}))}
            className="glass px-3 py-2.5 text-center cursor-pointer transition-all hover:border-white/20"
            style={filters.severity===s?{borderColor:`${SEV_COLOR[s]}40`,background:`${SEV_COLOR[s]}08`}:{}}>
            <div className="font-mono text-xl font-bold" style={{color:SEV_COLOR[s]}}>{stats?.by_severity?.[s]||0}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="glass p-3 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {[
            {placeholder:'Search findings...',key:'search',type:'text'},
            {placeholder:'Port...',key:'port',type:'number'},
          ].map(f=>(
            <input key={f.key} type={f.type} placeholder={f.placeholder}
              value={(filters as any)[f.key]}
              onChange={e=>setFilters(p=>({...p,[f.key]:e.target.value}))}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"/>
          ))}
          <select value={filters.severity} onChange={e=>setFilters(f=>({...f,severity:e.target.value}))}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none">
            <option value="">All Severities</option>
            {SEVS.map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
          <select value={filters.source} onChange={e=>setFilters(f=>({...f,source:e.target.value}))}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none">
            <option value="">All Tools</option>
            {Object.keys(stats?.by_source||{}).map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* List */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">{total} Finding{total!==1?'s':''}</span>
            {(filters.severity||filters.source||filters.search||filters.port)&&(
              <button onClick={()=>setFilters({severity:'',source:'',search:'',port:''})}
                className="font-mono text-[10px] text-slate-500 hover:text-accent cursor-pointer">Clear filters</button>
            )}
          </div>
          {loading ? (
            <div className="p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading findings...</div>
          ) : findings.length===0 ? (
            <div className="p-12 text-center">
              <div className="font-mono text-[13px] text-slate-600 mb-2">{total===0?'No findings yet':'No matches'}</div>
              {total===0&&<Link href="/scan/new" className="font-mono text-[11px] text-accent hover:underline">Run a scan →</Link>}
            </div>
          ) : (
            <div className="divide-y divide-white/[0.03]">
              {findings.map((f,i)=>(
                <div key={i} onClick={()=>{setSelected(f);setAiResp('')}}
                  className="px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.02]"
                  style={selected?.finding_id===f.finding_id?{background:'rgba(0,255,170,0.03)'}:{}}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border"
                          style={{color:SEV_COLOR[f.severity]??'#64748b',background:SEV_BG[f.severity]??'rgba(255,255,255,0.04)',borderColor:`${SEV_COLOR[f.severity]??'#334155'}40`}}>
                          {f.severity?.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] text-slate-600">{f.source}</span>
                        {f.port&&<span className="font-mono text-[9px] text-slate-600">:{f.port}</span>}
                      </div>
                      <div className="text-[12px] text-slate-200 truncate">{f.finding||f.type}</div>
                      {f.service&&<div className="font-mono text-[10px] text-slate-600 mt-0.5">{f.service} {f.version||''}</div>}
                    </div>
                    <Link href={`/scan/${f.process_id}`} onClick={e=>e.stopPropagation()}
                      className="font-mono text-[9px] text-accent2 hover:underline shrink-0">
                      {f.target||f.process_id?.slice(0,12)}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI analysis panel */}
        <div className="glass p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">AI Analysis</div>
          {!selected ? (
            <div className="text-center py-10">
              <div className="text-3xl mb-3 opacity-20">🤖</div>
              <div className="font-mono text-[11px] text-slate-600">Click a finding to analyze</div>
            </div>
          ) : (
            <div>
              <div className="p-3 rounded-lg mb-4 border"
                style={{background:SEV_BG[selected.severity]??'rgba(255,255,255,0.04)',borderColor:`${SEV_COLOR[selected.severity]??'#334155'}30`}}>
                <div className="font-mono text-[9px] mb-1" style={{color:SEV_COLOR[selected.severity]??'#64748b'}}>{selected.severity?.toUpperCase()} · {selected.source}</div>
                <div className="text-[12px] text-slate-200">{selected.finding||selected.type}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[{type:'explain',label:'🧠 Explain'},{type:'remediate',label:'🔧 Fix It'},{type:'poc',label:'💥 PoC'},{type:'general',label:'💬 Ask AI'}].map(btn=>(
                  <button key={btn.type} onClick={()=>askAI(btn.type)} disabled={aiLoad}
                    className="p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.04] transition-all cursor-pointer text-left">
                    <div className="font-mono text-[11px] font-bold text-slate-300">{btn.label}</div>
                  </button>
                ))}
              </div>
              {aiLoad&&<div className="flex items-center gap-2 p-3 font-mono text-[11px] text-accent animate-pulse"><div className="w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin"/>Analyzing...</div>}
              {aiResp&&(
                <div className="p-3 rounded-lg overflow-y-auto" style={{background:'#020608',border:'1px solid rgba(0,255,170,0.08)',maxHeight:'300px'}}>
                  <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">{aiResp}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
