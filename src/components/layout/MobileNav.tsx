'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getUser, isLoggedIn, clearSession } from '@/lib/eso-auth'

// auth levels:
// 'none'  → always accessible
// 'user'  → requires login (any tier)
// 'pro'   → requires pro/enterprise/admin tier
const TABS = [
  { icon:'⬡', label:'Home',     href:'/dashboard' },
  { icon:'📡', label:'CVE',     href:'/cve' },
  { icon:'🗺', label:'Threats', href:'/threat-map' },
  { icon:'💉', label:'Exploits',href:'/exploits' },
]

const ALL_NAV = [
  { section:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',  href:'/dashboard',  auth:'none' },
    { icon:'🗺', label:'Threat Map', href:'/threat-map', auth:'none', badge:'LIVE' },
    { icon:'📡', label:'CVE',        href:'/cve',        auth:'none' },
    { icon:'📰', label:'News',       href:'/news',       auth:'none' },
  ]},
  { section:'Exploits', items:[
    { icon:'💉', label:'Browse',   href:'/exploits',        auth:'none' },
    { icon:'⬆',  label:'Upload',  href:'/exploits/upload', auth:'user' },
    { icon:'📦', label:'Payloads', href:'/payloads',        auth:'none' },
    { icon:'🧬', label:'DNA',      href:'/dna',             auth:'none' },
  ]},
  { section:'Tools', items:[
    { icon:'🔭', label:'Scanner',  href:'/scanner',    auth:'none' },
    { icon:'🕵', label:'OSINT',    href:'/osint',      auth:'none' },
    { icon:'📊', label:'Reports',  href:'/reports',    auth:'user' },
    { icon:'🐳', label:'Sandbox',  href:'/playground', auth:'none' },
  ]},
  { section:'Community', items:[
    { icon:'🏆', label:'CTF',         href:'/ctf',         auth:'none' },
    { icon:'📈', label:'Leaderboard', href:'/leaderboard', auth:'none' },
    { icon:'🤖', label:'AI',          href:'/ai',          auth:'none' },
    { icon:'💬', label:'Chatroom',    href:'/chatroom',    auth:'none' },
  ]},
  { section:'Scan Engine', items:[
    { icon:'⚡', label:'Scans',    href:'/scan',           auth:'user' },
    { icon:'🔍', label:'Findings', href:'/findings',       auth:'user' },
    { icon:'🛡', label:'Surface',  href:'/attack-surface', auth:'pro'  },
    { icon:'⏰', label:'Schedule', href:'/schedules',      auth:'pro'  },
    { icon:'📋', label:'History',  href:'/scan-history',   auth:'user' },
    { icon:'👥', label:'Teams',    href:'/teams',          auth:'pro'  },
    { icon:'⚙',  label:'Settings', href:'/settings',      auth:'user' },
  ]},
]

const TIER_COLOR: Record<string,string> = {
  free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#00ffaa'
}

function canAccess(auth: string, loggedIn: boolean, tier: string, role: string): 'open'|'locked-login'|'locked-pro' {
  if (auth === 'none') return 'open'
  if (!loggedIn) return 'locked-login'
  if (auth === 'user') return 'open'
  if (auth === 'pro') {
    if (role === 'admin' || ['pro','enterprise','admin'].includes(tier)) return 'open'
    return 'locked-pro'
  }
  return 'open'
}

const S = {
  bar: {
    position:'fixed' as const, bottom:31, left:0, right:0, height:'56px',
    zIndex:100, display:'flex', alignItems:'center', padding:'0 4px', gap:'2px',
    background:'rgba(5,8,15,0.98)', borderTop:'1px solid rgba(255,255,255,0.09)',
    backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
  },
  tab: (active: boolean) => ({
    flex:1, display:'flex' as const, flexDirection:'column' as const,
    alignItems:'center' as const, justifyContent:'center' as const,
    gap:'3px', paddingTop:'5px', paddingBottom:'5px', borderRadius:'10px',
    textDecoration:'none', color: active ? '#00ffaa' : '#475569',
    background: active ? 'rgba(0,255,170,0.1)' : 'transparent',
    border:'none', cursor:'pointer', transition:'all 0.15s',
  }),
}

