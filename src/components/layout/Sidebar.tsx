'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUser, isLoggedIn, clearSession } from '@/lib/eso-auth'

// Auth requirement levels
// 'none'  = public, anyone can access
// 'user'  = requires login
// 'pro'   = requires pro/enterprise/admin
// 'admin' = requires admin

const SECTIONS = [
  { label:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',    href:'/dashboard',      auth:'none' },
    { icon:'🗺', label:'Threat Map',   href:'/threat-map',     auth:'none', badge:'LIVE' },
    { icon:'📡', label:'CVE Tracker',  href:'/cve',            auth:'none' },
    { icon:'📰', label:'News Feed',    href:'/news',           auth:'none' },
  ]},
  { label:'Exploits', items:[
    { icon:'💉', label:'Browse',       href:'/exploits',       auth:'none' },
    { icon:'⬆',  label:'Upload PoC',  href:'/exploits/upload',auth:'user' },
    { icon:'📦', label:'Payloads',     href:'/payloads',       auth:'none' },
    { icon:'🧬', label:'DNA Analysis', href:'/dna',            auth:'none' },
  ]},
  { label:'Tools', items:[
    { icon:'🐳', label:'Playground',   href:'/playground',     auth:'none' },
    { icon:'🔭', label:'Scanner',      href:'/scanner',        auth:'none' },
    { icon:'🕵', label:'OSINT',        href:'/osint',          auth:'none' },
    { icon:'📊', label:'Reports',      href:'/reports',        auth:'user' },
  ]},
  { label:'Community', items:[
    { icon:'🏆', label:'CTF',          href:'/ctf',            auth:'none', badge:'NEW' },
    { icon:'📈', label:'Leaderboard',  href:'/leaderboard',   auth:'none' },
    { icon:'🤖', label:'AI Assistant', href:'/ai',             auth:'none' },
    { icon:'📚', label:'Learn',        href:'/learn',          auth:'user' },
    { icon:'💬', label:'Chatroom',     href:'/chatroom',       auth:'none' },
  ]},
  { label:'Scan Engine', items:[
    { icon:'⚡', label:'Scan Dashboard',href:'/scan',          auth:'user' },
    { icon:'🔍', label:'Findings',      href:'/findings',      auth:'user' },
    { icon:'🛡', label:'Attack Surface',href:'/attack-surface',auth:'pro' },
    { icon:'⏰', label:'Schedules',     href:'/schedules',     auth:'pro' },
    { icon:'📋', label:'Scan History',  href:'/scan-history',  auth:'user' },
    { icon:'👥', label:'Teams',         href:'/teams',         auth:'pro' },
    { icon:'📝', label:'Audit Log',     href:'/audit',         auth:'user' },
    { icon:'⚙',  label:'Settings',      href:'/settings',      auth:'user' },
  ]},
]

