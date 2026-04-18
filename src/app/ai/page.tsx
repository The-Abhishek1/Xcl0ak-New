'use client'
// src/app/ai/page.tsx - Full AI chat page (not just the panel widget)
import { useState, useRef, useEffect } from 'react'

interface Msg { role:'user'|'ai'; text:string; ts:Date }

const SUGGESTIONS = [
  'Explain CVE-2024-3400 and its impact',
  'What is a buffer overflow and how is it exploited?',
  'How do I detect SQL injection in my logs?',
  'What are the OWASP Top 10 for 2024?',
  'Explain zero-day vs N-day vulnerabilities',
  'How does Log4Shell work?',
]

export default function AIPage() {
  const [msgs,    setMsgs]    = useState<Msg[]>([{
    role:'ai',
    text:'I am XcloakAI — a cybersecurity expert AI. Ask me about CVEs, exploit techniques, threat intelligence, or security hardening. I pull context from real NVD and OTX data.',
    ts: new Date(),
  }])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const endRef  = useRef<HTMLDivElement>(null)
  const inpRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs])

  async function send(q?: string) {
    const text = (q ?? input).trim()
    if (!text || loading) return
    setInput('')
    const userMsg: Msg = { role:'user', text, ts: new Date() }
    setMsgs(m => [...m, userMsg])
    setLoading(true)
    try {
      const history = msgs.slice(-8).map(m => ({ role: m.role==='ai'?'assistant':'user', content: m.text }))
      const res = await fetch('/api/v1/ai/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ messages: [...history, { role:'user', content: text }] }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role:'ai', text: data.message ?? data.error ?? 'No response.', ts: new Date() }])
    } catch {
      setMsgs(m => [...m, { role:'ai', text:'Error contacting AI service.', ts: new Date() }])
    } finally {
      setLoading(false)
      setTimeout(() => inpRef.current?.focus(), 100)
    }
  }

  return (
    <div className="p-5 h-[calc(100vh-52px)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">Xcloak <span className="text-accent">AI</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">Cybersecurity AI with real CVE and OTX context</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"/>
          <span className="font-mono text-[10px] text-accent">ONLINE</span>
        </div>
      </div>

      {/* Suggestions */}
      {msgs.length <= 1 && (
        <div className="flex gap-2 flex-wrap">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="font-mono text-[10px] px-3 py-1.5 rounded-lg border border-white/[0.08]
                         text-slate-500 hover:text-accent hover:border-accent/25 transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="glass flex-1 overflow-y-auto p-4 space-y-4" style={{scrollbarWidth:'thin'}}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role==='user'?'flex-row-reverse':''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 ${
              m.role==='ai'?'bg-accent/20 text-accent':'bg-slate-700 text-slate-300'}`}>
              {m.role==='ai'?'🤖':'U'}
            </div>
            <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
              m.role==='ai'
                ? 'bg-white/[0.04] border border-white/[0.06] text-slate-300'
                : 'bg-accent/10 border border-accent/20 text-slate-200'
            }`}>
              <div className={`font-mono text-[9px] uppercase tracking-wider mb-1 ${m.role==='ai'?'text-accent':'text-slate-500'}`}>
                {m.role==='ai'?'XCLOAK AI':'YOU'} · {m.ts.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
              </div>
              <div className="text-[12px] leading-relaxed whitespace-pre-wrap">{m.text}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-sm">🤖</div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3">
              <div className="flex gap-1">
                {[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {/* Input */}
      <div className="glass flex gap-3 p-3">
        <input ref={inpRef} value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()}
          placeholder="Ask about CVEs, exploits, mitigations, threat actors..."
          className="flex-1 bg-transparent font-mono text-[12px] text-slate-300 outline-none placeholder-slate-700"/>
        <button onClick={()=>send()} disabled={loading||!input.trim()}
          className="px-4 py-2 rounded-lg border border-accent/35 bg-accent/10 text-accent
                     font-mono text-[11px] font-bold hover:bg-accent/20 transition-all disabled:opacity-50">
          SEND →
        </button>
      </div>
    </div>
  )
}