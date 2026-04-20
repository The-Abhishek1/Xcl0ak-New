import type { Metadata, Viewport } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import './globals.css'
import { Sidebar }     from '@/components/layout/Sidebar'
import { Topbar }      from '@/components/layout/Topbar'
import { Ticker }      from '@/components/layout/Ticker'
import { MobileNav }   from '@/components/layout/MobileNav'
import { LayoutShell } from '@/components/layout/LayoutShell'

const mono = Space_Mono({ subsets:['latin'], weight:['400','700'], variable:'--font-mono', display:'swap' })
const syne = Syne({ subsets:['latin'], weight:['400','600','700','800'], variable:'--font-sans', display:'swap' })

export const metadata: Metadata = {
  title: { default: 'XCloak — AI Security Platform', template: '%s | XCloak' },
  description: 'XCloak — AI-powered penetration testing, live CVE tracker, exploit database, CTF challenges, and threat intelligence platform.',
  keywords: ['cybersecurity', 'penetration testing', 'CVE', 'exploit', 'CTF', 'threat intelligence'],
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'XCloak — AI Security Platform',
    description: 'AI-powered penetration testing, live CVE tracker, exploit database, and threat intelligence.',
    siteName: 'XCloak',
    type: 'website',
  },
}
export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${syne.variable}`}>
      <body>
        <Topbar />
        <Sidebar />
        <LayoutShell>
          {children}
        </LayoutShell>
        <MobileNav />
        <Ticker />
      </body>
    </html>
  )
}
