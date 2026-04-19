// ESO API client — proxies to ESO FastAPI via Next.js /api/eso/* route

const BASE = '/api/eso'

async function request(method: string, path: string, body?: any) {
  // Read token from cookie and send as Authorization header explicitly
  // (cookies alone are unreliable with SameSite policies)
  const tokenMatch = typeof document !== 'undefined'
    ? document.cookie.match(/(?:^|; )eso_token=([^;]*)/)
    : null
  const token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : null

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })

  // If JWT expired, clear cookie and continue (ESO falls back to dev_user in dev mode)
  if (res.status === 401) {
    if (typeof document !== 'undefined') {
      document.cookie = 'eso_token=; Max-Age=0; path=/'
    }
    // Retry once without token
    const retry = await fetch(`${BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (!retry.ok) {
      const err = await retry.json().catch(() => ({ detail: retry.statusText }))
      throw new Error(err.detail || err.error?.message || 'Request failed')
    }
    return retry.json()
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || err.error?.message || 'Request failed')
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
  execute:   (goal: string, target: string)           => esoApi.post('/hybrid/execute', { goal, target }),
  status:    (id: string)                             => esoApi.get(`/hybrid/status/${id}`),
  proposals: (id: string)                             => esoApi.get(`/hybrid/proposals/${id}`),
  approve:   (id: string, approved: string[])         => esoApi.post(`/hybrid/approve/${id}`, { approved }),
  list:      ()                                       => esoApi.get('/hybrid/list'),
  pdfUrl:    (id: string)                             => `${BASE}/hybrid/report/${id}/pdf`,
}

export const esoHistory = {
  list: (limit = 20, offset = 0) => esoApi.get(`/auth/scans?limit=${limit}&offset=${offset}`),
}

export const esoSystem = {
  health:    ()                                        => esoApi.get('/health'),
  info:      ()                                        => esoApi.get('/system/info'),
  switchLLM: (provider: string, model?: string)       => esoApi.post('/system/llm/switch', { provider, model }),
  testLLM:   ()                                       => esoApi.get('/system/llm/test'),
  audit:     (params?: string)                        => esoApi.get(`/system/audit${params || ''}`),
  targets:   ()                                       => esoApi.get('/system/targets'),
}

export const esoAuth = {
  register:  (email: string, username: string, password: string) => esoApi.post('/auth/register', { email, username, password }),
  login:     (email: string, password: string)                   => esoApi.post('/auth/login', { email, password }),
  me:        ()                                                   => esoApi.get('/auth/me'),
  createKey: (name: string)                                      => esoApi.post('/auth/api-keys', { name }),
  listKeys:  ()                                                   => esoApi.get('/auth/api-keys'),
  revokeKey: (keyId: string)                                     => esoApi.del(`/auth/api-keys/${keyId}`),
}
