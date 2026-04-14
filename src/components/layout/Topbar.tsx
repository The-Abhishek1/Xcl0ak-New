'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { label:'DASHBOARD', href:'/dashboard' },
  { label:'EXPLOITS',  href:'/exploits' },
  { label:'CVE',       href:'/cve' },
  { label:'THREAT MAP',href:'/threat-map' },
  { label:'SCANNER',   href:'/scanner' },
  { label:'CTF',       href:'/ctf' },
]

export function Topbar() {
  const path = usePathname()
  const [alias, setAlias] = useState('ghost_x91')
  const [sync, setSync] = useState<'idle'|'syncing'|'done'>('idle')

  useEffect(() => {
    let a = localStorage.getItem('xcloak:alias')
    if (!a) {
      const adj = ['ghost','shadow','null','void','cipher','phantom','byte']
      a = adj[Math.floor(Math.random()*7)] + '_' + Math.random().toString(36).slice(2,6)
      localStorage.setItem('xcloak:alias', a)
    }
    setAlias(a)
  }, [])

  async function doSync() {
    setSync('syncing')
    try { await fetch('/api/v1/sync',{method:'POST'}); setSync('done'); setTimeout(()=>setSync('idle'),3000) }
    catch { setSync('idle') }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] z-[100] flex items-center px-3 sm:px-5 gap-2 sm:gap-5"
      style={{background:'rgba(3,5,10,0.92)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>

      {/* Logo */}
      <Link href="/dashboard" className="font-black text-base sm:text-lg tracking-tight shrink-0 flex items-center gap-2">
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm" style={{background:'linear-gradient(135deg,#00ffaa,#00aaff)'}}>🛡</span>
        <span className="hidden sm:block">X<span style={{color:'#00ffaa'}}>cloak</span></span>
      </Link>

      {/* Nav — scrollable on mobile */}
      <div className="flex gap-[2px] p-[3px] rounded-lg overflow-x-auto nav-scroll flex-1 sm:flex-none"
        style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
        {NAV.map(n => {
          const active = path?.startsWith(n.href)
          return (
            <Link key={n.href} href={n.href}
              className="font-mono text-[10px] sm:text-[11px] px-2 sm:px-3 py-[5px] rounded-[5px] transition-all tracking-wider whitespace-nowrap"
              style={active
                ? {background:'linear-gradient(135deg,rgba(0,255,170,0.15),rgba(0,170,255,0.1))',color:'#00ffaa',border:'1px solid rgba(0,255,170,0.25)'}
                : {color:'#64748b'}}>
              {n.label}
            </Link>
          )
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
        <button onClick={doSync}
          className="font-mono text-[9px] sm:text-[10px] px-2 sm:px-3 py-[5px] rounded-md border cursor-pointer transition-all hidden sm:block"
          style={{background:sync==='done'?'rgba(0,255,170,0.1)':'rgba(255,255,255,0.04)',borderColor:sync==='done'?'rgba(0,255,170,0.3)':'rgba(255,255,255,0.08)',color:sync==='done'?'#00ffaa':'#64748b'}}>
          {sync==='syncing' ? '⟳ SYNCING...' : sync==='done' ? '✓ SYNCED' : '↻ SYNC'}
        </button>
        <div className="font-mono text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-[3px] rounded hidden sm:block"
          style={{background:'rgba(255,58,92,0.12)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}}>DEFCON 3</div>
        <div className="font-mono text-[10px] sm:text-[11px] px-2 sm:px-3 py-[4px] rounded-full"
          style={{color:'#00ffaa',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
          👤 <span className="hidden sm:inline">{alias}</span><span className="sm:hidden">{alias.slice(0,8)}</span>
        </div>
      </div>
    </nav>
  )
}
