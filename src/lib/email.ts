/**
 * email.ts — Transactional email via Resend REST API
 * Set RESEND_API_KEY in your .env to activate.
 * Falls back to console.log in dev if key is missing.
 *
 * Usage:
 *   import { sendEmail } from '@/lib/email'
 *   await sendEmail({ to, subject, html })
 */

const FROM = process.env.EMAIL_FROM ?? 'XCloak <admin@xcloak.tech>'
const API_KEY = process.env.RESEND_API_KEY ?? ''

interface EmailPayload {
  to:      string | string[]
  subject: string
  html:    string
  replyTo?: string
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!API_KEY) {
    // Dev fallback — just log
    console.log('[email] No RESEND_API_KEY — would have sent:', payload.subject, '→', payload.to)
    return false
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:     FROM,
        to:       Array.isArray(payload.to) ? payload.to : [payload.to],
        subject:  payload.subject,
        html:     payload.html,
        reply_to: payload.replyTo,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[email] Resend error:', err)
      return false
    }
    return true
  } catch (e) {
    console.error('[email] fetch failed:', e)
    return false
  }
}

// ── Email Templates ───────────────────────────────────────────────────────────

const base = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { margin:0; padding:0; background:#03050a; font-family:'Courier New',monospace; color:#e2e8f0; }
    .wrap { max-width:560px; margin:0 auto; padding:32px 16px; }
    .card { background:#0a0f1a; border:1px solid rgba(0,255,170,0.15); border-radius:16px; overflow:hidden; }
    .header { background:linear-gradient(135deg,rgba(0,255,170,0.08),rgba(0,170,255,0.05));
              padding:28px 32px; border-bottom:1px solid rgba(255,255,255,0.06); }
    .logo { font-size:20px; font-weight:900; letter-spacing:-0.5px; color:#e2e8f0; }
    .logo span { color:#00ffaa; }
    .body { padding:28px 32px; }
    .btn { display:inline-block; padding:12px 28px; border-radius:10px;
           background:rgba(0,255,170,0.1); border:1px solid rgba(0,255,170,0.3);
           color:#00ffaa; text-decoration:none; font-weight:700; font-size:12px;
           letter-spacing:0.05em; margin-top:20px; }
    .footer { padding:16px 32px; border-top:1px solid rgba(255,255,255,0.05);
              font-size:10px; color:#334155; text-align:center; }
    h2 { font-size:18px; font-weight:900; color:#f1f5f9; margin:0 0 12px 0; }
    p  { font-size:12px; line-height:1.7; color:#94a3b8; margin:0 0 10px 0; }
    .tag { display:inline-block; padding:2px 8px; border-radius:20px; font-size:10px;
           font-weight:700; letter-spacing:0.1em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="header">
        <div class="logo">X<span>cloak</span></div>
        <p style="font-size:10px;color:#475569;margin:4px 0 0 0;letter-spacing:0.15em;">AI-POWERED SECURITY PLATFORM</p>
      </div>
      <div class="body">${content}</div>
      <div class="footer">
        © ${new Date().getFullYear()} XCloak · <a href="https://xcloak.tech" style="color:#475569;">xcloak.tech</a> ·
        <a href="https://xcloak.tech/unsubscribe" style="color:#475569;">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`

export const templates = {

  welcome: (username: string) => ({
    subject: '🛡 Welcome to XCloak — your security journey starts now',
    html: base(`
      <h2>Welcome, ${username}!</h2>
      <p>Your XCloak account is ready. You now have access to:</p>
      <ul style="font-size:12px;color:#94a3b8;line-height:2;padding-left:20px;">
        <li>🔭 <strong style="color:#e2e8f0">AI-powered scanner</strong> — 3 free scans/day</li>
        <li>📡 <strong style="color:#e2e8f0">Live CVE tracker</strong> — real-time vulnerability feed</li>
        <li>💉 <strong style="color:#e2e8f0">Exploit database</strong> — community-vetted PoCs</li>
        <li>🏆 <strong style="color:#e2e8f0">CTF challenges</strong> — sharpen your skills</li>
        <li>📚 <strong style="color:#e2e8f0">Learning paths</strong> — from beginner to red team</li>
      </ul>
      <a href="https://xcloak.tech/scan" class="btn">Start your first scan →</a>
    `),
  }),

  exploitApproved: (username: string, title: string) => ({
    subject: `✅ Your exploit "${title}" is now live`,
    html: base(`
      <h2>Exploit Approved!</h2>
      <p>Your submission <strong style="color:#00ffaa">${title}</strong> has been reviewed and approved by our team.</p>
      <p>It's now live in the exploit database for the community to use and learn from.</p>
      <a href="https://xcloak.tech/exploits" class="btn">View exploit →</a>
    `),
  }),

  exploitRejected: (username: string, title: string, reason: string) => ({
    subject: `❌ Exploit submission update: "${title}"`,
    html: base(`
      <h2>Submission Not Approved</h2>
      <p>Unfortunately, your exploit <strong style="color:#ff3a5c">${title}</strong> was not approved.</p>
      ${reason ? `<p><strong style="color:#e2e8f0">Reason:</strong> ${reason}</p>` : ''}
      <p>You're welcome to revise and resubmit. Check our submission guidelines for more info.</p>
      <a href="https://xcloak.tech/exploits/upload" class="btn">Resubmit →</a>
    `),
  }),

  ctfSolved: (username: string, challengeTitle: string, points: number) => ({
    subject: `🏆 CTF Solved: ${challengeTitle} (+${points} pts)`,
    html: base(`
      <h2>Challenge Complete!</h2>
      <p>You solved <strong style="color:#facc15">${challengeTitle}</strong> and earned
         <span class="tag" style="background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);color:#facc15;">+${points} points</span></p>
      <p>Keep going — more challenges await on the leaderboard.</p>
      <a href="https://xcloak.tech/ctf" class="btn">Next challenge →</a>
    `),
  }),

  learningPathApproved: (username: string, pathTitle: string) => ({
    subject: `🎉 Your learning path "${pathTitle}" is live!`,
    html: base(`
      <h2>Path Approved!</h2>
      <p>Your learning path <strong style="color:#00ffaa">${pathTitle}</strong> has been approved and is now live for the community.</p>
      <p>Other learners can now enroll, follow your modules, and earn XP from your content.</p>
      <a href="https://xcloak.tech/learn" class="btn">View your path →</a>
    `),
  }),

  learningPathRejected: (username: string, pathTitle: string, reason: string) => ({
    subject: `Learning path update: "${pathTitle}"`,
    html: base(`
      <h2>Path Not Approved</h2>
      <p>Your learning path <strong style="color:#ff3a5c">${pathTitle}</strong> needs some changes before it can go live.</p>
      ${reason ? `<p><strong style="color:#e2e8f0">Feedback:</strong> ${reason}</p>` : ''}
      <a href="https://xcloak.tech/learn" class="btn">Edit and resubmit →</a>
    `),
  }),

  ctfApproved: (username: string, challengeTitle: string) => ({
    subject: `✅ CTF Challenge approved: "${challengeTitle}"`,
    html: base(`
      <h2>CTF Challenge Live!</h2>
      <p>Your challenge <strong style="color:#00ffaa">${challengeTitle}</strong> has been approved and is now live.</p>
      <p>The community can now attempt to solve it and earn points!</p>
      <a href="https://xcloak.tech/ctf" class="btn">View challenge →</a>
    `),
  }),

  scanComplete: (username: string, target: string, findings: number) => ({
    subject: `🔍 Scan complete: ${target} — ${findings} finding${findings !== 1 ? 's' : ''}`,
    html: base(`
      <h2>Scan Complete</h2>
      <p>Your scan of <strong style="color:#00aaff">${target}</strong> has finished.</p>
      <p>We found <span class="tag" style="background:rgba(255,58,92,0.1);border:1px solid rgba(255,58,92,0.25);color:#ff3a5c;">${findings} finding${findings !== 1 ? 's' : ''}</span>. Review them in your dashboard.</p>
      <a href="https://xcloak.tech/findings" class="btn">View findings →</a>
    `),
  }),

  passwordReset: (username: string, resetLink: string) => ({
    subject: '🔑 Reset your XCloak password',
    html: base(`
      <h2>Password Reset</h2>
      <p>We received a request to reset the password for <strong style="color:#e2e8f0">${username}</strong>.</p>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      <a href="${resetLink}" class="btn">Reset password →</a>
    `),
  }),

}
