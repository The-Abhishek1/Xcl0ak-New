'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUser, isLoggedIn } from '@/lib/eso-auth'

const TYPE_ICON: Record<string,string> = { read:'📄', lab:'🧪', ctf:'🚩', video:'🎬', quiz:'❓' }
const TYPE_COLOR: Record<string,string> = { read:'#94a3b8', lab:'#00aaff', ctf:'#facc15', video:'#a78bfa', quiz:'#fb923c' }

// Very simple markdown → HTML renderer (no external deps)
function renderMarkdown(md: string): string {
  if (!md) return '<p class="text-slate-600 font-mono text-sm">No content added yet.</p>'
  return md
    // code blocks
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_,lang,code) =>
      `<pre class="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto my-4"><code class="font-mono text-[12px] text-green-400">${code.trim().replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`)
    // inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-green-400 font-mono text-[12px] px-1.5 py-0.5 rounded">$1</code>')
    // headings
    .replace(/^### (.+)$/gm, '<h3 class="text-[16px] font-bold text-slate-200 mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm,  '<h2 class="text-[19px] font-black text-slate-100 mt-8 mb-3 pb-2 border-b border-white/10">$1</h2>')
    .replace(/^# (.+)$/gm,   '<h1 class="text-[24px] font-black text-white mt-6 mb-4">$1</h1>')
    // bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g,     '<strong class="text-slate-200">$1</strong>')
    .replace(/\*(.+?)\*/g,         '<em class="text-slate-400">$1</em>')
    // blockquote
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-2 border-accent/40 pl-4 my-2 text-slate-500 italic font-mono text-sm">$1</blockquote>')
    // unordered list
    .replace(/^[-*] (.+)$/gm, '<li class="flex gap-2 text-slate-400 font-mono text-[13px] my-1"><span class="text-accent mt-1">▸</span><span>$1</span></li>')
    // ordered list
    .replace(/^\d+\. (.+)$/gm, '<li class="flex gap-2 text-slate-400 font-mono text-[13px] my-1"><span class="text-accent2 mt-1">›</span><span>$1</span></li>')
    // images  ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" class="rounded-xl max-w-full my-4 border border-white/10" loading="lazy" />')
    // links  [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer" class="text-accent underline hover:opacity-80">$1 ↗</a>')
    // horizontal rule
    .replace(/^---$/gm, '<hr class="border-white/10 my-6" />')
    // paragraphs (double newline)
    .replace(/\n\n+/g, '</p><p class="text-slate-400 font-mono text-[13px] leading-7 my-3">')
    // wrap in paragraph
    .replace(/^(.)/m, '<p class="text-slate-400 font-mono text-[13px] leading-7 my-3">$1')
    + '</p>'
}

// ── Edit Modal ───────────────────────────────────────────────────────────────
function EditContentModal({ mod, onSave, onClose }: { mod: any; onSave: (content: string) => void; onClose: () => void }) {
  const [content, setContent] = useState(mod.content ?? '')
  const [preview, setPreview] = useState(false)
  const [saving,  setSaving]  = useState(false)

  async function save() {
    setSaving(true)
    try {
      await fetch('/api/v1/learn/module', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: mod.id, content }),
      })
      onSave(content)
      onClose()
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: '#0a0f1a', border: '1px solid rgba(0,255,170,0.15)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]"
          style={{ background: 'rgba(0,255,170,0.03)' }}>
          <div>
            <div className="font-bold text-[14px] text-slate-200">Edit Module Content</div>
            <div className="font-mono text-[10px] text-slate-600">{mod.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreview(v => !v)}
              className="font-mono text-[10px] px-3 py-1.5 rounded-lg cursor-pointer transition-all"
              style={{ background: preview ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${preview ? 'rgba(0,255,170,0.3)' : 'rgba(255,255,255,0.08)'}`, color: preview ? '#00ffaa' : '#64748b' }}>
              {preview ? '✏ Edit' : '👁 Preview'}
            </button>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#475569' }}>✕</button>
          </div>
        </div>

        {/* Toolbar */}
        {!preview && (
          <div className="flex gap-1 px-5 py-2 border-b border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
            {[
              { label:'H1', insert:'# Heading' }, { label:'H2', insert:'## Heading' },
              { label:'**B**', insert:'**bold**' }, { label:'*I*', insert:'*italic*' },
              { label:'`code`', insert:'`code`' }, { label:'```', insert:'```\ncode block\n```' },
              { label:'> Quote', insert:'> blockquote' }, { label:'- List', insert:'- item' },
              { label:'![img]', insert:'![alt text](https://url-to-image.com/image.png)' },
              { label:'[link]', insert:'[link text](https://url.com)' },
              { label:'---', insert:'---' },
            ].map(btn => (
              <button key={btn.label}
                onClick={() => setContent((c: string) => c + (c.endsWith('\n') || !c ? '' : '\n') + btn.insert + '\n')}
                className="font-mono text-[9px] px-2 py-1 rounded cursor-pointer transition-all hover:opacity-80 shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}>
                {btn.label}
              </button>
            ))}
          </div>
        )}

        {/* Editor / Preview */}
        <div className="flex-1 overflow-hidden">
          {preview ? (
            <div className="h-full overflow-y-auto px-8 py-6"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
          ) : (
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Write your module content here using Markdown...\n\n# Heading\n\nExplain the concept clearly.\n\n## Example\n\n\`\`\`bash\nnmap -sV target.com\n\`\`\`\n\n## Key Takeaways\n\n- Point 1\n- Point 2\n\n![Screenshot](https://url-to-screenshot.png)\n\n[Reference link](https://owasp.org)`}
              className="w-full h-full resize-none font-mono text-[12px] text-slate-300 leading-6 px-8 py-6 outline-none"
              style={{ background: 'transparent', caretColor: '#00ffaa' }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06]">
          <div className="font-mono text-[9px] text-slate-700">
            Supports Markdown: **bold**, *italic*, `code`, ```blocks```, ![images], [links]
          </div>
          <div className="flex gap-2">
            <button onClick={onClose}
              className="font-mono text-[11px] px-4 py-2 rounded-lg cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}>
              Cancel
            </button>
            <button onClick={save} disabled={saving}
              className="font-mono text-[11px] font-bold px-5 py-2 rounded-lg cursor-pointer transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
              {saving ? '⟳ Saving…' : '✓ Save Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Module Viewer ───────────────────────────────────────────────────────
function ModuleViewer() {
  const params  = useSearchParams()
  const router  = useRouter()
  const moduleId = params.get('id')
  const user    = getUser()
  const alias   = user?.username ?? null
  const loggedIn = isLoggedIn()

  const [mod,       setMod]       = useState<any>(null)
  const [loading,   setLoading]   = useState(true)
  const [completed, setCompleted] = useState(false)
  const [marking,   setMarking]   = useState(false)
  const [toast,     setToast]     = useState('')
  const [editing,   setEditing]   = useState(false)
  const [error,     setError]     = useState('')

  useEffect(() => {
    if (!moduleId) return
    setLoading(true)
    fetch(`/api/v1/learn/module?id=${moduleId}${alias ? `&alias=${alias}` : ''}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return }
        setMod(d)
        setCompleted(d.completed ?? false)
      })
      .catch(() => setError('Failed to load module'))
      .finally(() => setLoading(false))
  }, [moduleId, alias])

  async function markComplete() {
    if (!alias || !moduleId || completed) return
    setMarking(true)
    try {
      const res  = await fetch('/api/v1/learn/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, alias }),
      })
      const data = await res.json()
      setCompleted(true)
      if (data.xp > 0) showToast(`+${data.xp} XP earned! 🎉`)
      else showToast('Module marked complete ✓')
    } finally { setMarking(false) }
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  function goToModule(id: string) { router.push(`/learn/module?id=${id}`) }

  const isAuthor = alias && mod?.path?.authorAlias === alias
  const isAdmin  = user?.role === 'admin'
  const canEdit  = isAuthor || isAdmin
  const tcolor   = TYPE_COLOR[mod?.type ?? 'read']

  const currentIdx = mod?.path?.modules?.findIndex((m: any) => m.id === moduleId) ?? -1
  const prevMod    = currentIdx > 0 ? mod.path.modules[currentIdx - 1] : null
  const nextMod    = currentIdx >= 0 && currentIdx < (mod?.path?.modules?.length ?? 0) - 1
                     ? mod.path.modules[currentIdx + 1] : null

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
        <span className="font-mono text-[11px] text-slate-600">Loading module…</span>
      </div>
    </div>
  )

  if (error || !mod) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="text-3xl">⚠️</div>
      <p className="font-mono text-[12px] text-slate-600">{error || 'Module not found'}</p>
      <Link href="/learn" className="font-mono text-[11px] text-accent hover:underline">← Back to Learning Paths</Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto p-5">

      {/* Toast */}
      {toast && (
        <div className="fixed top-16 right-4 z-50 font-mono text-[11px] px-4 py-2.5 rounded-xl shadow-xl"
          style={{ background: 'rgba(0,255,170,0.12)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
          {toast}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-5 font-mono text-[10px] text-slate-600">
        <Link href="/learn" className="hover:text-accent transition-colors">Learning Paths</Link>
        <span>›</span>
        <Link href="/learn" className="hover:text-slate-400 transition-colors truncate max-w-[180px]">
          {mod.path?.title}
        </Link>
        <span>›</span>
        <span className="text-slate-400 truncate max-w-[180px]">{mod.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">

        {/* ── Sidebar: module list ── */}
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1">Path</div>
              <div className="font-bold text-[12px] text-slate-300 leading-snug">{mod.path?.title}</div>
            </div>
            <div className="divide-y divide-white/[0.03]">
              {mod.path?.modules?.map((m: any, i: number) => {
                const isActive = m.id === moduleId
                const tc       = TYPE_COLOR[m.type] ?? '#94a3b8'
                return (
                  <button key={m.id} onClick={() => goToModule(m.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] cursor-pointer"
                    style={{ background: isActive ? 'rgba(0,255,170,0.05)' : undefined }}>
                    <span className="font-mono text-[9px] text-slate-700 w-4 shrink-0">{i+1}</span>
                    <span className="font-mono text-[9px] shrink-0" style={{ color: tc }}>{TYPE_ICON[m.type]}</span>
                    <span className="font-mono text-[11px] flex-1 leading-snug"
                      style={{ color: isActive ? '#00ffaa' : '#94a3b8' }}>
                      {m.title}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#00ffaa' }}/>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="min-w-0">

          {/* Module header */}
          <div className="rounded-2xl overflow-hidden mb-5"
            style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${tcolor}20` }}>
            <div className="px-6 py-5" style={{ background: `${tcolor}06`, borderBottom: `1px solid ${tcolor}15` }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                      style={{ background: `${tcolor}18`, color: tcolor, border: `1px solid ${tcolor}30` }}>
                      {TYPE_ICON[mod.type]} {mod.type.toUpperCase()}
                    </span>
                    <span className="font-mono text-[9px] text-slate-600">+{mod.xpReward} XP</span>
                    {completed && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,255,170,0.12)', color: '#00ffaa', border: '1px solid rgba(0,255,170,0.25)' }}>
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-[20px] font-black text-slate-100 leading-snug">{mod.title}</h1>
                </div>
                <div className="flex gap-2 shrink-0">
                  {canEdit && (
                    <button onClick={() => setEditing(true)}
                      className="font-mono text-[10px] px-3 py-2 rounded-lg cursor-pointer transition-all hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b' }}>
                      ✏ Edit Content
                    </button>
                  )}
                  {loggedIn && !completed && (
                    <button onClick={markComplete} disabled={marking}
                      className="font-mono text-[10px] font-bold px-4 py-2 rounded-lg cursor-pointer transition-all hover:opacity-80 disabled:opacity-40"
                      style={{ background: 'rgba(0,255,170,0.1)', border: '1px solid rgba(0,255,170,0.3)', color: '#00ffaa' }}>
                      {marking ? '⟳ Marking…' : '✓ Mark Complete'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content body */}
            <div className="px-6 py-6">
              {mod.content ? (
                <div className="prose-xcloak"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(mod.content) }} />
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">📝</div>
                  <p className="font-mono text-[12px] text-slate-600 mb-4">No content added yet.</p>
                  {canEdit && (
                    <button onClick={() => setEditing(true)}
                      className="font-mono text-[11px] font-bold px-4 py-2 rounded-xl cursor-pointer transition-all hover:opacity-80"
                      style={{ background: 'rgba(0,255,170,0.08)', border: '1px solid rgba(0,255,170,0.2)', color: '#00ffaa' }}>
                      + Add Content
                    </button>
                  )}
                  {!canEdit && (
                    <p className="font-mono text-[10px] text-slate-700">The author hasn't added content yet.</p>
                  )}
                </div>
              )}

              {/* Special CTF section */}
              {mod.type === 'ctf' && (
                <div className="mt-6 p-4 rounded-xl"
                  style={{ background: 'rgba(250,204,21,0.05)', border: '1px solid rgba(250,204,21,0.15)' }}>
                  <div className="font-mono text-[10px] text-yellow-400 font-bold mb-2">🚩 CTF Challenge</div>
                  <p className="font-mono text-[11px] text-slate-500">
                    This is a Capture The Flag challenge. Find the flag and submit it in the{' '}
                    <Link href="/ctf" className="text-yellow-400 hover:underline">CTF section →</Link>
                  </p>
                </div>
              )}

              {/* Special lab section */}
              {mod.type === 'lab' && (
                <div className="mt-6 p-4 rounded-xl"
                  style={{ background: 'rgba(0,170,255,0.05)', border: '1px solid rgba(0,170,255,0.15)' }}>
                  <div className="font-mono text-[10px] text-accent2 font-bold mb-2">🧪 Hands-On Lab</div>
                  <p className="font-mono text-[11px] text-slate-500">
                    This is a practical lab. Use the{' '}
                    <Link href="/playground" className="text-accent2 hover:underline">Playground →</Link>
                    {' '}to practice the techniques described above.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="flex justify-between gap-4">
            {prevMod ? (
              <button onClick={() => goToModule(prevMod.id)}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all hover:opacity-80 text-left"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-slate-600 text-lg shrink-0">←</span>
                <div className="min-w-0">
                  <div className="font-mono text-[9px] text-slate-700 uppercase tracking-wider">Previous</div>
                  <div className="font-mono text-[11px] text-slate-400 truncate">{prevMod.title}</div>
                </div>
              </button>
            ) : <div className="flex-1"/>}

            {nextMod ? (
              <button onClick={async () => { if (!completed && alias) await markComplete(); goToModule(nextMod.id) }}
                className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl cursor-pointer transition-all hover:opacity-80 text-right"
                style={{ background: 'rgba(0,255,170,0.06)', border: '1px solid rgba(0,255,170,0.15)' }}>
                <div className="min-w-0">
                  <div className="font-mono text-[9px] text-slate-700 uppercase tracking-wider">Next Module</div>
                  <div className="font-mono text-[11px] text-accent truncate">{nextMod.title}</div>
                </div>
                <span className="text-accent text-lg shrink-0">→</span>
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(0,255,170,0.04)', border: '1px solid rgba(0,255,170,0.1)' }}>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-accent font-bold">🎉 Path Complete!</div>
                  <div className="font-mono text-[9px] text-slate-600">You've finished this learning path</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <EditContentModal
          mod={mod}
          onClose={() => setEditing(false)}
          onSave={(content) => setMod((m: any) => ({ ...m, content }))}
        />
      )}
    </div>
  )
}

export default function ModulePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
      </div>
    }>
      <ModuleViewer />
    </Suspense>
  )
}
