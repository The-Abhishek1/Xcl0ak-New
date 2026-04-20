'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser, isLoggedIn } from '@/lib/eso-auth'

const CATEGORIES = [
  { id:'all',     label:'All',            icon:'🌐' },
  { id:'web',     label:'Web Security',   icon:'🕸' },
  { id:'binary',  label:'Binary Exploit', icon:'💣' },
  { id:'network', label:'Network',        icon:'📡' },
  { id:'crypto',  label:'Cryptography',   icon:'🔐' },
  { id:'red',     label:'Red Teaming',    icon:'🎯' },
  { id:'osint',   label:'OSINT',          icon:'🕵' },
  { id:'mobile',  label:'Mobile',         icon:'📱' },
  { id:'malware', label:'Malware',        icon:'☣' },
]

const DIFFICULTIES = ['beginner','intermediate','advanced','expert']
const MODULE_TYPES  = ['read','lab','ctf','video','quiz']

const DIFF_COLOR: Record<string,string> = {
  beginner:'#00ffaa', intermediate:'#00aaff', advanced:'#fb923c', expert:'#ff3a5c'
}
const TYPE_ICON: Record<string,string> = {
  read:'📄', lab:'🧪', ctf:'🚩', video:'🎬', quiz:'❓'
}
const TYPE_COLOR: Record<string,string> = {
  read:'#94a3b8', lab:'#00aaff', ctf:'#facc15', video:'#a78bfa', quiz:'#fb923c'
}

const CAT_COLOR: Record<string,string> = {
  web:'#00aaff', binary:'#ff3a5c', network:'#a78bfa', crypto:'#ffd700',
  red:'#fb923c', osint:'#38bdf8', mobile:'#f472b6', malware:'#ff6b35', all:'#00ffaa'
}

interface Module { id:string; title:string; type:string; order:number; xpReward:number }
interface Path {
  id:string; title:string; description:string; category:string; difficulty:string
  authorAlias:string; status:string; upvotes:number; views:number; createdAt:string
  modules:Module[]; enrolled:boolean; completedModules:number
}

