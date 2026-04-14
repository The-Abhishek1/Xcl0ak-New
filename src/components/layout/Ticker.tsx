'use client'
import { useEffect, useState } from 'react'

export function Ticker() {
  const [items, setItems] = useState(['Xcloak v2 — Real data from NVD and OTX','Upload PoC exploits · Vote · Earn XP','Hit SYNC to fetch the latest CVEs'])

  useEffect(() => {
    fetch('/api/v1/threat?view=pulses&limit=8')
      .then(r => r.json())
      .then((p: any[]) => { if (Array.isArray(p) && p.length) setItems(p.map(x => `[OTX] ${x.name}`)) })
      .catch(()=>{})
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[32px] z-[100] flex items-center overflow-hidden"
      style={{background:'rgba(3,5,10,0.95)',borderTop:'1px solid rgba(255,255,255,0.06)'}}>
      <div className="shrink-0 h-full flex items-center px-3 font-mono text-[10px] font-bold text-white tracking-widest" style={{background:'#ff3a5c'}}>⚠ INTEL</div>
      <div className="flex-1 overflow-hidden">
        <div className="ticker-inner inline-block whitespace-nowrap font-mono text-[11px] text-slate-500">
          {items.map((t,i) => <span key={i} className="mr-16">{t}</span>)}
        </div>
      </div>
    </div>
  )
}
