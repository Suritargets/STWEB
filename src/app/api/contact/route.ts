import { NextResponse } from 'next/server'
import { offerteSchema } from '@/lib/validations'
import { ensureSubmissionsTable, insertSubmission } from '@/lib/db'
import { sendContactConfirmation, sendContactNotification } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = offerteSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }

    const data = result.data

    await ensureSubmissionsTable()

    const record = await insertSubmission({
      clientType:   data.clientType,
      naam:         data.naam,
      bedrijfsnaam: data.bedrijfsnaam ?? '',
      email:        data.email,
      telefoon:     data.telefoon,
      services:     data.services,
      budget:       data.budget,
      bericht:      data.bericht,
      andersText:   data.andersText,
    })

    console.log('Submission saved, id:', record.id)

    // Send emails — don't block the response if SMTP is not yet configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await Promise.allSettled([
        sendContactConfirmation(data),
        sendContactNotification(data),
      ])
    } else {
      console.warn('SMTP not configured — skipping email send')
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
