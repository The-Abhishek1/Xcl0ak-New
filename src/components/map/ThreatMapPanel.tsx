'use client'
import { useEffect, useState } from 'react'
import type { ThreatMapPoint } from '@/lib/otx'
import { Globe3D, type GlobePoint } from './Globe3D'

interface Props { points: ThreatMapPoint[] }

const TYPE_COLOR: Record<string, string> = {
  Ransomware:'#ff3a5c', APT:'#a78bfa', Phishing:'#ff8c42',
  DDoS:'#ffd700', Malware:'#ff3a5c', Scanner:'#00aaff', Threat:'#4a7fa5',
}

export function ThreatMapPanel({ points }: Props) {
  const [display, setDisplay] = useState<GlobePoint[]>([])
  const [count, setCount]     = useState(0)

  // Client-only — Math.random() for dst offsets
  useEffect(() => {
    const pts: GlobePoint[] = points.map(p => ({
      srcLat: p.lat,  srcLng: p.lng,
      dstLat: p.lat + (Math.random() - 0.5) * 50,
      dstLng: p.lng + (Math.random() - 0.5) * 80,
      type: p.type, severity: p.severity, label: p.label,
    }))
    setDisplay(pts)
    setCount(pts.length)
  }, [points])

  // Poll API every 60s
  useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const r = await fetch('/api/v1/threat?limit=60')
        if (!r.ok) return
        const d = await r.json()
        if (!Array.isArray(d) || !d.length) return
        const next: GlobePoint[] = 'srcLat' in d[0]
          ? d.map((e: any) => ({ srcLat:e.srcLat, srcLng:e.srcLng, dstLat:e.dstLat, dstLng:e.dstLng, type:e.type, severity:e.severity, label:e.details??'' }))
          : d.map((p: any) => ({ srcLat:p.lat, srcLng:p.lng, dstLat:p.lat+(Math.random()-0.5)*50, dstLng:p.lng+(Math.random()-0.5)*80, type:p.type, severity:p.severity, label:p.label }))
        setDisplay(next)
        setCount(next.length)
      } catch {}
    }, 60_000)
    return () => clearInterval(iv)
  }, [])

  const grouped = display.reduce((a, p) => { a[p.type]=(a[p.type]??0)+1; return a }, {} as Record<string,number>)

  return (
    <div className="glass overflow-hidden animate-fin">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="live-dot live-dot-red" />
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color:'#00ffaa' }}>
            Global Threat Map
          </span>
          <span className="font-mono text-[10px] text-slate-600 ml-1">— {count} OTX events</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-slate-600 hidden sm:block">drag to rotate</span>
          <a href="https://otx.alienvault.com" target="_blank" rel="noreferrer"
            className="font-mono text-[9px] text-slate-600 hover:text-slate-400 transition-colors hidden sm:block">
            AlienVault OTX ↗
          </a>
        </div>
      </div>

      {/* 3D Globe */}
      <div className="relative">
        <Globe3D points={display} height={400} />

        {/* Type badges overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[60%]">
          {Object.entries(grouped).slice(0,4).map(([t,n]) => (
            <span key={t} className="font-mono text-[9px] px-2 py-[3px] rounded-md"
              style={{ background:'rgba(0,0,0,0.65)', border:`1px solid ${TYPE_COLOR[t]??'#64748b'}55`, color:TYPE_COLOR[t]??'#64748b' }}>
              {t} {n}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
          {Object.entries(TYPE_COLOR).map(([t,c]) => (
            <div key={t} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background:c, boxShadow:`0 0 5px ${c}` }} />
              <span className="font-mono text-[9px] text-slate-500 hidden sm:block">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
