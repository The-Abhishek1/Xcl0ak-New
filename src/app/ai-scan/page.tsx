'use client'
import { useEffect, useState, useCallback } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

const SEVERITY_COLOR: Record<string, string> = {
  critical: '#ff3a5c',
  high:     '#fb923c',
  medium:   '#facc15',
  low:      '#00aaff',
  info:     '#64748b',
}

const CATEGORY_INFO: Record<string, { icon: string; label: string }> = {
  direct_injection:    { icon: '💉', label: 'Direct Injection' },
  jailbreak:           { icon: '🔓', label: 'Jailbreak' },
  system_prompt_leak:  { icon: '🔍', label: 'System Prompt Leak' },
  data_exfiltration:   { icon: '📤', label: 'Data Exfiltration' },
  indirect_injection:  { icon: '🔗', label: 'Indirect Injection' },
  role_confusion:      { icon: '🎭', label: 'Role Confusion' },
  token_smuggling:     { icon: '🥷', label: 'Token Smuggling' },
  context_overflow:    { icon: '💥', label: 'Context Overflow' },
  denial_of_service:   { icon: '🚫', label: 'Denial of Service' },
  many_shot:           { icon: '🎯', label: 'Many-Shot Jailbreak' },
}

const PRESET_ENDPOINTS = [
  { label: 'OpenAI GPT-4',      url: 'https://api.openai.com/v1/chat/completions',     model: 'gpt-4o' },
  { label: 'OpenAI GPT-3.5',    url: 'https://api.openai.com/v1/chat/completions',     model: 'gpt-3.5-turbo' },
  { label: 'Anthropic Claude',  url: 'https://api.anthropic.com/v1/messages',          model: 'claude-3-5-sonnet-20241022' },
  { label: 'Groq Llama',        url: 'https://api.groq.com/openai/v1/chat/completions', model: 'llama-3.1-8b-instant' },
  { label: 'Local Ollama',      url: 'http://localhost:11434/api/chat',                model: 'qwen2.5:3b' },
  { label: 'Custom',            url: '',                                                model: '' },
]

const ALL_CATEGORIES = Object.keys(CATEGORY_INFO)

function authFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  const user  = getUser()
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

