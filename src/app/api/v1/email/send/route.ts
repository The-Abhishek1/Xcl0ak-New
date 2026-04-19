/**
 * Internal email endpoint — called by ESO backend to trigger emails.
 * Protected by XCLOAK_INTERNAL_SECRET env var.
 */
import { NextRequest, NextResponse } from 'next/server'
import {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPaymentEmail,
  sendScanCompleteEmail,
} from '@/lib/email'

export async function POST(req: NextRequest) {
  // Verify internal secret
  const secret = req.headers.get('x-internal-secret')
  if (secret !== (process.env.XCLOAK_INTERNAL_SECRET ?? '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { type, to, ...data } = await req.json()

  if (!to || !type) {
    return NextResponse.json({ error: 'type and to required' }, { status: 400 })
  }

  try {
    switch (type) {
      case 'welcome':
        await sendWelcomeEmail(to, data.username)
        break
      case 'password_reset':
        await sendPasswordResetEmail(to, data.username, data.resetUrl)
        break
      case 'payment':
        await sendPaymentEmail(to, data.username, data.tier, data.amount, data.paymentId)
        break
      case 'scan_complete':
        await sendScanCompleteEmail(to, data.username, data.target, data.scanId, data.riskLevel, data.findingsCount)
        break
      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[email/send]', e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
