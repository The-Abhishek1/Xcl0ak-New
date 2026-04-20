(()=>{var e={};e.id=7951,e.ids=[7951],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},14343:(e,t,a)=>{"use strict";a.r(t),a.d(t,{patchFetch:()=>h,routeModule:()=>p,serverHooks:()=>m,workAsyncStorage:()=>u,workUnitAsyncStorage:()=>d});var s={};a.r(s),a.d(s,{POST:()=>l});var r=a(42706),i=a(28203),o=a(45994),n=a(39187);let c=`You are XcloakAI, a senior cybersecurity expert embedded in the Xcloak platform.
You explain exploits, CVEs, and security concepts with precision.
- Be factual, concise, and technical
- Always mention mitigation/patching advice when relevant
- When asked about a CVE, reference its CVSS score and attack vector
- Format with clear sections
- Never generate functional malware or complete attack tools
- Keep responses under 400 words unless asked for detail`;async function l(e){let{messages:t}=await e.json();if(!t||!Array.isArray(t))return n.NextResponse.json({error:"messages array required"},{status:400});let a=t[t.length-1]?.content??"";if(a.length>2e3)return n.NextResponse.json({error:"Message too long"},{status:400});let s=process.env.GROQ_API_KEY,r=process.env.OPENAI_API_KEY,i=[{role:"system",content:c},...t.slice(-6)];if(s)try{let e=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({model:"llama-3.1-8b-instant",messages:i,max_tokens:600,temperature:.3})});if(e.ok){let t=await e.json();return n.NextResponse.json({message:t.choices[0].message.content})}}catch(e){console.error("[AI] Groq error:",e)}if(r)try{let e=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:"gpt-4o-mini",messages:i,max_tokens:600,temperature:.3})});if(e.ok){let t=await e.json();return n.NextResponse.json({message:t.choices[0].message.content})}}catch(e){console.error("[AI] OpenAI error:",e)}let o=function(e){let t=e.toLowerCase();if(/cve-(\d{4})-(\d+)/.test(t)){let e=t.match(/cve-(\d{4})-(\d+)/i),a=e?.[0].toUpperCase();return`**${a}** — To get detailed analysis, visit:
• NVD: https://nvd.nist.gov/vuln/detail/${a}
• OTX: https://otx.alienvault.com/indicator/cve/${a}

For AI-powered analysis, add an OPENAI_API_KEY to your .env.local file.`}return/rce|remote code/.test(t)?`**Remote Code Execution (RCE)** allows an attacker to run arbitrary commands on a target system.

**Common vectors:** Deserialization flaws, command injection, file upload bypasses, SSTI.

**Mitigation:** Input validation, WAF rules, principle of least privilege, patch management, and sandboxed execution environments.`:/xss|cross.?site script/.test(t)?`**Cross-Site Scripting (XSS)** injects malicious scripts into web pages viewed by other users.

**Types:** Reflected (non-persistent), Stored (persistent), DOM-based.

**Mitigation:** Content Security Policy (CSP), output encoding, HTTPOnly cookies, and input sanitization with an allowlist approach.`:/sql.?i|sql inject/.test(t)?`**SQL Injection** manipulates database queries by injecting malicious SQL syntax.

**Impact:** Data exfiltration, authentication bypass, data destruction.

**Mitigation:** Parameterized queries / prepared statements, ORM usage, WAF rules, least-privilege DB accounts.`:/buffer overflow|bof|stack smash/.test(t)?`**Buffer Overflow** overwrites adjacent memory by writing past the end of a buffer.

**Variants:** Stack-based, heap-based, integer overflow.

**Mitigation:** ASLR, DEP/NX, stack canaries, safe string functions, memory-safe languages (Rust, Go).`:/mitigate|fix|patch|defend|protect/.test(t)?`**General Security Hardening:**
1. Apply vendor patches immediately for CRITICAL CVEs
2. Enable WAF with OWASP Core Rule Set
3. Implement principle of least privilege
4. Use network segmentation
5. Monitor with SIEM (Splunk, Elastic)
6. Enable MFA on all admin interfaces
7. Regular vulnerability scanning (Nuclei, Nessus)`:/otx|alienvault|pulse/.test(t)?`**AlienVault OTX** (Open Threat Exchange) is a crowd-sourced threat intelligence platform.

Xcloak pulls live **pulses** (threat reports) from OTX using your API key to populate the threat map and live feed with real attack data from the global security community.`:/nvd|nist|cve database/.test(t)?`**NVD (National Vulnerability Database)** is NIST's repository of CVE vulnerability data.

Xcloak syncs CVEs directly from the NVD API v2 using your API key — you get real CVSS v3.1 scores, affected products, and vulnerability descriptions updated daily.`:`I'm XcloakAI. I can help with:
• CVE analysis and CVSS scoring
• Exploit technique explanations (RCE, XSS, SQLi, PrivEsc)
• Mitigation and hardening advice
• Threat intelligence from OTX

For full AI capabilities, add **OPENAI_API_KEY** to your .env.local file.

Or ask me about a specific CVE, exploit type, or security concept.`}(a);return n.NextResponse.json({message:o})}let p=new r.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/v1/ai/chat/route",pathname:"/api/v1/ai/chat",filename:"route",bundlePath:"app/api/v1/ai/chat/route"},resolvedPagePath:"/home/idiot/Projects/Claude/xcloak/src/app/api/v1/ai/chat/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:u,workUnitAsyncStorage:d,serverHooks:m}=p;function h(){return(0,o.patchFetch)({workAsyncStorage:u,workUnitAsyncStorage:d})}},96487:()=>{},78335:()=>{}};var t=require("../../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[638,5452],()=>a(14343));module.exports=s})();