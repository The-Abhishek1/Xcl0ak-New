'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { getUser, isLoggedIn } from '@/lib/eso-auth'
import { getAlias } from '@/lib/identity'
import Link from 'next/link'

const ROOMS = [
  { id:'general',    label:'# general',        desc:'General security talk',      public:true },
  { id:'cve-alerts', label:'# cve-alerts',      desc:'New CVE discussions',        public:true },
  { id:'ctf-help',   label:'# ctf-help',        desc:'CTF hints & collaboration',  public:true },
  { id:'exploits',   label:'# exploits',        desc:'Exploit techniques',         public:true },
  { id:'offtopic',   label:'# off-topic',       desc:'Anything goes',              public:true },
  { id:'pro-lounge', label:'🔒 pro-lounge',     desc:'Pro members only',           public:false },
]

const TIER_COLOR: Record<string,string> = {
  free:'#64748b', pro:'#00aaff', enterprise:'#a78bfa', admin:'#ff3a5c'
}
const TYPE_COLOR: Record<string,string> = {
  message:'inherit', system:'#ffd700', alert:'#ff3a5c'
}

interface Msg {
  id: string
  room: string
  alias: string
  tier: string
  content: string
  type: string
  createdAt: string
}

const POLL_MS = 2500   // poll every 2.5s for new messages

