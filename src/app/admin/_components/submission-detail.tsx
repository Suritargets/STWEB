'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import type { Submission } from '@/lib/db'

const SERVICE_OPTIONS = [
  { slug: 'dashboarding',    label: 'Dashboarding' },
  { slug: 'web-applicaties', label: 'Web & Apps' },
  { slug: 'marketing-ai',    label: 'Marketing AI' },
  { slug: 'forensics',       label: 'Forensics' },
  { slug: 'education',       label: 'Education' },
  { slug: 'anders',          label: 'Anders' },
]

const BUDGET_OPTIONS = [
  { slug: 'onder-5k',  label: '< $5k' },
  { slug: '5k-15k',    label: '$5k – $15k' },
  { slug: 'boven-50k', label: '> $50k' },
  { slug: 'onbekend',  label: 'Nog niet bekend' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('nl-NL', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function SubmissionDetail({ submission }: { submission: Submission }) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Editable fields
  const [naam, setNaam] = useState(submission.naam)
  const [bedrijfsnaam, setBedrijfsnaam] = useState(submission.bedrijfsnaam)
  const [email, setEmail] = useState(submission.email)
  const [telefoon, setTelefoon] = useState(submission.telefoon ?? '')
  const [services, setServices] = useState<string[]>(submission.services ?? [])
  const [budget, setBudget] = useState(submission.budget ?? '')
  const [bericht, setBericht] = useState(submission.bericht ?? '')
  const [andersText, setAndersText] = useState(submission.anders_text ?? '')

  function toggleService(slug: string) {
    setServices(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug])
  }

  async function handleSave() {
    setSaving(true)
    const res = await fetch(`/api/admin/submissions/${submission.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        naam, bedrijfsnaam, email,
        telefoon: telefoon || null,
        services,
        budget: budget || null,
        bericht,
        anders_text: andersText || null,
      }),
    })
    setSaving(false)
    if (res.ok) {
      setEditing(false)
      router.refresh()
    }
  }

  async function handleDelete() {
    setDeleting(true)
    const res = await fetch(`/api/admin/submissions/${submission.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/dashboard/requests')
    }
    setDeleting(false)
  }

  const fieldClass = (editable: boolean) =>
    editable
      ? 'border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3494]/20 focus:border-[#2B3494] transition-all bg-white'
      : 'text-sm text-zinc-900'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard/requests"
            className="w-8 h-8 flex items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-zinc-600" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              {submission.naam}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Aanvraag #{submission.id} · {formatDate(submission.created_at)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50"
              >
                Annuleren
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#2B3494] text-white rounded-md hover:bg-[#232b7a] disabled:opacity-50"
              >
                <Save size={12} />
                {saving ? 'Opslaan…' : 'Opslaan'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 text-xs bg-[#2B3494] text-white rounded-md hover:bg-[#232b7a]"
              >
                Bewerken
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                title="Verwijderen"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
          <p className="text-sm text-red-700">Weet je zeker dat je deze aanvraag wilt verwijderen?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 text-xs border border-zinc-200 rounded-md text-zinc-600 hover:bg-zinc-50"
            >
              Annuleren
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? 'Verwijderen…' : 'Ja, verwijder'}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-900 mb-4">Contactgegevens</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Naam</label>
                {editing ? (
                  <input value={naam} onChange={e => setNaam(e.target.value)} className={fieldClass(true)} />
                ) : (
                  <p className={fieldClass(false)}>{naam}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Bedrijfsnaam</label>
                {editing ? (
                  <input value={bedrijfsnaam} onChange={e => setBedrijfsnaam(e.target.value)} className={fieldClass(true)} />
                ) : (
                  <p className={fieldClass(false)}>{bedrijfsnaam}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Email</label>
                {editing ? (
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={fieldClass(true)} />
                ) : (
                  <a href={`mailto:${email}`} className="text-sm text-[#2B3494] hover:underline">{email}</a>
                )}
              </div>
              <div>
                <label className="text-xs text-zinc-500 mb-1 block">Telefoon</label>
                {editing ? (
                  <input value={telefoon} onChange={e => setTelefoon(e.target.value)} className={fieldClass(true)} />
                ) : (
                  <p className={fieldClass(false)}>{telefoon || '—'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bericht card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-900 mb-4">Bericht</h2>
            {editing ? (
              <textarea
                value={bericht}
                onChange={e => setBericht(e.target.value)}
                rows={5}
                className={`${fieldClass(true)} w-full resize-y`}
              />
            ) : (
              <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">{bericht || '—'}</p>
            )}

            {(andersText || editing) && (
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <label className="text-xs text-zinc-500 mb-1 block">Anders / toelichting</label>
                {editing ? (
                  <input value={andersText} onChange={e => setAndersText(e.target.value)} className={`${fieldClass(true)} w-full`} />
                ) : (
                  <p className="text-sm text-zinc-600 italic">{andersText}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          {/* Services card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-900 mb-4">Diensten</h2>
            {editing ? (
              <div className="flex flex-col gap-2">
                {SERVICE_OPTIONS.map(opt => (
                  <label key={opt.slug} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={services.includes(opt.slug)}
                      onChange={() => toggleService(opt.slug)}
                      className="rounded border-zinc-300 accent-[#2B3494]"
                    />
                    <span className="text-sm text-zinc-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {(services ?? []).length > 0 ? services.map(slug => {
                  const opt = SERVICE_OPTIONS.find(o => o.slug === slug)
                  return (
                    <span key={slug} className="bg-[#2B3494]/8 text-[#2B3494] text-xs font-medium px-2 py-1 rounded">
                      {opt?.label ?? slug}
                    </span>
                  )
                }) : <p className="text-sm text-zinc-400">—</p>}
              </div>
            )}
          </div>

          {/* Budget card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-900 mb-4">Budget</h2>
            {editing ? (
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="border border-zinc-300 rounded-md px-3 py-2 text-sm bg-white w-full"
              >
                <option value="">Niet gespecificeerd</option>
                {BUDGET_OPTIONS.map(opt => (
                  <option key={opt.slug} value={opt.slug}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-zinc-900">
                {budget ? BUDGET_OPTIONS.find(o => o.slug === budget)?.label ?? budget : '—'}
              </p>
            )}
          </div>

          {/* Meta card */}
          <div className="bg-white border border-zinc-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-zinc-900 mb-4">Meta</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs text-zinc-500">Aanvraag ID</dt>
                <dd className="text-zinc-900 font-mono text-xs">#{submission.id}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Ontvangen op</dt>
                <dd className="text-zinc-900">{formatDate(submission.created_at)}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-500">Status</dt>
                <dd>
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-amber-700">Nieuw</span>
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
