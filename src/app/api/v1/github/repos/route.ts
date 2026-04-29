/**
 * /api/v1/github/repos
 *
 * GET    — list connected repos + recent scans for the current user
 * POST   — enable/disable scanning for a repo, register GitHub webhook, manual scan
 * DELETE — disconnect GitHub entirely (revoke + delete connection)
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const APP_URL          = process.env.NEXT_PUBLIC_APP_URL   ?? 'https://xcloak.tech'
const WEBHOOK_ENDPOINT = `${APP_URL}/api/v1/github/webhook`
const ESO_API_URL       = process.env.ESO_API_URL            ?? 'http://localhost:8000'

// ── GET: list connection + repos + last scan per repo ─────────────────────────
export async function GET(req: NextRequest) {
  const alias  = req.headers.get('x-user-alias')
  const scanId = req.nextUrl.searchParams.get('scanId')

  // ── scanId mode: return single scan details for polling ──────────────────
  if (scanId) {
    if (!alias) return NextResponse.json({ error: 'x-user-alias header required' }, { status: 401 })
    const scan = await prisma.repoScan.findFirst({
      where: { id: scanId, repo: { connection: { userAlias: alias } } },
      include: { repo: { select: { fullName: true } } },
    })
    if (!scan) return NextResponse.json({ error: 'scan not found' }, { status: 404 })
    return NextResponse.json({ scan })
  }

  if (!alias) return NextResponse.json({ error: 'x-user-alias header required' }, { status: 401 })

  const connection = await prisma.gitHubConnection.findUnique({
    where:   { userAlias: alias },
    include: {
      repos: {
        orderBy: { lastScannedAt: 'desc' },
        include: {
          scans: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      },
    },
  })

  if (!connection) {
    return NextResponse.json({ connected: false, repos: [] })
  }

  return NextResponse.json({
    connected:   true,
    githubLogin: connection.githubLogin,
    avatarUrl:   connection.avatarUrl,
    installedAt: connection.installedAt,
    repos: connection.repos.map(r => ({
      id:            r.id,
      repoId:        r.repoId,
      fullName:      r.fullName,
      private:       r.private,
      language:      r.language,
      scanEnabled:   r.scanEnabled,
      lastScannedAt: r.lastScannedAt,
      hasWebhook:    !!r.webhookId,
      latestScan:    r.scans[0] ?? null,
    })),
  })
}

// ── POST: toggle scan / register webhook / manual scan ───────────────────────
export async function POST(req: NextRequest) {
  const alias = req.headers.get('x-user-alias')
  if (!alias) return NextResponse.json({ error: 'x-user-alias header required' }, { status: 401 })

  const body = await req.json()
  const { action, repoId } = body

  const connection = await prisma.gitHubConnection.findUnique({ where: { userAlias: alias } })
  if (!connection) return NextResponse.json({ error: 'not connected' }, { status: 400 })

  // ── sync ──────────────────────────────────────────────────────────────────
  if (action === 'sync') {
    await syncReposFromGitHub(connection.id, connection.accessToken)
    return NextResponse.json({ ok: true, message: 'repos synced' })
  }

  // ── manual_scan ───────────────────────────────────────────────────────────
  if (action === 'manual_scan') {
    if (!repoId) {
      return NextResponse.json({ error: 'repoId required' }, { status: 400 })
    }

    const repo = await prisma.gitHubRepo.findFirst({
      where: { id: repoId, connectionId: connection.id },
    })
    if (!repo) return NextResponse.json({ error: 'repo not found' }, { status: 404 })

    if (!repo.scanEnabled) {
      return NextResponse.json(
        { error: `Scanning is disabled for ${repo.fullName}. Enable it first.` },
        { status: 400 }
      )
    }

    // Create a RepoScan record in queued state
    const scan = await prisma.repoScan.create({
      data: {
        repoId:      repo.id,
        commitSha:   'manual',
        branch:      repo.defaultBranch,
        status:      'queued',
        triggeredBy: 'manual',
      },
    })

    // Dispatch to ESO (fire and forget — UI polls for status)
    dispatchScanToESO(scan.id, repo.fullName, repo.defaultBranch, connection.accessToken, connection.userAlias).catch(
      e => console.error('[github/repos] ESO dispatch failed:', e)
    )

    return NextResponse.json({
      ok:      true,
      scanId:  scan.id,
      message: `✓ Scan queued for ${repo.fullName}`,
    })
  }

  // ── enable / disable ─────────────────────────────────────────────────────
  if (!repoId || !['enable', 'disable'].includes(action)) {
    return NextResponse.json(
      { error: 'action must be one of: enable | disable | sync | manual_scan' },
      { status: 400 }
    )
  }

  const repo = await prisma.gitHubRepo.findFirst({
    where: { id: repoId, connectionId: connection.id },
  })
  if (!repo) return NextResponse.json({ error: 'repo not found' }, { status: 404 })

  if (action === 'enable') {
    let webhookId = repo.webhookId
    if (!webhookId) {
      webhookId = await registerWebhook(
        repo.fullName,
        connection.accessToken,
        connection.webhookSecret,
      )
    }
    await prisma.gitHubRepo.update({
      where: { id: repo.id },
      data:  { scanEnabled: true, webhookId: webhookId ?? undefined },
    })
    return NextResponse.json({ ok: true, message: `Scanning enabled for ${repo.fullName}` })
  }

  // disable
  if (repo.webhookId) {
    await deleteWebhook(repo.fullName, repo.webhookId, connection.accessToken)
  }
  await prisma.gitHubRepo.update({
    where: { id: repo.id },
    data:  { scanEnabled: false, webhookId: null },
  })
  return NextResponse.json({ ok: true, message: `Scanning disabled for ${repo.fullName}` })
}

// ── DELETE: disconnect GitHub entirely ───────────────────────────────────────
export async function DELETE(req: NextRequest) {
  const alias = req.headers.get('x-user-alias')
  if (!alias) return NextResponse.json({ error: 'x-user-alias header required' }, { status: 401 })

  const connection = await prisma.gitHubConnection.findUnique({
    where:   { userAlias: alias },
    include: { repos: true },
  })
  if (!connection) return NextResponse.json({ ok: true, message: 'not connected' })

  for (const repo of connection.repos) {
    if (repo.webhookId) {
      await deleteWebhook(repo.fullName, repo.webhookId, connection.accessToken).catch(() => null)
    }
  }

  await prisma.gitHubConnection.delete({ where: { id: connection.id } })
  return NextResponse.json({ ok: true, message: 'GitHub disconnected' })
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function syncReposFromGitHub(connectionId: string, accessToken: string) {
  const res = await fetch(
    'https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner,collaborator',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept':        'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )
  if (!res.ok) return
  const repos: any[] = await res.json()

  for (const repo of repos) {
    await prisma.gitHubRepo.upsert({
      where:  { connectionId_repoId: { connectionId, repoId: String(repo.id) } },
      create: {
        connectionId,
        repoId:        String(repo.id),
        fullName:      repo.full_name,
        defaultBranch: repo.default_branch ?? 'main',
        private:       repo.private,
        language:      repo.language,
      },
      update: {
        fullName:      repo.full_name,
        defaultBranch: repo.default_branch ?? 'main',
        private:       repo.private,
        language:      repo.language,
      },
    })
  }
}

async function dispatchScanToESO(
  scanId:      string,
  fullName:    string,
  branch:      string,
  accessToken: string,
  userAlias:   string,
) {
  // Construct authenticated clone URL for private repos
  const cloneUrl = `https://x-access-token:${accessToken}@github.com/${fullName}.git`

  const res = await fetch(`${ESO_API_URL}/api/v1/github/scan`, {
    method:  'POST',
    headers: {
      'Content-Type':    'application/json',
      'X-Internal-Secret': process.env.INTERNAL_EMAIL_SECRET ?? 'xcloak-internal',
    },
    body: JSON.stringify({
      scanId,
      repoFullName:  fullName,
      cloneUrl,
      commitSha:     'HEAD',
      branch,
      userAlias,
      accessToken,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    console.error(`[github/repos] ESO scan dispatch failed for ${fullName}:`, err)
    await prisma.repoScan.update({
      where: { id: scanId },
      data:  { status: 'failed', error: `ESO dispatch failed: ${err}`, completedAt: new Date() },
    })
  }
}

async function registerWebhook(
  fullName:      string,
  accessToken:   string,
  webhookSecret: string,
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/hooks`, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept':        'application/vnd.github+json',
        'Content-Type':  'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        name:   'web',
        active: true,
        events: ['push', 'pull_request'],
        config: {
          url:          WEBHOOK_ENDPOINT,
          content_type: 'json',
          secret:       webhookSecret,
          insecure_ssl: '0',
        },
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`[github/repos] webhook registration failed for ${fullName}:`, err)
      return null
    }
    const data = await res.json()
    return String(data.id)
  } catch (e) {
    console.error(`[github/repos] webhook error for ${fullName}:`, e)
    return null
  }
}

async function deleteWebhook(fullName: string, webhookId: string, accessToken: string) {
  await fetch(`https://api.github.com/repos/${fullName}/hooks/${webhookId}`, {
    method:  'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept':        'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
}
