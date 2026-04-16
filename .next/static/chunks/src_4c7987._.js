(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_4c7987._.js", {

"[project]/src/lib/eso/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// ESO API client — proxies to ESO FastAPI via Next.js /api/eso/* route
__turbopack_esm__({
    "esoApi": (()=>esoApi),
    "esoAuth": (()=>esoAuth),
    "esoHistory": (()=>esoHistory),
    "esoScans": (()=>esoScans),
    "esoSystem": (()=>esoSystem)
});
const BASE = '/api/eso';
async function request(method, path, body) {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined
    });
    // If JWT expired, clear cookie and continue (ESO falls back to dev_user in dev mode)
    if (res.status === 401) {
        if (typeof document !== 'undefined') {
            document.cookie = 'eso_token=; Max-Age=0; path=/';
        }
        // Retry once without token
        const retry = await fetch(`${BASE}${path}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });
        if (!retry.ok) {
            const err = await retry.json().catch(()=>({
                    detail: retry.statusText
                }));
            throw new Error(err.detail || err.error?.message || 'Request failed');
        }
        return retry.json();
    }
    if (!res.ok) {
        const err = await res.json().catch(()=>({
                detail: res.statusText
            }));
        throw new Error(err.detail || err.error?.message || 'Request failed');
    }
    return res.json();
}
const esoApi = {
    get: (path)=>request('GET', path),
    post: (path, body)=>request('POST', path, body),
    put: (path, body)=>request('PUT', path, body),
    del: (path)=>request('DELETE', path)
};
const esoScans = {
    execute: (goal, target)=>esoApi.post('/hybrid/execute', {
            goal,
            target
        }),
    status: (id)=>esoApi.get(`/hybrid/status/${id}`),
    proposals: (id)=>esoApi.get(`/hybrid/proposals/${id}`),
    approve: (id, approved)=>esoApi.post(`/hybrid/approve/${id}`, {
            approved
        }),
    list: ()=>esoApi.get('/hybrid/list'),
    pdfUrl: (id)=>`${BASE}/hybrid/report/${id}/pdf`
};
const esoHistory = {
    list: (limit = 20, offset = 0)=>esoApi.get(`/auth/scans?limit=${limit}&offset=${offset}`)
};
const esoSystem = {
    health: ()=>esoApi.get('/health'),
    info: ()=>esoApi.get('/system/info'),
    switchLLM: (provider, model)=>esoApi.post('/system/llm/switch', {
            provider,
            model
        }),
    testLLM: ()=>esoApi.get('/system/llm/test'),
    audit: (params)=>esoApi.get(`/system/audit${params || ''}`),
    targets: ()=>esoApi.get('/system/targets')
};
const esoAuth = {
    register: (email, username, password)=>esoApi.post('/auth/register', {
            email,
            username,
            password
        }),
    login: (email, password)=>esoApi.post('/auth/login', {
            email,
            password
        }),
    me: ()=>esoApi.get('/auth/me'),
    createKey: (name)=>esoApi.post('/auth/api-keys', {
            name
        }),
    listKeys: ()=>esoApi.get('/auth/api-keys'),
    revokeKey: (keyId)=>esoApi.del(`/auth/api-keys/${keyId}`)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/findings/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>FindingsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
const SEV_COLOR = {
    critical: '#ff3a5c',
    high: '#ff8c42',
    medium: '#ffd700',
    low: '#00aaff',
    info: '#64748b'
};
const SEV_BG = {
    critical: 'rgba(255,58,92,0.1)',
    high: 'rgba(255,140,66,0.1)',
    medium: 'rgba(255,215,0,0.1)',
    low: 'rgba(0,170,255,0.1)',
    info: 'rgba(100,116,139,0.1)'
};
const SEVS = [
    'critical',
    'high',
    'medium',
    'low',
    'info'
];
function FindingsPage() {
    _s();
    const [findings, setFindings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        severity: '',
        source: '',
        search: '',
        port: ''
    });
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [aiResp, setAiResp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [aiLoad, setAiLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadFindings = async ()=>{
        setLoading(true);
        try {
            const p = new URLSearchParams();
            if (filters.severity) p.set('severity', filters.severity);
            if (filters.source) p.set('source', filters.source);
            if (filters.search) p.set('search', filters.search);
            if (filters.port) p.set('port', filters.port);
            p.set('limit', '100');
            const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoApi"].get(`/auth/findings?${p}`);
            setFindings(r.findings ?? []);
            setTotal(r.total ?? 0);
        } catch  {}
        setLoading(false);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FindingsPage.useEffect": ()=>{
            loadFindings();
        }
    }["FindingsPage.useEffect"], [
        filters
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FindingsPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoApi"].get('/auth/findings/stats').then(setStats).catch({
                "FindingsPage.useEffect": ()=>{}
            }["FindingsPage.useEffect"]);
        }
    }["FindingsPage.useEffect"], []);
    const askAI = async (type)=>{
        if (!selected) return;
        setAiLoad(true);
        setAiResp('');
        try {
            const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoApi"].post('/ai/chat', {
                finding_id: selected.finding_id,
                process_id: selected.process_id,
                chat_type: type,
                finding_data: selected
            });
            setAiResp(r.answer || 'No response');
        } catch (e) {
            setAiResp(`Error: ${e.message}`);
        }
        setAiLoad(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black",
                        children: [
                            "Findings ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Explorer"
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 51,
                                columnNumber: 54
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/findings/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mt-1",
                        children: "All vulnerabilities across scans · AI-powered analysis"
                    }, void 0, false, {
                        fileName: "[project]/src/app/findings/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/findings/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 sm:grid-cols-5 gap-2 mb-4",
                children: SEVS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFilters((f)=>({
                                    ...f,
                                    severity: f.severity === s ? '' : s
                                })),
                        className: "glass px-3 py-2.5 text-center cursor-pointer transition-all hover:border-white/20",
                        style: filters.severity === s ? {
                            borderColor: `${SEV_COLOR[s]}40`,
                            background: `${SEV_COLOR[s]}08`
                        } : {},
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-xl font-bold",
                                style: {
                                    color: SEV_COLOR[s]
                                },
                                children: stats?.by_severity?.[s] || 0
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                children: s
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s, true, {
                        fileName: "[project]/src/app/findings/page.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/findings/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass p-3 mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-4 gap-2",
                    children: [
                        [
                            {
                                placeholder: 'Search findings...',
                                key: 'search',
                                type: 'text'
                            },
                            {
                                placeholder: 'Port...',
                                key: 'port',
                                type: 'number'
                            }
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: f.type,
                                placeholder: f.placeholder,
                                value: filters[f.key],
                                onChange: (e)=>setFilters((p)=>({
                                            ...p,
                                            [f.key]: e.target.value
                                        })),
                                className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"
                            }, f.key, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: filters.severity,
                            onChange: (e)=>setFilters((f)=>({
                                        ...f,
                                        severity: e.target.value
                                    })),
                            className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "All Severities"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                SEVS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: s,
                                        children: s.charAt(0).toUpperCase() + s.slice(1)
                                    }, s, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 26
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: filters.source,
                            onChange: (e)=>setFilters((f)=>({
                                        ...f,
                                        source: e.target.value
                                    })),
                            className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[11px] text-slate-300 outline-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "All Tools"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/findings/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                Object.keys(stats?.by_source || {}).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: s,
                                        children: s
                                    }, s, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 55
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/findings/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/findings/page.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/findings/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                        children: [
                                            total,
                                            " Finding",
                                            total !== 1 ? 's' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    (filters.severity || filters.source || filters.search || filters.port) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFilters({
                                                severity: '',
                                                source: '',
                                                search: '',
                                                port: ''
                                            }),
                                        className: "font-mono text-[10px] text-slate-500 hover:text-accent cursor-pointer",
                                        children: "Clear filters"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-12 text-center font-mono text-[11px] text-slate-600 animate-pulse",
                                children: "Loading findings..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, this) : findings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-12 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[13px] text-slate-600 mb-2",
                                        children: total === 0 ? 'No findings yet' : 'No matches'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    total === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scan/new",
                                        className: "font-mono text-[11px] text-accent hover:underline",
                                        children: "Run a scan →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 107,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-white/[0.03]",
                                children: findings.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            setSelected(f);
                                            setAiResp('');
                                        },
                                        className: "px-4 py-3 cursor-pointer transition-colors hover:bg-white/[0.02]",
                                        style: selected?.finding_id === f.finding_id ? {
                                            background: 'rgba(0,255,170,0.03)'
                                        } : {},
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 mb-1 flex-wrap",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] px-1.5 py-[2px] rounded border",
                                                                    style: {
                                                                        color: SEV_COLOR[f.severity] ?? '#64748b',
                                                                        background: SEV_BG[f.severity] ?? 'rgba(255,255,255,0.04)',
                                                                        borderColor: `${SEV_COLOR[f.severity] ?? '#334155'}40`
                                                                    },
                                                                    children: f.severity?.toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                                    lineNumber: 118,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] text-slate-600",
                                                                    children: f.source
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                                    lineNumber: 122,
                                                                    columnNumber: 25
                                                                }, this),
                                                                f.port && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] text-slate-600",
                                                                    children: [
                                                                        ":",
                                                                        f.port
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 34
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/findings/page.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[12px] text-slate-200 truncate",
                                                            children: f.finding || f.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/findings/page.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 23
                                                        }, this),
                                                        f.service && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px] text-slate-600 mt-0.5",
                                                            children: [
                                                                f.service,
                                                                " ",
                                                                f.version || ''
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/findings/page.tsx",
                                                            lineNumber: 126,
                                                            columnNumber: 35
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/scan/${f.process_id}`,
                                                    onClick: (e)=>e.stopPropagation(),
                                                    className: "font-mono text-[9px] text-accent2 hover:underline shrink-0",
                                                    children: f.target || f.process_id?.slice(0, 12)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/findings/page.tsx",
                                            lineNumber: 115,
                                            columnNumber: 19
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/findings/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                children: "AI Analysis"
                            }, void 0, false, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            !selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-3xl mb-3 opacity-20",
                                        children: "🤖"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[11px] text-slate-600",
                                        children: "Click a finding to analyze"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg mb-4 border",
                                        style: {
                                            background: SEV_BG[selected.severity] ?? 'rgba(255,255,255,0.04)',
                                            borderColor: `${SEV_COLOR[selected.severity] ?? '#334155'}30`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[9px] mb-1",
                                                style: {
                                                    color: SEV_COLOR[selected.severity] ?? '#64748b'
                                                },
                                                children: [
                                                    selected.severity?.toUpperCase(),
                                                    " · ",
                                                    selected.source
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/findings/page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[12px] text-slate-200",
                                                children: selected.finding || selected.type
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/findings/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 mb-4",
                                        children: [
                                            {
                                                type: 'explain',
                                                label: '🧠 Explain'
                                            },
                                            {
                                                type: 'remediate',
                                                label: '🔧 Fix It'
                                            },
                                            {
                                                type: 'poc',
                                                label: '💥 PoC'
                                            },
                                            {
                                                type: 'general',
                                                label: '💬 Ask AI'
                                            }
                                        ].map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>askAI(btn.type),
                                                disabled: aiLoad,
                                                className: "p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-accent/20 hover:bg-accent/[0.04] transition-all cursor-pointer text-left",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[11px] font-bold text-slate-300",
                                                    children: btn.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/findings/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, this)
                                            }, btn.type, false, {
                                                fileName: "[project]/src/app/findings/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    aiLoad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 p-3 font-mono text-[11px] text-accent animate-pulse",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/findings/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 117
                                            }, this),
                                            "Analyzing..."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 24
                                    }, this),
                                    aiResp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 rounded-lg overflow-y-auto",
                                        style: {
                                            background: '#020608',
                                            border: '1px solid rgba(0,255,170,0.08)',
                                            maxHeight: '300px'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                            className: "text-[11px] text-slate-300 whitespace-pre-wrap font-mono leading-relaxed",
                                            children: aiResp
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/findings/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/findings/page.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/findings/page.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/findings/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/findings/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/findings/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(FindingsPage, "b4TIRTHIzCaWLnD7Bn8re6w9OYI=");
_c = FindingsPage;
var _c;
__turbopack_refresh__.register(_c, "FindingsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/findings/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_4c7987._.js.map