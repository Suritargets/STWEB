import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Technical Design & Project Support — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Technical Design & Project Support', 'CAD · 3D · BOM · Estimates · Suritargets')
}
