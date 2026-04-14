(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_scanner_page_tsx_1d8ab7._.js", {

"[project]/src/app/scanner/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ScannerPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
const COMMON_PORTS = [
    {
        port: 21,
        service: 'FTP'
    },
    {
        port: 22,
        service: 'SSH'
    },
    {
        port: 25,
        service: 'SMTP'
    },
    {
        port: 53,
        service: 'DNS'
    },
    {
        port: 80,
        service: 'HTTP'
    },
    {
        port: 110,
        service: 'POP3'
    },
    {
        port: 143,
        service: 'IMAP'
    },
    {
        port: 443,
        service: 'HTTPS'
    },
    {
        port: 445,
        service: 'SMB'
    },
    {
        port: 3306,
        service: 'MySQL'
    },
    {
        port: 3389,
        service: 'RDP'
    },
    {
        port: 5432,
        service: 'PostgreSQL'
    },
    {
        port: 6379,
        service: 'Redis'
    },
    {
        port: 8080,
        service: 'HTTP-Alt'
    },
    {
        port: 8443,
        service: 'HTTPS-Alt'
    },
    {
        port: 27017,
        service: 'MongoDB'
    }
];
const SCAN_MODULES = [
    {
        id: 'subdomains',
        icon: '🔍',
        name: 'Subdomains',
        desc: 'DNS brute-force + cert transparency'
    },
    {
        id: 'ports',
        icon: '📡',
        name: 'Port Scan',
        desc: 'Top 16 TCP ports'
    },
    {
        id: 'techs',
        icon: '🔬',
        name: 'Tech Stack',
        desc: 'HTTP fingerprinting'
    },
    {
        id: 'cve',
        icon: '⚠',
        name: 'CVE Mapping',
        desc: 'Match techs to known CVEs'
    },
    {
        id: 'otx',
        icon: '🛡',
        name: 'OTX Lookup',
        desc: 'AlienVault threat intel'
    }
];
function RiskBar({ score }) {
    const color = score >= 7 ? '#ff3a5c' : score >= 4 ? '#ff8c42' : '#00ffaa';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full rounded-full transition-all duration-700",
                    style: {
                        width: `${score * 10}%`,
                        background: color
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/scanner/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/scanner/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-sm font-bold",
                style: {
                    color
                },
                children: score.toFixed(1)
            }, void 0, false, {
                fileName: "[project]/src/app/scanner/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/scanner/page.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = RiskBar;
function ScannerPage() {
    _s();
    const [target, setTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [modules, setModules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
        'subdomains',
        'ports',
        'techs',
        'cve',
        'otx'
    ]));
    const [scanning, setScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    function addLog(msg) {
        setLogs((l)=>[
                ...l,
                `[${new Date().toLocaleTimeString()}] ${msg}`
            ]);
    }
    function toggleModule(id) {
        setModules((m)=>{
            const n = new Set(m);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
        });
    }
    async function runScan() {
        if (!target.trim()) return;
        setScanning(true);
        setLogs([]);
        setProgress(0);
        setResult(null);
        const domain = target.replace(/^https?:\/\//, '').split('/')[0].trim();
        addLog(`Starting scan on: ${domain}`);
        const res = {
            subdomains: [],
            ports: [],
            techs: [],
            cveMatches: [],
            otxData: null,
            whois: null,
            riskScore: 0,
            scanTime: 0
        };
        const t0 = Date.now();
        const total = modules.size;
        let done = 0;
        const step = ()=>{
            done++;
            setProgress(Math.round(done / total * 100));
        };
        // 1. OTX domain lookup (real API)
        if (modules.has('otx')) {
            addLog('Querying AlienVault OTX...');
            try {
                const r = await fetch(`/api/v1/scanner/otx?domain=${encodeURIComponent(domain)}`);
                if (r.ok) {
                    res.otxData = await r.json();
                    const pulseCount = res.otxData?.pulse_info?.count ?? 0;
                    addLog(`OTX: ${pulseCount} pulse(s) found for ${domain}`);
                }
            } catch  {
                addLog('OTX: lookup failed');
            }
            step();
        }
        // 2. Subdomains via DNS (real fetch to our API)
        if (modules.has('subdomains')) {
            addLog('Discovering subdomains via DNS...');
            try {
                const r = await fetch(`/api/v1/scanner/subdomains?domain=${encodeURIComponent(domain)}`);
                if (r.ok) {
                    const data = await r.json();
                    res.subdomains = data.found ?? [];
                    addLog(`Found ${res.subdomains.length} subdomains`);
                }
            } catch  {
                addLog('Subdomain discovery failed');
            }
            step();
        }
        // 3. Port scan (real TCP check via API)
        if (modules.has('ports')) {
            addLog('Scanning top ports...');
            try {
                const r = await fetch(`/api/v1/scanner/ports?host=${encodeURIComponent(domain)}`);
                if (r.ok) {
                    const data = await r.json();
                    res.ports = data.open ?? [];
                    addLog(`Open ports: ${res.ports.map((p)=>p.port).join(', ') || 'none detected'}`);
                }
            } catch  {
                addLog('Port scan failed');
            }
            step();
        }
        // 4. Tech detection (headers + HTML)
        if (modules.has('techs')) {
            addLog('Fingerprinting technology stack...');
            try {
                const r = await fetch(`/api/v1/scanner/techs?url=https://${encodeURIComponent(domain)}`);
                if (r.ok) {
                    const data = await r.json();
                    res.techs = data.techs ?? [];
                    addLog(`Detected: ${res.techs.map((t)=>t.name).join(', ') || 'unknown'}`);
                }
            } catch  {
                addLog('Tech detection failed');
            }
            step();
        }
        // 5. CVE matching
        if (modules.has('cve') && res.techs.length > 0) {
            addLog('Mapping technologies to CVEs via NVD...');
            try {
                const r = await fetch('/api/v1/scanner/cve-match', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        techs: res.techs
                    })
                });
                if (r.ok) {
                    const data = await r.json();
                    res.cveMatches = data.matches ?? [];
                    addLog(`CVE matches: ${res.cveMatches.length} found`);
                }
            } catch  {
                addLog('CVE mapping failed');
            }
            step();
        } else if (modules.has('cve')) {
            step();
        }
        // Compute risk score
        const portRisk = res.ports.filter((p)=>[
                21,
                23,
                3389,
                6379,
                27017
            ].includes(p.port)).length * 0.5;
        const cveRisk = res.cveMatches.length > 0 ? Math.max(...res.cveMatches.map((c)=>c.cvssScore)) : 0;
        const otxRisk = (res.otxData?.pulse_info?.count ?? 0) > 0 ? 2 : 0;
        res.riskScore = Math.min(10, portRisk + cveRisk * 0.6 + otxRisk);
        res.scanTime = (Date.now() - t0) / 1000;
        addLog(`Scan complete in ${res.scanTime.toFixed(1)}s — Risk score: ${res.riskScore.toFixed(1)}/10`);
        setResult(res);
        setScanning(false);
        setProgress(100);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-black",
                        children: [
                            "Attack Surface ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-accent",
                                children: "Scanner"
                            }, void 0, false, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 170,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scanner/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mt-1",
                        children: "Real DNS · AlienVault OTX · NVD CVE mapping · Tech fingerprinting"
                    }, void 0, false, {
                        fileName: "[project]/src/app/scanner/page.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/scanner/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[1fr_320px] gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 block mb-2",
                                        children: "Target Domain / IP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: target,
                                                onChange: (e)=>setTarget(e.target.value),
                                                onKeyDown: (e)=>e.key === 'Enter' && !scanning && runScan(),
                                                placeholder: "example.com or 192.168.1.1",
                                                className: "flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 font-mono text-[13px] text-slate-200 outline-none placeholder-slate-700 focus:border-accent/30 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: runScan,
                                                disabled: scanning || !target.trim(),
                                                className: "px-6 py-3 rounded-lg border border-accent/35 bg-accent/10 text-accent font-mono text-[12px] font-bold hover:bg-accent/20 transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap",
                                                children: scanning ? '⟳ SCANNING...' : '▶ RUN SCAN'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-5 gap-2 mt-4",
                                        children: SCAN_MODULES.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleModule(m.id),
                                                className: `p-2.5 rounded-lg border text-left transition-all duration-150
                    ${modules.has(m.id) ? 'border-accent/35 bg-accent/8' : 'border-white/[0.06] hover:border-white/[0.12]'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-base mb-1",
                                                        children: m.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 208,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `font-mono text-[10px] font-bold ${modules.has(m.id) ? 'text-accent' : 'text-slate-400'}`,
                                                        children: m.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[9px] text-slate-600",
                                                        children: m.desc
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 212,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    scanning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between font-mono text-[10px] text-slate-600 mb-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Scanning..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            progress,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 43
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1 bg-white/[0.06] rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full rounded-full transition-all duration-300",
                                                    style: {
                                                        width: `${progress}%`,
                                                        background: 'linear-gradient(90deg,#00ffaa,#00aaff)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            logs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 border-b border-white/[0.06]",
                                        style: {
                                            background: 'rgba(0,255,170,0.03)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-mono text-[10px] text-accent tracking-widest",
                                            children: "SCAN LOG"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/scanner/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 space-y-1 max-h-40 overflow-y-auto",
                                        style: {
                                            scrollbarWidth: 'thin'
                                        },
                                        children: logs.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[11px] text-slate-400",
                                                children: l
                                            }, i, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 239,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 237,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3",
                                                children: "Overall Risk Score"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskBar, {
                                                score: result.riskScore
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[10px] text-slate-600 mt-2",
                                                children: [
                                                    "Scan completed in ",
                                                    result.scanTime.toFixed(1),
                                                    "s"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this),
                                    result.otxData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                                        children: "🛡 OTX Threat Intel"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this),
                                                    result.otxData.pulse_info?.count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[9px] px-1.5 py-[1px] rounded bg-red-500/15 text-red-400 border border-red-500/25",
                                                        children: [
                                                            result.otxData.pulse_info.count,
                                                            " PULSES"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 space-y-2",
                                                children: result.otxData.pulse_info?.count === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[11px] text-slate-500",
                                                    children: "✓ No OTX threat pulses found for this domain"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-2 gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-3 rounded-lg border border-white/[0.06]",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.025)'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-[9px] text-slate-600 mb-1",
                                                                            children: "PULSE COUNT"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/scanner/page.tsx",
                                                                            lineNumber: 278,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-xl font-bold text-red-400",
                                                                            children: result.otxData.pulse_info?.count ?? 0
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/scanner/page.tsx",
                                                                            lineNumber: 279,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                                    lineNumber: 277,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-3 rounded-lg border border-white/[0.06]",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.025)'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-[9px] text-slate-600 mb-1",
                                                                            children: "INDICATOR TYPE"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/scanner/page.tsx",
                                                                            lineNumber: 282,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-sm font-bold text-slate-300",
                                                                            children: result.otxData.type_title ?? 'domain'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/scanner/page.tsx",
                                                                            lineNumber: 283,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                                    lineNumber: 281,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/scanner/page.tsx",
                                                            lineNumber: 276,
                                                            columnNumber: 25
                                                        }, this),
                                                        result.otxData.pulse_info?.pulses?.slice(0, 3).map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `https://otx.alienvault.com/pulse/${p.id}`,
                                                                target: "_blank",
                                                                rel: "noreferrer",
                                                                className: "block p-2.5 rounded-lg border border-white/[0.06] hover:border-accent/20 transition-colors",
                                                                style: {
                                                                    background: 'rgba(255,255,255,0.02)'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[12px] text-slate-300 mb-1",
                                                                        children: p.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                                        lineNumber: 291,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[9px] text-slate-600",
                                                                        children: p.tags?.slice(0, 4).join(', ')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                                        lineNumber: 292,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 27
                                                            }, this))
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 271,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    result.subdomains.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2.5 border-b border-white/[0.06]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                                    children: [
                                                        "🔍 Subdomains (",
                                                        result.subdomains.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 flex flex-wrap gap-2",
                                                children: result.subdomains.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[10px] px-2.5 py-1 rounded border border-white/[0.08] text-slate-400",
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this),
                                    result.ports.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2.5 border-b border-white/[0.06]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                                    children: [
                                                        "📡 Open Ports (",
                                                        result.ports.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divide-y divide-white/[0.03]",
                                                children: result.ports.map((p, i)=>{
                                                    const dangerous = [
                                                        21,
                                                        23,
                                                        3389,
                                                        6379,
                                                        27017
                                                    ].includes(p.port);
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 px-4 py-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[11px] font-bold text-accent2 w-12",
                                                                children: p.port
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 334,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[11px] text-slate-300 flex-1",
                                                                children: p.service
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 27
                                                            }, this),
                                                            p.banner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[10px] text-slate-600 truncate max-w-[200px]",
                                                                children: p.banner
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 40
                                                            }, this),
                                                            dangerous && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded border bg-red-500/12 text-red-400 border-red-500/20",
                                                                children: "RISKY"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 338,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this),
                                    result.techs.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2.5 border-b border-white/[0.06]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-accent uppercase tracking-widest",
                                                    children: "🔬 Technology Stack"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3 flex flex-wrap gap-2",
                                                children: result.techs.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-3 py-2 rounded-lg border border-white/[0.06]",
                                                        style: {
                                                            background: 'rgba(255,255,255,0.025)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[11px] font-bold text-slate-200",
                                                                children: t.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 25
                                                            }, this),
                                                            t.version && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] text-slate-600",
                                                                children: [
                                                                    "v",
                                                                    t.version
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 39
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] text-slate-600 mt-0.5",
                                                                children: t.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 357,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, this),
                                    result.cveMatches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass overflow-hidden",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-2.5 border-b border-white/[0.06] flex items-center gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[10px] text-red-400 uppercase tracking-widest",
                                                    children: [
                                                        "⚠ CVE Matches (",
                                                        result.cveMatches.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/scanner/page.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divide-y divide-white/[0.03]",
                                                children: result.cveMatches.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: `https://nvd.nist.gov/vuln/detail/${c.cveId}`,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        className: "flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[11px] font-bold text-accent2",
                                                                        children: c.cveId
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                                        lineNumber: 384,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-[11px] text-slate-400 truncate",
                                                                        children: c.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                                        lineNumber: 385,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[9px] text-slate-600 mt-0.5",
                                                                        children: [
                                                                            "via ",
                                                                            c.tech
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 383,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `font-mono text-[10px] font-bold px-2 py-[2px] rounded border shrink-0 ${c.cvssScore >= 9 ? 'bg-red-500/15 text-red-400 border-red-500/25' : c.cvssScore >= 7 ? 'bg-orange-500/15 text-orange-400 border-orange-500/25' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'}`,
                                                                children: c.cvssScore.toFixed(1)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                                lineNumber: 388,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 372,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scanner/page.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3",
                                        children: "Quick OSINT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 405,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            {
                                                label: 'Shodan',
                                                url: (t)=>`https://www.shodan.io/search?query=${t}`,
                                                icon: '🔭'
                                            },
                                            {
                                                label: 'VirusTotal',
                                                url: (t)=>`https://www.virustotal.com/gui/domain/${t}`,
                                                icon: '🦠'
                                            },
                                            {
                                                label: 'URLScan',
                                                url: (t)=>`https://urlscan.io/search/#domain:${t}`,
                                                icon: '🔎'
                                            },
                                            {
                                                label: 'OTX Domain',
                                                url: (t)=>`https://otx.alienvault.com/indicator/domain/${t}`,
                                                icon: '🛡'
                                            },
                                            {
                                                label: 'Censys',
                                                url: (t)=>`https://search.censys.io/hosts?q=${t}`,
                                                icon: '📊'
                                            },
                                            {
                                                label: 'DNSDumpster',
                                                url: (_t)=>`https://dnsdumpster.com`,
                                                icon: '🗺'
                                            }
                                        ].map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: target ? tool.url(target.replace(/^https?:\/\//, '').split('/')[0]) : '#',
                                                target: "_blank",
                                                rel: "noreferrer",
                                                className: "flex items-center gap-3 p-2.5 rounded-lg border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.03] transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-base",
                                                        children: tool.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono text-[11px] text-slate-300",
                                                        children: tool.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-auto font-mono text-[9px] text-slate-600",
                                                        children: "↗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/scanner/page.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, tool.label, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 415,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] text-slate-600 uppercase tracking-widest mb-3",
                                        children: "Payload Library"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            {
                                                label: 'XSS Payloads',
                                                href: '/payloads?type=xss'
                                            },
                                            {
                                                label: 'SQLi Strings',
                                                href: '/payloads?type=sqli'
                                            },
                                            {
                                                label: 'Reverse Shells',
                                                href: '/payloads?type=shells'
                                            },
                                            {
                                                label: 'LFI/RFI Paths',
                                                href: '/payloads?type=lfi'
                                            },
                                            {
                                                label: 'SSRF Bypasses',
                                                href: '/payloads?type=ssrf'
                                            }
                                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: p.href,
                                                className: "block font-mono text-[11px] text-slate-500 hover:text-accent transition-colors py-1 border-b border-white/[0.03]",
                                                children: [
                                                    "→ ",
                                                    p.label
                                                ]
                                            }, p.label, true, {
                                                fileName: "[project]/src/app/scanner/page.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/scanner/page.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/scanner/page.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/scanner/page.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/scanner/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/scanner/page.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s(ScannerPage, "vl/vOn5uTPQvob08HwThQevaoDc=");
_c1 = ScannerPage;
var _c, _c1;
__turbopack_refresh__.register(_c, "RiskBar");
__turbopack_refresh__.register(_c1, "ScannerPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/scanner/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_scanner_page_tsx_1d8ab7._.js.map