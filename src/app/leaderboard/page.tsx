import { prisma } from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'

export const metadata = { title: 'Leaderboard' }
export const revalidate = 60

async function getData() {
  const [users, exploitCounts] = await Promise.all([
    prisma.user.findMany({ orderBy: { reputation: 'desc' }, take: 50 }),
    prisma.exploit.groupBy({ by: ['authorAlias'], _count: { id: true } }),
  ])
  const exploitMap = Object.fromEntries(exploitCounts.map(e => [e.authorAlias, e._count.id]))
  return users.map((u, i) => ({ ...u, rank: i + 1, exploits: exploitMap[u.alias] ?? 0 }))
}

const RANK_COLORS = ['#ffd700', '#94a3b8', '#ff8c42']
const RANK_ICONS  = ['🏆', '🥈', '🥉']
const BADGE_LABELS: Record<string, string> = {
  first_blood: '🩸', centurion: '⚔', elite: '💎', legend: '👑', ctf_winner: '🚩',
}

export default async function LeaderboardPage() {
  const users = await getData()

  return (
    <div className="p-5">
      <div className="mb-6">
        <h1 className="text-2xl font-black">Top <span className="text-accent">Researchers</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          {users.length} researchers · Ranked by reputation XP · Updated every 60s
        </p>
      </div>

      {/* Top 3 podium */}
      {users.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[users[1], users[0], users[2]].map((user, idx) => {
            const podiumRank = [2, 1, 3][idx]
            const color = RANK_COLORS[podiumRank - 1]
            const height = podiumRank === 1 ? 'pt-0' : 'pt-8'
            return (
              <div key={user.id} className={`glass p-5 text-center ${height} animate-float-in`}
                style={{ animationDelay: `${idx * 0.1}s`, borderColor: `${color}30` }}>
                <div className="text-3xl mb-2">{RANK_ICONS[podiumRank - 1]}</div>
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-xl"
                  style={{ background: `linear-gradient(135deg, ${color}, #0f172a)` }}>
                  {user.alias[0].toUpperCase()}
                </div>
                <div className="font-mono text-[13px] font-bold" style={{ color }}>{user.alias}</div>
                <div className="font-mono text-2xl font-black mt-1" style={{ color }}>
                  {user.reputation.toLocaleString()}
                </div>
                <div className="font-mono text-[9px] text-slate-600">XP</div>
                <div className="flex justify-center gap-1 mt-2 flex-wrap">
                  {user.badges.slice(0, 4).map(b => (
                    <span key={b} className="text-sm" title={b}>{BADGE_LABELS[b] ?? '⭐'}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Full table */}
      <div className="glass overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Full Rankings</span>
        </div>

        {users.length === 0 ? (
          <div className="p-12 text-center font-mono text-[11px] text-slate-600">
            No researchers yet. Upload exploits and submit CTF flags to earn XP!
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.015)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {['Rank', 'Researcher', 'Reputation', 'Exploits', 'Badges', 'Joined'].map(h => (
                  <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600
                                         text-left px-4 py-2.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] font-bold"
                      style={{ color: RANK_COLORS[user.rank - 1] ?? '#334155' }}>
                      #{user.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                        style={{ background: `linear-gradient(135deg,${RANK_COLORS[user.rank - 1] ?? '#334155'},#0f172a)` }}>
                        {user.alias[0].toUpperCase()}
                      </div>
                      <span className="font-mono text-[12px] text-accent">{user.alias}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[13px] font-bold text-slate-200">
                      {user.reputation.toLocaleString()}
                    </span>
                    <span className="font-mono text-[9px] text-slate-600 ml-1">XP</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{user.exploits}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {user.badges.slice(0, 5).map(b => (
                        <span key={b} className="text-sm" title={b}>{BADGE_LABELS[b] ?? '⭐'}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[10px] text-slate-600">
                    {timeAgo(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
