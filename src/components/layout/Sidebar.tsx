'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { label:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',    href:'/dashboard' },
    { icon:'🗺', label:'Threat Map',   href:'/threat-map', badge:'LIVE' },
    { icon:'📡', label:'CVE Tracker',  href:'/cve' },
    { icon:'📰', label:'News Feed',    href:'/news' },
  ]},
  { label:'Exploits', items:[
    { icon:'💉', label:'Browse',       href:'/exploits' },
    { icon:'⬆',  label:'Upload PoC',  href:'/exploits/upload' },
    { icon:'📦', label:'Payloads',    href:'/payloads' },
    { icon:'🧬', label:'DNA Analysis',href:'/dna' },
  ]},
  { label:'Tools', items:[
    { icon:'🐳', label:'Playground',  href:'/playground' },
    { icon:'🔭', label:'Scanner',     href:'/scanner' },
    { icon:'🕵', label:'OSINT',       href:'/osint' },
    { icon:'📊', label:'Reports',     href:'/reports' },
  ]},
  { label:'Community', items:[
    { icon:'🏆', label:'CTF',         href:'/ctf', badge:'NEW' },
    { icon:'📈', label:'Leaderboard', href:'/leaderboard' },
    { icon:'🤖', label:'AI Assistant',href:'/ai' },
    { icon:'📚', label:'Learn',       href:'/learn' },
  ]},
  { label:'Scan Engine', items:[
    { icon:'⚡', label:'Scan Dashboard', href:'/scan' },
    { icon:'🔍', label:'Findings',       href:'/findings' },
    { icon:'🛡', label:'Attack Surface', href:'/attack-surface' },
    { icon:'⏰', label:'Schedules',      href:'/schedules' },
    { icon:'📋', label:'Scan History',   href:'/scan-history' },
    { icon:'👥', label:'Teams',          href:'/teams' },
    { icon:'📝', label:'Audit Log',      href:'/audit' },
    { icon:'⚙',  label:'ESO Settings',   href:'/settings' },
  ]},
]

export function Sidebar() {
  const path = usePathname()
  const [mounted,   setMounted]   = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check(); setMounted(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!mounted || !isDesktop) return null

  return (
    <aside style={{
      position:'fixed', left:0, top:'52px', bottom:30, width:'220px',
      zIndex:90, display:'flex', flexDirection:'column',
      background:'rgba(3,5,10,0.65)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderRight:'1px solid rgba(255,255,255,0.06)',
    }}>

      {/* Scrollable nav sections */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 0 8px' }}>
        {SECTIONS.map(sec => (
          <div key={sec.label} style={{ marginBottom:'16px', padding:'0 12px' }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'0.15em', color:'#475569', textTransform:'uppercase', padding:'0 8px 6px' }}>
              {sec.label}
            </div>
            {sec.items.map(item => {
              const active = path?.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href} style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding: active ? '8px 8px' : '8px 10px',
                  borderRadius:'8px', marginBottom:'2px',
                  fontSize:'13px', fontWeight:600, textDecoration:'none',
                  color: active ? '#00ffaa' : '#64748b',
                  borderLeft: active ? '2px solid #00ffaa' : '2px solid transparent',
                  background: active ? 'linear-gradient(90deg,rgba(0,255,170,0.08),transparent)' : 'transparent',
                  transition:'all 0.15s',
                }}>
                  <span style={{ width:'18px', textAlign:'center', fontSize:'14px', flexShrink:0 }}>{item.icon}</span>
                  <span style={{ flex:1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', padding:'1px 5px', borderRadius:'3px', background:item.badge==='LIVE'?'rgba(255,58,92,0.2)':'rgba(0,255,170,0.1)', color:item.badge==='LIVE'?'#ff3a5c':'#00ffaa' }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Fixed bottom: admin link + status — always visible, never scrolls away */}
      <div style={{ flexShrink:0, padding:'8px 12px 12px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/admin" style={{
          display:'flex', alignItems:'center', gap:'10px',
          padding:'8px 10px', borderRadius:'8px', marginBottom:'8px',
          fontSize:'12px', fontWeight:600, textDecoration:'none',
          color:'#475569', border:'1px solid rgba(255,255,255,0.06)',
          background:'rgba(255,255,255,0.025)', transition:'all 0.15s',
        }}>
          <span style={{ width:'18px', textAlign:'center', fontSize:'14px' }}>🔑</span>
          <span>Admin Panel</span>
        </Link>
        <div style={{ padding:'10px 12px', borderRadius:'10px', background:'rgba(0,255,170,0.04)', border:'1px solid rgba(0,255,170,0.08)' }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#475569', marginBottom:'4px' }}>NVD + OTX LIVE</div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ width:'7px', height:'7px', borderRadius:'9999px', background:'#00ffaa', animation:'pulse-dot 2s ease-in-out infinite', flexShrink:0 }}/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#00ffaa' }}>Connected</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
