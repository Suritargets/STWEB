import { createContactsTable } from '../src/lib/db'

async function main() {
  console.log('Running migrations...')
  await createContactsTable()
  console.log('Migration complete: contacts table ready')
  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
