const NVD_BASE = 'https://services.nvd.nist.gov/rest/json/cves/2.0'
const API_KEY  = process.env.NVD_API_KEY!

export interface NVDVuln {
  cveId: string; description: string; cvssScore: number; cvssVector: string
  severity: 'CRITICAL'|'HIGH'|'MEDIUM'|'LOW'; vendor: string; product: string
  affectedVersions: string[]; patchAvailable: boolean; references: string[]
  publishedAt: Date; modifiedAt: Date
}

function sev(s: number): NVDVuln['severity'] {
  return s >= 9 ? 'CRITICAL' : s >= 7 ? 'HIGH' : s >= 4 ? 'MEDIUM' : 'LOW'
}

function parse(v: any): NVDVuln {
  const cve  = v.cve
  const cvss = cve.metrics?.cvssMetricV31?.[0]?.cvssData ?? cve.metrics?.cvssMetricV30?.[0]?.cvssData
  const score = cvss?.baseScore ?? 0
  const cpes  = cve.configurations?.[0]?.nodes?.[0]?.cpeMatch ?? []
  return {
    cveId:            cve.id,
    description:      cve.descriptions?.find((d: any) => d.lang === 'en')?.value ?? '',
    cvssScore:        score,
    cvssVector:       cvss?.vectorString ?? '',
    severity:         sev(score),
    vendor:           cpes[0]?.criteria?.split(':')[3] ?? '',
    product:          cpes[0]?.criteria?.split(':')[4] ?? '',
    affectedVersions: cpes.slice(0,5).map((c: any) => c.versionEndIncluding || c.criteria?.split(':')[5] || '').filter(Boolean),
    patchAvailable:   ['Modified','Analyzed'].includes(cve.vulnStatus ?? ''),
    references:       (cve.references ?? []).slice(0,5).map((r: any) => r.url),
    publishedAt:      new Date(cve.published),
    modifiedAt:       new Date(cve.lastModified),
  }
}

export async function fetchRecentCVEs(opts: {
  daysBack?: number; severity?: string; keyword?: string; limit?: number
} = {}): Promise<{ vulns: NVDVuln[]; total: number }> {
  const { daysBack = 7, limit = 20, severity, keyword } = opts
  const p = new URLSearchParams({ resultsPerPage: String(limit), startIndex: '0' })
  if (severity) p.set('cvssV3Severity', severity)
  if (keyword)  p.set('keywordSearch', keyword)
  const now = new Date(), past = new Date(now.getTime() - daysBack * 86400000)
  p.set('pubStartDate', past.toISOString().replace('.000Z', '+00:00'))
  p.set('pubEndDate',   now.toISOString().replace('.000Z',  '+00:00'))
  try {
    const res = await fetch(`${NVD_BASE}?${p}`, {
      headers: { apiKey: API_KEY },
      next: { revalidate: 3600 },
    } as RequestInit)
    if (!res.ok) return { vulns: [], total: 0 }
    const data = await res.json()
    return { vulns: (data.vulnerabilities ?? []).map(parse), total: data.totalResults ?? 0 }
  } catch { return { vulns: [], total: 0 } }
}

export async function fetchCVEById(cveId: string): Promise<NVDVuln | null> {
  try {
    const res = await fetch(`${NVD_BASE}?cveId=${cveId}`, {
      headers: { apiKey: API_KEY }, next: { revalidate: 3600 },
    } as RequestInit)
    if (!res.ok) return null
    const data = await res.json()
    return data.vulnerabilities?.[0] ? parse(data.vulnerabilities[0]) : null
  } catch { return null }
}

export async function searchCVEs(keyword: string, limit = 20): Promise<NVDVuln[]> {
  const { vulns } = await fetchRecentCVEs({ keyword, limit, daysBack: 365 })
  return vulns
}
