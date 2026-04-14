'use client'
import { useEffect, useState } from 'react'
import { Globe3D, type GlobePoint } from '@/components/map/Globe3D'
import { timeAgo } from '@/lib/utils'

interface Pulse {
  id: string; name: string; tags: string[]
  targeted_countries: string[]; malware_families: string[]
  adversary: string; tlp: string; created: string; modified: string
  description?: string
}

const TYPE_COLOR: Record<string, string> = {
  Ransomware:'#ff3a5c', APT:'#a78bfa', Phishing:'#ff8c42',
  DDoS:'#ffd700', Malware:'#ff3a5c', Scanner:'#00aaff', Threat:'#4a7fa5',
}

export default function ThreatMapPage() {
  const [points,  setPoints]  = useState<GlobePoint[]>([])
  const [pulses,  setPulses]  = useState<Pulse[]>([])
  const [stats,   setStats]   = useState({ total:0, critical:0, cveIds:[] as string[] })
  const [filter,  setFilter]  = useState('ALL')
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const [evRes, pulseRes, statRes] = await Promise.all([
        fetch('/api/v1/threat?limit=80'),
        fetch('/api/v1/threat?view=pulses&limit=20'),
        fetch('/api/v1/threat?view=stats'),
      ])
      const [evData, pulseData, statData] = await Promise.all([
        evRes.json(), pulseRes.json(), statRes.json(),
      ])

      // Convert to GlobePoints
      const evArr = Array.isArray(evData) ? evData : []
      const pts: GlobePoint[] = evArr.map((ev: any) => {
        if ('srcLat' in ev) {
          return { srcLat:ev.srcLat, srcLng:ev.srcLng, dstLat:ev.dstLat, dstLng:ev.dstLng, type:ev.type, severity:ev.severity, label:ev.details??`${ev.srcCountry}→${ev.dstCountry}`, sourceUrl:ev.sourceUrl }
        }
        return {
          srcLat:ev.lat, srcLng:ev.lng,
          dstLat:ev.lat+(Math.random()-0.5)*50,
          dstLng:ev.lng+(Math.random()-0.5)*80,
          type:ev.type, severity:ev.severity, label:ev.label,
        }
      })
      setPoints(pts)
      setPulses(Array.isArray(pulseData) ? pulseData : [])
      setStats(statData ?? { total:0, critical:0, cveIds:[] })
    } catch(e) { console.error(e) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])
  useEffect(() => { const iv=setInterval(load,60_000); return ()=>clearInterval(iv) }, [])

  const types   = ['ALL', ...Array.from(new Set(points.map(p => p.type)))]
  const visible = filter === 'ALL' ? points : points.filter(p => p.type === filter)
  const grouped = points.reduce((a,p) => { a[p.type]=(a[p.type]??0)+1; return a }, {} as Record<string,number>)

  return (
    <div className="p-3 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Global Threat <span style={{ color:'#00ffaa' }}>Map</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-0.5">
            Live OTX intelligence · {points.length} events · auto-refresh 60s
          </p>
        </div>
        <button onClick={load}
          className="font-mono text-[11px] px-4 py-2 rounded-lg border border-white/[0.08] text-slate-500 hover:text-slate-300 transition-all cursor-pointer">
          {loading ? '⟳ LOADING...' : '↻ REFRESH'}
        </button>
      </div>

      {/* Stat chips */}
      <div className="flex gap-2 flex-wrap">
        {[
          { label:'Total Events',  v: stats.total||points.length,   c:'#00ffaa' },
          { label:'Critical',      v: stats.critical||visible.filter(p=>p.severity>=4).length, c:'#ff3a5c' },
          { label:'Active CVEs',   v: stats.cveIds?.length||0,       c:'#a78bfa' },
          ...Object.entries(grouped).slice(0,4).map(([t,n])=>({ label:t, v:n, c:TYPE_COLOR[t]??'#64748b' })),
        ].map((s,i) => (
          <div key={i} className="glass-sm px-3 py-2 flex items-center gap-2">
            <span className="font-mono text-lg font-bold" style={{ color:s.c }}>{s.v}</span>
            <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex gap-1.5 flex-wrap">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className="font-mono text-[10px] px-3 py-1.5 rounded border transition-all cursor-pointer"
            style={{
              background: filter===t ? (TYPE_COLOR[t]??'#00ffaa')+'18' : 'rgba(255,255,255,0.025)',
              borderColor: filter===t ? (TYPE_COLOR[t]??'#00ffaa')+'50' : 'rgba(255,255,255,0.08)',
              color: filter===t ? (TYPE_COLOR[t]??'#00ffaa') : '#64748b',
            }}>
            {t}{grouped[t] ? ` (${grouped[t]})` : ''}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Globe */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="live-dot live-dot-red" />
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color:'#00ffaa' }}>
                3D Threat Globe
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-600">drag to rotate · scroll to zoom</span>
          </div>
          <div className="relative">
            <Globe3D points={visible} height={500} />
            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
              {Object.entries(TYPE_COLOR).map(([t,c]) => (
                <div key={t} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background:c, boxShadow:`0 0 6px ${c}` }} />
                  <span className="font-mono text-[9px] text-slate-500 hidden sm:block">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OTX Pulse feed */}
        <div className="glass overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="live-dot" />
              <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color:'#00ffaa' }}>OTX Pulses</span>
            </div>
            <a href="https://otx.alienvault.com/pulses/subscribed" target="_blank" rel="noreferrer"
              className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">OTX ↗</a>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight:'480px' }}>
            {loading && !pulses.length && (
              <div className="p-8 text-center font-mono text-[11px] text-slate-600 animate-pulse">
                Fetching OTX intelligence...
              </div>
            )}
            {pulses.map(p => {
              const text = [...(p.tags??[]),(p.adversary??'')].join(' ').toLowerCase()
              const type = /ransomware/.test(text)?'Ransomware':/apt/.test(text)?'APT':/phish/.test(text)?'Phishing':/ddos/.test(text)?'DDoS':/malware/.test(text)?'Malware':'Threat'
              const sev  = p.tlp==='red'?'high':p.tlp==='amber'?'medium':'low'
              const sevColor = sev==='high'?'#ff3a5c':sev==='medium'?'#ff8c42':'#4a7fa5'
              return (
                <a key={p.id}
                  href={`https://otx.alienvault.com/pulse/${p.id}`}
                  target="_blank" rel="noreferrer"
                  className="block px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors">
                  <div className="flex gap-2.5">
                    <div className="w-[3px] rounded-full shrink-0 self-stretch" style={{ background:sevColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-semibold text-slate-200 line-clamp-2 mb-1.5 leading-snug">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[9px] px-1.5 py-[1px] rounded border"
                          style={{ background:TYPE_COLOR[type]+'15', color:TYPE_COLOR[type], borderColor:TYPE_COLOR[type]+'30' }}>
                          {type.toUpperCase()}
                        </span>
                        {p.targeted_countries?.slice(0,2).map(c => (
                          <span key={c} className="font-mono text-[9px] text-slate-600">{c}</span>
                        ))}
                        {p.adversary && (
                          <span className="font-mono text-[9px] text-orange-400">{p.adversary}</span>
                        )}
                        <span className="font-mono text-[9px] text-slate-700 ml-auto">
                          {timeAgo(p.modified ?? p.created)}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>

          {/* CVE mentions from OTX */}
          {stats.cveIds?.length > 0 && (
            <div className="border-t border-white/[0.06] p-3">
              <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">CVEs in OTX Pulses</div>
              <div className="flex flex-wrap gap-1.5">
                {stats.cveIds.slice(0,8).map((cve:string) => (
                  <a key={cve} href={`/cve?q=${cve}`}
                    className="font-mono text-[9px] px-1.5 py-[2px] rounded border transition-colors"
                    style={{ background:'rgba(167,139,250,0.1)', color:'#a78bfa', borderColor:'rgba(167,139,250,0.25)' }}>
                    {cve}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
