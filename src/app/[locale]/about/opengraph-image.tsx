import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'About Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('About Suritargets', 'Our mission, team, and vision for Suriname')
}
