'use client'
export default function OSINTPage() {
  const TOOLS = [
    { name: 'Shodan',         url: 'https://www.shodan.io',           icon: '🔭', desc: 'Internet-connected device search' },
    { name: 'VirusTotal',     url: 'https://www.virustotal.com',       icon: '🦠', desc: 'File/URL/IP threat analysis' },
    { name: 'URLScan.io',     url: 'https://urlscan.io',               icon: '🔎', desc: 'Website scanner and screenshot' },
    { name: 'AlienVault OTX', url: 'https://otx.alienvault.com',       icon: '🛡', desc: 'Open threat intelligence' },
    { name: 'Censys',         url: 'https://search.censys.io',          icon: '📡', desc: 'Internet scan data' },
    { name: 'SpiderFoot',     url: 'https://www.spiderfoot.net',        icon: '🕷', desc: 'Automated OSINT tool' },
    { name: 'WHOIS Lookup',   url: 'https://who.is',                    icon: '🌐', desc: 'Domain registration info' },
    { name: 'DNSDumpster',    url: 'https://dnsdumpster.com',           icon: '🗺', desc: 'DNS reconnaissance' },
    { name: 'HaveIBeenPwned', url: 'https://haveibeenpwned.com',        icon: '💀', desc: 'Breach data lookup' },
    { name: 'Recon-ng',       url: 'https://github.com/lanmaster53/recon-ng', icon: '🤖', desc: 'Open-source recon framework' },
    { name: 'theHarvester',   url: 'https://github.com/laramies/theHarvester', icon: '🌾', desc: 'E-mail, subdomain harvester' },
    { name: 'Maltego',        url: 'https://www.maltego.com',            icon: '🕸', desc: 'Link analysis & data mining' },
  ]

  return (
    <div className="p-5">
      <div className="mb-6">
        <h1 className="text-2xl font-black">OSINT <span className="text-accent">Toolkit</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Open-source intelligence tools and resources
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {TOOLS.map(t => (
          <a key={t.name} href={t.url} target="_blank" rel="noreferrer"
            className="glass p-4 hover:border-accent/20 transition-all hover:-translate-y-0.5 block">
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="font-bold text-[14px] text-slate-100 mb-1">{t.name}</div>
            <div className="font-mono text-[11px] text-slate-500">{t.desc}</div>
          </a>
        ))}
      </div>
      <div className="mt-4 glass p-4">
        <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2">Full Scanner</div>
        <p className="text-[13px] text-slate-400">
          Use the <a href="/scanner" className="text-accent hover:underline">Attack Surface Scanner</a> for automated OSINT against a specific target — includes real OTX domain lookup and certificate transparency queries.
        </p>
      </div>
    </div>
  )
}
