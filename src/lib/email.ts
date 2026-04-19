/**
 * email.ts — XCloak transactional email system
 * Uses Hostinger SMTP (smtp.hostinger.com:465)
 * All emails sent from admin@xcloak.tech
 */

import nodemailer from 'nodemailer'

const FROM = 'XCloak <admin@xcloak.tech>'

// ── SMTP Transport ────────────────────────────────────────────────────────────
function getTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST     ?? 'smtp.hostinger.com',
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER     ?? 'admin@xcloak.tech',
      pass: process.env.SMTP_PASSWORD ?? '',
    },
  })
}

// ── Base HTML wrapper ─────────────────────────────────────────────────────────
function wrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="margin:0;padding:0;background:#0a0d14;font-family:'Courier New',monospace;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0d14;padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#0f1219;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;max-width:560px;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#00ffaa10,#00aaff08);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <span style="font-size:22px;font-weight:900;color:#00ffaa;letter-spacing:-0.5px;">X<span style="color:#e2e8f0;">cloak</span></span>
    <span style="display:block;font-size:10px;color:#475569;letter-spacing:3px;text-transform:uppercase;margin-top:2px;">Security Intelligence Platform</span>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:32px;">
    ${body}
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2);">
    <p style="margin:0;font-size:10px;color:#334155;line-height:1.6;">
      You're receiving this because you have an account at <a href="https://xcloak.tech" style="color:#00ffaa;text-decoration:none;">xcloak.tech</a><br>
      Questions? Reply to this email or contact <a href="mailto:admin@xcloak.tech" style="color:#00ffaa;text-decoration:none;">admin@xcloak.tech</a>
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`
}

function h1(text: string) {
  return `<h1 style="margin:0 0 8px;font-size:20px;font-weight:900;color:#e2e8f0;">${text}</h1>`
}
function p(text: string) {
  return `<p style="margin:12px 0;font-size:14px;color:#94a3b8;line-height:1.7;">${text}</p>`
}
function badge(text: string, color = '#00ffaa') {
  return `<span style="display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:700;background:${color}18;color:${color};border:1px solid ${color}30;">${text}</span>`
}
function btn(text: string, url: string, color = '#00ffaa') {
  return `<a href="${url}" style="display:inline-block;margin-top:20px;padding:12px 28px;background:${color}15;border:1px solid ${color}40;border-radius:10px;color:${color};font-size:13px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">${text} →</a>`
}
function divider() {
  return `<hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0;">`
}
function stat(label: string, value: string, color = '#00ffaa') {
  return `<td style="text-align:center;padding:16px 8px;">
    <div style="font-size:22px;font-weight:900;color:${color};">${value}</div>
    <div style="font-size:9px;color:#475569;text-transform:uppercase;letter-spacing:2px;margin-top:4px;">${label}</div>
  </td>`
}

// ── Core send function ────────────────────────────────────────────────────────
async function send(to: string, subject: string, html: string) {
  if (!process.env.SMTP_PASSWORD) {
    console.warn('[email] SMTP_PASSWORD not set — email not sent to', to)
    return
  }
  try {
    const t = getTransport()
    await t.sendMail({ from: FROM, to, subject, html })
    console.log(`[email] ✓ sent "${subject}" to ${to}`)
  } catch (e: any) {
    console.error(`[email] ✗ failed to send "${subject}" to ${to}:`, e.message)
  }
}

// ════════════════════════════════════════════════════════════════════════════
// TEMPLATES
// ════════════════════════════════════════════════════════════════════════════

