'use client'
import { useEffect, useState, useCallback } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

// ── Types ──────────────────────────────────────────────────────────────────
interface Exposure {
  id: string; source: string; identifier: string; type: string
  severity: 'critical'|'high'|'medium'|'low'; title: string
  description: string; dataTypes: string[]; url: string
  breachDate?: string; pwnCount?: number; acknowledged: boolean; foundAt: string
}
interface Monitor {
  id: string; identifier: string; type: string; status: string
  lastCheckedAt?: string; createdAt: string
  exposures: Exposure[]
}

// ── Constants ─────────────────────────────────────────────────────────────
const SEV: Record<string,string> = {
  critical:'#ff3a5c', high:'#fb923c', medium:'#facc15', low:'#00aaff'
}
const SEV_BG: Record<string,string> = {
  critical:'rgba(255,58,92,0.08)', high:'rgba(251,146,60,0.08)',
  medium:'rgba(250,204,21,0.08)',  low:'rgba(0,170,255,0.08)'
}
const SOURCE_ICON: Record<string,string> = {
  'HaveIBeenPwned': '💀', 'Intelligence X': '🕵', 'pastebin.com': '📋',
  'gist.github.com': '🐙', 'crt.sh': '🔏', 'Dehashed': '🔑',
}

function authFetch(path: string, opts?: RequestInit) {
  const token = getToken(); const user = getUser()
  return fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(user?.username ? { 'x-user-alias': user.username } : {}),
      ...opts?.headers,
    },
  })
}

// ── Severity badge ────────────────────────────────────────────────────────
function SevBadge({ sev }: { sev: string }) {
  const c = SEV[sev] ?? '#64748b'
  return (
    <span className="font-mono text-[9px] font-black px-1.5 py-[2px] rounded"
      style={{ background:`${c}18`, color:c, border:`1px solid ${c}30` }}>
      {sev.toUpperCase()}
    </span>
  )
}

