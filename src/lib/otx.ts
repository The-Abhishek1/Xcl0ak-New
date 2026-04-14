const OTX_BASE = 'https://otx.alienvault.com/api/v1'
const OTX_KEY  = process.env.OTX_API_KEY!
const H = { 'X-OTX-API-KEY': OTX_KEY, 'Content-Type': 'application/json' }

export interface OTXPulse {
  id: string; name: string; description: string; author_name: string
  modified: string; created: string; tags: string[]
  malware_families: string[]; attack_ids: Array<{ id: string; name: string; display_name: string }>
  targeted_countries: string[]; tlp: string; adversary: string
}

export interface ThreatMapPoint {
  lat: number; lng: number; country: string; type: string; severity: number; label: string
}

const COORDS: Record<string, [number, number]> = {
  'United States':[37.09,-95.71],'China':[35.86,104.19],'Russia':[61.52,105.32],
  'Iran':[32.43,53.69],'North Korea':[40.34,127.51],'India':[20.59,78.96],
  'Brazil':[-14.24,-51.93],'Germany':[51.17,10.45],'United Kingdom':[55.38,-3.44],
  'Ukraine':[48.38,31.17],'France':[46.23,2.21],'Japan':[36.20,138.25],
  'South Korea':[35.91,127.77],'Netherlands':[52.13,5.29],'Australia':[-25.27,133.78],
}

export async function getSubscribedPulses(limit = 20): Promise<OTXPulse[]> {
  try {
    const since = new Date(Date.now() - 7 * 86400000).toISOString()
    const res = await fetch(
      `${OTX_BASE}/pulses/subscribed?limit=${limit}&modified_since=${since}`,
      { headers: H, next: { revalidate: 1800 } } as RequestInit
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.results ?? []
  } catch { return [] }
}

export async function getLiveThreatPoints(): Promise<ThreatMapPoint[]> {
  const pulses = await getSubscribedPulses(30)
  const points: ThreatMapPoint[] = []
  const APT: Record<string,string> = {
    'APT28':'Russia','APT29':'Russia','Lazarus':'North Korea',
    'APT10':'China','APT41':'China','Sandworm':'Russia','OilRig':'Iran',
  }
  for (const p of pulses) {
    const countries = p.targeted_countries?.length ? p.targeted_countries : ['United States']
    for (const c of countries.slice(0,2)) {
      const coords = COORDS[c]; if (!coords) continue
      points.push({
        lat: coords[0] + (Math.random()-0.5)*3,
        lng: coords[1] + (Math.random()-0.5)*3,
        country: c,
        type: p.malware_families?.[0] || p.attack_ids?.[0]?.display_name || p.tags?.[0] || 'Threat',
        severity: p.tlp === 'red' ? 5 : 3,
        label: p.name.substring(0,60),
      })
    }
    if (p.adversary && APT[p.adversary]) {
      const c = APT[p.adversary], coords = COORDS[c]
      if (coords) points.push({ lat:coords[0], lng:coords[1], country:c, type:p.adversary, severity:5, label:p.adversary })
    }
  }
  return points.slice(0,60)
}

export async function searchPulses(query: string, limit = 10): Promise<OTXPulse[]> {
  try {
    const res = await fetch(
      `${OTX_BASE}/search/pulses?q=${encodeURIComponent(query)}&limit=${limit}`,
      { headers: H, next: { revalidate: 900 } } as RequestInit
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.results ?? []
  } catch { return [] }
}
