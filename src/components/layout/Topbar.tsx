'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

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
  const [alias, setAliasState] = useState('ghost_x91')
  const [editing, setEditing]  = useState(false)
  const [draft,   setDraft]    = useState('')
  const [sync,    setSync]     = useState<'idle'|'syncing'|'done'>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let a = localStorage.getItem('xcloak:alias')
    if (!a) {
      const adj=['ghost','shadow','null','void','cipher','phantom','byte','hex','root','xor']
      a = `${adj[Math.floor(Math.random()*10)]}_${Math.random().toString(36).slice(2,6)}`
      localStorage.setItem('xcloak:alias', a)
    }
    setAliasState(a); setDraft(a)
  }, [])

  function saveAlias() {
    const clean = draft.replace(/[^a-z0-9_\-]/gi,'').slice(0,24)
    if (clean.length >= 3) { localStorage.setItem('xcloak:alias',clean); setAliasState(clean) }
    setEditing(false)
  }

  async function doSync() {
    setSync('syncing')
    try { await fetch('/api/v1/sync',{method:'POST'}); setSync('done'); setTimeout(()=>setSync('idle'),3000) }
    catch { setSync('idle') }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 h-[52px] z-[100] flex items-center px-3 gap-2"
      style={{background:'rgba(3,5,10,0.95)',backdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>

      {/* Logo — always visible */}
      <Link href="/dashboard" className="font-black text-[16px] tracking-tight shrink-0 flex items-center gap-1.5">
        <span className="w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0"
          style={{background:'linear-gradient(135deg,#00ffaa,#00aaff)'}}>🛡</span>
        <span className="hidden sm:block">X<span style={{color:'#00ffaa'}}>cloak</span></span>
      </Link>

      {/* Nav — scrollable, items never wrap or shrink */}
      <div className="flex-1 overflow-x-auto min-w-0" style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
        <style>{`.topbar-scroll::-webkit-scrollbar{display:none}`}</style>
        <div className="topbar-scroll flex gap-[2px] p-[3px] rounded-lg w-max"
          style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
          {NAV.map(n => {
            const active = path?.startsWith(n.href)
            return (
              <Link key={n.href} href={n.href}
                className="font-mono text-[10px] px-2.5 py-[5px] rounded-[5px] transition-all tracking-wide whitespace-nowrap shrink-0"
                style={active
                  ?{background:'linear-gradient(135deg,rgba(0,255,170,0.15),rgba(0,170,255,0.1))',color:'#00ffaa',border:'1px solid rgba(0,255,170,0.25)'}
                  :{color:'#64748b'}}>
                {n.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={doSync}
          className="font-mono text-[9px] px-2 py-[5px] rounded-md border cursor-pointer transition-all hidden sm:block"
          style={{background:sync==='done'?'rgba(0,255,170,0.1)':'rgba(255,255,255,0.04)',borderColor:sync==='done'?'rgba(0,255,170,0.3)':'rgba(255,255,255,0.08)',color:sync==='done'?'#00ffaa':'#64748b'}}>
          {sync==='syncing'?'⟳':sync==='done'?'✓':'↻ SYNC'}
        </button>
        <div className="font-mono text-[9px] font-bold px-2 py-[3px] rounded hidden sm:block"
          style={{background:'rgba(255,58,92,0.12)',border:'1px solid rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
          DEFCON 3
        </div>
        {editing ? (
          <input ref={inputRef} value={draft} onChange={e=>setDraft(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter')saveAlias();if(e.key==='Escape')setEditing(false)}}
            onBlur={saveAlias} autoFocus maxLength={24}
            className="font-mono text-[10px] px-2 py-[4px] rounded-full w-[100px] outline-none"
            style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.4)',color:'#00ffaa'}} />
        ) : (
          <button onClick={()=>{setDraft(alias);setEditing(true);setTimeout(()=>inputRef.current?.select(),50)}}
            className="font-mono text-[10px] px-2 py-[4px] rounded-full cursor-pointer group"
            style={{color:'#00ffaa',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}
            title="Click to rename">
            <span className="hidden sm:inline">👤 </span>{alias.slice(0,10)}{alias.length>10?'…':''}<span className="text-[8px] ml-0.5 text-slate-600 group-hover:text-slate-400">✎</span>
          </button>
        )}
      </div>
    </nav>
  )
}
