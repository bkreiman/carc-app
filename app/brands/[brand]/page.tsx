import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import NewsNav from '@/app/components/NewsNav'
import NewsFooter from '@/app/components/NewsFooter'
import { BRANDS, getBrand } from '@/lib/brands'

export function generateStaticParams() {
  return BRANDS.map(b => ({ brand: b.slug }))
}

export function generateMetadata({ params }: { params: { brand: string } }): Metadata {
  const b = getBrand(params.brand)
  if (!b) return {}
  return {
    title: `${b.name} Cars - Models, Reliability & What to Buy`,
    description: `${b.name} (${b.tagline}): ${b.models.length} top models with prices, honest reliability notes, and what ${b.name} does best. From CARC.`,
    alternates: { canonical: `https://www.carc.com/brands/${params.brand}` },
  }
}

export default function BrandPage({ params }: { params: { brand: string } }) {
  const b = getBrand(params.brand)
  if (!b) notFound()
  const others = BRANDS.filter(x => x.slug !== params.brand).slice(0, 6)

  return (
    <div className="min-h-screen bg-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Brand',
            name: b.name,
            slogan: b.tagline,
            description: b.description,
            url: `https://www.carc.com/brands/${b.slug}`,
          }),
        }}
      />
      <NewsNav />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="text-sm text-brand-muted mb-6">
          <Link href="/" className="hover:text-brand-light">CARC.com</Link>
          <span className="mx-2">/</span>
          <Link href="/brands" className="hover:text-brand-light">Brands</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-light">{b.name}</span>
        </nav>

        <p className="text-brand-blue font-medium text-sm uppercase tracking-widest mb-3">
          {b.country} · Founded {b.founded}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-light mb-2">
          {b.name}
        </h1>
        <p className="text-brand-muted text-xl mb-6">{b.tagline}</p>
        <p className="text-brand-light/85 leading-relaxed mb-8">{b.description}</p>

        <div className="flex flex-wrap gap-2 mb-12">
          {b.knownFor.map(k => (
            <span key={k} className="text-sm px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 text-brand-green">
              ✓ {k}
            </span>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-brand-light mb-6">
          Top {b.name} models
        </h2>
        <div className="space-y-4 mb-14">
          {b.models.map(m => (
            <div key={m.name} className="glass rounded-2xl border border-brand-steel p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-display text-xl font-bold text-brand-light">
                    {b.name} {m.name}
                  </h3>
                  <p className="text-brand-muted text-sm mt-1">{m.type}</p>
                </div>
                <p className="text-brand-green font-semibold">{m.priceFrom}</p>
              </div>
              <p className="text-brand-light/85 mt-3">{m.blurb}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl border border-brand-blue/30 p-6 text-center mb-14">
          <p className="font-display font-bold text-brand-light text-lg mb-2">
            Shopping for a {b.name}?
          </p>
          <p className="text-brand-muted text-sm mb-4">
            Check fair prices and deal scores before you visit a dealer.
          </p>
          <Link
            href="/search"
            className="inline-block bg-brand-blue hover:bg-brand-blue-dim text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Search {b.name} listings
          </Link>
        </div>

        <h2 className="font-display text-xl font-bold text-brand-light mb-4">Other brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {others.map(o => (
            <Link
              key={o.slug}
              href={`/brands/${o.slug}`}
              className="glass rounded-xl border border-brand-steel hover:border-brand-blue/40 transition-colors p-4"
            >
              <p className="font-semibold text-brand-light">{o.name}</p>
              <p className="text-brand-muted text-xs mt-1">{o.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
      <NewsFooter />
    </div>
  )
}