/** 1. Welcome email on registration */
export async function sendWelcomeEmail(to: string, username: string) {
  const html = wrap('Welcome to XCloak', `
    ${h1('Welcome to XCloak 👋')}
    ${p(`Hey <strong style="color:#e2e8f0;">${username}</strong>, you're in.`)}
    ${p('XCloak gives you AI-powered security scanning, live CVE tracking, a CTF platform, and a community exploit database — all in one place.')}
    ${divider()}
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      ${stat('Security Tools', '7', '#00ffaa')}
      ${stat('CVEs Tracked', '∞', '#00aaff')}
      ${stat('Free Scans/day', '3', '#a78bfa')}
    </tr></table>
    ${divider()}
    ${p('Start with a free scan or explore the CTF challenges to earn reputation points.')}
    ${btn('Start Scanning', 'https://xcloak.tech/scan/new')}
    &nbsp;
    ${btn('Browse CTF', 'https://xcloak.tech/ctf', '#a78bfa')}
  `)
  await send(to, 'Welcome to XCloak — Start Scanning', html)
}

/** 2. Password reset */
export async function sendPasswordResetEmail(to: string, username: string, resetUrl: string) {
  const html = wrap('Reset Your Password', `
    ${h1('Password Reset Request')}
    ${p(`Hey <strong style="color:#e2e8f0;">${username}</strong>, we received a request to reset your XCloak password.`)}
    ${p('Click the button below to set a new password. This link expires in <strong style="color:#ffd700;">30 minutes</strong>.')}
    ${btn('Reset Password', resetUrl, '#ff3a5c')}
    ${divider()}
    ${p('If you didn\'t request this, ignore this email — your password won\'t change.')}
    <p style="margin:12px 0;font-size:11px;color:#475569;">Link not working? Copy this URL: <span style="color:#64748b;">${resetUrl}</span></p>
  `)
  await send(to, 'XCloak — Reset your password', html)
}

/** 3. CTF solved */
export async function sendCTFSolvedEmail(to: string, username: string, challengeTitle: string, points: number, totalRep: number) {
  const html = wrap('CTF Challenge Solved', `
    ${h1('🚩 Flag Captured!')}
    ${badge('CTF SOLVE', '#ffd700')}
    ${p(`Nice work, <strong style="color:#e2e8f0;">${username}</strong>! You solved a challenge.`)}
    <div style="background:rgba(255,215,0,0.05);border:1px solid rgba(255,215,0,0.2);border-radius:10px;padding:16px 20px;margin:16px 0;">
      <div style="font-size:16px;font-weight:700;color:#ffd700;">${challengeTitle}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:6px;">+${points} reputation points earned</div>
    </div>
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      ${stat('Points Earned', `+${points}`, '#ffd700')}
      ${stat('Total Reputation', String(totalRep), '#00ffaa')}
    </tr></table>
    ${btn('View Leaderboard', 'https://xcloak.tech/leaderboard', '#ffd700')}
    ${btn('More Challenges', 'https://xcloak.tech/ctf', '#a78bfa')}
  `)
  await send(to, `🚩 XCloak CTF — You solved "${challengeTitle}"`, html)
}

/** 4. Exploit submitted (pending review) */
export async function sendExploitSubmittedEmail(to: string, username: string, exploitTitle: string) {
  const html = wrap('Exploit Submitted', `
    ${h1('Exploit Submitted for Review')}
    ${badge('PENDING REVIEW', '#00aaff')}
    ${p(`Thanks <strong style="color:#e2e8f0;">${username}</strong>! Your exploit is in the review queue.`)}
    <div style="background:rgba(0,170,255,0.05);border:1px solid rgba(0,170,255,0.2);border-radius:10px;padding:16px 20px;margin:16px 0;">
      <div style="font-size:15px;font-weight:700;color:#00aaff;">${exploitTitle}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:6px;">Status: Pending admin review</div>
    </div>
    ${p("We'll email you when it's approved and goes live. Approved exploits earn <strong style=\"color:#00ffaa;\">+50 reputation points</strong>.")}
    ${btn('View Your Exploits', 'https://xcloak.tech/exploits', '#00aaff')}
  `)
  await send(to, `XCloak — Exploit "${exploitTitle}" submitted`, html)
}

/** 5. Exploit approved */
export async function sendExploitApprovedEmail(to: string, username: string, exploitTitle: string, exploitId: string) {
  const html = wrap('Exploit Approved', `
    ${h1('✅ Exploit Approved & Live')}
    ${badge('APPROVED', '#00ffaa')}
    ${p(`Your exploit is now live on XCloak, <strong style="color:#e2e8f0;">${username}</strong>!`)}
    <div style="background:rgba(0,255,170,0.04);border:1px solid rgba(0,255,170,0.2);border-radius:10px;padding:16px 20px;margin:16px 0;">
      <div style="font-size:15px;font-weight:700;color:#00ffaa;">${exploitTitle}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:6px;">+50 reputation points added to your account</div>
    </div>
    ${p('The community can now view, vote on, and comment on your work.')}
    ${btn('View Your Exploit', `https://xcloak.tech/exploits/${exploitId}`)}
  `)
  await send(to, `✅ XCloak — "${exploitTitle}" is now live`, html)
}

/** 6. CTF challenge approved */
export async function sendCTFApprovedEmail(to: string, username: string, challengeTitle: string) {
  const html = wrap('CTF Challenge Approved', `
    ${h1('🏆 CTF Challenge Approved')}
    ${badge('LIVE', '#00ffaa')}
    ${p(`Your CTF challenge is now live, <strong style="color:#e2e8f0;">${username}</strong>!`)}
    <div style="background:rgba(0,255,170,0.04);border:1px solid rgba(0,255,170,0.2);border-radius:10px;padding:16px 20px;margin:16px 0;">
      <div style="font-size:15px;font-weight:700;color:#00ffaa;">${challengeTitle}</div>
      <div style="font-size:12px;color:#94a3b8;margin-top:6px;">+30 reputation points added · Challenge is now solvable</div>
    </div>
    ${btn('View CTF Board', 'https://xcloak.tech/ctf')}
  `)
  await send(to, `🏆 XCloak CTF — "${challengeTitle}" is live`, html)
}

/** 7. Scan complete */
export async function sendScanCompleteEmail(to: string, username: string, target: string, scanId: string, riskLevel: string, findingsCount: number) {
  const riskColor = riskLevel === 'critical' ? '#ff3a5c' : riskLevel === 'high' ? '#ff8c42' : riskLevel === 'medium' ? '#ffd700' : '#00ffaa'
  const html = wrap('Scan Complete', `
    ${h1('⚡ Scan Complete')}
    ${badge(riskLevel.toUpperCase(), riskColor)}
    ${p(`Your security scan of <strong style="color:#e2e8f0;">${target}</strong> has finished, <strong style="color:#e2e8f0;">${username}</strong>.`)}
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      ${stat('Risk Level', riskLevel.toUpperCase(), riskColor)}
      ${stat('Findings', String(findingsCount), '#ff8c42')}
      ${stat('Tools Used', '7', '#00aaff')}
    </tr></table>
    ${divider()}
    ${btn('View Full Report', `https://xcloak.tech/scan/${scanId}`)}
  `)
  await send(to, `⚡ XCloak Scan — ${target} scan complete (${riskLevel.toUpperCase()})`, html)
}

/** 8. Payment / plan upgrade */
export async function sendPaymentEmail(to: string, username: string, tier: string, amount: number, paymentId: string) {
  const tierColor = tier === 'enterprise' ? '#a78bfa' : '#00aaff'
  const html = wrap('Payment Confirmed', `
    ${h1('💳 Payment Confirmed')}
    ${badge(tier.toUpperCase() + ' PLAN', tierColor)}
    ${p(`Thanks <strong style="color:#e2e8f0;">${username}</strong>! Your payment was successful.`)}
    <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px;margin:16px 0;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="font-size:12px;color:#64748b;padding:4px 0;">Plan</td><td style="font-size:12px;color:#e2e8f0;text-align:right;font-weight:700;text-transform:capitalize;">${tier}</td></tr>
        <tr><td style="font-size:12px;color:#64748b;padding:4px 0;">Amount</td><td style="font-size:14px;color:#00ffaa;text-align:right;font-weight:900;">₹${(amount/100).toLocaleString('en-IN')}</td></tr>
        <tr><td style="font-size:12px;color:#64748b;padding:4px 0;">Payment ID</td><td style="font-size:10px;color:#475569;text-align:right;">${paymentId}</td></tr>
      </table>
    </div>
    ${p('Your account has been upgraded. All Pro features are now active.')}
    ${btn('Start Scanning', 'https://xcloak.tech/scan/new', tierColor)}
  `)
  await send(to, `💳 XCloak — Payment confirmed — ${tier.toUpperCase()} plan active`, html)
}

/** 9. Weekly report (every Sunday) */
export async function sendWeeklyReport(to: string, username: string, stats: {
  scans: number, findings: number, ctfSolves: number, exploitsUploaded: number
  reputation: number, rank: number, topCVEs: string[]
}) {
  const html = wrap('Your Weekly XCloak Report', `
    ${h1('📊 Weekly Security Report')}
    ${p(`Here's your activity summary for the week, <strong style="color:#e2e8f0;">${username}</strong>.`)}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;"><tr>
      ${stat('Scans Run', String(stats.scans), '#00ffaa')}
      ${stat('Findings', String(stats.findings), '#ff8c42')}
      ${stat('CTF Solves', String(stats.ctfSolves), '#ffd700')}
      ${stat('Exploits', String(stats.exploitsUploaded), '#a78bfa')}
    </tr></table>
    ${divider()}
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      ${stat('Reputation', String(stats.reputation), '#00ffaa')}
      ${stat('Leaderboard Rank', `#${stats.rank}`, '#00aaff')}
    </tr></table>
    ${stats.topCVEs.length > 0 ? `
    ${divider()}
    <div style="font-size:10px;color:#475569;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Top CVEs This Week</div>
    ${stats.topCVEs.slice(0,3).map(cve =>
      `<div style="padding:8px 12px;margin:4px 0;background:rgba(255,58,92,0.05);border:1px solid rgba(255,58,92,0.15);border-radius:6px;font-size:12px;color:#ff8c42;">${cve}</div>`
    ).join('')}` : ''}
    ${divider()}
    ${btn('View Dashboard', 'https://xcloak.tech/dashboard')}
    ${btn('Run a Scan', 'https://xcloak.tech/scan/new', '#00aaff')}
  `)
  await send(to, `📊 XCloak Weekly Report — w/e ${new Date().toLocaleDateString('en-IN', {day:'numeric',month:'short'})}`, html)
}

/** Send admin copy of critical events */
export async function notifyAdmin(subject: string, body: string) {
  await send('admin@xcloak.tech', `[XCloak Admin] ${subject}`, wrap(subject, p(body)))
}
