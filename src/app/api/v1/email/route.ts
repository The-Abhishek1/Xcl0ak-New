/**
 * POST /api/v1/email
 * Internal endpoint for ESO backend to trigger transactional emails.
 * Called after: register, scan complete, etc.
 * Secured by X-Internal-Secret header.
 */
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, templates } from '@/lib/email'

const SECRET = process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { event, to, username, data } = await req.json()

  if (!event || !to) {
    return NextResponse.json({ error: 'event and to are required' }, { status: 400 })
  }

  let tpl: { subject: string; html: string } | null = null

  switch (event) {
    case 'welcome':
      tpl = templates.welcome(username ?? to.split('@')[0])
      break
    case 'scan_complete':
      tpl = templates.scanComplete(username ?? to.split('@')[0], data?.target ?? 'Unknown', data?.findings ?? 0)
      break
    case 'password_reset':
      tpl = templates.passwordReset(username ?? to.split('@')[0], data?.resetLink ?? '')
      break
    case 'ctf_solved':
      tpl = templates.ctfSolved(username ?? to.split('@')[0], data?.challengeTitle ?? '', data?.points ?? 0)
      break
    case 'ctf_approved':
      tpl = templates.ctfApproved(username ?? to.split('@')[0], data?.challengeTitle ?? '')
      break
    case 'ctf_rejected':
      tpl = templates.ctfRejected(username ?? to.split('@')[0], data?.challengeTitle ?? '', data?.reason ?? '')
      break
    case 'exploit_approved':
      tpl = templates.exploitApproved(username ?? to.split('@')[0], data?.title ?? '')
      break
    case 'exploit_rejected':
      tpl = templates.exploitRejected(username ?? to.split('@')[0], data?.title ?? '', data?.reason ?? '')
      break
    case 'learning_path_approved':
      tpl = templates.learningPathApproved(username ?? to.split('@')[0], data?.pathTitle ?? '')
      break
    case 'learning_path_rejected':
      tpl = templates.learningPathRejected(username ?? to.split('@')[0], data?.pathTitle ?? '', data?.reason ?? '')
      break
    default:
      return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 })
  }

  const ok = await sendEmail({ to, ...tpl })
  return NextResponse.json({ ok })
}
