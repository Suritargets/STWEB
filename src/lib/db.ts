import mysql from 'mysql2/promise'

// Lazy singleton — safe during next build static analysis
let _pool: mysql.Pool | null = null

function getPool(): mysql.Pool {
  if (!_pool) {
    _pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      timezone: '+00:00',
    })
  }
  return _pool
}

export async function query<T = unknown>(sql: string, values?: unknown[]): Promise<T> {
  const [rows] = await getPool().execute(sql, values)
  return rows as T
}

export async function createContactsTable(): Promise<void> {
  await query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      naam        VARCHAR(255) NOT NULL,
      bedrijfsnaam VARCHAR(255) NOT NULL,
      email       VARCHAR(255) NOT NULL,
      telefoon    VARCHAR(50),
      service     VARCHAR(100) NOT NULL,
      bericht     TEXT NOT NULL,
      created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}
