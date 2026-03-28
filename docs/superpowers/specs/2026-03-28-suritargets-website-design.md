# Suritargets Website Redesign — Design Spec
**Date:** 2026-03-28
**Company:** Suritargets — Dr. Sophie Redmonstraat 244, Paramaribo, Suriname
**Founder:** Ken Alimoestar
**Status:** Approved

---

## 1. Project Goal

Redesign the Suritargets company website as a premium, custom, multi-page platform that positions Suritargets as the premier business tech partner in the Caribbean region. The site must feel exclusive and tailored — the opposite of off-the-shelf. Target audience: corporate clients, government, MKB, and innovators across the Caribbean seeking custom tech solutions.

---

## 2. Brand Direction — "Authority"

The design language communicates institutional trust, precision, and Caribbean identity.

### Color System
| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#0B1628` | Backgrounds, headers |
| `--color-surface` | `#111E35` | Cards, panels |
| `--color-secondary` | `#F0F4FF` | Light backgrounds |
| `--color-accent` | `#C9A84C` | CTAs, highlights, borders |
| `--color-text-on-dark` | `#E8EDF5` | Body text on dark |
| `--color-text-on-light` | `#0B1628` | Body text on light |
| `--color-muted` | `#6B7A99` | Secondary text, meta |

### Typography
- **Headings:** Geist Sans — Bold/Black, tight tracking (`-0.02em`)
- **Body:** Geist Sans — Regular (400), Medium (500)
- **Data/Code/Metrics:** Geist Mono

| Token | Size | Weight | Use |
|---|---|---|---|
| `text-hero` | clamp(48px, 7vw, 96px) | 800 | Hero headline |
| `text-h1` | clamp(36px, 5vw, 64px) | 700 | Page titles |
| `text-h2` | clamp(28px, 3.5vw, 48px) | 700 | Section headings |
| `text-h3` | clamp(20px, 2.5vw, 32px) | 600 | Card titles |
| `text-body-lg` | 18px | 400 | Lead paragraphs |
| `text-body` | 16px | 400 | Body copy |
| `text-sm` | 14px | 400/500 | Meta, labels |
| `text-mono` | 13px | 400 | Code, data |

### Grid & Layout
- 12-column grid, max-width 1440px, 80px horizontal padding desktop
- Sharp edges, minimal border-radius (4px max on cards)
- Deliberate white/dark space — not crowded
- Sections separated by full-width dividers or color shifts

### Motion
- Scroll-triggered fade-ins (Intersection Observer, threshold: 0.15)
- Section entry: `translateY(20px) → 0, opacity 0 → 1`, duration 220ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`
- Staggered children: 60ms delay per item
- No auto-playing animations, no parallax gimmicks
- Hover states: gold accent underline on links, `box-shadow: 0 0 0 1px var(--color-accent)` on cards

### Grid & Breakpoints
- 12-column grid, max-width 1440px, gutter 24px
- Horizontal padding: 80px (desktop ≥1280px), 40px (tablet ≥768px), 20px (mobile)
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1440px`
- Border-radius: `4px` card corners, `2px` inputs, `0` for section/hero elements

### Accessibility
- WCAG 2.1 AA: all text contrast ≥ 4.5:1 (body), ≥ 3:1 (large text/UI)
- `--color-accent` on `--color-primary` bg = 5.1:1 ✓
- Focus indicator: `2px solid var(--color-accent)` offset `2px`

---

## 3. Site Architecture

```
/                          Home
/about                     About Suritargets & Founder
/services                  Services hub (all clusters)
/services/business-support FinTech, Business, HR, Product Development
/services/web-applications UI/UX, App Services, Web Business Support
/services/research         Research & Development
/services/forensics        Forensics & Integrity Services
/services/education        Blockchain, AI, Business Innovation, FinTech Innovation
/case-studies              Portfolio & client results
/insights                  Blog — Caribbean tech thought leadership
/contact                   Contact + intake form
```

---

## 4. Page Specifications

### Home (`/`)
1. **Nav** — Logo left, navigation center/right, "Contact" as gold CTA button
2. **Hero** — Full-viewport, dark background, large headline (2-3 words impact statement), subheading (1 sentence), dual CTA (primary: "Onze Services", secondary: "Neem Contact Op"), subtle grid pattern overlay
3. **Services Grid** — 5 service cluster cards, icon + name + short description, links to service detail pages
4. **Why Suritargets** — 3 columns: Custom & Tailored / Caribbean Expertise / End-to-End Support
5. **Trust signals** — Client logos or industries served (placeholder if no logos yet)
6. **CTA Banner** — Full-width dark section, gold headline, contact button
7. **Footer** — Address, services list, social links, copyright

### About (`/about`)
1. Company mission statement (hero)
2. Founder section — Ken Alimoestar, photo placeholder, bio
3. Company values (3–4 pillars)
4. Caribbean regional focus section — why Suriname, why the Caribbean

### Services Hub (`/services`)
- Full grid of all 5 service clusters
- Each card: icon, name, short description, "Meer info" link
- Introductory paragraph positioning Suritargets' bespoke approach

### Service Detail Pages (5 pages)
Each follows same template:
1. Hero — service name + 1-line description
2. What it is — 2-3 paragraphs
3. Who it's for — target client profile
4. Deliverables — what the client receives
5. Related services — 2 cards
6. CTA — "Start een gesprek"

