const KIE_AI_BASE_URL = 'https://api.kie.ai'

type CreateTaskInput = {
  prompt: string
  aspect_ratio?: string
  resolution?: '1K' | '2K' | '4K'
  background?: 'transparent' | 'opaque' | 'auto'
  input_urls?: string[]
}

type CreateTaskResponse = {
  code: number
  msg: string
  data: { taskId: string }
}

type TaskState = 'waiting' | 'queuing' | 'generating' | 'success' | 'fail'

type RecordInfoResponse = {
  code: number
  msg: string
  data: {
    taskId: string
    state: TaskState
    resultJson: string | null
    failCode: string | null
    failMsg: string | null
  }
}

function getApiKey(): string {
  const key = process.env.KIE_AI_API_KEY
  if (!key) throw new Error('KIE_AI_API_KEY is not set (add it to .env.local)')
  return key
}

async function kieFetch<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${KIE_AI_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Kie.ai request failed (${res.status}): ${body}`)
  }
  return res.json() as Promise<T>
}

export async function createImageTask(model: string, input: CreateTaskInput): Promise<string> {
  const res = await kieFetch<CreateTaskResponse>('/api/v1/jobs/createTask', {
    method: 'POST',
    body: JSON.stringify({ model, input }),
  })
  if (res.code !== 200 || !res.data?.taskId) {
    throw new Error(`Kie.ai createTask error: ${res.msg}`)
  }
  return res.data.taskId
}

async function getTaskInfo(taskId: string): Promise<RecordInfoResponse['data']> {
  const res = await kieFetch<RecordInfoResponse>(`/api/v1/jobs/recordInfo?taskId=${taskId}`, {
    method: 'GET',
  })
  return res.data
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** Polls until the task finishes. Resolves with the (short-lived, ~20 min) result URLs. */
export async function pollTaskResult(
  taskId: string,
  { intervalMs = 4000, timeoutMs = 5 * 60 * 1000 }: { intervalMs?: number; timeoutMs?: number } = {},
): Promise<string[]> {
  const deadline = Date.now() + timeoutMs

  while (Date.now() < deadline) {
    const info = await getTaskInfo(taskId)

    if (info.state === 'success') {
      if (!info.resultJson) throw new Error(`Kie.ai task ${taskId} succeeded but returned no resultJson`)
      const parsed = JSON.parse(info.resultJson) as { resultUrls: string[] }
      return parsed.resultUrls
    }
    if (info.state === 'fail') {
      throw new Error(`Kie.ai task ${taskId} failed: ${info.failCode ?? ''} ${info.failMsg ?? ''}`.trim())
    }

    await sleep(intervalMs)
  }

  throw new Error(`Kie.ai task ${taskId} timed out after ${timeoutMs}ms`)
}

/** Downloads a result URL's bytes immediately — Kie.ai result URLs expire ~20 minutes after success. */
export async function downloadResult(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download Kie.ai result (${res.status}): ${url}`)
  const arrayBuffer = await res.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

/** Creates a task, polls until done, and downloads the first result image's bytes. */
export async function generateImage(model: string, input: CreateTaskInput): Promise<Buffer> {
  const taskId = await createImageTask(model, input)
  const [resultUrl] = await pollTaskResult(taskId)
  if (!resultUrl) throw new Error(`Kie.ai task ${taskId} succeeded but returned no result URLs`)
  return downloadResult(resultUrl)
}
