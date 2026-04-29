(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_4575ff._.js", {

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
"[project]/src/app/chatroom/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ChatroomPage)
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
const ROOMS = [
    {
        id: 'general',
        label: '# general',
        desc: 'General security talk',
        public: true
    },
    {
        id: 'cve-alerts',
        label: '# cve-alerts',
        desc: 'New CVE discussions',
        public: true
    },
    {
        id: 'ctf-help',
        label: '# ctf-help',
        desc: 'CTF hints & collaboration',
        public: true
    },
    {
        id: 'exploits',
        label: '# exploits',
        desc: 'Exploit techniques',
        public: true
    },
    {
        id: 'offtopic',
        label: '# off-topic',
        desc: 'Anything goes',
        public: true
    },
    {
        id: 'pro-lounge',
        label: '🔒 pro-lounge',
        desc: 'Pro members only',
        public: false
    }
];
const TIER_COLOR = {
    free: '#64748b',
    pro: '#00aaff',
    enterprise: '#a78bfa',
    admin: '#ff3a5c'
};
const TYPE_COLOR = {
    message: 'inherit',
    system: '#ffd700',
    alert: '#ff3a5c'
};
const POLL_MS = 2500 // poll every 2.5s for new messages
;
function ChatroomPage() {
    _s();
    const eso = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const loggedIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])();
    // Use ESO username if logged in, otherwise anonymous alias
    const alias = loggedIn ? eso?.username ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$identity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlias"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$identity$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAlias"])();
    const tier = eso?.role === 'admin' ? 'admin' : eso?.tier ?? 'free';
    const [room, setRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('general');
    const [msgs, setMsgs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sending, setSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const latestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('') // newest msg id for delta polling
    ;
    const scrollBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatroomPage.useCallback[scrollBottom]": ()=>{
            setTimeout({
                "ChatroomPage.useCallback[scrollBottom]": ()=>bottomRef.current?.scrollIntoView({
                        behavior: 'smooth'
                    })
            }["ChatroomPage.useCallback[scrollBottom]"], 50);
        }
    }["ChatroomPage.useCallback[scrollBottom]"], []);
    // Load initial messages when room changes
    async function loadRoom(r) {
        setLoading(true);
        setMsgs([]);
        latestIdRef.current = '';
        try {
            const res = await fetch(`/api/v1/chat?room=${r}&limit=60`);
            const data = await res.json();
            const list = data.messages ?? [];
            setMsgs(list);
            if (list.length > 0) latestIdRef.current = list[list.length - 1].id;
            setOnline(Math.floor(Math.random() * 15) + 3);
        } catch  {
            setMsgs([]);
        }
        setLoading(false);
        scrollBottom();
    }
    // Poll for new messages since last known id
    async function pollNew(r) {
        try {
            const res = await fetch(`/api/v1/chat?room=${r}&limit=20`);
            const data = await res.json();
            const list = data.messages ?? [];
            if (list.length === 0) return;
            const newest = list[list.length - 1].id;
            if (newest === latestIdRef.current) return;
            // Find new messages
            const knownIdx = list.findIndex((m)=>m.id === latestIdRef.current);
            const newMsgs = knownIdx === -1 ? list : list.slice(knownIdx + 1);
            if (newMsgs.length > 0) {
                setMsgs((prev)=>{
                    // dedupe by id
                    const ids = new Set(prev.map((m)=>m.id));
                    const added = newMsgs.filter((m)=>!ids.has(m.id));
                    if (added.length === 0) return prev;
                    scrollBottom();
                    return [
                        ...prev,
                        ...added
                    ].slice(-200) // keep last 200
                    ;
                });
                latestIdRef.current = newest;
            }
        } catch  {}
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatroomPage.useEffect": ()=>{
            loadRoom(room);
            // Start polling
            if (pollRef.current) clearInterval(pollRef.current);
            pollRef.current = setInterval({
                "ChatroomPage.useEffect": ()=>pollNew(room)
            }["ChatroomPage.useEffect"], POLL_MS);
            return ({
                "ChatroomPage.useEffect": ()=>{
                    if (pollRef.current) clearInterval(pollRef.current);
                }
            })["ChatroomPage.useEffect"];
        }
    }["ChatroomPage.useEffect"], [
        room
    ]) // eslint-disable-line
    ;
    async function sendMessage(e) {
        e.preventDefault();
        const text = input.trim();
        if (!text || sending) return;
        if (!loggedIn) {
            setError('Sign in to send messages');
            return;
        }
        if (room === 'pro-lounge' && tier === 'free') {
            setError('Pro room requires Pro tier');
            return;
        }
        setSending(true);
        setError('');
        // Optimistic add
        const optimistic = {
            id: `opt_${Date.now()}`,
            room,
            alias,
            tier,
            content: text,
            type: 'message',
            createdAt: new Date().toISOString()
        };
        setMsgs((prev)=>[
                ...prev,
                optimistic
            ]);
        setInput('');
        scrollBottom();
        try {
            const res = await fetch('/api/v1/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room,
                    content: text,
                    alias,
                    tier
                })
            });
            const saved = await res.json();
            if (!res.ok) throw new Error(saved);
            // Replace optimistic with real
            setMsgs((prev)=>prev.map((m)=>m.id === optimistic.id ? saved : m));
            latestIdRef.current = saved.id;
        } catch (e) {
            setMsgs((prev)=>prev.filter((m)=>m.id !== optimistic.id));
            setError(e.message ?? 'Failed to send');
        }
        setSending(false);
    }
    const canAccess = (r)=>r.public || loggedIn;
    const activeRoom = ROOMS.find((r)=>r.id === room);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: 'calc(100vh - 52px)',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '200px',
                    flexShrink: 0,
                    borderRight: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(3,5,10,0.5)',
                    overflowY: 'auto',
                    padding: '12px 0',
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[9px] tracking-widest text-slate-600 uppercase px-4 pb-2",
                        children: "Rooms"
                    }, void 0, false, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    ROOMS.map((r)=>{
                        const accessible = canAccess(r);
                        const active = room === r.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>accessible && setRoom(r.id),
                            className: "w-full text-left px-4 py-2 transition-all",
                            style: {
                                background: active ? 'rgba(0,255,170,0.07)' : 'transparent',
                                borderLeft: active ? '2px solid #00ffaa' : '2px solid transparent',
                                cursor: accessible ? 'pointer' : 'not-allowed',
                                opacity: accessible ? 1 : 0.4
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[11px] font-semibold",
                                    style: {
                                        color: active ? '#00ffaa' : accessible ? '#94a3b8' : '#334155'
                                    },
                                    children: r.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[9px] text-slate-700 mt-0.5",
                                    children: r.desc
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/src/app/chatroom/page.tsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1"
                    }, void 0, false, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-3 mb-2 p-3 rounded-xl",
                        style: {
                            background: 'rgba(0,255,170,0.04)',
                            border: '1px solid rgba(0,255,170,0.08)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] font-bold text-accent",
                                children: alias
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] mt-0.5 capitalize",
                                style: {
                                    color: TIER_COLOR[tier]
                                },
                                children: eso?.role === 'admin' ? '⭐ admin' : tier
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            !loggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                className: "font-mono text-[8px] text-slate-600 hover:text-accent transition-colors mt-1 block",
                                children: "Sign in for full access →"
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/chatroom/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0",
                        style: {
                            background: 'rgba(3,5,10,0.3)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[13px] font-bold text-accent",
                                        children: activeRoom.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-slate-600",
                                        children: activeRoom.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 font-mono text-[10px] text-slate-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    online,
                                    " online"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-4 py-3",
                        style: {
                            scrollbarWidth: 'thin'
                        },
                        children: [
                            !activeRoom.public && !loggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-full gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl opacity-30",
                                        children: "🔒"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-mono text-[12px] text-slate-500",
                                        children: "Pro members only room"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "font-mono text-[11px] font-bold px-4 py-2 rounded-xl transition-all hover:opacity-80",
                                        style: {
                                            background: 'rgba(0,255,170,0.1)',
                                            border: '1px solid rgba(0,255,170,0.3)',
                                            color: '#00ffaa'
                                        },
                                        children: "Sign In →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 212,
                                columnNumber: 13
                            }, this) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center h-32",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[11px] text-slate-600 animate-pulse",
                                    children: "Loading messages..."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this) : msgs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center h-32 gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[11px] text-slate-600",
                                    children: "No messages yet — be the first!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 225,
                                columnNumber: 13
                            }, this) : msgs.map((m, i)=>{
                                const isSystem = m.type === 'system' || m.alias === '🤖 system';
                                const isMe = m.alias === alias;
                                const showDate = i === 0 || new Date(msgs[i - 1].createdAt).toDateString() !== new Date(m.createdAt).toDateString();
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        showDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center font-mono text-[9px] text-slate-700 my-3",
                                            children: [
                                                "— ",
                                                new Date(m.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                }),
                                                " —"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 21
                                        }, this),
                                        isSystem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "my-2 px-3 py-1.5 rounded-lg text-center font-mono text-[10px]",
                                            style: {
                                                background: 'rgba(255,215,0,0.06)',
                                                border: '1px solid rgba(255,215,0,0.12)',
                                                color: '#ffd700'
                                            },
                                            children: m.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex gap-3 mb-3 ${isMe ? 'flex-row-reverse' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[9px] font-bold",
                                                    style: {
                                                        background: `${TIER_COLOR[m.tier] ?? '#475569'}20`,
                                                        border: `1px solid ${TIER_COLOR[m.tier] ?? '#475569'}40`,
                                                        color: TIER_COLOR[m.tier] ?? '#475569'
                                                    },
                                                    children: m.alias.slice(0, 2).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `flex items-baseline gap-2 mb-0.5 ${isMe ? 'flex-row-reverse' : ''}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[10px] font-bold",
                                                                    style: {
                                                                        color: TIER_COLOR[m.tier] ?? '#64748b'
                                                                    },
                                                                    children: [
                                                                        m.alias,
                                                                        isMe ? ' (you)' : ''
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[8px] text-slate-700",
                                                                    children: new Date(m.createdAt).toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                                                    lineNumber: 257,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                                            lineNumber: 253,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[12px] leading-relaxed px-3 py-2 rounded-xl",
                                                            style: {
                                                                background: isMe ? 'rgba(0,255,170,0.08)' : 'rgba(255,255,255,0.04)',
                                                                border: isMe ? '1px solid rgba(0,255,170,0.15)' : '1px solid rgba(255,255,255,0.06)',
                                                                color: '#cbd5e1',
                                                                borderRadius: isMe ? '12px 12px 2px 12px' : '12px 12px 12px 2px'
                                                            },
                                                            children: m.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                                    lineNumber: 252,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, m.id, true, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: bottomRef
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-t border-white/[0.06] shrink-0",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[10px] text-red-400 mb-2",
                                children: [
                                    "✗ ",
                                    error
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this),
                            !loggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-4 py-2.5 rounded-xl",
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[11px] text-slate-500",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/register",
                                                className: "text-accent hover:underline",
                                                children: "Create a free account"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chatroom/page.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            " to send messages"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: "font-mono text-[10px] text-slate-500 hover:text-slate-300 transition-colors px-3 py-1 rounded-lg",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        },
                                        children: "Sign In"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: sendMessage,
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: input,
                                        onChange: (e)=>setInput(e.target.value),
                                        placeholder: `Message ${activeRoom.label}...`,
                                        maxLength: 500,
                                        disabled: sending,
                                        className: "flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none transition-colors placeholder-slate-700",
                                        style: {
                                            borderColor: input ? 'rgba(0,255,170,0.2)' : undefined
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !input.trim() || sending,
                                        className: "px-4 py-2.5 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all disabled:opacity-40",
                                        style: {
                                            background: 'rgba(0,255,170,0.1)',
                                            border: '1px solid rgba(0,255,170,0.3)',
                                            color: '#00ffaa'
                                        },
                                        children: sending ? '⟳' : 'Send'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 297,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/chatroom/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/chatroom/page.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(ChatroomPage, "3tFRb+Tx8slgtl6J0PsCgYD63Fg=");
_c = ChatroomPage;
var _c;
__turbopack_refresh__.register(_c, "ChatroomPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/chatroom/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_4575ff._.js.map