'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface CVEDetail {
  cveId:string; description:string; cvssScore:number; cvssVector:string
  severity:string; vendor?:string|null; product?:string|null
  affectedVersions:string[]; patchAvailable:boolean; exploitableNow:boolean
  publishedAt:string; modifiedAt:string; references?:string[]
}

const SEV_COLOR:Record<string,string> = { CRITICAL:'#ff3a5c', HIGH:'#ff8c42', MEDIUM:'#ffd700', LOW:'#64748b' }

function snortRule(c:CVEDetail){
  const sid=parseInt(c.cveId.replace(/\D/g,'').slice(0,7)||'9999999')
  return `alert tcp any any -> any any (msg:"${c.cveId}"; sid:${sid}; rev:1;)`
}
function yaraRule(c:CVEDetail){
  const name=c.cveId.replace(/-/g,'_')
  return `rule ${name}
{
    meta:
        description = "${c.description.slice(0,80)}..."
        cve         = "${c.cveId}"
        severity    = "${c.severity}"
        date        = "${new Date(c.publishedAt).toISOString().split('T')[0]}"
    strings:
        $s1 = "${c.product??'unknown'}" nocase wide ascii
    condition:
        $s1
}`
}
function mitigations(c:CVEDetail):string[]{
  const m:string[]=[]
  if(c.vendor||c.product) m.push(`Check if you are running ${[c.vendor,c.product].filter(Boolean).join(' ')}`)
  if(c.patchAvailable) m.push('Apply vendor patch immediately')
  else m.push('Monitor vendor advisory — no patch available yet')
  m.push('Monitor vendor advisory for updates')
  m.push('Implement compensating controls')
  m.push('Review logs for exploitation indicators')
  if(c.severity==='CRITICAL') m.push('Consider emergency change process — CRITICAL severity')
  if(c.exploitableNow) m.push('⚠ Active exploitation detected — prioritize immediate remediation')
  return m
}

