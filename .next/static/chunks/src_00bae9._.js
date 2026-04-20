(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_00bae9._.js", {

"[project]/src/components/map/Globe3D.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Globe3D": (()=>Globe3D),
    "TYPE_COLOR": (()=>TYPE_COLOR)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Globe3D — v3
// Fixes:
//  1. Arc colors: each threat type gets its own distinct color
//  2. Filter: activeLayers prop changes re-render without needing key remount
//  3. Popup: rich worldmonitor-style card with icon, severity bar, coords, source link
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
const TYPE_ICON = {
    Ransomware: '🔒',
    APT: '🎯',
    Phishing: '🪝',
    DDoS: '💥',
    Malware: '☣️',
    Scanner: '🔍',
    Threat: '⚠️',
    RAT: '🐀',
    WORM: '🐛'
};
function hexRGB(hex) {
    const h = hex.replace('#', '');
    return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16)
    };
}
function rgba(hex, alpha) {
    const { r, g, b } = hexRGB(hex);
    return `rgba(${r},${g},${b},${alpha})`;
}
const tc = (t)=>TYPE_COLOR[t] ?? '#94a3b8';
const DEG = Math.PI / 180;
function project(lat, lng, rotX, rotY, cx, cy, R) {
    const phi = lat * DEG, lam = lng * DEG;
    const vx = Math.cos(phi) * Math.sin(lam), vy = Math.sin(phi), vz = Math.cos(phi) * Math.cos(lam);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const vx1 = vx * cosY - vz * sinY, vz1 = vx * sinY + vz * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const vy2 = vy * cosX - vz1 * sinX, vz2 = vy * sinX + vz1 * cosX;
    if (vz2 < 0) return null;
    return [
        cx + vx1 * R,
        cy - vy2 * R
    ];
}
function projectRaw(lat, lng, rotX, rotY, cx, cy, effR) {
    const phi = lat * DEG, lam = lng * DEG;
    const vx = Math.cos(phi) * Math.sin(lam), vy = Math.sin(phi), vz = Math.cos(phi) * Math.cos(lam);
    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const vx1 = vx * cosY - vz * sinY, vz1 = vx * sinY + vz * cosY;
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
    const vy2 = vy * cosX - vz1 * sinX, vz2 = vy * sinX + vz1 * cosX;
    return {
        pt: [
            cx + vx1 * effR,
            cy - vy2 * effR
        ],
        vis: vz2 >= -0.04
    };
}
function greatCircle(lat1, lng1, lat2, lng2, steps) {
    const p1 = [
        lat1 * DEG,
        lng1 * DEG
    ], p2 = [
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
        const t = i / steps, sa = Math.sin((1 - t) * omega) / Math.sin(omega), sb = Math.sin(t * omega) / Math.sin(omega);
        const vx = sa * v1[0] + sb * v2[0], vy = sa * v1[1] + sb * v2[1], vz = sa * v1[2] + sb * v2[2];
        out.push([
            Math.atan2(vy, Math.sqrt(vx * vx + vz * vz)) / DEG,
            Math.atan2(vz, vx) / DEG
        ]);
    }
    return out;
}
function drawGeometry(ctx, geom, rotX, rotY, cx, cy, R, fill, stroke, lw) {
    const polys = geom.type === 'Polygon' ? geom.coordinates : geom.type === 'MultiPolygon' ? geom.coordinates.flat() : [];
    for (const ring of polys){
        ctx.beginPath();
        let prev = false;
        for (const [lng, lat] of ring){
            const pt = project(lat, lng, rotX, rotY, cx, cy, R);
            if (pt) {
                prev ? ctx.lineTo(pt[0], pt[1]) : ctx.moveTo(pt[0], pt[1]);
                prev = true;
            } else prev = false;
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
        arcT: 0,
        hits: []
    });
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [popup, setPopup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const popupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layerKey = activeLayers ? [
        ...activeLayers
    ].sort().join(',') : 'all';
    const visible = (()=>{
        const base = points.filter((p)=>p && typeof p.srcLat === 'number');
        if (!activeLayers || activeLayers.size === 0) return base;
        return base.filter((p)=>activeLayers.has(p.type));
    })();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            const URLS = [
                'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
                'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'
            ];
            async function tryLoad() {
                for (const url of URLS){
                    try {
                        const raw = await (await fetch(url)).json();
                        if (raw.type === 'Topology') continue;
                        if (raw.type === 'FeatureCollection' && raw.features) {
                            st.current.geo = raw;
                            setLoaded(true);
                            return;
                        }
                    } catch  {}
                }
                setLoaded(true);
            }
            tryLoad();
        }
    }["Globe3D.useEffect"], []);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Globe3D.useCallback[draw]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const dpr = window.devicePixelRatio || 1;
            const W = canvas.clientWidth, H = canvas.clientHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.scale(dpr, dpr);
            const s = st.current;
            const cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.44;
            const hits = [];
            ctx.clearRect(0, 0, W, H);
            // Atmosphere
            const halo = ctx.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.20);
            halo.addColorStop(0, 'rgba(0,200,120,0.00)');
            halo.addColorStop(0.55, 'rgba(0,220,140,0.06)');
            halo.addColorStop(1, 'rgba(0,255,170,0.00)');
            ctx.fillStyle = halo;
            ctx.beginPath();
            ctx.arc(cx, cy, R * 1.20, 0, Math.PI * 2);
            ctx.fill();
            // Ocean
            const ocean = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.25, 0, cx, cy, R);
            ocean.addColorStop(0, '#0d2d4a');
            ocean.addColorStop(0.6, '#081e33');
            ocean.addColorStop(1, '#040f1c');
            ctx.fillStyle = ocean;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fill();
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.clip();
            // Grid
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
                ;
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
                ;
                ctx.stroke();
            }
            // Countries
            if (s.geo?.features) {
                for (const feat of s.geo.features){
                    if (!feat.geometry) continue;
                    const name = (feat.properties?.NAME ?? feat.properties?.name ?? feat.properties?.ADMIN ?? '').toLowerCase();
                    const isThreat = /russia|china|iran|north.korea|dprk/.test(name);
                    drawGeometry(ctx, feat.geometry, s.rotX, s.rotY, cx, cy, R, isThreat ? 'rgba(30,110,65,0.88)' : 'rgba(18,95,56,0.80)', isThreat ? 'rgba(0,255,130,0.75)' : 'rgba(0,240,130,0.58)', 0.65);
                }
            }
            // Equator
            ctx.strokeStyle = 'rgba(0,255,150,0.22)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            let feq = true;
            for(let lng = -180; lng <= 180; lng++){
                const p = project(0, lng, s.rotX, s.rotY, cx, cy, R);
                if (!p) {
                    feq = true;
                    continue;
                }
                feq ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
                feq = false;
            }
            ;
            ctx.stroke();
            // ── Threat arcs — each type uses its unique TYPE_COLOR ─────────────────
            s.arcT = (s.arcT + 0.006) % 1;
            for (const pt of visible){
                const color = tc(pt.type) // ← unique per-type color
                ;
                const isCrit = pt.severity >= 4;
                const STEPS = 80;
                const gc = greatCircle(pt.srcLat, pt.srcLng, pt.dstLat, pt.dstLng, STEPS);
                let prevPt = null, prevVis = false, midPt = null;
                for(let i = 0; i < gc.length; i++){
                    const [lat, lng] = gc[i], t = i / (STEPS - 1);
                    const lift = 1 + Math.sin(t * Math.PI) * (isCrit ? 0.14 : 0.09);
                    const { pt: px, vis } = projectRaw(lat, lng, s.rotX, s.rotY, cx, cy, R * lift);
                    if (Math.abs(t - 0.5) < 0.02) midPt = px;
                    if (vis && prevPt && prevVis) {
                        const tMid = (i - 0.5) / STEPS, diff = Math.abs(tMid - s.arcT);
                        const inPulse = diff < 0.15 || 1 - diff < 0.15;
                        // Glow — type color
                        ctx.beginPath();
                        ctx.moveTo(prevPt[0], prevPt[1]);
                        ctx.lineTo(px[0], px[1]);
                        ctx.strokeStyle = rgba(color, 0.28);
                        ctx.lineWidth = isCrit ? 7 : 5;
                        ctx.stroke();
                        // Core — type color
                        ctx.beginPath();
                        ctx.moveTo(prevPt[0], prevPt[1]);
                        ctx.lineTo(px[0], px[1]);
                        if (inPulse) {
                            const d = 1 - Math.min(diff, 1 - diff) / 0.15;
                            ctx.strokeStyle = `rgba(255,255,255,${0.6 + d * 0.4})`;
                            ctx.lineWidth = isCrit ? 2.5 : 1.8;
                        } else {
                            ctx.strokeStyle = rgba(color, 0.92);
                            ctx.lineWidth = isCrit ? 1.8 : 1.2 // full sat type color
                            ;
                        }
                        ctx.stroke();
                    }
                    prevPt = px;
                    prevVis = vis;
                }
                // Source dot + animated ring
                const src = project(pt.srcLat, pt.srcLng, s.rotX, s.rotY, cx, cy, R);
                if (src) {
                    const pR = s.arcT * (isCrit ? 22 : 15), alp = 1 - s.arcT;
                    ctx.beginPath();
                    ctx.arc(src[0], src[1], pR, 0, Math.PI * 2);
                    ctx.strokeStyle = rgba(color, alp);
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                    const pR2 = (s.arcT + 0.5) % 1 * (isCrit ? 22 : 15), alp2 = 1 - (s.arcT + 0.5) % 1;
                    ctx.beginPath();
                    ctx.arc(src[0], src[1], pR2, 0, Math.PI * 2);
                    ctx.strokeStyle = rgba(color, alp2 * 0.6);
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    const dotR = isCrit ? 5.5 : 4;
                    ctx.beginPath();
                    ctx.arc(src[0], src[1], dotR, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(src[0], src[1], isCrit ? 2.2 : 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                    hits.push({
                        x: src[0],
                        y: src[1],
                        r: dotR + 8,
                        pt
                    });
                }
                // Destination dot
                const dst = project(pt.dstLat, pt.dstLng, s.rotX, s.rotY, cx, cy, R);
                if (dst) {
                    ctx.beginPath();
                    ctx.arc(dst[0], dst[1], isCrit ? 4.5 : 3, 0, Math.PI * 2);
                    ctx.fillStyle = rgba(color, 0.75);
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    hits.push({
                        x: dst[0],
                        y: dst[1],
                        r: 10,
                        pt
                    });
                }
                if (midPt) hits.push({
                    x: midPt[0],
                    y: midPt[1],
                    r: 12,
                    pt
                });
            }
            s.hits = hits;
            ctx.restore();
            // Rim
            const rim = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R);
            rim.addColorStop(0, 'rgba(0,255,170,0.00)');
            rim.addColorStop(0.88, 'rgba(0,255,170,0.05)');
            rim.addColorStop(1, 'rgba(0,255,170,0.28)');
            ctx.fillStyle = rim;
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Globe3D.useCallback[draw]"], [
        loaded,
        layerKey,
        visible.length
    ]);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const onClick = {
                "Globe3D.useEffect.onClick": (e)=>{
                    const rect = canvas.getBoundingClientRect();
                    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
                    let best = null, bestDist = Infinity;
                    for (const h of st.current.hits){
                        const d = Math.hypot(h.x - mx, h.y - my);
                        if (d < h.r && d < bestDist) {
                            best = h;
                            bestDist = d;
                        }
                    }
                    if (best) {
                        const x = Math.min(mx + 12, canvas.clientWidth - 290);
                        const y = Math.max(my - 10, 8);
                        setPopup({
                            x,
                            y,
                            pt: best.pt
                        });
                        st.current.velY = 0;
                    } else setPopup(null);
                }
            }["Globe3D.useEffect.onClick"];
            canvas.addEventListener('click', onClick);
            return ({
                "Globe3D.useEffect": ()=>canvas.removeEventListener('click', onClick)
            })["Globe3D.useEffect"];
        }
    }["Globe3D.useEffect"], []);
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
    const popupColor = popup ? tc(popup.pt.type) : '#00ffaa';
    const popupIcon = popup ? TYPE_ICON[popup.pt.type] ?? '⚠️' : '';
    const sevLabel = (s)=>s >= 5 ? 'CRITICAL' : s >= 4 ? 'HIGH' : s >= 3 ? 'MEDIUM' : s >= 2 ? 'LOW' : 'INFO';
    const sevColor = (s)=>s >= 5 ? '#ff3a5c' : s >= 4 ? '#ff6b35' : s >= 3 ? '#facc15' : s >= 2 ? '#38bdf8' : '#64748b';
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
                lineNumber: 318,
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
                            lineNumber: 323,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-[11px] text-accent/60",
                            children: "Loading geo data…"
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/map/Globe3D.tsx",
                    lineNumber: 322,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/map/Globe3D.tsx",
                lineNumber: 321,
                columnNumber: 9
            }, this),
            popup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: popupRef,
                className: "absolute z-50 pointer-events-auto",
                style: {
                    left: popup.x,
                    top: popup.y,
                    width: '276px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl overflow-hidden",
                    style: {
                        background: 'rgba(4,8,18,0.97)',
                        border: `1px solid ${rgba(popupColor, 0.40)}`,
                        backdropFilter: 'blur(24px)',
                        boxShadow: `0 0 40px ${rgba(popupColor, 0.12)}, 0 8px 32px rgba(0,0,0,0.65)`
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-4 py-3",
                            style: {
                                borderBottom: `1px solid ${rgba(popupColor, 0.18)}`,
                                background: rgba(popupColor, 0.07)
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '18px'
                                            },
                                            children: popupIcon
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 345,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[11px] font-bold tracking-[0.15em]",
                                                    style: {
                                                        color: popupColor
                                                    },
                                                    children: popup.pt.type.toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[9px] text-slate-600 tracking-wider",
                                                    children: "THREAT EVENT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 346,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 344,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setPopup(null),
                                    className: "w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer",
                                    style: {
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.09)',
                                        color: '#475569'
                                    },
                                    onMouseEnter: (e)=>e.currentTarget.style.color = '#e2e8f0',
                                    onMouseLeave: (e)=>e.currentTarget.style.color = '#475569',
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '10px'
                                        },
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/Globe3D.tsx",
                                        lineNumber: 358,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 353,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 pt-3 pb-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] text-slate-600 uppercase tracking-wider",
                                            children: "Severity"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 365,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] font-bold tracking-wider",
                                            style: {
                                                color: sevColor(popup.pt.severity)
                                            },
                                            children: sevLabel(popup.pt.severity)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 366,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1.5",
                                    children: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 h-1.5 rounded-full",
                                            style: {
                                                background: i <= popup.pt.severity ? sevColor(popup.pt.severity) : 'rgba(255,255,255,0.07)',
                                                boxShadow: i <= popup.pt.severity ? `0 0 8px ${rgba(sevColor(popup.pt.severity), 0.55)}` : 'none',
                                                transition: 'all 0.2s'
                                            }
                                        }, i, false, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 372,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 370,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 363,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-4 mb-3 rounded-xl overflow-hidden",
                            style: {
                                border: '1px solid rgba(255,255,255,0.07)',
                                background: 'rgba(255,255,255,0.02)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2",
                                    style: {
                                        borderBottom: '1px solid rgba(255,255,255,0.04)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-full",
                                                    style: {
                                                        background: popupColor,
                                                        boxShadow: `0 0 6px ${popupColor}`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 388,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[9px] text-slate-600 uppercase tracking-wider w-10",
                                                    children: "Origin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 387,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[11px] text-slate-200 tabular-nums",
                                            children: [
                                                Math.abs(popup.pt.srcLat).toFixed(2),
                                                "°",
                                                popup.pt.srcLat >= 0 ? 'N' : 'S',
                                                "  ",
                                                Math.abs(popup.pt.srcLng).toFixed(2),
                                                "°",
                                                popup.pt.srcLng >= 0 ? 'E' : 'W'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center py-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[13px]",
                                        style: {
                                            color: rgba(popupColor, 0.5)
                                        },
                                        children: "↓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/Globe3D.tsx",
                                        lineNumber: 398,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 397,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 rounded-sm",
                                                    style: {
                                                        background: rgba(popupColor, 0.5),
                                                        border: `1px solid ${popupColor}`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[9px] text-slate-600 uppercase tracking-wider w-10",
                                                    children: "Target"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[11px] text-slate-200 tabular-nums",
                                            children: [
                                                Math.abs(popup.pt.dstLat).toFixed(2),
                                                "°",
                                                popup.pt.dstLat >= 0 ? 'N' : 'S',
                                                "  ",
                                                Math.abs(popup.pt.dstLng).toFixed(2),
                                                "°",
                                                popup.pt.dstLng >= 0 ? 'E' : 'W'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/map/Globe3D.tsx",
                                            lineNumber: 406,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 383,
                            columnNumber: 13
                        }, this),
                        popup.pt.label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 pb-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[9px] text-slate-600 uppercase tracking-wider mb-1.5",
                                    children: "Details"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 416,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-[10px] text-slate-400 leading-relaxed line-clamp-3",
                                    children: popup.pt.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/map/Globe3D.tsx",
                                    lineNumber: 417,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 415,
                            columnNumber: 15
                        }, this),
                        popup.pt.sourceUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 pb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: popup.pt.sourceUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "flex items-center gap-1.5 font-mono text-[10px] hover:underline",
                                style: {
                                    color: popupColor
                                },
                                children: [
                                    "View source report ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "↗"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/map/Globe3D.tsx",
                                        lineNumber: 427,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/map/Globe3D.tsx",
                                lineNumber: 424,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 423,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-px",
                            style: {
                                background: `linear-gradient(90deg,transparent,${popupColor},transparent)`,
                                opacity: 0.35
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/map/Globe3D.tsx",
                            lineNumber: 433,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/map/Globe3D.tsx",
                    lineNumber: 333,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/map/Globe3D.tsx",
                lineNumber: 331,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/map/Globe3D.tsx",
        lineNumber: 316,
        columnNumber: 5
    }, this);
}
_s(Globe3D, "HjWTmhCuAzWSVMfDzffu18lMTcE=");
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
            return n;
        });
    }
    function toggleAll() {
        setActiveLayers((prev)=>{
            const n = prev.size === ALL_TYPES.length ? new Set() : new Set(ALL_TYPES);
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
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 66,
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
                                    lineNumber: 71,
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
                                    lineNumber: 72,
                                    columnNumber: 52
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 70,
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
                                            lineNumber: 81,
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
                                            lineNumber: 82,
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
                                            lineNumber: 83,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, type, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 76,
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
                                        lineNumber: 94,
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
                                        lineNumber: 95,
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
                                        lineNumber: 96,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 69,
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
                            lineNumber: 104,
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
                                        lineNumber: 107,
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
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, l, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/threat-map/page.tsx",
            lineNumber: 65,
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
                    lineNumber: 118,
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
                                lineNumber: 125,
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
                                        lineNumber: 127,
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
                                            lineNumber: 128,
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
                                        lineNumber: 129,
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
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this)
                        ]
                    }, p.id, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 123,
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
                                    lineNumber: 145,
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
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 144,
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
                                            lineNumber: 150,
                                            columnNumber: 15
                                        }, this),
                                        "/",
                                        points.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 149,
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
                                    lineNumber: 152,
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
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 148,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 143,
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
                        lineNumber: 162,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 161,
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
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 168,
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
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#475569'
                                            },
                                            children: s.l
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/threat-map/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 70
                                        }, this)
                                    ]
                                }, s.l, true, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 167,
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
                            lineNumber: 181,
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
                            lineNumber: 182,
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
                            lineNumber: 183,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(5,8,15,0.8)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 188,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 187,
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
                            lineNumber: 194,
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
                                    lineNumber: 197,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 195,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 193,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/threat-map/page.tsx",
            lineNumber: 141,
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
                                lineNumber: 214,
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
                                lineNumber: 215,
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
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 213,
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
                                        lineNumber: 220,
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
                                        lineNumber: 220,
                                        columnNumber: 71
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 219,
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
                                lineNumber: 222,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 212,
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
                            lineNumber: 231,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 230,
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
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 236,
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
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#475569'
                                                },
                                                children: s.l
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/threat-map/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, s.l, true, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 235,
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
                                        lineNumber: 249,
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
                                        lineNumber: 250,
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
                                        lineNumber: 251,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflowY: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 253,
                                    columnNumber: 52
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 253,
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
                                        lineNumber: 256,
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
                                                lineNumber: 259,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/threat-map/page.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/threat-map/page.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(ThreatMapPage, "AKAHj9xsos5aE1h+Ig2W9mOuaHI=");
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
}]);

//# sourceMappingURL=src_00bae9._.js.map