'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const TABS = [
  { icon: '⬡', label: 'Home',     href: '/dashboard' },
  { icon: '📡', label: 'CVE',     href: '/cve' },
  { icon: '🗺', label: 'Threats', href: '/threat-map' },
  { icon: '💉', label: 'Exploits',href: '/exploits' },
]

const ALL_NAV = [
  { section:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',    href:'/dashboard' },
    { icon:'🗺', label:'Threat Map',   href:'/threat-map', badge:'LIVE' },
    { icon:'📡', label:'CVE Tracker',  href:'/cve' },
    { icon:'📰', label:'News Feed',    href:'/news' },
  ]},
  { section:'Exploits', items:[
    { icon:'💉', label:'Browse',       href:'/exploits' },
    { icon:'⬆',  label:'Upload PoC',  href:'/exploits/upload' },
    { icon:'📦', label:'Payloads',    href:'/payloads' },
    { icon:'🧬', label:'DNA',         href:'/dna' },
  ]},
  { section:'Tools', items:[
    { icon:'🔭', label:'Scanner',     href:'/scanner' },
    { icon:'🕵', label:'OSINT',       href:'/osint' },
    { icon:'📊', label:'Reports',     href:'/reports' },
    { icon:'🐳', label:'Playground',  href:'/playground' },
  ]},
  { section:'Community', items:[
    { icon:'🏆', label:'CTF',         href:'/ctf' },
    { icon:'📈', label:'Leaderboard', href:'/leaderboard' },
    { icon:'🤖', label:'AI',          href:'/ai' },
    { icon:'📚', label:'Learn',       href:'/learn' },
  ]},
]

export function MobileNav() {
  const path = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bottom tab bar — CSS class controls visibility */}
      <div className="mobile-nav-bar fixed bottom-7 left-0 right-0 h-[56px] z-[100] items-center px-1 gap-0.5"
        style={{
          background: 'rgba(5,8,15,0.98)',
          borderTop: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}>
        {TABS.map(item => {
          const active = path?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                       justifyContent: 'center', gap: '2px', paddingTop: '6px', paddingBottom: '6px',
                       borderRadius: '10px',
                       color: active ? '#00ffaa' : '#475569',
                       background: active ? 'rgba(0,255,170,0.08)' : 'transparent',
                     }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', lineHeight: 1 }}>{item.label}</span>
            </Link>
          )
        })}

        {/* More button */}
        <button onClick={() => setOpen(true)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                   justifyContent: 'center', gap: '2px', paddingTop: '6px', paddingBottom: '6px',
                   borderRadius: '10px', border: 'none', cursor: 'pointer',
                   color: open ? '#00ffaa' : '#475569',
                   background: open ? 'rgba(0,255,170,0.08)' : 'transparent',
                 }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>☰</span>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', lineHeight: 1 }}>More</span>
        </button>
      </div>

      {/* Full-screen drawer */}
      {open && (
        <div
          style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}
          onClick={() => setOpen(false)}>
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: '#080d17',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '20px 20px 0 0',
              maxHeight: '82vh',
              overflowY: 'auto',
              animation: 'slide-up 0.22s ease-out',
            }}
            onClick={e => e.stopPropagation()}>

            {/* Handle bar */}
            <div style={{ display:'flex', justifyContent:'center', paddingTop:'12px', paddingBottom:'8px' }}>
              <div style={{ width:'40px', height:'4px', borderRadius:'9999px', background:'rgba(255,255,255,0.15)' }}/>
            </div>

            {/* Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                          padding:'8px 16px 12px', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'17px' }}>
                X<span style={{color:'#00ffaa'}}>cloak</span>
              </span>
              <button onClick={() => setOpen(false)}
                style={{ color:'#64748b', fontSize:'20px', background:'none', border:'none', cursor:'pointer', lineHeight:1 }}>
                ✕
              </button>
            </div>

            {/* Nav sections */}
            <div style={{ padding:'12px 12px 80px' }}>
              {ALL_NAV.map(sec => (
                <div key={sec.section} style={{ marginBottom:'16px' }}>
                  <div style={{ fontFamily:'Space Mono, monospace', fontSize:'9px', letterSpacing:'0.12em',
                                color:'#475569', textTransform:'uppercase', padding:'0 4px 6px' }}>
                    {sec.section}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'6px' }}>
                    {sec.items.map(item => {
                      const active = path?.startsWith(item.href)
                      return (
                        <Link key={item.href} href={item.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            gap: '5px', padding: '10px 4px', borderRadius: '12px',
                            background: active ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${active ? 'rgba(0,255,170,0.25)' : 'rgba(255,255,255,0.06)'}`,
                            position: 'relative', textDecoration: 'none',
                          }}>
                          {item.badge && (
                            <span style={{
                              position: 'absolute', top: '4px', right: '4px',
                              fontFamily: 'Space Mono, monospace', fontSize: '7px',
                              padding: '1px 3px', borderRadius: '3px',
                              background: item.badge==='LIVE'?'rgba(255,58,92,0.8)':'rgba(0,255,170,0.8)',
                              color: '#000', fontWeight: 700,
                            }}>{item.badge}</span>
                          )}
                          <span style={{ fontSize: '22px', lineHeight: 1 }}>{item.icon}</span>
                          <span style={{
                            fontFamily: 'Space Mono, monospace', fontSize: '9px',
                            color: active ? '#00ffaa' : '#94a3b8', textAlign: 'center', lineHeight: 1.2,
                          }}>{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}

              <a href="/admin"
                style={{
                  display:'block', textAlign:'center', padding:'10px',
                  fontFamily:'Space Mono,monospace', fontSize:'11px',
                  background:'rgba(255,255,255,0.04)', borderRadius:'10px',
                  border:'1px solid rgba(255,255,255,0.07)', color:'#64748b',
                  textDecoration:'none', marginTop:'4px',
                }}>
                🔑 Admin Panel
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
