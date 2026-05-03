import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/site'
import { TOOL_SLUGS } from '@/lib/pseo/pages'

const langs = ['en', 'ar'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    entries.push({
      url: `${SITE_ORIGIN}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })
    entries.push({
      url: `${SITE_ORIGIN}/${lang}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })

    for (const slug of TOOL_SLUGS) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    for (const path of ['privacy-policy', 'terms', 'contact'] as const) {
      entries.push({
        url: `${SITE_ORIGIN}/${lang}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return entries
}
