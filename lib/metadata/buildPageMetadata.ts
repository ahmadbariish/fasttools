import type { Metadata } from 'next'
import { DEFAULT_OG_IMAGE, siteUrl } from '@/lib/site'
import type { AppLocale } from '@/lib/locale'

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: AppLocale
  pathname: string
  title: string
  description: string
}): Metadata {
  const canonical = siteUrl(pathname)
  const altEn = pathname.replace(/^\/(en|ar)/, '/en')
  const altAr = pathname.replace(/^\/(en|ar)/, '/ar')

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: siteUrl(altEn),
        ar: siteUrl(altAr),
        'x-default': siteUrl(altEn),
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title,
      description,
      locale: locale === 'ar' ? 'ar' : 'en_US',
      alternateLocale: locale === 'ar' ? ['en_US'] : ['ar'],
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}
