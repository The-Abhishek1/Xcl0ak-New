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
      tpl = templates.scanComplete(username, data?.target ?? 'Unknown', data?.findings ?? 0)
      break
    case 'password_reset':
      tpl = templates.passwordReset(username, data?.resetLink ?? '')
      break
    default:
      return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 })
  }

  const ok = await sendEmail({ to, ...tpl })
  return NextResponse.json({ ok })
}
