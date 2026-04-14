'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [alias, setAlias]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/v1/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, password }),
      })
      const d = await res.json()
      if (res.ok) {
        sessionStorage.setItem('xcloak-admin-alias', d.alias)
        router.push('/admin')
      } else {
        setError(d.error ?? 'Login failed')
      }
    } catch { setError('Network error') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background:'#03050a' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🛡</div>
          <h1 className="text-2xl font-black">X<span style={{ color:'#00ffaa' }}>cloak</span> Admin</h1>
          <p className="font-mono text-[11px] text-slate-600 mt-1">Restricted access — admins only</p>
        </div>

        <div className="glass p-6">
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Admin Alias</label>
              <input value={alias} onChange={e => setAlias(e.target.value)}
                placeholder="admin" autoComplete="username"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5
                           font-mono text-[12px] text-slate-200 outline-none focus:border-green-500/40
                           transition-colors placeholder-slate-700" required />
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5
                           font-mono text-[12px] text-slate-200 outline-none focus:border-green-500/40
                           transition-colors placeholder-slate-700" required />
            </div>

            {error && (
              <div className="font-mono text-[11px] text-red-400 p-2.5 rounded-lg border border-red-500/20 bg-red-500/8">
                ✗ {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-lg border font-mono text-[12px] font-bold cursor-pointer transition-all disabled:opacity-40"
              style={{ background:'rgba(0,255,170,0.1)', borderColor:'rgba(0,255,170,0.3)', color:'#00ffaa' }}>
              {loading ? '⟳ AUTHENTICATING...' : 'LOGIN →'}
            </button>
          </form>

          <div className="font-mono text-[9px] text-slate-700 mt-4 text-center">
            First login creates the admin account
          </div>
        </div>
      </div>
    </div>
  )
}
