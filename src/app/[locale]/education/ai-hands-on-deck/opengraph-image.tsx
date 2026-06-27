import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'AI – Hands On Deck — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('AI – Hands On Deck', 'Practical AI training · $750/person')
}
