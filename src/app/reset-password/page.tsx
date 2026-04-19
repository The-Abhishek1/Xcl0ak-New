'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordInner() {
  const params   = useSearchParams()
  const router   = useRouter()
  const token    = params.get('token') ?? ''
  const email    = params.get('email') ?? ''

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 font-mono text-[13px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/eso/auth/reset-password', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, token, password }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.detail ?? d.error ?? 'Reset failed')
      setDone(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token || !email) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'#0a0d14'}}>
      <div className="glass p-8 rounded-2xl text-center max-w-sm w-full">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="font-mono text-[12px] text-red-400">Invalid reset link.</p>
        <Link href="/forgot-password" className="block mt-4 font-mono text-[11px] text-accent hover:underline">
          Request a new one →
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'#0a0d14'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-2xl">
            <span className="text-accent">X</span><span className="text-slate-200">cloak</span>
          </Link>
          <p className="font-mono text-[11px] text-slate-600 mt-2">Set new password</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          {done ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="font-bold text-lg text-slate-200 mb-2">Password updated!</h2>
              <p className="font-mono text-[11px] text-slate-500">Redirecting to sign in...</p>
            </div>
          ) : (
            <>
              <h1 className="font-black text-xl text-slate-200 mb-1">New Password</h1>
              <p className="font-mono text-[10px] text-slate-600 mb-6">
                For <span className="text-accent">{email}</span>
              </p>

              {error && (
                <div className="font-mono text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">New Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Min 8 characters" required minLength={8} className={inp} />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Confirm Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                    placeholder="Repeat password" required className={inp} />
                </div>
                <button type="submit" disabled={loading || !password || !confirm}
                  className="w-full font-mono text-[12px] font-bold py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                  style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                  {loading ? 'Updating...' : 'Set New Password →'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{background:'#0a0d14'}}>
        <div className="font-mono text-[11px] text-slate-600 animate-pulse">Loading...</div>
      </div>
    }>
      <ResetPasswordInner />
    </Suspense>
  )
}
