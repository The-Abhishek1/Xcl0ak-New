'use client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

const SEVERITY_COLOR: Record<string, string> = {
  critical: '#ff3a5c',
  high:     '#fb923c',
  medium:   '#facc15',
  low:      '#00aaff',
  info:     '#64748b',
}

const STATUS_COLOR: Record<string, string> = {
  completed: '#00ffaa',
  running:   '#00aaff',
  queued:    '#ffd700',
  failed:    '#ff3a5c',
}

const PAGE_SIZE = 15

const GH_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? ''
const APP_URL      = process.env.NEXT_PUBLIC_APP_URL           ?? 'https://xcloak.tech'

function authFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  const user  = getUser()
  return fetch(path, {
    ...opts,
    headers: {
      'Content-Type':   'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(user?.username ? { 'x-user-alias': user.username } : {}),
      ...opts?.headers,
    },
  })
}

function sortRepos(repos: any[]): any[] {
  return [...repos].sort((a, b) => {
    const score = (r: any) => {
      if (r.latestScan?.status === 'completed' && (r.latestScan?.findings ?? 0) > 0) return 0
      if (r.latestScan?.status === 'completed') return 1
      if (r.latestScan?.status === 'running' || r.latestScan?.status === 'queued') return 2
      if (r.latestScan?.status === 'failed') return 3
      return 4
    }
    const diff = score(a) - score(b)
    if (diff !== 0) return diff
    return (b.latestScan?.findings ?? 0) - (a.latestScan?.findings ?? 0)
  })
}

