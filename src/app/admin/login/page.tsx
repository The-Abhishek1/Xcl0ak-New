'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { saveSession } from '@/lib/eso-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  // If already admin, skip
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('eso_user') ?? 'null')
      if (u?.role === 'admin') router.replace('/admin')
    } catch {}
  }, [router])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/eso/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const d = await res.json()

      if (!res.ok) {
        // Show the actual error from ESO (e.g. locked account, wrong password)
        throw new Error(d.detail ?? d.error ?? 'Invalid email or password')
      }
      if (d.user?.role !== 'admin') {
        throw new Error('Access denied — this account does not have admin privileges')
      }

      saveSession(d.access_token, d.user)
      sessionStorage.setItem('xcloak-admin-alias', d.user.username ?? email.split('@')[0])
      // Store ESO token so admin API calls can authenticate
      sessionStorage.setItem('xcloak-admin-token', d.access_token)
      router.push('/admin')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 font-mono text-[13px] text-slate-200 outline-none focus:border-red-500/40 transition-all placeholder-slate-700"

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{background:'#03050a'}}>
      <div className="w-full max-w-[360px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{background:'rgba(255,58,92,0.1)',border:'1px solid rgba(255,58,92,0.25)'}}>🔑</div>
            <span className="text-2xl font-black">X<span style={{color:'#00ffaa'}}>cloak</span></span>
          </div>
          <p className="font-mono text-[11px] text-slate-600">Admin access only</p>
        </div>

        <div className="glass p-6" style={{borderColor:'rgba(255,58,92,0.15)'}}>
          <div className="font-mono text-[9px] uppercase tracking-widest text-red-400/60 text-center mb-5">
            ⚠ Restricted — Authorised Personnel Only
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Admin Email</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="admin@example.com" className={inp} autoFocus/>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Password</label>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="••••••••" className={inp}/>
            </div>

            {error && (
              <div className="font-mono text-[11px] text-red-400 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.05]">
                ✗ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all disabled:opacity-40"
              style={{background:'rgba(255,58,92,0.1)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
              {loading ? '⟳ Verifying...' : 'Access Admin Panel →'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-white/[0.06] text-center">
            <Link href="/login" className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
              ← Back to user login
            </Link>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3 p-2.5 rounded-xl border border-white/[0.05] text-center">
            <p className="font-mono text-[9px] text-slate-700">Dev: dev@example.com / dev_password</p>
          </div>
        )}
      </div>
    </div>
  )
}
