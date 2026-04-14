interface Props { cveCount:number; critical:number; exploitable:number; exploitCount:number; threatCount:number; pulseCount:number }

export function StatCards({ cveCount, critical, exploitable, exploitCount, threatCount, pulseCount }: Props) {
  const cards = [
    { label:'Critical CVEs',   value:critical,     color:'#ff3a5c' },
    { label:'Exploitable Now', value:exploitable,  color:'#ff3a5c' },
    { label:'CVEs in DB',      value:cveCount,     color:'#ff8c42' },
    { label:'Active Exploits', value:exploitCount, color:'#ffd700' },
    { label:'Threat Events',   value:threatCount,  color:'#00ffaa' },
    { label:'OTX Pulses',      value:pulseCount,   color:'#00aaff' },
  ]
  return (
    <div className="grid grid-cols-6 gap-3">
      {cards.map((c,i) => (
        <div key={i} className="glass px-4 py-3 relative overflow-hidden animate-fin" style={{animationDelay:`${i*0.05}s`}}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${c.color},transparent)`}}/>
          <div className="font-mono text-[9px] tracking-widest text-slate-600 uppercase mb-1.5">{c.label}</div>
          <div className="font-mono text-2xl font-bold" style={{color:c.color}}>{c.value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
