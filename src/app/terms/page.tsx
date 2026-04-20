import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service — XCloak' }

const LAST_UPDATED = 'April 20, 2026'
const CONTACT_EMAIL = 'admin@xcloak.tech'

export default function TermsPage() {
  return (
    <div className="min-h-screen px-5 py-16" style={{ background: '#03050a' }}>
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <Link href="/" className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors">
            ← Back to XCloak
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Terms of Service</h1>
          <p className="font-mono text-[11px] text-slate-600">
            Last updated: {LAST_UPDATED} · Questions?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>
          </p>
        </div>

        {/* Summary */}
        <div className="glass p-5 mb-8 rounded-xl" style={{ borderColor: 'rgba(0,255,170,0.2)', background: 'rgba(0,255,170,0.03)' }}>
          <p className="font-mono text-[11px] font-bold text-slate-300 mb-2">Summary (plain English)</p>
          <div className="space-y-1.5">
            {[
              'Only scan targets you own or have explicit written permission to test',
              'Do not use XCloak for illegal activities or to harm others',
              'Subscriptions renew monthly — cancel anytime from your dashboard',
              'We can suspend accounts that violate these terms',
              'By using XCloak you agree to these terms',
            ].map(s => (
              <div key={s} className="flex items-start gap-2 font-mono text-[11px] text-slate-500">
                <span className="text-accent text-[9px] mt-0.5 flex-shrink-0">✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 font-mono text-[12px] text-slate-400 leading-7">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using XCloak ("the Service"), you agree to be bound by these Terms of Service.
              If you do not agree, do not use the Service. These terms apply to all users including
              free, Pro, and Enterprise tier accounts.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>You must be at least 18 years old to use the Service. By registering, you confirm that:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>You are 18 or older</Li>
              <Li>You have the legal capacity to enter into a binding agreement</Li>
              <Li>You are not prohibited from using the Service under applicable law</Li>
              <Li>All information you provide is accurate and complete</Li>
            </ul>
          </Section>

          <Section title="3. Permitted Use — Authorisation Requirement">
            <p className="text-red-400 font-bold mb-3">
              ⚠️ You must only scan targets you own or have explicit written authorisation to test.
            </p>
            <p>Permitted uses include:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Scanning your own servers, domains, and applications</Li>
              <Li>Scanning client systems under a signed penetration testing agreement</Li>
              <Li>Scanning systems explicitly listed in a bug bounty program scope</Li>
              <Li>Using CTF challenges and learning resources for education</Li>
              <Li>Accessing the exploit database and CVE tracker for research</Li>
            </ul>
            <p className="mt-4">
              Unauthorised scanning is illegal under the Information Technology Act 2000 (India),
              the Computer Fraud and Abuse Act (USA), and equivalent laws worldwide.
              XCloak is not responsible for misuse of the platform.
            </p>
          </Section>

          <Section title="4. Prohibited Activities">
            <p>You must not use the Service to:</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Scan systems you do not own or lack authorisation to test</Li>
              <Li>Launch denial-of-service attacks or disrupt services</Li>
              <Li>Distribute malware, ransomware, or any malicious software</Li>
              <Li>Access, exfiltrate, or tamper with third-party data without permission</Li>
              <Li>Bypass authentication or security controls of systems without authorisation</Li>
              <Li>Use the platform to harass, threaten, or harm individuals</Li>
              <Li>Share your account credentials with others</Li>
              <Li>Attempt to reverse-engineer, scrape, or abuse the XCloak API</Li>
              <Li>Circumvent scan quotas or payment requirements via technical means</Li>
            </ul>
            <p className="mt-4">
              We reserve the right to suspend or terminate accounts engaged in prohibited activities
              without notice and to report illegal activity to relevant authorities.
            </p>
          </Section>

          <Section title="5. Subscriptions and Payments">
            <p>XCloak offers a free tier and paid subscription plans (Pro and Enterprise).</p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Paid subscriptions are billed monthly in advance</Li>
              <Li>Payments are processed by our payment partners — we do not store card details</Li>
              <Li>Subscriptions automatically renew unless cancelled before the billing date</Li>
              <Li>You can cancel your subscription at any time from your account dashboard</Li>
              <Li>Downgrading takes effect at the end of the current billing period</Li>
              <Li>We reserve the right to change pricing with 30 days notice to subscribers</Li>
            </ul>
          </Section>

          <Section title="6. Refunds">
            <p>
              Please refer to our{' '}
              <Link href="/refund" className="text-accent hover:underline">Refund and Cancellation Policy</Link>{' '}
              for full details on refund eligibility and the process.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              The XCloak platform, including its source code, design, trademarks, and content,
              is owned by XCloak and protected by applicable intellectual property laws.
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>You may not copy, redistribute, or create derivative works from the platform</Li>
              <Li>Community-contributed content (exploits, CTF writeups) remains the intellectual property of the contributor</Li>
              <Li>By submitting content, you grant XCloak a non-exclusive licence to display it on the platform</Li>
            </ul>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind.
              We do not warrant that the Service will be uninterrupted, error-free, or that
              scan results will be complete or accurate. Security scanning has inherent limitations —
              a clean scan result does not mean a target is fully secure.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, XCloak shall not be liable for any indirect,
              incidental, consequential, or punitive damages arising from your use of the Service,
              including but not limited to damages resulting from scan results, data loss, or
              unauthorised access to your account.
            </p>
            <p className="mt-3">
              Our total liability to you for any claim shall not exceed the amount you paid us in
              the 3 months preceding the claim.
            </p>
          </Section>

          <Section title="10. Indemnification">
            <p>
              You agree to indemnify and hold harmless XCloak, its operators, and affiliates from
              any claims, damages, or expenses (including legal fees) arising from your use of the
              Service, violation of these Terms, or infringement of any third-party rights.
            </p>
          </Section>

          <Section title="11. Account Termination">
            <p>
              We may suspend or terminate your account without notice if you violate these Terms.
              You may delete your account at any time from Settings. Upon termination:
            </p>
            <ul className="mt-3 space-y-2 ml-4">
              <Li>Your access to the Service ends immediately</Li>
              <Li>Scan history and findings will be deleted within 30 days</Li>
              <Li>Payment records are retained for 7 years per Indian tax law</Li>
              <Li>Pending subscription refunds are handled per our Refund Policy</Li>
            </ul>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms are governed by the laws of India. Any disputes shall be subject to
              the exclusive jurisdiction of courts in Karnataka, India.
            </p>
          </Section>

          <Section title="13. Changes to Terms">
            <p>
              We may update these Terms from time to time. We will notify registered users by email
              at least 14 days before material changes take effect. Continued use of the Service
              after changes constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="14. Contact">
            <p>For questions about these Terms:</p>
            <div className="mt-3 space-y-1 ml-4 text-slate-500">
              <p>Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a></p>
              <p>Phone: <a href="tel:+916366652685" className="text-accent hover:underline">+91 63666 52685</a></p>
              <p>Address: Karnataka, India</p>
            </div>
          </Section>

        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-wrap gap-4 justify-between items-center">
          <p className="font-mono text-[10px] text-slate-700">
            © {new Date().getFullYear()} XCloak. All rights reserved.
          </p>
          <div className="flex gap-4 font-mono text-[10px]">
            <Link href="/privacy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/refund" className="text-slate-600 hover:text-slate-400 transition-colors">Refund Policy</Link>
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
      <span className="mt-1 text-accent text-[9px] flex-shrink-0">✓</span>
      <span>{children}</span>
    </li>
  )
}
