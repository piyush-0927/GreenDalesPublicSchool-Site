import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const BUCKET = 'gdps-images'
let urls = []

const supabase = createClient(
    'https://cjffzybueafrrgwiypgv.supabase.co',
      'sb_publishable_0QymttvK4hY4JEsKOjTKpQ_gR8dixHX'
)

export async function LoadImageUrls() {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list('', { sortBy: { column: 'created_at', order: 'asc' } })

  if (error) {
    console.error(error)
    return []
  }

  return data
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl)
}