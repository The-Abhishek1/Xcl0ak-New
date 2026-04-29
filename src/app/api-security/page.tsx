'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

// ── Types ─────────────────────────────────────────────────────────────────────
interface Endpoint { method: string; path: string; operationId: string; authRequired: boolean; tags: string[] }
interface Finding  {
  testId: string; endpoint: string; method: string
  severity: 'critical'|'high'|'medium'|'low'|'info'
  title: string; detail: string; requestSnippet: string; responseSnippet: string
}
interface ScanResult {
  scan_id: string; status: 'running'|'complete'|'error'
  progress: number; endpoints: Endpoint[]; findings: Finding[]; error?: string
}

// ── Constants ─────────────────────────────────────────────────────────────────
const SEV: Record<string,string> = { critical:'#ff3a5c', high:'#fb923c', medium:'#facc15', low:'#00aaff', info:'#475569' }
const METHOD_COLOR: Record<string,string> = {
  GET:'#00ffaa', POST:'#00aaff', PUT:'#facc15', PATCH:'#f472b6', DELETE:'#ff3a5c',
  HEAD:'#6366f1', OPTIONS:'#94a3b8',
}
const TEST_LABELS: Record<string,string> = {
  'cors-wildcard':'CORS Wildcard','cors-reflected':'CORS Reflected','cors-null':'CORS Null Origin',
  'jwt-none-alg':'JWT None Alg','jwt-expired':'JWT Expired',
  'auth-bypass':'Auth Bypass','injection-sqli':'SQL Injection','injection-nosql':'NoSQL Injection',
  'injection-ssti':'SSTI','injection-xss':'XSS',
  'mass-assignment':'Mass Assignment','method-override':'Method Override',
  'param-pollution':'Param Pollution','ssrf-critical':'SSRF (Critical)','ssrf-potential':'SSRF',
  'no-rate-limit':'No Rate Limit',
}

// ── Templates ────────────────────────────────────────────────────────────────
interface Template { id: string; label: string; description: string; icon: string; baseUrl: string; spec: object }

