import { createHash } from 'crypto'

export function makeSessionToken(password: string): string {
  return createHash('sha256')
    .update(password + 'surtargets-admin-2026')
    .digest('hex')
}

export function isAuthenticated(sessionToken: string | undefined): boolean {
  if (!sessionToken || !process.env.ADMIN_PASSWORD) return false
  return sessionToken === makeSessionToken(process.env.ADMIN_PASSWORD)
}
