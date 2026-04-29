(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_cloud_page_tsx_c18495._.js", {

"[project]/src/app/cloud/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>CloudPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
const SEVERITY_COLOR = {
    critical: '#ff3a5c',
    high: '#fb923c',
    medium: '#facc15',
    low: '#00aaff'
};
const SERVICE_ICON = {
    // AWS
    s3: '🪣',
    ec2: '💻',
    rds: '🗄',
    iam: '🔑',
    cloudtrail: '📋',
    vpc: '🔌',
    // GCP
    storage: '🪣',
    compute: '💻',
    sql: '🗄',
    logging: '📋',
    kms: '🗝',
    // Azure
    network: '🔌',
    keyvault: '🗝',
    monitor: '📊',
    // Fallback
    azure: '🔷',
    gcp: '☁️'
};
const PROVIDER_INFO = {
    aws: {
        label: 'Amazon Web Services',
        color: '#ff9900',
        icon: '☁️'
    },
    gcp: {
        label: 'Google Cloud Platform',
        color: '#4285f4',
        icon: '🔵'
    },
    azure: {
        label: 'Microsoft Azure',
        color: '#0078d4',
        icon: '🔷'
    }
};
const AWS_REGIONS = [
    'us-east-1',
    'us-east-2',
    'us-west-1',
    'us-west-2',
    'eu-west-1',
    'eu-west-2',
    'eu-central-1',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-northeast-1'
];
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
// ── Score ring ─────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 72 }) {
    const color = score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c';
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 50 ? 'D' : 'F';
    const r = size / 2 - 6;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - score / 100);
    const mid = size / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: mid,
                cy: mid,
                r: r,
                fill: "none",
                stroke: "rgba(255,255,255,0.06)",
                strokeWidth: "6"
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: mid,
                cy: mid,
                r: r,
                fill: "none",
                stroke: color,
                strokeWidth: "6",
                strokeDasharray: circ,
                strokeDashoffset: offset,
                strokeLinecap: "round",
                transform: `rotate(-90 ${mid} ${mid})`
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: mid,
                y: mid - 4,
                textAnchor: "middle",
                fill: color,
                style: {
                    fontFamily: "'Space Mono',monospace",
                    fontSize: `${size * 0.19}px`,
                    fontWeight: 700
                },
                children: score
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: mid,
                y: mid + 10,
                textAnchor: "middle",
                fill: color + '99',
                style: {
                    fontFamily: "'Space Mono',monospace",
                    fontSize: `${size * 0.14}px`
                },
                children: grade
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/cloud/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = ScoreRing;
// ── Compliance bar ─────────────────────────────────────────────────────────────
function ComplianceBar({ label, score }) {
    const color = score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px] text-slate-500",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px]",
                        style: {
                            color
                        },
                        children: [
                            score,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 rounded-full",
                style: {
                    background: 'rgba(255,255,255,0.06)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-1 rounded-full transition-all duration-700",
                    style: {
                        width: `${score}%`,
                        background: color
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/cloud/page.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/cloud/page.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c1 = ComplianceBar;
// ── Credential forms ───────────────────────────────────────────────────────────
function AWSCredForm({ form, setForm }) {
    const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none";
    const inpStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#e2e8f0'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 mb-3",
                children: [
                    [
                        'access_key',
                        'Access Keys'
                    ],
                    [
                        'role_arn',
                        'Assume Role ✓'
                    ]
                ].map(([v, l])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setForm((f)=>({
                                    ...f,
                                    credType: v
                                })),
                        className: "px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all",
                        style: form.credType === v ? {
                            background: 'rgba(0,170,255,0.1)',
                            borderColor: 'rgba(0,170,255,0.3)',
                            color: '#00aaff'
                        } : {
                            background: 'rgba(255,255,255,0.04)',
                            borderColor: 'rgba(255,255,255,0.07)',
                            color: '#64748b'
                        },
                        children: l
                    }, v, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "font-mono text-[10px] text-slate-500 block mb-1",
                        children: "Region"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: form.region,
                        onChange: (e)=>setForm((f)=>({
                                    ...f,
                                    region: e.target.value
                                })),
                        className: inp,
                        style: inpStyle,
                        children: AWS_REGIONS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: r
                            }, r, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 115,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Access Key ID"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: form.accessKeyId,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            accessKeyId: e.target.value
                                        })),
                                placeholder: "AKIA...",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Secret Access Key"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 127,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: form.secretKey,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            secretKey: e.target.value
                                        })),
                                placeholder: "••••••••",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    form.credType === 'role_arn' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Role ARN"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.roleArn,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            roleArn: e.target.value
                                        })),
                                placeholder: "arn:aws:iam::123456789012:role/XCloakAuditRole",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[9px] text-slate-700 mt-2",
                children: [
                    "Use a read-only IAM role with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "SecurityAudit"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 143,
                        columnNumber: 39
                    }, this),
                    " + ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "ReadOnlyAccess"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 143,
                        columnNumber: 68
                    }, this),
                    " policies for least privilege. Credentials are AES-256 encrypted."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c2 = AWSCredForm;
