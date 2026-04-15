(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_23c576._.js", {

"[project]/src/components/layout/Sidebar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Sidebar": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const SECTIONS = [
    {
        label: 'Intelligence',
        items: [
            {
                icon: '⬡',
                label: 'Dashboard',
                href: '/dashboard'
            },
            {
                icon: '🗺',
                label: 'Threat Map',
                href: '/threat-map',
                badge: 'LIVE'
            },
            {
                icon: '📡',
                label: 'CVE Tracker',
                href: '/cve'
            },
            {
                icon: '📰',
                label: 'News Feed',
                href: '/news'
            }
        ]
    },
    {
        label: 'Exploits',
        items: [
            {
                icon: '💉',
                label: 'Browse',
                href: '/exploits'
            },
            {
                icon: '⬆',
                label: 'Upload PoC',
                href: '/exploits/upload'
            },
            {
                icon: '📦',
                label: 'Payloads',
                href: '/payloads'
            },
            {
                icon: '🧬',
                label: 'DNA Analysis',
                href: '/dna'
            }
        ]
    },
    {
        label: 'Tools',
        items: [
            {
                icon: '🐳',
                label: 'Playground',
                href: '/playground'
            },
            {
                icon: '🔭',
                label: 'Scanner',
                href: '/scanner'
            },
            {
                icon: '🕵',
                label: 'OSINT',
                href: '/osint'
            },
            {
                icon: '📊',
                label: 'Reports',
                href: '/reports'
            }
        ]
    },
    {
        label: 'Community',
        items: [
            {
                icon: '🏆',
                label: 'CTF',
                href: '/ctf',
                badge: 'NEW'
            },
            {
                icon: '📈',
                label: 'Leaderboard',
                href: '/leaderboard'
            },
            {
                icon: '🤖',
                label: 'AI Assistant',
                href: '/ai'
            },
            {
                icon: '📚',
                label: 'Learn',
                href: '/learn'
            }
        ]
    }
];
function Sidebar() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // null = not yet mounted (suppress SSR render entirely)
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Sidebar.useEffect": ()=>{
            const check = {
                "Sidebar.useEffect.check": ()=>setIsDesktop(window.innerWidth > 768)
            }["Sidebar.useEffect.check"];
            check();
            setMounted(true);
            window.addEventListener('resize', check);
            return ({
                "Sidebar.useEffect": ()=>window.removeEventListener('resize', check)
            })["Sidebar.useEffect"];
        }
    }["Sidebar.useEffect"], []);
    if (!mounted || !isDesktop) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            position: 'fixed',
            left: 0,
            top: '52px',
            bottom: 0,
            width: '220px',
            zIndex: 90,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 0',
            overflowY: 'auto',
            background: 'rgba(3,5,10,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            SECTIONS.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        padding: '0 12px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Space Mono',monospace",
                                fontSize: '9px',
                                letterSpacing: '0.15em',
                                color: '#475569',
                                textTransform: 'uppercase',
                                padding: '0 8px 6px'
                            },
                            children: sec.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        sec.items.map((item)=>{
                            const active = path?.startsWith(item.href);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: active ? '8px 8px 8px 8px' : '8px 10px',
                                    borderRadius: '8px',
                                    marginBottom: '2px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    color: active ? '#00ffaa' : '#64748b',
                                    borderLeft: active ? '2px solid #00ffaa' : '2px solid transparent',
                                    background: active ? 'linear-gradient(90deg,rgba(0,255,170,0.08),transparent)' : 'transparent',
                                    transition: 'all 0.15s'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: '18px',
                                            textAlign: 'center',
                                            fontSize: '14px',
                                            flexShrink: 0
                                        },
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            flex: 1
                                        },
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, this),
                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '9px',
                                            padding: '1px 5px',
                                            borderRadius: '3px',
                                            background: item.badge === 'LIVE' ? 'rgba(255,58,92,0.2)' : 'rgba(0,255,170,0.1)',
                                            color: item.badge === 'LIVE' ? '#ff3a5c' : '#00ffaa'
                                        },
                                        children: item.badge
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 79,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, sec.label, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/admin",
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    margin: '0 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: '#475569',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.025)',
                    transition: 'all 0.15s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: '18px',
                            textAlign: 'center',
                            fontSize: '14px'
                        },
                        children: "🔑"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Admin Panel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: '12px',
                    margin: '12px 12px 0',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'rgba(0,255,170,0.04)',
                    border: '1px solid rgba(0,255,170,0.08)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Space Mono',monospace",
                            fontSize: '9px',
                            color: '#475569',
                            marginBottom: '4px'
                        },
                        children: "NVD + OTX LIVE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '9999px',
                                    background: '#00ffaa',
                                    animation: 'pulse-dot 2s ease-in-out infinite',
                                    flexShrink: 0
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '10px',
                                    color: '#00ffaa'
                                },
                                children: "Connected"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(Sidebar, "gSBOI+ZlS/brgxTh5KxnT3xsdO4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Sidebar;
var _c;
__turbopack_refresh__.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/Topbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Topbar": (()=>Topbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const NAV = [
    {
        label: 'DASHBOARD',
        href: '/dashboard'
    },
    {
        label: 'EXPLOITS',
        href: '/exploits'
    },
    {
        label: 'CVE',
        href: '/cve'
    },
    {
        label: 'THREAT MAP',
        href: '/threat-map'
    },
    {
        label: 'SCANNER',
        href: '/scanner'
    },
    {
        label: 'CTF',
        href: '/ctf'
    }
];
function Topbar() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [alias, setAliasState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ghost_x91');
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sync, setSync] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Topbar.useEffect": ()=>{
            // Load persistent alias
            let a = localStorage.getItem('xcloak:alias');
            if (!a) {
                const adj = [
                    'ghost',
                    'shadow',
                    'null',
                    'void',
                    'cipher',
                    'phantom',
                    'byte',
                    'hex',
                    'root',
                    'xor'
                ];
                a = `${adj[Math.floor(Math.random() * 10)]}_${Math.random().toString(36).slice(2, 6)}`;
                localStorage.setItem('xcloak:alias', a);
            }
            setAliasState(a);
            setDraft(a);
        }
    }["Topbar.useEffect"], []);
    function saveAlias() {
        const clean = draft.replace(/[^a-z0-9_\-]/gi, '').slice(0, 24);
        if (clean.length >= 3) {
            localStorage.setItem('xcloak:alias', clean);
            setAliasState(clean);
        }
        setEditing(false);
    }
    async function doSync() {
        setSync('syncing');
        try {
            await fetch('/api/v1/sync', {
                method: 'POST'
            });
            setSync('done');
            setTimeout(()=>setSync('idle'), 3000);
        } catch  {
            setSync('idle');
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "fixed top-0 left-0 right-0 h-[52px] z-[100] flex items-center px-3 sm:px-5 gap-2 sm:gap-4",
        style: {
            background: 'rgba(3,5,10,0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard",
                className: "font-black text-[17px] tracking-tight shrink-0 flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-7 h-7 rounded-md flex items-center justify-center text-sm shrink-0",
                        style: {
                            background: 'linear-gradient(135deg,#00ffaa,#00aaff)'
                        },
                        children: "🛡"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden sm:block",
                        children: [
                            "X",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#00ffaa'
                                },
                                children: "cloak"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Topbar.tsx",
                                lineNumber: 58,
                                columnNumber: 44
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Topbar.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "nav-scroll flex gap-[2px] p-[3px] rounded-lg hidden sm:flex",
                style: {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)'
                },
                children: NAV.map((n)=>{
                    const active = path?.startsWith(n.href);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: n.href,
                        className: "font-mono text-[10px] sm:text-[11px] px-2 sm:px-3 py-[5px] rounded-[5px] transition-all tracking-wider whitespace-nowrap",
                        style: active ? {
                            background: 'linear-gradient(135deg,rgba(0,255,170,0.15),rgba(0,170,255,0.1))',
                            color: '#00ffaa',
                            border: '1px solid rgba(0,255,170,0.25)'
                        } : {
                            color: '#64748b'
                        },
                        children: n.label
                    }, n.href, false, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Topbar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 sm:gap-2.5 ml-auto shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: doSync,
                        className: "font-mono text-[10px] px-2.5 py-[5px] rounded-md border cursor-pointer transition-all hidden sm:block",
                        style: {
                            background: sync === 'done' ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
                            borderColor: sync === 'done' ? 'rgba(0,255,170,0.3)' : 'rgba(255,255,255,0.08)',
                            color: sync === 'done' ? '#00ffaa' : '#64748b'
                        },
                        children: sync === 'syncing' ? '⟳' : sync === 'done' ? '✓' : '↻ SYNC'
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-[3px] rounded hidden sm:block",
                        style: {
                            background: 'rgba(255,58,92,0.12)',
                            border: '1px solid rgba(255,58,92,0.3)',
                            color: '#ff3a5c'
                        },
                        children: "DEFCON 3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            value: draft,
                            onChange: (e)=>setDraft(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') saveAlias();
                                if (e.key === 'Escape') setEditing(false);
                            },
                            onBlur: saveAlias,
                            autoFocus: true,
                            className: "font-mono text-[10px] px-2 py-[4px] rounded-full w-[110px] outline-none",
                            style: {
                                background: 'rgba(0,255,170,0.1)',
                                border: '1px solid rgba(0,255,170,0.4)',
                                color: '#00ffaa'
                            },
                            maxLength: 24
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Topbar.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setDraft(alias);
                            setEditing(true);
                            setTimeout(()=>inputRef.current?.select(), 50);
                        },
                        className: "font-mono text-[10px] sm:text-[11px] px-2 sm:px-3 py-[4px] rounded-full cursor-pointer transition-all group",
                        style: {
                            color: '#00ffaa',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)'
                        },
                        title: "Click to change your alias",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: "👤 "
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Topbar.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    alias.slice(0, 12),
                                    alias.length > 12 ? '…' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Topbar.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[8px] ml-1 text-slate-600 group-hover:text-slate-400",
                                children: "✎"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Topbar.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Topbar.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Topbar.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Topbar.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(Topbar, "O+u5MgF/Y4W9joRWOEMFoMSkioA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Topbar;
var _c;
__turbopack_refresh__.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/Ticker.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "Ticker": (()=>Ticker)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
function Ticker() {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        'Xcloak v2 — Real data from NVD and OTX',
        'Upload PoC exploits · Vote · Earn XP',
        'Hit SYNC to fetch the latest CVEs'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Ticker.useEffect": ()=>{
            fetch('/api/v1/threat?view=pulses&limit=8').then({
                "Ticker.useEffect": (r)=>r.json()
            }["Ticker.useEffect"]).then({
                "Ticker.useEffect": (p)=>{
                    if (Array.isArray(p) && p.length) setItems(p.map({
                        "Ticker.useEffect": (x)=>`[OTX] ${x.name}`
                    }["Ticker.useEffect"]));
                }
            }["Ticker.useEffect"]).catch({
                "Ticker.useEffect": ()=>{}
            }["Ticker.useEffect"]);
        }
    }["Ticker.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-0 left-0 right-0 h-[32px] z-[100] flex items-center overflow-hidden",
        style: {
            background: 'rgba(3,5,10,0.95)',
            borderTop: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 h-full flex items-center px-3 font-mono text-[10px] font-bold text-white tracking-widest",
                style: {
                    background: '#ff3a5c'
                },
                children: "⚠ INTEL"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Ticker.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ticker-inner inline-block whitespace-nowrap font-mono text-[11px] text-slate-500",
                    children: items.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mr-16",
                            children: t
                        }, i, false, {
                            fileName: "[project]/src/components/layout/Ticker.tsx",
                            lineNumber: 20,
                            columnNumber: 31
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Ticker.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Ticker.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Ticker.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Ticker, "HP20pEkwdrkxFNOvXCNhcm+lMSY=");
_c = Ticker;
var _c;
__turbopack_refresh__.register(_c, "Ticker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/MobileNav.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MobileNav": (()=>MobileNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const TABS = [
    {
        icon: '⬡',
        label: 'Home',
        href: '/dashboard'
    },
    {
        icon: '📡',
        label: 'CVE',
        href: '/cve'
    },
    {
        icon: '🗺',
        label: 'Threats',
        href: '/threat-map'
    },
    {
        icon: '💉',
        label: 'Exploits',
        href: '/exploits'
    }
];
const ALL_NAV = [
    {
        section: 'Intelligence',
        items: [
            {
                icon: '⬡',
                label: 'Dashboard',
                href: '/dashboard'
            },
            {
                icon: '🗺',
                label: 'Threat Map',
                href: '/threat-map',
                badge: 'LIVE'
            },
            {
                icon: '📡',
                label: 'CVE Tracker',
                href: '/cve'
            },
            {
                icon: '📰',
                label: 'News',
                href: '/news'
            }
        ]
    },
    {
        section: 'Exploits',
        items: [
            {
                icon: '💉',
                label: 'Browse',
                href: '/exploits'
            },
            {
                icon: '⬆',
                label: 'Upload',
                href: '/exploits/upload'
            },
            {
                icon: '📦',
                label: 'Payloads',
                href: '/payloads'
            },
            {
                icon: '🧬',
                label: 'DNA',
                href: '/dna'
            }
        ]
    },
    {
        section: 'Tools',
        items: [
            {
                icon: '🔭',
                label: 'Scanner',
                href: '/scanner'
            },
            {
                icon: '🕵',
                label: 'OSINT',
                href: '/osint'
            },
            {
                icon: '📊',
                label: 'Reports',
                href: '/reports'
            },
            {
                icon: '🐳',
                label: 'Sandbox',
                href: '/playground'
            }
        ]
    },
    {
        section: 'Community',
        items: [
            {
                icon: '🏆',
                label: 'CTF',
                href: '/ctf'
            },
            {
                icon: '📈',
                label: 'Leaderboard',
                href: '/leaderboard'
            },
            {
                icon: '🤖',
                label: 'AI',
                href: '/ai'
            },
            {
                icon: '📚',
                label: 'Learn',
                href: '/learn'
            }
        ]
    }
];
// Styles as constants so no Tailwind conflict
const S = {
    bar: {
        position: 'fixed',
        bottom: 25,
        left: 0,
        right: 0,
        height: '56px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        gap: '2px',
        background: 'rgba(5,8,15,0.98)',
        borderTop: '1px solid rgba(255,255,255,0.09)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)'
    },
    tab: (active)=>({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderRadius: '10px',
            textDecoration: 'none',
            color: active ? '#00ffaa' : '#475569',
            background: active ? 'rgba(0,255,170,0.1)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s'
        }),
    tabIcon: {
        fontSize: '18px',
        lineHeight: 1
    },
    tabLabel: {
        fontFamily: "'Space Mono', monospace",
        fontSize: '9px',
        lineHeight: 1
    }
};
function MobileNav() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileNav.useEffect": ()=>{
            const check = {
                "MobileNav.useEffect.check": ()=>setIsMobile(window.innerWidth <= 768)
            }["MobileNav.useEffect.check"];
            check();
            setMounted(true);
            window.addEventListener('resize', check);
            return ({
                "MobileNav.useEffect": ()=>window.removeEventListener('resize', check)
            })["MobileNav.useEffect"];
        }
    }["MobileNav.useEffect"], []);
    // Don't render until mounted (avoids hydration mismatch)
    if (!mounted || !isMobile) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: S.bar,
                children: [
                    TABS.map((item)=>{
                        const active = path?.startsWith(item.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            style: S.tab(active),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: S.tabIcon,
                                    children: item.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: S.tabLabel,
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 99,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen(true),
                        style: S.tab(open),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: S.tabIcon,
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: S.tabLabel,
                                children: "More"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: ()=>setOpen(false),
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 200,
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: '#060b14',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px 20px 0 0',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        animation: 'slide-up 0.2s ease-out'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '12px 0 8px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '36px',
                                    height: '4px',
                                    borderRadius: '99px',
                                    background: 'rgba(255,255,255,0.15)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 135,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '4px 16px 12px',
                                borderBottom: '1px solid rgba(255,255,255,0.07)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Syne',sans-serif",
                                        fontWeight: 900,
                                        fontSize: '18px'
                                    },
                                    children: [
                                        "X",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: '#00ffaa'
                                            },
                                            children: "cloak"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                                            lineNumber: 145,
                                            columnNumber: 18
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpen(false),
                                    style: {
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#64748b',
                                        fontSize: '22px',
                                        lineHeight: 1
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 140,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '12px 12px 80px'
                            },
                            children: [
                                ALL_NAV.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: "'Space Mono',monospace",
                                                    fontSize: '9px',
                                                    letterSpacing: '0.14em',
                                                    color: '#475569',
                                                    textTransform: 'uppercase',
                                                    padding: '0 4px 8px'
                                                },
                                                children: sec.section
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                lineNumber: 154,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(4,1fr)',
                                                    gap: '6px'
                                                },
                                                children: sec.items.map((item)=>{
                                                    const active = path?.startsWith(item.href);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: item.href,
                                                        onClick: ()=>setOpen(false),
                                                        style: {
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: '5px',
                                                            padding: '10px 2px',
                                                            borderRadius: '12px',
                                                            background: active ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${active ? 'rgba(0,255,170,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                                            textDecoration: 'none',
                                                            position: 'relative'
                                                        },
                                                        children: [
                                                            item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    position: 'absolute',
                                                                    top: '3px',
                                                                    right: '3px',
                                                                    fontFamily: "'Space Mono',monospace",
                                                                    fontSize: '7px',
                                                                    padding: '1px 3px',
                                                                    borderRadius: '3px',
                                                                    fontWeight: 700,
                                                                    background: item.badge === 'LIVE' ? 'rgba(255,58,92,0.85)' : 'rgba(0,255,170,0.85)',
                                                                    color: '#000'
                                                                },
                                                                children: item.badge
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '22px',
                                                                    lineHeight: 1
                                                                },
                                                                children: item.icon
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "'Space Mono',monospace",
                                                                    fontSize: '9px',
                                                                    color: active ? '#00ffaa' : '#94a3b8',
                                                                    textAlign: 'center',
                                                                    lineHeight: 1.3
                                                                },
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, item.href, true, {
                                                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, sec.section, true, {
                                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/admin",
                                    onClick: ()=>setOpen(false),
                                    style: {
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '11px',
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: '#64748b',
                                        textDecoration: 'none'
                                    },
                                    children: "🔑 Admin Panel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 151,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(MobileNav, "nViOtr/cN4AnlRi5i/qHfOhVyoA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileNav;
var _c;
__turbopack_refresh__.register(_c, "MobileNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/layout/LayoutShell.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "LayoutShell": (()=>LayoutShell)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
function LayoutShell({ children }) {
    _s();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDesktop, setIsDesktop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LayoutShell.useEffect": ()=>{
            const check = {
                "LayoutShell.useEffect.check": ()=>setIsDesktop(window.innerWidth > 768)
            }["LayoutShell.useEffect.check"];
            check();
            setMounted(true);
            window.addEventListener('resize', check);
            return ({
                "LayoutShell.useEffect": ()=>window.removeEventListener('resize', check)
            })["LayoutShell.useEffect"];
        }
    }["LayoutShell.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            marginLeft: mounted && isDesktop ? '220px' : '0',
            paddingTop: '52px',
            paddingBottom: mounted && !isDesktop ? '72px' : '40px',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 1,
            transition: 'margin-left 0.15s'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/LayoutShell.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(LayoutShell, "pi2qGEkwmJA7JwkKARZU/KmiK2o=");
_c = LayoutShell;
var _c;
__turbopack_refresh__.register(_c, "LayoutShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_23c576._.js.map