'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { getToken } from '@/lib/eso-auth'

export type ScanEvent = {
  type: string
  process_id: string
  data: Record<string, any>
  timestamp: string
}

// Determine the correct WebSocket URL for current environment
function getWsUrl(processId: string): string {
  const wsEnv = process.env.NEXT_PUBLIC_ESO_WS_URL ?? ''
  
  // If env var is set and points to a real server, use it
  if (wsEnv && !wsEnv.includes('localhost')) {
    return `${wsEnv}/api/v1/ws/scan/${processId}`
  }

  // In production (HTTPS), try to derive WSS from ESO_API_URL
  const esoApi = process.env.NEXT_PUBLIC_ESO_API_URL ?? ''
  if (esoApi && !esoApi.includes('localhost')) {
    const wsBase = esoApi.replace(/^https?/, m => m === 'https' ? 'wss' : 'ws')
    return `${wsBase}/api/v1/ws/scan/${processId}`
  }

  // Local dev fallback
  return `ws://localhost:8000/api/v1/ws/scan/${processId}`
}

// HTTP polling fallback — fetches events when WS is unavailable
async function fetchEvents(processId: string): Promise<ScanEvent[]> {
  try {
    const token = getToken()
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`/api/eso/hybrid/status/${processId}`, { headers })
    if (!res.ok) return []
    const data = await res.json()
    // Convert status response into synthetic events for the terminal
    const events: ScanEvent[] = []
    const ts = new Date().toISOString()
    if (data.tasks) {
      for (const task of data.tasks) {
        if (task.output) {
          events.push({ type: 'task_output', process_id: processId, timestamp: ts, data: { output: task.output, task_name: task.name } })
        }
        if (task.status === 'completed') {
          events.push({ type: 'task_complete', process_id: processId, timestamp: ts, data: { task_name: task.name } })
        }
      }
    }
    if (data.status === 'completed') {
      events.push({ type: 'complete', process_id: processId, timestamp: ts, data: {} })
    }
    return events
  } catch {
    return []
  }
}

export function useScanWS(processId: string | null) {
  const [events,  setEvents]  = useState<ScanEvent[]>([])
  const [state,   setState]   = useState<'connecting'|'connected'|'disconnected'|'error'>('disconnected')
  const wsRef     = useRef<WebSocket | null>(null)
  const retryRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const seenRef   = useRef<Set<string>>(new Set())
  const wsFailRef = useRef(0) // count consecutive WS failures

  const addEvent = useCallback((ev: ScanEvent) => {
    const key = `${ev.timestamp}:${ev.type}:${JSON.stringify(ev.data).slice(0, 50)}`
    if (seenRef.current.has(key)) return
    seenRef.current.add(key)
    setEvents(prev => [...prev, ev])
  }, [])

  // HTTP polling fallback — used when WS fails in production
  const startPollingFallback = useCallback(() => {
    if (!processId || pollRef.current) return
    setState('disconnected')
    pollRef.current = setInterval(async () => {
      const evs = await fetchEvents(processId)
      evs.forEach(addEvent)
    }, 3000)
  }, [processId, addEvent])

  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])

  const connect = useCallback(() => {
    if (!processId) return

    // If WS has failed 3+ times, switch permanently to HTTP polling
    if (wsFailRef.current >= 3) {
      startPollingFallback()
      return
    }

    const url = getWsUrl(processId)
    setState('connecting')

    try {
      const ws = new WebSocket(url)
      wsRef.current = ws

      const timeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close()
        }
      }, 5000) // 5s connection timeout

      ws.onopen = () => {
        clearTimeout(timeout)
        setState('connected')
        wsFailRef.current = 0 // reset failure count on success
        stopPolling() // stop polling if WS connects
      }

      ws.onmessage = (msg) => {
        try {
          const ev: ScanEvent = JSON.parse(msg.data)
          addEvent(ev)
        } catch {}
      }

      ws.onclose = () => {
        clearTimeout(timeout)
        setState('disconnected')
        wsRef.current = null
      }

      ws.onerror = () => {
        clearTimeout(timeout)
        wsFailRef.current++
        setState('error')
        ws.close()

        if (wsFailRef.current >= 3) {
          // WS consistently failing — switch to HTTP polling
          startPollingFallback()
        } else {
          // Retry WS after delay
          retryRef.current = setTimeout(connect, 3000)
        }
      }
    } catch {
      // WebSocket constructor failed (bad URL, etc)
      wsFailRef.current++
      startPollingFallback()
    }
  }, [processId, addEvent, startPollingFallback, stopPolling])

  useEffect(() => {
    if (!processId) return
    setEvents([])
    seenRef.current.clear()
    wsFailRef.current = 0
    connect()

    return () => {
      wsRef.current?.close()
      if (retryRef.current) clearTimeout(retryRef.current)
      stopPolling()
    }
  }, [processId, connect, stopPolling])

  const latest     = events.length > 0 ? events[events.length - 1] : null
  const isTerminal = latest?.type === 'complete' || latest?.type === 'error'
  return { events, latest, state, isTerminal }
}
