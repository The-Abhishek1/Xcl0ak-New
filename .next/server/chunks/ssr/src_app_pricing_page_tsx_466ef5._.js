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
const TIER_AMOUNTS = {
    pro: 99900,
    enterprise: 499900
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
function PricingPageInner() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [loggedIn, setLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userTier, setUserTier] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('free');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentMode, setPaymentMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('razorpay');
    const [upiModal, setUpiModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch payment mode from backend
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetch('/api/eso/admin/settings/payment-mode/public').then((r)=>r.json()).then((d)=>setPaymentMode(d.mode === 'upi' ? 'upi' : 'razorpay')).catch(()=>setPaymentMode('razorpay'));
    }, []);
    const handleUpgrade = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (tier)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$eso$2d$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLoggedIn"])()) {
            router.push('/login?from=pricing');
            return;
        }
        // UPI mode — show QR modal
        if (paymentMode === 'upi') {
            setUpiModal({
                tier,
                amount: TIER_AMOUNTS[tier] ?? 0,
                label: tier === 'pro' ? '₹999/month' : '₹4,999/month'
            });
            return;
        }
        // Razorpay mode
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
        router,
        paymentMode
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
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                lineNumber: 142,
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
                                        lineNumber: 144,
                                        columnNumber: 21
                                    }, this),
                                    " pricing"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[13px] text-slate-500 max-w-lg mx-auto",
                                children: "Start free. Upgrade when you need more power. No hidden fees."
                            }, void 0, false, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            paymentMode === 'upi' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full font-mono text-[10px]",
                                style: {
                                    background: 'rgba(0,255,170,0.08)',
                                    border: '1px solid rgba(0,255,170,0.2)',
                                    color: '#00ffaa'
                                },
                                children: "⚡ UPI payments active — instant upgrade after payment"
                            }, void 0, false, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pricing/page.tsx",
                        lineNumber: 141,
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
                                lineNumber: 163,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pricing/page.tsx",
                        lineNumber: 158,
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
                                        lineNumber: 177,
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
                                        lineNumber: 181,
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
                                                lineNumber: 185,
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
                                                        lineNumber: 187,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pricing/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 184,
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
                                                            lineNumber: 193,
                                                            columnNumber: 23
                                                        }, this),
                                                        f
                                                    ]
                                                }, f, true, {
                                                    fileName: "[project]/src/app/pricing/page.tsx",
                                                    lineNumber: 192,
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
                                                            lineNumber: 198,
                                                            columnNumber: 23
                                                        }, this),
                                                        f
                                                    ]
                                                }, f, true, {
                                                    fileName: "[project]/src/app/pricing/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 190,
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
                                        lineNumber: 203,
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
                                        lineNumber: 206,
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
                                        lineNumber: 212,
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
                                        children: isProcessing ? '⏳ Processing...' : loggedIn ? paymentMode === 'upi' ? `Pay via UPI — ${tier.tier === 'pro' ? '₹999' : '₹4,999'}/mo` : tier.cta : 'Sign in to upgrade'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, tier.name, true, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/pricing/page.tsx",
                        lineNumber: 167,
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
                                lineNumber: 229,
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
                                        a: paymentMode === 'upi' ? 'UPI payments go directly to our PhonePe account. Share your UTR after payment for instant upgrade.' : 'All payments via Razorpay — PCI-DSS compliant. We never see your card details.'
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
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-mono text-[11px] text-slate-600",
                                                children: a
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pricing/page.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, q, true, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 230,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pricing/page.tsx",
                        lineNumber: 228,
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
                                        href: "mailto:admin@xcloak.tech",
                                        className: "text-accent hover:underline",
                                        children: "admin@xcloak.tech"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    ' ',
                                    "· ",
                                    paymentMode === 'upi' ? 'UPI / PhonePe payments' : 'Payments via Razorpay',
                                    " · Cancel anytime"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 248,
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
                                        lineNumber: 254,
                                        columnNumber: 13
                                    }, this),
                                    ' · ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/privacy",
                                        className: "text-slate-600 hover:text-slate-400 transition-colors",
                                        children: "Privacy Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this),
                                    ' · ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/refund",
                                        className: "text-slate-600 hover:text-slate-400 transition-colors",
                                        children: "Refund Policy"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pricing/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 253,
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
                                lineNumber: 261,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pricing/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/pricing/page.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            upiModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                style: {
                    background: 'rgba(0,0,0,0.85)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "glass rounded-2xl p-6 w-full max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-black text-[15px] text-slate-200",
                                    children: [
                                        "Pay via UPI — ",
                                        upiModal.label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 276,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setUpiModal(null),
                                    className: "text-slate-600 hover:text-slate-300 cursor-pointer text-xl",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 279,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 mb-4",
                            children: [
                                'Scan QR or pay to UPI ID below',
                                'Send exact amount shown',
                                'Email us your UTR number + username',
                                'We upgrade your account within 1 hour'
                            ].map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-3 font-mono text-[11px] text-slate-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold",
                                            style: {
                                                background: 'rgba(0,255,170,0.1)',
                                                border: '1px solid rgba(0,255,170,0.3)',
                                                color: '#00ffaa'
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/pricing/page.tsx",
                                            lineNumber: 291,
                                            columnNumber: 19
                                        }, this),
                                        step
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4 py-3 rounded-xl",
                            style: {
                                background: 'rgba(0,255,170,0.06)',
                                border: '1px solid rgba(0,255,170,0.2)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[10px] text-slate-600 mb-1",
                                    children: "Amount to pay"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl font-black",
                                    style: {
                                        color: '#00ffaa'
                                    },
                                    children: upiModal.tier === 'pro' ? '₹999' : '₹4,999'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[9px] text-slate-700 mt-1",
                                    children: [
                                        "per month · ",
                                        upiModal.tier.toUpperCase(),
                                        " plan"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 301,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 rounded-xl bg-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/upi-qr.jpg",
                                    alt: "PhonePe UPI QR Code",
                                    width: 160,
                                    height: 160,
                                    className: "rounded-lg"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/pricing/page.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[9px] text-slate-600 mb-1",
                                    children: "UPI ID"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        navigator.clipboard.writeText('6366652685@ybl');
                                        setMsg({
                                            text: '✓ UPI ID copied!',
                                            ok: true
                                        });
                                        setUpiModal(null);
                                    },
                                    className: "font-mono text-[13px] font-bold text-accent hover:underline cursor-pointer",
                                    children: "6366652685@ybl"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono text-[9px] text-slate-700 mt-1",
                                    children: "ABHISHEK A N · Tap to copy"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 324,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl p-3 font-mono text-[10px] text-slate-500 text-center",
                            style: {
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)'
                            },
                            children: [
                                "After paying, email",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `mailto:admin@xcloak.tech?subject=UPI Payment - ${upiModal.tier} plan&body=Username: %0AUTRNumber: %0APlan: ${upiModal.tier}`,
                                    className: "text-accent hover:underline",
                                    children: "admin@xcloak.tech"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pricing/page.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this),
                                ' ',
                                "with your UTR number and username."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 340,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setUpiModal(null),
                            className: "w-full mt-4 py-2.5 rounded-xl font-mono text-[11px] text-slate-600 cursor-pointer hover:text-slate-400 transition-colors border border-white/[0.06]",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pricing/page.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pricing/page.tsx",
                    lineNumber: 274,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pricing/page.tsx",
                lineNumber: 272,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pricing/page.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function PricingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-64",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-[11px] text-slate-600 animate-pulse",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/app/pricing/page.tsx",
                lineNumber: 365,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "[project]/src/app/pricing/page.tsx",
            lineNumber: 364,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PricingPageInner, {}, void 0, false, {
            fileName: "[project]/src/app/pricing/page.tsx",
            lineNumber: 368,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/pricing/page.tsx",
        lineNumber: 363,
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