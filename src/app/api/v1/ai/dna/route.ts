import { NextRequest, NextResponse } from 'next/server'

// Language detection patterns
const LANG_PATTERNS: Array<{ lang: string; patterns: RegExp[] }> = [
  { lang: 'Python',     patterns: [/^#!/, /import\s+\w+/, /def\s+\w+\(/, /print\s*\(/] },
  { lang: 'Bash',       patterns: [/^#!\/bin\/bash/, /\$\(.*\)/, /echo\s+/, /sudo\s+/] },
  { lang: 'JavaScript', patterns: [/const\s+\w+\s*=/, /require\(/, /\.then\(/, /async\s+function/] },
  { lang: 'C/C++',      patterns: [/#include\s*</, /int\s+main\(/, /printf\s*\(/, /malloc\s*\(/] },
  { lang: 'Ruby',       patterns: [/require\s+'/, /\.each\s+do/, /puts\s+/, /def\s+\w+$/m] },
  { lang: 'PowerShell', patterns: [/\$\w+\s*=/, /Invoke-/, /Get-\w+/, /Write-Host/] },
  { lang: 'PHP',        patterns: [/<\?php/, /\$\w+\s*=/, /echo\s+/, /\$_GET\[/] },
  { lang: 'Go',         patterns: [/package\s+main/, /import\s+\(/, /func\s+main\(\)/, /fmt\.Print/] },
]

// Technique detection
const TECHNIQUE_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: 'Path traversal',     pattern: /\.\.\//  },
  { name: 'Command injection',  pattern: /os\.system|subprocess|exec\s*\(|shell=True/i },
  { name: 'SQL injection',      pattern: /UNION\s+SELECT|OR\s+1=1|DROP\s+TABLE/i },
  { name: 'File upload bypass', pattern: /multipart|Content-Type.*octet|filename=/i },
  { name: 'Null byte injection', pattern: /\\x00|%00|\0/ },
  { name: 'Buffer overflow',    pattern: /strcpy|gets\s*\(|scanf.*%s|memcpy/i },
  { name: 'Format string',      pattern: /printf\s*\(\s*\w+\s*\)|%n|%x.*%x/ },
  { name: 'ROP chain',          pattern: /p64|p32|pack.*little|gadget/i },
  { name: 'Heap spray',         pattern: /heap_spray|NOP\s+sled|\x90{10,}/i },
  { name: 'Reverse shell',      pattern: /\/dev\/tcp|TCPSocket|fsockopen|socket\.connect/i },
  { name: 'Deserialization',    pattern: /pickle\.loads|unserialize|ObjectInputStream|yaml\.load/i },
  { name: 'SSRF',               pattern: /169\.254\.169\.254|localhost.*request|internal.*fetch/i },
]

// Payload type detection
function detectPayloadType(code: string): string {
  const c = code.toLowerCase()
  if (/reverse.?shell|\/dev\/tcp|TCPSocket/.test(c))           return 'Reverse Shell'
  if (/file.?upload|multipart|filename=/.test(c))              return 'File Upload'
  if (/sql|union.?select|or.?1=1/.test(c))                     return 'SQL Injection'
  if (/<script|onerror=|onload=/.test(c))                      return 'XSS'
  if (/buffer.?overflow|strcpy|gets\(/.test(c))                return 'Buffer Overflow'
  if (/deseri|pickle|unserialize/.test(c))                     return 'Deserialization'
  if (/rop.?chain|gadget|p64\(/.test(c))                       return 'ROP Chain'
  if (/ssrf|169\.254|internal.*url/.test(c))                   return 'SSRF'
  if (/command.?inject|os\.system|shell=true/.test(c))         return 'Command Injection'
  if (/path.?travers|\.\.\//i.test(c))                         return 'Path Traversal'
  if (/privesc|privilege.?esc|suid|sudo/.test(c))              return 'Privilege Escalation'
  return 'Unknown'
}

// Target system detection
function detectTarget(code: string): string {
  const c = code.toLowerCase()
  if (/windows|powershell|\.exe|registry/.test(c))    return 'Windows'
  if (/linux|\/etc\/passwd|\/bin\/sh|apt/.test(c))    return 'Linux'
  if (/android|dalvik|\.apk/.test(c))                 return 'Android'
  if (/ios|objective.c|swift/.test(c))                return 'iOS'
  if (/apache|nginx|iis|tomcat/.test(c))              return 'Web Server'
  if (/wordpress|drupal|joomla/.test(c))              return 'CMS'
  if (/mysql|postgres|mssql|oracle/.test(c))          return 'Database'
  return 'Cross-platform'
}

// Simple risk scoring
function scoreRisk(techniques: string[], payloadType: string): number {
  let score = 3.0

  // Payload type base score
  const typeScores: Record<string, number> = {
    'Reverse Shell': 9.0, 'Buffer Overflow': 8.5, 'ROP Chain': 9.0,
    'Deserialization': 8.0, 'SQL Injection': 7.5, 'Command Injection': 8.5,
    'File Upload': 8.0, 'Privilege Escalation': 7.0, 'SSRF': 7.5,
    'Path Traversal': 6.5, 'XSS': 6.0, 'Unknown': 4.0,
  }
  score = typeScores[payloadType] ?? score

  // Technique bonuses
  if (techniques.includes('Null byte injection')) score = Math.min(10, score + 0.5)
  if (techniques.includes('ROP chain'))           score = Math.min(10, score + 0.5)
  if (techniques.includes('Heap spray'))          score = Math.min(10, score + 0.3)

  return Math.round(score * 10) / 10
}

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'code required' }, { status: 400 })
  }

  const chunk = code.slice(0, 3000)

  // Detect language
  let language = 'Unknown'
  let maxScore = 0
  for (const { lang, patterns } of LANG_PATTERNS) {
    const score = patterns.filter(p => p.test(chunk)).length
    if (score > maxScore) { maxScore = score; language = lang }
  }

  // Detect techniques
  const techniques = TECHNIQUE_PATTERNS
    .filter(({ pattern }) => pattern.test(chunk))
    .map(({ name }) => name)

  const payloadType = detectPayloadType(chunk)
  const targetSystem = detectTarget(chunk)
  const riskScore = scoreRisk(techniques, payloadType)

  // Try AI summary if OpenAI key available
  let summary = `${payloadType} exploit targeting ${targetSystem}. Uses ${techniques.slice(0,2).join(', ') || 'standard techniques'}.`

  const groqKey   = process.env.GROQ_API_KEY
  const openAIKey = process.env.OPENAI_API_KEY
  const aiKey   = groqKey || openAIKey
  const aiUrl   = groqKey ? 'https://api.groq.com/openai/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions'
  const aiModel = groqKey ? 'llama-3.1-8b-instant' : 'gpt-4o-mini'
  if (aiKey) {
    try {
      const aiRes = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiKey}` },
        body: JSON.stringify({
          model: aiModel,
          messages: [{
            role: 'user',
            content: `In one sentence, describe what this exploit does technically. Be specific about the attack vector:\n\n${chunk.slice(0, 800)}`
          }],
          max_tokens: 80,
        }),
      })
      if (aiRes.ok) {
        const d = await aiRes.json()
        summary = d.choices[0].message.content ?? summary
      }
    } catch { /* use static summary */ }
  }

  return NextResponse.json({
    payloadType,
    riskScore,
    languageDetected: language,
    techniques,
    targetSystem,
    summary,
  })
}
