import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Suritargets — Business Intelligence & Digital Solutions'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Business Technology & Innovation Solutions')
}
