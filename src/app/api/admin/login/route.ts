import { NextResponse } from 'next/server'
import { createHash } from 'crypto'

function makeToken(password: string) {
  return createHash('sha256')
    .update(password + (process.env.ADMIN_PASSWORD ?? ''))
    .digest('hex')
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json() as { password: string }

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Ongeldig wachtwoord' }, { status: 401 })
    }

    const token = makeToken(password)
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge:   60 * 60 * 24 * 7, // 7 days
      path:     '/',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
