'use client'
import { useEffect, useState } from 'react'
import { timeAgo } from '@/lib/utils'
import type { OTXPulse } from '@/lib/otx'

const PER_PAGE = 15
const TYPES = ['ALL','Ransomware','APT','Phishing','DDoS','Malware','Threat']

function typeFrom(p: OTXPulse): string {
  const t = [...(p.tags??[]),(p.adversary??'')].join(' ').toLowerCase()
  if (/ransomware/.test(t)) return 'Ransomware'
  if (/apt/.test(t))        return 'APT'
  if (/phish/.test(t))      return 'Phishing'
  if (/ddos/.test(t))       return 'DDoS'
  if (/malware/.test(t))    return 'Malware'
  return 'Threat'
}

const TYPE_COLOR: Record<string,string> = {
  Ransomware:'#ff3a5c',APT:'#a78bfa',Phishing:'#ff8c42',
  DDoS:'#ffd700',Malware:'#ff3a5c',Threat:'#64748b',
}

export default function NewsPage() {
  const [pulses,  setPulses]  = useState<OTXPulse[]>([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('ALL')
  const [page,    setPage]    = useState(1)

  useEffect(() => {
    fetch('/api/v1/threat?view=pulses&limit=100')
      .then(r=>r.json())
      .then(d=>{ setPulses(Array.isArray(d)?d:[]); setLoading(false) })
      .catch(()=>setLoading(false))
  }, [])

  const filtered    = filter==='ALL' ? pulses : pulses.filter(p=>typeFrom(p)===filter)
  const totalPages  = Math.max(1,Math.ceil(filtered.length/PER_PAGE))
  const visible     = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Threat <span className="text-accent">Intel Feed</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Live OTX pulses · {pulses.length} articles · AlienVault threat intelligence
        </p>
      </div>

      {/* Type filter tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {TYPES.map(t => (
          <button key={t} onClick={()=>{setFilter(t);setPage(1)}}
            className="font-mono text-[10px] px-3 py-1.5 rounded border transition-all cursor-pointer"
            style={filter===t
              ?{borderColor:(TYPE_COLOR[t]??'#00ffaa')+'50',color:TYPE_COLOR[t]??'#00ffaa',background:(TYPE_COLOR[t]??'#00ffaa')+'12'}
              :{borderColor:'rgba(255,255,255,0.08)',color:'#64748b'}}>
            {t} {t!=='ALL'&&`(${pulses.filter(p=>typeFrom(p)===t).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="glass p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">
          Fetching OTX intelligence...
        </div>
      ) : (
        <div className="space-y-2">
          {visible.map(p => {
            const type  = typeFrom(p)
            const color = TYPE_COLOR[type]
            const sev   = p.tlp==='red'?'high':p.tlp==='amber'?'medium':'low'
            return (
              <a key={p.id} href={`https://otx.alienvault.com/pulse/${p.id}`}
                target="_blank" rel="noreferrer"
                className="glass flex gap-3 p-4 hover:border-white/20 transition-all block">
                <div className="w-[3px] rounded-full shrink-0 self-stretch"
                  style={{background:sev==='high'?'#ff3a5c':sev==='medium'?'#ff8c42':'#4a7fa5'}}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="text-[13px] font-semibold text-slate-200 leading-snug">{p.name}</div>
                    <span className="font-mono text-[9px] text-slate-600 shrink-0">{timeAgo(p.modified??p.created)}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border"
                      style={{background:color+'15',color,borderColor:color+'30'}}>{type.toUpperCase()}</span>
                    {p.targeted_countries?.slice(0,3).map(c=>(
                      <span key={c} className="font-mono text-[9px] text-slate-600">{c}</span>
                    ))}
                    {p.adversary&&<span className="font-mono text-[9px] text-orange-400 font-bold">{p.adversary}</span>}
                    {p.tags?.slice(0,4).map(t=>(
                      <span key={t} className="font-mono text-[8px] px-1.5 py-[1px] rounded bg-white/[0.04] text-slate-600 border border-white/[0.05]">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
          <span className="font-mono text-[11px] text-slate-600">
            {filtered.length} articles · Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button disabled={page===1} onClick={()=>setPage(1)}
              className="font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer">«</button>
            <button disabled={page===1} onClick={()=>setPage(p=>p-1)}
              className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer">← PREV</button>
            {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
              const pg=Math.max(1,Math.min(page-2,totalPages-4))+i
              return (
                <button key={pg} onClick={()=>setPage(pg)}
                  className="font-mono text-[10px] px-2.5 py-1.5 rounded border cursor-pointer"
                  style={pg===page?{borderColor:'rgba(0,255,170,0.3)',background:'rgba(0,255,170,0.1)',color:'#00ffaa'}:{borderColor:'rgba(255,255,255,0.08)',color:'#64748b'}}>
                  {pg}
                </button>
              )
            })}
            <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}
              className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer">NEXT →</button>
            <button disabled={page===totalPages} onClick={()=>setPage(totalPages)}
              className="font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-500 hover:text-slate-300 disabled:opacity-30 cursor-pointer">»</button>
          </div>
        </div>
      )}
    </div>
  )
}
