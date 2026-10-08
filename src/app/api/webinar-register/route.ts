import { NextResponse } from 'next/server'
import { webinarRegistrationSchema } from '@/lib/validations'
import { ensureWebinarRegistrationsTable, insertWebinarRegistration } from '@/lib/webinar-registrations'
import { sendWebinarRegistrationConfirmation, sendWebinarRegistrationNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = webinarRegistrationSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }

    const data = result.data

    await ensureWebinarRegistrationsTable()

    const record = await insertWebinarRegistration({
      naam:           data.naam,
      email:          data.email,
      telefoon:       data.telefoon,
      referralSource: data.referralSource,
    })

    console.log('Webinar registration saved, id:', record.id)

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await Promise.allSettled([
        sendWebinarRegistrationConfirmation(data),
        sendWebinarRegistrationNotification(data, record.id),
      ])
    } else {
      console.warn('SMTP not configured — skipping webinar registration email send')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webinar registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
