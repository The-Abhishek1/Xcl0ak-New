(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_learn_page_tsx_c94289._.js", {

"[project]/src/app/learn/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>LearnPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const TRACKS = [
    {
        id: 'beginner',
        icon: '🌱',
        label: 'Beginner',
        color: '#00ffaa',
        desc: 'Start your security journey',
        modules: [
            {
                title: 'What is cybersecurity?',
                type: 'read',
                done: true
            },
            {
                title: 'Understanding the CIA Triad',
                type: 'read',
                done: true
            },
            {
                title: 'How the Web works (HTTP/HTTPS)',
                type: 'read',
                done: false
            },
            {
                title: 'Common attack types overview',
                type: 'read',
                done: false
            },
            {
                title: 'Setting up a lab with VirtualBox',
                type: 'lab',
                done: false
            },
            {
                title: 'First CTF: Cookie Monster',
                type: 'ctf',
                done: false
            }
        ]
    },
    {
        id: 'web',
        icon: '🌐',
        label: 'Web Security',
        color: '#00aaff',
        desc: 'OWASP Top 10 and beyond',
        modules: [
            {
                title: 'SQL Injection — theory & practice',
                type: 'read',
                done: false
            },
            {
                title: 'Cross-Site Scripting (XSS)',
                type: 'read',
                done: false
            },
            {
                title: 'CSRF — attack and defense',
                type: 'read',
                done: false
            },
            {
                title: 'Authentication flaws (JWT, sessions)',
                type: 'read',
                done: false
            },
            {
                title: 'SSRF & XXE injection',
                type: 'read',
                done: false
            },
            {
                title: 'Burp Suite fundamentals',
                type: 'lab',
                done: false
            },
            {
                title: 'CTF: SQLi in the Dark',
                type: 'ctf',
                done: false
            }
        ]
    },
    {
        id: 'binary',
        icon: '💣',
        label: 'Binary Exploitation',
        color: '#ff3a5c',
        desc: 'Low-level attack techniques',
        modules: [
            {
                title: 'x86/x64 assembly basics',
                type: 'read',
                done: false
            },
            {
                title: 'Stack buffer overflows',
                type: 'read',
                done: false
            },
            {
                title: 'Return-Oriented Programming (ROP)',
                type: 'read',
                done: false
            },
            {
                title: 'Heap exploitation fundamentals',
                type: 'read',
                done: false
            },
            {
                title: 'Format string vulnerabilities',
                type: 'read',
                done: false
            },
            {
                title: 'GDB & pwntools setup',
                type: 'lab',
                done: false
            },
            {
                title: 'CTF: Stack Smasher',
                type: 'ctf',
                done: false
            }
        ]
    },
    {
        id: 'network',
        icon: '📡',
        label: 'Network Security',
        color: '#a78bfa',
        desc: 'Packets, protocols, and pivoting',
        modules: [
            {
                title: 'TCP/IP deep dive',
                type: 'read',
                done: false
            },
            {
                title: 'Network scanning with Nmap',
                type: 'lab',
                done: false
            },
            {
                title: 'Man-in-the-Middle attacks',
                type: 'read',
                done: false
            },
            {
                title: 'VPN & tunneling techniques',
                type: 'read',
                done: false
            },
            {
                title: 'Wireshark packet analysis',
                type: 'lab',
                done: false
            },
            {
                title: 'CTF: Phantom Packet',
                type: 'ctf',
                done: false
            }
        ]
    },
    {
        id: 'crypto',
        icon: '🔐',
        label: 'Cryptography',
        color: '#ffd700',
        desc: 'Breaking and building secure systems',
        modules: [
            {
                title: 'Symmetric encryption (AES)',
                type: 'read',
                done: false
            },
            {
                title: 'Asymmetric encryption (RSA)',
                type: 'read',
                done: false
            },
            {
                title: 'Hash functions & collisions',
                type: 'read',
                done: false
            },
            {
                title: 'Padding oracle attacks',
                type: 'read',
                done: false
            },
            {
                title: "Wiener's attack on RSA",
                type: 'read',
                done: false
            },
            {
                title: "CTF: RSA with Twist",
                type: 'ctf',
                done: false
            }
        ]
    },
    {
        id: 'red',
        icon: '🎯',
        label: 'Red Teaming',
        color: '#ff8c42',
        desc: 'Advanced offensive techniques',
        modules: [
            {
                title: 'OPSEC fundamentals',
                type: 'read',
                done: false
            },
            {
                title: 'Active Directory attacks',
                type: 'read',
                done: false
            },
            {
                title: 'Lateral movement techniques',
                type: 'read',
                done: false
            },
            {
                title: 'C2 frameworks (Cobalt Strike, Sliver)',
                type: 'read',
                done: false
            },
            {
                title: 'Malware development basics',
                type: 'read',
                done: false
            },
            {
                title: 'Full red team simulation',
                type: 'lab',
                done: false
            }
        ]
    }
];
const RESOURCES = [
    {
        name: 'HackTheBox',
        url: 'https://hackthebox.com',
        icon: '📦',
        desc: 'Practice machines'
    },
    {
        name: 'TryHackMe',
        url: 'https://tryhackme.com',
        icon: '🎯',
        desc: 'Guided learning paths'
    },
    {
        name: 'PortSwigger Labs',
        url: 'https://portswigger.net/web-security',
        icon: '🔬',
        desc: 'Web security labs'
    },
    {
        name: 'PicoCTF',
        url: 'https://picoctf.org',
        icon: '🏁',
        desc: 'Beginner CTF'
    },
    {
        name: 'CTFtime',
        url: 'https://ctftime.org',
        icon: '⏱',
        desc: 'CTF calendar'
    },
    {
        name: 'HackTricks',
        url: 'https://book.hacktricks.xyz',
        icon: '📖',
        desc: 'Technique bible'
    },
    {
        name: 'Exploit-DB',
        url: 'https://exploit-db.com',
        icon: '💾',
        desc: 'Public exploits'
    },
    {
        name: 'GTFOBins',
        url: 'https://gtfobins.github.io',
        icon: '🚀',
        desc: 'Unix privilege escalation'
    }
];
const TYPE_ICON = {
    read: '📄',
    lab: '🧪',
    ctf: '🚩'
};
const TYPE_COLOR = {
    read: 'text-slate-400',
    lab: 'text-accent2',
    ctf: 'text-yellow-400'
};
function LearnPage() {
    _s();
    const [activeTrack, setActiveTrack] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('beginner');
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const track = TRACKS.find((t)=>t.id === activeTrack);
    function toggle(key) {
        setProgress((p)=>({
                ...p,
                [key]: !p[key]
            }));
    }
    const totalDone = track.modules.filter((m, i)=>m.done || progress[`${activeTrack}-${i}`]).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black",
                        children: [
                            "Learning ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Paths"
                            }, void 0, false, {
                                fileName: "[project]/src/app/learn/page.tsx",
                                lineNumber: 133,
                                columnNumber: 54
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/learn/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mt-1",
                        children: "Structured cybersecurity curriculum — beginner to red team"
                    }, void 0, false, {
                        fileName: "[project]/src/app/learn/page.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/learn/page.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: TRACKS.map((t)=>{
                            const done = t.modules.filter((m, i)=>m.done || progress[`${t.id}-${i}`]).length;
                            const pct = Math.round(done / t.modules.length * 100);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTrack(t.id),
                                className: `w-full text-left p-3.5 rounded-xl border transition-all duration-150 block
                  ${activeTrack === t.id ? 'border-opacity-50' : 'border-white/[0.06] hover:border-white/[0.12]'}`,
                                style: {
                                    background: activeTrack === t.id ? `${t.color}12` : 'rgba(255,255,255,0.025)',
                                    borderColor: activeTrack === t.id ? `${t.color}40` : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5 mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: t.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 156,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-[13px]",
                                                style: {
                                                    color: activeTrack === t.id ? t.color : '#e2e8f0'
                                                },
                                                children: t.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 mb-2",
                                        children: t.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-1 bg-white/[0.06] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full transition-all duration-500",
                                            style: {
                                                width: `${pct}%`,
                                                background: t.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/learn/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 mt-1",
                                        children: [
                                            done,
                                            "/",
                                            t.modules.length,
                                            " complete"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, t.id, true, {
                                fileName: "[project]/src/app/learn/page.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/learn/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-3xl",
                                                children: track.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 178,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-xl font-black",
                                                        style: {
                                                            color: track.color
                                                        },
                                                        children: track.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[11px] text-slate-500",
                                                        children: track.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "ml-auto text-right",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-2xl font-bold",
                                                        style: {
                                                            color: track.color
                                                        },
                                                        children: [
                                                            Math.round(totalDone / track.modules.length * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[9px] text-slate-600",
                                                        children: "COMPLETE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 183,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 bg-white/[0.06] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-full rounded-full transition-all duration-700",
                                            style: {
                                                width: `${totalDone / track.modules.length * 100}%`,
                                                background: track.color
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/learn/page.tsx",
                                            lineNumber: 191,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/learn/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 border-b border-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] tracking-widest uppercase",
                                            style: {
                                                color: track.color
                                            },
                                            children: "Modules"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/learn/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "divide-y divide-white/[0.03]",
                                        children: track.modules.map((mod, i)=>{
                                            const key = `${activeTrack}-${i}`;
                                            const done = mod.done || progress[key];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex items-center gap-4 px-4 py-3.5 cursor-pointer
                                transition-colors hover:bg-white/[0.03]
                                ${done ? 'opacity-70' : ''}`,
                                                onClick: ()=>toggle(key),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all
                                    ${done ? 'border-current' : 'border-white/[0.15]'}`,
                                                        style: {
                                                            color: done ? track.color : undefined,
                                                            background: done ? `${track.color}20` : undefined
                                                        },
                                                        children: done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[11px] font-bold",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/learn/page.tsx",
                                                            lineNumber: 218,
                                                            columnNumber: 32
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `text-[13px] font-semibold transition-colors
                                      ${done ? 'line-through text-slate-600' : 'text-slate-200'}`,
                                                            children: mod.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/learn/page.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5 shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm",
                                                                children: TYPE_ICON[mod.type]
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-mono text-[9px] uppercase ${TYPE_COLOR[mod.type]}`,
                                                                children: mod.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 232,
                                                                columnNumber: 23
                                                            }, this),
                                                            mod.type === 'ctf' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/ctf",
                                                                onClick: (e)=>e.stopPropagation(),
                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded border border-yellow-500/25 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors",
                                                                children: "OPEN →"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 236,
                                                                columnNumber: 25
                                                            }, this),
                                                            mod.type === 'lab' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                href: "/playground",
                                                                onClick: (e)=>e.stopPropagation(),
                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded border border-accent2/25 bg-accent2/10 text-accent2 hover:bg-accent2/20 transition-colors",
                                                                children: "LAB →"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 244,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/learn/page.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 border-b border-white/[0.06]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-slate-500 tracking-widest uppercase",
                                            children: "External Resources"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/learn/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-0",
                                        children: RESOURCES.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: r.url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "flex items-start gap-2.5 p-3.5 border-r border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-lg shrink-0",
                                                        children: r.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[11px] font-bold text-slate-300",
                                                                children: r.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] text-slate-600",
                                                                children: r.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/learn/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/learn/page.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/learn/page.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/learn/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/learn/page.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/learn/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/learn/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/learn/page.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
_s(LearnPage, "kJpQjn7f9hIvQov4pucnCGcEuy8=");
_c = LearnPage;
var _c;
__turbopack_refresh__.register(_c, "LearnPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/learn/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_learn_page_tsx_c94289._.js.map