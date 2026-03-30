import { ImageResponse } from 'next/og'
import { loadOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'
export const alt = 'Suritargets — Business Intelligence & Digital Solutions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        <div style={{ display: 'flex', position: 'absolute', top: 40, left: 40, width: 40, height: 40, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
        {/* Gold corner accent bottom-right */}
        <div style={{ display: 'flex', position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />

        {/* Logo — SVG inline */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="180"
          height="180"
          style={{ marginBottom: 40 }}
        >
          {/* Blue outer ring */}
          <circle cx="58" cy="50" r="42" fill="#2B3494"/>
          {/* White ring */}
          <circle cx="58" cy="50" r="29" fill="#FFFFFF"/>
          {/* Red center */}
          <circle cx="58" cy="50" r="16" fill="#E8192C"/>
          {/* Arrow 1 (back) */}
          <polygon points="4,10 4,90 36,50" fill="#2B3494"/>
          {/* Arrow 2 (front) */}
          <polygon points="18,22 18,78 44,50" fill="#2B3494"/>
          {/* White separator lines */}
          <line x1="4"  y1="10" x2="18" y2="22" stroke="#FFFFFF" strokeWidth="3"/>
          <line x1="4"  y1="90" x2="18" y2="78" stroke="#FFFFFF" strokeWidth="3"/>
          <line x1="18" y1="22" x2="36" y2="50" stroke="#FFFFFF" strokeWidth="3"/>
          <line x1="18" y1="78" x2="36" y2="50" stroke="#FFFFFF" strokeWidth="3"/>
        </svg>

        {/* Brand name */}
        <div style={{ display: 'flex', color: '#FFFFFF', fontSize: 48, fontFamily: 'Geist', fontWeight: 800, letterSpacing: '0.05em', marginBottom: 12 }}>
          SURITARGETS
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', color: '#C9A84C', fontSize: 20, fontFamily: 'Geist' }}>
          Business Technology &amp; Innovation Solutions
        </div>

        {/* Bottom border line */}
        <div style={{ display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#C9A84C' }} />
      </div>
    ),
    { ...size, fonts }
  )
}
