import { neon } from '@neondatabase/serverless'
import { hashPassword } from './password'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export const ADMIN_ROLES = ['sales', 'admin', 'super_admin'] as const
export type AdminRole = (typeof ADMIN_ROLES)[number]

export type AdminUser = {
  id: number
  email: string
  password_hash: string
  role: AdminRole
  created_at: string
}

export async function ensureAdminUsersTable(): Promise<void> {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS admin_users (
      id             SERIAL PRIMARY KEY,
      email          TEXT NOT NULL UNIQUE,
      password_hash  TEXT NOT NULL,
      role           TEXT NOT NULL CHECK (role IN ('sales','admin','super_admin')),
      created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

// One-time migration: if the table is still empty, seed it with the legacy
// ADMIN_EMAIL / ADMIN_PASSWORD env credentials as the first super_admin.
export async function ensureBootstrapSuperAdmin(): Promise<void> {
  const db = sql()
  const [{ count }] = await db`SELECT COUNT(*)::int as count FROM admin_users`
  if ((count as number) > 0) return

  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) return

  await db`
    INSERT INTO admin_users (email, password_hash, role)
    VALUES (${email}, ${hashPassword(password)}, 'super_admin')
    ON CONFLICT (email) DO NOTHING
  `
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const db = sql()
  const rows = await db`SELECT * FROM admin_users WHERE email = ${email}`
  return (rows[0] as AdminUser) ?? null
}

export async function getAdminUserById(id: number): Promise<AdminUser | null> {
  const db = sql()
  const rows = await db`SELECT * FROM admin_users WHERE id = ${id}`
  return (rows[0] as AdminUser) ?? null
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const db = sql()
  const rows = await db`SELECT * FROM admin_users ORDER BY created_at ASC`
  return rows as AdminUser[]
}

export async function insertAdminUser(data: { email: string; password: string; role: AdminRole }): Promise<AdminUser> {
  const db = sql()
  const rows = await db`
    INSERT INTO admin_users (email, password_hash, role)
    VALUES (${data.email}, ${hashPassword(data.password)}, ${data.role})
    RETURNING *
  `
  return rows[0] as AdminUser
}

export async function updateAdminUserRole(id: number, role: AdminRole): Promise<void> {
  const db = sql()
  await db`UPDATE admin_users SET role = ${role} WHERE id = ${id}`
}

export async function updateAdminUserPassword(id: number, password: string): Promise<void> {
  const db = sql()
  await db`UPDATE admin_users SET password_hash = ${hashPassword(password)} WHERE id = ${id}`
}

export async function deleteAdminUser(id: number): Promise<void> {
  const db = sql()
  await db`DELETE FROM admin_users WHERE id = ${id}`
}

export async function countSuperAdmins(): Promise<number> {
  const db = sql()
  const [{ count }] = await db`SELECT COUNT(*)::int as count FROM admin_users WHERE role = 'super_admin'`
  return count as number
}