export default function CVEDetailPage() {
  const params  = useParams()
  const router  = useRouter()
  const cveId   = decodeURIComponent((params?.id as string)??'')
  const [cve, setCve]       = useState<CVEDetail|null>(null)
  const [loading,setLoading]= useState(true)
  const [notFound,setNotFound]= useState(false)
  const [ruleTab,setRuleTab]= useState<'SNORT'|'YARA'>('SNORT')
  const [copied, setCopied] = useState(false)

  useEffect(()=>{
    if(!cveId)return
    setLoading(true)
    fetch(`/api/v1/cve/${encodeURIComponent(cveId)}`)
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(d=>{setCve(d);setLoading(false)})
      .catch(()=>{
        fetch(`/api/v1/cve?q=${encodeURIComponent(cveId)}&limit=1`)
          .then(r=>r.json())
          .then(d=>{
            const arr=Array.isArray(d)?d:(d.vulns??[])
            if(arr.length){setCve(arr[0]);setLoading(false)}
            else{setNotFound(true);setLoading(false)}
          })
          .catch(()=>{setNotFound(true);setLoading(false)})
      })
  },[cveId])

  function copyRule(){
    const rule=ruleTab==='SNORT'?snortRule(cve!):yaraRule(cve!)
    navigator.clipboard.writeText(rule)
    setCopied(true);setTimeout(()=>setCopied(false),2000)
  }

  if(loading) return(
    <div className="p-5 flex items-center justify-center min-h-[60vh]">
      <span className="font-mono text-[13px] animate-pulse" style={{color:'#00ffaa'}}>⟳ Loading {cveId}...</span>
    </div>
  )
  if(notFound||!cve) return(
    <div className="p-5 text-center mt-20">
      <div className="text-4xl mb-4">🔍</div>
      <div className="font-mono text-[14px] text-slate-400 mb-4">{cveId} not found</div>
      <button onClick={()=>router.back()} className="font-mono text-[11px] px-4 py-2 rounded-lg border border-white/[0.08] text-slate-500">← Back</button>
    </div>
  )

  const color = SEV_COLOR[cve.severity]??'#64748b'
  const pub   = new Date(cve.publishedAt)
  const mod   = new Date(cve.modifiedAt)
  const card  = "glass px-4 py-3"

  return(
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">

      {/* Back */}
      <button onClick={()=>router.back()} className="font-mono text-[11px] text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5">
        ← Back
      </button>

      {/* Header card */}
      <div className="glass p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-mono text-xl sm:text-2xl font-bold" style={{color}}>{cve.cveId}</h1>
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border font-bold"
              style={{color,borderColor:color+'40',background:color+'15'}}>
              {cve.severity}
            </span>
            {cve.exploitableNow&&(
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border font-bold animate-pulse"
                style={{color:'#ff3a5c',borderColor:'rgba(255,58,92,0.4)',background:'rgba(255,58,92,0.12)'}}>
                Active
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <a href={`https://nvd.nist.gov/vuln/detail/${cve.cveId}`} target="_blank" rel="noreferrer"
              className="font-mono text-[11px] px-3 py-2 rounded-lg border border-white/[0.08] text-slate-400 hover:text-slate-200 transition-colors">
              VIEW ON NVD ↗
            </a>
            <a href={`https://otx.alienvault.com/indicator/cve/${cve.cveId}`} target="_blank" rel="noreferrer"
              className="font-mono text-[11px] px-3 py-2 rounded-lg border text-orange-400 hover:bg-orange-500/10 transition-colors"
              style={{borderColor:'rgba(255,140,66,0.3)'}}>
              OTX THREAT INTEL ↗
            </a>
          </div>
        </div>
        <h2 className="text-[15px] sm:text-[17px] font-semibold text-slate-200 leading-snug">
          {cve.severity.charAt(0)+cve.severity.slice(1).toLowerCase()} vulnerability
          {cve.vendor?` in ${cve.vendor}${cve.product?' '+cve.product:''}`:cve.product?' in '+cve.product:''}
        </h2>
      </div>

      {/* CVSS score big */}
      <div className={card}>
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">CVSS SCORE</div>
        <div className="flex items-center gap-4 mb-3">
          <span className="font-mono text-5xl font-black" style={{color}}>{cve.cvssScore.toFixed(1)}</span>
          <span className="font-mono text-[13px] px-3 py-1.5 rounded-full border font-bold"
            style={{color,borderColor:color+'40',background:color+'15'}}>{cve.severity}</span>
        </div>
        {/* Score bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
          <div className="h-full rounded-full" style={{width:`${cve.cvssScore*10}%`,background:`linear-gradient(90deg,#ffd700,${color})`}}/>
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {label:'CVSS',      value:cve.cvssScore.toFixed(1), color},
          {label:'Vendor',    value:cve.vendor??'—',          color:'#00aaff'},
          {label:'Product',   value:cve.product??'—',         color:'#a78bfa'},
          {label:'Published', value:pub.toISOString().split('T')[0], color:'#ff8c42'},
        ].map(m=>(
          <div key={m.label} className={card}>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-1.5">{m.label}</div>
            <div className="font-mono text-[14px] font-bold" style={{color:m.color}}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className={card}>
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">DESCRIPTION</div>
        <p className="text-[13.5px] text-slate-300 leading-relaxed">{cve.description}</p>
      </div>

      {/* Affected Versions + Patch Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className={card}>
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Affected Versions</div>
          {cve.affectedVersions.length>0
            ?<div className="flex flex-wrap gap-1.5">{cve.affectedVersions.map((v,i)=>(
                <span key={i} className="font-mono text-[11px] px-2 py-1 rounded border"
                  style={{background:'rgba(255,140,66,0.08)',color:'#ff8c42',borderColor:'rgba(255,140,66,0.2)'}}>{v}</span>
              ))}</div>
            :<span className="font-mono text-[11px] text-slate-600">Version data not available</span>
          }
        </div>
        <div className={card}>
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-2">Status</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${cve.patchAvailable?'bg-green-400':'bg-red-400 animate-pulse'}`}/>
              <span className="font-mono text-[12px]" style={{color:cve.patchAvailable?'#4ade80':'#ff3a5c'}}>
                {cve.patchAvailable?'Patch Available':'No Patch Available'}
              </span>
            </div>
            {cve.exploitableNow&&(
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"/>
                <span className="font-mono text-[12px] text-red-400">Actively Exploited</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={card}>
        <div className="font-mono text-[12px] font-bold text-slate-300 mb-4 flex items-center gap-2">
          <span>⏱</span> Timeline
        </div>
        <div className="relative pl-5 space-y-4">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/[0.08]"/>
          {[
            {date:pub.toISOString().split('T')[0], label:'CVE Published',    dot:'#ff3a5c'},
            ...(cve.exploitableNow?[{date:pub.toISOString().split('T')[0], label:'Active exploitation detected', dot:'#ff3a5c'}]:[]),
            {date:mod.toISOString().split('T')[0], label:'Last Modified',    dot:'#ffd700'},
            ...(cve.patchAvailable?[{date:mod.toISOString().split('T')[0], label:'Patch Released', dot:'#4ade80'}]:[]),
          ].map((item,i)=>(
            <div key={i} className="flex items-start gap-4 relative">
              <div className="absolute -left-[14px] w-3 h-3 rounded-full mt-0.5 border-2 shrink-0"
                style={{background:item.dot,borderColor:'#03050a'}}/>
              <div className="font-mono text-[11px] text-slate-600 w-24 shrink-0">{item.date}</div>
              <div className="font-mono text-[12px] text-slate-300">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* References */}
      {(cve.references?.length??0)>0&&(
        <div className={card}>
          <div className="font-mono text-[12px] font-bold text-slate-300 mb-3 flex items-center gap-2">
            <span>🔗</span> References
          </div>
          <div className="space-y-1.5">
            {cve.references!.map((ref,i)=>(
              <a key={i} href={ref} target="_blank" rel="noreferrer"
                className="block font-mono text-[11px] truncate hover:underline"
                style={{color:'#00aaff'}}>
                {ref}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mitigations */}
      <div className="glass p-5" style={{borderColor:'rgba(0,255,170,0.1)',background:'rgba(0,255,170,0.025)'}}>
        <div className="font-mono text-[12px] font-bold mb-3 flex items-center gap-2" style={{color:'#00ffaa'}}>
          <span>🛡</span> Mitigations
        </div>
        <ol className="space-y-2">
          {mitigations(cve).map((m,i)=>(
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono text-[10px] font-bold shrink-0 mt-0.5" style={{color:'#00ffaa'}}>{i+1}.</span>
              <span className="text-[13px] text-slate-300 leading-relaxed">{m}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Detection Rules */}
      <div className="glass overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <div className="font-mono text-[12px] font-bold text-slate-300">Detection Rules</div>
        </div>
        <div className="flex border-b border-white/[0.06]">
          {(['SNORT','YARA'] as const).map(t=>(
            <button key={t} onClick={()=>setRuleTab(t)}
              className="px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest cursor-pointer transition-all"
              style={{
                color:ruleTab===t?'#00ffaa':'#64748b',
                borderBottom:ruleTab===t?'2px solid #00ffaa':'2px solid transparent',
                background:ruleTab===t?'rgba(0,255,170,0.05)':'transparent',
              }}>{t}</button>
          ))}
        </div>
        <div className="p-4">
          <div className="font-mono text-[9px] text-slate-600 mb-2">{ruleTab.toLowerCase()}</div>
          <pre className="font-mono text-[11px] text-slate-300 p-4 rounded-lg overflow-x-auto leading-relaxed"
            style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.06)'}}>
            {ruleTab==='SNORT'?snortRule(cve):yaraRule(cve)}
          </pre>
          <button onClick={copyRule}
            className="mt-2 font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] cursor-pointer transition-all"
            style={{color:copied?'#00ffaa':'#64748b',borderColor:copied?'rgba(0,255,170,0.3)':'rgba(255,255,255,0.08)'}}>
            {copied?'✓ COPIED':'📋 Copy Rule'}
          </button>
        </div>
      </div>

      {/* Related exploits CTA */}
      <div className="glass p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] text-slate-500 mb-1">Find exploits for this CVE</div>
          <div className="text-[13px] text-slate-300">{cve.cveId}</div>
        </div>
        <div className="flex gap-2">
          <a href={`/exploits?cve=${cve.cveId}`}
            className="font-mono text-[11px] px-4 py-2.5 rounded-lg border transition-all"
            style={{background:'rgba(255,58,92,0.1)',borderColor:'rgba(255,58,92,0.3)',color:'#ff3a5c'}}>
            💉 Search Exploits
          </a>
          <a href={`https://www.exploit-db.com/search?cve=${cve.cveId.replace('CVE-','')}`}
            target="_blank" rel="noreferrer"
            className="font-mono text-[11px] px-4 py-2.5 rounded-lg border border-white/[0.08] text-slate-500 transition-all hover:text-slate-300">
            Exploit-DB ↗
          </a>
        </div>
      </div>

    </div>
  )
}
