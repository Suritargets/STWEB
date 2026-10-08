import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'
import { updateSettings } from '@/lib/settings'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const jar = await cookies()
  const token = jar.get('admin_session')?.value
  const user = await getSessionUser(token)
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json()
  await updateSettings(data)
  return NextResponse.json({ ok: true })
}
