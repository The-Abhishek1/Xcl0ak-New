'use client'
import { useEffect, useState, useCallback } from 'react'
import { getToken, getUser, isLoggedIn } from '@/lib/eso-auth'
import { useRouter } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Framework  { id: string; name: string; controls: number }
interface ControlResult {
  id: string; title: string; description: string; domain: string
  status: 'PASS' | 'FAIL' | 'NOT_ASSESSED'
  failing_count: number; evidence: string[]
}
interface DomainStat { passing: number; failing: number; not_assessed: number }
interface Assessment {
  framework_id: string; framework_name: string
  total_controls: number; passing: number; failing: number; not_assessed: number
  coverage_pct: number; pass_rate: number
  finding_count: number; cloud_finding_count: number
  domains: Record<string, DomainStat>
  controls: ControlResult[]
}

// ── Constants ─────────────────────────────────────────────────────────────────
const STATUS_COLOR = { PASS: '#00ffaa', FAIL: '#ff3a5c', NOT_ASSESSED: '#475569' }
const STATUS_BG    = { PASS: 'rgba(0,255,170,0.08)', FAIL: 'rgba(255,58,92,0.08)', NOT_ASSESSED: 'rgba(255,255,255,0.04)' }
const STATUS_ICON  = { PASS: '✓', FAIL: '✗', NOT_ASSESSED: '○' }

const FW_COLORS: Record<string, string> = {
  soc2:     '#6366f1', iso27001: '#0ea5e9', pcidss: '#f59e0b',
  nist:     '#10b981', hipaa:    '#ec4899',
}

// ── Helper components ─────────────────────────────────────────────────────────
function CircleScore({ pct, label, color }: { pct: number; label: string; color: string }) {
  const r = 36, circ = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          strokeLinecap="round" transform="rotate(-90 44 44)" />
        <text x="44" y="48" textAnchor="middle" fill={color}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: '16px', fontWeight: 700 }}>
          {pct}%
        </text>
      </svg>
      <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">{label}</span>
    </div>
  )
}

