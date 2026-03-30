import { NextResponse } from 'next/server'
import { offerteSchema } from '@/lib/validations'

// Hardcoded from verified Airtable schema (app05ZlctxlXCWrnK / tblJdl3amGj3yOPy2)
const BASE_ID  = 'app05ZlctxlXCWrnK'
const TABLE_ID = 'tblJdl3amGj3yOPy2'

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

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = offerteSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
    }

    const data = result.data
    const token = process.env.AIRTABLE_API_TOKEN

    if (!token) {
      console.error('AIRTABLE_API_TOKEN missing')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

    // Map services slugs to Dutch labels for the multipleSelects field
    const serviceNames = data.services.map(s => SERVICE_LABELS[s] ?? s)

    // Build the bericht text (full summary)
    const berichtLines = [
      data.bericht,
      data.andersText ? `\nAnders: ${data.andersText}` : null,
    ].filter(Boolean).join('\n')

    // Use field names exactly as they appear in Airtable schema
    const fields: Record<string, unknown> = {
      Naam:         data.naam,
      Bedrijfsnaam: data.bedrijfsnaam,
      Email:        data.email,
      Bericht:      berichtLines,
      Services:     serviceNames,          // multipleSelects → array of strings
    }

    if (data.telefoon) fields['Telefoon'] = data.telefoon
    if (data.budget)   fields['Budget']   = BUDGET_LABELS[data.budget] ?? data.budget

    const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`
    const payload = JSON.stringify({ fields })

    console.log('AT_POST url:', url, 'fields:', Object.keys(fields).join(','))

    const airtableRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: payload,
    })

    const responseText = await airtableRes.text()
    console.log(`AT_RES status=${airtableRes.status} body=${responseText.slice(0, 400)}`)

    if (!airtableRes.ok) {
      return NextResponse.json({ error: 'Airtable error' }, { status: 500 })
    }

    const responseBody = JSON.parse(responseText) as { id?: string }
    console.log('AT_OK id:', responseBody.id)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
