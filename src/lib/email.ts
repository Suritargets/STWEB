import nodemailer from 'nodemailer'
import type { ContactFormData, EnrollmentFormData, WebinarRegistrationFormData } from './validations'
import { WEBINAR_COUPON_CODE, WEBINAR_COUPON_DISCOUNT_USD } from './coupon'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com'

// ─── Design tokens (mirrors src/app/globals.css — inlined for email-client support) ──
const NAVY      = '#0B1628'
const PRIMARY   = '#2B3494'
const ACCENT    = '#E8192C'
const FOREGROUND = '#1A1A2E'
const MUTED     = '#6B7280'
const BORDER    = '#DCDFF0'
const CARD      = '#F4F5FA'
const FONT_SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"
const FONT_MONO = "SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace"

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function fmtUsd(n: number): string {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtDate(iso?: string): string {
  const d = iso ? new Date(iso) : new Date()
  return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}

function invoiceNumber(id: number): string {
  return `INV-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`
}

// Mono, uppercase, tracked label — the site's recurring "eyebrow" pattern (see SectionHeading)
function eyebrow(text: string, color = PRIMARY): string {
  return `<p style="margin:0 0 6px;font-family:${FONT_MONO};font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${color}">${text}</p>`
}

// Eyebrow + bold title header block, optionally with right-aligned mono meta (invoice nr, id, ...)
function sectionHeader(label: string, title: string, meta?: string): string {
  return `
    <div style="padding:28px 32px 22px;border-bottom:1px solid ${BORDER}">
      <table role="presentation" width="100%"><tr>
        <td>
          ${eyebrow(label)}
          <p style="margin:0;font-size:21px;font-weight:800;letter-spacing:-0.01em;color:${FOREGROUND}">${title}</p>
        </td>
        ${meta ? `<td align="right" style="vertical-align:top;white-space:nowrap"><span style="font-family:${FONT_MONO};font-size:11px;color:${MUTED};letter-spacing:0.05em">${meta}</span></td>` : ''}
      </tr></table>
    </div>`
}

function dataRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:11px 16px;font-family:${FONT_MONO};font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};width:130px;vertical-align:top;border-bottom:1px solid ${BORDER}">${label}</td>
    <td style="padding:11px 16px;font-size:14px;color:${FOREGROUND};font-weight:500;border-bottom:1px solid ${BORDER}">${value}</td>
  </tr>`
}

function dataTable(rows: string): string {
  return `<table role="presentation" width="100%" style="border-collapse:collapse;background:${CARD};border:1px solid ${BORDER};border-radius:6px;overflow:hidden">${rows}</table>`
}

function noteBlock(label: string, text: string): string {
  return `
    <div style="margin-top:20px">
      ${eyebrow(label, MUTED)}
      <div style="background:${CARD};border-left:3px solid ${PRIMARY};padding:14px 16px;font-size:14px;color:${FOREGROUND};line-height:1.6;white-space:pre-wrap">${text}</div>
    </div>`
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${PRIMARY};color:#ffffff;padding:12px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.02em;border-radius:4px">${label}</a>`
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${CARD};font-family:${FONT_SANS}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" style="max-width:580px">
      <!-- Accent strip -->
      <tr><td style="background:${ACCENT};height:4px;font-size:0;line-height:0">&nbsp;</td></tr>
      <!-- Logo header -->
      <tr><td style="background:${NAVY};padding:22px 32px">
        <table role="presentation" width="100%">
          <tr>
            <td><img src="${SITE_URL}/logo-white.svg" alt="Suritargets" height="26" style="height:26px;width:auto;display:block" /></td>
            <td align="right" style="color:rgba(255,255,255,0.5);font-size:11px;font-family:${FONT_MONO};letter-spacing:0.15em">SURITARGETS.COM</td>
          </tr>
        </table>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:#ffffff;border:1px solid ${BORDER};border-top:none">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr><td style="padding:24px 0;text-align:center">
        <p style="margin:0;font-family:${FONT_MONO};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:${MUTED}">
          Suritargets · Paramaribo, Suriname · <a href="${SITE_URL}" style="color:${MUTED}">suritargets.com</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// ─── Contact ───────────────────────────────────────────────────────────────

