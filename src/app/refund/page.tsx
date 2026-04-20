import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Refund Policy — XCloak' }

const LAST_UPDATED = 'April 20, 2026'
const CONTACT_EMAIL = 'admin@xcloak.tech'

export default function RefundPage() {
  return (
    <div className="min-h-screen px-5 py-16" style={{ background: '#03050a' }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to XCloak
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Refund & Cancellation Policy</h1>
          <p className="font-mono text-[11px] text-slate-600">
            Last updated: {LAST_UPDATED} · Questions?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </div>

        {/* Summary */}
        <div className="glass p-5 mb-8 rounded-xl" style={{ borderColor: 'rgba(255,215,0,0.2)', background: 'rgba(255,215,0,0.03)' }}>
          <p className="font-mono text-[11px] font-bold text-slate-300 mb-2">Summary (plain English)</p>
          <div className="space-y-1.5">
            {[
              '7-day full refund for new subscribers if unused',
              'Cancel anytime — access continues until end of billing period',
              'No refunds for partial months after 7 days',
              'Refunds processed within 5–7 business days',
              'Email admin@xcloak.tech for all refund requests',
            ].map(s => (
              <div key={s} className="flex items-start gap-2 font-mono text-[11px] text-slate-500">
                <span className="text-yellow-500 text-[9px] mt-0.5 flex-shrink-0">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 font-mono text-[12px] text-slate-400 leading-7">

          <Section title="1. Subscription Plans">
            <p>
              XCloak offers monthly subscription plans (Pro and Enterprise). All plans are
              billed in advance on a monthly recurring basis. There are no annual plans or
              long-term contracts — you pay month to month.
            </p>
          </Section>

          <Section title="2. 7-Day Refund Guarantee">
            <p>
              If you are a new subscriber and are not satisfied with your paid plan,
              you may request a full refund within <span className="text-slate-200 font-bold">7 calendar days</span> of
              your first payment, provided that:
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>This is your first subscription on this account</Li>
              <Li>You have not used more than 5 scans on the paid tier</Li>
              <Li>You have not downloaded more than 3 PDF reports</Li>
              <Li>Your account is in good standing and has not violated our Terms of Service</Li>
            </ul>
            <p className="mt-4">
              To request a refund under this guarantee, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>{' '}
              within 7 days of payment with your registered email and payment ID.
            </p>
          </Section>

          <Section title="3. Cancellation Policy">
            <p>
              You can cancel your subscription at any time from your account dashboard
              (Settings → Subscription → Cancel).
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Cancellation takes effect at the end of your current billing period</Li>
              <Li>You retain full access to your paid tier until the billing period ends</Li>
              <Li>After cancellation, your account automatically downgrades to the free tier</Li>
              <Li>Your scan history and data are retained for 90 days after downgrade</Li>
            </ul>
            <p className="mt-4 text-slate-500">
              Cancellation does not automatically trigger a refund. The 7-day refund policy
              above applies only to eligible first-time subscribers.
            </p>
          </Section>

          <Section title="4. Non-Refundable Situations">
            <p>Refunds will not be issued in the following circumstances:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Requests made more than 7 days after the payment date</Li>
              <Li>Renewal payments (subsequent months after the first payment)</Li>
              <Li>Accounts that have exceeded the usage thresholds in Section 2</Li>
              <Li>Accounts suspended for Terms of Service violations</Li>
              <Li>Requests citing dissatisfaction with scan results or AI accuracy</Li>
              <Li>Partial month refunds after the 7-day window</Li>
            </ul>
          </Section>

          <Section title="5. Technical Issues">
            <p>
              If you experience a technical issue that prevents you from using the Service
              (e.g. the platform is unavailable for more than 24 consecutive hours), please
              contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
              We will investigate and may offer a credit or pro-rated refund at our discretion.
            </p>
          </Section>

          <Section title="6. Refund Process">
            <p>To request a refund:</p>
            <ol className="mt-3 space-y-3 ml-4 list-decimal list-inside">
              <li>
                Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>{' '}
                with subject line: <span className="text-slate-300">"Refund Request — [your registered email]"</span>
              </li>
              <li>Include your registered email address and the payment/order ID</li>
              <li>Briefly describe your reason for the refund</li>
              <li>We will respond within 2 business days to confirm eligibility</li>
              <li>Approved refunds are processed within 5–7 business days to your original payment method</li>
            </ol>
            <p className="mt-4 text-slate-500">
              Refunds are processed through our payment partner. Depending on your bank,
              it may take an additional 3–5 business days for the amount to reflect
              in your account.
            </p>
          </Section>

          <Section title="7. Upgrades and Downgrades">
            <p>
              <span className="text-slate-300 font-bold">Upgrading</span> (e.g. Free → Pro, or Pro → Enterprise):
              The new plan takes effect immediately. You are charged the new plan price at
              the next billing cycle.
            </p>
            <p className="mt-3">
              <span className="text-slate-300 font-bold">Downgrading</span> (e.g. Enterprise → Pro):
              The downgrade takes effect at the end of your current billing period.
              No refund is issued for the remaining days on the higher tier.
            </p>
          </Section>

          <Section title="8. Free Tier">
            <p>
              The free tier is provided at no cost and is not subject to this Refund Policy.
              There is nothing to refund for free tier usage.
            </p>
          </Section>

          <Section title="9. Contact for Billing Issues">
            <p>For any billing or refund questions:</p>
            <div className="mt-3 space-y-1 ml-4 text-slate-500">
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a></p>
              <p>Phone: <a href="tel:+916366652685" className="text-accent hover:underline">+91 63666 52685</a></p>
              <p>Response time: within 2 business days</p>
            </div>
          </Section>

        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} XCloak. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[10px]">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-slate-600 hover:text-slate-400 transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] font-bold text-slate-200 mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 text-yellow-500 text-[9px] flex-shrink-0">✓</span>
      <span>{children}</span>
    </li>
  )
}
