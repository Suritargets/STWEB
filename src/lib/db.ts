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

export type Stats = {
  total: number
  thisMonth: number
  uniqueCompanies: number
  topService: string | null
}

export async function getStats(): Promise<Stats> {
  const db = sql()
  try {
    const [tot] = await db`SELECT COUNT(*)::int as count FROM submissions`
    const [mon] = await db`SELECT COUNT(*)::int as count FROM submissions WHERE created_at >= date_trunc('month', NOW())`
    const [uniq] = await db`SELECT COUNT(DISTINCT bedrijfsnaam)::int as count FROM submissions`
    const tops = await db`
      SELECT unnest(services) as service, COUNT(*)::int as cnt
      FROM submissions WHERE services IS NOT NULL
      GROUP BY service ORDER BY cnt DESC LIMIT 1
    `
    return {
      total: (tot as { count: number }).count,
      thisMonth: (mon as { count: number }).count,
      uniqueCompanies: (uniq as { count: number }).count,
      topService: tops[0] ? (tops[0] as { service: string }).service : null,
    }
  } catch {
    return { total: 0, thisMonth: 0, uniqueCompanies: 0, topService: null }
  }
}

export type DailyCount = { day: string; count: number }

export async function getDailyCounts(days = 14): Promise<DailyCount[]> {
  const db = sql()
  const start = new Date()
  start.setDate(start.getDate() - days + 1)
  start.setHours(0, 0, 0, 0)
  try {
    const rows = await db`
      SELECT DATE(created_at)::text as date, COUNT(*)::int as count
      FROM submissions WHERE created_at >= ${start.toISOString()}
      GROUP BY DATE(created_at) ORDER BY DATE(created_at)
    `
    const countMap: Record<string, number> = {}
    for (const r of rows as { date: string; count: number }[]) {
      countMap[r.date] = r.count
    }
    const result: DailyCount[] = []
    for (let i = 0; i < days; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      const key = d.toISOString().split('T')[0]
      const label = d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' })
      result.push({ day: label, count: countMap[key] ?? 0 })
    }
    return result
  } catch {
    return []
  }
}
