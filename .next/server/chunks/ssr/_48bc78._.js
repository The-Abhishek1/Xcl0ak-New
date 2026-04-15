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