# Enrollment Drawers & Course Calculators — Design Spec
**Date:** 2026-06-27  
**Project:** Suritargets Website (stweb)  
**Status:** Approved by user

---

## Overview

Add enrollment/quote request functionality to all education course pages via a right-side slide-over drawer. Each course has its own calculator. Team/in-house bookings have a detailed cost breakdown. All enrollments are saved to the database and visible in the admin dashboard under a new "Orders" tab.

---

## Pricing Structure

| Course | Individual | Team / In-house | Min |
|---|---|---|---|
| AI – Hands On Deck | $750 / person | $400 / person | None (individual), 5 (team) |
| Trading Course | $525 / person (3 × $175/mnd) | $400 / person | 5 (team) |
| IT Courses | $45 / hr × persons | 14u Foundation (fixed) + variable hrs × $45 | 5 |
| Business Courses | $45 / hr × persons | 14u Foundation (fixed) + variable hrs × $45 | 5 |
| Finance & Accounting | Existing calculator | Existing calculator | 5 seats |

---

## EnrollmentDrawer Component

### Location
`src/components/enrollment/enrollment-drawer.tsx`

### Props
```ts
type CourseType = 'flat' | 'monthly' | 'hourly' | 'finance'

interface EnrollmentDrawerProps {
  open: boolean
  onClose: () => void
  course: {
    slug: string
    name: string
    type: CourseType
    priceIndividual: number     // per person
    priceTeam: number           // per person (team rate)
    monthlyPrice?: number       // for Trading
    monthsDuration?: number     // for Trading (3)
    locale: string
  }
  calculatorData?: FinanceCalculatorData  // pre-filled from Finance calc
}
```

### UI Flow

**Step 1 — Calculator**
- Toggle: `Individueel` / `Team & In-house`
- **Individueel**: participants counter (no min), price × participants, live total
- **Team**: participants slider (min 5), cost breakdown based on course type:
  - *Flat* (AI, Trading): participants × team price, total
  - *Hourly* (IT, Business): Foundation 14u (fixed) + Training sessions slider + Build hours slider, all × $45, live total
  - *Finance*: existing calculator fields pre-filled, read-only summary
- Live total amount shown prominently at bottom

**Step 2 — Details**
- `clientType`: Zakelijk / Particulier (pre-set from toggle but editable)
- `naam` (required)
- `bedrijfsnaam` (required if Zakelijk)
- `email` (required)
- `telefoon` (optional)
- `opmerkingen` (optional)
- Submit button: "Inschrijving bevestigen" / "Offerte aanvragen"

---

## Calculator Breakdown per Course (Team drawer)

### AI – Hands On Deck
```
Deelnemers (min 5): [slider]
Prijs per persoon:   $400
─────────────────────────
Totaal:             $X
```

### Trading Course
```
Deelnemers (min 5): [slider]
Maand 1 – $400/pp
Maand 2 – $400/pp
Maand 3 – $400/pp
─────────────────────────
Totaal:             $X
```

### IT / Business Courses
```
Deelnemers (min 5):         [slider]
Foundation & setup (vast):   14 u
Training sessies:            [slider, steps of 2u]
Build / tools:               [slider, steps of 2u]
─────────────────────────────────────────
Totaal uren:                 X u
Uurtarief:                   $45
Subtotaal per persoon:       $X
Totaal (X personen):         $X
```

### Finance & Accounting
Pre-filled from existing calculator. Drawer shows read-only summary + person details in Step 2.

---

## API Route

**Endpoint:** `POST /api/enroll`

**Request body:**
```ts
{
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
  totalAmount: number
  calculatorData?: Record<string, unknown>  // raw calc state for Finance
  opmerkingen?: string
}
```

**Server actions:**
1. Validate with Zod
2. Insert into `enrollments` table
3. Send notification email to `CONTACT_TO` with full breakdown
4. Send confirmation email to client

---

## Database Schema

New table: `enrollments`

```sql
CREATE TABLE enrollments (
  id            SERIAL PRIMARY KEY,
  course_slug   TEXT NOT NULL,
  course_name   TEXT NOT NULL,
  enrollment_type TEXT NOT NULL CHECK (enrollment_type IN ('individual','team')),
  client_type   TEXT NOT NULL CHECK (client_type IN ('zakelijk','particulier')),
  naam          TEXT NOT NULL,
  bedrijfsnaam  TEXT,
  email         TEXT NOT NULL,
  telefoon      TEXT,
  deelnemers    INTEGER NOT NULL DEFAULT 1,
  uren          INTEGER,
  total_usd     NUMERIC(10,2) NOT NULL,
  calculator_data JSONB,
  opmerkingen   TEXT,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','paid')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

## Admin Dashboard — Orders Tab

**Location:** `src/app/admin/dashboard/orders/page.tsx`

**Features:**
- Table columns: Date, Course, Type (Individual/Team), Naam, Bedrijf, Deelnemers, Totaal, Status
- Filter by: course, type, status
- Status update: pending → confirmed → paid (inline dropdown)
- CSV export
- Same styling as existing submissions table

---

## Files to Create / Modify

### New files
- `src/components/enrollment/enrollment-drawer.tsx`
- `src/components/enrollment/calculator-flat.tsx`
- `src/components/enrollment/calculator-monthly.tsx`
- `src/components/enrollment/calculator-hourly.tsx`
- `src/app/api/enroll/route.ts`
- `src/app/admin/dashboard/orders/page.tsx`
- `src/lib/enrollments.ts` (DB queries)

### Modified files
- `src/app/[locale]/education/ai-hands-on-deck/page.tsx` — add drawer trigger
- `src/app/[locale]/education/finance-accounting-claude/page.tsx` — connect calc → drawer
- `src/app/[locale]/education/[slug]/page.tsx` — add drawer trigger for IT/Business/Trading
- `src/app/admin/_components/sidebar.tsx` — add Orders nav item
- `src/lib/db.ts` — add enrollments migration/queries
- `messages/*.json` — enrollment i18n strings

---

## Email Templates

### Notification to Ken (CONTACT_TO)
Subject: `Nieuwe inschrijving: {courseName} — {naam}`
Body: full breakdown — course, type, deelnemers, uren, totaal, contactgegevens, calculator snapshot

### Confirmation to client
Subject: `Bevestiging inschrijving — {courseName} | Suritargets`
Body: bedankt, overzicht van aanvraag, "wij nemen binnen 1–2 werkdagen contact op"

---

## Out of Scope
- Online payment (Stripe/Mollie) — not in this spec
- PDF invoice generation — not in this spec
- Email attachments — not in this spec
