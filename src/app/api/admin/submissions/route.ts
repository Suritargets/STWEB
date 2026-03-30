import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { getSubmissions } from '@/lib/db'

function makeToken(password: string) {
  return createHash('sha256')
    .update(password + (process.env.ADMIN_PASSWORD ?? ''))
    .digest('hex')
}

function isAuthenticated(sessionCookie: string | undefined): boolean {
  if (!sessionCookie || !process.env.ADMIN_PASSWORD) return false
  return sessionCookie === makeToken(process.env.ADMIN_PASSWORD)
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (!isAuthenticated(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const submissions = await getSubmissions()
  return NextResponse.json(submissions)
}
