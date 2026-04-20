import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are XcloakAI, a senior cybersecurity expert embedded in the Xcloak platform.
You explain exploits, CVEs, and security concepts with precision.
- Be factual, concise, and technical
- Always mention mitigation/patching advice when relevant
- When asked about a CVE, reference its CVSS score and attack vector
- Format with clear sections
- Never generate functional malware or complete attack tools
- Keep responses under 400 words unless asked for detail`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  const { messages }: { messages: Message[] } = await req.json()

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'messages array required' }, { status: 400 })
  }

  // Rate limit: check last message length
  const lastMsg = messages[messages.length - 1]?.content ?? ''
  if (lastMsg.length > 2000) {
    return NextResponse.json({ error: 'Message too long' }, { status: 400 })
  }

  // Try Groq first (free, fast), then OpenAI as fallback
  const groqKey   = process.env.GROQ_API_KEY
  const openAIKey = process.env.OPENAI_API_KEY

  const aiMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages.slice(-6),
  ]

  // 1. Try Groq
  if (groqKey) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model:       'llama-3.1-8b-instant',
          messages:    aiMessages,
          max_tokens:  600,
          temperature: 0.3,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        return NextResponse.json({ message: data.choices[0].message.content })
      }
    } catch (err) {
      console.error('[AI] Groq error:', err)
    }
  }

  // 2. Fallback to OpenAI
  if (openAIKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model:       'gpt-4o-mini',
          messages:    aiMessages,
          max_tokens:  600,
          temperature: 0.3,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        return NextResponse.json({ message: data.choices[0].message.content })
      }
    } catch (err) {
      console.error('[AI] OpenAI error:', err)
    }
  }

  // Fallback: rule-based responses using real CVE/exploit context
  const message = buildFallbackResponse(lastMsg)
  return NextResponse.json({ message })
}

function buildFallbackResponse(query: string): string {
  const q = query.toLowerCase()

  if (/cve-(\d{4})-(\d+)/.test(q)) {
    const match = q.match(/cve-(\d{4})-(\d+)/i)
    const cveId = match?.[0].toUpperCase()
    return `**${cveId}** — To get detailed analysis, visit:\n• NVD: https://nvd.nist.gov/vuln/detail/${cveId}\n• OTX: https://otx.alienvault.com/indicator/cve/${cveId}\n\nFor AI-powered analysis, add an OPENAI_API_KEY to your .env.local file.`
  }

  if (/rce|remote code/.test(q)) {
    return `**Remote Code Execution (RCE)** allows an attacker to run arbitrary commands on a target system.\n\n**Common vectors:** Deserialization flaws, command injection, file upload bypasses, SSTI.\n\n**Mitigation:** Input validation, WAF rules, principle of least privilege, patch management, and sandboxed execution environments.`
  }

  if (/xss|cross.?site script/.test(q)) {
    return `**Cross-Site Scripting (XSS)** injects malicious scripts into web pages viewed by other users.\n\n**Types:** Reflected (non-persistent), Stored (persistent), DOM-based.\n\n**Mitigation:** Content Security Policy (CSP), output encoding, HTTPOnly cookies, and input sanitization with an allowlist approach.`
  }

  if (/sql.?i|sql inject/.test(q)) {
    return `**SQL Injection** manipulates database queries by injecting malicious SQL syntax.\n\n**Impact:** Data exfiltration, authentication bypass, data destruction.\n\n**Mitigation:** Parameterized queries / prepared statements, ORM usage, WAF rules, least-privilege DB accounts.`
  }

  if (/buffer overflow|bof|stack smash/.test(q)) {
    return `**Buffer Overflow** overwrites adjacent memory by writing past the end of a buffer.\n\n**Variants:** Stack-based, heap-based, integer overflow.\n\n**Mitigation:** ASLR, DEP/NX, stack canaries, safe string functions, memory-safe languages (Rust, Go).`
  }

  if (/mitigate|fix|patch|defend|protect/.test(q)) {
    return `**General Security Hardening:**\n1. Apply vendor patches immediately for CRITICAL CVEs\n2. Enable WAF with OWASP Core Rule Set\n3. Implement principle of least privilege\n4. Use network segmentation\n5. Monitor with SIEM (Splunk, Elastic)\n6. Enable MFA on all admin interfaces\n7. Regular vulnerability scanning (Nuclei, Nessus)`
  }

  if (/otx|alienvault|pulse/.test(q)) {
    return `**AlienVault OTX** (Open Threat Exchange) is a crowd-sourced threat intelligence platform.\n\nXcloak pulls live **pulses** (threat reports) from OTX using your API key to populate the threat map and live feed with real attack data from the global security community.`
  }

  if (/nvd|nist|cve database/.test(q)) {
    return `**NVD (National Vulnerability Database)** is NIST's repository of CVE vulnerability data.\n\nXcloak syncs CVEs directly from the NVD API v2 using your API key — you get real CVSS v3.1 scores, affected products, and vulnerability descriptions updated daily.`
  }

  return `I'm XcloakAI. I can help with:\n• CVE analysis and CVSS scoring\n• Exploit technique explanations (RCE, XSS, SQLi, PrivEsc)\n• Mitigation and hardening advice\n• Threat intelligence from OTX\n\nFor full AI capabilities, add **OPENAI_API_KEY** to your .env.local file.\n\nOr ask me about a specific CVE, exploit type, or security concept.`
}