### Case Studies (`/case-studies`)
- Grid layout, filter by sector tag
- Each case: client (anonymized if needed), challenge, solution, result
- Detail page per case study

### Insights (`/insights`)
- Blog grid — card per article (title, date, category, excerpt)
- Categories: Caribbean Business Tech, FinTech, AI & Blockchain, Business Innovation
- Detail page with full article
- SEO-optimized (meta, OG tags, structured data)

### Contact (`/contact`)
**Intake form fields:**
| Field | Type | Required |
|---|---|---|
| Naam | text | yes |
| Bedrijfsnaam | text | yes |
| E-mailadres | email | yes |
| Telefoonnummer | tel | no |
| Service interesse | select (6 options + "Anders") | yes |
| Bericht | textarea (min 3 rows) | yes |

**Submission flow:** POST → Next.js Route Handler → save to DB → send confirmation email via Resend to client + notification to info@suritargets.com → show success state inline (no page redirect).
**Validation:** Client-side (HTML5 + React) + server-side. Error messages below each field.
**Address block:** Dr. Sophie Redmonstraat 244, Paramaribo, Suriname
**Response time:** "We reageren binnen 1–2 werkdagen"

### 404 Page
- Branded dark page, headline "Pagina niet gevonden", link back to home and services

### Phase 2 Routes in Phase 1 Nav
- `/case-studies` and `/insights` nav links render with "Coming Soon" badge
- Routes return a placeholder page (branded, with email signup)

---

## 5. Deployment Architecture (Cloudways + Next.js 15)

Cloudways does not have native Next.js support — requires explicit setup:

1. **Next.js output mode:** `output: 'standalone'` in `next.config.ts`
2. **Node.js server:** PM2 process manager running `node server.js` on port 3000
3. **Reverse proxy:** Nginx (Cloudways built-in) → proxy_pass to Node on port 3000
4. **Varnish:** Sits in front of Nginx for full-page caching of static/ISR routes
5. **Redis:** Upstash or self-hosted on same Cloudways server — used for rate limiting on contact form and session cache (Phase 3)
6. **SSL:** Let's Encrypt via Cloudways panel

**Environment:**
- Node.js 20 LTS on Cloudways app server
- MariaDB 10.11 managed database
- `.env.production` for secrets (never committed)

---

## 6. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG for static pages, SSR for dynamic |
| Hosting | Cloudways (Vultr or DigitalOcean) | User's existing infra preference |
| Database | MySQL / MariaDB | Content, contacts, case studies, blog |
| Cache | Redis | Session cache, rate limiting |
| CDN/Proxy | Varnish | Static asset caching, page cache |
| UI Components | shadcn/ui + Tailwind CSS | Custom theme with brand tokens |
| Fonts | Geist via next/font | Zero layout shift |
| Email | Resend | Contact form confirmations + notifications |
| Analytics | Plausible or Vercel Analytics | Privacy-friendly |
| CMS | Custom DB-driven admin (Phase 2) | Blog posts, case studies management |

---

## 6. Content Strategy

- **Language:** Static bilingual — NL and EN content side by side or in sections. No toggle needed. Headlines in both languages where impactful. Body copy in NL primary.
- **Visuals:** No photography. Pure typographic, color-driven, abstract shape design. Motion graphic elements (CSS animations, SVG, potentially Remotion-rendered video loops). This is the "premium minimal" direction.
- **Tone:** Authoritative, precise, approachable — never arrogant
- **Differentiator messaging:** "Niet van de plank — volledig op maat" / "Not off the shelf — fully tailored" throughout
- **SEO targets:** Suriname tech, Caribbean FinTech, business tech Paramaribo, Suriname web development
- **Abstract visual elements:** Geometric grid patterns, gold line art, animated SVG backgrounds (subtle), data visualization aesthetics

---

## 7. Performance & Quality Requirements

- Lighthouse score ≥ 90 (Performance, Accessibility, SEO)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Mobile-first responsive design
- WCAG 2.1 AA accessibility
- OG images for all pages (Satori)

---

## 8. Phased Delivery

| Phase | Scope |
|---|---|
| **Phase 1** | Home, About, Services hub + 5 detail pages, Contact |
| **Phase 2** | Case Studies, Insights/Blog with CMS admin |
| **Phase 3** | Bilingual (NL/EN), advanced analytics, client portal |

---

## 9. Out of Scope (this spec)

- Explainer video (separate project — see explainer video spec, built with **Remotion**)
- Custom skills creation (separate project)
- E-commerce / payments
- Client login portal (Phase 3)

---

## 10. Explainer Video — Scope Note

A motion graphic explainer video for Suritargets will be built with **Remotion** (React-based programmatic video). This is a separate sub-project with its own spec. The video will be embedded on the Home page hero or About page. Visual language must match the website: navy, gold, Geist typography, geometric shapes, no stock footage.

### Remotion Skill Required
Remotion (`@remotion/core`, `@remotion/player`, `@remotion/renderer`) will need a custom skill. Key capabilities:
- React components → MP4/WebM video
- Embed as `<Player>` component directly in Next.js pages
- Animate with `useCurrentFrame()`, `interpolate()`, `spring()`
- Export via `npx remotion render` or bundle for web playback
