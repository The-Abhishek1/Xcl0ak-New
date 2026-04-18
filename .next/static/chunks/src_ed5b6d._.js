(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_ed5b6d._.js", {

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
"[project]/src/hooks/use-scan-ws.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "useScanWS": (()=>useScanWS)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
'use client';
;
function useScanWS(processId) {
    _s();
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const retryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const seenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useScanWS.useCallback[connect]": ()=>{
            if (!processId) return;
            const ESO = ("TURBOPACK compile-time value", "ws://localhost:8000") ?? 'ws://localhost:8000';
            const url = `${ESO}/api/v1/ws/scan/${processId}`;
            setState('connecting');
            const ws = new WebSocket(url);
            wsRef.current = ws;
            ws.onopen = ({
                "useScanWS.useCallback[connect]": ()=>setState('connected')
            })["useScanWS.useCallback[connect]"];
            ws.onmessage = ({
                "useScanWS.useCallback[connect]": (msg)=>{
                    try {
                        const ev = JSON.parse(msg.data);
                        const key = `${ev.timestamp}:${ev.type}`;
                        if (seenRef.current.has(key)) return;
                        seenRef.current.add(key);
                        setEvents({
                            "useScanWS.useCallback[connect]": (prev)=>[
                                    ...prev,
                                    ev
                                ]
                        }["useScanWS.useCallback[connect]"]);
                    } catch  {}
                }
            })["useScanWS.useCallback[connect]"];
            ws.onclose = ({
                "useScanWS.useCallback[connect]": ()=>{
                    setState('disconnected');
                    wsRef.current = null;
                }
            })["useScanWS.useCallback[connect]"];
            ws.onerror = ({
                "useScanWS.useCallback[connect]": ()=>{
                    setState('error');
                    ws.close();
                    retryRef.current = setTimeout(connect, 3000);
                }
            })["useScanWS.useCallback[connect]"];
        }
    }["useScanWS.useCallback[connect]"], [
        processId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScanWS.useEffect": ()=>{
            if (processId) {
                setEvents([]);
                seenRef.current.clear();
                connect();
            }
            return ({
                "useScanWS.useEffect": ()=>{
                    wsRef.current?.close();
                    if (retryRef.current) clearTimeout(retryRef.current);
                }
            })["useScanWS.useEffect"];
        }
    }["useScanWS.useEffect"], [
        processId,
        connect
    ]);
    const latest = events.length > 0 ? events[events.length - 1] : null;
    const isTerminal = latest?.type === 'complete' || latest?.type === 'error';
    return {
        events,
        latest,
        state,
        isTerminal
    };
}
_s(useScanWS, "7dK23wYrOEWieS94cYCYbsbw18w=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/use-poll.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "usePoll": (()=>usePoll)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
'use client';
;
function usePoll(fetcher, intervalMs, enabled) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const timer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePoll.useEffect": ()=>{
            if (!enabled) {
                if (timer.current) clearInterval(timer.current);
                return;
            }
            const tick = {
                "usePoll.useEffect.tick": async ()=>{
                    try {
                        setData(await fetcher());
                        setError(null);
                    } catch (e) {
                        setError(e.message);
                    }
                }
            }["usePoll.useEffect.tick"];
            tick();
            timer.current = setInterval(tick, intervalMs);
            return ({
                "usePoll.useEffect": ()=>{
                    if (timer.current) clearInterval(timer.current);
                }
            })["usePoll.useEffect"];
        }
    }["usePoll.useEffect"], [
        enabled,
        intervalMs
    ]);
    return {
        data,
        error
    };
}
_s(usePoll, "xPYVsh5sSinTK/fIqH0IvLOdf98=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/scan/WorkflowTimeline.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>WorkflowTimeline)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
const STEPS = [
    {
        key: 'planning',
        label: 'AI Planning',
        icon: '🧠',
        desc: 'LLM creates task DAG'
    },
    {
        key: 'validating',
        label: 'Validation',
        icon: '✓',
        desc: 'DAG structure verified'
    },
    {
        key: 'executing',
        label: 'Tool Execution',
        icon: '🐳',
        desc: 'Running in Docker'
    },
    {
        key: 'analysis',
        label: 'AI Analysis',
        icon: '📊',
        desc: 'Validating findings'
    },
    {
        key: 'proposals',
        label: 'AI Proposals',
        icon: '💡',
        desc: 'Suggests next steps'
    },
    {
        key: 'report',
        label: 'Report',
        icon: '📄',
        desc: 'Generating report'
    }
];
function getStep(scan, wsStep) {
    if (wsStep !== undefined) return wsStep;
    const s = scan.status;
    if (s === 'completed' || s === 'failed') return 6;
    if (scan.report) return 5;
    if (scan.awaiting_approval) return 4;
    if ((scan.findings_count || 0) > 0) return 3;
    if ((scan.completed_tasks || 0) > 0) return 2;
    if (s === 'running') return 2;
    if (s === 'validating') return 1;
    return 0;
}
function WorkflowTimeline({ scan, wsStep }) {
    const cur = getStep(scan, wsStep);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                children: "Execution Workflow"
            }, void 0, false, {
                fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                children: STEPS.map((step, i)=>{
                    const state = i < cur ? 'done' : i === cur ? 'active' : 'pending';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3 py-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-7 h-7 rounded-full flex items-center justify-center text-[12px] border transition-all",
                                        style: {
                                            background: state === 'done' ? 'rgba(0,255,170,0.1)' : state === 'active' ? 'rgba(0,170,255,0.1)' : 'rgba(255,255,255,0.03)',
                                            borderColor: state === 'done' ? 'rgba(0,255,170,0.3)' : state === 'active' ? 'rgba(0,170,255,0.3)' : 'rgba(255,255,255,0.08)',
                                            color: state === 'done' ? '#00ffaa' : state === 'active' ? '#00aaff' : '#334155',
                                            animation: state === 'active' ? 'pulse-dot 2s ease-in-out infinite' : undefined
                                        },
                                        children: state === 'done' ? '✓' : step.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    i < STEPS.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-px mt-1",
                                        style: {
                                            height: '16px',
                                            background: state === 'done' ? 'rgba(0,255,170,0.2)' : 'rgba(255,255,255,0.05)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                        lineNumber: 46,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[12px] font-semibold",
                                        style: {
                                            color: state === 'active' ? '#00aaff' : state === 'done' ? '#cbd5e1' : '#334155'
                                        },
                                        children: step.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                        lineNumber: 50,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-700",
                                        children: step.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this)
                        ]
                    }, step.key, true, {
                        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/scan/WorkflowTimeline.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = WorkflowTimeline;
var _c;
__turbopack_refresh__.register(_c, "WorkflowTimeline");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/scan/ProposalPanel.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ProposalPanel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
function ProposalPanel({ processId, onApproved }) {
    _s();
    const [proposals, setProposals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProposalPanel.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoScans"].proposals(processId).then({
                "ProposalPanel.useEffect": (r)=>{
                    if (r.awaiting_approval && r.proposals?.length) {
                        setProposals(r.proposals);
                        setChecked(new Set(r.proposals.map({
                            "ProposalPanel.useEffect": (p)=>p.task_name
                        }["ProposalPanel.useEffect"])));
                    }
                }
            }["ProposalPanel.useEffect"]).catch({
                "ProposalPanel.useEffect": ()=>{}
            }["ProposalPanel.useEffect"]);
        }
    }["ProposalPanel.useEffect"], [
        processId
    ]);
    const toggle = (name)=>{
        const n = new Set(checked);
        n.has(name) ? n.delete(name) : n.add(name);
        setChecked(n);
    };
    const approve = async (approved)=>{
        setLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoScans"].approve(processId, approved);
            setProposals([]);
            onApproved();
        } catch  {}
        setLoading(false);
    };
    if (!proposals.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass p-4",
        style: {
            borderColor: 'rgba(255,215,0,0.2)',
            background: 'rgba(255,215,0,0.03)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "live-dot",
                        style: {
                            background: '#ffd700',
                            animation: 'pulse-dot 1s ease-in-out infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] uppercase tracking-widest text-yellow-400",
                        children: "AI Proposals — Approval Needed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2 mb-4",
                children: proposals.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>toggle(p.task_name),
                        className: "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                        style: {
                            background: checked.has(p.task_name) ? 'rgba(0,170,255,0.06)' : 'rgba(255,255,255,0.02)',
                            borderColor: checked.has(p.task_name) ? 'rgba(0,170,255,0.2)' : 'rgba(255,255,255,0.06)',
                            opacity: checked.has(p.task_name) ? 1 : 0.5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: checked.has(p.task_name),
                                readOnly: true,
                                className: "accent-accent2 w-3.5 h-3.5 pointer-events-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[12px] font-semibold text-slate-200 truncate",
                                        children: p.task_name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-600 mt-0.5",
                                        children: [
                                            "🔧 ",
                                            p.tool,
                                            " · Priority ",
                                            p.priority,
                                            " · ",
                                            p.reason
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                                        lineNumber: 51,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>approve(Array.from(checked)),
                        disabled: loading || checked.size === 0,
                        className: "flex-1 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40",
                        style: {
                            background: 'rgba(0,255,170,0.1)',
                            borderColor: 'rgba(0,255,170,0.3)',
                            color: '#00ffaa'
                        },
                        children: [
                            loading ? '⟳' : '✓',
                            " Approve ",
                            checked.size > 0 ? `(${checked.size})` : ''
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>approve([]),
                        disabled: loading,
                        className: "px-4 py-2 rounded-lg border font-mono text-[11px] cursor-pointer transition-all",
                        style: {
                            background: 'rgba(255,58,92,0.08)',
                            borderColor: 'rgba(255,58,92,0.25)',
                            color: '#ff3a5c'
                        },
                        children: "✗ Skip All"
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/scan/ProposalPanel.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/scan/ProposalPanel.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(ProposalPanel, "lthtSTeR1lcZThOM+BrbH9xvk2U=");
_c = ProposalPanel;
var _c;
__turbopack_refresh__.register(_c, "ProposalPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/scan/ReportViewer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ReportViewer)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso/api.ts [app-client] (ecmascript)");
'use client';
;
;
function mdToHtml(md) {
    return md.replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/^\d+\.\s(.+)$/gm, '<p class="indent">• $1</p>').replace(/^- (.+)$/gm, '<p class="indent">• $1</p>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\|(.+)\|/g, (match)=>{
        const cells = match.split('|').filter((c)=>c.trim());
        if (cells.every((c)=>/^[-\s]+$/.test(c))) return '';
        return '<tr>' + cells.map((c)=>`<td>${c.trim()}</td>`).join('') + '</tr>';
    }).replace(/(<tr>.*?<\/tr>\s*)+/gs, '<table>$&</table>').replace(/\n\n/g, '<br>');
}
function ReportViewer({ report, processId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]",
                style: {
                    background: 'rgba(0,170,255,0.03)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot",
                                style: {
                                    background: '#00aaff'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/scan/ReportViewer.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-accent2 uppercase tracking-widest",
                                children: "Pentest Report"
                            }, void 0, false, {
                                fileName: "[project]/src/components/scan/ReportViewer.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/scan/ReportViewer.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoScans"].pdfUrl(processId),
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-400 hover:text-accent2 hover:border-accent2/25 transition-all",
                        children: "📥 Download PDF"
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/ReportViewer.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/scan/ReportViewer.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 report-body text-[13px] leading-relaxed overflow-y-auto",
                style: {
                    maxHeight: '500px'
                },
                dangerouslySetInnerHTML: {
                    __html: mdToHtml(report)
                }
            }, void 0, false, {
                fileName: "[project]/src/components/scan/ReportViewer.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        .report-body h1{font-size:17px;color:#00aaff;font-weight:700;margin:16px 0 6px}
        .report-body h2{font-size:14px;color:#a78bfa;font-weight:600;margin:14px 0 5px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .report-body table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px;font-family:monospace}
        .report-body th{background:rgba(0,170,255,0.1);padding:7px 10px;text-align:left;color:#00aaff}
        .report-body td{padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.04);color:#94a3b8}
        .report-body strong{color:#a78bfa}
        .report-body p{margin:4px 0;color:#94a3b8}
        .report-body .indent{padding-left:16px}
      `
            }, void 0, false, {
                fileName: "[project]/src/components/scan/ReportViewer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/scan/ReportViewer.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = ReportViewer;
var _c;
__turbopack_refresh__.register(_c, "ReportViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/scan/LiveTerminal.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>LiveTerminal)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const TYPE_COLOR = {
    execution_start: '#00ffaa',
    level_start: '#00aaff',
    task_start: '#ffd700',
    task_output: '#475569',
    task_complete: '#00ffaa',
    analysis_start: '#a78bfa',
    analysis_done: '#a78bfa',
    risk_update: '#ff8c42',
    proposal: '#ffd700',
    approval_needed: '#ffd700',
    approval_done: '#00ffaa',
    report_start: '#00aaff',
    report_done: '#00ffaa',
    complete: '#00ffaa',
    error: '#ff3a5c'
};
const TYPE_ICON = {
    execution_start: '▶',
    level_start: '◈',
    task_start: '🐳',
    task_output: '  ',
    task_complete: '✓',
    analysis_start: '🧠',
    analysis_done: '📊',
    risk_update: '⚖',
    proposal: '💡',
    approval_needed: '⏸',
    approval_done: '✓',
    report_start: '📝',
    report_done: '📄',
    complete: '✓',
    error: '✗'
};
function fmt(ev) {
    const d = ev.data;
    switch(ev.type){
        case 'execution_start':
            return `Scan started: ${d.target} — ${d.total_tasks} tasks, ${d.levels} levels`;
        case 'level_start':
            return `Level ${d.level}/${d.total_levels}: ${(d.tools || []).join(', ')}`;
        case 'task_start':
            return `Running ${d.tool}: ${d.task_name}`;
        case 'task_output':
            return `${d.line}`;
        case 'task_complete':
            return `${d.tool} done — ${d.findings_count} findings (${(d.duration || 0).toFixed(1)}s)`;
        case 'analysis_start':
            return `AI analyzing ${d.findings_count} findings...`;
        case 'analysis_done':
            return `Validated: ${d.validated}, removed ${d.removed} false positives${d.summary ? ' — ' + d.summary : ''}`;
        case 'risk_update':
            return `Risk: ${(d.risk || '?').toUpperCase()} (${(d.score || 0).toFixed(1)}) — C:${d.critical} H:${d.high} M:${d.medium}`;
        case 'proposal':
            return `AI proposes: ${(d.proposals || []).map((p)=>`${p.task_name} (${p.tool})`).join(', ')}`;
        case 'approval_needed':
            return `Waiting for your approval...`;
        case 'approval_done':
            return `Approved — continuing scan`;
        case 'report_start':
            return `Generating pentest report...`;
        case 'report_done':
            return `Report ready (${d.length} chars)`;
        case 'complete':
            return `Scan complete — ${d.findings} findings, risk: ${(d.risk || '?').toUpperCase()}, ${(d.duration || 0).toFixed(0)}s`;
        case 'error':
            return `Error: ${d.message || 'Unknown'}`;
        default:
            return JSON.stringify(d).slice(0, 120);
    }
}
function LiveTerminal({ events }) {
    _s();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveTerminal.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["LiveTerminal.useEffect"], [
        events.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]",
                style: {
                    background: 'rgba(0,255,170,0.03)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "live-dot"
                            }, void 0, false, {
                                fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                                lineNumber: 50,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                children: "Live Terminal"
                            }, void 0, false, {
                                fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px] text-slate-600",
                        children: [
                            events.length,
                            " events"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-[11px] p-4 overflow-y-auto space-y-px",
                style: {
                    background: '#020608',
                    maxHeight: '360px',
                    minHeight: '120px'
                },
                children: [
                    events.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#334155'
                        },
                        children: "Waiting for scan events..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, this) : events.map((ev, i)=>{
                        const color = TYPE_COLOR[ev.type] ?? '#475569';
                        const icon = TYPE_ICON[ev.type] ?? '·';
                        const isOut = ev.type === 'task_output';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "leading-relaxed",
                            style: {
                                paddingLeft: isOut ? '24px' : 0
                            },
                            children: [
                                !isOut && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color,
                                        marginRight: '6px'
                                    },
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                                    lineNumber: 65,
                                    columnNumber: 26
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color
                                    },
                                    children: fmt(ev)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/scan/LiveTerminal.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/scan/LiveTerminal.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(LiveTerminal, "eaUWg0io6wE0buoFSqU1QLjVsUo=");
_c = LiveTerminal;
var _c;
__turbopack_refresh__.register(_c, "LiveTerminal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/scan/[id]/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ScanDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$scan$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/use-scan-ws.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$poll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/use-poll.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$WorkflowTimeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/scan/WorkflowTimeline.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$ProposalPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/scan/ProposalPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$ReportViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/scan/ReportViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$LiveTerminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/scan/LiveTerminal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const RISK_COLOR = {
    critical: '#ff3a5c',
    high: '#ff8c42',
    medium: '#ffd700',
    low: '#00aaff'
};
function ScanDetailPage() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [scan, setScan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fromDb, setFromDb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchScan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ScanDetailPage.useCallback[fetchScan]": async ()=>{
            try {
                const s = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoScans"].status(id);
                if (s?.status) return s;
            } catch  {}
            try {
                const s = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["esoApi"].get(`/auth/scans/${id}`);
                if (s) {
                    setFromDb(true);
                    return s;
                }
            } catch  {}
            return null;
        }
    }["ScanDetailPage.useCallback[fetchScan]"], [
        id
    ]);
    const { events, latest, state: wsState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$scan$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScanWS"])(id);
    const isActive = !scan || ![
        'completed',
        'failed',
        'timeout'
    ].includes(scan?.status);
    const { data: pollData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$poll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePoll"])(fetchScan, isActive ? 2000 : 0, isActive);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScanDetailPage.useEffect": ()=>{
            if (pollData) setScan(pollData);
        }
    }["ScanDetailPage.useEffect"], [
        pollData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScanDetailPage.useEffect": ()=>{
            fetchScan().then({
                "ScanDetailPage.useEffect": (s)=>{
                    if (s) setScan(s);
                }
            }["ScanDetailPage.useEffect"]);
        }
    }["ScanDetailPage.useEffect"], [
        fetchScan
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScanDetailPage.useEffect": ()=>{
            if ([
                'level_complete',
                'analysis_done',
                'report_done',
                'complete'
            ].includes(latest?.type ?? '')) fetchScan().then({
                "ScanDetailPage.useEffect": (s)=>{
                    if (s) setScan(s);
                }
            }["ScanDetailPage.useEffect"]);
        }
    }["ScanDetailPage.useEffect"], [
        latest,
        fetchScan
    ]);
    if (!scan) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center h-64 flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-[11px] text-slate-600",
                children: "Loading scan..."
            }, void 0, false, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/scan/[id]/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
    const risk = scan.risk_summary || {};
    const riskLevel = risk.overall_risk || scan.risk_level || '—';
    const riskScore = risk.overall_score || scan.risk_score || 0;
    const findings = scan.findings_count || 0;
    const done = scan.completed_tasks || 0;
    const total = scan.total_tasks || 0;
    const progress = scan.progress || (total > 0 ? done / total * 100 : 0);
    const dur = scan.duration ? `${(scan.duration / 60).toFixed(1)}m` : scan.duration_seconds ? `${(scan.duration_seconds / 60).toFixed(1)}m` : '—';
    function wsStep() {
        for(let i = events.length - 1; i >= 0; i--){
            const t = events[i].type;
            if (t === 'complete') return 6;
            if (t === 'report_done' || t === 'report_start') return 5;
            if (t === 'proposal' || t === 'approval_needed') return 4;
            if (t === 'analysis_done' || t === 'risk_update') return 3;
            if (t === 'task_complete' || t === 'task_output' || t === 'task_start' || t === 'execution_start') return 2;
            if (t === 'level_start') return 2;
        }
        return 0;
    }
    const STATUS_COLOR = {
        completed: '#00ffaa',
        failed: '#ff3a5c',
        running: '#00aaff',
        planning: '#ffd700',
        queued: '#ffd700',
        validating: '#a78bfa',
        timeout: '#ff3a5c'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3 mb-5 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/scan",
                                className: "font-mono text-[11px] text-slate-500 hover:text-slate-300 transition-colors",
                                children: "← Scans"
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-black text-slate-100",
                                        children: scan.target || 'Scan'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-600 mt-0.5",
                                        children: id
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 77,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                            !fromDb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full",
                                title: `WebSocket: ${wsState}`,
                                style: {
                                    background: wsState === 'connected' ? '#00ffaa' : wsState === 'connecting' ? '#ffd700' : '#334155'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] font-bold px-2 py-1 rounded",
                                style: {
                                    color: STATUS_COLOR[scan.status] ?? '#64748b',
                                    background: 'rgba(255,255,255,0.06)'
                                },
                                children: scan.status?.toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            scan.status === 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/api/eso/reports/pdf/${id}`,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80",
                                        style: {
                                            background: 'rgba(0,170,255,0.1)',
                                            border: '1px solid rgba(0,170,255,0.3)',
                                            color: '#00aaff'
                                        },
                                        children: "PDF ↓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/api/eso/reports/compliance/${id}?framework=iso27001`,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80",
                                        style: {
                                            background: 'rgba(167,139,250,0.1)',
                                            border: '1px solid rgba(167,139,250,0.3)',
                                            color: '#a78bfa'
                                        },
                                        children: "ISO27001 ↓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `/api/eso/reports/compliance/${id}?framework=soc2`,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all hover:opacity-80",
                                        style: {
                                            background: 'rgba(167,139,250,0.08)',
                                            border: '1px solid rgba(167,139,250,0.2)',
                                            color: '#a78bfa'
                                        },
                                        children: "SOC2 ↓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4",
                children: [
                    {
                        label: 'Progress',
                        val: `${progress.toFixed(0)}%`,
                        color: '#00aaff'
                    },
                    {
                        label: 'Tasks',
                        val: `${done}/${total}`,
                        color: '#e2e8f0'
                    },
                    {
                        label: 'Findings',
                        val: findings,
                        color: '#00ffaa'
                    },
                    {
                        label: 'Risk',
                        val: String(riskLevel).toUpperCase(),
                        color: RISK_COLOR[riskLevel] ?? '#64748b'
                    },
                    {
                        label: 'Duration',
                        val: dur,
                        color: '#94a3b8'
                    }
                ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-3 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-lg font-bold",
                                style: {
                                    color: s.color
                                },
                                children: s.val
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 rounded-full overflow-hidden mb-5",
                style: {
                    background: 'rgba(255,255,255,0.05)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg,#00ffaa,#00aaff)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/scan/[id]/page.tsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$WorkflowTimeline$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                scan: scan,
                                wsStep: wsStep() > 0 ? wsStep() : undefined
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            scan.awaiting_approval && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$ProposalPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                processId: id,
                                onApproved: ()=>fetchScan().then((s)=>{
                                        if (s) setScan(s);
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 137,
                                columnNumber: 36
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            events.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$LiveTerminal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                events: events
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4 font-mono text-[11px]",
                                style: {
                                    background: '#020608'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: [
                                            "[",
                                            scan.status,
                                            "] ",
                                            scan.target,
                                            " — ",
                                            done,
                                            "/",
                                            total,
                                            " tasks"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 15
                                    }, this),
                                    scan.goal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#475569'
                                        },
                                        children: [
                                            "Goal: ",
                                            scan.goal
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 145,
                                        columnNumber: 27
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#00aaff'
                                        },
                                        children: [
                                            "Risk: ",
                                            String(riskLevel).toUpperCase(),
                                            " (",
                                            Number(riskScore).toFixed(1),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this),
                                    findings > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: [
                                            "Findings: ",
                                            findings
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 28
                                    }, this),
                                    fromDb && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            color: '#334155'
                                        },
                                        children: "Loaded from scan history"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            scan.report && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$scan$2f$ReportViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                report: scan.report,
                                processId: id
                            }, void 0, false, {
                                fileName: "[project]/src/app/scan/[id]/page.tsx",
                                lineNumber: 151,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scan/[id]/page.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/scan/[id]/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/scan/[id]/page.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(ScanDetailPage, "l0xdvAWUYh5vXEr9vnwyB9joaYQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$scan$2d$ws$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScanWS"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$poll$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePoll"]
    ];
});
_c = ScanDetailPage;
var _c;
__turbopack_refresh__.register(_c, "ScanDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/scan/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_ed5b6d._.js.map