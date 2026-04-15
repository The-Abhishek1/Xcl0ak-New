'use client'
import { useEffect, useState } from 'react'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768)
    check(); setMounted(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <main style={{
      marginLeft: mounted && isDesktop ? '220px' : '0',
      paddingTop: '52px',
      paddingBottom: mounted && !isDesktop ? '72px' : '40px',
      minHeight: '100vh',
      position: 'relative',
      zIndex: 1,
      transition: 'margin-left 0.15s',
    }}>
      {children}
    </main>
  )
}
