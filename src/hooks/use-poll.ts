'use client'
import { useEffect, useRef, useState } from 'react'

export function usePoll<T>(fetcher: () => Promise<T>, intervalMs: number, enabled: boolean) {
  const [data,  setData]  = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!enabled) { if (timer.current) clearInterval(timer.current); return }
    const tick = async () => {
      try { setData(await fetcher()); setError(null) }
      catch (e: any) { setError(e.message) }
    }
    tick()
    timer.current = setInterval(tick, intervalMs)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [enabled, intervalMs])

  return { data, error }
}
