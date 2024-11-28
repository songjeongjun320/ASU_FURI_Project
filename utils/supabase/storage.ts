export function getImageUrl(path) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_CNTR_IMG_BUCKET}/${path}`;
}
