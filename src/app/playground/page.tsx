'use client'
import { useState } from 'react'
import Link from 'next/link'

const LABS = [
  {
    id: 'dvwa',
    name: 'DVWA',
    fullName: 'Damn Vulnerable Web Application',
    icon: '🌐',
    color: '#ff3a5c',
    desc: 'Classic web vulnerabilities — SQLi, XSS, CSRF, File Upload, Command Injection. The standard starting point.',
    difficulty: 'Beginner',
    topics: ['SQL Injection', 'XSS', 'CSRF', 'File Upload', 'Command Injection'],
    docker: 'docker run -d -p 8888:80 vulnerables/web-dvwa',
    url: 'http://localhost:8888',
    login: 'admin / password',
    docs: 'https://github.com/digininja/DVWA',
  },
  {
    id: 'webgoat',
    name: 'WebGoat',
    fullName: 'OWASP WebGoat',
    icon: '🐐',
    color: '#ff8c42',
    desc: 'OWASP-maintained deliberately insecure app. Step-by-step lessons with hints. Covers OWASP Top 10.',
    difficulty: 'Beginner–Intermediate',
    topics: ['OWASP Top 10', 'Injection', 'Authentication', 'IDOR', 'XXE'],
    docker: 'docker run -d -p 8080:8080 -p 9090:9090 webgoat/goat-and-wolf',
    url: 'http://localhost:8080/WebGoat',
    login: 'Register on first visit',
    docs: 'https://owasp.org/www-project-webgoat/',
  },
  {
    id: 'juice',
    name: 'OWASP Juice Shop',
    fullName: 'OWASP Juice Shop',
    icon: '🧃',
    color: '#a78bfa',
    desc: 'Modern single-page app with 100+ real challenges. Covers A1–A10. Used in official OWASP trainings.',
    difficulty: 'Beginner–Advanced',
    topics: ['XSS', 'SQLi', 'Broken Auth', 'IDOR', 'JWT', 'Crypto Failures'],
    docker: 'docker run -d -p 3333:3000 bkimminich/juice-shop',
    url: 'http://localhost:3333',
    login: 'No login needed',
    docs: 'https://owasp.org/www-project-juice-shop/',
  },
  {
    id: 'metasploitable',
    name: 'Metasploitable 2',
    fullName: 'Rapid7 Metasploitable',
    icon: '💣',
    color: '#ffd700',
    desc: 'Intentionally vulnerable Linux VM. Full network attack surface — Samba, FTP, HTTP, MySQL, PostgreSQL.',
    difficulty: 'Intermediate',
    topics: ['Network Services', 'Samba RCE', 'FTP Backdoor', 'MySQL', 'Metasploit'],
    docker: 'docker run -d -p 80:80 -p 21:21 -p 22:22 tleemcjr/metasploitable2',
    url: 'http://localhost:80',
    login: 'msfadmin / msfadmin',
    docs: 'https://docs.rapid7.com/metasploit/metasploitable-2/',
  },
  {
    id: 'vulnhub',
    name: 'VulnHub VMs',
    fullName: 'VulnHub Community VMs',
    icon: '📦',
    color: '#00aaff',
    desc: 'Hundreds of free downloadable vulnerable VMs. Boot2root style — find flags by gaining root access.',
    difficulty: 'All levels',
    topics: ['Boot2Root', 'CTF Style', 'Full Compromise', 'Privilege Escalation'],
    docker: null,
    url: 'https://vulnhub.com',
    login: 'Download VMs directly',
    docs: 'https://www.vulnhub.com/about/',
  },
  {
    id: 'htb',
    name: 'HackTheBox',
    fullName: 'HackTheBox Platform',
    icon: '🟩',
    color: '#9fff3a',
    desc: 'Online penetration testing labs. Realistic machines, Active Directory labs, and career paths. Industry standard.',
    difficulty: 'Intermediate–Expert',
    topics: ['Active Directory', 'Web', 'Pwn', 'Reversing', 'OSINT'],
    docker: null,
    url: 'https://hackthebox.com',
    login: 'Register at hackthebox.com',
    docs: 'https://help.hackthebox.com/',
  },
]

const TOOLS = [
  { name: 'Burp Suite Community', url: 'https://portswigger.net/burp/communitydownload', desc: 'Web proxy & scanner', icon: '🔥' },
  { name: 'OWASP ZAP',            url: 'https://www.zaproxy.org/',                       desc: 'Free web scanner',   icon: '⚡' },
  { name: 'Metasploit',           url: 'https://www.metasploit.com/',                     desc: 'Exploit framework',  icon: '🎯' },
  { name: 'Nmap',                 url: 'https://nmap.org/',                               desc: 'Network scanner',    icon: '📡' },
  { name: 'Wireshark',            url: 'https://www.wireshark.org/',                      desc: 'Packet analyzer',    icon: '🦈' },
  { name: 'SQLMap',               url: 'https://sqlmap.org/',                             desc: 'SQL injection tool', icon: '💉' },
]

