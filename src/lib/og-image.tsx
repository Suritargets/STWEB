import { readFileSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import { loadOgFonts } from '@/lib/og-fonts'

export const size = { width: 1200, height: 630 }

// Real brand mark (not a hand-drawn approximation) — read as base64 since Satori's
// ImageResponse needs a URL or data URI, not a filesystem path.
function loadLogoMarkDataUri(): string {
  const data = readFileSync(join(process.cwd(), 'public/logo-mark.png'))
  return `data:image/png;base64,${data.toString('base64')}`
}

const LOGO_WIDTH = 120
const LOGO_HEIGHT = 99 // matches Asset 2.png's 431:356 aspect ratio

const LogoMark = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={loadLogoMarkDataUri()}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    style={{ marginBottom: 32 }}
    alt=""
  />
)

export async function makeOgImage(title: string, subtitle?: string): Promise<ImageResponse> {
  const fonts = loadOgFonts()
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#0B1628',
          position: 'relative',
        }}
      >
        {/* Gold corner accent top-left */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 40,
            left: 40,
            width: 40,
            height: 40,
            borderTop: '2px solid #C9A84C',
            borderLeft: '2px solid #C9A84C',
          }}
        />
        {/* Gold corner accent bottom-right */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40,
            right: 40,
            width: 40,
            height: 40,
            borderBottom: '2px solid #C9A84C',
            borderRight: '2px solid #C9A84C',
          }}
        />

        {/* Logo */}
        <LogoMark />

        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            color: '#FFFFFF',
            fontSize: 22,
            fontFamily: 'Geist',
            fontWeight: 800,
            letterSpacing: '0.12em',
            marginBottom: 28,
            opacity: 0.7,
          }}
        >
          SURITARGETS
        </div>

        {/* Page title */}
        <div
          style={{
            display: 'flex',
            color: '#FFFFFF',
            fontSize: 52,
            fontFamily: 'Geist',
            fontWeight: 800,
            letterSpacing: '0.01em',
            textAlign: 'center',
            maxWidth: 960,
            lineHeight: 1.15,
            marginBottom: subtitle ? 20 : 0,
          }}
        >
          {title}
        </div>

        {/* Optional subtitle */}
        {subtitle && (
          <div
            style={{
              display: 'flex',
              color: '#C9A84C',
              fontSize: 22,
              fontFamily: 'Geist',
              textAlign: 'center',
              maxWidth: 860,
              opacity: 0.9,
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Bottom gold border */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: '#C9A84C',
          }}
        />
      </div>
    ),
    { ...size, fonts }
  )
}
