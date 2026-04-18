/**
 * notify.ts — server-side helper to create notifications + system chat messages.
 * Called from API routes when events happen (CTF solve, exploit upload, payment, etc.)
 */
import { prisma } from '@/lib/prisma'

export type NotifType = 'cve_alert' | 'ctf_solve' | 'exploit_upload' | 'payment' | 'scan_complete' | 'system'

interface NotifyPayload {
  userAlias:  string
  type:       NotifType
  title:      string
  body:       string
  link?:      string
}

/** Create a personal notification for one user. */
export async function notifyUser(payload: NotifyPayload) {
  try {
    await prisma.notification.create({ data: payload })
  } catch (e) {
    console.error('[notify] failed:', e)
  }
}

/** Broadcast a system message to a chat room (visible to everyone). */
export async function broadcastToRoom(room: string, title: string, content: string) {
  try {
    await prisma.chatMessage.create({
      data: { room, alias: '🤖 system', tier: 'admin', content: `${title} — ${content}`, type: 'system' },
    })
  } catch (e) {
    console.error('[notify] broadcast failed:', e)
  }
}

/** Notify user + optionally post to a room. */
export async function notifyEvent(opts: {
  userAlias:  string
  type:       NotifType
  title:      string
  body:       string
  link?:      string
  broadcastRoom?: string   // if set, also post system message to this room
}) {
  const tasks: Promise<any>[] = [
    notifyUser({ userAlias: opts.userAlias, type: opts.type, title: opts.title, body: opts.body, link: opts.link }),
  ]
  if (opts.broadcastRoom) {
    tasks.push(broadcastToRoom(opts.broadcastRoom, opts.title, opts.body))
  }
  await Promise.allSettled(tasks)
}
