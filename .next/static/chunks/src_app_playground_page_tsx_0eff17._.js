(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_playground_page_tsx_0eff17._.js", {

"[project]/src/app/playground/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PlaygroundPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const LABS = [
    {
        id: 'dvwa',
        name: 'DVWA',
        fullName: 'Damn Vulnerable Web Application',
        icon: '🌐',
        color: '#ff3a5c',
        desc: 'Classic web vulnerabilities — SQLi, XSS, CSRF, File Upload, Command Injection. The standard starting point.',
        difficulty: 'Beginner',
        topics: [
            'SQL Injection',
            'XSS',
            'CSRF',
            'File Upload',
            'Command Injection'
        ],
        docker: 'docker run -d -p 8888:80 vulnerables/web-dvwa',
        url: 'http://localhost:8888',
        login: 'admin / password',
        docs: 'https://github.com/digininja/DVWA'
    },
    {
        id: 'webgoat',
        name: 'WebGoat',
        fullName: 'OWASP WebGoat',
        icon: '🐐',
        color: '#ff8c42',
        desc: 'OWASP-maintained deliberately insecure app. Step-by-step lessons with hints. Covers OWASP Top 10.',
        difficulty: 'Beginner–Intermediate',
        topics: [
            'OWASP Top 10',
            'Injection',
            'Authentication',
            'IDOR',
            'XXE'
        ],
        docker: 'docker run -d -p 8080:8080 -p 9090:9090 webgoat/goat-and-wolf',
        url: 'http://localhost:8080/WebGoat',
        login: 'Register on first visit',
        docs: 'https://owasp.org/www-project-webgoat/'
    },
    {
        id: 'juice',
        name: 'OWASP Juice Shop',
        fullName: 'OWASP Juice Shop',
        icon: '🧃',
        color: '#a78bfa',
        desc: 'Modern single-page app with 100+ real challenges. Covers A1–A10. Used in official OWASP trainings.',
        difficulty: 'Beginner–Advanced',
        topics: [
            'XSS',
            'SQLi',
            'Broken Auth',
            'IDOR',
            'JWT',
            'Crypto Failures'
        ],
        docker: 'docker run -d -p 3333:3000 bkimminich/juice-shop',
        url: 'http://localhost:3333',
        login: 'No login needed',
        docs: 'https://owasp.org/www-project-juice-shop/'
    },
    {
        id: 'metasploitable',
        name: 'Metasploitable 2',
        fullName: 'Rapid7 Metasploitable',
        icon: '💣',
        color: '#ffd700',
        desc: 'Intentionally vulnerable Linux VM. Full network attack surface — Samba, FTP, HTTP, MySQL, PostgreSQL.',
        difficulty: 'Intermediate',
        topics: [
            'Network Services',
            'Samba RCE',
            'FTP Backdoor',
            'MySQL',
            'Metasploit'
        ],
        docker: 'docker run -d -p 80:80 -p 21:21 -p 22:22 tleemcjr/metasploitable2',
        url: 'http://localhost:80',
        login: 'msfadmin / msfadmin',
        docs: 'https://docs.rapid7.com/metasploit/metasploitable-2/'
    },
    {
        id: 'vulnhub',
        name: 'VulnHub VMs',
        fullName: 'VulnHub Community VMs',
        icon: '📦',
        color: '#00aaff',
        desc: 'Hundreds of free downloadable vulnerable VMs. Boot2root style — find flags by gaining root access.',
        difficulty: 'All levels',
        topics: [
            'Boot2Root',
            'CTF Style',
            'Full Compromise',
            'Privilege Escalation'
        ],
        docker: null,
        url: 'https://vulnhub.com',
        login: 'Download VMs directly',
        docs: 'https://www.vulnhub.com/about/'
    },
    {
        id: 'htb',
        name: 'HackTheBox',
        fullName: 'HackTheBox Platform',
        icon: '🟩',
        color: '#9fff3a',
        desc: 'Online penetration testing labs. Realistic machines, Active Directory labs, and career paths. Industry standard.',
        difficulty: 'Intermediate–Expert',
        topics: [
            'Active Directory',
            'Web',
            'Pwn',
            'Reversing',
            'OSINT'
        ],
        docker: null,
        url: 'https://hackthebox.com',
        login: 'Register at hackthebox.com',
        docs: 'https://help.hackthebox.com/'
    }
];
const TOOLS = [
    {
        name: 'Burp Suite Community',
        url: 'https://portswigger.net/burp/communitydownload',
        desc: 'Web proxy & scanner',
        icon: '🔥'
    },
    {
        name: 'OWASP ZAP',
        url: 'https://www.zaproxy.org/',
        desc: 'Free web scanner',
        icon: '⚡'
    },
    {
        name: 'Metasploit',
        url: 'https://www.metasploit.com/',
        desc: 'Exploit framework',
        icon: '🎯'
    },
    {
        name: 'Nmap',
        url: 'https://nmap.org/',
        desc: 'Network scanner',
        icon: '📡'
    },
    {
        name: 'Wireshark',
        url: 'https://www.wireshark.org/',
        desc: 'Packet analyzer',
        icon: '🦈'
    },
    {
        name: 'SQLMap',
        url: 'https://sqlmap.org/',
        desc: 'SQL injection tool',
        icon: '💉'
    }
];
function PlaygroundPage() {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function copy(text, id) {
        navigator.clipboard.writeText(text).then(()=>{
            setCopied(id);
            setTimeout(()=>setCopied(null), 2000);
        });
    }
    const lab = LABS.find((l)=>l.id === selected);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black",
                        children: [
                            "Exploit ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Playground"
                            }, void 0, false, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 117,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mt-1",
                        children: "Vulnerable practice environments — run locally with Docker or access online labs"
                    }, void 0, false, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/playground/page.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass p-4 mb-5 flex items-start gap-3",
                style: {
                    borderColor: 'rgba(0,170,255,0.2)',
                    background: 'rgba(0,170,255,0.04)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xl shrink-0",
                        children: "🐳"
                    }, void 0, false, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[10px] text-slate-400 leading-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent2 font-bold",
                                children: "Docker required"
                            }, void 0, false, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            " for local labs. Install from ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://docs.docker.com/get-docker/",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "text-accent2 underline",
                                children: "docs.docker.com"
                            }, void 0, false, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 129,
                                columnNumber: 24
                            }, this),
                            ". Online labs (HackTheBox, VulnHub) work in-browser without Docker.",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-600",
                                children: "These are isolated from the XCloak scan engine — run them separately on your machine."
                            }, void 0, false, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 131,
                                columnNumber: 16
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/playground/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: LABS.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelected(l.id === selected ? null : l.id),
                                className: "glass w-full text-left p-4 cursor-pointer transition-all hover:border-white/[0.15]",
                                style: {
                                    borderColor: selected === l.id ? `${l.color}40` : undefined,
                                    background: selected === l.id ? `${l.color}05` : undefined
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl shrink-0",
                                                children: l.icon
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 147,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 flex-wrap mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-[14px]",
                                                                style: {
                                                                    color: l.color
                                                                },
                                                                children: l.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 150,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                style: {
                                                                    background: `${l.color}15`,
                                                                    color: l.color
                                                                },
                                                                children: l.difficulty
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 21
                                                            }, this),
                                                            !l.docker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded bg-white/[0.05] text-slate-500",
                                                                children: "Online"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 156,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 149,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "font-mono text-[10px] text-slate-500 leading-5 mb-2",
                                                        children: l.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-wrap gap-1",
                                                        children: l.topics.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[8px] px-1.5 py-[1px] rounded bg-white/[0.04] border border-white/[0.06] text-slate-600",
                                                                children: t
                                                            }, t, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 148,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] text-slate-600 shrink-0",
                                                children: selected === l.id ? '▲ Hide' : '▼ Setup'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this),
                                    selected === l.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 pt-4 border-t border-white/[0.06] space-y-3",
                                        onClick: (e)=>e.stopPropagation(),
                                        children: [
                                            l.docker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-1.5",
                                                        children: "Start with Docker"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                className: "flex-1 font-mono text-[11px] text-accent p-2.5 rounded-lg break-all",
                                                                style: {
                                                                    background: 'rgba(0,0,0,0.4)',
                                                                    border: '1px solid rgba(255,255,255,0.06)'
                                                                },
                                                                children: l.docker
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>copy(l.docker, l.id + '-docker'),
                                                                className: "shrink-0 font-mono text-[9px] px-3 py-2 rounded-lg cursor-pointer transition-all",
                                                                style: {
                                                                    background: 'rgba(255,255,255,0.05)',
                                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                                    color: '#64748b'
                                                                },
                                                                children: copied === l.id + '-docker' ? '✓' : 'Copy'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 189,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 180,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-3 font-mono text-[10px]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-600 mb-0.5",
                                                                children: "URL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: l.url.startsWith('http') ? l.url : undefined,
                                                                target: l.url.startsWith('http') ? '_blank' : undefined,
                                                                rel: "noreferrer",
                                                                className: "text-accent2 hover:underline",
                                                                children: l.url
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-600 mb-0.5",
                                                                children: "Login"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 206,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: l.login
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-slate-600 mb-0.5",
                                                                children: "Docs"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 210,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: l.docs,
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: "text-accent2 hover:underline",
                                                                children: "Official docs ↗"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 211,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this),
                                            !l.docker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: l.url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "inline-block font-mono text-[11px] font-bold px-4 py-2.5 rounded-xl transition-all hover:opacity-80",
                                                style: {
                                                    background: `${l.color}12`,
                                                    border: `1px solid ${l.color}35`,
                                                    color: l.color
                                                },
                                                children: [
                                                    "Open ",
                                                    l.name,
                                                    " ↗"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 216,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 177,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, l.id, true, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Quick Start Guide"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 233,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 font-mono text-[10px] text-slate-500",
                                        children: [
                                            [
                                                '1',
                                                'Install Docker Desktop',
                                                'https://docs.docker.com/get-docker/'
                                            ],
                                            [
                                                '2',
                                                'Pick a lab from the list',
                                                null
                                            ],
                                            [
                                                '3',
                                                'Copy & run the docker command',
                                                null
                                            ],
                                            [
                                                '4',
                                                'Open the URL in browser',
                                                null
                                            ],
                                            [
                                                '5',
                                                'Use XCloak\'s Scanner tab to scan it',
                                                '/scan/new'
                                            ]
                                        ].map(([n, step, url])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5",
                                                        style: {
                                                            background: 'rgba(0,255,170,0.15)',
                                                            color: '#00ffaa'
                                                        },
                                                        children: n
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 19
                                                    }, this),
                                                    url ? url.startsWith('/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: url,
                                                        className: "text-accent2 hover:underline",
                                                        children: step
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: url,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "text-accent2 hover:underline",
                                                        children: [
                                                            step,
                                                            " ↗"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: step
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, n, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 236,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                        children: "Essential Tools"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: TOOLS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: t.url,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base shrink-0",
                                                        children: t.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[11px] font-bold text-slate-300",
                                                                children: t.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 274,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] text-slate-600",
                                                                children: t.desc
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/playground/page.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-[9px] text-slate-700",
                                                        children: "↗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/playground/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, t.name, true, {
                                                fileName: "[project]/src/app/playground/page.tsx",
                                                lineNumber: 270,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4 text-center space-y-2",
                                style: {
                                    borderColor: 'rgba(0,255,170,0.15)',
                                    background: 'rgba(0,255,170,0.04)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl",
                                        children: "⚡"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[12px] font-bold text-slate-300",
                                        children: "Scan Your Lab"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-600",
                                        children: "After starting a local lab, use XCloak's scanner to run nmap, nuclei, and nikto against it."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scan/new",
                                        className: "block font-mono text-[11px] font-bold py-2.5 rounded-xl transition-all hover:opacity-80",
                                        style: {
                                            background: 'rgba(0,255,170,0.1)',
                                            border: '1px solid rgba(0,255,170,0.3)',
                                            color: '#00ffaa'
                                        },
                                        children: "⚡ Open Scanner →"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/playground/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/playground/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/playground/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/playground/page.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/playground/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(PlaygroundPage, "1wRYKejeu9PZFlXs6jYM9Ms7B5M=");
_c = PlaygroundPage;
var _c;
__turbopack_refresh__.register(_c, "PlaygroundPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/playground/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_playground_page_tsx_0eff17._.js.map