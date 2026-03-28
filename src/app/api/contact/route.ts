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

    const token     = process.env.AIRTABLE_API_TOKEN
    const baseId    = process.env.AIRTABLE_BASE_ID
    const tableName = process.env.AIRTABLE_TABLE_NAME ?? 'Table 1'

    if (!token || !baseId) {
      console.error('Airtable env vars missing')
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
    }

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
            Telefoon:      data.telefoon ?? '',
            Services:      data.services,
            Budget:        data.budget ?? '',
            Bericht:       data.bericht,
            ...(data.andersText ? { Anders: data.andersText } : {}),
          },
        }),
      }
    )

    if (!airtableRes.ok) {
      const err = await airtableRes.json()
      console.error('Airtable error:', JSON.stringify(err))
      return NextResponse.json({ error: 'Airtable error', detail: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
