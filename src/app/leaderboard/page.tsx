import { prisma }  from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Link from 'next/link'

export const metadata = { title:'Leaderboard' }
export const revalidate = 60

async function getData() {
  const [users, exploitCounts, ctfSolves] = await Promise.all([
    prisma.user.findMany({ orderBy:{ reputation:'desc' }, take:50 }),
    prisma.exploit.groupBy({ by:['authorAlias'], where:{status:'approved'}, _count:{id:true} }),
    prisma.cTFSolve.groupBy({ by:['userAlias'], _count:{id:true} }),
  ])
  const exploitMap = Object.fromEntries(exploitCounts.map(e=>[e.authorAlias, e._count.id]))
  const ctfMap     = Object.fromEntries(ctfSolves.map(e=>[e.userAlias, e._count.id]))
  return users.map((u,i) => ({
    ...u, rank:i+1,
    exploits: exploitMap[u.alias] ?? 0,
    ctfSolves: ctfMap[u.alias] ?? 0,
  }))
}

const RANK_COLORS = ['#ffd700','#94a3b8','#ff8c42']
const RANK_ICONS  = ['🏆','🥈','🥉']
const BADGE_ICONS: Record<string,string> = {
  first_blood:'🩸', centurion:'⚔', elite:'💎', legend:'👑', ctf_winner:'🚩',
}

export default async function LeaderboardPage() {
  const users = await getData()

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Top <span className="text-accent">Researchers</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          {users.length} researchers · Ranked by reputation XP · Updated every 60s
        </p>
      </div>

      {/* Top 3 podium — horizontal scroll on mobile */}
      {users.length >= 1 && (
        <div className="flex gap-3 mb-5 overflow-x-auto pb-2">
          {[users[1], users[0], users[2]].filter(Boolean).map((user, idx) => {
            if (!user) return null
            const podiumRank = [2,1,3][idx]
            const color = RANK_COLORS[(podiumRank-1)] ?? '#334155'
            return (
              <div key={user.id}
                className={`glass p-4 text-center animate-fin shrink-0 flex-1 min-w-[140px] ${podiumRank===1?'':'opacity-90'}`}
                style={{ animationDelay:`${idx*0.1}s`, borderColor:`${color}30` }}>
                <div className="text-2xl mb-2">{RANK_ICONS[podiumRank-1]}</div>
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-black text-lg"
                  style={{ background:`linear-gradient(135deg,${color},#0f172a)` }}>
                  {user.alias[0].toUpperCase()}
                </div>
                <div className="font-mono text-[11px] font-bold truncate" style={{color}}>{user.alias}</div>
                <div className="font-mono text-xl font-black mt-0.5" style={{color}}>{user.reputation.toLocaleString()}</div>
                <div className="font-mono text-[9px] text-slate-600">XP</div>
                <div className="flex justify-center gap-0.5 mt-2 flex-wrap">
                  {user.badges.slice(0,3).map(b=>(
                    <span key={b} className="text-sm" title={b}>{BADGE_ICONS[b]??'⭐'}</span>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-2">
                  <div className="text-center">
                    <div className="font-mono text-[11px] font-bold text-orange-400">{user.exploits}</div>
                    <div className="font-mono text-[8px] text-slate-600">exploits</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[11px] font-bold text-purple-400">{user.ctfSolves}</div>
                    <div className="font-mono text-[8px] text-slate-600">CTF solved</div>
                  </div>
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
          <div className="p-12 text-center">
            <div className="font-mono text-[13px] text-slate-500 mb-2">No researchers yet.</div>
            <p className="font-mono text-[11px] text-slate-600">Upload exploits and solve CTF challenges to earn XP!</p>
          </div>
        ) : (
          /* Mobile: card view. Desktop: table view */
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{ background:'rgba(255,255,255,0.015)', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                    {['Rank','Researcher','Reputation','Exploits','CTF Solves','Badges','Joined'].map(h=>(
                      <th key={h} className="font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] font-bold" style={{color:RANK_COLORS[user.rank-1]??'#334155'}}>
                          #{user.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0"
                            style={{background:`linear-gradient(135deg,${RANK_COLORS[user.rank-1]??'#334155'},#0f172a)`}}>
                            {user.alias[0].toUpperCase()}
                          </div>
                          <span className="font-mono text-[12px] text-accent">{user.alias}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[13px] font-bold text-slate-200">{user.reputation.toLocaleString()}</span>
                        <span className="font-mono text-[9px] text-slate-600 ml-1">XP</span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/exploits?author=${user.alias}`}
                          className="font-mono text-[11px] text-orange-400 hover:underline">{user.exploits}</Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] text-purple-400">{user.ctfSolves}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-0.5">
                          {user.badges.slice(0,5).map(b=>(
                            <span key={b} className="text-sm" title={b}>{BADGE_ICONS[b]??'⭐'}</span>
                          ))}
                          {user.badges.length===0 && <span className="font-mono text-[10px] text-slate-700">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-[10px] text-slate-600">{timeAgo(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="sm:hidden divide-y divide-white/[0.04]">
              {users.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-4">
                  <span className="font-mono text-[12px] font-bold w-8 text-center shrink-0"
                    style={{color:RANK_COLORS[user.rank-1]??'#334155'}}>
                    #{user.rank}
                  </span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0"
                    style={{background:`linear-gradient(135deg,${RANK_COLORS[user.rank-1]??'#334155'},#0f172a)`}}>
                    {user.alias[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[12px] text-accent truncate">{user.alias}</div>
                    <div className="flex gap-3 mt-0.5">
                      <span className="font-mono text-[9px] text-slate-600">💉 {user.exploits}</span>
                      <span className="font-mono text-[9px] text-slate-600">🏁 {user.ctfSolves}</span>
                      {user.badges.length>0 && (
                        <span className="font-mono text-[9px]">{user.badges.slice(0,3).map(b=>BADGE_ICONS[b]??'⭐').join('')}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-[14px] font-bold text-slate-200">{user.reputation.toLocaleString()}</div>
                    <div className="font-mono text-[9px] text-slate-600">XP</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
