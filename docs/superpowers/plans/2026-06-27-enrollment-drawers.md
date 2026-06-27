# Enrollment Drawers & Course Calculators — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add right-side slide-over enrollment drawers with calculators to all education course pages, save enrollments to a DB table, and show them in a new admin Orders dashboard.

**Architecture:** A shared `EnrollmentDrawer` component accepts course config props and renders the appropriate calculator (flat/monthly/hourly). On submit, `POST /api/enroll` validates with Zod, saves to the `enrollments` DB table, and sends two emails. The admin Orders page reads from that table using the same pattern as the existing submissions page.

**Tech Stack:** Next.js 16 App Router, Neon Postgres (neon serverless), Zod, Nodemailer, Tailwind CSS, Lucide icons, TypeScript.

## Global Constraints

- No Sheet component in shadcn — implement drawer as a fixed overlay with Tailwind CSS transforms
- DB queries follow the pattern in `src/lib/db.ts`: `neon()` template literals, `ensureXTable()` + `insertX()` + `getX()` helpers
- API routes pattern: parse JSON → Zod safeParse → DB insert → emails via `Promise.allSettled` → `NextResponse.json`
- All new strings must be added to all 5 locale files: `messages/en.json`, `es.json`, `fr.json`, `nl.json`, `pt-BR.json`
- Hourly rate is fixed at $45 USD — do not make it configurable
- Minimum 5 participants for Team bookings (AI, Trading, IT, Business)
- No minimum for individual AI Hands On Deck enrollment

---

## File Map

### New files
- `src/lib/enrollments.ts` — DB schema + queries for enrollments table
- `src/app/api/enroll/route.ts` — POST endpoint
- `src/components/enrollment/enrollment-drawer.tsx` — slide-over shell + step logic
- `src/components/enrollment/calculator-flat.tsx` — AI individual/team calc
- `src/components/enrollment/calculator-monthly.tsx` — Trading calc
- `src/components/enrollment/calculator-hourly.tsx` — IT/Business team calc
- `src/app/admin/dashboard/orders/page.tsx` — Orders admin page

### Modified files
- `src/lib/db.ts` — re-export Enrollment type (no logic changes needed; enrollments.ts handles its own table)
- `src/lib/validations.ts` — add `enrollmentSchema` + `EnrollmentFormData` type
- `src/lib/email.ts` — add `sendEnrollmentNotification` + `sendEnrollmentConfirmation`
- `src/app/[locale]/education/ai-hands-on-deck/page.tsx` — add drawer trigger
- `src/app/[locale]/education/finance-accounting-claude/page.tsx` — connect calc → drawer
- `src/app/[locale]/education/[slug]/page.tsx` — add drawer trigger for other courses
- `src/app/admin/_components/sidebar.tsx` — add Orders nav item
- `messages/en.json` (and es, fr, nl, pt-BR) — add enrollment i18n keys

---

## Task 1: Enrollment DB table and queries

**Files:**
- Create: `src/lib/enrollments.ts`

**Interfaces:**
- Produces:
  - `Enrollment` type
  - `ensureEnrollmentsTable(): Promise<void>`
  - `insertEnrollment(data: InsertEnrollmentData): Promise<{ id: number }>`
  - `getEnrollments(): Promise<Enrollment[]>`
  - `updateEnrollmentStatus(id: number, status: 'pending'|'confirmed'|'paid'): Promise<void>`

- [ ] **Step 1: Create `src/lib/enrollments.ts`**

