import { NextRequest, NextResponse } from 'next/server'

const OTX_BASE = 'https://otx.alienvault.com/api/v1'
const OTX_KEY  = process.env.OTX_API_KEY!

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain')
  if (!domain) return NextResponse.json({ error: 'domain required' }, { status: 400 })

  try {
    const res = await fetch(
      `${OTX_BASE}/indicator/domain/${encodeURIComponent(domain)}/general`,
      { headers: { 'X-OTX-API-KEY': OTX_KEY }, next: { revalidate: 3600 } }
    )
    if (!res.ok) return NextResponse.json({ pulse_info: { count: 0, pulses: [] } })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
