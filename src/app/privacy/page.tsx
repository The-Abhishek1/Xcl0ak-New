import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy — Xcloak' }

const LAST_UPDATED = 'April 18, 2026'
const CONTACT_EMAIL = 'admin@xcloak.tech'
const COMPANY = 'Xcloak'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-5 py-16" style={{ background: '#03050a' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to Xcloak
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Privacy Policy</h1>
          <p className="font-mono text-[11px] text-slate-600">
            Last updated: {LAST_UPDATED} · Questions?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </div>

        {/* Summary box */}
        <div className="glass p-5 mb-8 rounded-xl" style={{ borderColor: 'rgba(0,170,255,0.2)', background: 'rgba(0,170,255,0.04)' }}>
          <p className="font-mono text-[11px] font-bold text-slate-300 mb-2">Summary (plain English)</p>
          <div className="space-y-1.5">
            {[
              'We collect only what we need to run the service',
              'We never sell your data to advertisers or third parties',
              'Scan targets and results are stored securely and tied to your account',
              'You can request deletion of your data at any time',
              'We use Razorpay for payments — we never store card details',
            ].map(s => (
              <div key={s} className="flex items-start gap-2 font-mono text-[11px] text-slate-500">
                <span className="text-accent text-[9px] mt-0.5 flex-shrink-0">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 font-mono text-[12px] text-slate-400 leading-7">

          <Section title="1. Who We Are">
            <p>
              {COMPANY} is a penetration testing and security intelligence platform operated
              independently. When this policy refers to "we", "us", or "our", it means {COMPANY}
              and its operators. For privacy enquiries, contact{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <p className="text-slate-300 font-bold mb-2">Account data (when you register)</p>
            <ul className="space-y-2 ml-4 mb-4">
              <Li>Email address and username</Li>
              <Li>Hashed password (we never store plaintext passwords)</Li>
              <Li>Account creation date and tier (free/pro/enterprise)</Li>
            </ul>

            <p className="text-slate-300 font-bold mb-2">Scan data (when you run a scan)</p>
            <ul className="space-y-2 ml-4 mb-4">
              <Li>Target hostname or IP address</Li>
              <Li>Scan goal (your plain-English description)</Li>
              <Li>Tool output, parsed findings, risk scores</Li>
              <Li>AI-generated analysis and reports</Li>
              <Li>Scan timestamp, duration, and status</Li>
            </ul>

            <p className="text-slate-300 font-bold mb-2">Payment data (when you subscribe)</p>
            <ul className="space-y-2 ml-4 mb-4">
              <Li>Payment ID and order ID from Razorpay</Li>
              <Li>Subscription tier and payment date</Li>
              <Li>We do NOT store card numbers, CVVs, or bank details — these are handled entirely by Razorpay</Li>
            </ul>

            <p className="text-slate-300 font-bold mb-2">Technical data (automatically collected)</p>
            <ul className="space-y-2 ml-4">
              <Li>IP address at time of login and scan initiation</Li>
              <Li>Browser/client user agent</Li>
              <Li>API request logs (for rate limiting and abuse prevention)</Li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Data">
            <ul className="space-y-2 ml-4">
              <Li>To provide and operate the Service — running scans, storing results, generating reports</Li>
              <Li>To authenticate you and maintain your session</Li>
              <Li>To enforce scan quotas and tier limits</Li>
              <Li>To process payments and manage subscriptions via Razorpay</Li>
              <Li>To send transactional emails (account confirmation, payment receipts)</Li>
              <Li>To investigate abuse and respond to legal requests</Li>
              <Li>To improve the platform based on aggregated, anonymized usage patterns</Li>
            </ul>
            <p className="mt-4 text-slate-500">
              We do not use your scan data to train AI models. We do not serve advertising.
              We do not sell or rent your personal data to any third party.
            </p>
          </Section>

          <Section title="4. Data Sharing">
            <p>We share data only in these specific circumstances:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>
                <span className="text-slate-300">Razorpay</span> — payment processing.
                Razorpay receives your payment details and is subject to their own privacy policy.
              </Li>
              <Li>
                <span className="text-slate-300">AI providers (Anthropic/OpenAI)</span> — scan findings
                are sent to AI APIs for analysis. We send only structured finding data, not your
                personal details. These providers process data under their own policies.
              </Li>
              <Li>
                <span className="text-slate-300">Law enforcement</span> — we may disclose data when
                required by a valid court order, subpoena, or legal obligation. We will notify you
                unless prohibited by law.
              </Li>
            </ul>
            <p className="mt-4 text-slate-500">
              We have no advertising partners and do not share data for marketing purposes.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <ul className="space-y-2 ml-4">
              <Li>Account data: retained until you delete your account</Li>
              <Li>Scan history and findings: retained for 1 year, then automatically purged</Li>
              <Li>Payment records: retained for 7 years as required by Indian tax law</Li>
              <Li>Audit logs (IP, timestamps): retained for 90 days</Li>
              <Li>Deleted accounts: all personal data removed within 30 days of deletion request</Li>
            </ul>
          </Section>

          <Section title="6. Data Security">
            <p>
              We protect your data using industry-standard measures:
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Passwords are hashed using bcrypt — never stored in plaintext</Li>
              <Li>All API communication uses HTTPS/TLS encryption</Li>
              <Li>JWT tokens expire after 8 hours; refresh tokens after 7 days</Li>
              <Li>Database access is restricted to the application server only</Li>
              <Li>Scan data is isolated per user — you cannot access other users' scans</Li>
            </ul>
            <p className="mt-4 text-slate-500">
              No system is perfectly secure. If you discover a security issue, please report it
              responsibly to <a href="mailto:admin@xcloak.tech" className="text-accent hover:underline">admin@xcloak.tech</a>.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the following rights regarding your personal data:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>
                <span className="text-slate-300">Access</span> — request a copy of the personal data
                we hold about you
              </Li>
              <Li>
                <span className="text-slate-300">Correction</span> — update inaccurate account information
                via Settings
              </Li>
              <Li>
                <span className="text-slate-300">Deletion</span> — request deletion of your account and
                associated data
              </Li>
              <Li>
                <span className="text-slate-300">Export</span> — download your scan history and findings
                in JSON or PDF format
              </Li>
              <Li>
                <span className="text-slate-300">Objection</span> — object to processing for purposes
                other than service delivery
              </Li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
              We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Cookies and Local Storage">
            <p>We use minimal storage:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>
                <span className="text-slate-300">eso_token</span> (cookie) — your authentication token,
                expires after 1 day
              </Li>
              <Li>
                <span className="text-slate-300">eso_user</span> (localStorage) — cached profile
                data for the sidebar; cleared on logout
              </Li>
              <Li>No advertising cookies. No tracking pixels. No analytics scripts.</Li>
            </ul>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Service is not directed at children under 18. We do not knowingly collect personal
              data from minors. If you believe a minor has registered, contact us immediately at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>{' '}
              and we will delete the account.
            </p>
          </Section>

          <Section title="10. International Transfers">
            <p>
              Our servers are currently located in Germany (Hetzner). Your data may be processed by
              AI providers whose infrastructure is in the United States. By using the Service, you
              consent to this transfer. We ensure adequate safeguards are in place with all
              international processors.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify registered users
              by email at least 14 days before material changes take effect. The "Last updated" date
              at the top of this page always reflects the most recent version.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For privacy questions, data requests, or concerns:
            </p>
            <div className="mt-3 space-y-1 ml-4 text-slate-500">
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a></p>
              <p>Security issues: <a href="mailto:admin@xcloak.tech" className="text-accent hover:underline">admin@xcloak.tech</a></p>
              <p>Billing: <a href="mailto:admin@xcloak.tech" className="text-accent hover:underline">admin@xcloak.tech</a></p>
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[10px]">
            <Link href="/terms" className="text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</Link>
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

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 text-accent text-[9px] flex-shrink-0">✓</span>
      <span>{children}</span>
    </li>
  )
}
