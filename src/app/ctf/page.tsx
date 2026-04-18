'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isLoggedIn, getUser } from '@/lib/eso-auth'
import { timeAgo } from '@/lib/utils'

interface Challenge {
  id:string; title:string; category:string; difficulty:string
  description:string; points:number; hints:string[]; fileUrl:string|null
  expiresAt:string|null; createdAt:string; _count?:{solves:number}; solved?:boolean
}

const CAT_COLOR: Record<string,string> = {
  web:'#00aaff', pwn:'#ff3a5c', crypto:'#a78bfa',
  forensics:'#ff8c42', misc:'#64748b', reverse:'#ec4899', osint:'#00ffaa',
}
const CAT_ICON: Record<string,string> = {
  web:'🌐', pwn:'💣', crypto:'🔐', forensics:'🔍',
  misc:'🧩', reverse:'⚙️', osint:'🕵️',
}
const DIFF_COLOR: Record<string,string> = {
  easy:'#00ffaa', medium:'#ffd700', hard:'#ff3a5c', insane:'#a78bfa',
}

export default function CTFPage() {
  const [challenges,   setChallenges]   = useState<Challenge[]>([])
  const [loading,      setLoading]      = useState(true)
  const [filter,       setFilter]       = useState('all')
  const [selected,     setSelected]     = useState<Challenge|null>(null)
  const [flag,         setFlag]         = useState('')
  const [flagMsg,      setFlagMsg]      = useState<{ok:boolean;text:string}|null>(null)
  const [submitting,   setSubmitting]   = useState(false)
  const [leaderboard,  setLeaderboard]  = useState<any[]>([])
  const [showHint,     setShowHint]     = useState<number|null>(null)
  const [loginWall,    setLoginWall]    = useState(false)

  const loggedIn = isLoggedIn()
  const user     = getUser()
  const alias    = user?.username ?? (typeof window !== 'undefined' ? localStorage.getItem('xcloak:alias') ?? 'anon' : 'anon')

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/ctf').then(r=>r.json()),
      fetch('/api/v1/users?view=leaderboard').then(r=>r.json()),
    ]).then(([ch, lb]) => {
      setChallenges(Array.isArray(ch) ? ch : [])
      setLeaderboard(Array.isArray(lb) ? lb.slice(0,8) : [])
    }).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelected(null); setLoginWall(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  function openChallenge(ch: Challenge) {
    setSelected(ch); setFlag(''); setFlagMsg(null); setShowHint(null)
  }

  function openSubmit() {
    if (!loggedIn) { setLoginWall(true); return }
    // navigate
    window.location.href = '/ctf/submit'
  }

  async function submitFlag() {
    if (!selected || !flag.trim() || submitting) return
    if (!loggedIn) { setLoginWall(true); return }
    setSubmitting(true); setFlagMsg(null)
    try {
      const res = await fetch(`/api/v1/ctf/${selected.id}/submit`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ flag:flag.trim(), userAlias:alias }),
      })
      const d = await res.json()
      if (d.correct) {
        setFlagMsg({ ok:true, text:`🎉 Correct! +${selected.points} XP earned.` })
        setChallenges(cs => cs.map(c => c.id===selected.id ? {...c,solved:true} : c))
        if (selected) setSelected({...selected, solved:true})
      } else {
        setFlagMsg({ ok:false, text:'✗ Wrong flag — keep trying!' })
      }
    } catch { setFlagMsg({ ok:false, text:'Submission failed. Try again.' }) }
    finally { setSubmitting(false) }
  }

  const cats      = ['all', ...Array.from(new Set(challenges.map(c=>c.category)))]
  const visible   = challenges.filter(c => filter==='all' || c.category===filter)
  const solvedXP  = challenges.filter(c=>c.solved).reduce((s,c)=>s+c.points,0)
  const solvedCnt = challenges.filter(c=>c.solved).length

  return (
    <div className="p-3 sm:p-5">

      {/* Header */}
      <div className="flex items-start justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">CTF <span className="text-accent">Challenges</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            {challenges.length} challenges · Click a challenge to view & submit flag
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="glass px-3 py-2 text-center rounded-xl">
            <div className="font-mono text-lg font-bold text-yellow-400">{solvedXP}</div>
            <div className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">XP earned</div>
          </div>
          <div className="glass px-3 py-2 text-center rounded-xl">
            <div className="font-mono text-lg font-bold text-accent">{solvedCnt}/{challenges.length}</div>
            <div className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">Solved</div>
          </div>
          <button onClick={openSubmit}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[11px] font-bold transition-all cursor-pointer hover:opacity-80"
            style={{background:'rgba(0,170,255,0.1)',borderColor:'rgba(0,170,255,0.35)',color:'#00aaff'}}>
            🚩 Submit Challenge
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 mb-5 flex-wrap">
        {cats.map(cat=>(
          <button key={cat} onClick={()=>setFilter(cat)}
            className="font-mono text-[10px] px-3 py-1.5 rounded-lg border capitalize cursor-pointer transition-all"
            style={filter===cat
              ?{background:`${CAT_COLOR[cat]??'#00ffaa'}18`,borderColor:`${CAT_COLOR[cat]??'#00ffaa'}40`,color:CAT_COLOR[cat]??'#00ffaa'}
              :{borderColor:'rgba(255,255,255,0.08)',color:'#475569'}}>
            {cat==='all'?'All':cat}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">

        {/* Challenge cards */}
        <div className="space-y-2.5">
          {loading && (
            <div className="glass p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">
              Loading challenges...
            </div>
          )}
          {!loading && visible.length===0 && (
            <div className="glass p-10 text-center space-y-3">
              <div className="text-3xl opacity-30">🏴</div>
              <div className="font-mono text-[12px] text-slate-500">No challenges yet</div>
              <button onClick={openSubmit} className="font-mono text-[11px] text-accent hover:underline cursor-pointer">
                Submit the first challenge →
              </button>
            </div>
          )}
          {visible.map((ch,i) => (
            <button key={ch.id} onClick={()=>openChallenge(ch)}
              className="glass w-full text-left p-4 cursor-pointer transition-all hover:border-white/[0.15] active:scale-[0.99]"
              style={{
                borderColor: ch.solved ? `${CAT_COLOR[ch.category]??'#00ffaa'}30` : undefined,
                background:  ch.solved ? `${CAT_COLOR[ch.category]??'#00ffaa'}05` : undefined,
              }}>
              <div className="flex items-start gap-3">
                <div className="text-2xl mt-0.5 shrink-0">{CAT_ICON[ch.category]??'🧩'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[9px] px-1.5 py-[2px] rounded uppercase font-bold"
                      style={{background:`${CAT_COLOR[ch.category]??'#64748b'}18`,color:CAT_COLOR[ch.category]??'#64748b'}}>
                      {ch.category}
                    </span>
                    <span className="font-mono text-[10px] capitalize" style={{color:DIFF_COLOR[ch.difficulty]??'#64748b'}}>
                      {ch.difficulty}
                    </span>
                    {ch.hints?.length > 0 && (
                      <span className="font-mono text-[9px] text-slate-700">{ch.hints.length} hint{ch.hints.length>1?'s':''}</span>
                    )}
                    {ch.fileUrl && (
                      <span className="font-mono text-[9px] text-accent2">📎 file</span>
                    )}
                    {ch.solved && (
                      <span className="font-mono text-[9px] px-1.5 py-[1px] rounded font-bold ml-auto"
                        style={{background:'rgba(0,255,170,0.1)',color:'#00ffaa'}}>✓ SOLVED</span>
                    )}
                  </div>
                  <div className="font-semibold text-[13px] text-slate-100 mb-1">{ch.title}</div>
                  <div className="font-mono text-[10px] text-slate-500 line-clamp-2">{ch.description}</div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="font-mono text-xl font-bold" style={{color:DIFF_COLOR[ch.difficulty]??'#ffd700'}}>
                    {ch.points}
                  </div>
                  <div className="font-mono text-[8px] text-slate-700 uppercase">XP</div>
                  {ch._count && (
                    <div className="font-mono text-[8px] text-slate-700 mt-1">{ch._count.solves} solves</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Sidebar: scoreboard + submit CTA */}
        <div className="space-y-4">
          <div className="glass overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest">🏆 Scoreboard</span>
              <Link href="/leaderboard" className="font-mono text-[9px] text-slate-600 hover:text-slate-400">View All →</Link>
            </div>
            {leaderboard.length===0 ? (
              <div className="px-4 py-6 text-center font-mono text-[10px] text-slate-700">No entries yet</div>
            ) : leaderboard.map((u,i)=>{
              const c = ['#ffd700','#94a3b8','#ff8c42'][i]??'#334155'
              return (
                <div key={u.id??i} className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.03] last:border-0">
                  <span className="font-mono text-[10px] font-bold w-5" style={{color:c}}>#{i+1}</span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0"
                    style={{background:`${c}25`,border:`1px solid ${c}40`,color:c}}>
                    {(u.alias??'?')[0].toUpperCase()}
                  </div>
                  <span className="flex-1 font-mono text-[10px] text-slate-300 truncate">{u.alias}</span>
                  <span className="font-mono text-[10px] font-bold" style={{color:c}}>{(u.reputation??0).toLocaleString()}</span>
                </div>
              )
            })}
          </div>

          <div className="glass p-4 text-center space-y-2">
            <div className="text-2xl">🏴</div>
            <div className="font-mono text-[12px] font-bold text-slate-300">Create a Challenge</div>
            <div className="font-mono text-[10px] text-slate-600">Share your knowledge with the community</div>
            <button onClick={openSubmit}
              className="block w-full py-2.5 rounded-xl border font-mono text-[11px] font-bold transition-all cursor-pointer hover:opacity-80"
              style={{background:'rgba(0,170,255,0.08)',borderColor:'rgba(0,170,255,0.25)',color:'#00aaff'}}>
              📤 Submit Challenge
            </button>
          </div>
        </div>
      </div>

      {/* ── Challenge Detail Modal ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)'}}
          onClick={e=>{ if(e.target===e.currentTarget){setSelected(null);setFlagMsg(null)} }}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{background:'#060910',border:'1px solid rgba(255,255,255,0.1)',boxShadow:'0 25px 80px rgba(0,0,0,0.8)'}}>

            {/* Modal header */}
            <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xl">{CAT_ICON[selected.category]??'🧩'}</span>
                  <span className="font-mono text-[9px] px-1.5 py-[2px] rounded uppercase font-bold"
                    style={{background:`${CAT_COLOR[selected.category]??'#64748b'}20`,color:CAT_COLOR[selected.category]??'#64748b'}}>
                    {selected.category}
                  </span>
                  <span className="font-mono text-[10px] capitalize" style={{color:DIFF_COLOR[selected.difficulty]??'#64748b'}}>
                    {selected.difficulty}
                  </span>
                  <span className="font-mono text-[13px] font-bold ml-auto" style={{color:DIFF_COLOR[selected.difficulty]??'#ffd700'}}>
                    {selected.points} XP
                  </span>
                </div>
                <h2 className="text-[17px] font-black text-slate-100">{selected.title}</h2>
              </div>
              <button onClick={()=>{setSelected(null);setFlagMsg(null)}}
                className="font-mono text-[18px] text-slate-600 hover:text-slate-300 cursor-pointer shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] transition-all">
                ×
              </button>
            </div>

            <div className="p-5 space-y-4">

              {/* Description */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Description</div>
                <p className="font-mono text-[11px] text-slate-400 leading-relaxed whitespace-pre-line">{selected.description}</p>
              </div>

              {/* File download */}
              {selected.fileUrl && (
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Challenge File</div>
                  <a href={selected.fileUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold transition-all hover:opacity-80 w-fit"
                    style={{background:'rgba(0,170,255,0.1)',border:'1px solid rgba(0,170,255,0.25)',color:'#00aaff'}}>
                    📎 Download challenge file →
                  </a>
                </div>
              )}

              {/* Hints */}
              {selected.hints?.length > 0 && (
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">
                    Hints ({selected.hints.length})
                  </div>
                  <div className="space-y-2">
                    {selected.hints.map((hint, i) => (
                      <div key={i}>
                        <button
                          onClick={()=>setShowHint(showHint===i ? null : i)}
                          className="w-full text-left px-3 py-2 rounded-lg font-mono text-[10px] cursor-pointer transition-all"
                          style={{background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.15)',color:'#ffd700'}}>
                          {showHint===i ? '▼' : '▶'} Hint {i+1}
                          {showHint!==i && <span className="ml-2 text-slate-600">(click to reveal)</span>}
                        </button>
                        {showHint===i && (
                          <div className="mt-1 px-3 py-2 rounded-lg font-mono text-[11px] text-slate-400"
                            style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                            {hint}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solved badge */}
              {selected.solved && (
                <div className="p-3 rounded-xl text-center font-mono text-[12px] font-bold"
                  style={{background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.2)',color:'#00ffaa'}}>
                  ✓ You already solved this challenge!
                </div>
              )}

              {/* Flag submission */}
              {!selected.solved && (
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Submit Flag</div>
                  {!loggedIn ? (
                    <div className="p-4 rounded-xl text-center space-y-2"
                      style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                      <p className="font-mono text-[11px] text-slate-500">
                        You must be logged in to submit flags
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Link href="/login" className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl transition-all"
                          style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                          Sign In →
                        </Link>
                        <Link href="/register" className="font-mono text-[11px] px-4 py-2 rounded-xl transition-all text-slate-500"
                          style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                          Register
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input value={flag} onChange={e=>setFlag(e.target.value)}
                        onKeyDown={e=>e.key==='Enter'&&submitFlag()}
                        placeholder="xcloak{your_flag_here}"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-accent outline-none focus:border-accent/35 transition-colors placeholder-slate-700 tracking-wider"
                      />
                      <button onClick={submitFlag} disabled={submitting||!flag.trim()}
                        className="w-full py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all disabled:opacity-40"
                        style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.35)',color:'#00ffaa'}}>
                        {submitting ? '⟳ Checking...' : 'Submit Flag'}
                      </button>
                      {flagMsg && (
                        <div className={`p-3 rounded-xl font-mono text-[11px] text-center ${
                          flagMsg.ok
                            ? 'bg-accent/[0.08] border border-accent/25 text-accent'
                            : 'bg-red-500/[0.08] border border-red-500/25 text-red-400'
                        }`}>
                          {flagMsg.text}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login wall modal */}
      {loginWall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(8px)'}}
          onClick={e=>{ if(e.target===e.currentTarget) setLoginWall(false) }}>
          <div className="glass p-8 max-w-sm w-full text-center space-y-4 rounded-2xl">
            <div className="text-4xl">🔒</div>
            <h3 className="text-lg font-black">Login Required</h3>
            <p className="font-mono text-[11px] text-slate-500">
              Create a free account to submit CTF challenges and submit flags.
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/register" onClick={()=>setLoginWall(false)}
                className="font-mono text-[12px] font-bold px-5 py-2.5 rounded-xl transition-all"
                style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                Register Free →
              </Link>
              <Link href="/login" onClick={()=>setLoginWall(false)}
                className="font-mono text-[12px] px-5 py-2.5 rounded-xl text-slate-400 transition-all"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                Sign In
              </Link>
            </div>
            <button onClick={()=>setLoginWall(false)} className="font-mono text-[10px] text-slate-700 hover:text-slate-500 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
