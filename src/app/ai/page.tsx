'use client'
import { useState, useRef, useEffect } from 'react'

interface Message { role: 'user' | 'ai'; content: string; ts: number }

const QUICK_PROMPTS = [
  'Explain CVE-2024-53677 (Apache Struts RCE)',
  'What is a buffer overflow and how is it exploited?',
  'How does SQL injection work? Give me examples',
  'Explain the OWASP Top 10 for 2024',
  'What is CVSS scoring and how do I read it?',
  'How do I set up a reverse shell listener?',
  'What tools do bug bounty hunters use?',
  'Explain the difference between XSS and CSRF',
]

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: 'Welcome to XcloakAI. I\'m your cybersecurity assistant — ask me about CVEs, exploit techniques, mitigations, or threat analysis. I have context from the live NVD and OTX feeds.',
      ts: Date.now(),
    }
  ])
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text?: string) {
    const q = (text ?? input).trim()
    if (!q || loading) return
    setInput('')
    const userMsg: Message = { role: 'user', content: q, ts: Date.now() }
    setMessages(m => [...m, userMsg])
    setLoading(true)

    try {
      const history = messages.slice(-8).map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user' as const,
        content: m.content,
      }))
      history.push({ role: 'user', content: q })

      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const d = await res.json()
      setMessages(m => [...m, { role: 'ai', content: d.message ?? 'No response.', ts: Date.now() }])
    } catch {
      setMessages(m => [...m, { role: 'ai', content: 'Failed to reach AI service.', ts: Date.now() }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function formatTime(ts: number) {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="p-3 sm:p-5 flex flex-col" style={{minHeight:"calc(100vh - 84px)"}}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black">AI <span className="text-accent">Assistant</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-0.5">
            Context-aware cybersecurity analysis · Powered by GPT-4o or rule-based fallback
          </p>
        </div>
        <button onClick={() => setMessages([{ role: 'ai', content: 'Chat cleared. Ask me anything.', ts: Date.now() }])}
          className="font-mono text-[10px] px-3 py-2 rounded-lg border border-white/[0.08]
                     text-slate-500 hover:text-slate-300 transition-colors">
          CLEAR CHAT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4 flex-1 min-h-0">
        {/* Chat area */}
        <div className="glass flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 font-bold ${
                  m.role === 'ai'
                    ? 'bg-gradient-to-br from-accent/30 to-accent2/30 text-accent'
                    : 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-300'
                }`}>
                  {m.role === 'ai' ? '🤖' : '👤'}
                </div>
                {/* Bubble */}
                <div className={`max-w-[80%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-3 rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap ${
                    m.role === 'ai'
                      ? 'bg-white/[0.04] border border-white/[0.06] text-slate-200'
                      : 'text-slate-200 border border-accent/15'
                  }`} style={m.role === 'user' ? { background: 'rgba(0,255,170,0.06)' } : {}}>
                    {m.content}
                  </div>
                  <div className="font-mono text-[9px] text-slate-700 mt-1 px-1">
                    {formatTime(m.ts)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-accent"
                  style={{ background: 'rgba(0,255,170,0.15)' }}>🤖</div>
                <div className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-2 h-2 rounded-full bg-accent animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3 p-4 border-t border-white/[0.06]">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask about any CVE, exploit, or security concept..."
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3
                         font-mono text-[12px] text-slate-200 outline-none placeholder-slate-700
                         focus:border-accent/30 transition-colors" />
            <button onClick={() => send()} disabled={loading || !input.trim()}
              className="px-5 py-3 rounded-xl border border-accent/30 bg-accent/8 text-accent
                         font-mono text-[12px] font-bold hover:bg-accent/15 transition-all
                         disabled:opacity-40 cursor-pointer">
              SEND
            </button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="glass p-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
          <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">Quick Prompts</div>
          <div className="space-y-2">
            {QUICK_PROMPTS.map((q, i) => (
              <button key={i} onClick={() => send(q)}
                className="w-full text-left p-3 rounded-lg border border-white/[0.06]
                           hover:border-accent/20 hover:bg-white/[0.03] transition-all text-[12px]
                           text-slate-400 hover:text-slate-200 leading-snug">
                {q}
              </button>
            ))}
          </div>

          <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mt-5 mb-3">Capabilities</div>
          <div className="space-y-1.5">
            {[
              '✓ CVE analysis',
              '✓ CVSS scoring',
              '✓ Exploit explanations',
              '✓ Mitigation advice',
              '✓ Code analysis',
              '✓ Threat context',
              '○ OpenAI key optional',
            ].map((c, i) => (
              <div key={i} className={`font-mono text-[10px] ${c.startsWith('○') ? 'text-yellow-500' : 'text-slate-500'}`}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
