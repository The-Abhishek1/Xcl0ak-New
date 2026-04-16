'use client'
import { useEffect, useState } from 'react'
import { esoSystem, esoAuth } from '@/lib/eso/api'

const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

// Ollama models — these are common models. User can type custom ones too.
const OLLAMA_MODELS = [
  { id:'phi3:mini',       size:'2.2GB', speed:'⚡⚡⚡', quality:'★★☆', note:'Fast, poor JSON' },
  { id:'llama3.2:3b',    size:'2.0GB', speed:'⚡⚡⚡', quality:'★★★', note:'Best for this size' },
  { id:'qwen2.5:7b',     size:'4.7GB', speed:'⚡⚡☆', quality:'★★★', note:'Recommended local' },
  { id:'qwen2.5:14b',    size:'9.0GB', speed:'⚡☆☆',  quality:'★★★', note:'Best local quality' },
  { id:'mistral:7b',     size:'4.1GB', speed:'⚡⚡☆', quality:'★★★', note:'Good at JSON' },
  { id:'deepseek-r1:7b', size:'4.7GB', speed:'⚡⚡☆', quality:'★★★', note:'Strong reasoning' },
]

const OPENAI_MODELS = [
  { id:'gpt-4o',          note:'Best quality, fastest' },
  { id:'gpt-4o-mini',     note:'Fast + cheap, great for planning' },
  { id:'gpt-4-turbo',     note:'Long context' },
  { id:'gpt-3.5-turbo',   note:'Cheapest' },
]

const ANTHROPIC_MODELS = [
  { id:'claude-sonnet-4-6',         note:'Best balance (recommended)' },
  { id:'claude-opus-4-6',           note:'Most powerful' },
  { id:'claude-haiku-4-5-20251001', note:'Fastest + cheapest' },
]

type TestResult = { status: 'ok'|'error'; message?: string; error?: string } | null

