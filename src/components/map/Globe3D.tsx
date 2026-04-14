'use client'
import { useEffect, useRef, useState } from 'react'

export interface GlobePoint {
  srcLat: number; srcLng: number
  dstLat: number; dstLng: number
  type: string; severity: number; label: string
  sourceUrl?: string
}

const TYPE_COLOR: Record<string, string> = {
  Ransomware:'#ff3a5c', APT:'#a78bfa', Phishing:'#ff8c42',
  DDoS:'#ffd700', Malware:'#ff3a5c', Scanner:'#00aaff',
  Threat:'#4a7fa5', RAT:'#ff6b9d', WORM:'#ff8c42',
}
function typeColor(t: string): string {
  return TYPE_COLOR[t] ?? '#4a7fa5'
}

// Correct lat/lng → Three.js Vector3 on unit sphere
// Three.js: Y=up, so lat maps to Y, lng maps around Y-axis
function latLng2Vec(lat: number, lng: number, r: number): [number, number, number] {
  const phi   = lat  * (Math.PI / 180)   // latitude  → angle from equator
  const theta = lng  * (Math.PI / 180)   // longitude → angle around Y
  const x =  r * Math.cos(phi) * Math.sin(theta)
  const y =  r * Math.sin(phi)
  const z =  r * Math.cos(phi) * Math.cos(theta)
  return [x, y, z]
}

interface Props {
  points: GlobePoint[]
  height?: number
  onSelect?: (p: GlobePoint | null) => void
}

