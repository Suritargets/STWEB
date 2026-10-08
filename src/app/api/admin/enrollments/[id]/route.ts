import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'
import { updateEnrollmentStatus, deleteEnrollment } from '@/lib/enrollments'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return (await getSessionUser(session)) !== null
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  const validStatuses = ['pending', 'confirmed', 'paid'] as const
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    await updateEnrollmentStatus(Number(id), body.status)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enrollment status update error:', error)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
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
    await deleteEnrollment(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enrollment delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
