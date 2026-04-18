'use client'
// src/components/map/Globe3D.tsx
// World-Monitor-style 3D globe — Canvas2D + orthographic projection
// Real country borders from naturalearth GeoJSON, animated threat arcs

import { useEffect, useRef, useState, useCallback } from 'react'

export interface GlobePoint {
  srcLat: number; srcLng: number
  dstLat: number; dstLng: number
  type: string; severity: number; label: string
  sourceUrl?: string
}

export const TYPE_COLOR: Record<string, string> = {
  Ransomware: '#ff3a5c', APT: '#c084fc', Phishing: '#fb923c',
  DDoS: '#facc15', Malware: '#f87171', Scanner: '#38bdf8',
  Threat: '#94a3b8', RAT: '#f472b6', WORM: '#fb923c',
}
const tc = (t: string) => TYPE_COLOR[t] ?? '#94a3b8'
const DEG = Math.PI / 180

// ── Project lat/lng → canvas [x,y] with rotation ──────────────────────────
function project(
  lat: number, lng: number,
  rotX: number, rotY: number,
  cx: number, cy: number, R: number
): [number, number] | null {
  const phi = lat * DEG, lam = lng * DEG
  let vx = Math.cos(phi) * Math.sin(lam)
  let vy = Math.sin(phi)
  let vz = Math.cos(phi) * Math.cos(lam)

  // Rotate Y (spin)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
  const vx1 = vx * cosY - vz * sinY
  const vz1 = vx * sinY + vz * cosY

  // Rotate X (tilt)
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const vy2 = vy * cosX - vz1 * sinX
  const vz2 = vy * sinX + vz1 * cosX

  if (vz2 < 0) return null  // back of globe
  return [cx + vx1 * R, cy - vy2 * R]
}

// ── Same but returns raw components (for lifted arcs) ─────────────────────
function projectRaw(
  lat: number, lng: number,
  rotX: number, rotY: number,
  cx: number, cy: number, effR: number
): { pt: [number, number]; vis: boolean } {
  const phi = lat * DEG, lam = lng * DEG
  let vx = Math.cos(phi) * Math.sin(lam)
  let vy = Math.sin(phi)
  let vz = Math.cos(phi) * Math.cos(lam)
  const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
  const vx1 = vx * cosY - vz * sinY
  const vz1 = vx * sinY + vz * cosY
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
  const vy2 = vy * cosX - vz1 * sinX
  const vz2 = vy * sinX + vz1 * cosX
  return { pt: [cx + vx1 * effR, cy - vy2 * effR], vis: vz2 >= -0.04 }
}

// ── Slerp great-circle path ─────────────────────────────────────────────────
function greatCircle(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  steps: number
): Array<[number, number]> {
  const p1 = [lat1 * DEG, lng1 * DEG]
  const p2 = [lat2 * DEG, lng2 * DEG]
  const v1 = [Math.cos(p1[0]) * Math.cos(p1[1]), Math.sin(p1[0]), Math.cos(p1[0]) * Math.sin(p1[1])]
  const v2 = [Math.cos(p2[0]) * Math.cos(p2[1]), Math.sin(p2[0]), Math.cos(p2[0]) * Math.sin(p2[1])]
  const dot = Math.min(1, Math.max(-1, v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2]))
  const omega = Math.acos(dot)
  if (omega < 0.001) return [[lat1, lng1], [lat2, lng2]]
  const out: Array<[number, number]> = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const sa = Math.sin((1 - t) * omega) / Math.sin(omega)
    const sb = Math.sin(t * omega) / Math.sin(omega)
    const vx = sa * v1[0] + sb * v2[0]
    const vy = sa * v1[1] + sb * v2[1]
    const vz = sa * v1[2] + sb * v2[2]
    const lat = Math.atan2(vy, Math.sqrt(vx*vx + vz*vz)) / DEG
    const lng = Math.atan2(vz, vx) / DEG
    out.push([lat, lng])
  }
  return out
}

