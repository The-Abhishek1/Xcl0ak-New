module.exports = {

"[project]/src/components/map/Globe3D.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Globe3D": (()=>Globe3D)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
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
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const stateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mountRef.current) return;
        // Cleanup previous instance
        stateRef.current?.cleanup();
        stateRef.current = null;
        const container = mountRef.current;
        let animId = 0;
        let destroyed = false;
        __turbopack_require__("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript, async loader)")(__turbopack_import__).then((THREE)=>{
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
            const lineObjects = arcGroup.children.filter((c)=>c instanceof THREE.Line);
            const tubeObjects = arcGroup.children.filter((c)=>c instanceof THREE.Mesh && c.geometry instanceof THREE.TubeGeometry);
            lineObjects.forEach((l, i)=>{
                const delay = i * 120;
                setTimeout(()=>{
                    const mat = l.material;
                    let t = 0;
                    const iv = setInterval(()=>{
                        t += 0.05;
                        mat.opacity = Math.min(0.4 + (points[i]?.severity ?? 3) / 5 * 0.5, t);
                        if (mat.opacity >= 0.4 + (points[i]?.severity ?? 3) / 5 * 0.5) clearInterval(iv);
                    }, 16);
                    if (tubeObjects[i]) {
                        ;
                        tubeObjects[i].material.opacity = 0.12;
                    }
                }, delay);
            });
            // ── Interaction ────────────────────────────────────────────
            let isDragging = false, lastX = 0, lastY = 0;
            let rotY = 0.4, rotX = 0.3, velY = 0.003, velX = 0;
            const el = renderer.domElement;
            el.style.cursor = 'grab';
            const onDown = (x, y)=>{
                isDragging = true;
                lastX = x;
                lastY = y;
                el.style.cursor = 'grabbing';
            };
            const onUp = ()=>{
                isDragging = false;
                el.style.cursor = 'grab';
            };
            const onMove = (x, y)=>{
                if (!isDragging) return;
                velY = (x - lastX) * 0.006;
                velX = (y - lastY) * 0.004;
                rotY += velY;
                rotX += velX;
                rotX = Math.max(-1.1, Math.min(1.1, rotX));
                lastX = x;
                lastY = y;
            };
            el.addEventListener('mousedown', (e)=>onDown(e.clientX, e.clientY));
            el.addEventListener('touchstart', (e)=>onDown(e.touches[0].clientX, e.touches[0].clientY), {
                passive: true
            });
            window.addEventListener('mouseup', onUp);
            window.addEventListener('touchend', onUp);
            window.addEventListener('mousemove', (e)=>onMove(e.clientX, e.clientY));
            el.addEventListener('touchmove', (e)=>{
                e.preventDefault();
                onMove(e.touches[0].clientX, e.touches[0].clientY);
            }, {
                passive: false
            });
            // ── Resize ─────────────────────────────────────────────────
            const onResize = ()=>{
                const W2 = container.clientWidth || 800;
                camera.aspect = W2 / height;
                camera.updateProjectionMatrix();
                renderer.setSize(W2, height);
            };
            window.addEventListener('resize', onResize);
            // ── Render loop ────────────────────────────────────────────
            let tick = 0;
            const animate = ()=>{
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
            };
            animate();
            setReady(true);
            stateRef.current = {
                cleanup: ()=>{
                    destroyed = true;
                    cancelAnimationFrame(animId);
                    window.removeEventListener('mouseup', onUp);
                    window.removeEventListener('touchend', onUp);
                    window.removeEventListener('mousemove', (e)=>onMove(e.clientX, e.clientY));
                    window.removeEventListener('resize', onResize);
                    renderer.dispose();
                    globeGeo.dispose();
                    globeMat.dispose();
                    earthTex.dispose();
                    starGeo.dispose();
                    starMat.dispose();
                    if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
                }
            };
        }).catch((err)=>{
            console.error('[Globe3D] Three.js failed:', err);
            setReady(true);
        });
        return ()=>{
            destroyed = true;
            stateRef.current?.cleanup();
        };
    }, [
        points,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full relative",
        style: {
            height,
            background: '#030810'
        },
        children: !ready && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}}),
