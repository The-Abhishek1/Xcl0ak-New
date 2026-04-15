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
  title: { default:'Xcloak', template:'%s — Xcloak' },
  description: 'Cybersecurity Intelligence Platform — Live CVEs, threat intel, exploits.',
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
