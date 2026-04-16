'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

export type ScanEvent = {
  type: string
  process_id: string
  data: Record<string, any>
  timestamp: string
}

export function useScanWS(processId: string | null) {
  const [events, setEvents]   = useState<ScanEvent[]>([])
  const [state, setState]     = useState<'connecting'|'connected'|'disconnected'|'error'>('disconnected')
  const wsRef   = useRef<WebSocket | null>(null)
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const seenRef  = useRef<Set<string>>(new Set())

  const connect = useCallback(() => {
    if (!processId) return
    const ESO = process.env.NEXT_PUBLIC_ESO_WS_URL ?? 'ws://localhost:8000'
    const url = `${ESO}/api/v1/ws/scan/${processId}`
    setState('connecting')
    const ws = new WebSocket(url)
    wsRef.current = ws
    ws.onopen    = () => setState('connected')
    ws.onmessage = (msg) => {
      try {
        const ev: ScanEvent = JSON.parse(msg.data)
        const key = `${ev.timestamp}:${ev.type}`
        if (seenRef.current.has(key)) return
        seenRef.current.add(key)
        setEvents(prev => [...prev, ev])
      } catch {}
    }
    ws.onclose = () => { setState('disconnected'); wsRef.current = null }
    ws.onerror = () => { setState('error'); ws.close(); retryRef.current = setTimeout(connect, 3000) }
  }, [processId])

  useEffect(() => {
    if (processId) { setEvents([]); seenRef.current.clear(); connect() }
    return () => {
      wsRef.current?.close()
      if (retryRef.current) clearTimeout(retryRef.current)
    }
  }, [processId, connect])

  const latest    = events.length > 0 ? events[events.length - 1] : null
  const isTerminal = latest?.type === 'complete' || latest?.type === 'error'
  return { events, latest, state, isTerminal }
}
