import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Service — Suritargets'
export { size }
export const contentType = 'image/png'

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default async function Image({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params
  return makeOgImage(slugToTitle(slug), 'Business Technology Solutions · Suritargets')
}
