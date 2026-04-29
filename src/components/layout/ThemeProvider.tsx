'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  toggle: () => void
}>({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Read saved preference, default to light
    const saved = localStorage.getItem('xcloak-theme') as Theme | null
    const initial = saved ?? 'light'
    setTheme(initial)
    applyTheme(initial)
    setMounted(true)
  }, [])

  function applyTheme(t: Theme) {
    const html = document.documentElement
    if (t === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    applyTheme(next)
    localStorage.setItem('xcloak-theme', next)
    // Dispatch event so Sidebar/MobileNav can react
    window.dispatchEvent(new CustomEvent('xcloak-theme-change', { detail: next }))
  }

  // Prevent flash — hide until mounted
  if (!mounted) return <>{children}</>

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
