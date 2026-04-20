/**
 * Unified auth — one JWT, works for users and admin.
 * NOTE: login response user object has: user_id, email, username, role, tenant_id
 * There is no 'tier' in the login response — we store what we get.
 */
'use client'

const TOKEN_KEY = 'eso_token'
const USER_KEY  = 'eso_user'

export function saveSession(token: string, user: any) {
  if (typeof window === 'undefined') return
  // Cookie — expires in 1 day
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=lax${secure}`
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  // Legacy compat for old xcloak admin API calls
  if (user?.role === 'admin') {
    sessionStorage.setItem('xcloak-admin-alias', user.username ?? 'admin')
  }
  // Dispatch event so Sidebar/Topbar re-render immediately
  window.dispatchEvent(new Event('eso-auth-change'))
}

export function clearSession() {
  if (typeof window === 'undefined') return
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem('xcloak-admin-alias')
  window.dispatchEvent(new Event('eso-auth-change'))
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_KEY}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function getUser(): any | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') }
  catch { return null }
}

export function isLoggedIn(): boolean {
  return !!getToken()
}

export function isAdmin(): boolean {
  return getUser()?.role === 'admin'
}

export function getAuthHeader(): Record<string, string> {
  const t = getToken()
  return t ? { Authorization: `Bearer ${t}` } : {}
}
