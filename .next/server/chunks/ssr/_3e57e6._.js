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
const tc = (t)=>TYPE_COLOR[t] ?? '#4a7fa5';
function ll2v(lat, lng, r) {
    const phi = lat * (Math.PI / 180), theta = lng * (Math.PI / 180);
    return [
        r * Math.cos(phi) * Math.sin(theta),
        r * Math.sin(phi),
        r * Math.cos(phi) * Math.cos(theta)
    ];
}
// Draw a much more accurate world map using polygon data
function drawEarth(ctx, W, H) {
    // Background ocean
    ctx.fillStyle = '#04090f';
    ctx.fillRect(0, 0, W, H);
    // Grid lines
    ctx.strokeStyle = 'rgba(0,255,170,0.07)';
    ctx.lineWidth = 0.5;
    for(let la = -80; la <= 80; la += 20){
        const y = (90 - la) / 180 * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }
    for(let lo = -180; lo <= 180; lo += 20){
        const x = (lo + 180) / 360 * W;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }
    // fn: draw land polygon from [lng,lat] pairs
    function land(coords, fill = 'rgba(0,180,90,0.28)', stroke = 'rgba(0,255,140,0.35)') {
        if (!coords.length) return;
        ctx.beginPath();
        coords.forEach(([lo, la], i)=>{
            const x = (lo + 180) / 360 * W, y = (90 - la) / 180 * H;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }
    // Simplified but recognisable continent polygons
    // North America
    land([
        [
            -168,
            72
        ],
        [
            -140,
            72
        ],
        [
            -95,
            75
        ],
        [
            -82,
            72
        ],
        [
            -62,
            45
        ],
        [
            -52,
            46
        ],
        [
            -55,
            36
        ],
        [
            -80,
            25
        ],
        [
            -87,
            15
        ],
        [
            -83,
            8
        ],
        [
            -75,
            8
        ],
        [
            -76,
            18
        ],
        [
            -72,
            19
        ],
        [
            -72,
            18
        ],
        [
            -80,
            10
        ],
        [
            -83,
            8
        ],
        [
            -90,
            14
        ],
        [
            -92,
            14
        ],
        [
            -97,
            20
        ],
        [
            -105,
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
            -120,
            34
        ],
        [
            -125,
            48
        ],
        [
            -124,
            60
        ],
        [
            -140,
            60
        ],
        [
            -141,
            68
        ],
        [
            -168,
            72
        ]
    ]);
    // South America
    land([
        [
            -80,
            10
        ],
        [
            -76,
            8
        ],
        [
            -62,
            8
        ],
        [
            -50,
            5
        ],
        [
            -35,
            -5
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
            -45,
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
            -62,
            -42
        ],
        [
            -65,
            -46
        ],
        [
            -68,
            -55
        ],
        [
            -68,
            -58
        ],
        [
            -72,
            -50
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
            -20
        ],
        [
            -80,
            0
        ],
        [
            -80,
            10
        ]
    ]);
    // Europe
    land([
        [
            0,
            50
        ],
        [
            10,
            55
        ],
        [
            20,
            60
        ],
        [
            30,
            60
        ],
        [
            28,
            70
        ],
        [
            20,
            72
        ],
        [
            10,
            62
        ],
        [
            0,
            58
        ],
        [
            -5,
            56
        ],
        [
            -10,
            52
        ],
        [
            -8,
            38
        ],
        [
            0,
            36
        ],
        [
            5,
            36
        ],
        [
            8,
            38
        ],
        [
            10,
            45
        ],
        [
            8,
            46
        ],
        [
            10,
            50
        ],
        [
            15,
            50
        ],
        [
            18,
            55
        ],
        [
            20,
            55
        ],
        [
            25,
            52
        ],
        [
            30,
            50
        ],
        [
            32,
            45
        ],
        [
            28,
            40
        ],
        [
            22,
            38
        ],
        [
            18,
            40
        ],
        [
            15,
            38
        ],
        [
            12,
            44
        ],
        [
            8,
            46
        ],
        [
            5,
            45
        ],
        [
            0,
            50
        ]
    ]);
    // Africa
    land([
        [
            -5,
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
            20,
            38
        ],
        [
            30,
            32
        ],
        [
            32,
            30
        ],
        [
            36,
            22
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
            12
        ],
        [
            36,
            12
        ],
        [
            32,
            5
        ],
        [
            30,
            0
        ],
        [
            32,
            -5
        ],
        [
            35,
            -12
        ],
        [
            32,
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
            15,
            -22
        ],
        [
            10,
            -5
        ],
        [
            5,
            5
        ],
        [
            0,
            5
        ],
        [
            -5,
            5
        ],
        [
            -10,
            8
        ],
        [
            -15,
            10
        ],
        [
            -18,
            15
        ],
        [
            -17,
            22
        ],
        [
            -14,
            28
        ],
        [
            -8,
            32
        ],
        [
            -5,
            36
        ]
    ]);
    // Asia (simplified West to East)
    land([
        [
            30,
            72
        ],
        [
            50,
            72
        ],
        [
            60,
            70
        ],
        [
            70,
            68
        ],
        [
            80,
            72
        ],
        [
            90,
            72
        ],
        [
            100,
            68
        ],
        [
            110,
            70
        ],
        [
            120,
            70
        ],
        [
            130,
            65
        ],
        [
            140,
            60
        ],
        [
            142,
            48
        ],
        [
            140,
            36
        ],
        [
            130,
            32
        ],
        [
            120,
            22
        ],
        [
            108,
            20
        ],
        [
            100,
            6
        ],
        [
            100,
            0
        ],
        [
            105,
            -5
        ],
        [
            110,
            -8
        ],
        [
            115,
            -8
        ],
        [
            120,
            15
        ],
        [
            115,
            22
        ],
        [
            110,
            20
        ],
        [
            108,
            20
        ],
        [
            100,
            6
        ],
        [
            90,
            8
        ],
        [
            80,
            20
        ],
        [
            72,
            22
        ],
        [
            62,
            22
        ],
        [
            56,
            25
        ],
        [
            50,
            30
        ],
        [
            44,
            38
        ],
        [
            36,
            46
        ],
        [
            30,
            50
        ],
        [
            28,
            40
        ],
        [
            32,
            32
        ],
        [
            36,
            22
        ],
        [
            42,
            12
        ],
        [
            50,
            14
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
            25
        ],
        [
            70,
            22
        ],
        [
            72,
            25
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
            78,
            44
        ],
        [
            70,
            42
        ],
        [
            60,
            46
        ],
        [
            50,
            50
        ],
        [
            44,
            55
        ],
        [
            40,
            60
        ],
        [
            30,
            60
        ],
        [
            20,
            60
        ],
        [
            10,
            55
        ],
        [
            0,
            50
        ],
        [
            10,
            45
        ],
        [
            20,
            42
        ],
        [
            30,
            45
        ],
        [
            38,
            48
        ],
        [
            46,
            46
        ],
        [
            50,
            50
        ],
        [
            60,
            46
        ],
        [
            70,
            42
        ],
        [
            80,
            38
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
            52
        ],
        [
            120,
            56
        ],
        [
            130,
            50
        ],
        [
            138,
            46
        ],
        [
            142,
            46
        ],
        [
            148,
            50
        ],
        [
            152,
            56
        ],
        [
            158,
            60
        ],
        [
            160,
            68
        ],
        [
            155,
            70
        ],
        [
            140,
            62
        ],
        [
            130,
            65
        ],
        [
            120,
            70
        ],
        [
            110,
            70
        ],
        [
            100,
            68
        ],
        [
            90,
            72
        ],
        [
            80,
            72
        ],
        [
            70,
            68
        ],
        [
            60,
            70
        ],
        [
            50,
            72
        ],
        [
            40,
            72
        ],
        [
            30,
            72
        ]
    ]);
    // Australia
    land([
        [
            114,
            -22
        ],
        [
            118,
            -20
        ],
        [
            126,
            -14
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
            -28
        ],
        [
            150,
            -34
        ],
        [
            144,
            -38
        ],
        [
            138,
            -36
        ],
        [
            132,
            -32
        ],
        [
            126,
            -34
        ],
        [
            114,
            -26
        ],
        [
            114,
            -22
        ]
    ]);
    // Greenland
    land([
        [
            -52,
            60
        ],
        [
            -42,
            56
        ],
        [
            -22,
            60
        ],
        [
            -20,
            70
        ],
        [
            -22,
            80
        ],
        [
            -40,
            84
        ],
        [
            -58,
            82
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
            62
        ],
        [
            -52,
            60
        ]
    ]);
    // Japan (simplified)
    land([
        [
            130,
            31
        ],
        [
            132,
            33
        ],
        [
            134,
            34
        ],
        [
            136,
            36
        ],
        [
            138,
            37
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
            144,
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
            140,
            36
        ],
        [
            138,
            34
        ],
        [
            136,
            34
        ],
        [
            130,
            31
        ]
    ]);
    // UK
    land([
        [
            -6,
            50
        ],
        [
            0,
            50
        ],
        [
            2,
            51
        ],
        [
            2,
            53
        ],
        [
            0,
            58
        ],
        [
            -4,
            58
        ],
        [
            -6,
            56
        ],
        [
            -4,
            54
        ],
        [
            -4,
            52
        ],
        [
            -6,
            50
        ]
    ]);
    // Indonesia (Sumatra+Java rough)
    land([
        [
            96,
            6
        ],
        [
            100,
            4
        ],
        [
            104,
            1
        ],
        [
            106,
            -4
        ],
        [
            108,
            -8
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
            3
        ],
        [
            100,
            4
        ],
        [
            96,
            6
        ]
    ]);
    // New Zealand (North)
    land([
        [
            173,
            -41
        ],
        [
            175,
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
            173,
            -41
        ]
    ]);
    // Antarctica hint
    land([
        [
            -180,
            -70
        ],
        [
            -120,
            -68
        ],
        [
            -60,
            -68
        ],
        [
            0,
            -70
        ],
        [
            60,
            -68
        ],
        [
            120,
            -66
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
    ]);
}
function Globe3D({ points, height = 420, activeLayers }) {
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cleanRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const visible = activeLayers && activeLayers.size > 0 ? points.filter((p)=>activeLayers.has(p.type)) : points;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        cleanRef.current?.();
        cleanRef.current = null;
        const container = mountRef.current;
        if (!container) return;
        let destroyed = false, animId = 0;
        __turbopack_require__("[project]/node_modules/three/build/three.module.js [app-ssr] (ecmascript, async loader)")(__turbopack_import__).then((THREE)=>{
            if (destroyed || !container) return;
            const cW = container.clientWidth || 800;
            const cH = container.clientHeight || height;
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(40, cW / cH, 0.01, 100);
            camera.position.set(0, 0, 3.2);
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            renderer.setSize(cW, cH);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);
            // Earth texture from canvas
            const TW = 4096, TH = 2048;
            const cv = document.createElement('canvas');
            cv.width = TW;
            cv.height = TH;
            const ctx = cv.getContext('2d');
            drawEarth(ctx, TW, TH);
            // Subtle specular highlight
            const radGrd = ctx.createRadialGradient(TW * 0.65, TH * 0.35, 0, TW * 0.65, TH * 0.35, TW * 0.5);
            radGrd.addColorStop(0, 'rgba(0,255,170,0.04)');
            radGrd.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = radGrd;
            ctx.fillRect(0, 0, TW, TH);
            const earthTex = new THREE.CanvasTexture(cv);
            earthTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
            const R = 1;
            const globe = new THREE.Mesh(new THREE.SphereGeometry(R, 96, 96), new THREE.MeshPhongMaterial({
                map: earthTex,
                shininess: 20,
                specular: new THREE.Color(0x001a06),
                emissive: new THREE.Color(0x001408),
                emissiveIntensity: 0.15
            }));
            scene.add(globe);
            // Atmosphere glow
            scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 32, 32), new THREE.MeshPhongMaterial({
                color: 0x00cc66,
                transparent: true,
                opacity: 0.06,
                side: THREE.BackSide
            })));
            // Inner atmosphere
            scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * 1.02, 32, 32), new THREE.MeshPhongMaterial({
                color: 0x002200,
                transparent: true,
                opacity: 0.08,
                side: THREE.FrontSide
            })));
            // Lights
            scene.add(new THREE.AmbientLight(0x203040, 3.5));
            const sun = new THREE.DirectionalLight(0xaaffcc, 1.4);
            sun.position.set(5, 3, 5);
            scene.add(sun);
            const fill = new THREE.DirectionalLight(0x002244, 0.5);
            fill.position.set(-5, -2, -3);
            scene.add(fill);
            // Stars
            const sp = new Float32Array(3000 * 3);
            for(let i = 0; i < 3000 * 3; i++)sp[i] = (Math.random() - 0.5) * 30;
            const sg = new THREE.BufferGeometry();
            sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
            scene.add(new THREE.Points(sg, new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.012,
                transparent: true,
                opacity: 0.55
            })));
            // Attack arcs
            const arcGroup = new THREE.Group();
            scene.add(arcGroup);
            visible.forEach((pt)=>{
                const color = new THREE.Color(tc(pt.type));
                const [sx, sy, sz] = ll2v(pt.srcLat, pt.srcLng, R);
                const [dx, dy, dz] = ll2v(pt.dstLat, pt.dstLng, R);
                const vS = new THREE.Vector3(sx, sy, sz), vD = new THREE.Vector3(dx, dy, dz);
                const vM = vS.clone().add(vD).normalize().multiplyScalar(R * 1.55);
                const curve = new THREE.QuadraticBezierCurve3(vS, vM, vD);
                const op = 0.35 + pt.severity / 5 * 0.55;
                // Glow tube
                arcGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.005, 4, false), new THREE.MeshBasicMaterial({
                    color,
                    transparent: true,
                    opacity: op * 0.2
                })));
                // Line
                arcGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), new THREE.LineBasicMaterial({
                    color,
                    transparent: true,
                    opacity: op
                })));
                // Src dot
                const [sx2, sy2, sz2] = ll2v(pt.srcLat, pt.srcLng, R + 0.015);
                const dot = new THREE.Mesh(new THREE.SphereGeometry(pt.severity >= 4 ? 0.028 : 0.018, 8, 8), new THREE.MeshBasicMaterial({
                    color
                }));
                dot.position.set(sx2, sy2, sz2);
                arcGroup.add(dot);
                // Dst dot
                const [dx2, dy2, dz2] = ll2v(pt.dstLat, pt.dstLng, R + 0.008);
                const dd = new THREE.Mesh(new THREE.SphereGeometry(0.01, 6, 6), new THREE.MeshBasicMaterial({
                    color,
                    transparent: true,
                    opacity: 0.6
                }));
                dd.position.set(dx2, dy2, dz2);
                arcGroup.add(dd);
            });
            // Drag interaction
            let dragging = false, lx = 0, ly = 0, rotY = 0.6, rotX = 0.15, velY = 0.0025, velX = 0;
            const el = renderer.domElement;
            el.style.cursor = 'grab';
            const down = (x, y)=>{
                dragging = true;
                lx = x;
                ly = y;
                el.style.cursor = 'grabbing';
            };
            const up = ()=>{
                dragging = false;
                el.style.cursor = 'grab';
            };
            const move = (x, y)=>{
                if (!dragging) return;
                velY = (x - lx) * 0.006;
                velX = (y - ly) * 0.004;
                rotY += velY;
                rotX += velX;
                rotX = Math.max(-1.1, Math.min(1.1, rotX));
                lx = x;
                ly = y;
            };
            el.addEventListener('mousedown', (e)=>down(e.clientX, e.clientY));
            el.addEventListener('touchstart', (e)=>down(e.touches[0].clientX, e.touches[0].clientY), {
                passive: true
            });
            window.addEventListener('mouseup', up);
            window.addEventListener('touchend', up);
            window.addEventListener('mousemove', (e)=>move(e.clientX, e.clientY));
            el.addEventListener('touchmove', (e)=>{
                e.preventDefault();
                move(e.touches[0].clientX, e.touches[0].clientY);
            }, {
                passive: false
            });
            const onResize = ()=>{
                const nW = container.clientWidth || 800, nH = container.clientHeight || height;
                camera.aspect = nW / nH;
                camera.updateProjectionMatrix();
                renderer.setSize(nW, nH);
            };
            window.addEventListener('resize', onResize);
            const animate = ()=>{
                if (destroyed) return;
                animId = requestAnimationFrame(animate);
                if (!dragging) {
                    velY += (0.0022 - velY) * 0.025;
                    velX *= 0.92;
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
            };
            animate();
            setReady(true);
            cleanRef.current = ()=>{
                destroyed = true;
                cancelAnimationFrame(animId);
                window.removeEventListener('mouseup', up);
                window.removeEventListener('touchend', up);
                window.removeEventListener('resize', onResize);
                renderer.dispose();
                earthTex.dispose();
                if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            };
        }).catch(()=>setReady(true));
        return ()=>{
            destroyed = true;
            cleanRef.current?.();
        };
    }, [
        visible.length,
        height
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full h-full relative",
        style: {
            background: '#020608'
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
                lineNumber: 236,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/map/Globe3D.tsx",
            lineNumber: 235,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/map/Globe3D.tsx",
        lineNumber: 233,
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
"[project]/src/app/threat-map/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ThreatMapPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/map/Globe3D.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const ALL_TYPES = Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"]);
function ThreatMapPage() {
    const [points, setPoints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pulses, setPulses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        total: 0,
        critical: 0,
        cveIds: []
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeLayers, setActiveLayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set(ALL_TYPES));
    const [globeKey, setGlobeKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [layerOpen, setLayerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const check = ()=>setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return ()=>window.removeEventListener('resize', check);
    }, []);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        load();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const iv = setInterval(load, 60_000);
        return ()=>clearInterval(iv);
    }, []);
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
    const LayerPanel = ({ compact = false })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                display: 'flex',
                flexDirection: 'column',
                height: compact ? 'auto' : '100%'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '8px 12px 6px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: compact ? undefined : 1,
                        overflowY: 'auto',
                        padding: '4px 0'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                activeLayers.size === ALL_TYPES.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        compact ? /* Compact: horizontal chips for mobile dropdown */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                                padding: '8px 12px'
                            },
                            children: ALL_TYPES.map((type)=>{
                                const count = typeCounts[type] ?? 0, active = activeLayers.has(type), color = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type];
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            const count = typeCounts[type] ?? 0, active = activeLayers.has(type), color = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        ].map(([l, c])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '5px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
    const OTXFeed = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                !pulses.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    flexWrap: 'wrap'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '8px',
                                            padding: '1px 5px',
                                            borderRadius: '3px',
                                            background: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type] + '18',
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type],
                                            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TYPE_COLOR"][type]}30`
                                        },
                                        children: type.toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, this),
                                    p.targeted_countries?.slice(0, 2).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    p.adversary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '8px',
                                            color: '#334155',
                                            marginLeft: 'auto'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["timeAgo"])(p.modified ?? p.created)
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                minHeight: '100vh',
                background: '#020608'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "live-dot live-dot-red"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '10px',
                                        color: '#475569'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                layerOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(6,10,20,0.97)',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        position: 'sticky',
                        top: '92px',
                        zIndex: 9
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerPanel, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: '100%',
                        height: '320px',
                        position: 'relative',
                        background: '#020608'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Globe3D"], {
                            points: points,
                            activeLayers: activeLayers
                        }, globeKey, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(5,8,15,0.9)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "live-dot"
                        }, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(5,8,15,0.8)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/threat-map/page.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this),
                stats.cveIds?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(5,8,15,0.8)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px'
                            },
                            children: stats.cveIds.slice(0, 6).map((cve)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot live-dot-red"
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: visiblePts.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '185px',
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'rgba(5,8,15,0.88)',
                            borderRight: '1px solid rgba(255,255,255,0.06)',
                            overflow: 'hidden'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerPanel, {}, void 0, false, {
                            fileName: "[project]/src/app/threat-map/page.tsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/threat-map/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0,
                            position: 'relative',
                            background: '#020608',
                            overflow: 'hidden'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$map$2f$Globe3D$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Globe3D"], {
                                points: points,
                                activeLayers: activeLayers
                            }, globeKey, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '9px 12px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "live-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/threat-map/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    overflowY: 'auto'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OTXFeed, {}, void 0, false, {
                                    fileName: "[project]/src/app/threat-map/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 52
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/threat-map/page.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            stats.cveIds?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    borderTop: '1px solid rgba(255,255,255,0.06)',
                                    padding: '9px 12px',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '4px'
                                        },
                                        children: stats.cveIds.slice(0, 6).map((cve)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
}}),
"[project]/src/app/threat-map/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

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

//# sourceMappingURL=_3e57e6._.js.map