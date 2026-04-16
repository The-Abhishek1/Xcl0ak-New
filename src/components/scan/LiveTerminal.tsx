'use client'
import { useEffect, useRef } from 'react'
import type { ScanEvent } from '@/hooks/use-scan-ws'

const TYPE_COLOR: Record<string,string> = {
  execution_start:'#00ffaa', level_start:'#00aaff', task_start:'#ffd700',
  task_output:'#475569', task_complete:'#00ffaa', analysis_start:'#a78bfa',
  analysis_done:'#a78bfa', risk_update:'#ff8c42', proposal:'#ffd700',
  approval_needed:'#ffd700', approval_done:'#00ffaa', report_start:'#00aaff',
  report_done:'#00ffaa', complete:'#00ffaa', error:'#ff3a5c',
}
const TYPE_ICON: Record<string,string> = {
  execution_start:'▶', level_start:'◈', task_start:'🐳', task_output:'  ',
  task_complete:'✓', analysis_start:'🧠', analysis_done:'📊', risk_update:'⚖',
  proposal:'💡', approval_needed:'⏸', approval_done:'✓', report_start:'📝',
  report_done:'📄', complete:'✓', error:'✗',
}

function fmt(ev: ScanEvent): string {
  const d = ev.data
  switch (ev.type) {
    case 'execution_start': return `Scan started: ${d.target} — ${d.total_tasks} tasks, ${d.levels} levels`
    case 'level_start':     return `Level ${d.level}/${d.total_levels}: ${(d.tools||[]).join(', ')}`
    case 'task_start':      return `Running ${d.tool}: ${d.task_name}`
    case 'task_output':     return `${d.line}`
    case 'task_complete':   return `${d.tool} done — ${d.findings_count} findings (${(d.duration||0).toFixed(1)}s)`
    case 'analysis_start':  return `AI analyzing ${d.findings_count} findings...`
    case 'analysis_done':   return `Validated: ${d.validated}, removed ${d.removed} false positives${d.summary?' — '+d.summary:''}`
    case 'risk_update':     return `Risk: ${(d.risk||'?').toUpperCase()} (${(d.score||0).toFixed(1)}) — C:${d.critical} H:${d.high} M:${d.medium}`
    case 'proposal':        return `AI proposes: ${(d.proposals||[]).map((p:any)=>`${p.task_name} (${p.tool})`).join(', ')}`
    case 'approval_needed': return `Waiting for your approval...`
    case 'approval_done':   return `Approved — continuing scan`
    case 'report_start':    return `Generating pentest report...`
    case 'report_done':     return `Report ready (${d.length} chars)`
    case 'complete':        return `Scan complete — ${d.findings} findings, risk: ${(d.risk||'?').toUpperCase()}, ${(d.duration||0).toFixed(0)}s`
    case 'error':           return `Error: ${d.message||'Unknown'}`
    default:                return JSON.stringify(d).slice(0,120)
  }
}

export default function LiveTerminal({ events }: { events: ScanEvent[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [events.length])

  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]"
        style={{background:'rgba(0,255,170,0.03)'}}>
        <div className="flex items-center gap-2">
          <div className="live-dot"/>
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Live Terminal</span>
        </div>
        <span className="font-mono text-[9px] text-slate-600">{events.length} events</span>
      </div>
      <div className="font-mono text-[11px] p-4 overflow-y-auto space-y-px"
        style={{background:'#020608', maxHeight:'360px', minHeight:'120px'}}>
        {events.length === 0 ? (
          <span style={{color:'#334155'}}>Waiting for scan events...</span>
        ) : events.map((ev,i) => {
          const color = TYPE_COLOR[ev.type] ?? '#475569'
          const icon  = TYPE_ICON[ev.type]  ?? '·'
          const isOut = ev.type === 'task_output'
          return (
            <div key={i} className="leading-relaxed" style={{paddingLeft: isOut?'24px':0}}>
              {!isOut && <span style={{color, marginRight:'6px'}}>{icon}</span>}
              <span style={{color}}>{fmt(ev)}</span>
            </div>
          )
        })}
        <div ref={bottomRef}/>
      </div>
    </div>
  )
}