```typescript
import { neon } from '@neondatabase/serverless'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type Enrollment = {
  id: number
  course_slug: string
  course_name: string
  enrollment_type: 'individual' | 'team'
  client_type: 'zakelijk' | 'particulier'
  naam: string
  bedrijfsnaam: string | null
  email: string
  telefoon: string | null
  deelnemers: number
  uren: number | null
  total_usd: number
  calculator_data: Record<string, unknown> | null
  opmerkingen: string | null
  status: 'pending' | 'confirmed' | 'paid'
  created_at: string
}

type InsertEnrollmentData = {
  courseSlug: string
  courseName: string
  enrollmentType: 'individual' | 'team'
  clientType: 'zakelijk' | 'particulier'
  naam: string
  bedrijfsnaam?: string
  email: string
  telefoon?: string
  deelnemers: number
  uren?: number
  totalUsd: number
  calculatorData?: Record<string, unknown>
  opmerkingen?: string
}

export async function ensureEnrollmentsTable(): Promise<void> {
  const db = sql()
  await db`
    CREATE TABLE IF NOT EXISTS enrollments (
      id               SERIAL PRIMARY KEY,
      course_slug      TEXT NOT NULL,
      course_name      TEXT NOT NULL,
      enrollment_type  TEXT NOT NULL CHECK (enrollment_type IN ('individual','team')),
      client_type      TEXT NOT NULL CHECK (client_type IN ('zakelijk','particulier')),
      naam             TEXT NOT NULL,
      bedrijfsnaam     TEXT,
      email            TEXT NOT NULL,
      telefoon         TEXT,
      deelnemers       INTEGER NOT NULL DEFAULT 1,
      uren             INTEGER,
      total_usd        NUMERIC(10,2) NOT NULL,
      calculator_data  JSONB,
      opmerkingen      TEXT,
      status           TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending','confirmed','paid')),
      created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `
}

export async function insertEnrollment(data: InsertEnrollmentData): Promise<{ id: number }> {
  const db = sql()
  const rows = await db`
    INSERT INTO enrollments (
      course_slug, course_name, enrollment_type, client_type,
      naam, bedrijfsnaam, email, telefoon,
      deelnemers, uren, total_usd, calculator_data, opmerkingen
    ) VALUES (
      ${data.courseSlug}, ${data.courseName}, ${data.enrollmentType}, ${data.clientType},
      ${data.naam}, ${data.bedrijfsnaam ?? null}, ${data.email}, ${data.telefoon ?? null},
      ${data.deelnemers}, ${data.uren ?? null}, ${data.totalUsd},
      ${data.calculatorData ? JSON.stringify(data.calculatorData) : null},
      ${data.opmerkingen ?? null}
    )
    RETURNING id
  `
  return rows[0] as { id: number }
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const db = sql()
  const rows = await db`SELECT * FROM enrollments ORDER BY created_at DESC`
  return rows as Enrollment[]
}

export async function updateEnrollmentStatus(
  id: number,
  status: 'pending' | 'confirmed' | 'paid'
): Promise<void> {
  const db = sql()
  await db`UPDATE enrollments SET status = ${status} WHERE id = ${id}`
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/enrollments.ts
git commit -m "feat: add enrollments DB table and queries"
```

---

## Task 2: Zod validation schema for enrollment

**Files:**
- Modify: `src/lib/validations.ts`

**Interfaces:**
- Produces: `enrollmentSchema`, `EnrollmentFormData`

- [ ] **Step 1: Append to `src/lib/validations.ts`**

Add at the bottom of the file (after the existing exports):

```typescript
export const enrollmentSchema = z.object({
  courseSlug:      z.string().min(1),
  courseName:      z.string().min(1),
  enrollmentType:  z.enum(['individual', 'team']),
  clientType:      z.enum(['zakelijk', 'particulier']),
  naam:            z.string().min(2, 'Naam is verplicht'),
  bedrijfsnaam:    z.string().optional(),
  email:           z.string().email('Ongeldig e-mailadres'),
  telefoon:        z.string().optional(),
  deelnemers:      z.number().int().min(1),
  uren:            z.number().int().optional(),
  totalUsd:        z.number().positive(),
  calculatorData:  z.record(z.unknown()).optional(),
  opmerkingen:     z.string().optional(),
})

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/validations.ts
git commit -m "feat: add enrollment Zod schema"
```

---

## Task 3: Enrollment email functions

**Files:**
- Modify: `src/lib/email.ts`

**Interfaces:**
- Consumes: `EnrollmentFormData` from `src/lib/validations.ts`
- Produces:
  - `sendEnrollmentNotification(data: EnrollmentFormData): Promise<void>`
  - `sendEnrollmentConfirmation(data: EnrollmentFormData): Promise<void>`

- [ ] **Step 1: Add import and two functions to `src/lib/email.ts`**

Add at the top of the file after existing imports:
```typescript
import type { EnrollmentFormData } from './validations'
```

Then add at the bottom of the file:

```typescript
export async function sendEnrollmentNotification(data: EnrollmentFormData): Promise<void> {
  const transporter = getTransporter()
  const typeLabel = data.enrollmentType === 'team' ? 'Team / In-house' : 'Individueel'
  const urenRow = data.uren ? `<tr><td style="padding:8px 0;color:#6b7280;width:130px">Uren</td><td style="padding:8px 0">${data.uren}u</td></tr>` : ''
  const calcRow = data.calculatorData
    ? `<tr><td colspan="2" style="padding:8px 0;color:#6b7280;font-size:12px">Calculator: ${escapeHtml(JSON.stringify(data.calculatorData))}</td></tr>`
    : ''

  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      process.env.CONTACT_TO,
    replyTo: data.email,
    subject: `Nieuwe inschrijving: ${escapeHtml(data.courseName)} — ${escapeHtml(data.naam)}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#2B3494;padding:24px 32px">
          <p style="color:white;font-weight:700;font-size:18px;margin:0">Nieuwe inschrijving</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">Course</td><td style="padding:8px 0;font-weight:600">${escapeHtml(data.courseName)}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Type</td><td style="padding:8px 0">${typeLabel}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Naam</td><td style="padding:8px 0;font-weight:600">${escapeHtml(data.naam)}</td></tr>
            ${data.bedrijfsnaam ? `<tr><td style="padding:8px 0;color:#6b7280">Bedrijf</td><td style="padding:8px 0">${escapeHtml(data.bedrijfsnaam)}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6b7280">E-mail</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}" style="color:#2B3494">${escapeHtml(data.email)}</a></td></tr>
            ${data.telefoon ? `<tr><td style="padding:8px 0;color:#6b7280">Telefoon</td><td style="padding:8px 0">${escapeHtml(data.telefoon)}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6b7280">Deelnemers</td><td style="padding:8px 0">${data.deelnemers}</td></tr>
            ${urenRow}
            <tr><td style="padding:8px 0;color:#6b7280">Totaal</td><td style="padding:8px 0;font-weight:700;color:#2B3494">$${data.totalUsd.toLocaleString('en-US')}</td></tr>
            ${calcRow}
          </table>
          ${data.opmerkingen ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/><p style="color:#6b7280;font-size:12px;margin-bottom:8px">Opmerkingen:</p><p style="background:#f9fafb;padding:16px;border-left:3px solid #2B3494;white-space:pre-wrap;font-size:14px">${escapeHtml(data.opmerkingen)}</p>` : ''}
          <p style="margin-top:24px">
            <a href="mailto:${escapeHtml(data.email)}" style="background:#2B3494;color:white;padding:10px 20px;text-decoration:none;font-size:13px;font-weight:600">Beantwoorden</a>
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendEnrollmentConfirmation(data: EnrollmentFormData): Promise<void> {
  const transporter = getTransporter()
  await transporter.sendMail({
    from:    process.env.SMTP_FROM,
    to:      data.email,
    subject: `Bevestiging inschrijving — ${escapeHtml(data.courseName)} | Suritargets`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#2B3494;padding:24px 32px">
          <p style="color:white;font-weight:700;font-size:18px;margin:0">Suritargets</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb">
          <p>Beste ${escapeHtml(data.naam)},</p>
          <p>Bedankt voor uw inschrijving voor <strong>${escapeHtml(data.courseName)}</strong>. Wij hebben uw aanvraag ontvangen voor <strong>${data.deelnemers} deelnemer${data.deelnemers > 1 ? 's' : ''}</strong> met een totaalbedrag van <strong>$${data.totalUsd.toLocaleString('en-US')}</strong>.</p>
          <p>Wij nemen binnen <strong>1–2 werkdagen</strong> contact met u op om de inschrijving te bevestigen.</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#6b7280;font-size:13px">
            Suritargets · Paramaribo, Suriname<br/>
            <a href="https://suritargets.com" style="color:#2B3494">suritargets.com</a>
          </p>
        </div>
      </div>
    `,
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add enrollment email functions"
```

---

## Task 4: POST /api/enroll route

**Files:**
- Create: `src/app/api/enroll/route.ts`

**Interfaces:**
- Consumes: `enrollmentSchema` from `src/lib/validations.ts`, `ensureEnrollmentsTable` + `insertEnrollment` from `src/lib/enrollments.ts`, `sendEnrollmentNotification` + `sendEnrollmentConfirmation` from `src/lib/email.ts`
- Produces: `POST /api/enroll` → `{ success: true }` or `{ error: ... }`

- [ ] **Step 1: Create `src/app/api/enroll/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { enrollmentSchema } from '@/lib/validations'
import { ensureEnrollmentsTable, insertEnrollment } from '@/lib/enrollments'
import { sendEnrollmentNotification, sendEnrollmentConfirmation } from '@/lib/email'

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
        sendEnrollmentNotification(data),
        sendEnrollmentConfirmation(data),
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
```

- [ ] **Step 2: Test the route manually**

```bash
curl -s -w "\nHTTP: %{http_code}" -X POST http://localhost:3000/api/enroll \
  -H "Content-Type: application/json" \
  -d '{"courseSlug":"ai-hands-on-deck","courseName":"AI – Hands On Deck","enrollmentType":"individual","clientType":"zakelijk","naam":"Test Persoon","bedrijfsnaam":"TestBedrijf","email":"test@test.com","deelnemers":1,"totalUsd":750}'
```

Expected: `{"success":true}` with `HTTP: 200`

If `DATABASE_URL` is not set locally, expected: `HTTP: 500` with `Enrollment error: No database connection string` in the server log — acceptable until env is set.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/enroll/route.ts
git commit -m "feat: add POST /api/enroll route"
```

---

## Task 5: Calculator sub-components

**Files:**
- Create: `src/components/enrollment/calculator-flat.tsx`
- Create: `src/components/enrollment/calculator-monthly.tsx`
- Create: `src/components/enrollment/calculator-hourly.tsx`

**Interfaces:**
- `CalculatorFlat` props: `{ enrollmentType: 'individual'|'team'; priceIndividual: number; priceTeam: number; noMinIndividual?: boolean; onChange: (result: CalcResult) => void }`
- `CalculatorMonthly` props: `{ priceTeam: number; monthlyPrice: number; months: number; onChange: (result: CalcResult) => void }`
- `CalculatorHourly` props: `{ onChange: (result: CalcResult) => void }`
- `CalcResult` type: `{ deelnemers: number; uren?: number; totalUsd: number; calculatorData: Record<string, unknown> }`

- [ ] **Step 1: Create `src/components/enrollment/calculator-flat.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'

export type CalcResult = {
  deelnemers: number
  uren?: number
  totalUsd: number
  calculatorData: Record<string, unknown>
}

type Props = {
  enrollmentType: 'individual' | 'team'
  priceIndividual: number
  priceTeam: number
  noMinIndividual?: boolean
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorFlat({ enrollmentType, priceIndividual, priceTeam, noMinIndividual, onChange }: Props) {
  const isTeam = enrollmentType === 'team'
  const min = isTeam ? 5 : (noMinIndividual ? 1 : 1)
  const price = isTeam ? priceTeam : priceIndividual

  const [count, setCount] = useState(min)

  useEffect(() => {
    setCount(min)
  }, [min])

  useEffect(() => {
    onChange({
      deelnemers: count,
      totalUsd: count * price,
      calculatorData: { type: 'flat', enrollmentType, count, price },
    })
  }, [count, price, enrollmentType, onChange])

  const total = count * price

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-white">
            Deelnemers {isTeam && <span className="text-white/50 text-xs">(min. 5)</span>}
          </label>
          <span className="text-lg font-bold text-white">{count}</span>
        </div>
        <input
          type="range"
          min={min}
          max={50}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-[#E63946]"
        />
      </div>
      <div className="bg-white/10 rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm text-white/70">
          <span>{count} × {fmt(price)}</span>
          <span>{fmt(total)}</span>
        </div>
        <div className="border-t border-white/20 pt-2 flex justify-between">
          <span className="font-semibold text-white">Totaal</span>
          <span className="text-xl font-black text-white">{fmt(total)}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/enrollment/calculator-monthly.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import type { CalcResult } from './calculator-flat'

type Props = {
  priceTeam: number
  monthlyPrice: number
  months: number
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorMonthly({ priceTeam, monthlyPrice, months, onChange }: Props) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const total = count * priceTeam
    onChange({
      deelnemers: count,
      totalUsd: total,
      calculatorData: { type: 'monthly', count, priceTeam, monthlyPrice, months },
    })
  }, [count, priceTeam, monthlyPrice, months, onChange])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-white">
            Deelnemers <span className="text-white/50 text-xs">(min. 5)</span>
          </label>
          <span className="text-lg font-bold text-white">{count}</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          value={count}
          onChange={e => setCount(Number(e.target.value))}
          className="w-full accent-[#E63946]"
        />
      </div>
      <div className="bg-white/10 rounded-lg p-4 space-y-2">
        {Array.from({ length: months }, (_, i) => (
          <div key={i} className="flex justify-between text-sm text-white/70">
            <span>Maand {i + 1} — {count} × {fmt(monthlyPrice)}</span>
            <span>{fmt(count * monthlyPrice)}</span>
          </div>
        ))}
        <div className="border-t border-white/20 pt-2 flex justify-between">
          <span className="font-semibold text-white">Totaal ({months} mnd)</span>
          <span className="text-xl font-black text-white">{fmt(count * priceTeam)}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/components/enrollment/calculator-hourly.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import type { CalcResult } from './calculator-flat'

const RATE = 45
const FOUNDATION = 14

type Props = {
  onChange: (result: CalcResult) => void
}

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function CalculatorHourly({ onChange }: Props) {
  const [count, setCount] = useState(5)
  const [trainingSessions, setTrainingSessions] = useState(5)  // × 2u each
  const [buildSessions, setBuildSessions]       = useState(2)  // × 2u each

  const trainingHours = trainingSessions * 2
  const buildHours    = buildSessions * 2
  const totalHours    = FOUNDATION + trainingHours + buildHours
  const totalUsd      = count * totalHours * RATE

  useEffect(() => {
    onChange({
      deelnemers: count,
      uren: totalHours,
      totalUsd,
      calculatorData: { type: 'hourly', count, foundation: FOUNDATION, trainingHours, buildHours, totalHours, rate: RATE },
    })
  }, [count, totalHours, totalUsd, trainingHours, buildHours, onChange])

  return (
    <div className="space-y-5">
      {/* Participants */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Deelnemers <span className="text-white/50 text-xs">(min. 5)</span></label>
          <span className="font-bold text-white">{count}</span>
        </div>
        <input type="range" min={5} max={50} value={count} onChange={e => setCount(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Training sessions */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Training sessies <span className="text-white/50 text-xs">(× 2u)</span></label>
          <span className="font-bold text-white">{trainingSessions} sessies = {trainingHours}u</span>
        </div>
        <input type="range" min={1} max={20} value={trainingSessions} onChange={e => setTrainingSessions(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Build sessions */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-white">Build / tools <span className="text-white/50 text-xs">(× 2u)</span></label>
          <span className="font-bold text-white">{buildSessions} sessies = {buildHours}u</span>
        </div>
        <input type="range" min={1} max={15} value={buildSessions} onChange={e => setBuildSessions(Number(e.target.value))} className="w-full accent-[#E63946]" />
      </div>

      {/* Breakdown */}
      <div className="bg-white/10 rounded-lg p-4 space-y-1.5 text-sm">
        <div className="flex justify-between text-white/70">
          <span>Foundation & setup (vast)</span><span>{FOUNDATION}u</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>Training ({trainingSessions} × 2u)</span><span>{trainingHours}u</span>
        </div>
        <div className="flex justify-between text-white/70">
          <span>Build / tools ({buildSessions} × 2u)</span><span>{buildHours}u</span>
        </div>
        <div className="border-t border-white/20 pt-1.5 flex justify-between text-white/70">
          <span>Totaal uren</span><span>{totalHours}u × ${RATE} = {fmt(totalHours * RATE)}/pp</span>
        </div>
        <div className="flex justify-between font-bold text-white pt-1">
          <span>Totaal ({count} pp)</span>
          <span className="text-xl font-black">{fmt(totalUsd)}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/enrollment/
git commit -m "feat: add enrollment calculator components (flat, monthly, hourly)"
```

---

## Task 6: EnrollmentDrawer main component

**Files:**
- Create: `src/components/enrollment/enrollment-drawer.tsx`

**Interfaces:**
- Consumes: `CalculatorFlat`, `CalculatorMonthly`, `CalculatorHourly`, `CalcResult` from Task 5
- Produces: `EnrollmentDrawer` component + `CourseConfig` type

```typescript
export type CourseConfig = {
  slug: string
  name: string
  type: 'flat' | 'monthly' | 'hourly' | 'finance'
  priceIndividual?: number
  priceTeam?: number
  monthlyPrice?: number
  months?: number
  noMinIndividual?: boolean
}

// Finance pre-fill (from existing calculator)
export type FinanceCalcData = Record<string, unknown>
```

- [ ] **Step 1: Create `src/components/enrollment/enrollment-drawer.tsx`**

```typescript
'use client'

import { useState, useCallback } from 'react'
import { X, ChevronRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalculatorFlat, type CalcResult } from './calculator-flat'
import { CalculatorMonthly } from './calculator-monthly'
import { CalculatorHourly } from './calculator-hourly'

export type CourseConfig = {
  slug: string
  name: string
  type: 'flat' | 'monthly' | 'hourly' | 'finance'
  priceIndividual?: number
  priceTeam?: number
  monthlyPrice?: number
  months?: number
  noMinIndividual?: boolean
}

export type FinanceCalcData = Record<string, unknown>

type Props = {
  open: boolean
  onClose: () => void
  course: CourseConfig
  financeData?: FinanceCalcData
}

type Step = 'calc' | 'details'
type ClientType = 'zakelijk' | 'particulier'
type EnrollmentType = 'individual' | 'team'
type Status = 'idle' | 'loading' | 'success' | 'error'

function fmt(n: number) { return '$' + n.toLocaleString('en-US') }

export function EnrollmentDrawer({ open, onClose, course, financeData }: Props) {
  const [step, setStep]                 = useState<Step>('calc')
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType>('individual')
  const [calcResult, setCalcResult]     = useState<CalcResult | null>(null)
  const [clientType, setClientType]     = useState<ClientType>('zakelijk')
  const [naam, setNaam]                 = useState('')
  const [bedrijfsnaam, setBedrijfsnaam] = useState('')
  const [email, setEmail]               = useState('')
  const [telefoon, setTelefoon]         = useState('')
  const [opmerkingen, setOpmerkingen]   = useState('')
  const [status, setStatus]             = useState<Status>('idle')
  const [error, setError]               = useState('')

  const handleCalcChange = useCallback((result: CalcResult) => {
    setCalcResult(result)
  }, [])

  // For finance type: use financeData directly
  const isFinance = course.type === 'finance'
  const showTeamToggle = course.type !== 'finance'

  function resetAndClose() {
    setStep('calc')
    setEnrollmentType('individual')
    setCalcResult(null)
    setNaam('')
    setBedrijfsnaam('')
    setEmail('')
    setTelefoon('')
    setOpmerkingen('')
    setStatus('idle')
    setError('')
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!calcResult && !isFinance) return
    setStatus('loading')
    setError('')

    const payload = {
      courseSlug:     course.slug,
      courseName:     course.name,
      enrollmentType: isFinance ? 'team' : enrollmentType,
      clientType,
      naam,
      bedrijfsnaam:   bedrijfsnaam || undefined,
      email,
      telefoon:       telefoon || undefined,
      deelnemers:     calcResult?.deelnemers ?? 5,
      uren:           calcResult?.uren,
      totalUsd:       calcResult?.totalUsd ?? 0,
      calculatorData: isFinance ? financeData : calcResult?.calculatorData,
      opmerkingen:    opmerkingen || undefined,
    }

    try {
      const res = await fetch('/api/enroll', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Er is iets misgegaan. Probeer het opnieuw.')
    }
  }

  // Determine which calc to show
  const activeCalc = (enrollmentType === 'individual' || isFinance)
    ? 'individual'
    : course.type

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={resetAndClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0B1628] z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-0.5">Inschrijving</p>
            <h2 className="text-lg font-bold text-white">{course.name}</h2>
          </div>
          <button onClick={resetAndClose} className="text-white/50 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-white font-semibold text-lg">Inschrijving ontvangen!</p>
              <p className="text-white/60 text-sm">Wij nemen binnen 1–2 werkdagen contact met u op.</p>
              <button onClick={resetAndClose} className="mt-4 text-sm text-white/50 underline hover:text-white">Sluiten</button>
            </div>
          ) : (
            <>
              {/* Step: Calculator */}
              {step === 'calc' && (
                <div className="space-y-6">
                  {/* Enrollment type toggle (not for finance) */}
                  {showTeamToggle && (
                    <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                      {(['individual', 'team'] as EnrollmentType[]).map(t => (
                        <button
                          key={t}
                          onClick={() => setEnrollmentType(t)}
                          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${enrollmentType === t ? 'bg-[#2B3494] text-white' : 'text-white/50 hover:text-white'}`}
                        >
                          {t === 'individual' ? 'Individueel' : 'Team / In-house'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Finance summary */}
                  {isFinance && financeData && (
                    <div className="bg-white/10 rounded-lg p-4 text-sm text-white/70 space-y-1">
                      <p className="text-white font-semibold mb-2">Calculator samenvatting</p>
                      {Object.entries(financeData).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}</span><span>{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Individual flat (AI) */}
                  {!isFinance && enrollmentType === 'individual' && (course.type === 'flat') && (
                    <CalculatorFlat
                      enrollmentType="individual"
                      priceIndividual={course.priceIndividual ?? 750}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual={course.noMinIndividual}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Team flat (AI team) */}
                  {!isFinance && enrollmentType === 'team' && course.type === 'flat' && (
                    <CalculatorFlat
                      enrollmentType="team"
                      priceIndividual={course.priceIndividual ?? 750}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual={course.noMinIndividual}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Monthly (Trading) — always team */}
                  {!isFinance && course.type === 'monthly' && (
                    <CalculatorMonthly
                      priceTeam={course.priceTeam ?? 400}
                      monthlyPrice={course.monthlyPrice ?? 175}
                      months={course.months ?? 3}
                      onChange={handleCalcChange}
                    />
                  )}

                  {/* Hourly team (IT/Business) */}
                  {!isFinance && enrollmentType === 'team' && course.type === 'hourly' && (
                    <CalculatorHourly onChange={handleCalcChange} />
                  )}

                  {/* Hourly individual (IT/Business individual — simple) */}
                  {!isFinance && enrollmentType === 'individual' && course.type === 'hourly' && (
                    <CalculatorFlat
                      enrollmentType="individual"
                      priceIndividual={course.priceIndividual ?? 45}
                      priceTeam={course.priceTeam ?? 400}
                      noMinIndividual
                      onChange={handleCalcChange}
                    />
                  )}

                  <button
                    onClick={() => setStep('details')}
                    disabled={!calcResult && !isFinance}
                    className="w-full bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
                  >
                    Doorgaan <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Step: Details */}
              {step === 'details' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Summary pill */}
                  {calcResult && (
                    <div className="bg-[#2B3494]/40 rounded-lg px-4 py-3 flex justify-between items-center">
                      <span className="text-sm text-white/70">{calcResult.deelnemers} deelnemer{calcResult.deelnemers > 1 ? 's' : ''}{calcResult.uren ? ` · ${calcResult.uren}u` : ''}</span>
                      <span className="font-bold text-white">{fmt(calcResult.totalUsd)}</span>
                    </div>
                  )}

                  {/* Client type toggle */}
                  <div className="flex gap-2 bg-white/5 rounded-lg p-1">
                    {(['zakelijk', 'particulier'] as ClientType[]).map(t => (
                      <button key={t} type="button" onClick={() => setClientType(t)}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${clientType === t ? 'bg-[#2B3494] text-white' : 'text-white/50 hover:text-white'}`}>
                        {t === 'zakelijk' ? 'Zakelijk' : 'Particulier'}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Naam *</Label>
                      <Input value={naam} onChange={e => setNaam(e.target.value)} required placeholder="Uw naam" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    {clientType === 'zakelijk' && (
                      <div>
                        <Label className="text-white/70 text-xs mb-1 block">Bedrijfsnaam *</Label>
                        <Input value={bedrijfsnaam} onChange={e => setBedrijfsnaam(e.target.value)} required placeholder="Uw bedrijf" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                      </div>
                    )}
                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">E-mail *</Label>
                      <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="u@bedrijf.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Telefoon</Label>
                      <Input value={telefoon} onChange={e => setTelefoon(e.target.value)} placeholder="+597 ..." className="bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                    </div>
                    <div>
                      <Label className="text-white/70 text-xs mb-1 block">Opmerkingen</Label>
                      <Textarea value={opmerkingen} onChange={e => setOpmerkingen(e.target.value)} placeholder="Aanvullende informatie..." rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none" />
                    </div>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep('calc')} className="flex-1 border border-white/20 text-white/70 hover:text-white py-3 rounded-lg text-sm transition-colors">
                      Terug
                    </button>
                    <button type="submit" disabled={status === 'loading'}
                      className="flex-2 flex-1 bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60">
                      {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : null}
                      Inschrijving bevestigen
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/enrollment/enrollment-drawer.tsx
git commit -m "feat: add EnrollmentDrawer slide-over component"
```

---

## Task 7: Wire up AI – Hands On Deck page

**Files:**
- Modify: `src/app/[locale]/education/ai-hands-on-deck/page.tsx`

**Goal:** Replace the existing CTA link with a button that opens the `EnrollmentDrawer` with `type: 'flat'`, `priceIndividual: 750`, `priceTeam: 400`, `noMinIndividual: true`.

- [ ] **Step 1: Convert the page to a client component wrapper**

The page currently uses `async generateMetadata` (server) and the page body. Because we need client state (`open`), extract the body into a separate client component: `src/app/[locale]/education/ai-hands-on-deck/_components/page-content.tsx`.

Create `src/app/[locale]/education/ai-hands-on-deck/_components/page-content.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { EnrollmentDrawer } from '@/components/enrollment/enrollment-drawer'

// Move all the page JSX here, replace CTA link with:
// <button onClick={() => setOpen(true)} className="...existing CTA classes...">
//   Inschrijven / Enroll
// </button>
// <EnrollmentDrawer open={open} onClose={() => setOpen(false)} course={{
//   slug: 'ai-hands-on-deck',
//   name: 'AI – Hands On Deck',
//   type: 'flat',
//   priceIndividual: 750,
//   priceTeam: 400,
//   noMinIndividual: true,
// }} />

export function AiHandsOnDeckContent({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  // ... paste existing page JSX, replace CtaButton/Link with button + drawer
  return (
    <>
      {/* existing page JSX */}
      <EnrollmentDrawer
        open={open}
        onClose={() => setOpen(false)}
        course={{
          slug: 'ai-hands-on-deck',
          name: 'AI – Hands On Deck',
          type: 'flat',
          priceIndividual: 750,
          priceTeam: 400,
          noMinIndividual: true,
        }}
      />
    </>
  )
}
```

Update `src/app/[locale]/education/ai-hands-on-deck/page.tsx` to import and render `<AiHandsOnDeckContent locale={locale} />` inside the existing server component shell (keeping `generateMetadata` as-is).

- [ ] **Step 2: Verify page loads at http://localhost:3000/en/education/ai-hands-on-deck**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/education/ai-hands-on-deck
```
Expected: `200`

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/education/ai-hands-on-deck/
git commit -m "feat: add enrollment drawer to AI Hands On Deck page"
```

---

## Task 8: Wire up Finance & Accounting page

**Files:**
- Modify: `src/app/[locale]/education/finance-accounting-claude/page.tsx`
- Modify: `src/app/[locale]/education/finance-accounting-claude/_components/calc.tsx`

**Goal:** Add an "Offerte aanvragen" button to the calculator that opens `EnrollmentDrawer` with `type: 'finance'` and passes the current calculator state as `financeData`.

- [ ] **Step 1: Lift calculator state to page level**

In `calc.tsx`, export the current calculator state via a callback prop `onRequestQuote`:

Add to `FinanceCalc` props:
```typescript
onRequestQuote?: (data: Record<string, unknown>) => void
```

Add a button inside the calculator (at the bottom of the calculator output section):
```typescript
{onRequestQuote && (
  <button
    onClick={() => onRequestQuote({
      premSeats: prem, stdSeats: std, usecases: uc,
      rate, support: sup, mode,
      totalHours: suriHours, totalUsd: suriOneOff,
    })}
    className="w-full mt-4 bg-[#E63946] hover:bg-[#c0303b] text-white font-semibold py-3 rounded-lg transition-colors"
  >
    Offerte aanvragen
  </button>
)}
```

- [ ] **Step 2: Wire drawer in the page**

In `finance-accounting-claude/page.tsx`, make the page a client component (or extract content component same as Task 7), add:

```typescript
const [drawerOpen, setDrawerOpen] = useState(false)
const [financeData, setFinanceData] = useState<Record<string, unknown>>({})
```

Pass `onRequestQuote` to `<FinanceCalc>`:
```typescript
<FinanceCalc
  labels={labels}
  onRequestQuote={(data) => { setFinanceData(data); setDrawerOpen(true) }}
/>
<EnrollmentDrawer
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
  course={{ slug: 'finance-accounting-claude', name: 'Finance & Accounting Training', type: 'finance' }}
  financeData={financeData}
/>
```

- [ ] **Step 3: Verify page loads**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en/education/finance-accounting-claude
```
Expected: `200`

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/education/finance-accounting-claude/
git commit -m "feat: connect Finance calculator to enrollment drawer"
```

---

## Task 9: Wire up other education pages (slug route)

**Files:**
- Modify: `src/app/[locale]/education/[slug]/page.tsx`

**Goal:** The `[slug]` route handles Trading, IT, and Business courses. Add the drawer with course-specific config based on `slug`.

- [ ] **Step 1: Add course config map to the slug page**

```typescript
import { EnrollmentDrawer, type CourseConfig } from '@/components/enrollment/enrollment-drawer'

const COURSE_CONFIGS: Record<string, CourseConfig> = {
  'trading-course': {
    slug: 'trading-course',
    name: 'Trading Course',
    type: 'monthly',
    priceTeam: 400,
    monthlyPrice: 175,
    months: 3,
  },
  'it-courses': {
    slug: 'it-courses',
    name: 'IT Courses',
    type: 'hourly',
    priceIndividual: 45,
    priceTeam: 400,
  },
  'business-courses': {
    slug: 'business-courses',
    name: 'Business Courses',
    type: 'hourly',
    priceIndividual: 45,
    priceTeam: 400,
  },
}
```

Convert the page content to a client component (same pattern as Task 7), add `useState(false)` for `open`, look up `COURSE_CONFIGS[slug]`, render the drawer when config exists.

- [ ] **Step 2: Commit**

```bash
git add "src/app/[locale]/education/[slug]/"
git commit -m "feat: add enrollment drawer to slug-based education pages"
```

---

## Task 10: Admin Orders dashboard

**Files:**
- Create: `src/app/admin/dashboard/orders/page.tsx`
- Modify: `src/app/admin/_components/sidebar.tsx`

**Interfaces:**
- Consumes: `getEnrollments`, `updateEnrollmentStatus`, `Enrollment` from `src/lib/enrollments.ts`

- [ ] **Step 1: Add Orders to sidebar**

In `src/app/admin/_components/sidebar.tsx`, add `ShoppingBag` to the Lucide imports and add to `navItems`:

```typescript
import { LayoutDashboard, ClipboardList, Pencil, Search, BarChart3, Settings, ShoppingBag } from 'lucide-react'

// In navItems array, after 'Aanvragen':
{ href: '/admin/dashboard/orders', label: 'Orders', icon: ShoppingBag },
```

- [ ] **Step 2: Create `src/app/admin/dashboard/orders/page.tsx`**

```typescript
import { getEnrollments } from '@/lib/enrollments'
import OrdersTable from './_components/orders-table'

export default async function OrdersPage() {
  const enrollments = await getEnrollments().catch(() => [])
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500 mt-0.5">{enrollments.length} inschrijvingen</p>
      </div>
      <OrdersTable enrollments={enrollments} />
    </div>
  )
}
```

- [ ] **Step 3: Create `src/app/admin/dashboard/orders/_components/orders-table.tsx`**

```typescript
'use client'
import { useState, useMemo } from 'react'
import type { Enrollment } from '@/lib/enrollments'

const STATUS_LABELS: Record<string, string> = {
  pending:   'In behandeling',
  confirmed: 'Bevestigd',
  paid:      'Betaald',
}
const STATUS_COLORS: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  paid:      'bg-emerald-100 text-emerald-700',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })
}

function fmt(n: number | string) { return '$' + Number(n).toLocaleString('en-US') }

export default function OrdersTable({ enrollments }: { enrollments: Enrollment[] }) {
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const courses = useMemo(() => ['all', ...Array.from(new Set(enrollments.map(e => e.course_slug)))], [enrollments])

  const filtered = useMemo(() => {
    let r = enrollments
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(e => e.naam.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || (e.bedrijfsnaam ?? '').toLowerCase().includes(q))
    }
    if (courseFilter !== 'all') r = r.filter(e => e.course_slug === courseFilter)
    if (statusFilter !== 'all') r = r.filter(e => e.status === statusFilter)
    return r
  }, [enrollments, search, courseFilter, statusFilter])

  function downloadCSV() {
    const rows = [
      ['Datum', 'Course', 'Type', 'Naam', 'Bedrijf', 'Email', 'Deelnemers', 'Uren', 'Totaal', 'Status'],
      ...filtered.map(e => [
        formatDate(e.created_at), e.course_name, e.enrollment_type,
        e.naam, e.bedrijfsnaam ?? '', e.email,
        String(e.deelnemers), e.uren ? String(e.uren) : '',
        String(e.total_usd), e.status,
      ]),
    ]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a'); a.href = url; a.download = 'orders.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Zoeken..." className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm w-48" />
        <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm">
          {courses.map(c => <option key={c} value={c}>{c === 'all' ? 'Alle courses' : c}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border border-zinc-200 rounded-md px-3 py-1.5 text-sm">
          <option value="all">Alle statussen</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <button onClick={downloadCSV} className="ml-auto bg-zinc-900 text-white text-sm px-4 py-1.5 rounded-md hover:bg-zinc-700 transition-colors">CSV Export</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-200">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              {['Datum', 'Course', 'Type', 'Naam', 'Bedrijf', 'Deelnemers', 'Totaal', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="text-center py-8 text-zinc-400">Geen orders gevonden</td></tr>
            )}
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-zinc-500">{formatDate(e.created_at)}</td>
                <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{e.course_name}</td>
                <td className="px-4 py-3 capitalize text-zinc-600">{e.enrollment_type}</td>
                <td className="px-4 py-3 text-zinc-900">{e.naam}</td>
                <td className="px-4 py-3 text-zinc-600">{e.bedrijfsnaam ?? '—'}</td>
                <td className="px-4 py-3 text-center">{e.deelnemers}{e.uren ? ` · ${e.uren}u` : ''}</td>
                <td className="px-4 py-3 font-semibold text-zinc-900 whitespace-nowrap">{fmt(e.total_usd)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[e.status]}`}>
                    {STATUS_LABELS[e.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-400">{filtered.length} van {enrollments.length} orders</p>
    </div>
  )
}
```

- [ ] **Step 4: Verify admin orders page loads**

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/admin/dashboard/orders
```
Expected: `307` (redirect to login — correct, not logged in)

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/dashboard/orders/ src/app/admin/_components/sidebar.tsx
git commit -m "feat: add Orders admin dashboard and sidebar nav item"
```

---

## Task 11: Push and deploy

- [ ] **Step 1: Push branch**

```bash
git push
```

- [ ] **Step 2: Check Vercel preview deploys successfully**

Watch the Vercel dashboard or run:
```bash
gh pr checks 1
```
Expected: all checks pass, Vercel deployment `READY`.

- [ ] **Step 3: Smoke-test on Vercel preview URL**

Visit the Vercel preview URL (from `gh pr view 1`) and manually:
- Open `/en/education/ai-hands-on-deck` → click enroll button → drawer opens
- Toggle Individual / Team → calculator updates
- Fill step 2 → submit (note: may 500 if `DATABASE_URL` not set in Vercel yet)
- Open `/en/education/finance-accounting-claude` → move sliders → click "Offerte aanvragen" → drawer opens pre-filled
- Open `/admin/dashboard/orders` → Orders tab visible in sidebar