// ── Draw one GeoJSON geometry onto the globe ─────────────────────────────────
function drawGeometry(
  ctx: CanvasRenderingContext2D,
  geom: any,
  rotX: number, rotY: number,
  cx: number, cy: number, R: number,
  fill: string, stroke: string, lw: number
) {
  const polys: number[][][] =
    geom.type === 'Polygon'      ? geom.coordinates :
    geom.type === 'MultiPolygon' ? geom.coordinates.flat() : []

  for (const ring of polys) {
    ctx.beginPath()
    let prevVis = false
    for (let i = 0; i < ring.length; i++) {
      const [lng, lat] = ring[i]
      const pt = project(lat, lng, rotX, rotY, cx, cy, R)
      if (pt) {
        if (!prevVis) ctx.moveTo(pt[0], pt[1])
        else          ctx.lineTo(pt[0], pt[1])
        prevVis = true
      } else {
        prevVis = false
      }
    }
    ctx.closePath()
    ctx.fillStyle = fill; ctx.fill()
    ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke()
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props { points: GlobePoint[]; height?: number; activeLayers?: Set<string> }

export function Globe3D({ points, height = 420, activeLayers }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const st        = useRef({
    rotX: 0.18, rotY: 0.5, velX: 0, velY: 0.0028,
    dragging: false, lx: 0, ly: 0,
    geo: null as any,
    arcT: 0,
  })
  const [loaded, setLoaded] = useState(false)

  const visible = (activeLayers?.size ? points.filter(p => activeLayers.has(p.type)) : points)
    .filter(p => p && typeof p.srcLat === 'number')

  // ── Fetch real country GeoJSON ─────────────────────────────────────────────
  useEffect(() => {
    // ne_110m = naturalearth 110m resolution — small file, exact country borders
    const URLS = [
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
    ]

    async function tryLoad() {
      for (const url of URLS) {
        try {
          const r   = await fetch(url)
          const raw = await r.json()

          // world-atlas returns TopoJSON — we need GeoJSON
          if (raw.type === 'Topology' && raw.objects) {
            // Inline TopoJSON decode (no library needed for simple case)
            // Fall through to next URL to get GeoJSON directly
            continue
          }

          // Validate it looks like GeoJSON FeatureCollection
          if (raw.type === 'FeatureCollection' && Array.isArray(raw.features)) {
            st.current.geo = raw
            setLoaded(true)
            return
          }
        } catch { /* try next */ }
      }
      // Even if all URLs fail, mark loaded so globe renders without countries
      setLoaded(true)
    }

    tryLoad()
  }, [])

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const W   = canvas.clientWidth
    const H   = canvas.clientHeight
    canvas.width  = W * dpr
    canvas.height = H * dpr
    ctx.scale(dpr, dpr)

    const s  = st.current
    const cx = W / 2, cy = H / 2
    const R  = Math.min(W, H) * 0.44

    ctx.clearRect(0, 0, W, H)

    // ── Atmosphere halo ──────────────────────────────────────────────────────
    const halo = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.20)
    halo.addColorStop(0,    'rgba(0,200,120,0.00)')
    halo.addColorStop(0.55, 'rgba(0,220,140,0.06)')
    halo.addColorStop(1,    'rgba(0,255,170,0.00)')
    ctx.fillStyle = halo
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.20, 0, Math.PI*2); ctx.fill()

    // ── Ocean ────────────────────────────────────────────────────────────────
    const ocean = ctx.createRadialGradient(cx - R*0.2, cy - R*0.25, 0, cx, cy, R)
    ocean.addColorStop(0,   '#0d2d4a')
    ocean.addColorStop(0.6, '#081e33')
    ocean.addColorStop(1,   '#040f1c')
    ctx.fillStyle = ocean
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill()

    // ── Clip to globe ────────────────────────────────────────────────────────
    ctx.save()
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.clip()

    // ── Grid lines ───────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,180,110,0.10)'; ctx.lineWidth = 0.5
    for (let lat = -80; lat <= 80; lat += 20) {
      ctx.beginPath(); let f = true
      for (let lng = -180; lng <= 180; lng += 2) {
        const p = project(lat, lng, s.rotX, s.rotY, cx, cy, R)
        if (!p) { f = true; continue }
        f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); f = false
      }
      ctx.stroke()
    }
    for (let lng = -180; lng < 180; lng += 20) {
      ctx.beginPath(); let f = true
      for (let lat = -88; lat <= 88; lat += 2) {
        const p = project(lat, lng, s.rotX, s.rotY, cx, cy, R)
        if (!p) { f = true; continue }
        f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); f = false
      }
      ctx.stroke()
    }

    // ── Countries ────────────────────────────────────────────────────────────
    if (s.geo?.features) {
      for (const feat of s.geo.features) {
        if (!feat.geometry) continue
        const name: string = (feat.properties?.NAME ?? feat.properties?.name ?? feat.properties?.ADMIN ?? '').toLowerCase()

        // Threat-origin countries slightly brighter
        const isThreat = /russia|china|iran|north.korea|dprk/.test(name)
        const isWest   = /united states|uk|united kingdom|germany|france|japan|australia|canada/.test(name)

        const fill   = isThreat ? 'rgba(30,110,65,0.88)' : isWest ? 'rgba(14,88,52,0.82)' : 'rgba(18,95,56,0.80)'
        const stroke = isThreat ? 'rgba(0,255,130,0.75)' : 'rgba(0,240,130,0.58)'

        drawGeometry(ctx, feat.geometry, s.rotX, s.rotY, cx, cy, R, fill, stroke, 0.65)
      }
    }

    // ── Equator line ─────────────────────────────────────────────────────────
    ctx.strokeStyle = 'rgba(0,255,150,0.22)'; ctx.lineWidth = 1.2
    ctx.beginPath(); let feq = true
    for (let lng = -180; lng <= 180; lng += 1) {
      const p = project(0, lng, s.rotX, s.rotY, cx, cy, R)
      if (!p) { feq = true; continue }
      feq ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]); feq = false
    }
    ctx.stroke()

    // ── Threat arcs ──────────────────────────────────────────────────────────
    s.arcT = (s.arcT + 0.006) % 1

    for (const pt of visible) {
      const color  = tc(pt.type)
      const isCrit = pt.severity >= 4
      const STEPS  = 80
      const gc     = greatCircle(pt.srcLat, pt.srcLng, pt.dstLat, pt.dstLng, STEPS)

      // Draw arc with arc-lift (arcs curve above the surface)
      let prevPt: [number,number] | null = null
      let prevVis = false

      for (let i = 0; i < gc.length; i++) {
        const [lat, lng] = gc[i]
        const t    = i / (STEPS - 1)
        const lift = 1 + Math.sin(t * Math.PI) * (isCrit ? 0.14 : 0.09)
        const { pt: px, vis } = projectRaw(lat, lng, s.rotX, s.rotY, cx, cy, R * lift)

        if (vis && prevPt && prevVis) {
          const tMid   = (i - 0.5) / STEPS
          const diff   = Math.abs(tMid - s.arcT)
          const inPulse = diff < 0.15 || (1 - diff) < 0.15

          // Glow
          ctx.beginPath(); ctx.moveTo(prevPt[0], prevPt[1]); ctx.lineTo(px[0], px[1])
          ctx.strokeStyle = color + '55'
          ctx.lineWidth   = isCrit ? 6 : 4
          ctx.stroke()

          // Core line
          ctx.beginPath(); ctx.moveTo(prevPt[0], prevPt[1]); ctx.lineTo(px[0], px[1])
          if (inPulse) {
            const d = 1 - Math.min(diff, 1 - diff) / 0.15
            ctx.strokeStyle = `rgba(255,255,255,${0.55 + d * 0.45})`
            ctx.lineWidth   = isCrit ? 2.8 : 2.0
          } else {
            ctx.strokeStyle = color + 'dd'
            ctx.lineWidth   = isCrit ? 1.8 : 1.2
          }
          ctx.stroke()
        }

        prevPt  = px; prevVis = vis
      }

      // ── Source pulse ────────────────────────────────────────────────────────
      const src = project(pt.srcLat, pt.srcLng, s.rotX, s.rotY, cx, cy, R)
      if (src) {
        const pR  = s.arcT * (isCrit ? 20 : 14)
        const alp = Math.round((1 - s.arcT) * 180).toString(16).padStart(2,'0')
        ctx.beginPath(); ctx.arc(src[0], src[1], pR, 0, Math.PI*2)
        ctx.strokeStyle = color + alp; ctx.lineWidth = 1.5; ctx.stroke()

        // Second ring offset by 0.5
        const pR2  = ((s.arcT + 0.5) % 1) * (isCrit ? 20 : 14)
        const alp2 = Math.round((1 - (s.arcT + 0.5) % 1) * 120).toString(16).padStart(2,'0')
        ctx.beginPath(); ctx.arc(src[0], src[1], pR2, 0, Math.PI*2)
        ctx.strokeStyle = color + alp2; ctx.lineWidth = 1; ctx.stroke()

        // Solid dot
        ctx.beginPath(); ctx.arc(src[0], src[1], isCrit ? 5.5 : 4, 0, Math.PI*2)
        ctx.fillStyle = color; ctx.fill()
        ctx.beginPath(); ctx.arc(src[0], src[1], isCrit ? 2.2 : 1.6, 0, Math.PI*2)
        ctx.fillStyle = '#ffffff'; ctx.fill()
      }

      // ── Destination marker ──────────────────────────────────────────────────
      const dst = project(pt.dstLat, pt.dstLng, s.rotX, s.rotY, cx, cy, R)
      if (dst) {
        ctx.beginPath(); ctx.arc(dst[0], dst[1], isCrit ? 4.5 : 3, 0, Math.PI*2)
        ctx.fillStyle   = color + 'cc'; ctx.fill()
        ctx.strokeStyle = '#ffffffaa'; ctx.lineWidth = 1; ctx.stroke()
        // Inner white
        ctx.beginPath(); ctx.arc(dst[0], dst[1], 1.2, 0, Math.PI*2)
        ctx.fillStyle = '#ffffff99'; ctx.fill()
      }
    }

    ctx.restore() // end globe clip

    // ── Rim highlight ────────────────────────────────────────────────────────
    const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R)
    rim.addColorStop(0,    'rgba(0,255,170,0.00)')
    rim.addColorStop(0.88, 'rgba(0,255,170,0.05)')
    rim.addColorStop(1,    'rgba(0,255,170,0.30)')
    ctx.fillStyle = rim
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill()

    // Specular glint
    const spec = ctx.createRadialGradient(cx - R*0.32, cy - R*0.32, 0, cx - R*0.32, cy - R*0.32, R*0.5)
    spec.addColorStop(0,   'rgba(200,255,230,0.10)')
    spec.addColorStop(0.6, 'rgba(100,255,180,0.03)')
    spec.addColorStop(1,   'rgba(0,0,0,0.00)')
    ctx.fillStyle = spec
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill()
  }, [loaded, visible])

  // ── Render loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    let id = 0
    const loop = () => {
      const s = st.current
      if (!s.dragging) {
        s.velY += (0.0028 - s.velY) * 0.025
        s.velX *= 0.94
        s.rotY += s.velY
        s.rotX += s.velX
        s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX))
      } else {
        s.velY *= 0.88; s.velX *= 0.88
      }
      draw()
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [draw])

  // ── Mouse / touch ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const s = st.current

    const down  = (cx: number, cy: number) => { s.dragging = true; s.lx = cx; s.ly = cy; canvas.style.cursor = 'grabbing' }
    const up    = () => { s.dragging = false; canvas.style.cursor = 'grab' }
    const move  = (cx: number, cy: number) => {
      if (!s.dragging) return
      s.velY = (cx - s.lx) * 0.007; s.velX = (cy - s.ly) * 0.005
      s.rotY += s.velY; s.rotX += s.velX
      s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX)); s.lx = cx; s.ly = cy
    }

    canvas.style.cursor = 'grab'
    canvas.addEventListener('mousedown',  e => down(e.clientX, e.clientY))
    canvas.addEventListener('touchstart', e => down(e.touches[0].clientX, e.touches[0].clientY), { passive: true })
    window.addEventListener('mouseup',  up)
    window.addEventListener('touchend', up)
    window.addEventListener('mousemove', e => move(e.clientX, e.clientY))
    canvas.addEventListener('touchmove', e => { e.preventDefault(); move(e.touches[0].clientX, e.touches[0].clientY) }, { passive: false })

    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up) }
  }, [])

  return (
    <div className="relative w-full h-full"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #030f1e 0%, #010912 100%)' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="font-mono text-[11px] text-accent/60">Loading country data...</span>
          </div>
        </div>
      )}
    </div>
  )
}
