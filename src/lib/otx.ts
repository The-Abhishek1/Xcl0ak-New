// src/lib/otx.ts — AlienVault OTX real threat intelligence
// FIXED: added missing getThreatEvents, getLatestPulses, getCVEsFromOTX
// that dashboard/page.tsx and /api/v1/threat/route.ts import

const OTX_BASE = 'https://otx.alienvault.com/api/v1'
const OTX_KEY  = process.env.OTX_API_KEY ?? ''
const otxHeaders = () => ({
  'X-OTX-API-KEY': OTX_KEY,
  'Content-Type': 'application/json',
})

// ─── Types ────────────────────────────────────────────────────────────────────

export interface OTXPulse {
  id: string
  name: string
  description: string
  author_name: string
  modified: string
  created: string
  tags: string[]
  malware_families: string[]
  attack_ids: Array<{ id: string; name: string; display_name: string }>
  targeted_countries: string[]
  tlp: string
  adversary: string
}

export interface ThreatMapPoint {
  lat: number
  lng: number
  country: string
  type: string
  severity: number
  label: string
}

// Shape that matches both ThreatEvent DB model and the map component
export interface ThreatEvent {
  id?: string
  type: string
  srcCountry: string
  dstCountry: string
  srcLat: number
  srcLng: number
  dstLat: number
  dstLng: number
  severity: number
  details?: string
  sourceUrl?: string
  createdAt?: Date | string
}

// ─── Country coords ───────────────────────────────────────────────────────────

const COUNTRY_COORDS: Record<string, [number, number]> = {
  'United States': [37.09, -95.71],
  'China':         [35.86, 104.19],
  'Russia':        [61.52, 105.32],
  'Iran':          [32.43,  53.69],
  'North Korea':   [40.34, 127.51],
  'India':         [20.59,  78.96],
  'Brazil':        [-14.24, -51.93],
  'Germany':       [51.17,  10.45],
  'United Kingdom':[55.38,  -3.44],
  'Ukraine':       [48.38,  31.17],
  'France':        [46.23,   2.21],
  'Japan':         [36.20, 138.25],
  'South Korea':   [35.91, 127.77],
  'Netherlands':   [52.13,   5.29],
  'Australia':     [-25.27,133.78],
  'Canada':        [56.13, -106.35],
  'Pakistan':      [30.37,  69.35],
  'Vietnam':       [14.06, 108.28],
  'Indonesia':     [-0.79, 113.92],
  'Turkey':        [38.96,  35.24],
}

const ADVERSARY_COUNTRY: Record<string, string> = {
  'APT28': 'Russia', 'APT29': 'Russia', 'Sandworm': 'Russia',
  'Lazarus': 'North Korea', 'Kimsuky': 'North Korea',
  'APT10': 'China', 'APT41': 'China', 'Volt Typhoon': 'China',
  'OilRig': 'Iran', 'Charming Kitten': 'Iran',
}

// ─── Core fetch: subscribed pulses ────────────────────────────────────────────

