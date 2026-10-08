import { neon } from '@neondatabase/serverless'
import type { DailyCount } from './db'

function sql() {
  return neon(process.env.DATABASE_URL!)
}

export type RevenueOverview = {
  totalRevenue: number
  thisMonthRevenue: number
  totalOrders: number
  avgOrderValue: number
}

export async function getRevenueOverview(): Promise<RevenueOverview> {
  const db = sql()
  try {
    const [totals] = await db`
      SELECT
        COALESCE(SUM(total_usd), 0)::float AS total_revenue,
        COUNT(*)::int AS total_orders
      FROM enrollments
    `
    const [month] = await db`
      SELECT COALESCE(SUM(total_usd), 0)::float AS month_revenue
      FROM enrollments WHERE created_at >= date_trunc('month', NOW())
    `
    const totalRevenue = (totals as { total_revenue: number }).total_revenue
    const totalOrders = (totals as { total_orders: number }).total_orders
    return {
      totalRevenue,
      thisMonthRevenue: (month as { month_revenue: number }).month_revenue,
      totalOrders,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
    }
  } catch {
    return { totalRevenue: 0, thisMonthRevenue: 0, totalOrders: 0, avgOrderValue: 0 }
  }
}

export async function getRevenueDailyCounts(days = 14): Promise<DailyCount[]> {
  const db = sql()
  const start = new Date()
  start.setDate(start.getDate() - days + 1)
  start.setHours(0, 0, 0, 0)
  try {
    const rows = await db`
      SELECT DATE(created_at)::text as date, COALESCE(SUM(total_usd), 0)::int as count
      FROM enrollments WHERE created_at >= ${start.toISOString()}
      GROUP BY DATE(created_at) ORDER BY DATE(created_at)
    `
    return fillDailyCounts(rows as { date: string; count: number }[], start, days)
  } catch {
    return []
  }
}

export async function getWebinarDailyCounts(days = 14): Promise<DailyCount[]> {
  const db = sql()
  const start = new Date()
  start.setDate(start.getDate() - days + 1)
  start.setHours(0, 0, 0, 0)
  try {
    const rows = await db`
      SELECT DATE(created_at)::text as date, COUNT(*)::int as count
      FROM webinar_registrations WHERE created_at >= ${start.toISOString()}
      GROUP BY DATE(created_at) ORDER BY DATE(created_at)
    `
    return fillDailyCounts(rows as { date: string; count: number }[], start, days)
  } catch {
    return []
  }
}

function fillDailyCounts(rows: { date: string; count: number }[], start: Date, days: number): DailyCount[] {
  const countMap: Record<string, number> = {}
  for (const r of rows) countMap[r.date] = r.count
  const result: DailyCount[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().split('T')[0]
    const label = d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' })
    result.push({ day: label, count: countMap[key] ?? 0 })
  }
  return result
}

export type TopCourse = { courseName: string; orders: number; revenue: number }

export async function getTopCourses(limit = 5): Promise<TopCourse[]> {
  const db = sql()
  try {
    const rows = await db`
      SELECT course_name, COUNT(*)::int as orders, COALESCE(SUM(total_usd), 0)::float as revenue
      FROM enrollments
      GROUP BY course_name
      ORDER BY revenue DESC
      LIMIT ${limit}
    `
    return (rows as { course_name: string; orders: number; revenue: number }[]).map(r => ({
      courseName: r.course_name,
      orders: r.orders,
      revenue: r.revenue,
    }))
  } catch {
    return []
  }
}

export type TopReferralSource = { source: string; count: number }

export async function getTopReferralSources(limit = 5): Promise<TopReferralSource[]> {
  const db = sql()
  try {
    const rows = await db`
      SELECT referral_source, COUNT(*)::int as count
      FROM webinar_registrations
      WHERE referral_source IS NOT NULL AND referral_source != ''
      GROUP BY referral_source
      ORDER BY count DESC
      LIMIT ${limit}
    `
    return (rows as { referral_source: string; count: number }[]).map(r => ({
      source: r.referral_source,
      count: r.count,
    }))
  } catch {
    return []
  }
}

export type WebinarOverview = { total: number; thisMonth: number }

export async function getWebinarOverview(): Promise<WebinarOverview> {
  const db = sql()
  try {
    const [tot] = await db`SELECT COUNT(*)::int as count FROM webinar_registrations`
    const [mon] = await db`SELECT COUNT(*)::int as count FROM webinar_registrations WHERE created_at >= date_trunc('month', NOW())`
    return {
      total: (tot as { count: number }).count,
      thisMonth: (mon as { count: number }).count,
    }
  } catch {
    return { total: 0, thisMonth: 0 }
  }
}
