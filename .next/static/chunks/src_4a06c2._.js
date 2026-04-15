(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_4a06c2._.js", {

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
;
var _s = __turbopack_refresh__.signature();
'use client';
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
    return(// Use inline style for display so CSS media query can override it cleanly
    // sidebar-hide class sets display:none on mobile via globals.css
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "sidebar-el fixed left-0 top-[52px] bottom-0 w-[220px] z-[90] flex flex-col py-4 overflow-y-auto",
        style: {
            background: 'rgba(3,5,10,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255,255,255,0.06)'
        },
        children: [
            SECTIONS.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-5 px-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[9px] tracking-[0.15em] text-slate-600 uppercase px-2 mb-1.5",
                            children: sec.label
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Sidebar.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this),
                        sec.items.map((item)=>{
                            const active = path?.startsWith(item.href);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: "flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-px text-[13px] font-semibold transition-all duration-150",
                                style: active ? {
                                    color: '#00ffaa',
                                    borderLeft: '2px solid #00ffaa',
                                    paddingLeft: '8px',
                                    background: 'linear-gradient(90deg,rgba(0,255,170,0.08),transparent)'
                                } : {
                                    color: '#64748b'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-[18px] text-center text-sm shrink-0",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this),
                                    item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-mono text-[9px] px-1.5 py-[1px] rounded-[3px] ${item.badge === 'LIVE' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/10 text-green-400'}`,
                                        children: item.badge
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                                        lineNumber: 63,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, sec.label, true, {
                    fileName: "[project]/src/components/layout/Sidebar.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto mx-3 p-3 rounded-lg",
                style: {
                    background: 'rgba(0,255,170,0.04)',
                    border: '1px solid rgba(0,255,170,0.08)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[9px] text-slate-600 mb-1",
                        children: "NVD + OTX LIVE"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px]",
                                style: {
                                    color: '#00ffaa'
                                },
                                children: "Connected"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Sidebar.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Sidebar.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Sidebar.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Sidebar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this));
}
_s(Sidebar, "kx72sda92+XlSh1QiZvq/YVQxpY=", false, function() {
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
                label: 'News Feed',
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
                label: 'Playground',
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
function MobileNav() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-nav-bar fixed bottom-7 left-0 right-0 h-[56px] z-[100] items-center px-1 gap-0.5",
                style: {
                    background: 'rgba(5,8,15,0.98)',
                    borderTop: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)'
                },
                children: [
                    TABS.map((item)=>{
                        const active = path?.startsWith(item.href);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: item.href,
                            style: {
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2px',
                                paddingTop: '6px',
                                paddingBottom: '6px',
                                borderRadius: '10px',
                                color: active ? '#00ffaa' : '#475569',
                                background: active ? 'rgba(0,255,170,0.08)' : 'transparent'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '18px',
                                        lineHeight: 1
                                    },
                                    children: item.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'Space Mono, monospace',
                                        fontSize: '9px',
                                        lineHeight: 1
                                    },
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 65,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.href, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setOpen(true),
                        style: {
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '2px',
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            color: open ? '#00ffaa' : '#475569',
                            background: open ? 'rgba(0,255,170,0.08)' : 'transparent'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '18px',
                                    lineHeight: 1
                                },
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'Space Mono, monospace',
                                    fontSize: '9px',
                                    lineHeight: 1
                                },
                                children: "More"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 200,
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                },
                onClick: ()=>setOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: '#080d17',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: '20px 20px 0 0',
                        maxHeight: '82vh',
                        overflowY: 'auto',
                        animation: 'slide-up 0.22s ease-out'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                                paddingTop: '12px',
                                paddingBottom: '8px'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '40px',
                                    height: '4px',
                                    borderRadius: '9999px',
                                    background: 'rgba(255,255,255,0.15)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 101,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '8px 16px 12px',
                                borderBottom: '1px solid rgba(255,255,255,0.07)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'Syne,sans-serif',
                                        fontWeight: 900,
                                        fontSize: '17px'
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
                                            lineNumber: 109,
                                            columnNumber: 18
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setOpen(false),
                                    style: {
                                        color: '#64748b',
                                        fontSize: '20px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        lineHeight: 1
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: '12px 12px 80px'
                            },
                            children: [
                                ALL_NAV.map((sec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '16px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontFamily: 'Space Mono, monospace',
                                                    fontSize: '9px',
                                                    letterSpacing: '0.12em',
                                                    color: '#475569',
                                                    textTransform: 'uppercase',
                                                    padding: '0 4px 6px'
                                                },
                                                children: sec.section
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gridTemplateColumns: 'repeat(4, 1fr)',
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
                                                            padding: '10px 4px',
                                                            borderRadius: '12px',
                                                            background: active ? 'rgba(0,255,170,0.1)' : 'rgba(255,255,255,0.04)',
                                                            border: `1px solid ${active ? 'rgba(0,255,170,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                                            position: 'relative',
                                                            textDecoration: 'none'
                                                        },
                                                        children: [
                                                            item.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    position: 'absolute',
                                                                    top: '4px',
                                                                    right: '4px',
                                                                    fontFamily: 'Space Mono, monospace',
                                                                    fontSize: '7px',
                                                                    padding: '1px 3px',
                                                                    borderRadius: '3px',
                                                                    background: item.badge === 'LIVE' ? 'rgba(255,58,92,0.8)' : 'rgba(0,255,170,0.8)',
                                                                    color: '#000',
                                                                    fontWeight: 700
                                                                },
                                                                children: item.badge
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                                lineNumber: 139,
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
                                                                lineNumber: 147,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: 'Space Mono, monospace',
                                                                    fontSize: '9px',
                                                                    color: active ? '#00ffaa' : '#94a3b8',
                                                                    textAlign: 'center',
                                                                    lineHeight: 1.2
                                                                },
                                                                children: item.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                                lineNumber: 148,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, item.href, true, {
                                                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/MobileNav.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, sec.section, true, {
                                        fileName: "[project]/src/components/layout/MobileNav.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/admin",
                                    style: {
                                        display: 'block',
                                        textAlign: 'center',
                                        padding: '10px',
                                        fontFamily: 'Space Mono,monospace',
                                        fontSize: '11px',
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: '10px',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        color: '#64748b',
                                        textDecoration: 'none',
                                        marginTop: '4px'
                                    },
                                    children: "🔑 Admin Panel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/MobileNav.tsx",
                            lineNumber: 118,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/MobileNav.tsx",
                    lineNumber: 88,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/MobileNav.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(MobileNav, "JYutTIfyhlSkZkrzobJqv2gi7Ak=", false, function() {
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
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_4a06c2._.js.map