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
      '5k-15k':    '$5.000 – $15.000',
      '15k-50k':   '$15.000 – $50.000',
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

    const token     = process.env.AIRTABLE_API_TOKEN
    const baseId    = process.env.AIRTABLE_BASE_ID
    // Table name in "Leads Suritargets" base — rename in Airtable if you change it
    const tableName = 'Table 1'

    if (!token || !baseId) {
      console.error('Airtable env vars missing')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    console.log(`Airtable target: base=${baseId} table="${tableName}"`)


    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Naam:          data.naam,
            Bedrijfsnaam:  data.bedrijfsnaam,
            Email:         data.email,
            ...(data.telefoon ? { Telefoon: data.telefoon } : {}),
            Services:      data.services.map(s => SERVICE_LABELS[s] ?? s).join(', '),
            ...(data.budget   ? { Budget: BUDGET_LABELS[data.budget] ?? data.budget } : {}),
            Bericht:       data.andersText
                             ? `${data.bericht}\n\nAnders: ${data.andersText}`
                             : data.bericht,
          },
        }),
      }
    )

    if (!airtableRes.ok) {
      const err = await airtableRes.json()
      console.error('Airtable error full:', JSON.stringify(err, null, 2))
      return NextResponse.json({ error: 'Airtable error', detail: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
