'use client'
export default function PlaygroundPage() {
  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-black">Exploit <span className="text-accent">Playground</span></h1>
        <p className="font-mono text-[11px] text-slate-500 mt-1">
          Sandboxed vulnerable environments — Docker-based isolated labs
        </p>
      </div>
      <div className="glass p-8 text-center">
        <div className="text-4xl mb-4">🐳</div>
        <div className="font-mono text-[13px] text-slate-400 mb-2">Docker Sandbox Engine</div>
        <div className="text-[13px] text-slate-500 max-w-md mx-auto mb-6">
          The playground requires a local Docker daemon. Deploy vulnerable labs (DVWA, WebGoat, Metasploitable)
          on your machine via the API.
        </div>
        <div className="font-mono text-[11px] text-slate-600 bg-black/30 rounded-lg p-4 text-left inline-block">
          <div className="text-accent mb-2"># Deploy DVWA locally</div>
          <div>curl -X POST http://localhost:3000/api/v1/sandbox/deploy \</div>
          <div className="pl-4">-d {'{"image":"dvwa","port":8888}'}</div>
        </div>
      </div>
    </div>
  )
}
