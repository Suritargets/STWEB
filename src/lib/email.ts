import nodemailer from 'nodemailer'
import type { ContactFormData, EnrollmentFormData } from './validations'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://suritargets.com'

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

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:32px 16px">
    <table role="presentation" width="100%" style="max-width:580px">
      <!-- Logo header -->
      <tr><td style="background:#0B1628;padding:24px 32px;border-radius:8px 8px 0 0">
        <table role="presentation" width="100%">
          <tr>
            <td><img src="${SITE_URL}/logo-white.svg" alt="Suritargets" height="28" style="height:28px;width:auto;display:block" /></td>
            <td align="right" style="color:rgba(255,255,255,0.5);font-size:11px;font-family:monospace;letter-spacing:0.1em">SURITARGETS.COM</td>
          </tr>
        </table>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:#ffffff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        ${content}
      </td></tr>
      <!-- Footer -->
      <tr><td style="padding:20px 0;text-align:center;color:#9ca3af;font-size:12px">
        Suritargets · Paramaribo, Suriname · <a href="${SITE_URL}" style="color:#9ca3af">suritargets.com</a>
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
      <p style="margin:0 0 16px;font-size:16px;color:#111827">Beste ${escapeHtml(data.naam)},</p>
      <p style="margin:0 0 16px;color:#374151;line-height:1.6">Bedankt voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen binnen <strong>1–2 werkdagen</strong> contact met u op.</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
      <p style="margin:0;color:#9ca3af;font-size:13px">Heeft u vragen? Stuur een e-mail naar <a href="mailto:info@suritargets.com" style="color:#2B3494">info@suritargets.com</a></p>
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
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;width:120px;vertical-align:top">${label}</td><td style="padding:8px 12px;font-size:14px;color:#111827;font-weight:500">${value}</td></tr>`

  const content = `
    <div style="background:#2B3494;padding:16px 32px">
      <p style="margin:0;color:white;font-weight:700;font-size:17px">Nieuw contactverzoek</p>
    </div>
    <div style="padding:24px 32px">
      <table role="presentation" width="100%" style="border-collapse:collapse;background:#f9fafb;border-radius:6px;overflow:hidden">
        ${row('Type', data.clientType === 'zakelijk' ? 'Zakelijk' : 'Particulier')}
        ${row('Naam', escapeHtml(data.naam))}
        ${data.bedrijfsnaam ? row('Bedrijf', escapeHtml(data.bedrijfsnaam)) : ''}
        ${row('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:#2B3494">${escapeHtml(data.email)}</a>`)}
        ${data.telefoon ? row('Telefoon', escapeHtml(data.telefoon)) : ''}
        ${row('Diensten', escapeHtml(services))}
        ${data.budget ? row('Budget', escapeHtml(data.budget)) : ''}
      </table>
      <div style="margin-top:20px">
        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Bericht</p>
        <div style="background:#f9fafb;border-left:3px solid #2B3494;padding:14px 16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.bericht)}</div>
      </div>
      <p style="margin-top:24px">
        <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:#2B3494;color:white;padding:10px 24px;text-decoration:none;font-size:13px;font-weight:600;border-radius:4px">Beantwoorden</a>
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
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#6b7280;font-size:13px;width:130px;vertical-align:top">${label}</td><td style="padding:8px 12px;font-size:14px;color:#111827">${value}</td></tr>`

  const content = `
    <div style="background:#2B3494;padding:16px 32px;display:flex;justify-content:space-between;align-items:center">
      <p style="margin:0;color:white;font-weight:700;font-size:17px">Nieuwe inschrijving</p>
      <span style="color:rgba(255,255,255,0.6);font-size:12px;font-family:monospace">${escapeHtml(invNr)}</span>
    </div>
    <div style="padding:24px 32px">
      <table role="presentation" width="100%" style="border-collapse:collapse;background:#f9fafb;border-radius:6px;overflow:hidden">
        ${row('Course', `<strong>${escapeHtml(data.courseName)}</strong>`)}
        ${row('Type', typeLabel)}
        ${row('Naam', `<strong>${escapeHtml(data.naam)}</strong>`)}
        ${data.bedrijfsnaam ? row('Bedrijf', escapeHtml(data.bedrijfsnaam)) : ''}
        ${row('E-mail', `<a href="mailto:${escapeHtml(data.email)}" style="color:#2B3494">${escapeHtml(data.email)}</a>`)}
        ${data.telefoon ? row('Telefoon', escapeHtml(data.telefoon)) : ''}
        ${row('Deelnemers', String(data.deelnemers))}
        ${data.uren ? row('Uren', `${data.uren}u`) : ''}
      </table>
      <!-- Total box -->
      <div style="margin-top:16px;background:#0B1628;border-radius:6px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:rgba(255,255,255,0.7);font-size:13px">Totaal</span>
        <span style="color:#C9A84C;font-size:22px;font-weight:800;font-family:monospace">${fmtUsd(data.totalUsd)}</span>
      </div>
      ${data.opmerkingen ? `<div style="margin-top:20px"><p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Opmerkingen</p><div style="background:#f9fafb;border-left:3px solid #C9A84C;padding:14px 16px;font-size:14px;color:#374151;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.opmerkingen)}</div></div>` : ''}
      <p style="margin-top:24px">
        <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:#2B3494;color:white;padding:10px 24px;text-decoration:none;font-size:13px;font-weight:600;border-radius:4px">Beantwoorden</a>
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
    <div style="background:#0B1628;padding:20px 32px">
      <table role="presentation" width="100%">
        <tr>
          <td style="color:rgba(255,255,255,0.5);font-size:22px;font-weight:800;letter-spacing:0.05em">FACTUUR</td>
          <td align="right">
            <p style="margin:0;color:#C9A84C;font-size:13px;font-family:monospace">${escapeHtml(invNr)}</p>
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
            <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Van</p>
            <p style="margin:0;font-weight:700;color:#111827;font-size:14px">Suritargets</p>
            <p style="margin:2px 0 0;color:#6b7280;font-size:13px">Paramaribo, Suriname</p>
            <p style="margin:2px 0 0;color:#6b7280;font-size:13px">info@suritargets.com</p>
            <p style="margin:2px 0 0;color:#6b7280;font-size:13px">suritargets.com</p>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:24px">
            <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">Aan</p>
            <p style="margin:0;font-weight:700;color:#111827;font-size:14px">${escapeHtml(data.naam)}</p>
            ${data.bedrijfsnaam ? `<p style="margin:2px 0 0;color:#6b7280;font-size:13px">${escapeHtml(data.bedrijfsnaam)}</p>` : ''}
            <p style="margin:2px 0 0;color:#6b7280;font-size:13px">${escapeHtml(data.email)}</p>
            ${data.telefoon ? `<p style="margin:2px 0 0;color:#6b7280;font-size:13px">${escapeHtml(data.telefoon)}</p>` : ''}
          </td>
        </tr>
      </table>
      <!-- Line items -->
      <table role="presentation" width="100%" style="border-collapse:collapse">
        <thead>
          <tr style="background:#f9fafb;border-bottom:2px solid #e5e7eb">
            <th style="padding:10px 12px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Omschrijving</th>
            <th style="padding:10px 12px;text-align:center;font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Aantal</th>
            <th style="padding:10px 12px;text-align:right;font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Bedrag</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid #e5e7eb">
            <td style="padding:14px 12px;font-size:14px;color:#111827">
              <strong>${escapeHtml(data.courseName)}</strong>
              <br/><span style="color:#6b7280;font-size:12px">${typeLabel}${data.uren ? ` · ${data.uren} uur` : ''}</span>
            </td>
            <td style="padding:14px 12px;text-align:center;font-size:14px;color:#374151">${data.deelnemers}</td>
            <td style="padding:14px 12px;text-align:right;font-size:14px;color:#111827;font-weight:600">${fmtUsd(data.totalUsd)}</td>
          </tr>
        </tbody>
      </table>
      <!-- Total -->
      <table role="presentation" width="100%" style="margin-top:0;border-collapse:collapse">
        <tr style="background:#0B1628">
          <td style="padding:14px 12px;color:rgba(255,255,255,0.7);font-size:13px;font-weight:600">TOTAAL</td>
          <td style="padding:14px 12px;text-align:right;color:#C9A84C;font-size:20px;font-weight:800;font-family:monospace">${fmtUsd(data.totalUsd)}</td>
        </tr>
      </table>
      <!-- Payment info -->
      <div style="margin-top:24px;background:#f9fafb;border-radius:6px;padding:16px 20px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.05em">Betaalinformatie</p>
        <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6">Neem contact op met ons via <a href="mailto:info@suritargets.com" style="color:#2B3494">info@suritargets.com</a> voor betalingsinstructies. Wij bevestigen uw inschrijving zodra de betaling is ontvangen.</p>
      </div>
      ${data.opmerkingen ? `<div style="margin-top:16px;font-size:13px;color:#6b7280"><strong>Uw opmerkingen:</strong> ${escapeHtml(data.opmerkingen)}</div>` : ''}
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
