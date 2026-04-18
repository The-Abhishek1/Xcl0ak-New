'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { esoHistory } from '@/lib/eso/api'
import { timeAgo } from '@/lib/utils'

const RISK_COLOR:   Record<string,string> = { critical:'#ff3a5c', high:'#ff8c42', medium:'#ffd700', low:'#00aaff', none:'#64748b' }
const STATUS_COLOR: Record<string,string> = { completed:'#00ffaa', failed:'#ff3a5c', running:'#00aaff', planning:'#ffd700', queued:'#ffd700', timeout:'#ff3a5c', pending:'#475569' }

const PAGE_SIZE = 20

export default function ScanHistoryPage() {
  const [scans,   setScans]   = useState<any[]>([])
  const [total,   setTotal]   = useState(0)
  const [offset,  setOffset]  = useState(0)
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState<'all'|'completed'|'failed'>('all')
  const [search,  setSearch]  = useState('')

  async function load(off = 0) {
    setLoading(true)
    try {
      const r = await esoHistory.list(PAGE_SIZE, off)
      setScans(r.scans ?? [])
      setTotal(r.total ?? 0)
      setOffset(off)
    } catch { setScans([]) }
    setLoading(false)
  }

  useEffect(() => { load(0) }, [])

  const filtered = scans.filter(s => {
    if (filter === 'completed' && s.status !== 'completed') return false
    if (filter === 'failed' && !['failed','timeout'].includes(s.status)) return false
    if (search) {
      const q = search.toLowerCase()
      return (s.target??'').toLowerCase().includes(q) || (s.goal??'').toLowerCase().includes(q)
    }
    return true
  })

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1

  return (
    <div className="p-3 sm:p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Scan <span className="text-accent">History</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            {total} total scans · completed penetration tests
          </p>
        </div>
        <Link href="/scan/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all hover:opacity-80"
          style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
          ⚡ New Scan
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-1 p-1 rounded-xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
          {(['all','completed','failed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold capitalize cursor-pointer transition-all"
              style={filter===f
                ?{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.25)',color:'#00ffaa'}
                :{color:'#475569',border:'1px solid transparent'}}>
              {f}
            </button>
          ))}
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search target or goal..."
          className="flex-1 min-w-[200px] bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"
        />
        <button onClick={() => load(0)} className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors cursor-pointer px-2">
          ↺ Refresh
        </button>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        {/* Header row */}
        <div className="grid font-mono text-[9px] text-slate-600 uppercase tracking-widest px-4 py-2.5 border-b border-white/[0.06]"
          style={{gridTemplateColumns:'1fr 140px 90px 70px 70px 80px 40px', background:'rgba(255,255,255,0.02)'}}>
          <span>Target / Goal</span>
          <span>Date</span>
          <span>Status</span>
          <span>Risk</span>
          <span>Findings</span>
          <span>Duration</span>
          <span></span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading scan history...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3">
            <div className="font-mono text-[12px] text-slate-600">
              {total === 0 ? 'No scans yet' : 'No scans match your filter'}
            </div>
            {total === 0 && (
              <Link href="/scan/new"
                className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                Run your first scan →
              </Link>
            )}
          </div>
        ) : (
          filtered.map((s, i) => (
            <div key={s.process_id}
              className="grid items-center px-4 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
              style={{gridTemplateColumns:'1fr 140px 90px 70px 70px 80px 40px'}}>

              {/* Target + goal */}
              <div className="min-w-0 pr-4">
                <div className="font-mono text-[12px] text-slate-200 font-semibold truncate">
                  {s.target || '—'}
                </div>
                <div className="font-mono text-[9px] text-slate-600 truncate mt-0.5">
                  {s.goal || s.process_id}
                </div>
              </div>

              {/* Date */}
              <div className="font-mono text-[10px] text-slate-500">
                <div>{s.created_at ? new Date(s.created_at).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) : '—'}</div>
                <div className="text-slate-700 text-[9px]">{s.created_at ? timeAgo(s.created_at) : ''}</div>
              </div>

              {/* Status */}
              <div>
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded"
                  style={{color: STATUS_COLOR[s.status] ?? '#64748b', background: `${STATUS_COLOR[s.status] ?? '#64748b'}15`}}>
                  {s.status}
                </span>
              </div>

              {/* Risk */}
              <div>
                {s.risk_level && s.risk_level !== 'none' ? (
                  <span className="font-mono text-[10px] font-bold uppercase"
                    style={{color: RISK_COLOR[s.risk_level] ?? '#64748b'}}>
                    {s.risk_level}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-slate-700">—</span>
                )}
              </div>

              {/* Findings count */}
              <div className="font-mono text-[11px]"
                style={{color: (s.findings_count ?? 0) > 0 ? '#00ffaa' : '#475569'}}>
                {s.findings_count ?? 0}
              </div>

              {/* Duration */}
              <div className="font-mono text-[10px] text-slate-600">
                {s.duration_seconds
                  ? s.duration_seconds >= 60
                    ? `${(s.duration_seconds/60).toFixed(1)}m`
                    : `${Math.round(s.duration_seconds)}s`
                  : '—'}
              </div>

              {/* View link */}
              <div className="text-right">
                {s.status === 'completed' ? (
                  <Link href={`/scan/${s.process_id}`}
                    className="font-mono text-[9px] text-accent hover:underline">
                    View →
                  </Link>
                ) : (
                  <Link href={`/scan/${s.process_id}`}
                    className="font-mono text-[9px] text-slate-600 hover:text-slate-400 transition-colors">
                    Open
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="font-mono text-[10px] text-slate-600">
            Page {currentPage} of {totalPages} · {total} scans total
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => load(offset - PAGE_SIZE)}
              disabled={offset === 0}
              className="font-mono text-[10px] px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-30 transition-all"
              style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8'}}>
              ← Prev
            </button>
            <button
              onClick={() => load(offset + PAGE_SIZE)}
              disabled={offset + PAGE_SIZE >= total}
              className="font-mono text-[10px] px-3 py-1.5 rounded-lg cursor-pointer disabled:opacity-30 transition-all"
              style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8'}}>
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