const TEMPLATES: Template[] = [
  {
    id: 'generic-rest',
    label: 'Generic REST API',
    icon: '🌐',
    description: 'CRUD endpoints with auth — good starting point for any REST API',
    baseUrl: 'https://api.example.com',
    spec: {
      openapi: "3.0.0",
      info: { title: "REST API", version: "1.0.0" },
      servers: [{ url: "https://api.example.com" }],
      paths: {
        "/auth/login":        { post: { summary:"Login", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},password:{type:"string"}}, example:{username:"admin",password:"password"} }}}}}},
        "/auth/register":     { post: { summary:"Register", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},email:{type:"string"},password:{type:"string"}}, example:{username:"user",email:"user@test.com",password:"password123"} }}}}}},
        "/auth/forgot-password": { post: { summary:"Forgot password", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{email:{type:"string"}}, example:{email:"user@test.com"} }}}}}},
        "/users":             { get: { summary:"List users", security:[{bearerAuth:[]}], parameters:[{name:"page",in:"query",schema:{type:"string"}},{name:"limit",in:"query",schema:{type:"string"}}] }},
        "/users/{id}":        { get: { summary:"Get user", security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] },
                                put: { summary:"Update user", security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{name:{type:"string"},email:{type:"string"},role:{type:"string"}}, example:{name:"Alice"} }}}}}},
        "/users/{id}/avatar": { post: { summary:"Upload avatar", security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/search":            { get: { summary:"Search", parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"url",in:"query",schema:{type:"string"}},{name:"callback",in:"query",schema:{type:"string"}}] }},
        "/admin/users":       { get: { summary:"Admin: list users", security:[{bearerAuth:[]}] }},
        "/admin/users/{id}":  { delete: { summary:"Admin: delete user", security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
      },
      components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
    }
  },
  {
    id: 'xcloak',
    label: 'XCloak (your app)',
    icon: '🔭',
    description: 'Pre-built spec for xcloak.tech — scan your own API instantly',
    baseUrl: 'https://xcloak.tech',
    spec: {
      openapi: "3.0.0",
      info: { title: "XCloak API", version: "1.0.0" },
      servers: [{ url: "https://xcloak.tech" }],
      paths: {
        "/api/v1/auth/login":    { post: { summary:"Login", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},password:{type:"string"}}, example:{username:"test",password:"test"} }}}}}},
        "/api/v1/auth/register": { post: { summary:"Register", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},email:{type:"string"},password:{type:"string"}}, example:{username:"testuser",email:"test@test.com",password:"password123"} }}}}}},
        "/api/v1/auth/forgot-password": { post: { summary:"Forgot password", requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{email:{type:"string"}}, example:{email:"test@test.com"} }}}}}},
        "/api/v1/exploits":      { get: { summary:"List exploits", parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"page",in:"query",schema:{type:"string"}},{name:"severity",in:"query",schema:{type:"string"}}] }},
        "/api/v1/exploits/{id}": { get: { summary:"Get exploit", parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}], security:[{bearerAuth:[]}] }},
        "/api/v1/cve":           { get: { summary:"CVE search", parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"url",in:"query",schema:{type:"string"}}] }},
        "/api/v1/upload":        { post: { summary:"Upload file", security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{filename:{type:"string"},content:{type:"string"}} }}}}}},
        "/api/v1/monitor":       { get: { summary:"List monitored assets", security:[{bearerAuth:[]}] }, post: { summary:"Add asset", security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{target:{type:"string"},type:{type:"string"},label:{type:"string"}}, example:{target:"xcloak.tech",type:"domain",label:"test"} }}}}}},
        "/api/v1/cloud":         { get: { summary:"List cloud accounts", security:[{bearerAuth:[]}] }},
        "/api/v1/compliance":    { get: { summary:"Compliance gap analysis", security:[{bearerAuth:[]}], parameters:[{name:"framework",in:"query",schema:{type:"string"}},{name:"report",in:"query",schema:{type:"string"}}] }},
        "/api/v1/ai-scan":       { post: { summary:"AI prompt injection scan", security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{target_url:{type:"string"},api_key:{type:"string"}} }}}}}},
      },
      components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
    }
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce API',
    icon: '🛒',
    description: 'Marketplace API with products, orders, payments — tests BOLA on order IDs',
    baseUrl: 'https://api.shop.example.com',
    spec: {
      openapi: "3.0.0",
      info: { title: "E-Commerce API", version: "1.0.0" },
      servers: [{ url: "https://api.shop.example.com" }],
      paths: {
        "/auth/login":           { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{email:{type:"string"},password:{type:"string"}}, example:{email:"user@test.com",password:"password"} }}}}}},
        "/products":             { get: { parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"category",in:"query",schema:{type:"string"}},{name:"url",in:"query",schema:{type:"string"}}] }},
        "/products/{id}":        { get: { parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/orders":               { get: { security:[{bearerAuth:[]}] }, post: { security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{product_id:{type:"string"},quantity:{type:"string"},price:{type:"string"},discount:{type:"string"}}, example:{product_id:"123",quantity:"1",price:"9.99"} }}}}}},
        "/orders/{id}":          { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/orders/{id}/cancel":   { post: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/users/me":             { get: { security:[{bearerAuth:[]}] }, patch: { security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{name:{type:"string"},email:{type:"string"},role:{type:"string"},isAdmin:{type:"string"}}, example:{name:"Alice"} }}}}}},
        "/payments/webhook":     { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{event:{type:"string"},amount:{type:"string"},redirect_url:{type:"string"}} }}}}}},
        "/admin/orders":         { get: { security:[{bearerAuth:[]}] }},
      },
      components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
    }
  },
  {
    id: 'saas',
    label: 'SaaS / Multi-tenant',
    icon: '🏢',
    description: 'Multi-tenant SaaS with orgs, teams, and billing — tests tenant isolation',
    baseUrl: 'https://api.saas.example.com',
    spec: {
      openapi: "3.0.0",
      info: { title: "SaaS API", version: "1.0.0" },
      servers: [{ url: "https://api.saas.example.com" }],
      paths: {
        "/auth/login":               { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{email:{type:"string"},password:{type:"string"}}, example:{email:"admin@company.com",password:"password"} }}}}}},
        "/orgs/{orgId}/members":     { get: { security:[{bearerAuth:[]}], parameters:[{name:"orgId",in:"path",required:true,schema:{type:"string"}}] }, post: { security:[{bearerAuth:[]}], parameters:[{name:"orgId",in:"path",required:true,schema:{type:"string"}}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{email:{type:"string"},role:{type:"string"}}, example:{email:"user@test.com",role:"member"} }}}}}},
        "/orgs/{orgId}/settings":    { get: { security:[{bearerAuth:[]}], parameters:[{name:"orgId",in:"path",required:true,schema:{type:"string"}}] }, patch: { security:[{bearerAuth:[]}], parameters:[{name:"orgId",in:"path",required:true,schema:{type:"string"}}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{name:{type:"string"},plan:{type:"string"},isAdmin:{type:"string"}}, example:{name:"My Org"} }}}}}},
        "/projects/{id}":            { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/projects/{id}/export":     { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}},{name:"callback",in:"query",schema:{type:"string"}},{name:"webhook_url",in:"query",schema:{type:"string"}}] }},
        "/billing/webhook":          { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{event:{type:"string"},redirect:{type:"string"}} }}}}}},
        "/search":                   { get: { security:[{bearerAuth:[]}], parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"org",in:"query",schema:{type:"string"}}] }},
        "/admin/orgs":               { get: { security:[{bearerAuth:[]}] }},
      },
      components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
    }
  },
  {
    id: 'iot',
    label: 'IoT / Device API',
    icon: '📡',
    description: 'IoT device management API — tests command injection, SSRF via device callbacks',
    baseUrl: 'https://iot.example.com',
    spec: {
      openapi: "3.0.0",
      info: { title: "IoT API", version: "1.0.0" },
      servers: [{ url: "https://iot.example.com" }],
      paths: {
        "/auth/device":          { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{device_id:{type:"string"},secret:{type:"string"}}, example:{device_id:"dev-001",secret:"secret"} }}}}}},
        "/devices":              { get: { security:[{bearerAuth:[]}] }},
        "/devices/{id}":         { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }},
        "/devices/{id}/command": { post: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{cmd:{type:"string"},args:{type:"string"},callback_url:{type:"string"}}, example:{cmd:"reboot"} }}}}}},
        "/devices/{id}/logs":    { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}},{name:"source",in:"query",schema:{type:"string"}}] }},
        "/firmware/update":      { post: { security:[{bearerAuth:[]}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{device_id:{type:"string"},url:{type:"string"},version:{type:"string"}}, example:{device_id:"dev-001",url:"https://firmware.example.com/v2.bin"} }}}}}},
        "/webhook":              { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{event:{type:"string"},redirect:{type:"string"},src:{type:"string"}} }}}}}},
      },
      components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
    }
  },
]