export function Globe3D({ points, height = 420, onSelect }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{ cleanup: () => void } | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return
    // Cleanup previous instance
    stateRef.current?.cleanup()
    stateRef.current = null
    const container = mountRef.current

    let animId = 0
    let destroyed = false

    import('three').then(THREE => {
      if (destroyed || !container) return

      // ── Scene setup ────────────────────────────────────────────
      const W = container.clientWidth || 800
      const H = height

      const scene    = new THREE.Scene()
      const camera   = new THREE.PerspectiveCamera(40, W / H, 0.01, 100)
      camera.position.set(0, 0, 3.2)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ── Globe texture painted on a canvas ─────────────────────
      const T = 2048, TH = 1024
      const tc  = document.createElement('canvas')
      tc.width  = T; tc.height = TH
      const ctx = tc.getContext('2d')!

      // Deep ocean
      ctx.fillStyle = '#030810'
      ctx.fillRect(0, 0, T, TH)

      // Subtle grid
      ctx.strokeStyle = 'rgba(0,255,170,0.06)'
      ctx.lineWidth   = 1
      for (let lat = -80; lat <= 80; lat += 20) {
        const y = ((90 - lat) / 180) * TH
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(T, y); ctx.stroke()
      }
      for (let lng = -180; lng <= 180; lng += 20) {
        const x = ((lng + 180) / 360) * T
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, TH); ctx.stroke()
      }

      // Land blobs — approximate continent regions
      const lands: Array<{ cx:number; cy:number; rx:number; ry:number; angle?:number }> = [
        // North America
        { cx:0.19, cy:0.33, rx:0.10, ry:0.20 },
        // Central America
        { cx:0.21, cy:0.52, rx:0.03, ry:0.05 },
        // South America
        { cx:0.25, cy:0.70, rx:0.07, ry:0.18 },
        // Europe
        { cx:0.50, cy:0.28, rx:0.05, ry:0.10 },
        // Africa
        { cx:0.51, cy:0.55, rx:0.07, ry:0.18 },
        // Middle East
        { cx:0.57, cy:0.38, rx:0.04, ry:0.06 },
        // Russia/N Asia
        { cx:0.65, cy:0.18, rx:0.18, ry:0.10 },
        // South Asia
        { cx:0.64, cy:0.43, rx:0.06, ry:0.08 },
        // SE Asia
        { cx:0.73, cy:0.50, rx:0.05, ry:0.07 },
        // East Asia
        { cx:0.76, cy:0.32, rx:0.07, ry:0.12 },
        // Australia
        { cx:0.80, cy:0.70, rx:0.07, ry:0.08 },
        // Greenland
        { cx:0.30, cy:0.12, rx:0.05, ry:0.07 },
        // Antarctica hint
        { cx:0.50, cy:0.96, rx:0.30, ry:0.04 },
      ]

      for (const l of lands) {
        const grd = ctx.createRadialGradient(l.cx*T, l.cy*TH, 0, l.cx*T, l.cy*TH, Math.max(l.rx, l.ry)*T*0.9)
        grd.addColorStop(0, 'rgba(0,200,100,0.22)')
        grd.addColorStop(0.5, 'rgba(0,160,80,0.12)')
        grd.addColorStop(1, 'rgba(0,100,50,0)')
        ctx.fillStyle = grd
        ctx.save()
        ctx.translate(l.cx*T, l.cy*TH)
        ctx.scale(l.rx / Math.max(l.rx, l.ry), l.ry / Math.max(l.rx, l.ry))
        ctx.beginPath()
        ctx.arc(0, 0, Math.max(l.rx, l.ry)*T, 0, Math.PI*2)
        ctx.restore()
        ctx.fill()
      }

      const earthTex = new THREE.CanvasTexture(tc)

      // ── Globe sphere ───────────────────────────────────────────
      const R = 1
      const globeGeo = new THREE.SphereGeometry(R, 80, 80)
      const globeMat = new THREE.MeshPhongMaterial({
        map:       earthTex,
        shininess: 10,
        specular:  new THREE.Color(0x002200),
      })
      const globe = new THREE.Mesh(globeGeo, globeMat)
      scene.add(globe)

      // Atmosphere
      const atmGeo = new THREE.SphereGeometry(R * 1.04, 32, 32)
      const atmMat = new THREE.MeshPhongMaterial({
        color: 0x00cc66,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide,
      })
      scene.add(new THREE.Mesh(atmGeo, atmMat))

      // ── Lights ─────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x334455, 3))
      const sun = new THREE.DirectionalLight(0x88ffcc, 1.2)
      sun.position.set(4, 2, 4)
      scene.add(sun)
      const rim = new THREE.DirectionalLight(0x002244, 0.6)
      rim.position.set(-4, -1, -3)
      scene.add(rim)

      // ── Stars ──────────────────────────────────────────────────
      const starCount = 2000
      const starPos   = new Float32Array(starCount * 3)
      for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 30
      const starGeo = new THREE.BufferGeometry()
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
      const starMat = new THREE.PointsMaterial({ color:0xffffff, size:0.012, transparent:true, opacity:0.5 })
      scene.add(new THREE.Points(starGeo, starMat))

      // ── Attack arcs ────────────────────────────────────────────
      const arcGroup = new THREE.Group()
      scene.add(arcGroup)

      // Animated arc progress (each arc draws progressively)
      const arcProgress: number[] = []

      for (const pt of points) {
        const color = new THREE.Color(typeColor(pt.type))
        const [sx,sy,sz] = latLng2Vec(pt.srcLat, pt.srcLng, R)
        const [dx,dy,dz] = latLng2Vec(pt.dstLat, pt.dstLng, R)

        // Mid-point elevated above sphere surface
        const vSrc = new THREE.Vector3(sx,sy,sz)
        const vDst = new THREE.Vector3(dx,dy,dz)
        const vMid = vSrc.clone().add(vDst).normalize().multiplyScalar(R * 1.5)

        const curve = new THREE.QuadraticBezierCurve3(vSrc, vMid, vDst)
        const curvePoints = curve.getPoints(60)

        // Arc line (draw all at once, animate opacity)
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints)
        const lineMat = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.0,
          linewidth: 1,
        })
        const line = new THREE.Line(lineGeo, lineMat)
        arcGroup.add(line)
        arcProgress.push(0)

        // Glow tube (thicker, more transparent)
        const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.006, 4, false)
        const tubeMat = new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0 })
        const tube = new THREE.Mesh(tubeGeo, tubeMat)
        arcGroup.add(tube)

        // Source dot with glow
        const srcDotGeo = new THREE.SphereGeometry(pt.severity >= 4 ? 0.025 : 0.016, 8, 8)
        const srcDotMat = new THREE.MeshBasicMaterial({ color })
        const srcDot = new THREE.Mesh(srcDotGeo, srcDotMat)
        srcDot.position.set(sx, sy, sz)
        arcGroup.add(srcDot)

        // Destination dot (smaller)
        const dstDotGeo = new THREE.SphereGeometry(0.01, 6, 6)
        const dstDot = new THREE.Mesh(dstDotGeo, new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0.5 }))
        dstDot.position.set(dx, dy, dz)
        arcGroup.add(dstDot)
      }

      // Animate arc opacity in — stagger across arcs
      const lineObjects = arcGroup.children.filter(c => c instanceof THREE.Line) as THREE.Line[]
      const tubeObjects = arcGroup.children.filter(c => c instanceof THREE.Mesh && (c.geometry instanceof THREE.TubeGeometry)) as THREE.Mesh[]

      lineObjects.forEach((l, i) => {
        const delay = i * 120
        setTimeout(() => {
          const mat = l.material as THREE.LineBasicMaterial
          let t = 0
          const iv = setInterval(() => {
            t += 0.05
            mat.opacity = Math.min(0.4 + (points[i]?.severity ?? 3) / 5 * 0.5, t)
            if (mat.opacity >= 0.4 + (points[i]?.severity ?? 3) / 5 * 0.5) clearInterval(iv)
          }, 16)
          if (tubeObjects[i]) {
            ;(tubeObjects[i].material as THREE.MeshBasicMaterial).opacity = 0.12
          }
        }, delay)
      })

      // ── Interaction ────────────────────────────────────────────
      let isDragging = false, lastX = 0, lastY = 0
      let rotY = 0.4, rotX = 0.3, velY = 0.003, velX = 0

      const el = renderer.domElement
      el.style.cursor = 'grab'

      const onDown = (x:number, y:number) => { isDragging=true; lastX=x; lastY=y; el.style.cursor='grabbing' }
      const onUp   = () => { isDragging=false; el.style.cursor='grab' }
      const onMove = (x:number, y:number) => {
        if (!isDragging) return
        velY = (x - lastX) * 0.006; velX = (y - lastY) * 0.004
        rotY += velY; rotX += velX
        rotX = Math.max(-1.1, Math.min(1.1, rotX))
        lastX = x; lastY = y
      }

      el.addEventListener('mousedown', e => onDown(e.clientX, e.clientY))
      el.addEventListener('touchstart', e => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive:true })
      window.addEventListener('mouseup',   onUp)
      window.addEventListener('touchend',  onUp)
      window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY))
      el.addEventListener('touchmove', e => { e.preventDefault(); onMove(e.touches[0].clientX, e.touches[0].clientY) }, { passive:false })

      // ── Resize ─────────────────────────────────────────────────
      const onResize = () => {
        const W2 = container.clientWidth || 800
        camera.aspect = W2 / height
        camera.updateProjectionMatrix()
        renderer.setSize(W2, height)
      }
      window.addEventListener('resize', onResize)

      // ── Render loop ────────────────────────────────────────────
      let tick = 0
      const animate = () => {
        if (destroyed) return
        animId = requestAnimationFrame(animate)
        tick++

        if (!isDragging) {
          velY += (0.002 - velY) * 0.03
          velX *= 0.94
          rotY += velY
          rotX += velX
          rotX = Math.max(-1.1, Math.min(1.1, rotX))
        } else {
          velY *= 0.95; velX *= 0.95
        }

        globe.rotation.set(rotX, rotY, 0)
        arcGroup.rotation.set(rotX, rotY, 0)
        renderer.render(scene, camera)
      }
      animate()
      setReady(true)

      stateRef.current = {
        cleanup: () => {
          destroyed = true
          cancelAnimationFrame(animId)
          window.removeEventListener('mouseup', onUp)
          window.removeEventListener('touchend', onUp)
          window.removeEventListener('mousemove', e => onMove(e.clientX, e.clientY))
          window.removeEventListener('resize', onResize)
          renderer.dispose()
          globeGeo.dispose(); globeMat.dispose(); earthTex.dispose()
          starGeo.dispose(); starMat.dispose()
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
      }
    }).catch(err => {
      console.error('[Globe3D] Three.js failed:', err)
      setReady(true)
    })

    return () => {
      destroyed = true
      stateRef.current?.cleanup()
    }
  }, [points, height])

  return (
    <div ref={mountRef} className="w-full relative" style={{ height, background:'#030810' }}>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[12px] animate-pulse" style={{ color:'#00ffaa' }}>
            ⟳ Rendering 3D globe...
          </span>
        </div>
      )}
    </div>
  )
}
