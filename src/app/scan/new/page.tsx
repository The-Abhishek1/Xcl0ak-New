'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { esoScans } from '@/lib/eso/api'
import Link from 'next/link'

const TOOLS = [
  { name:'nmap',     desc:'Port & service scanning',     cat:'Recon',   color:'#00aaff' },
  { name:'nuclei',   desc:'Vulnerability scanner (CVEs)',cat:'Vuln',    color:'#ff3a5c' },
  { name:'gobuster', desc:'Directory brute-force',       cat:'Web',     color:'#ff8c42' },
  { name:'nikto',    desc:'Web server vuln scanner',     cat:'Web',     color:'#ff8c42' },
  { name:'ffuf',     desc:'Fast web fuzzer',             cat:'Web',     color:'#ffd700' },
  { name:'whatweb',  desc:'Technology fingerprinting',   cat:'Recon',   color:'#00aaff' },
  { name:'sqlmap',   desc:'SQL injection testing',       cat:'Exploit', color:'#ff3a5c' },
]

export default function NewScanPage() {
  const router = useRouter()
  const targetRef = useRef<HTMLInputElement>(null)
  const goalRef   = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  async function launch() {
    const target = targetRef.current?.value.trim() ?? ''
    const goal   = goalRef.current?.value.trim()   || `Scan ${target} for open ports and vulnerabilities`
    if (!target) { setError('Enter a target domain or IP'); return }
    setError(''); setLoading(true)
    try {
      const r = await esoScans.execute(goal, target)
      router.push(`/scan/${r.process_id}`)
    } catch (e:any) { setError(e.message); setLoading(false) }
  }

  return (
    <div className="p-3 sm:p-5 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/scan" className="font-mono text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">← Back</Link>
        <div>
          <h1 className="text-2xl font-black">New <span className="text-accent">Scan</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-0.5">AI plans and executes using 7 security tools</p>
        </div>
      </div>

      {/* Authorization notice */}
      <div className="glass p-3 mb-3 flex gap-3" style={{borderColor:'rgba(255,58,92,0.2)',background:'rgba(255,58,92,0.04)'}}>
        <span className="text-lg shrink-0">⚠</span>
        <div className="font-mono text-[10px] text-slate-500">
          <span className="text-red-400 font-bold">Authorization required.</span> Only scan targets you own or have explicit written permission to test. Unauthorized scanning is illegal.
        </div>
      </div>

      {/* Local Docker mode info */}
      <div className="glass p-3 mb-4 flex gap-3" style={{borderColor:'rgba(0,170,255,0.2)',background:'rgba(0,170,255,0.04)'}}>
        <span className="text-base shrink-0">🐳</span>
        <div className="font-mono text-[10px] text-slate-500 space-y-0.5">
          <div><span className="text-accent2 font-bold">How scanning works:</span> Security tools (nmap, nuclei, etc.) run as Docker containers <span className="text-slate-400">on your local machine</span>. Your machine does the scanning — our servers handle the AI analysis, report generation, and results storage.</div>
          <div className="text-slate-600">This keeps your scan traffic private and reduces server costs. <span className="text-slate-500">Docker must be running locally for scans to execute.</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Target config */}
        <div className="glass p-5 space-y-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Target Configuration</div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Target Host / IP *</label>
            <input ref={targetRef} defaultValue="" placeholder="scanme.nmap.org or 192.168.1.1"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700" />
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Scan Goal</label>
            <textarea ref={goalRef} defaultValue="Scan for open ports and vulnerabilities"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors resize-none"
              rows={3}/>
            <div className="font-mono text-[9px] text-slate-700 mt-1.5">The AI reads this and creates a scan plan automatically</div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="auth-check" className="accent-accent w-3.5 h-3.5"/>
            <label htmlFor="auth-check" className="font-mono text-[10px] text-slate-500 cursor-pointer">
              I have authorization to scan this target
            </label>
          </div>
          {error && (
            <div className="font-mono text-[11px] text-red-400 p-3 rounded-lg border border-red-500/20 bg-red-500/8">✗ {error}</div>
          )}
          <button onClick={launch} disabled={loading}
            className="w-full py-3 rounded-xl border font-mono text-[13px] font-bold cursor-pointer transition-all disabled:opacity-40"
            style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
            {loading?'⏳ Launching...':'⚡ Launch Scan'}
          </button>
        </div>

        {/* Available tools */}
        <div className="glass p-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Available Tools (AI selects)</div>
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map(t => (
              <div key={t.name} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[12px] font-bold" style={{color:t.color}}>{t.name}</span>
                  <span className="font-mono text-[8px] px-1.5 py-[1px] rounded" style={{background:'rgba(255,255,255,0.05)',color:'#475569'}}>{t.cat}</span>
                </div>
                <div className="font-mono text-[10px] text-slate-600">{t.desc}</div>
              </div>
            ))}
          </div>
          <div className="font-mono text-[9px] text-slate-700 mt-3">
            AI planner selects tools based on your goal. You approve before execution.
          </div>
        </div>
      </div>
    </div>
  )
}
