import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/lib/auth'
import { updateSubmission, deleteSubmission } from '@/lib/db'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return isAuthenticated(session)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()

  try {
    await updateSubmission(Number(id), {
      naam:        body.naam,
      bedrijfsnaam: body.bedrijfsnaam,
      email:       body.email,
      telefoon:    body.telefoon || null,
      klant_type:  body.klant_type || null,
      services:    body.services ?? [],
      budget:      body.budget || null,
      bericht:     body.bericht,
      anders_text: body.anders_text || null,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update error:', error)
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
    await deleteSubmission(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
