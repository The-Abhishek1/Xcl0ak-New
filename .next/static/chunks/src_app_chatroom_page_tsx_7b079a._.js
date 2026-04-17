(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_chatroom_page_tsx_7b079a._.js", {

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
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
        label: '🔒 # pro-lounge',
        desc: 'Pro members only',
        public: false
    }
];
// Simulated messages per room for demo
const DEMO_MESSAGES = {
    general: [
        {
            user: 'null_ptr',
            tier: 'pro',
            msg: 'Anyone else testing qwen2.5:14b for planning? Results are insane',
            ts: '12:01'
        },
        {
            user: 'r00tkit',
            tier: 'free',
            msg: 'What scan tool do you guys use for subdomain enum?',
            ts: '12:03'
        },
        {
            user: '0xIdiot',
            tier: 'admin',
            msg: 'gobuster + amass combo is unbeatable',
            ts: '12:04'
        },
        {
            user: 'xorshift',
            tier: 'pro',
            msg: 'dont sleep on subfinder either',
            ts: '12:05'
        }
    ],
    'cve-alerts': [
        {
            user: 'nvd_bot',
            tier: 'admin',
            msg: '🚨 CVE-2024-23897 Jenkins LFI - CVSS 9.8',
            ts: '11:30'
        },
        {
            user: 'cipher_x',
            tier: 'pro',
            msg: 'got a nuclei template for this already',
            ts: '11:32'
        },
        {
            user: 'null_ptr',
            tier: 'pro',
            msg: 'patched in 2.441 but most installs are unpatched',
            ts: '11:35'
        }
    ],
    'ctf-help': [
        {
            user: 'ghost_s3',
            tier: 'free',
            msg: 'stuck on pwn/overflow-1, any hints?',
            ts: '10:15'
        },
        {
            user: 'heap_heap',
            tier: 'pro',
            msg: 'think about the canary value...',
            ts: '10:17'
        },
        {
            user: 'r00tkit',
            tier: 'free',
            msg: 'what binary is it?',
            ts: '10:18'
        }
    ],
    exploits: [
        {
            user: '0xIdiot',
            tier: 'admin',
            msg: 'new PoC for CVE-2024-1086 landed, netfilter UAF',
            ts: '09:00'
        },
        {
            user: 'void_main',
            tier: 'pro',
            msg: 'tested on 6.7.2, works clean',
            ts: '09:05'
        }
    ],
    offtopic: [
        {
            user: 'xorshift',
            tier: 'pro',
            msg: 'hackthebox dropped a new insane box',
            ts: '08:45'
        },
        {
            user: 'r00tkit',
            tier: 'free',
            msg: 'the AI ones are getting wild',
            ts: '08:47'
        }
    ]
};
const TIER_COLOR = {
    free: '#64748b',
    pro: '#00aaff',
    enterprise: '#a78bfa',
    admin: '#ff3a5c'
};
function ChatroomPage() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const loggedIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLoggedIn"])();
    const [room, setRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('general');
    const [msgs, setMsgs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEMO_MESSAGES['general'] ?? []);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [joined, setJoined] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatroomPage.useEffect": ()=>{
            setMsgs(DEMO_MESSAGES[room] ?? []);
        }
    }["ChatroomPage.useEffect"], [
        room
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatroomPage.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatroomPage.useEffect"], [
        msgs
    ]);
    const activeRoom = ROOMS.find((r)=>r.id === room);
    function sendMessage(e) {
        e.preventDefault();
        if (!input.trim() || !loggedIn) return;
        const newMsg = {
            user: user?.username ?? 'anon',
            tier: user?.role === 'admin' ? 'admin' : user?.tier ?? 'free',
            msg: input.trim(),
            ts: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        };
        setMsgs((prev)=>[
                ...prev,
                newMsg
            ]);
        setInput('');
    }
    const canJoinRoom = (r)=>r.public || loggedIn;
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
                    background: 'rgba(3,5,10,0.4)',
                    overflowY: 'auto',
                    padding: '12px 0'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontFamily: "'Space Mono',monospace",
                            fontSize: '9px',
                            letterSpacing: '0.15em',
                            color: '#475569',
                            textTransform: 'uppercase',
                            padding: '0 16px 8px'
                        },
                        children: "Chatrooms"
                    }, void 0, false, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    ROOMS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                if (canJoinRoom(r)) setRoom(r.id);
                            },
                            style: {
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                padding: '8px 16px',
                                border: 'none',
                                cursor: canJoinRoom(r) ? 'pointer' : 'not-allowed',
                                background: room === r.id ? 'rgba(0,255,170,0.08)' : 'transparent',
                                borderLeft: room === r.id ? '2px solid #00ffaa' : '2px solid transparent',
                                transition: 'all 0.15s'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: room === r.id ? '#00ffaa' : canJoinRoom(r) ? '#64748b' : '#334155'
                                    },
                                    children: r.label
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '9px',
                                        color: '#334155',
                                        marginTop: '2px'
                                    },
                                    children: r.desc
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, r.id, true, {
                            fileName: "[project]/src/app/chatroom/page.tsx",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this)),
                    loggedIn && user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: '12px',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            background: 'rgba(0,255,170,0.04)',
                            border: '1px solid rgba(0,255,170,0.08)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '10px',
                                    color: '#00ffaa',
                                    fontWeight: 700
                                },
                                children: user.username
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '9px',
                                    color: TIER_COLOR[user.tier ?? 'free'],
                                    marginTop: '2px',
                                    textTransform: 'capitalize'
                                },
                                children: user.role === 'admin' ? '⭐ admin' : user.tier ?? 'free'
                            }, void 0, false, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/chatroom/page.tsx",
                lineNumber: 83,
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
                        style: {
                            padding: '12px 16px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            color: '#00ffaa'
                                        },
                                        children: activeRoom?.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: "'Space Mono',monospace",
                                            fontSize: '10px',
                                            color: '#475569',
                                            marginLeft: '8px'
                                        },
                                        children: activeRoom?.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 120,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontFamily: "'Space Mono',monospace",
                                    fontSize: '9px',
                                    color: '#334155'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: "●"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    " ",
                                    Math.floor(Math.random() * 20) + 5,
                                    " online"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chatroom/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px'
                        },
                        children: !activeRoom?.public && !loggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                padding: '40px 20px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '32px',
                                        marginBottom: '12px',
                                        opacity: 0.3
                                    },
                                    children: "🔒"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '12px',
                                        color: '#475569',
                                        marginBottom: '16px'
                                    },
                                    children: "This room is for registered members only."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 134,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        color: '#00ffaa',
                                        textDecoration: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        background: 'rgba(0,255,170,0.08)',
                                        border: '1px solid rgba(0,255,170,0.2)'
                                    },
                                    children: "Sign In to Join →"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chatroom/page.tsx",
                            lineNumber: 132,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                msgs.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: '10px',
                                            marginBottom: '12px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: `${TIER_COLOR[m.tier] ?? '#475569'}20`,
                                                    border: `1px solid ${TIER_COLOR[m.tier] ?? '#475569'}40`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0,
                                                    marginTop: '2px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontFamily: "'Space Mono',monospace",
                                                        fontSize: '9px',
                                                        fontWeight: 700,
                                                        color: TIER_COLOR[m.tier] ?? '#475569'
                                                    },
                                                    children: m.user.slice(0, 2).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chatroom/page.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'baseline',
                                                            gap: '8px',
                                                            marginBottom: '3px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "'Space Mono',monospace",
                                                                    fontSize: '11px',
                                                                    fontWeight: 700,
                                                                    color: TIER_COLOR[m.tier] ?? '#64748b'
                                                                },
                                                                children: m.user
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/chatroom/page.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontFamily: "'Space Mono',monospace",
                                                                    fontSize: '9px',
                                                                    color: '#334155'
                                                                },
                                                                children: m.ts
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/chatroom/page.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontFamily: "'Space Mono',monospace",
                                                            fontSize: '12px',
                                                            color: '#94a3b8',
                                                            lineHeight: '1.5'
                                                        },
                                                        children: m.msg
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                                        lineNumber: 153,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/chatroom/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/app/chatroom/page.tsx",
                                        lineNumber: 142,
                                        columnNumber: 17
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: bottomRef
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px 16px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            flexShrink: 0
                        },
                        children: !loggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        color: '#475569'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            style: {
                                                color: '#00ffaa',
                                                textDecoration: 'none'
                                            },
                                            children: "Create a free account"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chatroom/page.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this),
                                        " to send messages"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/login",
                                    style: {
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '10px',
                                        color: '#64748b',
                                        textDecoration: 'none',
                                        padding: '5px 12px',
                                        borderRadius: '6px',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)'
                                    },
                                    children: "Sign In"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chatroom/page.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: sendMessage,
                            style: {
                                display: 'flex',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    placeholder: `Message ${activeRoom?.label}...`,
                                    style: {
                                        flex: 1,
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '10px',
                                        padding: '10px 14px',
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '12px',
                                        color: '#e2e8f0',
                                        outline: 'none'
                                    },
                                    onFocus: (e)=>{
                                        e.target.style.borderColor = 'rgba(0,255,170,0.3)';
                                    },
                                    onBlur: (e)=>{
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !input.trim(),
                                    style: {
                                        padding: '10px 16px',
                                        borderRadius: '10px',
                                        fontFamily: "'Space Mono',monospace",
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        background: 'rgba(0,255,170,0.1)',
                                        border: '1px solid rgba(0,255,170,0.3)',
                                        color: '#00ffaa',
                                        opacity: input.trim() ? 1 : 0.4,
                                        transition: 'all 0.15s'
                                    },
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chatroom/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chatroom/page.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/chatroom/page.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/chatroom/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/chatroom/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s(ChatroomPage, "ag6hHLVAQ4L8zS/8YZ0Jb34CHPI=");
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

//# sourceMappingURL=src_app_chatroom_page_tsx_7b079a._.js.map