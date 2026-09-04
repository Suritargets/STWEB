import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'
import {
  ADMIN_ROLES,
  countSuperAdmins,
  deleteAdminUser,
  getAdminUserById,
  updateAdminUserPassword,
  updateAdminUserRole,
  type AdminRole,
} from '@/lib/admin-users'

async function requireSuperAdmin() {
  const jar = await cookies()
  return getSessionUser(jar.get('admin_session')?.value)
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await requireSuperAdmin()
  if (!currentUser || currentUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const targetId = Number(id)
  const body = await request.json() as { role?: AdminRole; password?: string }

  const target = await getAdminUserById(targetId)
  if (!target) {
    return NextResponse.json({ error: 'Gebruiker niet gevonden' }, { status: 404 })
  }

  if (body.role) {
    if (!ADMIN_ROLES.includes(body.role)) {
      return NextResponse.json({ error: 'Ongeldige rol' }, { status: 422 })
    }
    if (target.role === 'super_admin' && body.role !== 'super_admin' && (await countSuperAdmins()) <= 1) {
      return NextResponse.json({ error: 'Er moet minstens één super admin overblijven' }, { status: 400 })
    }
    await updateAdminUserRole(targetId, body.role)
  }

  if (body.password) {
    if (body.password.length < 8) {
      return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 tekens zijn' }, { status: 422 })
    }
    await updateAdminUserPassword(targetId, body.password)
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentUser = await requireSuperAdmin()
  if (!currentUser || currentUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const targetId = Number(id)

  if (targetId === currentUser.id) {
    return NextResponse.json({ error: 'Je kunt jezelf niet verwijderen' }, { status: 400 })
  }

  const target = await getAdminUserById(targetId)
  if (!target) {
    return NextResponse.json({ error: 'Gebruiker niet gevonden' }, { status: 404 })
  }
  if (target.role === 'super_admin' && (await countSuperAdmins()) <= 1) {
    return NextResponse.json({ error: 'Er moet minstens één super admin overblijven' }, { status: 400 })
  }

  await deleteAdminUser(targetId)
  return NextResponse.json({ success: true })
}
