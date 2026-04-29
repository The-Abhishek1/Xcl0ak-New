/**
 * GET /api/v1/github/callback
 * GitHub OAuth callback — exchanges code for access token, stores connection.
 */
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

const GH_CLIENT_ID     = process.env.GITHUB_CLIENT_ID     ?? ''
const GH_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? ''
const APP_URL          = process.env.NEXT_PUBLIC_APP_URL   ?? 'https://xcloak.tech'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const code  = searchParams.get('code')
  const state = searchParams.get('state') // userAlias embedded when starting OAuth

  if (!code || !state) {
    return NextResponse.redirect(`${APP_URL}/github?error=missing_params`)
  }

  // ── 1. Exchange code for access token ──────────────────────────────────────
  let accessToken: string
  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method:  'POST',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id:     GH_CLIENT_ID,
        client_secret: GH_CLIENT_SECRET,
        code,
      }),
    })
    const tokenData = await tokenRes.json()
    if (tokenData.error || !tokenData.access_token) {
      console.error('[github/callback] token exchange failed:', tokenData)
      return NextResponse.redirect(`${APP_URL}/github?error=token_exchange_failed`)
    }
    accessToken = tokenData.access_token
  } catch (e) {
    console.error('[github/callback] network error during token exchange:', e)
    return NextResponse.redirect(`${APP_URL}/github?error=network_error`)
  }

  // ── 2. Fetch GitHub user profile ───────────────────────────────────────────
  let ghUser: { id: number; login: string; avatar_url: string }
  try {
    const profileRes = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept':        'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    if (!profileRes.ok) {
      return NextResponse.redirect(`${APP_URL}/github?error=profile_fetch_failed`)
    }
    ghUser = await profileRes.json()
  } catch {
    return NextResponse.redirect(`${APP_URL}/github?error=profile_fetch_failed`)
  }

  // ── 3. Generate per-user webhook secret ────────────────────────────────────
  const webhookSecret = randomBytes(32).toString('hex')
  const githubUserId  = String(ghUser.id)

  // ── 4. Upsert GitHubConnection ─────────────────────────────────────────────
  try {
    // Check if this GitHub account is already linked to a DIFFERENT xcloak user
    const existing = await prisma.gitHubConnection.findUnique({
      where: { githubUserId },
    })

    if (existing && existing.userAlias !== state) {
      // GitHub account is connected to a different XCloak account
      console.warn(
        `[github/callback] GitHub user ${ghUser.login} (${githubUserId}) ` +
        `already linked to alias "${existing.userAlias}", attempted by "${state}"`
      )
      return NextResponse.redirect(
        `${APP_URL}/github?error=github_account_already_linked&github_user=${encodeURIComponent(ghUser.login)}`
      )
    }

    // Safe to upsert — either new connection or reconnecting same user
    await prisma.gitHubConnection.upsert({
      where:  { userAlias: state },
      create: {
        userAlias:    state,
        githubUserId,
        githubLogin:  ghUser.login,
        accessToken,
        avatarUrl:    ghUser.avatar_url,
        webhookSecret,
      },
      update: {
        githubUserId,                   // update in case they changed GitHub accounts
        githubLogin:  ghUser.login,
        accessToken,
        avatarUrl:    ghUser.avatar_url,
      },
    })
  } catch (e: any) {
    console.error('[github/callback] prisma upsert failed:', e)

    // P2002 = unique constraint violation (shouldn't reach here after the check above,
    // but handle it gracefully just in case of a race condition)
    if (e?.code === 'P2002') {
      return NextResponse.redirect(
        `${APP_URL}/github?error=github_account_already_linked&github_user=${encodeURIComponent(ghUser.login)}`
      )
    }

    return NextResponse.redirect(`${APP_URL}/github?error=db_error`)
  }

  // ── 5. Sync repos (fire and forget) ───────────────────────────────────────
  syncRepos(state, accessToken, ghUser.login).catch(console.error)

  return NextResponse.redirect(`${APP_URL}/github?connected=1`)
}

/** Fetch user's repos from GitHub and upsert into Prisma */
async function syncRepos(userAlias: string, accessToken: string, ghLogin: string) {
  const connection = await prisma.gitHubConnection.findUnique({ where: { userAlias } })
  if (!connection) return

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
      where:  { connectionId_repoId: { connectionId: connection.id, repoId: String(repo.id) } },
      create: {
        connectionId:  connection.id,
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
