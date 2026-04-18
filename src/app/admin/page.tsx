'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getToken, clearSession } from '@/lib/eso-auth'

type Tab = 'overview' | 'users' | 'exploits' | 'ctf' | 'scans' | 'tiers' | 'leaderboard' | 'payments'

const TIER_COLOR:   Record<string,string> = { free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#00ffaa' }
const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', running:'#00aaff', planning:'#ffd700', pending:'#475569', approved:'#00ffaa', rejected:'#ff3a5c' }

// ── helpers ──────────────────────────────────────────────────────────────────
async function esoFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  const res = await fetch(`/api/eso${path}`, {
    ...opts,
    headers: { 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{}), ...opts?.headers },
  })
  if (!res.ok) {
    const ct = res.headers.get('content-type') ?? ''
    if (ct.includes('application/json')) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.detail ?? d.error ?? `HTTP ${res.status}`)
    }
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return res.json()
}

async function xcloakFetch(path: string, opts?: RequestInit) {
  const token = typeof window!=='undefined' ? sessionStorage.getItem('xcloak-admin-token') : null
  const res = await fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'x-admin-token': token } : {}),
      ...opts?.headers,
    },
  })
  if (!res.ok) {
    // Parse error cleanly — don't dump raw HTML
    const ct = res.headers.get('content-type') ?? ''
    if (ct.includes('application/json')) {
      const d = await res.json().catch(() => ({}))
      throw new Error(d.error ?? d.detail ?? `HTTP ${res.status}`)
    }
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return res.json()
}