export default function SettingsPage() {
  const [sysInfo,    setSysInfo]    = useState<any>(null)
  const [loading,    setLoading]    = useState(true)
  const [switching,  setSwitching]  = useState(false)
  const [testResult, setTestResult] = useState<TestResult>(null)
  const [testing,    setTesting]    = useState(false)

  // Form state
  const [provider,   setProvider]   = useState('local')
  const [model,      setModel]      = useState('')
  const [customModel,setCustomModel]= useState('')
  const [apiKey,     setApiKey]     = useState('')
  const [ollamaUrl,  setOllamaUrl]  = useState('http://localhost:11434')
  const [showKey,    setShowKey]    = useState(false)

  // API keys
  const [keys,       setKeys]       = useState<any[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [newKey,     setNewKey]     = useState('')
  const [creatingKey,setCreatingKey]= useState(false)

  const load = async () => {
    try {
      const info = await esoSystem.info()
      setSysInfo(info)
      setProvider(info.llm_provider || 'local')
      setModel(info.llm_model || '')
      setOllamaUrl(info.local_llm_url || 'http://localhost:11434')
    } catch {}
    try { const r = await esoAuth.listKeys(); setKeys(r.api_keys ?? []) } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const effectiveModel = customModel.trim() || model

  const switchLLM = async () => {
    setSwitching(true); setTestResult(null)
    try {
      const body: any = { provider }
      if (effectiveModel) body.model = effectiveModel
      const r = await esoSystem.switchLLM(provider, effectiveModel || undefined)
      setSysInfo((p:any) => ({ ...p, llm_provider:r.current, llm_model:r.model }))
      setTestResult({ status:'ok', message: r.message })
      setCustomModel('')
    } catch (e:any) {
      setTestResult({ status:'error', error: e.message })
    }
    setSwitching(false)
  }

  const testLLM = async () => {
    setTesting(true); setTestResult(null)
    try {
      const r = await esoSystem.testLLM()
      setTestResult(r.ok ? { status:'ok', message:`✓ ${r.model || sysInfo?.llm_model} responded` } : { status:'error', error: r.error || 'No response' })
    } catch (e:any) { setTestResult({ status:'error', error: e.message }) }
    setTesting(false)
  }

  const createKey = async () => {
    if (!newKeyName.trim()) return
    setCreatingKey(true)
    try {
      const r = await esoAuth.createKey(newKeyName.trim())
      setNewKey(r.api_key); setNewKeyName(''); load()
    } catch {}
    setCreatingKey(false)
  }

  const revokeKey = async (id: string) => {
    if (!confirm('Revoke this API key?')) return
    await esoAuth.revokeKey(id).catch(()=>{})
    load()
  }

  const providerModels = provider==='openai' ? OPENAI_MODELS : provider==='anthropic' ? ANTHROPIC_MODELS : null

  return (
    <div className="p-3 sm:p-5 max-w-4xl">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Scan Engine <span className="text-accent">Settings</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">Configure AI provider · Switch LLM at runtime · Manage API keys</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* ── LLM Provider ── */}
        <div className="glass p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">AI / LLM Provider</div>
            {sysInfo && (
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-slate-600">Active:</span>
                <span className="text-accent font-bold">{sysInfo.llm_provider}</span>
                <span className="text-slate-600">·</span>
                <span className="text-accent2">{sysInfo.llm_model}</span>
              </div>
            )}
          </div>

          {/* Provider selector */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { id:'local',     name:'Ollama',    icon:'🏠', desc:'Free · Runs locally · No API key' },
              { id:'openai',    name:'OpenAI',    icon:'🌐', desc:'GPT-4o · Best quality' },
              { id:'anthropic', name:'Anthropic', icon:'🤖', desc:'Claude · Excellent JSON' },
            ].map(p => (
              <button key={p.id} onClick={()=>{ setProvider(p.id); setModel(''); setCustomModel('') }}
                className="p-3 rounded-xl border text-left transition-all cursor-pointer"
                style={provider===p.id
                  ?{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.3)'}
                  :{background:'rgba(255,255,255,0.02)',borderColor:'rgba(255,255,255,0.06)'}}>
                <div className="text-xl mb-1">{p.icon}</div>
                <div className="font-mono text-[12px] font-bold" style={{color:provider===p.id?'#00ffaa':'#94a3b8'}}>{p.name}</div>
                <div className="font-mono text-[10px] text-slate-600 mt-0.5">{p.desc}</div>
                {sysInfo?.llm_provider===p.id && (
                  <div className="font-mono text-[9px] text-accent mt-1">● ACTIVE</div>
                )}
              </button>
            ))}
          </div>

          {/* Model selection */}
          <div className="space-y-3 mb-4">
            {provider === 'local' && (
              <>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Ollama URL</div>
                  <input className={inp} value={ollamaUrl} onChange={e=>setOllamaUrl(e.target.value)} placeholder="http://localhost:11434"/>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Select Model</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    {OLLAMA_MODELS.map(m => (
                      <button key={m.id} onClick={()=>{ setModel(m.id); setCustomModel('') }}
                        className="flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                        style={model===m.id&&!customModel
                          ?{background:'rgba(0,170,255,0.08)',borderColor:'rgba(0,170,255,0.3)'}
                          :{background:'rgba(255,255,255,0.02)',borderColor:'rgba(255,255,255,0.06)'}}>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[11px] font-bold text-slate-200 truncate">{m.id}</div>
                          <div className="font-mono text-[9px] text-slate-600 mt-0.5">{m.size} · {m.note}</div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-mono text-[9px] text-slate-600">Speed {m.speed}</div>
                          <div className="font-mono text-[9px] text-slate-600">Q {m.quality}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-slate-600 mb-1.5">Or type a custom model name:</div>
                    <input className={inp} value={customModel} onChange={e=>setCustomModel(e.target.value)}
                      placeholder="e.g. llama3.1:8b, gemma2:9b, codellama:13b ..."/>
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/[0.04] font-mono text-[10px] text-yellow-500/80">
                  ⚠ phi3:mini struggles with complex JSON planning. Recommend: <span className="text-yellow-400 font-bold">qwen2.5:7b</span> or <span className="text-yellow-400 font-bold">llama3.2:3b</span> for better scan proposals.
                  <br/>Install: <span className="text-slate-400">ollama pull qwen2.5:7b</span>
                </div>
              </>
            )}

            {(provider === 'openai' || provider === 'anthropic') && (
              <>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">API Key</div>
                  <div className="relative">
                    <input className={inp} type={showKey?'text':'password'} value={apiKey}
                      onChange={e=>setApiKey(e.target.value)}
                      placeholder={provider==='openai'?'sk-...':'sk-ant-...'}/>
                    <button onClick={()=>setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer">
                      {showKey?'Hide':'Show'}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Model</div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {(providerModels??[]).map(m => (
                      <button key={m.id} onClick={()=>setModel(m.id)}
                        className="p-2.5 rounded-lg border text-left transition-all cursor-pointer"
                        style={model===m.id
                          ?{background:'rgba(0,170,255,0.08)',borderColor:'rgba(0,170,255,0.3)'}
                          :{background:'rgba(255,255,255,0.02)',borderColor:'rgba(255,255,255,0.06)'}}>
                        <div className="font-mono text-[11px] font-bold text-slate-200">{m.id}</div>
                        <div className="font-mono text-[9px] text-slate-600 mt-0.5">{m.note}</div>
                      </button>
                    ))}
                  </div>
                  <input className={inp} value={customModel} onChange={e=>setCustomModel(e.target.value)} placeholder="Or enter custom model name..."/>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button onClick={switchLLM} disabled={switching}
              className="px-5 py-2.5 rounded-xl border font-mono text-[12px] font-bold cursor-pointer transition-all disabled:opacity-40"
              style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>
              {switching?'⟳ Switching...':'⚡ Apply & Switch'}
            </button>
            <button onClick={testLLM} disabled={testing}
              className="px-5 py-2.5 rounded-xl border border-white/[0.08] font-mono text-[12px] text-slate-400 hover:text-slate-200 cursor-pointer transition-all disabled:opacity-40">
              {testing?'⟳ Testing...':'🧪 Test Connection'}
            </button>
          </div>

          {testResult && (
            <div className="mt-3 p-3 rounded-lg border font-mono text-[11px]"
              style={testResult.status==='ok'
                ?{background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.2)',color:'#00ffaa'}
                :{background:'rgba(255,58,92,0.06)',borderColor:'rgba(255,58,92,0.2)',color:'#ff3a5c'}}>
              {testResult.status==='ok'
                ? `✓ ${testResult.message}`
                : `✗ ${testResult.error}`}
            </div>
          )}
        </div>

        {/* ── System info ── */}
        <div className="glass p-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Infrastructure</div>
          {loading ? (
            <div className="font-mono text-[11px] text-slate-600 animate-pulse">Connecting to ESO...</div>
          ) : sysInfo ? (
            <div className="space-y-2">
              {Object.entries(sysInfo.services||{}).map(([name,status]:any) => {
                const ok = String(status).includes('connect')
                return (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-[12px] capitalize text-slate-300">{name}</span>
                    <span className="font-mono text-[10px] font-bold" style={{color:ok?'#00ffaa':'#ff3a5c'}}>
                      {ok?'● Online':'○ Offline'}
                    </span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between py-2">
                <span className="text-[12px] text-slate-300">Environment</span>
                <span className="font-mono text-[10px] text-accent2">{sysInfo.environment}</span>
              </div>
            </div>
          ) : (
            <div className="font-mono text-[11px] text-red-400">ESO backend offline</div>
          )}
        </div>

        {/* ── API Keys ── */}
        <div className="glass p-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">API Keys (for CI/CD)</div>
          <div className="flex gap-2 mb-3">
            <input className={`${inp} flex-1`} value={newKeyName} onChange={e=>setNewKeyName(e.target.value)}
              placeholder="Key name (e.g. github-actions)" onKeyDown={e=>e.key==='Enter'&&createKey()}/>
            <button onClick={createKey} disabled={creatingKey}
              className="px-3 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer shrink-0 transition-all disabled:opacity-40"
              style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>
              {creatingKey?'...':'+ Create'}
            </button>
          </div>
          {newKey && (
            <div className="p-3 mb-3 rounded-lg border border-accent/20 bg-accent/[0.05]">
              <div className="font-mono text-[9px] text-accent mb-1">⚠ Save this — won't be shown again:</div>
              <div className="font-mono text-[10px] text-slate-300 break-all select-all">{newKey}</div>
            </div>
          )}
          {keys.length===0 ? (
            <div className="font-mono text-[11px] text-slate-600 py-4 text-center">No API keys yet</div>
          ) : (
            <div className="space-y-2">
              {keys.map(k=>(
                <div key={k.key_id} className="flex items-center justify-between p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <div>
                    <div className="text-[12px] font-semibold text-slate-200">{k.name}</div>
                    <div className="font-mono text-[9px] text-slate-600">{k.key_prefix}... · {k.is_active?'Active':'Revoked'}</div>
                  </div>
                  {k.is_active&&(
                    <button onClick={()=>revokeKey(k.key_id)} className="font-mono text-[10px] text-red-400 hover:text-red-300 cursor-pointer">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
