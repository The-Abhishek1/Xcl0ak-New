'use client'
import { useState } from 'react'
import Link from 'next/link'

const TRACKS = [
  {
    id: 'beginner',
    icon: '🌱',
    label: 'Beginner',
    color: '#00ffaa',
    desc: 'Start your security journey',
    modules: [
      { title: 'What is cybersecurity?', type: 'read', done: true },
      { title: 'Understanding the CIA Triad', type: 'read', done: true },
      { title: 'How the Web works (HTTP/HTTPS)', type: 'read', done: false },
      { title: 'Common attack types overview', type: 'read', done: false },
      { title: 'Setting up a lab with VirtualBox', type: 'lab', done: false },
      { title: 'First CTF: Cookie Monster', type: 'ctf', done: false },
    ],
  },
  {
    id: 'web',
    icon: '🌐',
    label: 'Web Security',
    color: '#00aaff',
    desc: 'OWASP Top 10 and beyond',
    modules: [
      { title: 'SQL Injection — theory & practice', type: 'read', done: false },
      { title: 'Cross-Site Scripting (XSS)', type: 'read', done: false },
      { title: 'CSRF — attack and defense', type: 'read', done: false },
      { title: 'Authentication flaws (JWT, sessions)', type: 'read', done: false },
      { title: 'SSRF & XXE injection', type: 'read', done: false },
      { title: 'Burp Suite fundamentals', type: 'lab', done: false },
      { title: 'CTF: SQLi in the Dark', type: 'ctf', done: false },
    ],
  },
  {
    id: 'binary',
    icon: '💣',
    label: 'Binary Exploitation',
    color: '#ff3a5c',
    desc: 'Low-level attack techniques',
    modules: [
      { title: 'x86/x64 assembly basics', type: 'read', done: false },
      { title: 'Stack buffer overflows', type: 'read', done: false },
      { title: 'Return-Oriented Programming (ROP)', type: 'read', done: false },
      { title: 'Heap exploitation fundamentals', type: 'read', done: false },
      { title: 'Format string vulnerabilities', type: 'read', done: false },
      { title: 'GDB & pwntools setup', type: 'lab', done: false },
      { title: 'CTF: Stack Smasher', type: 'ctf', done: false },
    ],
  },
  {
    id: 'network',
    icon: '📡',
    label: 'Network Security',
    color: '#a78bfa',
    desc: 'Packets, protocols, and pivoting',
    modules: [
      { title: 'TCP/IP deep dive', type: 'read', done: false },
      { title: 'Network scanning with Nmap', type: 'lab', done: false },
      { title: 'Man-in-the-Middle attacks', type: 'read', done: false },
      { title: 'VPN & tunneling techniques', type: 'read', done: false },
      { title: 'Wireshark packet analysis', type: 'lab', done: false },
      { title: 'CTF: Phantom Packet', type: 'ctf', done: false },
    ],
  },
  {
    id: 'crypto',
    icon: '🔐',
    label: 'Cryptography',
    color: '#ffd700',
    desc: 'Breaking and building secure systems',
    modules: [
      { title: 'Symmetric encryption (AES)', type: 'read', done: false },
      { title: 'Asymmetric encryption (RSA)', type: 'read', done: false },
      { title: 'Hash functions & collisions', type: 'read', done: false },
      { title: 'Padding oracle attacks', type: 'read', done: false },
      { title: "Wiener's attack on RSA", type: 'read', done: false },
      { title: "CTF: RSA with Twist", type: 'ctf', done: false },
    ],
  },
  {
    id: 'red',
    icon: '🎯',
    label: 'Red Teaming',
    color: '#ff8c42',
    desc: 'Advanced offensive techniques',
    modules: [
      { title: 'OPSEC fundamentals', type: 'read', done: false },
      { title: 'Active Directory attacks', type: 'read', done: false },
      { title: 'Lateral movement techniques', type: 'read', done: false },
      { title: 'C2 frameworks (Cobalt Strike, Sliver)', type: 'read', done: false },
      { title: 'Malware development basics', type: 'read', done: false },
      { title: 'Full red team simulation', type: 'lab', done: false },
    ],
  },
]

const RESOURCES = [
  { name: 'HackTheBox',        url: 'https://hackthebox.com',         icon: '📦', desc: 'Practice machines' },
  { name: 'TryHackMe',         url: 'https://tryhackme.com',           icon: '🎯', desc: 'Guided learning paths' },
  { name: 'PortSwigger Labs',  url: 'https://portswigger.net/web-security', icon: '🔬', desc: 'Web security labs' },
  { name: 'PicoCTF',           url: 'https://picoctf.org',             icon: '🏁', desc: 'Beginner CTF' },
  { name: 'CTFtime',           url: 'https://ctftime.org',             icon: '⏱', desc: 'CTF calendar' },
  { name: 'HackTricks',        url: 'https://book.hacktricks.xyz',     icon: '📖', desc: 'Technique bible' },
  { name: 'Exploit-DB',        url: 'https://exploit-db.com',          icon: '💾', desc: 'Public exploits' },
  { name: 'GTFOBins',          url: 'https://gtfobins.github.io',      icon: '🚀', desc: 'Unix privilege escalation' },
]

