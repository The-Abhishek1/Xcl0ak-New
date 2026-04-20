import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'
  const now  = new Date()

  // ── Static public pages ──────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              base,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         1.0,
    },
    {
      url:              `${base}/cve`,
      lastModified:     now,
      changeFrequency:  'hourly',   // CVEs update constantly
      priority:         0.9,
    },
    {
      url:              `${base}/exploits`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.9,
    },
    {
      url:              `${base}/threat-map`,
      lastModified:     now,
      changeFrequency:  'hourly',
      priority:         0.8,
    },
    {
      url:              `${base}/ctf`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.8,
    },
    {
      url:              `${base}/learn`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.8,
    },
    {
      url:              `${base}/leaderboard`,
      lastModified:     now,
      changeFrequency:  'daily',
      priority:         0.7,
    },
    {
      url:              `${base}/news`,
      lastModified:     now,
      changeFrequency:  'hourly',
      priority:         0.7,
    },
    {
      url:              `${base}/pricing`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.6,
    },
    {
      url:              `${base}/terms`,
      lastModified:     now,
      changeFrequency:  'yearly',
      priority:         0.3,
    },
    {
      url:              `${base}/privacy`,
      lastModified:     now,
      changeFrequency:  'yearly',
      priority:         0.3,
    },
  ]

  // ── Dynamic: approved exploits ───────────────────────────────────────────
  let exploitRoutes: MetadataRoute.Sitemap = []
  try {
    const exploits = await prisma.exploit.findMany({
      where:   { status: 'approved' },
      select:  { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      take:    500,
    })
    exploitRoutes = exploits.map(e => ({
      url:             `${base}/exploits/${e.id}`,
      lastModified:    e.updatedAt,
      changeFrequency: 'weekly' as const,
      priority:        0.6,
    }))
  } catch { /* DB not available during static build — skip */ }

  // ── Dynamic: approved learning paths ────────────────────────────────────
  let learnRoutes: MetadataRoute.Sitemap = []
  try {
    const paths = await prisma.learningPath.findMany({
      where:   { status: 'approved' },
      select:  { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      take:    200,
    })
    learnRoutes = paths.map(p => ({
      url:             `${base}/learn/${p.id}`,
      lastModified:    p.updatedAt,
      changeFrequency: 'weekly' as const,
      priority:        0.5,
    }))
  } catch { /* skip */ }

  // ── Dynamic: CVE detail pages ────────────────────────────────────────────
  let cveRoutes: MetadataRoute.Sitemap = []
  try {
    const cves = await prisma.cVECache.findMany({
      select:  { cveId: true, modifiedAt: true },
      orderBy: { cvssScore: 'desc' },
      take:    1000,  // top 1000 by severity
    })
    cveRoutes = cves.map(c => ({
      url:             `${base}/cve/${encodeURIComponent(c.cveId)}`,
      lastModified:    c.modifiedAt,
      changeFrequency: 'weekly' as const,
      priority:        0.5,
    }))
  } catch { /* skip */ }

  return [
    ...staticRoutes,
    ...exploitRoutes,
    ...learnRoutes,
    ...cveRoutes,
  ]
}
