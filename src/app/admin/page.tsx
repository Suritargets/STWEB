import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getSessionUser } from '@/lib/auth'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const user = await getSessionUser(session)
  redirect(user ? '/admin/dashboard' : '/admin/login')
}
