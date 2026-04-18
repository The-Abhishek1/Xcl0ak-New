'use client'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, isLoggedIn, clearSession } from '@/lib/eso-auth'

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

const TIER_COLOR: Record<string,string> = {
  free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#ff3a5c'
}

export function Topbar() {
  const router             = useRouter()
  const { user, loggedIn } = useAuth()
  const [sync,       setSync]       = useState<'idle'|'syncing'|'done'>('idle')
  const [notifOpen,  setNotifOpen]  = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [recentNotifs, setRecentNotifs] = useState<any[]>([])
  const [userOpen,   setUserOpen]   = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef  = useRef<HTMLDivElement>(null)

  // Poll unread notification count every 30s
  useEffect(() => {
    async function fetchUnread() {
      const u = getUser()
      if (!u?.username) return
      try {
        const res  = await fetch(`/api/v1/notifications?alias=${encodeURIComponent(u.username)}&limit=5`)
        const data = await res.json()
        setUnreadCount(data.unread ?? 0)
        setRecentNotifs(data.notifications ?? [])
      } catch {}
    }
    fetchUnread()
    const t = setInterval(fetchUnread, 30000)
    return () => clearInterval(t)
  }, [loggedIn])

  // Close dropdowns on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (userRef.current  && !userRef.current.contains(e.target as Node))  setUserOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function doSync() {
    setSync('syncing')
    try { await fetch('/api/v1/sync', { method:'POST' }); setSync('done'); setTimeout(()=>setSync('idle'), 3000) }
    catch { setSync('idle') }
  }

  function logout() {
    clearSession()
    setUserOpen(false)
    router.push('/login')
  }

  const tier  = user?.role === 'admin' ? 'admin' : (user?.tier ?? 'free')
  const tColor = TIER_COLOR[tier] ?? '#64748b'

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[52px] z-[100] flex items-center px-4 gap-3"
      style={{
        background:'rgba(3,5,10,0.95)',
        backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 shrink-0" style={{textDecoration:'none'}}>
        <span
          className="w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0"
          style={{background:'linear-gradient(135deg,#00ffaa,#00aaff)'}}>
          🛡
        </span>
        <span className="font-black text-[16px] tracking-tight">
          X<span style={{color:'#00ffaa'}}>cloak</span>
        </span>
      </Link>

      {/* Spacer */}
      <div className="flex-1"/>

      {/* Right controls — neatly grouped */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Sync */}
        <button
          onClick={doSync}
          title="Sync threat feeds"
          className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all"
          style={{
            background: sync==='done' ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
            border:     sync==='done' ? '1px solid rgba(0,255,170,0.3)' : '1px solid rgba(255,255,255,0.08)',
            color:      sync==='done' ? '#00ffaa' : '#64748b',
            fontSize:   '14px',
          }}>
          {sync==='syncing' ? '⟳' : sync==='done' ? '✓' : '↻'}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={()=>setNotifOpen(v=>!v)}
            title="Notifications"
            className="relative flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-all"
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
            <span style={{fontSize:'14px'}}>🔔</span>
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-mono text-[7px] font-bold"
                style={{background:'#ff3a5c',color:'#fff',padding:'0 2px'}}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-11 w-72 rounded-xl shadow-2xl z-50"
              style={{background:'rgba(6,9,16,0.98)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(24px)'}}>
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Notifications</span>
                <button onClick={async()=>{
                  const u=getUser();if(!u?.username)return
                  await fetch('/api/v1/notifications/read',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({alias:u.username})})
                  setUnreadCount(0);setRecentNotifs(p=>p.map((n:any)=>({...n,read:true})))
                }} className="font-mono text-[9px] text-accent cursor-pointer hover:underline">Mark read</button>
              </div>
              {recentNotifs.length === 0 ? (
                <div className="px-4 py-6 text-center font-mono text-[10px] text-slate-700">No notifications yet</div>
              ) : recentNotifs.slice(0,4).map((n:any) => (
                <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] cursor-pointer transition-colors border-b border-white/[0.03] last:border-0">
                  <span className="text-[13px] mt-0.5 shrink-0">
                    {n.type==='cve_alert'?'🚨':n.type==='ctf_solve'?'🏆':n.type==='exploit_upload'?'📦':n.type==='payment'?'💳':'📢'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[11px] text-slate-300 leading-snug truncate">{n.title}</p>
                    <p className="font-mono text-[9px] text-slate-600 mt-0.5">{n.body?.slice(0,60)}</p>
                  </div>
                  {!n.read && <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{background:'#00ffaa'}}/>}
                </div>
              ))}
              <div className="px-4 py-2 border-t border-white/[0.06] text-center">
                <Link href="/notifications" onClick={()=>setNotifOpen(false)} className="font-mono text-[9px] text-accent hover:underline">
                  View all
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Chatroom */}
        <Link
          href="/chatroom"
          title="Chatroom"
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
          style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
          <span style={{fontSize:'14px'}}>💬</span>
        </Link>

        {/* User button */}
        <div ref={userRef} className="relative">
          {loggedIn && user ? (
            <>
              <button
                onClick={()=>setUserOpen(v=>!v)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg cursor-pointer transition-all"
                style={{background:'rgba(0,255,170,0.06)',border:`1px solid ${tColor}30`,color:'#e2e8f0'}}>
                <span style={{fontSize:'12px'}}>👤</span>
                <span className="font-mono text-[10px] font-bold text-slate-200 hidden sm:inline">
                  {(user.username ?? 'user').slice(0,12)}
                </span>
                <span
                  className="font-mono text-[8px] font-bold px-1.5 py-[1px] rounded-full"
                  style={{background:`${tColor}22`,color:tColor,border:`1px solid ${tColor}30`}}>
                  {tier.toUpperCase().slice(0,4)}
                </span>
              </button>

              {userOpen && (
                <div
                  className="absolute right-0 top-11 w-52 rounded-xl shadow-2xl z-50"
                  style={{background:'rgba(6,9,16,0.98)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(24px)'}}>
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <div className="font-mono text-[12px] text-slate-200 font-bold">{user.username}</div>
                    <div className="font-mono text-[9px] text-slate-600 mt-0.5 truncate">{user.email}</div>
                  </div>
                  {[
                    {label:'My Settings',    href:'/settings',  icon:'⚙'},
                    {label:'Scan Dashboard', href:'/scan',       icon:'⚡'},
                    {label:'My Findings',    href:'/findings',   icon:'🔍'},
                    ...(user.role==='admin'      ? [{label:'Admin Panel',  href:'/admin',   icon:'🔑'}] : []),
                    ...(tier==='free'            ? [{label:'Upgrade Plan', href:'/pricing', icon:'⬆'}] : []),
                  ].map(item=>(
                    <Link key={item.href} href={item.href} onClick={()=>setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/[0.03] transition-colors"
                      style={{textDecoration:'none'}}>
                      <span style={{fontSize:'12px'}}>{item.icon}</span>
                      <span className="font-mono text-[11px] text-slate-400">{item.label}</span>
                    </Link>
                  ))}
                  <div className="border-t border-white/[0.06]">
                    <button onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-white/[0.03] transition-colors cursor-pointer">
                      <span style={{fontSize:'12px'}}>🚪</span>
                      <span className="font-mono text-[11px] text-red-400">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center h-8 px-3 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all"
              style={{color:'#00ffaa',background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.2)'}}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
