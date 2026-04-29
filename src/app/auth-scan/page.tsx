'use client'
import { useEffect, useState, useRef } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

// ── Types ──────────────────────────────────────────────────────────────────
interface ScanState {
  scan_id: string; status: 'running'|'complete'|'error'
  phase: string; progress: number; target_url: string
  auth_result?: { ok: boolean; method: string; error?: string }
  sitemap: { url: string; status: number; title: string }[]
  forms:   { page_url: string; action: string; method: string; inputs: any[] }[]
  findings: Finding[]; xhr_calls: any[]; error?: string
}
interface Finding {
  testId: string; url: string; severity: 'critical'|'high'|'medium'|'low'|'info'
  title: string; detail: string; evidence: string
}

// ── Constants ──────────────────────────────────────────────────────────────
const SEV: Record<string,string> = {
  critical:'#ff3a5c', high:'#fb923c', medium:'#facc15', low:'#00aaff', info:'#475569'
}
const PHASES: Record<string,string> = {
  authenticating: '🔐 Authenticating...', crawling: '🕷 Crawling pages...',
  testing: '🔬 Running vulnerability tests...', done: '✅ Complete',
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

function SevBadge({ sev }: { sev: string }) {
  const c = SEV[sev] ?? '#64748b'
  return <span className="font-mono text-[9px] font-black px-1.5 py-[2px] rounded"
    style={{ background:`${c}18`, color:c, border:`1px solid ${c}30` }}>{sev.toUpperCase()}</span>
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function AuthScanPage() {
  const user = getUser()
  const [step, setStep] = useState<'config'|'scanning'|'results'>('config')
  const [scan, setScan] = useState<ScanState|null>(null)
  const [scanId, setScanId] = useState('')
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<string|null>(null)
  const [activeTab, setActiveTab] = useState<'findings'|'sitemap'|'forms'>('findings')
  const [filterSev, setFilterSev] = useState('all')
  const pollRef = useRef<ReturnType<typeof setInterval>|null>(null)

  // Form state
  const [targetUrl, setTargetUrl]   = useState('https://')
  const [authType,  setAuthType]    = useState<'none'|'form'|'cookie'|'token'>('none')
  const [username,  setUsername]    = useState('')
  const [password,  setPassword]    = useState('')
  const [loginUrl,  setLoginUrl]    = useState('')
  const [loginUrlTouched, setLoginUrlTouched] = useState(false)
  const [successUrl,setSuccessUrl]  = useState('')
  const [cookieStr, setCookieStr]   = useState('')
  const [tokenVal,  setTokenVal]    = useState('')
  const [tokenType, setTokenType]   = useState('Bearer')
  const [headerName,setHeaderName]  = useState('Authorization')
  const [maxPages,  setMaxPages]    = useState(20)

  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#e2e8f0' }

  function buildAuthConfig() {
    if (authType === 'form')   return { type:'form',   username, password, login_url: loginUrl || targetUrl, success_url_contains: successUrl }
    if (authType === 'cookie') return { type:'cookie', cookies: cookieStr }
    if (authType === 'token')  return { type:'token',  token: tokenVal, token_type: tokenType, header_name: headerName }
    return { type: 'none' }
  }

  async function startScan() {
    if (!targetUrl || targetUrl === 'https://') { setError('Enter a target URL'); return }
    setError(''); setStep('scanning'); setScan(null)
    try {
      const res = await authFetch('/api/v1/auth-scan', {
        method: 'POST',
        body: JSON.stringify({ target_url: targetUrl, auth_config: buildAuthConfig(), max_pages: maxPages }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Scan failed to start')
      setScanId(d.scan_id)
    } catch (e: any) { setStep('config'); setError(e.message) }
  }

  useEffect(() => {
    if (!scanId) return
    pollRef.current = setInterval(async () => {
      try {
        const res = await authFetch(`/api/v1/auth-scan?scan_id=${scanId}`)
        if (!res.ok) return
        const d: ScanState = await res.json()
        setScan(d)
        if (d.status === 'complete' || d.status === 'error') {
          clearInterval(pollRef.current!); setStep('results')
        }
      } catch {}
    }, 2500)
    return () => clearInterval(pollRef.current!)
  }, [scanId])

  // Derived
  const findings   = scan?.findings ?? []
  const sevCounts  = findings.reduce((a,f) => { a[f.severity]=(a[f.severity]??0)+1; return a }, {} as Record<string,number>)
  const filtered   = findings.filter(f => filterSev==='all' || f.severity===filterSev)

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center"><div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in</div></div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Authenticated <span style={{color:'#6366f1'}}>Web Scanner</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Log in to your app · crawl authenticated pages · test for XSS, IDOR, CSRF, open redirect, missing headers
          </p>
        </div>
        {step !== 'config' && (
          <button onClick={() => { setStep('config'); setScanId(''); setScan(null) }}
            className="px-3 py-2 rounded-xl font-mono text-[10px] cursor-pointer border transition-all"
            style={{ borderColor:'rgba(255,255,255,0.1)', color:'#64748b' }}>← New Scan</button>
        )}
      </div>

      {/* ── CONFIG ─────────────────────────────────────────────────── */}
      {step === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <div className="space-y-4">
            {/* Target */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Target URL *</div>
              <input value={targetUrl} onChange={e => setTargetUrl(e.target.value)}
                placeholder="https://app.yoursite.com" className={inp} style={inpStyle}/>
              {error && <div className="mt-2 font-mono text-[10px] px-3 py-2 rounded"
                style={{background:'rgba(255,58,92,0.08)',color:'#ff3a5c'}}>✗ {error}</div>}
            </div>

            {/* Auth method */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Authentication Method</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {([
                  ['none',   '🔓', 'No Auth',       'Scan public pages'],
                  ['form',   '📝', 'Form Login',    'Fill & submit login form'],
                  ['cookie', '🍪', 'Session Cookie','Paste your session cookie'],
                  ['token',  '🔑', 'Bearer / API Key','Authorization header'],
                ] as const).map(([type, icon, label, desc]) => (
                  <button key={type} onClick={() => setAuthType(type as any)}
                    className="p-3 rounded-xl border cursor-pointer transition-all text-left"
                    style={authType===type
                      ? {background:'rgba(99,102,241,0.1)',borderColor:'rgba(99,102,241,0.4)',color:'#6366f1'}
                      : {background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.08)',color:'#475569'}}>
                    <div className="text-xl mb-1">{icon}</div>
                    <div className="font-mono text-[10px] font-bold">{label}</div>
                    <div className="font-mono text-[8px] text-slate-700 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>

              {/* Auth fields */}
              {authType === 'form' && (
                <div className="space-y-3">
                  {/* Login URL — most important field, shown first */}
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 font-bold block mb-1">
                      Login Page URL *
                    </label>
                    <input value={loginUrl} onChange={e => setLoginUrl(e.target.value)}
                      placeholder="https://app.example.com/login"
                      className={inp} style={{...inpStyle, border: loginUrl ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,165,0,0.3)'}}/>
                    <p className="font-mono text-[9px] mt-1" style={{color: loginUrl ? '#475569' : '#fb923c'}}>
                      {loginUrl
                        ? '✓ Login URL set'
                        : "⚠ Set this to your actual login page (e.g. /login, /auth/signin) — not your app's homepage or admin URL"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[9px] text-slate-600 block mb-1">Username / Email</label>
                      <input value={username} onChange={e => setUsername(e.target.value)}
                        placeholder="user@example.com" className={inp} style={inpStyle}/>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-slate-600 block mb-1">Password</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••" className={inp} style={inpStyle}/>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">
                      Success URL Contains <span className="text-slate-700">(optional — confirms login worked)</span>
                    </label>
                    <input value={successUrl} onChange={e => setSuccessUrl(e.target.value)}
                      placeholder="dashboard" className={inp} style={inpStyle}/>
                  </div>

                  {/* Quick-fill examples */}
                  <div>
                    <div className="font-mono text-[8px] text-slate-700 mb-1.5">Common login URL patterns:</div>
                    <div className="flex gap-1.5 flex-wrap">
                      {['/login', '/auth/signin', '/auth/login', '/sign-in', '/users/sign_in'].map(path => (
                        <button key={path} type="button"
                          onClick={() => {
                            const base = targetUrl.endsWith('/') ? targetUrl.slice(0,-1).split('/').slice(0,3).join('/') : targetUrl.split('/').slice(0,3).join('/')
                            setLoginUrl(base + path)
                          }}
                          className="font-mono text-[9px] px-2 py-1 rounded cursor-pointer border transition-all"
                          style={{background:'rgba(255,255,255,0.04)',borderColor:'rgba(255,255,255,0.08)',color:'#475569'}}>
                          {path}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="font-mono text-[9px] text-slate-700">
                    Auto-detects form fields (username, email, password) by name/id/placeholder. If detection fails, the form fields are probably rendered by JavaScript — try the Cookie method instead.
                  </p>
                </div>
              )}

              {authType === 'cookie' && (
                <div>
                  <label className="font-mono text-[9px] text-slate-600 block mb-1">Session Cookie String</label>
                  <textarea value={cookieStr} onChange={e => setCookieStr(e.target.value)} rows={3}
                    placeholder={"sessionid=abc123; csrftoken=xyz; _ga=GA1.2..."}
                    className={inp + " resize-none"} style={inpStyle}/>
                  <p className="font-mono text-[9px] text-slate-700 mt-1">
                    Get from browser DevTools → Application → Cookies → copy all cookie values for your app.
                  </p>
                </div>
              )}

              {authType === 'token' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[9px] text-slate-600 block mb-1">Header Name</label>
                      <input value={headerName} onChange={e => setHeaderName(e.target.value)}
                        placeholder="Authorization" className={inp} style={inpStyle}/>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-slate-600 block mb-1">Token Prefix</label>
                      <input value={tokenType} onChange={e => setTokenType(e.target.value)}
                        placeholder="Bearer" className={inp} style={inpStyle}/>
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">Token Value</label>
                    <input type="password" value={tokenVal} onChange={e => setTokenVal(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." className={inp} style={inpStyle}/>
                  </div>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Options</div>
              <div className="flex items-center gap-3">
                <label className="font-mono text-[10px] text-slate-400 shrink-0">Max pages to crawl</label>
                <input type="range" min="5" max="50" value={maxPages}
                  onChange={e => setMaxPages(Number(e.target.value))} className="flex-1"/>
                <span className="font-mono text-[11px] font-bold" style={{color:'#6366f1', minWidth:'28px'}}>{maxPages}</span>
              </div>
              <p className="font-mono text-[9px] text-slate-700 mt-2">Higher = more coverage but slower. 20 is a good balance.</p>
            </div>

            <button onClick={startScan}
              className="w-full py-3 rounded-xl font-mono text-[12px] font-black cursor-pointer transition-all hover:opacity-90"
              style={{background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.4)',color:'#6366f1'}}>
              🚀 Start Authenticated Scan
            </button>
          </div>

          {/* Right: what gets tested */}
          <div className="glass rounded-xl p-4 self-start">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">What Gets Tested</div>
            <div className="space-y-3">
              {[
                ['🔐','Auth Bypass','Login, then verify session is actually used'],
                ['🕷','Deep Crawl','Follows links only visible when logged in'],
                ['🛡','Security Headers','CSP, HSTS, X-Frame-Options, Permissions-Policy'],
                ['🍪','Cookie Flags','HttpOnly, Secure, SameSite on session cookies'],
                ['🔄','Open Redirect','URL params pointing to external domains'],
                ['🛡','CSRF','POST forms missing CSRF tokens'],
                ['👁','IDOR','Numeric resource IDs — try adjacent values'],
                ['💉','XSS','Reflected XSS via form field injection'],
                ['🔒','Insecure Forms','Forms submitting over HTTP'],
                ['🕵','Sensitive Pages','Admin, debug, .env, Swagger UI exposure'],
              ].map(([icon,name,desc]) => (
                <div key={name as string} className="flex items-start gap-2">
                  <span className="shrink-0">{icon}</span>
                  <div>
                    <span className="font-mono text-[10px] text-slate-300 font-bold">{name}</span>
                    <p className="font-mono text-[9px] text-slate-600 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <p className="font-mono text-[9px] text-slate-700">
                Powered by Playwright — headless Chromium. Only test apps you own or have permission to test.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── SCANNING ───────────────────────────────────────────────── */}
      {step === 'scanning' && (
        <div className="space-y-4">
          <div className="glass rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">🕷</div>
            <div className="font-mono text-[14px] font-black text-slate-200 mb-2">
              {PHASES[scan?.phase ?? ''] ?? scan?.phase ?? 'Starting...'}
            </div>
            <div className="font-mono text-[11px] text-slate-500 mb-5">
              {scan?.target_url}
            </div>
            <div className="max-w-xs mx-auto mb-3">
              <div className="h-2 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
                <div className="h-2 rounded-full transition-all duration-1000"
                  style={{width:`${scan?.progress ?? 0}%`, background:'#6366f1'}}/>
              </div>
            </div>
            <div className="font-mono text-[10px] text-slate-600">{scan?.progress ?? 0}%</div>

            {/* Live auth status */}
            {scan?.auth_result && (
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[10px]"
                style={{
                  background: scan.auth_result.ok ? 'rgba(0,255,170,0.08)' : 'rgba(255,58,92,0.08)',
                  color:      scan.auth_result.ok ? '#00ffaa' : '#ff3a5c',
                }}>
                {scan.auth_result.ok ? '✓' : '✗'} Auth: {scan.auth_result.method}
                {scan.auth_result.error && ` — ${scan.auth_result.error}`}
              </div>
            )}

            {/* Live page count */}
            {(scan?.sitemap?.length ?? 0) > 0 && (
              <div className="font-mono text-[10px] text-slate-600 mt-2">
                {scan!.sitemap.length} pages discovered · {scan!.forms.length} forms
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── RESULTS ────────────────────────────────────────────────── */}
      {step === 'results' && scan && (
        <>
          {scan.status === 'error' && (
            <div className="glass rounded-xl p-5 mb-4"
              style={{border:'1px solid rgba(255,58,92,0.2)',background:'rgba(255,58,92,0.05)'}}>
              <div className="font-mono text-[12px] mb-2" style={{color:'#ff3a5c'}}>✗ Scan failed: {scan.error}</div>
              {scan.error?.includes('auth page') && (
                <div className="font-mono text-[10px] text-slate-400 space-y-1">
                  <div>→ The login URL may be wrong. Check that it points to your actual login form, not a dashboard or admin URL.</div>
                  <div>→ Try using the <strong>Cookie</strong> auth method instead — log in manually in your browser, copy the session cookie, and paste it here.</div>
                </div>
              )}
              {scan.error?.includes('locate login form') && (
                <div className="font-mono text-[10px] text-slate-400 mt-1">
                  → Login form fields couldn't be detected (may be a JS-rendered SPA). Use the Cookie auth method instead.
                </div>
              )}
              {scan.error?.includes('Playwright') && (
                <div className="font-mono text-[10px] text-slate-500 mt-1">
                  Fix: <code className="text-slate-300">pip install playwright && playwright install chromium</code>
                </div>
              )}
            </div>
          )}

          {/* Auth result banner */}
          {scan.auth_result && (
            <div className="mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px] flex items-center gap-2"
              style={{
                background: scan.auth_result.ok ? 'rgba(0,255,170,0.06)' : 'rgba(255,58,92,0.06)',
                border: scan.auth_result.ok ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,58,92,0.2)',
                color: scan.auth_result.ok ? '#00ffaa' : '#ff3a5c',
              }}>
              {scan.auth_result.ok ? '✓' : '✗'}
              <span>{scan.auth_result.ok
                ? `Authentication succeeded (${scan.auth_result.method})`
                : `Authentication failed: ${scan.auth_result.error}`}</span>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
            {[
              {label:'Pages',    val:scan.sitemap.length,  color:'#e2e8f0'},
              {label:'Forms',    val:scan.forms.length,    color:'#e2e8f0'},
              {label:'Findings', val:findings.length,      color:findings.length>0?'#fb923c':'#00ffaa'},
              {label:'Critical', val:sevCounts.critical??0,color:(sevCounts.critical??0)>0?'#ff3a5c':'#00ffaa'},
              {label:'High',     val:sevCounts.high??0,    color:(sevCounts.high??0)>0?'#fb923c':'#00ffaa'},
            ].map(s => (
              <div key={s.label} className="glass p-3 text-center rounded-lg">
                <div className="font-mono text-xl font-black" style={{color:s.color}}>{s.val}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['findings','sitemap','forms'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all capitalize"
                style={activeTab===tab
                  ? {background:'rgba(99,102,241,0.1)',borderColor:'rgba(99,102,241,0.3)',color:'#6366f1'}
                  : {background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.07)',color:'#475569'}}>
                {tab === 'findings' ? `Findings (${findings.length})`
                : tab === 'sitemap' ? `Sitemap (${scan.sitemap.length})`
                : `Forms (${scan.forms.length})`}
              </button>
            ))}
          </div>

          {/* Findings tab */}
          {activeTab === 'findings' && (
            findings.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center">
                <div className="text-4xl mb-3">✅</div>
                <div className="font-mono text-[13px] font-black text-slate-200">No vulnerabilities found</div>
                <div className="font-mono text-[10px] text-slate-500 mt-1">
                  {scan.sitemap.length} pages and {scan.forms.length} forms tested — all checks passed
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {(['all','critical','high','medium','low'] as const).map(s => (
                    <button key={s} onClick={() => setFilterSev(s)}
                      className="px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all"
                      style={filterSev===s
                        ? {background:`${SEV[s]??'#e2e8f0'}18`,borderColor:`${SEV[s]??'#e2e8f0'}50`,color:SEV[s]??'#e2e8f0'}
                        : {background:'rgba(255,255,255,0.03)',borderColor:'rgba(255,255,255,0.07)',color:'#475569'}}>
                      {s==='all'?`All (${findings.length})`:`${s} (${sevCounts[s]??0})`}
                    </button>
                  ))}
                </div>
                <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1">
                  {filtered.map((f,i) => {
                    const isOpen = expanded===`${i}`
                    const c = SEV[f.severity]??'#64748b'
                    return (
                      <div key={i} className="rounded-xl border overflow-hidden cursor-pointer transition-all"
                        style={{borderColor:isOpen?`${c}40`:'rgba(255,255,255,0.06)',background:isOpen?`${c}08`:'rgba(255,255,255,0.02)'}}
                        onClick={() => setExpanded(e => e===`${i}` ? null : `${i}`)}>
                        <div className="flex items-center gap-3 px-4 py-3">
                          <SevBadge sev={f.severity}/>
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-[11px] font-black text-slate-200 truncate">{f.title}</div>
                            <div className="font-mono text-[9px] text-slate-600 truncate">{f.url}</div>
                          </div>
                          <span className="font-mono text-[9px] text-slate-700 shrink-0 px-1.5 py-0.5 rounded"
                            style={{background:'rgba(255,255,255,0.04)'}}>{f.testId}</span>
                          <span className="font-mono text-[10px] text-slate-600 shrink-0">{isOpen?'▲':'▼'}</span>
                        </div>
                        {isOpen && (
                          <div className="px-4 pb-4 border-t border-white/[0.05] space-y-2">
                            <p className="font-mono text-[10px] text-slate-400 mt-3 leading-relaxed">{f.detail}</p>
                            {f.evidence && (
                              <pre className="font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto"
                                style={{background:'rgba(0,0,0,0.4)',color:'#64748b',whiteSpace:'pre-wrap',wordBreak:'break-all'}}>
                                {f.evidence}
                              </pre>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            )
          )}

          {/* Sitemap tab */}
          {activeTab === 'sitemap' && (
            <div className="glass rounded-xl overflow-hidden">
              <div className="max-h-[600px] overflow-y-auto divide-y divide-white/[0.04]">
                {scan.sitemap.map((p,i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <span className="font-mono text-[10px] shrink-0 px-1.5 py-[2px] rounded"
                      style={{
                        background: p.status===200?'rgba(0,255,170,0.08)':p.status>=400?'rgba(255,58,92,0.08)':'rgba(255,255,255,0.06)',
                        color: p.status===200?'#00ffaa':p.status>=400?'#ff3a5c':'#64748b',
                      }}>{p.status||'?'}</span>
                    <span className="font-mono text-[10px] text-slate-400 flex-1 truncate">{p.url}</span>
                    {p.title && <span className="font-mono text-[9px] text-slate-600 truncate max-w-[200px]">{p.title}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forms tab */}
          {activeTab === 'forms' && (
            <div className="space-y-2">
              {scan.forms.length === 0 ? (
                <div className="glass rounded-xl p-8 text-center font-mono text-[11px] text-slate-600">No forms discovered</div>
              ) : scan.forms.map((form,i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[9px] px-1.5 py-[2px] rounded"
                      style={{background:'rgba(0,170,255,0.1)',color:'#00aaff'}}>{form.method}</span>
                    <span className="font-mono text-[10px] text-slate-400 truncate">{form.action}</span>
                  </div>
                  <div className="font-mono text-[9px] text-slate-600 mb-2">Found on: {form.page_url}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {form.inputs.map((inp: any, j: number) => (
                      <span key={j} className="font-mono text-[8px] px-2 py-[2px] rounded"
                        style={{background:'rgba(255,255,255,0.05)',color:'#64748b'}}>
                        {inp.name}{inp.required?'*':''} ({inp.type})
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