export default function ChatroomPage() {
  const eso     = getUser()
  const loggedIn = isLoggedIn()
  // Use ESO username if logged in, otherwise anonymous alias
  const alias   = loggedIn ? (eso?.username ?? getAlias()) : getAlias()
  const tier    = eso?.role === 'admin' ? 'admin' : (eso?.tier ?? 'free')

  const [room,    setRoom]    = useState('general')
  const [msgs,    setMsgs]    = useState<Msg[]>([])
  const [input,   setInput]   = useState('')
  const [sending, setSending] = useState(false)
  const [online,  setOnline]  = useState(0)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const bottomRef  = useRef<HTMLDivElement>(null)
  const pollRef    = useRef<ReturnType<typeof setInterval> | null>(null)
  const latestIdRef = useRef<string>('')  // newest msg id for delta polling

  const scrollBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  // Load initial messages when room changes
  async function loadRoom(r: string) {
    setLoading(true)
    setMsgs([])
    latestIdRef.current = ''
    try {
      const res = await fetch(`/api/v1/chat?room=${r}&limit=60`)
      const data = await res.json()
      const list: Msg[] = data.messages ?? []
      setMsgs(list)
      if (list.length > 0) latestIdRef.current = list[list.length - 1].id
      setOnline(Math.floor(Math.random() * 15) + 3)
    } catch { setMsgs([]) }
    setLoading(false)
    scrollBottom()
  }

  // Poll for new messages since last known id
  async function pollNew(r: string) {
    try {
      const res = await fetch(`/api/v1/chat?room=${r}&limit=20`)
      const data = await res.json()
      const list: Msg[] = data.messages ?? []
      if (list.length === 0) return
      const newest = list[list.length - 1].id
      if (newest === latestIdRef.current) return
      // Find new messages
      const knownIdx = list.findIndex(m => m.id === latestIdRef.current)
      const newMsgs  = knownIdx === -1 ? list : list.slice(knownIdx + 1)
      if (newMsgs.length > 0) {
        setMsgs(prev => {
          // dedupe by id
          const ids = new Set(prev.map(m => m.id))
          const added = newMsgs.filter(m => !ids.has(m.id))
          if (added.length === 0) return prev
          scrollBottom()
          return [...prev, ...added].slice(-200)  // keep last 200
        })
        latestIdRef.current = newest
      }
    } catch {}
  }

  useEffect(() => {
    loadRoom(room)
    // Start polling
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(() => pollNew(room), POLL_MS)
    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [room]) // eslint-disable-line

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    if (!loggedIn) { setError('Sign in to send messages'); return }
    if (room === 'pro-lounge' && tier === 'free') { setError('Pro room requires Pro tier'); return }

    setSending(true)
    setError('')
    // Optimistic add
    const optimistic: Msg = {
      id: `opt_${Date.now()}`, room, alias, tier, content: text,
      type: 'message', createdAt: new Date().toISOString()
    }
    setMsgs(prev => [...prev, optimistic])
    setInput('')
    scrollBottom()

    try {
      const res = await fetch('/api/v1/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ room, content: text, alias, tier }),
      })
      const saved: Msg = await res.json()
      if (!res.ok) throw new Error(saved as any)
      // Replace optimistic with real
      setMsgs(prev => prev.map(m => m.id === optimistic.id ? saved : m))
      latestIdRef.current = saved.id
    } catch (e: any) {
      setMsgs(prev => prev.filter(m => m.id !== optimistic.id))
      setError(e.message ?? 'Failed to send')
    }
    setSending(false)
  }

  const canAccess = (r: typeof ROOMS[0]) =>
    r.public || loggedIn

  const activeRoom = ROOMS.find(r => r.id === room)!

  return (
    <div style={{ display:'flex', height:'calc(100vh - 52px)', overflow:'hidden' }}>

      {/* Sidebar */}
      <div style={{ width:'200px', flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.06)', background:'rgba(3,5,10,0.5)', overflowY:'auto', padding:'12px 0', display:'flex', flexDirection:'column' }}>
        <div className="font-mono text-[9px] tracking-widest text-slate-600 uppercase px-4 pb-2">
          Rooms
        </div>

        {ROOMS.map(r => {
          const accessible = canAccess(r)
          const active     = room === r.id
          return (
            <button key={r.id} onClick={() => accessible && setRoom(r.id)}
              className="w-full text-left px-4 py-2 transition-all"
              style={{
                background:  active ? 'rgba(0,255,170,0.07)' : 'transparent',
                borderLeft:  active ? '2px solid #00ffaa' : '2px solid transparent',
                cursor:      accessible ? 'pointer' : 'not-allowed',
                opacity:     accessible ? 1 : 0.4,
              }}>
              <div className="font-mono text-[11px] font-semibold" style={{ color: active ? '#00ffaa' : accessible ? '#94a3b8' : '#334155' }}>
                {r.label}
              </div>
              <div className="font-mono text-[9px] text-slate-700 mt-0.5">{r.desc}</div>
            </button>
          )
        })}

        {/* User card */}
        <div className="flex-1" />
        <div className="mx-3 mb-2 p-3 rounded-xl" style={{ background:'rgba(0,255,170,0.04)', border:'1px solid rgba(0,255,170,0.08)' }}>
          <div className="font-mono text-[10px] font-bold text-accent">{alias}</div>
          <div className="font-mono text-[9px] mt-0.5 capitalize" style={{ color: TIER_COLOR[tier] }}>
            {eso?.role === 'admin' ? '⭐ admin' : tier}
          </div>
          {!loggedIn && (
            <Link href="/login" className="font-mono text-[8px] text-slate-600 hover:text-accent transition-colors mt-1 block">
              Sign in for full access →
            </Link>
          )}
        </div>
      </div>

      {/* Main chat */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0"
          style={{ background:'rgba(3,5,10,0.3)' }}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[13px] font-bold text-accent">{activeRoom.label}</span>
            <span className="font-mono text-[10px] text-slate-600">{activeRoom.desc}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
            {online} online
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3" style={{ scrollbarWidth:'thin' }}>
          {!activeRoom.public && !loggedIn ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-4xl opacity-30">🔒</div>
              <p className="font-mono text-[12px] text-slate-500">Pro members only room</p>
              <Link href="/login" className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl transition-all hover:opacity-80"
                style={{ background:'rgba(0,255,170,0.1)', border:'1px solid rgba(0,255,170,0.3)', color:'#00ffaa' }}>
                Sign In →
              </Link>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center h-32">
              <span className="font-mono text-[11px] text-slate-600 animate-pulse">Loading messages...</span>
            </div>
          ) : msgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <span className="font-mono text-[11px] text-slate-600">No messages yet — be the first!</span>
            </div>
          ) : (
            msgs.map((m, i) => {
              const isSystem = m.type === 'system' || m.alias === '🤖 system'
              const isMe     = m.alias === alias
              const showDate = i === 0 || new Date(msgs[i-1].createdAt).toDateString() !== new Date(m.createdAt).toDateString()
              return (
                <div key={m.id}>
                  {showDate && (
                    <div className="text-center font-mono text-[9px] text-slate-700 my-3">
                      — {new Date(m.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })} —
                    </div>
                  )}
                  {isSystem ? (
                    <div className="my-2 px-3 py-1.5 rounded-lg text-center font-mono text-[10px]"
                      style={{ background:'rgba(255,215,0,0.06)', border:'1px solid rgba(255,215,0,0.12)', color:'#ffd700' }}>
                      {m.content}
                    </div>
                  ) : (
                    <div className={`flex gap-3 mb-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[9px] font-bold"
                        style={{ background:`${TIER_COLOR[m.tier]??'#475569'}20`, border:`1px solid ${TIER_COLOR[m.tier]??'#475569'}40`, color: TIER_COLOR[m.tier]??'#475569' }}>
                        {m.alias.slice(0,2).toUpperCase()}
                      </div>
                      <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div className={`flex items-baseline gap-2 mb-0.5 ${isMe ? 'flex-row-reverse' : ''}`}>
                          <span className="font-mono text-[10px] font-bold" style={{ color: TIER_COLOR[m.tier]??'#64748b' }}>
                            {m.alias}{isMe ? ' (you)' : ''}
                          </span>
                          <span className="font-mono text-[8px] text-slate-700">
                            {new Date(m.createdAt).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:false})}
                          </span>
                        </div>
                        <div className="font-mono text-[12px] leading-relaxed px-3 py-2 rounded-xl"
                          style={{
                            background: isMe ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.04)',
                            border:     isMe ? '1px solid rgba(0,255,170,0.15)' : '1px solid rgba(255,255,255,0.06)',
                            color:      '#cbd5e1',
                            borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                          }}>
                          {m.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
          {error && (
            <div className="font-mono text-[10px] text-red-400 mb-2">✗ {error}</div>
          )}
          {!loggedIn ? (
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl"
              style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
              <span className="font-mono text-[11px] text-slate-500">
                <Link href="/register" className="text-accent hover:underline">Create a free account</Link> to send messages
              </span>
              <Link href="/login" className="font-mono text-[10px] text-slate-500 hover:text-slate-300 transition-colors px-3 py-1 rounded-lg"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                value={input} onChange={e => setInput(e.target.value)}
                placeholder={`Message ${activeRoom.label}...`}
                maxLength={500}
                disabled={sending}
                className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none transition-colors placeholder-slate-700"
                style={{ borderColor: input ? 'rgba(0,255,170,0.2)' : undefined }}
              />
              <button type="submit" disabled={!input.trim() || sending}
                className="px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40"
                style={{ background:'rgba(0,255,170,0.1)', border:'1px solid rgba(0,255,170,0.3)', color:'#00ffaa' }}>
                {sending ? '⟳' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
