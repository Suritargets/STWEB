import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/lib/auth'
import { deleteWebinarRegistration } from '@/lib/webinar-registrations'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return isAuthenticated(session)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    await deleteWebinarRegistration(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webinar registration delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
