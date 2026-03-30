import { NextResponse } from 'next/server'
import { offerteSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = offerteSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }

    const data = result.data

    const BUDGET_LABELS: Record<string, string> = {
      'onder-5k':  'Onder $5.000',
      '5k-15k':    '$5.000 - $15.000',
      'boven-50k': 'Boven $50.000',
      'onbekend':  'Nog niet bekend',
    }

    const SERVICE_LABELS: Record<string, string> = {
      'dashboarding':    'Dashboarding & Data Visualisatie',
      'web-applicaties': 'Web & Applicaties',
      'marketing-ai':    'Marketing met AI',
      'forensics':       'Forensics & Integriteit',
      'education':       'Education & Training',
      'anders':          'Anders',
    }

    const token  = process.env.AIRTABLE_API_TOKEN
    const baseId = process.env.AIRTABLE_BASE_ID

    if (!token || !baseId) {
      console.error('Airtable env vars missing')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    // Build a plain-text summary of all fields — works with any Airtable field type
    const summary = [
      `Naam: ${data.naam}`,
      `Bedrijf: ${data.bedrijfsnaam}`,
      `Email: ${data.email}`,
      data.telefoon ? `Telefoon: ${data.telefoon}` : null,
      `Diensten: ${data.services.map(s => SERVICE_LABELS[s] ?? s).join(', ')}`,
      data.budget ? `Budget: ${BUDGET_LABELS[data.budget] ?? data.budget}` : null,
      ``,
      `Bericht:`,
      data.bericht,
      data.andersText ? `\nAnders: ${data.andersText}` : null,
    ].filter(Boolean).join('\n')

    const fields: Record<string, string> = {
      Naam:         data.naam,
      Bedrijfsnaam: data.bedrijfsnaam,
      Email:        data.email,
      Bericht:      summary,
    }

    console.log('Airtable POST → base:', baseId, '| fields:', Object.keys(fields).join(', '))

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Table%201`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      }
    )

    const responseBody = await airtableRes.json()

    if (!airtableRes.ok) {
      console.error('Airtable error:', JSON.stringify(responseBody))
      return NextResponse.json({ error: 'Airtable error', detail: responseBody }, { status: 500 })
    }

    console.log('Airtable success, record:', (responseBody as { id?: string }).id)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
