import { neon } from '@neondatabase/serverless'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type Submission = {
  id: number
  naam: string
  bedrijfsnaam: string
  email: string
  telefoon: string | null
  services: string[]
  budget: string | null
  bericht: string
  anders_text: string | null
  created_at: string
}

export async function ensureSubmissionsTable() {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS submissions (
      id            SERIAL PRIMARY KEY,
      naam          TEXT NOT NULL,
      bedrijfsnaam  TEXT NOT NULL,
      email         TEXT NOT NULL,
      telefoon      TEXT,
      services      TEXT[],
      budget        TEXT,
      bericht       TEXT,
      anders_text   TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function insertSubmission(data: {
  naam: string
  bedrijfsnaam: string
  email: string
  telefoon?: string
  services: string[]
  budget?: string
  bericht: string
  andersText?: string
}) {
  const db = sql()
  const rows = await db`
    INSERT INTO submissions (naam, bedrijfsnaam, email, telefoon, services, budget, bericht, anders_text)
    VALUES (
      ${data.naam},
      ${data.bedrijfsnaam},
      ${data.email},
      ${data.telefoon ?? null},
      ${data.services},
      ${data.budget ?? null},
      ${data.bericht},
      ${data.andersText ?? null}
    )
    RETURNING id
  `
  return rows[0] as { id: number }
}

export async function getSubmissions() {
  const db = sql()
  const rows = await db`
    SELECT * FROM submissions ORDER BY created_at DESC
  `
  return rows as Submission[]
}
