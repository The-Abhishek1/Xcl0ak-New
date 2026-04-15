// Persistent anonymous identity — same alias every visit unless user changes it
// Stored in localStorage + a long-lived cookie for server-side reads

const KEY_ALIAS = 'xcloak:alias'
const KEY_FP    = 'xcloak:fp'

function rand(n: number): string {
  return Math.random().toString(36).slice(2, 2 + n)
}

function generateAlias(): string {
  const adj = ['ghost','shadow','null','void','cipher','phantom','byte','hex','root','dark','zero','xor']
  return `${adj[Math.floor(Math.random() * adj.length)]}_${rand(4)}`
}

function generateFP(): string {
  // Stable fingerprint from browser properties — best effort
  const parts = [
    navigator.language ?? 'en',
    screen.width + 'x' + screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC',
    navigator.hardwareConcurrency ?? 4,
    String(navigator.maxTouchPoints ?? 0),
  ]
  // Simple hash
  const str  = parts.join('|')
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

export interface Identity { alias: string; fp: string }

export function getIdentity(): Identity {
  if (typeof window === 'undefined') return { alias: 'ghost_x91', fp: 'server' }

  let alias = localStorage.getItem(KEY_ALIAS)
  let fp    = localStorage.getItem(KEY_FP)

  if (!alias) {
    alias = generateAlias()
    localStorage.setItem(KEY_ALIAS, alias)
  }

  if (!fp) {
    fp = generateFP()
    localStorage.setItem(KEY_FP, fp)
  }

  return { alias, fp }
}

export function setAlias(newAlias: string): void {
  if (typeof window === 'undefined') return
  const clean = newAlias.replace(/[^a-z0-9_\-]/gi, '').slice(0, 24)
  if (clean.length < 3) return
  localStorage.setItem(KEY_ALIAS, clean)
}

export function getAlias(): string {
  return getIdentity().alias
}
