import type { Metadata } from 'next'
import { Space_Mono, Syne } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar }  from '@/components/layout/Topbar'
import { Ticker }  from '@/components/layout/Ticker'

const mono = Space_Mono({ subsets:['latin'], weight:['400','700'], variable:'--font-mono', display:'swap' })
const syne = Syne({ subsets:['latin'], weight:['400','600','700','800'], variable:'--font-sans', display:'swap' })

export const metadata: Metadata = {
  title: { default:'Xcloak', template:'%s — Xcloak' },
  description: 'Cybersecurity Intelligence Platform — Live CVEs, threat intel, exploits.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${syne.variable}`}>
      <body>
        <Topbar />
        {/* Sidebar hidden on mobile */}
        <div className="sidebar-desktop">
          <Sidebar />
        </div>
        {/* main-offset applies margin only when sidebar is visible */}
        <main className="main-offset md:ml-[220px] pt-[52px] pb-[32px] relative z-[1] min-h-screen">
          {children}
        </main>
        <Ticker />
      </body>
    </html>
  )
}
