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

export function getPostBySlug(type: ContentType, slug: string): Post | null {
  const filePath = path.join(contentRoot, type, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title,
    titleEn: data.titleEn,
    date: data.date,
    summary: data.summary,
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    featured: data.featured ?? false,
    client: data.client,
    service: data.service,
    category: data.category,
    content,
  }
}

export function getAllPosts(type: ContentType): PostMeta[] {
  return getAllSlugs(type)
    .map((slug) => getPostBySlug(type, slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
