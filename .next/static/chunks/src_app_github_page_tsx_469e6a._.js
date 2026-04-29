(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_app_github_page_tsx_469e6a._.js", {

"[project]/src/app/github/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>GitHubPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
'use client';
;
;
const SEVERITY_COLOR = {
    critical: '#ff3a5c',
    high: '#fb923c',
    medium: '#facc15',
    low: '#00aaff',
    info: '#64748b'
};
const STATUS_COLOR = {
    completed: '#00ffaa',
    running: '#00aaff',
    queued: '#ffd700',
    failed: '#ff3a5c'
};
const PAGE_SIZE = 15;
const GH_CLIENT_ID = ("TURBOPACK compile-time value", "Ov23livVZRgZLIEGgdvq") ?? '';
const APP_URL = ("TURBOPACK compile-time value", "http://localhost:3000") ?? 'https://xcloak.tech';
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
function sortRepos(repos) {
    return [
        ...repos
    ].sort((a, b)=>{
        const score = (r)=>{
            if (r.latestScan?.status === 'completed' && (r.latestScan?.findings ?? 0) > 0) return 0;
            if (r.latestScan?.status === 'completed') return 1;
            if (r.latestScan?.status === 'running' || r.latestScan?.status === 'queued') return 2;
            if (r.latestScan?.status === 'failed') return 3;
            return 4;
        };
        const diff = score(a) - score(b);
        if (diff !== 0) return diff;
        return (b.latestScan?.findings ?? 0) - (a.latestScan?.findings ?? 0);
    });
}
function GitHubPage() {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [scanning, setScanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUser"])();
    const load = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GitHubPage.useCallback[load]": async ()=>{
            setLoading(true);
            const res = await authFetch('/api/v1/github/repos');
            if (res.ok) setData(await res.json());
            setLoading(false);
        }
    }["GitHubPage.useCallback[load]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GitHubPage.useEffect": ()=>{
            load();
            const params = new URLSearchParams(window.location.search);
            if (params.get('connected') === '1') {
                setMsg('✓ GitHub connected successfully!');
            } else if (params.get('error') === 'github_account_already_linked') {
                const ghUser = params.get('github_user') ?? 'your GitHub account';
                setMsg(`✗ @${ghUser} is already linked to a different XCloak account.`);
            } else if (params.get('error')) {
                setMsg(`✗ ${params.get('error')?.replaceAll('_', ' ')}`);
            }
            window.history.replaceState({}, '', '/github');
        }
    }["GitHubPage.useEffect"], [
        load
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GitHubPage.useEffect": ()=>{
            if (!msg) return;
            const t = setTimeout({
                "GitHubPage.useEffect.t": ()=>setMsg('')
            }["GitHubPage.useEffect.t"], 5000);
            return ({
                "GitHubPage.useEffect": ()=>clearTimeout(t)
            })["GitHubPage.useEffect"];
        }
    }["GitHubPage.useEffect"], [
        msg
    ]);
    function startOAuth() {
        if (!user?.username) {
            setMsg('✗ Please log in first');
            return;
        }
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const scope = 'repo,read:user,write:repo_hook';
        const state = user.username;
        const redirect = encodeURIComponent(`${APP_URL}/api/v1/github/callback`);
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&scope=${scope}&state=${state}&redirect_uri=${redirect}`;
    }
    async function toggleRepo(repoId, enable) {
        setScanning(repoId);
        const res = await authFetch('/api/v1/github/repos', {
            method: 'POST',
            body: JSON.stringify({
                action: enable ? 'enable' : 'disable',
                repoId
            })
        });
        const d = await res.json();
        setMsg(d.message ?? (res.ok ? '✓ Done' : '✗ Failed'));
        await load();
        setScanning(null);
    }
    async function syncRepos() {
        const res = await authFetch('/api/v1/github/repos', {
            method: 'POST',
            body: JSON.stringify({
                action: 'sync'
            })
        });
        const d = await res.json();
        setMsg(d.message ?? '✓ Synced');
        await load();
    }
    async function triggerManualScan(repoId, fullName) {
        setScanning(repoId);
        const res = await authFetch('/api/v1/github/repos', {
            method: 'POST',
            body: JSON.stringify({
                action: 'manual_scan',
                repoId
            })
        });
        const d = await res.json();
        setMsg(d.message ?? (res.ok ? `✓ Scan queued for ${fullName}` : '✗ Failed'));
        setTimeout(load, 2000);
        setScanning(null);
    }
    async function disconnect() {
        if (!confirm('Disconnect GitHub? This will remove all webhooks and scan history.')) return;
        const res = await authFetch('/api/v1/github/repos', {
            method: 'DELETE'
        });
        const d = await res.json();
        setMsg(d.message ?? '✓ Disconnected');
        setData(null);
        await load();
    }
    const allRepos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GitHubPage.useMemo[allRepos]": ()=>{
            if (!data?.repos) return [];
            const sorted = sortRepos(data.repos);
            if (!search.trim()) return sorted;
            const q = search.toLowerCase();
            return sorted.filter({
                "GitHubPage.useMemo[allRepos]": (r)=>r.fullName.toLowerCase().includes(q) || (r.language ?? '').toLowerCase().includes(q)
            }["GitHubPage.useMemo[allRepos]"]);
        }
    }["GitHubPage.useMemo[allRepos]"], [
        data?.repos,
        search
    ]);
    const totalPages = Math.ceil(allRepos.length / PAGE_SIZE);
    const pageRepos = allRepos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GitHubPage.useEffect": ()=>{
            setPage(1);
        }
    }["GitHubPage.useEffect"], [
        search
    ]);
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 flex items-center justify-center h-64",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-4xl mb-3",
                    children: "🔐"
                }, void 0, false, {
                    fileName: "[project]/src/app/github/page.tsx",
                    lineNumber: 164,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-mono text-[12px] text-slate-500",
                    children: "Please log in to connect GitHub"
                }, void 0, false, {
                    fileName: "[project]/src/app/github/page.tsx",
                    lineNumber: 165,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/github/page.tsx",
            lineNumber: 163,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/github/page.tsx",
        lineNumber: 162,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 sm:p-5 max-w-5xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3 mb-6 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-black",
                                children: [
                                    "GitHub ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00ffaa'
                                        },
                                        children: "Integration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 54
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-slate-500 mt-1",
                                children: "Auto-scan repos on every push and PR — powered by Semgrep + Trufflehog"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    data?.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: syncRepos,
                                className: "px-3 py-2 rounded-lg font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80",
                                style: {
                                    background: 'rgba(255,255,255,0.04)',
                                    borderColor: 'rgba(255,255,255,0.08)',
                                    color: '#64748b'
                                },
                                children: "⟳ Sync Repos"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: disconnect,
                                className: "px-3 py-2 rounded-lg font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80",
                                style: {
                                    background: 'rgba(255,58,92,0.08)',
                                    borderColor: 'rgba(255,58,92,0.2)',
                                    color: '#ff3a5c'
                                },
                                children: "Disconnect"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 173,
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
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this),
            !loading && !data?.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass rounded-2xl p-10 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-5xl mb-4",
                        children: "🐙"
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-black text-slate-100 mb-2",
                        children: "Connect your GitHub"
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[11px] text-slate-500 mb-6 max-w-md mx-auto",
                        children: "Link your GitHub account to automatically scan repos for vulnerabilities on every push and pull request. Powered by Semgrep (200+ rules) and Trufflehog (secret detection)."
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left max-w-xl mx-auto",
                        children: [
                            {
                                icon: '🔍',
                                title: 'SAST Scanning',
                                desc: 'Semgrep finds SQLi, XSS, path traversal across 20+ languages'
                            },
                            {
                                icon: '🔑',
                                title: 'Secret Detection',
                                desc: 'Trufflehog finds API keys, tokens, passwords in code + git history'
                            },
                            {
                                icon: '📦',
                                title: 'Dependency Audit',
                                desc: 'npm audit + pip safety check for vulnerable dependencies'
                            }
                        ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-xl",
                                style: {
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl mb-1",
                                        children: f.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[11px] font-bold text-slate-200 mb-1",
                                        children: f.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-600",
                                        children: f.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, f.title, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: startOAuth,
                        className: "px-8 py-3 rounded-xl font-mono text-[13px] font-bold cursor-pointer transition-all hover:opacity-90",
                        style: {
                            background: 'rgba(0,255,170,0.12)',
                            border: '1px solid rgba(0,255,170,0.35)',
                            color: '#00ffaa'
                        },
                        children: "🐙 Connect GitHub →"
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[10px] text-slate-700 mt-3",
                        children: "We only request repo read access and webhook write access. We never push code."
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 210,
                columnNumber: 9
            }, this),
            !loading && data?.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "glass p-4 rounded-xl mb-5 flex items-center gap-3",
                        children: [
                            data.avatarUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: data.avatarUrl,
                                alt: data.githubLogin,
                                className: "w-10 h-10 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 248,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[13px] font-bold text-slate-100",
                                        children: [
                                            "@",
                                            data.githubLogin
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-600",
                                        children: [
                                            "Connected ",
                                            new Date(data.installedAt).toLocaleDateString(),
                                            " · ",
                                            data.repos.length,
                                            " repos · ",
                                            data.repos.filter((r)=>r.scanEnabled).length,
                                            " scanning"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-auto flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-2 h-2 rounded-full",
                                        style: {
                                            background: '#00ffaa'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-slate-500",
                                        children: "Active"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 246,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5",
                        children: [
                            {
                                label: 'Repos',
                                val: data.repos.length,
                                color: '#e2e8f0'
                            },
                            {
                                label: 'Scanning',
                                val: data.repos.filter((r)=>r.scanEnabled).length,
                                color: '#00ffaa'
                            },
                            {
                                label: 'Scanned',
                                val: data.repos.filter((r)=>r.latestScan?.status === 'completed').length,
                                color: '#00aaff'
                            },
                            {
                                label: 'Findings',
                                val: data.repos.reduce((a, r)=>a + (r.latestScan?.findings ?? 0), 0),
                                color: '#fb923c'
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
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mt-0.5",
                                        children: s.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, s.label, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 271,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mb-3 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600",
                                children: "Repositories"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-auto flex items-center gap-2",
                                children: [
                                    search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[10px] text-slate-600",
                                        children: [
                                            allRepos.length,
                                            " result",
                                            allRepos.length !== 1 ? 's' : ''
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 285,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search repos...",
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        className: "px-3 py-1.5 rounded-lg font-mono text-[11px] outline-none transition-colors",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#e2e8f0',
                                            width: '180px'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 mb-4",
                        children: [
                            allRepos.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass p-8 text-center font-mono text-[11px] text-slate-600",
                                children: search ? 'No repos match your search.' : 'No repos found. Click "Sync Repos" to refresh.'
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 308,
                                columnNumber: 15
                            }, this),
                            pageRepos.map((repo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl overflow-hidden",
                                    style: {
                                        background: 'rgba(255,255,255,0.025)',
                                        border: '1px solid rgba(255,255,255,0.07)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 flex items-center gap-3 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 flex-wrap mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `https://github.com/${repo.fullName}`,
                                                                    target: "_blank",
                                                                    rel: "noreferrer",
                                                                    className: "font-mono text-[13px] font-bold text-slate-100 hover:text-accent transition-colors",
                                                                    children: repo.fullName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 319,
                                                                    columnNumber: 23
                                                                }, this),
                                                                repo.private && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.06)',
                                                                        color: '#64748b'
                                                                    },
                                                                    children: "private"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 25
                                                                }, this),
                                                                repo.language && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                    style: {
                                                                        background: 'rgba(0,170,255,0.1)',
                                                                        color: '#00aaff',
                                                                        border: '1px solid rgba(0,170,255,0.2)'
                                                                    },
                                                                    children: repo.language
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[10px] text-slate-600",
                                                            children: [
                                                                repo.lastScannedAt ? `Last scanned ${new Date(repo.lastScannedAt).toLocaleString()}` : 'Never scanned',
                                                                repo.latestScan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-2",
                                                                    style: {
                                                                        color: STATUS_COLOR[repo.latestScan.status] ?? '#64748b'
                                                                    },
                                                                    children: [
                                                                        "· ",
                                                                        repo.latestScan.status
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 341,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 336,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/github/page.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 19
                                                }, this),
                                                (repo.latestScan?.findings ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center px-3 py-1.5 rounded-lg",
                                                    style: {
                                                        background: 'rgba(255,58,92,0.1)',
                                                        border: '1px solid rgba(255,58,92,0.2)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[14px] font-black",
                                                            style: {
                                                                color: '#ff3a5c'
                                                            },
                                                            children: repo.latestScan.findings
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "font-mono text-[8px] text-slate-600 uppercase",
                                                            children: "findings"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/github/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 21
                                                }, this),
                                                repo.latestScan?.findings === 0 && repo.latestScan?.status === 'completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "font-mono text-[10px]",
                                                    style: {
                                                        color: '#00ffaa'
                                                    },
                                                    children: "✓ Clean"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/github/page.tsx",
                                                    lineNumber: 358,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>toggleRepo(repo.id, !repo.scanEnabled),
                                                            disabled: scanning === repo.id,
                                                            className: "px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold cursor-pointer transition-all hover:opacity-80 disabled:opacity-50",
                                                            style: repo.scanEnabled ? {
                                                                background: 'rgba(0,255,170,0.08)',
                                                                border: '1px solid rgba(0,255,170,0.2)',
                                                                color: '#00ffaa'
                                                            } : {
                                                                background: 'rgba(255,255,255,0.04)',
                                                                border: '1px solid rgba(255,255,255,0.08)',
                                                                color: '#64748b'
                                                            },
                                                            children: scanning === repo.id ? '⟳' : repo.scanEnabled ? '● Scanning' : '○ Enable'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 21
                                                        }, this),
                                                        repo.scanEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>triggerManualScan(repo.id, repo.fullName),
                                                            disabled: scanning === repo.id,
                                                            className: "px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-50",
                                                            style: {
                                                                background: 'rgba(0,170,255,0.08)',
                                                                borderColor: 'rgba(0,170,255,0.2)',
                                                                color: '#00aaff'
                                                            },
                                                            children: "⚡ Scan now"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 23
                                                        }, this),
                                                        repo.latestScan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setExpanded(expanded === repo.id ? null : repo.id),
                                                            className: "px-3 py-1.5 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80",
                                                            style: {
                                                                background: 'rgba(255,255,255,0.04)',
                                                                borderColor: 'rgba(255,255,255,0.08)',
                                                                color: '#475569'
                                                            },
                                                            children: expanded === repo.id ? 'Hide ▲' : 'Details ▼'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/github/page.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/github/page.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/github/page.tsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, this),
                                        expanded === repo.id && repo.latestScan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                borderTop: '1px solid rgba(255,255,255,0.06)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RepoScanDetails, {
                                                scanId: repo.latestScan.id
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/github/page.tsx",
                                                lineNumber: 393,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/github/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, repo.id, true, {
                                    fileName: "[project]/src/app/github/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this),
                    totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mt-2 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-slate-600",
                                children: [
                                    "Showing ",
                                    (page - 1) * PAGE_SIZE + 1,
                                    "–",
                                    Math.min(page * PAGE_SIZE, allRepos.length),
                                    " of ",
                                    allRepos.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 403,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.max(1, p - 1)),
                                        disabled: page === 1,
                                        className: "px-2.5 py-1 rounded font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-30",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            color: '#64748b'
                                        },
                                        children: "←"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 17
                                    }, this),
                                    Array.from({
                                        length: totalPages
                                    }, (_, i)=>i + 1).filter((n)=>n === 1 || n === totalPages || Math.abs(n - page) <= 2).reduce((acc, n, i, arr)=>{
                                        if (i > 0 && n - arr[i - 1] > 1) acc.push(`ellipsis-${n}`);
                                        acc.push(n);
                                        return acc;
                                    }, []).map((n)=>typeof n === 'string' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-1 font-mono text-[11px] text-slate-600",
                                            children: "…"
                                        }, n, false, {
                                            fileName: "[project]/src/app/github/page.tsx",
                                            lineNumber: 423,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setPage(n),
                                            className: "w-7 h-7 rounded font-mono text-[11px] cursor-pointer border transition-all",
                                            style: page === n ? {
                                                background: 'rgba(0,255,170,0.12)',
                                                borderColor: 'rgba(0,255,170,0.3)',
                                                color: '#00ffaa'
                                            } : {
                                                background: 'rgba(255,255,255,0.04)',
                                                borderColor: 'rgba(255,255,255,0.08)',
                                                color: '#64748b'
                                            },
                                            children: n
                                        }, n, false, {
                                            fileName: "[project]/src/app/github/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 25
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setPage((p)=>Math.min(totalPages, p + 1)),
                                        disabled: page === totalPages,
                                        className: "px-2.5 py-1 rounded font-mono text-[11px] cursor-pointer border transition-all hover:opacity-80 disabled:opacity-30",
                                        style: {
                                            background: 'rgba(255,255,255,0.04)',
                                            borderColor: 'rgba(255,255,255,0.08)',
                                            color: '#64748b'
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 434,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 406,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 402,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 glass p-5 rounded-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-4",
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
                                children: [
                                    {
                                        step: '01',
                                        text: 'Enable scanning on a repo → XCloak registers a GitHub webhook'
                                    },
                                    {
                                        step: '02',
                                        text: 'You push code or open a PR → GitHub sends event to XCloak'
                                    },
                                    {
                                        step: '03',
                                        text: 'ESO clones the repo, runs Semgrep + Trufflehog in parallel'
                                    },
                                    {
                                        step: '04',
                                        text: 'Findings posted as PR review comments + stored in your dashboard'
                                    }
                                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] font-bold shrink-0 mt-0.5",
                                                style: {
                                                    color: '#00ffaa'
                                                },
                                                children: s.step
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/github/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[10px] text-slate-500 leading-relaxed",
                                                children: s.text
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/github/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, s.step, true, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 455,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 446,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-6 h-6 border-2 rounded-full animate-spin",
                    style: {
                        borderColor: '#00ffaa',
                        borderTopColor: 'transparent'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/app/github/page.tsx",
                    lineNumber: 467,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 466,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/github/page.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_s(GitHubPage, "xrdR4RxB0hvPG9HaFEuWFymkbvg=");
_c = GitHubPage;
// ── Scan details with scrollable findings + severity filter ───────────────────
function RepoScanDetails({ scanId }) {
    _s1();
    const [scan, setScan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [filterSev, setFilterSev] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RepoScanDetails.useEffect": ()=>{
            authFetch(`/api/v1/github/repos?scanId=${scanId}`).then({
                "RepoScanDetails.useEffect": (r)=>r.ok ? r.json() : null
            }["RepoScanDetails.useEffect"]).then({
                "RepoScanDetails.useEffect": (d)=>{
                    if (d?.scan) setScan(d.scan);
                }
            }["RepoScanDetails.useEffect"]).catch({
                "RepoScanDetails.useEffect": ()=>null
            }["RepoScanDetails.useEffect"]);
        }
    }["RepoScanDetails.useEffect"], [
        scanId
    ]);
    if (!scan) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 py-3 font-mono text-[10px] text-slate-600 animate-pulse",
        children: "Loading scan details..."
    }, void 0, false, {
        fileName: "[project]/src/app/github/page.tsx",
        lineNumber: 489,
        columnNumber: 5
    }, this);
    const allFindings = scan.result?.findings ?? [];
    const filtered = filterSev === 'all' ? allFindings : allFindings.filter((f)=>f.severity === filterSev);
    const displayed = showAll ? filtered : filtered.slice(0, 20);
    const counts = allFindings.reduce((acc, f)=>{
        acc[f.severity] = (acc[f.severity] ?? 0) + 1;
        return acc;
    }, {});
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-4 mb-4 font-mono text-[10px] text-slate-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Commit: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: scan.commitSha?.slice(0, 8) ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 507,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 507,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Branch: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: scan.branch ?? '—'
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 508,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 508,
                        columnNumber: 9
                    }, this),
                    scan.prNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "PR: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    "#",
                                    scan.prNumber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 509,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 509,
                        columnNumber: 27
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Duration: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: scan.startedAt && scan.completedAt ? `${((new Date(scan.completedAt).getTime() - new Date(scan.startedAt).getTime()) / 1000).toFixed(0)}s` : '—'
                            }, void 0, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 510,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Total: ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-300",
                                children: [
                                    allFindings.length,
                                    " findings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 515,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 515,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 506,
                columnNumber: 7
            }, this),
            allFindings.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-[11px] py-2",
                style: {
                    color: scan.status === 'completed' ? '#00ffaa' : '#64748b'
                },
                children: scan.status === 'completed' ? '✓ No findings — clean scan' : `Status: ${scan.status}`
            }, void 0, false, {
                fileName: "[project]/src/app/github/page.tsx",
                lineNumber: 519,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5 mb-3",
                        children: [
                            [
                                'all',
                                `ALL (${allFindings.length})`
                            ],
                            ...[
                                'critical',
                                'high',
                                'medium',
                                'low',
                                'info'
                            ].filter((s)=>counts[s] > 0).map((s)=>[
                                    s,
                                    `${s.toUpperCase()} (${counts[s]})`
                                ])
                        ].map(([sev, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFilterSev(sev),
                                className: "px-2.5 py-1 rounded-full font-mono text-[9px] cursor-pointer border transition-all",
                                style: filterSev === sev ? sev === 'all' ? {
                                    background: 'rgba(255,255,255,0.1)',
                                    borderColor: 'rgba(255,255,255,0.2)',
                                    color: '#e2e8f0'
                                } : {
                                    background: `${SEVERITY_COLOR[sev]}20`,
                                    borderColor: `${SEVERITY_COLOR[sev]}50`,
                                    color: SEVERITY_COLOR[sev]
                                } : {
                                    background: 'rgba(255,255,255,0.03)',
                                    borderColor: 'rgba(255,255,255,0.07)',
                                    color: '#475569'
                                },
                                children: label
                            }, sev, false, {
                                fileName: "[project]/src/app/github/page.tsx",
                                lineNumber: 531,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 526,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxHeight: showAll ? 'none' : '480px',
                            overflowY: showAll ? 'visible' : 'auto'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5",
                            children: displayed.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 rounded-lg",
                                    style: {
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono text-[9px] px-1.5 py-[1px] rounded shrink-0 mt-0.5",
                                                style: {
                                                    background: `${SEVERITY_COLOR[f.severity] ?? '#64748b'}18`,
                                                    color: SEVERITY_COLOR[f.severity] ?? '#64748b',
                                                    border: `1px solid ${SEVERITY_COLOR[f.severity] ?? '#64748b'}30`
                                                },
                                                children: (f.severity ?? 'info').toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/github/page.tsx",
                                                lineNumber: 554,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[11px] text-slate-200 font-bold",
                                                                children: f.rule_id ?? f.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/github/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 25
                                                            }, this),
                                                            f.tool && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono text-[9px] text-slate-600",
                                                                children: [
                                                                    "[",
                                                                    f.tool,
                                                                    "]"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/github/page.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 36
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/github/page.tsx",
                                                        lineNumber: 563,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[10px] text-slate-500 mt-0.5",
                                                        children: [
                                                            f.file,
                                                            f.line ? `:${f.line}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/github/page.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 23
                                                    }, this),
                                                    f.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[10px] text-slate-500 mt-1 leading-relaxed",
                                                        children: f.message
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/github/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 25
                                                    }, this),
                                                    f.fix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-mono text-[10px] mt-1.5 px-2 py-1.5 rounded",
                                                        style: {
                                                            background: 'rgba(0,255,170,0.05)',
                                                            color: '#00ffaa99',
                                                            borderLeft: '2px solid rgba(0,255,170,0.2)'
                                                        },
                                                        children: [
                                                            "Fix: ",
                                                            f.fix
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/github/page.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 25
                                                    }, this),
                                                    (f.cwe?.length > 0 || f.owasp?.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2 mt-1.5 flex-wrap",
                                                        children: [
                                                            f.cwe?.slice(0, 2).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                    style: {
                                                                        background: 'rgba(251,146,60,0.1)',
                                                                        color: '#fb923c99'
                                                                    },
                                                                    children: c
                                                                }, c, false, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 582,
                                                                    columnNumber: 29
                                                                }, this)),
                                                            f.owasp?.slice(0, 2).map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-[9px] px-1.5 py-[1px] rounded",
                                                                    style: {
                                                                        background: 'rgba(0,170,255,0.1)',
                                                                        color: '#00aaff99'
                                                                    },
                                                                    children: o
                                                                }, o, false, {
                                                                    fileName: "[project]/src/app/github/page.tsx",
                                                                    lineNumber: 586,
                                                                    columnNumber: 29
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/github/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/github/page.tsx",
                                                lineNumber: 562,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/github/page.tsx",
                                        lineNumber: 553,
                                        columnNumber: 19
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/src/app/github/page.tsx",
                                    lineNumber: 551,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/github/page.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 545,
                        columnNumber: 11
                    }, this),
                    filtered.length > 20 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAll((s)=>!s),
                        className: "mt-3 w-full py-2 rounded-lg font-mono text-[10px] cursor-pointer border transition-all hover:opacity-80",
                        style: {
                            background: 'rgba(255,255,255,0.03)',
                            borderColor: 'rgba(255,255,255,0.07)',
                            color: '#475569'
                        },
                        children: showAll ? `▲ Show fewer` : `▼ Show all ${filtered.length} findings`
                    }, void 0, false, {
                        fileName: "[project]/src/app/github/page.tsx",
                        lineNumber: 599,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/github/page.tsx",
        lineNumber: 504,
        columnNumber: 5
    }, this);
}
_s1(RepoScanDetails, "Kptws8OESlXHK4FR/HHr2aAxDsI=");
_c1 = RepoScanDetails;
var _c, _c1;
__turbopack_refresh__.register(_c, "GitHubPage");
__turbopack_refresh__.register(_c1, "RepoScanDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/github/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_app_github_page_tsx_469e6a._.js.map