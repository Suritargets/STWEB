import { NextResponse } from 'next/server'
import { enrollmentSchema } from '@/lib/validations'
import { ensureEnrollmentsTable, insertEnrollment } from '@/lib/enrollments'
import { sendEnrollmentNotification, sendEnrollmentInvoice } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = enrollmentSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }

    const data = result.data

    await ensureEnrollmentsTable()

    const record = await insertEnrollment({
      courseSlug:     data.courseSlug,
      courseName:     data.courseName,
      enrollmentType: data.enrollmentType,
      clientType:     data.clientType,
      naam:           data.naam,
      bedrijfsnaam:   data.bedrijfsnaam,
      email:          data.email,
      telefoon:       data.telefoon,
      deelnemers:     data.deelnemers,
      uren:           data.uren,
      totalUsd:       data.totalUsd,
      calculatorData: data.calculatorData,
      opmerkingen:    data.opmerkingen,
    })

    console.log('Enrollment saved, id:', record.id)

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      await Promise.allSettled([
        sendEnrollmentNotification(data, record.id),
        sendEnrollmentInvoice(data, record.id),
      ])
    } else {
      console.warn('SMTP not configured — skipping enrollment email send')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
