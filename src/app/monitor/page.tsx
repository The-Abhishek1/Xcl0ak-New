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

const CHANGE_ICON: Record<string, string> = {
  new_subdomain:      '🌐',
  subdomain_removed:  '🗑',
  port_opened:        '🔓',
  port_closed:        '🔒',
  ssl_expiry_critical:'🚨',
  ssl_expiry_warning: '⚠️',
  http_status_change: '🔄',
  new_cve:            '💀',
  new_tech:           '🔧',
  tech_version_change:'📦',
  dns_record_added:   '📡',
  dns_record_removed: '📡',
  baseline:           '✅',
}

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

export default function MonitorPage() {
  const user = getUser()
  const [assets,        setAssets]        = useState<any[]>([])
  const [loading,       setLoading]       = useState(true)
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null)
  const [assetDetail,   setAssetDetail]   = useState<any | null>(null)
  const [adding,        setAdding]        = useState(false)
  const [polling,       setPolling]       = useState(false)
  const [msg,           setMsg]           = useState('')
  const [form,          setForm]          = useState({ target: '', type: 'domain', label: '' })

  const load = useCallback(async () => {
    setLoading(true)
    const res = await authFetch('/api/v1/monitor')
    if (res.ok) {
      let d: any = {}
    try { d = await res.json() } catch {}
      setAssets(d.assets ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  // Poll every 5s if any asset is still scanning (no lastScannedAt)
  useEffect(() => {
    const hasScanning = assets.some(a => !a.lastScannedAt && a.isActive)
    if (!hasScanning) { setPolling(false); return }
    setPolling(true)
    const t = setInterval(load, 5000)
    return () => clearInterval(t)
  }, [assets, load])

  // Auto-clear message
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(''), 4000)
    return () => clearTimeout(t)
  }, [msg])

  const loadDetail = useCallback(async (asset: any) => {
    setSelectedAsset(asset)
    const res = await authFetch(`/api/v1/monitor?assetId=${asset.id}`)
    if (res.ok) {
      let d: any = {}
      try { d = await res.json() } catch {}
      setAssetDetail(d.asset ?? null)
    }
  }, [])

  // Auto-refresh detail panel whenever the assets list refreshes
  useEffect(() => {
    if (!selectedAsset) return
    const updated = assets.find((a: any) => a.id === selectedAsset.id)
    if (updated) loadDetail(updated)
  }, [assets]) // eslint-disable-line react-hooks/exhaustive-deps

  async function addAsset() {
    if (!form.target.trim()) { setMsg('✗ Target required'); return }
    setAdding(true)
    const res = await authFetch('/api/v1/monitor', {
      method: 'POST',
      body:   JSON.stringify(form),
    })
    let d: any = {}
    try { d = await res.json() } catch {}
    if (res.ok) {
      setMsg(`✓ Added ${form.target} — initial scan starting...`)
      setForm({ target: '', type: 'domain', label: '' })
      await load()
      // Poll a few times to pick up scan results quickly
      setTimeout(load, 3000)
      setTimeout(load, 8000)
      setTimeout(load, 15000)
      setTimeout(load, 30000)
    } else {
      setMsg(`✗ ${d.error ?? 'Failed to add asset'}`)
    }
    setAdding(false)
  }

  async function removeAsset(assetId: string) {
    if (!confirm('Remove this asset from monitoring?')) return
    const res = await authFetch('/api/v1/monitor', {
      method: 'DELETE',
      body:   JSON.stringify({ assetId }),
    })
    if (res.ok) {
      setMsg('✓ Asset removed')
      if (selectedAsset?.id === assetId) { setSelectedAsset(null); setAssetDetail(null) }
      await load()
    }
  }

  async function acknowledgeChanges(assetId: string, changeIds: string[]) {
    await authFetch('/api/v1/monitor', {
      method: 'PUT',
      body:   JSON.stringify({ assetId, changeIds }),
    })
    if (selectedAsset?.id === assetId) await loadDetail(selectedAsset)
    await load()
  }

  // Stats
  const totalChanges   = assets.reduce((a, x) => a + (x.changes?.length ?? 0), 0)
  const criticalAssets = assets.filter(a => a.changes?.some((c: any) => c.severity === 'critical')).length

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to access monitoring</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black">
          Attack Surface <span style={{ color: '#00ffaa' }}>Monitor</span>
        </h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Continuous monitoring — subdomains, ports, SSL, CVEs, DNS changes detected automatically
          {polling && <span className="ml-2 animate-pulse" style={{ color: '#00ffaa' }}>● scanning</span>}
        </p>
      </div>

      {/* Message */}
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {[
          { label: 'Monitored',  val: assets.length,        color: '#e2e8f0' },
          { label: 'Alerts',     val: totalChanges,          color: totalChanges > 0 ? '#fb923c' : '#00ffaa' },
          { label: 'Critical',   val: criticalAssets,        color: criticalAssets > 0 ? '#ff3a5c' : '#00ffaa' },
          { label: 'Active',     val: assets.filter(a => a.isActive).length, color: '#00ffaa' },
        ].map(s => (
          <div key={s.label} className="glass p-3 text-center rounded-lg">
            <div className="font-mono text-xl font-black" style={{ color: s.color }}>{s.val}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Left: Asset list + add form ───────────────────────────── */}
        <div>
          {/* Add form */}
          <div className="glass rounded-xl p-4 mb-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Add Target</div>
            <div className="flex gap-2 mb-2">
              {(['domain', 'ip', 'cidr'] as const).map(t => (
                <button key={t}
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  className="px-2.5 py-1 rounded-lg font-mono text-[10px] cursor-pointer border transition-all"
                  style={form.type === t
                    ? { background: 'rgba(0,255,170,0.1)', borderColor: 'rgba(0,255,170,0.3)', color: '#00ffaa' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)', color: '#64748b' }}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <input
              value={form.target}
              onChange={e => setForm(f => ({ ...f, target: e.target.value }))}
              placeholder={form.type === 'domain' ? 'example.com' : form.type === 'ip' ? '1.2.3.4' : '10.0.0.0/24'}
              onKeyDown={e => e.key === 'Enter' && addAsset()}
              className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none mb-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
            />
            <input
              value={form.label}
              onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              placeholder="Label (optional)"
              className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none mb-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }}
            />
            <button
              onClick={addAsset}
              disabled={adding || !form.target.trim()}
              className="w-full py-2.5 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
              {adding ? '⟳ Adding...' : '+ Add to Monitoring'}
            </button>
          </div>

          {/* Asset list */}
          {loading ? (
            <div className="font-mono text-[11px] text-slate-600 text-center py-8 animate-pulse">Loading...</div>
          ) : assets.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              <div className="text-4xl mb-3">📡</div>
              <div className="font-mono text-[12px] text-slate-400 mb-1">No assets monitored yet</div>
              <div className="font-mono text-[10px] text-slate-600">Add a domain or IP above to start monitoring</div>
            </div>
          ) : (
            <div className="space-y-2">
              {assets.map((asset: any) => {
                const snap     = asset.snapshots?.[0]
                const changes  = asset.changes ?? []
                const hasCrit  = changes.some((c: any) => c.severity === 'critical')
                const hasHigh  = changes.some((c: any) => c.severity === 'high')
                const alertCol = hasCrit ? '#ff3a5c' : hasHigh ? '#fb923c' : changes.length > 0 ? '#facc15' : '#00ffaa'
                const isActive = selectedAsset?.id === asset.id

                return (
                  <div key={asset.id}
                    onClick={() => loadDetail(asset)}
                    className="rounded-xl p-4 cursor-pointer transition-all hover:opacity-90"
                    style={{
                      background:  isActive ? 'rgba(0,255,170,0.05)' : 'rgba(255,255,255,0.025)',
                      border:      `1px solid ${isActive ? 'rgba(0,255,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: alertCol }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[12px] font-bold text-slate-100 truncate">
                          {asset.label ?? asset.target}
                        </div>
                        <div className="font-mono text-[10px] text-slate-600">
                          {asset.type.toUpperCase()} ·&nbsp;
                          {asset.lastScannedAt
                            ? `Last scan ${new Date(asset.lastScannedAt).toLocaleString()}`
                            : 'Scanning...'}
                        </div>
                      </div>
                      {changes.length > 0 && (
                        <div className="shrink-0 px-2 py-1 rounded-lg font-mono text-[10px] font-bold"
                          style={{ background: `${alertCol}15`, color: alertCol, border: `1px solid ${alertCol}30` }}>
                          {changes.length} alert{changes.length !== 1 ? 's' : ''}
                        </div>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); removeAsset(asset.id) }}
                        className="shrink-0 font-mono text-[10px] px-2 py-1 rounded cursor-pointer transition-all hover:opacity-80"
                        style={{ color: '#ff3a5c', background: 'rgba(255,58,92,0.08)' }}>
                        ✕
                      </button>
                    </div>

                    {/* Quick stats */}
                    {snap && (
                      <div className="flex gap-3 mt-2 ml-5 font-mono text-[9px] text-slate-600">
                        {snap.subdomains?.length > 0 && <span>🌐 {snap.subdomains.length} subdomains</span>}
                        {snap.openPorts?.length > 0 && <span>🔌 {snap.openPorts.length} ports</span>}
                        {snap.cves?.length > 0 && <span style={{ color: '#ff3a5c' }}>💀 {snap.cves.length} CVEs</span>}
                        {snap.sslExpiry && <span>🔐 SSL {new Date(snap.sslExpiry).toLocaleDateString()}</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Right: Asset detail ───────────────────────────────────── */}
        <div>
          {!selectedAsset ? (
            <div className="glass rounded-xl p-10 text-center h-64 flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">🛰</div>
              <div className="font-mono text-[12px] text-slate-400">Select an asset to view details</div>
            </div>
          ) : !assetDetail ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading asset detail...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-mono text-[14px] font-black text-slate-100">
                    {assetDetail.label ?? assetDetail.target}
                  </div>
                  <span className="font-mono text-[9px] px-2 py-1 rounded"
                    style={{ background: 'rgba(0,255,170,0.08)', color: '#00ffaa' }}>
                    {assetDetail.type.toUpperCase()}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-slate-600">
                  {assetDetail.target} · Every {assetDetail.scanInterval}h ·&nbsp;
                  {assetDetail.lastScannedAt
                    ? `Last scan ${new Date(assetDetail.lastScannedAt).toLocaleString()}`
                    : 'Initial scan in progress...'}
                </div>
              </div>

              {/* Latest snapshot */}
              {assetDetail.snapshots?.[0] && (() => {
                const snap = assetDetail.snapshots[0]
                return (
                  <div className="glass rounded-xl p-4">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">
                      Latest Snapshot — {new Date(snap.takenAt).toLocaleString()}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {[
                        { label: 'Open Ports', val: snap.openPorts?.length ?? 0, color: snap.openPorts?.length > 10 ? '#fb923c' : '#e2e8f0' },
                        { label: 'Subdomains', val: snap.subdomains?.length ?? 0, color: '#00aaff' },
                        { label: 'CVEs',       val: snap.cves?.length ?? 0,      color: snap.cves?.length > 0 ? '#ff3a5c' : '#00ffaa' },
                        { label: 'HTTP',       val: snap.httpStatus ?? '—',      color: snap.httpStatus === 200 ? '#00ffaa' : snap.httpStatus >= 500 ? '#ff3a5c' : '#facc15' },
                      ].map(s => (
                        <div key={s.label} className="text-center p-2 rounded-lg"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="font-mono text-lg font-black" style={{ color: s.color as string }}>{s.val}</div>
                          <div className="font-mono text-[9px] text-slate-600">{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* SSL */}
                    {snap.sslExpiry && (
                      <div className="font-mono text-[10px] text-slate-500 mb-2">
                        🔐 SSL expires: <span className="text-slate-300">{new Date(snap.sslExpiry).toLocaleDateString()}</span>
                        {(() => {
                          const days = Math.floor((new Date(snap.sslExpiry).getTime() - Date.now()) / 86400000)
                          return days < 30
                            ? <span style={{ color: days < 7 ? '#ff3a5c' : '#facc15' }}> ({days} days)</span>
                            : null
                        })()}
                      </div>
                    )}

                    {/* Open ports list */}
                    {snap.openPorts?.length > 0 && (
                      <div>
                        <div className="font-mono text-[9px] text-slate-600 mb-1">Open Ports</div>
                        <div className="flex flex-wrap gap-1">
                          {snap.openPorts.slice(0, 20).map((p: any) => (
                            <span key={p.port}
                              className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(0,170,255,0.1)', color: '#00aaff', border: '1px solid rgba(0,170,255,0.2)' }}>
                              {p.port}/{p.protocol}
                              {p.service ? ` ${p.service}` : ''}
                            </span>
                          ))}
                          {snap.openPorts.length > 20 && (
                            <span className="font-mono text-[9px] text-slate-600">+{snap.openPorts.length - 20} more</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CVEs */}
                    {snap.cves?.length > 0 && (
                      <div className="mt-2">
                        <div className="font-mono text-[9px] text-slate-600 mb-1">CVEs Detected</div>
                        <div className="space-y-1">
                          {snap.cves.slice(0, 5).map((cve: any) => (
                            <div key={cve.id} className="flex items-center gap-2 font-mono text-[10px]">
                              <span style={{ color: SEVERITY_COLOR[cve.severity] ?? '#64748b' }}>
                                [{cve.severity?.toUpperCase() ?? '?'}]
                              </span>
                              <span className="text-slate-300">{cve.id}</span>
                              <span className="text-slate-600 truncate">{cve.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subdomains */}
                    {snap.subdomains?.length > 0 && (
                      <div className="mt-2">
                        <div className="font-mono text-[9px] text-slate-600 mb-1">Subdomains</div>
                        <div className="max-h-24 overflow-y-auto space-y-0.5">
                          {snap.subdomains.map((s: string) => (
                            <div key={s} className="font-mono text-[10px] text-slate-400">{s}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}

              {/* Changes */}
              {assetDetail.changes?.length > 0 && (
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">
                      Change History ({assetDetail.changes.length})
                    </div>
                    {assetDetail.changes.some((c: any) => !c.acknowledged) && (
                      <button
                        onClick={() => acknowledgeChanges(
                          assetDetail.id,
                          assetDetail.changes.filter((c: any) => !c.acknowledged).map((c: any) => c.id)
                        )}
                        className="font-mono text-[9px] px-2 py-1 rounded cursor-pointer border transition-all"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#64748b' }}>
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-1.5 max-h-80 overflow-y-auto">
                    {assetDetail.changes.map((change: any) => (
                      <div key={change.id}
                        className="p-2.5 rounded-lg flex items-start gap-2"
                        style={{
                          background: change.acknowledged ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                          border:     `1px solid ${change.acknowledged ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'}`,
                          opacity:    change.acknowledged ? 0.6 : 1,
                        }}>
                        <span className="text-sm shrink-0">{CHANGE_ICON[change.changeType] ?? '📌'}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                              style={{
                                background: `${SEVERITY_COLOR[change.severity] ?? '#64748b'}18`,
                                color:       SEVERITY_COLOR[change.severity] ?? '#64748b',
                                border:     `1px solid ${SEVERITY_COLOR[change.severity] ?? '#64748b'}30`,
                              }}>
                              {change.severity.toUpperCase()}
                            </span>
                            <span className="font-mono text-[10px] text-slate-600">
                              {new Date(change.detectedAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-slate-300 mt-0.5">{change.description}</div>
                        </div>
                        {!change.acknowledged && (
                          <button
                            onClick={() => acknowledgeChanges(assetDetail.id, [change.id])}
                            className="shrink-0 font-mono text-[9px] px-1.5 py-[1px] rounded cursor-pointer"
                            style={{ color: '#64748b', background: 'rgba(255,255,255,0.04)' }}>
                            ✓
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
