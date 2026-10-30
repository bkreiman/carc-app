import type { MetadataRoute } from 'next'
import { PAIRS } from '@/lib/compare-data'
import { ARTICLES } from '@/lib/news'
import { LISTS } from '@/lib/top10'
import { GUIDES } from '@/lib/guides'
import { BRANDS } from '@/lib/brands'

const BASE = 'https://www.carc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const calcRoutes = ['/calculators', '/calculators/auto-loan', '/calculators/lease-vs-buy', '/calculators/total-cost', '/calculators/depreciation', '/calculators/insurance'].map(p => ({
    url: `${BASE}${p}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  const staticRoutes = ['', '/pricing', '/search', '/tools/negotiation', '/compare', '/news', '/top-10', '/guides', '/brands', '/privacy', '/terms', '/affiliate-disclosure'].map(p => ({
    url: `${BASE}${p}`,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
  const compareRoutes = PAIRS.map(p => ({
    url: `${BASE}/compare/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  const newsRoutes = ARTICLES.map(a => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: new Date(a.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const top10Routes = LISTS.map(l => ({
    url: `${BASE}/top-10/${l.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  const guideRoutes = GUIDES.map(g => ({
    url: `${BASE}/guides/${g.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  const brandRoutes = BRANDS.map(b => ({
    url: `${BASE}/brands/${b.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  return [...staticRoutes, ...calcRoutes, ...compareRoutes, ...newsRoutes, ...top10Routes, ...guideRoutes, ...brandRoutes]
}
