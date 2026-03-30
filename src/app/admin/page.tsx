import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/lib/auth'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  redirect(isAuthenticated(session) ? '/admin/dashboard' : '/admin/login')
}
