import type { Submission } from '@/lib/db'

const SERVICE_LABELS: Record<string, string> = {
  'dashboarding': 'Dashboarding', 'web-applicaties': 'Web & Apps',
  'marketing-ai': 'Marketing AI', 'forensics': 'Forensics',
  'education': 'Education', 'anders': 'Anders',
}
const BUDGET_LABELS: Record<string, string> = {
  'onder-5k': '< $5k', '5k-15k': '$5k–15k', 'boven-50k': '> $50k', 'onbekend': 'Onbekend',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
  if (submissions.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-zinc-400">Nog geen aanvragen ontvangen</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/70">
            {['#', 'Datum', 'Naam', 'Bedrijf', 'Email', 'Telefoon', 'Diensten', 'Budget', 'Bericht'].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((s, i) => (
            <tr key={s.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors align-top">
              <td className="px-4 py-3 text-zinc-400 font-mono text-xs tabular-nums">{submissions.length - i}</td>
              <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{formatDate(s.created_at)}</td>
              <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{s.naam}</td>
              <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">{s.bedrijfsnaam}</td>
              <td className="px-4 py-3">
                <a href={`mailto:${s.email}`} className="text-[#2B3494] hover:underline whitespace-nowrap text-xs">{s.email}</a>
              </td>
              <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{s.telefoon ?? '—'}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1 min-w-[120px]">
                  {(s.services ?? []).map(slug => (
                    <span key={slug} className="bg-[#2B3494]/8 text-[#2B3494] text-[10px] font-medium px-1.5 py-0.5 rounded-md whitespace-nowrap">
                      {SERVICE_LABELS[slug] ?? slug}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{s.budget ? (BUDGET_LABELS[s.budget] ?? s.budget) : '—'}</td>
              <td className="px-4 py-3 text-zinc-600 max-w-[240px]">
                <p className="line-clamp-2 text-xs leading-relaxed">{s.bericht}</p>
                {s.anders_text && <p className="text-[10px] text-zinc-400 italic mt-0.5">{s.anders_text}</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
