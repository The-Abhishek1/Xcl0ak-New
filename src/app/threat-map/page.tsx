'use client'
import { useEffect, useState } from 'react'
import { Globe3D, TYPE_COLOR, type GlobePoint } from '@/components/map/Globe3D'
import { timeAgo } from '@/lib/utils'

interface Pulse {
  id:string; name:string; tags:string[]; targeted_countries:string[]
  malware_families:string[]; adversary:string; tlp:string; created:string; modified:string
}

const ALL_TYPES = Object.keys(TYPE_COLOR)

export default function ThreatMapPage() {
  const [points,       setPoints]       = useState<GlobePoint[]>([])
  const [pulses,       setPulses]       = useState<Pulse[]>([])
  const [stats,        setStats]        = useState({ total:0, critical:0, cveIds:[] as string[] })
  const [loading,      setLoading]      = useState(true)
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(ALL_TYPES))
  const [globeKey,     setGlobeKey]     = useState(0)
  const [panelOpen,    setPanelOpen]    = useState(false) // mobile layer panel toggle

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
      const evArr = Array.isArray(evData) ? evData : []
      const pts: GlobePoint[] = evArr.map((ev:any) => {
        if ('srcLat' in ev) return {
          srcLat:ev.srcLat, srcLng:ev.srcLng, dstLat:ev.dstLat, dstLng:ev.dstLng,
          type:ev.type, severity:ev.severity, label:ev.details??''
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
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])
  useEffect(() => { const iv=setInterval(load,60_000); return()=>clearInterval(iv) }, [])

  const typeCounts  = points.reduce((a,p) => { a[p.type]=(a[p.type]??0)+1; return a }, {} as Record<string,number>)
  const visiblePts  = activeLayers.size>0 ? points.filter(p=>activeLayers.has(p.type)) : points

  function toggleLayer(type:string) {
    setActiveLayers(prev => { const n=new Set(prev); n.has(type)?n.delete(type):n.add(type); setGlobeKey(k=>k+1); return n })
  }
  function toggleAll() {
    setActiveLayers(prev => { const n=prev.size===ALL_TYPES.length?new Set<string>():new Set(ALL_TYPES); setGlobeKey(k=>k+1); return n })
  }

  const LayerPanel = () => (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ padding:'10px 12px 6px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'0.15em', color:'#475569', textTransform:'uppercase' }}>
          THREAT TYPES
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 0' }}>
        {/* ALL */}
        <button onClick={toggleAll} style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'8px 12px', background:activeLayers.size===ALL_TYPES.length?'rgba(0,255,170,0.06)':'transparent',
          border:'none', cursor:'pointer', transition:'all 0.15s',
        }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:activeLayers.size===ALL_TYPES.length?'#00ffaa':'#94a3b8' }}>
            ALL ({points.length})
          </span>
          {activeLayers.size===ALL_TYPES.length && <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#00ffaa', display:'inline-block' }}/>}
        </button>

        {ALL_TYPES.map(type => {
          const count  = typeCounts[type]??0
          const active = activeLayers.has(type)
          const color  = TYPE_COLOR[type]
          return (
            <button key={type} onClick={() => toggleLayer(type)} style={{
              width:'100%', display:'flex', alignItems:'center', gap:'10px',
              padding:'7px 12px', background:active?color+'10':'transparent',
              border:'none', cursor:'pointer', transition:'all 0.15s',
            }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'2px', flexShrink:0, transition:'all 0.15s',
                             background:active?color:'#1e293b', boxShadow:active?`0 0 6px ${color}60`:'none' }}/>
              <span style={{ flex:1, fontFamily:"'Space Mono',monospace", fontSize:'11px', textAlign:'left', color:active?'#e2e8f0':'#64748b' }}>
                {type}
              </span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:active?color:'#334155' }}>
                ({count})
              </span>
            </button>
          )
        })}
      </div>

      {/* Severity */}
      <div style={{ padding:'10px 12px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'0.12em', color:'#475569', textTransform:'uppercase', marginBottom:'8px' }}>
          SEVERITY
        </div>
        {[['Critical','#ff3a5c'],['High','#ff8c42'],['Medium','#ffd700'],['Low','#4a7fa5']].map(([l,c]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:c as string, flexShrink:0 }}/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#475569' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 52px)' }}>

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 12px', height:'44px', flexShrink:0,
        background:'rgba(3,5,10,0.9)', borderBottom:'1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div className="live-dot live-dot-red"/>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', fontWeight:700, color:'#00ffaa', letterSpacing:'0.1em' }}>
            GLOBAL SITUATION
          </span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#475569' }}
            className="hide-mobile">
            {new Date().toUTCString().replace('GMT','UTC')}
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#64748b' }}>
            <span style={{color:'#00ffaa'}}>{visiblePts.length}</span> / {points.length} events
          </span>
          {/* Mobile: toggle layer panel */}
          <button onClick={() => setPanelOpen(o => !o)}
            style={{
              fontFamily:"'Space Mono',monospace", fontSize:'10px',
              padding:'5px 10px', borderRadius:'6px', border:'1px solid rgba(255,255,255,0.1)',
              background: panelOpen ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
              color: panelOpen ? '#00ffaa' : '#64748b',
              cursor:'pointer',
            }}
            className="show-mobile">
            ⚡ Layers
          </button>
          <button onClick={load} style={{
            fontFamily:"'Space Mono',monospace", fontSize:'10px',
            padding:'5px 10px', borderRadius:'6px',
            border:'1px solid rgba(255,255,255,0.08)',
            background:'rgba(255,255,255,0.03)', color:'#64748b', cursor:'pointer',
          }}>
            {loading ? '⟳' : '↻'}
          </button>
        </div>
      </div>

      {/* ── Mobile layer panel dropdown ──────────────────────── */}
      {panelOpen && (
        <div style={{
          flexShrink:0, background:'rgba(6,10,20,0.97)',
          borderBottom:'1px solid rgba(255,255,255,0.08)',
          maxHeight:'260px', overflowY:'auto',
        }} className="show-mobile">
          <LayerPanel />
        </div>
      )}

      {/* ── Main 3-col layout ────────────────────────────────── */}
      <div style={{ display:'flex', flex:1, minHeight:0 }}>

        {/* LEFT — Layer panel (desktop only) */}
        <div style={{
          width:'190px', flexShrink:0,
          background:'rgba(6,10,20,0.85)',
          borderRight:'1px solid rgba(255,255,255,0.06)',
          overflowY:'auto',
        }} className="hide-mobile">
          <LayerPanel />
        </div>

        {/* CENTRE — Globe */}
        <div style={{ flex:1, position:'relative', background:'#020608', minWidth:0 }}>
          <Globe3D key={globeKey} points={points} activeLayers={activeLayers} />

          {/* Stats overlay */}
          <div style={{ position:'absolute', bottom:'12px', right:'12px', display:'flex', flexDirection:'column', gap:'6px', alignItems:'flex-end' }}>
            {[
              {l:'Events',  v:points.length,                            c:'#00ffaa'},
              {l:'Critical',v:points.filter(p=>p.severity>=4).length,   c:'#ff3a5c'},
              {l:'Visible', v:visiblePts.length,                         c:'#00aaff'},
            ].map(s=>(
              <div key={s.l} style={{
                fontFamily:"'Space Mono',monospace", fontSize:'10px',
                padding:'5px 10px', borderRadius:'8px',
                background:'rgba(0,0,0,0.75)', border:`1px solid ${s.c}25`,
                display:'flex', gap:'8px',
              }}>
                <span style={{color:s.c, fontWeight:700}}>{s.v}</span>
                <span style={{color:'#475569'}}>{s.l}</span>
              </div>
            ))}
          </div>

          {loading && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'12px', color:'#00ffaa' }} className="animate-pulse">
                ⟳ Fetching OTX intelligence...
              </span>
            </div>
          )}
        </div>

        {/* RIGHT — OTX pulse feed (desktop only) */}
        <div style={{
          width:'260px', flexShrink:0, display:'flex', flexDirection:'column',
          background:'rgba(6,10,20,0.85)',
          borderLeft:'1px solid rgba(255,255,255,0.06)',
        }} className="hide-mobile">
          <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="live-dot"/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#00ffaa', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              OTX Pulses
            </span>
            <a href="https://otx.alienvault.com" target="_blank" rel="noreferrer"
              style={{ marginLeft:'auto', fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#475569', textDecoration:'none' }}>
              OTX ↗
            </a>
          </div>
          <div style={{ flex:1, overflowY:'auto' }}>
            {!pulses.length && (
              <div style={{ padding:'24px', textAlign:'center', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#334155' }}>
                Loading OTX...
              </div>
            )}
            {pulses.map(p => {
              const text=[...(p.tags??[]),(p.adversary??'')].join(' ').toLowerCase()
              const type=/ransomware/.test(text)?'Ransomware':/apt/.test(text)?'APT':/phish/.test(text)?'Phishing':/ddos/.test(text)?'DDoS':/malware/.test(text)?'Malware':'Threat'
              return (
                <a key={p.id} href={`https://otx.alienvault.com/pulse/${p.id}`}
                  target="_blank" rel="noreferrer"
                  style={{ display:'block', padding:'10px 12px', borderBottom:'1px solid rgba(255,255,255,0.04)', textDecoration:'none' }}>
                  <div style={{ fontSize:'11px', fontWeight:600, color:'#cbd5e1', lineHeight:1.4, marginBottom:'6px',
                                display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {p.name}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap' }}>
                    <span style={{
                      fontFamily:"'Space Mono',monospace", fontSize:'8px', padding:'1px 5px', borderRadius:'3px',
                      background:TYPE_COLOR[type]+'18', color:TYPE_COLOR[type], border:`1px solid ${TYPE_COLOR[type]}30`,
                    }}>{type.toUpperCase()}</span>
                    {p.targeted_countries?.slice(0,2).map(c=>(
                      <span key={c} style={{ fontFamily:"'Space Mono',monospace", fontSize:'8px', color:'#475569' }}>{c}</span>
                    ))}
                    {p.adversary&&<span style={{ fontFamily:"'Space Mono',monospace", fontSize:'8px', color:'#fb923c' }}>{p.adversary}</span>}
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'8px', color:'#334155', marginLeft:'auto' }}>
                      {timeAgo(p.modified??p.created)}
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
          {/* CVE IDs */}
          {stats.cveIds?.length>0 && (
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding:'10px 12px' }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#475569', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'6px' }}>
                CVEs IN OTX
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                {stats.cveIds.slice(0,6).map((cve:string) => (
                  <a key={cve} href={`/cve/${encodeURIComponent(cve)}`}
                    style={{ fontFamily:"'Space Mono',monospace", fontSize:'8px', padding:'2px 6px', borderRadius:'4px',
                             background:'rgba(167,139,250,0.1)', color:'#a78bfa', border:'1px solid rgba(167,139,250,0.25)',
                             textDecoration:'none' }}>
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
