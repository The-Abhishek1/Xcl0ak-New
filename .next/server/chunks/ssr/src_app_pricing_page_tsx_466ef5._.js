module.exports = {

"[project]/src/app/pricing/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>PricingPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/eso-auth.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const TIERS = [
    {
        name: 'Free',
        tier: 'free',
        price: '₹0',
        period: 'forever',
        color: '#64748b',
        border: 'rgba(100,116,139,0.25)',
        bg: 'rgba(100,116,139,0.04)',
        cta: 'Get Started',
        ctaHref: '/register',
        features: [
            '3 scans / day',
            '1 concurrent scan',
            'nmap only',
            'Basic scan history',
            'Community (CVE, exploits, CTF)',
            'Text scan reports'
        ],
        missing: [
            'AI analysis',
            'Task proposals',
            'PDF reports',
            'Scheduled scans',
            'API access',
            'All 7 tools'
        ]
    },
    {
        name: 'Pro',
        tier: 'pro',
        price: '₹999',
        period: '/month',
        color: '#00aaff',
        border: 'rgba(0,170,255,0.35)',
        bg: 'rgba(0,170,255,0.05)',
        badge: 'POPULAR',
        cta: 'Upgrade to Pro',
        ctaHref: null,
        features: [
            '20 scans / day',
            '2 concurrent scans',
            '5 tools (nmap, nuclei, whatweb, nikto, gobuster)',
            'AI analysis & false positive removal',
            'AI task proposals',
            'PDF pentest reports',
            'Scheduled scans',
            'API key access',
            'Attack surface dashboard'
        ],
        missing: [
            'Teams & RBAC',
            'sqlmap & ffuf'
        ]
    },
    {
        name: 'Enterprise',
        tier: 'enterprise',
        price: '₹4,999',
        period: '/month',
        color: '#a78bfa',
        border: 'rgba(167,139,250,0.35)',
        bg: 'rgba(167,139,250,0.05)',
        cta: 'Upgrade to Enterprise',
        ctaHref: null,
        features: [
            '100 scans / day',
            '5 concurrent scans',
            'All 7 tools (incl. sqlmap, ffuf)',
            'AI analysis & proposals',
            'PDF reports',
            'Scheduled scans',
            'Teams & RBAC',
            'API key access',
            'Attack surface dashboard',
            'Priority scan queue',
            'Compliance reports (SOC2, ISO27001)',
            'Dedicated support'
        ],
        missing: []
    }
];
const TIER_RANK = {
    free: 0,
    pro: 1,
    enterprise: 2,
    admin: 3
};
function loadRazorpay() {
    return new Promise((resolve)=>{
        if (window.Razorpay) {
            resolve(true);
            return;
        }
        const s = document.createElement('script');
        s.src = 'https://checkout.razorpay.com/v1/checkout.js';
        s.onload = ()=>resolve(true);
        s.onerror = ()=>resolve(false);
        document.body.appendChild(s);
    });
}
function PricingPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [loggedIn, setLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userTier, setUserTier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('free');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleUpgrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tier)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLoggedIn"])()) {
            router.push('/login?from=pricing');
            return;
        }
        setLoading(tier);
        setMsg(null);
        try {
            const ready = await loadRazorpay();
            if (!ready) throw new Error('Failed to load payment gateway. Check your internet.');
            const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
            const orderRes = await fetch('/api/eso/payments/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    tier
                })
            });
            const orderData = await orderRes.json();
            if (!orderRes.ok) throw new Error(orderData.detail || 'Failed to create order');
            const { order_id, amount, currency, description, key_id } = orderData;
            const user = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUser"])();
            await new Promise((resolve, reject)=>{
                const rzp = new window.Razorpay({
                    key: key_id,
                    amount,
                    currency,
                    order_id,
                    name: 'XCloak',
                    description,
                    prefill: {
                        name: user?.username || '',
                        email: user?.email || ''
                    },
                    theme: {
                        color: tier === 'pro' ? '#00aaff' : '#a78bfa'
                    },
                    handler: async (response)=>{
                        try {
                            const vRes = await fetch('/api/eso/payments/verify', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    tier
                                })
                            });
                            const vData = await vRes.json();
                            if (!vRes.ok) throw new Error(vData.detail || 'Verification failed');
                            const fresh = await fetch('/api/eso/auth/me', {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then((r)=>r.json()).catch(()=>null);
                            if (fresh && token) {
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveSession"])(token, fresh);
                                setUserTier(fresh.tier || tier);
                            }
                            setMsg({
                                text: `✓ Upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Enjoy your new plan.`,
                                ok: true
                            });
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    },
                    modal: {
                        ondismiss: ()=>reject(new Error('Payment cancelled'))
                    }
                });
                rzp.open();
            });
        } catch (e) {
            if (e.message !== 'Payment cancelled') setMsg({
                text: `✗ ${e.message}`,
                ok: false
            });
        } finally{
            setLoading(null);
        }
    }, [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLoggedIn((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLoggedIn"])());
        const u = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUser"])();
        if (u?.tier) setUserTier(u.tier);
        const plan = params.get('plan');
        if (plan && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLoggedIn"])()) handleUpgrade(plan);
    }, []) // eslint-disable-line
    ;
    const curRank = TIER_RANK[userTier] ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-5 sm:p-8",
        style: {
            background: '#03050a'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors",
                            children: "← Back to Xcloak"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl sm:text-4xl font-black mt-4 mb-3",
                            children: [
                                "Simple, ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#00ffaa'
                                    },
                                    children: "transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 21
                                }, this),
                                " pricing"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[13px] text-slate-500 max-w-lg mx-auto",
                            children: "Start free. Upgrade when you need more power. No hidden fees."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this),
                msg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8 p-4 rounded-xl border font-mono text-[12px] text-center",
                    style: msg.ok ? {
                        background: 'rgba(0,255,170,0.06)',
                        borderColor: 'rgba(0,255,170,0.25)',
                        color: '#00ffaa'
                    } : {
                        background: 'rgba(255,58,92,0.06)',
                        borderColor: 'rgba(255,58,92,0.25)',
                        color: '#ff3a5c'
                    },
                    children: [
                        msg.text,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMsg(null),
                            className: "ml-3 opacity-50 hover:opacity-100 cursor-pointer",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-5 mb-12",
                    children: TIERS.map((tier)=>{
                        const isCurrent = userTier === tier.tier;
                        const isDowngrade = TIER_RANK[tier.tier] < curRank;
                        const isUpgrade = TIER_RANK[tier.tier] > curRank;
                        const isProcessing = loading === tier.tier;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass p-5 relative flex flex-col",
                            style: {
                                borderColor: tier.border,
                                background: tier.bg
                            },
                            children: [
                                tier.badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold px-3 py-1 rounded-full",
                                    style: {
                                        background: tier.color,
                                        color: '#000'
                                    },
                                    children: tier.badge
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 19
                                }, this),
                                isCurrent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-3 right-4 font-mono text-[9px] font-bold px-3 py-1 rounded-full",
                                    style: {
                                        background: 'rgba(0,255,170,0.15)',
                                        border: '1px solid rgba(0,255,170,0.3)',
                                        color: '#00ffaa'
                                    },
                                    children: "CURRENT"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 151,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[10px] uppercase tracking-widest mb-1",
                                            style: {
                                                color: tier.color
                                            },
                                            children: tier.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pricing/page.tsx",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl font-black",
                                            style: {
                                                color: tier.color
                                            },
                                            children: [
                                                tier.price,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[14px] font-normal text-slate-600",
                                                    children: tier.period
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/pricing/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/pricing/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 154,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 space-y-1.5 mb-5",
                                    children: [
                                        tier.features.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2 font-mono text-[11px] text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 text-[9px]",
                                                        style: {
                                                            color: tier.color
                                                        },
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pricing/page.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 23
                                                    }, this),
                                                    f
                                                ]
                                            }, f, true, {
                                                fileName: "[project]/src/app/pricing/page.tsx",
                                                lineNumber: 162,
                                                columnNumber: 21
                                            }, this)),
                                        tier.missing.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-2 font-mono text-[11px] text-slate-700",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 text-[9px]",
                                                        children: "✗"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pricing/page.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 23
                                                    }, this),
                                                    f
                                                ]
                                            }, f, true, {
                                                fileName: "[project]/src/app/pricing/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 160,
                                    columnNumber: 17
                                }, this),
                                isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold opacity-40 cursor-default",
                                    style: {
                                        borderColor: tier.border,
                                        color: tier.color
                                    },
                                    children: "Current plan"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 19
                                }, this) : tier.tier === 'free' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: loggedIn ? '/scan' : '/register',
                                    className: "block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all hover:opacity-80",
                                    style: {
                                        background: `${tier.color}15`,
                                        borderColor: tier.border,
                                        color: tier.color
                                    },
                                    children: loggedIn ? 'Go to Scans' : tier.cta
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 176,
                                    columnNumber: 19
                                }, this) : isDowngrade ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold opacity-30 cursor-not-allowed",
                                    style: {
                                        borderColor: tier.border,
                                        color: tier.color
                                    },
                                    children: "Lower tier"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>isUpgrade && handleUpgrade(tier.tier),
                                    disabled: !!loading,
                                    className: "w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all cursor-pointer disabled:opacity-60",
                                    style: {
                                        background: `${tier.color}15`,
                                        borderColor: tier.border,
                                        color: tier.color
                                    },
                                    children: isProcessing ? '⏳ Processing...' : loggedIn ? tier.cta : 'Sign in to upgrade'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, tier.name, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 144,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4",
                            children: "Common questions"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
                            children: [
                                {
                                    q: 'What counts as a scan?',
                                    a: 'One target = one scan. nmap + nuclei on the same target = one scan with multiple tools.'
                                },
                                {
                                    q: 'Is payment secure?',
                                    a: 'All payments via Razorpay — PCI-DSS compliant. We never see your card details.'
                                },
                                {
                                    q: 'Can I upgrade later?',
                                    a: 'Yes, anytime. Your scan history and settings are preserved across tiers.'
                                },
                                {
                                    q: 'Is there a free trial?',
                                    a: 'The free tier is effectively a trial — 3 real scans/day, forever. No card needed.'
                                },
                                {
                                    q: 'Do I own my scan data?',
                                    a: 'Yes. Your reports and findings belong to you. Export anytime as PDF.'
                                },
                                {
                                    q: 'What about team billing?',
                                    a: 'Enterprise includes up to 5 seats. Need more? Email us for custom pricing.'
                                }
                            ].map(({ q, a })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[11px] font-bold text-slate-300 mb-1",
                                            children: q
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pricing/page.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-mono text-[11px] text-slate-600",
                                            children: a
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pricing/page.tsx",
                                            lineNumber: 209,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, q, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 198,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[12px] text-slate-600 mb-4",
                            children: [
                                "Questions? Email",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "mailto:billing@xcloak.app",
                                    className: "text-accent hover:underline",
                                    children: "billing@xcloak.app"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                ' ',
                                "· Payments via Razorpay · Cancel anytime"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[10px] text-slate-700 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/terms",
                                    className: "text-slate-600 hover:text-slate-400 transition-colors",
                                    children: "Terms of Service"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this),
                                ' · ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/privacy",
                                    className: "text-slate-600 hover:text-slate-400 transition-colors",
                                    children: "Privacy Policy"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        !loggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/register",
                            className: "inline-block px-8 py-3 rounded-xl border font-mono text-[13px] font-bold transition-all hover:opacity-80",
                            style: {
                                background: 'rgba(0,255,170,0.1)',
                                borderColor: 'rgba(0,255,170,0.35)',
                                color: '#00ffaa'
                            },
                            children: "Start Free — No Card Required"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/pricing/page.tsx",
            lineNumber: 116,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pricing/page.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/pricing/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_app_pricing_page_tsx_466ef5._.js.map