import { createHmac } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAdminUserById, type AdminUser, type AdminRole } from './admin-users'

export { hashPassword, verifyPassword } from './password'

function sessionSecret(): string {
  return process.env.SESSION_SECRET ?? 'surtargets-admin-2026'
}

export function makeSessionToken(userId: number, passwordHash: string): string {
  const signature = createHmac('sha256', sessionSecret())
    .update(`${userId}:${passwordHash}`)
    .digest('hex')
  return `${userId}.${signature}`
}

export async function getSessionUser(sessionToken: string | undefined): Promise<AdminUser | null> {
  if (!sessionToken) return null
  const [idPart, signature] = sessionToken.split('.')
  const id = Number(idPart)
  if (!id || !signature) return null

  const user = await getAdminUserById(id)
  if (!user) return null

  const expected = makeSessionToken(user.id, user.password_hash)
  return expected === sessionToken ? user : null
}

// Server-component guard: redirects to /admin/login when not authenticated,
// or to the dashboard home when authenticated but lacking an allowed role.
export async function requireAdminUser(allowedRoles?: AdminRole[]): Promise<AdminUser> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  const user = await getSessionUser(token)
  if (!user) redirect('/admin/login')
  if (allowedRoles && !allowedRoles.includes(user.role)) redirect('/admin/dashboard')
  return user
}
