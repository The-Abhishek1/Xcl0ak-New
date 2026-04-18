'use client'
// src/components/map/ThreatMapPanel.tsx
// FIXED: events prop defaults to [] — never crashes when OTX key missing or API returns undefined

import { useEffect, useState } from 'react'
import type { ThreatEvent }    from '@/lib/otx'
import { Globe3D, type GlobePoint } from './Globe3D'

interface Props {
  events?: ThreatEvent[]   // optional — safe when dashboard data.threats is undefined
}

const TYPE_COLOR: Record<string, string> = {
  Ransomware: '#ff3a5c',
  APT:        '#a78bfa',
  Phishing:   '#ff8c42',
  DDoS:       '#ffd700',
  Malware:    '#ff3a5c',
  Scanner:    '#00aaff',
  Threat:     '#4a7fa5',
}

function eventsToGlobePoints(events: ThreatEvent[]): GlobePoint[] {
  // Defensive: filter out any entries missing required fields
  return events
    .filter(e => e && typeof e.srcLat === 'number' && typeof e.srcLng === 'number')
    .map(e => ({
      srcLat:   e.srcLat,
      srcLng:   e.srcLng,
      dstLat:   e.dstLat,
      dstLng:   e.dstLng,
      type:     e.type ?? 'Threat',
      severity: e.severity ?? 3,
      label:    e.details ?? '',
    }))
}

export function ThreatMapPanel({ events = [] }: Props) {
  const [display, setDisplay] = useState<GlobePoint[]>([])
  const [count,   setCount]   = useState(0)

  // Initialise from SSR-passed data (may be empty if no OTX key)
  useEffect(() => {
    const safeEvents = Array.isArray(events) ? events : []
    const pts = eventsToGlobePoints(safeEvents)
    setDisplay(pts)
    setCount(pts.length)
  }, [events])

  // Poll API every 60s for live updates
  useEffect(() => {
    const iv = setInterval(async () => {
      try {
        const r = await fetch('/api/v1/threat?limit=60')
        if (!r.ok) return
        const data = await r.json()
        // data may be array of ThreatEvent or error object
        if (!Array.isArray(data)) return
        const pts = eventsToGlobePoints(data)
        setDisplay(pts)
        setCount(pts.length)
      } catch { /* silent — no key or network issue */ }
    }, 60_000)
    return () => clearInterval(iv)
  }, [])

  const grouped = display.reduce<Record<string, number>>((acc, p) => {
    acc[p.type] = (acc[p.type] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="glass overflow-hidden animate-fin">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="live-dot live-dot-red" />
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color: '#00ffaa' }}>
            Global Threat Map
          </span>
          <span className="font-mono text-[10px] text-slate-600 ml-1">
            — {count > 0 ? `${count} OTX events` : 'add OTX_API_KEY for live data'}
          </span>
        </div>

        {/* Type legend */}
        <div className="hidden sm:flex items-center gap-3">
          {Object.entries(grouped).slice(0, 4).map(([type, n]) => (
            <div key={type} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: TYPE_COLOR[type] ?? '#4a7fa5' }} />
              <span className="font-mono text-[9px] text-slate-600">
                {type} ({n})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Globe */}
      <div className="relative" style={{ height: '360px' }}>
        {display.length === 0 ? (
          <div className="flex items-center justify-center h-full flex-col gap-3">
            <div className="text-slate-600 text-4xl">🌐</div>
            <div className="text-center">
              <div className="font-mono text-[12px] text-slate-500 mb-1">
                No threat data loaded
              </div>
              <div className="font-mono text-[10px] text-slate-700">
                Add <span className="text-accent">OTX_API_KEY</span> to .env.local
              </div>
              <div className="font-mono text-[10px] text-slate-700 mt-0.5">
                then click the SYNC button in the topbar
              </div>
            </div>
          </div>
        ) : (
          <Globe3D points={display} />
        )}
      </div>
    </div>
  )
}