export default function AIScanPage() {
  const user = getUser()

  // Form state
  const [preset,       setPreset]       = useState(0)
  const [targetUrl,    setTargetUrl]    = useState(PRESET_ENDPOINTS[0].url)
  const [apiKey,       setApiKey]       = useState('')
  const [model,        setModel]        = useState(PRESET_ENDPOINTS[0].model)
  const [systemPrompt, setSystemPrompt] = useState('')
  const [maxPrompts,   setMaxPrompts]   = useState(50)
  const [categories,   setCategories]   = useState<string[]>(ALL_CATEGORIES)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Scan state
  const [activeScanId, setActiveScanId] = useState<string | null>(null)
  const [activeScan,   setActiveScan]   = useState<any>(null)
  const [history,      setHistory]      = useState<any[]>([])
  const [scanning,     setScanning]     = useState(false)
  const [msg,          setMsg]          = useState('')
  const [expandedFind, setExpandedFind] = useState<number | null>(null)
  const [filterSev,    setFilterSev]    = useState('all')

  const loadHistory = useCallback(async () => {
    const res = await authFetch('/api/v1/ai-scan')
    if (res.ok) {
      const d = await res.json()
      setHistory(d.scans ?? [])
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  // Poll active scan
  useEffect(() => {
    if (!activeScanId) return
    const poll = setInterval(async () => {
      const res = await authFetch(`/api/v1/ai-scan?scanId=${activeScanId}`)
      if (res.ok) {
        const d = await res.json()
        setActiveScan(d.scan)
        if (['completed', 'failed'].includes(d.scan?.status)) {
          clearInterval(poll)
          setScanning(false)
          loadHistory()
        }
      }
    }, 3000)
    return () => clearInterval(poll)
  }, [activeScanId, loadHistory])

  function selectPreset(idx: number) {
    setPreset(idx)
    const p = PRESET_ENDPOINTS[idx]
    if (p.url) setTargetUrl(p.url)
    if (p.model) setModel(p.model)
  }

  function toggleCategory(cat: string) {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  async function startScan() {
    if (!targetUrl || !apiKey || !model) {
      setMsg('✗ Target URL, API key, and model are required')
      return
    }
    setScanning(true)
    setActiveScan(null)
    setMsg('')
    setFilterSev('all')
    setExpandedFind(null)

    try {
      const res = await authFetch('/api/v1/ai-scan', {
        method: 'POST',
        body:   JSON.stringify({
          targetUrl,
          apiKey,
          model,
          systemPrompt: systemPrompt || undefined,
          categories:   categories.length < ALL_CATEGORIES.length ? categories : undefined,
          maxPrompts,
        }),
      })
      const d = await res.json()
      if (!res.ok) {
        setMsg(`✗ ${d.error ?? 'Failed to start scan'}`)
        setScanning(false)
        return
      }
      setActiveScanId(d.scanId)
      setMsg('✓ Scan started — testing prompts...')
    } catch (e) {
      setMsg('✗ Network error starting scan')
      setScanning(false)
    }
  }

  function loadHistoricalScan(scan: any) {
    setActiveScanId(scan.id)
    setActiveScan(null)
    authFetch(`/api/v1/ai-scan?scanId=${scan.id}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.scan) setActiveScan(d.scan) })
  }

  const findings: any[] = activeScan?.result?.findings ?? []
  const filteredFindings = filterSev === 'all' ? findings : findings.filter(f => f.severity === filterSev)
  const findingCounts = findings.reduce((acc: Record<string, number>, f) => {
    acc[f.severity] = (acc[f.severity] ?? 0) + 1
    return acc
  }, {})
  const categoryCounts = findings.reduce((acc: Record<string, number>, f) => {
    acc[f.category] = (acc[f.category] ?? 0) + 1
    return acc
  }, {})

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to use the AI scanner</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black">
          AI <span style={{ color: '#00ffaa' }}>Security Scanner</span>
        </h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Test any LLM endpoint for prompt injection, jailbreaks, data exfiltration and more — 200+ adversarial probes
        </p>
      </div>

      {/* Status message */}
      {msg && (
        <div className="mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px]"
          style={{
            background: msg.startsWith('✓') ? 'rgba(0,255,170,0.08)' : 'rgba(255,58,92,0.08)',
            border:     msg.startsWith('✓') ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,58,92,0.2)',
            color:      msg.startsWith('✓') ? '#00ffaa' : '#ff3a5c',
          }}>
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Left: Config form ─────────────────────────────────────────── */}
        <div>
          <div className="glass rounded-xl p-5 mb-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Target Configuration</div>

            {/* Preset selector */}
            <div className="mb-4">
              <label className="font-mono text-[10px] text-slate-500 block mb-1.5">LLM Provider</label>
              <div className="grid grid-cols-3 gap-1.5">
                {PRESET_ENDPOINTS.map((p, i) => (
                  <button key={i} onClick={() => selectPreset(i)}
                    className="px-2 py-1.5 rounded-lg font-mono text-[9px] cursor-pointer border transition-all text-left"
                    style={preset === i
                      ? { background: 'rgba(0,255,170,0.1)', borderColor: 'rgba(0,255,170,0.3)', color: '#00ffaa' }
                      : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)', color: '#64748b' }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target URL */}
            <div className="mb-3">
              <label className="font-mono text-[10px] text-slate-500 block mb-1">Target URL *</label>
              <input
                value={targetUrl}
                onChange={e => setTargetUrl(e.target.value)}
                placeholder="https://api.openai.com/v1/chat/completions"
                className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
              />
            </div>

            {/* API Key */}
            <div className="mb-3">
              <label className="font-mono text-[10px] text-slate-500 block mb-1">API Key *</label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
              />
              <p className="font-mono text-[9px] text-slate-700 mt-1">
                Key is sent directly to the target — never stored by XCloak.
              </p>
            </div>

            {/* Model */}
            <div className="mb-3">
              <label className="font-mono text-[10px] text-slate-500 block mb-1">Model *</label>
              <input
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="gpt-4o"
                className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
              />
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(s => !s)}
              className="font-mono text-[10px] mb-3 cursor-pointer"
              style={{ color: '#64748b' }}>
              {showAdvanced ? '▲ Hide advanced' : '▼ Advanced options'}
            </button>

            {showAdvanced && (
              <>
                {/* System prompt */}
                <div className="mb-3">
                  <label className="font-mono text-[10px] text-slate-500 block mb-1">System Prompt (optional)</label>
                  <textarea
                    value={systemPrompt}
                    onChange={e => setSystemPrompt(e.target.value)}
                    placeholder="You are a helpful assistant..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
                  />
                </div>

                {/* Max prompts */}
                <div className="mb-4">
                  <label className="font-mono text-[10px] text-slate-500 block mb-1">
                    Max prompts: <span style={{ color: '#00ffaa' }}>{maxPrompts}</span>
                  </label>
                  <input
                    type="range" min={10} max={200} step={10}
                    value={maxPrompts}
                    onChange={e => setMaxPrompts(Number(e.target.value))}
                    className="w-full accent-green-400"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-slate-700">
                    <span>10 (fast)</span><span>200 (thorough)</span>
                  </div>
                </div>

                {/* Category selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-[10px] text-slate-500">Attack Categories</label>
                    <div className="flex gap-2">
                      <button onClick={() => setCategories(ALL_CATEGORIES)}
                        className="font-mono text-[9px] cursor-pointer" style={{ color: '#00aaff' }}>All</button>
                      <button onClick={() => setCategories([])}
                        className="font-mono text-[9px] cursor-pointer" style={{ color: '#64748b' }}>None</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {ALL_CATEGORIES.map(cat => (
                      <label key={cat}
                        className="flex items-center gap-1.5 cursor-pointer px-2 py-1.5 rounded-lg transition-all"
                        style={{
                          background: categories.includes(cat) ? 'rgba(0,255,170,0.05)' : 'rgba(255,255,255,0.02)',
                          border:     `1px solid ${categories.includes(cat) ? 'rgba(0,255,170,0.15)' : 'rgba(255,255,255,0.05)'}`,
                        }}>
                        <input
                          type="checkbox"
                          checked={categories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="accent-green-400"
                        />
                        <span className="font-mono text-[9px]" style={{ color: categories.includes(cat) ? '#94a3b8' : '#475569' }}>
                          {CATEGORY_INFO[cat]?.icon} {CATEGORY_INFO[cat]?.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Launch button */}
            <button
              onClick={startScan}
              disabled={scanning}
              className="w-full mt-4 py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgba(255,58,92,0.12)', border: '1px solid rgba(255,58,92,0.35)', color: '#ff3a5c' }}>
              {scanning
                ? `⟳ Scanning... (${activeScan?.status ?? 'queued'})`
                : '🎯 Launch Injection Scan'}
            </button>
          </div>

          {/* Scan history */}
          {history.length > 0 && (
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Scan History</div>
              <div className="space-y-1.5">
                {history.map(s => (
                  <button key={s.id}
                    onClick={() => loadHistoricalScan(s)}
                    className="w-full text-left px-3 py-2.5 rounded-lg cursor-pointer border transition-all hover:opacity-80"
                    style={{
                      background:   activeScanId === s.id ? 'rgba(0,255,170,0.05)' : 'rgba(255,255,255,0.02)',
                      borderColor:  activeScanId === s.id ? 'rgba(0,255,170,0.2)'  : 'rgba(255,255,255,0.06)',
                    }}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-400 truncate max-w-[60%]">
                        {new URL(s.targetUrl).hostname}
                      </span>
                      <span className="font-mono text-[9px]"
                        style={{ color: s.status === 'completed' ? (s.findings > 0 ? '#ff3a5c' : '#00ffaa') : s.status === 'failed' ? '#ff3a5c' : '#ffd700' }}>
                        {s.status === 'completed'
                          ? s.findings > 0 ? `${s.findings} findings` : '✓ Clean'
                          : s.status}
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-slate-600 mt-0.5">
                      {s.model} · {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Results ────────────────────────────────────────────── */}
        <div>
          {/* Scanning indicator */}
          {scanning && activeScan?.status !== 'completed' && (
            <div className="glass rounded-xl p-6 text-center mb-4">
              <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
                style={{ borderColor: '#ff3a5c', borderTopColor: 'transparent' }} />
              <div className="font-mono text-[12px] text-slate-300 mb-1">Injecting prompts...</div>
              <div className="font-mono text-[10px] text-slate-600">
                {activeScan?.status === 'running'
                  ? 'Testing adversarial prompts against target LLM'
                  : 'Waiting for worker to pick up scan...'}
              </div>
            </div>
          )}

          {/* Results */}
          {activeScan?.status === 'completed' && (
            <>
              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="glass p-3 text-center rounded-lg">
                  <div className="font-mono text-xl font-black"
                    style={{ color: findings.length > 0 ? '#ff3a5c' : '#00ffaa' }}>
                    {findings.length}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Injections</div>
                </div>
                <div className="glass p-3 text-center rounded-lg">
                  <div className="font-mono text-xl font-black" style={{ color: '#fb923c' }}>
                    {findingCounts['critical'] ?? 0}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Critical</div>
                </div>
                <div className="glass p-3 text-center rounded-lg">
                  <div className="font-mono text-xl font-black" style={{ color: '#64748b' }}>
                    {activeScan.maxPrompts ?? '—'}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Tested</div>
                </div>
              </div>

              {/* Risk score */}
              {findings.length > 0 && (
                <div className="glass rounded-xl p-4 mb-4">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Risk Breakdown by Category</div>
                  <div className="space-y-2">
                    {Object.entries(categoryCounts).map(([cat, count]) => (
                      <div key={cat} className="flex items-center gap-2">
                        <span className="font-mono text-[11px] w-5 text-center">{CATEGORY_INFO[cat]?.icon}</span>
                        <span className="font-mono text-[10px] text-slate-400 flex-1">{CATEGORY_INFO[cat]?.label ?? cat}</span>
                        <span className="font-mono text-[10px] font-bold" style={{ color: '#ff3a5c' }}>{count}</span>
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-full rounded-full" style={{
                            background: '#ff3a5c',
                            width: `${Math.min(100, (count as number / findings.length) * 100)}%`,
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {findings.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center">
                  <div className="text-4xl mb-3">🛡</div>
                  <div className="font-mono text-[13px] font-bold text-slate-200 mb-1">No injections succeeded</div>
                  <div className="font-mono text-[11px] text-slate-600">
                    Target LLM appears robust against the tested attack patterns.
                  </div>
                </div>
              ) : (
                <>
                  {/* Severity filter */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[['all', `All (${findings.length})`], ...(['critical','high','medium','low']
                      .filter(s => findingCounts[s] > 0)
                      .map(s => [s, `${s.toUpperCase()} (${findingCounts[s]})`]))
                    ].map(([sev, label]) => (
                      <button key={sev}
                        onClick={() => setFilterSev(sev)}
                        className="px-2.5 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all"
                        style={filterSev === sev
                          ? sev === 'all'
                            ? { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }
                            : { background: `${SEVERITY_COLOR[sev]}20`, borderColor: `${SEVERITY_COLOR[sev]}50`, color: SEVERITY_COLOR[sev] }
                          : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Findings list */}
                  <div className="space-y-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {filteredFindings.map((f: any, i: number) => (
                      <div key={i} className="rounded-xl overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <button
                          onClick={() => setExpandedFind(expandedFind === i ? null : i)}
                          className="w-full text-left p-3 cursor-pointer"
                          style={{ background: 'transparent', border: 'none' }}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] px-1.5 py-[1px] rounded shrink-0"
                              style={{
                                background: `${SEVERITY_COLOR[f.severity] ?? '#64748b'}18`,
                                color:       SEVERITY_COLOR[f.severity] ?? '#64748b',
                                border:     `1px solid ${SEVERITY_COLOR[f.severity] ?? '#64748b'}30`,
                              }}>
                              {(f.severity ?? 'info').toUpperCase()}
                            </span>
                            <span className="font-mono text-[10px] text-center w-5">{CATEGORY_INFO[f.category]?.icon}</span>
                            <span className="font-mono text-[11px] text-slate-200 font-bold flex-1">
                              {CATEGORY_INFO[f.category]?.label ?? f.category}
                            </span>
                            <span className="font-mono text-[10px]" style={{ color: '#00aaff' }}>
                              {(f.confidence * 100).toFixed(0)}% confidence
                            </span>
                            <span className="font-mono text-[10px] text-slate-600">
                              {expandedFind === i ? '▲' : '▼'}
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-slate-500 mt-1 ml-7">{f.message}</div>
                        </button>

                        {expandedFind === i && (
                          <div className="px-3 pb-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            {/* Prompt used */}
                            <div className="mt-2">
                              <div className="font-mono text-[9px] text-slate-600 uppercase mb-1">Injected Prompt</div>
                              <div className="p-2 rounded-lg font-mono text-[10px] text-slate-400 overflow-auto"
                                style={{ background: 'rgba(255,58,92,0.05)', border: '1px solid rgba(255,58,92,0.15)', maxHeight: '100px' }}>
                                {f.prompt}
                              </div>
                            </div>
                            {/* Response */}
                            <div>
                              <div className="font-mono text-[9px] text-slate-600 uppercase mb-1">Model Response</div>
                              <div className="p-2 rounded-lg font-mono text-[10px] text-slate-400 overflow-auto"
                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', maxHeight: '120px' }}>
                                {f.response}
                              </div>
                            </div>
                            {/* Judge explanation */}
                            {f.explanation && (
                              <div className="font-mono text-[10px] text-slate-500">
                                <span className="text-slate-600">Judge: </span>{f.explanation}
                              </div>
                            )}
                            {/* Fix */}
                            {f.fix && (
                              <div className="p-2 rounded-lg font-mono text-[10px]"
                                style={{ background: 'rgba(0,255,170,0.05)', borderLeft: '2px solid rgba(0,255,170,0.2)', color: '#00ffaa99' }}>
                                <span className="text-slate-600">Fix: </span>{f.fix}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Failed scan */}
          {activeScan?.status === 'failed' && (
            <div className="glass rounded-xl p-6">
              <div className="font-mono text-[12px] font-bold mb-2" style={{ color: '#ff3a5c' }}>✗ Scan failed</div>
              <div className="font-mono text-[11px] text-slate-500">{activeScan.error ?? 'Unknown error'}</div>
            </div>
          )}

          {/* Empty state */}
          {!activeScan && !scanning && (
            <div className="glass rounded-xl p-10 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <div className="font-mono text-[13px] font-bold text-slate-300 mb-2">No scan running</div>
              <div className="font-mono text-[11px] text-slate-600 max-w-xs mx-auto">
                Configure a target LLM endpoint on the left and launch a scan to test for prompt injection vulnerabilities.
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 max-w-xs mx-auto text-left">
                {[
                  { icon: '💉', text: '50+ direct injection variants' },
                  { icon: '🔓', text: '10+ jailbreak techniques' },
                  { icon: '🔍', text: 'System prompt extraction' },
                  { icon: '🥷', text: 'Token smuggling attacks' },
                  { icon: '📤', text: 'Data exfiltration probes' },
                  { icon: '🎯', text: 'Many-shot jailbreaks' },
                ].map(i => (
                  <div key={i.text} className="flex items-center gap-1.5">
                    <span className="text-sm">{i.icon}</span>
                    <span className="font-mono text-[9px] text-slate-600">{i.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
