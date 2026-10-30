import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CARC.com — The AI That Finds Your Best Car Deal'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0F12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ color: '#ffffff', fontSize: '32px', fontWeight: 900, letterSpacing: '-1px' }}>
            CARC
          </span>
          <span style={{ color: '#1E6BFF', fontSize: '32px', fontWeight: 900 }}>.COM</span>
        </div>
        <div style={{ color: '#ffffff', fontSize: '56px', fontWeight: 900, lineHeight: 1.1, maxWidth: '900px', marginBottom: '24px' }}>
          The AI That Finds Your Best Car Deal
        </div>
        <div style={{ color: '#6B7280', fontSize: '24px', maxWidth: '700px', lineHeight: 1.5 }}>
          AI-powered search, deal scoring, and negotiation prep across every listing online.
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
          {['AI Search', 'Deal Scoring', 'Negotiation Prep'].map((feature) => (
            <div
              key={feature}
              style={{
                border: '1px solid #2C3140',
                borderRadius: '999px',
                padding: '10px 20px',
                color: '#E8ECF4',
                fontSize: '18px',
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