"[project]/src/components/map/ThreatMapPanel.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ThreatMapPanel": (()=>ThreatMapPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/map/Globe3D.tsx [app-ssr] (ecmascript)");
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
function ThreatMapPanel({ points }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Client-only — Math.random() for dst offsets
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const pts = points.map((p)=>({
                srcLat: p.lat,
                srcLng: p.lng,
                dstLat: p.lat + (Math.random() - 0.5) * 50,
                dstLng: p.lng + (Math.random() - 0.5) * 80,
                type: p.type,
                severity: p.severity,
                label: p.label
            }));
        setDisplay(pts);
        setCount(pts.length);
    }, [
        points
    ]);
    // Poll API every 60s
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const iv = setInterval(async ()=>{
            try {
                const r = await fetch('/api/v1/threat?limit=60');
                if (!r.ok) return;
                const d = await r.json();
                if (!Array.isArray(d) || !d.length) return;
                const next = 'srcLat' in d[0] ? d.map((e)=>({
                        srcLat: e.srcLat,
                        srcLng: e.srcLng,
                        dstLat: e.dstLat,
                        dstLng: e.dstLng,
                        type: e.type,
                        severity: e.severity,
                        label: e.details ?? ''
                    })) : d.map((p)=>({
                        srcLat: p.lat,
                        srcLng: p.lng,
                        dstLat: p.lat + (Math.random() - 0.5) * 50,
                        dstLng: p.lng + (Math.random() - 0.5) * 80,
                        type: p.type,
                        severity: p.severity,
                        label: p.label
                    }));
                setDisplay(next);
                setCount(next.length);
            } catch  {}
        }, 60_000);
        return ()=>clearInterval(iv);
    }, []);
    const grouped = display.reduce((a, p)=>{
        a[p.type] = (a[p.type] ?? 0) + 1;
        return a;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden animate-fin",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot live-dot-red"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[11px] tracking-widest uppercase",
                                style: {
                                    color: '#00ffaa'
                                },
                                children: "Global Threat Map"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-slate-600 ml-1",
                                children: [
                                    "— ",
                                    count,
                                    " OTX events"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 58,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[9px] text-slate-600 hidden sm:block",
                                children: "drag to rotate"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://otx.alienvault.com",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "font-mono text-[9px] text-slate-600 hover:text-slate-400 transition-colors hidden sm:block",
                                children: "AlienVault OTX ↗"
                            }, void 0, false, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Globe3D"], {
                        points: display,
                        height: 400
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3 flex gap-1.5 flex-wrap max-w-[60%]",
                        children: Object.entries(grouped).slice(0, 4).map(([t, n])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[9px] px-2 py-[3px] rounded-md",
                                style: {
                                    background: 'rgba(0,0,0,0.65)',
                                    border: `1px solid ${TYPE_COLOR[t] ?? '#64748b'}55`,
                                    color: TYPE_COLOR[t] ?? '#64748b'
                                },
                                children: [
                                    t,
                                    " ",
                                    n
                                ]
                            }, t, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 left-3 flex gap-2 flex-wrap",
                        children: Object.entries(TYPE_COLOR).map(([t, c])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: c,
                                            boxShadow: `0 0 5px ${c}`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[9px] text-slate-500 hidden sm:block",
                                        children: t
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, t, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn),
    "cvssBg": (()=>cvssBg),
    "getAlias": (()=>getAlias),
    "slugify": (()=>slugify),
    "timeAgo": (()=>timeAgo),
    "wilsonScore": (()=>wilsonScore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
function cn(...i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(i);
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
    if ("TURBOPACK compile-time truthy", 1) return 'ghost_x91';
    "TURBOPACK unreachable";
    let a;
}
}}),
"[project]/src/components/exploit/ExploitGrid.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ExploitGrid": (()=>ExploitGrid)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
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
    const [votes, setVotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [voted, setVoted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden animate-float-in-d3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] tracking-widest text-accent uppercase",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            exploits.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 text-center font-mono text-[11px] text-slate-600",
                children: [
                    "No exploits yet. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2 p-3",
                children: exploits.map((ex)=>{
                    const upvotes = votes[ex.id] ?? ex.upvotes;
                    const isVoted = voted[ex.id];
                    const score = ex.dnaRisk ?? null;
                    const typeCls = TYPE_CLS[ex.type] ?? 'bg-slate-500/15 text-slate-400 border-slate-500/25';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/exploits/${ex.id}`,
                        className: "group relative p-3.5 rounded-xl border border-white/[0.06] hover:border-accent/20 transition-all duration-200 hover:-translate-y-0.5 block overflow-hidden",
                        style: {
                            background: 'rgba(255,255,255,0.025)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between mb-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1.5 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `font-mono text-[9px] px-1.5 py-[2px] rounded border ${typeCls}`,
                                                        children: ex.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, this),
                                                    ex.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] px-1.5 py-[2px] rounded border bg-accent/8 text-accent border-accent/20",
                                                        children: "✓ VERIFIED"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[13px] font-bold text-slate-100 mb-1 leading-snug line-clamp-2",
                                        children: ex.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[11px] text-slate-500 leading-relaxed mb-2.5 line-clamp-2",
                                        children: ex.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 flex-wrap",
                                        children: [
                                            score !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-mono text-[10px] font-bold px-1.5 py-[2px] rounded border ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cvssBg"])(score)}`,
                                                children: [
                                                    "RISK ",
                                                    score.toFixed(1)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 126,
                                                columnNumber: 21
                                            }, this),
                                            ex.cveId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] px-1.5 py-[2px] rounded border bg-purple-500/10 text-purple-400 border-purple-500/20",
                                                children: ex.cveId
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/exploit/ExploitGrid.tsx",
                                                lineNumber: 131,
                                                columnNumber: 21
                                            }, this),
                                            ex._count && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] text-slate-700 ml-auto",
                                                children: [
                                                    ex.authorAlias,
                                                    " · ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timeAgo"])(ex.createdAt)
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
}}),
"[project]/src/components/ai/AIPanel.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AIPanel": (()=>AIPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function AIPanel() {
    const [msgs, setMsgs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: 'ai',
            text: 'Ask me about any CVE, exploit technique, or security concept. I explain with context from real threat data.'
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: "🤖"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px] tracking-widest text-accent uppercase",
                        children: "AI Assistant"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2.5 space-y-2 overflow-y-auto",
                style: {
                    maxHeight: '180px',
                    scrollbarWidth: 'thin'
                },
                children: [
                    msgs.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `font-mono text-[9px] uppercase mb-0.5 tracking-wider ${m.role === 'ai' ? 'text-accent' : 'text-slate-500'}`,
                                    children: m.role === 'ai' ? 'XCLOAK AI' : 'YOU'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ai/AIPanel.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-accent font-mono text-[11px] animate-pulse",
                        children: "Thinking..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ai/AIPanel.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 p-2.5 border-t border-white/[0.06]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
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

};

//# sourceMappingURL=_48bc78._.js.map