export async function sendContactConfirmation(data: ContactFormData): Promise<void> {
  const transporter = getTransporter()
  const content = `
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:16px;color:${FOREGROUND}">Beste ${escapeHtml(data.naam)},</p>
      <p style="margin:0 0 16px;color:#374151;line-height:1.6">Bedankt voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen binnen <strong>1–2 werkdagen</strong> contact met u op.</p>
      <hr style="border:none;border-top:1px solid ${BORDER};margin:24px 0"/>
      <p style="margin:0;color:${MUTED};font-size:13px">Heeft u vragen? Stuur een e-mail naar <a href="mailto:info@suritargets.com" style="color:${PRIMARY}">info@suritargets.com</a></p>
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: 'Bedankt voor uw bericht — Suritargets',
    html: emailWrapper(content),
  })
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const transporter = getTransporter()
  const services = data.services.join(', ') || '—'

  const content = `
    ${sectionHeader('Nieuw verzoek', 'Contactformulier')}
    <div style="padding:24px 32px">
      ${dataTable([
        dataRow('Type', data.clientType === 'zakelijk' ? 'Zakelijk' : 'Particulier'),
        dataRow('Naam', escapeHtml(data.naam)),
        data.bedrijfsnaam ? dataRow('Bedrijf', escapeHtml(data.bedrijfsnaam)) : '',
        dataRow('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:${PRIMARY}">${escapeHtml(data.email)}</a>`),
        data.telefoon ? dataRow('Telefoon', escapeHtml(data.telefoon)) : '',
        dataRow('Diensten', escapeHtml(services)),
        data.budget ? dataRow('Budget', escapeHtml(data.budget)) : '',
      ].join(''))}
      ${noteBlock('Bericht', escapeHtml(data.bericht))}
      <p style="margin-top:24px">
        ${button(`mailto:${escapeHtml(data.email)}`, 'Beantwoorden')}
      </p>
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    replyTo: data.email,
    subject: `Nieuw verzoek: ${escapeHtml(data.naam)}${data.bedrijfsnaam ? ` · ${escapeHtml(data.bedrijfsnaam)}` : ''}`,
    html: emailWrapper(content),
  })
}

// ─── Enrollment ────────────────────────────────────────────────────────────

export async function sendEnrollmentNotification(data: EnrollmentFormData, id: number): Promise<void> {
  const transporter = getTransporter()
  const typeLabel = data.enrollmentType === 'team' ? 'Team / In-house' : 'Individueel'
  const invNr = invoiceNumber(id)

  const content = `
    ${sectionHeader('Nieuwe inschrijving', escapeHtml(data.courseName), escapeHtml(invNr))}
    <div style="padding:24px 32px">
      ${dataTable([
        dataRow('Type', typeLabel),
        dataRow('Naam', `<strong>${escapeHtml(data.naam)}</strong>`),
        data.bedrijfsnaam ? dataRow('Bedrijf', escapeHtml(data.bedrijfsnaam)) : '',
        dataRow('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:${PRIMARY}">${escapeHtml(data.email)}</a>`),
        data.telefoon ? dataRow('Telefoon', escapeHtml(data.telefoon)) : '',
        dataRow('Deelnemers', String(data.deelnemers)),
        data.uren ? dataRow('Uren', `${data.uren}u`) : '',
      ].join(''))}
      <!-- Total box -->
      <div style="margin-top:16px;background:${NAVY};border-radius:6px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:rgba(255,255,255,0.7);font-size:13px">Totaal</span>
        <span style="color:#ffffff;font-size:22px;font-weight:800;font-family:${FONT_MONO}">${fmtUsd(data.totalUsd)}</span>
      </div>
      ${data.opmerkingen ? noteBlock('Opmerkingen', escapeHtml(data.opmerkingen)) : ''}
      <p style="margin-top:24px">
        ${button(`mailto:${escapeHtml(data.email)}`, 'Beantwoorden')}
      </p>
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    replyTo: data.email,
    subject: `Nieuwe inschrijving: ${escapeHtml(data.courseName)} — ${escapeHtml(data.naam)} (${invNr})`,
    html: emailWrapper(content),
  })
}

