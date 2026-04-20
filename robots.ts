import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://xcloak.tech'

  return {
    rules: [
      {
        // Allow Googlebot full access to public pages
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/cve',
          '/exploits',
          '/ctf',
          '/leaderboard',
          '/learn',
          '/news',
          '/pricing',
          '/terms',
          '/privacy',
          '/threat-map',
        ],
        disallow: [
          '/admin',
          '/api/',
          '/dashboard',
          '/scan',
          '/scan-history',
          '/findings',
          '/attack-surface',
          '/schedules',
          '/teams',
          '/audit',
          '/settings',
          '/notifications',
          '/register',
          '/login',
        ],
      },
      {
        // All other bots — same rules
        userAgent: '*',
        allow: [
          '/',
          '/cve',
          '/exploits',
          '/ctf',
          '/leaderboard',
          '/learn',
          '/news',
          '/pricing',
          '/terms',
          '/privacy',
          '/threat-map',
        ],
        disallow: [
          '/admin',
          '/api/',
          '/dashboard',
          '/scan',
          '/scan-history',
          '/findings',
          '/attack-surface',
          '/schedules',
          '/teams',
          '/audit',
          '/settings',
          '/notifications',
          '/register',
          '/login',
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