export default function GitHubPage() {
  const [data,     setData]     = useState<any>(null)
  const [loading,  setLoading]  = useState(true)
  const [msg,      setMsg]      = useState('')
  const [scanning, setScanning] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [page,     setPage]     = useState(1)
  const [search,   setSearch]   = useState('')

  const user = getUser()

  const load = useCallback(async () => {
    setLoading(true)
    const res = await authFetch('/api/v1/github/repos')
    if (res.ok) setData(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
    const params = new URLSearchParams(window.location.search)
    if (params.get('connected') === '1') {
      setMsg('✓ GitHub connected successfully!')
    } else if (params.get('error') === 'github_account_already_linked') {
      const ghUser = params.get('github_user') ?? 'your GitHub account'
      setMsg(`✗ @${ghUser} is already linked to a different XCloak account.`)
    } else if (params.get('error')) {
      setMsg(`✗ ${params.get('error')?.replaceAll('_', ' ')}`)
    }
    window.history.replaceState({}, '', '/github')
  }, [load])

  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(''), 5000)
    return () => clearTimeout(t)
  }, [msg])

  function startOAuth() {
    if (!user?.username) { setMsg('✗ Please log in first'); return }
    if (!GH_CLIENT_ID)   { setMsg('✗ GITHUB_CLIENT_ID not configured'); return }
    const scope    = 'repo,read:user,write:repo_hook'
    const state    = user.username
    const redirect = encodeURIComponent(`${APP_URL}/api/v1/github/callback`)
    window.location.href =
      `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=${scope}&state=${state}&redirect_uri=${redirect}`
  }

  async function toggleRepo(repoId: string, enable: boolean) {
    setScanning(repoId)
    const res = await authFetch('/api/v1/github/repos', {
      method: 'POST',
      body:   JSON.stringify({ action: enable ? 'enable' : 'disable', repoId }),
    })
    const d = await res.json()
    setMsg(d.message ?? (res.ok ? '✓ Done' : '✗ Failed'))
    await load()
    setScanning(null)
  }

  async function syncRepos() {
    const res = await authFetch('/api/v1/github/repos', {
      method: 'POST',
      body:   JSON.stringify({ action: 'sync' }),
    })
    const d = await res.json()
    setMsg(d.message ?? '✓ Synced')
    await load()
  }

  async function triggerManualScan(repoId: string, fullName: string) {
    setScanning(repoId)
    const res = await authFetch('/api/v1/github/repos', {
      method: 'POST',
      body:   JSON.stringify({ action: 'manual_scan', repoId }),
    })
    const d = await res.json()
    setMsg(d.message ?? (res.ok ? `✓ Scan queued for ${fullName}` : '✗ Failed'))
    setTimeout(load, 2000)
    setScanning(null)
  }

  async function disconnect() {
    if (!confirm('Disconnect GitHub? This will remove all webhooks and scan history.')) return
    const res = await authFetch('/api/v1/github/repos', { method: 'DELETE' })
    const d   = await res.json()
    setMsg(d.message ?? '✓ Disconnected')
    setData(null)
    await load()
  }

  const allRepos: any[] = useMemo(() => {
    if (!data?.repos) return []
    const sorted = sortRepos(data.repos)
    if (!search.trim()) return sorted
    const q = search.toLowerCase()
    return sorted.filter((r: any) =>
      r.fullName.toLowerCase().includes(q) ||
      (r.language ?? '').toLowerCase().includes(q)
    )
  }, [data?.repos, search])

  const totalPages = Math.ceil(allRepos.length / PAGE_SIZE)
  const pageRepos  = allRepos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [search])

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to connect GitHub</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">GitHub <span style={{ color: '#00ffaa' }}>Integration</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Auto-scan repos on every push and PR — powered by Semgrep + Trufflehog
          </p>
        </div>
        {data?.connected && (
          <div className="flex gap-2">
            <button onClick={syncRepos}
              className="px-3 py-2 rounded-lg font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
              ⟳ Sync Repos
            </button>
            <button onClick={disconnect}
              className="px-3 py-2 rounded-lg font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80"
              style={{ background: 'rgba(255,58,92,0.08)', borderColor: 'rgba(255,58,92,0.2)', color: '#ff3a5c' }}>
              Disconnect
            </button>
          </div>
        )}
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

      {/* Not connected */}
      {!loading && !data?.connected && (
        <div className="glass rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">🐙</div>
          <h2 className="text-xl font-black text-slate-100 mb-2">Connect your GitHub</h2>
          <p className="font-mono text-[11px] text-slate-500 mb-6 max-w-md mx-auto">
            Link your GitHub account to automatically scan repos for vulnerabilities on every push
            and pull request. Powered by Semgrep (200+ rules) and Trufflehog (secret detection).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left max-w-xl mx-auto">
            {[
              { icon: '🔍', title: 'SAST Scanning',    desc: 'Semgrep finds SQLi, XSS, path traversal across 20+ languages' },
              { icon: '🔑', title: 'Secret Detection', desc: 'Trufflehog finds API keys, tokens, passwords in code + git history' },
              { icon: '📦', title: 'Dependency Audit', desc: 'npm audit + pip safety check for vulnerable dependencies' },
            ].map(f => (
              <div key={f.title} className="p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-xl mb-1">{f.icon}</div>
                <div className="font-mono text-[11px] font-bold text-slate-200 mb-1">{f.title}</div>
                <div className="font-mono text-[10px] text-slate-600">{f.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={startOAuth}
            className="px-8 py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all hover:opacity-90"
            style={{ background: 'rgba(0,255,170,0.12)', border: '1px solid rgba(0,255,170,0.35)', color: '#00ffaa' }}>
            🐙 Connect GitHub →
          </button>
          <p className="font-mono text-[10px] text-slate-700 mt-3">
            We only request repo read access and webhook write access. We never push code.
          </p>
        </div>
      )}

      {/* Connected */}
      {!loading && data?.connected && (
        <>
          {/* Account info */}
          <div className="glass p-4 rounded-xl mb-5 flex items-center gap-3">
            {data.avatarUrl && (
              <img src={data.avatarUrl} alt={data.githubLogin} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <div className="font-mono text-[13px] font-bold text-slate-100">@{data.githubLogin}</div>
              <div className="font-mono text-[10px] text-slate-600">
                Connected {new Date(data.installedAt).toLocaleDateString()} ·&nbsp;
                {data.repos.length} repos · {data.repos.filter((r: any) => r.scanEnabled).length} scanning
              </div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#00ffaa' }} />
              <span className="font-mono text-[10px] text-slate-500">Active</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { label: 'Repos',    val: data.repos.length,                                                                  color: '#e2e8f0' },
              { label: 'Scanning', val: data.repos.filter((r: any) => r.scanEnabled).length,                                color: '#00ffaa' },
              { label: 'Scanned',  val: data.repos.filter((r: any) => r.latestScan?.status === 'completed').length,         color: '#00aaff' },
              { label: 'Findings', val: data.repos.reduce((a: number, r: any) => a + (r.latestScan?.findings ?? 0), 0),    color: '#fb923c' },
            ].map(s => (
              <div key={s.label} className="glass p-3 text-center rounded-lg">
                <div className="font-mono text-xl font-black" style={{ color: s.color }}>{s.val}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search bar + label */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">
              Repositories
            </div>
            <div className="ml-auto flex items-center gap-2">
              {search && (
                <span className="font-mono text-[10px] text-slate-600">
                  {allRepos.length} result{allRepos.length !== 1 ? 's' : ''}
                </span>
              )}
              <input
                type="text"
                placeholder="Search repos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-1.5 rounded-lg font-mono text-[11px] outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border:     '1px solid rgba(255,255,255,0.08)',
                  color:      '#e2e8f0',
                  width:      '180px',
                }}
              />
            </div>
          </div>

          {/* Repo list */}
          <div className="space-y-2 mb-4">
            {allRepos.length === 0 && (
              <div className="glass p-8 text-center font-mono text-[11px] text-slate-600">
                {search ? 'No repos match your search.' : 'No repos found. Click "Sync Repos" to refresh.'}
              </div>
            )}
            {pageRepos.map((repo: any) => (
              <div key={repo.id} className="rounded-xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>

                <div className="p-4 flex items-center gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <a href={`https://github.com/${repo.fullName}`} target="_blank" rel="noreferrer"
                        className="font-mono text-[13px] font-bold text-slate-100 hover:text-accent transition-colors">
                        {repo.fullName}
                      </a>
                      {repo.private && (
                        <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                          style={{ background: 'rgba(255,255,255,0.06)', color: '#64748b' }}>
                          private
                        </span>
                      )}
                      {repo.language && (
                        <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                          style={{ background: 'rgba(0,170,255,0.1)', color: '#00aaff', border: '1px solid rgba(0,170,255,0.2)' }}>
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-slate-600">
                      {repo.lastScannedAt
                        ? `Last scanned ${new Date(repo.lastScannedAt).toLocaleString()}`
                        : 'Never scanned'}
                      {repo.latestScan && (
                        <span className="ml-2" style={{ color: STATUS_COLOR[repo.latestScan.status] ?? '#64748b' }}>
                          · {repo.latestScan.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {(repo.latestScan?.findings ?? 0) > 0 && (
                    <div className="text-center px-3 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,58,92,0.1)', border: '1px solid rgba(255,58,92,0.2)' }}>
                      <div className="font-mono text-[14px] font-black" style={{ color: '#ff3a5c' }}>
                        {repo.latestScan.findings}
                      </div>
                      <div className="font-mono text-[8px] text-slate-600 uppercase">findings</div>
                    </div>
                  )}
                  {repo.latestScan?.findings === 0 && repo.latestScan?.status === 'completed' && (
                    <div className="font-mono text-[10px]" style={{ color: '#00ffaa' }}>✓ Clean</div>
                  )}

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleRepo(repo.id, !repo.scanEnabled)}
                      disabled={scanning === repo.id}
                      className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all hover:opacity-80 disabled:opacity-50"
                      style={repo.scanEnabled
                        ? { background: 'rgba(0,255,170,0.08)', border: '1px solid rgba(0,255,170,0.2)', color: '#00ffaa' }
                        : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>
                      {scanning === repo.id ? '⟳' : repo.scanEnabled ? '● Scanning' : '○ Enable'}
                    </button>
                    {repo.scanEnabled && (
                      <button
                        onClick={() => triggerManualScan(repo.id, repo.fullName)}
                        disabled={scanning === repo.id}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-50"
                        style={{ background: 'rgba(0,170,255,0.08)', borderColor: 'rgba(0,170,255,0.2)', color: '#00aaff' }}>
                        ⚡ Scan now
                      </button>
                    )}
                    {repo.latestScan && (
                      <button
                        onClick={() => setExpanded(expanded === repo.id ? null : repo.id)}
                        className="px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80"
                        style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#475569' }}>
                        {expanded === repo.id ? 'Hide ▲' : 'Details ▼'}
                      </button>
                    )}
                  </div>
                </div>

                {expanded === repo.id && repo.latestScan && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <RepoScanDetails scanId={repo.latestScan.id} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-2 mb-6">
              <span className="font-mono text-[10px] text-slate-600">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, allRepos.length)} of {allRepos.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-2.5 py-1 rounded font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-30"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                  .reduce<(number | string)[]>((acc, n, i, arr) => {
                    if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push(`ellipsis-${n}`)
                    acc.push(n)
                    return acc
                  }, [])
                  .map(n =>
                    typeof n === 'string'
                      ? <span key={n} className="px-1 font-mono text-[11px] text-slate-600">…</span>
                      : <button
                          key={n}
                          onClick={() => setPage(n)}
                          className="w-7 h-7 rounded font-mono text-[11px] cursor-pointer border transition-all"
                          style={page === n
                            ? { background: 'rgba(0,255,170,0.12)', borderColor: 'rgba(0,255,170,0.3)', color: '#00ffaa' }
                            : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                          {n}
                        </button>
                  )}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-2.5 py-1 rounded font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-30"
                  style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                  →
                </button>
              </div>
            </div>
          )}

          {/* How it works */}
          <div className="mt-2 glass p-5 rounded-xl">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">How it works</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { step: '01', text: 'Enable scanning on a repo → XCloak registers a GitHub webhook' },
                { step: '02', text: 'You push code or open a PR → GitHub sends event to XCloak' },
                { step: '03', text: 'ESO clones the repo, runs Semgrep + Trufflehog in parallel' },
                { step: '04', text: 'Findings posted as PR review comments + stored in your dashboard' },
              ].map(s => (
                <div key={s.step} className="flex gap-2.5">
                  <span className="font-mono text-[10px] font-bold shrink-0 mt-0.5" style={{ color: '#00ffaa' }}>{s.step}</span>
                  <span className="font-mono text-[10px] text-slate-500 leading-relaxed">{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 rounded-full animate-spin"
            style={{ borderColor: '#00ffaa', borderTopColor: 'transparent' }} />
        </div>
      )}
    </div>
  )
}

// ── Scan details with scrollable findings + severity filter ───────────────────
function RepoScanDetails({ scanId }: { scanId: string }) {
  const [scan,      setScan]      = useState<any>(null)
  const [showAll,   setShowAll]   = useState(false)
  const [filterSev, setFilterSev] = useState<string>('all')

  useEffect(() => {
    authFetch(`/api/v1/github/repos?scanId=${scanId}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.scan) setScan(d.scan) })
      .catch(() => null)
  }, [scanId])

  if (!scan) return (
    <div className="px-4 py-3 font-mono text-[10px] text-slate-600 animate-pulse">
      Loading scan details...
    </div>
  )

  const allFindings: any[] = scan.result?.findings ?? []
  const filtered = filterSev === 'all' ? allFindings : allFindings.filter(f => f.severity === filterSev)
  const displayed = showAll ? filtered : filtered.slice(0, 20)

  const counts = allFindings.reduce((acc: Record<string, number>, f) => {
    acc[f.severity] = (acc[f.severity] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="px-4 py-4">
      {/* Scan meta */}
      <div className="flex flex-wrap gap-4 mb-4 font-mono text-[10px] text-slate-500">
        <span>Commit: <span className="text-slate-300">{scan.commitSha?.slice(0, 8) ?? '—'}</span></span>
        <span>Branch: <span className="text-slate-300">{scan.branch ?? '—'}</span></span>
        {scan.prNumber && <span>PR: <span className="text-slate-300">#{scan.prNumber}</span></span>}
        <span>Duration: <span className="text-slate-300">
          {scan.startedAt && scan.completedAt
            ? `${((new Date(scan.completedAt).getTime() - new Date(scan.startedAt).getTime()) / 1000).toFixed(0)}s`
            : '—'}
        </span></span>
        <span>Total: <span className="text-slate-300">{allFindings.length} findings</span></span>
      </div>

      {allFindings.length === 0 ? (
        <div className="font-mono text-[11px] py-2"
          style={{ color: scan.status === 'completed' ? '#00ffaa' : '#64748b' }}>
          {scan.status === 'completed' ? '✓ No findings — clean scan' : `Status: ${scan.status}`}
        </div>
      ) : (
        <>
          {/* Severity filter */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {[['all', `ALL (${allFindings.length})`], ...(['critical','high','medium','low','info']
              .filter(s => counts[s] > 0)
              .map(s => [s, `${s.toUpperCase()} (${counts[s]})`]))
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

          {/* Scrollable findings */}
          <div style={{
            maxHeight: showAll ? 'none' : '480px',
            overflowY: showAll ? 'visible' : 'auto',
          }}>
            <div className="space-y-1.5">
              {displayed.map((f: any, i: number) => (
                <div key={i} className="p-3 rounded-lg"
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-[9px] px-1.5 py-[1px] rounded shrink-0 mt-0.5"
                      style={{
                        background: `${SEVERITY_COLOR[f.severity] ?? '#64748b'}18`,
                        color:       SEVERITY_COLOR[f.severity]  ?? '#64748b',
                        border:     `1px solid ${SEVERITY_COLOR[f.severity] ?? '#64748b'}30`,
                      }}>
                      {(f.severity ?? 'info').toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] text-slate-200 font-bold">{f.rule_id ?? f.title}</span>
                        {f.tool && <span className="font-mono text-[9px] text-slate-600">[{f.tool}]</span>}
                      </div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                        {f.file}{f.line ? `:${f.line}` : ''}
                      </div>
                      {f.message && (
                        <div className="font-mono text-[10px] text-slate-500 mt-1 leading-relaxed">{f.message}</div>
                      )}
                      {f.fix && (
                        <div className="font-mono text-[10px] mt-1.5 px-2 py-1.5 rounded"
                          style={{ background: 'rgba(0,255,170,0.05)', color: '#00ffaa99', borderLeft: '2px solid rgba(0,255,170,0.2)' }}>
                          Fix: {f.fix}
                        </div>
                      )}
                      {(f.cwe?.length > 0 || f.owasp?.length > 0) && (
                        <div className="flex gap-2 mt-1.5 flex-wrap">
                          {f.cwe?.slice(0, 2).map((c: string) => (
                            <span key={c} className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                              style={{ background: 'rgba(251,146,60,0.1)', color: '#fb923c99' }}>{c}</span>
                          ))}
                          {f.owasp?.slice(0, 2).map((o: string) => (
                            <span key={o} className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                              style={{ background: 'rgba(0,170,255,0.1)', color: '#00aaff99' }}>{o}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filtered.length > 20 && (
            <button
              onClick={() => setShowAll(s => !s)}
              className="mt-3 w-full py-2 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
              {showAll ? `▲ Show fewer` : `▼ Show all ${filtered.length} findings`}
            </button>
          )}
        </>
      )}
    </div>
  )
}
