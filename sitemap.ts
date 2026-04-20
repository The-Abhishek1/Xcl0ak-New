import { MetadataRoute } from 'next'

// Force static generation — no DB queries during build
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? 'https://xcloak.tech'
  const now  = new Date()

  return [
    {
      url:             base,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
    },
    {
      url:             `${base}/cve`,
      lastModified:    now,
      changeFrequency: 'hourly',
      priority:        0.9,
    },
    {
      url:             `${base}/exploits`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.9,
    },
    {
      url:             `${base}/threat-map`,
      lastModified:    now,
      changeFrequency: 'hourly',
      priority:        0.8,
    },
    {
      url:             `${base}/ctf`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.8,
    },
    {
      url:             `${base}/learn`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${base}/leaderboard`,
      lastModified:    now,
      changeFrequency: 'daily',
      priority:        0.7,
    },
    {
      url:             `${base}/news`,
      lastModified:    now,
      changeFrequency: 'hourly',
      priority:        0.7,
    },
    {
      url:             `${base}/payloads`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.6,
    },
    {
      url:             `${base}/pricing`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${base}/terms`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
    {
      url:             `${base}/privacy`,
      lastModified:    now,
      changeFrequency: 'yearly',
      priority:        0.3,
    },
  ]
}