// ── main component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [ready,      setReady]      = useState(false)
  const [adminName,  setAdminName]  = useState('')
  const [tab,        setTab]        = useState<Tab>('overview')
  const [loading,    setLoading]    = useState(false)
  const [msg,        setMsg]        = useState('')
  const [search,     setSearch]     = useState('')

  // ESO data
  const [esoStats,   setEsoStats]   = useState<any>(null)
  const [esoUsers,   setEsoUsers]   = useState<any[]>([])
  const [esoScans,   setEsoScans]   = useState<any[]>([])
  const [esoTiers,   setEsoTiers]   = useState<any[]>([])

  // Xcloak data
  const [xcStats,    setXcStats]    = useState<any>(null)
  const [exploits,   setExploits]   = useState<any[]>([])
  const [ctfs,       setCTFs]       = useState<any[]>([])
  const [xStatus,    setXStatus]    = useState<'pending'|'approved'|'rejected'>('pending')
  const [leaders,    setLeaders]    = useState<any[]>([])
  const [payments,   setPayments]   = useState<any[]>([])

  // Auth guard
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('eso_user') ?? 'null')
      const alias = sessionStorage.getItem('xcloak-admin-alias')
      if (u?.role !== 'admin' && !alias) { router.push('/admin/login'); return }
      setAdminName(u?.username ?? alias ?? 'admin')
      setReady(true)
    } catch { router.push('/admin/login') }
  }, [router])

  const load = useCallback(async () => {
    if (!ready) return
    setLoading(true)
    try {
      if (tab === 'overview') {
        const [es, xc] = await Promise.allSettled([
          esoFetch('/admin/stats'),
          xcloakFetch('/api/v1/admin/analytics'),
        ])
        if (es.status==='fulfilled') setEsoStats(es.value)
        if (xc.status==='fulfilled') setXcStats(xc.value)
      }
      if (tab === 'users') {
        const r = await esoFetch('/admin/users?limit=100')
        setEsoUsers(r.users ?? [])
      }
      if (tab === 'exploits') {
        const r = await xcloakFetch(`/api/v1/admin/exploits?status=${xStatus}&limit=50`)
        setExploits(r.exploits ?? [])
      }
      if (tab === 'ctf') {
        const r = await xcloakFetch(`/api/v1/admin/ctf?status=${xStatus}&limit=50`)
        setCTFs(r.challenges ?? [])
      }
      if (tab === 'scans') {
        const r = await esoFetch('/admin/scans?limit=50')
        setEsoScans(r.scans ?? [])
      }
      if (tab === 'tiers') {
        const r = await esoFetch('/admin/tiers')
        setEsoTiers(r.tiers ?? [])
      }
      if (tab === 'leaderboard') {
        const r = await xcloakFetch('/api/v1/admin/leaderboard')
        setLeaders(r.users ?? [])
      }
      if (tab === 'payments') {
        const r = await esoFetch('/admin/payments?limit=100')
        setPayments(r.payments ?? [])
      }
    } catch(e:any) { setMsg(`✗ ${e.message}`) }
    setLoading(false)
  }, [ready, tab, xStatus])

  useEffect(() => { load() }, [load])

  // Actions
  async function setTier(userId: string, tier: string) {
    try { await esoFetch('/admin/users/tier',{method:'POST',body:JSON.stringify({user_id:userId,tier})}); setMsg(`✓ ${userId} → ${tier}`); load() }
    catch(e:any) { setMsg(`✗ ${e.message}`) }
  }
  async function toggleUser(userId: string, active: boolean) {
    try { await esoFetch('/admin/users/status',{method:'POST',body:JSON.stringify({user_id:userId,is_active:active})}); setMsg(`✓ User ${active?'enabled':'disabled'}`); load() }
    catch(e:any) { setMsg(`✗ ${e.message}`) }
  }
  async function resetQuota(userId: string) {
    try { await esoFetch('/admin/users/reset-quota',{method:'POST',body:JSON.stringify({user_id:userId})}); setMsg('✓ Quota reset'); load() }
    catch(e:any) { setMsg(`✗ ${e.message}`) }
  }
  async function reviewExploit(id: string, action: 'approved'|'rejected', note='') {
    try { await xcloakFetch(`/api/v1/admin/exploits/${id}`,{method:'POST',body:JSON.stringify({status:action,reviewNote:note})}); setMsg(`✓ Exploit ${action}`); load() }
    catch(e:any) { setMsg(`✗ ${e.message}`) }
  }
  async function reviewCTF(id: string, action: 'approved'|'rejected', note='') {
    try { await xcloakFetch(`/api/v1/admin/ctf/${id}`,{method:'POST',body:JSON.stringify({status:action,reviewNote:note})}); setMsg(`✓ CTF ${action}`); load() }
    catch(e:any) { setMsg(`✗ ${e.message}`) }
  }

  if (!ready) return (
    <div className="flex items-center justify-center h-64">
      <div className="font-mono text-[11px] text-slate-600 animate-pulse">Verifying admin access...</div>
    </div>
  )

  const filteredUsers = esoUsers.filter(u =>
    !search || [u.username,u.email,u.user_id].some(f=>f?.toLowerCase().includes(search.toLowerCase()))
  )

  const TABS = [
    {id:'overview' as Tab, label:'Overview',  icon:'📊'},
    {id:'users'    as Tab, label:'Users',      icon:'👥'},
    {id:'exploits' as Tab, label:'Exploits',   icon:'💉'},
    {id:'ctf'      as Tab, label:'CTF',        icon:'🏆'},
    {id:'scans'    as Tab, label:'Scans',      icon:'🔍'},
    {id:'tiers'       as Tab, label:'Tiers',       icon:'🎯'},
    {id:'leaderboard' as Tab, label:'Leaderboard', icon:'🏆'},
    {id:'payments'    as Tab, label:'Payments',    icon:'💳'},
  ]

  const td = "px-4 py-2.5 font-mono text-[11px]"

  return (
    <div className="p-3 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">
            <span style={{color:'#ff3a5c'}}>Admin</span> Panel
          </h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Signed in as <span className="text-accent font-bold">{adminName}</span>
            <span className="text-slate-700"> · </span>
            Xcloak + ESO unified control
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="font-mono text-[10px] text-slate-600 hover:text-slate-300 cursor-pointer">↻ Refresh</button>
          <button onClick={()=>{clearSession();sessionStorage.removeItem('xcloak-admin-alias');router.push('/admin/login')}}
            className="font-mono text-[10px] text-red-400 hover:text-red-300 cursor-pointer">Sign out</button>
        </div>
      </div>

      {/* Message */}
      {msg && (
        <div className="mb-4 p-3 rounded-xl border font-mono text-[11px]"
          style={msg.startsWith('✓')
            ?{background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.2)',color:'#00ffaa'}
            :{background:'rgba(255,58,92,0.06)',borderColor:'rgba(255,58,92,0.2)',color:'#ff3a5c'}}>
          {msg} <button onClick={()=>setMsg('')} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl overflow-x-auto" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[11px] font-bold cursor-pointer transition-all"
            style={tab===t.id
              ?{background:'rgba(255,58,92,0.12)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}
              :{color:'#475569',border:'1px solid transparent'}}>
            <span>{t.icon}</span><span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {loading && <div className="py-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>}

      {/* ── OVERVIEW ── */}
      {tab==='overview' && !loading && (
        <div className="space-y-4">
          {/* ESO stats */}
          {esoStats && (
            <>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 px-1">Scan Engine</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {label:'Total Users',   val:esoStats.users?.total??0,    color:'#00aaff'},
                  {label:'Total Scans',   val:esoStats.scans?.total??0,    color:'#a78bfa'},
                  {label:'Scans (24h)',   val:esoStats.scans?.last_24h??0, color:'#00ffaa'},
                  {label:'Findings',      val:esoStats.findings?.total??0, color:'#ff8c42'},
                ].map((s,i)=>(
                  <div key={i} className="glass px-4 py-3 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px" style={{background:`linear-gradient(90deg,transparent,${s.color}40,transparent)`}}/>
                    <div className="font-mono text-2xl font-bold" style={{color:s.color}}>{s.val}</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="glass p-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Users by Tier</div>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(esoStats.users?.by_tier??{}).map(([tier,count]:any)=>(
                    <div key={tier} className="px-4 py-2.5 rounded-xl border"
                      style={{borderColor:`${TIER_COLOR[tier]??'#475569'}40`,background:`${TIER_COLOR[tier]??'#475569'}0d`}}>
                      <div className="font-mono text-xl font-bold" style={{color:TIER_COLOR[tier]??'#475569'}}>{count}</div>
                      <div className="font-mono text-[9px] text-slate-600 capitalize mt-0.5">{tier}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Xcloak stats */}
          {xcStats && (
            <>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 px-1 mt-2">Community Platform</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {label:'Users',        val:xcStats.users?.total??0,              color:'#00aaff'},
                  {label:'Exploits',     val:xcStats.exploits?.total??0,           color:'#ff8c42'},
                  {label:'Pending',      val:xcStats.exploits?.pending??0,         color:'#ffd700'},
                  {label:'CTF Solves',   val:xcStats.engagement?.ctfSolves??0,     color:'#a78bfa'},
                ].map((s,i)=>(
                  <div key={i} className="glass px-4 py-3 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px" style={{background:`linear-gradient(90deg,transparent,${s.color}40,transparent)`}}/>
                    <div className="font-mono text-2xl font-bold" style={{color:s.color}}>{s.val}</div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Recent scans */}
          {esoStats?.recent_scans?.length > 0 && (
            <div className="glass overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.06]">
                <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Recent Scans</span>
              </div>
              {esoStats.recent_scans.map((s:any)=>(
                <div key={s.process_id} className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01]">
                  <div>
                    <span className="text-[12px] text-slate-200">{s.target||'—'}</span>
                    <span className="font-mono text-[10px] text-slate-600 ml-2">by {s.username}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-slate-500">{s.findings_count??0} findings</span>
                    <span className="font-mono text-[9px] px-2 py-[2px] rounded" style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── USERS ── */}
      {tab==='users' && !loading && (
        <div className="space-y-3">
          <div className="glass p-3">
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search username, email, user_id..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"/>
          </div>
          <div className="glass overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  {['User','Email','Tier','Today','Total','Status','Actions'].map(h=>(
                    <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u=>(
                  <tr key={u.user_id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className={td}>
                      <div className="text-slate-200 font-semibold">{u.username}</div>
                      <div className="text-slate-600 text-[9px]">{u.user_id}</div>
                    </td>
                    <td className={`${td} text-slate-500`}>{u.email}</td>
                    <td className={td}>
                      <select value={u.tier??'free'} onChange={e=>setTier(u.user_id,e.target.value)}
                        className="bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 font-mono text-[10px] cursor-pointer outline-none"
                        style={{color:TIER_COLOR[u.tier??'free']}}>
                        {['free','pro','enterprise','admin'].map(t=><option key={t} value={t}>{t}</option>)}
                      </select>
                    </td>
                    <td className={`${td} font-mono text-slate-300`}>{u.scans_today??0}</td>
                    <td className={`${td} font-mono text-slate-500`}>{u.total_scans??0}</td>
                    <td className={td}>
                      <span className="font-mono text-[9px] font-bold" style={{color:u.is_active?'#00ffaa':'#ff3a5c'}}>
                        {u.is_active?'Active':'Disabled'}
                      </span>
                    </td>
                    <td className={td}>
                      <div className="flex gap-3">
                        <button onClick={()=>toggleUser(u.user_id,!u.is_active)} className="font-mono text-[9px] cursor-pointer hover:opacity-80" style={{color:u.is_active?'#ff3a5c':'#00ffaa'}}>
                          {u.is_active?'Disable':'Enable'}
                        </button>
                        <button onClick={()=>resetQuota(u.user_id)} className="font-mono text-[9px] text-slate-600 hover:text-slate-300 cursor-pointer">Reset quota</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length===0 && <div className="p-8 text-center font-mono text-[11px] text-slate-600">No users</div>}
          </div>
        </div>
      )}

      {/* ── EXPLOITS ── */}
      {tab==='exploits' && !loading && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['pending','approved','rejected'] as const).map(s=>(
              <button key={s} onClick={()=>setXStatus(s)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all border"
                style={xStatus===s
                  ?{background:STATUS_COLOR[s]+'15',borderColor:STATUS_COLOR[s]+'40',color:STATUS_COLOR[s]}
                  :{background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.06)',color:'#475569'}}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
          {exploits.length===0
            ? <div className="glass p-12 text-center font-mono text-[11px] text-slate-600">No {xStatus} exploits</div>
            : exploits.map(ex=>(
              <div key={ex.id} className="glass p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[13px] font-semibold text-slate-200">{ex.title}</span>
                      <span className="font-mono text-[9px] px-2 py-[1px] rounded" style={{background:'rgba(255,255,255,0.06)',color:'#64748b'}}>{ex.type}</span>
                      {ex.cveId && <span className="font-mono text-[9px] text-accent2">{ex.cveId}</span>}
                    </div>
                    <div className="font-mono text-[10px] text-slate-600">by {ex.authorAlias} · {new Date(ex.createdAt).toLocaleDateString()}</div>
                    <div className="font-mono text-[11px] text-slate-500 mt-1 line-clamp-2">{ex.description}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {(ex.tags??[]).slice(0,4).map((t:string)=>(
                        <span key={t} className="font-mono text-[8px] px-1.5 py-[1px] rounded" style={{background:'rgba(255,255,255,0.04)',color:'#475569'}}>#{t}</span>
                      ))}
                      {ex.fileUrl && (
                        <a href={ex.fileUrl} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[9px] text-accent2 hover:underline">
                          📎 Download attached file
                        </a>
                      )}
                    </div>
                  </div>
                  {xStatus==='pending' && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={()=>reviewExploit(ex.id,'approved')}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer"
                        style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                        ✓ Approve
                      </button>
                      <button onClick={()=>reviewExploit(ex.id,'rejected')}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer"
                        style={{background:'rgba(255,58,92,0.1)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
                        ✗ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* ── CTF ── */}
      {tab==='ctf' && !loading && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['pending','approved','rejected'] as const).map(s=>(
              <button key={s} onClick={()=>setXStatus(s)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all border"
                style={xStatus===s
                  ?{background:STATUS_COLOR[s]+'15',borderColor:STATUS_COLOR[s]+'40',color:STATUS_COLOR[s]}
                  :{background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.06)',color:'#475569'}}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
          {ctfs.length===0
            ? <div className="glass p-12 text-center font-mono text-[11px] text-slate-600">No {xStatus} challenges</div>
            : ctfs.map(c=>(
              <div key={c.id} className="glass p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[13px] font-semibold text-slate-200">{c.title}</span>
                      <span className="font-mono text-[9px] px-2 py-[1px] rounded" style={{background:'rgba(255,255,255,0.06)',color:'#64748b'}}>{c.category}</span>
                      <span className="font-mono text-[9px]" style={{color:'#a78bfa'}}>{c.difficulty}</span>
                      <span className="font-mono text-[9px] text-accent2">{c.points}pts</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-600">by {c.authorAlias} · {new Date(c.createdAt).toLocaleDateString()}</div>
                    <div className="font-mono text-[11px] text-slate-500 mt-1 line-clamp-2">{c.description}</div>
                    <div className="flex items-center gap-3 mt-2">
                      {c.fileUrl && (
                        <a href={c.fileUrl} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[9px] text-accent2 hover:underline">
                          📎 Download challenge file
                        </a>
                      )}
                      {(c.hints??[]).length > 0 && (
                        <span className="font-mono text-[9px] text-slate-600">{c.hints.length} hint(s)</span>
                      )}
                    </div>
                  </div>
                  {xStatus==='pending' && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={()=>reviewCTF(c.id,'approved')}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer"
                        style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                        ✓ Approve
                      </button>
                      <button onClick={()=>reviewCTF(c.id,'rejected')}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer"
                        style={{background:'rgba(255,58,92,0.1)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
                        ✗ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* ── SCANS ── */}
      {tab==='scans' && !loading && (
        <div className="glass overflow-x-auto">
          <table className="w-full border-collapse min-w-[750px]">
            <thead>
              <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                {['Target','User','Tier','Status','Risk','Findings','Duration','Date'].map(h=>(
                  <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {esoScans.map(s=>(
                <tr key={s.process_id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className={td}>
                    <div className="text-slate-200">{s.target||'—'}</div>
                    <div className="text-slate-600 text-[9px]">{s.process_id}</div>
                  </td>
                  <td className={`${td} text-slate-400`}>{s.username}</td>
                  <td className={td}><span style={{color:TIER_COLOR[s.tier??'free']}} className="font-mono text-[9px]">{s.tier??'free'}</span></td>
                  <td className={td}>
                    <span className="font-mono text-[9px] px-2 py-[2px] rounded" style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                      {s.status}
                    </span>
                  </td>
                  <td className={`${td} font-mono text-[10px]`} style={{color:({critical:'#ff3a5c',high:'#ff8c42',medium:'#ffd700',low:'#00aaff'} as any)[s.risk_level]??'#64748b'}}>
                    {(s.risk_level||'—').toUpperCase()}
                  </td>
                  <td className={`${td} font-mono text-accent2`}>{s.findings_count??0}</td>
                  <td className={`${td} font-mono text-slate-500`}>{s.duration_seconds?`${(s.duration_seconds/60).toFixed(1)}m`:'—'}</td>
                  <td className={`${td} font-mono text-slate-600 text-[10px]`}>{s.created_at?new Date(s.created_at).toLocaleDateString():'—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {esoScans.length===0 && <div className="p-8 text-center font-mono text-[11px] text-slate-600">No scans</div>}
        </div>
      )}

      {/* ── TIERS ── */}
      {tab==='tiers' && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {esoTiers.map(t=>(
            <div key={t.tier} className="glass p-4" style={{borderColor:`${TIER_COLOR[t.tier]??'#475569'}40`}}>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3 font-bold" style={{color:TIER_COLOR[t.tier]??'#475569'}}>
                {t.tier}
              </div>
              {[
                ['Scans / day',  t.scans_per_day],
                ['Concurrent',   t.max_concurrent],
                ['Max duration', `${t.max_scan_duration}s`],
                ['Tools',        (t.allowed_tools??[]).join(', ')],
                ['AI analysis',  t.ai_analysis_enabled ?'✓':'✗'],
                ['Proposals',    t.proposals_enabled   ?'✓':'✗'],
                ['Scheduling',   t.scheduling_enabled  ?'✓':'✗'],
                ['Teams',        t.teams_enabled       ?'✓':'✗'],
                ['PDF reports',  t.pdf_reports_enabled ?'✓':'✗'],
                ['API access',   t.api_access_enabled  ?'✓':'✗'],
              ].map(([label,val])=>(
                <div key={String(label)} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0">
                  <span className="font-mono text-[10px] text-slate-600">{label}</span>
                  <span className="font-mono text-[10px] text-slate-300">{String(val)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── LEADERBOARD ── */}
      {tab==='leaderboard' && !loading && (
        <div className="glass overflow-x-auto">
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Community Leaderboard</span>
            <span className="font-mono text-[9px] text-slate-600">{leaders.length} researchers</span>
          </div>
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                {['Rank','User','Reputation','Exploits','CTF Solves','Badges'].map(h=>(
                  <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaders.map((u,i)=>(
                <tr key={u.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className={td}>
                    <span className="font-mono text-[13px] font-bold" style={{color:i===0?'#ffd700':i===1?'#94a3b8':i===2?'#ff8c42':'#475569'}}>
                      #{i+1}
                    </span>
                  </td>
                  <td className={td}>
                    <div className="font-mono text-[11px] text-slate-200 font-semibold">{u.alias}</div>
                  </td>
                  <td className={`${td} font-mono text-accent font-bold`}>{(u.reputation??0).toLocaleString()}</td>
                  <td className={`${td} font-mono text-slate-400`}>{u.exploits??0}</td>
                  <td className={`${td} font-mono text-slate-400`}>{u.ctfSolves??0}</td>
                  <td className={td}>
                    <div className="flex gap-1 flex-wrap">
                      {(u.badges??[]).map((b:string)=>(
                        <span key={b} className="font-mono text-[8px] px-1.5 py-[1px] rounded" style={{background:'rgba(255,215,0,0.1)',color:'#ffd700'}}>{b}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leaders.length===0 && <div className="p-8 text-center font-mono text-[11px] text-slate-600">No community users yet</div>}
        </div>
      )}

      {/* ── PAYMENTS ── */}
      {tab==='payments' && !loading && (
        <div className="glass overflow-x-auto">
          <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Payment History</span>
            <span className="font-mono text-[9px] text-slate-600">{payments.length} transactions</span>
          </div>
          {payments.length===0 ? (
            <div className="p-8 text-center font-mono text-[11px] text-slate-600">No payments recorded yet</div>
          ) : (
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr style={{background:'rgba(255,255,255,0.015)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  {['Payment ID','User','Tier','Amount','Status','Date'].map(h=>(
                    <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p:any)=>(
                  <tr key={p.payment_id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                    <td className={`${td} font-mono text-[9px] text-slate-600`}>{p.payment_id?.slice(0,20)}...</td>
                    <td className={`${td} text-slate-300`}>{p.username??p.user_id?.slice(0,12)}</td>
                    <td className={td}>
                      <span className="font-mono text-[10px] font-bold capitalize" style={{color:TIER_COLOR[p.tier??'free']}}>{p.tier}</span>
                    </td>
                    <td className={`${td} font-mono text-accent font-bold`}>₹{((p.amount??0)/100).toLocaleString()}</td>
                    <td className={td}>
                      <span className="font-mono text-[9px] px-2 py-[2px] rounded" style={{color:STATUS_COLOR[p.status??'pending']??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                        {p.status}
                      </span>
                    </td>
                    <td className={`${td} font-mono text-[10px] text-slate-600`}>
                      {p.paid_at ? new Date(p.paid_at).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
