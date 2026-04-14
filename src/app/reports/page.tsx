'use client'
import { useState } from 'react'

interface Finding {
  title: string; severity: string; cvssScore: number; description: string; recommendation: string; cveId?: string
}

export default function ReportsPage() {
  const [target, setTarget]     = useState('')
  const [program, setProgram]   = useState('')
  const [findings, setFindings] = useState<Finding[]>([{ title: '', severity: 'High', cvssScore: 7.5, description: '', recommendation: '', cveId: '' }])
  const [generating, setGenerating] = useState(false)

  function addFinding() {
    setFindings(f => [...f, { title: '', severity: 'Medium', cvssScore: 5.0, description: '', recommendation: '', cveId: '' }])
  }
  function updateFinding(i: number, k: keyof Finding, v: any) {
    setFindings(f => f.map((fi, idx) => idx === i ? { ...fi, [k]: v } : fi))
  }
  function removeFinding(i: number) {
    setFindings(f => f.filter((_, idx) => idx !== i))
  }

  async function generate() {
    if (!target || findings.every(f => !f.title)) return
    setGenerating(true)
    // In production this calls /api/v1/reports/generate which produces a PDF
    // For now we generate a markdown report
    const report = `# Bug Bounty Report\n\n**Target:** ${target}\n**Program:** ${program}\n**Date:** ${new Date().toISOString().split('T')[0]}\n\n---\n\n## Executive Summary\n\n${findings.filter(f => f.title).length} finding(s) identified during assessment of ${target}.\n\n## Findings\n\n${findings.filter(f=>f.title).map((f,i) => `### ${i+1}. [${f.severity}] ${f.title}\n\n**CVE:** ${f.cveId || 'N/A'}  \n**CVSS:** ${f.cvssScore}\n\n**Description:** ${f.description}\n\n**Recommendation:** ${f.recommendation}\n`).join('\n---\n\n')}`

    const blob = new Blob([report], { type: 'text/markdown' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `xcloak-report-${target}-${Date.now()}.md`; a.click()
    URL.revokeObjectURL(url)
    setGenerating(false)
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

  return (
    <div className="p-5 max-w-3xl">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Bug Bounty <span className="text-accent">Report Generator</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">Generate structured reports for bug bounty submissions</p>
      </div>

      <div className="glass p-5 mb-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1.5">Target</label>
            <input value={target} onChange={e => setTarget(e.target.value)} placeholder="example.com" className={inp} />
          </div>
          <div>
            <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1.5">Bug Bounty Program</label>
            <input value={program} onChange={e => setProgram(e.target.value)} placeholder="HackerOne / Bugcrowd" className={inp} />
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {findings.map((f, i) => (
          <div key={i} className="glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-accent uppercase">Finding #{i + 1}</span>
              {findings.length > 1 && (
                <button onClick={() => removeFinding(i)} className="font-mono text-[10px] text-red-400 hover:text-red-300">✕ REMOVE</button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">Title</label>
                <input value={f.title} onChange={e => updateFinding(i, 'title', e.target.value)} placeholder="SQL Injection in login form" className={inp} />
              </div>
              <div>
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">Severity</label>
                <select value={f.severity} onChange={e => updateFinding(i, 'severity', e.target.value)} className={inp}>
                  {['Critical','High','Medium','Low','Informational'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">CVSS Score</label>
                <input type="number" min={0} max={10} step={0.1} value={f.cvssScore}
                  onChange={e => updateFinding(i, 'cvssScore', parseFloat(e.target.value))} className={inp} />
              </div>
              <div>
                <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">CVE ID (optional)</label>
                <input value={f.cveId} onChange={e => updateFinding(i, 'cveId', e.target.value)} placeholder="CVE-2024-XXXXX" className={inp} />
              </div>
            </div>
            <div>
              <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">Description</label>
              <textarea value={f.description} onChange={e => updateFinding(i, 'description', e.target.value)}
                placeholder="Technical description of the vulnerability..." rows={3}
                className={`${inp} resize-none`} />
            </div>
            <div>
              <label className="font-mono text-[9px] text-slate-600 uppercase tracking-widest block mb-1">Recommendation</label>
              <textarea value={f.recommendation} onChange={e => updateFinding(i, 'recommendation', e.target.value)}
                placeholder="Steps to remediate..." rows={2}
                className={`${inp} resize-none`} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addFinding}
          className="flex-1 py-3 rounded-lg border border-white/[0.08] text-slate-500
                     font-mono text-[12px] hover:text-slate-300 hover:border-white/[0.15] transition-all">
          + ADD FINDING
        </button>
        <button onClick={generate} disabled={generating || !target}
          className="flex-1 py-3 rounded-lg border border-accent/35 bg-accent/10 text-accent
                     font-mono text-[12px] font-bold hover:bg-accent/20 transition-all
                     disabled:opacity-40 cursor-pointer">
          {generating ? '⟳ GENERATING...' : '⬇ EXPORT MARKDOWN'}
        </button>
      </div>
    </div>
  )
}
