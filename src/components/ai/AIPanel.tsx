'use client'
import { useState, useRef } from 'react'

export function AIPanel() {
  const [msgs, setMsgs]   = useState<Array<{ role: 'user'|'ai'; text: string }>>([
    { role: 'ai', text: 'Ask me about any CVE, exploit technique, or security concept. I explain with context from real threat data.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  async function send() {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMsgs(m => [...m, { role: 'user', text: q }])
    setLoading(true)

    try {
      // Use OpenAI via our own API — or fallback to a simple static response
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: q }] }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'ai', text: data.message ?? data.error ?? 'No response.' }])
    } catch {
      setMsgs(m => [...m, { role: 'ai', text: 'Error contacting AI service.' }])
    } finally {
      setLoading(false)
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }

  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06]">
        <span className="text-sm">🤖</span>
        <span className="font-mono text-[11px] tracking-widest text-accent uppercase">AI Assistant</span>
        <div className="ml-auto font-mono text-[9px] px-1.5 py-[1px] rounded bg-accent/10 text-accent">ONLINE</div>
      </div>

      <div className="p-2.5 space-y-2 overflow-y-auto" style={{ maxHeight: '180px', scrollbarWidth: 'thin' }}>
        {msgs.map((m, i) => (
          <div key={i}>
            <div className={`font-mono text-[9px] uppercase mb-0.5 tracking-wider ${m.role === 'ai' ? 'text-accent' : 'text-slate-500'}`}>
              {m.role === 'ai' ? 'XCLOAK AI' : 'YOU'}
            </div>
            <div className={`text-[11px] leading-relaxed px-2.5 py-2 rounded-lg border ${
              m.role === 'ai'
                ? 'bg-accent/[0.04] border-accent/10 text-slate-300'
                : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-accent font-mono text-[11px] animate-pulse">Thinking...</div>
        )}
        <div ref={endRef} />
      </div>

      <div className="flex gap-1.5 p-2.5 border-t border-white/[0.06]">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask about any CVE or exploit..."
          className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-2.5 py-1.5
                     font-mono text-[11px] text-slate-300 outline-none placeholder-slate-700
                     focus:border-accent/30 transition-colors" />
        <button onClick={send} disabled={loading}
          className="px-2.5 py-1.5 rounded-md border border-accent/30 bg-accent/10 text-accent
                     font-mono text-[10px] transition-all hover:bg-accent/20 disabled:opacity-50">
          →
        </button>
      </div>
    </div>
  )
}
