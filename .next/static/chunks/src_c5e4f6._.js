(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_c5e4f6._.js", {

"[project]/src/lib/identity.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Persistent anonymous identity — same alias every visit unless user changes it
// Stored in localStorage + a long-lived cookie for server-side reads
__turbopack_esm__({
    "getAlias": (()=>getAlias),
    "getIdentity": (()=>getIdentity),
    "setAlias": (()=>setAlias)
});
const KEY_ALIAS = 'xcloak:alias';
const KEY_FP = 'xcloak:fp';
function rand(n) {
    return Math.random().toString(36).slice(2, 2 + n);
}
function generateAlias() {
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
        'dark',
        'zero',
        'xor'
    ];
    return `${adj[Math.floor(Math.random() * adj.length)]}_${rand(4)}`;
}
function generateFP() {
    // Stable fingerprint from browser properties — best effort
    const parts = [
        navigator.language ?? 'en',
        screen.width + 'x' + screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC',
        navigator.hardwareConcurrency ?? 4,
        String(navigator.maxTouchPoints ?? 0)
    ];
    // Simple hash
    const str = parts.join('|');
    let h = 0x811c9dc5;
    for(let i = 0; i < str.length; i++){
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
}
function getIdentity() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    let alias = localStorage.getItem(KEY_ALIAS);
    let fp = localStorage.getItem(KEY_FP);
    if (!alias) {
        alias = generateAlias();
        localStorage.setItem(KEY_ALIAS, alias);
    }
    if (!fp) {
        fp = generateFP();
        localStorage.setItem(KEY_FP, fp);
    }
    return {
        alias,
        fp
    };
}
function setAlias(newAlias) {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const clean = newAlias.replace(/[^a-z0-9_\-]/gi, '').slice(0, 24);
    if (clean.length < 3) return;
    localStorage.setItem(KEY_ALIAS, clean);
}
function getAlias() {
    return getIdentity().alias;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/notifications/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>NotificationsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$identity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/identity.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const TYPE_ICON = {
    cve_alert: '🚨',
    ctf_solve: '🏆',
    exploit_upload: '📦',
    payment: '💳',
    scan_complete: '✅',
    system: '📢'
};
const TYPE_COLOR = {
    cve_alert: '#ff3a5c',
    ctf_solve: '#00ffaa',
    exploit_upload: '#a78bfa',
    payment: '#00aaff',
    scan_complete: '#00ffaa',
    system: '#ffd700'
};
function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
}
function NotificationsPage() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const loggedIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])();
    const alias = loggedIn ? user?.username ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$identity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlias"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$identity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlias"])();
    const [notifs, setNotifs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [unread, setUnread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "NotificationsPage.useCallback[load]": async ()=>{
            try {
                const res = await fetch(`/api/v1/notifications?alias=${encodeURIComponent(alias)}&limit=50`);
                const data = await res.json();
                setNotifs(data.notifications ?? []);
                setUnread(data.unread ?? 0);
            } catch  {
                setNotifs([]);
            }
            setLoading(false);
        }
    }["NotificationsPage.useCallback[load]"], [
        alias
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NotificationsPage.useEffect": ()=>{
            load();
        }
    }["NotificationsPage.useEffect"], [
        load
    ]);
    async function markAllRead() {
        await fetch('/api/v1/notifications/read', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alias
            })
        });
        setNotifs((prev)=>prev.map((n)=>({
                    ...n,
                    read: true
                })));
        setUnread(0);
    }
    async function markOneRead(id) {
        await fetch('/api/v1/notifications/read', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alias,
                id
            })
        });
        setNotifs((prev)=>prev.map((n)=>n.id === id ? {
                    ...n,
                    read: true
                } : n));
        setUnread((prev)=>Math.max(0, prev - 1));
    }
    const displayed = filter === 'unread' ? notifs.filter((n)=>!n.read) : notifs;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 max-w-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-5 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "Notifications",
                                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 font-mono text-[12px] font-bold px-2 py-0.5 rounded-full",
                                        style: {
                                            background: 'rgba(255,58,92,0.15)',
                                            color: '#ff3a5c'
                                        },
                                        children: unread
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notifications/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 26
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/notifications/page.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: "CVE alerts · CTF solves · exploit uploads · payments"
                            }, void 0, false, {
                                fileName: "[project]/src/app/notifications/page.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    unread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: markAllRead,
                        className: "font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:opacity-80",
                        style: {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#64748b'
                        },
                        children: "Mark all read"
                    }, void 0, false, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 p-1 rounded-xl mb-4 w-fit",
                style: {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: [
                    'all',
                    'unread'
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilter(f),
                        className: "px-4 py-1.5 rounded-lg font-mono text-[10px] font-bold capitalize cursor-pointer transition-all",
                        style: filter === f ? {
                            background: 'rgba(0,255,170,0.1)',
                            border: '1px solid rgba(0,255,170,0.25)',
                            color: '#00ffaa'
                        } : {
                            color: '#475569',
                            border: '1px solid transparent'
                        },
                        children: [
                            f,
                            " ",
                            f === 'unread' && unread > 0 ? `(${unread})` : ''
                        ]
                    }, f, true, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass p-10 text-center font-mono text-[11px] text-slate-600 animate-pulse",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this) : displayed.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-3xl mb-3 opacity-30",
                        children: "🔔"
                    }, void 0, false, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 105,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[12px] text-slate-600 mb-1",
                        children: filter === 'unread' ? 'All caught up!' : 'No notifications yet'
                    }, void 0, false, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[10px] text-slate-700",
                        children: "You will be notified about CVEs, CTF solves, exploit uploads, and payments."
                    }, void 0, false, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: displayed.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-xl flex items-start gap-3 transition-all cursor-pointer hover:opacity-90",
                        style: {
                            borderColor: n.read ? 'rgba(255,255,255,0.06)' : `${TYPE_COLOR[n.type] ?? '#64748b'}30`,
                            background: n.read ? undefined : `${TYPE_COLOR[n.type] ?? '#64748b'}05`
                        },
                        onClick: ()=>{
                            if (!n.read) markOneRead(n.id);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0",
                                style: {
                                    background: `${TYPE_COLOR[n.type] ?? '#64748b'}15`,
                                    border: `1px solid ${TYPE_COLOR[n.type] ?? '#64748b'}25`
                                },
                                children: TYPE_ICON[n.type] ?? '🔔'
                            }, void 0, false, {
                                fileName: "[project]/src/app/notifications/page.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[11px] font-bold text-slate-200 leading-snug",
                                                children: n.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/notifications/page.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 shrink-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] text-slate-700",
                                                        children: timeAgo(n.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notifications/page.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 21
                                                    }, this),
                                                    !n.read && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 rounded-full shrink-0",
                                                        style: {
                                                            background: TYPE_COLOR[n.type] ?? '#ff3a5c'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/notifications/page.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/notifications/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/notifications/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[10px] text-slate-500 mt-1 leading-relaxed",
                                        children: n.body
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notifications/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 17
                                    }, this),
                                    n.link && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: n.link,
                                        className: "font-mono text-[9px] mt-1.5 inline-block hover:underline",
                                        style: {
                                            color: TYPE_COLOR[n.type] ?? '#00ffaa'
                                        },
                                        onClick: (e)=>e.stopPropagation(),
                                        children: "View →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/notifications/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/notifications/page.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this)
                        ]
                    }, n.id, true, {
                        fileName: "[project]/src/app/notifications/page.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 110,
                columnNumber: 9
            }, this),
            !loggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass mt-4 p-4 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-mono text-[11px] text-slate-600",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            className: "text-accent hover:underline",
                            children: "Create an account"
                        }, void 0, false, {
                            fileName: "[project]/src/app/notifications/page.tsx",
                            lineNumber: 142,
                            columnNumber: 13
                        }, this),
                        ' ',
                        "to receive personal notifications for scans, CTF solves, and payments."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/notifications/page.tsx",
                    lineNumber: 141,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/notifications/page.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/notifications/page.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(NotificationsPage, "XWtKOnWTr5wEeSwdw2fgkusTGAs=");
_c = NotificationsPage;
var _c;
__turbopack_refresh__.register(_c, "NotificationsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/notifications/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_c5e4f6._.js.map