// ── URL → Spec builder ────────────────────────────────────────────────────────
function buildSpecFromUrl(baseUrl: string): string {
  const u = baseUrl.replace(/\/$/, '')
  return JSON.stringify({
    openapi: "3.0.0",
    info: { title: `${baseUrl} API`, version: "1.0.0" },
    servers: [{ url: u }],
    paths: {
      "/api/auth/login":      { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},password:{type:"string"}}, example:{username:"admin",password:"password"} }}}}}},
      "/api/auth/register":   { post: { requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{username:{type:"string"},email:{type:"string"},password:{type:"string"}}, example:{username:"user",email:"user@test.com",password:"password123"} }}}}}},
      "/api/users":           { get: { security:[{bearerAuth:[]}] }},
      "/api/users/{id}":      { get: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}] }, put: { security:[{bearerAuth:[]}], parameters:[{name:"id",in:"path",required:true,schema:{type:"string"}}], requestBody:{ content:{ "application/json":{ schema:{ type:"object", properties:{name:{type:"string"},role:{type:"string"},isAdmin:{type:"boolean"}}, example:{name:"Alice"} }}}}}},
      "/api/search":          { get: { parameters:[{name:"q",in:"query",schema:{type:"string"}},{name:"url",in:"query",schema:{type:"string"}},{name:"callback",in:"query",schema:{type:"string"}}] }},
      "/api/upload":          { post: { security:[{bearerAuth:[]}] }},
      "/api/admin":           { get: { security:[{bearerAuth:[]}] }},
    },
    components: { securitySchemes: { bearerAuth: { type:"http", scheme:"bearer" } } }
  }, null, 2)
}

function authFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  return fetch(path, {
    ...opts,
    headers: { 'Content-Type':'application/json', ...(token ? { Authorization:`Bearer ${token}` } : {}), ...opts?.headers },
  })
}

