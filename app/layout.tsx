import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { ANALYTICS } from '@/lib/analytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.carc.com'),
  title: {
    default: 'CARC.com — The AI That Finds Your Best Car Deal',
    template: '%s | CARC.com',
  },
  description:
    'Find the best deal on any car in seconds. AI-powered search, deal scoring, and negotiation prep across every listing online.',
  keywords: ['car deals', 'AI car search', 'best car deals', 'car buying', 'used cars'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://carc.com',
    siteName: 'CARC.com',
    title: 'CARC.com — The AI That Finds Your Best Car Deal',
    description:
      'Find the best deal on any car in seconds. Natural language search → AI deal score → ranked results.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CARC.com — The AI That Finds Your Best Car Deal',
    description: 'Find the best deal on any car in seconds.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const gaId = ANALYTICS.GA4_MEASUREMENT_ID
  return (
    <html lang="en">
      <head>
        {ANALYTICS.GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={ANALYTICS.GOOGLE_SITE_VERIFICATION}
          />
        )}
        {ANALYTICS.BING_SITE_VERIFICATION && (
          <meta
            name="msvalidate.01"
            content={ANALYTICS.BING_SITE_VERIFICATION}
          />
        )}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body className="bg-brand-black text-brand-light font-body antialiased">
        {children}
      </body>
    </html>
  )
}
