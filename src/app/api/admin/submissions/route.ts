import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'
import { getSubmissions } from '@/lib/db'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const user = await getSessionUser(session)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const submissions = await getSubmissions()
  return NextResponse.json(submissions)
}
