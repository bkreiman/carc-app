import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsNav from '@/app/components/NewsNav'
import NewsFooter from '@/app/components/NewsFooter'
import { LISTS, getList } from '@/lib/top10'

export function generateStaticParams() {
  return LISTS.map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const l = getList(params.slug)
  if (!l) return {}
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `https://www.carc.com/top-10/${params.slug}` },
    openGraph: { title: l.title, description: l.description, type: 'article' },
  }
}

export default function Top10ListPage({ params }: { params: { slug: string } }) {
  const l = getList(params.slug)
  if (!l) notFound()

  return (
    <div className="min-h-screen bg-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: l.title,
            description: l.description,
            url: `https://www.carc.com/top-10/${l.slug}`,
            itemListElement: l.cars.map((c) => ({
              '@type': 'ListItem',
              position: c.rank,
              name: c.name,
            })),
          }),
        }}
      />
      <NewsNav />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/top-10" className="text-brand-blue text-sm font-medium hover:underline">
          ← All top 10 lists
        </Link>
        <p className="text-brand-blue font-medium text-sm uppercase tracking-widest mt-6 mb-3">
          Updated {l.updated}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-light leading-tight mb-4">
          {l.title}
        </h1>
        <p className="text-brand-muted text-lg mb-12 max-w-3xl">{l.intro}</p>

        <div className="space-y-6">
          {l.cars.map((c) => (
            <div key={c.rank} className="glass rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="font-display text-5xl font-bold text-brand-blue/30 shrink-0 w-16">
                  {c.rank}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-brand-light mb-1">
                    {c.name}
                  </h2>
                  <p className="text-brand-green font-semibold text-sm mb-1">{c.price}</p>
                  <p className="text-brand-muted text-sm mb-3">{c.specs}</p>
                  <p className="text-brand-light/85 leading-relaxed mb-4">{c.blurb}</p>
                  <ul className="flex flex-wrap gap-2">
                    {c.pros.map((p) => (
                      <li
                        key={p}
                        className="text-xs px-3 py-1 rounded-full border border-brand-green/30 bg-brand-green/10 text-brand-green"
                      >
                        ✓ {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-brand-muted/50 text-xs mt-10">
          Prices are approximate starting MSRPs and vary by trim, options, and region.
          Rankings are CARC editorial picks — no sponsored placements.
        </p>
      </div>
      <NewsFooter />
    </div>
  )
}
