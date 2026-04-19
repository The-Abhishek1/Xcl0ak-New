'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { saveSession } from '@/lib/eso-auth'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const from   = params.get('from') ?? ''

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  // NO useEffect redirect here — let the user see the page.
  // They came here on purpose (even if already logged in).

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/eso/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.detail || 'Invalid email or password')
      saveSession(d.access_token, d.user)
      router.push(from ? `/${from}` : '/scan')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 font-mono text-[13px] text-slate-200 outline-none focus:border-accent/50 transition-all placeholder-slate-700"

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background:'#03050a' }}>
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-10">
          <Link href="/dashboard">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background:'linear-gradient(135deg,#00ffaa22,#00aaff22)', border:'1px solid rgba(0,255,170,0.2)' }}>🛡</div>
              <span className="text-2xl font-black">X<span style={{ color:'#00ffaa' }}>cloak</span></span>
            </div>
          </Link>
          <p className="font-mono text-[11px] text-slate-600">Sign in to your account</p>
        </div>

        <div className="glass p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" className={inp} autoFocus />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" className={inp} />
              <div className="text-right mt-1.5">
                <a href="/forgot-password" className="font-mono text-[10px] text-slate-600 hover:text-accent transition-colors">Forgot password?</a>
              </div>
            </div>

            {error && (
              <div className="font-mono text-[11px] text-red-400 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.05]">
                ✗ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all disabled:opacity-40"
              style={{ background:'linear-gradient(135deg,rgba(0,255,170,0.15),rgba(0,170,255,0.1))', border:'1px solid rgba(0,255,170,0.3)', color:'#00ffaa' }}>
              {loading ? '⟳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.06] text-center space-y-2">
            <p className="font-mono text-[11px] text-slate-600">
              No account? <Link href="/register" className="text-accent hover:underline">Create one free</Link>
            </p>
            <p className="font-mono text-[10px] text-slate-700">
              <Link href="/pricing" className="text-accent2 hover:underline">View plans</Link>
              {' · '}
              <Link href="/admin/login" className="text-slate-600 hover:text-slate-400 transition-colors">Admin login →</Link>
            </p>
            <p className="font-mono text-[10px] text-slate-700">
              <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Terms</Link>
              {' · '}
              <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background:'#03050a' }} />}>
      <LoginForm />
    </Suspense>
  )
}
