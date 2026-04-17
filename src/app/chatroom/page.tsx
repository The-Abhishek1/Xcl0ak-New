'use client'
import { useState, useEffect, useRef } from 'react'
import { getUser, isLoggedIn } from '@/lib/eso-auth'
import Link from 'next/link'

const ROOMS = [
  { id:'general',    label:'# general',       desc:'General security talk',      public:true },
  { id:'cve-alerts', label:'# cve-alerts',    desc:'New CVE discussions',         public:true },
  { id:'ctf-help',   label:'# ctf-help',      desc:'CTF hints & collaboration',   public:true },
  { id:'exploits',   label:'# exploits',      desc:'Exploit techniques',          public:true },
  { id:'offtopic',   label:'# off-topic',     desc:'Anything goes',               public:true },
  { id:'pro-lounge', label:'🔒 # pro-lounge', desc:'Pro members only',            public:false },
]

// Simulated messages per room for demo
const DEMO_MESSAGES: Record<string, {user:string,tier:string,msg:string,ts:string}[]> = {
  general: [
    {user:'null_ptr',  tier:'pro',  msg:'Anyone else testing qwen2.5:14b for planning? Results are insane', ts:'12:01'},
    {user:'r00tkit',   tier:'free', msg:'What scan tool do you guys use for subdomain enum?', ts:'12:03'},
    {user:'0xIdiot',   tier:'admin',msg:'gobuster + amass combo is unbeatable', ts:'12:04'},
    {user:'xorshift',  tier:'pro',  msg:'dont sleep on subfinder either', ts:'12:05'},
  ],
  'cve-alerts': [
    {user:'nvd_bot',   tier:'admin',msg:'🚨 CVE-2024-23897 Jenkins LFI - CVSS 9.8', ts:'11:30'},
    {user:'cipher_x',  tier:'pro',  msg:'got a nuclei template for this already', ts:'11:32'},
    {user:'null_ptr',  tier:'pro',  msg:'patched in 2.441 but most installs are unpatched', ts:'11:35'},
  ],
  'ctf-help': [
    {user:'ghost_s3',  tier:'free', msg:'stuck on pwn/overflow-1, any hints?', ts:'10:15'},
    {user:'heap_heap', tier:'pro',  msg:'think about the canary value...', ts:'10:17'},
    {user:'r00tkit',   tier:'free', msg:'what binary is it?', ts:'10:18'},
  ],
  exploits: [
    {user:'0xIdiot',   tier:'admin',msg:'new PoC for CVE-2024-1086 landed, netfilter UAF', ts:'09:00'},
    {user:'void_main', tier:'pro',  msg:'tested on 6.7.2, works clean', ts:'09:05'},
  ],
  offtopic: [
    {user:'xorshift',  tier:'pro',  msg:'hackthebox dropped a new insane box', ts:'08:45'},
    {user:'r00tkit',   tier:'free', msg:'the AI ones are getting wild', ts:'08:47'},
  ],
}

