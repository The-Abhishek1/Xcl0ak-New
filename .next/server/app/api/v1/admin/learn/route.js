(()=>{var e={};e.id=5866,e.ids=[5866],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},17969:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>x,routeModule:()=>u,serverHooks:()=>m,workAsyncStorage:()=>g,workUnitAsyncStorage:()=>f});var o={};r.r(o),r.d(o,{GET:()=>d,PATCH:()=>h});var a=r(42706),s=r(28203),n=r(45994),i=r(39187),l=r(43219),p=r(14702);async function c(e){try{let t=await fetch(`http://localhost:8000/api/v1/admin/users?search=${e}`,{headers:{"X-Internal":"true"}});if(t.ok){let r=((await t.json()).users??[]).find(t=>t.username===e);return r?.email??null}}catch{}return null}async function d(e){let t=e.nextUrl.searchParams.get("status")??"pending",r=await l.z.learningPath.findMany({where:{status:t},include:{modules:{orderBy:{order:"asc"}}},orderBy:{createdAt:"desc"}});return i.NextResponse.json(r)}async function h(e){let{id:t,action:r,reviewNote:o,reviewedBy:a}=await e.json();if(!t||!r)return i.NextResponse.json({error:"id and action required"},{status:400});let s="approve"===r?"approved":"rejected",n=await l.z.learningPath.update({where:{id:t},data:{status:s,reviewNote:o,reviewedBy:a,reviewedAt:new Date}});await l.z.notification.create({data:{userAlias:n.authorAlias,type:"system",title:"approved"===s?"\uD83C\uDF89 Learning Path Approved!":"Learning Path Not Approved",body:"approved"===s?`Your path "${n.title}" is now live on XCloak!`:`Your path "${n.title}" was not approved. ${o??""}`,link:"/learn"}}).catch(()=>null);let d=await c(n.authorAlias);if(d){let e="approved"===s?p.k.learningPathApproved(n.authorAlias,n.title):p.k.learningPathRejected(n.authorAlias,n.title,o??"");await (0,p.Z)({to:d,...e}).catch(()=>null)}return i.NextResponse.json(n)}let u=new a.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/v1/admin/learn/route",pathname:"/api/v1/admin/learn",filename:"route",bundlePath:"app/api/v1/admin/learn/route"},resolvedPagePath:"/home/idiot/Projects/Claude/xcloak/src/app/api/v1/admin/learn/route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:g,workUnitAsyncStorage:f,serverHooks:m}=u;function x(){return(0,n.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:f})}},96487:()=>{},78335:()=>{},14702:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s,k:()=>i});let o=process.env.EMAIL_FROM??"XCloak <admin@xcloak.tech>",a=process.env.RESEND_API_KEY??"";async function s(e){if(!a)return console.log("[email] No RESEND_API_KEY — would have sent:",e.subject,"→",e.to),!1;try{let t=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({from:o,to:Array.isArray(e.to)?e.to:[e.to],subject:e.subject,html:e.html,reply_to:e.replyTo})});if(!t.ok){let e=await t.text();return console.error("[email] Resend error:",e),!1}return!0}catch(e){return console.error("[email] fetch failed:",e),!1}}let n=e=>`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { margin:0; padding:0; background:#03050a; font-family:'Courier New',monospace; color:#e2e8f0; }
    .wrap { max-width:560px; margin:0 auto; padding:32px 16px; }
    .card { background:#0a0f1a; border:1px solid rgba(0,255,170,0.15); border-radius:16px; overflow:hidden; }
    .header { background:linear-gradient(135deg,rgba(0,255,170,0.08),rgba(0,170,255,0.05));
              padding:28px 32px; border-bottom:1px solid rgba(255,255,255,0.06); }
    .logo { font-size:20px; font-weight:900; letter-spacing:-0.5px; color:#e2e8f0; }
    .logo span { color:#00ffaa; }
    .body { padding:28px 32px; }
    .btn { display:inline-block; padding:12px 28px; border-radius:10px;
           background:rgba(0,255,170,0.1); border:1px solid rgba(0,255,170,0.3);
           color:#00ffaa; text-decoration:none; font-weight:700; font-size:12px;
           letter-spacing:0.05em; margin-top:20px; }
    .footer { padding:16px 32px; border-top:1px solid rgba(255,255,255,0.05);
              font-size:10px; color:#334155; text-align:center; }
    h2 { font-size:18px; font-weight:900; color:#f1f5f9; margin:0 0 12px 0; }
    p  { font-size:12px; line-height:1.7; color:#94a3b8; margin:0 0 10px 0; }
    .tag { display:inline-block; padding:2px 8px; border-radius:20px; font-size:10px;
           font-weight:700; letter-spacing:0.1em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="header">
        <div class="logo">X<span>cloak</span></div>
        <p style="font-size:10px;color:#475569;margin:4px 0 0 0;letter-spacing:0.15em;">AI-POWERED SECURITY PLATFORM</p>
      </div>
      <div class="body">${e}</div>
      <div class="footer">
        \xa9 ${new Date().getFullYear()} XCloak \xb7 <a href="https://xcloak.tech" style="color:#475569;">xcloak.tech</a> \xb7
        <a href="https://xcloak.tech/unsubscribe" style="color:#475569;">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>
`,i={welcome:e=>({subject:"\uD83D\uDEE1 Welcome to XCloak — your security journey starts now",html:n(`
      <h2>Welcome, ${e}!</h2>
      <p>Your XCloak account is ready. You now have access to:</p>
      <ul style="font-size:12px;color:#94a3b8;line-height:2;padding-left:20px;">
        <li>🔭 <strong style="color:#e2e8f0">AI-powered scanner</strong> — 3 free scans/day</li>
        <li>📡 <strong style="color:#e2e8f0">Live CVE tracker</strong> — real-time vulnerability feed</li>
        <li>💉 <strong style="color:#e2e8f0">Exploit database</strong> — community-vetted PoCs</li>
        <li>🏆 <strong style="color:#e2e8f0">CTF challenges</strong> — sharpen your skills</li>
        <li>📚 <strong style="color:#e2e8f0">Learning paths</strong> — from beginner to red team</li>
      </ul>
      <a href="https://xcloak.tech/scan" class="btn">Start your first scan →</a>
    `)}),exploitApproved:(e,t)=>({subject:`✅ Your exploit "${t}" is now live`,html:n(`
      <h2>Exploit Approved!</h2>
      <p>Your submission <strong style="color:#00ffaa">${t}</strong> has been reviewed and approved by our team.</p>
      <p>It's now live in the exploit database for the community to use and learn from.</p>
      <a href="https://xcloak.tech/exploits" class="btn">View exploit →</a>
    `)}),exploitRejected:(e,t,r)=>({subject:`❌ Exploit submission update: "${t}"`,html:n(`
      <h2>Submission Not Approved</h2>
      <p>Unfortunately, your exploit <strong style="color:#ff3a5c">${t}</strong> was not approved.</p>
      ${r?`<p><strong style="color:#e2e8f0">Reason:</strong> ${r}</p>`:""}
      <p>You're welcome to revise and resubmit. Check our submission guidelines for more info.</p>
      <a href="https://xcloak.tech/exploits/upload" class="btn">Resubmit →</a>
    `)}),ctfSolved:(e,t,r)=>({subject:`🏆 CTF Solved: ${t} (+${r} pts)`,html:n(`
      <h2>Challenge Complete!</h2>
      <p>You solved <strong style="color:#facc15">${t}</strong> and earned
         <span class="tag" style="background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);color:#facc15;">+${r} points</span></p>
      <p>Keep going — more challenges await on the leaderboard.</p>
      <a href="https://xcloak.tech/ctf" class="btn">Next challenge →</a>
    `)}),learningPathApproved:(e,t)=>({subject:`🎉 Your learning path "${t}" is live!`,html:n(`
      <h2>Path Approved!</h2>
      <p>Your learning path <strong style="color:#00ffaa">${t}</strong> has been approved and is now live for the community.</p>
      <p>Other learners can now enroll, follow your modules, and earn XP from your content.</p>
      <a href="https://xcloak.tech/learn" class="btn">View your path →</a>
    `)}),learningPathRejected:(e,t,r)=>({subject:`Learning path update: "${t}"`,html:n(`
      <h2>Path Not Approved</h2>
      <p>Your learning path <strong style="color:#ff3a5c">${t}</strong> needs some changes before it can go live.</p>
      ${r?`<p><strong style="color:#e2e8f0">Feedback:</strong> ${r}</p>`:""}
      <a href="https://xcloak.tech/learn" class="btn">Edit and resubmit →</a>
    `)}),ctfApproved:(e,t)=>({subject:`✅ CTF Challenge approved: "${t}"`,html:n(`
      <h2>CTF Challenge Live!</h2>
      <p>Your challenge <strong style="color:#00ffaa">${t}</strong> has been approved and is now live.</p>
      <p>The community can now attempt to solve it and earn points!</p>
      <a href="https://xcloak.tech/ctf" class="btn">View challenge →</a>
    `)}),scanComplete:(e,t,r)=>({subject:`🔍 Scan complete: ${t} — ${r} finding${1!==r?"s":""}`,html:n(`
      <h2>Scan Complete</h2>
      <p>Your scan of <strong style="color:#00aaff">${t}</strong> has finished.</p>
      <p>We found <span class="tag" style="background:rgba(255,58,92,0.1);border:1px solid rgba(255,58,92,0.25);color:#ff3a5c;">${r} finding${1!==r?"s":""}</span>. Review them in your dashboard.</p>
      <a href="https://xcloak.tech/findings" class="btn">View findings →</a>
    `)}),passwordReset:(e,t)=>({subject:"\uD83D\uDD11 Reset your XCloak password",html:n(`
      <h2>Password Reset</h2>
      <p>We received a request to reset the password for <strong style="color:#e2e8f0">${e}</strong>.</p>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      <a href="${t}" class="btn">Reset password →</a>
    `)})}},43219:(e,t,r)=>{"use strict";r.d(t,{z:()=>a});let o=require("@prisma/client"),a=globalThis.prisma??new o.PrismaClient({log:[]})}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[638,5452],()=>r(17969));module.exports=o})();