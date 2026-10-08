import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Our Services — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Our Services', 'Business technology solutions for Suriname')
}
