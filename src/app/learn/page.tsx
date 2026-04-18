'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// ── Static curriculum — modules are real topics with real links ───────────────
const TRACKS = [
  {
    id: 'beginner', icon: '🌱', label: 'Beginner', color: '#00ffaa',
    desc: 'Start your security journey',
    modules: [
      { title: 'What is cybersecurity?',              type: 'read', url: 'https://www.cloudflare.com/learning/security/what-is-cybersecurity/' },
      { title: 'Understanding the CIA Triad',          type: 'read', url: 'https://www.nist.gov/cybersecurity' },
      { title: 'How the Web works (HTTP/HTTPS)',        type: 'read', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
      { title: 'OWASP Top 10 Overview',                type: 'read', url: 'https://owasp.org/www-project-top-ten/' },
      { title: 'Setting up Kali Linux',                type: 'lab',  url: 'https://www.kali.org/docs/installation/' },
      { title: 'First CTF: Cookie Monster',            type: 'ctf',  url: '/ctf' },
    ],
  },
  {
    id: 'web', icon: '🌐', label: 'Web Security', color: '#00aaff',
    desc: 'OWASP Top 10 and beyond',
    modules: [
      { title: 'SQL Injection — theory & practice',    type: 'read', url: 'https://portswigger.net/web-security/sql-injection' },
      { title: 'Cross-Site Scripting (XSS)',           type: 'read', url: 'https://portswigger.net/web-security/cross-site-scripting' },
      { title: 'CSRF — attack and defense',            type: 'read', url: 'https://portswigger.net/web-security/csrf' },
      { title: 'JWT Authentication Flaws',             type: 'read', url: 'https://portswigger.net/web-security/jwt' },
      { title: 'SSRF & XXE Injection',                 type: 'read', url: 'https://portswigger.net/web-security/ssrf' },
      { title: 'Burp Suite Fundamentals',              type: 'lab',  url: 'https://portswigger.net/burp/documentation/desktop/getting-started' },
      { title: 'CTF: JWT Forgery',                     type: 'ctf',  url: '/ctf' },
      { title: 'CTF: SSTI — Template Injection',       type: 'ctf',  url: '/ctf' },
      { title: 'PortSwigger Labs (free)',               type: 'lab',  url: 'https://portswigger.net/web-security/all-labs' },
    ],
  },
  {
    id: 'binary', icon: '💣', label: 'Binary Exploitation', color: '#ff3a5c',
    desc: 'Low-level attack techniques',
    modules: [
      { title: 'x86/x64 Assembly Basics',              type: 'read', url: 'https://cs.lmu.edu/~ray/notes/x86assembly/' },
      { title: 'Stack Buffer Overflows',                type: 'read', url: 'https://azeria-labs.com/stack-overflow-arm32/' },
      { title: 'Return-Oriented Programming (ROP)',     type: 'read', url: 'https://en.wikipedia.org/wiki/Return-oriented_programming' },
      { title: 'Heap Exploitation Fundamentals',        type: 'read', url: 'https://heap-exploitation.dhavalkapil.com/' },
      { title: 'pwntools Setup & Usage',                type: 'lab',  url: 'https://github.com/Gallopsled/pwntools' },
      { title: 'CTF: Binary Exploit — Buffer Overflow', type: 'ctf',  url: '/ctf' },
      { title: 'pwn.college (free platform)',            type: 'lab',  url: 'https://pwn.college' },
    ],
  },
  {
    id: 'network', icon: '📡', label: 'Network Security', color: '#a78bfa',
    desc: 'Packets, protocols, and pivoting',
    modules: [
      { title: 'TCP/IP Deep Dive',                     type: 'read', url: 'https://www.cloudflare.com/learning/network-layer/what-is-the-network-layer/' },
      { title: 'Network Scanning with Nmap',            type: 'lab',  url: 'https://nmap.org/book/man.html' },
      { title: 'Man-in-the-Middle Attacks',             type: 'read', url: 'https://book.hacktricks.xyz/generic-methodologies-and-resources/pentesting-network/spoofing-arp-dns-dhcp-packets-and-sniffing' },
      { title: 'Wireshark Packet Analysis',             type: 'lab',  url: 'https://www.wireshark.org/docs/wsug_html_chunked/' },
      { title: 'VPN & Tunneling Techniques',            type: 'read', url: 'https://book.hacktricks.xyz/tunneling-and-port-forwarding' },
    ],
  },
  {
    id: 'crypto', icon: '🔐', label: 'Cryptography', color: '#ffd700',
    desc: 'Breaking and building secure systems',
    modules: [
      { title: 'Symmetric Encryption (AES)',            type: 'read', url: 'https://cryptohack.org/courses/symmetric/' },
      { title: 'RSA — Math & Attacks',                  type: 'read', url: 'https://cryptohack.org/courses/public-key/' },
      { title: 'Hash Functions & Collisions',           type: 'read', url: 'https://cryptohack.org/courses/hashing/' },
      { title: 'CTF: RSA Small Exponent',               type: 'ctf',  url: '/ctf' },
      { title: 'CryptoHack (free platform)',             type: 'lab',  url: 'https://cryptohack.org' },
    ],
  },
  {
    id: 'red', icon: '🎯', label: 'Red Teaming', color: '#ff8c42',
    desc: 'Advanced offensive techniques',
    modules: [
      { title: 'OPSEC Fundamentals',                    type: 'read', url: 'https://book.hacktricks.xyz/generic-methodologies-and-resources/external-recon-methodology' },
      { title: 'Active Directory Attacks',               type: 'read', url: 'https://book.hacktricks.xyz/windows-hardening/active-directory-methodology' },
      { title: 'Lateral Movement Techniques',            type: 'read', url: 'https://attack.mitre.org/tactics/TA0008/' },
      { title: 'C2 Frameworks Overview',                 type: 'read', url: 'https://github.com/vysecurity/RedTips' },
      { title: 'HackTheBox Pro Labs',                    type: 'lab',  url: 'https://www.hackthebox.com/hacker/pro-labs' },
      { title: 'MITRE ATT&CK Framework',                 type: 'read', url: 'https://attack.mitre.org/' },
    ],
  },
]

const RESOURCES = [
  { name: 'HackTheBox',       url: 'https://hackthebox.com',                       icon: '📦', desc: 'Practice machines' },
  { name: 'TryHackMe',        url: 'https://tryhackme.com',                        icon: '🎯', desc: 'Guided paths' },
  { name: 'PortSwigger',      url: 'https://portswigger.net/web-security',         icon: '🔬', desc: 'Web security labs' },
  { name: 'PicoCTF',          url: 'https://picoctf.org',                          icon: '🏁', desc: 'Beginner CTF' },
  { name: 'CTFtime',          url: 'https://ctftime.org',                          icon: '⏱',  desc: 'CTF calendar' },
  { name: 'HackTricks',       url: 'https://book.hacktricks.xyz',                  icon: '📖', desc: 'Technique bible' },
  { name: 'CryptoHack',       url: 'https://cryptohack.org',                       icon: '🔐', desc: 'Crypto challenges' },
  { name: 'pwn.college',      url: 'https://pwn.college',                          icon: '💣', desc: 'Binary exploitation' },
  { name: 'Exploit-DB',       url: 'https://exploit-db.com',                       icon: '💾', desc: 'Public exploits' },
  { name: 'GTFOBins',         url: 'https://gtfobins.github.io',                   icon: '🚀', desc: 'Unix privesc' },
  { name: 'MITRE ATT&CK',     url: 'https://attack.mitre.org',                     icon: '🎭', desc: 'Adversary tactics' },
  { name: 'OWASP',            url: 'https://owasp.org',                            icon: '🛡',  desc: 'Web security standards' },
]

const TYPE_ICON:  Record<string, string> = { read: '📄', lab: '🧪', ctf: '🚩' }
const TYPE_COLOR: Record<string, string> = { read: 'text-slate-400', lab: 'text-accent2', ctf: 'text-yellow-400' }

const STORAGE_KEY = 'xcloak:learn:progress'

export default function LearnPage() {
  const [activeTrack, setActiveTrack] = useState('beginner')
  const [progress,    setProgress]    = useState<Record<string, boolean>>({})
  const [loaded,      setLoaded]      = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProgress(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  // Persist on every change
  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) } catch {}
  }, [progress, loaded])

  function toggle(key: string) {
    setProgress(p => ({ ...p, [key]: !p[key] }))
  }

  const track     = TRACKS.find(t => t.id === activeTrack)!
  const totalDone = track.modules.filter((_, i) => progress[`${activeTrack}-${i}`]).length

  // Overall progress across all tracks
  const overallTotal = TRACKS.reduce((s, t) => s + t.modules.length, 0)
  const overallDone  = TRACKS.reduce((s, t) =>
    s + t.modules.filter((_, i) => progress[`${t.id}-${i}`] ? 1 : 0).length, 0)

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Learning <span className="text-accent">Paths</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Structured cybersecurity curriculum — beginner to red team · progress saved locally
          </p>
        </div>
        <div className="glass px-4 py-2.5 rounded-xl text-center">
          <div className="font-mono text-xl font-bold text-accent">
            {overallDone}/{overallTotal}
          </div>
          <div className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">Total Done</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">

        {/* Track selector */}
        <div className="space-y-2">
          {TRACKS.map(t => {
            const done = t.modules.filter((_, i) => progress[`${t.id}-${i}`]).length
            const pct  = Math.round((done / t.modules.length) * 100)
            return (
              <button key={t.id} onClick={() => setActiveTrack(t.id)}
                className="w-full text-left p-3.5 rounded-xl border transition-all block cursor-pointer"
                style={{
                  background:   activeTrack === t.id ? `${t.color}12` : 'rgba(255,255,255,0.025)',
                  borderColor:  activeTrack === t.id ? `${t.color}40` : 'rgba(255,255,255,0.06)',
                }}>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-lg">{t.icon}</span>
                  <span className="font-bold text-[13px]" style={{ color: activeTrack === t.id ? t.color : '#e2e8f0' }}>
                    {t.label}
                  </span>
                </div>
                <div className="font-mono text-[9px] text-slate-600 mb-2">{t.desc}</div>
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

          {/* Modules */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: track.color }}>
                Modules ({track.modules.length})
              </span>
              <span className="font-mono text-[9px] text-slate-700">Click to mark done</span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {track.modules.map((mod, i) => {
                const key  = `${activeTrack}-${i}`
                const done = !!progress[key]
                return (
                  <div key={i}
                    className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors hover:bg-white/[0.03] ${done ? 'opacity-60' : ''}`}
                    onClick={() => toggle(key)}>

                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${done ? 'border-current' : 'border-white/[0.15]'}`}
                      style={{ color: done ? track.color : undefined, background: done ? `${track.color}20` : undefined }}>
                      {done && <span className="text-[11px] font-bold">✓</span>}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13px] font-semibold transition-colors ${done ? 'line-through text-slate-600' : 'text-slate-200'}`}>
                        {mod.title}
                      </div>
                    </div>

                    {/* Type + Links */}
                    <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      <span className="text-sm">{TYPE_ICON[mod.type]}</span>
                      <span className={`font-mono text-[9px] uppercase ${TYPE_COLOR[mod.type]}`}>{mod.type}</span>
                      {mod.url && (
                        mod.url.startsWith('/') ? (
                          <Link href={mod.url}
                            className="font-mono text-[9px] px-1.5 py-[1px] rounded border transition-colors"
                            style={{
                              borderColor: mod.type==='ctf' ? 'rgba(255,215,0,0.25)' : 'rgba(0,170,255,0.25)',
                              background:  mod.type==='ctf' ? 'rgba(255,215,0,0.08)' : 'rgba(0,170,255,0.08)',
                              color:       mod.type==='ctf' ? '#ffd700' : '#00aaff',
                            }}>
                            OPEN →
                          </Link>
                        ) : (
                          <a href={mod.url} target="_blank" rel="noreferrer"
                            className="font-mono text-[9px] px-1.5 py-[1px] rounded border border-white/[0.1] text-slate-500 hover:text-slate-300 transition-colors">
                            READ ↗
                          </a>
                        )
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
                Essential Resources
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0">
              {RESOURCES.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noreferrer"
                  className="flex items-start gap-2.5 p-3.5 border-r border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors">
                  <span className="text-lg shrink-0">{r.icon}</span>
                  <div>
                    <div className="font-mono text-[11px] font-bold text-slate-300">{r.name}</div>
                    <div className="font-mono text-[9px] text-slate-600">{r.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Reset progress */}
          <div className="text-right">
            <button onClick={() => { if(confirm('Reset all progress?')) setProgress({}) }}
              className="font-mono text-[9px] text-slate-700 hover:text-red-400 transition-colors cursor-pointer">
              Reset progress
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