// ── Method badge ──────────────────────────────────────────────────────────────
function MethodBadge({ method }: { method: string }) {
  const color = METHOD_COLOR[method] ?? '#64748b'
  return (
    <span className="font-mono text-[9px] font-black px-1.5 py-[2px] rounded"
      style={{ background:`${color}18`, color, border:`1px solid ${color}30`, minWidth:'42px', display:'inline-block', textAlign:'center' }}>
      {method}
    </span>
  )
}

// ── Severity badge ────────────────────────────────────────────────────────────
function SevBadge({ sev }: { sev: string }) {
  const c = SEV[sev] ?? '#64748b'
  return (
    <span className="font-mono text-[9px] font-black px-1.5 py-[2px] rounded"
      style={{ background:`${c}18`, color:c, border:`1px solid ${c}30` }}>
      {sev.toUpperCase()}
    </span>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ApiSecurityPage() {
  const user = getUser()

  // Step: 'config' | 'scanning' | 'results'
  const [step,        setStep]        = useState<'config'|'scanning'|'results'>('config')
  const [specText,    setSpecText]    = useState('')
  const [baseUrl,     setBaseUrl]     = useState('')
  const [authType,    setAuthType]    = useState<'none'|'bearer'|'apikey'|'basic'>('none')
  const [authToken,   setAuthToken]   = useState('')
  const [authHeader,  setAuthHeader]  = useState('X-API-Key')
  const [authUser,    setAuthUser]    = useState('')
  const [authPass,    setAuthPass]    = useState('')
  const [parsedEps,   setParsedEps]   = useState<Endpoint[]>([])
  const [parsing,     setParsing]     = useState(false)
  const [parseErr,    setParseErr]    = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [quickUrl,    setQuickUrl]    = useState('')
  const [scanResult,  setScanResult]  = useState<ScanResult | null>(null)
  const [scanId,      setScanId]      = useState('')
  const [filterSev,   setFilterSev]   = useState('all')
  const [filterTest,  setFilterTest]  = useState('all')
  const [expanded,    setExpanded]    = useState<string|null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval>|null>(null)

  // ── Parse spec ───────────────────────────────────────────────────────────
  async function parseSpec() {
    if (!specText.trim()) { setParseErr('Paste a spec first'); return }
    setParsing(true); setParseErr(''); setParsedEps([])
    try {
      const res = await authFetch('/api/v1/api-security?action=parse', {
        method: 'POST',
        body: JSON.stringify({ spec_json: specText, base_url_override: baseUrl }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Parse failed')
      setParsedEps(d.endpoints ?? [])
    } catch (e: any) { setParseErr(e.message) }
    setParsing(false)
  }

  function buildAuthConfig() {
    if (authType === 'bearer') return { type:'bearer', token: authToken }
    if (authType === 'apikey') return { type:'apikey', token: authToken, header_name: authHeader }
    if (authType === 'basic')  return { type:'basic', username: authUser, password: authPass }
    return { type:'none' }
  }

  // ── Start scan ───────────────────────────────────────────────────────────
  async function startScan() {
    if (!specText.trim()) { setParseErr('Paste a spec first'); return }
    setStep('scanning'); setScanResult(null)
    try {
      const res = await authFetch('/api/v1/api-security?action=scan', {
        method: 'POST',
        body: JSON.stringify({
          spec_json:   specText,
          base_url:    baseUrl,
          auth_config: buildAuthConfig(),
          max_workers: 5,
          timeout:     10,
        }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Scan failed to start')
      setScanId(d.scan_id)
    } catch (e: any) {
      setStep('config'); setParseErr((e as any).message)
    }
  }

  // ── Poll scan ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!scanId) return
    pollRef.current = setInterval(async () => {
      try {
        const res = await authFetch(`/api/v1/api-security?scan_id=${scanId}`)
        if (!res.ok) return
        const d: ScanResult = await res.json()
        setScanResult(d)
        if (d.status === 'complete' || d.status === 'error') {
          clearInterval(pollRef.current!)
          setStep('results')
        }
      } catch {}
    }, 2000)
    return () => clearInterval(pollRef.current!)
  }, [scanId])

  // ── Derived state ────────────────────────────────────────────────────────
  const findings  = scanResult?.findings ?? []
  const allTests  = [...new Set(findings.map(f => f.testId))]
  const sevCounts = findings.reduce((acc, f) => { acc[f.severity] = (acc[f.severity]??0)+1; return acc }, {} as Record<string,number>)
  const filtered  = findings.filter(f =>
    (filterSev  === 'all' || f.severity === filterSev) &&
    (filterTest === 'all' || f.testId   === filterTest))

  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#e2e8f0' }

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to access API security testing</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">API <span style={{ color:'#00aaff' }}>Security Testing</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Upload an OpenAPI · Swagger · Postman spec → automated BOLA, JWT, injection, CORS, SSRF tests
          </p>
        </div>
        {step !== 'config' && (
          <button onClick={() => { setStep('config'); setScanId(''); setScanResult(null); setParsedEps([]) }}
            className="px-3 py-2 rounded-xl font-mono text-[10px] cursor-pointer border transition-all"
            style={{ borderColor:'rgba(255,255,255,0.1)', color:'#64748b' }}>
            ← New Scan
          </button>
        )}
      </div>

      {/* ── CONFIG STEP ────────────────────────────────────────────────── */}
      {step === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
          {/* Left: spec input */}
          <div className="space-y-4">
            {/* Quick URL → spec */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Quick Start — Enter Your API's Base URL</div>
              <div className="flex gap-2">
                <input value={quickUrl} onChange={e => setQuickUrl(e.target.value)}
                  placeholder="https://api.yourapp.com"
                  className={inp + " flex-1"} style={inpStyle}
                  onKeyDown={e => { if (e.key === 'Enter' && quickUrl.trim()) {
                    setSpecText(buildSpecFromUrl(quickUrl.trim()))
                    setBaseUrl(quickUrl.trim())
                    setParsedEps([]); setParseErr('')
                  }}}
                />
                <button
                  onClick={() => { if (quickUrl.trim()) { setSpecText(buildSpecFromUrl(quickUrl.trim())); setBaseUrl(quickUrl.trim()); setParsedEps([]); setParseErr('') }}}
                  disabled={!quickUrl.trim()}
                  className="px-3 py-2 rounded-lg font-mono text-[10px] font-bold cursor-pointer border transition-all disabled:opacity-40 shrink-0"
                  style={{ background:'rgba(0,255,170,0.1)', borderColor:'rgba(0,255,170,0.3)', color:'#00ffaa' }}>
                  Generate Spec →
                </button>
              </div>
              <p className="font-mono text-[9px] text-slate-700 mt-1.5">
                Auto-generates a standard REST spec for your URL — edit it after to match your exact routes.
              </p>
            </div>

            {/* Template picker */}
            <div className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setShowTemplates(s => !s)}
                className="w-full flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.02]">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Or Choose a Template</span>
                <span className="font-mono text-[9px] text-slate-600">{showTemplates ? '▲' : '▼'} {TEMPLATES.length} templates</span>
              </button>
              {showTemplates && (
                <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TEMPLATES.map(t => (
                    <button key={t.id}
                      onClick={() => {
                        setSpecText(JSON.stringify(t.spec, null, 2))
                        setBaseUrl(t.baseUrl)
                        setParsedEps([]); setParseErr(''); setShowTemplates(false)
                      }}
                      className="text-left p-3 rounded-xl border cursor-pointer transition-all hover:opacity-90"
                      style={{ background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-base">{t.icon}</span>
                        <span className="font-mono text-[10px] font-bold text-slate-200">{t.label}</span>
                      </div>
                      <p className="font-mono text-[9px] text-slate-600 leading-relaxed">{t.description}</p>
                      <div className="font-mono text-[8px] text-slate-700 mt-1 truncate">{t.baseUrl}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Spec paste area */}
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">API Spec (OpenAPI / Swagger / Postman JSON)</span>
                {specText && (
                  <button onClick={() => { setSpecText(''); setParsedEps([]); setParseErr('') }}
                    className="font-mono text-[9px] cursor-pointer px-2 py-1 rounded border transition-all"
                    style={{ borderColor:'rgba(255,58,92,0.2)', color:'#ff3a5c', background:'rgba(255,58,92,0.06)' }}>
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={specText}
                onChange={e => { setSpecText(e.target.value); setParsedEps([]); setParseErr('') }}
                placeholder={"3 ways to fill this:\n\n1. Enter your base URL above → click Generate Spec\n2. Choose a template above\n3. Paste your own OpenAPI 3.0 / Swagger 2.0 / Postman Collection JSON here"}
                rows={14}
                className={inp + " resize-none font-mono text-[10px] leading-relaxed"}
                style={inpStyle}
              />
              {parseErr && (
                <div className="mt-2 font-mono text-[10px] px-3 py-2 rounded"
                  style={{ background:'rgba(255,58,92,0.08)', color:'#ff3a5c' }}>
                  ✗ {parseErr}
                </div>
              )}
              <div className="flex gap-2 mt-3">
                <button onClick={parseSpec} disabled={parsing || !specText.trim()}
                  className="px-3 py-2 rounded-lg font-mono text-[10px] font-bold cursor-pointer border transition-all disabled:opacity-40"
                  style={{ borderColor:'rgba(255,255,255,0.1)', color:'#64748b', background:'rgba(255,255,255,0.03)' }}>
                  {parsing ? '⟳ Parsing...' : '⚡ Preview Endpoints'}
                </button>
              </div>
            </div>

            {/* Parsed endpoints preview */}
            {parsedEps.length > 0 && (
              <div className="glass rounded-xl p-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">
                  {parsedEps.length} Endpoints Found
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {parsedEps.map((ep, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <MethodBadge method={ep.method} />
                      <span className="font-mono text-[10px] text-slate-400">{ep.path}</span>
                      {ep.authRequired && <span className="font-mono text-[8px] text-slate-600">🔒</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: config */}
          <div className="space-y-4">
            {/* Base URL override */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Target URL Override</div>
              <input value={baseUrl} onChange={e => setBaseUrl(e.target.value)}
                placeholder="https://api.example.com (optional — overrides spec servers)"
                className={inp} style={inpStyle} />
              <p className="font-mono text-[9px] text-slate-700 mt-2">
                Leave blank to use the URL from the spec. Set this to test staging or a specific environment.
              </p>
            </div>

            {/* Auth config */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Authentication</div>
              <div className="flex gap-1.5 flex-wrap mb-3">
                {(['none','bearer','apikey','basic'] as const).map(t => (
                  <button key={t} onClick={() => setAuthType(t)}
                    className="px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all capitalize"
                    style={authType === t
                      ? { background:'rgba(0,170,255,0.1)', borderColor:'rgba(0,170,255,0.3)', color:'#00aaff' }
                      : { background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.07)', color:'#475569' }}>
                    {t === 'none' ? 'No Auth' : t === 'bearer' ? 'JWT / Bearer' : t === 'apikey' ? 'API Key' : 'Basic'}
                  </button>
                ))}
              </div>

              {authType === 'bearer' && (
                <div>
                  <label className="font-mono text-[9px] text-slate-600 block mb-1">Bearer Token</label>
                  <input type="password" value={authToken} onChange={e => setAuthToken(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." className={inp} style={inpStyle} />
                </div>
              )}
              {authType === 'apikey' && (
                <div className="space-y-2">
                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">Header Name</label>
                    <input value={authHeader} onChange={e => setAuthHeader(e.target.value)}
                      placeholder="X-API-Key" className={inp} style={inpStyle} />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">API Key Value</label>
                    <input type="password" value={authToken} onChange={e => setAuthToken(e.target.value)}
                      placeholder="sk-..." className={inp} style={inpStyle} />
                  </div>
                </div>
              )}
              {authType === 'basic' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">Username</label>
                    <input value={authUser} onChange={e => setAuthUser(e.target.value)}
                      placeholder="admin" className={inp} style={inpStyle} />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] text-slate-600 block mb-1">Password</label>
                    <input type="password" value={authPass} onChange={e => setAuthPass(e.target.value)}
                      placeholder="••••••" className={inp} style={inpStyle} />
                  </div>
                </div>
              )}
              {authType !== 'none' && (
                <p className="font-mono text-[9px] text-slate-700 mt-2">
                  Used to test authenticated endpoints and detect JWT weaknesses.
                </p>
              )}
            </div>

            {/* What gets tested */}
            <div className="glass rounded-xl p-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Tests Included</div>
              <div className="space-y-1">
                {[
                  ['🔐', 'BOLA / Auth Bypass',   'Unauthenticated access to protected endpoints'],
                  ['🔑', 'JWT Attacks',           'none alg, expired token acceptance'],
                  ['🌐', 'CORS Misconfiguration', 'Wildcard, null origin, credentialed'],
                  ['💉', 'Injection',             'SQLi, NoSQLi, SSTI, XSS in all params'],
                  ['🏗',  'Mass Assignment',       'Hidden privileged fields in request body'],
                  ['🔁', 'Method Override',       'X-HTTP-Method-Override bypass'],
                  ['🔀', 'Param Pollution',       'Duplicate params with conflicting values'],
                  ['🔗', 'SSRF',                  'Internal URL fetch via URL params'],
                  ['⚡', 'Rate Limiting',         '30-request burst, detect throttling'],
                ].map(([icon, name, desc]) => (
                  <div key={name as string} className="flex items-start gap-2">
                    <span className="text-sm shrink-0">{icon}</span>
                    <div>
                      <span className="font-mono text-[10px] text-slate-300">{name}</span>
                      <span className="font-mono text-[9px] text-slate-600 ml-2">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={startScan}
              className="w-full py-3 rounded-xl font-mono text-[12px] font-black cursor-pointer transition-all hover:opacity-90"
              style={{ background:'rgba(0,170,255,0.1)', border:'1px solid rgba(0,170,255,0.3)', color:'#00aaff' }}>
              🚀 Start Security Scan
            </button>
          </div>
        </div>
      )}

      {/* ── SCANNING STEP ──────────────────────────────────────────────── */}
      {step === 'scanning' && (
        <div className="glass rounded-xl p-12 text-center">
          <div className="text-5xl mb-4 animate-bounce">🔍</div>
          <div className="font-mono text-[14px] font-black text-slate-200 mb-2">Scanning API...</div>
          <div className="font-mono text-[11px] text-slate-500 mb-6">
            Running CORS, JWT, injection, SSRF, rate limit tests against {scanResult?.endpoints?.length ?? '?'} endpoints
          </div>
          <div className="max-w-xs mx-auto">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
              <div className="h-1.5 rounded-full animate-pulse"
                style={{ width:'60%', background:'#00aaff' }} />
            </div>
          </div>
          <div className="font-mono text-[9px] text-slate-700 mt-4">Scan ID: {scanId}</div>
        </div>
      )}

      {/* ── RESULTS STEP ───────────────────────────────────────────────── */}
      {step === 'results' && scanResult && (
        <>
          {scanResult.status === 'error' && (
            <div className="glass rounded-xl p-6 mb-4"
              style={{ border:'1px solid rgba(255,58,92,0.2)', background:'rgba(255,58,92,0.05)' }}>
              <div className="font-mono text-[12px] text-red-400">✗ Scan failed: {scanResult.error}</div>
            </div>
          )}

          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
            {[
              { label:'Endpoints',  val: scanResult.endpoints?.length ?? 0,       color:'#e2e8f0' },
              { label:'Findings',   val: findings.length,                          color: findings.length > 0 ? '#fb923c' : '#00ffaa' },
              { label:'Critical',   val: sevCounts.critical ?? 0,                  color: (sevCounts.critical??0) > 0 ? '#ff3a5c' : '#00ffaa' },
              { label:'High',       val: sevCounts.high ?? 0,                      color: (sevCounts.high??0) > 0 ? '#fb923c' : '#00ffaa' },
              { label:'Medium',     val: (sevCounts.medium??0)+(sevCounts.low??0), color:'#facc15' },
            ].map(s => (
              <div key={s.label} className="glass p-3 text-center rounded-lg">
                <div className="font-mono text-xl font-black" style={{ color: s.color }}>{s.val}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {findings.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <div className="text-4xl mb-3">✅</div>
              <div className="font-mono text-[14px] font-black text-slate-200 mb-1">No vulnerabilities found</div>
              <div className="font-mono text-[11px] text-slate-500">
                {scanResult.endpoints?.length ?? 0} endpoints tested — all security checks passed
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
              {/* Left: test type breakdown */}
              <div className="glass rounded-xl overflow-hidden self-start">
                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-600">By Test</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  <button onClick={() => setFilterTest('all')}
                    className="w-full px-4 py-2.5 text-left font-mono text-[10px] cursor-pointer transition-colors"
                    style={filterTest==='all' ? {background:'rgba(0,170,255,0.06)',color:'#00aaff'} : {color:'#64748b'}}>
                    All Tests ({findings.length})
                  </button>
                  {allTests.map(t => {
                    const count = findings.filter(f => f.testId === t).length
                    const topSev = findings.filter(f=>f.testId===t).sort((a,b)=>
                      ['critical','high','medium','low','info'].indexOf(a.severity) -
                      ['critical','high','medium','low','info'].indexOf(b.severity))[0]?.severity ?? 'info'
                    return (
                      <button key={t} onClick={() => setFilterTest(f => f===t?'all':t)}
                        className="w-full px-4 py-2 text-left flex items-center justify-between cursor-pointer transition-colors"
                        style={filterTest===t ? {background:'rgba(0,170,255,0.06)'} : {}}>
                        <span className="font-mono text-[9px] text-slate-400 truncate max-w-[140px]">
                          {TEST_LABELS[t] ?? t}
                        </span>
                        <span className="font-mono text-[9px] font-bold shrink-0"
                          style={{ color: SEV[topSev] }}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Right: findings */}
              <div>
                {/* Severity filters */}
                <div className="flex gap-1.5 mb-3 flex-wrap">
                  {(['all','critical','high','medium','low'] as const).map(s => (
                    <button key={s} onClick={() => setFilterSev(s)}
                      className="px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all"
                      style={filterSev === s
                        ? { background:`${SEV[s]??'#e2e8f0'}18`, borderColor:`${SEV[s]??'#e2e8f0'}50`, color:SEV[s]??'#e2e8f0' }
                        : { background:'rgba(255,255,255,0.03)', borderColor:'rgba(255,255,255,0.07)', color:'#475569' }}>
                      {s==='all' ? `All (${findings.length})` : `${s.toUpperCase()} (${sevCounts[s]??0})`}
                    </button>
                  ))}
                </div>

                <div className="space-y-1.5 max-h-[700px] overflow-y-auto pr-1">
                  {filtered.map((f, i) => {
                    const isOpen = expanded === `${i}`
                    const c = SEV[f.severity] ?? '#64748b'
                    return (
                      <div key={i}
                        className="rounded-xl border overflow-hidden cursor-pointer transition-all"
                        style={{
                          borderColor: isOpen ? `${c}40` : 'rgba(255,255,255,0.06)',
                          background:  isOpen ? `${c}08`  : 'rgba(255,255,255,0.02)',
                        }}
                        onClick={() => setExpanded(e => e===`${i}` ? null : `${i}`)}>

                        <div className="flex items-center gap-3 px-4 py-3">
                          <SevBadge sev={f.severity} />
                          <MethodBadge method={f.method} />
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-[11px] font-black text-slate-200 truncate">{f.title}</div>
                            <div className="font-mono text-[9px] text-slate-600 truncate">{f.endpoint}</div>
                          </div>
                          <span className="font-mono text-[9px] text-slate-700 shrink-0 px-2 py-0.5 rounded"
                            style={{ background:'rgba(255,255,255,0.04)' }}>
                            {TEST_LABELS[f.testId] ?? f.testId}
                          </span>
                          <span className="font-mono text-[10px] text-slate-600 shrink-0">{isOpen?'▲':'▼'}</span>
                        </div>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-0 border-t border-white/[0.05] space-y-3">
                            <p className="font-mono text-[10px] text-slate-400 mt-3 leading-relaxed">{f.detail}</p>
                            {f.requestSnippet && (
                              <div>
                                <div className="font-mono text-[8px] uppercase tracking-widest text-slate-700 mb-1">Request</div>
                                <pre className="font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto"
                                  style={{ background:'rgba(0,0,0,0.4)', color:'#00aaff', whiteSpace:'pre-wrap', wordBreak:'break-all' }}>
                                  {f.requestSnippet}
                                </pre>
                              </div>
                            )}
                            {f.responseSnippet && (
                              <div>
                                <div className="font-mono text-[8px] uppercase tracking-widest text-slate-700 mb-1">Response</div>
                                <pre className="font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto"
                                  style={{ background:'rgba(0,0,0,0.4)', color:'#94a3b8', whiteSpace:'pre-wrap', wordBreak:'break-all' }}>
                                  {f.responseSnippet}
                                </pre>
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
          )}
        </>
      )}
    </div>
  )
}
