import { cookies } from 'next/headers'
import { createHash } from 'crypto'
import { getSubmissions, type Submission } from '@/lib/db'
import LoginForm from './_components/login-form'
import LogoutButton from './_components/logout-button'

function makeToken(password: string) {
  return createHash('sha256')
    .update(password + (process.env.ADMIN_PASSWORD ?? ''))
    .digest('hex')
}

function isAuthenticated(session: string | undefined): boolean {
  if (!session || !process.env.ADMIN_PASSWORD) return false
  return session === makeToken(process.env.ADMIN_PASSWORD)
}

const SERVICE_LABELS: Record<string, string> = {
  'dashboarding':    'Dashboarding',
  'web-applicaties': 'Web & Apps',
  'marketing-ai':    'Marketing AI',
  'forensics':       'Forensics',
  'education':       'Education',
  'anders':          'Anders',
}

const BUDGET_LABELS: Record<string, string> = {
  'onder-5k':  '< $5k',
  '5k-15k':    '$5k–$15k',
  'boven-50k': '> $50k',
  'onbekend':  'Onbekend',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session     = cookieStore.get('admin_session')?.value

  if (!isAuthenticated(session)) {
    return <LoginForm />
  }

  let submissions: Submission[] = []
  try {
    submissions = await getSubmissions()
  } catch {
    // Table may not exist yet — first submission will create it
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#2B3494] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-sm" />
          <span className="text-white font-black tracking-tight text-sm">Suritargets Admin</span>
        </div>
        <LogoutButton />
      </header>

      {/* Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Incoming Requests</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {submissions.length === 0
              ? 'Nog geen aanvragen'
              : `${submissions.length} aanvra${submissions.length === 1 ? 'ag' : 'gen'}`}
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-sm p-12 text-center">
            <p className="text-zinc-400 text-sm">Nog geen formulier inzendingen</p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">#</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Datum</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Naam</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Bedrijf</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Telefoon</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Diensten</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600 whitespace-nowrap">Budget</th>
                    <th className="text-left px-4 py-3 font-semibold text-zinc-600">Bericht</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr
                      key={s.id}
                      className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors align-top"
                    >
                      <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{submissions.length - i}</td>
                      <td className="px-4 py-3 text-zinc-500 whitespace-nowrap text-xs">{formatDate(s.created_at)}</td>
                      <td className="px-4 py-3 font-medium text-zinc-900 whitespace-nowrap">{s.naam}</td>
                      <td className="px-4 py-3 text-zinc-700 whitespace-nowrap">{s.bedrijfsnaam}</td>
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${s.email}`}
                          className="text-[#2B3494] hover:underline whitespace-nowrap"
                        >
                          {s.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-zinc-600 whitespace-nowrap">{s.telefoon ?? '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(s.services ?? []).map(slug => (
                            <span
                              key={slug}
                              className="inline-block bg-[#2B3494]/10 text-[#2B3494] text-[10px] font-semibold px-2 py-0.5 rounded-sm whitespace-nowrap"
                            >
                              {SERVICE_LABELS[slug] ?? slug}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-600 whitespace-nowrap text-xs">
                        {s.budget ? (BUDGET_LABELS[s.budget] ?? s.budget) : '—'}
                      </td>
                      <td className="px-4 py-3 text-zinc-600 max-w-xs">
                        <p className="line-clamp-3 text-xs leading-relaxed">{s.bericht}</p>
                        {s.anders_text && (
                          <p className="text-xs text-zinc-400 mt-1 italic">{s.anders_text}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
