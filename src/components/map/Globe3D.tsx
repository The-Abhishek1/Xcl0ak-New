'use client'
import { useEffect, useRef, useState } from 'react'

export interface GlobePoint {
  srcLat:number; srcLng:number; dstLat:number; dstLng:number
  type:string; severity:number; label:string; sourceUrl?:string
}

export const TYPE_COLOR: Record<string,string> = {
  Ransomware:'#ff3a5c', APT:'#a78bfa', Phishing:'#ff8c42',
  DDoS:'#ffd700', Malware:'#ff3a5c', Scanner:'#00aaff',
  Threat:'#4a7fa5', RAT:'#ff6b9d', WORM:'#ff8c42',
}
const tc = (t:string) => TYPE_COLOR[t] ?? '#4a7fa5'

function ll2v(lat:number,lng:number,r:number):[number,number,number] {
  const phi = lat*(Math.PI/180), theta = lng*(Math.PI/180)
  return [r*Math.cos(phi)*Math.sin(theta), r*Math.sin(phi), r*Math.cos(phi)*Math.cos(theta)]
}

// Draw a much more accurate world map using polygon data
function drawEarth(ctx: CanvasRenderingContext2D, W: number, H: number) {
  // Background ocean
  ctx.fillStyle = '#04090f'
  ctx.fillRect(0,0,W,H)

  // Grid lines
  ctx.strokeStyle = 'rgba(0,255,170,0.07)'; ctx.lineWidth = 0.5
  for (let la=-80;la<=80;la+=20) {
    const y=((90-la)/180)*H; ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke()
  }
  for (let lo=-180;lo<=180;lo+=20) {
    const x=((lo+180)/360)*W; ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke()
  }

  // fn: draw land polygon from [lng,lat] pairs
  function land(coords: [number,number][], fill='rgba(0,180,90,0.28)', stroke='rgba(0,255,140,0.35)') {
    if (!coords.length) return
    ctx.beginPath()
    coords.forEach(([lo,la],i) => {
      const x=((lo+180)/360)*W, y=((90-la)/180)*H
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
    })
    ctx.closePath()
    ctx.fillStyle=fill; ctx.fill()
    ctx.strokeStyle=stroke; ctx.lineWidth=0.8; ctx.stroke()
  }

  // Simplified but recognisable continent polygons
  // North America
  land([[-168,72],[-140,72],[-95,75],[-82,72],[-62,45],[-52,46],[-55,36],[-80,25],[-87,15],[-83,8],[-75,8],[-76,18],[-72,19],[-72,18],[-80,10],[-83,8],[-90,14],[-92,14],[-97,20],[-105,22],[-110,23],[-118,30],[-120,34],[-125,48],[-124,60],[-140,60],[-141,68],[-168,72]])
  // South America
  land([[-80,10],[-76,8],[-62,8],[-50,5],[-35,-5],[-35,-10],[-38,-14],[-40,-22],[-45,-24],[-48,-28],[-52,-33],[-58,-38],[-62,-42],[-65,-46],[-68,-55],[-68,-58],[-72,-50],[-75,-40],[-75,-30],[-75,-20],[-80,0],[-80,10]])
  // Europe
  land([[0,50],[10,55],[20,60],[30,60],[28,70],[20,72],[10,62],[0,58],[-5,56],[-10,52],[-8,38],[0,36],[5,36],[8,38],[10,45],[8,46],[10,50],[15,50],[18,55],[20,55],[25,52],[30,50],[32,45],[28,40],[22,38],[18,40],[15,38],[12,44],[8,46],[5,45],[0,50]])
  // Africa
  land([[-5,36],[5,36],[10,37],[20,38],[30,32],[32,30],[36,22],[42,12],[44,12],[50,12],[44,10],[42,12],[36,12],[32,5],[30,0],[32,-5],[35,-12],[32,-22],[28,-34],[18,-34],[15,-22],[10,-5],[5,5],[0,5],[-5,5],[-10,8],[-15,10],[-18,15],[-17,22],[-14,28],[-8,32],[-5,36]])
  // Asia (simplified West to East)
  land([[30,72],[50,72],[60,70],[70,68],[80,72],[90,72],[100,68],[110,70],[120,70],[130,65],[140,60],[142,48],[140,36],[130,32],[120,22],[108,20],[100,6],[100,0],[105,-5],[110,-8],[115,-8],[120,15],[115,22],[110,20],[108,20],[100,6],[90,8],[80,20],[72,22],[62,22],[56,25],[50,30],[44,38],[36,46],[30,50],[28,40],[32,32],[36,22],[42,12],[50,14],[56,22],[60,22],[62,25],[70,22],[72,25],[78,30],[80,38],[78,44],[70,42],[60,46],[50,50],[44,55],[40,60],[30,60],[20,60],[10,55],[0,50],[10,45],[20,42],[30,45],[38,48],[46,46],[50,50],[60,46],[70,42],[80,38],[90,50],[100,56],[110,52],[120,56],[130,50],[138,46],[142,46],[148,50],[152,56],[158,60],[160,68],[155,70],[140,62],[130,65],[120,70],[110,70],[100,68],[90,72],[80,72],[70,68],[60,70],[50,72],[40,72],[30,72]])
  // Australia
  land([[114,-22],[118,-20],[126,-14],[132,-12],[136,-12],[140,-16],[142,-10],[144,-14],[148,-18],[152,-24],[152,-28],[150,-34],[144,-38],[138,-36],[132,-32],[126,-34],[114,-26],[114,-22]])
  // Greenland
  land([[-52,60],[-42,56],[-22,60],[-20,70],[-22,80],[-40,84],[-58,82],[-68,76],[-58,70],[-52,62],[-52,60]])
  // Japan (simplified)
  land([[130,31],[132,33],[134,34],[136,36],[138,37],[140,40],[142,44],[144,44],[142,42],[140,38],[140,36],[138,34],[136,34],[130,31]])
  // UK
  land([[-6,50],[0,50],[2,51],[2,53],[0,58],[-4,58],[-6,56],[-4,54],[-4,52],[-6,50]])
  // Indonesia (Sumatra+Java rough)
  land([[96,6],[100,4],[104,1],[106,-4],[108,-8],[110,-8],[112,-6],[110,-2],[108,2],[104,3],[100,4],[96,6]])
  // New Zealand (North)
  land([[173,-41],[175,-38],[176,-36],[174,-34],[172,-36],[170,-40],[173,-41]])
  // Antarctica hint
  land([[-180,-70],[-120,-68],[-60,-68],[0,-70],[60,-68],[120,-66],[180,-70],[180,-90],[-180,-90],[-180,-70]])
}

