'use client'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { timeAgo } from '@/lib/utils'

interface Challenge {
  id: string; title: string; category: string; difficulty: string
  description: string; points: number; expiresAt: string | null; createdAt: string
  _count?: { solves: number }; solved?: boolean
}

const CAT_CLS: Record<string, string> = {
  web:      'bg-blue-500/15 text-blue-400 border-blue-500/25',
  pwn:      'bg-red-500/15 text-red-400 border-red-500/25',
  crypto:   'bg-purple-500/15 text-purple-400 border-purple-500/25',
  forensics:'bg-orange-500/15 text-orange-400 border-orange-500/25',
  misc:     'bg-slate-500/15 text-slate-400 border-slate-500/25',
}

const DIFF_COLOR: Record<string, string> = {
  easy: 'text-accent', medium: 'text-yellow-400', hard: 'text-red-400',
}

export default function CTFPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading]       = useState(true)
  const [filter, setFilter]         = useState('ALL')
  const [selected, setSelected]     = useState<Challenge | null>(null)
  const [flag, setFlag]             = useState('')
  const [flagMsg, setFlagMsg]       = useState<{ ok: boolean; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [alias, setAlias] = useState('anon')

  useEffect(() => { setAlias(localStorage.getItem('xcloak:alias') ?? 'anon') }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/v1/ctf').then(r => r.json()),
      fetch('/api/v1/users?view=leaderboard').then(r => r.json()),
    ]).then(([ch, lb]) => {
      setChallenges(Array.isArray(ch) ? ch : [])
      setLeaderboard(Array.isArray(lb) ? lb.slice(0, 8) : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  async function submitFlag() {
    if (!selected || !flag.trim() || submitting) return
    setSubmitting(true)
    setFlagMsg(null)
    try {
      const res = await fetch(`/api/v1/ctf/${selected.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag: flag.trim(), userAlias: alias }),
      })
      const d = await res.json()
      if (d.correct) {
        setFlagMsg({ ok: true, text: `✓ Correct! +${selected.points} XP earned.` })
        setChallenges(cs => cs.map(c => c.id === selected.id ? { ...c, solved: true } : c))
      } else {
        setFlagMsg({ ok: false, text: '✗ Wrong flag. Try again.' })
      }
    } catch {
      setFlagMsg({ ok: false, text: 'Submission failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  const categories = ['ALL', ...Array.from(new Set(challenges.map(c => c.category.toUpperCase())))]
  const visible = challenges.filter(c =>
    filter === 'ALL' || c.category.toUpperCase() === filter
  )
  const totalXP = challenges.filter(c => c.solved).reduce((s, c) => s + c.points, 0)

  return (
    <div className="p-5">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black">CTF <span className="text-accent">Challenges</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Weekly rotation · {challenges.length} active challenges · Submit flags to earn XP
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-sm px-4 py-2 text-center">
            <div className="font-mono text-xl font-bold text-yellow-400">{totalXP}</div>
            <div className="font-mono text-[9px] text-slate-600 uppercase">Your XP</div>
          </div>
          <div className="glass-sm px-4 py-2 text-center">
            <div className="font-mono text-xl font-bold text-accent">
              {challenges.filter(c => c.solved).length}
            </div>
            <div className="font-mono text-[9px] text-slate-600 uppercase">Solved</div>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`font-mono text-[10px] px-3 py-1.5 rounded border transition-all
              ${filter === cat
                ? 'border-accent/30 text-accent bg-accent/8'
                : 'border-white/[0.08] text-slate-500 hover:text-slate-300'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-4">
        {/* Challenges */}
        <div className="space-y-2.5">
          {loading && (
            <div className="glass p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse">
              Loading challenges...
            </div>
          )}

          {!loading && visible.length === 0 && (
            <div className="glass p-12 text-center font-mono text-[11px] text-slate-600">
              No challenges yet. Admins can seed them via the database.
            </div>
          )}

          {visible.map((ch, i) => (
            <div key={ch.id}
              className={`glass p-4 cursor-pointer transition-all duration-150 hover:border-accent/20
                         animate-float-in ${ch.solved ? 'border-accent/20' : ''}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => { setSelected(ch); setFlag(''); setFlagMsg(null) }}>
              <div className="flex items-start gap-4">
                <div className="text-2xl mt-0.5">
                  {ch.category === 'web' ? '🌐' : ch.category === 'pwn' ? '💣' :
                   ch.category === 'crypto' ? '🔐' : ch.category === 'forensics' ? '🔍' : '🧩'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className={`font-mono text-[9px] px-1.5 py-[2px] rounded border uppercase ${CAT_CLS[ch.category] ?? CAT_CLS.misc}`}>
                      {ch.category}
                    </span>
                    <span className={`font-mono text-[10px] capitalize ${DIFF_COLOR[ch.difficulty] ?? 'text-slate-500'}`}>
                      {ch.difficulty}
                    </span>
                    {ch.expiresAt && (
                      <span className="font-mono text-[10px] text-orange-400">
                        ⏱ expires {timeAgo(ch.expiresAt)}
                      </span>
                    )}
                    {ch.solved && (
                      <span className="font-mono text-[9px] px-1.5 py-[1px] rounded border bg-accent/10 text-accent border-accent/25 ml-auto">
                        ✓ SOLVED
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] font-bold text-slate-100 mb-1">{ch.title}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-2">{ch.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-xl font-bold text-yellow-400">{ch.points}</div>
                  <div className="font-mono text-[9px] text-slate-600">XP</div>
                  {ch._count && (
                    <div className="font-mono text-[9px] text-slate-600 mt-1">{ch._count.solves} solves</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: scoreboard + flag submit */}
        <div className="space-y-4">
          {/* Flag submission */}
          {selected && (
            <div className="glass p-4">
              <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1">Submitting Flag</div>
              <div className="text-[13px] font-bold text-slate-200 mb-3 line-clamp-2">{selected.title}</div>
              <input value={flag} onChange={e => setFlag(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submitFlag()}
                placeholder="xcloak{...}"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5
                           font-mono text-[12px] text-accent tracking-wider outline-none
                           focus:border-accent/35 transition-colors mb-2.5" />
              <button onClick={submitFlag} disabled={submitting || !flag.trim()}
                className="w-full py-2.5 rounded-lg border border-accent/30 bg-accent/8 text-accent
                           font-mono text-[12px] font-bold hover:bg-accent/15 transition-all
                           disabled:opacity-40 cursor-pointer">
                {submitting ? '⟳ CHECKING...' : 'SUBMIT FLAG'}
              </button>
              {flagMsg && (
                <div className={`mt-2 p-2.5 rounded-lg font-mono text-[11px] border ${
                  flagMsg.ok
                    ? 'bg-accent/8 border-accent/25 text-accent'
                    : 'bg-red-500/8 border-red-500/25 text-red-400'
                }`}>
                  {flagMsg.text}
                </div>
              )}
            </div>
          )}

          {/* Scoreboard */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <span className="font-mono text-[11px] text-accent uppercase tracking-widest">🏆 Scoreboard</span>
            </div>
            <div className="py-1">
              {leaderboard.length === 0 && (
                <div className="px-4 py-6 text-center font-mono text-[10px] text-slate-600">
                  No researchers yet
                </div>
              )}
              {leaderboard.map((user, i) => {
                const colors = ['#ffd700','#94a3b8','#ff8c42']
                const c = colors[i] ?? '#334155'
                return (
                  <div key={user.id} className="flex items-center gap-2.5 px-4 py-2 border-b border-white/[0.03]">
                    <span className="font-mono text-[10px] font-bold w-5" style={{ color: c }}>#{user.rank}</span>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px]"
                      style={{ background: `linear-gradient(135deg,${c},#1e293b)` }}>
                      {user.alias[0].toUpperCase()}
                    </div>
                    <span className="flex-1 font-mono text-[10px] text-accent truncate">{user.alias}</span>
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      {user.reputation.toLocaleString()} XP
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
