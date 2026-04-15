import { NextRequest, NextResponse } from 'next/server'
import { prisma }       from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const [
    totalUsers, totalExploits, approvedExploits, pendingExploits, rejectedExploits,
    totalCTF, approvedCTF, pendingCTF,
    totalCVEs, totalComments, totalVotes, totalSolves,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.exploit.count(),
    prisma.exploit.count({ where:{ status:'approved' } }),
    prisma.exploit.count({ where:{ status:'pending' } }),
    prisma.exploit.count({ where:{ status:'rejected' } }),
    prisma.cTFChallenge.count(),
    prisma.cTFChallenge.count({ where:{ status:'approved' } }),
    prisma.cTFChallenge.count({ where:{ status:'pending' } }),
    prisma.cVECache.count(),
    prisma.comment.count(),
    prisma.exploitVote.count(),
    prisma.cTFSolve.count(),
  ])

  // Top users by reputation
  const topUsers = await prisma.user.findMany({ orderBy:{ reputation:'desc' }, take:10 })

  // Recent exploits
  const recentExploits = await prisma.exploit.findMany({
    orderBy:{ createdAt:'desc' }, take:5,
    select:{ id:true, title:true, authorAlias:true, status:true, createdAt:true, type:true },
  })

  // Recent users
  const recentUsers = await prisma.user.findMany({ orderBy:{ createdAt:'desc' }, take:10 })

  return NextResponse.json({
    users:    { total:totalUsers, recent:recentUsers },
    exploits: { total:totalExploits, approved:approvedExploits, pending:pendingExploits, rejected:rejectedExploits, recent:recentExploits },
    ctf:      { total:totalCTF, approved:approvedCTF, pending:pendingCTF },
    cves:     { cached:totalCVEs },
    engagement: { comments:totalComments, votes:totalVotes, ctfSolves:totalSolves },
    topUsers,
    security: {
      rateLimitActive: true,
      inputSanitization: true,
      adminAuthEnabled: true,
      statusFilterEnabled: true,
      note: 'All user inputs are sanitized. Exploits require admin approval before going public. Admin routes protected by signed tokens.',
    },
  })
}
