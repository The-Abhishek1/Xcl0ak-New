(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_a9010a._.js", {

"[project]/src/components/map/Globe3D.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Globe3D": (()=>Globe3D),
    "TYPE_COLOR": (()=>TYPE_COLOR)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// src/components/map/Globe3D.tsx
// World-Monitor-style 3D globe — Canvas2D + orthographic projection
// Real country borders from naturalearth GeoJSON, animated threat arcs
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
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
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const st = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
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
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const visible = (activeLayers?.size ? points.filter((p)=>activeLayers.has(p.type)) : points).filter((p)=>p && typeof p.srcLat === 'number');
    // ── Fetch real country GeoJSON ─────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
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
        }
    }["Globe3D.useEffect"], []);
    // ── Draw ──────────────────────────────────────────────────────────────────
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Globe3D.useCallback[draw]": ()=>{
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
        }
    }["Globe3D.useCallback[draw]"], [
        loaded,
        visible
    ]);
    // ── Render loop ────────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            let id = 0;
            const loop = {
                "Globe3D.useEffect.loop": ()=>{
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
                }
            }["Globe3D.useEffect.loop"];
            id = requestAnimationFrame(loop);
            return ({
                "Globe3D.useEffect": ()=>cancelAnimationFrame(id)
            })["Globe3D.useEffect"];
        }
    }["Globe3D.useEffect"], [
        draw
    ]);
    // ── Mouse / touch ─────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const s = st.current;
            const down = {
                "Globe3D.useEffect.down": (cx, cy)=>{
                    s.dragging = true;
                    s.lx = cx;
                    s.ly = cy;
                    canvas.style.cursor = 'grabbing';
                }
            }["Globe3D.useEffect.down"];
            const up = {
                "Globe3D.useEffect.up": ()=>{
                    s.dragging = false;
                    canvas.style.cursor = 'grab';
                }
            }["Globe3D.useEffect.up"];
            const move = {
                "Globe3D.useEffect.move": (cx, cy)=>{
                    if (!s.dragging) return;
                    s.velY = (cx - s.lx) * 0.007;
                    s.velX = (cy - s.ly) * 0.005;
                    s.rotY += s.velY;
                    s.rotX += s.velX;
                    s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX));
                    s.lx = cx;
                    s.ly = cy;
                }
            }["Globe3D.useEffect.move"];
            canvas.style.cursor = 'grab';
            canvas.addEventListener('mousedown', {
                "Globe3D.useEffect": (e)=>down(e.clientX, e.clientY)
            }["Globe3D.useEffect"]);
            canvas.addEventListener('touchstart', {
                "Globe3D.useEffect": (e)=>down(e.touches[0].clientX, e.touches[0].clientY)
            }["Globe3D.useEffect"], {
                passive: true
            });
            window.addEventListener('mouseup', up);
            window.addEventListener('touchend', up);
            window.addEventListener('mousemove', {
                "Globe3D.useEffect": (e)=>move(e.clientX, e.clientY)
            }["Globe3D.useEffect"]);
            canvas.addEventListener('touchmove', {
                "Globe3D.useEffect": (e)=>{
                    e.preventDefault();
                    move(e.touches[0].clientX, e.touches[0].clientY);
                }
            }["Globe3D.useEffect"], {
                passive: false
            });
            return ({
                "Globe3D.useEffect": ()=>{
                    window.removeEventListener('mouseup', up);
                    window.removeEventListener('touchend', up);
                }
            })["Globe3D.useEffect"];
        }
    }["Globe3D.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full",
        style: {
            background: 'radial-gradient(ellipse at 50% 50%, #030f1e 0%, #010912 100%)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
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
            !loaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-7 h-7 border-2 border-accent/30 border-t-accent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 419,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_s(Globe3D, "y1GcYfIdhyo+iv04XwRrHxnWV74=");
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
const ALL_TYPES = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"]);
_c = ALL_TYPES;
function ThreatMapPage() {
    _s();
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pulses, setPulses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        critical: 0,
        cveIds: []
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeLayers, setActiveLayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set(ALL_TYPES));
    const [globeKey, setGlobeKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [layerOpen, setLayerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreatMapPage.useEffect": ()=>{
            const check = {
                "ThreatMapPage.useEffect.check": ()=>setIsMobile(window.innerWidth < 768)
            }["ThreatMapPage.useEffect.check"];
            check();
            window.addEventListener('resize', check);
            return ({
                "ThreatMapPage.useEffect": ()=>window.removeEventListener('resize', check)
            })["ThreatMapPage.useEffect"];
        }
    }["ThreatMapPage.useEffect"], []);
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
            const evArr = Array.isArray(evData) ? evData : [];
            const pts = evArr.map((ev)=>{
                if ('srcLat' in ev) return {
                    srcLat: ev.srcLat,
                    srcLng: ev.srcLng,
                    dstLat: ev.dstLat,
                    dstLng: ev.dstLng,
                    type: ev.type,
                    severity: ev.severity,
                    label: ev.details ?? ''
                };
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
    const typeCounts = points.reduce((a, p)=>{
        a[p.type] = (a[p.type] ?? 0) + 1;
        return a;
    }, {});
    const visiblePts = activeLayers.size > 0 ? points.filter((p)=>activeLayers.has(p.type)) : points;
    function toggleLayer(type) {
        setActiveLayers((prev)=>{
            const n = new Set(prev);
            n.has(type) ? n.delete(type) : n.add(type);
            setGlobeKey((k)=>k + 1);
            return n;
        });
    }
    function toggleAll() {
        setActiveLayers((prev)=>{
            const n = prev.size === ALL_TYPES.length ? new Set() : new Set(ALL_TYPES);
            setGlobeKey((k)=>k + 1);
            return n;
        });
    }
    const LayerPanel = ({ compact = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                height: compact ? 'auto' : '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '8px 12px 6px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Space Mono',monospace",
                            fontSize: '9px',
                            letterSpacing: '0.15em',
                            color: '#475569',
                            textTransform: 'uppercase'
                        },
                        children: "THREAT TYPES"
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 67,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: compact ? undefined : 1,
                        overflowY: 'auto',
                        padding: '4px 0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleAll,
                            style: {
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '7px 12px',
                                background: activeLayers.size === ALL_TYPES.length ? 'rgba(0,255,170,0.06)' : 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        color: activeLayers.size === ALL_TYPES.length ? '#00ffaa' : '#94a3b8'
                                    },
                                    children: [
                                        "ALL (",
                                        points.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 11
                                }, this),
                                activeLayers.size === ALL_TYPES.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: '7px',
                                        height: '7px',
                                        borderRadius: '50%',
                                        background: '#00ffaa',
                                        display: 'inline-block'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 71,
                            columnNumber: 9
                        }, this),
                        compact ? /* Compact: horizontal chips for mobile dropdown */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                                padding: '8px 12px'
                            },
                            children: ALL_TYPES.map((type)=>{
                                const count = typeCounts[type] ?? 0, active = activeLayers.has(type), color = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>toggleLayer(type),
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: active ? color + '18' : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${active ? color + '40' : 'rgba(255,255,255,0.08)'}`,
                                        cursor: 'pointer'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '2px',
                                                background: active ? color : '#334155',
                                                flexShrink: 0
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Space Mono',monospace",
                                                fontSize: '10px',
                                                color: active ? '#e2e8f0' : '#64748b'
                                            },
                                            children: type
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this),
                                        count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Space Mono',monospace",
                                                fontSize: '9px',
                                                color: active ? color : '#334155'
                                            },
                                            children: [
                                                "(",
                                                count,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 84,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, type, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this) : /* Full: vertical list for desktop */ ALL_TYPES.map((type)=>{
                            const count = typeCounts[type] ?? 0, active = activeLayers.has(type), color = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>toggleLayer(type),
                                style: {
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '9px',
                                    padding: '6px 12px',
                                    background: active ? color + '10' : 'transparent',
                                    border: 'none',
                                    cursor: 'pointer'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '2px',
                                            flexShrink: 0,
                                            background: active ? color : '#1e293b',
                                            boxShadow: active ? `0 0 5px ${color}60` : 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            flex: 1,
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '11px',
                                            textAlign: 'left',
                                            color: active ? '#e2e8f0' : '#64748b'
                                        },
                                        children: type
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '10px',
                                            color: active ? color : '#334155'
                                        },
                                        children: [
                                            "(",
                                            count,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 70,
                    columnNumber: 7
                }, this),
                !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Space Mono',monospace",
                                fontSize: '9px',
                                letterSpacing: '0.12em',
                                color: '#475569',
                                textTransform: 'uppercase',
                                marginBottom: '8px'
                            },
                            children: "SEVERITY"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this),
                        [
                            [
                                'Critical',
                                '#ff3a5c'
                            ],
                            [
                                'High',
                                '#ff8c42'
                            ],
                            [
                                'Medium',
                                '#ffd700'
                            ],
                            [
                                'Low',
                                '#4a7fa5'
                            ]
                        ].map(([l, c])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: c,
                                            flexShrink: 0
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '10px',
                                            color: '#475569'
                                        },
                                        children: l
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/threat-map/page.tsx",
            lineNumber: 66,
            columnNumber: 5
        }, this);
    const OTXFeed = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                !pulses.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '20px',
                        textAlign: 'center',
                        fontFamily: "'Space Mono',monospace",
                        fontSize: '10px',
                        color: '#334155'
                    },
                    children: "Loading OTX..."
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 119,
                    columnNumber: 26
                }, this),
                pulses.map((p)=>{
                    const text = [
                        ...p.tags ?? [],
                        p.adversary ?? ''
                    ].join(' ').toLowerCase();
                    const type = /ransomware/.test(text) ? 'Ransomware' : /apt/.test(text) ? 'APT' : /phish/.test(text) ? 'Phishing' : /ddos/.test(text) ? 'DDoS' : /malware/.test(text) ? 'Malware' : 'Threat';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `https://otx.alienvault.com/pulse/${p.id}`,
                        target: "_blank",
                        rel: "noreferrer",
                        style: {
                            display: 'block',
                            padding: '9px 12px',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            textDecoration: 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    color: '#cbd5e1',
                                    lineHeight: 1.4,
                                    marginBottom: '5px',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                },
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '8px',
                                            padding: '1px 5px',
                                            borderRadius: '3px',
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type] + '18',
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type],
                                            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type]}30`
                                        },
                                        children: type.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    p.targeted_countries?.slice(0, 2).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontFamily: "'Space Mono',monospace",
                                                fontSize: '8px',
                                                color: '#475569'
                                            },
                                            children: c
                                        }, c, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 56
                                        }, this)),
                                    p.adversary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '8px',
                                            color: '#fb923c'
                                        },
                                        children: p.adversary
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '8px',
                                            color: '#334155',
                                            marginLeft: 'auto'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["timeAgo"])(p.modified ?? p.created)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this)
                        ]
                    }, p.id, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this);
                })
            ]
        }, void 0, true);
    /* ── MOBILE: vertical stack ─────────────────────────────────── */ if (isMobile) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                background: '#020608'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 12px',
                        height: '40px',
                        background: 'rgba(3,5,10,0.92)',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        position: 'sticky',
                        top: '52px',
                        zIndex: 10
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "live-dot live-dot-red"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '10px',
                                        fontWeight: 700,
                                        color: '#00ffaa'
                                    },
                                    children: "GLOBAL SITUATION"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '10px',
                                        color: '#475569'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#00ffaa'
                                            },
                                            children: visiblePts.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 151,
                                            columnNumber: 15
                                        }, this),
                                        "/",
                                        points.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLayerOpen((o)=>!o),
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '9px',
                                        padding: '4px 8px',
                                        borderRadius: '5px',
                                        border: `1px solid ${layerOpen ? 'rgba(0,255,170,0.3)' : 'rgba(255,255,255,0.1)'}`,
                                        background: layerOpen ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.03)',
                                        color: layerOpen ? '#00ffaa' : '#64748b',
                                        cursor: 'pointer'
                                    },
                                    children: "⚡ Layers"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: load,
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        padding: '4px 8px',
                                        borderRadius: '5px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: '#64748b',
                                        cursor: 'pointer'
                                    },
                                    children: loading ? '⟳' : '↻'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                layerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(6,10,20,0.97)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        position: 'sticky',
                        top: '92px',
                        zIndex: 9
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerPanel, {
                        compact: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 163,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 162,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '100%',
                        height: '320px',
                        position: 'relative',
                        background: '#020608'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe3D"], {
                            points: points,
                            activeLayers: activeLayers
                        }, globeKey, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                bottom: '8px',
                                right: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                alignItems: 'flex-end'
                            },
                            children: [
                                {
                                    l: 'Events',
                                    v: points.length,
                                    c: '#00ffaa'
                                },
                                {
                                    l: 'Visible',
                                    v: visiblePts.length,
                                    c: '#00aaff'
                                }
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '9px',
                                        padding: '3px 8px',
                                        borderRadius: '6px',
                                        background: 'rgba(0,0,0,0.8)',
                                        border: `1px solid ${s.c}22`,
                                        display: 'flex',
                                        gap: '6px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: s.c,
                                                fontWeight: 700
                                            },
                                            children: s.v
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#475569'
                                            },
                                            children: s.l
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 70
                                        }, this)
                                    ]
                                }, s.l, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(5,8,15,0.9)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "live-dot"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Space Mono',monospace",
                                fontSize: '10px',
                                color: '#00ffaa',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            },
                            children: "OTX Pulses"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://otx.alienvault.com",
                            target: "_blank",
                            rel: "noreferrer",
                            style: {
                                marginLeft: 'auto',
                                fontFamily: "'Space Mono',monospace",
                                fontSize: '9px',
                                color: '#475569',
                                textDecoration: 'none'
                            },
                            children: "OTX ↗"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(5,8,15,0.8)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                stats.cveIds?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(5,8,15,0.8)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Space Mono',monospace",
                                fontSize: '9px',
                                color: '#475569',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '6px'
                            },
                            children: "CVEs IN OTX"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px'
                            },
                            children: stats.cveIds.slice(0, 6).map((cve)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `/cve/${encodeURIComponent(cve)}`,
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '8px',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        background: 'rgba(167,139,250,0.1)',
                                        color: '#a78bfa',
                                        border: '1px solid rgba(167,139,250,0.25)',
                                        textDecoration: 'none'
                                    },
                                    children: cve
                                }, cve, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 194,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/threat-map/page.tsx",
            lineNumber: 142,
            columnNumber: 7
        }, this);
    }
    /* ── DESKTOP: 3-column fixed layout ─────────────────────────── */ // Desktop: fixed layout accounting for sidebar
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: '52px',
            left: '220px',
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 12px',
                    height: '40px',
                    flexShrink: 0,
                    background: 'rgba(3,5,10,0.92)',
                    borderBottom: '1px solid rgba(255,255,255,0.07)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot live-dot-red"
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#00ffaa',
                                    letterSpacing: '0.1em'
                                },
                                children: "GLOBAL SITUATION"
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '10px',
                                    color: '#475569'
                                },
                                children: new Date().toUTCString().replace('GMT', 'UTC')
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: visiblePts.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#475569'
                                        },
                                        children: [
                                            " / ",
                                            points.length,
                                            " events"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 71
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: load,
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '11px',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: 'rgba(255,255,255,0.03)',
                                    color: '#64748b',
                                    cursor: 'pointer'
                                },
                                children: loading ? '⟳' : '↻'
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '185px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'rgba(5,8,15,0.88)',
                            borderRight: '1px solid rgba(255,255,255,0.06)',
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerPanel, {}, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0,
                            position: 'relative',
                            background: '#020608',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Globe3D"], {
                                points: points,
                                activeLayers: activeLayers
                            }, globeKey, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: 'absolute',
                                    bottom: '12px',
                                    right: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '5px',
                                    alignItems: 'flex-end'
                                },
                                children: [
                                    {
                                        l: 'Events',
                                        v: points.length,
                                        c: '#00ffaa'
                                    },
                                    {
                                        l: 'Critical',
                                        v: points.filter((p)=>p.severity >= 4).length,
                                        c: '#ff3a5c'
                                    },
                                    {
                                        l: 'Visible',
                                        v: visiblePts.length,
                                        c: '#00aaff'
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '10px',
                                            padding: '4px 10px',
                                            borderRadius: '7px',
                                            background: 'rgba(0,0,0,0.75)',
                                            border: `1px solid ${s.c}22`,
                                            display: 'flex',
                                            gap: '7px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: s.c,
                                                    fontWeight: 700
                                                },
                                                children: s.v
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#475569'
                                                },
                                                children: s.l
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, s.l, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 240,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '255px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'rgba(5,8,15,0.88)',
                            borderLeft: '1px solid rgba(255,255,255,0.06)',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '9px 12px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "live-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '10px',
                                            color: '#00ffaa',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase'
                                        },
                                        children: "OTX Pulses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "https://otx.alienvault.com",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        style: {
                                            marginLeft: 'auto',
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '9px',
                                            color: '#475569',
                                            textDecoration: 'none'
                                        },
                                        children: "OTX ↗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflowY: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 52
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            stats.cveIds?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)',
                                    padding: '9px 12px',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '9px',
                                            color: '#475569',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                            marginBottom: '6px'
                                        },
                                        children: "CVEs IN OTX"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '4px'
                                        },
                                        children: stats.cveIds.slice(0, 6).map((cve)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `/cve/${encodeURIComponent(cve)}`,
                                                style: {
                                                    fontFamily: "'Space Mono',monospace",
                                                    fontSize: '8px',
                                                    padding: '2px 6px',
                                                    borderRadius: '4px',
                                                    background: 'rgba(167,139,250,0.1)',
                                                    color: '#a78bfa',
                                                    border: '1px solid rgba(167,139,250,0.25)',
                                                    textDecoration: 'none'
                                                },
                                                children: cve
                                            }, cve, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/threat-map/page.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(ThreatMapPage, "/f5wWZ/jNSnVQ+yldIMiKUQl3vg=");
_c1 = ThreatMapPage;
var _c, _c1;
__turbopack_refresh__.register(_c, "ALL_TYPES");
__turbopack_refresh__.register(_c1, "ThreatMapPage");
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