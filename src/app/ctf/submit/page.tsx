'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, getUser } from '@/lib/eso-auth'
import Link from 'next/link'

const CATS  = ['web','pwn','crypto','forensics','misc','reverse','osint']
const DIFFS = ['easy','medium','hard','insane']

function Field({label, children, note}: {label:string;children:React.ReactNode;note?:string}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600">{label}</label>
        {note && <span className="font-mono text-[8px] text-slate-700">{note}</span>}
      </div>
      {children}
    </div>
  )
}

export default function CTFSubmitPage() {
  const router   = useRouter()
  const fileRef  = useRef<HTMLInputElement>(null)
  const [authed,     setAuthed]     = useState<boolean|null>(null)
  const [user,       setUser]       = useState<any>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploading,  setUploading]  = useState(false)
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState('')
  const [fileInfo,   setFileInfo]   = useState<{name:string;url:string;size:number}|null>(null)

  const [form, setForm] = useState({
    title:'', description:'', flag:'', points:'300',
    category:'web', difficulty:'medium',
    hint1:'', hint2:'', hint3:'',
  })

  useEffect(() => {
    const ok = isLoggedIn(); const u = getUser()
    setAuthed(ok); setUser(u)
    if (!ok) router.replace('/login?from=ctf%2Fsubmit')
  }, [router])

  const set = (k: string, v: string) => setForm(f => ({...f, [k]: v}))

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    if (file.size > 20*1024*1024) { setError('File too large (max 20MB)'); return }
    setUploading(true); setError('')
    try {
      const fd = new FormData()
      fd.append('file', file); fd.append('prefix', 'ctf')
      const res = await fetch('/api/v1/upload', {method:'POST', body:fd})
      const d   = await res.json()
      if (d.error) throw new Error(d.error)
      setFileInfo({name:file.name, url:d.url, size:file.size})
    } catch(e:any) { setError(e.message) }
    finally { setUploading(false) }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim() || !form.flag.trim()) {
      setError('Title, description and flag are required.'); return
    }
    if (!form.flag.startsWith('xcloak{')) {
      setError('Flag must start with xcloak{ and end with }'); return
    }
    if (parseInt(form.points) < 50 || parseInt(form.points) > 1000) {
      setError('Points must be between 50 and 1000'); return
    }
    const u = getUser(); if (!u) { router.replace('/login'); return }
    setSubmitting(true); setError('')
    try {
      const hints = [form.hint1, form.hint2, form.hint3].filter(Boolean)
      const res = await fetch('/api/v1/ctf', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          title:       form.title.trim(),
          description: form.description.trim(),
          flag:        form.flag.trim(),
          points:      parseInt(form.points),
          category:    form.category,
          difficulty:  form.difficulty,
          hints,
          fileUrl:     fileInfo?.url ?? null,
          authorAlias: u.username ?? 'anonymous',
        }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error ?? 'Submission failed')
      setSuccess('Challenge submitted! It will go live once an admin approves it.')
      setForm({title:'',description:'',flag:'',points:'300',category:'web',difficulty:'medium',hint1:'',hint2:'',hint3:''})
      setFileInfo(null)
    } catch(e:any) { setError(e.message) }
    finally { setSubmitting(false) }
  }

  if (authed === null) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
    </div>
  )
  if (!authed) return null

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"


  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="mb-6 flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-black">Submit <span className="text-accent2">CTF Challenge</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            As <span className="text-accent">{user?.username}</span>
            {' · '}Reviewed before going live
          </p>
        </div>
        <Link href="/ctf" className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">
          ← Browse CTF
        </Link>
      </div>

      {success && (
        <div className="mb-4 p-4 rounded-xl font-mono text-[11px] text-accent"
          style={{background:'rgba(0,255,170,0.08)',border:'1px solid rgba(0,255,170,0.25)'}}>
          ✓ {success}
          <div className="mt-2">
            <Link href="/ctf" className="underline">Browse challenges →</Link>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        {/* Challenge info */}
        <div className="glass p-5 space-y-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Challenge Info</div>

          <Field label="Title *">
            <input value={form.title} onChange={e=>set('title',e.target.value)}
              placeholder="e.g. Cookie Monster — Session Hijacking" className={inp} maxLength={120}/>
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Category">
              <select value={form.category} onChange={e=>set('category',e.target.value)} className={inp}>
                {CATS.map(c=><option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Difficulty">
              <select value={form.difficulty} onChange={e=>set('difficulty',e.target.value)} className={inp}>
                {DIFFS.map(d=><option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Points" note="50–1000">
              <input type="number" min={50} max={1000} step={50}
                value={form.points} onChange={e=>set('points',e.target.value)} className={inp}/>
            </Field>
          </div>

          <Field label="Description *" note="Include what the player needs to do">
            <textarea value={form.description} onChange={e=>set('description',e.target.value)}
              placeholder="Describe the challenge scenario, what the player must find, and any constraints. Include connection details if applicable..."
              className={`${inp} resize-y`} rows={6} maxLength={3000}/>
          </Field>
        </div>

        {/* Flag */}
        <div className="glass p-5 space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Flag</div>
          <div className="p-3 rounded-xl font-mono text-[10px] text-slate-500"
            style={{background:'rgba(255,215,0,0.04)',border:'1px solid rgba(255,215,0,0.15)'}}>
            ⚠ Flag is stored as a SHA-256 hash — admins cannot read it. Only you know the real flag.
          </div>
          <Field label="Flag *" note="Must start with xcloak{">
            <input value={form.flag} onChange={e=>set('flag',e.target.value)}
              placeholder="xcloak{your_flag_here}" className={inp} spellCheck={false}/>
          </Field>
        </div>

        {/* Hints */}
        <div className="glass p-5 space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Hints (optional, up to 3)</div>
          <p className="font-mono text-[10px] text-slate-600">Hints help players who are stuck. Good hints nudge without spoiling.</p>
          {[['hint1','Hint 1 (easiest)'],['hint2','Hint 2'],['hint3','Hint 3 (closest to answer)']].map(([k,l])=>(
            <Field key={k} label={l}>
              <input value={(form as any)[k]} onChange={e=>set(k,e.target.value)}
                placeholder="e.g. Look at the cookie value in DevTools..." className={inp}/>
            </Field>
          ))}
        </div>

        {/* File attachment */}
        <div className="glass p-5 space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Challenge File (optional)</div>
          <p className="font-mono text-[10px] text-slate-600">
            Attach a binary, ZIP archive, PCAP, or image that players need to solve the challenge. Max 20MB.
          </p>
          <input ref={fileRef} type="file" className="hidden" onChange={handleFile}
            accept=".zip,.tar.gz,.7z,.exe,.elf,.py,.c,.pcap,.pcapng,.png,.jpg,.txt,.pdf"/>
          {fileInfo ? (
            <div className="flex items-center justify-between p-3 rounded-xl"
              style={{background:'rgba(0,170,255,0.06)',border:'1px solid rgba(0,170,255,0.2)'}}>
              <div>
                <div className="font-mono text-[11px] text-accent2 font-semibold">{fileInfo.name}</div>
                <div className="font-mono text-[9px] text-slate-600 mt-0.5">
                  {(fileInfo.size/1024).toFixed(1)} KB · uploaded ✓
                </div>
              </div>
              <button type="button" onClick={()=>setFileInfo(null)}
                className="font-mono text-[9px] text-red-400 hover:text-red-300 cursor-pointer">Remove</button>
            </div>
          ) : (
            <button type="button" onClick={()=>fileRef.current?.click()} disabled={uploading}
              className="w-full py-4 rounded-xl border-2 border-dashed font-mono text-[11px] cursor-pointer transition-all hover:opacity-80 disabled:opacity-40"
              style={{borderColor:'rgba(255,255,255,0.1)',color:'#475569'}}>
              {uploading ? '⟳ Uploading...' : '📎 Click to attach challenge file'}
            </button>
          )}
        </div>

        {error && (
          <div className="font-mono text-[11px] text-red-400 px-4 py-3 rounded-xl border border-red-500/25 bg-red-500/[0.06]">
            ✗ {error}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={submitting||uploading}
            className="flex-1 py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all disabled:opacity-40"
            style={{background:'rgba(0,170,255,0.1)',border:'1px solid rgba(0,170,255,0.35)',color:'#00aaff'}}>
            {submitting ? '⟳ Submitting...' : '🚩 Submit Challenge'}
          </button>
          <button type="button" onClick={()=>router.back()}
            className="px-6 py-3 rounded-xl border border-white/[0.08] font-mono text-[12px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
