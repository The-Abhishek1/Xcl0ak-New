'use client'
// Globe3D — v3
// Fixes:
//  1. Arc colors: each threat type gets its own distinct color
//  2. Filter: activeLayers prop changes re-render without needing key remount
//  3. Popup: rich worldmonitor-style card with icon, severity bar, coords, source link

import { useEffect, useRef, useState, useCallback } from 'react'

export interface GlobePoint {
  srcLat: number; srcLng: number
  dstLat: number; dstLng: number
  type: string; severity: number; label: string
  sourceUrl?: string
}

export const TYPE_COLOR: Record<string, string> = {
  Ransomware: '#ff3a5c',
  APT:        '#c084fc',
  Phishing:   '#fb923c',
  DDoS:       '#facc15',
  Malware:    '#f87171',
  Scanner:    '#38bdf8',
  Threat:     '#94a3b8',
  RAT:        '#f472b6',
  WORM:       '#fb923c',
}

const TYPE_ICON: Record<string, string> = {
  Ransomware: '🔒', APT: '🎯', Phishing: '🪝', DDoS: '💥',
  Malware: '☣️', Scanner: '🔍', Threat: '⚠️', RAT: '🐀', WORM: '🐛',
}

function hexRGB(hex: string) {
  const h = hex.replace('#', '')
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) }
}
function rgba(hex: string, alpha: number) {
  const { r, g, b } = hexRGB(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

const tc = (t: string) => TYPE_COLOR[t] ?? '#94a3b8'
const DEG = Math.PI / 180

function project(lat: number, lng: number, rotX: number, rotY: number, cx: number, cy: number, R: number): [number,number]|null {
  const phi=lat*DEG, lam=lng*DEG
  const vx=Math.cos(phi)*Math.sin(lam), vy=Math.sin(phi), vz=Math.cos(phi)*Math.cos(lam)
  const cosY=Math.cos(rotY), sinY=Math.sin(rotY)
  const vx1=vx*cosY-vz*sinY, vz1=vx*sinY+vz*cosY
  const cosX=Math.cos(rotX), sinX=Math.sin(rotX)
  const vy2=vy*cosX-vz1*sinX, vz2=vy*sinX+vz1*cosX
  if (vz2<0) return null
  return [cx+vx1*R, cy-vy2*R]
}

function projectRaw(lat: number, lng: number, rotX: number, rotY: number, cx: number, cy: number, effR: number) {
  const phi=lat*DEG, lam=lng*DEG
  const vx=Math.cos(phi)*Math.sin(lam), vy=Math.sin(phi), vz=Math.cos(phi)*Math.cos(lam)
  const cosY=Math.cos(rotY), sinY=Math.sin(rotY)
  const vx1=vx*cosY-vz*sinY, vz1=vx*sinY+vz*cosY
  const cosX=Math.cos(rotX), sinX=Math.sin(rotX)
  const vy2=vy*cosX-vz1*sinX, vz2=vy*sinX+vz1*cosX
  return { pt: [cx+vx1*effR, cy-vy2*effR] as [number,number], vis: vz2>=-0.04 }
}

function greatCircle(lat1: number, lng1: number, lat2: number, lng2: number, steps: number): [number,number][] {
  const p1=[lat1*DEG,lng1*DEG], p2=[lat2*DEG,lng2*DEG]
  const v1=[Math.cos(p1[0])*Math.cos(p1[1]),Math.sin(p1[0]),Math.cos(p1[0])*Math.sin(p1[1])]
  const v2=[Math.cos(p2[0])*Math.cos(p2[1]),Math.sin(p2[0]),Math.cos(p2[0])*Math.sin(p2[1])]
  const dot=Math.min(1,Math.max(-1,v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2]))
  const omega=Math.acos(dot)
  if (omega<0.001) return [[lat1,lng1],[lat2,lng2]]
  const out: [number,number][]=[]
  for (let i=0;i<=steps;i++) {
    const t=i/steps, sa=Math.sin((1-t)*omega)/Math.sin(omega), sb=Math.sin(t*omega)/Math.sin(omega)
    const vx=sa*v1[0]+sb*v2[0], vy=sa*v1[1]+sb*v2[1], vz=sa*v1[2]+sb*v2[2]
    out.push([Math.atan2(vy,Math.sqrt(vx*vx+vz*vz))/DEG, Math.atan2(vz,vx)/DEG])
  }
  return out
}

function drawGeometry(ctx: CanvasRenderingContext2D, geom: any, rotX: number, rotY: number, cx: number, cy: number, R: number, fill: string, stroke: string, lw: number) {
  const polys: number[][][]=geom.type==='Polygon'?geom.coordinates:geom.type==='MultiPolygon'?geom.coordinates.flat():[]
  for (const ring of polys) {
    ctx.beginPath(); let prev=false
    for (const [lng,lat] of ring) {
      const pt=project(lat,lng,rotX,rotY,cx,cy,R)
      if (pt){prev?ctx.lineTo(pt[0],pt[1]):ctx.moveTo(pt[0],pt[1]);prev=true}else prev=false
    }
    ctx.closePath()
    ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.stroke()
  }
}

interface HitRecord { x: number; y: number; r: number; pt: GlobePoint }
interface Props { points: GlobePoint[]; height?: number; activeLayers?: Set<string> }

export function Globe3D({ points, height=420, activeLayers }: Props) {
  const canvasRef=useRef<HTMLCanvasElement>(null)
  const st=useRef({
    rotX:0.18, rotY:0.5, velX:0, velY:0.0028,
    dragging:false, lx:0, ly:0,
    geo:null as any, arcT:0, hits:[] as HitRecord[],
  })
  const [loaded,setLoaded]=useState(false)
  const [popup,setPopup]=useState<{x:number;y:number;pt:GlobePoint}|null>(null)
  const popupRef=useRef<HTMLDivElement>(null)

  const layerKey = activeLayers ? [...activeLayers].sort().join(',') : 'all'

  const visible = (() => {
    const base=points.filter(p=>p&&typeof p.srcLat==='number')
    if (!activeLayers||activeLayers.size===0) return base
    return base.filter(p=>activeLayers.has(p.type))
  })()

  useEffect(()=>{
    const URLS=[
      'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
      'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
    ]
    async function tryLoad(){
      for (const url of URLS){
        try {
          const raw=await (await fetch(url)).json()
          if (raw.type==='Topology') continue
          if (raw.type==='FeatureCollection'&&raw.features){st.current.geo=raw;setLoaded(true);return}
        }catch{}
      }
      setLoaded(true)
    }
    tryLoad()
  },[])

  const draw=useCallback(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const ctx=canvas.getContext('2d'); if(!ctx) return
    const dpr=window.devicePixelRatio||1
    const W=canvas.clientWidth, H=canvas.clientHeight
    canvas.width=W*dpr; canvas.height=H*dpr; ctx.scale(dpr,dpr)
    const s=st.current
    const cx=W/2, cy=H/2, R=Math.min(W,H)*0.44
    const hits: HitRecord[]=[]
    ctx.clearRect(0,0,W,H)

    // Atmosphere
    const halo=ctx.createRadialGradient(cx,cy,R*0.88,cx,cy,R*1.20)
    halo.addColorStop(0,'rgba(0,200,120,0.00)')
    halo.addColorStop(0.55,'rgba(0,220,140,0.06)')
    halo.addColorStop(1,'rgba(0,255,170,0.00)')
    ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,R*1.20,0,Math.PI*2);ctx.fill()

    // Ocean
    const ocean=ctx.createRadialGradient(cx-R*0.2,cy-R*0.25,0,cx,cy,R)
    ocean.addColorStop(0,'#0d2d4a');ocean.addColorStop(0.6,'#081e33');ocean.addColorStop(1,'#040f1c')
    ctx.fillStyle=ocean;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill()

    ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.clip()

    // Grid
    ctx.strokeStyle='rgba(0,180,110,0.10)';ctx.lineWidth=0.5
    for (let lat=-80;lat<=80;lat+=20){
      ctx.beginPath();let f=true
      for (let lng=-180;lng<=180;lng+=2){const p=project(lat,lng,s.rotX,s.rotY,cx,cy,R);if(!p){f=true;continue}f?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);f=false};ctx.stroke()
    }
    for (let lng=-180;lng<180;lng+=20){
      ctx.beginPath();let f=true
      for (let lat=-88;lat<=88;lat+=2){const p=project(lat,lng,s.rotX,s.rotY,cx,cy,R);if(!p){f=true;continue}f?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);f=false};ctx.stroke()
    }

    // Countries
    if (s.geo?.features){
      for (const feat of s.geo.features){
        if (!feat.geometry) continue
        const name=(feat.properties?.NAME??feat.properties?.name??feat.properties?.ADMIN??'').toLowerCase()
        const isThreat=/russia|china|iran|north.korea|dprk/.test(name)
        drawGeometry(ctx,feat.geometry,s.rotX,s.rotY,cx,cy,R,
          isThreat?'rgba(30,110,65,0.88)':'rgba(18,95,56,0.80)',
          isThreat?'rgba(0,255,130,0.75)':'rgba(0,240,130,0.58)',0.65)
      }
    }

    // Equator
    ctx.strokeStyle='rgba(0,255,150,0.22)';ctx.lineWidth=1.2
    ctx.beginPath();let feq=true
    for (let lng=-180;lng<=180;lng++){const p=project(0,lng,s.rotX,s.rotY,cx,cy,R);if(!p){feq=true;continue}feq?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);feq=false};ctx.stroke()

    // ── Threat arcs — each type uses its unique TYPE_COLOR ─────────────────
    s.arcT=(s.arcT+0.006)%1

    for (const pt of visible){
      const color=tc(pt.type)   // ← unique per-type color
      const isCrit=pt.severity>=4
      const STEPS=80
      const gc=greatCircle(pt.srcLat,pt.srcLng,pt.dstLat,pt.dstLng,STEPS)
      let prevPt: [number,number]|null=null, prevVis=false, midPt: [number,number]|null=null

      for (let i=0;i<gc.length;i++){
        const [lat,lng]=gc[i], t=i/(STEPS-1)
        const lift=1+Math.sin(t*Math.PI)*(isCrit?0.14:0.09)
        const {pt:px,vis}=projectRaw(lat,lng,s.rotX,s.rotY,cx,cy,R*lift)
        if (Math.abs(t-0.5)<0.02) midPt=px

        if (vis&&prevPt&&prevVis){
          const tMid=(i-0.5)/STEPS, diff=Math.abs(tMid-s.arcT)
          const inPulse=diff<0.15||(1-diff)<0.15

          // Glow — type color
          ctx.beginPath();ctx.moveTo(prevPt[0],prevPt[1]);ctx.lineTo(px[0],px[1])
          ctx.strokeStyle=rgba(color,0.28);ctx.lineWidth=isCrit?7:5;ctx.stroke()

          // Core — type color
          ctx.beginPath();ctx.moveTo(prevPt[0],prevPt[1]);ctx.lineTo(px[0],px[1])
          if (inPulse){
            const d=1-Math.min(diff,1-diff)/0.15
            ctx.strokeStyle=`rgba(255,255,255,${0.6+d*0.4})`;ctx.lineWidth=isCrit?2.5:1.8
          } else {
            ctx.strokeStyle=rgba(color,0.92);ctx.lineWidth=isCrit?1.8:1.2  // full sat type color
          }
          ctx.stroke()
        }
        prevPt=px;prevVis=vis
      }

      // Source dot + animated ring
      const src=project(pt.srcLat,pt.srcLng,s.rotX,s.rotY,cx,cy,R)
      if (src){
        const pR=s.arcT*(isCrit?22:15), alp=1-s.arcT
        ctx.beginPath();ctx.arc(src[0],src[1],pR,0,Math.PI*2)
        ctx.strokeStyle=rgba(color,alp);ctx.lineWidth=1.5;ctx.stroke()
        const pR2=((s.arcT+0.5)%1)*(isCrit?22:15), alp2=1-(s.arcT+0.5)%1
        ctx.beginPath();ctx.arc(src[0],src[1],pR2,0,Math.PI*2)
        ctx.strokeStyle=rgba(color,alp2*0.6);ctx.lineWidth=1;ctx.stroke()
        const dotR=isCrit?5.5:4
        ctx.beginPath();ctx.arc(src[0],src[1],dotR,0,Math.PI*2);ctx.fillStyle=color;ctx.fill()
        ctx.beginPath();ctx.arc(src[0],src[1],isCrit?2.2:1.5,0,Math.PI*2);ctx.fillStyle='#ffffff';ctx.fill()
        hits.push({x:src[0],y:src[1],r:dotR+8,pt})
      }

      // Destination dot
      const dst=project(pt.dstLat,pt.dstLng,s.rotX,s.rotY,cx,cy,R)
      if (dst){
        ctx.beginPath();ctx.arc(dst[0],dst[1],isCrit?4.5:3,0,Math.PI*2)
        ctx.fillStyle=rgba(color,0.75);ctx.fill()
        ctx.strokeStyle='rgba(255,255,255,0.45)';ctx.lineWidth=1;ctx.stroke()
        hits.push({x:dst[0],y:dst[1],r:10,pt})
      }
      if (midPt) hits.push({x:midPt[0],y:midPt[1],r:12,pt})
    }

    s.hits=hits
    ctx.restore()

    // Rim
    const rim=ctx.createRadialGradient(cx,cy,R*0.82,cx,cy,R)
    rim.addColorStop(0,'rgba(0,255,170,0.00)');rim.addColorStop(0.88,'rgba(0,255,170,0.05)');rim.addColorStop(1,'rgba(0,255,170,0.28)')
    ctx.fillStyle=rim;ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fill()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loaded, layerKey, visible.length])

  useEffect(()=>{
    let id=0
    const loop=()=>{
      const s=st.current
      if (!s.dragging){s.velY+=(0.0028-s.velY)*0.025;s.velX*=0.94;s.rotY+=s.velY;s.rotX+=s.velX;s.rotX=Math.max(-1.2,Math.min(1.2,s.rotX))}
      else{s.velY*=0.88;s.velX*=0.88}
      draw();id=requestAnimationFrame(loop)
    }
    id=requestAnimationFrame(loop)
    return ()=>cancelAnimationFrame(id)
  },[draw])

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const onClick=(e:MouseEvent)=>{
      const rect=canvas.getBoundingClientRect()
      const mx=e.clientX-rect.left, my=e.clientY-rect.top
      let best:HitRecord|null=null, bestDist=Infinity
      for (const h of st.current.hits){const d=Math.hypot(h.x-mx,h.y-my);if(d<h.r&&d<bestDist){best=h;bestDist=d}}
      if (best){
        const x=Math.min(mx+12, canvas.clientWidth-290)
        const y=Math.max(my-10, 8)
        setPopup({x,y,pt:best.pt});st.current.velY=0
      } else setPopup(null)
    }
    canvas.addEventListener('click',onClick)
    return ()=>canvas.removeEventListener('click',onClick)
  },[])

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return
    const s=st.current
    const down=(cx:number,cy:number)=>{s.dragging=true;s.lx=cx;s.ly=cy;canvas.style.cursor='grabbing'}
    const up=()=>{s.dragging=false;canvas.style.cursor='grab'}
    const move=(cx:number,cy:number)=>{
      if (!s.dragging) return
      s.velY=(cx-s.lx)*0.007;s.velX=(cy-s.ly)*0.005
      s.rotY+=s.velY;s.rotX+=s.velX;s.rotX=Math.max(-1.2,Math.min(1.2,s.rotX));s.lx=cx;s.ly=cy
    }
    canvas.style.cursor='grab'
    canvas.addEventListener('mousedown',e=>down(e.clientX,e.clientY))
    canvas.addEventListener('touchstart',e=>down(e.touches[0].clientX,e.touches[0].clientY),{passive:true})
    window.addEventListener('mouseup',up);window.addEventListener('touchend',up)
    window.addEventListener('mousemove',e=>move(e.clientX,e.clientY))
    canvas.addEventListener('touchmove',e=>{e.preventDefault();move(e.touches[0].clientX,e.touches[0].clientY)},{passive:false})
    return ()=>{window.removeEventListener('mouseup',up);window.removeEventListener('touchend',up)}
  },[])

  const popupColor=popup?tc(popup.pt.type):'#00ffaa'
  const popupIcon=popup?(TYPE_ICON[popup.pt.type]??'⚠️'):''
  const sevLabel=(s:number)=>s>=5?'CRITICAL':s>=4?'HIGH':s>=3?'MEDIUM':s>=2?'LOW':'INFO'
  const sevColor=(s:number)=>s>=5?'#ff3a5c':s>=4?'#ff6b35':s>=3?'#facc15':s>=2?'#38bdf8':'#64748b'

  return (
    <div className="relative w-full h-full"
      style={{background:'radial-gradient(ellipse at 50% 50%, #030f1e 0%, #010912 100%)'}}>
      <canvas ref={canvasRef} style={{width:'100%',height:'100%',display:'block'}}/>

      {!loaded&&(
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <div className="w-7 h-7 border-2 border-accent/30 border-t-accent rounded-full animate-spin"/>
            <span className="font-mono text-[11px] text-accent/60">Loading geo data…</span>
          </div>
        </div>
      )}

      {/* ── Rich threat popup ──────────────────────────────────────── */}
      {popup&&(
        <div ref={popupRef} className="absolute z-50 pointer-events-auto"
          style={{left:popup.x,top:popup.y,width:'276px'}}>
          <div className="rounded-2xl overflow-hidden"
            style={{
              background:'rgba(4,8,18,0.97)',
              border:`1px solid ${rgba(popupColor,0.40)}`,
              backdropFilter:'blur(24px)',
              boxShadow:`0 0 40px ${rgba(popupColor,0.12)}, 0 8px 32px rgba(0,0,0,0.65)`,
            }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3"
              style={{borderBottom:`1px solid ${rgba(popupColor,0.18)}`,background:rgba(popupColor,0.07)}}>
              <div className="flex items-center gap-2.5">
                <span style={{fontSize:'18px'}}>{popupIcon}</span>
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-[0.15em]" style={{color:popupColor}}>
                    {popup.pt.type.toUpperCase()}
                  </div>
                  <div className="font-mono text-[9px] text-slate-600 tracking-wider">THREAT EVENT</div>
                </div>
              </div>
              <button onClick={()=>setPopup(null)}
                className="w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer"
                style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.09)',color:'#475569'}}
                onMouseEnter={e=>(e.currentTarget.style.color='#e2e8f0')}
                onMouseLeave={e=>(e.currentTarget.style.color='#475569')}>
                <span style={{fontSize:'10px'}}>✕</span>
              </button>
            </div>

            {/* Severity bar */}
            <div className="px-4 pt-3 pb-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider">Severity</span>
                <span className="font-mono text-[10px] font-bold tracking-wider" style={{color:sevColor(popup.pt.severity)}}>
                  {sevLabel(popup.pt.severity)}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(i=>(
                  <div key={i} className="flex-1 h-1.5 rounded-full"
                    style={{
                      background:i<=popup.pt.severity?sevColor(popup.pt.severity):'rgba(255,255,255,0.07)',
                      boxShadow:i<=popup.pt.severity?`0 0 8px ${rgba(sevColor(popup.pt.severity),0.55)}`:'none',
                      transition:'all 0.2s',
                    }}/>
                ))}
              </div>
            </div>

            {/* Coordinates card */}
            <div className="mx-4 mb-3 rounded-xl overflow-hidden"
              style={{border:'1px solid rgba(255,255,255,0.07)',background:'rgba(255,255,255,0.02)'}}>
              <div className="flex items-center gap-3 px-3 py-2"
                style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full"
                    style={{background:popupColor,boxShadow:`0 0 6px ${popupColor}`}}/>
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider w-10">Origin</span>
                </div>
                <span className="font-mono text-[11px] text-slate-200 tabular-nums">
                  {Math.abs(popup.pt.srcLat).toFixed(2)}°{popup.pt.srcLat>=0?'N':'S'}&nbsp;&nbsp;
                  {Math.abs(popup.pt.srcLng).toFixed(2)}°{popup.pt.srcLng>=0?'E':'W'}
                </span>
              </div>
              <div className="flex justify-center py-0.5">
                <span className="font-mono text-[13px]" style={{color:rgba(popupColor,0.5)}}>↓</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-sm"
                    style={{background:rgba(popupColor,0.5),border:`1px solid ${popupColor}`}}/>
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-wider w-10">Target</span>
                </div>
                <span className="font-mono text-[11px] text-slate-200 tabular-nums">
                  {Math.abs(popup.pt.dstLat).toFixed(2)}°{popup.pt.dstLat>=0?'N':'S'}&nbsp;&nbsp;
                  {Math.abs(popup.pt.dstLng).toFixed(2)}°{popup.pt.dstLng>=0?'E':'W'}
                </span>
              </div>
            </div>

            {/* Details text */}
            {popup.pt.label&&(
              <div className="px-4 pb-3">
                <div className="font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-1.5">Details</div>
                <p className="font-mono text-[10px] text-slate-400 leading-relaxed line-clamp-3">{popup.pt.label}</p>
              </div>
            )}

            {/* Source link */}
            {popup.pt.sourceUrl&&(
              <div className="px-4 pb-3">
                <a href={popup.pt.sourceUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[10px] hover:underline"
                  style={{color:popupColor}}>
                  View source report <span>↗</span>
                </a>
              </div>
            )}

            {/* Bottom accent */}
            <div className="h-px" style={{background:`linear-gradient(90deg,transparent,${popupColor},transparent)`,opacity:0.35}}/>
          </div>
        </div>
      )}
    </div>
  )
}
