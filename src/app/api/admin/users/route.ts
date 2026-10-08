import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'
import { ADMIN_ROLES, insertAdminUser, type AdminRole } from '@/lib/admin-users'

export async function POST(request: Request) {
  const jar = await cookies()
  const currentUser = await getSessionUser(jar.get('admin_session')?.value)
  if (!currentUser || currentUser.role !== 'super_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email, password, role } = await request.json() as { email: string; password: string; role: AdminRole }

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 422 })
  }
  if (!password || password.length < 8) {
    return NextResponse.json({ error: 'Wachtwoord moet minimaal 8 tekens zijn' }, { status: 422 })
  }
  if (!ADMIN_ROLES.includes(role)) {
    return NextResponse.json({ error: 'Ongeldige rol' }, { status: 422 })
  }

  try {
    const user = await insertAdminUser({ email, password, role })
    return NextResponse.json({ id: user.id, email: user.email, role: user.role })
  } catch (error) {
    console.error('Create admin user error:', error)
    return NextResponse.json({ error: 'Dit e-mailadres bestaat al' }, { status: 409 })
  }
}
