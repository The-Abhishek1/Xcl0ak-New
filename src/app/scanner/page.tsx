'use client'
import { useState } from 'react'
import { timeAgo } from '@/lib/utils'

interface ScanResult {
  subdomains: string[]
  ports: { port: number; service: string; banner?: string }[]
  techs: { name: string; version?: string; category: string }[]
  cveMatches: { tech: string; cveId: string; cvssScore: number; description: string }[]
  otxData: any
  whois: any
  riskScore: number
  scanTime: number
}

const COMMON_PORTS = [
  { port: 21, service: 'FTP' }, { port: 22, service: 'SSH' },
  { port: 25, service: 'SMTP' }, { port: 53, service: 'DNS' },
  { port: 80, service: 'HTTP' }, { port: 110, service: 'POP3' },
  { port: 143, service: 'IMAP' }, { port: 443, service: 'HTTPS' },
  { port: 445, service: 'SMB' }, { port: 3306, service: 'MySQL' },
  { port: 3389, service: 'RDP' }, { port: 5432, service: 'PostgreSQL' },
  { port: 6379, service: 'Redis' }, { port: 8080, service: 'HTTP-Alt' },
  { port: 8443, service: 'HTTPS-Alt' }, { port: 27017, service: 'MongoDB' },
]

const SCAN_MODULES = [
  { id: 'subdomains', icon: '🔍', name: 'Subdomains', desc: 'DNS brute-force + cert transparency' },
  { id: 'ports',      icon: '📡', name: 'Port Scan',  desc: 'Top 16 TCP ports' },
  { id: 'techs',      icon: '🔬', name: 'Tech Stack', desc: 'HTTP fingerprinting' },
  { id: 'cve',        icon: '⚠',  name: 'CVE Mapping',desc: 'Match techs to known CVEs' },
  { id: 'otx',        icon: '🛡',  name: 'OTX Lookup', desc: 'AlienVault threat intel' },
]