function GCPCredForm({ form, setForm }) {
    const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none";
    const inpStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#e2e8f0'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "font-mono text-[10px] text-slate-500 block mb-1",
                        children: "Service Account Key JSON"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: form.gcpKeyJson,
                        onChange: (e)=>setForm((f)=>({
                                    ...f,
                                    gcpKeyJson: e.target.value
                                })),
                        placeholder: '{\n  "type": "service_account",\n  "project_id": "my-project",\n  "private_key_id": "...",\n  ...\n}',
                        rows: 8,
                        className: inp + " resize-y font-mono text-[10px]",
                        style: inpStyle
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[9px] text-slate-700 mt-2",
                children: [
                    "Create a Service Account with ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "Security Reviewer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 162,
                        columnNumber: 39
                    }, this),
                    " + ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "Cloud Asset Viewer"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 162,
                        columnNumber: 72
                    }, this),
                    " roles. Generate and paste the JSON key. Key is AES-256 encrypted before storage."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c3 = GCPCredForm;
function AzureCredForm({ form, setForm }) {
    const inp = "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none";
    const inpStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: '#e2e8f0'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Tenant ID"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.azureTenantId,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            azureTenantId: e.target.value
                                        })),
                                placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Client (App) ID"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.azureClientId,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            azureClientId: e.target.value
                                        })),
                                placeholder: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sm:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "font-mono text-[10px] text-slate-500 block mb-1",
                                children: "Client Secret"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: form.azureClientSecret,
                                onChange: (e)=>setForm((f)=>({
                                            ...f,
                                            azureClientSecret: e.target.value
                                        })),
                                placeholder: "••••••••",
                                className: inp,
                                style: inpStyle
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[9px] text-slate-700 mt-2",
                children: [
                    "Register an App in Azure AD, assign ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "Security Reader"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 197,
                        columnNumber: 45
                    }, this),
                    " role at subscription scope. Use the App's tenant ID, client ID, and client secret. Credentials are AES-256 encrypted."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c4 = AzureCredForm;
