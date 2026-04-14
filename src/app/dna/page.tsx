'use client'
import { useState } from 'react'

interface DNAResult {
  payloadType: string
  riskScore: number
  languageDetected: string
  techniques: string[]
  targetSystem: string
  summary: string
}

const RISK_COLOR = (s: number) =>
  s >= 9 ? '#ff3a5c' : s >= 7 ? '#ff8c42' : s >= 4 ? '#ffd700' : '#00ffaa'

export default function DNAPage() {
  const [code, setCode]     = useState('')
  const [result, setResult] = useState<DNAResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  async function analyze() {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/v1/ai/dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setResult(await res.json())
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Exploit <span className="text-accent">DNA Analysis</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Paste any exploit code — AI detects payload type, risk, techniques, and target
        </p>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-4">
        {/* Code input */}
        <div className="space-y-3">
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between"
              style={{ background: 'rgba(0,255,170,0.03)' }}>
              <span className="font-mono text-[10px] text-accent tracking-widest">EXPLOIT CODE INPUT</span>
              <button onClick={() => setCode('')}
                className="font-mono text-[9px] text-slate-600 hover:text-slate-400 transition-colors">
                CLEAR
              </button>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder={`# Paste exploit code here...\n\nimport requests\n\ndef exploit(target):\n    ...\n`}
              className="w-full bg-transparent px-4 py-3 font-mono text-[12px] text-slate-300
                         outline-none resize-none placeholder-slate-700"
              style={{ minHeight: '320px', caretColor: '#00ffaa' }}
              spellCheck={false}
            />
          </div>

          <button onClick={analyze} disabled={loading || !code.trim()}
            className="w-full py-3 rounded-xl border border-accent/35 bg-accent/10 text-accent
                       font-mono text-[13px] font-bold tracking-wider hover:bg-accent/20
                       transition-all disabled:opacity-40 cursor-pointer">
            {loading ? '⟳ ANALYZING...' : '🧬 ANALYZE DNA'}
          </button>

          {error && (
            <div className="font-mono text-[11px] text-red-400 p-3 rounded-lg border border-red-500/25 bg-red-500/8">
              ✗ {error}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {!result && !loading && (
            <div className="glass p-6 text-center">
              <div className="text-4xl mb-3">🧬</div>
              <div className="font-mono text-[12px] text-slate-500">
                Paste exploit code and click Analyze to get AI-powered DNA profiling
              </div>
            </div>
          )}

          {loading && (
            <div className="glass p-6 text-center animate-pulse">
              <div className="text-4xl mb-3">⟳</div>
              <div className="font-mono text-[12px] text-accent">Running DNA analysis...</div>
            </div>
          )}

          {result && (
            <>
              {/* Risk score */}
              <div className="glass p-4">
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">
                  Risk Score
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-5xl font-black leading-none"
                    style={{ color: RISK_COLOR(result.riskScore) }}>
                    {result.riskScore.toFixed(1)}
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${result.riskScore * 10}%`,
                          background: `linear-gradient(90deg, #ffd700, #ff8c42, ${RISK_COLOR(result.riskScore)})`,
                        }} />
                    </div>
                    <div className="font-mono text-[10px] text-slate-600">
                      {result.riskScore >= 9 ? 'CRITICAL' : result.riskScore >= 7 ? 'HIGH' :
                       result.riskScore >= 4 ? 'MEDIUM' : 'LOW'} risk
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="glass p-4">
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Summary</div>
                <p className="text-[13px] text-slate-300 leading-relaxed">{result.summary}</p>
              </div>

              {/* Details grid */}
              <div className="glass p-4 grid grid-cols-2 gap-3">
                {[
                  { label: 'Payload Type',      value: result.payloadType,      color: '#a78bfa' },
                  { label: 'Language',          value: result.languageDetected, color: '#00aaff' },
                  { label: 'Target System',     value: result.targetSystem,     color: '#ff8c42' },
                ].map(item => (
                  <div key={item.label} className="p-3 rounded-lg border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.025)' }}>
                    <div className="font-mono text-[9px] text-slate-600 uppercase mb-1">{item.label}</div>
                    <div className="font-mono text-[13px] font-bold" style={{ color: item.color }}>
                      {item.value || '—'}
                    </div>
                  </div>
                ))}

                {/* Techniques */}
                <div className="p-3 rounded-lg border border-white/[0.06] col-span-2"
                  style={{ background: 'rgba(255,255,255,0.025)' }}>
                  <div className="font-mono text-[9px] text-slate-600 uppercase mb-2">Techniques</div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.techniques.length > 0
                      ? result.techniques.map(t => (
                          <span key={t} className="font-mono text-[10px] px-2 py-[2px] rounded border
                                                    bg-red-500/10 text-red-400 border-red-500/20">
                            {t}
                          </span>
                        ))
                      : <span className="font-mono text-[10px] text-slate-600">None detected</span>
                    }
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="glass p-4 space-y-2">
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Actions</div>
                <button
                  onClick={() => {
                    const text = JSON.stringify(result, null, 2)
                    navigator.clipboard.writeText(text)
                  }}
                  className="w-full font-mono text-[11px] py-2.5 rounded-lg border border-white/[0.08]
                             text-slate-400 hover:text-accent hover:border-accent/25 transition-all">
                  📋 Copy Analysis JSON
                </button>
                <a href="/exploits/upload"
                  className="block w-full font-mono text-[11px] py-2.5 rounded-lg border border-accent/20
                             text-accent bg-accent/5 hover:bg-accent/10 transition-all text-center">
                  ⬆ Upload with DNA Metadata
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
