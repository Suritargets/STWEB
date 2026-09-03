import { getEnrollments } from '@/lib/enrollments'
import { getWebinarRegistrations } from '@/lib/webinar-registrations'
import OrdersTable, { type OrderRow } from './_components/orders-table'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const [enrollments, webinarRegistrations] = await Promise.all([
    getEnrollments().catch(() => []),
    getWebinarRegistrations().catch(() => []),
  ])

  const rows: OrderRow[] = [
    ...enrollments.map((e): OrderRow => ({
      key:             `enrollment-${e.id}`,
      kind:            'enrollment',
      enrollmentId:    e.id,
      created_at:      e.created_at,
      course_slug:     e.course_slug,
      course_name:     e.course_name,
      enrollment_type: e.enrollment_type,
      naam:            e.naam,
      bedrijfsnaam:    e.bedrijfsnaam,
      email:           e.email,
      deelnemers:      e.deelnemers,
      uren:            e.uren,
      total_usd:       e.total_usd,
      status:          e.status,
    })),
    ...webinarRegistrations.map((w): OrderRow => ({
      key:             `webinar-${w.id}`,
      kind:            'webinar',
      enrollmentId:    null,
      created_at:      w.created_at,
      course_slug:     'free-ai-demo',
      course_name:     'Free AI Demo',
      enrollment_type: null,
      naam:            w.naam,
      bedrijfsnaam:    null,
      email:           w.email,
      deelnemers:      1,
      uren:            null,
      total_usd:       0,
      status:          'aangemeld',
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500 mt-0.5">{rows.length} inschrijvingen</p>
      </div>
      <OrdersTable rows={rows} />
    </div>
  )
}
