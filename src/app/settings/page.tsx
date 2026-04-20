'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUser, getToken, isLoggedIn, saveSession } from '@/lib/eso-auth'

const TIER_COLOR:  Record<string,string> = { free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#00ffaa' }
const TIER_BORDER: Record<string,string> = { free:'rgba(100,116,139,0.25)', pro:'rgba(0,170,255,0.3)', enterprise:'rgba(167,139,250,0.3)', admin:'rgba(0,255,170,0.3)' }

const TIER_INFO: Record<string, {scans:number, tools:string, concurrent:number, extra:string[]}> = {
  free:       { scans:3,    concurrent:1, tools:'nmap only',                  extra:[] },
  pro:        { scans:20,   concurrent:2, tools:'nmap,nuclei,whatweb,nikto,gobuster', extra:['AI analysis','PDF reports','Scheduling','API access','Attack surface'] },
  enterprise: { scans:100,  concurrent:5, tools:'All 7 tools (incl. sqlmap,ffuf)',    extra:['All Pro features','Teams & RBAC','Priority queue','Dedicated support'] },
  admin:      { scans:9999, concurrent:10,tools:'All 7 tools',                         extra:['Unlimited everything'] },
}

const OLLAMA_MODELS = [
  { id:'qwen2.5:3b',   size:'1.9GB', note:'Recommended · Best for 16GB RAM' },
  { id:'llama3.2:3b',  size:'2.0GB', note:'Good quality' },
  { id:'qwen2.5:7b',   size:'4.7GB', note:'Better quality · needs 8GB free' },
  { id:'qwen2.5:14b',  size:'9.0GB', note:'Best quality · needs 12GB free' },
  { id:'mistral:7b',   size:'4.1GB', note:'Good at JSON' },
]

async function apiFetch(path: string, opts?: RequestInit) {
  const token = getToken()
  const res = await fetch(`/api/eso${path}`, {
    ...opts,
    headers: { 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{}), ...opts?.headers },
  })
  if (!res.ok) throw new Error(await res.text().catch(()=>res.statusText))
  return res.json()
}

