import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations'
import { query } from '@/lib/db'
import { sendContactConfirmation, sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }
    const data = result.data

    // Save to DB
    await query(
      'INSERT INTO contacts (naam, bedrijfsnaam, email, telefoon, service, bericht) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.naam,
        data.bedrijfsnaam,
        data.email,
        data.telefoon ?? null,
        data.service,
        data.bericht,
      ]
    )

    // Send emails via Resend
    await sendContactNotification(data)
    await sendContactConfirmation(data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
