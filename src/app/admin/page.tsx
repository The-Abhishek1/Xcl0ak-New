'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { timeAgo } from '@/lib/utils'

type Tab = 'exploits'|'ctf'|'analytics'|'security'
type Status = 'pending'|'approved'|'rejected'

interface Analytics {
  users:       { total:number; recent:any[] }
  exploits:    { total:number; approved:number; pending:number; rejected:number; recent:any[] }
  ctf:         { total:number; approved:number; pending:number }
  cves:        { cached:number }
  engagement:  { comments:number; votes:number; ctfSolves:number }
  topUsers:    any[]
  security:    { rateLimitActive:boolean; inputSanitization:boolean; adminAuthEnabled:boolean; statusFilterEnabled:boolean; note:string }
}

interface Exploit {
  id:string; title:string; type:string; language:string; authorAlias:string
  status:string; dnaRisk:number|null; cveId:string|null
  description:string; code:string|null; createdAt:string; reviewNote:string|null
  _count?:{ comments:number }
}

interface CTFChallenge {
  id:string; title:string; category:string; difficulty:string; points:number
  authorAlias:string; status:string; description:string; hints:string[]
  createdAt:string; reviewNote:string|null; _count?:{ solves:number }
}

const TYPE_COLOR:Record<string,string>={ RCE:'#ff3a5c',XSS:'#ff8c42',SQLi:'#00aaff',BOF:'#ffd700',PrivEsc:'#a78bfa',LFI:'#ec4899' }
const CAT_COLOR:Record<string,string>={ web:'#00aaff',pwn:'#ff3a5c',crypto:'#a78bfa',forensics:'#ff8c42',misc:'#64748b' }

