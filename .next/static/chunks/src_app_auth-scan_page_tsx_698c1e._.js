(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_auth-scan_page_tsx_698c1e._.js", {

"[project]/src/app/auth-scan/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>AuthScanPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
// ── Constants ──────────────────────────────────────────────────────────────
const SEV = {
    critical: '#ff3a5c',
    high: '#fb923c',
    medium: '#facc15',
    low: '#00aaff',
    info: '#475569'
};
const PHASES = {
    authenticating: '🔐 Authenticating...',
    crawling: '🕷 Crawling pages...',
    testing: '🔬 Running vulnerability tests...',
    done: '✅ Complete'
};
function authFetch(path, opts) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getToken"])();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    return fetch(path, {
        ...opts,
        headers: {
            'Content-Type': 'application/json',
            ...token ? {
                Authorization: `Bearer ${token}`
            } : {},
            ...user?.username ? {
                'x-user-alias': user.username
            } : {},
            ...opts?.headers
        }
    });
}
function SevBadge({ sev }) {
    const c = SEV[sev] ?? '#64748b';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-mono text-[9px] font-black px-1.5 py-[2px] rounded",
        style: {
            background: `${c}18`,
            color: c,
            border: `1px solid ${c}30`
        },
        children: sev.toUpperCase()
    }, void 0, false, {
        fileName: "[project]/src/app/auth-scan/page.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
_c = SevBadge;
function AuthScanPage() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('config');
    const [scan, setScan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scanId, setScanId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('findings');
    const [filterSev, setFilterSev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Form state
    const [targetUrl, setTargetUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('https://');
    const [authType, setAuthType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('none');
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loginUrl, setLoginUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loginUrlTouched, setLoginUrlTouched] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successUrl, setSuccessUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [cookieStr, setCookieStr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenVal, setTokenVal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tokenType, setTokenType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Bearer');
    const [headerName, setHeaderName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Authorization');
    const [maxPages, setMaxPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(20);
    const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none";
    const inpStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#e2e8f0'
    };
    function buildAuthConfig() {
        if (authType === 'form') return {
            type: 'form',
            username,
            password,
            login_url: loginUrl || targetUrl,
            success_url_contains: successUrl
        };
        if (authType === 'cookie') return {
            type: 'cookie',
            cookies: cookieStr
        };
        if (authType === 'token') return {
            type: 'token',
            token: tokenVal,
            token_type: tokenType,
            header_name: headerName
        };
        return {
            type: 'none'
        };
    }
    async function startScan() {
        if (!targetUrl || targetUrl === 'https://') {
            setError('Enter a target URL');
            return;
        }
        setError('');
        setStep('scanning');
        setScan(null);
        try {
            const res = await authFetch('/api/v1/auth-scan', {
                method: 'POST',
                body: JSON.stringify({
                    target_url: targetUrl,
                    auth_config: buildAuthConfig(),
                    max_pages: maxPages
                })
            });
            const d = await res.json();
            if (!res.ok) throw new Error(d.error ?? d.detail ?? 'Scan failed to start');
            setScanId(d.scan_id);
        } catch (e) {
            setStep('config');
            setError(e.message);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthScanPage.useEffect": ()=>{
            if (!scanId) return;
            pollRef.current = setInterval({
                "AuthScanPage.useEffect": async ()=>{
                    try {
                        const res = await authFetch(`/api/v1/auth-scan?scan_id=${scanId}`);
                        if (!res.ok) return;
                        const d = await res.json();
                        setScan(d);
                        if (d.status === 'complete' || d.status === 'error') {
                            clearInterval(pollRef.current);
                            setStep('results');
                        }
                    } catch  {}
                }
            }["AuthScanPage.useEffect"], 2500);
            return ({
                "AuthScanPage.useEffect": ()=>clearInterval(pollRef.current)
            })["AuthScanPage.useEffect"];
        }
    }["AuthScanPage.useEffect"], [
        scanId
    ]);
    // Derived
    const findings = scan?.findings ?? [];
    const sevCounts = findings.reduce((a, f)=>{
        a[f.severity] = (a[f.severity] ?? 0) + 1;
        return a;
    }, {});
    const filtered = findings.filter((f)=>filterSev === 'all' || f.severity === filterSev);
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "🔐"
                }, void 0, false, {
                    fileName: "[project]/src/app/auth-scan/page.tsx",
                    lineNumber: 120,
                    columnNumber: 36
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono text-[12px] text-slate-500",
                    children: "Please log in"
                }, void 0, false, {
                    fileName: "[project]/src/app/auth-scan/page.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/auth-scan/page.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/auth-scan/page.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 max-w-6xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-5 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "Authenticated ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#6366f1'
                                        },
                                        children: "Web Scanner"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 61
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: "Log in to your app · crawl authenticated pages · test for XSS, IDOR, CSRF, open redirect, missing headers"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    step !== 'config' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setStep('config');
                            setScanId('');
                            setScan(null);
                        },
                        className: "px-3 py-2 rounded-xl font-mono text-[10px] cursor-pointer border transition-all",
                        style: {
                            borderColor: 'rgba(255,255,255,0.1)',
                            color: '#64748b'
                        },
                        children: "← New Scan"
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth-scan/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            step === 'config' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Target URL *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: targetUrl,
                                        onChange: (e)=>setTargetUrl(e.target.value),
                                        placeholder: "https://app.yoursite.com",
                                        className: inp,
                                        style: inpStyle
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 font-mono text-[10px] px-3 py-2 rounded",
                                        style: {
                                            background: 'rgba(255,58,92,0.08)',
                                            color: '#ff3a5c'
                                        },
                                        children: [
                                            "✗ ",
                                            error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 151,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Authentication Method"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4",
                                        children: [
                                            [
                                                'none',
                                                '🔓',
                                                'No Auth',
                                                'Scan public pages'
                                            ],
                                            [
                                                'form',
                                                '📝',
                                                'Form Login',
                                                'Fill & submit login form'
                                            ],
                                            [
                                                'cookie',
                                                '🍪',
                                                'Session Cookie',
                                                'Paste your session cookie'
                                            ],
                                            [
                                                'token',
                                                '🔑',
                                                'Bearer / API Key',
                                                'Authorization header'
                                            ]
                                        ].map(([type, icon, label, desc])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAuthType(type),
                                                className: "p-3 rounded-xl border cursor-pointer transition-all text-left",
                                                style: authType === type ? {
                                                    background: 'rgba(99,102,241,0.1)',
                                                    borderColor: 'rgba(99,102,241,0.4)',
                                                    color: '#6366f1'
                                                } : {
                                                    background: 'rgba(255,255,255,0.03)',
                                                    borderColor: 'rgba(255,255,255,0.08)',
                                                    color: '#475569'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xl mb-1",
                                                        children: icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[10px] font-bold",
                                                        children: label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[8px] text-slate-700 mt-0.5",
                                                        children: desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, type, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 165,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this),
                                    authType === 'form' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[10px] text-slate-400 font-bold block mb-1",
                                                        children: "Login Page URL *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 182,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: loginUrl,
                                                        onChange: (e)=>setLoginUrl(e.target.value),
                                                        placeholder: "https://app.example.com/login",
                                                        className: inp,
                                                        style: {
                                                            ...inpStyle,
                                                            border: loginUrl ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,165,0,0.3)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[9px] mt-1",
                                                        style: {
                                                            color: loginUrl ? '#475569' : '#fb923c'
                                                        },
                                                        children: loginUrl ? '✓ Login URL set' : "⚠ Set this to your actual login page (e.g. /login, /auth/signin) — not your app's homepage or admin URL"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 188,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                                children: "Username / Email"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: username,
                                                                onChange: (e)=>setUsername(e.target.value),
                                                                placeholder: "user@example.com",
                                                                className: inp,
                                                                style: inpStyle
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 198,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                                children: "Password"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 202,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "password",
                                                                value: password,
                                                                onChange: (e)=>setPassword(e.target.value),
                                                                placeholder: "••••••••",
                                                                className: inp,
                                                                style: inpStyle
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 195,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: [
                                                            "Success URL Contains ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-700",
                                                                children: "(optional — confirms login worked)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 44
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: successUrl,
                                                        onChange: (e)=>setSuccessUrl(e.target.value),
                                                        placeholder: "dashboard",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[8px] text-slate-700 mb-1.5",
                                                        children: "Common login URL patterns:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 218,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-1.5 flex-wrap",
                                                        children: [
                                                            '/login',
                                                            '/auth/signin',
                                                            '/auth/login',
                                                            '/sign-in',
                                                            '/users/sign_in'
                                                        ].map((path)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>{
                                                                    const base = targetUrl.endsWith('/') ? targetUrl.slice(0, -1).split('/').slice(0, 3).join('/') : targetUrl.split('/').slice(0, 3).join('/');
                                                                    setLoginUrl(base + path);
                                                                },
                                                                className: "font-mono text-[9px] px-2 py-1 rounded cursor-pointer border transition-all",
                                                                style: {
                                                                    background: 'rgba(255,255,255,0.04)',
                                                                    borderColor: 'rgba(255,255,255,0.08)',
                                                                    color: '#475569'
                                                                },
                                                                children: path
                                                            }, path, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 25
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-[9px] text-slate-700",
                                                children: "Auto-detects form fields (username, email, password) by name/id/placeholder. If detection fails, the form fields are probably rendered by JavaScript — try the Cookie method instead."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 234,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    authType === 'cookie' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                children: "Session Cookie String"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: cookieStr,
                                                onChange: (e)=>setCookieStr(e.target.value),
                                                rows: 3,
                                                placeholder: "sessionid=abc123; csrftoken=xyz; _ga=GA1.2...",
                                                className: inp + " resize-none",
                                                style: inpStyle
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 243,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-mono text-[9px] text-slate-700 mt-1",
                                                children: "Get from browser DevTools → Application → Cookies → copy all cookie values for your app."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 246,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17
                                    }, this),
                                    authType === 'token' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                                children: "Header Name"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: headerName,
                                                                onChange: (e)=>setHeaderName(e.target.value),
                                                                placeholder: "Authorization",
                                                                className: inp,
                                                                style: inpStyle
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                                children: "Token Prefix"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                value: tokenType,
                                                                onChange: (e)=>setTokenType(e.target.value),
                                                                placeholder: "Bearer",
                                                                className: inp,
                                                                style: inpStyle
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 262,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 260,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "Token Value"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "password",
                                                        value: tokenVal,
                                                        onChange: (e)=>setTokenVal(e.target.value),
                                                        placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                                        className: inp,
                                                        style: inpStyle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Options"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "font-mono text-[10px] text-slate-400 shrink-0",
                                                children: "Max pages to crawl"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "range",
                                                min: "5",
                                                max: "50",
                                                value: maxPages,
                                                onChange: (e)=>setMaxPages(Number(e.target.value)),
                                                className: "flex-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[11px] font-bold",
                                                style: {
                                                    color: '#6366f1',
                                                    minWidth: '28px'
                                                },
                                                children: maxPages
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[9px] text-slate-700 mt-2",
                                        children: "Higher = more coverage but slower. 20 is a good balance."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: startScan,
                                className: "w-full py-3 rounded-xl font-mono text-[12px] font-black cursor-pointer transition-all hover:opacity-90",
                                style: {
                                    background: 'rgba(99,102,241,0.12)',
                                    border: '1px solid rgba(99,102,241,0.4)',
                                    color: '#6366f1'
                                },
                                children: "🚀 Start Authenticated Scan"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 287,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl p-4 self-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4",
                                children: "What Gets Tested"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    [
                                        '🔐',
                                        'Auth Bypass',
                                        'Login, then verify session is actually used'
                                    ],
                                    [
                                        '🕷',
                                        'Deep Crawl',
                                        'Follows links only visible when logged in'
                                    ],
                                    [
                                        '🛡',
                                        'Security Headers',
                                        'CSP, HSTS, X-Frame-Options, Permissions-Policy'
                                    ],
                                    [
                                        '🍪',
                                        'Cookie Flags',
                                        'HttpOnly, Secure, SameSite on session cookies'
                                    ],
                                    [
                                        '🔄',
                                        'Open Redirect',
                                        'URL params pointing to external domains'
                                    ],
                                    [
                                        '🛡',
                                        'CSRF',
                                        'POST forms missing CSRF tokens'
                                    ],
                                    [
                                        '👁',
                                        'IDOR',
                                        'Numeric resource IDs — try adjacent values'
                                    ],
                                    [
                                        '💉',
                                        'XSS',
                                        'Reflected XSS via form field injection'
                                    ],
                                    [
                                        '🔒',
                                        'Insecure Forms',
                                        'Forms submitting over HTTP'
                                    ],
                                    [
                                        '🕵',
                                        'Sensitive Pages',
                                        'Admin, debug, .env, Swagger UI exposure'
                                    ]
                                ].map(([icon, name, desc])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0",
                                                children: icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[10px] text-slate-300 font-bold",
                                                        children: name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[9px] text-slate-600 mt-0.5",
                                                        children: desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 314,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, name, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 pt-3 border-t border-white/[0.05]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-[9px] text-slate-700",
                                    children: "Powered by Playwright — headless Chromium. Only test apps you own or have permission to test."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth-scan/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/auth-scan/page.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this),
            step === 'scanning' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-xl p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-5xl mb-4",
                            children: "🕷"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[14px] font-black text-slate-200 mb-2",
                            children: PHASES[scan?.phase ?? ''] ?? scan?.phase ?? 'Starting...'
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[11px] text-slate-500 mb-5",
                            children: scan?.target_url
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 336,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-xs mx-auto mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 rounded-full overflow-hidden",
                                style: {
                                    background: 'rgba(255,255,255,0.06)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-2 rounded-full transition-all duration-1000",
                                    style: {
                                        width: `${scan?.progress ?? 0}%`,
                                        background: '#6366f1'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/auth-scan/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 340,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 339,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[10px] text-slate-600",
                            children: [
                                scan?.progress ?? 0,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 345,
                            columnNumber: 13
                        }, this),
                        scan?.auth_result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[10px]",
                            style: {
                                background: scan.auth_result.ok ? 'rgba(0,255,170,0.08)' : 'rgba(255,58,92,0.08)',
                                color: scan.auth_result.ok ? '#00ffaa' : '#ff3a5c'
                            },
                            children: [
                                scan.auth_result.ok ? '✓' : '✗',
                                " Auth: ",
                                scan.auth_result.method,
                                scan.auth_result.error && ` — ${scan.auth_result.error}`
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 349,
                            columnNumber: 15
                        }, this),
                        (scan?.sitemap?.length ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[10px] text-slate-600 mt-2",
                            children: [
                                scan.sitemap.length,
                                " pages discovered · ",
                                scan.forms.length,
                                " forms"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 361,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/auth-scan/page.tsx",
                    lineNumber: 331,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/auth-scan/page.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this),
            step === 'results' && scan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    scan.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl p-5 mb-4",
                        style: {
                            border: '1px solid rgba(255,58,92,0.2)',
                            background: 'rgba(255,58,92,0.05)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[12px] mb-2",
                                style: {
                                    color: '#ff3a5c'
                                },
                                children: [
                                    "✗ Scan failed: ",
                                    scan.error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 375,
                                columnNumber: 15
                            }, this),
                            scan.error?.includes('auth page') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] text-slate-400 space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: "→ The login URL may be wrong. Check that it points to your actual login form, not a dashboard or admin URL."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 378,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            "→ Try using the ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Cookie"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 379,
                                                columnNumber: 40
                                            }, this),
                                            " auth method instead — log in manually in your browser, copy the session cookie, and paste it here."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 379,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 377,
                                columnNumber: 17
                            }, this),
                            scan.error?.includes('locate login form') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] text-slate-400 mt-1",
                                children: "→ Login form fields couldn't be detected (may be a JS-rendered SPA). Use the Cookie auth method instead."
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 383,
                                columnNumber: 17
                            }, this),
                            scan.error?.includes('Playwright') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] text-slate-500 mt-1",
                                children: [
                                    "Fix: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "text-slate-300",
                                        children: "pip install playwright && playwright install chromium"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 389,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 388,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 373,
                        columnNumber: 13
                    }, this),
                    scan.auth_result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px] flex items-center gap-2",
                        style: {
                            background: scan.auth_result.ok ? 'rgba(0,255,170,0.06)' : 'rgba(255,58,92,0.06)',
                            border: scan.auth_result.ok ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,58,92,0.2)',
                            color: scan.auth_result.ok ? '#00ffaa' : '#ff3a5c'
                        },
                        children: [
                            scan.auth_result.ok ? '✓' : '✗',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: scan.auth_result.ok ? `Authentication succeeded (${scan.auth_result.method})` : `Authentication failed: ${scan.auth_result.error}`
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 404,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 397,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5",
                        children: [
                            {
                                label: 'Pages',
                                val: scan.sitemap.length,
                                color: '#e2e8f0'
                            },
                            {
                                label: 'Forms',
                                val: scan.forms.length,
                                color: '#e2e8f0'
                            },
                            {
                                label: 'Findings',
                                val: findings.length,
                                color: findings.length > 0 ? '#fb923c' : '#00ffaa'
                            },
                            {
                                label: 'Critical',
                                val: sevCounts.critical ?? 0,
                                color: (sevCounts.critical ?? 0) > 0 ? '#ff3a5c' : '#00ffaa'
                            },
                            {
                                label: 'High',
                                val: sevCounts.high ?? 0,
                                color: (sevCounts.high ?? 0) > 0 ? '#fb923c' : '#00ffaa'
                            }
                        ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-3 text-center rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-xl font-black",
                                        style: {
                                            color: s.color
                                        },
                                        children: s.val
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 420,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 419,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-4 flex-wrap",
                        children: [
                            'findings',
                            'sitemap',
                            'forms'
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab),
                                className: "px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all capitalize",
                                style: activeTab === tab ? {
                                    background: 'rgba(99,102,241,0.1)',
                                    borderColor: 'rgba(99,102,241,0.3)',
                                    color: '#6366f1'
                                } : {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    color: '#475569'
                                },
                                children: tab === 'findings' ? `Findings (${findings.length})` : tab === 'sitemap' ? `Sitemap (${scan.sitemap.length})` : `Forms (${scan.forms.length})`
                            }, tab, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 429,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 427,
                        columnNumber: 11
                    }, this),
                    activeTab === 'findings' && (findings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl p-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-4xl mb-3",
                                children: "✅"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 445,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[13px] font-black text-slate-200",
                                children: "No vulnerabilities found"
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 446,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] text-slate-500 mt-1",
                                children: [
                                    scan.sitemap.length,
                                    " pages and ",
                                    scan.forms.length,
                                    " forms tested — all checks passed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 447,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 444,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5 mb-3 flex-wrap",
                                children: [
                                    'all',
                                    'critical',
                                    'high',
                                    'medium',
                                    'low'
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilterSev(s),
                                        className: "px-2.5 py-1.5 rounded-lg font-mono text-[9px] font-bold cursor-pointer border transition-all",
                                        style: filterSev === s ? {
                                            background: `${SEV[s] ?? '#e2e8f0'}18`,
                                            borderColor: `${SEV[s] ?? '#e2e8f0'}50`,
                                            color: SEV[s] ?? '#e2e8f0'
                                        } : {
                                            background: 'rgba(255,255,255,0.03)',
                                            borderColor: 'rgba(255,255,255,0.07)',
                                            color: '#475569'
                                        },
                                        children: s === 'all' ? `All (${findings.length})` : `${s} (${sevCounts[s] ?? 0})`
                                    }, s, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 453,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5 max-h-[700px] overflow-y-auto pr-1",
                                children: filtered.map((f, i)=>{
                                    const isOpen = expanded === `${i}`;
                                    const c = SEV[f.severity] ?? '#64748b';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-xl border overflow-hidden cursor-pointer transition-all",
                                        style: {
                                            borderColor: isOpen ? `${c}40` : 'rgba(255,255,255,0.06)',
                                            background: isOpen ? `${c}08` : 'rgba(255,255,255,0.02)'
                                        },
                                        onClick: ()=>setExpanded((e)=>e === `${i}` ? null : `${i}`),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 px-4 py-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SevBadge, {
                                                        sev: f.severity
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 473,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[11px] font-black text-slate-200 truncate",
                                                                children: f.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 475,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] text-slate-600 truncate",
                                                                children: f.url
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 474,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] text-slate-700 shrink-0 px-1.5 py-0.5 rounded",
                                                        style: {
                                                            background: 'rgba(255,255,255,0.04)'
                                                        },
                                                        children: f.testId
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 478,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[10px] text-slate-600 shrink-0",
                                                        children: isOpen ? '▲' : '▼'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 25
                                            }, this),
                                            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 pb-4 border-t border-white/[0.05] space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[10px] text-slate-400 mt-3 leading-relaxed",
                                                        children: f.detail
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 484,
                                                        columnNumber: 29
                                                    }, this),
                                                    f.evidence && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                                        className: "font-mono text-[9px] p-2.5 rounded-lg overflow-x-auto",
                                                        style: {
                                                            background: 'rgba(0,0,0,0.4)',
                                                            color: '#64748b',
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-all'
                                                        },
                                                        children: f.evidence
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 483,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 464,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true)),
                    activeTab === 'sitemap' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass rounded-xl overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[600px] overflow-y-auto divide-y divide-white/[0.04]",
                            children: scan.sitemap.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-4 py-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] shrink-0 px-1.5 py-[2px] rounded",
                                            style: {
                                                background: p.status === 200 ? 'rgba(0,255,170,0.08)' : p.status >= 400 ? 'rgba(255,58,92,0.08)' : 'rgba(255,255,255,0.06)',
                                                color: p.status === 200 ? '#00ffaa' : p.status >= 400 ? '#ff3a5c' : '#64748b'
                                            },
                                            children: p.status || '?'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth-scan/page.tsx",
                                            lineNumber: 507,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-slate-400 flex-1 truncate",
                                            children: p.url
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth-scan/page.tsx",
                                            lineNumber: 512,
                                            columnNumber: 21
                                        }, this),
                                        p.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[9px] text-slate-600 truncate max-w-[200px]",
                                            children: p.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/auth-scan/page.tsx",
                                            lineNumber: 513,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/auth-scan/page.tsx",
                                    lineNumber: 506,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 504,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 503,
                        columnNumber: 13
                    }, this),
                    activeTab === 'forms' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: scan.forms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-xl p-8 text-center font-mono text-[11px] text-slate-600",
                            children: "No forms discovered"
                        }, void 0, false, {
                            fileName: "[project]/src/app/auth-scan/page.tsx",
                            lineNumber: 524,
                            columnNumber: 17
                        }, this) : scan.forms.map((form, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-xl p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] px-1.5 py-[2px] rounded",
                                                style: {
                                                    background: 'rgba(0,170,255,0.1)',
                                                    color: '#00aaff'
                                                },
                                                children: form.method
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 528,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] text-slate-400 truncate",
                                                children: form.action
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 530,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 mb-2",
                                        children: [
                                            "Found on: ",
                                            form.page_url
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 532,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-1.5 flex-wrap",
                                        children: form.inputs.map((inp, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[8px] px-2 py-[2px] rounded",
                                                style: {
                                                    background: 'rgba(255,255,255,0.05)',
                                                    color: '#64748b'
                                                },
                                                children: [
                                                    inp.name,
                                                    inp.required ? '*' : '',
                                                    " (",
                                                    inp.type,
                                                    ")"
                                                ]
                                            }, j, true, {
                                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/auth-scan/page.tsx",
                                        lineNumber: 533,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/app/auth-scan/page.tsx",
                                lineNumber: 526,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/auth-scan/page.tsx",
                        lineNumber: 522,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/auth-scan/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(AuthScanPage, "8fOfWPeygP1S1Jy+8UXplgimGAY=");
_c1 = AuthScanPage;
var _c, _c1;
__turbopack_refresh__.register(_c, "SevBadge");
__turbopack_refresh__.register(_c1, "AuthScanPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/auth-scan/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_auth-scan_page_tsx_698c1e._.js.map