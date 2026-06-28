import nodemailer from 'nodemailer'
import type { ContactFormData, EnrollmentFormData } from './validations'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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

export async function sendContactConfirmation(data: ContactFormData): Promise<void> {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: data.email,
    subject: 'Bedankt voor uw bericht — Suritargets',
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#2B3494;padding:24px 32px">
          <p style="color:white;font-weight:700;font-size:18px;margin:0">Suritargets</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb">
          <p>Beste ${escapeHtml(data.naam)},</p>
          <p>Bedankt voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen binnen <strong>1–2 werkdagen</strong> contact met u op.</p>
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

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  const transporter = getTransporter()
  const services = data.services.join(', ') || '—'
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_TO,
    replyTo: data.email,
    subject: `Nieuw verzoek: ${escapeHtml(data.naam)}${data.bedrijfsnaam ? ` · ${escapeHtml(data.bedrijfsnaam)}` : ''}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
        <div style="background:#2B3494;padding:24px 32px">
          <p style="color:white;font-weight:700;font-size:18px;margin:0">Nieuw contactverzoek</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#6b7280;width:130px">Type</td><td style="padding:8px 0;font-weight:600">${escapeHtml(data.clientType === 'zakelijk' ? 'Zakelijk' : 'Particulier')}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Naam</td><td style="padding:8px 0;font-weight:600">${escapeHtml(data.naam)}</td></tr>
            ${data.bedrijfsnaam ? `<tr><td style="padding:8px 0;color:#6b7280">Bedrijf</td><td style="padding:8px 0">${escapeHtml(data.bedrijfsnaam)}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6b7280">E-mail</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}" style="color:#2B3494">${escapeHtml(data.email)}</a></td></tr>
            ${data.telefoon ? `<tr><td style="padding:8px 0;color:#6b7280">Telefoon</td><td style="padding:8px 0">${escapeHtml(data.telefoon)}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#6b7280">Budget</td><td style="padding:8px 0">${data.budget ? escapeHtml(data.budget) : '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280">Diensten</td><td style="padding:8px 0">${escapeHtml(services)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0"/>
          <p style="color:#6b7280;font-size:12px;margin-bottom:8px">Bericht:</p>
          <p style="background:#f9fafb;padding:16px;border-left:3px solid #2B3494;white-space:pre-wrap;font-size:14px">${escapeHtml(data.bericht)}</p>
          <p style="margin-top:24px">
            <a href="mailto:${escapeHtml(data.email)}" style="background:#2B3494;color:white;padding:10px 20px;text-decoration:none;font-size:13px;font-weight:600">Beantwoorden</a>
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendEnrollmentNotification(data: EnrollmentFormData): Promise<void> {
  const transporter = getTransporter()
  const typeLabel = data.enrollmentType === 'team' ? 'Team / In-house' : 'Individueel'
  const urenRow = data.uren ? `<tr><td style="padding:8px 0;color:#6b7280;width:130px">Uren</td><td style="padding:8px 0">${data.uren}u</td></tr>` : ''

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
