'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const CATS  = ['web','pwn','crypto','forensics','misc','reverse','osint']
const DIFFS = ['easy','medium','hard']

export default function CTFSubmitPage() {
  const router = useRouter()
  const titleRef = useRef<HTMLInputElement>(null)
  const descRef  = useRef<HTMLTextAreaElement>(null)
  const flagRef  = useRef<HTMLInputElement>(null)
  const hint1Ref = useRef<HTMLInputElement>(null)
  const hint2Ref = useRef<HTMLInputElement>(null)
  const hint3Ref = useRef<HTMLInputElement>(null)
  const ptsRef   = useRef<HTMLInputElement>(null)
  const fileRef  = useRef<HTMLInputElement>(null)

  const [category,   setCategory]   = useState('web')
  const [difficulty, setDifficulty] = useState('medium')
  const [submitting, setSubmitting] = useState(false)
  const [uploading,  setUploading]  = useState(false)
  const [fileInfo,   setFileInfo]   = useState<{name:string;url:string|null;size:number}|null>(null)
  const [result,     setResult]     = useState<{ok:boolean;msg:string}|null>(null)
  const [alias,      setAlias]      = useState('anon')

  useEffect(() => { setAlias(localStorage.getItem('xcloak:alias') ?? 'anon') }, [])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) { setResult({ok:false,msg:'File too large (max 10MB)'}); return }
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('prefix', 'ctf')
      const res = await fetch('/api/v1/upload', { method:'POST', body:fd })
      const d   = await res.json()
      if (d.error) throw new Error(d.error)
      setFileInfo({ name:d.name, url:d.url, size:d.size })
    } catch(err:any) { setResult({ok:false,msg:err.message}) }
    finally { setUploading(false) }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const title       = titleRef.current?.value.trim() ?? ''
    const description = descRef.current?.value.trim() ?? ''
    const flag        = flagRef.current?.value.trim() ?? ''
    const points      = parseInt(ptsRef.current?.value ?? '300')
    const hints       = [hint1Ref,hint2Ref,hint3Ref].map(r=>r.current?.value.trim()??'').filter(Boolean)
    if (!title || !description || !flag) { setResult({ok:false,msg:'Title, description and flag are required.'}); return }
    if (!flag.startsWith('xcloak{'))    { setResult({ok:false,msg:'Flag must start with xcloak{...}'}); return }
    setSubmitting(true); setResult(null)
    try {
      const res = await fetch('/api/v1/ctf', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ title, category, difficulty, description, flag, points, authorAlias:alias, hints, fileUrl:fileInfo?.url ?? null }),
      })
      const d = await res.json()
      if (res.ok) {
        setResult({ok:true, msg:d.message ?? 'Submitted for review!'})
        setTimeout(()=>router.push('/ctf'), 2500)
      } else {
        setResult({ok:false, msg:d.error ?? 'Submission failed'})
      }
    } catch { setResult({ok:false,msg:'Network error'}) }
    finally { setSubmitting(false) }
  }

  const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

  return (
    <div className="p-3 sm:p-5 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={()=>router.back()} className="font-mono text-[11px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">← Back</button>
        <div>
          <h1 className="text-2xl font-black">Submit <span className="text-accent">CTF Challenge</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-0.5">As <span className="text-accent">{alias}</span> · Reviewed by admins before going live</p>
        </div>
      </div>

      <div className="glass p-3 mb-4 flex gap-3" style={{borderColor:'rgba(255,215,0,0.2)',background:'rgba(255,215,0,0.04)'}}>
        <span className="text-lg shrink-0">📋</span>
        <div>
          <div className="font-mono text-[11px] font-bold text-yellow-400 mb-1">ADMIN REVIEW REQUIRED</div>
          <div className="font-mono text-[10px] text-slate-500">Submitted challenges are reviewed for quality and correctness before appearing publicly. Flag correctness, difficulty, and description will be verified.</div>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="glass p-4 sm:p-5 space-y-4">
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Challenge Title *</label>
            <input ref={titleRef} defaultValue="" placeholder="e.g. Cookie Monster, RSA with a Twist" className={inp} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Category *</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} className={inp}>
                {CATS.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Difficulty *</label>
              <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className={inp}>
                {DIFFS.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Points *</label>
              <input ref={ptsRef} type="number" defaultValue="300" min={50} max={1000} step={50} className={inp} />
            </div>
          </div>
          <div>
            <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Description *</label>
            <textarea ref={descRef} defaultValue="" placeholder="Describe the challenge. What's the goal? What vulnerability does it demonstrate?" className={`${inp} resize-y`} rows={4} />
          </div>
        </div>

        {/* Flag */}
        <div className="glass p-4 sm:p-5">
          <label className="font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-1.5">Flag *</label>
          <input ref={flagRef} defaultValue="" placeholder="xcloak{your_flag_here}" className={inp} style={{color:'#00ffaa',letterSpacing:'0.05em'}} />
          <div className="font-mono text-[9px] text-slate-600 mt-1.5">
            Must start with <span className="text-accent">xcloak{'{'}</span>...{'}'} · Flag is hashed before storage, only you know the plaintext
          </div>
        </div>

        {/* Challenge file upload */}
        <div className="glass p-4 sm:p-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">
            Challenge File <span className="text-slate-700">(optional — binary, zip, pcap, image, etc.)</span>
          </div>
          <div
            className="border-2 border-dashed border-white/[0.1] rounded-xl p-6 text-center cursor-pointer hover:border-accent/30 transition-colors"
            onClick={()=>fileRef.current?.click()}
            onDragOver={e=>e.preventDefault()}
            onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f&&fileRef.current){const dt=new DataTransfer();dt.items.add(f);fileRef.current.files=dt.files;handleFile({target:fileRef.current} as any)}}}>
            {fileInfo ? (
              <div className="space-y-1">
                <div className="text-2xl">📎</div>
                <div className="font-mono text-[12px] font-bold text-accent">{fileInfo.name}</div>
                <div className="font-mono text-[10px] text-slate-600">{(fileInfo.size/1024).toFixed(1)} KB</div>
                {fileInfo.url
                  ? <div className="font-mono text-[9px] text-green-400">✓ Uploaded to Supabase Storage</div>
                  : <div className="font-mono text-[9px] text-yellow-400">⚠ Saved (configure Supabase bucket for storage)</div>
                }
                <button type="button" onClick={e=>{e.stopPropagation();setFileInfo(null);if(fileRef.current)fileRef.current.value=''}}
                  className="font-mono text-[9px] text-red-400 hover:text-red-300">✕ Remove</button>
              </div>
            ) : uploading ? (
              <div><div className="text-2xl mb-2">⟳</div><div className="font-mono text-[11px] text-accent animate-pulse">Uploading...</div></div>
            ) : (
              <div>
                <div className="text-3xl mb-2">📁</div>
                <div className="font-mono text-[12px] text-slate-400 mb-1">Drop challenge file here or click to browse</div>
                <div className="font-mono text-[10px] text-slate-600">Binary · .zip · .pcap · .png · .pdf · max 10MB</div>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" className="hidden"
            accept=".zip,.tar,.gz,.pcap,.pcapng,.png,.jpg,.pdf,.txt,.bin,.exe,.elf,.pyc"
            onChange={handleFile} />
        </div>

        {/* Hints */}
        <div className="glass p-4 sm:p-5 space-y-3">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600">Hints (optional — up to 3)</div>
          {([hint1Ref,hint2Ref,hint3Ref] as const).map((ref,i)=>(
            <div key={i}>
              <label className="font-mono text-[9px] text-slate-700 block mb-1">Hint {i+1}</label>
              <input ref={ref} defaultValue="" placeholder={i===0?'First hint (easiest)':i===1?'Second hint':'Final hint (most revealing)'} className={inp} />
            </div>
          ))}
        </div>

        {result && (
          <div className="font-mono text-[11px] p-3 rounded-lg border"
            style={{background:result.ok?'rgba(0,255,170,0.06)':'rgba(255,58,92,0.06)',borderColor:result.ok?'rgba(0,255,170,0.2)':'rgba(255,58,92,0.2)',color:result.ok?'#00ffaa':'#ff3a5c'}}>
            {result.ok?'✓':'✗'} {result.msg}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={submitting||uploading}
            className="flex-1 py-3 rounded-xl border font-mono text-[12px] font-bold tracking-wider cursor-pointer transition-all disabled:opacity-40"
            style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
            {submitting?'⟳ SUBMITTING...':'📤 SUBMIT FOR REVIEW'}
          </button>
          <button type="button" onClick={()=>router.back()}
            className="px-5 py-3 rounded-xl border border-white/[0.08] text-slate-500 font-mono text-[12px] hover:text-slate-300 cursor-pointer transition-colors">
            BACK
          </button>
        </div>
      </form>
    </div>
  )
}
