'use client'
import { useEffect, useState, useCallback } from 'react'
import { getToken, getUser } from '@/lib/eso-auth'

const SEVERITY_COLOR: Record<string, string> = {
  critical: '#ff3a5c',
  high:     '#fb923c',
  medium:   '#facc15',
  low:      '#00aaff',
}

const SERVICE_ICON: Record<string, string> = {
  // AWS
  s3:         '🪣', ec2: '💻', rds: '🗄', iam: '🔑',
  cloudtrail: '📋', vpc: '🔌',
  // GCP
  storage: '🪣', compute: '💻', sql: '🗄', logging: '📋', kms: '🗝',
  // Azure
  network: '🔌', keyvault: '🗝', monitor: '📊',
  // Fallback
  azure: '🔷', gcp: '☁️',
}

const PROVIDER_INFO: Record<string, { label: string; color: string; icon: string }> = {
  aws:   { label: 'Amazon Web Services',    color: '#ff9900', icon: '☁️' },
  gcp:   { label: 'Google Cloud Platform', color: '#4285f4', icon: '🔵' },
  azure: { label: 'Microsoft Azure',        color: '#0078d4', icon: '🔷' },
}

const AWS_REGIONS = [
  'us-east-1','us-east-2','us-west-1','us-west-2',
  'eu-west-1','eu-west-2','eu-central-1',
  'ap-southeast-1','ap-southeast-2','ap-northeast-1',
]

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