// ── Submit Modal ─────────────────────────────────────────────────────────────
function SubmitModal({ alias, onClose, onSubmitted }: { alias:string; onClose:()=>void; onSubmitted:()=>void }) {
  const [title,      setTitle]      = useState('')
  const [desc,       setDesc]       = useState('')
  const [category,   setCategory]   = useState('web')
  const [difficulty, setDifficulty] = useState('beginner')
  const [modules,    setModules]    = useState([
    { title:'', type:'read', content:'' },
    { title:'', type:'read', content:'' },
  ])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  function addModule() {
    setModules(m => [...m, { title:'', type:'read', content:'' }])
  }
  function removeModule(i:number) {
    if (modules.length <= 2) return
    setModules(m => m.filter((_,idx)=>idx!==i))
  }
  function updateModule(i:number, field:string, val:string) {
    setModules(m => m.map((mod,idx)=>idx===i?{...mod,[field]:val}:mod))
  }

  async function submit() {
    if (!title.trim()) { setError('Title is required'); return }
    if (modules.some(m=>!m.title.trim())) { setError('All modules need a title'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/v1/learn', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title, description:desc, category, difficulty, authorAlias:alias, modules }),
      })
      if (!res.ok) { const d=await res.json(); throw new Error(d.error) }
      onSubmitted()
      onClose()
    } catch(e:any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/40 transition-all placeholder-slate-700"
  const sel = "bg-[#0a0f1a] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/40 transition-all"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:'rgba(0,0,0,0.85)',backdropFilter:'blur(8px)'}}>
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{background:'#0a0f1a',border:'1px solid rgba(0,255,170,0.15)'}}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{background:'rgba(0,255,170,0.03)'}}>
          <div>
            <h2 className="font-black text-[16px]">Create <span style={{color:'#00ffaa'}}>Learning Path</span></h2>
            <p className="font-mono text-[10px] text-slate-600 mt-0.5">Share your knowledge with the community</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',color:'#475569'}}>✕</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5 block">
              Title <span style={{color:'#ff3a5c'}}>*</span>
            </label>
            <input value={title} onChange={e=>setTitle(e.target.value)}
              placeholder="e.g. Web Application Hacking for Beginners"
              className={inp}/>
          </div>

          {/* Description */}
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5 block">Description</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={2}
              placeholder="What will learners achieve after completing this path?"
              className={inp + ' resize-none'}/>
          </div>

          {/* Category + Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5 block">Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className={sel + ' w-full'}>
                {CATEGORIES.filter(c=>c.id!=='all').map(c=>(
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5 block">Difficulty</label>
              <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className={sel + ' w-full'}>
                {DIFFICULTIES.map(d=>(
                  <option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Modules */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">
                Modules <span style={{color:'#ff3a5c'}}>*</span> <span className="text-slate-700 normal-case">(min 2)</span>
              </label>
              <button onClick={addModule}
                className="font-mono text-[9px] px-2.5 py-1 rounded-lg cursor-pointer transition-all hover:opacity-80"
                style={{background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.2)',color:'#00ffaa'}}>
                + Add module
              </button>
            </div>
            <div className="space-y-2">
              {modules.map((mod, i) => (
                <div key={i} className="flex gap-2 items-start p-3 rounded-xl"
                  style={{background:'rgba(255,255,255,0.02)',border:'1px solid rgba(255,255,255,0.05)'}}>
                  <div className="font-mono text-[9px] text-slate-700 w-5 pt-2.5 shrink-0 text-right">{i+1}</div>
                  <div className="flex-1 space-y-2">
                    <input value={mod.title} onChange={e=>updateModule(i,'title',e.target.value)}
                      placeholder="Module title" className={inp}/>
                    <div className="flex gap-2">
                      <select value={mod.type} onChange={e=>updateModule(i,'type',e.target.value)}
                        className={sel + ' flex-1'}>
                        {MODULE_TYPES.map(t=>(
                          <option key={t} value={t}>{TYPE_ICON[t]} {t.charAt(0).toUpperCase()+t.slice(1)}</option>
                        ))}
                      </select>
                      <input value={mod.content} onChange={e=>updateModule(i,'content',e.target.value)}
                        placeholder="URL, flag hint, or description (optional)"
                        className={inp + ' flex-[2]'}/>
                    </div>
                  </div>
                  {modules.length > 2 && (
                    <button onClick={()=>removeModule(i)}
                      className="font-mono text-[11px] w-7 h-7 flex items-center justify-center rounded-lg cursor-pointer shrink-0 mt-1"
                      style={{background:'rgba(255,58,92,0.08)',border:'1px solid rgba(255,58,92,0.2)',color:'#ff3a5c'}}>✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="font-mono text-[11px] text-red-400 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.05]">
              ✗ {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose}
              className="flex-1 py-3 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all hover:opacity-80"
              style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.08)',color:'#64748b'}}>
              Cancel
            </button>
            <button onClick={submit} disabled={loading}
              className="flex-[2] py-3 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all hover:opacity-80 disabled:opacity-40"
              style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
              {loading ? '⟳ Submitting...' : 'Submit for Review →'}
            </button>
          </div>
          <p className="font-mono text-[9px] text-slate-700 text-center">Admin will review and approve within 24h</p>
        </div>
      </div>
    </div>
  )
}

// ── Path Card ────────────────────────────────────────────────────────────────
function PathCard({ path, alias, onEnroll, onComplete }: {
  path:Path; alias:string|null;
  onEnroll:(id:string)=>void;
  onComplete:(moduleId:string, pathId:string)=>void;
}) {
  const [open, setOpen] = useState(false)
  const color  = CAT_COLOR[path.category] ?? '#00ffaa'
  const dcolor = DIFF_COLOR[path.difficulty] ?? '#94a3b8'
  const pct    = path.modules.length ? Math.round((path.completedModules/path.modules.length)*100) : 0
  const cat    = CATEGORIES.find(c=>c.id===path.category)

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-200 hover:translate-y-[-2px]"
      style={{background:'rgba(255,255,255,0.025)',border:`1px solid ${color}18`}}>

      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{background:`${color}18`,color,border:`1px solid ${color}30`}}>
                {cat?.icon} {path.category.toUpperCase()}
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{background:`${dcolor}12`,color:dcolor,border:`1px solid ${dcolor}25`}}>
                {path.difficulty}
              </span>
              <span className="font-mono text-[9px] text-slate-600">
                {path.modules.length} modules
              </span>
            </div>
            <h3 className="font-bold text-[14px] text-slate-100 leading-snug mb-1">{path.title}</h3>
            {path.description && (
              <p className="font-mono text-[11px] text-slate-600 leading-relaxed line-clamp-2">{path.description}</p>
            )}
          </div>
        </div>

        {/* Progress bar (if enrolled) */}
        {path.enrolled && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-[9px] text-slate-600">Progress</span>
              <span className="font-mono text-[9px] font-bold" style={{color}}>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
              <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`,background:color}}/>
            </div>
            <div className="font-mono text-[8px] text-slate-700 mt-1">{path.completedModules}/{path.modules.length} completed</div>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-slate-600">by {path.authorAlias}</span>
            <span className="font-mono text-[9px] text-slate-700">👁 {path.views}</span>
            <span className="font-mono text-[9px] text-slate-700">⬆ {path.upvotes}</span>
          </div>
          <div className="flex gap-2">
            {alias && !path.enrolled && (
              <button onClick={()=>onEnroll(path.id)}
                className="font-mono text-[10px] px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
                style={{background:`${color}12`,border:`1px solid ${color}30`,color}}>
                Enroll
              </button>
            )}
            <button onClick={()=>setOpen(v=>!v)}
              className="font-mono text-[10px] px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80"
              style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',color:'#94a3b8'}}>
              {open ? 'Hide ▲' : 'Modules ▼'}
            </button>
          </div>
        </div>
      </div>

      {/* Modules list */}
      {open && (
        <div className="border-t" style={{borderColor:'rgba(255,255,255,0.04)'}}>
          {path.modules.map((mod, i) => {
            const tcolor = TYPE_COLOR[mod.type] ?? '#94a3b8'
            return (
              <div key={mod.id}
                className="flex items-center gap-3 px-5 py-3 border-b transition-colors hover:bg-white/[0.02]"
                style={{borderColor:'rgba(255,255,255,0.03)'}}>
                <span className="font-mono text-[9px] text-slate-700 w-5 text-right shrink-0">{i+1}</span>
                <div className="flex-1">
                  <Link href={`/learn/module?id=${mod.id}`} className="font-mono text-[12px] text-slate-300 hover:text-accent transition-colors">{mod.title}</Link>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[9px]" style={{color:tcolor}}>
                    {TYPE_ICON[mod.type]} {mod.type}
                  </span>
                  <span className="font-mono text-[9px] text-slate-700">+{mod.xpReward}xp</span>
                  {alias && path.enrolled && (
                    <button onClick={()=>onComplete(mod.id, path.id)}
                      className="font-mono text-[8px] px-2 py-0.5 rounded cursor-pointer transition-all"
                      style={{background:`${color}10`,border:`1px solid ${color}20`,color}}>
                      ✓ Done
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function LearnPage() {
  const [paths,       setPaths]       = useState<Path[]>([])
  const [loading,     setLoading]     = useState(true)
  const [category,    setCategory]    = useState('all')
  const [showCreate,  setShowCreate]  = useState(false)
  const [toast,       setToast]       = useState('')
  const user    = getUser()
  const alias   = user?.username ?? null
  const loggedIn = isLoggedIn()

  async function load() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ status:'approved' })
      if (category !== 'all') params.set('category', category)
      if (alias) params.set('alias', alias)
      const res  = await fetch(`/api/v1/learn?${params}`)
      const data = await res.json()
      setPaths(Array.isArray(data) ? data : [])
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [category, alias])

  function showToast(msg:string) {
    setToast(msg)
    setTimeout(()=>setToast(''), 3000)
  }

  async function handleEnroll(pathId:string) {
    if (!alias) return
    await fetch('/api/v1/learn/enroll', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ pathId, alias }),
    })
    showToast('Enrolled! Start learning 🎉')
    load()
  }

  async function handleComplete(moduleId:string, pathId:string) {
    if (!alias) return
    const res  = await fetch('/api/v1/learn/complete', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ moduleId, alias }),
    })
    const data = await res.json()
    showToast(`Module complete! +${data.xp} XP ✨`)
    load()
  }

  const enrolled  = paths.filter(p=>p.enrolled)
  const community = paths.filter(p=>!p.enrolled)

  return (
    <div className="p-5 max-w-6xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 right-4 z-50 font-mono text-[11px] px-4 py-2.5 rounded-xl shadow-xl"
          style={{background:'rgba(0,255,170,0.12)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Learning <span style={{color:'#00ffaa'}}>Paths</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Community-created cybersecurity learning paths — from beginner to red team
          </p>
        </div>
        {loggedIn ? (
          <button onClick={()=>setShowCreate(true)}
            className="font-mono text-[11px] font-bold px-4 py-2.5 rounded-xl cursor-pointer transition-all hover:opacity-80"
            style={{background:'rgba(0,255,170,0.1)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>
            + Create Path
          </button>
        ) : (
          <Link href="/login"
            className="font-mono text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all hover:opacity-80"
            style={{background:'rgba(0,255,170,0.06)',border:'1px solid rgba(0,255,170,0.2)',color:'#00ffaa'}}>
            Sign in to create
          </Link>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {CATEGORIES.map(c => {
          const col = CAT_COLOR[c.id] ?? '#00ffaa'
          return (
            <button key={c.id} onClick={()=>setCategory(c.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold whitespace-nowrap cursor-pointer transition-all shrink-0"
              style={{
                background: category===c.id ? `${col}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${category===c.id ? col+'40' : 'rgba(255,255,255,0.06)'}`,
                color: category===c.id ? col : '#64748b',
              }}>
              {c.icon} {c.label}
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
            <span className="font-mono text-[11px] text-slate-600">Loading paths…</span>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* My enrolled paths */}
          {enrolled.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">In Progress</span>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                  style={{background:'rgba(0,255,170,0.08)',color:'#00ffaa',border:'1px solid rgba(0,255,170,0.2)'}}>
                  {enrolled.length}
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {enrolled.map(p=>(
                  <PathCard key={p.id} path={p} alias={alias} onEnroll={handleEnroll} onComplete={handleComplete}/>
                ))}
              </div>
            </div>
          )}

          {/* Community paths */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {enrolled.length > 0 ? 'Community Paths' : 'Available Paths'}
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{background:'rgba(255,255,255,0.04)',color:'#64748b',border:'1px solid rgba(255,255,255,0.07)'}}>
                {community.length}
              </span>
            </div>

            {community.length === 0 && !loading && (
              <div className="text-center py-16 rounded-2xl"
                style={{border:'1px dashed rgba(255,255,255,0.07)'}}>
                <div className="text-4xl mb-3">📚</div>
                <p className="font-mono text-[12px] text-slate-600 mb-4">
                  {category !== 'all' ? `No ${category} paths yet` : 'No approved paths yet'}
                </p>
                {loggedIn && (
                  <button onClick={()=>setShowCreate(true)}
                    className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl cursor-pointer transition-all hover:opacity-80"
                    style={{background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.2)',color:'#00ffaa'}}>
                    Be the first to create one →
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {community.map(p=>(
                <PathCard key={p.id} path={p} alias={alias} onEnroll={handleEnroll} onComplete={handleComplete}/>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreate && alias && (
        <SubmitModal
          alias={alias}
          onClose={()=>setShowCreate(false)}
          onSubmitted={()=>{ showToast('Path submitted for review! 🎉'); load() }}
        />
      )}
    </div>
  )
}
