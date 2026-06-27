import { cookies } from 'next/headers'
import { isAuthenticated } from '@/lib/auth'
import { updateIntegrationStatus } from '@/lib/settings'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const jar = await cookies()
  const token = jar.get('admin_session')?.value
  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status, config_url } = await req.json()
  await updateIntegrationStatus(id, status, config_url)
  return NextResponse.json({ ok: true })
}
