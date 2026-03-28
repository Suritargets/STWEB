import { Resend } from 'resend'
import type { ContactFormData } from './validations'

// Lazy singleton — safe during next build static analysis
let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function sendContactConfirmation(data: ContactFormData): Promise<void> {
  await getResend().emails.send({
    from: process.env.RESEND_FROM!,
    to: data.email,
    subject: 'Bedankt voor uw bericht — Suritargets',
    html: `
      <p>Beste ${escapeHtml(data.naam)},</p>
      <p>Wij hebben uw bericht ontvangen en nemen binnen 1–2 werkdagen contact met u op.</p>
      <p>Met vriendelijke groet,<br/>Suritargets Team</p>
    `,
  })
}

export async function sendContactNotification(data: ContactFormData): Promise<void> {
  await getResend().emails.send({
    from: process.env.RESEND_FROM!,
    to: process.env.RESEND_TO!,
    subject: `Nieuw contactverzoek: ${escapeHtml(data.naam)} — ${escapeHtml(data.bedrijfsnaam)}`,
    html: `
      <h2>Nieuw contactverzoek</h2>
      <p><strong>Naam:</strong> ${escapeHtml(data.naam)}</p>
      <p><strong>Bedrijf:</strong> ${escapeHtml(data.bedrijfsnaam)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefoon:</strong> ${data.telefoon ? escapeHtml(data.telefoon) : '—'}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      <hr/>
      <pre style="white-space:pre-wrap">${escapeHtml(data.bericht)}</pre>
    `,
  })
}
