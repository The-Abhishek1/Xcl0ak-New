'use client'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isLoggedIn, getToken, getUser, saveSession } from '@/lib/eso-auth'

declare global { interface Window { Razorpay: any } }

const TIERS = [
  {
    name:'Free', tier:'free', price:'₹0', period:'forever',
    color:'#64748b', border:'rgba(100,116,139,0.25)', bg:'rgba(100,116,139,0.04)',
    cta:'Get Started', ctaHref:'/register',
    features:['3 scans / day','1 concurrent scan','nmap only','Basic scan history','Community (CVE, exploits, CTF)','Text scan reports'],
    missing:['AI analysis','Task proposals','PDF reports','Scheduled scans','API access','All 7 tools'],
  },
  {
    name:'Pro', tier:'pro', price:'₹999', period:'/month',
    color:'#00aaff', border:'rgba(0,170,255,0.35)', bg:'rgba(0,170,255,0.05)', badge:'POPULAR',
    cta:'Upgrade to Pro', ctaHref:null,
    features:['20 scans / day','2 concurrent scans','5 tools (nmap, nuclei, whatweb, nikto, gobuster)','AI analysis & false positive removal','AI task proposals','PDF pentest reports','Scheduled scans','API key access','Attack surface dashboard'],
    missing:['Teams & RBAC','sqlmap & ffuf'],
  },
  {
    name:'Enterprise', tier:'enterprise', price:'₹4,999', period:'/month',
    color:'#a78bfa', border:'rgba(167,139,250,0.35)', bg:'rgba(167,139,250,0.05)',
    cta:'Upgrade to Enterprise', ctaHref:null,
    features:['100 scans / day','5 concurrent scans','All 7 tools (incl. sqlmap, ffuf)','AI analysis & proposals','PDF reports','Scheduled scans','Teams & RBAC','API key access','Attack surface dashboard','Priority scan queue','Compliance reports (SOC2, ISO27001)','Dedicated support'],
    missing:[],
  },
]

const TIER_RANK: Record<string,number> = { free:0, pro:1, enterprise:2, admin:3 }

function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

