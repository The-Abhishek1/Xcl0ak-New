'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { esoApi } from '@/lib/eso/api'

const inp = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 font-mono text-[12px] text-slate-200 outline-none focus:border-accent/30 transition-colors placeholder-slate-700"

export default function TeamsPage() {
  const [teams,      setTeams]      = useState<any[]>([])
  const [selected,   setSelected]   = useState<string|null>(null)
  const [members,    setMembers]    = useState<any[]>([])
  const [teamScans,  setTeamScans]  = useState<any[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [form,       setForm]       = useState({name:'',description:''})
  const [invite,     setInvite]     = useState('')

  const load = () => esoApi.get('/collab/teams').then(r=>setTeams(r.teams??[])).catch(()=>{})
  useEffect(()=>{ load() },[])

  const selectTeam = (id: string) => {
    setSelected(id)
    esoApi.get(`/collab/teams/${id}/members`).then(r=>setMembers(r.members??[])).catch(()=>{})
    esoApi.get(`/collab/teams/${id}/scans`).then(r=>setTeamScans(r.scans??[])).catch(()=>{})
  }

  const createTeam = async () => {
    if (!form.name) return
    await esoApi.post('/collab/teams',form).catch(()=>{})
    setForm({name:'',description:''}); setShowCreate(false); load()
  }

  const sendInvite = async () => {
    if (!invite||!selected) return
    try { await esoApi.post(`/collab/teams/${selected}/invite`,{email:invite}); setInvite(''); selectTeam(selected) }
    catch (e:any) { alert(e.message) }
  }

  const removeMember = async (uid: string) => {
    if (!selected||!confirm('Remove?')) return
    await esoApi.del(`/collab/teams/${selected}/members/${uid}`).catch(()=>{}); selectTeam(selected)
  }

  return (
    <div className="p-3 sm:p-5">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black">Team <span className="text-accent">Workspace</span></h1>
          <p className="font-mono text-[11px] text-slate-500 mt-1">Share scans and findings across your team</p>
        </div>
        <button onClick={()=>setShowCreate(!showCreate)}
          className="px-4 py-2.5 rounded-xl border font-mono text-[12px] font-bold cursor-pointer transition-all"
          style={{background:'rgba(0,255,170,0.08)',borderColor:'rgba(0,255,170,0.25)',color:'#00ffaa'}}>
          + New Team
        </button>
      </div>

      {showCreate&&(
        <div className="glass p-5 mb-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Create Team</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input className={inp} placeholder="Team name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
            <input className={inp} placeholder="Description" value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
          </div>
          <div className="flex gap-2">
            <button onClick={createTeam} className="px-4 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer" style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>Create</button>
            <button onClick={()=>setShowCreate(false)} className="px-4 py-2 rounded-lg border border-white/[0.08] font-mono text-[11px] text-slate-500 cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        <div className="glass p-4">
          <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Your Teams</div>
          {teams.length===0 ? (
            <div className="text-center py-8 font-mono text-[11px] text-slate-600">No teams yet</div>
          ) : teams.map(t=>(
            <div key={t.team_id} onClick={()=>selectTeam(t.team_id)}
              className="p-3 rounded-lg border mb-2 cursor-pointer transition-all"
              style={selected===t.team_id?{background:'rgba(0,255,170,0.06)',borderColor:'rgba(0,255,170,0.2)'}:{background:'rgba(255,255,255,0.02)',borderColor:'rgba(255,255,255,0.06)'}}>
              <div className="text-[13px] font-semibold text-slate-200">{t.name}</div>
              <div className="font-mono text-[10px] text-slate-600">{t.member_count} member{t.member_count!==1?'s':''} · {t.role}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {selected ? (
            <>
              <div className="glass p-4">
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-600 mb-3">Members</div>
                <div className="flex gap-2 mb-4">
                  <input className={inp} placeholder="Invite by email..." value={invite} onChange={e=>setInvite(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendInvite()}/>
                  <button onClick={sendInvite} className="px-4 py-2 rounded-lg border font-mono text-[11px] font-bold cursor-pointer shrink-0" style={{background:'rgba(0,255,170,0.1)',borderColor:'rgba(0,255,170,0.3)',color:'#00ffaa'}}>Invite</button>
                </div>
                <div className="space-y-2">
                  {members.map(m=>(
                    <div key={m.user_id} className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                      <div>
                        <div className="text-[13px] font-semibold text-slate-200">{m.username}</div>
                        <div className="font-mono text-[10px] text-slate-600">{m.email} · {m.role}</div>
                      </div>
                      {m.role!=='admin'&&m.role!=='owner'&&(
                        <button onClick={()=>removeMember(m.user_id)} className="font-mono text-[10px] text-red-400 cursor-pointer">Remove</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass overflow-hidden">
                <div className="px-4 py-2.5 border-b border-white/[0.06]">
                  <span className="font-mono text-[10px] text-accent2 uppercase tracking-widest">Shared Scans</span>
                </div>
                {teamScans.length===0 ? (
                  <div className="p-8 text-center font-mono text-[11px] text-slate-600">No shared scans yet</div>
                ) : teamScans.map(s=>(
                  <Link key={s.process_id} href={`/scan/${s.process_id}`}
                    className="flex items-center justify-between px-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <div>
                      <div className="text-[13px] font-semibold text-slate-200">{s.target}</div>
                      <div className="font-mono text-[10px] text-slate-600">{s.username} · {s.findings_count} findings</div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">{s.status}</span>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="glass p-10 text-center">
              <div className="text-3xl mb-3 opacity-20">👥</div>
              <div className="font-mono text-[11px] text-slate-600">Select a team to view members and shared scans</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
