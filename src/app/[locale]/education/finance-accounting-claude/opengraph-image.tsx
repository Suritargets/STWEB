import { makeOgImage, size } from '@/lib/og-image'

export const runtime = 'nodejs'
export const alt = 'Finance & Accounting with Claude AI — Suritargets'
export { size }
export const contentType = 'image/png'

export default async function Image() {
  return makeOgImage('Finance & Accounting with Claude AI', 'Automate your bookkeeping with AI')
}
