'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CATS   = ['web','pwn','crypto','forensics','misc','reverse','osint']
const DIFFS  = ['easy','medium','hard']

export default function CTFSubmitPage() {
  const router = useRouter()
  const [alias, setAlias]   = useState('anon')
  const [form, setForm]     = useState({
    title: '', category: 'web', difficulty: 'medium',
    description: '', flag: '', points: '300',
    hints: ['', '', ''],
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult]         = useState<{ ok: boolean; msg: string } | null>(null)

  useEffect(() => {
    setAlias(localStorage.getItem('xcloak:alias') ?? 'anon')
  }, [])

  function set(k: string, v: any) { setForm(f => ({ ...f, [k]: v })) }
  function setHint(i: number, v: string) {
    setForm(f => { const h = [...f.hints]; h[i] = v; return { ...f, hints: h } })
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.flag || !form.description) return
    if (!form.flag.startsWith('xcloak{')) {
      setResult({ ok: false, msg: 'Flag must start with xcloak{...}' }); return
    }
    setSubmitting(true); setResult(null)
    try {
      const res = await fetch('/api/v1/ctf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          points:      parseInt(form.points),
          authorAlias: alias,
          hints:       form.hints.filter(Boolean),
        }),
      })
      const d = await res.json()
      if (res.ok) {
        setResult({ ok: true, msg: d.message })
        setTimeout(() => router.push('/ctf'), 2500)
      } else {
        setResult({ ok: false, msg: d.error ?? 'Submission failed' })
      }
    } catch { setResult({ ok: false, msg: 'Network error' }) }
    finally  { setSubmitting(false) }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-green-500/40 transition-colors placeholder-slate-700"

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black">Submit <span style={{ color:'#00ffaa' }}>CTF Challenge</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          As <span style={{ color:'#00ffaa' }}>{alias}</span> · Reviewed by admins before going live
        </p>
      </div>

      {/* Approval notice */}
      <div className="glass p-4 mb-5 flex gap-3" style={{ borderColor:'rgba(255,215,0,0.2)', background:'rgba(255,215,0,0.04)' }}>
        <span className="text-lg shrink-0">📋</span>
        <div>
          <div className="font-mono text-[11px] font-bold text-yellow-400 mb-1">ADMIN REVIEW REQUIRED</div>
          <div className="font-mono text-[10px] text-slate-500">
            Submitted challenges are reviewed for quality and correctness before appearing publicly. Flag correctness, difficulty, and description will be verified.
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="glass p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Challenge Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="e.g. Cookie Monster, RSA with a Twist" className={inp} required />
          </div>

          {/* Category + Difficulty + Points */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inp}>
                {CATS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Difficulty *</label>
              <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)} className={inp}>
                {DIFFS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Points *</label>
              <input type="number" value={form.points} onChange={e => set('points', e.target.value)}
                min={50} max={1000} step={50} className={inp} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              placeholder="Describe the challenge. What's the goal? What vulnerability does it demonstrate?"
              className={`${inp} resize-y`} rows={4} required />
          </div>
        </div>

        {/* Flag */}
        <div className="glass p-5">
          <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Flag *</label>
          <input value={form.flag} onChange={e => set('flag', e.target.value)}
            placeholder="xcloak{your_flag_here}" className={inp}
            style={{ color:'#00ffaa', letterSpacing:'0.05em' }} required />
          <div className="font-mono text-[9px] text-slate-600 mt-1.5">
            Must start with <span style={{ color:'#00ffaa' }}>xcloak{'{'}</span>...{'}'} — flag is hashed before storage, only you know the plaintext
          </div>
        </div>

        {/* Hints (optional) */}
        <div className="glass p-5 space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Hints (optional — up to 3)</div>
          {form.hints.map((h, i) => (
            <div key={i}>
              <label className="font-mono text-[9px] text-slate-700 block mb-1">Hint {i + 1}</label>
              <input value={h} onChange={e => setHint(i, e.target.value)}
                placeholder={i === 0 ? 'First hint (easiest)' : i === 1 ? 'Second hint' : 'Final hint (most revealing)'}
                className={inp} />
            </div>
          ))}
        </div>

        {result && (
          <div className="font-mono text-[11px] p-3 rounded-lg border"
            style={{
              background: result.ok ? 'rgba(0,255,170,0.06)' : 'rgba(255,58,92,0.06)',
              borderColor: result.ok ? 'rgba(0,255,170,0.2)' : 'rgba(255,58,92,0.2)',
              color: result.ok ? '#00ffaa' : '#ff3a5c',
            }}>
            {result.ok ? '✓' : '✗'} {result.msg}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={submitting}
            className="flex-1 py-3 rounded-lg border font-mono text-[12px] font-bold tracking-wider cursor-pointer transition-all disabled:opacity-40"
            style={{ background:'rgba(0,255,170,0.1)', borderColor:'rgba(0,255,170,0.35)', color:'#00ffaa' }}>
            {submitting ? '⟳ SUBMITTING...' : '📤 SUBMIT FOR REVIEW'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-6 py-3 rounded-lg border border-white/[0.08] text-slate-500 font-mono text-[12px] hover:text-slate-300 cursor-pointer transition-colors">
            BACK
          </button>
        </div>
      </form>
    </div>
  )
}