export default function AdminPage() {
  const router = useRouter()
  const [tab,        setTab]        = useState<Tab>('exploits')
  const [status,     setStatus]     = useState<Status>('pending')
  const [exploits,   setExploits]   = useState<Exploit[]>([])
  const [ctfs,       setCTFs]       = useState<CTFChallenge[]>([])
  const [analytics,  setAnalytics]  = useState<Analytics|null>(null)
  const [loading,    setLoading]    = useState(false)
  const [selected,   setSelected]   = useState<any>(null)
  const [reviewNote, setReviewNote] = useState('')
  const [processing, setProcessing] = useState(false)
  const [adminAlias, setAdminAlias] = useState('')

  useEffect(() => {
    const a = sessionStorage.getItem('xcloak-admin-alias')
    if (!a) { router.push('/admin/login'); return }
    setAdminAlias(a)
  }, [router])

  const loadData = useCallback(async () => {
    if (!adminAlias) return
    setLoading(true)
    try {
      if (tab === 'analytics' || tab === 'security') {
        const r = await fetch('/api/v1/admin/analytics')
        if (r.status === 401) { router.push('/admin/login'); return }
        setAnalytics(await r.json())
      } else {
        const url = tab==='exploits' ? `/api/v1/admin/exploits?status=${status}` : `/api/v1/admin/ctf?status=${status}`
        const r = await fetch(url)
        if (r.status === 401) { router.push('/admin/login'); return }
        const d = await r.json()
        tab==='exploits' ? setExploits(Array.isArray(d)?d:[]) : setCTFs(Array.isArray(d)?d:[])
      }
    } finally { setLoading(false) }
  }, [tab, status, adminAlias, router])

  useEffect(() => { if (adminAlias) loadData() }, [loadData, adminAlias])

  async function review(id:string, action:'approve'|'reject') {
    setProcessing(true)
    try {
      const url = tab==='exploits' ? `/api/v1/admin/exploits/${id}` : `/api/v1/admin/ctf/${id}`
      await fetch(url, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action,note:reviewNote||undefined}) })
      setSelected(null); setReviewNote(''); loadData()
    } finally { setProcessing(false) }
  }

  async function deleteItem(id:string) {
    if (!confirm('Permanently delete this submission?')) return
    const url = tab==='exploits'?`/api/v1/admin/exploits/${id}`:`/api/v1/admin/ctf/${id}`
    await fetch(url,{method:'DELETE'}); setSelected(null); loadData()
  }

  async function logout() {
    await fetch('/api/v1/admin/login',{method:'DELETE'})
    sessionStorage.removeItem('xcloak-admin-alias'); router.push('/admin/login')
  }

  const items = tab==='exploits' ? exploits : ctfs

  return (
    <div style={{background:'#03050a',minHeight:'100vh',color:'#e2e8f0'}}>
      {/* Admin topbar */}
      <nav className="flex items-center px-4 sm:px-5 h-[52px] gap-3 border-b border-white/[0.06]"
        style={{background:'rgba(8,13,23,0.95)'}}>
        <span className="font-black text-[15px]">🛡 Xcloak <span className="font-mono text-[12px] text-slate-500 font-normal">/ Admin</span></span>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500 hidden sm:block">
            {adminAlias}
          </span>
          <a href="/" className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">← Site</a>
          <button onClick={logout} className="font-mono text-[10px] px-3 py-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">LOGOUT</button>
        </div>
      </nav>

      <div className="p-3 sm:p-5">
        {/* Tabs */}
        <div className="flex gap-1.5 mb-5 flex-wrap">
          {([['exploits','💉 Exploits'],['ctf','🏆 CTF'],['analytics','📊 Analytics'],['security','🛡 Security']] as const).map(([t,l])=>(
            <button key={t} onClick={()=>{setTab(t as Tab);setSelected(null)}}
              className="font-mono text-[11px] px-4 py-2 rounded-lg border transition-all cursor-pointer"
              style={tab===t?{borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa',background:'rgba(0,255,170,0.08)'}:{borderColor:'rgba(255,255,255,0.08)',color:'#64748b'}}>
              {l}
            </button>
          ))}
        </div>

        {/* ── Analytics Tab ── */}
        {(tab==='analytics'||tab==='security') && analytics && (
          <div className="space-y-4">
            {tab==='analytics' && (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {label:'Total Users',    v:analytics.users.total,           c:'#00ffaa'},
                    {label:'CVEs Cached',    v:analytics.cves.cached,           c:'#00aaff'},
                    {label:'Exploits',       v:analytics.exploits.total,        c:'#ff8c42'},
                    {label:'CTF Challenges', v:analytics.ctf.total,             c:'#ffd700'},
                    {label:'Comments',       v:analytics.engagement.comments,   c:'#a78bfa'},
                    {label:'Votes Cast',     v:analytics.engagement.votes,      c:'#64748b'},
                    {label:'CTF Solves',     v:analytics.engagement.ctfSolves,  c:'#4ade80'},
                    {label:'Pending Review', v:analytics.exploits.pending+analytics.ctf.pending, c:'#ffd700'},
                  ].map((s,i)=>(
                    <div key={i} className="glass px-4 py-3 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${s.c},transparent)`}}/>
                      <div className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-1">{s.label}</div>
                      <div className="font-mono text-2xl font-bold" style={{color:s.c}}>{s.v.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                {/* Exploit breakdown */}
                <div className="glass p-4">
                  <div className="font-mono text-[11px] text-accent uppercase tracking-widest mb-3">Exploit Status Breakdown</div>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      {l:'Approved',v:analytics.exploits.approved,c:'#00ffaa'},
                      {l:'Pending', v:analytics.exploits.pending, c:'#ffd700'},
                      {l:'Rejected',v:analytics.exploits.rejected,c:'#ff3a5c'},
                    ].map(s=>(
                      <div key={s.l} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{background:s.c}}/>
                        <span className="font-mono text-[11px] text-slate-400">{s.l}:</span>
                        <span className="font-mono text-[11px] font-bold" style={{color:s.c}}>{s.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top users */}
                <div className="glass overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Top Researchers</span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                    {analytics.topUsers.map((u,i)=>(
                      <div key={u.id} className="flex items-center gap-3 px-4 py-2.5">
                        <span className="font-mono text-[11px] font-bold w-6 text-slate-500">#{i+1}</span>
                        <span className="font-mono text-[12px] text-accent flex-1">{u.alias}</span>
                        <span className="font-mono text-[11px] text-slate-400">{u.reputation.toLocaleString()} XP</span>
                        <span className="font-mono text-[9px] text-slate-600">{timeAgo(u.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent users */}
                <div className="glass overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Recent Signups (by alias)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 p-4">
                    {analytics.users.recent.map((u:any)=>(
                      <div key={u.id} className="glass-sm px-3 py-1.5 flex items-center gap-2">
                        <span className="font-mono text-[11px] text-accent">{u.alias}</span>
                        <span className="font-mono text-[9px] text-slate-600">{timeAgo(u.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent exploit submissions */}
                <div className="glass overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Recent Exploit Submissions</span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                    {analytics.exploits.recent.map((e:any)=>(
                      <div key={e.id} className="flex items-center gap-3 px-4 py-2.5">
                        <span className="font-mono text-[9px] px-1.5 py-[1px] rounded" style={{background:(TYPE_COLOR[e.type]??'#64748b')+'18',color:TYPE_COLOR[e.type]??'#64748b'}}>{e.type}</span>
                        <span className="text-[12px] text-slate-300 flex-1 truncate">{e.title}</span>
                        <span className="font-mono text-[10px] text-accent">{e.authorAlias}</span>
                        <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                          style={{color:e.status==='approved'?'#00ffaa':e.status==='pending'?'#ffd700':'#ff3a5c',background:'rgba(255,255,255,0.04)'}}>
                          {e.status.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] text-slate-600">{timeAgo(e.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab==='security' && (
              <div className="space-y-4">
                <div className="glass p-5" style={{borderColor:'rgba(0,255,170,0.15)',background:'rgba(0,255,170,0.03)'}}>
                  <div className="font-mono text-[12px] font-bold text-accent mb-4">🛡 Security Status</div>
                  <div className="space-y-3">
                    {[
                      {check:'Admin auth (signed tokens)', ok:analytics.security.adminAuthEnabled},
                      {check:'Input sanitization on all endpoints', ok:analytics.security.inputSanitization},
                      {check:'Exploit approval gate (admin review)', ok:analytics.security.statusFilterEnabled},
                      {check:'CTF flag hashing (SHA-256)', ok:true},
                      {check:'Public APIs only return approved content', ok:true},
                      {check:'SQL injection protection (Prisma ORM)', ok:true},
                      {check:'XSS protection (HTML stripped from inputs)', ok:true},
                      {check:'CSRF protection (SameSite cookies)', ok:true},
                      {check:'Rate limiting', ok:analytics.security.rateLimitActive},
                    ].map(({check,ok})=>(
                      <div key={check} className="flex items-center gap-3">
                        <span className="text-[16px]">{ok?'✅':'⚠️'}</span>
                        <span className="font-mono text-[12px] text-slate-300">{check}</span>
                        <span className="font-mono text-[10px] ml-auto" style={{color:ok?'#00ffaa':'#ffd700'}}>{ok?'ACTIVE':'CHECK'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-5">
                  <div className="font-mono text-[12px] font-bold text-slate-300 mb-3">Security Architecture</div>
                  <div className="font-mono text-[11px] text-slate-500 leading-relaxed space-y-2">
                    <p>• <span className="text-accent">Anonymous users</span> have stable aliases (localStorage) — no accounts, no passwords stored.</p>
                    <p>• <span className="text-accent">Exploits & CTF challenges</span> require admin approval before going public — prevents malicious content.</p>
                    <p>• <span className="text-accent">All DB queries</span> go through Prisma ORM — parameterized by default, immune to SQL injection.</p>
                    <p>• <span className="text-accent">Admin routes</span> use SHA-256 signed tokens with 8h TTL stored as HttpOnly cookies.</p>
                    <p>• <span className="text-accent">CTF flags</span> are SHA-256 hashed before storage — even if DB is leaked, flags are safe.</p>
                    <p>• <span className="text-accent">User inputs</span> are stripped of HTML tags before storage to prevent stored XSS.</p>
                    <p>• <span className="text-slate-400">To do:</span> Add Cloudflare WAF, rate limiting via edge middleware, and abuse reporting.</p>
                  </div>
                </div>

                <div className="glass p-5" style={{borderColor:'rgba(255,215,0,0.15)'}}>
                  <div className="font-mono text-[12px] font-bold text-yellow-400 mb-3">⚠ Recommendations</div>
                  <div className="space-y-2">
                    {[
                      'Add ADMIN_SECRET env variable with a strong random value (32+ chars)',
                      'Enable Cloudflare WAF in front of the app for DDoS protection',
                      'Add rate limiting to /api/v1/exploits POST (prevent spam uploads)',
                      'Consider Supabase Row Level Security for additional DB protection',
                      'Add Honeypot fields to forms to catch automated submissions',
                    ].map((r,i)=>(
                      <div key={i} className="flex gap-2">
                        <span className="text-yellow-400 shrink-0">→</span>
                        <span className="font-mono text-[11px] text-slate-400">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Review Tabs ── */}
        {(tab==='exploits'||tab==='ctf') && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-4">
            {/* List */}
            <div className="glass overflow-hidden">
              {/* Status filter */}
              <div className="flex gap-1.5 p-3 border-b border-white/[0.06] flex-wrap">
                {(['pending','approved','rejected'] as Status[]).map(s=>(
                  <button key={s} onClick={()=>{setStatus(s);setSelected(null)}} className="font-mono text-[10px] px-3 py-1.5 rounded border capitalize transition-all cursor-pointer"
                    style={status===s?{background:s==='pending'?'rgba(255,215,0,0.1)':s==='approved'?'rgba(0,255,170,0.1)':'rgba(255,58,92,0.1)',borderColor:s==='pending'?'rgba(255,215,0,0.3)':s==='approved'?'rgba(0,255,170,0.3)':'rgba(255,58,92,0.3)',color:s==='pending'?'#ffd700':s==='approved'?'#00ffaa':'#ff3a5c'}:{borderColor:'rgba(255,255,255,0.08)',color:'#64748b'}}>
                    {s}
                  </button>
                ))}
                <button onClick={loadData} className="ml-auto font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-600 hover:text-slate-400 cursor-pointer">↻</button>
              </div>

              {/* Items */}
              <div className="overflow-y-auto" style={{maxHeight:'500px'}}>
                {loading&&<div className="p-8 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>}
                {!loading&&items.filter(i=>i.status===status).length===0&&(
                  <div className="p-8 text-center font-mono text-[11px] text-slate-600">No {status} {tab} submissions</div>
                )}
                {items.filter(i=>i.status===status).map(item=>{
                  const isExploit='type' in item
                  const color = isExploit ? (TYPE_COLOR[(item as Exploit).type]??'#64748b') : (CAT_COLOR[(item as CTFChallenge).category]??'#64748b')
                  return (
                    <div key={item.id} onClick={()=>{setSelected(item);setReviewNote(item.reviewNote??'')}}
                      className="flex items-start gap-3 px-4 py-3 border-b border-white/[0.03] cursor-pointer transition-colors hover:bg-white/[0.03]"
                      style={selected?.id===item.id?{background:'rgba(0,255,170,0.04)'}:{}}>
                      <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border shrink-0 mt-0.5"
                        style={{background:color+'18',color,borderColor:color+'35'}}>
                        {isExploit?(item as Exploit).type:(item as CTFChallenge).category.toUpperCase()}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-slate-200 truncate">{item.title}</div>
                        <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                          by <span className="text-accent">{item.authorAlias}</span> · {timeAgo(item.createdAt)}
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{background:item.status==='pending'?'#ffd700':item.status==='approved'?'#00ffaa':'#ff3a5c'}}/>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Detail */}
            <div>
              {!selected ? (
                <div className="glass p-8 text-center">
                  <div className="text-3xl mb-3">👈</div>
                  <div className="font-mono text-[12px] text-slate-600">Select a submission to review</div>
                </div>
              ) : (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Review</span>
                    <button onClick={()=>setSelected(null)} className="text-slate-600 hover:text-slate-400 font-mono text-[12px] cursor-pointer">✕</button>
                  </div>
                  <div className="p-4 overflow-y-auto space-y-4" style={{maxHeight:'500px'}}>
                    <div>
                      <div className="text-[15px] font-bold text-slate-100 mb-1">{selected.title}</div>
                      <div className="font-mono text-[10px] text-slate-500">by <span className="text-accent">{selected.authorAlias}</span> · {timeAgo(selected.createdAt)}</div>
                    </div>
                    <div className="text-[12px] text-slate-300 leading-relaxed p-3 rounded-lg" style={{background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.06)'}}>
                      {selected.description}
                    </div>
                    {'code' in selected && selected.code && (
                      <pre className="text-[11px] text-slate-300 p-3 rounded-lg overflow-x-auto" style={{background:'#05080f',border:'1px solid rgba(0,255,170,0.08)',maxHeight:'160px'}}>
                        {selected.code}
                      </pre>
                    )}
                    {/* File attachment */}
                    {selected.fileUrl && (
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{background:'rgba(0,170,255,0.06)',border:'1px solid rgba(0,170,255,0.2)'}}>
                        <span className="text-xl">📎</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[11px] font-bold text-accent2">Attached File</div>
                          <div className="font-mono text-[9px] text-slate-600 truncate">{selected.fileUrl}</div>
                        </div>
                        <a href={selected.fileUrl} target="_blank" rel="noreferrer" download
                          className="font-mono text-[10px] px-3 py-1.5 rounded border border-accent2/30 text-accent2 hover:bg-accent2/10 transition-colors cursor-pointer">
                          ⬇ Download
                        </a>
                      </div>
                    )}
                    {'fileUrl' in selected && selected.fileUrl && !('code' in selected) && (
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{background:'rgba(0,170,255,0.06)',border:'1px solid rgba(0,170,255,0.2)'}}>
                        <span className="text-xl">📎</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[11px] font-bold text-accent2">Challenge File</div>
                          <div className="font-mono text-[9px] text-slate-600 truncate">{selected.fileUrl}</div>
                        </div>
                        <a href={selected.fileUrl} target="_blank" rel="noreferrer" download
                          className="font-mono text-[10px] px-3 py-1.5 rounded border border-accent2/30 text-accent2 hover:bg-accent2/10 transition-colors cursor-pointer">
                          ⬇ Download
                        </a>
                      </div>
                    )}
                    {'hints' in selected && selected.hints?.length > 0 && (
                      <div>
                        <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1.5">Hints</div>
                        {selected.hints.map((h:string,i:number)=>(
                          <div key={i} className="font-mono text-[11px] text-slate-400 p-2 rounded mb-1" style={{background:'rgba(255,255,255,0.025)'}}>{i+1}. {h}</div>
                        ))}
                      </div>
                    )}
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Review Note</label>
                      <textarea value={reviewNote} onChange={e=>setReviewNote(e.target.value)}
                        placeholder="Reason for approval or rejection..."
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 resize-none"
                        rows={3} />
                    </div>
                    {selected.status==='pending' ? (
                      <div className="flex gap-2">
                        <button onClick={()=>review(selected.id,'approve')} disabled={processing}
                          className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
                          style={{background:'rgba(0,255,170,0.12)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
                          {processing?'⟳':'✓ APPROVE'}
                        </button>
                        <button onClick={()=>review(selected.id,'reject')} disabled={processing}
                          className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
                          style={{background:'rgba(255,58,92,0.1)',borderColor:'rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
                          {processing?'⟳':'✗ REJECT'}
                        </button>
                        <button onClick={()=>deleteItem(selected.id)} disabled={processing}
                          className="px-3 py-2.5 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-600 hover:text-red-400 hover:border-red-500/30 cursor-pointer transition-all">🗑</button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={()=>review(selected.id,selected.status==='approved'?'reject':'approve')} disabled={processing}
                          className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] cursor-pointer transition-all disabled:opacity-40"
                          style={{background:selected.status==='approved'?'rgba(255,58,92,0.08)':'rgba(0,255,170,0.08)',borderColor:selected.status==='approved'?'rgba(255,58,92,0.25)':'rgba(0,255,170,0.25)',color:selected.status==='approved'?'#ff3a5c':'#00ffaa'}}>
                          {selected.status==='approved'?'↩ REVOKE':'↺ RE-APPROVE'}
                        </button>
                        <button onClick={()=>deleteItem(selected.id)} disabled={processing}
                          className="px-3 py-2.5 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-600 hover:text-red-400 hover:border-red-500/30 cursor-pointer transition-all">🗑 DELETE</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
