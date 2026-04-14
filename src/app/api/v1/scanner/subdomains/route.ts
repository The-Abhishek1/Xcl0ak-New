import { NextRequest, NextResponse } from 'next/server'
import { promises as dns } from 'dns'

const WORDLIST = [
  'www','mail','api','admin','dev','staging','vpn','cdn','app','portal',
  'remote','git','blog','ftp','ns1','ns2','smtp','pop','imap','webmail',
  'mx','m','shop','store','secure','login','auth','dashboard','status',
]

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain')
  if (!domain) return NextResponse.json({ error: 'domain required' }, { status: 400 })

  // Sanitise
  const safe = domain.replace(/[^a-zA-Z0-9.\-]/g, '').slice(0, 100)

  const found: string[] = []

  await Promise.allSettled(
    WORDLIST.map(async sub => {
      const fqdn = `${sub}.${safe}`
      try {
        await dns.lookup(fqdn)
        found.push(fqdn)
      } catch { /* not found */ }
    })
  )

  // Also check cert transparency via crt.sh
  try {
    const res = await fetch(
      `https://crt.sh/?q=%.${safe}&output=json`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const certs = await res.json()
      const ctNames = (certs as any[])
        .map(c => c.name_value as string)
        .flatMap(n => n.split('\n'))
        .filter(n => n.endsWith(`.${safe}`) && !n.startsWith('*'))
        .map(n => n.trim())
      ctNames.forEach(n => { if (!found.includes(n)) found.push(n) })
    }
  } catch { /* crt.sh unavailable */ }

  return NextResponse.json({ domain: safe, found: [...new Set(found)].sort() })
}
