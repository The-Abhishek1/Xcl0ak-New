import { prisma } from '@/lib/prisma'

export async function Leaderboard() {
  const users = await prisma.user.findMany({ orderBy:{reputation:'desc'}, take:5 }).catch(()=>[])
  const colors = ['#ffd700','#94a3b8','#ff8c42','#64748b','#64748b']
  return (
    <div className="glass overflow-hidden">
      <div className="px-3 py-2.5 border-b border-white/[0.06]">
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{color:'#00ffaa'}}>🏆 Leaderboard</span>
      </div>
      {users.length === 0
        ? <div className="px-3 py-4 text-center font-mono text-[10px] text-slate-600">No researchers yet</div>
        : <div className="py-1">{users.map((u,i)=>(
            <div key={u.id} className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.03]">
              <span className="font-mono text-[10px] font-bold w-5" style={{color:colors[i]}}>#{i+1}</span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px]" style={{background:`linear-gradient(135deg,${colors[i]},#0f172a)`}}>{u.alias[0].toUpperCase()}</div>
              <span className="flex-1 font-mono text-[10px] truncate" style={{color:'#00ffaa'}}>{u.alias}</span>
              <span className="font-mono text-[10px] font-bold text-slate-500">{u.reputation.toLocaleString()}</span>
            </div>
          ))}</div>
      }
    </div>
  )
}
