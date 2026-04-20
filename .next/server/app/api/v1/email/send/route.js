(()=>{var e={};e.id=4121,e.ids=[4121],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},70129:(e,t,o)=>{"use strict";o.r(t),o.d(t,{patchFetch:()=>f,routeModule:()=>d,serverHooks:()=>g,workAsyncStorage:()=>h,workUnitAsyncStorage:()=>u});var r={};o.r(r),o.d(r,{POST:()=>c});var a=o(42706),s=o(28203),n=o(45994),l=o(39187),i=o(14702);let p=process.env.INTERNAL_EMAIL_SECRET??"xcloak-internal";async function c(e){if(e.headers.get("x-internal-secret")!==p)return l.NextResponse.json({error:"Unauthorized"},{status:401});let{event:t,to:o,username:r,data:a}=await e.json();if(!t||!o)return l.NextResponse.json({error:"event and to required"},{status:400});let s=null;switch(t){case"welcome":s=i.k.welcome(r??o.split("@")[0]);break;case"password_reset":s=i.k.passwordReset(r??o.split("@")[0],a?.resetLink??"");break;case"scan_complete":s=i.k.scanComplete(r??o.split("@")[0],a?.target??"Unknown",a?.findings??0);break;case"payment":case"upgrade":s={subject:`✅ Your XCloak ${a?.tier??"Pro"} plan is active`,html:`<p>Hi ${r??"there"},</p><p>Your plan upgrade to <strong>${a?.tier??"Pro"}</strong> is confirmed. Enjoy your new features!</p><p>— XCloak Team</p>`};break;case"exploit_approved":s=i.k.exploitApproved(r??o.split("@")[0],a?.title??"");break;case"exploit_rejected":s=i.k.exploitRejected(r??o.split("@")[0],a?.title??"",a?.reason??"");break;case"ctf_solved":s=i.k.ctfSolved(r??o.split("@")[0],a?.challengeTitle??"",a?.points??0);break;case"learning_path_approved":s=i.k.learningPathApproved(r??o.split("@")[0],a?.pathTitle??"");break;case"learning_path_rejected":s=i.k.learningPathRejected(r??o.split("@")[0],a?.pathTitle??"",a?.reason??"");break;default:return l.NextResponse.json({error:`Unknown event: ${t}`},{status:400})}let n=await (0,i.Z)({to:o,...s});return l.NextResponse.json({ok:n})}let d=new a.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/v1/email/send/route",pathname:"/api/v1/email/send",filename:"route",bundlePath:"app/api/v1/email/send/route"},resolvedPagePath:"/home/idiot/Projects/Claude/xcloak/src/app/api/v1/email/send/route.ts",nextConfigOutput:"",userland:r}),{workAsyncStorage:h,workUnitAsyncStorage:u,serverHooks:g}=d;function f(){return(0,n.patchFetch)({workAsyncStorage:h,workUnitAsyncStorage:u})}},96487:()=>{},78335:()=>{},14702:(e,t,o)=>{"use strict";o.d(t,{Z:()=>s,k:()=>l});let r=process.env.EMAIL_FROM??"XCloak <admin@xcloak.tech>",a=process.env.RESEND_API_KEY??"";async function s(e){if(!a)return console.log("[email] No RESEND_API_KEY — would have sent:",e.subject,"→",e.to),!1;try{let t=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({from:r,to:Array.isArray(e.to)?e.to:[e.to],subject:e.subject,html:e.html,reply_to:e.replyTo})});if(!t.ok){let e=await t.text();return console.error("[email] Resend error:",e),!1}return!0}catch(e){return console.error("[email] fetch failed:",e),!1}}let n=e=>`
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
`,l={welcome:e=>({subject:"\uD83D\uDEE1 Welcome to XCloak — your security journey starts now",html:n(`
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
    `)}),exploitRejected:(e,t,o)=>({subject:`❌ Exploit submission update: "${t}"`,html:n(`
      <h2>Submission Not Approved</h2>
      <p>Unfortunately, your exploit <strong style="color:#ff3a5c">${t}</strong> was not approved.</p>
      ${o?`<p><strong style="color:#e2e8f0">Reason:</strong> ${o}</p>`:""}
      <p>You're welcome to revise and resubmit. Check our submission guidelines for more info.</p>
      <a href="https://xcloak.tech/exploits/upload" class="btn">Resubmit →</a>
    `)}),ctfSolved:(e,t,o)=>({subject:`🏆 CTF Solved: ${t} (+${o} pts)`,html:n(`
      <h2>Challenge Complete!</h2>
      <p>You solved <strong style="color:#facc15">${t}</strong> and earned
         <span class="tag" style="background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);color:#facc15;">+${o} points</span></p>
      <p>Keep going — more challenges await on the leaderboard.</p>
      <a href="https://xcloak.tech/ctf" class="btn">Next challenge →</a>
    `)}),learningPathApproved:(e,t)=>({subject:`🎉 Your learning path "${t}" is live!`,html:n(`
      <h2>Path Approved!</h2>
      <p>Your learning path <strong style="color:#00ffaa">${t}</strong> has been approved and is now live for the community.</p>
      <p>Other learners can now enroll, follow your modules, and earn XP from your content.</p>
      <a href="https://xcloak.tech/learn" class="btn">View your path →</a>
    `)}),learningPathRejected:(e,t,o)=>({subject:`Learning path update: "${t}"`,html:n(`
      <h2>Path Not Approved</h2>
      <p>Your learning path <strong style="color:#ff3a5c">${t}</strong> needs some changes before it can go live.</p>
      ${o?`<p><strong style="color:#e2e8f0">Feedback:</strong> ${o}</p>`:""}
      <a href="https://xcloak.tech/learn" class="btn">Edit and resubmit →</a>
    `)}),ctfApproved:(e,t)=>({subject:`✅ CTF Challenge approved: "${t}"`,html:n(`
      <h2>CTF Challenge Live!</h2>
      <p>Your challenge <strong style="color:#00ffaa">${t}</strong> has been approved and is now live.</p>
      <p>The community can now attempt to solve it and earn points!</p>
      <a href="https://xcloak.tech/ctf" class="btn">View challenge →</a>
    `)}),scanComplete:(e,t,o)=>({subject:`🔍 Scan complete: ${t} — ${o} finding${1!==o?"s":""}`,html:n(`
      <h2>Scan Complete</h2>
      <p>Your scan of <strong style="color:#00aaff">${t}</strong> has finished.</p>
      <p>We found <span class="tag" style="background:rgba(255,58,92,0.1);border:1px solid rgba(255,58,92,0.25);color:#ff3a5c;">${o} finding${1!==o?"s":""}</span>. Review them in your dashboard.</p>
      <a href="https://xcloak.tech/findings" class="btn">View findings →</a>
    `)}),passwordReset:(e,t)=>({subject:"\uD83D\uDD11 Reset your XCloak password",html:n(`
      <h2>Password Reset</h2>
      <p>We received a request to reset the password for <strong style="color:#e2e8f0">${e}</strong>.</p>
      <p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      <a href="${t}" class="btn">Reset password →</a>
    `)})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[638,5452],()=>o(70129));module.exports=r})();