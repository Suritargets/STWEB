import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

process.loadEnvFile(join(fileURLToPath(new URL('.', import.meta.url)), '../.env.local'))

import { generateImage } from '../src/lib/kie-ai'

const OUTPUT_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '../public/services/technical-design')
const MODEL = 'gpt-image-2-text-to-image'

const STYLE =
  'Professional editorial photograph, natural daylight, tropical Caribbean setting in Suriname, ' +
  'subtle navy blue accents, no text, no logos, no watermarks, high quality documentary photography style.'

const SHOTS = [
  {
    file: 'hero-site-review.jpg',
    prompt: `Architect and contractor in hard hats reviewing building plans together on a residential construction site, concrete frame behind them. ${STYLE}`,
  },
  {
    file: 'drafting-desk.jpg',
    prompt: `Close-up of a technical designer working on 2D CAD floor plans on a large monitor at a tidy desk, printed blueprints and a scale ruler beside the keyboard. ${STYLE}`,
  },
  {
    file: 'building-progress.jpg',
    prompt: `Modern two-storey house under construction with scaffolding and workers, tropical trees around, clear blue sky. ${STYLE}`,
  },
]

async function main() {
  const force = process.argv.includes('--force')
  mkdirSync(OUTPUT_DIR, { recursive: true })

  for (const shot of SHOTS) {
    const outPath = join(OUTPUT_DIR, shot.file)
    if (existsSync(outPath) && !force) {
      console.log(`Skip ${shot.file} (exists, use --force to regenerate)`)
      continue
    }
    console.log(`Generating ${shot.file}...`)
    try {
      const bytes = await generateImage(MODEL, { prompt: shot.prompt, aspect_ratio: '4:3', resolution: '2K' })
      writeFileSync(outPath, bytes)
      console.log(`Saved ${outPath}`)
    } catch (err) {
      console.error(`Failed ${shot.file}:`, err instanceof Error ? err.message : err)
    }
  }
}

main().catch(err => {
  console.error('Generation failed:', err)
  process.exit(1)
})
