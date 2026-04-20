'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { esoScans, esoApi } from '@/lib/eso/api'
import { useScanWS } from '@/hooks/use-scan-ws'
import { usePoll } from '@/hooks/use-poll'
import WorkflowTimeline from '@/components/scan/WorkflowTimeline'
import ProposalPanel    from '@/components/scan/ProposalPanel'
import ReportViewer     from '@/components/scan/ReportViewer'
import LiveTerminal     from '@/components/scan/LiveTerminal'

const RISK_COLOR: Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff' }

export default function ScanDetailPage() {
  const { id } = useParams() as { id: string }
  const [scan,    setScan]    = useState<any>(null)
  const [fromDb,  setFromDb]  = useState(false)

  const fetchScan = useCallback(async () => {
    try { const s = await esoScans.status(id); if (s?.status) return s } catch {}
    try { const s = await esoApi.get(`/auth/scans/${id}`); if (s) { setFromDb(true); return s } } catch {}
    return null
  }, [id])

  const { events, latest, state: wsState } = useScanWS(id)
  const isActive  = !scan || !['completed','failed','timeout'].includes(scan?.status)
  const { data: pollData } = usePoll(fetchScan, isActive ? 2000 : 0, isActive)

  useEffect(() => { if (pollData) setScan(pollData) }, [pollData])
  useEffect(() => { fetchScan().then(s=>{ if(s) setScan(s) }) }, [fetchScan])
  useEffect(() => {
    if (['level_complete','analysis_done','report_done','complete'].includes(latest?.type??''))
      fetchScan().then(s=>{ if(s) setScan(s) })
  }, [latest, fetchScan])

  if (!scan) return (
    <div className="flex items-center justify-center h-64 flex-col gap-3">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"/>
      <div className="font-mono text-[11px] text-slate-600">Loading scan...</div>
    </div>
  )

  const risk     = scan.risk_summary || {}
  const riskLevel = risk.overall_risk || scan.risk_level || '—'
  const riskScore = risk.overall_score || scan.risk_score || 0
  const findings  = scan.findings_count || 0
  const done      = scan.completed_tasks || 0
  const total     = scan.total_tasks || 0
  const progress  = scan.progress || (total>0?(done/total*100):0)
  const dur       = scan.duration ? `${(scan.duration/60).toFixed(1)}m`
                  : scan.duration_seconds ? `${(scan.duration_seconds/60).toFixed(1)}m` : '—'

  async function downloadReport(type: 'pdf' | 'compliance', framework?: string) {
    const tokenMatch = document.cookie.match(/(?:^|; )eso_token=([^;]*)/)
    const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : ''
    const url = type === 'pdf'
      ? `/api/eso/reports/pdf/${id}`
      : `/api/eso/reports/compliance/${id}?framework=${framework}`
    try {
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      if (!res.ok) { alert('Report not ready or auth failed'); return }
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `xcloak-${type}-${id.slice(0,8)}.${type === 'pdf' ? 'pdf' : 'pdf'}`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch (e) { alert('Download failed') }
  }

  function wsStep(): number {
    for (let i=events.length-1;i>=0;i--) {
      const t=events[i].type
      if(t==='complete')return 6
      if(t==='report_done'||t==='report_start')return 5
      if(t==='proposal'||t==='approval_needed')return 4
      if(t==='analysis_done'||t==='risk_update')return 3
      if(t==='task_complete'||t==='task_output'||t==='task_start'||t==='execution_start')return 2
      if(t==='level_start')return 2
    }
    return 0
  }

  const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', running:'#00aaff', planning:'#ffd700', queued:'#ffd700', validating:'#a78bfa', timeout:'#ff3a5c' }

  return (
    <div className="p-3 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/scan" className="font-mono text-[11px] text-slate-500 hover:text-slate-300 transition-colors">← Scans</Link>
          <div>
            <h1 className="text-xl font-black text-slate-100">{scan.target||'Scan'}</h1>
            <div className="font-mono text-[10px] text-slate-600 mt-0.5">{id}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {!fromDb&&(
            <div className="w-2 h-2 rounded-full" title={`WebSocket: ${wsState}`}
              style={{background:wsState==='connected'?'#00ffaa':wsState==='connecting'?'#ffd700':'#334155'}}/>
          )}
          <span className="font-mono text-[10px] font-bold px-2 py-1 rounded"
            style={{color:STATUS_COLOR[scan.status]??'#64748b',background:'rgba(255,255,255,0.06)'}}>
            {scan.status?.toUpperCase()}
          </span>
          {scan.status==='completed'&&(
            <>
              <button onClick={() => downloadReport('pdf')} className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer" style={{background:'rgba(0,170,255,0.1)',border:'1px solid rgba(0,170,255,0.3)',color:'#00aaff'}}>
                PDF ↓
              </button>
              <button onClick={() => downloadReport('compliance', 'iso27001')} className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer" style={{background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.3)',color:'#a78bfa'}}>
                ISO27001 ↓
              </button>
              <button onClick={() => downloadReport('compliance', 'soc2')} className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80 cursor-pointer" style={{background:'rgba(167,139,250,0.1)',border:'1px solid rgba(167,139,250,0.3)',color:'#a78bfa'}}>
                SOC2 ↓
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        {[
          {label:'Progress',  val:`${progress.toFixed(0)}%`, color:'#00aaff'},
          {label:'Tasks',     val:`${done}/${total}`,        color:'#e2e8f0'},
          {label:'Findings',  val:findings,                  color:'#00ffaa'},
          {label:'Risk',      val:String(riskLevel).toUpperCase(), color:RISK_COLOR[riskLevel]??'#64748b'},
          {label:'Duration',  val:dur,                       color:'#94a3b8'},
        ].map((s,i)=>(
          <div key={i} className="glass p-3 text-center">
            <div className="font-mono text-lg font-bold" style={{color:s.color}}>{s.val}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden mb-5" style={{background:'rgba(255,255,255,0.05)'}}>
        <div className="h-full rounded-full transition-all duration-700"
          style={{width:`${progress}%`,background:'linear-gradient(90deg,#00ffaa,#00aaff)'}}/>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="space-y-4">
          <WorkflowTimeline scan={scan} wsStep={wsStep()>0?wsStep():undefined}/>
          {scan.awaiting_approval&&<ProposalPanel processId={id} onApproved={()=>fetchScan().then(s=>{if(s)setScan(s)})}/>}
        </div>
        <div className="space-y-4">
          {events.length>0 ? (
            <LiveTerminal events={events}/>
          ) : (
            <div className="glass p-4 font-mono text-[11px]" style={{background:'#020608'}}>
              <div style={{color:'#00ffaa'}}>[{scan.status}] {scan.target} — {done}/{total} tasks</div>
              {scan.goal&&<div style={{color:'#475569'}}>Goal: {scan.goal}</div>}
              <div style={{color:'#00aaff'}}>Risk: {String(riskLevel).toUpperCase()} ({Number(riskScore).toFixed(1)})</div>
              {findings>0&&<div style={{color:'#00ffaa'}}>Findings: {findings}</div>}
              {fromDb&&<div style={{color:'#334155'}}>Loaded from scan history</div>}
            </div>
          )}
          {scan.report&&<ReportViewer report={scan.report} processId={id}/>}
        </div>
      </div>
    </div>
  )
}
