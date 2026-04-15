import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY!

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Upload a file to Supabase Storage and return the public URL
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Buffer,
  contentType?: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType: contentType ?? 'application/octet-stream',
        upsert: true,
      })
    if (error) { console.error('[Supabase upload]', error); return null }
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
    return urlData.publicUrl
  } catch (err) {
    console.error('[Supabase upload]', err)
    return null
  }
}