function CloudPage() {
    _s();
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterSev, setFilterSev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [filterService, setFilterService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [showForm, setShowForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('findings');
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        provider: 'aws',
        accountId: '',
        label: '',
        region: 'us-east-1',
        credType: 'access_key',
        accessKeyId: '',
        secretKey: '',
        roleArn: '',
        gcpKeyJson: '',
        azureTenantId: '',
        azureClientId: '',
        azureClientSecret: ''
    });
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CloudPage.useCallback[load]": async ()=>{
            setLoading(true);
            const res = await authFetch('/api/v1/cloud');
            if (res.ok) {
                let d = {};
                try {
                    d = await res.json();
                } catch  {}
                setAccounts(d.accounts ?? []);
            }
            setLoading(false);
        }
    }["CloudPage.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CloudPage.useEffect": ()=>{
            load();
        }
    }["CloudPage.useEffect"], [
        load
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CloudPage.useEffect": ()=>{
            if (!msg) return;
            const t = setTimeout({
                "CloudPage.useEffect.t": ()=>setMsg('')
            }["CloudPage.useEffect.t"], 5000);
            return ({
                "CloudPage.useEffect": ()=>clearTimeout(t)
            })["CloudPage.useEffect"];
        }
    }["CloudPage.useEffect"], [
        msg
    ]);
    const loadDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CloudPage.useCallback[loadDetail]": async (account)=>{
            setSelected(account);
            setDetail(null);
            setFilterSev('all');
            setFilterService('all');
            setActiveTab('findings');
            const res = await authFetch(`/api/v1/cloud?accountId=${account.id}`);
            if (res.ok) {
                let d = {};
                try {
                    d = await res.json();
                } catch  {}
                setDetail(d.account ?? null);
            }
        }
    }["CloudPage.useCallback[loadDetail]"], []);
    function buildCredentials() {
        const { provider, credType, accessKeyId, secretKey, roleArn, gcpKeyJson, azureTenantId, azureClientId, azureClientSecret } = form;
        if (provider === 'aws') {
            const creds = {
                type: credType,
                access_key_id: accessKeyId,
                secret_access_key: secretKey
            };
            if (credType === 'role_arn') creds.role_arn = roleArn;
            return creds;
        }
        if (provider === 'gcp') {
            try {
                const keyJson = JSON.parse(gcpKeyJson);
                return {
                    type: 'service_account_key',
                    key_json: keyJson
                };
            } catch  {
                return null;
            }
        }
        if (provider === 'azure') {
            return {
                type: 'service_principal',
                tenant_id: azureTenantId,
                client_id: azureClientId,
                client_secret: azureClientSecret
            };
        }
        return null;
    }
    async function addAccount() {
        if (!form.accountId.trim()) {
            setMsg('✗ Account ID required');
            return;
        }
        const credentials = buildCredentials();
        if (!credentials) {
            setMsg('✗ Invalid credentials — check JSON format for GCP');
            return;
        }
        // Basic validation per provider
        if (form.provider === 'aws' && (!form.accessKeyId || !form.secretKey)) {
            setMsg('✗ Access Key ID and Secret are required');
            return;
        }
        if (form.provider === 'gcp' && !form.gcpKeyJson.trim()) {
            setMsg('✗ Service Account JSON key is required');
            return;
        }
        if (form.provider === 'azure' && (!form.azureTenantId || !form.azureClientId || !form.azureClientSecret)) {
            setMsg('✗ Tenant ID, Client ID, and Client Secret are all required');
            return;
        }
        setAdding(true);
        const res = await authFetch('/api/v1/cloud', {
            method: 'POST',
            body: JSON.stringify({
                provider: form.provider,
                accountId: form.accountId.trim(),
                label: form.label.trim() || undefined,
                region: form.region,
                credentials
            })
        });
        let d = {};
        try {
            d = await res.json();
        } catch  {}
        if (res.ok) {
            setMsg('✓ Account connected — audit starting...');
            setShowForm(false);
            setForm({
                provider: 'aws',
                accountId: '',
                label: '',
                region: 'us-east-1',
                credType: 'access_key',
                accessKeyId: '',
                secretKey: '',
                roleArn: '',
                gcpKeyJson: '',
                azureTenantId: '',
                azureClientId: '',
                azureClientSecret: ''
            });
            await load();
            // Poll a couple times for the audit result
            setTimeout(load, 15000);
            setTimeout(load, 45000);
        } else {
            setMsg(`✗ ${d.error ?? 'Failed to connect account'}`);
        }
        setAdding(false);
    }
    async function removeAccount(accountId) {
        if (!confirm('Disconnect this cloud account? All findings will be deleted.')) return;
        const res = await authFetch('/api/v1/cloud', {
            method: 'DELETE',
            body: JSON.stringify({
                accountId
            })
        });
        if (res.ok) {
            setMsg('✓ Account disconnected');
            if (selected?.id === accountId) {
                setSelected(null);
                setDetail(null);
            }
            await load();
        }
    }
    async function rerunAudit(account) {
        const res = await authFetch('/api/v1/cloud', {
            method: 'POST',
            body: JSON.stringify({
                provider: account.provider,
                accountId: account.accountId,
                label: account.label,
                region: account.region ?? 'us-east-1',
                credentials: '__reuse__',
                rerun: true,
                existingId: account.id
            })
        });
        if (res.ok) {
            setMsg('✓ Re-audit started...');
            setTimeout(load, 20000);
        }
    }
    async function updateFinding(findingId, status) {
        await authFetch('/api/v1/cloud', {
            method: 'PUT',
            body: JSON.stringify({
                findingId,
                status
            })
        });
        if (selected) await loadDetail(selected);
        await load();
    }
    // ── Stats ──────────────────────────────────────────────────────────────────
    const totalFindings = accounts.reduce((a, x)=>a + (x.findings?.length ?? 0), 0);
    const totalCritical = accounts.reduce((a, x)=>a + (x.findings?.filter((f)=>f.severity === 'critical').length ?? 0), 0);
    const avgScore = accounts.length > 0 ? Math.round(accounts.reduce((a, x)=>a + (x.postureScore ?? 0), 0) / accounts.length) : null;
    // ── Detail panel ───────────────────────────────────────────────────────────
    const allFindings = detail?.findings ?? [];
    const scoreDetail = detail?.scoreDetail ?? null;
    const services = [
        ...new Set(allFindings.map((f)=>f.service))
    ];
    const filteredFind = allFindings.filter((f)=>(filterSev === 'all' || f.severity === filterSev) && (filterService === 'all' || f.service === filterService));
    const findCounts = allFindings.reduce((acc, f)=>{
        acc[f.severity] = (acc[f.severity] ?? 0) + 1;
        return acc;
    }, {});
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "🔐"
                }, void 0, false, {
                    fileName: "[project]/src/app/cloud/page.tsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono text-[12px] text-slate-500",
                    children: "Please log in to access cloud security"
                }, void 0, false, {
                    fileName: "[project]/src/app/cloud/page.tsx",
                    lineNumber: 397,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/cloud/page.tsx",
            lineNumber: 395,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/cloud/page.tsx",
        lineNumber: 394,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 max-w-6xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-6 flex-wrap gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "Cloud ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: "Security Posture"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 53
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: "Audit AWS, GCP, and Azure against CIS Benchmarks · SOC 2 · PCI-DSS"
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowForm((s)=>!s),
                        className: "px-4 py-2 rounded-xl font-mono text-[11px] font-bold cursor-pointer transition-all",
                        style: {
                            background: 'rgba(0,255,170,0.1)',
                            border: '1px solid rgba(0,255,170,0.3)',
                            color: '#00ffaa'
                        },
                        children: showForm ? '✕ Cancel' : '+ Connect Account'
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 px-4 py-2.5 rounded-lg font-mono text-[11px]",
                style: {
                    background: msg.startsWith('✓') ? 'rgba(0,255,170,0.08)' : 'rgba(255,58,92,0.08)',
                    border: msg.startsWith('✓') ? '1px solid rgba(0,255,170,0.2)' : '1px solid rgba(255,58,92,0.2)',
                    color: msg.startsWith('✓') ? '#00ffaa' : '#ff3a5c'
                },
                children: msg
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 421,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5",
                children: [
                    {
                        label: 'Accounts',
                        val: accounts.length,
                        color: '#e2e8f0'
                    },
                    {
                        label: 'Findings',
                        val: totalFindings,
                        color: totalFindings > 0 ? '#fb923c' : '#00ffaa'
                    },
                    {
                        label: 'Critical',
                        val: totalCritical,
                        color: totalCritical > 0 ? '#ff3a5c' : '#00ffaa'
                    },
                    {
                        label: 'Avg Score',
                        val: avgScore != null ? `${avgScore}` : '—',
                        color: avgScore == null ? '#64748b' : avgScore >= 80 ? '#00ffaa' : avgScore >= 60 ? '#facc15' : '#ff3a5c'
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
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                children: s.label
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.label, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 440,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this),
            showForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-xl p-5 mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4",
                        children: "Connect Cloud Account"
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 450,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 mb-4",
                        children: [
                            'aws',
                            'gcp',
                            'azure'
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setForm((f)=>({
                                            ...f,
                                            provider: p
                                        })),
                                className: "flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-[10px] cursor-pointer border transition-all",
                                style: form.provider === p ? {
                                    background: `${PROVIDER_INFO[p].color}18`,
                                    borderColor: `${PROVIDER_INFO[p].color}50`,
                                    color: PROVIDER_INFO[p].color
                                } : {
                                    background: 'rgba(255,255,255,0.04)',
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    color: '#64748b'
                                },
                                children: [
                                    PROVIDER_INFO[p].icon,
                                    " ",
                                    p.toUpperCase()
                                ]
                            }, p, true, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 453,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-[10px] text-slate-500 block mb-1",
                                        children: [
                                            form.provider === 'aws' ? 'AWS Account ID' : form.provider === 'gcp' ? 'GCP Project ID' : 'Azure Subscription ID',
                                            " *"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.accountId,
                                        onChange: (e)=>setForm((f)=>({
                                                    ...f,
                                                    accountId: e.target.value
                                                })),
                                        placeholder: form.provider === 'aws' ? '123456789012' : form.provider === 'gcp' ? 'my-project-id' : 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                                        className: "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#e2e8f0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "font-mono text-[10px] text-slate-500 block mb-1",
                                        children: "Label"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: form.label,
                                        onChange: (e)=>setForm((f)=>({
                                                    ...f,
                                                    label: e.target.value
                                                })),
                                        placeholder: "e.g. Production AWS",
                                        className: "w-full px-3 py-2 rounded-lg font-mono text-[11px] outline-none",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#e2e8f0'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 mb-4",
                        children: [
                            form.provider === 'aws' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AWSCredForm, {
                                form: form,
                                setForm: setForm
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 491,
                                columnNumber: 43
                            }, this),
                            form.provider === 'gcp' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GCPCredForm, {
                                form: form,
                                setForm: setForm
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 492,
                                columnNumber: 43
                            }, this),
                            form.provider === 'azure' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AzureCredForm, {
                                form: form,
                                setForm: setForm
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 493,
                                columnNumber: 43
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 490,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: addAccount,
                        disabled: adding,
                        className: "w-full py-3 rounded-xl font-mono text-[12px] font-bold cursor-pointer transition-all hover:opacity-90 disabled:opacity-50",
                        style: {
                            background: 'rgba(0,255,170,0.1)',
                            border: '1px solid rgba(0,255,170,0.3)',
                            color: '#00ffaa'
                        },
                        children: adding ? '⟳ Connecting...' : `☁️ Connect ${form.provider.toUpperCase()} & Audit`
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 496,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 449,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "font-mono text-[11px] text-slate-600 text-center py-8 animate-pulse",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 508,
                            columnNumber: 13
                        }, this) : accounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-xl p-10 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl mb-3",
                                    children: "☁️"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 511,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[12px] text-slate-400 mb-1",
                                    children: "No cloud accounts connected"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[10px] text-slate-600",
                                    children: "Connect AWS, GCP, or Azure to audit security posture"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 510,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: accounts.map((account)=>{
                                const findings = account.findings ?? [];
                                const criticals = findings.filter((f)=>f.severity === 'critical').length;
                                const highs = findings.filter((f)=>f.severity === 'high').length;
                                const isSelected = selected?.id === account.id;
                                const score = account.postureScore;
                                const pInfo = PROVIDER_INFO[account.provider] ?? PROVIDER_INFO.aws;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>loadDetail(account),
                                    className: "rounded-xl p-4 cursor-pointer transition-all hover:opacity-90",
                                    style: {
                                        background: isSelected ? 'rgba(0,255,170,0.04)' : 'rgba(255,255,255,0.025)',
                                        border: `1px solid ${isSelected ? 'rgba(0,255,170,0.2)' : 'rgba(255,255,255,0.07)'}`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                score != null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreRing, {
                                                    score: score,
                                                    size: 64
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 rounded-full flex items-center justify-center text-2xl",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.04)'
                                                    },
                                                    children: pInfo.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 537,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[13px] font-black text-slate-100 truncate",
                                                            children: account.label ?? account.accountId
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 543,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px]",
                                                            style: {
                                                                color: pInfo.color
                                                            },
                                                            children: [
                                                                pInfo.label.split(' ')[0],
                                                                " · ",
                                                                account.accountId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 546,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px] text-slate-600 mt-0.5",
                                                            children: account.lastAuditAt ? `Audited ${new Date(account.lastAuditAt).toLocaleString()}` : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "animate-pulse",
                                                                style: {
                                                                    color: '#ffd700'
                                                                },
                                                                children: "⟳ Auditing..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 549,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 542,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right shrink-0",
                                                    children: [
                                                        criticals > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[11px] font-bold",
                                                            style: {
                                                                color: '#ff3a5c'
                                                            },
                                                            children: [
                                                                criticals,
                                                                " critical"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 43
                                                        }, this),
                                                        highs > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px]",
                                                            style: {
                                                                color: '#fb923c'
                                                            },
                                                            children: [
                                                                highs,
                                                                " high"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 557,
                                                            columnNumber: 39
                                                        }, this),
                                                        findings.length === 0 && account.lastAuditAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px]",
                                                            style: {
                                                                color: '#00ffaa'
                                                            },
                                                            children: "✓ Clean"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 558,
                                                            columnNumber: 74
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 555,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col gap-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            removeAccount(account.id);
                                                        },
                                                        className: "shrink-0 font-mono text-[10px] px-2 py-1 rounded cursor-pointer",
                                                        style: {
                                                            color: '#ff3a5c',
                                                            background: 'rgba(255,58,92,0.08)'
                                                        },
                                                        children: "✕"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                        lineNumber: 561,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 560,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 533,
                                            columnNumber: 21
                                        }, this),
                                        findings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-1 mt-3 flex-wrap",
                                            children: Object.entries(findings.reduce((acc, f)=>{
                                                acc[f.service] = (acc[f.service] ?? 0) + 1;
                                                return acc;
                                            }, {})).map(([svc, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono text-[9px] px-1.5 py-0.5 rounded",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.06)',
                                                        color: '#64748b'
                                                    },
                                                    children: [
                                                        SERVICE_ICON[svc] ?? '☁️',
                                                        " ",
                                                        svc,
                                                        " (",
                                                        count,
                                                        ")"
                                                    ]
                                                }, svc, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 569,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, account.id, true, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 516,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 506,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: !selected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-xl p-10 text-center h-64 flex flex-col items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-4xl mb-3",
                                    children: "🛡"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 593,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[12px] text-slate-400",
                                    children: "Select an account to view findings"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 594,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 592,
                            columnNumber: 13
                        }, this) : !detail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass rounded-xl p-10 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[11px] text-slate-600 animate-pulse",
                                children: "Loading findings..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/cloud/page.tsx",
                                lineNumber: 598,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 597,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass rounded-xl p-4 flex items-center gap-4",
                                    children: [
                                        detail.postureScore != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreRing, {
                                            score: detail.postureScore,
                                            size: 80
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 604,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[13px] font-black text-slate-100",
                                                    children: detail.label ?? detail.accountId
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 606,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[10px] text-slate-600",
                                                    children: [
                                                        (PROVIDER_INFO[detail.provider] ?? PROVIDER_INFO.aws).label,
                                                        " · ",
                                                        detail.accountId,
                                                        detail.region ? ` · ${detail.region}` : ''
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 19
                                                }, this),
                                                scoreDetail?.risk_summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[10px] mt-1",
                                                    style: {
                                                        color: detail.postureScore >= 80 ? '#00ffaa' : '#fb923c'
                                                    },
                                                    children: scoreDetail.risk_summary
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 605,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 603,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2",
                                    children: [
                                        'findings',
                                        'score'
                                    ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setActiveTab(tab),
                                            className: "px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all capitalize",
                                            style: activeTab === tab ? {
                                                background: 'rgba(0,255,170,0.1)',
                                                borderColor: 'rgba(0,255,170,0.3)',
                                                color: '#00ffaa'
                                            } : {
                                                background: 'rgba(255,255,255,0.03)',
                                                borderColor: 'rgba(255,255,255,0.07)',
                                                color: '#475569'
                                            },
                                            children: tab === 'findings' ? `Findings (${allFindings.length})` : 'Score Breakdown'
                                        }, tab, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 622,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 620,
                                    columnNumber: 15
                                }, this),
                                activeTab === 'findings' && (allFindings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass rounded-xl p-8 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-2",
                                            children: "✅"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 636,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[12px] text-slate-300",
                                            children: "No open findings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 637,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[10px] text-slate-600 mt-1",
                                            children: "Account passes all security checks"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 638,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 635,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass rounded-xl p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1.5 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setFilterSev('all'),
                                                    className: "px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all",
                                                    style: filterSev === 'all' ? {
                                                        background: 'rgba(255,255,255,0.1)',
                                                        borderColor: 'rgba(255,255,255,0.2)',
                                                        color: '#e2e8f0'
                                                    } : {
                                                        background: 'rgba(255,255,255,0.03)',
                                                        borderColor: 'rgba(255,255,255,0.07)',
                                                        color: '#475569'
                                                    },
                                                    children: [
                                                        "ALL (",
                                                        allFindings.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 23
                                                }, this),
                                                [
                                                    'critical',
                                                    'high',
                                                    'medium',
                                                    'low'
                                                ].filter((s)=>findCounts[s] > 0).map((sev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setFilterSev(sev),
                                                        className: "px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all",
                                                        style: filterSev === sev ? {
                                                            background: `${SEVERITY_COLOR[sev]}20`,
                                                            borderColor: `${SEVERITY_COLOR[sev]}50`,
                                                            color: SEVERITY_COLOR[sev]
                                                        } : {
                                                            background: 'rgba(255,255,255,0.03)',
                                                            borderColor: 'rgba(255,255,255,0.07)',
                                                            color: '#475569'
                                                        },
                                                        children: [
                                                            sev.toUpperCase(),
                                                            " (",
                                                            findCounts[sev],
                                                            ")"
                                                        ]
                                                    }, sev, true, {
                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 25
                                                    }, this)),
                                                services.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: filterService,
                                                    onChange: (e)=>setFilterService(e.target.value),
                                                    className: "px-2 py-1 rounded-full font-mono text-[9px] cursor-pointer border outline-none ml-auto",
                                                    style: {
                                                        background: 'rgba(255,255,255,0.04)',
                                                        borderColor: 'rgba(255,255,255,0.08)',
                                                        color: '#64748b'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "all",
                                                            children: "All services"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 27
                                                        }, this),
                                                        services.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: s,
                                                                children: s
                                                            }, s, false, {
                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 46
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 643,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 max-h-[600px] overflow-y-auto pr-1",
                                            children: filteredFind.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 rounded-lg",
                                                    style: {
                                                        background: 'rgba(0,0,0,0.3)',
                                                        border: '1px solid rgba(255,255,255,0.05)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm shrink-0",
                                                                children: SERVICE_ICON[f.service] ?? '☁️'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                lineNumber: 676,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 flex-wrap mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                                style: {
                                                                                    background: `${SEVERITY_COLOR[f.severity] ?? '#64748b'}18`,
                                                                                    color: SEVERITY_COLOR[f.severity] ?? '#64748b',
                                                                                    border: `1px solid ${SEVERITY_COLOR[f.severity] ?? '#64748b'}30`
                                                                                },
                                                                                children: f.severity.toUpperCase()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                                lineNumber: 679,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-mono text-[10px] text-slate-600",
                                                                                children: f.service.toUpperCase()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                                lineNumber: 687,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 678,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[11px] text-slate-200 font-bold mb-0.5",
                                                                        children: f.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[10px] text-slate-500 mb-1",
                                                                        children: f.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 690,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "font-mono text-[9px] text-slate-700 truncate",
                                                                        children: f.resource
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 691,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    f.remediation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mt-2 p-2 rounded font-mono text-[10px]",
                                                                        style: {
                                                                            background: 'rgba(0,255,170,0.05)',
                                                                            borderLeft: '2px solid rgba(0,255,170,0.2)',
                                                                            color: '#00ffaa99'
                                                                        },
                                                                        children: [
                                                                            "Fix: ",
                                                                            f.remediation
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 693,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    f.compliance?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex gap-1 mt-1.5 flex-wrap",
                                                                        children: f.compliance.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                                style: {
                                                                                    background: 'rgba(0,170,255,0.1)',
                                                                                    color: '#00aaff66'
                                                                                },
                                                                                children: c
                                                                            }, c, false, {
                                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                                lineNumber: 701,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-col gap-1 shrink-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>updateFinding(f.id, 'resolved'),
                                                                        className: "px-2 py-1 rounded font-mono text-[9px] cursor-pointer border transition-all",
                                                                        style: {
                                                                            borderColor: 'rgba(0,255,170,0.2)',
                                                                            color: '#00ffaa',
                                                                            background: 'rgba(0,255,170,0.06)'
                                                                        },
                                                                        children: "✓ Fixed"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 708,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>updateFinding(f.id, 'suppressed'),
                                                                        className: "px-2 py-1 rounded font-mono text-[9px] cursor-pointer border transition-all",
                                                                        style: {
                                                                            borderColor: 'rgba(255,255,255,0.08)',
                                                                            color: '#64748b',
                                                                            background: 'rgba(255,255,255,0.03)'
                                                                        },
                                                                        children: "Suppress"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                                        lineNumber: 713,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                lineNumber: 707,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/cloud/page.tsx",
                                                        lineNumber: 675,
                                                        columnNumber: 27
                                                    }, this)
                                                }, f.id, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 671,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 641,
                                    columnNumber: 19
                                }, this)),
                                activeTab === 'score' && scoreDetail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        Object.keys(scoreDetail.by_service ?? {}).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass rounded-xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                                    children: "Score by Service"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: Object.entries(scoreDetail.by_service).sort(([, a], [, b])=>a - b).map(([svc, score])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm w-5",
                                                                    children: SERVICE_ICON[svc] ?? '☁️'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex justify-between mb-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-mono text-[10px] text-slate-400 capitalize",
                                                                                    children: svc
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                                    lineNumber: 742,
                                                                                    columnNumber: 35
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-mono text-[10px]",
                                                                                    style: {
                                                                                        color: score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : '#ff3a5c'
                                                                                    },
                                                                                    children: score
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                                    lineNumber: 743,
                                                                                    columnNumber: 35
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                                            lineNumber: 741,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "h-1.5 rounded-full",
                                                                            style: {
                                                                                background: 'rgba(255,255,255,0.06)'
                                                                            },
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "h-1.5 rounded-full transition-all duration-700",
                                                                                style: {
                                                                                    width: `${score}%`,
                                                                                    background: score >= 80 ? '#00ffaa' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#ff3a5c'
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/cloud/page.tsx",
                                                                                lineNumber: 749,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                                            lineNumber: 748,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                    lineNumber: 740,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, svc, true, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 738,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 732,
                                            columnNumber: 21
                                        }, this),
                                        Object.keys(scoreDetail.compliance ?? {}).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass rounded-xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                                    children: "Compliance Coverage"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 765,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: Object.entries(scoreDetail.compliance).map(([fw, pct])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ComplianceBar, {
                                                            label: fw,
                                                            score: pct
                                                        }, fw, false, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 766,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-mono text-[9px] text-slate-700 mt-3",
                                                    children: "Coverage = % of framework controls with no open findings mapped to them."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 764,
                                            columnNumber: 21
                                        }, this),
                                        (scoreDetail.top_issues ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "glass rounded-xl p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3",
                                                    children: "Top Issues to Fix"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 780,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: scoreDetail.top_issues.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-2 p-2 rounded-lg",
                                                            style: {
                                                                background: 'rgba(0,0,0,0.2)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[10px] font-bold shrink-0",
                                                                    style: {
                                                                        color: SEVERITY_COLOR[f.severity] ?? '#64748b'
                                                                    },
                                                                    children: [
                                                                        i + 1,
                                                                        "."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                    lineNumber: 785,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-[10px] text-slate-300",
                                                                            children: f.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                                            lineNumber: 790,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono text-[9px] text-slate-600",
                                                                            children: [
                                                                                f.service,
                                                                                " · ",
                                                                                f.severity
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                                            lineNumber: 791,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                                    lineNumber: 789,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, i, true, {
                                                            fileName: "[project]/src/app/cloud/page.tsx",
                                                            lineNumber: 783,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/cloud/page.tsx",
                                                    lineNumber: 781,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/cloud/page.tsx",
                                            lineNumber: 779,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 729,
                                    columnNumber: 17
                                }, this),
                                activeTab === 'score' && !scoreDetail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "glass rounded-xl p-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[11px] text-slate-600",
                                        children: "Score breakdown will appear after the first audit completes."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/cloud/page.tsx",
                                        lineNumber: 803,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/cloud/page.tsx",
                                    lineNumber: 802,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/cloud/page.tsx",
                            lineNumber: 601,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/cloud/page.tsx",
                        lineNumber: 590,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/cloud/page.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/cloud/page.tsx",
        lineNumber: 403,
        columnNumber: 5
    }, this);
}
_s(CloudPage, "pejmbxCsK4NAdk3pSE4RWtvlLgY=");
_c5 = CloudPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_refresh__.register(_c, "ScoreRing");
__turbopack_refresh__.register(_c1, "ComplianceBar");
__turbopack_refresh__.register(_c2, "AWSCredForm");
__turbopack_refresh__.register(_c3, "GCPCredForm");
__turbopack_refresh__.register(_c4, "AzureCredForm");
__turbopack_refresh__.register(_c5, "CloudPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/cloud/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_cloud_page_tsx_c18495._.js.map