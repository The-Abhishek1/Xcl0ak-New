// src/app/api/v1/admin/leaderboard/route.ts  — NEW FILE (was missing)
import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const [users, exploitCounts, ctfSolves] = await Promise.all([
    prisma.user.findMany({ orderBy: { reputation: 'desc' }, take: 100 }),
    prisma.exploit.groupBy({ by: ['authorAlias'], _count: { id: true } }),
    prisma.cTFSolve.groupBy({ by: ['userAlias'], _count: { id: true } }),
  ])

  const exploitMap = Object.fromEntries(exploitCounts.map(e => [e.authorAlias, e._count.id]))
  const ctfMap     = Object.fromEntries(ctfSolves.map(e => [e.userAlias, e._count.id]))

  const ranked = users.map((u, i) => ({
    ...u,
    rank:      i + 1,
    exploits:  exploitMap[u.alias] ?? 0,
    ctfSolves: ctfMap[u.alias]     ?? 0,
  }))

  return NextResponse.json({ users: ranked, total: ranked.length })
}