function useAuth() {
  const [user,     setUser]     = useState<any>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const refresh = () => { setUser(getUser()); setLoggedIn(isLoggedIn()) }
    refresh()
    window.addEventListener('eso-auth-change', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('eso-auth-change', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [])

  return { user, loggedIn }
}

type AccessState = 'open' | 'locked-login' | 'locked-pro'

function canAccess(authLevel: string, user: any, loggedIn: boolean): AccessState {
  if (authLevel === 'none') return 'open'
  if (!loggedIn) return 'locked-login'
  if (authLevel === 'user') return 'open'
  const tier = user?.tier ?? 'free'
  const role = user?.role ?? 'user'
  if (role === 'admin') return 'open'
  if (authLevel === 'pro') return ['pro','enterprise','admin'].includes(tier) ? 'open' : 'locked-pro'
  return 'open'
}

export function Sidebar() {
  const path               = usePathname()
  const router             = useRouter()
  const { user, loggedIn } = useAuth()
  const [isDesktop, setIsDesktop] = useState(false)
  const [mounted,   setMounted]   = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check(); setMounted(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!mounted || !isDesktop) return null

  const isAdmin  = user?.role === 'admin'
  const userTier = user?.tier ?? 'free'

  function handleLogout() { clearSession(); router.push('/login') }

  function handleLockedClick(e: React.MouseEvent, item: any, access: AccessState) {
    e.preventDefault()
    if (access === 'locked-login') router.push(`/login?from=${item.href.slice(1)}`)
    if (access === 'locked-pro')   router.push('/pricing')
  }

  const TIER_COLOR: Record<string,string> = { free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#00ffaa' }

  return (
    <aside style={{
      position:'fixed', left:0, top:'52px', bottom:28, width:'220px',
      zIndex:90, display:'flex', flexDirection:'column',
      background:'rgba(3,5,10,0.65)',
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderRight:'1px solid rgba(255,255,255,0.06)',
    }}>

      {/* Scrollable nav */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 0 8px' }}>
        {SECTIONS.map(sec => (
          <div key={sec.label} style={{ marginBottom:'16px', padding:'0 12px' }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'0.15em', color:'#475569', textTransform:'uppercase', padding:'0 8px 6px' }}>
              {sec.label}
            </div>
            {sec.items.map(item => {
              const active  = !!path?.startsWith(item.href)
              const access  = canAccess(item.auth, user, loggedIn)
              const locked  = access !== 'open'

              return (
                <Link
                  key={item.href}
                  href={locked ? '#' : item.href}
                  onClick={locked ? (e) => handleLockedClick(e, item, access) : undefined}
                  style={{
                    display:'flex', alignItems:'center', gap:'10px',
                    padding: active ? '8px 8px' : '8px 10px',
                    borderRadius:'8px', marginBottom:'2px',
                    fontSize:'13px', fontWeight:600, textDecoration:'none',
                    color: locked ? '#334155' : active ? '#00ffaa' : '#64748b',
                    borderLeft: active ? '2px solid #00ffaa' : '2px solid transparent',
                    background: active ? 'linear-gradient(90deg,rgba(0,255,170,0.08),transparent)' : 'transparent',
                    transition:'all 0.15s',
                    cursor: locked ? 'not-allowed' : 'pointer',
                  }}>
                  <span style={{ width:'18px', textAlign:'center', fontSize:'14px', flexShrink:0, opacity: locked ? 0.4 : 1 }}>{item.icon}</span>
                  <span style={{ flex:1, opacity: locked ? 0.5 : 1 }}>{item.label}</span>
                  {item.badge && !locked && (
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', padding:'1px 5px', borderRadius:'3px',
                      background: item.badge==='LIVE'?'rgba(255,58,92,0.2)':'rgba(0,255,170,0.1)',
                      color: item.badge==='LIVE'?'#ff3a5c':'#00ffaa' }}>
                      {item.badge}
                    </span>
                  )}
                  {locked && (
                    <span style={{ fontSize:'10px', opacity:0.5 }}>
                      {access === 'locked-pro' ? '⭐' : '🔒'}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Bottom: user info + admin */}
      <div style={{ flexShrink:0, padding:'8px 12px 12px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>

        {/* Admin link */}
        {isAdmin && (
          <Link href="/admin" style={{
            display:'flex', alignItems:'center', gap:'10px',
            padding:'8px 10px', borderRadius:'8px', marginBottom:'8px',
            fontSize:'12px', fontWeight:700, textDecoration:'none',
            color:'#ff3a5c', border:'1px solid rgba(255,58,92,0.2)',
            background:'rgba(255,58,92,0.06)',
          }}>
            <span style={{ width:'18px', textAlign:'center' }}>🔑</span>
            <span>Admin Panel</span>
          </Link>
        )}

        {/* User card or Sign in */}
        {loggedIn && user ? (
          <div style={{ padding:'10px 12px', borderRadius:'10px', background:'rgba(0,255,170,0.04)', border:'1px solid rgba(0,255,170,0.08)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
              <div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'#00ffaa', fontWeight:700 }}>{user.username}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', color: TIER_COLOR[userTier], marginTop:'2px', textTransform:'capitalize' }}>
                  {isAdmin ? '⭐ admin' : `${userTier} tier`}
                </div>
              </div>
              <button onClick={handleLogout} style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#475569', background:'none', border:'none', cursor:'pointer' }}>
                out
              </button>
            </div>
            {!isAdmin && userTier === 'free' && (
              <Link href="/pricing" style={{ display:'block', textAlign:'center', fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#00aaff', textDecoration:'none', marginTop:'4px' }}>
                ↑ Upgrade to Pro
              </Link>
            )}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
            <div style={{ display:'flex', gap:'6px' }}>
              <Link href="/login" style={{ flex:1, display:'block', textAlign:'center', padding:'8px', borderRadius:'8px', fontFamily:"'Space Mono',monospace", fontSize:'11px', fontWeight:700, textDecoration:'none', color:'#00ffaa', background:'rgba(0,255,170,0.08)', border:'1px solid rgba(0,255,170,0.2)' }}>
                Sign In
              </Link>
              <Link href="/register" style={{ flex:1, display:'block', textAlign:'center', padding:'8px', borderRadius:'8px', fontFamily:"'Space Mono',monospace", fontSize:'11px', fontWeight:700, textDecoration:'none', color:'#64748b', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                Register
              </Link>
            </div>
            <Link href="/admin/login" style={{ display:'block', textAlign:'center', padding:'6px', borderRadius:'8px', fontFamily:"'Space Mono',monospace", fontSize:'10px', textDecoration:'none', color:'#475569', background:'rgba(255,58,92,0.04)', border:'1px solid rgba(255,58,92,0.1)' }}>
              🔑 Admin Login
            </Link>
          </div>
        )}

        {/* NVD + OTX status */}
        <div style={{ marginTop:'8px', padding:'8px 12px', borderRadius:'10px', background:'rgba(0,255,170,0.03)', border:'1px solid rgba(0,255,170,0.07)' }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', color:'#475569', marginBottom:'3px' }}>NVD + OTX LIVE</div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
            <div style={{ width:'7px', height:'7px', borderRadius:'9999px', background:'#00ffaa', animation:'pulse-dot 2s ease-in-out infinite', flexShrink:0 }}/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'#00ffaa' }}>Connected</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