function RiskBar({ score }: { score: number }) {
  const color = score >= 7 ? '#ff3a5c' : score >= 4 ? '#ff8c42' : '#00ffaa'
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score * 10}%`, background: color }} />
      </div>
      <span className="font-mono text-sm font-bold" style={{ color }}>{score.toFixed(1)}</span>
    </div>
  )
}

export default function ScannerPage() {
  const [target,   setTarget]   = useState('')
  const [modules,  setModules]  = useState(new Set(['subdomains','ports','techs','cve','otx']))
  const [scanning, setScanning] = useState(false)
  const [logs,     setLogs]     = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [result,   setResult]   = useState<ScanResult | null>(null)

  function addLog(msg: string) { setLogs(l => [...l, `[${new Date().toLocaleTimeString()}] ${msg}`]) }

  function toggleModule(id: string) {
    setModules(m => { const n = new Set(m); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  async function runScan() {
    if (!target.trim()) return
    setScanning(true); setLogs([]); setProgress(0); setResult(null)

    const domain = target.replace(/^https?:\/\//, '').split('/')[0].trim()
    addLog(`Starting scan on: ${domain}`)

    const res: ScanResult = {
      subdomains: [], ports: [], techs: [], cveMatches: [],
      otxData: null, whois: null, riskScore: 0, scanTime: 0,
    }
    const t0 = Date.now()
    const total = modules.size
    let done = 0

    const step = () => { done++; setProgress(Math.round((done / total) * 100)) }

    // 1. OTX domain lookup (real API)
    if (modules.has('otx')) {
      addLog('Querying AlienVault OTX...')
      try {
        const r = await fetch(`/api/v1/scanner/otx?domain=${encodeURIComponent(domain)}`)
        if (r.ok) {
          res.otxData = await r.json()
          const pulseCount = res.otxData?.pulse_info?.count ?? 0
          addLog(`OTX: ${pulseCount} pulse(s) found for ${domain}`)
        }
      } catch { addLog('OTX: lookup failed') }
      step()
    }

    // 2. Subdomains via DNS (real fetch to our API)
    if (modules.has('subdomains')) {
      addLog('Discovering subdomains via DNS...')
      try {
        const r = await fetch(`/api/v1/scanner/subdomains?domain=${encodeURIComponent(domain)}`)
        if (r.ok) {
          const data = await r.json()
          res.subdomains = data.found ?? []
          addLog(`Found ${res.subdomains.length} subdomains`)
        }
      } catch { addLog('Subdomain discovery failed') }
      step()
    }

    // 3. Port scan (real TCP check via API)
    if (modules.has('ports')) {
      addLog('Scanning top ports...')
      try {
        const r = await fetch(`/api/v1/scanner/ports?host=${encodeURIComponent(domain)}`)
        if (r.ok) {
          const data = await r.json()
          res.ports = data.open ?? []
          addLog(`Open ports: ${res.ports.map((p: any) => p.port).join(', ') || 'none detected'}`)
        }
      } catch { addLog('Port scan failed') }
      step()
    }

    // 4. Tech detection (headers + HTML)
    if (modules.has('techs')) {
      addLog('Fingerprinting technology stack...')
      try {
        const r = await fetch(`/api/v1/scanner/techs?url=https://${encodeURIComponent(domain)}`)
        if (r.ok) {
          const data = await r.json()
          res.techs = data.techs ?? []
          addLog(`Detected: ${res.techs.map((t: any) => t.name).join(', ') || 'unknown'}`)
        }
      } catch { addLog('Tech detection failed') }
      step()
    }

    // 5. CVE matching
    if (modules.has('cve') && res.techs.length > 0) {
      addLog('Mapping technologies to CVEs via NVD...')
      try {
        const r = await fetch('/api/v1/scanner/cve-match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ techs: res.techs }),
        })
        if (r.ok) {
          const data = await r.json()
          res.cveMatches = data.matches ?? []
          addLog(`CVE matches: ${res.cveMatches.length} found`)
        }
      } catch { addLog('CVE mapping failed') }
      step()
    } else if (modules.has('cve')) { step() }

    // Compute risk score
    const portRisk   = res.ports.filter(p => [21,23,3389,6379,27017].includes(p.port)).length * 0.5
    const cveRisk    = res.cveMatches.length > 0
      ? Math.max(...res.cveMatches.map(c => c.cvssScore)) : 0
    const otxRisk    = (res.otxData?.pulse_info?.count ?? 0) > 0 ? 2 : 0
    res.riskScore    = Math.min(10, (portRisk + cveRisk * 0.6 + otxRisk))
    res.scanTime     = ((Date.now() - t0) / 1000)

    addLog(`Scan complete in ${res.scanTime.toFixed(1)}s — Risk score: ${res.riskScore.toFixed(1)}/10`)
    setResult(res)
    setScanning(false)
    setProgress(100)
  }

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Attack Surface <span className="text-accent">Scanner</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Real DNS · AlienVault OTX · NVD CVE mapping · Tech fingerprinting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        {/* Left: config + results */}
        <div className="space-y-4">

          {/* Target input */}
          <div className="glass p-5">
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-2">
              Target Domain / IP
            </label>
            <div className="flex gap-3">
              <input value={target} onChange={e => setTarget(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !scanning && runScan()}
                placeholder="example.com or 192.168.1.1"
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3
                           font-mono text-[13px] text-slate-200 outline-none placeholder-slate-700
                           focus:border-accent/30 transition-colors" />
              <button onClick={runScan} disabled={scanning || !target.trim()}
                className="px-6 py-3 rounded-lg border border-accent/35 bg-accent/10 text-accent
                           font-mono text-[12px] font-bold hover:bg-accent/20 transition-all
                           disabled:opacity-40 cursor-pointer whitespace-nowrap">
                {scanning ? '⟳ SCANNING...' : '▶ RUN SCAN'}
              </button>
            </div>

            {/* Module selector */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-4">
              {SCAN_MODULES.map(m => (
                <button key={m.id} onClick={() => toggleModule(m.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all duration-150
                    ${modules.has(m.id)
                      ? 'border-accent/35 bg-accent/8'
                      : 'border-white/[0.06] hover:border-white/[0.12]'}`}>
                  <div className="text-base mb-1">{m.icon}</div>
                  <div className={`font-mono text-[10px] font-bold ${modules.has(m.id) ? 'text-accent' : 'text-slate-400'}`}>
                    {m.name}
                  </div>
                  <div className="font-mono text-[9px] text-slate-600">{m.desc}</div>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            {scanning && (
              <div className="mt-4">
                <div className="flex justify-between font-mono text-[10px] text-slate-600 mb-1.5">
                  <span>Scanning...</span><span>{progress}%</span>
                </div>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#00ffaa,#00aaff)' }} />
                </div>
              </div>
            )}
          </div>

          {/* Scan log */}
          {logs.length > 0 && (
            <div className="glass overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/[0.06]" style={{ background: 'rgba(0,255,170,0.03)' }}>
                <span className="font-mono text-[10px] text-accent tracking-widest">SCAN LOG</span>
              </div>
              <div className="p-3 space-y-1 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {logs.map((l, i) => (
                  <div key={i} className="font-mono text-[11px] text-slate-400">{l}</div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-3">

              {/* Risk score */}
              <div className="glass p-4">
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">
                  Overall Risk Score
                </div>
                <RiskBar score={result.riskScore} />
                <div className="font-mono text-[10px] text-slate-600 mt-2">
                  Scan completed in {result.scanTime.toFixed(1)}s
                </div>
              </div>

              {/* OTX Threat Intel */}
              {result.otxData && (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">🛡 OTX Threat Intel</span>
                    {result.otxData.pulse_info?.count > 0 && (
                      <span className="font-mono text-[9px] px-1.5 py-[1px] rounded bg-red-500/15 text-red-400 border border-red-500/25">
                        {result.otxData.pulse_info.count} PULSES
                      </span>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    {result.otxData.pulse_info?.count === 0 ? (
                      <div className="font-mono text-[11px] text-slate-500">✓ No OTX threat pulses found for this domain</div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.025)' }}>
                            <div className="font-mono text-[9px] text-slate-600 mb-1">PULSE COUNT</div>
                            <div className="font-mono text-xl font-bold text-red-400">{result.otxData.pulse_info?.count ?? 0}</div>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.025)' }}>
                            <div className="font-mono text-[9px] text-slate-600 mb-1">INDICATOR TYPE</div>
                            <div className="font-mono text-sm font-bold text-slate-300">{result.otxData.type_title ?? 'domain'}</div>
                          </div>
                        </div>
                        {result.otxData.pulse_info?.pulses?.slice(0, 3).map((p: any, i: number) => (
                          <a key={i} href={`https://otx.alienvault.com/pulse/${p.id}`}
                            target="_blank" rel="noreferrer"
                            className="block p-2.5 rounded-lg border border-white/[0.06] hover:border-accent/20 transition-colors"
                            style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <div className="text-[12px] text-slate-300 mb-1">{p.name}</div>
                            <div className="font-mono text-[9px] text-slate-600">
                              {p.tags?.slice(0, 4).join(', ')}
                            </div>
                          </a>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Subdomains */}
              {result.subdomains.length > 0 && (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                      🔍 Subdomains ({result.subdomains.length})
                    </span>
                  </div>
                  <div className="p-3 flex flex-wrap gap-2">
                    {result.subdomains.map(s => (
                      <span key={s} className="font-mono text-[10px] px-2.5 py-1 rounded border border-white/[0.08] text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ports */}
              {result.ports.length > 0 && (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                      📡 Open Ports ({result.ports.length})
                    </span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                    {result.ports.map((p, i) => {
                      const dangerous = [21, 23, 3389, 6379, 27017].includes(p.port)
                      return (
                        <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                          <span className="font-mono text-[11px] font-bold text-accent2 w-12">{p.port}</span>
                          <span className="font-mono text-[11px] text-slate-300 flex-1">{p.service}</span>
                          {p.banner && <span className="font-mono text-[10px] text-slate-600 truncate max-w-[200px]">{p.banner}</span>}
                          {dangerous && (
                            <span className="font-mono text-[9px] px-1.5 py-[1px] rounded border bg-red-500/12 text-red-400 border-red-500/20">
                              RISKY
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {result.techs.length > 0 && (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
                      🔬 Technology Stack
                    </span>
                  </div>
                  <div className="p-3 flex flex-wrap gap-2">
                    {result.techs.map((t, i) => (
                      <div key={i} className="px-3 py-2 rounded-lg border border-white/[0.06]"
                        style={{ background: 'rgba(255,255,255,0.025)' }}>
                        <div className="font-mono text-[11px] font-bold text-slate-200">{t.name}</div>
                        {t.version && <div className="font-mono text-[9px] text-slate-600">v{t.version}</div>}
                        <div className="font-mono text-[9px] text-slate-600 mt-0.5">{t.category}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CVE matches */}
              {result.cveMatches.length > 0 && (
                <div className="glass overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">
                      ⚠ CVE Matches ({result.cveMatches.length})
                    </span>
                  </div>
                  <div className="divide-y divide-white/[0.03]">
                    {result.cveMatches.map((c, i) => (
                      <a key={i} href={`https://nvd.nist.gov/vuln/detail/${c.cveId}`}
                        target="_blank" rel="noreferrer"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-[11px] font-bold text-accent2">{c.cveId}</div>
                          <div className="text-[11px] text-slate-400 truncate">{c.description}</div>
                          <div className="font-mono text-[9px] text-slate-600 mt-0.5">via {c.tech}</div>
                        </div>
                        <span className={`font-mono text-[10px] font-bold px-2 py-[2px] rounded border shrink-0 ${
                          c.cvssScore >= 9 ? 'bg-red-500/15 text-red-400 border-red-500/25' :
                          c.cvssScore >= 7 ? 'bg-orange-500/15 text-orange-400 border-orange-500/25' :
                          'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'
                        }`}>{c.cvssScore.toFixed(1)}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: quick OSINT */}
        <div className="space-y-4">
          <div className="glass p-4">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">Quick OSINT</div>
            <div className="space-y-2">
              {[
                { label: 'Shodan', url: (t: string) => `https://www.shodan.io/search?query=${t}`, icon: '🔭' },
                { label: 'VirusTotal', url: (t: string) => `https://www.virustotal.com/gui/domain/${t}`, icon: '🦠' },
                { label: 'URLScan', url: (t: string) => `https://urlscan.io/search/#domain:${t}`, icon: '🔎' },
                { label: 'OTX Domain', url: (t: string) => `https://otx.alienvault.com/indicator/domain/${t}`, icon: '🛡' },
                { label: 'Censys', url: (t: string) => `https://search.censys.io/hosts?q=${t}`, icon: '📊' },
                { label: 'DNSDumpster', url: (_t: string) => `https://dnsdumpster.com`, icon: '🗺' },
              ].map(tool => (
                <a key={tool.label}
                  href={target ? tool.url(target.replace(/^https?:\/\//, '').split('/')[0]) : '#'}
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-white/[0.06]
                             hover:border-accent/20 hover:bg-white/[0.03] transition-all">
                  <span className="text-base">{tool.icon}</span>
                  <span className="font-mono text-[11px] text-slate-300">{tool.label}</span>
                  <span className="ml-auto font-mono text-[9px] text-slate-600">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div className="glass p-4">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">Payload Library</div>
            <div className="space-y-1.5">
              {[
                { label: 'XSS Payloads',     href: '/payloads?type=xss' },
                { label: 'SQLi Strings',     href: '/payloads?type=sqli' },
                { label: 'Reverse Shells',   href: '/payloads?type=shells' },
                { label: 'LFI/RFI Paths',    href: '/payloads?type=lfi' },
                { label: 'SSRF Bypasses',    href: '/payloads?type=ssrf' },
              ].map(p => (
                <a key={p.label} href={p.href}
                  className="block font-mono text-[11px] text-slate-500 hover:text-accent
                             transition-colors py-1 border-b border-white/[0.03]">
                  → {p.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
