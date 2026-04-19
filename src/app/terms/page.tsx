import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service — Xcloak' }

const LAST_UPDATED = 'April 18, 2026'
const CONTACT_EMAIL = 'admin@xcloak.tech'
const COMPANY = 'Xcloak'

export default function TermsPage() {
  return (
    <div className="min-h-screen px-5 py-16" style={{ background: '#03050a' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to Xcloak
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Terms of Service</h1>
          <p className="font-mono text-[11px] text-slate-600">
            Last updated: {LAST_UPDATED} · Questions?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </div>

        {/* Important notice */}
        <div className="glass p-5 mb-8 rounded-xl" style={{ borderColor: 'rgba(255,58,92,0.3)', background: 'rgba(255,58,92,0.04)' }}>
          <p className="font-mono text-[12px] font-bold text-red-400 mb-1">Important — Read Before Using</p>
          <p className="font-mono text-[11px] text-slate-400 leading-6">
            {COMPANY} is a penetration testing tool. You must only scan systems you own or have explicit written
            permission to test. Unauthorized scanning is illegal under the IT Act 2000 (India) and equivalent
            laws worldwide. Misuse may result in immediate account termination and legal action.
          </p>
        </div>

        <div className="space-y-8 font-mono text-[12px] text-slate-400 leading-7">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using {COMPANY} ("the Service", "we", "us"), you agree to be bound by
              these Terms of Service. If you do not agree, do not use the Service. These terms apply
              to all users including free, pro, and enterprise plan subscribers.
            </p>
          </Section>

          <Section title="2. Authorized Use Only">
            <p>You may only use {COMPANY} to scan:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Systems and networks you own outright</Li>
              <Li>Systems for which you have explicit written authorization from the owner</Li>
              <Li>Your own hosted applications and infrastructure</Li>
              <Li>Designated practice/lab environments (e.g. HackTheBox, TryHackMe)</Li>
            </ul>
            <p className="mt-4">
              You <span className="text-red-400 font-bold">must not</span> use the Service to scan:
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li red>Systems, networks, or websites you do not own or have no permission to test</Li>
              <Li red>Government, financial, or critical infrastructure systems</Li>
              <Li red>Any target for the purpose of unauthorized data access, disruption, or harm</Li>
              <Li red>Shared hosting environments where testing may affect other tenants</Li>
            </ul>
            <p className="mt-4 text-slate-500">
              We log all scan targets, timestamps, and user identifiers. This data may be disclosed
              to law enforcement upon valid legal request.
            </p>
          </Section>

          <Section title="3. Account Registration">
            <p>
              You must provide accurate information when creating an account. You are responsible for
              maintaining the confidentiality of your credentials and for all activity under your account.
              You must be at least 18 years old to use the Service. We reserve the right to suspend or
              terminate accounts that provide false information.
            </p>
          </Section>

          <Section title="4. Subscription Plans and Billing">
            <p>
              {COMPANY} offers Free, Pro (₹999/month), and Enterprise (₹4,999/month) plans.
              Payments are processed by Razorpay. By subscribing, you authorize us to charge your
              payment method on a recurring monthly basis.
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Subscriptions renew automatically unless cancelled before the renewal date</Li>
              <Li>Refunds are not provided for partial months or unused scan credits</Li>
              <Li>You may cancel at any time via Settings → Billing or by emailing us</Li>
              <Li>Plan downgrades take effect at the next billing cycle</Li>
              <Li>We reserve the right to change pricing with 30 days' notice</Li>
            </ul>
          </Section>

          <Section title="5. Scan Credits and Usage Limits">
            <p>
              Each plan includes a daily scan allowance that resets at midnight UTC. Unused credits
              do not carry over. We may impose rate limits, queue scans, or throttle usage to ensure
              fair service for all users. Enterprise plans may negotiate custom limits.
            </p>
          </Section>

          <Section title="6. AI-Generated Content">
            <p>
              {COMPANY} uses AI (including Claude by Anthropic) to analyze scan results, generate
              reports, and propose follow-up actions. AI output may contain errors, false positives,
              or incorrect recommendations. You are solely responsible for verifying AI-generated
              findings before acting on them. Do not rely on our reports as the sole basis for
              security decisions in production environments.
            </p>
          </Section>

          <Section title="7. Data and Privacy">
            <p>
              Scan targets, results, and reports are stored on our servers and associated with your
              account. We do not share your scan data with third parties except as required by law.
              See our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> for
              full details on data handling, retention, and your rights.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All software, UI, and content of the {COMPANY} platform is owned by us or our licensors.
              You retain ownership of your scan data and reports. You grant us a limited licence to
              process your data to provide the Service. You may not reverse-engineer, resell, or
              redistribute any part of the platform.
            </p>
          </Section>

          <Section title="9. Prohibited Activities">
            <p>In addition to unauthorized scanning, you must not:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li red>Attempt to circumvent rate limits, quotas, or authentication mechanisms</Li>
              <Li red>Use the platform to develop or deploy malware or offensive tools against third parties</Li>
              <Li red>Share account credentials or API keys with unauthorized users</Li>
              <Li red>Interfere with the platform's infrastructure or other users' scans</Li>
              <Li red>Scrape, automate, or abuse the API beyond your plan's limits</Li>
            </ul>
          </Section>

          <Section title="10. Disclaimer of Warranties">
            <p>
              The Service is provided "as is" and "as available" without any warranty of any kind,
              express or implied. We do not warrant that the Service will be error-free, uninterrupted,
              or that scan results will be complete or accurate. Security testing is inherently
              imperfect — our tools may miss vulnerabilities or report false positives.
            </p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, {COMPANY} and its operators shall not be liable
              for any indirect, incidental, or consequential damages arising from your use of the Service,
              including damages resulting from scan errors, data loss, or security breaches. Our total
              liability shall not exceed the amount you paid us in the 3 months prior to the claim.
            </p>
          </Section>

          <Section title="12. Termination">
            <p>
              We may suspend or terminate your account immediately, without notice, if you violate
              these terms — particularly the authorized-use requirements. You may terminate your
              account at any time by contacting us. Upon termination, your data will be deleted
              within 30 days except where retention is required by law.
            </p>
          </Section>

          <Section title="13. Governing Law">
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Bangalore, Karnataka. If you are located outside
              India, you agree that Indian law governs this agreement.
            </p>
          </Section>

          <Section title="14. Changes to Terms">
            <p>
              We may update these Terms at any time. We will notify registered users by email at
              least 14 days before material changes take effect. Continued use of the Service after
              changes constitutes acceptance.
            </p>
          </Section>

          <Section title="15. Contact">
            <p>
              For questions about these Terms, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
              For billing issues: <a href="mailto:admin@xcloak.tech" className="text-accent hover:underline">admin@xcloak.tech</a>.
            </p>
          </Section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[10px]">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-slate-400 transition-colors">Pricing</Link>
            <Link href="/register" className="text-accent hover:underline">Get Started</Link>
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

function Li({ children, red }: { children: React.ReactNode; red?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 text-[9px] flex-shrink-0" style={{ color: red ? '#ff3a5c' : '#00ffaa' }}>
        {red ? '✗' : '✓'}
      </span>
      <span>{children}</span>
    </li>
  )
}
