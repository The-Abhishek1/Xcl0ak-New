'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUser, getToken, isAdmin, clearSession } from '@/lib/eso-auth'

type Tab = 'stats' | 'users' | 'scans' | 'tiers'

const TIER_COLOR:   Record<string,string> = { free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#00ffaa' }
const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', running:'#00aaff', planning:'#ffd700', pending:'#475569', timeout:'#ff3a5c' }

async function adminFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  const res = await fetch(`/api/eso${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opts?.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`${res.status}: ${text}`)
  }
  return res.json()
}

export default function EsoAdminPage() {
  const router  = useRouter()
  const [ready,   setReady]   = useState(false)   // wait for mount before auth check
  const [tab,     setTab]     = useState<Tab>('stats')
  const [stats,   setStats]   = useState<any>(null)
  const [users,   setUsers]   = useState<any[]>([])
  const [scans,   setScans]   = useState<any[]>([])
  const [tiers,   setTiers]   = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [search,  setSearch]  = useState('')
  const [msg,     setMsg]     = useState('')

  // Auth guard — runs client-side only after mount
  useEffect(() => {
    if (!isAdmin()) {
      router.push('/login?from=eso-admin')
      return
    }
    setReady(true)
  }, [router])

  const load = useCallback(async () => {
    if (!ready) return
    setLoading(true)
    try {
      if (tab === 'stats') {
        setStats(await adminFetch('/admin/stats'))
      } else if (tab === 'users') {
        const r = await adminFetch('/admin/users?limit=100')
        setUsers(r.users ?? [])
      } else if (tab === 'scans') {
        const r = await adminFetch('/admin/scans?limit=50')
        setScans(r.scans ?? [])
      } else if (tab === 'tiers') {
        const r = await adminFetch('/admin/tiers')
        setTiers(r.tiers ?? [])
      }
    } catch (e: any) {
      setMsg(`✗ ${e.message}`)
    }
    setLoading(false)
  }, [tab, ready])

  useEffect(() => { load() }, [load])

  async function setTier(userId: string, tier: string) {
    try {
      await adminFetch('/admin/users/tier', { method:'POST', body:JSON.stringify({user_id:userId, tier}) })
      setMsg(`✓ ${userId} → ${tier}`)
      load()
    } catch (e: any) { setMsg(`✗ ${e.message}`) }
  }

  async function toggleUser(userId: string, active: boolean) {
    try {
      await adminFetch('/admin/users/status', { method:'POST', body:JSON.stringify({user_id:userId, is_active:active}) })
      setMsg(`✓ User ${active ? 'enabled' : 'disabled'}`)
      load()
    } catch (e: any) { setMsg(`✗ ${e.message}`) }
  }

  async function resetQuota(userId: string) {
    try {
      await adminFetch('/admin/users/reset-quota', { method:'POST', body:JSON.stringify({user_id:userId}) })
      setMsg(`✓ Quota reset`)
      load()
    } catch (e: any) { setMsg(`✗ ${e.message}`) }
  }

  function handleLogout() {
    clearSession()
    router.push('/login')
  }

  // Show nothing while checking auth (prevents flash of redirect)
  if (!ready) return (
    <div className="flex items-center justify-center h-64">
      <div className="font-mono text-[11px] text-slate-600 animate-pulse">Checking access...</div>
    </div>
  )

  const filteredUsers = users.filter(u =>
    !search || [u.username, u.email, u.user_id].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  )

  const user = getUser()
  const td = "px-4 py-2.5 font-mono text-[11px]"

  const TABS: {id:Tab, label:string, icon:string}[] = [
    {id:'stats', label:'Overview', icon:'📊'},
    {id:'users', label:'Users',    icon:'👥'},
    {id:'scans', label:'Scans',    icon:'🔍'},
    {id:'tiers', label:'Tiers',    icon:'🎯'},
  ]

  return (
    <div className="p-3 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">ESO <span className="text-accent">Admin</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Signed in as <span className="text-accent font-bold">{user?.username ?? 'admin'}</span>
            <span className="text-slate-700"> · </span>
            <span style={{color:TIER_COLOR[user?.tier??'admin']}}>{user?.tier ?? 'admin'} tier</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} className="font-mono text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
            ↻ Refresh
          </button>
          <button onClick={handleLogout} className="font-mono text-[11px] text-red-400 hover:text-red-300 cursor-pointer transition-colors">
            Sign out
          </button>
        </div>
      </div>

      {/* Quick nav */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {[
          {label:'← Scan Dashboard', href:'/scan'},
          {label:'Xcloak Admin', href:'/admin'},
          {label:'Pricing Page', href:'/pricing'},
        ].map(l => (
          <Link key={l.href} href={l.href} className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">{l.label}</Link>
        ))}
      </div>

      {/* Message */}
      {msg && (
        <div className="mb-4 p-3 rounded-lg border font-mono text-[11px]"
          style={msg.startsWith('✓')
            ? {background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.2)',color:'#00ffaa'}
            : {background:'rgba(255,58,92,0.06)',borderColor:'rgba(255,58,92,0.2)',color:'#ff3a5c'}}>
          {msg}
          <button onClick={()=>setMsg('')} className="ml-3 opacity-50 hover:opacity-100 cursor-pointer">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-[11px] font-bold cursor-pointer transition-all"
            style={tab===t.id
              ? {background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.25)',color:'#00ffaa'}
              : {color:'#475569',border:'1px solid transparent'}}>
            <span>{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {loading && <div className="py-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>}

      {/* STATS */}
      {tab==='stats' && stats && !loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {label:'Total Users', val:stats.users?.total??0,    color:'#00aaff'},
              {label:'Total Scans', val:stats.scans?.total??0,    color:'#a78bfa'},
              {label:'Last 24h',    val:stats.scans?.last_24h??0, color:'#00ffaa'},
              {label:'Findings',   val:stats.findings?.total??0,  color:'#ff8c42'},
            ].map((s,i) => (
              <div key={i} className="glass px-4 py-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${s.color}40,transparent)`}}/>
                <div className="font-mono text-2xl font-bold" style={{color:s.color}}>{s.val}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="glass p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Users by Tier</div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.users?.by_tier??{}).map(([tier,count]:any) => (
                <div key={tier} className="px-4 py-2.5 rounded-xl border"
                  style={{borderColor:`${TIER_COLOR[tier]??'#475569'}40`,background:`${TIER_COLOR[tier]??'#475569'}0d`}}>
                  <div className="font-mono text-xl font-bold" style={{color:TIER_COLOR[tier]??'#475569'}}>{count}</div>
                  <div className="font-mono text-[9px] text-slate-600 capitalize mt-0.5">{tier}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Recent Activity</span>
            </div>
            {(stats.recent_scans??[]).map((s:any) => (
              <div key={s.process_id} className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.03] last:border-0">
                <div>
                  <span className="text-[12px] text-slate-200">{s.target||'—'}</span>
                  <span className="font-mono text-[10px] text-slate-600 ml-2">by {s.username}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-500">{s.findings_count??0} findings</span>
                  <span className="font-mono text-[9px] px-2 py-[2px] rounded"
                    style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USERS */}
      {tab==='users' && !loading && (
        <div className="space-y-3">
          <div className="glass p-3">
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by username, email or user_id..."
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
                        {['free','pro','enterprise','admin'].map(t=>(
                          <option key={t} value={t}>{t}</option>
                        ))}
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
                        <button onClick={()=>toggleUser(u.user_id,!u.is_active)}
                          className="font-mono text-[9px] cursor-pointer hover:opacity-80"
                          style={{color:u.is_active?'#ff3a5c':'#00ffaa'}}>
                          {u.is_active?'Disable':'Enable'}
                        </button>
                        <button onClick={()=>resetQuota(u.user_id)}
                          className="font-mono text-[9px] text-slate-600 hover:text-slate-300 cursor-pointer">
                          Reset quota
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length===0&&<div className="p-8 text-center font-mono text-[11px] text-slate-600">No users</div>}
          </div>
        </div>
      )}

      {/* SCANS */}
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
              {scans.map(s=>(
                <tr key={s.process_id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className={td}>
                    <div className="text-slate-200">{s.target||'—'}</div>
                    <div className="text-slate-600 text-[9px]">{s.process_id}</div>
                  </td>
                  <td className={`${td} text-slate-400`}>{s.username}</td>
                  <td className={td}><span style={{color:TIER_COLOR[s.tier??'free']}} className="font-mono text-[9px]">{s.tier??'free'}</span></td>
                  <td className={td}>
                    <span className="font-mono text-[9px] px-2 py-[2px] rounded"
                      style={{color:STATUS_COLOR[s.status]??'#64748b',background:'rgba(255,255,255,0.05)'}}>
                      {s.status}
                    </span>
                  </td>
                  <td className={`${td} font-mono text-[10px]`}
                    style={{color:({critical:'#ff3a5c',high:'#ff8c42',medium:'#ffd700',low:'#00aaff'} as any)[s.risk_level]??'#64748b'}}>
                    {(s.risk_level||'—').toUpperCase()}
                  </td>
                  <td className={`${td} font-mono text-accent2`}>{s.findings_count??0}</td>
                  <td className={`${td} font-mono text-slate-500`}>{s.duration_seconds?`${(s.duration_seconds/60).toFixed(1)}m`:'—'}</td>
                  <td className={`${td} font-mono text-slate-600 text-[10px]`}>{s.created_at?new Date(s.created_at).toLocaleDateString():'—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {scans.length===0&&<div className="p-8 text-center font-mono text-[11px] text-slate-600">No scans</div>}
        </div>
      )}

      {/* TIERS */}
      {tab==='tiers' && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tiers.map(t=>(
            <div key={t.tier} className="glass p-4" style={{borderColor:`${TIER_COLOR[t.tier]??'#475569'}40`}}>
              <div className="font-mono text-[10px] uppercase tracking-widest mb-3 font-bold" style={{color:TIER_COLOR[t.tier]??'#475569'}}>
                {t.tier}
              </div>
              {[
                ['Scans / day',    t.scans_per_day],
                ['Concurrent',     t.max_concurrent],
                ['Max duration',   `${t.max_scan_duration}s`],
                ['Tools',          (t.allowed_tools??[]).join(', ')],
                ['AI analysis',    t.ai_analysis_enabled ?'✓':'✗'],
                ['Proposals',      t.proposals_enabled   ?'✓':'✗'],
                ['Scheduling',     t.scheduling_enabled  ?'✓':'✗'],
                ['Teams',          t.teams_enabled       ?'✓':'✗'],
                ['PDF reports',    t.pdf_reports_enabled ?'✓':'✗'],
                ['API access',     t.api_access_enabled  ?'✓':'✗'],
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
    </div>
  )
}
