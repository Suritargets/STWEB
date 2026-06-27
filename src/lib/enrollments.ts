import { neon } from '@neondatabase/serverless'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type Enrollment = {
  id: number
  course_slug: string
  course_name: string
  enrollment_type: 'individual' | 'team'
  client_type: 'zakelijk' | 'particulier'
  naam: string
  bedrijfsnaam: string | null
  email: string
  telefoon: string | null
  deelnemers: number
  uren: number | null
  total_usd: number
  calculator_data: Record<string, unknown> | null
  opmerkingen: string | null
  status: 'pending' | 'confirmed' | 'paid'
  created_at: string
}

type InsertEnrollmentData = {
  courseSlug: string
  courseName: string
  enrollmentType: 'individual' | 'team'
  clientType: 'zakelijk' | 'particulier'
  naam: string
  bedrijfsnaam?: string
  email: string
  telefoon?: string
  deelnemers: number
  uren?: number
  totalUsd: number
  calculatorData?: Record<string, unknown>
  opmerkingen?: string
}

export async function ensureEnrollmentsTable(): Promise<void> {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS enrollments (
      id               SERIAL PRIMARY KEY,
      course_slug      TEXT NOT NULL,
      course_name      TEXT NOT NULL,
      enrollment_type  TEXT NOT NULL CHECK (enrollment_type IN ('individual','team')),
      client_type      TEXT NOT NULL CHECK (client_type IN ('zakelijk','particulier')),
      naam             TEXT NOT NULL,
      bedrijfsnaam     TEXT,
      email            TEXT NOT NULL,
      telefoon         TEXT,
      deelnemers       INTEGER NOT NULL DEFAULT 1,
      uren             INTEGER,
      total_usd        NUMERIC(10,2) NOT NULL,
      calculator_data  JSONB,
      opmerkingen      TEXT,
      status           TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','confirmed','paid')),
      created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

export async function insertEnrollment(data: InsertEnrollmentData): Promise<{ id: number }> {
  const db = sql()
  const rows = await db`
    INSERT INTO enrollments (
      course_slug, course_name, enrollment_type, client_type,
      naam, bedrijfsnaam, email, telefoon,
      deelnemers, uren, total_usd, calculator_data, opmerkingen
    ) VALUES (
      ${data.courseSlug}, ${data.courseName}, ${data.enrollmentType}, ${data.clientType},
      ${data.naam}, ${data.bedrijfsnaam ?? null}, ${data.email}, ${data.telefoon ?? null},
      ${data.deelnemers}, ${data.uren ?? null}, ${data.totalUsd},
      ${data.calculatorData ? JSON.stringify(data.calculatorData) : null},
      ${data.opmerkingen ?? null}
    )
    RETURNING id
  `
  return rows[0] as { id: number }
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const db = sql()
  const rows = await db`SELECT * FROM enrollments ORDER BY created_at DESC`
  return rows as Enrollment[]
}

export async function updateEnrollmentStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'paid'
): Promise<void> {
  const db = sql()
  await db`UPDATE enrollments SET status = ${status} WHERE id = ${id}`
}
