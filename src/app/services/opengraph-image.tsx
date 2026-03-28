import { ImageResponse } from 'next/og'
import { loadOgFonts } from '@/lib/og-fonts'

export const runtime = 'nodejs'
export const alt = 'Onze Diensten — Vijf kerngebieden | Suritargets'
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
          width: '100%',
          height: '100%',
          backgroundColor: '#0B1628',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Gold corner accent top-left */}
        <div style={{ display: 'flex', position: 'absolute', top: 40, left: 40, width: 40, height: 40, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C' }} />
        {/* Gold corner accent bottom-right */}
        <div style={{ display: 'flex', position: 'absolute', bottom: 40, right: 40, width: 40, height: 40, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C' }} />

        {/* Brand name */}
        <div style={{ display: 'flex', color: '#C9A84C', fontSize: 14, fontFamily: 'Geist', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 'auto' }}>
          SURITARGETS
        </div>

        {/* Main heading */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
          <div style={{ display: 'flex', color: '#E8EDF5', fontSize: 64, fontFamily: 'Geist', fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
            Onze Diensten
          </div>
          <div style={{ display: 'flex', color: '#C9A84C', fontSize: 64, fontFamily: 'Geist', fontWeight: 800, lineHeight: 1.1 }}>
            Vijf kerngebieden
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ display: 'flex', color: '#6B7A99', fontSize: 20, fontFamily: 'Geist' }}>
          Bedrijfsondersteuning · Web Applicaties · Onderzoek · Forensisch · Educatie
        </div>

        {/* Bottom border line */}
        <div style={{ display: 'flex', position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#C9A84C' }} />
      </div>
    ),
    { ...size, fonts }
  )
}