// ── Score ring ─────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const color  = score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c'
  const grade  = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 50 ? 'D' : 'F'
  const r      = size / 2 - 6
  const circ   = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const mid    = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={mid} cy={mid} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <circle cx={mid} cy={mid} r={r} fill="none" stroke={color} strokeWidth="6"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${mid} ${mid})`} />
      <text x={mid} y={mid - 4} textAnchor="middle" fill={color}
        style={{ fontFamily: "'Space Mono',monospace", fontSize: `${size * 0.19}px`, fontWeight: 700 }}>
        {score}
      </text>
      <text x={mid} y={mid + 10} textAnchor="middle" fill={color + '99'}
        style={{ fontFamily: "'Space Mono',monospace", fontSize: `${size * 0.14}px` }}>
        {grade}
      </text>
    </svg>
  )
}

// ── Compliance bar ─────────────────────────────────────────────────────────────
function ComplianceBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c'
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[9px] text-slate-500">{label}</span>
        <span className="font-mono text-[9px]" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-1 rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }} />
      </div>
    </div>
  )
}

// ── Credential forms ───────────────────────────────────────────────────────────
function AWSCredForm({ form, setForm }: { form: any; setForm: any }) {
  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }
  return (
    <>
      <div className="flex gap-2 mb-3">
        {[['access_key', 'Access Keys'], ['role_arn', 'Assume Role ✓']].map(([v, l]) => (
          <button key={v} onClick={() => setForm((f: any) => ({ ...f, credType: v }))}
            className="px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all"
            style={form.credType === v
              ? { background: 'rgba(0,170,255,0.1)', borderColor: 'rgba(0,170,255,0.3)', color: '#00aaff' }
              : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)', color: '#64748b' }}>
            {l}
          </button>
        ))}
      </div>

      <div>
        <label className="font-mono text-[10px] text-slate-500 block mb-1">Region</label>
        <select value={form.region} onChange={e => setForm((f: any) => ({ ...f, region: e.target.value }))}
          className={inp} style={inpStyle}>
          {AWS_REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-[10px] text-slate-500 block mb-1">Access Key ID</label>
          <input type="password" value={form.accessKeyId}
            onChange={e => setForm((f: any) => ({ ...f, accessKeyId: e.target.value }))}
            placeholder="AKIA..." className={inp} style={inpStyle} />
        </div>
        <div>
          <label className="font-mono text-[10px] text-slate-500 block mb-1">Secret Access Key</label>
          <input type="password" value={form.secretKey}
            onChange={e => setForm((f: any) => ({ ...f, secretKey: e.target.value }))}
            placeholder="••••••••" className={inp} style={inpStyle} />
        </div>
        {form.credType === 'role_arn' && (
          <div className="sm:col-span-2">
            <label className="font-mono text-[10px] text-slate-500 block mb-1">Role ARN</label>
            <input value={form.roleArn}
              onChange={e => setForm((f: any) => ({ ...f, roleArn: e.target.value }))}
              placeholder="arn:aws:iam::123456789012:role/XCloakAuditRole"
              className={inp} style={inpStyle} />
          </div>
        )}
      </div>
      <p className="font-mono text-[9px] text-slate-700 mt-2">
        Use a read-only IAM role with <code>SecurityAudit</code> + <code>ReadOnlyAccess</code> policies for least privilege. Credentials are AES-256 encrypted.
      </p>
    </>
  )
}

function GCPCredForm({ form, setForm }: { form: any; setForm: any }) {
  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }
  return (
    <>
      <div>
        <label className="font-mono text-[10px] text-slate-500 block mb-1">Service Account Key JSON</label>
        <textarea value={form.gcpKeyJson}
          onChange={e => setForm((f: any) => ({ ...f, gcpKeyJson: e.target.value }))}
          placeholder={'{\n  "type": "service_account",\n  "project_id": "my-project",\n  "private_key_id": "...",\n  ...\n}'}
          rows={8} className={inp + " resize-y font-mono text-[10px]"} style={inpStyle} />
      </div>
      <p className="font-mono text-[9px] text-slate-700 mt-2">
        Create a Service Account with <code>Security Reviewer</code> + <code>Cloud Asset Viewer</code> roles. Generate and paste the JSON key. Key is AES-256 encrypted before storage.
      </p>
    </>
  )
}

function AzureCredForm({ form, setForm }: { form: any; setForm: any }) {
  const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
  const inpStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="font-mono text-[10px] text-slate-500 block mb-1">Tenant ID</label>
          <input value={form.azureTenantId}
            onChange={e => setForm((f: any) => ({ ...f, azureTenantId: e.target.value }))}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            className={inp} style={inpStyle} />
        </div>
        <div>
          <label className="font-mono text-[10px] text-slate-500 block mb-1">Client (App) ID</label>
          <input value={form.azureClientId}
            onChange={e => setForm((f: any) => ({ ...f, azureClientId: e.target.value }))}
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            className={inp} style={inpStyle} />
        </div>
        <div className="sm:col-span-2">
          <label className="font-mono text-[10px] text-slate-500 block mb-1">Client Secret</label>
          <input type="password" value={form.azureClientSecret}
            onChange={e => setForm((f: any) => ({ ...f, azureClientSecret: e.target.value }))}
            placeholder="••••••••"
            className={inp} style={inpStyle} />
        </div>
      </div>
      <p className="font-mono text-[9px] text-slate-700 mt-2">
        Register an App in Azure AD, assign <code>Security Reader</code> role at subscription scope. Use the App's tenant ID, client ID, and client secret. Credentials are AES-256 encrypted.
      </p>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CloudPage() {
  const user = getUser()

  const [accounts,      setAccounts]      = useState<any[]>([])
  const [selected,      setSelected]      = useState<any | null>(null)
  const [detail,        setDetail]        = useState<any | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [adding,        setAdding]        = useState(false)
  const [msg,           setMsg]           = useState('')
  const [filterSev,     setFilterSev]     = useState('all')
  const [filterService, setFilterService] = useState('all')
  const [showForm,      setShowForm]      = useState(false)
  const [activeTab,     setActiveTab]     = useState<'findings'|'score'>('findings')

  const [form, setForm] = useState({
    provider: 'aws', accountId: '', label: '', region: 'us-east-1',
    credType: 'access_key', accessKeyId: '', secretKey: '', roleArn: '',
    gcpKeyJson: '',
    azureTenantId: '', azureClientId: '', azureClientSecret: '',
  })

  const load = useCallback(async () => {
    setLoading(true)
    const res = await authFetch('/api/v1/cloud')
    if (res.ok) {
      let d: any = {}
      try { d = await res.json() } catch {}
      setAccounts(d.accounts ?? [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(''), 5000)
    return () => clearTimeout(t)
  }, [msg])

  const loadDetail = useCallback(async (account: any) => {
    setSelected(account)
    setDetail(null)
    setFilterSev('all')
    setFilterService('all')
    setActiveTab('findings')
    const res = await authFetch(`/api/v1/cloud?accountId=${account.id}`)
    if (res.ok) {
      let d: any = {}
      try { d = await res.json() } catch {}
      setDetail(d.account ?? null)
    }
  }, [])

  function buildCredentials() {
    const { provider, credType, accessKeyId, secretKey, roleArn, gcpKeyJson,
            azureTenantId, azureClientId, azureClientSecret } = form

    if (provider === 'aws') {
      const creds: any = { type: credType, access_key_id: accessKeyId, secret_access_key: secretKey }
      if (credType === 'role_arn') creds.role_arn = roleArn
      return creds
    }
    if (provider === 'gcp') {
      try {
        const keyJson = JSON.parse(gcpKeyJson)
        return { type: 'service_account_key', key_json: keyJson }
      } catch {
        return null
      }
    }
    if (provider === 'azure') {
      return {
        type: 'service_principal',
        tenant_id: azureTenantId,
        client_id: azureClientId,
        client_secret: azureClientSecret,
      }
    }
    return null
  }

  async function addAccount() {
    if (!form.accountId.trim()) { setMsg('✗ Account ID required'); return }

    const credentials = buildCredentials()
    if (!credentials) { setMsg('✗ Invalid credentials — check JSON format for GCP'); return }

    // Basic validation per provider
    if (form.provider === 'aws' && (!form.accessKeyId || !form.secretKey)) {
      setMsg('✗ Access Key ID and Secret are required'); return
    }
    if (form.provider === 'gcp' && !form.gcpKeyJson.trim()) {
      setMsg('✗ Service Account JSON key is required'); return
    }
    if (form.provider === 'azure' && (!form.azureTenantId || !form.azureClientId || !form.azureClientSecret)) {
      setMsg('✗ Tenant ID, Client ID, and Client Secret are all required'); return
    }

    setAdding(true)
    const res = await authFetch('/api/v1/cloud', {
      method: 'POST',
      body: JSON.stringify({
        provider:  form.provider,
        accountId: form.accountId.trim(),
        label:     form.label.trim() || undefined,
        region:    form.region,
        credentials,
      }),
    })
    let d: any = {}
    try { d = await res.json() } catch {}

    if (res.ok) {
      setMsg('✓ Account connected — audit starting...')
      setShowForm(false)
      setForm({
        provider: 'aws', accountId: '', label: '', region: 'us-east-1',
        credType: 'access_key', accessKeyId: '', secretKey: '', roleArn: '',
        gcpKeyJson: '', azureTenantId: '', azureClientId: '', azureClientSecret: '',
      })
      await load()
      // Poll a couple times for the audit result
      setTimeout(load, 15000)
      setTimeout(load, 45000)
    } else {
      setMsg(`✗ ${d.error ?? 'Failed to connect account'}`)
    }
    setAdding(false)
  }

  async function removeAccount(accountId: string) {
    if (!confirm('Disconnect this cloud account? All findings will be deleted.')) return
    const res = await authFetch('/api/v1/cloud', {
      method: 'DELETE',
      body: JSON.stringify({ accountId }),
    })
    if (res.ok) {
      setMsg('✓ Account disconnected')
      if (selected?.id === accountId) { setSelected(null); setDetail(null) }
      await load()
    }
  }

  async function rerunAudit(account: any) {
    const res = await authFetch('/api/v1/cloud', {
      method: 'POST',
      body: JSON.stringify({
        provider:    account.provider,
        accountId:   account.accountId,
        label:       account.label,
        region:      account.region ?? 'us-east-1',
        credentials: '__reuse__',  // XCloak will reuse stored encrypted creds
        rerun:       true,
        existingId:  account.id,
      }),
    })
    if (res.ok) {
      setMsg('✓ Re-audit started...')
      setTimeout(load, 20000)
    }
  }

  async function updateFinding(findingId: string, status: string) {
    await authFetch('/api/v1/cloud', { method: 'PUT', body: JSON.stringify({ findingId, status }) })
    if (selected) await loadDetail(selected)
    await load()
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalFindings = accounts.reduce((a, x) => a + (x.findings?.length ?? 0), 0)
  const totalCritical = accounts.reduce((a, x) =>
    a + (x.findings?.filter((f: any) => f.severity === 'critical').length ?? 0), 0)
  const avgScore = accounts.length > 0
    ? Math.round(accounts.reduce((a, x) => a + (x.postureScore ?? 0), 0) / accounts.length)
    : null

  // ── Detail panel ───────────────────────────────────────────────────────────
  const allFindings   = detail?.findings ?? []
  const scoreDetail   = detail?.scoreDetail ?? null
  const services      = [...new Set(allFindings.map((f: any) => f.service))] as string[]
  const filteredFind  = allFindings.filter((f: any) =>
    (filterSev === 'all' || f.severity === filterSev) &&
    (filterService === 'all' || f.service === filterService)
  )
  const findCounts = allFindings.reduce((acc: Record<string, number>, f: any) => {
    acc[f.severity] = (acc[f.severity] ?? 0) + 1; return acc
  }, {})

  if (!user) return (
    <div className="p-5 flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3">🔐</div>
        <div className="font-mono text-[12px] text-slate-500">Please log in to access cloud security</div>
      </div>
    </div>
  )

  return (
    <div className="p-3 sm:p-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Cloud <span style={{ color: '#00ffaa' }}>Security Posture</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Audit AWS, GCP, and Azure against CIS Benchmarks · SOC 2 · PCI-DSS
          </p>
        </div>
        <button onClick={() => setShowForm(s => !s)}
          className="px-4 py-2 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all"
          style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
          {showForm ? '✕ Cancel' : '+ Connect Account'}
        </button>
      </div>

      {/* Message */}
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
          { label: 'Accounts',  val: accounts.length,  color: '#e2e8f0' },
          { label: 'Findings',  val: totalFindings,    color: totalFindings > 0 ? '#fb923c' : '#00ffaa' },
          { label: 'Critical',  val: totalCritical,    color: totalCritical > 0 ? '#ff3a5c' : '#00ffaa' },
          { label: 'Avg Score', val: avgScore != null ? `${avgScore}` : '—',
            color: avgScore == null ? '#64748b' : avgScore >= 80 ? '#00ffaa' : avgScore >= 60 ? '#facc15' : '#ff3a5c' },
        ].map(s => (
          <div key={s.label} className="glass p-3 text-center rounded-lg">
            <div className="font-mono text-xl font-black" style={{ color: s.color }}>{s.val}</div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add account form */}
      {showForm && (
        <div className="glass rounded-xl p-5 mb-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Connect Cloud Account</div>

          {/* Provider selector */}
          <div className="flex gap-2 mb-4">
            {(['aws', 'gcp', 'azure'] as const).map(p => (
              <button key={p} onClick={() => setForm(f => ({ ...f, provider: p }))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[10px] cursor-pointer border transition-all"
                style={form.provider === p
                  ? { background: `${PROVIDER_INFO[p].color}18`, borderColor: `${PROVIDER_INFO[p].color}50`, color: PROVIDER_INFO[p].color }
                  : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.07)', color: '#64748b' }}>
                {PROVIDER_INFO[p].icon} {p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Common fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="font-mono text-[10px] text-slate-500 block mb-1">
                {form.provider === 'aws' ? 'AWS Account ID' : form.provider === 'gcp' ? 'GCP Project ID' : 'Azure Subscription ID'} *
              </label>
              <input value={form.accountId} onChange={e => setForm(f => ({ ...f, accountId: e.target.value }))}
                placeholder={
                  form.provider === 'aws'   ? '123456789012' :
                  form.provider === 'gcp'   ? 'my-project-id' :
                  'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
                }
                className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }} />
            </div>
            <div>
              <label className="font-mono text-[10px] text-slate-500 block mb-1">Label</label>
              <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="e.g. Production AWS"
                className="w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e2e8f0' }} />
            </div>
          </div>

          {/* Provider-specific credential forms */}
          <div className="space-y-3 mb-4">
            {form.provider === 'aws'   && <AWSCredForm   form={form} setForm={setForm} />}
            {form.provider === 'gcp'   && <GCPCredForm   form={form} setForm={setForm} />}
            {form.provider === 'azure' && <AzureCredForm form={form} setForm={setForm} />}
          </div>

          <button onClick={addAccount} disabled={adding}
            className="w-full py-3 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
            {adding ? '⟳ Connecting...' : `☁️ Connect ${form.provider.toUpperCase()} & Audit`}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Left: Account list ──────────────────────────────────── */}
        <div>
          {loading ? (
            <div className="font-mono text-[11px] text-slate-600 text-center py-8 animate-pulse">Loading...</div>
          ) : accounts.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="text-4xl mb-3">☁️</div>
              <div className="font-mono text-[12px] text-slate-400 mb-1">No cloud accounts connected</div>
              <div className="font-mono text-[10px] text-slate-600">Connect AWS, GCP, or Azure to audit security posture</div>
            </div>
          ) : (
            <div className="space-y-3">
              {accounts.map((account: any) => {
                const findings  = account.findings ?? []
                const criticals = findings.filter((f: any) => f.severity === 'critical').length
                const highs     = findings.filter((f: any) => f.severity === 'high').length
                const isSelected = selected?.id === account.id
                const score      = account.postureScore
                const pInfo      = PROVIDER_INFO[account.provider] ?? PROVIDER_INFO.aws

                return (
                  <div key={account.id}
                    onClick={() => loadDetail(account)}
                    className="rounded-xl p-4 cursor-pointer transition-all hover:opacity-90"
                    style={{
                      background: isSelected ? 'rgba(0,255,170,0.04)' : 'rgba(255,255,255,0.025)',
                      border: `1px solid ${isSelected ? 'rgba(0,255,170,0.2)' : 'rgba(255,255,255,0.07)'}`,
                    }}>
                    <div className="flex items-center gap-3">
                      {score != null ? (
                        <ScoreRing score={score} size={64} />
                      ) : (
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                          style={{ background: 'rgba(255,255,255,0.04)' }}>
                          {pInfo.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[13px] font-black text-slate-100 truncate">
                          {account.label ?? account.accountId}
                        </div>
                        <div className="font-mono text-[10px]" style={{ color: pInfo.color }}>
                          {pInfo.label.split(' ')[0]} · {account.accountId}
                        </div>
                        <div className="font-mono text-[10px] text-slate-600 mt-0.5">
                          {account.lastAuditAt
                            ? `Audited ${new Date(account.lastAuditAt).toLocaleString()}`
                            : <span className="animate-pulse" style={{ color: '#ffd700' }}>⟳ Auditing...</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {criticals > 0 && <div className="font-mono text-[11px] font-bold" style={{ color: '#ff3a5c' }}>{criticals} critical</div>}
                        {highs > 0 && <div className="font-mono text-[10px]" style={{ color: '#fb923c' }}>{highs} high</div>}
                        {findings.length === 0 && account.lastAuditAt && <div className="font-mono text-[10px]" style={{ color: '#00ffaa' }}>✓ Clean</div>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <button onClick={e => { e.stopPropagation(); removeAccount(account.id) }}
                          className="shrink-0 font-mono text-[10px] px-2 py-1 rounded cursor-pointer"
                          style={{ color: '#ff3a5c', background: 'rgba(255,58,92,0.08)' }}>✕</button>
                      </div>
                    </div>

                    {/* Service breakdown */}
                    {findings.length > 0 && (
                      <div className="flex gap-1 mt-3 flex-wrap">
                        {Object.entries(
                          findings.reduce((acc: Record<string, number>, f: any) => {
                            acc[f.service] = (acc[f.service] ?? 0) + 1; return acc
                          }, {})
                        ).map(([svc, count]) => (
                          <span key={svc} className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(255,255,255,0.06)', color: '#64748b' }}>
                            {SERVICE_ICON[svc] ?? '☁️'} {svc} ({count as number})
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

        {/* ── Right: Detail panel ─────────────────────────────────── */}
        <div>
          {!selected ? (
            <div className="glass rounded-xl p-10 text-center h-64 flex flex-col items-center justify-center">
              <div className="text-4xl mb-3">🛡</div>
              <div className="font-mono text-[12px] text-slate-400">Select an account to view findings</div>
            </div>
          ) : !detail ? (
            <div className="glass rounded-xl p-10 text-center">
              <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading findings...</div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Account header */}
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                {detail.postureScore != null && <ScoreRing score={detail.postureScore} size={80} />}
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[13px] font-black text-slate-100">{detail.label ?? detail.accountId}</div>
                  <div className="font-mono text-[10px] text-slate-600">
                    {(PROVIDER_INFO[detail.provider] ?? PROVIDER_INFO.aws).label} · {detail.accountId}
                    {detail.region ? ` · ${detail.region}` : ''}
                  </div>
                  {scoreDetail?.risk_summary && (
                    <div className="font-mono text-[10px] mt-1" style={{ color: detail.postureScore >= 80 ? '#00ffaa' : '#fb923c' }}>
                      {scoreDetail.risk_summary}
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {(['findings', 'score'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all capitalize"
                    style={activeTab === tab
                      ? { background: 'rgba(0,255,170,0.1)', borderColor: 'rgba(0,255,170,0.3)', color: '#00ffaa' }
                      : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
                    {tab === 'findings' ? `Findings (${allFindings.length})` : 'Score Breakdown'}
                  </button>
                ))}
              </div>

              {/* Findings tab */}
              {activeTab === 'findings' && (
                allFindings.length === 0 ? (
                  <div className="glass rounded-xl p-8 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="font-mono text-[12px] text-slate-300">No open findings</div>
                    <div className="font-mono text-[10px] text-slate-600 mt-1">Account passes all security checks</div>
                  </div>
                ) : (
                  <div className="glass rounded-xl p-4">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <button onClick={() => setFilterSev('all')}
                        className="px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all"
                        style={filterSev === 'all'
                          ? { background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#e2e8f0' }
                          : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
                        ALL ({allFindings.length})
                      </button>
                      {(['critical','high','medium','low'] as const).filter(s => findCounts[s] > 0).map(sev => (
                        <button key={sev} onClick={() => setFilterSev(sev)}
                          className="px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all"
                          style={filterSev === sev
                            ? { background: `${SEVERITY_COLOR[sev]}20`, borderColor: `${SEVERITY_COLOR[sev]}50`, color: SEVERITY_COLOR[sev] }
                            : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569' }}>
                          {sev.toUpperCase()} ({findCounts[sev]})
                        </button>
                      ))}
                      {services.length > 1 && (
                        <select value={filterService} onChange={e => setFilterService(e.target.value)}
                          className="px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border outline-none ml-auto"
                          style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                          <option value="all">All services</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      )}
                    </div>

                    {/* Finding cards */}
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                      {filteredFind.map((f: any) => (
                        <div key={f.id} className="p-3 rounded-lg"
                          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div className="flex items-start gap-2">
                            <span className="text-sm shrink-0">{SERVICE_ICON[f.service] ?? '☁️'}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                                  style={{
                                    background: `${SEVERITY_COLOR[f.severity] ?? '#64748b'}18`,
                                    color: SEVERITY_COLOR[f.severity] ?? '#64748b',
                                    border: `1px solid ${SEVERITY_COLOR[f.severity] ?? '#64748b'}30`,
                                  }}>
                                  {f.severity.toUpperCase()}
                                </span>
                                <span className="font-mono text-[10px] text-slate-600">{f.service.toUpperCase()}</span>
                              </div>
                              <div className="font-mono text-[11px] text-slate-200 font-bold mb-0.5">{f.title}</div>
                              <div className="font-mono text-[10px] text-slate-500 mb-1">{f.description}</div>
                              <div className="font-mono text-[9px] text-slate-700 truncate">{f.resource}</div>
                              {f.remediation && (
                                <div className="mt-2 p-2 rounded font-mono text-[10px]"
                                  style={{ background: 'rgba(0,255,170,0.05)', borderLeft: '2px solid rgba(0,255,170,0.2)', color: '#00ffaa99' }}>
                                  Fix: {f.remediation}
                                </div>
                              )}
                              {f.compliance?.length > 0 && (
                                <div className="flex gap-1 mt-1.5 flex-wrap">
                                  {f.compliance.map((c: string) => (
                                    <span key={c} className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                                      style={{ background: 'rgba(0,170,255,0.1)', color: '#00aaff66' }}>{c}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                              <button onClick={() => updateFinding(f.id, 'resolved')}
                                className="px-2 py-1 rounded font-mono text-[9px] cursor-pointer border transition-all"
                                style={{ borderColor: 'rgba(0,255,170,0.2)', color: '#00ffaa', background: 'rgba(0,255,170,0.06)' }}>
                                ✓ Fixed
                              </button>
                              <button onClick={() => updateFinding(f.id, 'suppressed')}
                                className="px-2 py-1 rounded font-mono text-[9px] cursor-pointer border transition-all"
                                style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#64748b', background: 'rgba(255,255,255,0.03)' }}>
                                Suppress
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}

              {/* Score breakdown tab */}
              {activeTab === 'score' && scoreDetail && (
                <div className="space-y-3">
                  {/* Per-service scores */}
                  {Object.keys(scoreDetail.by_service ?? {}).length > 0 && (
                    <div className="glass rounded-xl p-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Score by Service</div>
                      <div className="space-y-3">
                        {Object.entries(scoreDetail.by_service as Record<string, number>)
                          .sort(([, a], [, b]) => a - b)
                          .map(([svc, score]) => (
                            <div key={svc} className="flex items-center gap-3">
                              <span className="text-sm w-5">{SERVICE_ICON[svc] ?? '☁️'}</span>
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span className="font-mono text-[10px] text-slate-400 capitalize">{svc}</span>
                                  <span className="font-mono text-[10px]"
                                    style={{ color: score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : '#ff3a5c' }}>
                                    {score}
                                  </span>
                                </div>
                                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                  <div className="h-1.5 rounded-full transition-all duration-700"
                                    style={{
                                      width: `${score}%`,
                                      background: score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c',
                                    }} />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Compliance coverage */}
                  {Object.keys(scoreDetail.compliance ?? {}).length > 0 && (
                    <div className="glass rounded-xl p-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Compliance Coverage</div>
                      <div className="space-y-3">
                        {Object.entries(scoreDetail.compliance as Record<string, number>).map(([fw, pct]) => (
                          <ComplianceBar key={fw} label={fw} score={pct} />
                        ))}
                      </div>
                      <p className="font-mono text-[9px] text-slate-700 mt-3">
                        Coverage = % of framework controls with no open findings mapped to them.
                      </p>
                    </div>
                  )}

                  {/* Top issues */}
                  {(scoreDetail.top_issues ?? []).length > 0 && (
                    <div className="glass rounded-xl p-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Top Issues to Fix</div>
                      <div className="space-y-2">
                        {scoreDetail.top_issues.map((f: any, i: number) => (
                          <div key={i} className="flex items-start gap-2 p-2 rounded-lg"
                            style={{ background: 'rgba(0,0,0,0.2)' }}>
                            <span className="font-mono text-[10px] font-bold shrink-0"
                              style={{ color: SEVERITY_COLOR[f.severity] ?? '#64748b' }}>
                              {i + 1}.
                            </span>
                            <div>
                              <div className="font-mono text-[10px] text-slate-300">{f.title}</div>
                              <div className="font-mono text-[9px] text-slate-600">{f.service} · {f.severity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'score' && !scoreDetail && (
                <div className="glass rounded-xl p-8 text-center">
                  <div className="font-mono text-[11px] text-slate-600">
                    Score breakdown will appear after the first audit completes.
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
