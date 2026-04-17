(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_d0be9b._.js", {

"[project]/src/lib/eso-auth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Unified auth for Xcloak + ESO.
 * One login → one JWT cookie → works everywhere.
 */ __turbopack_esm__({
    "clearSession": (()=>clearSession),
    "getAuthHeader": (()=>getAuthHeader),
    "getToken": (()=>getToken),
    "getUser": (()=>getUser),
    "isAdmin": (()=>isAdmin),
    "isLoggedIn": (()=>isLoggedIn),
    "saveSession": (()=>saveSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
;
const TOKEN_KEY = 'eso_token';
const USER_KEY = 'eso_user';
function saveSession(token, user) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].set(TOKEN_KEY, token, {
        expires: 1,
        sameSite: 'strict'
    });
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        // Keep xcloak admin compatible — if admin, set the old session key too
        if (user?.role === 'admin') {
            sessionStorage.setItem('xcloak-admin-alias', user.username ?? 'admin');
        }
    }
}
function clearSession() {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].remove(TOKEN_KEY);
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem(USER_KEY);
        sessionStorage.removeItem('xcloak-admin-alias');
    }
}
function getToken() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(TOKEN_KEY);
}
function getUser() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch  {
        return null;
    }
}
function isLoggedIn() {
    return !!getToken();
}
function isAdmin() {
    const user = getUser();
    if (user?.role === 'admin') return true;
    // Fallback: check old xcloak admin session
    if ("object" !== 'undefined' && sessionStorage.getItem('xcloak-admin-alias')) return true;
    return false;
}
function getAuthHeader() {
    const token = getToken();
    return token ? {
        Authorization: `Bearer ${token}`
    } : {};
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/eso-admin/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>EsoAdminPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
const TIER_COLOR = {
    free: '#64748b',
    pro: '#00aaff',
    enterprise: '#a78bfa',
    admin: '#00ffaa'
};
const STATUS_COLOR = {
    completed: '#00ffaa',
    failed: '#ff3a5c',
    running: '#00aaff',
    planning: '#ffd700',
    pending: '#475569',
    timeout: '#ff3a5c'
};
async function adminFetch(path, opts) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    const res = await fetch(`/api/eso${path}`, {
        ...opts,
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...opts?.headers
        }
    });
    if (!res.ok) {
        const text = await res.text().catch(()=>res.statusText);
        throw new Error(`${res.status}: ${text}`);
    }
    return res.json();
}
function EsoAdminPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false) // wait for mount before auth check
    ;
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('stats');
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [scans, setScans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tiers, setTiers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Auth guard — runs client-side only after mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EsoAdminPage.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAdmin"])()) {
                router.push('/login?from=eso-admin');
                return;
            }
            setReady(true);
        }
    }["EsoAdminPage.useEffect"], [
        router
    ]);
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "EsoAdminPage.useCallback[load]": async ()=>{
            if (!ready) return;
            setLoading(true);
            try {
                if (tab === 'stats') {
                    setStats(await adminFetch('/admin/stats'));
                } else if (tab === 'users') {
                    const r = await adminFetch('/admin/users?limit=100');
                    setUsers(r.users ?? []);
                } else if (tab === 'scans') {
                    const r = await adminFetch('/admin/scans?limit=50');
                    setScans(r.scans ?? []);
                } else if (tab === 'tiers') {
                    const r = await adminFetch('/admin/tiers');
                    setTiers(r.tiers ?? []);
                }
            } catch (e) {
                setMsg(`✗ ${e.message}`);
            }
            setLoading(false);
        }
    }["EsoAdminPage.useCallback[load]"], [
        tab,
        ready
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EsoAdminPage.useEffect": ()=>{
            load();
        }
    }["EsoAdminPage.useEffect"], [
        load
    ]);
    async function setTier(userId, tier) {
        try {
            await adminFetch('/admin/users/tier', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId,
                    tier
                })
            });
            setMsg(`✓ ${userId} → ${tier}`);
            load();
        } catch (e) {
            setMsg(`✗ ${e.message}`);
        }
    }
    async function toggleUser(userId, active) {
        try {
            await adminFetch('/admin/users/status', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId,
                    is_active: active
                })
            });
            setMsg(`✓ User ${active ? 'enabled' : 'disabled'}`);
            load();
        } catch (e) {
            setMsg(`✗ ${e.message}`);
        }
    }
    async function resetQuota(userId) {
        try {
            await adminFetch('/admin/users/reset-quota', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId
                })
            });
            setMsg(`✓ Quota reset`);
            load();
        } catch (e) {
            setMsg(`✗ ${e.message}`);
        }
    }
    function handleLogout() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
        router.push('/login');
    }
    // Show nothing while checking auth (prevents flash of redirect)
    if (!ready) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-mono text-[11px] text-slate-600 animate-pulse",
            children: "Checking access..."
        }, void 0, false, {
            fileName: "[project]/src/app/eso-admin/page.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/eso-admin/page.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
    const filteredUsers = users.filter((u)=>!search || [
            u.username,
            u.email,
            u.user_id
        ].some((f)=>f?.toLowerCase().includes(search.toLowerCase())));
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const td = "px-4 py-2.5 font-mono text-[11px]";
    const TABS = [
        {
            id: 'stats',
            label: 'Overview',
            icon: '📊'
        },
        {
            id: 'users',
            label: 'Users',
            icon: '👥'
        },
        {
            id: 'scans',
            label: 'Scans',
            icon: '🔍'
        },
        {
            id: 'tiers',
            label: 'Tiers',
            icon: '🎯'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-5 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "ESO ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-accent",
                                        children: "Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 129,
                                        columnNumber: 51
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: [
                                    "Signed in as ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-accent font-bold",
                                        children: user?.username ?? 'admin'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-700",
                                        children: " · "
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: TIER_COLOR[user?.tier ?? 'admin']
                                        },
                                        children: [
                                            user?.tier ?? 'admin',
                                            " tier"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: load,
                                className: "font-mono text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors",
                                children: "↻ Refresh"
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "font-mono text-[11px] text-red-400 hover:text-red-300 cursor-pointer transition-colors",
                                children: "Sign out"
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 mb-5 flex-wrap",
                children: [
                    {
                        label: '← Scan Dashboard',
                        href: '/scan'
                    },
                    {
                        label: 'Xcloak Admin',
                        href: '/admin'
                    },
                    {
                        label: 'Pricing Page',
                        href: '/pricing'
                    }
                ].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: l.href,
                        className: "font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors",
                        children: l.label
                    }, l.href, false, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 p-3 rounded-lg border font-mono text-[11px]",
                style: msg.startsWith('✓') ? {
                    background: 'rgba(0,255,170,0.06)',
                    borderColor: 'rgba(0,255,170,0.2)',
                    color: '#00ffaa'
                } : {
                    background: 'rgba(255,58,92,0.06)',
                    borderColor: 'rgba(255,58,92,0.2)',
                    color: '#ff3a5c'
                },
                children: [
                    msg,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setMsg(''),
                        className: "ml-3 opacity-50 hover:opacity-100 cursor-pointer",
                        children: "✕"
                    }, void 0, false, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1 mb-5 p-1 rounded-xl",
                style: {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)'
                },
                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setTab(t.id),
                        className: "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-mono text-[11px] font-bold cursor-pointer transition-all",
                        style: tab === t.id ? {
                            background: 'rgba(0,255,170,0.1)',
                            border: '1px solid rgba(0,255,170,0.25)',
                            color: '#00ffaa'
                        } : {
                            color: '#475569',
                            border: '1px solid transparent'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline",
                                children: t.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 177,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-12 text-center font-mono text-[11px] text-slate-600 animate-pulse",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 182,
                columnNumber: 19
            }, this),
            tab === 'stats' && stats && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                        children: [
                            {
                                label: 'Total Users',
                                val: stats.users?.total ?? 0,
                                color: '#00aaff'
                            },
                            {
                                label: 'Total Scans',
                                val: stats.scans?.total ?? 0,
                                color: '#a78bfa'
                            },
                            {
                                label: 'Last 24h',
                                val: stats.scans?.last_24h ?? 0,
                                color: '#00ffaa'
                            },
                            {
                                label: 'Findings',
                                val: stats.findings?.total ?? 0,
                                color: '#ff8c42'
                            }
                        ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass px-4 py-3 relative overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 left-0 right-0 h-px",
                                        style: {
                                            background: `linear-gradient(90deg,transparent,${s.color}40,transparent)`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-2xl font-bold",
                                        style: {
                                            color: s.color
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-1",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 194,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                children: "Users by Tier"
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3",
                                children: Object.entries(stats.users?.by_tier ?? {}).map(([tier, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 rounded-xl border",
                                        style: {
                                            borderColor: `${TIER_COLOR[tier] ?? '#475569'}40`,
                                            background: `${TIER_COLOR[tier] ?? '#475569'}0d`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-xl font-bold",
                                                style: {
                                                    color: TIER_COLOR[tier] ?? '#475569'
                                                },
                                                children: count
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[9px] text-slate-600 capitalize mt-0.5",
                                                children: tier
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, tier, true, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-2.5 border-b border-white/[0.06]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                    children: "Recent Activity"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            (stats.recent_scans ?? []).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between px-4 py-2.5 border-b border-white/[0.03] last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[12px] text-slate-200",
                                                    children: s.target || '—'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-slate-600 ml-2",
                                                    children: [
                                                        "by ",
                                                        s.username
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-slate-500",
                                                    children: [
                                                        s.findings_count ?? 0,
                                                        " findings"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[9px] px-2 py-[2px] rounded",
                                                    style: {
                                                        color: STATUS_COLOR[s.status] ?? '#64748b',
                                                        background: 'rgba(255,255,255,0.05)'
                                                    },
                                                    children: s.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, s.process_id, true, {
                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this),
            tab === 'users' && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            placeholder: "Search by username, email or user_id...",
                            className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"
                        }, void 0, false, {
                            fileName: "[project]/src/app/eso-admin/page.tsx",
                            lineNumber: 242,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass overflow-x-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full border-collapse min-w-[700px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            style: {
                                                background: 'rgba(255,255,255,0.015)',
                                                borderBottom: '1px solid rgba(255,255,255,0.06)'
                                            },
                                            children: [
                                                'User',
                                                'Email',
                                                'Tier',
                                                'Today',
                                                'Total',
                                                'Status',
                                                'Actions'
                                            ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5",
                                                    children: h
                                                }, h, false, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: filteredUsers.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: td,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-200 font-semibold",
                                                                children: u.username
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-600 text-[9px]",
                                                                children: u.user_id
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: `${td} text-slate-500`,
                                                        children: u.email
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: td,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: u.tier ?? 'free',
                                                            onChange: (e)=>setTier(u.user_id, e.target.value),
                                                            className: "bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 font-mono text-[10px] cursor-pointer outline-none",
                                                            style: {
                                                                color: TIER_COLOR[u.tier ?? 'free']
                                                            },
                                                            children: [
                                                                'free',
                                                                'pro',
                                                                'enterprise',
                                                                'admin'
                                                            ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: t,
                                                                    children: t
                                                                }, t, false, {
                                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                                    lineNumber: 268,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                                            lineNumber: 264,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: `${td} font-mono text-slate-300`,
                                                        children: u.scans_today ?? 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: `${td} font-mono text-slate-500`,
                                                        children: u.total_scans ?? 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: td,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono text-[9px] font-bold",
                                                            style: {
                                                                color: u.is_active ? '#00ffaa' : '#ff3a5c'
                                                            },
                                                            children: u.is_active ? 'Active' : 'Disabled'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                                            lineNumber: 275,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: td,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>toggleUser(u.user_id, !u.is_active),
                                                                    className: "font-mono text-[9px] cursor-pointer hover:opacity-80",
                                                                    style: {
                                                                        color: u.is_active ? '#ff3a5c' : '#00ffaa'
                                                                    },
                                                                    children: u.is_active ? 'Disable' : 'Enable'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                                    lineNumber: 281,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>resetQuota(u.user_id),
                                                                    className: "font-mono text-[9px] text-slate-600 hover:text-slate-300 cursor-pointer",
                                                                    children: "Reset quota"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                                            lineNumber: 280,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, u.user_id, true, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 257,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            filteredUsers.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center font-mono text-[11px] text-slate-600",
                                children: "No users"
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 296,
                                columnNumber: 40
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 240,
                columnNumber: 9
            }, this),
            tab === 'scans' && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass overflow-x-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full border-collapse min-w-[750px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    style: {
                                        background: 'rgba(255,255,255,0.015)',
                                        borderBottom: '1px solid rgba(255,255,255,0.06)'
                                    },
                                    children: [
                                        'Target',
                                        'User',
                                        'Tier',
                                        'Status',
                                        'Risk',
                                        'Findings',
                                        'Duration',
                                        'Date'
                                    ].map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 text-left px-4 py-2.5",
                                            children: h
                                        }, h, false, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: scans.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: td,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-200",
                                                        children: s.target || '—'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-slate-600 text-[9px]",
                                                        children: s.process_id
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `${td} text-slate-400`,
                                                children: s.username
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: TIER_COLOR[s.tier ?? 'free']
                                                    },
                                                    className: "font-mono text-[9px]",
                                                    children: s.tier ?? 'free'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 38
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 320,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: td,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[9px] px-2 py-[2px] rounded",
                                                    style: {
                                                        color: STATUS_COLOR[s.status] ?? '#64748b',
                                                        background: 'rgba(255,255,255,0.05)'
                                                    },
                                                    children: s.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `${td} font-mono text-[10px]`,
                                                style: {
                                                    color: {
                                                        critical: '#ff3a5c',
                                                        high: '#ff8c42',
                                                        medium: '#ffd700',
                                                        low: '#00aaff'
                                                    }[s.risk_level] ?? '#64748b'
                                                },
                                                children: (s.risk_level || '—').toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 327,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `${td} font-mono text-accent2`,
                                                children: s.findings_count ?? 0
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `${td} font-mono text-slate-500`,
                                                children: s.duration_seconds ? `${(s.duration_seconds / 60).toFixed(1)}m` : '—'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: `${td} font-mono text-slate-600 text-[10px]`,
                                                children: s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s.process_id, true, {
                                        fileName: "[project]/src/app/eso-admin/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 304,
                        columnNumber: 11
                    }, this),
                    scans.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 text-center font-mono text-[11px] text-slate-600",
                        children: "No scans"
                    }, void 0, false, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 338,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 303,
                columnNumber: 9
            }, this),
            tab === 'tiers' && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: tiers.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4",
                        style: {
                            borderColor: `${TIER_COLOR[t.tier] ?? '#475569'}40`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] uppercase tracking-widest mb-3 font-bold",
                                style: {
                                    color: TIER_COLOR[t.tier] ?? '#475569'
                                },
                                children: t.tier
                            }, void 0, false, {
                                fileName: "[project]/src/app/eso-admin/page.tsx",
                                lineNumber: 347,
                                columnNumber: 15
                            }, this),
                            [
                                [
                                    'Scans / day',
                                    t.scans_per_day
                                ],
                                [
                                    'Concurrent',
                                    t.max_concurrent
                                ],
                                [
                                    'Max duration',
                                    `${t.max_scan_duration}s`
                                ],
                                [
                                    'Tools',
                                    (t.allowed_tools ?? []).join(', ')
                                ],
                                [
                                    'AI analysis',
                                    t.ai_analysis_enabled ? '✓' : '✗'
                                ],
                                [
                                    'Proposals',
                                    t.proposals_enabled ? '✓' : '✗'
                                ],
                                [
                                    'Scheduling',
                                    t.scheduling_enabled ? '✓' : '✗'
                                ],
                                [
                                    'Teams',
                                    t.teams_enabled ? '✓' : '✗'
                                ],
                                [
                                    'PDF reports',
                                    t.pdf_reports_enabled ? '✓' : '✗'
                                ],
                                [
                                    'API access',
                                    t.api_access_enabled ? '✓' : '✗'
                                ]
                            ].map(([label, val])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between py-1.5 border-b border-white/[0.04] last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-slate-600",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-slate-300",
                                            children: String(val)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/eso-admin/page.tsx",
                                            lineNumber: 364,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, String(label), true, {
                                    fileName: "[project]/src/app/eso-admin/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 17
                                }, this))
                        ]
                    }, t.tier, true, {
                        fileName: "[project]/src/app/eso-admin/page.tsx",
                        lineNumber: 346,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/eso-admin/page.tsx",
                lineNumber: 344,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/eso-admin/page.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
_s(EsoAdminPage, "5AtgSWio1I2G+mN0O0la94wBLlY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EsoAdminPage;
var _c;
__turbopack_refresh__.register(_c, "EsoAdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/eso-admin/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/*! js-cookie v3.0.5 | MIT */ /* eslint-disable no-var */ __turbopack_esm__({
    "default": (()=>api)
});
function assign(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i];
        for(var key in source){
            target[key] = source[key];
        }
    }
    return target;
}
/* eslint-enable no-var */ /* eslint-disable no-var */ var defaultConverter = {
    read: function(value) {
        if (value[0] === '"') {
            value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
        return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
};
/* eslint-enable no-var */ /* eslint-disable no-var */ function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
        if (typeof document === 'undefined') {
            return;
        }
        attributes = assign({}, defaultAttributes, attributes);
        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
            attributes.expires = attributes.expires.toUTCString();
        }
        name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var stringifiedAttributes = '';
        for(var attributeName in attributes){
            if (!attributes[attributeName]) {
                continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
                continue;
            }
            // Considers RFC 6265 section 5.2:
            // ...
            // 3.  If the remaining unparsed-attributes contains a %x3B (";")
            //     character:
            // Consume the characters of the unparsed-attributes up to,
            // not including, the first %x3B (";") character.
            // ...
            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }
        return document.cookie = name + '=' + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
        if (typeof document === 'undefined' || arguments.length && !name) {
            return;
        }
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for(var i = 0; i < cookies.length; i++){
            var parts = cookies[i].split('=');
            var value = parts.slice(1).join('=');
            try {
                var found = decodeURIComponent(parts[0]);
                jar[found] = converter.read(value, found);
                if (name === found) {
                    break;
                }
            } catch (e) {}
        }
        return name ? jar[name] : jar;
    }
    return Object.create({
        set,
        get,
        remove: function(name, attributes) {
            set(name, '', assign({}, attributes, {
                expires: -1
            }));
        },
        withAttributes: function(attributes) {
            return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter) {
            return init(assign({}, this.converter, converter), this.attributes);
        }
    }, {
        attributes: {
            value: Object.freeze(defaultAttributes)
        },
        converter: {
            value: Object.freeze(converter)
        }
    });
}
var api = init(defaultConverter, {
    path: '/'
});
;
}}),
}]);

//# sourceMappingURL=_d0be9b._.js.map