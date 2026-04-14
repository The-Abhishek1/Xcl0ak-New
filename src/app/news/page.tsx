'use client'
import { useEffect, useState } from 'react'
import { timeAgo } from '@/lib/utils'

interface Article {
  id: string
  title: string
  url: string
  source: string
  category: string
  country: string | null
  summary: string | null
  publishedAt: string
}

const CATEGORIES = ['all', 'threat', 'vulnerability', 'breach', 'malware']
const CAT_CLS: Record<string, string> = {
  threat:        'bg-red-500/15 text-red-400 border-red-500/25',
  vulnerability: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
  breach:        'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  malware:       'bg-purple-500/15 text-purple-400 border-purple-500/25',
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState('all')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ limit: '40' })
    if (category !== 'all') params.set('category', category)
    fetch(`/api/v1/news?${params}`)
      .then(r => r.json())
      .then(d => { setArticles(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  return (
    <div className="p-5">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-2xl font-black">Threat <span className="text-accent">Intelligence Feed</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">
            Powered by AlienVault OTX · {articles.length} articles
          </p>
        </div>
        <a href="https://otx.alienvault.com/pulses/subscribed" target="_blank" rel="noreferrer"
          className="font-mono text-[10px] text-slate-500 hover:text-accent2 transition-colors">
          VIEW ON OTX ↗
        </a>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-5">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`font-mono text-[10px] px-3 py-1.5 rounded border capitalize transition-all
              ${category === c
                ? 'border-accent/30 text-accent bg-accent/8'
                : 'border-white/[0.08] text-slate-500 hover:text-slate-300'}`}>
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 font-mono text-[11px] text-slate-600 animate-pulse">
          Fetching OTX intelligence feed...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {articles.map((article, i) => (
            <a key={article.id}
              href={article.url} target="_blank" rel="noreferrer"
              className="glass p-4 hover:border-accent/20 transition-all duration-200
                         hover:-translate-y-0.5 block animate-float-in group"
              style={{ animationDelay: `${i * 0.03}s` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-mono text-[9px] px-1.5 py-[2px] rounded border capitalize ${CAT_CLS[article.category] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/25'}`}>
                  {article.category}
                </span>
                {article.country && (
                  <span className="font-mono text-[9px] text-slate-600">{article.country}</span>
                )}
                <span className="font-mono text-[9px] text-slate-700 ml-auto">
                  {timeAgo(article.publishedAt)}
                </span>
              </div>

              <div className="text-[13px] font-bold text-slate-100 leading-snug mb-2 line-clamp-2
                              group-hover:text-accent transition-colors">
                {article.title}
              </div>

              {article.summary && (
                <div className="text-[11px] text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                  {article.summary}
                </div>
              )}

              <div className="font-mono text-[9px] text-slate-600">{article.source}</div>
            </a>
          ))}

          {articles.length === 0 && !loading && (
            <div className="col-span-2 glass p-12 text-center">
              <div className="font-mono text-[12px] text-slate-600 mb-2">No articles found.</div>
              <button onClick={() => fetch('/api/v1/sync', { method: 'POST' }).then(() => window.location.reload())}
                className="font-mono text-[11px] text-accent hover:underline">
                Trigger sync →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
