import { NextRequest, NextResponse } from 'next/server'
import net from 'net'

const TOP_PORTS = [
  { port: 21, service: 'FTP' },    { port: 22, service: 'SSH' },
  { port: 25, service: 'SMTP' },   { port: 53, service: 'DNS' },
  { port: 80, service: 'HTTP' },   { port: 110, service: 'POP3' },
  { port: 143, service: 'IMAP' },  { port: 443, service: 'HTTPS' },
  { port: 445, service: 'SMB' },   { port: 3306, service: 'MySQL' },
  { port: 3389, service: 'RDP' },  { port: 5432, service: 'PostgreSQL' },
  { port: 6379, service: 'Redis' },{ port: 8080, service: 'HTTP-Alt' },
  { port: 8443, service: 'HTTPS-Alt' }, { port: 27017, service: 'MongoDB' },
]

function checkPort(host: string, port: number, timeout = 2000): Promise<boolean> {
  return new Promise(resolve => {
    const socket = new net.Socket()
    socket.setTimeout(timeout)
    socket.on('connect', () => { socket.destroy(); resolve(true) })
    socket.on('timeout', () => { socket.destroy(); resolve(false) })
    socket.on('error', () => resolve(false))
    socket.connect(port, host)
  })
}

export async function GET(req: NextRequest) {
  const host = req.nextUrl.searchParams.get('host')
  if (!host) return NextResponse.json({ error: 'host required' }, { status: 400 })

  const safe = host.replace(/[^a-zA-Z0-9.\-]/g, '').slice(0, 100)

  const results = await Promise.all(
    TOP_PORTS.map(async ({ port, service }) => {
      const open = await checkPort(safe, port)
      return open ? { port, service } : null
    })
  )

  const open = results.filter(Boolean) as { port: number; service: string }[]
  return NextResponse.json({ host: safe, open })
}
