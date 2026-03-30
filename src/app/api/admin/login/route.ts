import { NextResponse } from 'next/server'
import { makeSessionToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json() as { email: string; password: string }
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: 'Ongeldige inloggegevens' }, { status: 401 })
    }

    const token = makeSessionToken(password)
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
