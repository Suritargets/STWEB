import { neon } from '@neondatabase/serverless'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type SiteSettings = {
  site_name: string
  site_url: string
  default_locale: string
  contact_email: string
  company_name: string
  tagline: string
}

export type Integration = {
  id: string
  name: string
  description: string
  status: 'connected' | 'disconnected' | 'removed'
  config_url: string | null
  icon: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  site_name: 'Suritargets',
  site_url: 'https://www.suritargets.com',
  default_locale: 'nl',
  contact_email: '',
  company_name: 'Suritargets',
  tagline: 'Business Technology & Innovation Solutions',
}

export async function ensureSettingsTable() {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS site_settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `
  await db`
    CREATE TABLE IF NOT EXISTS integrations (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'disconnected',
      config_url  TEXT,
      icon        TEXT DEFAULT 'plug'
    )
  `

  // Seed default integrations if empty
  const existing = await db`SELECT COUNT(*)::int as count FROM integrations`
  if ((existing[0] as { count: number }).count === 0) {
    await db`
      INSERT INTO integrations (id, name, description, status, icon) VALUES
        ('neon',             'Neon Postgres',     'Serverless database',                 'connected',    'database'),
        ('vercel-analytics', 'Vercel Analytics',  'Website analytics & speed insights',  'connected',    'bar-chart'),
        ('n8n',              'n8n',               'Workflow automation platform',         'disconnected', 'workflow'),
        ('resend',           'Resend',            'Transactional email service',         'disconnected', 'mail'),
        ('google-analytics', 'Google Analytics',  'Google website analytics',            'disconnected', 'globe'),
        ('whatsapp',         'WhatsApp Business', 'WhatsApp messaging integration',      'disconnected', 'message-circle')
    `
  }
}

export async function getSettings(): Promise<SiteSettings> {
  const db = sql()
  try {
    await ensureSettingsTable()
    const rows = await db`SELECT key, value FROM site_settings`
    const map: Record<string, string> = {}
    for (const r of rows as { key: string; value: string }[]) {
      map[r.key] = r.value
    }
    return {
      site_name: map.site_name ?? DEFAULT_SETTINGS.site_name,
      site_url: map.site_url ?? DEFAULT_SETTINGS.site_url,
      default_locale: map.default_locale ?? DEFAULT_SETTINGS.default_locale,
      contact_email: map.contact_email ?? DEFAULT_SETTINGS.contact_email,
      company_name: map.company_name ?? DEFAULT_SETTINGS.company_name,
      tagline: map.tagline ?? DEFAULT_SETTINGS.tagline,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export async function updateSettings(settings: Partial<SiteSettings>) {
  const db = sql()
  await ensureSettingsTable()
  for (const [key, value] of Object.entries(settings)) {
    if (value !== undefined) {
      await db`
        INSERT INTO site_settings (key, value) VALUES (${key}, ${value})
        ON CONFLICT (key) DO UPDATE SET value = ${value}
      `
    }
  }
}

export async function getIntegrations(): Promise<Integration[]> {
  const db = sql()
  try {
    await ensureSettingsTable()
    const rows = await db`SELECT * FROM integrations ORDER BY name`
    return rows as Integration[]
  } catch {
    return []
  }
}

export async function updateIntegrationStatus(id: string, status: 'connected' | 'disconnected', configUrl?: string) {
  const db = sql()
  if (configUrl) {
    await db`UPDATE integrations SET status = ${status}, config_url = ${configUrl} WHERE id = ${id}`
  } else {
    await db`UPDATE integrations SET status = ${status}, config_url = NULL WHERE id = ${id}`
  }
}
