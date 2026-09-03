import { neon } from '@neondatabase/serverless'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type WebinarRegistration = {
  id: number
  naam: string
  email: string
  telefoon: string | null
  referral_source: string | null
  created_at: string
}

type InsertWebinarRegistrationData = {
  naam: string
  email: string
  telefoon?: string
  referralSource?: string
}

export async function ensureWebinarRegistrationsTable(): Promise<void> {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS webinar_registrations (
      id               SERIAL PRIMARY KEY,
      naam             TEXT NOT NULL,
      email            TEXT NOT NULL,
      telefoon         TEXT,
      referral_source  TEXT,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

export async function insertWebinarRegistration(
  data: InsertWebinarRegistrationData
): Promise<{ id: number }> {
  const db = sql()
  const rows = await db`
    INSERT INTO webinar_registrations (naam, email, telefoon, referral_source)
    VALUES (${data.naam}, ${data.email}, ${data.telefoon ?? null}, ${data.referralSource ?? null})
    RETURNING id
  `
  return rows[0] as { id: number }
}

export async function getWebinarRegistrations(): Promise<WebinarRegistration[]> {
  const db = sql()
  const rows = await db`SELECT * FROM webinar_registrations ORDER BY created_at DESC`
  return rows as WebinarRegistration[]
}
