# Suritargets — Claude Usage Plan
**Opgesteld voor:** Ken Alimoestar, Founder — Suritargets
**Datum:** 2026-03-28
**Doel:** Hoe je Claude + de custom skills optimaal inzet voor Suritargets

---

## Overzicht van alle deliverables

| # | Project | Status | Spec/Plan |
|---|---|---|---|
| 1 | **Website Phase 1** — Home, About, Services, Contact | Ready to build | `docs/superpowers/plans/2026-03-28-suritargets-website-phase1.md` |
| 2 | **Explainer video** — Remotion motion graphic | Spec needed | Zie Fase 3 hieronder |
| 3 | **Website Phase 2** — Blog CMS, Case Studies | After Phase 1 | Plan to be written |
| 4 | **Website Phase 3** — Bilingual, Client portal | After Phase 2 | Plan to be written |

---

## Fase 1 — Website bouwen (Nu)

### Hoe te starten

```bash
# Stap 1: Ga naar project directory
cd "D:/apps lab/surtargets"

# Stap 2: Zeg tegen Claude:
"Execute the implementation plan at docs/superpowers/plans/2026-03-28-suritargets-website-phase1.md"
```

Claude volgt dan het plan task-by-task met de `superpowers:executing-plans` of `superpowers:subagent-driven-development` skill.

### Aanbevolen werkvolgorde

```
Task 1 (Scaffold)     → 15-20 min
Task 2 (Design tokens) → 10 min
Task 3 (Config/data)   → 10 min
Task 4+5+6 (Layout)   → 20 min  ← doe 4, 5, 6 in één sessie
Task 7 (Home page)    → 20 min  ← dan npm run dev om te testen
Task 8 (About)        → 15 min
Task 9 (Services)     → 20 min
Task 10 (DB/Email)    → 20 min  ← vereist .env.local met DB + Resend keys
Task 11 (Contact)     → 20 min
Task 12 (SEO/404)     → 10 min
Task 13 (OG images)   → 15 min
Task 14 (E2E tests)   → 15 min
Task 15 (Deploy)      → 30 min  ← Cloudways setup
```

**Totaal estimate:** 3-4 uur bouwtijd

### Vóór je begint — Keys die je nodig hebt

```env
DB_HOST=         # Cloudways MariaDB host
DB_USER=         # Database gebruiker
DB_PASSWORD=     # Database wachtwoord
DB_NAME=         # suritargets_db
RESEND_API_KEY=  # Aanmaken op resend.com (gratis tier: 3000 emails/maand)
RESEND_FROM=     # noreply@suritargets.com
RESEND_TO=       # info@suritargets.com
NEXT_PUBLIC_SITE_URL= # https://suritargets.com
```

---

## Fase 2 — Explainer Video (Na Phase 1 website)

De explainer video wordt gebouwd met **Remotion** — React-based video die direct in de website embedded wordt.

### Video concept voor Suritargets

**Duur:** 60-90 seconden
**Stijl:** Motion graphic — navy achtergrond, gold animaties, Geist typography
**Geen voice-over** (te starten) — tekst-gedreven animaties

**Story arc:**
```
0:00–0:10  → "Suritargets" logo reveal (gold particles → wordmark)
0:10–0:25  → "5 service clusters" — animated cards verschijnen één voor één
0:25–0:40  → Caribbean map → Suriname highlight → regio markering
0:40–0:55  → Key differentiators animeren in: "Custom" / "Caribbean" / "End-to-End"
0:55–1:10  → CTA: "Start een gesprek" + website URL
```

### Hoe te bouwen

```bash
# Zeg tegen Claude in een nieuwe sessie:
"Build a Remotion explainer video for Suritargets.
Use the remotion skill. Navy/gold design matching the website.
60 seconds at 30fps. Script is in docs/USAGE-PLAN.md"
```

---

## Token Efficiëntie — Hoe je Claude goedkoop houdt

### Gouden regels

| Regel | Waarom |
|---|---|
| **Één taak per sessie** | Lange sessies gebruiken veel context tokens. Sluit af en open nieuw voor volgende taak. |
| **Verwijs naar docs** | Zeg "follow the plan at docs/superpowers/plans/..." in plaats van alles opnieuw te beschrijven |
| **Gebruik skills** | Skills geven Claude de juiste kennis zonder dat jij het hoeft uit te leggen |
| **Specifiek zijn** | "Fix the contact form validation error on line 45" = goedkoper dan "something is wrong with the form" |
| **Geen open vragen** | Beslissingen neem jij — Claude implementeert. Hoe minder "what do you think" vragen, hoe minder tokens. |

### Sessie templates

**Voor bouwtaken:**
```
"Execute Task [N] from docs/superpowers/plans/2026-03-28-suritargets-website-phase1.md.
Follow the steps exactly. Run tests after each step."
```

**Voor bugfixes:**
```
"[exact error message]. Fix this in [file path]. Do not change anything else."
```

**Voor nieuwe features:**
```
"Add [feature] to [page]. Follow the existing patterns in [reference file]. Keep it minimal."
```

**Voor design vragen:**
```
"Review [component file] against the design spec at docs/superpowers/specs/2026-03-28-suritargets-website-design.md. What needs to change?"
```

---

## Custom Skills — Wat je nu hebt

| Skill | Activeer automatisch op | Gebruik voor |
|---|---|---|
| `remotion` | `*.remotion.tsx` bestanden | Explainer video bouwen |
| `cloudways-stack` | `ecosystem.config.js`, PM2 commando's | Deployment, server problemen |
| Vercel built-in skills | Next.js, shadcn, OG images, etc. | Alles in de website stack |

### Skills zelf toevoegen (toekomst)

Zeg tegen Claude:
```
"Create a new skill for [tool/library].
Save it to C:\Users\USER\.claude\skills\[naam]\SKILL.md"
```

---

## Workflow voor content updates (Na launch)

### Blog post toevoegen (Phase 2)
Straks via CMS admin panel — geen code kennis vereist.

### Service content aanpassen
Bewerk `lib/services-data.ts` — alles staat in één bestand.

### Kleur of design aanpassen
Bewerk `app/globals.css` — alle tokens staan bovenaan.

---

## Project roadmap

```
April 2026    Phase 1 website live op Cloudways
Mei 2026      Explainer video embedded op site
Juni 2026     Phase 2 — Blog + Case Studies CMS
Q3 2026       Phase 3 — Bilingual NL/EN routing
2027          Client portal (login, projecttracking)
```

---

## Hulp nodig?

Bij problemen zeg: `"Something is wrong with [X]"` — Claude activeert automatisch de `investigation-mode` skill voor gestructureerd debuggen.

Bij grote nieuwe features zeg: `"I want to add [feature] to Suritargets"` — Claude start het brainstorming → planning → execution proces opnieuw.
