'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { timeAgo } from '@/lib/utils'

type Tab = 'exploits' | 'ctf'
type Status = 'pending' | 'approved' | 'rejected'

interface Exploit {
  id: string; title: string; type: string; language: string; authorAlias: string
  status: string; dnaRisk: number | null; cveId: string | null
  description: string; code: string | null; createdAt: string; reviewNote: string | null
  _count?: { comments: number }
}

interface CTFChallenge {
  id: string; title: string; category: string; difficulty: string; points: number
  authorAlias: string; status: string; description: string; hints: string[]
  createdAt: string; reviewNote: string | null; _count?: { solves: number }
}

const TYPE_COLOR: Record<string, string> = {
  RCE:'#ff3a5c', XSS:'#ff8c42', SQLi:'#00aaff', BOF:'#ffd700',
  PrivEsc:'#a78bfa', LFI:'#ec4899',
}
const CAT_COLOR: Record<string, string> = {
  web:'#00aaff', pwn:'#ff3a5c', crypto:'#a78bfa', forensics:'#ff8c42', misc:'#64748b',
}

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab]         = useState<Tab>('exploits')
  const [status, setStatus]   = useState<Status>('pending')
  const [exploits, setExploits] = useState<Exploit[]>([])
  const [ctfs, setCTFs]       = useState<CTFChallenge[]>([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState<Exploit | CTFChallenge | null>(null)
  const [reviewNote, setReviewNote] = useState('')
  const [adjustPoints, setAdjustPoints] = useState('')
  const [correctedFlag, setCorrectedFlag] = useState('')
  const [processing, setProcessing] = useState(false)
  const [adminAlias, setAdminAlias] = useState('')

  useEffect(() => {
    const a = sessionStorage.getItem('xcloak-admin-alias')
    if (!a) { router.push('/admin/login'); return }
    setAdminAlias(a)
  }, [router])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const url = tab === 'exploits'
        ? `/api/v1/admin/exploits?status=${status}`
        : `/api/v1/admin/ctf?status=${status}`
      const res = await fetch(url)
      if (res.status === 401) { router.push('/admin/login'); return }
      const d = await res.json()
      if (tab === 'exploits') setExploits(Array.isArray(d) ? d : [])
      else                    setCTFs(Array.isArray(d) ? d : [])
    } finally { setLoading(false) }
  }, [tab, status, router])

  useEffect(() => { if (adminAlias) loadData() }, [loadData, adminAlias])

  async function review(id: string, action: 'approve' | 'reject') {
    setProcessing(true)
    try {
      const url = tab === 'exploits'
        ? `/api/v1/admin/exploits/${id}`
        : `/api/v1/admin/ctf/${id}`
      const body: any = { action, note: reviewNote || undefined }
      if (tab === 'ctf' && action === 'approve') {
        if (adjustPoints) body.points = parseInt(adjustPoints)
        if (correctedFlag) body.flag = correctedFlag
      }
      if (tab === 'exploits' && action === 'approve') {
        body.verified = false // admin can set to true if they want
      }
      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSelected(null); setReviewNote(''); setAdjustPoints(''); setCorrectedFlag('')
      loadData()
    } finally { setProcessing(false) }
  }

  async function deleteItem(id: string) {
    if (!confirm('Permanently delete this submission?')) return
    const url = tab === 'exploits' ? `/api/v1/admin/exploits/${id}` : `/api/v1/admin/ctf/${id}`
    await fetch(url, { method: 'DELETE' })
    setSelected(null)
    loadData()
  }

  async function logout() {
    await fetch('/api/v1/admin/login', { method: 'DELETE' })
    sessionStorage.removeItem('xcloak-admin-alias')
    router.push('/admin/login')
  }

  const items = tab === 'exploits' ? exploits : ctfs

  return (
    <div style={{ background:'#03050a', minHeight:'100vh', color:'#e2e8f0' }}>
      {/* Admin topbar */}
      <nav className="flex items-center px-5 h-[52px] gap-4"
        style={{ background:'rgba(8,13,23,0.95)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-black text-lg">🛡 Xcloak <span className="font-mono text-[12px] text-slate-500 font-normal">/ Admin</span></span>
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[10px] text-slate-500">Logged in as <span style={{ color:'#00ffaa' }}>{adminAlias}</span></span>
          <a href="/" className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">← Site</a>
          <button onClick={logout} className="font-mono text-[10px] px-3 py-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            LOGOUT
          </button>
        </div>
      </nav>

      <div className="p-5">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label:'Pending Exploits', value: exploits.filter(e=>e.status==='pending').length, color:'#ff8c42' },
            { label:'Pending CTFs',     value: ctfs.filter(c=>c.status==='pending').length,     color:'#ffd700' },
            { label:'Approved Exploits',value: '—',                                              color:'#00ffaa' },
            { label:'Approved CTFs',    value: '—',                                              color:'#00aaff' },
          ].map((s,i) => (
            <div key={i} className="glass px-4 py-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg,transparent,${s.color},transparent)` }}/>
              <div className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-1">{s.label}</div>
              <div className="font-mono text-2xl font-bold" style={{ color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
          {/* List panel */}
          <div className="glass overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
              {(['exploits','ctf'] as Tab[]).map(t => (
                <button key={t} onClick={() => { setTab(t); setSelected(null) }}
                  className="flex-1 py-3 font-mono text-[11px] uppercase tracking-widest transition-all cursor-pointer"
                  style={{
                    color: tab===t ? '#00ffaa' : '#64748b',
                    background: tab===t ? 'rgba(0,255,170,0.06)' : 'transparent',
                    borderBottom: tab===t ? '2px solid #00ffaa' : '2px solid transparent',
                  }}>
                  {t === 'exploits' ? '💉 Exploits' : '🏆 CTF Challenges'}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-1.5 p-3 border-b border-white/[0.06]">
              {(['pending','approved','rejected'] as Status[]).map(s => (
                <button key={s} onClick={() => { setStatus(s); setSelected(null) }}
                  className="font-mono text-[10px] px-3 py-1.5 rounded border capitalize transition-all cursor-pointer"
                  style={{
                    background: status===s ? (s==='pending'?'rgba(255,215,0,0.1)':s==='approved'?'rgba(0,255,170,0.1)':'rgba(255,58,92,0.1)') : 'rgba(255,255,255,0.025)',
                    borderColor: status===s ? (s==='pending'?'rgba(255,215,0,0.3)':s==='approved'?'rgba(0,255,170,0.3)':'rgba(255,58,92,0.3)') : 'rgba(255,255,255,0.08)',
                    color: status===s ? (s==='pending'?'#ffd700':s==='approved'?'#00ffaa':'#ff3a5c') : '#64748b',
                  }}>
                  {s} ({(tab==='exploits'?exploits:ctfs).filter(i=>i.status===s).length || '—'})
                </button>
              ))}
              <button onClick={loadData} className="ml-auto font-mono text-[10px] px-2 py-1.5 rounded border border-white/[0.08] text-slate-600 hover:text-slate-400 cursor-pointer">↻</button>
            </div>

            {/* Item list */}
            <div className="overflow-y-auto" style={{ maxHeight:'600px' }}>
              {loading && <div className="p-8 text-center font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>}
              {!loading && items.filter(i => i.status === status).length === 0 && (
                <div className="p-8 text-center font-mono text-[11px] text-slate-600">
                  No {status} {tab} submissions
                </div>
              )}
              {items.filter(i => i.status === status).map(item => {
                const isExploit = 'type' in item
                const isSelected = selected?.id === item.id
                return (
                  <div key={item.id}
                    onClick={() => { setSelected(item); setReviewNote(item.reviewNote ?? ''); setAdjustPoints(''); setCorrectedFlag('') }}
                    className="flex items-start gap-3 px-4 py-3 border-b border-white/[0.03] cursor-pointer transition-colors"
                    style={{ background: isSelected ? 'rgba(0,255,170,0.05)' : undefined }}>
                    {/* Type badge */}
                    <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border shrink-0 mt-0.5"
                      style={isExploit
                        ? { background:(TYPE_COLOR[(item as Exploit).type]??'#64748b')+'18', color:TYPE_COLOR[(item as Exploit).type]??'#64748b', borderColor:(TYPE_COLOR[(item as Exploit).type]??'#64748b')+'35' }
                        : { background:(CAT_COLOR[(item as CTFChallenge).category]??'#64748b')+'18', color:CAT_COLOR[(item as CTFChallenge).category]??'#64748b', borderColor:(CAT_COLOR[(item as CTFChallenge).category]??'#64748b')+'35' }
                      }>
                      {isExploit ? (item as Exploit).type : (item as CTFChallenge).category.toUpperCase()}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-slate-200 truncate">{item.title}</div>
                      <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                        by <span style={{ color:'#00ffaa' }}>{item.authorAlias}</span> · {timeAgo(item.createdAt)}
                        {isExploit && (item as Exploit).cveId && (
                          <span className="ml-2" style={{ color:'#a78bfa' }}>{(item as Exploit).cveId}</span>
                        )}
                        {!isExploit && (
                          <span className="ml-2 text-yellow-400">{(item as CTFChallenge).points} XP</span>
                        )}
                      </div>
                    </div>

                    {/* Status dot */}
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                      style={{ background: item.status==='pending'?'#ffd700':item.status==='approved'?'#00ffaa':'#ff3a5c' }}/>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detail / review panel */}
          <div>
            {!selected ? (
              <div className="glass p-8 text-center h-full flex items-center justify-center">
                <div>
                  <div className="text-3xl mb-3">👈</div>
                  <div className="font-mono text-[12px] text-slate-600">Select a submission to review</div>
                </div>
              </div>
            ) : (
              <div className="glass overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color:'#00ffaa' }}>Review</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] px-2 py-[2px] rounded border"
                      style={{
                        color:        selected.status==='pending'?'#ffd700':selected.status==='approved'?'#00ffaa':'#ff3a5c',
                        borderColor:  selected.status==='pending'?'rgba(255,215,0,0.25)':selected.status==='approved'?'rgba(0,255,170,0.25)':'rgba(255,58,92,0.25)',
                        background:   selected.status==='pending'?'rgba(255,215,0,0.08)':selected.status==='approved'?'rgba(0,255,170,0.08)':'rgba(255,58,92,0.08)',
                      }}>
                      {selected.status.toUpperCase()}
                    </span>
                    <button onClick={() => setSelected(null)} className="text-slate-600 hover:text-slate-400 font-mono text-[12px]">✕</button>
                  </div>
                </div>

                <div className="p-4 overflow-y-auto space-y-4" style={{ maxHeight:'560px' }}>
                  {/* Title + meta */}
                  <div>
                    <div className="text-[15px] font-bold text-slate-100 mb-1">{selected.title}</div>
                    <div className="font-mono text-[10px] text-slate-500">
                      by <span style={{ color:'#00ffaa' }}>{selected.authorAlias}</span> · {timeAgo(selected.createdAt)}
                    </div>
                    {'type' in selected && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border"
                          style={{ color:TYPE_COLOR[(selected as Exploit).type]??'#64748b', borderColor:'rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)' }}>
                          {(selected as Exploit).type}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">{(selected as Exploit).language}</span>
                        {(selected as Exploit).cveId && <span className="font-mono text-[9px] text-purple-400">{(selected as Exploit).cveId}</span>}
                        {(selected as Exploit).dnaRisk && <span className="font-mono text-[9px] text-orange-400">Risk {(selected as Exploit).dnaRisk?.toFixed(1)}</span>}
                      </div>
                    )}
                    {'category' in selected && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className="font-mono text-[9px] px-1.5 py-[2px] rounded border"
                          style={{ color:CAT_COLOR[(selected as CTFChallenge).category]??'#64748b', borderColor:'rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)' }}>
                          {(selected as CTFChallenge).category.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">{(selected as CTFChallenge).difficulty}</span>
                        <span className="font-mono text-[9px] text-yellow-400">{(selected as CTFChallenge).points} XP</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">Description</div>
                    <div className="text-[12px] text-slate-300 leading-relaxed p-3 rounded-lg"
                      style={{ background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.06)' }}>
                      {selected.description}
                    </div>
                  </div>

                  {/* Code (exploits) */}
                  {'code' in selected && selected.code && (
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">Code</div>
                      <pre className="text-[11px] text-slate-300 p-3 rounded-lg overflow-x-auto"
                        style={{ background:'#05080f', border:'1px solid rgba(0,255,170,0.08)', maxHeight:'200px' }}>
                        {(selected as Exploit).code}
                      </pre>
                    </div>
                  )}

                  {/* Hints (CTF) */}
                  {'hints' in selected && (selected as CTFChallenge).hints?.length > 0 && (
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">Hints</div>
                      <div className="space-y-1.5">
                        {(selected as CTFChallenge).hints.map((h, i) => (
                          <div key={i} className="font-mono text-[11px] text-slate-400 p-2 rounded"
                            style={{ background:'rgba(255,255,255,0.025)' }}>
                            {i+1}. {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Previous review note */}
                  {selected.reviewNote && (
                    <div className="p-3 rounded-lg border border-orange-500/20 bg-orange-500/8">
                      <div className="font-mono text-[9px] text-orange-400 mb-1">Previous Review Note</div>
                      <div className="font-mono text-[11px] text-slate-400">{selected.reviewNote}</div>
                    </div>
                  )}

                  {/* CTF admin adjustments */}
                  {'category' in selected && (
                    <div className="space-y-3">
                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">
                          Adjust Points (optional)
                        </label>
                        <input type="number" value={adjustPoints} onChange={e => setAdjustPoints(e.target.value)}
                          placeholder={`Keep as ${(selected as CTFChallenge).points}`}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-slate-200 outline-none focus:border-green-500/40" />
                      </div>
                      <div>
                        <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">
                          Correct Flag (optional — replaces stored hash)
                        </label>
                        <input value={correctedFlag} onChange={e => setCorrectedFlag(e.target.value)}
                          placeholder="xcloak{corrected_flag}"
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-accent outline-none focus:border-green-500/40"
                          style={{ letterSpacing:'0.04em' }}/>
                      </div>
                    </div>
                  )}

                  {/* Review note */}
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">
                      Review Note (shown to author on rejection)
                    </label>
                    <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
                      placeholder="Reason for approval or rejection..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-green-500/40 resize-none"
                      rows={3} />
                  </div>

                  {/* Action buttons */}
                  {selected.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button onClick={() => review(selected.id, 'approve')} disabled={processing}
                        className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
                        style={{ background:'rgba(0,255,170,0.12)', borderColor:'rgba(0,255,170,0.35)', color:'#00ffaa' }}>
                        {processing ? '⟳' : '✓ APPROVE'}
                      </button>
                      <button onClick={() => review(selected.id, 'reject')} disabled={processing}
                        className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
                        style={{ background:'rgba(255,58,92,0.1)', borderColor:'rgba(255,58,92,0.3)', color:'#ff3a5c' }}>
                        {processing ? '⟳' : '✗ REJECT'}
                      </button>
                      <button onClick={() => deleteItem(selected.id)} disabled={processing}
                        className="px-3 py-2.5 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-600 hover:text-red-400 hover:border-red-500/30 cursor-pointer transition-all"
                        title="Delete permanently">🗑</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={() => review(selected.id, selected.status === 'approved' ? 'reject' : 'approve')} disabled={processing}
                        className="flex-1 py-2.5 rounded-lg border font-mono text-[11px] cursor-pointer transition-all disabled:opacity-40"
                        style={{
                          background: selected.status==='approved'?'rgba(255,58,92,0.08)':'rgba(0,255,170,0.08)',
                          borderColor: selected.status==='approved'?'rgba(255,58,92,0.25)':'rgba(0,255,170,0.25)',
                          color: selected.status==='approved'?'#ff3a5c':'#00ffaa',
                        }}>
                        {selected.status==='approved' ? '↩ REVOKE' : '↺ RE-APPROVE'}
                      </button>
                      <button onClick={() => deleteItem(selected.id)} disabled={processing}
                        className="px-3 py-2.5 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-600 hover:text-red-400 hover:border-red-500/30 cursor-pointer transition-all">
                        🗑 DELETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
