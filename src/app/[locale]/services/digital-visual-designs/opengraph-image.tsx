import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Social Media Design Package — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Your Social Posts on Auto-Pilot', 'From $15/month · Suritargets')
}