// ── Risk score ring ───────────────────────────────────────────────────────
function RiskRing({ exposures }: { exposures: Exposure[] }) {
  const crit = exposures.filter(e => e.severity==='critical').length
  const high = exposures.filter(e => e.severity==='high').length
  const score = Math.max(0, 100 - crit*25 - high*10 - (exposures.length - crit - high)*3)
  const color = score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c'
  const r = 28, circ = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center">
      <svg width="68" height="68" viewBox="0 0 68 68">
        <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
        <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)}
          strokeLinecap="round" transform="rotate(-90 34 34)"/>
        <text x="34" y="38" textAnchor="middle" fill={color}
          style={{fontFamily:"'Space Mono',monospace",fontSize:'13px',fontWeight:700}}>
          {score}
        </text>
      </svg>
      <span className="font-mono text-[8px] text-slate-600 uppercase tracking-widest -mt-1">Risk</span>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function DarkWebPage() {
  const user = getUser()

  const [monitors,    setMonitors]    = useState<Monitor[]>([])
  const [selected,    setSelected]    = useState<Monitor|null>(null)
  const [detail,      setDetail]      = useState<Monitor|null>(null)
  const [loading,     setLoading]     = useState(true)
  const [adding,      setAdding]      = useState(false)
  const [msg,         setMsg]         = useState('')
  const [showForm,    setShowForm]    = useState(false)
  const [filterSev,   setFilterSev]   = useState('all')
  const [filterAck,   setFilterAck]   = useState(false)
  const [expanded,    setExpanded]    = useState<string|null>(null)
  const [form,        setForm]        = useState({
    identifier: '', type: 'email', hibpKey: '', intelxKey: '', showKeys: false
  })

  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#e2e8f0' }

  const load = useCallback(async () => {
    setLoading(true)
    const res = await authFetch('/api/v1/darkweb')
    if (res.ok) { const d = await res.json(); setMonitors(d.monitors ?? []) }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(''), 5000); return () => clearTimeout(t) }, [msg])

  const loadDetail = useCallback(async (m: Monitor) => {
    setSelected(m); setDetail(null); setFilterSev('all'); setFilterAck(false); setExpanded(null)
    const res = await authFetch(`/api/v1/darkweb?id=${m.id}`)
    if (res.ok) { const d = await res.json(); setDetail(d.monitor ?? null) }
  }, [])

  async function addMonitor() {
    if (!form.identifier.trim()) { setMsg('✗ Enter an email or domain'); return }
    setAdding(true)
    const res = await authFetch('/api/v1/darkweb', {
      method: 'POST',
      body: JSON.stringify({
        identifier: form.identifier.trim(),
        type:       form.type,
        hibpKey:    form.hibpKey  || undefined,
        intelxKey:  form.intelxKey || undefined,
      }),
    })
    const d = await res.json().catch(() => ({}))
    if (res.ok) {
      setMsg('✓ Monitor added — scanning now...')
      setShowForm(false)
      setForm({ identifier:'', type:'email', hibpKey:'', intelxKey:'', showKeys:false })
      await load()
      // Poll for results
      setTimeout(load, 12000)
      setTimeout(load, 30000)
    } else {
      setMsg(`✗ ${d.error ?? 'Failed'}`)
    }
    setAdding(false)
  }

  async function removeMonitor(id: string) {
    if (!confirm('Remove this monitor? All exposure data will be deleted.')) return
    const res = await authFetch('/api/v1/darkweb', { method:'DELETE', body: JSON.stringify({ id }) })
    if (res.ok) {
      setMsg('✓ Monitor removed')
      if (selected?.id === id) { setSelected(null); setDetail(null) }
      await load()
    }
  }

  async function ackExposure(exposureId: string) {
    await authFetch('/api/v1/darkweb', { method:'PUT', body: JSON.stringify({ exposureId }) })
    if (selected) await loadDetail(selected)
    await load()
  }

  // ── Stats ──────────────────────────────────────────────────────────────
  const allExposures  = monitors.flatMap(m => m.exposures)
  const totalCrit     = allExposures.filter(e => e.severity==='critical' && !e.acknowledged).length
  const totalHigh     = allExposures.filter(e => e.severity==='high'     && !e.acknowledged).length
  const totalUnacked  = allExposures.filter(e => !e.acknowledged).length

  const exposures     = detail?.exposures ?? []
  const filtered      = exposures.filter(e =>
    (filterSev === 'all' || e.severity === filterSev) &&
    (!filterAck || !e.acknowledged)
  )
  const sevCounts     = exposures.reduce((a,e) => { a[e.severity]=(a[e.severity]??0)+1; return a }, {} as Record<string,number>)

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to access dark web monitoring</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Dark Web <span style={{color:'#ff3a5c'}}>Monitoring</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Monitor emails and domains for breach exposure · paste sites · leaked credentials
          </p>
        </div>
        <button onClick={() => setShowForm(s => !s)}
          className="px-4 py-2 rounded-xl font-mono text-[11px] font-bold cursor-pointer border transition-all"
          style={showForm
            ? { background:'rgba(255,58,92,0.06)', borderColor:'rgba(255,58,92,0.2)', color:'#ff3a5c' }
            : { background:'rgba(255,58,92,0.08)', borderColor:'rgba(255,58,92,0.3)', color:'#ff3a5c' }}>
          {showForm ? '✕ Cancel' : '+ Add Monitor'}
        </button>
      </div>

      {/* Msg */}
      {msg && (
        <div className="mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px]"
          style={{
            background: msg.startsWith('✓') ? 'rgba(0,255,170,0.08)' : 'rgba(255,58,92,0.08)',
            border: msg.startsWith('✓') ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,58,92,0.2)',
            color:  msg.startsWith('✓') ? '#00ffaa' : '#ff3a5c',
          }}>
          {msg}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {[
          { label:'Monitors',    val: monitors.length,    color:'#e2e8f0' },
          { label:'Exposures',   val: totalUnacked,       color: totalUnacked > 0 ? '#fb923c' : '#00ffaa' },
          { label:'Critical',    val: totalCrit,          color: totalCrit > 0 ? '#ff3a5c' : '#00ffaa' },
          { label:'High',        val: totalHigh,          color: totalHigh > 0 ? '#fb923c' : '#00ffaa' },
        ].map(s => (
          <div key={s.label} className="glass p-3 text-center rounded-lg">
            <div className="font-mono text-xl font-black" style={{color:s.color}}>{s.val}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="glass rounded-xl p-5 mb-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Add Monitor</div>

          {/* Type selector */}
          <div className="flex gap-2 mb-4">
            {(['email','domain'] as const).map(t => (
              <button key={t} onClick={() => setForm(f => ({...f, type:t}))}
                className="px-4 py-2 rounded-lg font-mono text-[10px] font-bold cursor-pointer border transition-all capitalize"
                style={form.type===t
                  ? { background:'rgba(255,58,92,0.1)', borderColor:'rgba(255,58,92,0.3)', color:'#ff3a5c' }
                  : { background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.07)', color:'#475569' }}>
                {t === 'email' ? '📧 Email Address' : '🌐 Domain Name'}
              </button>
            ))}
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <label className="font-mono text-[10px] text-slate-500 block mb-1">
                {form.type === 'email' ? 'Email Address' : 'Domain'} *
              </label>
              <input
                value={form.identifier}
                onChange={e => setForm(f => ({...f, identifier:e.target.value}))}
                placeholder={form.type==='email' ? 'you@company.com' : 'company.com'}
                className={inp} style={inpStyle}
                onKeyDown={e => e.key==='Enter' && addMonitor()}
              />
            </div>

            {/* API keys (optional, collapsible) */}
            <button onClick={() => setForm(f => ({...f, showKeys:!f.showKeys}))}
              className="font-mono text-[9px] cursor-pointer transition-colors"
              style={{color:'#475569'}}>
              {form.showKeys ? '▲' : '▼'} Optional: Add API keys for deeper search
            </button>

            {form.showKeys && (
              <div className="space-y-3 p-3 rounded-lg" style={{background:'rgba(0,0,0,0.2)'}}>
                <div>
                  <label className="font-mono text-[10px] text-slate-500 block mb-1">
                    HIBP API Key
                    <a href="https://haveibeenpwned.com/API/Key" target="_blank" rel="noreferrer"
                      className="ml-2 text-blue-400 hover:underline">Get key →</a>
                  </label>
                  <input type="password" value={form.hibpKey}
                    onChange={e => setForm(f => ({...f, hibpKey:e.target.value}))}
                    placeholder="Unlocks email breach details & domain-wide search"
                    className={inp} style={inpStyle}/>
                </div>
                <div>
                  <label className="font-mono text-[10px] text-slate-500 block mb-1">
                    IntelX API Key
                    <a href="https://intelx.io/account?tab=developer" target="_blank" rel="noreferrer"
                      className="ml-2 text-blue-400 hover:underline">Get key →</a>
                  </label>
                  <input type="password" value={form.intelxKey}
                    onChange={e => setForm(f => ({...f, intelxKey:e.target.value}))}
                    placeholder="Unlocks paste site & dark web search"
                    className={inp} style={inpStyle}/>
                </div>
                <p className="font-mono text-[9px] text-slate-700">
                  API keys are encrypted before storage. Without keys, only crt.sh and public paste sites are checked.
                </p>
              </div>
            )}
          </div>

          {/* What gets checked */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {[
              ['💀','HaveIBeenPwned',  form.hibpKey ? 'Full scan' : 'Key needed'],
              ['🕵','Intelligence X',  form.intelxKey ? 'Full scan' : 'Key needed'],
              ['📋','Paste Sites',     'Always checked'],
              ['🔏','crt.sh',          form.type==='domain' ? 'Cert scan' : 'N/A'],
            ].map(([icon,name,status]) => (
              <div key={name as string} className="p-2 rounded-lg text-center"
                style={{background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)'}}>
                <div className="text-lg mb-0.5">{icon}</div>
                <div className="font-mono text-[9px] text-slate-300">{name}</div>
                <div className="font-mono text-[8px] mt-0.5"
                  style={{color: (status as string).includes('checked')||(status as string).includes('scan') ? '#00ffaa' : '#475569'}}>
                  {status}
                </div>
              </div>
            ))}
          </div>

          <button onClick={addMonitor} disabled={adding}
            className="w-full py-3 rounded-xl font-mono text-[12px] font-black cursor-pointer transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background:'rgba(255,58,92,0.1)', border:'1px solid rgba(255,58,92,0.3)', color:'#ff3a5c' }}>
            {adding ? '⟳ Scanning...' : '🕵 Start Monitoring'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Left: Monitor list ─────────────────────────────── */}
        <div>
          {loading ? (
            <div className="font-mono text-[11px] text-slate-600 text-center py-10 animate-pulse">Loading...</div>
          ) : monitors.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="text-5xl mb-4">🕵</div>
              <div className="font-mono text-[12px] text-slate-400 mb-1">No monitors yet</div>
              <div className="font-mono text-[10px] text-slate-600">
                Add an email or domain to check for breach exposure
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {monitors.map(m => {
                const unacked  = m.exposures.filter(e => !e.acknowledged)
                const topSev   = unacked.sort((a,b) =>
                  ['critical','high','medium','low'].indexOf(a.severity) -
                  ['critical','high','medium','low'].indexOf(b.severity))[0]?.severity
                const isActive = selected?.id === m.id

                return (
                  <div key={m.id}
                    onClick={() => loadDetail(m)}
                    className="rounded-xl p-4 cursor-pointer transition-all hover:opacity-90"
                    style={{
                      background: isActive ? 'rgba(255,58,92,0.04)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isActive ? 'rgba(255,58,92,0.2)' : 'rgba(255,255,255,0.07)'}`,
                    }}>
                    <div className="flex items-center gap-3">
                      <RiskRing exposures={m.exposures} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-[11px]">{m.type==='email' ? '📧' : '🌐'}</span>
                          <span className="font-mono text-[12px] font-black text-slate-100 truncate">{m.identifier}</span>
                        </div>
                        <div className="font-mono text-[9px]" style={{
                          color: m.status==='pending' ? '#ffd700' : m.status==='error' ? '#ff3a5c' : '#00ffaa'
                        }}>
                          {m.status==='pending' ? '⟳ Scanning...' :
                           m.status==='error'   ? '✗ Check failed' :
                           m.lastCheckedAt ? `Last checked ${new Date(m.lastCheckedAt).toLocaleDateString()}` : 'Active'}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {topSev && unacked.length > 0 ? (
                          <>
                            <div className="font-mono text-[11px] font-bold" style={{color:SEV[topSev]}}>{unacked.length} open</div>
                            <SevBadge sev={topSev}/>
                          </>
                        ) : m.exposures.length > 0 ? (
                          <div className="font-mono text-[10px] text-slate-600">all ack'd</div>
                        ) : (
                          <div className="font-mono text-[10px]" style={{color:'#00ffaa'}}>✓ Clean</div>
                        )}
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); removeMonitor(m.id) }}
                        className="font-mono text-[10px] px-2 py-1 rounded cursor-pointer shrink-0"
                        style={{color:'#ff3a5c', background:'rgba(255,58,92,0.08)'}}>
                        ✕
                      </button>
                    </div>

                    {/* Data type chips */}
                    {m.exposures.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {[...new Set(m.exposures.flatMap(e => e.dataTypes))].slice(0,4).map(dt => (
                          <span key={dt} className="font-mono text-[8px] px-1.5 py-[1px] rounded"
                            style={{background:'rgba(255,58,92,0.08)',color:'#ff3a5c66'}}>
                            {dt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Right: Detail panel ────────────────────────────── */}
        <div>
          {!selected ? (
            <div className="glass rounded-xl p-10 text-center h-64 flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">🕵</div>
              <div className="font-mono text-[12px] text-slate-400">Select a monitor to view exposures</div>
            </div>
          ) : !detail ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading exposures...</div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Header */}
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <RiskRing exposures={detail.exposures} />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[13px] font-black text-slate-100">{detail.identifier}</div>
                  <div className="font-mono text-[10px] text-slate-500 capitalize">{detail.type} monitor</div>
                  <div className="font-mono text-[10px] text-slate-600">
                    {detail.exposures.length} total · {detail.exposures.filter(e=>!e.acknowledged).length} unacknowledged
                  </div>
                </div>
              </div>

              {/* Filters */}
              {detail.exposures.length > 0 && (
                <div className="flex gap-1.5 flex-wrap items-center">
                  {(['all','critical','high','medium','low'] as const).map(s => (
                    <button key={s} onClick={() => setFilterSev(s)}
                      className="px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all"
                      style={filterSev===s
                        ? { background:`${SEV[s]??'#e2e8f0'}18`, borderColor:`${SEV[s]??'#e2e8f0'}50`, color:SEV[s]??'#e2e8f0' }
                        : { background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.07)', color:'#475569' }}>
                      {s==='all' ? `All (${detail.exposures.length})` : `${s} (${sevCounts[s]??0})`}
                    </button>
                  ))}
                  <button onClick={() => setFilterAck(v => !v)}
                    className="ml-auto px-2.5 py-1.5 rounded-lg font-mono text-[9px] cursor-pointer border transition-all"
                    style={filterAck
                      ? { background:'rgba(0,255,170,0.08)', borderColor:'rgba(0,255,170,0.2)', color:'#00ffaa' }
                      : { background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.07)', color:'#475569' }}>
                    {filterAck ? '✓ Unacked only' : 'Hide acked'}
                  </button>
                </div>
              )}

              {/* Exposures */}
              {detail.exposures.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center">
                  <div className="text-3xl mb-2">
                    {detail.status==='pending' ? '⟳' : '✅'}
                  </div>
                  <div className="font-mono text-[12px] text-slate-300">
                    {detail.status==='pending' ? 'Scanning in progress...' : 'No exposures found'}
                  </div>
                  <div className="font-mono text-[10px] text-slate-600 mt-1">
                    {detail.status==='pending'
                      ? 'Results will appear here within 30 seconds'
                      : `${detail.identifier} was not found in any checked breach sources`}
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                  {filtered.map(exp => {
                    const isOpen = expanded === exp.id
                    const c = SEV[exp.severity] ?? '#64748b'
                    return (
                      <div key={exp.id}
                        className="rounded-xl border overflow-hidden transition-all cursor-pointer"
                        style={{
                          borderColor: isOpen ? `${c}40` : exp.acknowledged ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.07)',
                          background:  isOpen ? `${c}08` : exp.acknowledged ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.02)',
                          opacity: exp.acknowledged ? 0.6 : 1,
                        }}
                        onClick={() => setExpanded(e => e===exp.id ? null : exp.id)}>

                        <div className="flex items-center gap-3 px-4 py-3">
                          <span className="text-lg shrink-0">{SOURCE_ICON[exp.source] ?? '🔍'}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <SevBadge sev={exp.severity}/>
                              <span className="font-mono text-[9px] text-slate-600">{exp.source}</span>
                              {exp.breachDate && <span className="font-mono text-[8px] text-slate-700">{exp.breachDate}</span>}
                            </div>
                            <div className="font-mono text-[11px] font-bold text-slate-200 truncate">{exp.title}</div>
                          </div>
                          {exp.pwnCount && (
                            <div className="font-mono text-[9px] text-slate-600 shrink-0 text-right">
                              {exp.pwnCount.toLocaleString()}<br/>
                              <span className="text-[7px]">affected</span>
                            </div>
                          )}
                          <span className="font-mono text-[10px] text-slate-600 shrink-0">{isOpen?'▲':'▼'}</span>
                        </div>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-0 border-t border-white/[0.05]">
                            <p className="font-mono text-[10px] text-slate-400 mt-3 mb-3 leading-relaxed">
                              {exp.description}
                            </p>

                            {exp.dataTypes.length > 0 && (
                              <div className="flex gap-1.5 flex-wrap mb-3">
                                {exp.dataTypes.map(dt => (
                                  <span key={dt} className="font-mono text-[9px] px-2 py-[2px] rounded"
                                    style={{background:`${c}12`, color:`${c}cc`}}>
                                    {dt}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center gap-2 flex-wrap">
                              {exp.url && (
                                <a href={exp.url} target="_blank" rel="noreferrer"
                                  className="font-mono text-[9px] px-2 py-1 rounded border cursor-pointer"
                                  style={{borderColor:'rgba(0,170,255,0.2)',color:'#00aaff',background:'rgba(0,170,255,0.06)'}}
                                  onClick={e => e.stopPropagation()}>
                                  View Source ↗
                                </a>
                              )}
                              {!exp.acknowledged && (
                                <button
                                  onClick={e => { e.stopPropagation(); ackExposure(exp.id) }}
                                  className="font-mono text-[9px] px-2 py-1 rounded border cursor-pointer"
                                  style={{borderColor:'rgba(0,255,170,0.2)',color:'#00ffaa',background:'rgba(0,255,170,0.06)'}}>
                                  ✓ Acknowledge
                                </button>
                              )}
                              {exp.acknowledged && (
                                <span className="font-mono text-[9px] text-slate-600">✓ Acknowledged</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
