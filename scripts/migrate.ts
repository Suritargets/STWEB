import { ensureSubmissionsTable } from '../src/lib/db'

async function main() {
  console.log('Running migrations...')
  await ensureSubmissionsTable()
  console.log('Migration complete: submissions table ready')
  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
