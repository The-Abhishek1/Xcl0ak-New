# XCloak

**AI-powered cybersecurity platform** — vulnerability scanning, threat intelligence, CTF challenges, and a community exploit database. Built for security researchers, bug bounty hunters, and learners.

> Live at [xcloakapp.com](https://xcloakapp.com) · Backend: [Enterprise Security Orchestrator](https://github.com/0xidiot/Enterprise-Security-Orchestrator)

---

## What It Does

XCloak combines tools that usually cost $50K+/year into a single platform at ₹999/month:

- **AI-Orchestrated Scanning** — describe a goal in plain English, the AI plans and runs nmap, nuclei, gobuster, nikto, ffuf, sqlmap, and whatweb against your target, then synthesizes the results into a risk report
- **Live Threat Intelligence** — real-time CVE feed from NVD, threat events from AlienVault OTX, live threat map
- **Exploit Database** — community-submitted PoC exploits with DNA analysis, AI explanation, voting, and comments
- **CTF Platform** — challenge submission, flag hashing, solve tracking, and leaderboard
- **Security Learning** — structured curriculum from beginner to red team, with links to real resources and progress tracking
- **Vulnerable Lab Playground** — Docker-based lab setup guide (DVWA, WebGoat, Juice Shop, Metasploitable)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Database | Supabase (PostgreSQL via Prisma) |
| Storage | Supabase Storage |
| Backend | [ESO](https://github.com/0xidiot/Enterprise-Security-Orchestrator) — FastAPI, Python 3.12 |
| Scan Engine | Docker (nmap, nuclei, gobuster, nikto, ffuf, sqlmap, whatweb) |
| AI | Ollama (local) / OpenAI GPT-4o / Anthropic Claude |
| Payments | Razorpay |
| Threat Intel | NVD API, AlienVault OTX |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier works)
- [Enterprise Security Orchestrator](https://github.com/0xidiot/Enterprise-Security-Orchestrator) running on port 8000

### Installation

```bash
git clone https://github.com/0xidiot/xcloak
cd xcloak
npm install
```

### Environment Setup

```bash
cp .env.local.example .env.local
```

Fill in your values in `.env.local`:

```dotenv
# Supabase
DATABASE_URL="postgresql://postgres.YOUR_PROJECT:PASSWORD@pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.YOUR_PROJECT:PASSWORD@pooler.supabase.com:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
SUPABASE_SERVICE_KEY="your-service-role-key"

# Threat Intelligence (both free)
NVD_API_KEY="your-nvd-key"        # nvd.nist.gov/developers/request-an-api-key
OTX_API_KEY="your-otx-key"        # otx.alienvault.com/api

# ESO Backend
ESO_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_ESO_WS_URL=ws://localhost:8000

# JWT — must match ESO's JWT_SECRET_KEY
JWT_SECRET_KEY=your-64-char-secret
ESO_JWT_SECRET=your-64-char-secret
```

### Database Setup

```bash
npx prisma db push
node prisma/seed.js
```

### Run

```bash
npm run dev       # development
npm run build     # production build
npm start         # production server
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── (pages)/          # 35+ pages: dashboard, scan, exploits, ctf, admin...
│   ├── api/v1/           # Next.js API routes (Prisma-backed)
│   └── api/eso/          # Proxy → ESO backend
├── components/
│   ├── layout/           # Topbar, Sidebar, StatCards, LiveFeed
│   ├── exploit/          # ExploitDetail, ExploitGrid
│   ├── scan/             # LiveTerminal, WorkflowTimeline, ReportViewer
│   ├── map/              # ThreatMapPanel (live globe)
│   └── ai/               # AIPanel
├── lib/
│   ├── eso/              # ESO API client, WebSocket hooks
│   ├── prisma.ts         # Prisma client
│   ├── adminAuth.ts      # Admin JWT verification
│   ├── nvd.ts            # NVD CVE fetching
│   └── otx.ts            # OTX threat intel
├── hooks/
│   ├── use-scan-ws.ts    # WebSocket hook for live scan terminal
│   └── use-poll.ts       # Polling hook
└── prisma/
    ├── schema.prisma     # 12 models
    └── seed.js           # 10 exploits + 8 CTF challenges
```

---

## Features

### Scanning
Scans require the ESO backend + Docker installed locally. Users describe their goal in plain text, ESO's AI planner selects and sequences tools, results stream live to the terminal via WebSocket, and a PDF report is generated on completion.

### Tiers

| Tier | Price | Scans/day | AI Analysis | Reports |
|---|---|---|---|---|
| Free | ₹0 | 3 | ✗ | ✗ |
| Pro | ₹999/mo | 20 | ✓ | ✓ |
| Enterprise | ₹4,999/mo | Unlimited | ✓ | ✓ |

### Admin Panel
Full admin panel at `/admin` — manage users, review exploit/CTF submissions, view scan history, manage tiers, view payment records, and leaderboard management. Authenticated via ESO JWT.

---

## Deployment

### XCloak (Frontend) → Vercel

```bash
# Push to GitHub, then connect to Vercel
# Set all .env.local variables in Vercel dashboard
# Set:
#   ESO_BACKEND_URL=https://api.yourdomain.com
#   NEXT_PUBLIC_ESO_WS_URL=wss://api.yourdomain.com
#   NODE_ENV=production
```

### ESO (Backend) → VPS

See [ESO deployment guide](https://github.com/0xidiot/Enterprise-Security-Orchestrator#deployment).

Minimum server spec: 2 vCPU, 8GB RAM (runs PostgreSQL + Redis + RabbitMQ + ESO + Docker tools).

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Supabase pooled connection string |
| `DIRECT_URL` | ✅ | Supabase direct connection (for migrations) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | ✅ | Supabase service role key |
| `NVD_API_KEY` | ✅ | NIST NVD API key (free) |
| `OTX_API_KEY` | ✅ | AlienVault OTX key (free) |
| `ESO_BACKEND_URL` | ✅ | ESO backend URL |
| `NEXT_PUBLIC_ESO_WS_URL` | ✅ | ESO WebSocket URL |
| `JWT_SECRET_KEY` | ✅ | Must match ESO's `JWT_SECRET_KEY` |
| `ESO_JWT_SECRET` | ✅ | Same value as `JWT_SECRET_KEY` |
| `ADMIN_SECRET` | ✅ | Admin panel signing secret |
| `RAZORPAY_KEY_ID` | ⚡ Payments | Razorpay key (test or live) |
| `RAZORPAY_KEY_SECRET` | ⚡ Payments | Razorpay secret |

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Submit exploits and CTF challenges through the platform itself (goes through admin review)
4. For code contributions: open a PR with a clear description

---

## Legal

Only scan targets you own or have **explicit written permission** to test. Unauthorized scanning is illegal. XCloak and its contributors are not responsible for misuse.

See [Terms of Service](/terms) and [Privacy Policy](/privacy).

---

## License

MIT — see [LICENSE](LICENSE)

---

*Built by [0xIdiot](https://github.com/0xidiot) · India 🇮🇳*
