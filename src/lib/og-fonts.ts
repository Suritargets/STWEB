import { readFileSync } from 'fs'
import { join } from 'path'

// Reads font from public/fonts/ at runtime — works reliably in Node.js runtime.
// OG image routes must use runtime = 'nodejs' (not 'edge') to use this.
export function loadOgFonts() {
  const bold = readFileSync(join(process.cwd(), 'public/fonts/GeistSans-Bold.ttf'))
  return [
    { name: 'Geist', data: bold, weight: 800 as const, style: 'normal' as const },
  ]
}
