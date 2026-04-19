// src/lib/nvd.ts — Real NVD API v2 client
// FIXED: fetchRecentCVEs accepts opts object { daysBack, limit, ... }
// Old callers used positional args (daysBack, limit) — both now work

const NVD_BASE = 'https://services.nvd.nist.gov/rest/json/cves/2.0'
const API_KEY  = process.env.NVD_API_KEY ?? ''

export interface NVDVuln {
  cveId:            string
  description:      string
  cvssScore:        number
  cvssVector:       string
  severity:         'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  vendor:           string
  product:          string
  affectedVersions: string[]
  patchAvailable:   boolean
  references:       string[]
  publishedAt:      Date
  modifiedAt:       Date
}

function parseSev(s: number): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
  if (s >= 9) return 'CRITICAL'
  if (s >= 7) return 'HIGH'
  if (s >= 4) return 'MEDIUM'
  return 'LOW'
}

function parseVuln(v: any): NVDVuln {
  const cve  = v.cve
  const cvss = (
    cve.metrics?.cvssMetricV31?.[0]?.cvssData ??
    cve.metrics?.cvssMetricV30?.[0]?.cvssData ??
    cve.metrics?.cvssMetricV2?.[0]?.cvssData
  )
  const score = cvss?.baseScore ?? 0
  const cpes  = cve.configurations?.[0]?.nodes?.[0]?.cpeMatch ?? []

  return {
    cveId:            cve.id,
    description:      cve.descriptions?.find((d: any) => d.lang === 'en')?.value ?? '',
    cvssScore:        score,
    cvssVector:       cvss?.vectorString ?? '',
    severity:         parseSev(score),
    vendor:           cpes[0]?.criteria?.split(':')?.[3] ?? '',
    product:          cpes[0]?.criteria?.split(':')?.[4] ?? '',
    affectedVersions: cpes
      .slice(0, 5)
      .map((c: any) => c.versionEndIncluding || c.criteria?.split(':')?.[5] || '')
      .filter(Boolean),
    patchAvailable:   ['Modified', 'Analyzed'].includes(cve.vulnStatus ?? ''),
    references:       (cve.references ?? []).slice(0, 5).map((r: any) => r.url),
    publishedAt:      new Date(cve.published),
    modifiedAt:       new Date(cve.lastModified),
  }
}

interface FetchOpts {
  daysBack?:   number
  severity?:   string
  keyword?:    string
  limit?:      number
  startIndex?: number
}

export async function fetchRecentCVEs(
  optsOrDaysBack: FetchOpts | number = {},
  limitArg?: number,
): Promise<{ vulns: NVDVuln[]; total: number }> {
  // Support both signatures:
  //   fetchRecentCVEs({ daysBack: 7, limit: 12 })   ← new
  //   fetchRecentCVEs(7, 12)                          ← legacy positional
  let opts: FetchOpts
  if (typeof optsOrDaysBack === 'number') {
    opts = { daysBack: optsOrDaysBack, limit: limitArg }
  } else {
    opts = optsOrDaysBack
  }

  const { daysBack = 7, limit = 20, startIndex = 0, severity, keyword } = opts

  if (!API_KEY) {
    console.warn('[NVD] NVD_API_KEY not set — returning empty CVE list')
    return { vulns: [], total: 0 }
  }

  const p = new URLSearchParams({
    resultsPerPage: String(Math.min(limit, 2000)),
    startIndex:     String(startIndex),
  })
  if (severity) p.set('cvssV3Severity', severity)
  if (keyword)  p.set('keywordSearch', keyword)

  const now  = new Date()
  const past = new Date(now.getTime() - daysBack * 86_400_000)
  p.set('pubStartDate', past.toISOString().replace('.000Z', '+00:00'))
  p.set('pubEndDate',   now.toISOString().replace('.000Z',  '+00:00'))

  try {
    const res = await fetch(`${NVD_BASE}?${p}`, {
      headers:         { apiKey: API_KEY },
      next:            { revalidate: 3600 },
    } as RequestInit)

    if (!res.ok) {
      console.error('[NVD] API error:', res.status, await res.text().catch(() => ''))
      return { vulns: [], total: 0 }
    }

    const data = await res.json()
    return {
      vulns: (data.vulnerabilities ?? []).map(parseVuln),
      total: data.totalResults ?? 0,
    }
  } catch (err) {
    console.error('[NVD] Fetch failed:', err)
    return { vulns: [], total: 0 }
  }
}

export async function fetchCVEById(cveId: string): Promise<NVDVuln | null> {
  if (!API_KEY) return null
  try {
    const res = await fetch(`${NVD_BASE}?cveId=${cveId}`, {
      headers: { apiKey: API_KEY },
      next:    { revalidate: 3600 },
    } as RequestInit)
    if (!res.ok) return null
    const data = await res.json()
    return data.vulnerabilities?.[0] ? parseVuln(data.vulnerabilities[0]) : null
  } catch {
    return null
  }
}

export async function searchCVEs(keyword: string, limit = 20): Promise<NVDVuln[]> {
  const isCveId = /^CVE-\d{4}-\d+$/i.test(keyword.trim())

  if (isCveId) {
    // Direct CVE ID lookup — no date filter needed
    const single = await fetchCVEById(keyword.trim().toUpperCase())
    return single ? [single] : []
  }

  // Keyword search — no date range so we get all matching CVEs
  const API_KEY = process.env.NVD_API_KEY ?? ''
  if (!API_KEY) return []

  const p = new URLSearchParams({
    resultsPerPage: String(Math.min(limit, 2000)),
    startIndex: '0',
    keywordSearch: keyword,
  })

  try {
    const res = await fetch(`${NVD_BASE}?${p}`, {
      headers: { apiKey: API_KEY },
      next: { revalidate: 3600 },
    } as RequestInit)
    if (!res.ok) return []
    const data = await res.json()
    return (data.vulnerabilities ?? []).map(parseVuln)
  } catch {
    return []
  }
}
