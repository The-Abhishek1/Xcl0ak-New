import { clsx, type ClassValue } from 'clsx'

export function cn(...i: ClassValue[]) { return clsx(i) }

export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const m = Math.floor((Date.now() - d.getTime()) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const days = Math.floor(h / 24)
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString()
}

export function cvssBg(score: number): string {
  if (score >= 9) return 'bg-red-500/15 border-red-500/25 text-red-400'
  if (score >= 7) return 'bg-orange-500/15 border-orange-500/25 text-orange-400'
  if (score >= 4) return 'bg-yellow-500/15 border-yellow-500/25 text-yellow-400'
  return 'bg-slate-500/15 border-slate-500/20 text-slate-400'
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function wilsonScore(up: number, down: number): number {
  const n = up + down
  if (n === 0) return 0
  const z = 1.96, p = up / n
  return (p + z*z/(2*n) - z * Math.sqrt((p*(1-p) + z*z/(4*n))/n)) / (1 + z*z/n)
}

export function getAlias(): string {
  if (typeof window === 'undefined') return 'ghost_x91'
  let a = localStorage.getItem('xcloak:alias')
  if (!a) {
    const adj = ['ghost','shadow','null','void','cipher','phantom','byte'][Math.floor(Math.random()*7)]
    a = `${adj}_${Math.random().toString(36).slice(2,6)}`
    localStorage.setItem('xcloak:alias', a)
  }
  return a
}
