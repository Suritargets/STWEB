import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Portfolio — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Portfolio', "Projects we've delivered")
}
