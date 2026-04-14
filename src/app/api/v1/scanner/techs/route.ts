import { NextRequest, NextResponse } from 'next/server'

interface Tech { name: string; version?: string; category: string }

const HEADER_SIGS: Array<{ header: string; pattern: RegExp; name: string; versionGroup?: number; category: string }> = [
  { header: 'server',          pattern: /nginx\/([\d.]+)/i,        name: 'Nginx',       versionGroup: 1, category: 'Web Server' },
  { header: 'server',          pattern: /apache\/([\d.]+)/i,       name: 'Apache',      versionGroup: 1, category: 'Web Server' },
  { header: 'server',          pattern: /microsoft-iis\/([\d.]+)/i,name: 'IIS',         versionGroup: 1, category: 'Web Server' },
  { header: 'server',          pattern: /cloudflare/i,             name: 'Cloudflare',  category: 'CDN' },
  { header: 'x-powered-by',    pattern: /php\/([\d.]+)/i,          name: 'PHP',         versionGroup: 1, category: 'Language' },
  { header: 'x-powered-by',    pattern: /asp\.net/i,               name: 'ASP.NET',     category: 'Framework' },
  { header: 'x-powered-by',    pattern: /express/i,                name: 'Express.js',  category: 'Framework' },
  { header: 'x-generator',     pattern: /wordpress ([\d.]+)/i,     name: 'WordPress',   versionGroup: 1, category: 'CMS' },
  { header: 'x-drupal-cache',  pattern: /.*/,                      name: 'Drupal',      category: 'CMS' },
  { header: 'x-shopify-stage', pattern: /.*/,                      name: 'Shopify',     category: 'E-commerce' },
  { header: 'cf-ray',          pattern: /.*/,                      name: 'Cloudflare',  category: 'CDN' },
  { header: 'x-vercel-id',     pattern: /.*/,                      name: 'Vercel',      category: 'Hosting' },
  { header: 'x-amz-cf-id',     pattern: /.*/,                      name: 'AWS CloudFront', category: 'CDN' },
  { header: 'x-cache',         pattern: /varnish/i,                name: 'Varnish',     category: 'Cache' },
]

const BODY_SIGS: Array<{ pattern: RegExp; name: string; version?: string; category: string }> = [
  { pattern: /wp-content\/themes\//i,          name: 'WordPress',   category: 'CMS' },
  { pattern: /Drupal\.settings/i,              name: 'Drupal',      category: 'CMS' },
  { pattern: /var Shopify/i,                   name: 'Shopify',     category: 'E-commerce' },
  { pattern: /React\.createElement|__NEXT_DATA__/i, name: 'Next.js', category: 'Framework' },
  { pattern: /ng-version="([\d.]+)"/i,         name: 'Angular',     category: 'Framework' },
  { pattern: /vue\.js|__vue_app__/i,           name: 'Vue.js',      category: 'Framework' },
  { pattern: /jquery[\/\s]([\d.]+)/i,          name: 'jQuery',      category: 'Library' },
  { pattern: /bootstrap[\/\s]([\d.]+)/i,       name: 'Bootstrap',   category: 'CSS Framework' },
  { pattern: /laravel/i,                        name: 'Laravel',     category: 'Framework' },
  { pattern: /symfony/i,                        name: 'Symfony',     category: 'Framework' },
]

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 })

  const techs: Tech[] = []
  const seen = new Set<string>()

  function add(t: Tech) {
    if (!seen.has(t.name)) { seen.add(t.name); techs.push(t) }
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 Xcloak-Scanner/2.0' },
      redirect: 'follow',
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    })

    const headers = Object.fromEntries(res.headers.entries())

    // Header fingerprinting
    for (const sig of HEADER_SIGS) {
      const val = headers[sig.header]
      if (!val) continue
      const m = val.match(sig.pattern)
      if (m) add({ name: sig.name, version: sig.versionGroup ? m[sig.versionGroup] : undefined, category: sig.category })
    }

    // Body fingerprinting (first 50KB)
    const body = await res.text()
    const chunk = body.slice(0, 50_000)
    for (const sig of BODY_SIGS) {
      const m = chunk.match(sig.pattern)
      if (m) add({ name: sig.name, version: m[1] ?? sig.version, category: sig.category })
    }

    return NextResponse.json({ url, techs })
  } catch (err: any) {
    return NextResponse.json({ url, techs: [], error: err.message })
  }
}
