import { requireAdminUser } from '@/lib/auth'
import { getAdminUsers } from '@/lib/admin-users'
import UsersTable from './_components/users-table'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const currentUser = await requireAdminUser(['super_admin'])
  const users = await getAdminUsers()

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Gebruikers</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Beheer wie toegang heeft tot het admin panel en welke rol ze hebben</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <UsersTable
          users={users.map(u => ({ id: u.id, email: u.email, role: u.role, created_at: u.created_at }))}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  )
}
