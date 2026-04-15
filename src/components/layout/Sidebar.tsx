'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SECTIONS = [
  { label:'Intelligence', items:[
    { icon:'⬡', label:'Dashboard',    href:'/dashboard' },
    { icon:'🗺', label:'Threat Map',   href:'/threat-map', badge:'LIVE' },
    { icon:'📡', label:'CVE Tracker',  href:'/cve' },
    { icon:'📰', label:'News Feed',    href:'/news' },
  ]},
  { label:'Exploits', items:[
    { icon:'💉', label:'Browse',       href:'/exploits' },
    { icon:'⬆',  label:'Upload PoC',  href:'/exploits/upload' },
    { icon:'📦', label:'Payloads',    href:'/payloads' },
    { icon:'🧬', label:'DNA Analysis',href:'/dna' },
  ]},
  { label:'Tools', items:[
    { icon:'🐳', label:'Playground',  href:'/playground' },
    { icon:'🔭', label:'Scanner',     href:'/scanner' },
    { icon:'🕵', label:'OSINT',       href:'/osint' },
    { icon:'📊', label:'Reports',     href:'/reports' },
  ]},
  { label:'Community', items:[
    { icon:'🏆', label:'CTF',         href:'/ctf', badge:'NEW' },
    { icon:'📈', label:'Leaderboard', href:'/leaderboard' },
    { icon:'🤖', label:'AI Assistant',href:'/ai' },
    { icon:'📚', label:'Learn',       href:'/learn' },
  ]},
]

export function Sidebar() {
  const path = usePathname()
  return (
    // Use inline style for display so CSS media query can override it cleanly
    // sidebar-hide class sets display:none on mobile via globals.css
    <aside className="sidebar-el fixed left-0 top-[52px] bottom-0 w-[220px] z-[90] flex flex-col py-4 overflow-y-auto"
      style={{
        background: 'rgba(3,5,10,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}>
      {SECTIONS.map(sec => (
        <div key={sec.label} className="mb-5 px-3">
          <div className="font-mono text-[9px] tracking-[0.15em] text-slate-600 uppercase px-2 mb-1.5">
            {sec.label}
          </div>
          {sec.items.map(item => {
            const active = path?.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-px text-[13px] font-semibold transition-all duration-150"
                style={active ? {
                  color: '#00ffaa',
                  borderLeft: '2px solid #00ffaa',
                  paddingLeft: '8px',
                  background: 'linear-gradient(90deg,rgba(0,255,170,0.08),transparent)',
                } : { color: '#64748b' }}>
                <span className="w-[18px] text-center text-sm shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`font-mono text-[9px] px-1.5 py-[1px] rounded-[3px] ${
                    item.badge === 'LIVE'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      ))}

      <div className="mt-auto mx-3 p-3 rounded-lg"
        style={{ background:'rgba(0,255,170,0.04)', border:'1px solid rgba(0,255,170,0.08)' }}>
        <div className="font-mono text-[9px] text-slate-600 mb-1">NVD + OTX LIVE</div>
        <div className="flex items-center gap-1.5">
          <div className="live-dot"/>
          <span className="font-mono text-[10px]" style={{color:'#00ffaa'}}>Connected</span>
        </div>
      </div>
    </aside>
  )
}
