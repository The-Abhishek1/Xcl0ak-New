'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const TABS = [
  { icon: '⬡', label: 'Home',     href: '/dashboard' },
  { icon: '📡', label: 'CVE',     href: '/cve' },
  { icon: '🗺', label: 'Threats', href: '/threat-map' },
  { icon: '💉', label: 'Exploits',href: '/exploits' },
]

const ALL_NAV = [
  { section:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',   href:'/dashboard' },
    { icon:'🗺', label:'Threat Map',  href:'/threat-map', badge:'LIVE' },
    { icon:'📡', label:'CVE Tracker', href:'/cve' },
    { icon:'📰', label:'News',        href:'/news' },
  ]},
  { section:'Exploits', items:[
    { icon:'💉', label:'Browse',      href:'/exploits' },
    { icon:'⬆',  label:'Upload',     href:'/exploits/upload' },
    { icon:'📦', label:'Payloads',   href:'/payloads' },
    { icon:'🧬', label:'DNA',        href:'/dna' },
  ]},
  { section:'Tools', items:[
    { icon:'🔭', label:'Scanner',    href:'/scanner' },
    { icon:'🕵', label:'OSINT',      href:'/osint' },
    { icon:'📊', label:'Reports',    href:'/reports' },
    { icon:'🐳', label:'Sandbox',    href:'/playground' },
  ]},
  { section:'Community', items:[
    { icon:'🏆', label:'CTF',        href:'/ctf' },
    { icon:'📈', label:'Leaderboard',href:'/leaderboard' },
    { icon:'🤖', label:'AI',         href:'/ai' },
    { icon:'📚', label:'Learn',      href:'/learn' },
  ]},
]

// Styles as constants so no Tailwind conflict
const S = {
  bar: {
    position: 'fixed' as const,
    bottom: 25, left: 0, right: 0,
    height: '56px',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    gap: '2px',
    background: 'rgba(5,8,15,0.98)',
    borderTop: '1px solid rgba(255,255,255,0.09)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
  },
  tab: (active: boolean) => ({
    flex: 1,
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: '3px',
    paddingTop: '5px', paddingBottom: '5px',
    borderRadius: '10px',
    textDecoration: 'none',
    color: active ? '#00ffaa' : '#475569',
    background: active ? 'rgba(0,255,170,0.1)' : 'transparent',
    border: 'none', cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  tabIcon: { fontSize: '18px', lineHeight: 1 },
  tabLabel: { fontFamily: "'Space Mono', monospace", fontSize: '9px', lineHeight: 1 },
}

export function MobileNav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    setMounted(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Don't render until mounted (avoids hydration mismatch)
  if (!mounted || !isMobile) return null

  return (
    <>
      {/* Bottom tab bar */}
      <div style={S.bar}>
        {TABS.map(item => {
          const active = path?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} style={S.tab(active!)}>
              <span style={S.tabIcon}>{item.icon}</span>
              <span style={S.tabLabel}>{item.label}</span>
            </Link>
          )
        })}
        {/* More */}
        <button onClick={() => setOpen(true)} style={S.tab(open)}>
          <span style={S.tabIcon}>☰</span>
          <span style={S.tabLabel}>More</span>
        </button>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: '#060b14',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px 20px 0 0',
              maxHeight: '85vh',
              overflowY: 'auto',
              animation: 'slide-up 0.2s ease-out',
            }}>

            {/* Handle */}
            <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 8px' }}>
              <div style={{ width:'36px', height:'4px', borderRadius:'99px', background:'rgba(255,255,255,0.15)' }}/>
            </div>

            {/* Header */}
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'4px 16px 12px', borderBottom:'1px solid rgba(255,255,255,0.07)',
            }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:'18px' }}>
                X<span style={{color:'#00ffaa'}}>cloak</span>
              </span>
              <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#64748b', fontSize:'22px', lineHeight:1 }}>✕</button>
            </div>

            {/* Sections */}
            <div style={{ padding:'12px 12px 80px' }}>
              {ALL_NAV.map(sec => (
                <div key={sec.section} style={{ marginBottom:'20px' }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace", fontSize:'9px',
                    letterSpacing:'0.14em', color:'#475569',
                    textTransform:'uppercase', padding:'0 4px 8px',
                  }}>
                    {sec.section}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'6px' }}>
                    {sec.items.map(item => {
                      const active = path?.startsWith(item.href)
                      return (
                        <Link key={item.href} href={item.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display:'flex', flexDirection:'column', alignItems:'center',
                            gap:'5px', padding:'10px 2px', borderRadius:'12px',
                            background: active ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${active ? 'rgba(0,255,170,0.25)' : 'rgba(255,255,255,0.06)'}`,
                            textDecoration:'none', position:'relative',
                          }}>
                          {(item as any).badge && (
                            <span style={{
                              position:'absolute', top:'3px', right:'3px',
                              fontFamily:"'Space Mono',monospace", fontSize:'7px',
                              padding:'1px 3px', borderRadius:'3px', fontWeight:700,
                              background:(item as any).badge==='LIVE'?'rgba(255,58,92,0.85)':'rgba(0,255,170,0.85)',
                              color:'#000',
                            }}>{(item as any).badge}</span>
                          )}
                          <span style={{ fontSize:'22px', lineHeight:1 }}>{item.icon}</span>
                          <span style={{
                            fontFamily:"'Space Mono',monospace", fontSize:'9px',
                            color: active ? '#00ffaa' : '#94a3b8',
                            textAlign:'center', lineHeight:1.3,
                          }}>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}

              <a href="/admin" onClick={() => setOpen(false)} style={{
                display:'block', textAlign:'center', padding:'11px',
                fontFamily:"'Space Mono',monospace", fontSize:'11px',
                background:'rgba(255,255,255,0.04)', borderRadius:'10px',
                border:'1px solid rgba(255,255,255,0.07)',
                color:'#64748b', textDecoration:'none',
              }}>🔑 Admin Panel</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