export default function PlaygroundPage() {
  const [selected, setSelected]   = useState<string | null>(null)
  const [copied,   setCopied]     = useState<string | null>(null)

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const lab = LABS.find(l => l.id === selected)

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Exploit <span className="text-accent">Playground</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Vulnerable practice environments — run locally with Docker or access online labs
        </p>
      </div>

      {/* Docker prerequisite notice */}
      <div className="glass p-4 mb-5 flex items-start gap-3"
        style={{borderColor:'rgba(0,170,255,0.2)',background:'rgba(0,170,255,0.04)'}}>
        <span className="text-xl shrink-0">🐳</span>
        <div className="font-mono text-[10px] text-slate-400 leading-6">
          <span className="text-accent2 font-bold">Docker required</span> for local labs.
          Install from <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noreferrer" className="text-accent2 underline">docs.docker.com</a>.
          Online labs (HackTheBox, VulnHub) work in-browser without Docker.
          {' '}<span className="text-slate-600">These are isolated from the XCloak scan engine — run them separately on your machine.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

        {/* Lab cards */}
        <div className="space-y-3">
          {LABS.map(l => (
            <button key={l.id} onClick={() => setSelected(l.id === selected ? null : l.id)}
              className="glass w-full text-left p-4 cursor-pointer transition-all hover:border-white/[0.15]"
              style={{
                borderColor: selected === l.id ? `${l.color}40` : undefined,
                background:  selected === l.id ? `${l.color}05` : undefined,
              }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{l.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-[14px]" style={{ color: l.color }}>{l.name}</span>
                    <span className="font-mono text-[9px] px-1.5 py-[1px] rounded"
                      style={{ background: `${l.color}15`, color: l.color }}>
                      {l.difficulty}
                    </span>
                    {!l.docker && (
                      <span className="font-mono text-[9px] px-1.5 py-[1px] rounded bg-white/[0.05] text-slate-500">
                        Online
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-slate-500 leading-5 mb-2">{l.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {l.topics.map(t => (
                      <span key={t} className="font-mono text-[8px] px-1.5 py-[1px] rounded bg-white/[0.04] border border-white/[0.06] text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-600 shrink-0">
                  {selected === l.id ? '▲ Hide' : '▼ Setup'}
                </span>
              </div>

              {/* Expanded setup */}
              {selected === l.id && (
                <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3"
                  onClick={e => e.stopPropagation()}>
                  {l.docker && (
                    <div>
                      <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1.5">
                        Start with Docker
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 font-mono text-[11px] text-accent p-2.5 rounded-lg break-all"
                          style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.06)'}}>
                          {l.docker}
                        </code>
                        <button onClick={() => copy(l.docker!, l.id + '-docker')}
                          className="shrink-0 font-mono text-[9px] px-3 py-2 rounded-lg cursor-pointer transition-all"
                          style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',color:'#64748b'}}>
                          {copied === l.id + '-docker' ? '✓' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
                    <div>
                      <div className="text-slate-600 mb-0.5">URL</div>
                      <a href={l.url.startsWith('http') ? l.url : undefined}
                        target={l.url.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="text-accent2 hover:underline">{l.url}</a>
                    </div>
                    <div>
                      <div className="text-slate-600 mb-0.5">Login</div>
                      <span className="text-slate-400">{l.login}</span>
                    </div>
                    <div>
                      <div className="text-slate-600 mb-0.5">Docs</div>
                      <a href={l.docs} target="_blank" rel="noreferrer"
                        className="text-accent2 hover:underline">Official docs ↗</a>
                    </div>
                  </div>
                  {!l.docker && (
                    <a href={l.url} target="_blank" rel="noreferrer"
                      className="inline-block font-mono text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all hover:opacity-80"
                      style={{background:`${l.color}12`,border:`1px solid ${l.color}35`,color:l.color}}>
                      Open {l.name} ↗
                    </a>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Quick start */}
          <div className="glass p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">
              Quick Start Guide
            </div>
            <div className="space-y-3 font-mono text-[10px] text-slate-500">
              {[
                ['1', 'Install Docker Desktop', 'https://docs.docker.com/get-docker/'],
                ['2', 'Pick a lab from the list', null],
                ['3', 'Copy & run the docker command', null],
                ['4', 'Open the URL in browser', null],
                ['5', 'Use XCloak\'s Scanner tab to scan it', '/scan/new'],
              ].map(([n, step, url]) => (
                <div key={n as string} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5"
                    style={{background:'rgba(0,255,170,0.15)',color:'#00ffaa'}}>
                    {n}
                  </span>
                  {url ? (
                    url.startsWith('/') ? (
                      <Link href={url} className="text-accent2 hover:underline">{step}</Link>
                    ) : (
                      <a href={url} target="_blank" rel="noreferrer" className="text-accent2 hover:underline">{step as string} ↗</a>
                    )
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Essential tools */}
          <div className="glass p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">
              Essential Tools
            </div>
            <div className="space-y-2">
              {TOOLS.map(t => (
                <a key={t.name} href={t.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors">
                  <span className="text-base shrink-0">{t.icon}</span>
                  <div>
                    <div className="font-mono text-[11px] font-bold text-slate-300">{t.name}</div>
                    <div className="font-mono text-[9px] text-slate-600">{t.desc}</div>
                  </div>
                  <span className="ml-auto font-mono text-[9px] text-slate-700">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Scan a lab */}
          <div className="glass p-4 text-center space-y-2"
            style={{borderColor:'rgba(0,255,170,0.15)',background:'rgba(0,255,170,0.04)'}}>
            <div className="text-2xl">⚡</div>
            <div className="font-mono text-[12px] font-bold text-slate-300">Scan Your Lab</div>
            <div className="font-mono text-[10px] text-slate-600">
              After starting a local lab, use XCloak's scanner to run nmap, nuclei, and nikto against it.
            </div>
            <Link href="/scan/new"
              className="block font-mono text-[11px] font-bold py-2.5 rounded-xl transition-all hover:opacity-80"
              style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
              ⚡ Open Scanner →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