export async function getSubscribedPulses(limit = 20): Promise<OTXPulse[]> {
  if (!OTX_KEY) return []
  try {
    const since = new Date(Date.now() - 7 * 86_400_000).toISOString()
    const res = await fetch(
      `${OTX_BASE}/pulses/subscribed?limit=${limit}&modified_since=${since}`,
      { headers: otxHeaders(), next: { revalidate: 1800 } } as RequestInit,
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.results ?? []
  } catch {
    return []
  }
}

// ─── getLatestPulses — alias used by dashboard/page.tsx ───────────────────────
// dashboard imports: getLatestPulses (was missing — caused runtime crash)

export async function getLatestPulses(limit = 8): Promise<OTXPulse[]> {
  return getSubscribedPulses(limit)
}

// ─── getThreatEvents — used by dashboard/page.tsx + /api/v1/threat ────────────
// Returns ThreatEvent[] (matches Prisma ThreatEvent model shape)

export async function getThreatEvents(limit = 40): Promise<ThreatEvent[]> {
  if (!OTX_KEY) return []
  const pulses = await getSubscribedPulses(Math.ceil(limit / 2))
  const events: ThreatEvent[] = []

  for (const pulse of pulses) {
    const countries = pulse.targeted_countries?.length
      ? pulse.targeted_countries
      : ['United States']

    const srcCountry = pulse.adversary && ADVERSARY_COUNTRY[pulse.adversary]
      ? ADVERSARY_COUNTRY[pulse.adversary]
      : 'Russia' // generic unknown origin

    const srcCoords = COUNTRY_COORDS[srcCountry] ?? [0, 0]

    for (const dstCountry of countries.slice(0, 2)) {
      const dstCoords = COUNTRY_COORDS[dstCountry]
      if (!dstCoords) continue

      const type = (
        pulse.malware_families?.[0] ||
        pulse.attack_ids?.[0]?.display_name ||
        pulse.tags?.[0] ||
        'Threat'
      )

      events.push({
        type,
        srcCountry,
        dstCountry,
        srcLat: srcCoords[0] + (Math.random() - 0.5) * 2,
        srcLng: srcCoords[1] + (Math.random() - 0.5) * 2,
        dstLat: dstCoords[0] + (Math.random() - 0.5) * 2,
        dstLng: dstCoords[1] + (Math.random() - 0.5) * 2,
        severity: pulse.tlp === 'red' ? 5 : pulse.tlp === 'amber' ? 4 : 3,
        details: pulse.name.substring(0, 120),
        sourceUrl: `https://otx.alienvault.com/pulse/${pulse.id}`,
        createdAt: new Date(pulse.modified ?? pulse.created),
      })

      if (events.length >= limit) break
    }
    if (events.length >= limit) break
  }

  return events
}

// ─── getCVEsFromOTX — used by /api/v1/threat?view=stats ──────────────────────

export async function getCVEsFromOTX(): Promise<string[]> {
  if (!OTX_KEY) return []
  try {
    const pulses = await getSubscribedPulses(20)
    const cveSet = new Set<string>()
    const CVE_RE = /CVE-\d{4}-\d{4,}/gi

    for (const pulse of pulses) {
      const text = `${pulse.name} ${pulse.description} ${pulse.tags?.join(' ')}`
      const matches = text.match(CVE_RE) ?? []
      for (const m of matches) cveSet.add(m.toUpperCase())
    }
    return Array.from(cveSet)
  } catch {
    return []
  }
}

// ─── getLiveThreatPoints — used by old dashboard / ThreatMapPanel ─────────────

export async function getLiveThreatPoints(): Promise<ThreatMapPoint[]> {
  const events = await getThreatEvents(60)
  return events.map(e => ({
    lat:      e.srcLat,
    lng:      e.srcLng,
    country:  e.srcCountry,
    type:     e.type,
    severity: e.severity,
    label:    e.details ?? '',
  }))
}

// ─── IP / Domain lookup ───────────────────────────────────────────────────────

export async function getIPThreatInfo(ip: string) {
  if (!OTX_KEY) return null
  try {
    const [g, r] = await Promise.all([
      fetch(`${OTX_BASE}/indicator/IPv4/${ip}/general`, { headers: otxHeaders() }).then(x => x.json()).catch(() => null),
      fetch(`${OTX_BASE}/indicator/IPv4/${ip}/reputation`, { headers: otxHeaders() }).then(x => x.json()).catch(() => null),
    ])
    return { general: g, reputation: r }
  } catch {
    return null
  }
}

export async function getDomainThreatInfo(domain: string) {
  if (!OTX_KEY) return null
  try {
    const res = await fetch(`${OTX_BASE}/indicator/domain/${domain}/general`, { headers: otxHeaders() })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

export async function searchPulses(query: string, limit = 10): Promise<OTXPulse[]> {
  if (!OTX_KEY) return []
  try {
    const res = await fetch(
      `${OTX_BASE}/search/pulses?q=${encodeURIComponent(query)}&limit=${limit}`,
      { headers: otxHeaders(), next: { revalidate: 900 } } as RequestInit,
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.results ?? []
  } catch {
    return []
  }
}
