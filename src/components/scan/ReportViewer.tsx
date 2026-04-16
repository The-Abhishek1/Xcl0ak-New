'use client'
import { esoScans } from '@/lib/eso/api'

function mdToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\d+\.\s(.+)$/gm, '<p class="indent">• $1</p>')
    .replace(/^- (.+)$/gm, '<p class="indent">• $1</p>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c=>c.trim())
      if (cells.every(c=>/^[-\s]+$/.test(c))) return ''
      return '<tr>'+cells.map(c=>`<td>${c.trim()}</td>`).join('')+'</tr>'
    })
    .replace(/(<tr>.*?<\/tr>\s*)+/gs, '<table>$&</table>')
    .replace(/\n\n/g, '<br>')
}

export default function ReportViewer({ report, processId }: { report: string; processId: string }) {
  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]"
        style={{background:'rgba(0,170,255,0.03)'}}>
        <div className="flex items-center gap-2">
          <div className="live-dot" style={{background:'#00aaff'}}/>
          <span className="font-mono text-[10px] text-accent2 uppercase tracking-widest">Pentest Report</span>
        </div>
        <a href={esoScans.pdfUrl(processId)} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[10px] px-3 py-1.5 rounded border border-white/[0.08] text-slate-400 hover:text-accent2 hover:border-accent2/25 transition-all">
          📥 Download PDF
        </a>
      </div>
      <div className="p-5 report-body text-[13px] leading-relaxed overflow-y-auto" style={{maxHeight:'500px'}}
        dangerouslySetInnerHTML={{ __html: mdToHtml(report) }} />
      <style>{`
        .report-body h1{font-size:17px;color:#00aaff;font-weight:700;margin:16px 0 6px}
        .report-body h2{font-size:14px;color:#a78bfa;font-weight:600;margin:14px 0 5px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .report-body table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px;font-family:monospace}
        .report-body th{background:rgba(0,170,255,0.1);padding:7px 10px;text-align:left;color:#00aaff}
        .report-body td{padding:7px 10px;border-bottom:1px solid rgba(255,255,255,0.04);color:#94a3b8}
        .report-body strong{color:#a78bfa}
        .report-body p{margin:4px 0;color:#94a3b8}
        .report-body .indent{padding-left:16px}
      `}</style>
    </div>
  )
}
