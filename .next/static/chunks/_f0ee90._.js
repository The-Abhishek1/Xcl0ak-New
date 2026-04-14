(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_f0ee90._.js", {

"[project]/src/components/map/ThreatMapPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ThreatMapPanel": (()=>ThreatMapPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const TYPE_COLOR = {
    Ransomware: '#ff3a5c',
    APT: '#a78bfa',
    Phishing: '#ff8c42',
    DDoS: '#ffd700',
    Malware: '#ff3a5c',
    Scanner: '#00aaff',
    Threat: '#64748b'
};
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [
        r,
        g,
        b
    ];
}
// Convert lat/lng to 3D sphere coords
function latLngToVec3(lat, lng, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return [
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    ];
}
function ThreatMapPanel({ points }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const threeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Build display points client-side only (Math.random)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPanel.useEffect": ()=>{
            const pts = points.map({
                "ThreatMapPanel.useEffect.pts": (p)=>({
                        srcLat: p.lat,
                        srcLng: p.lng,
                        dstLat: p.lat + (Math.random() - 0.5) * 40,
                        dstLng: p.lng + (Math.random() - 0.5) * 60,
                        type: p.type,
                        severity: p.severity,
                        label: p.label
                    })
            }["ThreatMapPanel.useEffect.pts"]);
            setDisplay(pts);
            setCount(pts.length);
        }
    }["ThreatMapPanel.useEffect"], [
        points
    ]);
    // Poll for fresh data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPanel.useEffect": ()=>{
            const iv = setInterval({
                "ThreatMapPanel.useEffect.iv": async ()=>{
                    try {
                        const r = await fetch('/api/v1/threat?limit=60');
                        if (!r.ok) return;
                        const d = await r.json();
                        if (!Array.isArray(d) || d.length === 0) return;
                        const next = 'srcLat' in d[0] ? d.map({
                            "ThreatMapPanel.useEffect.iv": (ev)=>({
                                    srcLat: ev.srcLat,
                                    srcLng: ev.srcLng,
                                    dstLat: ev.dstLat,
                                    dstLng: ev.dstLng,
                                    type: ev.type,
                                    severity: ev.severity,
                                    label: ev.details ?? `${ev.srcCountry}→${ev.dstCountry}`,
                                    sourceUrl: ev.sourceUrl
                                })
                        }["ThreatMapPanel.useEffect.iv"]) : d.map({
                            "ThreatMapPanel.useEffect.iv": (p)=>({
                                    srcLat: p.lat,
                                    srcLng: p.lng,
                                    dstLat: p.lat + (Math.random() - 0.5) * 40,
                                    dstLng: p.lng + (Math.random() - 0.5) * 60,
                                    type: p.type,
                                    severity: p.severity,
                                    label: p.label
                                })
                        }["ThreatMapPanel.useEffect.iv"]);
                        setDisplay(next);
                        setCount(next.length);
                    } catch  {}
                }
            }["ThreatMapPanel.useEffect.iv"], 60_000);
            return ({
                "ThreatMapPanel.useEffect": ()=>clearInterval(iv)
            })["ThreatMapPanel.useEffect"];
        }
    }["ThreatMapPanel.useEffect"], []);
    // Three.js globe
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPanel.useEffect": ()=>{
            if (!canvasRef.current || display.length === 0) return;
            const container = canvasRef.current;
            const W = container.clientWidth;
            const H = container.clientHeight || 420;
            // Dynamically import Three.js
            __turbopack_require__("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript, async loader)")(__turbopack_import__).then({
                "ThreatMapPanel.useEffect": (THREE)=>{
                    // Clean up previous
                    if (threeRef.current) {
                        threeRef.current.renderer.dispose();
                        threeRef.current.animId && cancelAnimationFrame(threeRef.current.animId);
                        container.innerHTML = '';
                    }
                    // Scene
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
                    camera.position.set(0, 0, 2.8);
                    const renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true
                    });
                    renderer.setSize(W, H);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.setClearColor(0x000000, 0);
                    container.appendChild(renderer.domElement);
                    // Globe
                    const RADIUS = 1;
                    const globeGeo = new THREE.SphereGeometry(RADIUS, 64, 64);
                    // Earth texture using canvas (land masses as green dots pattern)
                    const texCanvas = document.createElement('canvas');
                    texCanvas.width = 2048;
                    texCanvas.height = 1024;
                    const ctx = texCanvas.getContext('2d');
                    // Ocean
                    ctx.fillStyle = '#060c1a';
                    ctx.fillRect(0, 0, 2048, 1024);
                    // Land using simplified country boundaries via lat/lng dots
                    ctx.fillStyle = 'rgba(0,255,170,0.12)';
                    const LAND_REGIONS = [
                        // North America
                        {
                            x1: 0.08,
                            y1: 0.1,
                            x2: 0.28,
                            y2: 0.55
                        },
                        // South America
                        {
                            x1: 0.17,
                            y1: 0.48,
                            x2: 0.32,
                            y2: 0.92
                        },
                        // Europe
                        {
                            x1: 0.43,
                            y1: 0.08,
                            x2: 0.58,
                            y2: 0.42
                        },
                        // Africa
                        {
                            x1: 0.43,
                            y1: 0.3,
                            x2: 0.60,
                            y2: 0.82
                        },
                        // Asia
                        {
                            x1: 0.55,
                            y1: 0.05,
                            x2: 0.95,
                            y2: 0.58
                        },
                        // Australia
                        {
                            x1: 0.75,
                            y1: 0.58,
                            x2: 0.92,
                            y2: 0.82
                        },
                        // Greenland
                        {
                            x1: 0.24,
                            y1: 0.02,
                            x2: 0.38,
                            y2: 0.2
                        }
                    ];
                    for (const r of LAND_REGIONS){
                        const grd = ctx.createRadialGradient((r.x1 + r.x2) / 2 * 2048, (r.y1 + r.y2) / 2 * 1024, 0, (r.x1 + r.x2) / 2 * 2048, (r.y1 + r.y2) / 2 * 1024, Math.max((r.x2 - r.x1) * 2048, (r.y2 - r.y1) * 1024) * 0.6);
                        grd.addColorStop(0, 'rgba(0,255,170,0.18)');
                        grd.addColorStop(1, 'rgba(0,255,170,0.0)');
                        ctx.fillStyle = grd;
                        ctx.beginPath();
                        ctx.ellipse((r.x1 + r.x2) / 2 * 2048, (r.y1 + r.y2) / 2 * 1024, (r.x2 - r.x1) * 0.5 * 2048, (r.y2 - r.y1) * 0.5 * 1024, 0, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    // Grid lines
                    ctx.strokeStyle = 'rgba(0,255,170,0.04)';
                    ctx.lineWidth = 1;
                    for(let lat = -80; lat <= 80; lat += 20){
                        const y = (90 - lat) / 180 * 1024;
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(2048, y);
                        ctx.stroke();
                    }
                    for(let lng = -180; lng <= 180; lng += 20){
                        const x = (lng + 180) / 360 * 2048;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, 1024);
                        ctx.stroke();
                    }
                    const texture = new THREE.CanvasTexture(texCanvas);
                    const globeMat = new THREE.MeshPhongMaterial({
                        map: texture,
                        transparent: true,
                        opacity: 0.95,
                        shininess: 15,
                        specular: new THREE.Color(0x003311)
                    });
                    const globe = new THREE.Mesh(globeGeo, globeMat);
                    scene.add(globe);
                    // Atmosphere glow
                    const atmGeo = new THREE.SphereGeometry(RADIUS * 1.05, 32, 32);
                    const atmMat = new THREE.MeshPhongMaterial({
                        color: 0x00ffaa,
                        transparent: true,
                        opacity: 0.06,
                        side: THREE.FrontSide
                    });
                    scene.add(new THREE.Mesh(atmGeo, atmMat));
                    // Lights
                    scene.add(new THREE.AmbientLight(0x223344, 2.5));
                    const sun = new THREE.DirectionalLight(0x00ffaa, 0.8);
                    sun.position.set(5, 3, 5);
                    scene.add(sun);
                    const fill = new THREE.DirectionalLight(0x002244, 0.4);
                    fill.position.set(-5, -2, -3);
                    scene.add(fill);
                    // Attack arcs as tube geometries
                    const arcGroup = new THREE.Group();
                    scene.add(arcGroup);
                    function makeCurve(src) {
                        const [sx, sy, sz] = latLngToVec3(src.srcLat, src.srcLng, RADIUS);
                        const [dx, dy, dz] = latLngToVec3(src.dstLat, src.dstLng, RADIUS);
                        const mid = new THREE.Vector3((sx + dx) / 2, (sy + dy) / 2, (sz + dz) / 2);
                        mid.normalize().multiplyScalar(RADIUS * 1.45) // arc height
                        ;
                        return new THREE.CatmullRomCurve3([
                            new THREE.Vector3(sx, sy, sz),
                            mid,
                            new THREE.Vector3(dx, dy, dz)
                        ]);
                    }
                    display.forEach({
                        "ThreatMapPanel.useEffect": (pt)=>{
                            const color = hexToRgb(TYPE_COLOR[pt.type] ?? '#64748b');
                            const curve = makeCurve(pt);
                            const geo = new THREE.TubeGeometry(curve, 32, 0.004, 4, false);
                            const mat = new THREE.MeshBasicMaterial({
                                color: new THREE.Color(...color),
                                transparent: true,
                                opacity: 0.5 + pt.severity / 5 * 0.4
                            });
                            arcGroup.add(new THREE.Mesh(geo, mat));
                            // Source dot
                            const [sx, sy, sz] = latLngToVec3(pt.srcLat, pt.srcLng, RADIUS + 0.012);
                            const dotGeo = new THREE.SphereGeometry(pt.severity >= 4 ? 0.022 : 0.014, 8, 8);
                            const dotMat = new THREE.MeshBasicMaterial({
                                color: new THREE.Color(...color)
                            });
                            const dot = new THREE.Mesh(dotGeo, dotMat);
                            dot.position.set(sx, sy, sz);
                            arcGroup.add(dot);
                        }
                    }["ThreatMapPanel.useEffect"]);
                    // Stars background
                    const starGeo = new THREE.BufferGeometry();
                    const starPos = new Float32Array(3000);
                    for(let i = 0; i < 3000; i++){
                        starPos[i] = (Math.random() - 0.5) * 20;
                    }
                    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
                    const starMat = new THREE.PointsMaterial({
                        color: 0xffffff,
                        size: 0.015,
                        transparent: true,
                        opacity: 0.6
                    });
                    scene.add(new THREE.Points(starGeo, starMat));
                    // Mouse drag rotation
                    let isDragging = false, prevX = 0, prevY = 0;
                    let rotX = 0.3, rotY = 0, velX = 0, velY = 0.001;
                    const el = renderer.domElement;
                    el.addEventListener('mousedown', {
                        "ThreatMapPanel.useEffect": (e)=>{
                            isDragging = true;
                            prevX = e.clientX;
                            prevY = e.clientY;
                        }
                    }["ThreatMapPanel.useEffect"]);
                    el.addEventListener('touchstart', {
                        "ThreatMapPanel.useEffect": (e)=>{
                            isDragging = true;
                            prevX = e.touches[0].clientX;
                            prevY = e.touches[0].clientY;
                        }
                    }["ThreatMapPanel.useEffect"]);
                    window.addEventListener('mouseup', {
                        "ThreatMapPanel.useEffect": ()=>isDragging = false
                    }["ThreatMapPanel.useEffect"]);
                    window.addEventListener('touchend', {
                        "ThreatMapPanel.useEffect": ()=>isDragging = false
                    }["ThreatMapPanel.useEffect"]);
                    window.addEventListener('mousemove', {
                        "ThreatMapPanel.useEffect": (e)=>{
                            if (!isDragging) return;
                            velY = (e.clientX - prevX) * 0.005;
                            velX = (e.clientY - prevY) * 0.003;
                            rotY += velY;
                            rotX += velX;
                            rotX = Math.max(-1.2, Math.min(1.2, rotX));
                            prevX = e.clientX;
                            prevY = e.clientY;
                        }
                    }["ThreatMapPanel.useEffect"]);
                    el.addEventListener('touchmove', {
                        "ThreatMapPanel.useEffect": (e)=>{
                            if (!isDragging) return;
                            e.preventDefault();
                            const dx = e.touches[0].clientX - prevX;
                            const dy = e.touches[0].clientY - prevY;
                            velY = dx * 0.005;
                            velX = dy * 0.003;
                            rotY += velY;
                            rotX += velX;
                            rotX = Math.max(-1.2, Math.min(1.2, rotX));
                            prevX = e.touches[0].clientX;
                            prevY = e.touches[0].clientY;
                        }
                    }["ThreatMapPanel.useEffect"], {
                        passive: false
                    });
                    // Animate
                    let animId;
                    function animate() {
                        animId = requestAnimationFrame(animate);
                        if (!isDragging) {
                            velY += (0.0015 - velY) * 0.05 // drift toward slow auto-rotate
                            ;
                            velX *= 0.92;
                            rotY += velY;
                            rotX += velX;
                            rotX = Math.max(-1.2, Math.min(1.2, rotX));
                        }
                        globe.rotation.y = rotY;
                        globe.rotation.x = rotX;
                        arcGroup.rotation.y = rotY;
                        arcGroup.rotation.x = rotX;
                        renderer.render(scene, camera);
                    }
                    animate();
                    setLoading(false);
                    // Resize handler
                    const onResize = {
                        "ThreatMapPanel.useEffect.onResize": ()=>{
                            const W2 = container.clientWidth, H2 = container.clientHeight || 420;
                            camera.aspect = W2 / H2;
                            camera.updateProjectionMatrix();
                            renderer.setSize(W2, H2);
                        }
                    }["ThreatMapPanel.useEffect.onResize"];
                    window.addEventListener('resize', onResize);
                    threeRef.current = {
                        renderer,
                        animId,
                        cleanup: ({
                            "ThreatMapPanel.useEffect": ()=>{
                                cancelAnimationFrame(animId);
                                window.removeEventListener('resize', onResize);
                                renderer.dispose();
                            }
                        })["ThreatMapPanel.useEffect"]
                    };
                }
            }["ThreatMapPanel.useEffect"]).catch({
                "ThreatMapPanel.useEffect": (err)=>{
                    console.error('Three.js load error:', err);
                    setLoading(false);
                }
            }["ThreatMapPanel.useEffect"]);
            return ({
                "ThreatMapPanel.useEffect": ()=>{
                    threeRef.current?.cleanup?.();
                }
            })["ThreatMapPanel.useEffect"];
        }
    }["ThreatMapPanel.useEffect"], [
        display
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden animate-fin",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot live-dot-red"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[11px] tracking-widest uppercase",
                                style: {
                                    color: '#00ffaa'
                                },
                                children: "Global Threat Map"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-slate-600 ml-1",
                                children: [
                                    "— ",
                                    count,
                                    " OTX events"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[9px] text-slate-600 hidden sm:block",
                                children: "drag to rotate"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://otx.alienvault.com",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "font-mono text-[9px] text-slate-600 hover:text-slate-400 transition-colors hidden sm:block",
                                children: "AlienVault OTX ↗"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    height: '420px',
                    background: '#03050a'
                },
                children: [
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[12px] animate-pulse",
                            style: {
                                color: '#00ffaa'
                            },
                            children: "⟳ Loading 3D globe..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 331,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: canvasRef,
                        className: "w-full h-full",
                        style: {
                            cursor: 'grab'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 337,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 left-3 flex gap-2 flex-wrap",
                        children: Object.entries(TYPE_COLOR).map(([t, c])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: c,
                                            boxShadow: `0 0 6px ${c}`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[9px] text-slate-500 hidden sm:block",
                                        children: t
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, t, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 342,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3 flex gap-2",
                        children: Object.entries(display.reduce((acc, pt)=>{
                            acc[pt.type] = (acc[pt.type] ?? 0) + 1;
                            return acc;
                        }, {})).slice(0, 3).map(([type, n])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] px-2 py-1 rounded-md",
                                style: {
                                    background: 'rgba(0,0,0,0.6)',
                                    border: `1px solid ${TYPE_COLOR[type] ?? '#64748b'}40`,
                                    color: TYPE_COLOR[type] ?? '#64748b'
                                },
                                children: [
                                    type,
                                    " ",
                                    n
                                ]
                            }, type, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 329,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
        lineNumber: 309,
        columnNumber: 5
    }, this);
}
_s(ThreatMapPanel, "APlfQrWECbHJ4l7emgGIEzqsoMM=");
_c = ThreatMapPanel;
var _c;
__turbopack_refresh__.register(_c, "ThreatMapPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn),
    "cvssBg": (()=>cvssBg),
    "getAlias": (()=>getAlias),
    "slugify": (()=>slugify),
    "timeAgo": (()=>timeAgo),
    "wilsonScore": (()=>wilsonScore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
function cn(...i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(i);
}
function timeAgo(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    const m = Math.floor((Date.now() - d.getTime()) / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const days = Math.floor(h / 24);
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
}
function cvssBg(score) {
    if (score >= 9) return 'bg-red-500/15 border-red-500/25 text-red-400';
    if (score >= 7) return 'bg-orange-500/15 border-orange-500/25 text-orange-400';
    if (score >= 4) return 'bg-yellow-500/15 border-yellow-500/25 text-yellow-400';
    return 'bg-slate-500/15 border-slate-500/20 text-slate-400';
}
function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function wilsonScore(up, down) {
    const n = up + down;
    if (n === 0) return 0;
    const z = 1.96, p = up / n;
    return (p + z * z / (2 * n) - z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n)) / (1 + z * z / n);
}
function getAlias() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    let a = localStorage.getItem('xcloak:alias');
    if (!a) {
        const adj = [
            'ghost',
            'shadow',
            'null',
            'void',
            'cipher',
            'phantom',
            'byte'
        ][Math.floor(Math.random() * 7)];
        a = `${adj}_${Math.random().toString(36).slice(2, 6)}`;
        localStorage.setItem('xcloak:alias', a);
    }
    return a;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/exploit/ExploitGrid.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ExploitGrid": (()=>ExploitGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const TYPE_CLS = {
    RCE: 'bg-red-500/15 text-red-400 border-red-500/25',
    XSS: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
    SQLi: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
    BOF: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
    PrivEsc: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
    LFI: 'bg-pink-500/15 text-pink-400 border-pink-500/25'
};
function ExploitGrid({ exploits, title = 'Exploits' }) {
    _s();
    const [votes, setVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [voted, setVoted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    async function handleVote(e, id, current) {
        e.preventDefault();
        if (voted[id]) return;
        const alias = localStorage.getItem('xcloak:alias') ?? 'anon';
        try {
            const res = await fetch(`/api/v1/exploits/${id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    direction: 'up',
                    userAlias: alias
                })
            });
            const data = await res.json();
            setVotes((v)=>({
                    ...v,
                    [id]: data.upvotes
                }));
            setVoted((v)=>({
                    ...v,
                    [id]: true
                }));
        } catch  {}
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden animate-float-in-d3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] tracking-widest text-accent uppercase",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/exploits",
                        className: "font-mono text-[10px] text-slate-600 hover:text-accent2 transition-colors",
                        children: "ALL EXPLOITS →"
                    }, void 0, false, {
                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            exploits.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 text-center font-mono text-[11px] text-slate-600",
                children: [
                    "No exploits yet. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/exploits/upload",
                        className: "text-accent hover:underline",
                        children: "Upload the first one →"
                    }, void 0, false, {
                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                        lineNumber: 68,
                        columnNumber: 28
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 p-3",
                children: exploits.map((ex)=>{
                    const upvotes = votes[ex.id] ?? ex.upvotes;
                    const isVoted = voted[ex.id];
                    const score = ex.dnaRisk ?? null;
                    const typeCls = TYPE_CLS[ex.type] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/25';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/exploits/${ex.id}`,
                        className: "group relative p-3.5 rounded-xl border border-white/[0.06] hover:border-accent/20 transition-all duration-200 hover:-translate-y-0.5 block overflow-hidden",
                        style: {
                            background: 'rgba(255,255,255,0.025)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-mono text-[9px] px-1.5 py-[2px] rounded border ${typeCls}`,
                                                        children: ex.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, this),
                                                    ex.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] px-1.5 py-[2px] rounded border bg-accent/8 text-accent border-accent/20",
                                                        children: "✓ VERIFIED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] px-1.5 py-[2px] rounded border border-white/[0.08] text-slate-500",
                                                        children: ex.language
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 91,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>handleVote(e, ex.id, upvotes),
                                                className: `flex items-center gap-1 px-2 py-1 rounded border font-mono text-[10px]
                                transition-all duration-150 cursor-pointer
                                ${isVoted ? 'border-accent/40 text-accent bg-accent/8' : 'border-white/10 text-slate-500 hover:border-accent/30 hover:text-accent'}`,
                                                children: [
                                                    "▲ ",
                                                    upvotes
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[13px] font-bold text-slate-100 mb-1 leading-snug line-clamp-2",
                                        children: ex.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] text-slate-500 leading-relaxed mb-2.5 line-clamp-2",
                                        children: ex.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 flex-wrap",
                                        children: [
                                            score !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-mono text-[10px] font-bold px-1.5 py-[2px] rounded border ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cvssBg"])(score)}`,
                                                children: [
                                                    "RISK ",
                                                    score.toFixed(1)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 126,
                                                columnNumber: 21
                                            }, this),
                                            ex.cveId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] px-1.5 py-[2px] rounded border bg-purple-500/10 text-purple-400 border-purple-500/20",
                                                children: ex.cveId
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this),
                                            ex._count && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] text-slate-600",
                                                children: [
                                                    "💬 ",
                                                    ex._count.comments
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 136,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] text-slate-700 ml-auto",
                                                children: [
                                                    ex.authorAlias,
                                                    " · ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(ex.createdAt)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 140,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 124,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this)
                        ]
                    }, ex.id, true, {
                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(ExploitGrid, "6o4i4D4MJtK6FGGZvExcR6GD44s=");
_c = ExploitGrid;
var _c;
__turbopack_refresh__.register(_c, "ExploitGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ai/AIPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AIPanel": (()=>AIPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
function AIPanel() {
    _s();
    const [msgs, setMsgs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: 'ai',
            text: 'Ask me about any CVE, exploit technique, or security concept. I explain with context from real threat data.'
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    async function send() {
        const q = input.trim();
        if (!q || loading) return;
        setInput('');
        setMsgs((m)=>[
                ...m,
                {
                    role: 'user',
                    text: q
                }
            ]);
        setLoading(true);
        try {
            // Use OpenAI via our own API — or fallback to a simple static response
            const res = await fetch('/api/v1/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            content: q
                        }
                    ]
                })
            });
            const data = await res.json();
            setMsgs((m)=>[
                    ...m,
                    {
                        role: 'ai',
                        text: data.message ?? data.error ?? 'No response.'
                    }
                ]);
        } catch  {
            setMsgs((m)=>[
                    ...m,
                    {
                        role: 'ai',
                        text: 'Error contacting AI service.'
                    }
                ]);
        } finally{
            setLoading(false);
            setTimeout(()=>endRef.current?.scrollIntoView({
                    behavior: 'smooth'
                }), 100);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "🤖"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] tracking-widest text-accent uppercase",
                        children: "AI Assistant"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto font-mono text-[9px] px-1.5 py-[1px] rounded bg-accent/10 text-accent",
                        children: "ONLINE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIPanel.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2.5 space-y-2 overflow-y-auto",
                style: {
                    maxHeight: '180px',
                    scrollbarWidth: 'thin'
                },
                children: [
                    msgs.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `font-mono text-[9px] uppercase mb-0.5 tracking-wider ${m.role === 'ai' ? 'text-accent' : 'text-slate-500'}`,
                                    children: m.role === 'ai' ? 'XCLOAK AI' : 'YOU'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIPanel.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-[11px] leading-relaxed px-2.5 py-2 rounded-lg border ${m.role === 'ai' ? 'bg-accent/[0.04] border-accent/10 text-slate-300' : 'bg-white/[0.03] border-white/[0.06] text-slate-300'}`,
                                    children: m.text
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIPanel.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/ai/AIPanel.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)),
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-accent font-mono text-[11px] animate-pulse",
                        children: "Thinking..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: endRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIPanel.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 p-2.5 border-t border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>e.key === 'Enter' && send(),
                        placeholder: "Ask about any CVE or exploit...",
                        className: "flex-1 bg-white/[0.04] border border-white/[0.08] rounded-md px-2.5 py-1.5 font-mono text-[11px] text-slate-300 outline-none placeholder-slate-700 focus:border-accent/30 transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: send,
                        disabled: loading,
                        className: "px-2.5 py-1.5 rounded-md border border-accent/30 bg-accent/10 text-accent font-mono text-[10px] transition-all hover:bg-accent/20 disabled:opacity-50",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ai/AIPanel.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ai/AIPanel.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(AIPanel, "5yPfGF9m3N5F1qQ17cR6CeuWTI0=");
_c = AIPanel;
var _c;
__turbopack_refresh__.register(_c, "AIPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "clsx": (()=>clsx),
    "default": (()=>__TURBOPACK__default__export__)
});
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}}),
}]);

//# sourceMappingURL=_f0ee90._.js.map