import Link from 'next/link'
import { getWebinarRegistrationById } from '@/lib/webinar-registrations'
import { webinarVoucherValue, findAffiliateCode } from '@/lib/coupon'
import { notFound } from 'next/navigation'
import PrintButton from './_components/print-button'

function fmtUsd(n: number) {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function invoiceNumber(id: number) {
  return `WEB-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function WebinarInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const registration = await getWebinarRegistrationById(Number(id))
  if (!registration) notFound()

  const invNr = invoiceNumber(registration.id)
  const affiliate = findAffiliateCode(registration.referral_source)
  const voucherValue = webinarVoucherValue(registration.referral_source)

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Controls */}
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <Link href="/admin/dashboard/orders" className="text-sm text-zinc-500 hover:text-zinc-900">← Terug</Link>
          <PrintButton />
        </div>

        {/* Invoice card */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="bg-[#0B1628] px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-white.svg" alt="Suritargets" className="h-8 w-auto" />
              </div>
              <div className="text-right">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Factuur</p>
                <p className="text-white font-mono font-bold text-lg">{invNr}</p>
                <p className="text-white/50 text-xs mt-1">{fmtDate(registration.created_at)}</p>
              </div>
            </div>
          </div>

          {/* From / To */}
          <div className="px-8 py-6 grid grid-cols-2 gap-8 border-b border-zinc-100">
            <div>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">Van</p>
              <p className="font-bold text-zinc-900">Suritargets</p>
              <p className="text-zinc-500 text-sm mt-0.5">Paramaribo, Suriname</p>
              <p className="text-zinc-500 text-sm">info@suritargets.com</p>
              <p className="text-zinc-500 text-sm">suritargets.com</p>
            </div>
            <div>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mb-3">Aan</p>
              <p className="font-bold text-zinc-900">{registration.naam}</p>
              <p className="text-zinc-500 text-sm">{registration.email}</p>
              {registration.telefoon && <p className="text-zinc-500 text-sm">{registration.telefoon}</p>}
            </div>
          </div>

          {/* Status badge */}
          <div className="px-8 py-3 border-b border-zinc-100 flex items-center gap-2 print:hidden">
            <span className="text-xs text-zinc-400">Status:</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">Aangemeld</span>
            {registration.referral_source && (
              <>
                <span className="text-xs text-zinc-300">·</span>
                <span className="text-xs text-zinc-400">Bron: {registration.referral_source}</span>
              </>
            )}
          </div>

          {/* Line items */}
          <table className="w-full">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-8 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-widest">Omschrijving</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest">Aantal</th>
                <th className="px-8 py-3 text-right text-xs font-semibold text-zinc-400 uppercase tracking-widest">Bedrag</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-100">
                <td className="px-8 py-5">
                  <p className="font-semibold text-zinc-900">Free AI Demo — webinar</p>
                  <p className="text-zinc-400 text-sm mt-0.5">Gratis deelname</p>
                </td>
                <td className="px-4 py-5 text-center text-zinc-700">1</td>
                <td className="px-8 py-5 text-right font-semibold text-zinc-900">{fmtUsd(0)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="bg-[#0B1628] px-8 py-4 flex justify-between items-center">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">Totaal</span>
            <span className="text-white font-mono font-black text-2xl">{fmtUsd(0)}</span>
          </div>

          {/* Voucher value + payment info */}
          <div className="px-8 py-6 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">Kortingswaarde (informatief)</p>
              <p className="text-2xl font-black text-amber-900 mb-1">{fmtUsd(voucherValue)}</p>
              <p className="text-sm text-amber-700 leading-relaxed">
                Standaard $70 korting op de AI Hands-On Deck training
                {affiliate
                  ? ` + $30 affiliate-bonus (code ${affiliate.code}, ${affiliate.owner}) = $100 totaal.`
                  : '. Geen affiliate-code gebruikt.'}
                {' '}Dit bedrag staat los van het echte kortingsbedrag dat op de inschrijfpagina wordt toegepast.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 flex items-center gap-3">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm font-medium text-emerald-700">Gratis deelname — geen betaling vereist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
