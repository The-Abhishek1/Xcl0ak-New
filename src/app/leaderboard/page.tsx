// src/app/leaderboard/page.tsx
// FIXED: Exploit model has no 'status' field — removed that filter
// FIXED: prisma.cTFSolve → prisma.cTFSolve (correct casing per schema)

import { prisma }  from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Link        from 'next/link'

export const metadata = { title: 'Leaderboard — Xcloak' }
export const dynamic  = 'force-dynamic'

async function getData() {
  const [users, exploitCounts, ctfSolves] = await Promise.all([
    prisma.user.findMany({
      orderBy: { reputation: 'desc' },
      take:    50,
    }),
    // FIXED: no 'status' field on Exploit model
    prisma.exploit.groupBy({
      by:    ['authorAlias'],
      _count: { id: true },
    }),
    prisma.cTFSolve.groupBy({
      by:    ['userAlias'],
      _count: { id: true },
    }),
  ])

  const exploitMap = Object.fromEntries(exploitCounts.map(e => [e.authorAlias, e._count.id]))
  const ctfMap     = Object.fromEntries(ctfSolves.map(e => [e.userAlias, e._count.id]))

  return users.map((u, i) => ({
    ...u,
    rank:      i + 1,
    exploits:  exploitMap[u.alias] ?? 0,
    ctfSolves: ctfMap[u.alias]     ?? 0,
  }))
}

const RANK_COLORS = ['#ffd700', '#94a3b8', '#ff8c42']
const RANK_ICONS  = ['🏆', '🥈', '🥉']
const BADGE_ICONS: Record<string, string> = {
  first_blood: '🩸', centurion: '⚔', elite: '💎', legend: '👑', ctf_winner: '🚩',
}

export default async function LeaderboardPage() {
  const users = await getData()
  const top3  = users.slice(0, 3)
  const rest  = users.slice(3)

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black">Security <span className="text-accent">Leaderboard</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Top researchers ranked by reputation · {users.length} researchers
        </p>
      </div>

      {/* Podium — top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[top3[1], top3[0], top3[2]].filter(Boolean).map((u, i) => {
            const realIdx = u.rank - 1
            const height  = realIdx === 0 ? 'h-36' : 'h-28'
            return (
              <div key={u.id}
                className={`glass flex flex-col items-center justify-end p-4 ${height} relative overflow-hidden`}
                style={{ borderColor: `${RANK_COLORS[realIdx]}30` }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg,transparent,${RANK_COLORS[realIdx]},transparent)` }} />
                <div className="text-2xl mb-1">{RANK_ICONS[realIdx]}</div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2"
                  style={{ background: `linear-gradient(135deg,${RANK_COLORS[realIdx]},#1e293b)` }}>
                  {u.alias[0].toUpperCase()}
                </div>
                <div className="font-mono text-[11px] font-bold text-accent truncate max-w-full">{u.alias}</div>
                <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                  {u.reputation.toLocaleString()} pts
                </div>
                <div className="flex gap-1 mt-1 flex-wrap justify-center">
                  {(u.badges ?? []).slice(0, 3).map(b => (
                    <span key={b} title={b}>{BADGE_ICONS[b] ?? '🏅'}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Full table */}
      <div className="glass overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <span className="font-mono text-[11px] text-accent uppercase tracking-widest">All Researchers</span>
          <Link href="/exploits/upload"
            className="font-mono text-[10px] text-slate-500 hover:text-accent transition-colors">
            Join the board →
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="font-mono text-[12px] text-slate-600 mb-2">No researchers yet.</div>
            <p className="font-mono text-[11px] text-slate-700">
              Upload exploits or solve CTF challenges to earn reputation.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Rank', 'Researcher', 'Reputation', 'Exploits', 'CTF Solves', 'Badges', 'Joined'].map(h => (
                    <th key={h} className="font-mono text-[9px] tracking-widest text-slate-600 uppercase text-left px-4 py-2.5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-[12px] font-bold"
                        style={{ color: u.rank <= 3 ? RANK_COLORS[u.rank - 1] : '#475569' }}>
                        {u.rank <= 3 ? RANK_ICONS[u.rank - 1] : `#${u.rank}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                          style={{ background: 'linear-gradient(135deg,rgba(0,255,170,0.3),#1e293b)' }}>
                          {u.alias[0].toUpperCase()}
                        </div>
                        <span className="font-mono text-[12px] font-semibold text-accent">{u.alias}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[12px] font-bold text-slate-200">
                        {u.reputation.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{u.exploits}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{u.ctfSolves}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {(u.badges ?? []).slice(0, 4).map(b => (
                          <span key={b} title={b} className="text-sm">{BADGE_ICONS[b] ?? '🏅'}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-600">
                      {timeAgo(u.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
