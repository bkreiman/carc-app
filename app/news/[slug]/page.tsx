import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import NewsNav from '@/app/components/NewsNav'
import NewsFooter from '@/app/components/NewsFooter'
import { ARTICLES, getArticle } from '@/lib/news'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug)
  if (!a) return {}
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `https://www.carc.com/news/${params.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      type: 'article',
      publishedTime: a.dateISO,
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug)
  if (!a) notFound()
  const related = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 2)
  const fallbackRelated = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 2)
  const show = related.length > 0 ? related : fallbackRelated

  return (
    <div className="min-h-screen bg-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: a.title,
            description: a.description,
            url: `https://www.carc.com/news/${a.slug}`,
            datePublished: a.dateISO,
            dateModified: a.dateISO,
            author: { '@type': 'Organization', name: 'CARC Editorial Team', url: 'https://www.carc.com' },
            publisher: { '@type': 'Organization', name: 'CARC.com', url: 'https://www.carc.com' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.carc.com/news/${a.slug}` },
          }),
        }}
      />
      <NewsNav />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/news" className="text-brand-blue text-sm font-medium hover:underline">
          ← All news
        </Link>
        <p className="text-brand-blue font-medium text-sm uppercase tracking-widest mt-6 mb-3">
          {a.category}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-light leading-tight mb-4">
          {a.title}
        </h1>
        <p className="text-brand-muted/80 text-sm mb-8 pb-8 border-b border-brand-steel/40">
          By {a.author} · {a.date} · {a.readMinutes} min read
        </p>
        <div className="space-y-6 text-brand-light/90 text-lg leading-relaxed">
          {a.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {a.sources.length > 0 && (
          <p className="text-brand-muted/60 text-sm mt-10 pt-6 border-t border-brand-steel/40">
            Sources: {a.sources.join(', ')}
          </p>
        )}

        {/* Related */}
        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold text-brand-light mb-6">Related stories</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {show.map((r) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                className="glass rounded-2xl p-6 hover:border-brand-blue/50 transition-colors"
              >
                <p className="text-brand-blue text-xs font-semibold uppercase tracking-widest mb-2">
                  {r.category}
                </p>
                <h3 className="font-display text-lg font-bold text-brand-light leading-snug mb-2">
                  {r.title}
                </h3>
                <p className="text-brand-muted/60 text-xs">{r.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
      <NewsFooter />
    </div>
  )
}
