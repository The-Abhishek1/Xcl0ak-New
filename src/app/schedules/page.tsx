'use client'
import { useEffect, useState } from 'react'
import { esoApi } from '@/lib/eso/api'

const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

export default function SchedulesPage() {
  const [templates,     setTemplates]     = useState<any[]>([])
  const [schedules,     setSchedules]     = useState<any[]>([])
  const [showForm,      setShowForm]      = useState(false)
  const [showSchedFor,  setShowSchedFor]  = useState<string|null>(null)
  const [form,          setForm]          = useState({name:'',target:'',goal:'Scan for open ports and vulnerabilities',description:''})
  const [cronExpr,      setCronExpr]      = useState('daily')
  const [maxRuns,       setMaxRuns]       = useState('')

  const load = () => {
    esoApi.get('/schedules/templates').then(r=>setTemplates(r.templates??[])).catch(()=>{})
    esoApi.get('/schedules/').then(r=>setSchedules(r.schedules??[])).catch(()=>{})
  }
  useEffect(()=>{ load() },[])

  const createTemplate = async () => {
    if (!form.name||!form.target) return
    await esoApi.post('/schedules/templates',form).catch(()=>{})
    setForm({name:'',target:'',goal:'Scan for open ports and vulnerabilities',description:''}); setShowForm(false); load()
  }

  const createSchedule = async (tid: string) => {
    await esoApi.post('/schedules/',{template_id:tid,cron_expression:cronExpr,max_runs:maxRuns?parseInt(maxRuns):null}).catch(()=>{})
    setShowSchedFor(null); setCronExpr('daily'); setMaxRuns(''); load()
  }

  const toggleSchedule = (id: string, active: boolean) => { esoApi.put(`/schedules/${id}/toggle?active=${active}`,{}).catch(()=>{}); setTimeout(load,300) }
  const deleteSchedule = (id: string) => { if(!confirm('Delete?')) return; esoApi.del(`/schedules/${id}`).catch(()=>{}); setTimeout(load,300) }
  const deleteTemplate = (id: string) => { if(!confirm('Delete?')) return; esoApi.del(`/schedules/templates/${id}`).catch(()=>{}); setTimeout(load,300) }

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Scheduled <span className="text-accent">Scans</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">Automate recurring security assessments</p>
        </div>
        <button onClick={()=>setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl border font-mono text-[12px] font-bold cursor-pointer transition-all"
          style={{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.25)',color:'#00ffaa'}}>
          + New Template
        </button>
      </div>

      {showForm&&(
        <div className="glass p-5 mb-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">New Scan Template</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input className={inp} placeholder="Template name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            <input className={inp} placeholder="Target (scanme.nmap.org)" value={form.target} onChange={e=>setForm(f=>({...f,target:e.target.value}))}/>
            <input className={`${inp} sm:col-span-2`} placeholder="Scan goal" value={form.goal} onChange={e=>setForm(f=>({...f,goal:e.target.value}))}/>
            <input className={`${inp} sm:col-span-2`} placeholder="Description (optional)" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
          </div>
          <div className="flex gap-2">
            <button onClick={createTemplate} className="px-4 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer" style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>Create Template</button>
            <button onClick={()=>setShowForm(false)} className="px-4 py-2 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-500 cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Templates ({templates.length})</div>
          {templates.length===0 ? (
            <div className="text-center py-8 font-mono text-[11px] text-slate-600">No templates — create one above</div>
          ) : templates.map(t=>(
            <div key={t.template_id} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] mb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-slate-200 truncate">{t.name}</div>
                  <div className="font-mono text-[10px] text-slate-600 mt-0.5 truncate">{t.target}</div>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={()=>setShowSchedFor(showSchedFor===t.template_id?null:t.template_id)}
                    className="font-mono text-[10px] text-accent2 hover:underline cursor-pointer">⏰ Schedule</button>
                  <button onClick={()=>deleteTemplate(t.template_id)} className="font-mono text-[10px] text-red-400 cursor-pointer">Delete</button>
                </div>
              </div>
              {showSchedFor===t.template_id&&(
                <div className="mt-3 p-3 rounded-lg border border-accent2/20 bg-accent2/[0.04] space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <select className={inp} value={cronExpr} onChange={e=>setCronExpr(e.target.value)}>
                      {['30m','hourly','4h','12h','daily','weekly','monthly'].map(v=><option key={v} value={v}>{v}</option>)}
                    </select>
                    <input className={inp} type="number" placeholder="Max runs (∞)" value={maxRuns} onChange={e=>setMaxRuns(e.target.value)}/>
                  </div>
                  <button onClick={()=>createSchedule(t.template_id)}
                    className="w-full py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer"
                    style={{background:'rgba(0,170,255,0.1)',borderColor:'rgba(0,170,255,0.3)',color:'#00aaff'}}>
                    Create Schedule
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="glass p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Active Schedules ({schedules.length})</div>
          {schedules.length===0 ? (
            <div className="text-center py-8 font-mono text-[11px] text-slate-600">No schedules — pick a template and schedule it</div>
          ) : schedules.map(s=>(
            <div key={s.schedule_id} className="p-3 rounded-lg border mb-2 transition-all"
              style={{background:s.is_active?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.01)',borderColor:s.is_active?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.03)',opacity:s.is_active?1:0.5}}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-slate-200 truncate">{s.template_name||s.template_id}</div>
                  <div className="font-mono text-[10px] text-slate-600">{s.target} · <span className="text-accent2">{s.cron_expression}</span></div>
                  <div className="font-mono text-[9px] text-slate-700 mt-1">
                    Runs: {s.run_count}{s.max_runs?`/${s.max_runs}`:''}
                    {s.next_run_at&&` · Next: ${new Date(s.next_run_at).toLocaleString()}`}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={()=>toggleSchedule(s.schedule_id,!s.is_active)}
                    className="font-mono text-[10px] cursor-pointer" style={{color:s.is_active?'#ffd700':'#00ffaa'}}>
                    {s.is_active?'⏸ Pause':'▶ Resume'}
                  </button>
                  <button onClick={()=>deleteSchedule(s.schedule_id)} className="font-mono text-[10px] text-red-400 cursor-pointer">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