const TIER_COLOR:Record<string,string> = { free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#ff3a5c' }

export default function ChatroomPage() {
  const user    = getUser()
  const loggedIn = isLoggedIn()
  const [room,   setRoom]   = useState('general')
  const [msgs,   setMsgs]   = useState<any[]>(DEMO_MESSAGES['general'] ?? [])
  const [input,  setInput]  = useState('')
  const [joined, setJoined] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMsgs(DEMO_MESSAGES[room] ?? [])
  }, [room])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [msgs])

  const activeRoom = ROOMS.find(r => r.id === room)

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || !loggedIn) return
    const newMsg = {
      user: user?.username ?? 'anon',
      tier: user?.role === 'admin' ? 'admin' : (user?.tier ?? 'free'),
      msg:  input.trim(),
      ts:   new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false}),
    }
    setMsgs(prev => [...prev, newMsg])
    setInput('')
  }

  const canJoinRoom = (r: typeof ROOMS[0]) => r.public || loggedIn

  return (
    <div style={{display:'flex',height:'calc(100vh - 52px)',overflow:'hidden'}}>

      {/* Room list */}
      <div style={{width:'200px',flexShrink:0,borderRight:'1px solid rgba(255,255,255,0.06)',background:'rgba(3,5,10,0.4)',overflowY:'auto',padding:'12px 0'}}>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',letterSpacing:'0.15em',color:'#475569',textTransform:'uppercase',padding:'0 16px 8px'}}>
          Chatrooms
        </div>
        {ROOMS.map(r => (
          <button key={r.id}
            onClick={()=>{ if(canJoinRoom(r)) setRoom(r.id) }}
            style={{
              display:'block',width:'100%',textAlign:'left',
              padding:'8px 16px', border:'none',cursor: canJoinRoom(r)?'pointer':'not-allowed',
              background: room===r.id ? 'rgba(0,255,170,0.08)' : 'transparent',
              borderLeft: room===r.id ? '2px solid #00ffaa' : '2px solid transparent',
              transition:'all 0.15s',
            }}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:600,color:room===r.id?'#00ffaa':canJoinRoom(r)?'#64748b':'#334155'}}>
              {r.label}
            </div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',color:'#334155',marginTop:'2px'}}>{r.desc}</div>
          </button>
        ))}

        {/* User presence */}
        {loggedIn && user && (
          <div style={{margin:'12px',padding:'10px 12px',borderRadius:'8px',background:'rgba(0,255,170,0.04)',border:'1px solid rgba(0,255,170,0.08)'}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:'10px',color:'#00ffaa',fontWeight:700}}>{user.username}</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',color:TIER_COLOR[user.tier??'free'],marginTop:'2px',textTransform:'capitalize'}}>
              {user.role==='admin'?'⭐ admin':user.tier??'free'}
            </div>
          </div>
        )}
      </div>

      {/* Chat area */}
      <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>

        {/* Room header */}
        <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
          <div>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:'13px',fontWeight:700,color:'#00ffaa'}}>{activeRoom?.label}</span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:'10px',color:'#475569',marginLeft:'8px'}}>{activeRoom?.desc}</span>
          </div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',color:'#334155'}}>
            <span style={{color:'#00ffaa'}}>●</span> {Math.floor(Math.random()*20)+5} online
          </div>
        </div>

        {/* Messages */}
        <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
          {!activeRoom?.public && !loggedIn ? (
            <div style={{textAlign:'center',padding:'40px 20px'}}>
              <div style={{fontSize:'32px',marginBottom:'12px',opacity:0.3}}>🔒</div>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:'12px',color:'#475569',marginBottom:'16px'}}>This room is for registered members only.</p>
              <Link href="/login" style={{fontFamily:"'Space Mono',monospace",fontSize:'11px',color:'#00ffaa',textDecoration:'none',padding:'8px 16px',borderRadius:'8px',background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.2)'}}>
                Sign In to Join →
              </Link>
            </div>
          ) : (
            <>
              {msgs.map((m, i) => (
                <div key={i} style={{display:'flex',gap:'10px',marginBottom:'12px'}}>
                  <div style={{width:'28px',height:'28px',borderRadius:'50%',background:`${TIER_COLOR[m.tier]??'#475569'}20`,border:`1px solid ${TIER_COLOR[m.tier]??'#475569'}40`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',fontWeight:700,color:TIER_COLOR[m.tier]??'#475569'}}>
                      {m.user.slice(0,2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'8px',marginBottom:'3px'}}>
                      <span style={{fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,color:TIER_COLOR[m.tier]??'#64748b'}}>{m.user}</span>
                      <span style={{fontFamily:"'Space Mono',monospace",fontSize:'9px',color:'#334155'}}>{m.ts}</span>
                    </div>
                    <p style={{fontFamily:"'Space Mono',monospace",fontSize:'12px',color:'#94a3b8',lineHeight:'1.5'}}>{m.msg}</p>
                  </div>
                </div>
              ))}
              <div ref={bottomRef}/>
            </>
          )}
        </div>

        {/* Input area */}
        <div style={{padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.06)',flexShrink:0}}>
          {!loggedIn ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderRadius:'10px',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:'11px',color:'#475569'}}>
                <Link href="/register" style={{color:'#00ffaa',textDecoration:'none'}}>Create a free account</Link> to send messages
              </span>
              <Link href="/login" style={{fontFamily:"'Space Mono',monospace",fontSize:'10px',color:'#64748b',textDecoration:'none',padding:'5px 12px',borderRadius:'6px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={sendMessage} style={{display:'flex',gap:'8px'}}>
              <input
                value={input} onChange={e=>setInput(e.target.value)}
                placeholder={`Message ${activeRoom?.label}...`}
                style={{flex:1,background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'10px',padding:'10px 14px',fontFamily:"'Space Mono',monospace",fontSize:'12px',color:'#e2e8f0',outline:'none'}}
                onFocus={e=>{e.target.style.borderColor='rgba(0,255,170,0.3)'}}
                onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.08)'}}
              />
              <button type="submit" disabled={!input.trim()}
                style={{padding:'10px 16px',borderRadius:'10px',fontFamily:"'Space Mono',monospace",fontSize:'11px',fontWeight:700,cursor:'pointer',background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa',opacity:input.trim()?1:0.4,transition:'all 0.15s'}}>
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