export default function PricingPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [loggedIn, setLoggedIn] = useState(false)
  const [userTier, setUserTier] = useState('free')
  const [loading,  setLoading]  = useState<string|null>(null)
  const [msg,      setMsg]      = useState<{text:string; ok:boolean}|null>(null)

  const handleUpgrade = useCallback(async (tier: string) => {
    if (!isLoggedIn()) { router.push('/login?from=pricing'); return }
    setLoading(tier); setMsg(null)
    try {
      const ready = await loadRazorpay()
      if (!ready) throw new Error('Failed to load payment gateway. Check your internet.')
      const token = getToken()
      const orderRes = await fetch('/api/eso/payments/create-order', {
        method:'POST',
        headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
        body: JSON.stringify({ tier }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.detail || 'Failed to create order')
      const { order_id, amount, currency, description, key_id } = orderData
      const user = getUser()
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: key_id, amount, currency, order_id,
          name:'XCloak', description,
          prefill:{ name: user?.username||'', email: user?.email||'' },
          theme:{ color: tier==='pro' ? '#00aaff' : '#a78bfa' },
          handler: async (response: any) => {
            try {
              const vRes = await fetch('/api/eso/payments/verify', {
                method:'POST',
                headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                body: JSON.stringify({
                  razorpay_order_id:   response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature:  response.razorpay_signature,
                  tier,
                }),
              })
              const vData = await vRes.json()
              if (!vRes.ok) throw new Error(vData.detail || 'Verification failed')
              const fresh = await fetch('/api/eso/auth/me', { headers:{ Authorization:`Bearer ${token}` } }).then(r=>r.json()).catch(()=>null)
              if (fresh && token) { saveSession(token, fresh); setUserTier(fresh.tier||tier) }
              setMsg({ text:`✓ Upgraded to ${tier.charAt(0).toUpperCase()+tier.slice(1)}! Enjoy your new plan.`, ok:true })
              resolve()
            } catch(e:any) { reject(e) }
          },
          modal:{ ondismiss: () => reject(new Error('Payment cancelled')) },
        })
        rzp.open()
      })
    } catch(e:any) {
      if (e.message !== 'Payment cancelled') setMsg({ text:`✗ ${e.message}`, ok:false })
    } finally { setLoading(null) }
  }, [router])

  useEffect(() => {
    setLoggedIn(isLoggedIn())
    const u = getUser(); if (u?.tier) setUserTier(u.tier)
    const plan = params.get('plan')
    if (plan && isLoggedIn()) handleUpgrade(plan)
  }, []) // eslint-disable-line

  const curRank = TIER_RANK[userTier] ?? 0

  return (
    <div className="min-h-screen p-5 sm:p-8" style={{background:'#03050a'}}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/dashboard" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">← Back to Xcloak</Link>
          <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
            Simple, <span style={{color:'#00ffaa'}}>transparent</span> pricing
          </h1>
          <p className="font-mono text-[13px] text-slate-500 max-w-lg mx-auto">
            Start free. Upgrade when you need more power. No hidden fees.
          </p>
        </div>

        {msg && (
          <div className="mb-8 p-4 rounded-xl border font-mono text-[12px] text-center"
            style={msg.ok
              ?{background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.25)',color:'#00ffaa'}
              :{background:'rgba(255,58,92,0.06)', borderColor:'rgba(255,58,92,0.25)', color:'#ff3a5c'}}>
            {msg.text}
            <button onClick={()=>setMsg(null)} className="ml-3 opacity-50 hover:opacity-100 cursor-pointer">✕</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {TIERS.map(tier => {
            const isCurrent  = userTier === tier.tier
            const isDowngrade = TIER_RANK[tier.tier] < curRank
            const isUpgrade   = TIER_RANK[tier.tier] > curRank
            const isProcessing = loading === tier.tier
            return (
              <div key={tier.name} className="glass p-5 relative flex flex-col"
                style={{borderColor:tier.border, background:tier.bg}}>
                {(tier as any).badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold px-3 py-1 rounded-full"
                    style={{background:tier.color, color:'#000'}}>{(tier as any).badge}</div>
                )}
                {isCurrent && (
                  <div className="absolute -top-3 right-4 font-mono text-[9px] font-bold px-3 py-1 rounded-full"
                    style={{background:'rgba(0,255,170,0.15)',border:'1px solid rgba(0,255,170,0.3)',color:'#00ffaa'}}>CURRENT</div>
                )}
                <div className="mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{color:tier.color}}>{tier.name}</div>
                  <div className="text-3xl font-black" style={{color:tier.color}}>
                    {tier.price}<span className="text-[14px] font-normal text-slate-600">{tier.period}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-1.5 mb-5">
                  {tier.features.map(f=>(
                    <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-slate-400">
                      <span className="mt-0.5 text-[9px]" style={{color:tier.color}}>✓</span>{f}
                    </div>
                  ))}
                  {tier.missing.map(f=>(
                    <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-slate-700">
                      <span className="mt-0.5 text-[9px]">✗</span>{f}
                    </div>
                  ))}
                </div>
                {isCurrent ? (
                  <div className="block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold opacity-40 cursor-default"
                    style={{borderColor:tier.border,color:tier.color}}>Current plan</div>
                ) : tier.tier==='free' ? (
                  <Link href={loggedIn?'/scan':'/register'}
                    className="block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all hover:opacity-80"
                    style={{background:`${tier.color}15`,borderColor:tier.border,color:tier.color}}>
                    {loggedIn?'Go to Scans':tier.cta}
                  </Link>
                ) : isDowngrade ? (
                  <div className="block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold opacity-30 cursor-not-allowed"
                    style={{borderColor:tier.border,color:tier.color}}>Lower tier</div>
                ) : (
                  <button onClick={()=>isUpgrade&&handleUpgrade(tier.tier)} disabled={!!loading}
                    className="w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all cursor-pointer disabled:opacity-60"
                    style={{background:`${tier.color}15`,borderColor:tier.border,color:tier.color}}>
                    {isProcessing?'⏳ Processing...':(loggedIn?tier.cta:'Sign in to upgrade')}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="glass p-6 mb-8">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">Common questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {q:'What counts as a scan?',  a:'One target = one scan. nmap + nuclei on the same target = one scan with multiple tools.'},
              {q:'Is payment secure?',      a:'All payments via Razorpay — PCI-DSS compliant. We never see your card details.'},
              {q:'Can I upgrade later?',    a:'Yes, anytime. Your scan history and settings are preserved across tiers.'},
              {q:'Is there a free trial?',  a:'The free tier is effectively a trial — 3 real scans/day, forever. No card needed.'},
              {q:'Do I own my scan data?',  a:'Yes. Your reports and findings belong to you. Export anytime as PDF.'},
              {q:'What about team billing?',a:'Enterprise includes up to 5 seats. Need more? Email us for custom pricing.'},
            ].map(({q,a})=>(
              <div key={q}>
                <div className="font-mono text-[11px] font-bold text-slate-300 mb-1">{q}</div>
                <div className="font-mono text-[11px] text-slate-600">{a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="font-mono text-[12px] text-slate-600 mb-4">
            Questions? Email{' '}
            <a href="mailto:billing@xcloak.app" className="text-accent hover:underline">billing@xcloak.app</a>
            {' '}· Payments via Razorpay · Cancel anytime
          </p>
          <p className="font-mono text-[10px] text-slate-700 mb-4">
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</Link>
            {' · '}
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
          </p>
          {!loggedIn && (
            <Link href="/register"
              className="inline-block px-8 py-3 rounded-xl border font-mono text-[13px] font-bold transition-all hover:opacity-80"
              style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
              Start Free — No Card Required
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