export async function sendEnrollmentInvoice(data: EnrollmentFormData, id: number): Promise<void> {
  const transporter = getTransporter()
  const invNr = invoiceNumber(id)
  const dateStr = fmtDate()
  const typeLabel = data.enrollmentType === 'team' ? 'Team / In-house' : 'Individueel'

  const content = `
    <div style="background:${NAVY};padding:22px 32px">
      <table role="presentation" width="100%">
        <tr>
          <td style="color:rgba(255,255,255,0.9);font-family:${FONT_MONO};font-size:20px;font-weight:800;letter-spacing:0.08em">FACTUUR</td>
          <td align="right">
            <p style="margin:0;color:#ffffff;font-size:13px;font-family:${FONT_MONO}">${escapeHtml(invNr)}</p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:12px">${dateStr}</p>
          </td>
        </tr>
      </table>
    </div>
    <div style="padding:28px 32px">
      <!-- From / To -->
      <table role="presentation" width="100%" style="margin-bottom:28px">
        <tr>
          <td style="width:50%;vertical-align:top">
            ${eyebrow('Van', MUTED)}
            <p style="margin:0;font-weight:700;color:${FOREGROUND};font-size:14px">Suritargets</p>
            <p style="margin:2px 0 0;color:${MUTED};font-size:13px">Paramaribo, Suriname</p>
            <p style="margin:2px 0 0;color:${MUTED};font-size:13px">info@suritargets.com</p>
            <p style="margin:2px 0 0;color:${MUTED};font-size:13px">suritargets.com</p>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:24px">
            ${eyebrow('Aan', MUTED)}
            <p style="margin:0;font-weight:700;color:${FOREGROUND};font-size:14px">${escapeHtml(data.naam)}</p>
            ${data.bedrijfsnaam ? `<p style="margin:2px 0 0;color:${MUTED};font-size:13px">${escapeHtml(data.bedrijfsnaam)}</p>` : ''}
            <p style="margin:2px 0 0;color:${MUTED};font-size:13px">${escapeHtml(data.email)}</p>
            ${data.telefoon ? `<p style="margin:2px 0 0;color:${MUTED};font-size:13px">${escapeHtml(data.telefoon)}</p>` : ''}
          </td>
        </tr>
      </table>
      <!-- Line items -->
      <table role="presentation" width="100%" style="border-collapse:collapse">
        <thead>
          <tr style="background:${CARD};border-bottom:2px solid ${BORDER}">
            <th style="padding:10px 12px;text-align:left;font-family:${FONT_MONO};font-size:10px;color:${MUTED};font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Omschrijving</th>
            <th style="padding:10px 12px;text-align:center;font-family:${FONT_MONO};font-size:10px;color:${MUTED};font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Aantal</th>
            <th style="padding:10px 12px;text-align:right;font-family:${FONT_MONO};font-size:10px;color:${MUTED};font-weight:700;text-transform:uppercase;letter-spacing:0.08em">Bedrag</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid ${BORDER}">
            <td style="padding:14px 12px;font-size:14px;color:${FOREGROUND}">
              <strong>${escapeHtml(data.courseName)}</strong>
              <br/><span style="color:${MUTED};font-size:12px">${typeLabel}${data.uren ? ` · ${data.uren} uur` : ''}</span>
            </td>
            <td style="padding:14px 12px;text-align:center;font-size:14px;color:#374151">${data.deelnemers}</td>
            <td style="padding:14px 12px;text-align:right;font-size:14px;color:${FOREGROUND};font-weight:600">${fmtUsd(data.totalUsd)}</td>
          </tr>
        </tbody>
      </table>
      <!-- Total -->
      <table role="presentation" width="100%" style="margin-top:0;border-collapse:collapse">
        <tr style="background:${NAVY}">
          <td style="padding:14px 12px;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600">TOTAAL</td>
          <td style="padding:14px 12px;text-align:right;color:#ffffff;font-size:20px;font-weight:800;font-family:${FONT_MONO}">${fmtUsd(data.totalUsd)}</td>
        </tr>
      </table>
      <!-- Payment info -->
      <div style="margin-top:24px;background:${CARD};border-radius:6px;padding:16px 20px">
        ${eyebrow('Betaalinformatie', MUTED)}
        <p style="margin:0;font-size:13px;color:${MUTED};line-height:1.6">Neem contact op met ons via <a href="mailto:info@suritargets.com" style="color:${PRIMARY}">info@suritargets.com</a> voor betalingsinstructies. Wij bevestigen uw inschrijving zodra de betaling is ontvangen.</p>
      </div>
      ${data.opmerkingen ? `<div style="margin-top:16px;font-size:13px;color:${MUTED}"><strong>Uw opmerkingen:</strong> ${escapeHtml(data.opmerkingen)}</div>` : ''}
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: `Uw factuur ${escapeHtml(invNr)} — ${escapeHtml(data.courseName)} | Suritargets`,
    html: emailWrapper(content),
  })
}

// Keep for backwards compat — now delegates to invoice
export async function sendEnrollmentConfirmation(data: EnrollmentFormData, id: number): Promise<void> {
  return sendEnrollmentInvoice(data, id)
}

// ─── Webinar registration ────────────────────────────────────────────────────

export async function sendWebinarRegistrationConfirmation(data: WebinarRegistrationFormData): Promise<void> {
  const transporter = getTransporter()
  const content = `
    <div style="padding:32px">
      <p style="margin:0 0 16px;font-size:16px;color:${FOREGROUND}">Beste ${escapeHtml(data.naam)},</p>
      <p style="margin:0 0 16px;color:#374151;line-height:1.6">Bedankt voor uw aanmelding voor de gratis <strong>AI Demo webinar</strong>. Wij sturen de datum en het toegangslink zo snel mogelijk toe.</p>
      <div style="margin:24px 0;background:${NAVY};border-radius:8px;padding:22px 24px;text-align:center">
        <p style="margin:0 0 8px;font-family:${FONT_MONO};color:rgba(255,255,255,0.6);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em">Uw exclusieve kortingscode</p>
        <p style="margin:0;color:#ffffff;font-size:26px;font-weight:800;font-family:${FONT_MONO};letter-spacing:0.12em">${escapeHtml(WEBINAR_COUPON_CODE)}</p>
        <p style="margin:10px 0 0;color:rgba(255,255,255,0.6);font-size:13px">Goed voor $${WEBINAR_COUPON_DISCOUNT_USD} korting op de AI Hands-On Deck training</p>
      </div>
      <p style="margin:0 0 24px;text-align:center">
        ${button(`${SITE_URL}/nl/education/ai-hands-on-deck`, 'Bekijk AI Hands-On Deck training')}
      </p>
      <hr style="border:none;border-top:1px solid ${BORDER};margin:24px 0"/>
      <p style="margin:0;color:${MUTED};font-size:13px">Heeft u vragen? Stuur een e-mail naar <a href="mailto:info@suritargets.com" style="color:${PRIMARY}">info@suritargets.com</a></p>
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: 'Uw aanmelding voor de Free AI Demo — Suritargets',
    html: emailWrapper(content),
  })
}

export async function sendWebinarRegistrationNotification(data: WebinarRegistrationFormData, id: number): Promise<void> {
  const transporter = getTransporter()

  const content = `
    ${sectionHeader('Nieuwe aanmelding', 'Free AI Demo webinar', `#${id}`)}
    <div style="padding:24px 32px">
      ${dataTable([
        dataRow('Naam', escapeHtml(data.naam)),
        dataRow('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:${PRIMARY}">${escapeHtml(data.email)}</a>`),
        data.telefoon ? dataRow('Telefoon', escapeHtml(data.telefoon)) : '',
        dataRow('Bron', escapeHtml(data.referralSource || '—')),
      ].join(''))}
      <p style="margin-top:24px">
        ${button(`mailto:${escapeHtml(data.email)}`, 'Beantwoorden')}
      </p>
    </div>`
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    replyTo: data.email,
    subject: `Nieuwe webinar-aanmelding: ${escapeHtml(data.naam)}`,
    html: emailWrapper(content),
  })
}