interface Props { points:GlobePoint[]; height?:number; activeLayers?:Set<string> }

export function Globe3D({points, height=420, activeLayers}:Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const cleanRef = useRef<(()=>void)|null>(null)
  const [ready, setReady] = useState(false)

  const visible = activeLayers&&activeLayers.size>0
    ? points.filter(p=>activeLayers.has(p.type))
    : points

  useEffect(()=>{
    cleanRef.current?.(); cleanRef.current=null
    const container=mountRef.current; if(!container)return
    let destroyed=false, animId=0

    import('three').then(THREE=>{
      if(destroyed||!container)return
      const cW=container.clientWidth||800
      const cH=container.clientHeight||height

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(40,cW/cH,0.01,100)
      camera.position.set(0,0,3.2)

      const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})
      renderer.setSize(cW,cH)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
      renderer.setClearColor(0x000000,0)
      container.appendChild(renderer.domElement)

      // Earth texture from canvas
      const TW=4096,TH=2048
      const cv=document.createElement('canvas'); cv.width=TW; cv.height=TH
      const ctx=cv.getContext('2d')!
      drawEarth(ctx,TW,TH)

      // Subtle specular highlight
      const radGrd = ctx.createRadialGradient(TW*0.65,TH*0.35,0,TW*0.65,TH*0.35,TW*0.5)
      radGrd.addColorStop(0,'rgba(0,255,170,0.04)')
      radGrd.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=radGrd; ctx.fillRect(0,0,TW,TH)

      const earthTex = new THREE.CanvasTexture(cv)
      earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy()

      const R=1
      const globe=new THREE.Mesh(
        new THREE.SphereGeometry(R,96,96),
        new THREE.MeshPhongMaterial({
          map:earthTex, shininess:20,
          specular:new THREE.Color(0x001a06),
          emissive:new THREE.Color(0x001408), emissiveIntensity:0.15,
        })
      )
      scene.add(globe)

      // Atmosphere glow
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(R*1.05,32,32),
        new THREE.MeshPhongMaterial({color:0x00cc66,transparent:true,opacity:0.06,side:THREE.BackSide})
      ))
      // Inner atmosphere
      scene.add(new THREE.Mesh(
        new THREE.SphereGeometry(R*1.02,32,32),
        new THREE.MeshPhongMaterial({color:0x002200,transparent:true,opacity:0.08,side:THREE.FrontSide})
      ))

      // Lights
      scene.add(new THREE.AmbientLight(0x203040,3.5))
      const sun=new THREE.DirectionalLight(0xaaffcc,1.4); sun.position.set(5,3,5); scene.add(sun)
      const fill=new THREE.DirectionalLight(0x002244,0.5); fill.position.set(-5,-2,-3); scene.add(fill)

      // Stars
      const sp=new Float32Array(3000*3); for(let i=0;i<3000*3;i++) sp[i]=(Math.random()-0.5)*30
      const sg=new THREE.BufferGeometry(); sg.setAttribute('position',new THREE.BufferAttribute(sp,3))
      scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:0.012,transparent:true,opacity:0.55})))

      // Attack arcs
      const arcGroup=new THREE.Group(); scene.add(arcGroup)
      visible.forEach(pt=>{
        const color=new THREE.Color(tc(pt.type))
        const [sx,sy,sz]=ll2v(pt.srcLat,pt.srcLng,R)
        const [dx,dy,dz]=ll2v(pt.dstLat,pt.dstLng,R)
        const vS=new THREE.Vector3(sx,sy,sz), vD=new THREE.Vector3(dx,dy,dz)
        const vM=vS.clone().add(vD).normalize().multiplyScalar(R*1.55)
        const curve=new THREE.QuadraticBezierCurve3(vS,vM,vD)
        const op=0.35+(pt.severity/5)*0.55

        // Glow tube
        arcGroup.add(new THREE.Mesh(
          new THREE.TubeGeometry(curve,40,0.005,4,false),
          new THREE.MeshBasicMaterial({color,transparent:true,opacity:op*0.2})
        ))
        // Line
        arcGroup.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)),
          new THREE.LineBasicMaterial({color,transparent:true,opacity:op})
        ))
        // Src dot
        const [sx2,sy2,sz2]=ll2v(pt.srcLat,pt.srcLng,R+0.015)
        const dot=new THREE.Mesh(
          new THREE.SphereGeometry(pt.severity>=4?0.028:0.018,8,8),
          new THREE.MeshBasicMaterial({color})
        ); dot.position.set(sx2,sy2,sz2); arcGroup.add(dot)
        // Dst dot
        const [dx2,dy2,dz2]=ll2v(pt.dstLat,pt.dstLng,R+0.008)
        const dd=new THREE.Mesh(
          new THREE.SphereGeometry(0.01,6,6),
          new THREE.MeshBasicMaterial({color,transparent:true,opacity:0.6})
        ); dd.position.set(dx2,dy2,dz2); arcGroup.add(dd)
      })

      // Drag interaction
      let dragging=false,lx=0,ly=0,rotY=0.6,rotX=0.15,velY=0.0025,velX=0
      const el=renderer.domElement; el.style.cursor='grab'
      const down=(x:number,y:number)=>{dragging=true;lx=x;ly=y;el.style.cursor='grabbing'}
      const up=()=>{dragging=false;el.style.cursor='grab'}
      const move=(x:number,y:number)=>{
        if(!dragging)return
        velY=(x-lx)*0.006; velX=(y-ly)*0.004
        rotY+=velY; rotX+=velX; rotX=Math.max(-1.1,Math.min(1.1,rotX)); lx=x; ly=y
      }
      el.addEventListener('mousedown',e=>down(e.clientX,e.clientY))
      el.addEventListener('touchstart',e=>down(e.touches[0].clientX,e.touches[0].clientY),{passive:true})
      window.addEventListener('mouseup',up); window.addEventListener('touchend',up)
      window.addEventListener('mousemove',e=>move(e.clientX,e.clientY))
      el.addEventListener('touchmove',e=>{e.preventDefault();move(e.touches[0].clientX,e.touches[0].clientY)},{passive:false})

      const onResize=()=>{
        const nW=container.clientWidth||800, nH=container.clientHeight||height
        camera.aspect=nW/nH; camera.updateProjectionMatrix(); renderer.setSize(nW,nH)
      }
      window.addEventListener('resize',onResize)

      const animate=()=>{
        if(destroyed)return; animId=requestAnimationFrame(animate)
        if(!dragging){velY+=(0.0022-velY)*0.025;velX*=0.92;rotY+=velY;rotX+=velX;rotX=Math.max(-1.1,Math.min(1.1,rotX))}
        else{velY*=0.9;velX*=0.9}
        globe.rotation.set(rotX,rotY,0); arcGroup.rotation.set(rotX,rotY,0)
        renderer.render(scene,camera)
      }
      animate(); setReady(true)

      cleanRef.current=()=>{
        destroyed=true; cancelAnimationFrame(animId)
        window.removeEventListener('mouseup',up); window.removeEventListener('touchend',up)
        window.removeEventListener('resize',onResize)
        renderer.dispose(); earthTex.dispose()
        if(container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      }
    }).catch(()=>setReady(true))

    return()=>{ destroyed=true; cleanRef.current?.() }
  },[visible.length, height])

  return (
    <div ref={mountRef} className="w-full h-full relative" style={{background:'#020608'}}>
      {!ready&&(
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[12px] animate-pulse" style={{color:'#00ffaa'}}>
            ⟳ Rendering 3D globe...
          </span>
        </div>
      )}
    </div>
  )
}
