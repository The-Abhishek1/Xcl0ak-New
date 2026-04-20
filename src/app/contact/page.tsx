import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact — XCloak' }

export default function ContactPage() {
  return (
    <div className="min-h-screen px-5 py-16" style={{ background: '#03050a' }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to XCloak
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Contact Us</h1>
          <p className="font-mono text-[11px] text-slate-600">
            We typically respond within 24 hours.
          </p>
        </div>

        <div className="space-y-4">

          {/* General */}
          <div className="glass rounded-xl p-6">
            <h2 className="font-bold text-[13px] text-slate-200 mb-1">General Enquiries</h2>
            <p className="font-mono text-[11px] text-slate-500 mb-3">Account issues, feature requests, partnerships</p>
            <a href="mailto:admin@xcloak.tech"
              className="font-mono text-[12px] text-accent hover:underline">
              admin@xcloak.tech
            </a>
          </div>

          {/* Billing */}
          <div className="glass rounded-xl p-6">
            <h2 className="font-bold text-[13px] text-slate-200 mb-1">Billing & Payments</h2>
            <p className="font-mono text-[11px] text-slate-500 mb-3">Subscription questions, refunds, invoices</p>
            <a href="mailto:admin@xcloak.tech"
              className="font-mono text-[12px] text-accent hover:underline">
              admin@xcloak.tech
            </a>
          </div>

          {/* Security */}
          <div className="glass rounded-xl p-6">
            <h2 className="font-bold text-[13px] text-slate-200 mb-1">Security Issues</h2>
            <p className="font-mono text-[11px] text-slate-500 mb-3">Responsible disclosure, vulnerability reports</p>
            <a href="mailto:admin@xcloak.tech"
              className="font-mono text-[12px] text-accent hover:underline">
              admin@xcloak.tech
            </a>
          </div>

          {/* Phone */}
          <div className="glass rounded-xl p-6">
            <h2 className="font-bold text-[13px] text-slate-200 mb-1">Phone</h2>
            <p className="font-mono text-[11px] text-slate-500 mb-3">Available Mon–Sat, 10 AM – 6 PM IST</p>
            <a href="tel:+916366652685"
              className="font-mono text-[12px] text-accent hover:underline">
              +91 63666 52685
            </a>
          </div>

          {/* Address */}
          <div className="glass rounded-xl p-6">
            <h2 className="font-bold text-[13px] text-slate-200 mb-1">Address</h2>
            <p className="font-mono text-[11px] text-slate-500 leading-6">
              XCloak<br />
              Karnataka, India<br />
              admin@xcloak.tech
            </p>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} XCloak. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[10px]">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Terms</Link>
            <Link href="/refund" className="text-slate-600 hover:text-slate-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
