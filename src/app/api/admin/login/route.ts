import { NextResponse } from 'next/server'
import { makeSessionToken, verifyPassword } from '@/lib/auth'
import { ensureAdminUsersTable, ensureBootstrapSuperAdmin, getAdminUserByEmail } from '@/lib/admin-users'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as { email: string; password: string }

    await ensureAdminUsersTable()
    await ensureBootstrapSuperAdmin()

    const user = await getAdminUserByEmail(email)
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 })
    }

    const token = makeSessionToken(user.id, user.password_hash)
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
