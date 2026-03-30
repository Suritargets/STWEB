import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentRoot = path.join(process.cwd(), 'content')

export type ContentType = 'case-studies' | 'insights'

export interface PostMeta {
  slug: string
  title: string
  titleEn?: string
  date: string
  summary: string
  tags: string[]
  readingTime: string
  featured?: boolean
  client?: string
  service?: string
  category?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllSlugs(type: ContentType): string[] {
  const dir = path.join(contentRoot, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

function localized(data: Record<string, unknown>, field: string, locale: string): string | undefined {
  if (locale === 'nl') return data[field] as string | undefined
  if (locale === 'en') return (data[`${field}En`] as string | undefined) ?? (data[field] as string | undefined)
  return (data[`${field}_${locale}`] as string | undefined)
    ?? (data[`${field}En`] as string | undefined)
    ?? (data[field] as string | undefined)
}

export function getPostBySlug(type: ContentType, slug: string, locale = 'nl'): Post | null {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: localized(data, 'title', locale) ?? data.title,
    titleEn: data.titleEn,
    date: data.date,
    summary: localized(data, 'summary', locale) ?? data.summary,
    tags: (data[`tags_${locale}`] as string[] | undefined) ?? (data.tags as string[] | undefined) ?? [],
    readingTime: readingTime(content).text,
    featured: data.featured ?? false,
    client: data.client,
    service: data.service,
    category: localized(data, 'category', locale) ?? data.category,
    content,
  }
}

export function getAllPosts(type: ContentType, locale = 'nl'): PostMeta[] {
  return getAllSlugs(type)
    .map((slug) => getPostBySlug(type, slug, locale))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
