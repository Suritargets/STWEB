import { services } from '@/lib/services-data'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export function GET() {
  const base = siteConfig.url
  const serviceLines = [
    ...services.map((s) => `- [${s.nameEn}](${base}/en/services/${s.slug}): ${s.shortDescriptionEn}`),
    `- [Technical Design & Project Support](${base}/en/services/technical-design): 2D CAD support, 3D visualization, technical documentation, material take-offs / BOM and budget estimates. Projects from US$500.`,
    `- [Social Media Design Package](${base}/en/services/digital-visual-designs): Monthly social media visuals, from US$15/month.`,
  ]

  const body = `# ${siteConfig.name}

> Business technology and innovation company in Paramaribo, Suriname. We build custom dashboards, web applications, AI and automation solutions, technical design support and training for businesses in Suriname and the wider Caribbean.

The site is available in Dutch (nl), English (en), Spanish (es), French (fr) and Brazilian Portuguese (pt-BR). Replace "en" in any URL below with another language code.

## Services

${serviceLines.join('\n')}

## Company

- [About](${base}/en/about): Who we are and what drives us
- [Pricing](${base}/en/pricing): Indicative pricing
- [Education](${base}/en/education): Training, workshops and courses
- [Case studies](${base}/en/case-studies): Results for clients
- [Insights](${base}/en/insights): Articles on business technology and AI
- [Contact](${base}/en/contact): Email ${siteConfig.email}

## Contact

- Address: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}
- Email: ${siteConfig.email}
- Sitemap: ${base}/sitemap.xml
`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
