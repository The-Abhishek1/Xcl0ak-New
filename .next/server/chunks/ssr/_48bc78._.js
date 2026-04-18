module.exports = {

"[project]/src/components/map/Globe3D.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Globe3D": (()=>Globe3D),
    "TYPE_COLOR": (()=>TYPE_COLOR)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// src/components/map/Globe3D.tsx
// World-Monitor-style 3D globe — Canvas2D + orthographic projection
// Real country borders from naturalearth GeoJSON, animated threat arcs
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const TYPE_COLOR = {
    Ransomware: '#ff3a5c',
    APT: '#c084fc',
    Phishing: '#fb923c',
    DDoS: '#facc15',
    Malware: '#f87171',
    Scanner: '#38bdf8',
    Threat: '#94a3b8',
    RAT: '#f472b6',
    WORM: '#fb923c'
};
const tc = (t)=>TYPE_COLOR[t] ?? '#94a3b8';
const DEG = Math.PI / 180;
// ── Project lat/lng → canvas [x,y] with rotation ──────────────────────────
function project(lat, lng, rotX, rotY, cx, cy, R) {
    const phi = lat * DEG, lam = lng * DEG;
    let vx = Math.cos(phi) * Math.sin(lam);
    let vy = Math.sin(phi);
    let vz = Math.cos(phi) * Math.cos(lam);
    // Rotate Y (spin)
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const vx1 = vx * cosY - vz * sinY;
    const vz1 = vx * sinY + vz * cosY;
    // Rotate X (tilt)
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const vy2 = vy * cosX - vz1 * sinX;
    const vz2 = vy * sinX + vz1 * cosX;
    if (vz2 < 0) return null // back of globe
    ;
    return [
        cx + vx1 * R,
        cy - vy2 * R
    ];
}
// ── Same but returns raw components (for lifted arcs) ─────────────────────
function projectRaw(lat, lng, rotX, rotY, cx, cy, effR) {
    const phi = lat * DEG, lam = lng * DEG;
    let vx = Math.cos(phi) * Math.sin(lam);
    let vy = Math.sin(phi);
    let vz = Math.cos(phi) * Math.cos(lam);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const vx1 = vx * cosY - vz * sinY;
    const vz1 = vx * sinY + vz * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const vy2 = vy * cosX - vz1 * sinX;
    const vz2 = vy * sinX + vz1 * cosX;
    return {
        pt: [
            cx + vx1 * effR,
            cy - vy2 * effR
        ],
        vis: vz2 >= -0.04
    };
}
// ── Slerp great-circle path ─────────────────────────────────────────────────
function greatCircle(lat1, lng1, lat2, lng2, steps) {
    const p1 = [
        lat1 * DEG,
        lng1 * DEG
    ];
    const p2 = [
        lat2 * DEG,
        lng2 * DEG
    ];
    const v1 = [
        Math.cos(p1[0]) * Math.cos(p1[1]),
        Math.sin(p1[0]),
        Math.cos(p1[0]) * Math.sin(p1[1])
    ];
    const v2 = [
        Math.cos(p2[0]) * Math.cos(p2[1]),
        Math.sin(p2[0]),
        Math.cos(p2[0]) * Math.sin(p2[1])
    ];
    const dot = Math.min(1, Math.max(-1, v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]));
    const omega = Math.acos(dot);
    if (omega < 0.001) return [
        [
            lat1,
            lng1
        ],
        [
            lat2,
            lng2
        ]
    ];
    const out = [];
    for(let i = 0; i <= steps; i++){
        const t = i / steps;
        const sa = Math.sin((1 - t) * omega) / Math.sin(omega);
        const sb = Math.sin(t * omega) / Math.sin(omega);
        const vx = sa * v1[0] + sb * v2[0];
        const vy = sa * v1[1] + sb * v2[1];
        const vz = sa * v1[2] + sb * v2[2];
        const lat = Math.atan2(vy, Math.sqrt(vx * vx + vz * vz)) / DEG;
        const lng = Math.atan2(vz, vx) / DEG;
        out.push([
            lat,
            lng
        ]);
    }
    return out;
}
// ── Draw one GeoJSON geometry onto the globe ─────────────────────────────────
function drawGeometry(ctx, geom, rotX, rotY, cx, cy, R, fill, stroke, lw) {
    const polys = geom.type === 'Polygon' ? geom.coordinates : geom.type === 'MultiPolygon' ? geom.coordinates.flat() : [];
    for (const ring of polys){
        ctx.beginPath();
        let prevVis = false;
        for(let i = 0; i < ring.length; i++){
            const [lng, lat] = ring[i];
            const pt = project(lat, lng, rotX, rotY, cx, cy, R);
            if (pt) {
                if (!prevVis) ctx.moveTo(pt[0], pt[1]);
                else ctx.lineTo(pt[0], pt[1]);
                prevVis = true;
            } else {
                prevVis = false;
            }
        }
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw;
        ctx.stroke();
    }
}
function Globe3D({ points, height = 420, activeLayers }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const st = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        rotX: 0.18,
        rotY: 0.5,
        velX: 0,
        velY: 0.0028,
        dragging: false,
        lx: 0,
        ly: 0,
        geo: null,
        arcT: 0
    });
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const visible = (activeLayers?.size ? points.filter((p)=>activeLayers.has(p.type)) : points).filter((p)=>p && typeof p.srcLat === 'number');
    // ── Fetch real country GeoJSON ─────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // ne_110m = naturalearth 110m resolution — small file, exact country borders
        const URLS = [
            'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json',
            'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
            'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
        ];
        async function tryLoad() {
            for (const url of URLS){
                try {
                    const r = await fetch(url);
                    const raw = await r.json();
                    // world-atlas returns TopoJSON — we need GeoJSON
                    if (raw.type === 'Topology' && raw.objects) {
                        continue;
                    }
                    // Validate it looks like GeoJSON FeatureCollection
                    if (raw.type === 'FeatureCollection' && Array.isArray(raw.features)) {
                        st.current.geo = raw;
                        setLoaded(true);
                        return;
                    }
                } catch  {}
            }
            // Even if all URLs fail, mark loaded so globe renders without countries
            setLoaded(true);
        }
        tryLoad();
    }, []);
    // ── Draw ──────────────────────────────────────────────────────────────────
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dpr = window.devicePixelRatio || 1;
        const W = canvas.clientWidth;
        const H = canvas.clientHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
        const s = st.current;
        const cx = W / 2, cy = H / 2;
        const R = Math.min(W, H) * 0.44;
        ctx.clearRect(0, 0, W, H);
        // ── Atmosphere halo ──────────────────────────────────────────────────────
        const halo = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.20);
        halo.addColorStop(0, 'rgba(0,200,120,0.00)');
        halo.addColorStop(0.55, 'rgba(0,220,140,0.06)');
        halo.addColorStop(1, 'rgba(0,255,170,0.00)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.20, 0, Math.PI * 2);
        ctx.fill();
        // ── Ocean ────────────────────────────────────────────────────────────────
        const ocean = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.25, 0, cx, cy, R);
        ocean.addColorStop(0, '#0d2d4a');
        ocean.addColorStop(0.6, '#081e33');
        ocean.addColorStop(1, '#040f1c');
        ctx.fillStyle = ocean;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
        // ── Clip to globe ────────────────────────────────────────────────────────
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();
        // ── Grid lines ───────────────────────────────────────────────────────────
        ctx.strokeStyle = 'rgba(0,180,110,0.10)';
        ctx.lineWidth = 0.5;
        for(let lat = -80; lat <= 80; lat += 20){
            ctx.beginPath();
            let f = true;
            for(let lng = -180; lng <= 180; lng += 2){
                const p = project(lat, lng, s.rotX, s.rotY, cx, cy, R);
                if (!p) {
                    f = true;
                    continue;
                }
                f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
                f = false;
            }
            ctx.stroke();
        }
        for(let lng = -180; lng < 180; lng += 20){
            ctx.beginPath();
            let f = true;
            for(let lat = -88; lat <= 88; lat += 2){
                const p = project(lat, lng, s.rotX, s.rotY, cx, cy, R);
                if (!p) {
                    f = true;
                    continue;
                }
                f ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
                f = false;
            }
            ctx.stroke();
        }
        // ── Countries ────────────────────────────────────────────────────────────
        if (s.geo?.features) {
            for (const feat of s.geo.features){
                if (!feat.geometry) continue;
                const name = (feat.properties?.NAME ?? feat.properties?.name ?? feat.properties?.ADMIN ?? '').toLowerCase();
                // Threat-origin countries slightly brighter
                const isThreat = /russia|china|iran|north.korea|dprk/.test(name);
                const isWest = /united states|uk|united kingdom|germany|france|japan|australia|canada/.test(name);
                const fill = isThreat ? 'rgba(30,110,65,0.88)' : isWest ? 'rgba(14,88,52,0.82)' : 'rgba(18,95,56,0.80)';
                const stroke = isThreat ? 'rgba(0,255,130,0.75)' : 'rgba(0,240,130,0.58)';
                drawGeometry(ctx, feat.geometry, s.rotX, s.rotY, cx, cy, R, fill, stroke, 0.65);
            }
        }
        // ── Equator line ─────────────────────────────────────────────────────────
        ctx.strokeStyle = 'rgba(0,255,150,0.22)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        let feq = true;
        for(let lng = -180; lng <= 180; lng += 1){
            const p = project(0, lng, s.rotX, s.rotY, cx, cy, R);
            if (!p) {
                feq = true;
                continue;
            }
            feq ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
            feq = false;
        }
        ctx.stroke();
        // ── Threat arcs ──────────────────────────────────────────────────────────
        s.arcT = (s.arcT + 0.006) % 1;
        for (const pt of visible){
            const color = tc(pt.type);
            const isCrit = pt.severity >= 4;
            const STEPS = 80;
            const gc = greatCircle(pt.srcLat, pt.srcLng, pt.dstLat, pt.dstLng, STEPS);
            // Draw arc with arc-lift (arcs curve above the surface)
            let prevPt = null;
            let prevVis = false;
            for(let i = 0; i < gc.length; i++){
                const [lat, lng] = gc[i];
                const t = i / (STEPS - 1);
                const lift = 1 + Math.sin(t * Math.PI) * (isCrit ? 0.14 : 0.09);
                const { pt: px, vis } = projectRaw(lat, lng, s.rotX, s.rotY, cx, cy, R * lift);
                if (vis && prevPt && prevVis) {
                    const tMid = (i - 0.5) / STEPS;
                    const diff = Math.abs(tMid - s.arcT);
                    const inPulse = diff < 0.15 || 1 - diff < 0.15;
                    // Glow
                    ctx.beginPath();
                    ctx.moveTo(prevPt[0], prevPt[1]);
                    ctx.lineTo(px[0], px[1]);
                    ctx.strokeStyle = color + '55';
                    ctx.lineWidth = isCrit ? 6 : 4;
                    ctx.stroke();
                    // Core line
                    ctx.beginPath();
                    ctx.moveTo(prevPt[0], prevPt[1]);
                    ctx.lineTo(px[0], px[1]);
                    if (inPulse) {
                        const d = 1 - Math.min(diff, 1 - diff) / 0.15;
                        ctx.strokeStyle = `rgba(255,255,255,${0.55 + d * 0.45})`;
                        ctx.lineWidth = isCrit ? 2.8 : 2.0;
                    } else {
                        ctx.strokeStyle = color + 'dd';
                        ctx.lineWidth = isCrit ? 1.8 : 1.2;
                    }
                    ctx.stroke();
                }
                prevPt = px;
                prevVis = vis;
            }
            // ── Source pulse ────────────────────────────────────────────────────────
            const src = project(pt.srcLat, pt.srcLng, s.rotX, s.rotY, cx, cy, R);
            if (src) {
                const pR = s.arcT * (isCrit ? 20 : 14);
                const alp = Math.round((1 - s.arcT) * 180).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(src[0], src[1], pR, 0, Math.PI * 2);
                ctx.strokeStyle = color + alp;
                ctx.lineWidth = 1.5;
                ctx.stroke();
                // Second ring offset by 0.5
                const pR2 = (s.arcT + 0.5) % 1 * (isCrit ? 20 : 14);
                const alp2 = Math.round((1 - (s.arcT + 0.5) % 1) * 120).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(src[0], src[1], pR2, 0, Math.PI * 2);
                ctx.strokeStyle = color + alp2;
                ctx.lineWidth = 1;
                ctx.stroke();
                // Solid dot
                ctx.beginPath();
                ctx.arc(src[0], src[1], isCrit ? 5.5 : 4, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(src[0], src[1], isCrit ? 2.2 : 1.6, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }
            // ── Destination marker ──────────────────────────────────────────────────
            const dst = project(pt.dstLat, pt.dstLng, s.rotX, s.rotY, cx, cy, R);
            if (dst) {
                ctx.beginPath();
                ctx.arc(dst[0], dst[1], isCrit ? 4.5 : 3, 0, Math.PI * 2);
                ctx.fillStyle = color + 'cc';
                ctx.fill();
                ctx.strokeStyle = '#ffffffaa';
                ctx.lineWidth = 1;
                ctx.stroke();
                // Inner white
                ctx.beginPath();
                ctx.arc(dst[0], dst[1], 1.2, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff99';
                ctx.fill();
            }
        }
        ctx.restore() // end globe clip
        ;
        // ── Rim highlight ────────────────────────────────────────────────────────
        const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
        rim.addColorStop(0, 'rgba(0,255,170,0.00)');
        rim.addColorStop(0.88, 'rgba(0,255,170,0.05)');
        rim.addColorStop(1, 'rgba(0,255,170,0.30)');
        ctx.fillStyle = rim;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
        // Specular glint
        const spec = ctx.createRadialGradient(cx - R * 0.32, cy - R * 0.32, 0, cx - R * 0.32, cy - R * 0.32, R * 0.5);
        spec.addColorStop(0, 'rgba(200,255,230,0.10)');
        spec.addColorStop(0.6, 'rgba(100,255,180,0.03)');
        spec.addColorStop(1, 'rgba(0,0,0,0.00)');
        ctx.fillStyle = spec;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
    }, [
        loaded,
        visible
    ]);
    // ── Render loop ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let id = 0;
        const loop = ()=>{
            const s = st.current;
            if (!s.dragging) {
                s.velY += (0.0028 - s.velY) * 0.025;
                s.velX *= 0.94;
                s.rotY += s.velY;
                s.rotX += s.velX;
                s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
            } else {
                s.velY *= 0.88;
                s.velX *= 0.88;
            }
            draw();
            id = requestAnimationFrame(loop);
        };
        id = requestAnimationFrame(loop);
        return ()=>cancelAnimationFrame(id);
    }, [
        draw
    ]);
    // ── Mouse / touch ─────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const s = st.current;
        const down = (cx, cy)=>{
            s.dragging = true;
            s.lx = cx;
            s.ly = cy;
            canvas.style.cursor = 'grabbing';
        };
        const up = ()=>{
            s.dragging = false;
            canvas.style.cursor = 'grab';
        };
        const move = (cx, cy)=>{
            if (!s.dragging) return;
            s.velY = (cx - s.lx) * 0.007;
            s.velX = (cy - s.ly) * 0.005;
            s.rotY += s.velY;
            s.rotX += s.velX;
            s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
            s.lx = cx;
            s.ly = cy;
        };
        canvas.style.cursor = 'grab';
        canvas.addEventListener('mousedown', (e)=>down(e.clientX, e.clientY));
        canvas.addEventListener('touchstart', (e)=>down(e.touches[0].clientX, e.touches[0].clientY), {
            passive: true
        });
        window.addEventListener('mouseup', up);
        window.addEventListener('touchend', up);
        window.addEventListener('mousemove', (e)=>move(e.clientX, e.clientY));
        canvas.addEventListener('touchmove', (e)=>{
            e.preventDefault();
            move(e.touches[0].clientX, e.touches[0].clientY);
        }, {
            passive: false
        });
        return ()=>{
            window.removeEventListener('mouseup', up);
            window.removeEventListener('touchend', up);
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full",
        style: {
            background: 'radial-gradient(ellipse at 50% 50%, #030f1e 0%, #010912 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'block'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/map/Globe3D.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-7 h-7 border-2 border-accent/30 border-t-accent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 419,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-[11px] text-accent/60",
                            children: "Loading country data..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 420,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/map/Globe3D.tsx",
                    lineNumber: 418,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/map/Globe3D.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/Globe3D.tsx",
        lineNumber: 413,
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
// src/components/map/ThreatMapPanel.tsx
// FIXED: events prop defaults to [] — never crashes when OTX key missing or API returns undefined
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
function eventsToGlobePoints(events) {
    // Defensive: filter out any entries missing required fields
    return events.filter((e)=>e && typeof e.srcLat === 'number' && typeof e.srcLng === 'number').map((e)=>({
            srcLat: e.srcLat,
            srcLng: e.srcLng,
            dstLat: e.dstLat,
            dstLng: e.dstLng,
            type: e.type ?? 'Threat',
            severity: e.severity ?? 3,
            label: e.details ?? ''
        }));
}
function ThreatMapPanel({ events = [] }) {
    const [display, setDisplay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Initialise from SSR-passed data (may be empty if no OTX key)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const safeEvents = Array.isArray(events) ? events : [];
        const pts = eventsToGlobePoints(safeEvents);
        setDisplay(pts);
        setCount(pts.length);
    }, [
        events
    ]);
    // Poll API every 60s for live updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const iv = setInterval(async ()=>{
            try {
                const r = await fetch('/api/v1/threat?limit=60');
                if (!r.ok) return;
                const data = await r.json();
                // data may be array of ThreatEvent or error object
                if (!Array.isArray(data)) return;
                const pts = eventsToGlobePoints(data);
                setDisplay(pts);
                setCount(pts.length);
            } catch  {}
        }, 60_000);
        return ()=>clearInterval(iv);
    }, []);
    const grouped = display.reduce((acc, p)=>{
        acc[p.type] = (acc[p.type] ?? 0) + 1;
        return acc;
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
                                lineNumber: 77,
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
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-slate-600 ml-1",
                                children: [
                                    "— ",
                                    count > 0 ? `${count} OTX events` : 'add OTX_API_KEY for live data'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden sm:flex items-center gap-3",
                        children: Object.entries(grouped).slice(0, 4).map(([type, n])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full",
                                        style: {
                                            background: TYPE_COLOR[type] ?? '#4a7fa5'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[9px] text-slate-600",
                                        children: [
                                            type,
                                            " (",
                                            n,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                style: {
                    height: '360px'
                },
                children: display.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-full flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-slate-600 text-4xl",
                            children: "🌐"
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                            lineNumber: 104,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[12px] text-slate-500 mb-1",
                                    children: "No threat data loaded"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[10px] text-slate-700",
                                    children: [
                                        "Add ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-accent",
                                            children: "OTX_API_KEY"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                            lineNumber: 110,
                                            columnNumber: 21
                                        }, this),
                                        " to .env.local"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[10px] text-slate-700 mt-0.5",
                                    children: "then click the SYNC button in the topbar"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                                    lineNumber: 112,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                            lineNumber: 105,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                    lineNumber: 103,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Globe3D"], {
                    points: display
                }, void 0, false, {
                    fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                    lineNumber: 118,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/ThreatMapPanel.tsx",
        lineNumber: 73,
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