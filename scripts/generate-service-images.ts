import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

process.loadEnvFile(join(fileURLToPath(new URL('.', import.meta.url)), '../.env.local'))

import { generateImage } from '../src/lib/kie-ai'
import { services } from '../src/lib/services-data'

const OUTPUT_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '../public/services/images')
const MODEL = 'gpt-image-2-text-to-image'

const PROMPT_STYLE =
  'Professional editorial photograph, modern and clean, diverse Caribbean professionals, natural lighting, ' +
  'subtle navy blue and gold color accents, no text, no logos, no watermarks, high quality corporate photography style.'

function buildPrompt(nameEn: string, shortDescriptionEn: string): string {
  return `Photograph representing "${nameEn}" for a Caribbean business consultancy in Suriname. ${shortDescriptionEn} ${PROMPT_STYLE}`
}

async function main() {
  const force = process.argv.includes('--force')
  mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const service of services) {
    const outPath = join(OUTPUT_DIR, `${service.slug}.jpg`)
    if (existsSync(outPath) && !force) {
      console.log(`Skip ${service.slug} (already exists, use --force to regenerate)`)
      continue
    }

    const prompt = buildPrompt(service.nameEn, service.shortDescriptionEn)
    console.log(`Generating ${service.slug}...`)
    try {
      const bytes = await generateImage(MODEL, { prompt, aspect_ratio: '4:3', resolution: '2K' })
      writeFileSync(outPath, bytes)
      console.log(`Saved ${outPath}`)
    } catch (err) {
      console.error(`Failed to generate ${service.slug}:`, err instanceof Error ? err.message : err)
    }
  }

  console.log(
    '\nDone. For each generated image, add `heroImage: "/services/images/<slug>.jpg"` to the matching entry in src/lib/services-data.ts.',
  )
}

main().catch(err => {
  console.error('Generation failed:', err)
  process.exit(1)
})
