'use client'
import Link from 'next/link'
import { isLoggedIn } from '@/lib/eso-auth'
import { useEffect, useState } from 'react'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
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
      'Community access (CVE, exploits, CTF)',
      'Scan reports (text)',
    ],
    missing: ['AI analysis', 'Task proposals', 'PDF reports', 'Scheduled scans', 'API access', 'All 7 tools'],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    color: '#00aaff',
    border: 'rgba(0,170,255,0.35)',
    bg: 'rgba(0,170,255,0.05)',
    badge: 'POPULAR',
    cta: 'Upgrade to Pro',
    ctaHref: '/login',
    features: [
      '20 scans / day',
      '2 concurrent scans',
      '5 tools (nmap, nuclei, whatweb, nikto, gobuster)',
      'AI analysis & false positive removal',
      'AI task proposals',
      'PDF pentest reports',
      'Scheduled scans',
      'API key access',
      'Attack surface dashboard',
    ],
    missing: ['Teams & RBAC', 'sqlmap & ffuf'],
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    color: '#a78bfa',
    border: 'rgba(167,139,250,0.35)',
    bg: 'rgba(167,139,250,0.05)',
    cta: 'Contact Us',
    ctaHref: 'mailto:hello@xcloak.app',
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
      'Dedicated support',
    ],
    missing: [],
  },
]

export default function PricingPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => { setLoggedIn(isLoggedIn()) }, [])

  return (
    <div className="min-h-screen p-5 sm:p-8" style={{background:'#03050a'}}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">← Back to Xcloak</Link>
          <h1 className="text-3xl sm:text-4xl font-black mt-4 mb-3">
            Simple, <span style={{color:'#00ffaa'}}>transparent</span> pricing
          </h1>
          <p className="font-mono text-[13px] text-slate-500 max-w-lg mx-auto">
            Start free. Upgrade when you need more scans, better tools, or team features. No hidden fees.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {TIERS.map(tier => (
            <div key={tier.name} className="glass p-5 relative flex flex-col"
              style={{borderColor:tier.border, background:tier.bg}}>
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold px-3 py-1 rounded-full"
                  style={{background:tier.color, color:'#000'}}>
                  {tier.badge}
                </div>
              )}
              <div className="mb-4">
                <div className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{color:tier.color}}>{tier.name}</div>
                <div className="text-3xl font-black" style={{color:tier.color}}>{tier.price}
                  <span className="text-[14px] font-normal text-slate-600">{tier.period}</span>
                </div>
              </div>

              <div className="flex-1 space-y-1.5 mb-5">
                {tier.features.map(f => (
                  <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-slate-400">
                    <span className="mt-0.5 text-[9px]" style={{color:tier.color}}>✓</span> {f}
                  </div>
                ))}
                {tier.missing.map(f => (
                  <div key={f} className="flex items-start gap-2 font-mono text-[11px] text-slate-700">
                    <span className="mt-0.5 text-[9px]">✗</span> {f}
                  </div>
                ))}
              </div>

              <Link href={loggedIn && tier.name==='Free' ? '/scan' : tier.ctaHref}
                className="block w-full text-center py-2.5 rounded-xl border font-mono text-[12px] font-bold transition-all"
                style={{background:`${tier.color}15`,borderColor:tier.border,color:tier.color}}>
                {loggedIn && tier.name==='Free' ? 'Go to Scans' : tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="glass p-6 mb-8">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-slate-600 mb-4">Common questions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {q:'What counts as a scan?', a:'One target = one scan. Running nmap + nuclei on the same target counts as one scan with multiple tools.'},
              {q:'What are scan credits?', a:'Credits map to Docker compute. Each tool run costs compute. Credits reset daily at midnight UTC.'},
              {q:'Can I upgrade later?', a:'Yes. Contact us or use the settings page. Your scan history is preserved across tiers.'},
              {q:'Is there a trial?', a:'The free tier is effectively a trial — 3 real scans per day, forever. No credit card required.'},
              {q:'Do I need to authorize targets?', a:'Yes. You must only scan systems you own or have written permission to test. We log all scans.'},
              {q:'What about team billing?', a:'Enterprise plans include up to 5 users. Need more? Contact us for custom pricing.'},
            ].map(({q,a}) => (
              <div key={q}>
                <div className="font-mono text-[11px] font-bold text-slate-300 mb-1">{q}</div>
                <div className="font-mono text-[11px] text-slate-600">{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-mono text-[12px] text-slate-600 mb-4">
            Questions? Email us at <a href="mailto:hello@xcloak.app" className="text-accent hover:underline">hello@xcloak.app</a>
          </p>
          {!loggedIn && (
            <Link href="/register"
              className="inline-block px-8 py-3 rounded-xl border font-mono text-[13px] font-bold transition-all"
              style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.35)',color:'#00ffaa'}}>
              Start Free — No Card Required
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
