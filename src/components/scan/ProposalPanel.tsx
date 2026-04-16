'use client'
import { useEffect, useState } from 'react'
import { esoScans } from '@/lib/eso/api'

export default function ProposalPanel({ processId, onApproved }: { processId: string; onApproved: () => void }) {
  const [proposals, setProposals] = useState<any[]>([])
  const [checked,   setChecked]   = useState<Set<string>>(new Set())
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    esoScans.proposals(processId).then(r => {
      if (r.awaiting_approval && r.proposals?.length) {
        setProposals(r.proposals)
        setChecked(new Set(r.proposals.map((p:any) => p.task_name)))
      }
    }).catch(()=>{})
  }, [processId])

  const toggle = (name: string) => {
    const n = new Set(checked); n.has(name)?n.delete(name):n.add(name); setChecked(n)
  }

  const approve = async (approved: string[]) => {
    setLoading(true)
    try { await esoScans.approve(processId, approved); setProposals([]); onApproved() }
    catch {}
    setLoading(false)
  }

  if (!proposals.length) return null

  return (
    <div className="glass p-4" style={{borderColor:'rgba(255,215,0,0.2)',background:'rgba(255,215,0,0.03)'}}>
      <div className="flex items-center gap-2 mb-3">
        <div className="live-dot" style={{background:'#ffd700',animation:'pulse-dot 1s ease-in-out infinite'}}/>
        <span className="font-mono text-[10px] uppercase tracking-widest text-yellow-400">AI Proposals — Approval Needed</span>
      </div>
      <div className="space-y-2 mb-4">
        {proposals.map((p,i) => (
          <div key={i} onClick={()=>toggle(p.task_name)}
            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all"
            style={{
              background: checked.has(p.task_name)?'rgba(0,170,255,0.06)':'rgba(255,255,255,0.02)',
              borderColor: checked.has(p.task_name)?'rgba(0,170,255,0.2)':'rgba(255,255,255,0.06)',
              opacity: checked.has(p.task_name)?1:0.5,
            }}>
            <input type="checkbox" checked={checked.has(p.task_name)} readOnly
              className="accent-accent2 w-3.5 h-3.5 pointer-events-none" />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-slate-200 truncate">{p.task_name}</div>
              <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                🔧 {p.tool} · Priority {p.priority} · {p.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={()=>approve(Array.from(checked))} disabled={loading||checked.size===0}
          className="flex-1 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
          style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>
          {loading?'⟳':'✓'} Approve {checked.size>0?`(${checked.size})`:''}
        </button>
        <button onClick={()=>approve([])} disabled={loading}
          className="px-4 py-2 rounded-lg border font-mono text-[11px] cursor-pointer transition-all"
          style={{background:'rgba(255,58,92,0.08)',borderColor:'rgba(255,58,92,0.25)',color:'#ff3a5c'}}>
          ✗ Skip All
        </button>
      </div>
    </div>
  )
}
