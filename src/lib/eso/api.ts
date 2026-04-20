// ESO API client — always sends JWT as Authorization: Bearer header
// Cookies alone don't work through the Next.js rewrite proxy in production

import { getToken } from '@/lib/eso-auth'

const BASE = '/api/eso'

function authHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? getToken() : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request(method: string, path: string, body?: any) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    // Token expired or invalid — clear session and throw
    if (typeof window !== 'undefined') {
      const { clearSession } = await import('@/lib/eso-auth')
      clearSession()
    }
    throw new Error('Session expired. Please log in again.')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || err.error?.message || err.message || 'Request failed')
  }

  return res.json()
}

export const esoApi = {
  get:  (path: string)             => request('GET',    path),
  post: (path: string, body?: any) => request('POST',   path, body),
  put:  (path: string, body?: any) => request('PUT',    path, body),
  del:  (path: string)             => request('DELETE', path),
}

export const esoScans = {
  execute:   (goal: string, target: string)   => esoApi.post('/hybrid/execute', { goal, target }),
  status:    (id: string)                     => esoApi.get(`/hybrid/status/${id}`),
  proposals: (id: string)                     => esoApi.get(`/hybrid/proposals/${id}`),
  approve:   (id: string, approved: string[]) => esoApi.post(`/hybrid/approve/${id}`, { approved }),
  list:      ()                               => esoApi.get('/hybrid/list'),
  pdfUrl:    (id: string)                     => `${BASE}/hybrid/report/${id}/pdf`,
}

export const esoHistory = {
  list: (limit = 20, offset = 0) => esoApi.get(`/auth/scans?limit=${limit}&offset=${offset}`),
}

export const esoSystem = {
  health: () => esoApi.get('/health'),
  info:   () => esoApi.get('/system/info'),
  audit:  (params = '') => esoApi.get(`/system/audit${params}`),
}

export const esoAuth = {
  register:  (email: string, username: string, password: string) => esoApi.post('/auth/register', { email, username, password }),
  login:     (email: string, password: string)                   => esoApi.post('/auth/login', { email, password }),
  me:        ()                                                   => esoApi.get('/auth/me'),
  createKey: (name: string)                                       => esoApi.post('/auth/api-keys', { name }),
  listKeys:  ()                                                   => esoApi.get('/auth/api-keys'),
  revokeKey: (keyId: string)                                      => esoApi.del(`/auth/api-keys/${keyId}`),
}