const TYPE_ICON: Record<string, string> = { read: '📄', lab: '🧪', ctf: '🚩' }
const TYPE_COLOR: Record<string, string> = {
  read: 'text-slate-400', lab: 'text-accent2', ctf: 'text-yellow-400',
}

export default function LearnPage() {
  const [activeTrack, setActiveTrack] = useState('beginner')
  const [progress, setProgress]       = useState<Record<string, boolean>>({})

  const track = TRACKS.find(t => t.id === activeTrack)!

  function toggle(key: string) {
    setProgress(p => ({ ...p, [key]: !p[key] }))
  }

  const totalDone = track.modules.filter(
    (m, i) => m.done || progress[`${activeTrack}-${i}`]
  ).length

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Learning <span className="text-accent">Paths</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Structured cybersecurity curriculum — beginner to red team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        {/* Track selector */}
        <div className="space-y-2">
          {TRACKS.map(t => {
            const done = t.modules.filter((m, i) => m.done || progress[`${t.id}-${i}`]).length
            const pct  = Math.round((done / t.modules.length) * 100)
            return (
              <button key={t.id} onClick={() => setActiveTrack(t.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 block
                  ${activeTrack === t.id
                    ? 'border-opacity-50'
                    : 'border-white/[0.06] hover:border-white/[0.12]'}`}
                style={{
                  background: activeTrack === t.id ? `${t.color}12` : 'rgba(255,255,255,0.025)',
                  borderColor: activeTrack === t.id ? `${t.color}40` : undefined,
                }}>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-lg">{t.icon}</span>
                  <span className="font-bold text-[13px]" style={{ color: activeTrack === t.id ? t.color : '#e2e8f0' }}>
                    {t.label}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-slate-600 mb-2">{t.desc}</div>
                {/* Progress bar */}
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: t.color }} />
                </div>
                <div className="font-mono text-[9px] text-slate-600 mt-1">{done}/{t.modules.length} complete</div>
              </button>
            )
          })}
        </div>

        {/* Track content */}
        <div className="space-y-4">
          {/* Header */}
          <div className="glass p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{track.icon}</span>
              <div>
                <h2 className="text-xl font-black" style={{ color: track.color }}>{track.label}</h2>
                <p className="font-mono text-[11px] text-slate-500">{track.desc}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="font-mono text-2xl font-bold" style={{ color: track.color }}>
                  {Math.round((totalDone / track.modules.length) * 100)}%
                </div>
                <div className="font-mono text-[9px] text-slate-600">COMPLETE</div>
              </div>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(totalDone / track.modules.length) * 100}%`, background: track.color }} />
            </div>
          </div>

          {/* Module list */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: track.color }}>Modules</span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {track.modules.map((mod, i) => {
                const key   = `${activeTrack}-${i}`
                const done  = mod.done || progress[key]
                return (
                  <div key={i}
                    className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer
                                transition-colors hover:bg-white/[0.03]
                                ${done ? 'opacity-70' : ''}`}
                    onClick={() => toggle(key)}>

                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all
                                    ${done ? 'border-current' : 'border-white/[0.15]'}`}
                      style={{ color: done ? track.color : undefined,
                               background: done ? `${track.color}20` : undefined }}>
                      {done && <span className="text-[11px] font-bold">✓</span>}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className={`text-[13px] font-semibold transition-colors
                                      ${done ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                        {mod.title}
                      </div>
                    </div>

                    {/* Type badge */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-sm">{TYPE_ICON[mod.type]}</span>
                      <span className={`font-mono text-[9px] uppercase ${TYPE_COLOR[mod.type]}`}>
                        {mod.type}
                      </span>
                      {mod.type === 'ctf' && (
                        <Link href="/ctf" onClick={e => e.stopPropagation()}
                          className="font-mono text-[9px] px-1.5 py-[1px] rounded border
                                     border-yellow-500/25 bg-yellow-500/10 text-yellow-400
                                     hover:bg-yellow-500/20 transition-colors">
                          OPEN →
                        </Link>
                      )}
                      {mod.type === 'lab' && (
                        <Link href="/playground" onClick={e => e.stopPropagation()}
                          className="font-mono text-[9px] px-1.5 py-[1px] rounded border
                                     border-accent2/25 bg-accent2/10 text-accent2
                                     hover:bg-accent2/20 transition-colors">
                          LAB →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* External resources */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]">
              <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">
                External Resources
              </span>
            </div>
            <div className="grid grid-cols-4 gap-0">
              {RESOURCES.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noreferrer"
                  className="flex items-start gap-2.5 p-3.5 border-r border-b border-white/[0.03]
                             hover:bg-white/[0.03] transition-colors">
                  <span className="text-lg shrink-0">{r.icon}</span>
                  <div>
                    <div className="font-mono text-[11px] font-bold text-slate-300">{r.name}</div>
                    <div className="font-mono text-[9px] text-slate-600">{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
