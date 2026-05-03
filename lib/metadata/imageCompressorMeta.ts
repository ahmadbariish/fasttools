import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata/buildPageMetadata'
import { IMAGE_COMPRESSOR_LANDING_COPY } from '@/lib/tools/imageCompressorLandingSeo'
import { messages } from '@/lib/i18n/messages'
import type { AppLocale } from '@/lib/locale'

type LandingSlug = keyof typeof IMAGE_COMPRESSOR_LANDING_COPY

export function imageCompressorLandingMetadata(
  lang: AppLocale,
  slug: LandingSlug
): Metadata {
  const copy = IMAGE_COMPRESSOR_LANDING_COPY[slug][lang]
  const t = messages[lang]
  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/tools/${slug}`,
    title: `${copy.seoTitle} | ${t.siteName}`,
    description: copy.seoDescription,
  })
}

export function imageCompressorDefaultMetadata(lang: AppLocale): Metadata {
  const t = messages[lang]
  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/tools/image-compressor`,
    title: `${t.imageTool.title} | ${t.siteName}`,
    description: t.imageTool.description,
  })
}
