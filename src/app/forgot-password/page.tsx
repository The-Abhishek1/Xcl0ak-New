'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email,     setEmail]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [sent,      setSent]      = useState(false)
  const [error,     setError]     = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true); setError('')
    try {
      await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      setSent(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 font-mono text-[13px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'#0a0d14'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-black text-2xl">
            <span className="text-accent">X</span><span className="text-slate-200">cloak</span>
          </Link>
          <p className="font-mono text-[11px] text-slate-600 mt-2">Password recovery</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📬</div>
              <h2 className="font-bold text-lg text-slate-200 mb-2">Check your inbox</h2>
              <p className="font-mono text-[11px] text-slate-500 leading-6">
                If <span className="text-accent">{email}</span> is registered, we sent a reset link. Check spam if you don't see it within 5 minutes.
              </p>
              <Link href="/login" className="block mt-6 font-mono text-[11px] text-accent hover:underline">
                ← Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-black text-xl text-slate-200 mb-1">Forgot Password?</h1>
              <p className="font-mono text-[11px] text-slate-600 mb-6">
                Enter your email and we'll send a reset link.
              </p>

              {error && (
                <div className="font-mono text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 mb-4">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com" required
                    className={inp}
                  />
                </div>

                <button type="submit" disabled={loading || !email}
                  className="w-full font-mono text-[12px] font-bold py-3 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                  style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
                  {loading ? 'Sending...' : 'Send Reset Link →'}
                </button>
              </form>

              <Link href="/login" className="block text-center mt-4 font-mono text-[10px] text-slate-600 hover:text-slate-400">
                ← Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