function MiniBar({ passing, failing, not_assessed }: DomainStat) {
  const total = passing + failing + not_assessed || 1
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden w-full gap-px">
      {passing      > 0 && <div style={{ width: `${passing / total * 100}%`,      background: '#00ffaa' }} />}
      {failing      > 0 && <div style={{ width: `${failing / total * 100}%`,      background: '#ff3a5c' }} />}
      {not_assessed > 0 && <div style={{ width: `${not_assessed / total * 100}%`, background: 'rgba(255,255,255,0.1)' }} />}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CompliancePage() {
  const router = useRouter()
  const user   = getUser()

  const [frameworks,   setFrameworks]   = useState<Framework[]>([])
  const [activefw,     setActiveFw]     = useState('soc2')
  const [assessment,   setAssessment]   = useState<Assessment | null>(null)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')
  const [filterStatus, setFilterStatus] = useState<'ALL'|'PASS'|'FAIL'|'NOT_ASSESSED'>('ALL')
  const [filterDomain, setFilterDomain] = useState('ALL')
  const [expanded,     setExpanded]     = useState<string | null>(null)
  const [downloading,  setDownloading]  = useState(false)
  const [dlFw,         setDlFw]         = useState('')

  // Auth guard
  useEffect(() => {
    if (!isLoggedIn()) router.replace('/login?from=compliance')
  }, [router])

  // Load frameworks list
  useEffect(() => {
    fetch('/api/v1/compliance?frameworks=1', {
      headers: { Authorization: `Bearer ${getToken() ?? ''}` },
    })
      .then(r => r.json())
      .then(d => setFrameworks(d.frameworks ?? []))
      .catch(() => setFrameworks([
        { id: 'soc2', name: 'SOC 2 Type II', controls: 32 },
        { id: 'iso27001', name: 'ISO 27001:2022', controls: 27 },
        { id: 'pcidss',  name: 'PCI-DSS v4.0',   controls: 17 },
        { id: 'nist',    name: 'NIST CSF v2.0',   controls: 21 },
        { id: 'hipaa',   name: 'HIPAA Security Rule', controls: 15 },
      ]))
  }, [])

  const runAssessment = useCallback(async (fw: string) => {
    setActiveFw(fw)
    setLoading(true)
    setError('')
    setAssessment(null)
    setFilterStatus('ALL')
    setFilterDomain('ALL')
    setExpanded(null)

    try {
      const res = await fetch(`/api/v1/compliance?framework=${fw}`, {
        headers: { Authorization: `Bearer ${getToken() ?? ''}` },
      })
      const d = await res.json()
      if (!res.ok) {
        // d.error may be a string, object, or undefined — normalise to string
        const rawErr = d.error ?? d.detail ?? d.message ?? 'Assessment failed'
        const msg = typeof rawErr === 'string' ? rawErr : JSON.stringify(rawErr)
        if (msg.includes('Route') && msg.includes('not found')) {
          throw new Error('ESO compliance route not registered yet — deploy the updated app.py and compliance.py to your ESO server')
        }
        if (msg.includes('404') || res.status === 404) {
          throw new Error('ESO compliance route not registered yet — deploy the updated app.py and compliance.py to your ESO server')
        }
        throw new Error(msg)
      }
      setAssessment(d)
    } catch (e: any) {
      setError(e.message ?? 'Unknown error')
    }
    setLoading(false)
  }, [])

  // Auto-run on first load
  useEffect(() => { runAssessment('soc2') }, [runAssessment])

  async function downloadPDF(fw: string) {
    setDownloading(true); setDlFw(fw); setError('')
    try {
      const res = await fetch(`/api/v1/compliance?report=${fw}`, {
        headers: { Authorization: `Bearer ${getToken() ?? ''}` },
      })
      if (!res.ok) {
        let errMsg = 'PDF generation failed'
        try {
          const e = await res.json()
          errMsg = typeof e.error === 'string' ? e.error : JSON.stringify(e.error)
        } catch {}
        throw new Error(errMsg)
      }
      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href = url
      a.download = `xcloak-${fw}-compliance.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (e: any) {
      setError(typeof e.message === 'string' ? e.message : 'PDF generation failed')
    }
    setDownloading(false); setDlFw('')
  }

  // ── Derived state ────────────────────────────────────────────────────────
  const a = assessment
  const fwColor = FW_COLORS[activefw] ?? '#00ffaa'

  const domains = a ? Object.keys(a.domains) : []
  const filtered = (a?.controls ?? []).filter(c =>
    (filterStatus === 'ALL' || c.status === filterStatus) &&
    (filterDomain === 'ALL' || c.domain === filterDomain)
  )

  const passColor  = (a?.pass_rate ?? 0) >= 80 ? '#00ffaa' : (a?.pass_rate ?? 0) >= 60 ? '#facc15' : '#ff3a5c'
  const covColor   = (a?.coverage_pct ?? 0) >= 80 ? '#00ffaa' : (a?.coverage_pct ?? 0) >= 60 ? '#facc15' : '#ff3a5c'

  if (!user) return null

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black">Compliance <span style={{ color: fwColor }}>Automation</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Map your scan findings and cloud posture to regulatory frameworks · Generate evidence packages
        </p>
      </div>

      {/* Framework selector */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(frameworks.length > 0 ? frameworks : [
          { id: 'soc2', name: 'SOC 2', controls: 32 },
          { id: 'iso27001', name: 'ISO 27001', controls: 27 },
          { id: 'pcidss',  name: 'PCI-DSS',   controls: 17 },
          { id: 'nist',    name: 'NIST CSF',   controls: 21 },
          { id: 'hipaa',   name: 'HIPAA',      controls: 15 },
        ]).map(fw => (
          <button key={fw.id}
            onClick={() => runAssessment(fw.id)}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold cursor-pointer border transition-all disabled:opacity-50"
            style={activefw === fw.id
              ? { background: `${FW_COLORS[fw.id]}18`, borderColor: `${FW_COLORS[fw.id]}50`, color: FW_COLORS[fw.id] }
              : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#475569' }}>
            <div>{fw.name}</div>
            <div className="font-mono text-[8px] opacity-60 font-normal mt-0.5">{fw.controls} controls</div>
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px] flex items-start gap-2"
          style={{ background: 'rgba(255,58,92,0.08)', border: '1px solid rgba(255,58,92,0.2)', color: '#ff3a5c' }}>
          <span className="shrink-0">✗</span>
          <span className="flex-1 break-words">{error}</span>
          <button onClick={() => setError('')} className="shrink-0 opacity-60 hover:opacity-100 cursor-pointer ml-2">✕</button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="glass rounded-xl p-12 text-center">
          <div className="font-mono text-[11px] text-slate-400 animate-pulse">
            ⟳ Running gap analysis — mapping findings to {frameworks.find(f => f.id === activefw)?.name ?? activefw} controls...
          </div>
        </div>
      )}

      {/* Results */}
      {a && !loading && (
        <>
          {/* Score bar */}
          <div className="glass rounded-xl p-5 mb-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6">
                <CircleScore pct={a.pass_rate}    label="Pass Rate"   color={passColor} />
                <CircleScore pct={a.coverage_pct} label="Coverage"    color={covColor}  />
                <div className="space-y-1">
                  <div className="font-mono text-[13px] font-black" style={{ color: fwColor }}>{a.framework_name}</div>
                  <div className="font-mono text-[10px] text-slate-500">{a.total_controls} controls assessed</div>
                  <div className="flex gap-3 mt-2">
                    <span className="font-mono text-[10px]" style={{ color: '#00ffaa' }}>✓ {a.passing} passing</span>
                    <span className="font-mono text-[10px]" style={{ color: '#ff3a5c' }}>✗ {a.failing} failing</span>
                    <span className="font-mono text-[10px]" style={{ color: '#475569' }}>○ {a.not_assessed} n/a</span>
                  </div>
                  <div className="font-mono text-[9px] text-slate-700 mt-1">
                    {a.finding_count} scan findings · {a.cloud_finding_count ?? 0} cloud findings analysed
                  </div>
                </div>
              </div>

              {/* Download PDF */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => downloadPDF(activefw)}
                  disabled={downloading}
                  className="px-4 py-2 rounded-xl font-mono text-[11px] font-bold cursor-pointer border transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ background: `${fwColor}10`, borderColor: `${fwColor}40`, color: fwColor }}>
                  {downloading && dlFw === activefw ? '⟳ Generating...' : '↓ Download PDF Report'}
                </button>
                <div className="font-mono text-[9px] text-slate-700 text-center">Requires a completed scan</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex gap-px h-2 rounded-full overflow-hidden">
                <div className="transition-all duration-700 rounded-l-full"
                  style={{ width: `${a.passing / a.total_controls * 100}%`, background: '#00ffaa' }} />
                <div className="transition-all duration-700"
                  style={{ width: `${a.failing / a.total_controls * 100}%`, background: '#ff3a5c' }} />
                <div className="transition-all duration-700 rounded-r-full"
                  style={{ width: `${a.not_assessed / a.total_controls * 100}%`, background: 'rgba(255,255,255,0.08)' }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[8px]" style={{ color: '#00ffaa' }}>Passing</span>
                <span className="font-mono text-[8px]" style={{ color: '#ff3a5c' }}>Failing</span>
                <span className="font-mono text-[8px] text-slate-700">Not Assessed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
            {/* ── Left: Domain breakdown ─────────────────────────────── */}
            <div className="space-y-3">
              <div className="glass rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">By Domain</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  <button
                    onClick={() => setFilterDomain('ALL')}
                    className="w-full px-4 py-2.5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
                    style={filterDomain === 'ALL' ? { background: `${fwColor}08` } : {}}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[10px] text-slate-300 font-bold">All Domains</span>
                      <span className="font-mono text-[9px] text-slate-600">{a.total_controls}</span>
                    </div>
                    <MiniBar
                      passing={a.passing}
                      failing={a.failing}
                      not_assessed={a.not_assessed}
                    />
                  </button>
                  {domains.map(domain => {
                    const stat = a.domains[domain]
                    const total = stat.passing + stat.failing + stat.not_assessed
                    return (
                      <button key={domain}
                        onClick={() => setFilterDomain(d => d === domain ? 'ALL' : domain)}
                        className="w-full px-4 py-2.5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
                        style={filterDomain === domain ? { background: `${fwColor}08` } : {}}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] text-slate-400 truncate max-w-[160px]">{domain}</span>
                          <div className="flex gap-1.5 shrink-0">
                            {stat.failing > 0 && (
                              <span className="font-mono text-[9px]" style={{ color: '#ff3a5c' }}>{stat.failing}✗</span>
                            )}
                            {stat.passing > 0 && (
                              <span className="font-mono text-[9px]" style={{ color: '#00ffaa' }}>{stat.passing}✓</span>
                            )}
                          </div>
                        </div>
                        <MiniBar {...stat} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Legend */}
              <div className="glass rounded-xl p-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Legend</div>
                {([['PASS', 'No findings mapped to this control'], ['FAIL', 'One or more findings violate this control'], ['NOT_ASSESSED', 'No evidence to assess this control']] as const).map(([s, desc]) => (
                  <div key={s} className="flex items-start gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold shrink-0 mt-0.5" style={{ color: STATUS_COLOR[s] }}>{STATUS_ICON[s]}</span>
                    <div>
                      <div className="font-mono text-[9px] font-bold" style={{ color: STATUS_COLOR[s] }}>{s}</div>
                      <div className="font-mono text-[9px] text-slate-700">{desc}</div>
                    </div>
                  </div>
                ))}
                <div className="font-mono text-[9px] text-slate-700 mt-3 pt-3 border-t border-white/[0.05]">
                  Coverage increases as you run more scans and connect cloud accounts.
                </div>
              </div>
            </div>

            {/* ── Right: Control list ─────────────────────────────────── */}
            <div>
              {/* Filters */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {(['ALL', 'FAIL', 'PASS', 'NOT_ASSESSED'] as const).map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className="px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all"
                    style={filterStatus === s
                      ? { background: `${STATUS_COLOR[s] ?? '#475569'}18`, borderColor: `${STATUS_COLOR[s] ?? '#475569'}50`, color: STATUS_COLOR[s] ?? '#e2e8f0' }
                      : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
                    {s === 'ALL'
                      ? `All (${a.total_controls})`
                      : `${STATUS_ICON[s]} ${s} (${s === 'PASS' ? a.passing : s === 'FAIL' ? a.failing : a.not_assessed})`}
                  </button>
                ))}
              </div>

              {/* Control cards */}
              <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1">
                {filtered.length === 0 && (
                  <div className="glass rounded-xl p-8 text-center">
                    <div className="font-mono text-[11px] text-slate-600">No controls match the current filter</div>
                  </div>
                )}
                {filtered.map(ctrl => {
                  const isOpen  = expanded === ctrl.id
                  const color   = STATUS_COLOR[ctrl.status]
                  const bgColor = STATUS_BG[ctrl.status]

                  return (
                    <div key={ctrl.id}
                      className="rounded-xl border overflow-hidden transition-all cursor-pointer"
                      style={{
                        borderColor: isOpen ? `${color}40` : 'rgba(255,255,255,0.06)',
                        background: isOpen ? bgColor : 'rgba(255,255,255,0.02)',
                      }}
                      onClick={() => setExpanded(e => e === ctrl.id ? null : ctrl.id)}>

                      {/* Header row */}
                      <div className="flex items-center gap-3 px-4 py-3">
                        <span className="font-mono text-[13px] font-black shrink-0" style={{ color }}>
                          {STATUS_ICON[ctrl.status]}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[9px] px-1.5 py-[1px] rounded border"
                              style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
                              {ctrl.id}
                            </span>
                            <span className="font-mono text-[9px] text-slate-600">{ctrl.domain}</span>
                          </div>
                          <div className="font-mono text-[11px] text-slate-200 mt-0.5 truncate">{ctrl.title}</div>
                        </div>
                        {ctrl.failing_count > 0 && (
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full shrink-0"
                            style={{ background: 'rgba(255,58,92,0.1)', color: '#ff3a5c' }}>
                            {ctrl.failing_count} finding{ctrl.failing_count !== 1 ? 's' : ''}
                          </span>
                        )}
                        <span className="font-mono text-[10px] text-slate-600 shrink-0">{isOpen ? '▲' : '▼'}</span>
                      </div>

                      {/* Expanded detail */}
                      {isOpen && (
                        <div className="px-4 pb-4 pt-0 border-t border-white/[0.05]">
                          <p className="font-mono text-[10px] text-slate-500 mt-3 mb-3 leading-relaxed">
                            {ctrl.description}
                          </p>

                          {ctrl.evidence.length > 0 ? (
                            <div>
                              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-700 mb-2">
                                {ctrl.status === 'FAIL' ? 'Failing Evidence' : 'Evidence'}
                              </div>
                              <div className="space-y-1">
                                {ctrl.evidence.map((ev, i) => (
                                  <div key={i} className="font-mono text-[10px] px-3 py-2 rounded-lg"
                                    style={{
                                      background: ctrl.status === 'FAIL' ? 'rgba(255,58,92,0.06)' : 'rgba(0,255,170,0.06)',
                                      borderLeft: `2px solid ${color}40`,
                                      color: '#94a3b8',
                                    }}>
                                    {ev}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : ctrl.status === 'NOT_ASSESSED' ? (
                            <div className="font-mono text-[10px] text-slate-700 italic">
                              Run a scan or connect a cloud account to assess this control.
                            </div>
                          ) : (
                            <div className="font-mono text-[10px] text-slate-700 italic">
                              No failing findings — control passes based on available evidence.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Empty state (not loading, no assessment yet) */}
      {!a && !loading && !error && (
        <div className="glass rounded-xl p-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <div className="font-mono text-[12px] text-slate-400">Select a framework above to run a gap analysis</div>
          <div className="font-mono text-[10px] text-slate-600 mt-1">Needs at least one completed scan or connected cloud account</div>
        </div>
      )}
    </div>
  )
}
