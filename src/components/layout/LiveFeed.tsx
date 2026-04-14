import type { OTXPulse } from '@/lib/otx'
import { timeAgo } from '@/lib/utils'

interface Props { pulses: OTXPulse[] }

function typeTag(p: OTXPulse) {
  const t = [...(p.tags??[]),...(p.malware_families??[]),p.adversary??''].join(' ').toLowerCase()
  if (/ransomware/.test(t)) return { label:'RANSOMWARE', cls:'bg-red-500/15 text-red-400 border-red-500/25' }
  if (/apt/.test(t))        return { label:'APT',        cls:'bg-purple-500/15 text-purple-400 border-purple-500/25' }
  if (/phish/.test(t))      return { label:'PHISHING',   cls:'bg-orange-500/15 text-orange-400 border-orange-500/25' }
  if (/ddos/.test(t))       return { label:'DDOS',       cls:'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' }
  if (/malware/.test(t))    return { label:'MALWARE',    cls:'bg-red-500/15 text-red-400 border-red-500/25' }
  return { label:'THREAT', cls:'bg-slate-500/15 text-slate-400 border-slate-500/25' }
}

const SEV: Record<string,string> = { high:'bg-red-500', medium:'bg-orange-400', low:'bg-slate-500' }

export function LiveFeed({ pulses }: Props) {
  return (
    <div className="glass overflow-hidden animate-fin" style={{ animationDelay:'0.1s' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="live-dot"/>
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color:'#00ffaa' }}>OTX Threat Feed</span>
        </div>
        <a href="https://otx.alienvault.com" target="_blank" rel="noreferrer"
          className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">OTX ↗</a>
      </div>

      <div className="overflow-y-auto" style={{ maxHeight:'340px' }}>
        {pulses.length === 0 && (
          <div className="px-4 py-8 text-center font-mono text-[11px] text-slate-600 animate-pulse">
            Loading OTX pulses... (click SYNC if empty)
          </div>
        )}
        {pulses.map(pulse => {
          const sev  = pulse.tlp === 'red' ? 'high' : pulse.tlp === 'amber' ? 'medium' : 'low'
          const tag  = typeTag(pulse)
          return (
            <a key={pulse.id}
              href={`https://otx.alienvault.com/pulse/${pulse.id}`}
              target="_blank" rel="noreferrer"
              className="flex gap-2.5 px-4 py-2.5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors block">
              <div className={`w-[3px] rounded-full shrink-0 self-stretch ${SEV[sev]}`}/>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-semibold text-slate-200 truncate mb-1 leading-snug">{pulse.name}</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`font-mono text-[9px] px-1.5 py-[1px] rounded border ${tag.cls}`}>{tag.label}</span>
                  {pulse.targeted_countries?.slice(0,2).map(c => (
                    <span key={c} className="font-mono text-[9px] text-slate-600">{c}</span>
                  ))}
                  {pulse.adversary && <span className="font-mono text-[9px] text-orange-400">{pulse.adversary}</span>}
                  <span className="font-mono text-[9px] text-slate-700 ml-auto">{timeAgo(pulse.modified ?? pulse.created)}</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
