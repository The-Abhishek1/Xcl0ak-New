(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_a9010a._.js", {

"[project]/src/components/map/Globe3D.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Globe3D": (()=>Globe3D)
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
    Threat: '#4a7fa5',
    RAT: '#ff6b9d',
    WORM: '#ff8c42'
};
function typeColor(t) {
    return TYPE_COLOR[t] ?? '#4a7fa5';
}
// Correct lat/lng → Three.js Vector3 on unit sphere
// Three.js: Y=up, so lat maps to Y, lng maps around Y-axis
function latLng2Vec(lat, lng, r) {
    const phi = lat * (Math.PI / 180) // latitude  → angle from equator
    ;
    const theta = lng * (Math.PI / 180) // longitude → angle around Y
    ;
    const x = r * Math.cos(phi) * Math.sin(theta);
    const y = r * Math.sin(phi);
    const z = r * Math.cos(phi) * Math.cos(theta);
    return [
        x,
        y,
        z
    ];
}
function Globe3D({ points, height = 420, onSelect }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            if (!mountRef.current) return;
            // Cleanup previous instance
            stateRef.current?.cleanup();
            stateRef.current = null;
            const container = mountRef.current;
            let animId = 0;
            let destroyed = false;
            __turbopack_require__("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript, async loader)")(__turbopack_import__).then({
                "Globe3D.useEffect": (THREE)=>{
                    if (destroyed || !container) return;
                    // ── Scene setup ────────────────────────────────────────────
                    const W = container.clientWidth || 800;
                    const H = height;
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 100);
                    camera.position.set(0, 0, 3.2);
                    const renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true
                    });
                    renderer.setSize(W, H);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.setClearColor(0x000000, 0);
                    container.appendChild(renderer.domElement);
                    // ── Globe texture painted on a canvas ─────────────────────
                    const T = 2048, TH = 1024;
                    const tc = document.createElement('canvas');
                    tc.width = T;
                    tc.height = TH;
                    const ctx = tc.getContext('2d');
                    // Deep ocean
                    ctx.fillStyle = '#030810';
                    ctx.fillRect(0, 0, T, TH);
                    // Subtle grid
                    ctx.strokeStyle = 'rgba(0,255,170,0.06)';
                    ctx.lineWidth = 1;
                    for(let lat = -80; lat <= 80; lat += 20){
                        const y = (90 - lat) / 180 * TH;
                        ctx.beginPath();
                        ctx.moveTo(0, y);
                        ctx.lineTo(T, y);
                        ctx.stroke();
                    }
                    for(let lng = -180; lng <= 180; lng += 20){
                        const x = (lng + 180) / 360 * T;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, TH);
                        ctx.stroke();
                    }
                    // Land blobs — approximate continent regions
                    const lands = [
                        // North America
                        {
                            cx: 0.19,
                            cy: 0.33,
                            rx: 0.10,
                            ry: 0.20
                        },
                        // Central America
                        {
                            cx: 0.21,
                            cy: 0.52,
                            rx: 0.03,
                            ry: 0.05
                        },
                        // South America
                        {
                            cx: 0.25,
                            cy: 0.70,
                            rx: 0.07,
                            ry: 0.18
                        },
                        // Europe
                        {
                            cx: 0.50,
                            cy: 0.28,
                            rx: 0.05,
                            ry: 0.10
                        },
                        // Africa
                        {
                            cx: 0.51,
                            cy: 0.55,
                            rx: 0.07,
                            ry: 0.18
                        },
                        // Middle East
                        {
                            cx: 0.57,
                            cy: 0.38,
                            rx: 0.04,
                            ry: 0.06
                        },
                        // Russia/N Asia
                        {
                            cx: 0.65,
                            cy: 0.18,
                            rx: 0.18,
                            ry: 0.10
                        },
                        // South Asia
                        {
                            cx: 0.64,
                            cy: 0.43,
                            rx: 0.06,
                            ry: 0.08
                        },
                        // SE Asia
                        {
                            cx: 0.73,
                            cy: 0.50,
                            rx: 0.05,
                            ry: 0.07
                        },
                        // East Asia
                        {
                            cx: 0.76,
                            cy: 0.32,
                            rx: 0.07,
                            ry: 0.12
                        },
                        // Australia
                        {
                            cx: 0.80,
                            cy: 0.70,
                            rx: 0.07,
                            ry: 0.08
                        },
                        // Greenland
                        {
                            cx: 0.30,
                            cy: 0.12,
                            rx: 0.05,
                            ry: 0.07
                        },
                        // Antarctica hint
                        {
                            cx: 0.50,
                            cy: 0.96,
                            rx: 0.30,
                            ry: 0.04
                        }
                    ];
                    for (const l of lands){
                        const grd = ctx.createRadialGradient(l.cx * T, l.cy * TH, 0, l.cx * T, l.cy * TH, Math.max(l.rx, l.ry) * T * 0.9);
                        grd.addColorStop(0, 'rgba(0,200,100,0.22)');
                        grd.addColorStop(0.5, 'rgba(0,160,80,0.12)');
                        grd.addColorStop(1, 'rgba(0,100,50,0)');
                        ctx.fillStyle = grd;
                        ctx.save();
                        ctx.translate(l.cx * T, l.cy * TH);
                        ctx.scale(l.rx / Math.max(l.rx, l.ry), l.ry / Math.max(l.rx, l.ry));
                        ctx.beginPath();
                        ctx.arc(0, 0, Math.max(l.rx, l.ry) * T, 0, Math.PI * 2);
                        ctx.restore();
                        ctx.fill();
                    }
                    const earthTex = new THREE.CanvasTexture(tc);
                    // ── Globe sphere ───────────────────────────────────────────
                    const R = 1;
                    const globeGeo = new THREE.SphereGeometry(R, 80, 80);
                    const globeMat = new THREE.MeshPhongMaterial({
                        map: earthTex,
                        shininess: 10,
                        specular: new THREE.Color(0x002200)
                    });
                    const globe = new THREE.Mesh(globeGeo, globeMat);
                    scene.add(globe);
                    // Atmosphere
                    const atmGeo = new THREE.SphereGeometry(R * 1.04, 32, 32);
                    const atmMat = new THREE.MeshPhongMaterial({
                        color: 0x00cc66,
                        transparent: true,
                        opacity: 0.05,
                        side: THREE.BackSide
                    });
                    scene.add(new THREE.Mesh(atmGeo, atmMat));
                    // ── Lights ─────────────────────────────────────────────────
                    scene.add(new THREE.AmbientLight(0x334455, 3));
                    const sun = new THREE.DirectionalLight(0x88ffcc, 1.2);
                    sun.position.set(4, 2, 4);
                    scene.add(sun);
                    const rim = new THREE.DirectionalLight(0x002244, 0.6);
                    rim.position.set(-4, -1, -3);
                    scene.add(rim);
                    // ── Stars ──────────────────────────────────────────────────
                    const starCount = 2000;
                    const starPos = new Float32Array(starCount * 3);
                    for(let i = 0; i < starCount * 3; i++)starPos[i] = (Math.random() - 0.5) * 30;
                    const starGeo = new THREE.BufferGeometry();
                    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
                    const starMat = new THREE.PointsMaterial({
                        color: 0xffffff,
                        size: 0.012,
                        transparent: true,
                        opacity: 0.5
                    });
                    scene.add(new THREE.Points(starGeo, starMat));
                    // ── Attack arcs ────────────────────────────────────────────
                    const arcGroup = new THREE.Group();
                    scene.add(arcGroup);
                    // Animated arc progress (each arc draws progressively)
                    const arcProgress = [];
                    for (const pt of points){
                        const color = new THREE.Color(typeColor(pt.type));
                        const [sx, sy, sz] = latLng2Vec(pt.srcLat, pt.srcLng, R);
                        const [dx, dy, dz] = latLng2Vec(pt.dstLat, pt.dstLng, R);
                        // Mid-point elevated above sphere surface
                        const vSrc = new THREE.Vector3(sx, sy, sz);
                        const vDst = new THREE.Vector3(dx, dy, dz);
                        const vMid = vSrc.clone().add(vDst).normalize().multiplyScalar(R * 1.5);
                        const curve = new THREE.QuadraticBezierCurve3(vSrc, vMid, vDst);
                        const curvePoints = curve.getPoints(60);
                        // Arc line (draw all at once, animate opacity)
                        const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
                        const lineMat = new THREE.LineBasicMaterial({
                            color,
                            transparent: true,
                            opacity: 0.0,
                            linewidth: 1
                        });
                        const line = new THREE.Line(lineGeo, lineMat);
                        arcGroup.add(line);
                        arcProgress.push(0);
                        // Glow tube (thicker, more transparent)
                        const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.006, 4, false);
                        const tubeMat = new THREE.MeshBasicMaterial({
                            color,
                            transparent: true,
                            opacity: 0
                        });
                        const tube = new THREE.Mesh(tubeGeo, tubeMat);
                        arcGroup.add(tube);
                        // Source dot with glow
                        const srcDotGeo = new THREE.SphereGeometry(pt.severity >= 4 ? 0.025 : 0.016, 8, 8);
                        const srcDotMat = new THREE.MeshBasicMaterial({
                            color
                        });
                        const srcDot = new THREE.Mesh(srcDotGeo, srcDotMat);
                        srcDot.position.set(sx, sy, sz);
                        arcGroup.add(srcDot);
                        // Destination dot (smaller)
                        const dstDotGeo = new THREE.SphereGeometry(0.01, 6, 6);
                        const dstDot = new THREE.Mesh(dstDotGeo, new THREE.MeshBasicMaterial({
                            color,
                            transparent: true,
                            opacity: 0.5
                        }));
                        dstDot.position.set(dx, dy, dz);
                        arcGroup.add(dstDot);
                    }
                    // Animate arc opacity in — stagger across arcs
                    const lineObjects = arcGroup.children.filter({
                        "Globe3D.useEffect.lineObjects": (c)=>c instanceof THREE.Line
                    }["Globe3D.useEffect.lineObjects"]);
                    const tubeObjects = arcGroup.children.filter({
                        "Globe3D.useEffect.tubeObjects": (c)=>c instanceof THREE.Mesh && c.geometry instanceof THREE.TubeGeometry
                    }["Globe3D.useEffect.tubeObjects"]);
                    lineObjects.forEach({
                        "Globe3D.useEffect": (l, i)=>{
                            const delay = i * 120;
                            setTimeout({
                                "Globe3D.useEffect": ()=>{
                                    const mat = l.material;
                                    let t = 0;
                                    const iv = setInterval({
                                        "Globe3D.useEffect.iv": ()=>{
                                            t += 0.05;
                                            mat.opacity = Math.min(0.4 + (points[i]?.severity ?? 3) / 5 * 0.5, t);
                                            if (mat.opacity >= 0.4 + (points[i]?.severity ?? 3) / 5 * 0.5) clearInterval(iv);
                                        }
                                    }["Globe3D.useEffect.iv"], 16);
                                    if (tubeObjects[i]) {
                                        ;
                                        tubeObjects[i].material.opacity = 0.12;
                                    }
                                }
                            }["Globe3D.useEffect"], delay);
                        }
                    }["Globe3D.useEffect"]);
                    // ── Interaction ────────────────────────────────────────────
                    let isDragging = false, lastX = 0, lastY = 0;
                    let rotY = 0.4, rotX = 0.3, velY = 0.003, velX = 0;
                    const el = renderer.domElement;
                    el.style.cursor = 'grab';
                    const onDown = {
                        "Globe3D.useEffect.onDown": (x, y)=>{
                            isDragging = true;
                            lastX = x;
                            lastY = y;
                            el.style.cursor = 'grabbing';
                        }
                    }["Globe3D.useEffect.onDown"];
                    const onUp = {
                        "Globe3D.useEffect.onUp": ()=>{
                            isDragging = false;
                            el.style.cursor = 'grab';
                        }
                    }["Globe3D.useEffect.onUp"];
                    const onMove = {
                        "Globe3D.useEffect.onMove": (x, y)=>{
                            if (!isDragging) return;
                            velY = (x - lastX) * 0.006;
                            velX = (y - lastY) * 0.004;
                            rotY += velY;
                            rotX += velX;
                            rotX = Math.max(-1.1, Math.min(1.1, rotX));
                            lastX = x;
                            lastY = y;
                        }
                    }["Globe3D.useEffect.onMove"];
                    el.addEventListener('mousedown', {
                        "Globe3D.useEffect": (e)=>onDown(e.clientX, e.clientY)
                    }["Globe3D.useEffect"]);
                    el.addEventListener('touchstart', {
                        "Globe3D.useEffect": (e)=>onDown(e.touches[0].clientX, e.touches[0].clientY)
                    }["Globe3D.useEffect"], {
                        passive: true
                    });
                    window.addEventListener('mouseup', onUp);
                    window.addEventListener('touchend', onUp);
                    window.addEventListener('mousemove', {
                        "Globe3D.useEffect": (e)=>onMove(e.clientX, e.clientY)
                    }["Globe3D.useEffect"]);
                    el.addEventListener('touchmove', {
                        "Globe3D.useEffect": (e)=>{
                            e.preventDefault();
                            onMove(e.touches[0].clientX, e.touches[0].clientY);
                        }
                    }["Globe3D.useEffect"], {
                        passive: false
                    });
                    // ── Resize ─────────────────────────────────────────────────
                    const onResize = {
                        "Globe3D.useEffect.onResize": ()=>{
                            const W2 = container.clientWidth || 800;
                            camera.aspect = W2 / height;
                            camera.updateProjectionMatrix();
                            renderer.setSize(W2, height);
                        }
                    }["Globe3D.useEffect.onResize"];
                    window.addEventListener('resize', onResize);
                    // ── Render loop ────────────────────────────────────────────
                    let tick = 0;
                    const animate = {
                        "Globe3D.useEffect.animate": ()=>{
                            if (destroyed) return;
                            animId = requestAnimationFrame(animate);
                            tick++;
                            if (!isDragging) {
                                velY += (0.002 - velY) * 0.03;
                                velX *= 0.94;
                                rotY += velY;
                                rotX += velX;
                                rotX = Math.max(-1.1, Math.min(1.1, rotX));
                            } else {
                                velY *= 0.95;
                                velX *= 0.95;
                            }
                            globe.rotation.set(rotX, rotY, 0);
                            arcGroup.rotation.set(rotX, rotY, 0);
                            renderer.render(scene, camera);
                        }
                    }["Globe3D.useEffect.animate"];
                    animate();
                    setReady(true);
                    stateRef.current = {
                        cleanup: ({
                            "Globe3D.useEffect": ()=>{
                                destroyed = true;
                                cancelAnimationFrame(animId);
                                window.removeEventListener('mouseup', onUp);
                                window.removeEventListener('touchend', onUp);
                                window.removeEventListener('mousemove', {
                                    "Globe3D.useEffect": (e)=>onMove(e.clientX, e.clientY)
                                }["Globe3D.useEffect"]);
                                window.removeEventListener('resize', onResize);
                                renderer.dispose();
                                globeGeo.dispose();
                                globeMat.dispose();
                                earthTex.dispose();
                                starGeo.dispose();
                                starMat.dispose();
                                if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
                            }
                        })["Globe3D.useEffect"]
                    };
                }
            }["Globe3D.useEffect"]).catch({
                "Globe3D.useEffect": (err)=>{
                    console.error('[Globe3D] Three.js failed:', err);
                    setReady(true);
                }
            }["Globe3D.useEffect"]);
            return ({
                "Globe3D.useEffect": ()=>{
                    destroyed = true;
                    stateRef.current?.cleanup();
                }
            })["Globe3D.useEffect"];
        }
    }["Globe3D.useEffect"], [
        points,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full relative",
        style: {
            height,
            background: '#030810'
        },
        children: !ready && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-[12px] animate-pulse",
                style: {
                    color: '#00ffaa'
                },
                children: "⟳ Rendering 3D globe..."
            }, void 0, false, {
                fileName: "[project]/src/components/map/Globe3D.tsx",
                lineNumber: 335,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/map/Globe3D.tsx",
            lineNumber: 334,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/map/Globe3D.tsx",
        lineNumber: 332,
        columnNumber: 5
    }, this);
}
_s(Globe3D, "DzYe9MxvtLMxKXly+EaqvYZ34IU=");
_c = Globe3D;
var _c;
__turbopack_refresh__.register(_c, "Globe3D");
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
"[project]/src/app/threat-map/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ThreatMapPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/map/Globe3D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const TYPE_COLOR = {
    Ransomware: '#ff3a5c',
    APT: '#a78bfa',
    Phishing: '#ff8c42',
    DDoS: '#ffd700',
    Malware: '#ff3a5c',
    Scanner: '#00aaff',
    Threat: '#4a7fa5'
};
function ThreatMapPage() {
    _s();
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pulses, setPulses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        critical: 0,
        cveIds: []
    });
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ALL');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    async function load() {
        setLoading(true);
        try {
            const [evRes, pulseRes, statRes] = await Promise.all([
                fetch('/api/v1/threat?limit=80'),
                fetch('/api/v1/threat?view=pulses&limit=20'),
                fetch('/api/v1/threat?view=stats')
            ]);
            const [evData, pulseData, statData] = await Promise.all([
                evRes.json(),
                pulseRes.json(),
                statRes.json()
            ]);
            // Convert to GlobePoints
            const evArr = Array.isArray(evData) ? evData : [];
            const pts = evArr.map((ev)=>{
                if ('srcLat' in ev) {
                    return {
                        srcLat: ev.srcLat,
                        srcLng: ev.srcLng,
                        dstLat: ev.dstLat,
                        dstLng: ev.dstLng,
                        type: ev.type,
                        severity: ev.severity,
                        label: ev.details ?? `${ev.srcCountry}→${ev.dstCountry}`,
                        sourceUrl: ev.sourceUrl
                    };
                }
                return {
                    srcLat: ev.lat,
                    srcLng: ev.lng,
                    dstLat: ev.lat + (Math.random() - 0.5) * 50,
                    dstLng: ev.lng + (Math.random() - 0.5) * 80,
                    type: ev.type,
                    severity: ev.severity,
                    label: ev.label
                };
            });
            setPoints(pts);
            setPulses(Array.isArray(pulseData) ? pulseData : []);
            setStats(statData ?? {
                total: 0,
                critical: 0,
                cveIds: []
            });
        } catch (e) {
            console.error(e);
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPage.useEffect": ()=>{
            load();
        }
    }["ThreatMapPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPage.useEffect": ()=>{
            const iv = setInterval(load, 60_000);
            return ({
                "ThreatMapPage.useEffect": ()=>clearInterval(iv)
            })["ThreatMapPage.useEffect"];
        }
    }["ThreatMapPage.useEffect"], []);
    const types = [
        'ALL',
        ...Array.from(new Set(points.map((p)=>p.type)))
    ];
    const visible = filter === 'ALL' ? points : points.filter((p)=>p.type === filter);
    const grouped = points.reduce((a, p)=>{
        a[p.type] = (a[p.type] ?? 0) + 1;
        return a;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "Global Threat ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: "Map"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-0.5",
                                children: [
                                    "Live OTX intelligence · ",
                                    points.length,
                                    " events · auto-refresh 60s"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: load,
                        className: "font-mono text-[11px] px-4 py-2 rounded-lg border border-white/[0.08] text-slate-500 hover:text-slate-300 transition-all cursor-pointer",
                        children: loading ? '⟳ LOADING...' : '↻ REFRESH'
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                    {
                        label: 'Total Events',
                        v: stats.total || points.length,
                        c: '#00ffaa'
                    },
                    {
                        label: 'Critical',
                        v: stats.critical || visible.filter((p)=>p.severity >= 4).length,
                        c: '#ff3a5c'
                    },
                    {
                        label: 'Active CVEs',
                        v: stats.cveIds?.length || 0,
                        c: '#a78bfa'
                    },
                    ...Object.entries(grouped).slice(0, 4).map(([t, n])=>({
                            label: t,
                            v: n,
                            c: TYPE_COLOR[t] ?? '#64748b'
                        }))
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass-sm px-3 py-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-lg font-bold",
                                style: {
                                    color: s.c
                                },
                                children: s.v
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[9px] text-slate-600 uppercase tracking-wider",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 flex-wrap",
                children: types.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter(t),
                        className: "font-mono text-[10px] px-3 py-1.5 rounded border transition-all cursor-pointer",
                        style: {
                            background: filter === t ? (TYPE_COLOR[t] ?? '#00ffaa') + '18' : 'rgba(255,255,255,0.025)',
                            borderColor: filter === t ? (TYPE_COLOR[t] ?? '#00ffaa') + '50' : 'rgba(255,255,255,0.08)',
                            color: filter === t ? TYPE_COLOR[t] ?? '#00ffaa' : '#64748b'
                        },
                        children: [
                            t,
                            grouped[t] ? ` (${grouped[t]})` : ''
                        ]
                    }, t, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass overflow-hidden",
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
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 115,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[11px] uppercase tracking-widest",
                                                style: {
                                                    color: '#00ffaa'
                                                },
                                                children: "3D Threat Globe"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[9px] text-slate-600",
                                        children: "drag to rotate · scroll to zoom"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe3D"], {
                                        points: visible,
                                        height: 500
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
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
                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] text-slate-500 hidden sm:block",
                                                        children: t
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, t, true, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "live-dot"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[11px] uppercase tracking-widest",
                                                style: {
                                                    color: '#00ffaa'
                                                },
                                                children: "OTX Pulses"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 139,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://otx.alienvault.com/pulses/subscribed",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors",
                                        children: "OTX ↗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-y-auto",
                                style: {
                                    maxHeight: '480px'
                                },
                                children: [
                                    loading && !pulses.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-8 text-center font-mono text-[11px] text-slate-600 animate-pulse",
                                        children: "Fetching OTX intelligence..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    pulses.map((p)=>{
                                        const text = [
                                            ...p.tags ?? [],
                                            p.adversary ?? ''
                                        ].join(' ').toLowerCase();
                                        const type = /ransomware/.test(text) ? 'Ransomware' : /apt/.test(text) ? 'APT' : /phish/.test(text) ? 'Phishing' : /ddos/.test(text) ? 'DDoS' : /malware/.test(text) ? 'Malware' : 'Threat';
                                        const sev = p.tlp === 'red' ? 'high' : p.tlp === 'amber' ? 'medium' : 'low';
                                        const sevColor = sev === 'high' ? '#ff3a5c' : sev === 'medium' ? '#ff8c42' : '#4a7fa5';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `https://otx.alienvault.com/pulse/${p.id}`,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "block px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-[3px] rounded-full shrink-0 self-stretch",
                                                        style: {
                                                            background: sevColor
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[12px] font-semibold text-slate-200 line-clamp-2 mb-1.5 leading-snug",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 flex-wrap",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-[9px] px-1.5 py-[1px] rounded border",
                                                                        style: {
                                                                            background: TYPE_COLOR[type] + '15',
                                                                            color: TYPE_COLOR[type],
                                                                            borderColor: TYPE_COLOR[type] + '30'
                                                                        },
                                                                        children: type.toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    p.targeted_countries?.slice(0, 2).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-mono text-[9px] text-slate-600",
                                                                            children: c
                                                                        }, c, false, {
                                                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                                                            lineNumber: 175,
                                                                            columnNumber: 27
                                                                        }, this)),
                                                                    p.adversary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-[9px] text-orange-400",
                                                                        children: p.adversary
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                                        lineNumber: 178,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-[9px] text-slate-700 ml-auto",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(p.modified ?? p.created)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                                lineNumber: 169,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 163,
                                                columnNumber: 19
                                            }, this)
                                        }, p.id, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 159,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            stats.cveIds?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-white/[0.06] p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-2",
                                        children: "CVEs in OTX Pulses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: stats.cveIds.slice(0, 8).map((cve)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `/cve?q=${cve}`,
                                                className: "font-mono text-[9px] px-1.5 py-[2px] rounded border transition-colors",
                                                style: {
                                                    background: 'rgba(167,139,250,0.1)',
                                                    color: '#a78bfa',
                                                    borderColor: 'rgba(167,139,250,0.25)'
                                                },
                                                children: cve
                                            }, cve, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/threat-map/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
_s(ThreatMapPage, "sCRg4bIy61BfLI+Q+S2JoDFJXLg=");
_c = ThreatMapPage;
var _c;
__turbopack_refresh__.register(_c, "ThreatMapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/threat-map/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

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

//# sourceMappingURL=_a9010a._.js.map