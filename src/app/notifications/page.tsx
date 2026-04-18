'use client'
import { useEffect, useState, useCallback } from 'react'
import { getUser, isLoggedIn } from '@/lib/eso-auth'
import { getAlias } from '@/lib/identity'
import Link from 'next/link'

interface Notif {
  id: string; type: string; title: string; body: string
  link?: string; read: boolean; createdAt: string
}

const TYPE_ICON: Record<string,string> = {
  cve_alert:'🚨', ctf_solve:'🏆', exploit_upload:'📦',
  payment:'💳', scan_complete:'✅', system:'📢',
}
const TYPE_COLOR: Record<string,string> = {
  cve_alert:'#ff3a5c', ctf_solve:'#00ffaa', exploit_upload:'#a78bfa',
  payment:'#00aaff', scan_complete:'#00ffaa', system:'#ffd700',
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}

export default function NotificationsPage() {
  const user     = getUser()
  const loggedIn = isLoggedIn()
  const alias    = loggedIn ? (user?.username ?? getAlias()) : getAlias()

  const [notifs,  setNotifs]  = useState<Notif[]>([])
  const [unread,  setUnread]  = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState<'all'|'unread'>('all')

  const load = useCallback(async () => {
    try {
      const res  = await fetch(`/api/v1/notifications?alias=${encodeURIComponent(alias)}&limit=50`)
      const data = await res.json()
      setNotifs(data.notifications ?? [])
      setUnread(data.unread ?? 0)
    } catch { setNotifs([]) }
    setLoading(false)
  }, [alias])

  useEffect(() => { load() }, [load])

  async function markAllRead() {
    await fetch('/api/v1/notifications/read', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ alias }),
    })
    setNotifs(prev => prev.map(n => ({ ...n, read:true })))
    setUnread(0)
  }

  async function markOneRead(id: string) {
    await fetch('/api/v1/notifications/read', {
      method:'PATCH', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ alias, id }),
    })
    setNotifs(prev => prev.map(n => n.id===id ? {...n,read:true} : n))
    setUnread(prev => Math.max(0, prev-1))
  }

  const displayed = filter==='unread' ? notifs.filter(n=>!n.read) : notifs

  return (
    <div className="p-3 sm:p-5 max-w-2xl">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">
            Notifications
            {unread>0 && <span className="ml-2 font-mono text-[12px] font-bold px-2 py-0.5 rounded-full" style={{background:'rgba(255,58,92,0.15)',color:'#ff3a5c'}}>{unread}</span>}
          </h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">CVE alerts · CTF solves · exploit uploads · payments</p>
        </div>
        {unread>0 && (
          <button onClick={markAllRead} className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#64748b'}}>
            Mark all read
          </button>
        )}
      </div>

      <div className="flex gap-1 p-1 rounded-xl mb-4 w-fit" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
        {(['all','unread'] as const).map(f => (
          <button key={f} onClick={()=>setFilter(f)}
            className="px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold capitalize cursor-pointer transition-all"
            style={filter===f?{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.25)',color:'#00ffaa'}:{color:'#475569',border:'1px solid transparent'}}>
            {f} {f==='unread'&&unread>0?`(${unread})`:''}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="glass p-10 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>
      ) : displayed.length===0 ? (
        <div className="glass p-10 text-center">
          <div className="text-3xl mb-3 opacity-30">🔔</div>
          <div className="font-mono text-[12px] text-slate-600 mb-1">{filter==='unread'?'All caught up!':'No notifications yet'}</div>
          <div className="font-mono text-[10px] text-slate-700">You will be notified about CVEs, CTF solves, exploit uploads, and payments.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {displayed.map(n => (
            <div key={n.id} className="glass p-4 rounded-xl flex items-start gap-3 transition-all cursor-pointer hover:opacity-90"
              style={{borderColor:n.read?'rgba(255,255,255,0.06)':`${TYPE_COLOR[n.type]??'#64748b'}30`, background:n.read?undefined:`${TYPE_COLOR[n.type]??'#64748b'}05`}}
              onClick={()=>{ if(!n.read) markOneRead(n.id) }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{background:`${TYPE_COLOR[n.type]??'#64748b'}15`,border:`1px solid ${TYPE_COLOR[n.type]??'#64748b'}25`}}>
                {TYPE_ICON[n.type]??'🔔'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-[11px] font-bold text-slate-200 leading-snug">{n.title}</div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[9px] text-slate-700">{timeAgo(n.createdAt)}</span>
                    {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{background:TYPE_COLOR[n.type]??'#ff3a5c'}}/>}
                  </div>
                </div>
                <p className="font-mono text-[10px] text-slate-500 mt-1 leading-relaxed">{n.body}</p>
                {n.link && (
                  <Link href={n.link} className="font-mono text-[9px] mt-1.5 inline-block hover:underline"
                    style={{color:TYPE_COLOR[n.type]??'#00ffaa'}} onClick={e=>e.stopPropagation()}>
                    View →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loggedIn && (
        <div className="glass mt-4 p-4 text-center">
          <p className="font-mono text-[11px] text-slate-600">
            <Link href="/register" className="text-accent hover:underline">Create an account</Link>
            {' '}to receive personal notifications for scans, CTF solves, and payments.
          </p>
        </div>
      )}
    </div>
  )
}