export function MobileNav() {
  const path   = usePathname()
  const router = useRouter()
  const [open,     setOpen]     = useState(false)
  const [mounted,  setMounted]  = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [user,     setUser]     = useState<any>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkSize   = () => setIsMobile(window.innerWidth <= 768)
    const refreshAuth = () => { setUser(getUser()); setLoggedIn(isLoggedIn()) }
    checkSize(); refreshAuth(); setMounted(true)
    window.addEventListener('resize', checkSize)
    window.addEventListener('eso-auth-change', refreshAuth)
    window.addEventListener('storage', refreshAuth)
    return () => {
      window.removeEventListener('resize', checkSize)
      window.removeEventListener('eso-auth-change', refreshAuth)
      window.removeEventListener('storage', refreshAuth)
    }
  }, [])

  if (!mounted || !isMobile) return null

  const isAdmin  = user?.role === 'admin'
  const userTier = isAdmin ? 'admin' : (user?.tier ?? 'free')
  const userRole = user?.role ?? 'user'

  function handleNav(href: string, auth: string) {
    const access = canAccess(auth, loggedIn, userTier, userRole)
    setOpen(false)
    if (access === 'locked-login') { router.push(`/login?from=${href.slice(1)}`); return }
    if (access === 'locked-pro')   { router.push('/pricing'); return }
    router.push(href)
  }

  return (
    <>
      {/* Bottom bar */}
      <div style={S.bar}>
        {TABS.map(item => {
          const active = !!path?.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} style={S.tab(active)}>
              <span style={{fontSize:'18px',lineHeight:1}}>{item.icon}</span>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',lineHeight:1}}>{item.label}</span>
            </Link>
          )
        })}
        <button onClick={()=>setOpen(true)} style={S.tab(open)}>
          <span style={{fontSize:'18px',lineHeight:1}}>☰</span>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',lineHeight:1}}>More</span>
        </button>
      </div>

      {/* Drawer */}
      {open && (
        <div onClick={()=>setOpen(false)}
          style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.8)',backdropFilter:'blur(6px)'}}>
          <div onClick={e=>e.stopPropagation()}
            style={{
              position:'absolute',bottom:0,left:0,right:0,
              background:'#060b14',borderTop:'1px solid rgba(255,255,255,0.1)',
              borderRadius:'20px 20px 0 0',maxHeight:'85vh',overflowY:'auto',
            }}>

            {/* Handle */}
            <div style={{display:'flex',justifyContent:'center',padding:'12px 0 8px'}}>
              <div style={{width:'36px',height:'4px',borderRadius:'99px',background:'rgba(255,255,255,0.15)'}}/>
            </div>

            {/* Header */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 16px 12px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:'18px'}}>
                  X<span style={{color:'#00ffaa'}}>cloak</span>
                </span>
                {loggedIn && user && (
                  <div style={{display:'flex',alignItems:'center',gap:'5px',padding:'3px 8px',borderRadius:'20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:'10px',fontWeight:700,color:TIER_COLOR[userTier]}}>{user.username}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8px',padding:'1px 4px',borderRadius:'4px',background:`${TIER_COLOR[userTier]}20`,color:TIER_COLOR[userTier]}}>
                      {userTier.toUpperCase().slice(0,4)}
                    </span>
                  </div>
                )}
              </div>
              <button onClick={()=>setOpen(false)} style={{background:'none',border:'none',cursor:'pointer',color:'#64748b',fontSize:'22px',lineHeight:1}}>✕</button>
            </div>

            <div style={{padding:'12px 12px 80px'}}>
              {ALL_NAV.map(sec=>(
                <div key={sec.section} style={{marginBottom:'20px'}}>
                  <div style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',letterSpacing:'0.14em',color:'#475569',textTransform:'uppercase',padding:'0 4px 8px'}}>
                    {sec.section}
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px'}}>
                    {sec.items.map(item=>{
                      const access = canAccess(item.auth, loggedIn, userTier, userRole)
                      const active = !!path?.startsWith(item.href)
                      const locked = access !== 'open'

                      return (
                        <button
                          key={item.href}
                          onClick={()=>handleNav(item.href, item.auth)}
                          style={{
                            display:'flex',flexDirection:'column',alignItems:'center',
                            gap:'5px',padding:'10px 2px',borderRadius:'12px',
                            background: active?'rgba(0,255,170,0.1)':'rgba(255,255,255,0.04)',
                            border:`1px solid ${active?'rgba(0,255,170,0.25)':'rgba(255,255,255,0.06)'}`,
                            cursor:'pointer',position:'relative',
                            opacity: locked ? 0.4 : 1,
                          }}>
                          {(item as any).badge && !locked && (
                            <span style={{position:'absolute',top:'3px',right:'3px',fontFamily:"'Space Mono',monospace",fontSize:'7px',padding:'1px 3px',borderRadius:'3px',fontWeight:700,background:(item as any).badge==='LIVE'?'rgba(255,58,92,0.85)':'rgba(0,255,170,0.85)',color:'#000'}}>
                              {(item as any).badge}
                            </span>
                          )}
                          {/* Lock badge */}
                          {locked && (
                            <span style={{position:'absolute',top:'3px',right:'3px',fontSize:'8px'}}>
                              {access==='locked-pro' ? '⭐' : '🔒'}
                            </span>
                          )}
                          <span style={{fontSize:'22px',lineHeight:1}}>{item.icon}</span>
                          <span style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',color:active?'#00ffaa':locked?'#334155':'#94a3b8',textAlign:'center',lineHeight:1.3}}>
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Auth footer — context-aware */}
              {loggedIn && user ? (
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <div style={{display:'flex',gap:'8px'}}>
                    <button onClick={()=>handleNav('/settings','user')}
                      style={{flex:1,padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(0,255,170,0.06)',borderRadius:'10px',border:'1px solid rgba(0,255,170,0.15)',color:'#00ffaa',cursor:'pointer'}}>
                      ⚙ Settings
                    </button>
                    <button onClick={()=>{clearSession();setOpen(false);router.push('/login')}}
                      style={{flex:1,padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(255,58,92,0.06)',borderRadius:'10px',border:'1px solid rgba(255,58,92,0.15)',color:'#ff3a5c',cursor:'pointer'}}>
                      🚪 Sign Out
                    </button>
                  </div>
                  {isAdmin && (
                    <button onClick={()=>handleNav('/admin','none')}
                      style={{width:'100%',padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(255,58,92,0.08)',borderRadius:'10px',border:'1px solid rgba(255,58,92,0.2)',color:'#ff3a5c',cursor:'pointer'}}>
                      🔑 Admin Panel
                    </button>
                  )}
                  {!isAdmin && userTier==='free' && (
                    <button onClick={()=>handleNav('/pricing','none')}
                      style={{width:'100%',padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(0,170,255,0.08)',borderRadius:'10px',border:'1px solid rgba(0,170,255,0.2)',color:'#00aaff',cursor:'pointer'}}>
                      ⭐ Upgrade to Pro
                    </button>
                  )}
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
                  <div style={{display:'flex',gap:'8px'}}>
                    <a href="/login" onClick={()=>setOpen(false)}
                      style={{flex:1,display:'block',textAlign:'center',padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(0,255,170,0.08)',borderRadius:'10px',border:'1px solid rgba(0,255,170,0.2)',color:'#00ffaa',textDecoration:'none'}}>
                      Sign In
                    </a>
                    <a href="/register" onClick={()=>setOpen(false)}
                      style={{flex:1,display:'block',textAlign:'center',padding:'11px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,background:'rgba(255,255,255,0.04)',borderRadius:'10px',border:'1px solid rgba(255,255,255,0.08)',color:'#64748b',textDecoration:'none'}}>
                      Register
                    </a>
                  </div>
                  <a href="/admin/login" onClick={()=>setOpen(false)}
                    style={{display:'block',textAlign:'center',padding:'10px',fontFamily:"'Space Mono',monospace",fontSize:'11px',background:'rgba(255,58,92,0.06)',borderRadius:'10px',border:'1px solid rgba(255,58,92,0.15)',color:'#ff3a5c',textDecoration:'none'}}>
                    🔑 Admin Login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
