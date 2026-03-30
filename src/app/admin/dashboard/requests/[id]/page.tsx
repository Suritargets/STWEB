import { notFound } from 'next/navigation'
import { getSubmissionById } from '@/lib/db'
import SubmissionDetail from '../../../_components/submission-detail'

export const dynamic = 'force-dynamic'

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const submission = await getSubmissionById(Number(id))

  if (!submission) notFound()

  return (
    <div className="p-8 max-w-[900px]">
      <SubmissionDetail submission={submission} />
    </div>
  )
}
