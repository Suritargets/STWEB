import { getEnrollments } from '@/lib/enrollments'
import OrdersTable from './_components/orders-table'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const enrollments = await getEnrollments().catch(() => [])
  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Orders</h1>
        <p className="text-sm text-zinc-500 mt-0.5">{enrollments.length} inschrijvingen</p>
      </div>
      <OrdersTable enrollments={enrollments} />
    </div>
  )
}
