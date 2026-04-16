'use client'

const STEPS = [
  { key:'planning',  label:'AI Planning',    icon:'🧠', desc:'LLM creates task DAG' },
  { key:'validating',label:'Validation',     icon:'✓',  desc:'DAG structure verified' },
  { key:'executing', label:'Tool Execution', icon:'🐳', desc:'Running in Docker' },
  { key:'analysis',  label:'AI Analysis',   icon:'📊', desc:'Validating findings' },
  { key:'proposals', label:'AI Proposals',  icon:'💡', desc:'Suggests next steps' },
  { key:'report',    label:'Report',        icon:'📄', desc:'Generating report' },
]

function getStep(scan: any, wsStep?: number): number {
  if (wsStep !== undefined) return wsStep
  const s = scan.status
  if (s === 'completed' || s === 'failed') return 6
  if (scan.report) return 5
  if (scan.awaiting_approval) return 4
  if ((scan.findings_count||0) > 0) return 3
  if ((scan.completed_tasks||0) > 0) return 2
  if (s === 'running') return 2
  if (s === 'validating') return 1
  return 0
}

export default function WorkflowTimeline({ scan, wsStep }: { scan: any; wsStep?: number }) {
  const cur = getStep(scan, wsStep)
  return (
    <div className="glass p-4">
      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Execution Workflow</div>
      <div className="space-y-1">
        {STEPS.map((step, i) => {
          const state = i < cur ? 'done' : i === cur ? 'active' : 'pending'
          return (
            <div key={step.key} className="flex items-start gap-3 py-1.5">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] border transition-all"
                  style={{
                    background: state==='done'?'rgba(0,255,170,0.1)':state==='active'?'rgba(0,170,255,0.1)':'rgba(255,255,255,0.03)',
                    borderColor: state==='done'?'rgba(0,255,170,0.3)':state==='active'?'rgba(0,170,255,0.3)':'rgba(255,255,255,0.08)',
                    color: state==='done'?'#00ffaa':state==='active'?'#00aaff':'#334155',
                    animation: state==='active'?'pulse-dot 2s ease-in-out infinite':undefined,
                  }}>
                  {state==='done'?'✓':step.icon}
                </div>
                {i < STEPS.length-1 && (
                  <div className="w-px mt-1" style={{height:'16px', background: state==='done'?'rgba(0,255,170,0.2)':'rgba(255,255,255,0.05)'}}/>
                )}
              </div>
              <div className="pt-0.5">
                <div className="text-[12px] font-semibold" style={{color: state==='active'?'#00aaff':state==='done'?'#cbd5e1':'#334155'}}>
                  {step.label}
                </div>
                <div className="font-mono text-[9px] text-slate-700">{step.desc}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