export default function SettingsPage() {
  const router = useRouter()
  const [ready,       setReady]       = useState(false)
  const [user,        setUser]        = useState<any>(null)
  const [tab,         setTab]         = useState<'profile'|'llm'|'apikeys'|'billing'>('profile')
  const [llmConfig,   setLlmConfig]   = useState<any>(null)
  const [apiKeys,     setApiKeys]     = useState<any[]>([])
  const [newKeyName,  setNewKeyName]  = useState('')
  const [newKey,      setNewKey]      = useState<any>(null)
  const [msg,         setMsg]         = useState('')
  const [loading,     setLoading]     = useState(false)
  const [provider,    setProvider]    = useState('local')
  const [model,       setModel]       = useState('qwen2.5:3b')
  const [openaiKey,   setOpenaiKey]   = useState('')
  const [anthropicKey,setAnthropicKey]= useState('')
  const [groqKey,     setGroqKey]     = useState('')
  const [llmTesting,   setLlmTesting]   = useState(false)
  const [llmTestResult,setLlmTestResult]= useState<any>(null)

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login?from=settings'); return }
    // Always fetch fresh user data from /auth/me — localStorage may not have tier
    apiFetch('/auth/me').then(freshUser => {
      // Merge: admin role = admin tier effectively
      if (freshUser.role === 'admin' && (!freshUser.tier || freshUser.tier === 'free')) {
        freshUser.tier = 'admin'
      }
      setUser(freshUser)
      // Update localStorage so sidebar/topbar also see the fresh tier
      saveSession(getToken()!, freshUser)
    }).catch(() => {
      // Fallback to localStorage
      setUser(getUser())
    }).finally(() => setReady(true))
  }, [router])

  useEffect(() => {
    if (!ready) return
    apiFetch('/system/llm-config').then(c => {
      setLlmConfig(c)
      setProvider(c.provider ?? 'local')
      if (c.has_groq_key) setGroqKey('••••••••')
      setModel(c.model ?? 'qwen2.5:3b')
    }).catch(()=>{})
    apiFetch('/auth/api-keys').then(r => setApiKeys(r.keys ?? [])).catch(()=>{})
  }, [ready])

  async function saveLLM() {
    setLoading(true); setMsg('')
    try {
      await apiFetch('/system/llm-config', {
        method:'POST',
        body: JSON.stringify({ provider, model, openai_api_key: openaiKey||undefined, anthropic_api_key: anthropicKey||undefined, groq_api_key: groqKey&&groqKey!=='••••••••'?groqKey:undefined }),
      })
      setMsg('✓ LLM settings saved')
    } catch(e:any) { setMsg(`✗ ${e.message}`) }
    setLoading(false)
  }

  async function testLLM() {
    setLlmTesting(true); setLlmTestResult(null)
    try {
      const r = await apiFetch('/system/llm/test')
      setLlmTestResult(r)
    } catch(e:any) { setLlmTestResult({status:'error', error: e.message}) }
    setLlmTesting(false)
  }

  async function createKey() {
    if (!newKeyName.trim()) return
    setLoading(true); setMsg('')
    try {
      const r = await apiFetch('/auth/api-keys', { method:'POST', body:JSON.stringify({name:newKeyName.trim()}) })
      setNewKey(r)
      setNewKeyName('')
      apiFetch('/auth/api-keys').then(r => setApiKeys(r.keys ?? []))
      setMsg("✓ API key created — copy it now, it won't be shown again")
    } catch(e:any) { setMsg(`✗ ${e.message}`) }
    setLoading(false)
  }

  async function revokeKey(keyId: string) {
    try {
      await apiFetch(`/auth/api-keys/${keyId}`, { method:'DELETE' })
      setApiKeys(k => k.filter(k2 => k2.key_id !== keyId))
      setMsg('✓ Key revoked')
    } catch(e:any) { setMsg(`✗ ${e.message}`) }
  }

  if (!ready) return (
    <div className="flex items-center justify-center h-64">
      <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading account...</div>
    </div>
  )

  const userTier  = user?.role === 'admin' ? 'admin' : (user?.tier ?? 'free')
  const tierInfo  = TIER_INFO[userTier] ?? TIER_INFO.free
  const isAdmin   = user?.role === 'admin'
  const scansLeft = user?.scans_today !== undefined
    ? Math.max(0, tierInfo.scans - (user.scans_today ?? 0))
    : tierInfo.scans

  const TABS = [
    {id:'profile'  as const, label:'Profile',    icon:'👤'},
    {id:'llm'      as const, label:'LLM Config',  icon:'🤖'},
    {id:'apikeys'  as const, label:'API Keys',    icon:'🔑'},
    {id:'billing'  as const, label:'Billing',     icon:'💳'},
  ]

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/40 transition-colors placeholder-slate-700"
  const sel = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/40 transition-colors cursor-pointer"

  return (
    <div className="p-3 sm:p-5 max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black">Settings</h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Account: <span className="text-accent">{user?.username}</span>
            <span className="text-slate-700"> · </span>
            <span style={{color:TIER_COLOR[userTier]}}>{userTier} tier</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 rounded-xl overflow-x-auto"
        style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[11px] font-bold cursor-pointer transition-all"
            style={tab===t.id
              ?{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.25)',color:'#00ffaa'}
              :{color:'#475569',border:'1px solid transparent'}}>
            <span>{t.icon}</span><span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Message */}
      {msg && (
        <div className="mb-4 p-3 rounded-xl border font-mono text-[11px]"
          style={msg.startsWith('✓')
            ?{background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.2)',color:'#00ffaa'}
            :{background:'rgba(255,58,92,0.06)',borderColor:'rgba(255,58,92,0.2)',color:'#ff3a5c'}}>
          {msg} <button onClick={()=>setMsg('')} className="ml-2 opacity-50 hover:opacity-100 cursor-pointer">✕</button>
        </div>
      )}

      {/* ── PROFILE ── */}
      {tab==='profile' && (
        <div className="space-y-4">
          {/* Account info */}
          <div className="glass p-5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Account Info</div>
            <div className="space-y-0">
              {[
                ['Username',    user?.username,    null],
                ['Email',       user?.email,       null],
                ['User ID',     user?.user_id,     null],
                ['Role',        user?.role ?? 'user', user?.role==='admin'?'#ff3a5c':null],
                ['Tier',        userTier,          TIER_COLOR[userTier]],
                ['Tenant',      user?.tenant_id ?? 'default', null],
                ['Member since',user?.created_at ? new Date(user.created_at).toLocaleDateString() : '—', null],
              ].map(([label, val, color]) => (
                <div key={String(label)} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="font-mono text-[10px] text-slate-600">{label}</span>
                  <span className="font-mono text-[11px]" style={{color: color as string ?? '#e2e8f0'}}>
                    {String(val ?? '—')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan card */}
          <div className="glass p-5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Current Plan</div>
            <div className="p-4 rounded-xl border" style={{borderColor:TIER_BORDER[userTier],background:`${TIER_COLOR[userTier]}08`}}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xl font-black capitalize" style={{color:TIER_COLOR[userTier]}}>{userTier}</span>
                {!isAdmin && userTier !== 'enterprise' && (
                  <Link href="/pricing"
                    className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl cursor-pointer transition-all"
                    style={{background:'rgba(0,170,255,0.1)',border:'1px solid rgba(0,170,255,0.3)',color:'#00aaff'}}>
                    Upgrade →
                  </Link>
                )}
              </div>
              {/* Usage stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:'Scans Today',    val:`${user?.scans_today??0} / ${tierInfo.scans>=9999?'∞':tierInfo.scans}`},
                  {label:'Scans Left',     val:tierInfo.scans===9999?'∞':String(scansLeft)},
                  {label:'Concurrent',     val:String(tierInfo.concurrent)},
                  {label:'Total Scans',    val:String(user?.total_scans??0)},
                ].map(s => (
                  <div key={s.label} className="p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02]">
                    <div className="font-mono text-[9px] text-slate-600 mb-1">{s.label}</div>
                    <div className="font-mono text-[14px] font-bold" style={{color:TIER_COLOR[userTier]}}>{s.val}</div>
                  </div>
                ))}
              </div>
              {/* Local Docker mode notice */}
              <div className="mt-3 p-3 rounded-xl" style={{background:'rgba(0,170,255,0.04)',border:'1px solid rgba(0,170,255,0.15)'}}>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">How scanning works</div>
                <p className="font-mono text-[10px] text-slate-500 leading-5">
                  Security tools run as <span className="text-accent2">Docker containers on your machine</span>. Our servers handle AI orchestration, analysis, and report storage — your machine handles the actual scanning. This keeps traffic private and keeps costs low for everyone.
                </p>
                <p className="font-mono text-[9px] text-slate-700 mt-1.5">
                  Docker must be running locally · <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer" className="text-accent2 hover:underline">Install Docker →</a>
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/[0.06]">
                <div className="font-mono text-[9px] text-slate-600 mb-1">Tools</div>
                <div className="font-mono text-[10px] text-slate-400">{tierInfo.tools}</div>
                {tierInfo.extra.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tierInfo.extra.map(f => (
                      <span key={f} className="font-mono text-[8px] px-1.5 py-[1px] rounded-full" style={{background:`${TIER_COLOR[userTier]}15`,color:TIER_COLOR[userTier]}}>
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LLM ── */}
      {tab==='llm' && (
        <div className="glass p-5 space-y-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">LLM Provider</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {id:'local',     label:'Ollama',    desc:'Free · local · private'},
              {id:'openai',    label:'OpenAI',    desc:'GPT-4o · API key required'},
              {id:'anthropic', label:'Anthropic', desc:'Claude · API key required'},
              {id:'groq',      label:'Groq',      desc:'Llama 3 · Free tier · Fast'},
            ].map(p => (
              <button key={p.id} onClick={()=>setProvider(p.id)}
                className="p-3 rounded-xl border text-left cursor-pointer transition-all"
                style={provider===p.id
                  ?{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}
                  :{background:'rgba(255,255,255,0.02)',borderColor:'rgba(255,255,255,0.08)',color:'#475569'}}>
                <div className="font-mono text-[11px] font-bold">{p.label}</div>
                <div className="font-mono text-[9px] mt-0.5 opacity-70">{p.desc}</div>
              </button>
            ))}
          </div>

          {provider==='local' && (
            <div className="space-y-2">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Model</label>
              <select value={model} onChange={e=>setModel(e.target.value)} className={sel}>
                {OLLAMA_MODELS.map(m => <option key={m.id} value={m.id}>{m.id} ({m.size}) — {m.note}</option>)}
              </select>
            </div>
          )}
          {provider==='openai' && (
            <div className="space-y-3">
              <select value={model} onChange={e=>setModel(e.target.value)} className={sel}>
                {['gpt-4o','gpt-4o-mini','gpt-4-turbo','gpt-3.5-turbo'].map(m=><option key={m}>{m}</option>)}
              </select>
              <input type="password" value={openaiKey} onChange={e=>setOpenaiKey(e.target.value)} placeholder="sk-..." className={inp}/>
            </div>
          )}
          {provider==='anthropic' && (
            <div className="space-y-3">
              <select value={model} onChange={e=>setModel(e.target.value)} className={sel}>
                {['claude-sonnet-4-6','claude-opus-4-6','claude-haiku-4-5-20251001'].map(m=><option key={m}>{m}</option>)}
              </select>
              <input type="password" value={anthropicKey} onChange={e=>setAnthropicKey(e.target.value)} placeholder="sk-ant-..." className={inp}/>
            </div>
          )}
          {provider==='groq' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl font-mono text-[10px]"
                style={{background:'rgba(0,255,170,0.04)',border:'1px solid rgba(0,255,170,0.15)',color:'#00ffaa'}}>
                ✓ Free tier — 131,072 tokens/day · Llama 3 on Groq hardware · Extremely fast
              </div>
              <select value={model} onChange={e=>setModel(e.target.value)} className={sel}>
                {['llama-3.1-8b-instant','llama-3.3-70b-versatile','llama-3.1-70b-versatile','mixtral-8x7b-32768','gemma2-9b-it'].map(m=><option key={m}>{m}</option>)}
              </select>
              <input type="password" value={groqKey} onChange={e=>setGroqKey(e.target.value)}
                placeholder="gsk_..." className={inp}/>
              <p className="font-mono text-[9px] text-slate-600">
                Get free API key at <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-accent hover:underline">console.groq.com</a>
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={saveLLM} disabled={loading}
              className="flex-1 py-2.5 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all disabled:opacity-40"
              style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
              {loading ? '⟳ Saving...' : 'Save LLM Settings'}
            </button>
            <button onClick={testLLM} disabled={llmTesting}
              className="px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40 shrink-0"
              style={{background:'rgba(0,170,255,0.1)',border:'1px solid rgba(0,170,255,0.3)',color:'#00aaff'}}>
              {llmTesting ? '⟳ Testing...' : '⚡ Test'}
            </button>
          </div>

          {llmTestResult && (
            <div className="p-3 rounded-xl border font-mono text-[10px]"
              style={llmTestResult.status==='ok'
                ?{borderColor:'rgba(0,255,170,0.2)',background:'rgba(0,255,170,0.05)',color:'#00ffaa'}
                :{borderColor:'rgba(255,58,92,0.2)',background:'rgba(255,58,92,0.05)',color:'#ff3a5c'}}>
              {llmTestResult.status==='ok'
                ? `✓ Connected — ${llmTestResult.provider} · ${llmTestResult.model}`
                : `✗ Failed — ${llmTestResult.error||llmTestResult.status}`}
            </div>
          )}

          {llmConfig && (
            <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="font-mono text-[9px] text-slate-600 mb-1">Active configuration</div>
              <div className="font-mono text-[10px] text-slate-400">
                {llmConfig.provider} · {llmConfig.model}
                {llmConfig.has_openai_key && <span className="ml-2 text-accent2">OpenAI key ✓</span>}
                {llmConfig.has_anthropic_key && <span className="ml-2" style={{color:'#a78bfa'}}>Anthropic key ✓</span>}
                {llmConfig.has_groq_key && <span className="ml-2" style={{color:'#00ffaa'}}>Groq key ✓</span>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── API KEYS ── */}
      {tab==='apikeys' && (
        <div className="space-y-4">

          {/* Usage instructions */}
          <div className="glass p-4 rounded-xl" style={{borderColor:'rgba(0,170,255,0.2)',background:'rgba(0,170,255,0.04)'}}>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">How to use your API key</div>
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-slate-500">Add the key as a request header:</p>
              <code className="block font-mono text-[10px] text-accent2 p-2.5 rounded-lg break-all"
                style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.06)'}}>
                X-API-Key: eso_xxxxxxxxxxxxxxxx
              </code>
              <p className="font-mono text-[10px] text-slate-500 mt-2">Example — start a scan:</p>
              <code className="block font-mono text-[10px] text-slate-400 p-2.5 rounded-lg break-all"
                style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.06)'}}>
                {`curl -X POST http://your-server:8000/api/v1/hybrid/execute \
  -H "X-API-Key: eso_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"goal":"scan for vulnerabilities","target":"example.com"}'`}
              </code>
              <p className="font-mono text-[10px] text-slate-600 mt-1">
                API access requires <span className="text-accent2">Pro</span> tier or above.
              </p>
            </div>
          </div>

          {/* Create key */}
          <div className="glass p-5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Create New Key</div>
            <div className="flex gap-2">
              <input value={newKeyName} onChange={e=>setNewKeyName(e.target.value)}
                placeholder="Key name (e.g. CI/CD pipeline)" className={inp + ' flex-1'}
                onKeyDown={e=>e.key==='Enter'&&createKey()}/>
              <button onClick={createKey} disabled={loading||!newKeyName.trim()}
                className="px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40 shrink-0"
                style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                Create
              </button>
            </div>
            {newKey && (
              <div className="mt-3 p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04]">
                <div className="font-mono text-[9px] text-yellow-500/70 mb-2">⚠ Copy now — won't be shown again</div>
                <code className="font-mono text-[11px] text-yellow-400 break-all select-all">{newKey.api_key ?? newKey.key}</code>
              </div>
            )}
          </div>

          {/* Active keys list */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest">Active Keys ({apiKeys.length})</span>
              <span className="font-mono text-[9px] text-slate-700">Max 5 keys per account</span>
            </div>
            {apiKeys.length===0
              ? (
                <div className="p-8 text-center">
                  <div className="font-mono text-[11px] text-slate-600 mb-1">No API keys yet</div>
                  <div className="font-mono text-[10px] text-slate-700">Create a key above to access the API programmatically</div>
                </div>
              )
              : apiKeys.map(k => (
                <div key={k.key_id} className="flex items-center justify-between px-4 py-3 border-b border-white/[0.03] last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-[12px] text-slate-200 font-semibold">{k.name}</div>
                    <div className="font-mono text-[9px] text-slate-600 mt-0.5 flex items-center gap-2">
                      <code className="text-slate-500">{k.key_prefix}••••••••••••</code>
                      <span>·</span>
                      <span>Created {new Date(k.created_at).toLocaleDateString()}</span>
                      {k.last_used_at && <><span>·</span><span>Last used {new Date(k.last_used_at).toLocaleDateString()}</span></>}
                    </div>
                  </div>
                  <button onClick={()=>revokeKey(k.key_id)}
                    className="font-mono text-[9px] px-2.5 py-1 rounded-lg cursor-pointer transition-all hover:opacity-80 ml-3 shrink-0"
                    style={{background:'rgba(255,58,92,0.08)',border:'1px solid rgba(255,58,92,0.2)',color:'#ff3a5c'}}>
                    Revoke
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* ── BILLING ── */}
      {tab==='billing' && (
        <div className="space-y-4">
          <div className="glass p-5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Subscription</div>
            <div className="p-4 rounded-xl border" style={{borderColor:TIER_BORDER[userTier],background:`${TIER_COLOR[userTier]}06`}}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-lg font-bold capitalize" style={{color:TIER_COLOR[userTier]}}>{userTier}</div>
                  <div className="font-mono text-[10px] text-slate-600 mt-1">
                    {userTier==='free'?'$0 / month':userTier==='pro'?'$29 / month':userTier==='enterprise'?'$99 / month':userTier==='admin'?'Admin — no billing':'—'}
                  </div>
                </div>
                {!isAdmin && (
                  <div className="text-right">
                    <div className="font-mono text-[9px] text-slate-600">Renews</div>
                    <div className="font-mono text-[10px] text-slate-400">—</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isAdmin && (
            <div className="glass p-5">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4">Available Plans</div>
              {[
                {tier:'free',       price:'$0',   label:'Free',       color:'#64748b'},
                {tier:'pro',        price:'$29',  label:'Pro',        color:'#00aaff'},
                {tier:'enterprise', price:'$99',  label:'Enterprise', color:'#a78bfa'},
              ].map(plan=>(
                <div key={plan.tier} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[12px] font-bold" style={{color:plan.color}}>{plan.label}</span>
                    {plan.tier===userTier && (
                      <span className="font-mono text-[8px] px-1.5 py-[1px] rounded-full" style={{background:`${plan.color}20`,color:plan.color}}>CURRENT</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[14px] font-bold" style={{color:plan.color}}>{plan.price}<span className="text-[9px] font-normal text-slate-600">/mo</span></span>
                    {plan.tier!==userTier && plan.tier!=='free' && (
                      <Link href={`/pricing?plan=${plan.tier}`}
                        className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                        style={{background:`${plan.color}10`,border:`1px solid ${plan.color}40`,color:plan.color}}>
                        {userTier==='free'||(['pro','enterprise'].indexOf(plan.tier)>['pro','enterprise'].indexOf(userTier)) ? 'Upgrade' : 'Downgrade'}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="glass p-4 text-center">
            <p className="font-mono text-[11px] text-slate-600">
              Payments via Razorpay · Cancel anytime ·{' '}
              <a href="mailto:billing@xcloak.app" className="text-accent2 hover:underline">Contact billing</a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
