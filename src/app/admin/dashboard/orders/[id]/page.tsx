import { getEnrollmentById } from '@/lib/enrollments'
import { notFound } from 'next/navigation'

function fmtUsd(n: number | string) {
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function invoiceNumber(id: number) {
  return `INV-${new Date().getFullYear()}-${String(id).padStart(5, '0')}`
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', { day: '2-digit', month: 'long', year: 'numeric' })
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'In behandeling',
  confirmed: 'Bevestigd',
  paid: 'Betaald',
}

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const enrollment = await getEnrollmentById(Number(id))
  if (!enrollment) notFound()

  const invNr = invoiceNumber(enrollment.id)
  const typeLabel = enrollment.enrollment_type === 'team' ? 'Team / In-house' : 'Individueel'

  return (
    <div className="min-h-screen bg-zinc-100 py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Print controls */}
        <div className="flex items-center gap-3 mb-6 print:hidden">
          <a href="/admin/dashboard/orders" className="text-sm text-zinc-500 hover:text-zinc-900">← Terug</a>
          <button
            onClick={() => window.print()}
            className="ml-auto bg-[#2B3494] text-white text-sm px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Afdrukken / PDF
          </button>
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
                <p className="text-white/50 text-xs mt-1">{fmtDate(enrollment.created_at)}</p>
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
              <p className="font-bold text-zinc-900">{enrollment.naam}</p>
              {enrollment.bedrijfsnaam && <p className="text-zinc-500 text-sm mt-0.5">{enrollment.bedrijfsnaam}</p>}
              <p className="text-zinc-500 text-sm">{enrollment.email}</p>
              {enrollment.telefoon && <p className="text-zinc-500 text-sm">{enrollment.telefoon}</p>}
            </div>
          </div>

          {/* Status badge */}
          <div className="px-8 py-3 border-b border-zinc-100 flex items-center gap-2">
            <span className="text-xs text-zinc-400">Status:</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              enrollment.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
              enrollment.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {STATUS_LABELS[enrollment.status] ?? enrollment.status}
            </span>
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
                  <p className="font-semibold text-zinc-900">{enrollment.course_name}</p>
                  <p className="text-zinc-400 text-sm mt-0.5">{typeLabel}{enrollment.uren ? ` · ${enrollment.uren} uur` : ''}</p>
                </td>
                <td className="px-4 py-5 text-center text-zinc-700">{enrollment.deelnemers}</td>
                <td className="px-8 py-5 text-right font-semibold text-zinc-900">{fmtUsd(enrollment.total_usd)}</td>
              </tr>
            </tbody>
          </table>

          {/* Total */}
          <div className="bg-[#0B1628] px-8 py-4 flex justify-between items-center">
            <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">Totaal</span>
            <span className="text-white font-mono font-black text-2xl">{fmtUsd(enrollment.total_usd)}</span>
          </div>

          {/* Payment info + notes */}
          <div className="px-8 py-6 space-y-4">
            <div className="bg-zinc-50 rounded-lg p-4">
              <p className="text-xs font-bold text-zinc-700 uppercase tracking-widest mb-2">Betaalinformatie</p>
              <p className="text-sm text-zinc-500 leading-relaxed">Neem contact op via <a href="mailto:info@suritargets.com" className="text-[#2B3494] hover:underline">info@suritargets.com</a> voor betalingsinstructies.</p>
            </div>
            {enrollment.opmerkingen && (
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Opmerkingen</p>
                <p className="text-sm text-zinc-600 whitespace-pre-wrap">{enrollment.opmerkingen}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
