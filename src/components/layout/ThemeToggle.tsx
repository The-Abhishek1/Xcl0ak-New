'use client'
import { useTheme } from '@/components/layout/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           '32px',
        height:          '32px',
        borderRadius:    '8px',
        border:          '1px solid var(--border)',
        background:      'var(--bg-input)',
        cursor:          'pointer',
        fontSize:        '15px',
        transition:      'all 0.15s',
        flexShrink:      0,
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
