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
// src/components/map/Globe3D.tsx
// Full rewrite: high-detail country polygons, vivid threat arcs, clear labels
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
// lat/lng → 3D unit vector
function ll2v(lat, lng, r) {
    const phi = lat * Math.PI / 180;
    const theta = lng * Math.PI / 180;
    return [
        r * Math.cos(phi) * Math.sin(theta),
        r * Math.sin(phi),
        r * Math.cos(phi) * Math.cos(theta)
    ];
}
// ─── Draw detailed world map onto canvas ──────────────────────────────────────
function drawEarth(ctx, W, H) {
    const x = (lng)=>(lng + 180) / 360 * W;
    const y = (lat)=>(90 - lat) / 180 * H;
    // Deep ocean background
    const ocean = ctx.createLinearGradient(0, 0, 0, H);
    ocean.addColorStop(0, '#020d1a');
    ocean.addColorStop(0.5, '#031422');
    ocean.addColorStop(1, '#020d1a');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, W, H);
    // Latitude / longitude grid — subtle
    ctx.strokeStyle = 'rgba(0,200,130,0.10)';
    ctx.lineWidth = 0.6;
    for(let la = -80; la <= 80; la += 20){
        ctx.beginPath();
        ctx.moveTo(0, y(la));
        ctx.lineTo(W, y(la));
        ctx.stroke();
    }
    for(let lo = -180; lo <= 180; lo += 20){
        ctx.beginPath();
        ctx.moveTo(x(lo), 0);
        ctx.lineTo(x(lo), H);
        ctx.stroke();
    }
    // ── Land polygon helper ───────────────────────────────────────────────────
    function poly(coords, fill, stroke, lw = 0.9) {
        if (!coords.length) return;
        ctx.beginPath();
        coords.forEach(([lo, la], i)=>i === 0 ? ctx.moveTo(x(lo), y(la)) : ctx.lineTo(x(lo), y(la)));
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw;
        ctx.stroke();
    }
    const LAND = 'rgba(14,90,52,0.75)';
    const BORDER = 'rgba(0,255,140,0.55)';
    const LAND2 = 'rgba(10,75,42,0.75)' // slightly different shade for variety
    ;
    const B2 = 'rgba(0,220,120,0.45)';
    // ── NORTH AMERICA ─────────────────────────────────────────────────────────
    // Mainland
    poly([
        [
            -140,
            72
        ],
        [
            -125,
            72
        ],
        [
            -100,
            75
        ],
        [
            -82,
            72
        ],
        [
            -65,
            47
        ],
        [
            -55,
            47
        ],
        [
            -56,
            38
        ],
        [
            -74,
            25
        ],
        [
            -86,
            15
        ],
        [
            -84,
            8
        ],
        [
            -77,
            8
        ],
        [
            -77,
            18
        ],
        [
            -72,
            19
        ],
        [
            -80,
            10
        ],
        [
            -85,
            10
        ],
        [
            -90,
            14
        ],
        [
            -93,
            16
        ],
        [
            -97,
            20
        ],
        [
            -104,
            22
        ],
        [
            -110,
            23
        ],
        [
            -118,
            30
        ],
        [
            -124,
            37
        ],
        [
            -124,
            48
        ],
        [
            -123,
            60
        ],
        [
            -137,
            60
        ],
        [
            -140,
            69
        ],
        [
            -140,
            72
        ]
    ], LAND, BORDER);
    // Alaska
    poly([
        [
            -168,
            72
        ],
        [
            -155,
            72
        ],
        [
            -148,
            62
        ],
        [
            -140,
            60
        ],
        [
            -137,
            60
        ],
        [
            -141,
            68
        ],
        [
            -160,
            72
        ],
        [
            -168,
            72
        ]
    ], LAND, BORDER, 0.7);
    // Greenland
    poly([
        [
            -52,
            61
        ],
        [
            -44,
            58
        ],
        [
            -24,
            60
        ],
        [
            -18,
            70
        ],
        [
            -20,
            80
        ],
        [
            -38,
            84
        ],
        [
            -58,
            83
        ],
        [
            -68,
            76
        ],
        [
            -58,
            70
        ],
        [
            -52,
            64
        ],
        [
            -52,
            61
        ]
    ], LAND2, B2, 0.8);
    // Cuba
    poly([
        [
            -85,
            22
        ],
        [
            -75,
            20
        ],
        [
            -74,
            22
        ],
        [
            -85,
            23
        ],
        [
            -85,
            22
        ]
    ], LAND, BORDER, 0.5);
    // ── SOUTH AMERICA ─────────────────────────────────────────────────────────
    poly([
        [
            -80,
            10
        ],
        [
            -77,
            8
        ],
        [
            -62,
            8
        ],
        [
            -52,
            5
        ],
        [
            -36,
            -4
        ],
        [
            -35,
            -10
        ],
        [
            -38,
            -14
        ],
        [
            -40,
            -22
        ],
        [
            -44,
            -24
        ],
        [
            -48,
            -28
        ],
        [
            -52,
            -33
        ],
        [
            -58,
            -38
        ],
        [
            -64,
            -42
        ],
        [
            -66,
            -46
        ],
        [
            -68,
            -56
        ],
        [
            -68,
            -58
        ],
        [
            -72,
            -52
        ],
        [
            -75,
            -40
        ],
        [
            -75,
            -30
        ],
        [
            -75,
            -18
        ],
        [
            -80,
            0
        ],
        [
            -80,
            10
        ]
    ], LAND, BORDER);
    // ── EUROPE ────────────────────────────────────────────────────────────────
    poly([
        [
            -10,
            36
        ],
        [
            -8,
            38
        ],
        [
            -6,
            43
        ],
        [
            -2,
            44
        ],
        [
            0,
            46
        ],
        [
            5,
            43
        ],
        [
            8,
            44
        ],
        [
            10,
            44
        ],
        [
            14,
            42
        ],
        [
            14,
            45
        ],
        [
            10,
            48
        ],
        [
            14,
            50
        ],
        [
            18,
            55
        ],
        [
            20,
            56
        ],
        [
            25,
            52
        ],
        [
            28,
            46
        ],
        [
            30,
            46
        ],
        [
            32,
            48
        ],
        [
            36,
            46
        ],
        [
            38,
            48
        ],
        [
            30,
            60
        ],
        [
            24,
            64
        ],
        [
            20,
            66
        ],
        [
            15,
            70
        ],
        [
            12,
            64
        ],
        [
            8,
            58
        ],
        [
            5,
            56
        ],
        [
            0,
            58
        ],
        [
            -3,
            58
        ],
        [
            -5,
            56
        ],
        [
            -4,
            52
        ],
        [
            -6,
            50
        ],
        [
            -10,
            36
        ]
    ], LAND, BORDER);
    // Scandinavia
    poly([
        [
            5,
            56
        ],
        [
            8,
            57
        ],
        [
            10,
            58
        ],
        [
            10,
            62
        ],
        [
            12,
            65
        ],
        [
            14,
            68
        ],
        [
            18,
            70
        ],
        [
            22,
            70
        ],
        [
            28,
            70
        ],
        [
            30,
            72
        ],
        [
            28,
            70
        ],
        [
            26,
            65
        ],
        [
            28,
            60
        ],
        [
            24,
            58
        ],
        [
            18,
            58
        ],
        [
            14,
            56
        ],
        [
            10,
            56
        ],
        [
            5,
            56
        ]
    ], LAND2, B2, 0.7);
    // Iceland
    poly([
        [
            -24,
            64
        ],
        [
            -14,
            64
        ],
        [
            -13,
            66
        ],
        [
            -18,
            66
        ],
        [
            -22,
            66
        ],
        [
            -24,
            65
        ],
        [
            -24,
            64
        ]
    ], LAND, BORDER, 0.5);
    // ── AFRICA ────────────────────────────────────────────────────────────────
    poly([
        [
            -6,
            36
        ],
        [
            5,
            36
        ],
        [
            10,
            37
        ],
        [
            18,
            38
        ],
        [
            26,
            34
        ],
        [
            32,
            31
        ],
        [
            36,
            24
        ],
        [
            42,
            12
        ],
        [
            44,
            12
        ],
        [
            50,
            12
        ],
        [
            44,
            10
        ],
        [
            42,
            11
        ],
        [
            36,
            12
        ],
        [
            34,
            5
        ],
        [
            32,
            0
        ],
        [
            34,
            -5
        ],
        [
            36,
            -12
        ],
        [
            34,
            -22
        ],
        [
            28,
            -34
        ],
        [
            18,
            -34
        ],
        [
            16,
            -22
        ],
        [
            12,
            -5
        ],
        [
            8,
            4
        ],
        [
            2,
            6
        ],
        [
            0,
            5
        ],
        [
            -4,
            5
        ],
        [
            -8,
            5
        ],
        [
            -12,
            6
        ],
        [
            -16,
            10
        ],
        [
            -18,
            15
        ],
        [
            -16,
            24
        ],
        [
            -12,
            28
        ],
        [
            -8,
            32
        ],
        [
            -6,
            36
        ]
    ], LAND, BORDER);
    // Madagascar
    poly([
        [
            44,
            -12
        ],
        [
            50,
            -14
        ],
        [
            50,
            -24
        ],
        [
            44,
            -26
        ],
        [
            44,
            -20
        ],
        [
            44,
            -12
        ]
    ], LAND2, B2, 0.6);
    // ── ASIA WEST ─────────────────────────────────────────────────────────────
    poly([
        [
            28,
            40
        ],
        [
            36,
            36
        ],
        [
            36,
            24
        ],
        [
            42,
            12
        ],
        [
            50,
            12
        ],
        [
            56,
            22
        ],
        [
            60,
            22
        ],
        [
            62,
            26
        ],
        [
            70,
            22
        ],
        [
            74,
            22
        ],
        [
            78,
            30
        ],
        [
            80,
            38
        ],
        [
            76,
            44
        ],
        [
            70,
            44
        ],
        [
            64,
            46
        ],
        [
            58,
            50
        ],
        [
            52,
            50
        ],
        [
            44,
            54
        ],
        [
            38,
            50
        ],
        [
            34,
            46
        ],
        [
            30,
            46
        ],
        [
            28,
            40
        ]
    ], LAND, BORDER);
    // ── MIDDLE EAST & ARABIA ─────────────────────────────────────────────────
    poly([
        [
            36,
            36
        ],
        [
            42,
            36
        ],
        [
            50,
            30
        ],
        [
            58,
            22
        ],
        [
            58,
            14
        ],
        [
            45,
            12
        ],
        [
            42,
            12
        ],
        [
            36,
            24
        ],
        [
            36,
            36
        ]
    ], LAND2, B2, 0.8);
    // ── RUSSIA (large separate polygon) ───────────────────────────────────────
    poly([
        [
            28,
            68
        ],
        [
            40,
            72
        ],
        [
            60,
            72
        ],
        [
            80,
            74
        ],
        [
            100,
            72
        ],
        [
            120,
            72
        ],
        [
            140,
            68
        ],
        [
            168,
            68
        ],
        [
            170,
            62
        ],
        [
            160,
            60
        ],
        [
            150,
            56
        ],
        [
            142,
            48
        ],
        [
            136,
            46
        ],
        [
            132,
            48
        ],
        [
            130,
            42
        ],
        [
            124,
            40
        ],
        [
            118,
            48
        ],
        [
            110,
            52
        ],
        [
            100,
            56
        ],
        [
            90,
            56
        ],
        [
            80,
            56
        ],
        [
            72,
            52
        ],
        [
            60,
            56
        ],
        [
            50,
            52
        ],
        [
            44,
            54
        ],
        [
            40,
            56
        ],
        [
            36,
            58
        ],
        [
            32,
            60
        ],
        [
            28,
            64
        ],
        [
            28,
            68
        ]
    ], LAND2, 'rgba(0,255,160,0.50)', 0.9);
    // Siberia / Far East extension
    poly([
        [
            140,
            68
        ],
        [
            168,
            68
        ],
        [
            180,
            70
        ],
        [
            180,
            62
        ],
        [
            168,
            62
        ],
        [
            162,
            58
        ],
        [
            156,
            56
        ],
        [
            148,
            50
        ],
        [
            142,
            48
        ],
        [
            140,
            54
        ],
        [
            140,
            60
        ],
        [
            140,
            68
        ]
    ], LAND2, B2, 0.7);
    // ── SOUTH ASIA (INDIA) ────────────────────────────────────────────────────
    poly([
        [
            62,
            24
        ],
        [
            72,
            22
        ],
        [
            78,
            8
        ],
        [
            80,
            10
        ],
        [
            82,
            16
        ],
        [
            80,
            22
        ],
        [
            78,
            30
        ],
        [
            72,
            22
        ],
        [
            62,
            24
        ]
    ], LAND, BORDER, 0.8);
    // Indian subcontinent fuller
    poly([
        [
            62,
            24
        ],
        [
            68,
            24
        ],
        [
            72,
            24
        ],
        [
            76,
            30
        ],
        [
            80,
            30
        ],
        [
            84,
            28
        ],
        [
            88,
            26
        ],
        [
            92,
            22
        ],
        [
            90,
            14
        ],
        [
            82,
            10
        ],
        [
            80,
            8
        ],
        [
            78,
            8
        ],
        [
            72,
            22
        ],
        [
            66,
            22
        ],
        [
            62,
            24
        ]
    ], LAND, BORDER);
    // ── CHINA & EAST ASIA ────────────────────────────────────────────────────
    poly([
        [
            78,
            44
        ],
        [
            90,
            50
        ],
        [
            100,
            56
        ],
        [
            110,
            54
        ],
        [
            120,
            52
        ],
        [
            130,
            48
        ],
        [
            132,
            48
        ],
        [
            130,
            42
        ],
        [
            122,
            32
        ],
        [
            120,
            24
        ],
        [
            108,
            20
        ],
        [
            100,
            22
        ],
        [
            94,
            22
        ],
        [
            90,
            28
        ],
        [
            88,
            26
        ],
        [
            84,
            28
        ],
        [
            80,
            30
        ],
        [
            78,
            36
        ],
        [
            80,
            38
        ],
        [
            78,
            44
        ]
    ], LAND, BORDER);
    // ── SOUTHEAST ASIA ────────────────────────────────────────────────────────
    poly([
        [
            100,
            22
        ],
        [
            106,
            20
        ],
        [
            104,
            10
        ],
        [
            100,
            6
        ],
        [
            100,
            2
        ],
        [
            103,
            -1
        ],
        [
            106,
            -4
        ],
        [
            110,
            -8
        ],
        [
            112,
            -6
        ],
        [
            110,
            -2
        ],
        [
            108,
            2
        ],
        [
            104,
            4
        ],
        [
            100,
            4
        ],
        [
            96,
            6
        ],
        [
            100,
            10
        ],
        [
            100,
            22
        ]
    ], LAND, BORDER, 0.8);
    // Borneo
    poly([
        [
            108,
            8
        ],
        [
            118,
            8
        ],
        [
            118,
            2
        ],
        [
            114,
            -2
        ],
        [
            108,
            -4
        ],
        [
            108,
            2
        ],
        [
            108,
            8
        ]
    ], LAND2, B2, 0.6);
    // Sumatra
    poly([
        [
            96,
            6
        ],
        [
            104,
            4
        ],
        [
            108,
            0
        ],
        [
            108,
            -5
        ],
        [
            100,
            -4
        ],
        [
            96,
            2
        ],
        [
            96,
            6
        ]
    ], LAND2, B2, 0.6);
    // Philippines
    poly([
        [
            118,
            18
        ],
        [
            122,
            18
        ],
        [
            124,
            14
        ],
        [
            122,
            8
        ],
        [
            120,
            10
        ],
        [
            118,
            12
        ],
        [
            118,
            18
        ]
    ], LAND2, B2, 0.6);
    // ── JAPAN ────────────────────────────────────────────────────────────────
    poly([
        [
            130,
            32
        ],
        [
            132,
            34
        ],
        [
            134,
            36
        ],
        [
            136,
            36
        ],
        [
            138,
            38
        ],
        [
            140,
            40
        ],
        [
            142,
            44
        ],
        [
            142,
            42
        ],
        [
            140,
            38
        ],
        [
            138,
            36
        ],
        [
            136,
            34
        ],
        [
            132,
            32
        ],
        [
            130,
            32
        ]
    ], LAND, BORDER, 0.7);
    // ── SOUTH KOREA / KOREAN PENINSULA ───────────────────────────────────────
    poly([
        [
            126,
            34
        ],
        [
            128,
            36
        ],
        [
            130,
            36
        ],
        [
            130,
            38
        ],
        [
            128,
            38
        ],
        [
            126,
            38
        ],
        [
            126,
            34
        ]
    ], LAND2, B2, 0.6);
    // ── AUSTRALIA ────────────────────────────────────────────────────────────
    poly([
        [
            114,
            -22
        ],
        [
            118,
            -20
        ],
        [
            122,
            -18
        ],
        [
            126,
            -14
        ],
        [
            130,
            -12
        ],
        [
            132,
            -12
        ],
        [
            136,
            -12
        ],
        [
            138,
            -14
        ],
        [
            140,
            -16
        ],
        [
            142,
            -10
        ],
        [
            144,
            -14
        ],
        [
            148,
            -18
        ],
        [
            152,
            -24
        ],
        [
            152,
            -30
        ],
        [
            150,
            -36
        ],
        [
            145,
            -38
        ],
        [
            138,
            -36
        ],
        [
            132,
            -34
        ],
        [
            126,
            -34
        ],
        [
            116,
            -30
        ],
        [
            114,
            -26
        ],
        [
            114,
            -22
        ]
    ], LAND, BORDER);
    // Tasmania
    poly([
        [
            144,
            -40
        ],
        [
            148,
            -40
        ],
        [
            148,
            -44
        ],
        [
            144,
            -44
        ],
        [
            144,
            -40
        ]
    ], LAND2, B2, 0.5);
    // New Zealand
    poly([
        [
            172,
            -40
        ],
        [
            174,
            -38
        ],
        [
            176,
            -36
        ],
        [
            174,
            -34
        ],
        [
            172,
            -36
        ],
        [
            170,
            -40
        ],
        [
            172,
            -40
        ]
    ], LAND2, B2, 0.6);
    poly([
        [
            168,
            -45
        ],
        [
            170,
            -44
        ],
        [
            172,
            -46
        ],
        [
            170,
            -47
        ],
        [
            168,
            -46
        ],
        [
            168,
            -45
        ]
    ], LAND2, B2, 0.5);
    // ── CANADA detail ─────────────────────────────────────────────────────────
    poly([
        [
            -140,
            72
        ],
        [
            -100,
            75
        ],
        [
            -82,
            72
        ],
        [
            -80,
            62
        ],
        [
            -92,
            58
        ],
        [
            -96,
            58
        ],
        [
            -100,
            60
        ],
        [
            -110,
            60
        ],
        [
            -120,
            60
        ],
        [
            -130,
            62
        ],
        [
            -138,
            62
        ],
        [
            -140,
            72
        ]
    ], LAND2, B2, 0.7);
    // ── ANTARCTICA ────────────────────────────────────────────────────────────
    poly([
        [
            -180,
            -70
        ],
        [
            -90,
            -68
        ],
        [
            0,
            -70
        ],
        [
            90,
            -68
        ],
        [
            180,
            -70
        ],
        [
            180,
            -90
        ],
        [
            -180,
            -90
        ],
        [
            -180,
            -70
        ]
    ], 'rgba(180,220,255,0.25)', 'rgba(200,230,255,0.4)', 0.8);
    // ── Atmospheric vignette edge ─────────────────────────────────────────────
    const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(1,8,16,0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);
}
function Globe3D({ points, height = 420, activeLayers }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cleanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const visible = activeLayers?.size ? points.filter((p)=>activeLayers.has(p.type)) : points;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Globe3D.useEffect": ()=>{
            cleanRef.current?.();
            cleanRef.current = null;
            const container = mountRef.current;
            if (!container) return;
            let destroyed = false, animId = 0;
            __turbopack_require__("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript, async loader)")(__turbopack_import__).then({
                "Globe3D.useEffect": (THREE)=>{
                    if (destroyed || !container) return;
                    const cW = container.clientWidth || 800;
                    const cH = container.clientHeight || height;
                    // Scene / camera
                    const scene = new THREE.Scene();
                    const camera = new THREE.PerspectiveCamera(38, cW / cH, 0.01, 100);
                    camera.position.set(0, 0, 3.0);
                    const renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true
                    });
                    renderer.setSize(cW, cH);
                    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    renderer.setClearColor(0x000000, 0);
                    container.appendChild(renderer.domElement);
                    // ── Earth texture ──────────────────────────────────────────────────────
                    const TW = 4096, TH = 2048;
                    const cv = document.createElement('canvas');
                    cv.width = TW;
                    cv.height = TH;
                    const ctx = cv.getContext('2d');
                    drawEarth(ctx, TW, TH);
                    const earthTex = new THREE.CanvasTexture(cv);
                    earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
                    // Globe mesh
                    const R = 1.0;
                    const globe = new THREE.Mesh(new THREE.SphereGeometry(R, 96, 96), new THREE.MeshPhongMaterial({
                        map: earthTex,
                        shininess: 18,
                        specular: new THREE.Color(0x002208),
                        emissive: new THREE.Color(0x001a08),
                        emissiveIntensity: 0.18
                    }));
                    scene.add(globe);
                    // Outer atmosphere glow
                    scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 32, 32), new THREE.MeshPhongMaterial({
                        color: 0x00ff88,
                        transparent: true,
                        opacity: 0.055,
                        side: THREE.BackSide
                    })));
                    // Lights
                    const ambient = new THREE.AmbientLight(0x1a3020, 5.5);
                    scene.add(ambient);
                    const sun = new THREE.DirectionalLight(0xbbffcc, 1.6);
                    sun.position.set(5, 3, 5);
                    scene.add(sun);
                    const fill = new THREE.DirectionalLight(0x002244, 0.6);
                    fill.position.set(-5, -2, -3);
                    scene.add(fill);
                    // Stars
                    const sp = new Float32Array(4000 * 3);
                    for(let i = 0; i < 4000 * 3; i++)sp[i] = (Math.random() - 0.5) * 40;
                    const sg = new THREE.BufferGeometry();
                    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
                    scene.add(new THREE.Points(sg, new THREE.PointsMaterial({
                        color: 0xffffff,
                        size: 0.010,
                        transparent: true,
                        opacity: 0.5
                    })));
                    // ── Attack arcs ────────────────────────────────────────────────────────
                    const arcGroup = new THREE.Group();
                    scene.add(arcGroup);
                    visible.forEach({
                        "Globe3D.useEffect": (pt)=>{
                            const color = new THREE.Color(tc(pt.type));
                            const brightColor = new THREE.Color(tc(pt.type)).multiplyScalar(1.5);
                            const [sx, sy, sz] = ll2v(pt.srcLat, pt.srcLng, R);
                            const [dx, dy, dz] = ll2v(pt.dstLat, pt.dstLng, R);
                            const vS = new THREE.Vector3(sx, sy, sz);
                            const vD = new THREE.Vector3(dx, dy, dz);
                            // Arc apex: pull away from surface for visibility
                            const arcHeight = 1.45 + pt.severity * 0.06;
                            const vM = vS.clone().add(vD).normalize().multiplyScalar(R * arcHeight);
                            const curve = new THREE.QuadraticBezierCurve3(vS, vM, vD);
                            const isCrit = pt.severity >= 4;
                            const opacity = 0.5 + pt.severity / 5 * 0.45;
                            // Fat glow tube behind the line
                            arcGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, isCrit ? 0.010 : 0.007, 5, false), new THREE.MeshBasicMaterial({
                                color,
                                transparent: true,
                                opacity: opacity * 0.25
                            })));
                            // Core line — bright and crisp
                            arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)), new THREE.LineBasicMaterial({
                                color: brightColor,
                                transparent: true,
                                opacity: opacity
                            })));
                            // Source pulse dot — large and glowing
                            const srcR = isCrit ? 0.036 : 0.024;
                            const [sx2, sy2, sz2] = ll2v(pt.srcLat, pt.srcLng, R + 0.018);
                            const srcDot = new THREE.Mesh(new THREE.SphereGeometry(srcR, 10, 10), new THREE.MeshBasicMaterial({
                                color: brightColor
                            }));
                            srcDot.position.set(sx2, sy2, sz2);
                            arcGroup.add(srcDot);
                            // Src halo ring
                            arcGroup.add(new THREE.Mesh(new THREE.SphereGeometry(srcR * 2.2, 10, 10), new THREE.MeshBasicMaterial({
                                color,
                                transparent: true,
                                opacity: 0.18
                            })));
                            // Destination dot
                            const [dx2, dy2, dz2] = ll2v(pt.dstLat, pt.dstLng, R + 0.012);
                            const dstDot = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), new THREE.MeshBasicMaterial({
                                color,
                                transparent: true,
                                opacity: 0.8
                            }));
                            dstDot.position.set(dx2, dy2, dz2);
                            arcGroup.add(dstDot);
                        }
                    }["Globe3D.useEffect"]);
                    // ── Drag interaction ───────────────────────────────────────────────────
                    let dragging = false, lx = 0, ly = 0;
                    let rotY = 0.5, rotX = 0.12, velY = 0.0020, velX = 0;
                    const el = renderer.domElement;
                    el.style.cursor = 'grab';
                    const onDown = {
                        "Globe3D.useEffect.onDown": (cx, cy)=>{
                            dragging = true;
                            lx = cx;
                            ly = cy;
                            el.style.cursor = 'grabbing';
                        }
                    }["Globe3D.useEffect.onDown"];
                    const onUp = {
                        "Globe3D.useEffect.onUp": ()=>{
                            dragging = false;
                            el.style.cursor = 'grab';
                        }
                    }["Globe3D.useEffect.onUp"];
                    const onMove = {
                        "Globe3D.useEffect.onMove": (cx, cy)=>{
                            if (!dragging) return;
                            velY = (cx - lx) * 0.006;
                            velX = (cy - ly) * 0.004;
                            rotY += velY;
                            rotX += velX;
                            rotX = Math.max(-1.1, Math.min(1.1, rotX));
                            lx = cx;
                            ly = cy;
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
                    const onResize = {
                        "Globe3D.useEffect.onResize": ()=>{
                            const nW = container.clientWidth || 800;
                            const nH = container.clientHeight || height;
                            camera.aspect = nW / nH;
                            camera.updateProjectionMatrix();
                            renderer.setSize(nW, nH);
                        }
                    }["Globe3D.useEffect.onResize"];
                    window.addEventListener('resize', onResize);
                    // ── Render loop ────────────────────────────────────────────────────────
                    const animate = {
                        "Globe3D.useEffect.animate": ()=>{
                            if (destroyed) return;
                            animId = requestAnimationFrame(animate);
                            if (!dragging) {
                                velY += (0.0020 - velY) * 0.025;
                                velX *= 0.93;
                                rotY += velY;
                                rotX += velX;
                                rotX = Math.max(-1.1, Math.min(1.1, rotX));
                            } else {
                                velY *= 0.9;
                                velX *= 0.9;
                            }
                            globe.rotation.set(rotX, rotY, 0);
                            arcGroup.rotation.set(rotX, rotY, 0);
                            renderer.render(scene, camera);
                        }
                    }["Globe3D.useEffect.animate"];
                    animate();
                    setReady(true);
                    cleanRef.current = ({
                        "Globe3D.useEffect": ()=>{
                            destroyed = true;
                            cancelAnimationFrame(animId);
                            window.removeEventListener('mouseup', onUp);
                            window.removeEventListener('touchend', onUp);
                            window.removeEventListener('resize', onResize);
                            renderer.dispose();
                            earthTex.dispose();
                            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
                        }
                    })["Globe3D.useEffect"];
                }
            }["Globe3D.useEffect"]).catch({
                "Globe3D.useEffect": ()=>setReady(true)
            }["Globe3D.useEffect"]);
            return ({
                "Globe3D.useEffect": ()=>{
                    destroyed = true;
                    cleanRef.current?.();
                }
            })["Globe3D.useEffect"];
        }
    }["Globe3D.useEffect"], [
        visible.length,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full h-full relative",
        style: {
            background: 'radial-gradient(ellipse at center, #020e18 0%, #010810 100%)'
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
                lineNumber: 446,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/map/Globe3D.tsx",
            lineNumber: 445,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/map/Globe3D.tsx",
        lineNumber: 439,
        columnNumber: 5
    }, this);
}
_s(Globe3D, "Ha2MQjVJnxWc6rHBG+kovk1KbDw=");
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
}]);

//# sourceMappingURL=src_00bae9._.js.map