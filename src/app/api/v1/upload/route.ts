import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ALLOWED_TYPES = [
  'text/plain','text/x-python','text/x-sh','text/x-c','text/x-ruby',
  'application/zip','application/x-zip-compressed',
  'application/octet-stream','application/x-tar','application/gzip',
  'text/html','application/json','text/markdown',
]
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: NextRequest) {
  try {
    const formData  = await req.formData()
    const file      = formData.get('file') as File | null
    const bucket    = (formData.get('bucket') as string) ?? 'xcloak-files'
    const prefix    = (formData.get('prefix') as string) ?? 'uploads'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })

    // Sanitize filename
    const ext  = file.name.split('.').pop()?.toLowerCase() ?? 'bin'
    const safe = `${prefix}/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`

    const bytes  = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(safe, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: false,
      })

    if (error) {
      // If bucket doesn't exist, return a mock URL for dev
      console.error('[Upload] Supabase error:', error.message)
      // Still return success in dev — store file path as placeholder
      return NextResponse.json({
        url: null,
        path: safe,
        name: file.name,
        size: file.size,
        note: 'File storage not configured — create a Supabase bucket named "xcloak-files"',
      })
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return NextResponse.json({ url: urlData.publicUrl, path: data.path, name: file.name, size: file.size })

  } catch (err: any) {
    console.error('[Upload]', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
