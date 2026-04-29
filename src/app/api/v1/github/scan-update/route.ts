/**
 * POST /api/v1/github/scan-update
 * Internal callback — ESO calls this when a SAST scan completes.
 * Updates the RepoScan record in Prisma and notifies the user.
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
  const secret = req.headers.get('x-internal-secret')
  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { scanId, status, findings, criticals, highs, result, error } = await req.json()
  if (!scanId || !status) {
    return NextResponse.json({ error: 'scanId and status required' }, { status: 400 })
  }

  try {
    const scan = await prisma.repoScan.update({
      where: { id: scanId },
      data: {
        status,
        findings:    findings   ?? undefined,
        criticals:   criticals  ?? undefined,
        highs:       highs      ?? undefined,
        result:      result     ?? undefined,
        error:       error      ?? undefined,
        startedAt:   status === 'running'   ? new Date() : undefined,
        completedAt: ['completed', 'failed'].includes(status) ? new Date() : undefined,
      },
      include: { repo: { include: { connection: true } } },
    })

    // Update lastScannedAt on the repo
    if (status === 'completed') {
      await prisma.gitHubRepo.update({
        where: { id: scan.repoId },
        data:  { lastScannedAt: new Date() },
      })
    }

    // Notify the user
    if (status === 'completed' && scan.repo?.connection?.userAlias) {
      const alias    = scan.repo.connection.userAlias
      const repoName = scan.repo.fullName
      const count    = findings ?? 0
      const hasCrit  = (criticals ?? 0) > 0

      await prisma.notification.create({
        data: {
          userAlias: alias,
          type:  'scan_complete',
          title: count === 0
            ? `✅ ${repoName} — clean scan`
            : `${hasCrit ? '🔴' : '🟠'} ${repoName} — ${count} finding${count !== 1 ? 's' : ''}`,
          body: count === 0
            ? `Semgrep + Trufflehog found no issues in your latest push.`
            : `${criticals ?? 0} critical, ${highs ?? 0} high severity. Check your GitHub page for details.`,
          link: '/github',
        },
      }).catch(() => null)

      // Send email if critical findings
      if (hasCrit) {
        sendCriticalFindingEmail(alias, repoName, criticals ?? 0, findings ?? 0).catch(() => null)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[scan-update] failed:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

async function sendCriticalFindingEmail(
  alias:     string,
  repoName:  string,
  criticals: number,
  total:     number,
) {
  try {
    const ESO    = process.env.ESO_API_URL ?? 'http://localhost:8000'
    const secret = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'
    // Get user email from ESO
    const emailRes = await fetch(
      `${ESO}/api/v1/admin/users/email?alias=${encodeURIComponent(alias)}`,
      { headers: { 'X-Internal-Secret': secret } },
    )
    if (!emailRes.ok) return
    const { email, username } = await emailRes.json()

    const { sendEmail } = await import('@/lib/email')
    await sendEmail({
      to:      email,
      subject: `🔴 Critical vulnerabilities in ${repoName}`,
      html: `
        <div style="font-family:'Courier New',monospace;background:#03050a;padding:32px;color:#e2e8f0;">
          <div style="max-width:560px;margin:0 auto;">
            <div style="font-size:20px;font-weight:900;color:#00ffaa;margin-bottom:8px;">XCloak SAST Alert</div>
            <p style="color:#94a3b8;font-size:13px;">Hi ${username},</p>
            <p style="color:#94a3b8;font-size:13px;">
              XCloak found <strong style="color:#ff3a5c">${criticals} critical</strong> and
              <strong style="color:#e2e8f0">${total} total</strong> security issues in
              <strong style="color:#00aaff">${repoName}</strong>.
            </p>
            <a href="https://xcloak.tech/github"
               style="display:inline-block;margin-top:16px;padding:12px 24px;background:rgba(255,58,92,0.12);
                      border:1px solid rgba(255,58,92,0.35);border-radius:10px;color:#ff3a5c;
                      font-size:13px;font-weight:700;text-decoration:none;">
              View findings →
            </a>
            <p style="margin-top:24px;font-size:10px;color:#334155;">
              XCloak Security Platform · <a href="https://xcloak.tech" style="color:#475569;">xcloak.tech</a>
            </p>
          </div>
        </div>
      `,
    })
  } catch (e) {
    console.error('[scan-update] email failed:', e)
  }
}
