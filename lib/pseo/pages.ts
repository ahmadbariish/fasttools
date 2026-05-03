import type { Metadata } from 'next'
import { messages } from '@/lib/i18n/messages'
import { buildPageMetadata } from '@/lib/metadata/buildPageMetadata'
import { IMAGE_COMPRESSOR_LANDING_COPY } from '@/lib/tools/imageCompressorLandingSeo'
import type { AppLocale } from '@/lib/locale'

export const IMAGE_TOOL_SLUGS = [
  'image-compressor',
  'compress-image-online',
  'reduce-image-size',
  'jpg-to-webp',
  'png-to-jpg',
] as const

export const TOOL_SLUGS = [
  ...IMAGE_TOOL_SLUGS,
  'qr-code-generator',
  'ai-text-tools',
] as const

export type ImageToolSlug = (typeof IMAGE_TOOL_SLUGS)[number]
export type ToolSlug = (typeof TOOL_SLUGS)[number]

const toolSlugSet = new Set<string>(TOOL_SLUGS)
const imageToolSlugSet = new Set<string>(IMAGE_TOOL_SLUGS)

export function isToolSlug(slug: string): slug is ToolSlug {
  return toolSlugSet.has(slug)
}

export function isImageToolSlug(slug: ToolSlug): slug is ImageToolSlug {
  return imageToolSlugSet.has(slug)
}

export function buildToolMetadata(lang: AppLocale, slug: ToolSlug): Metadata {
  const t = messages[lang]

  if (slug === 'qr-code-generator') {
    return buildPageMetadata({
      locale: lang,
      pathname: `/${lang}/tools/${slug}`,
      title: `${t.qrTool.title} | ${t.siteName}`,
      description: t.qrTool.description,
    })
  }

  if (slug === 'ai-text-tools') {
    return buildPageMetadata({
      locale: lang,
      pathname: `/${lang}/tools/${slug}`,
      title: `${t.aiTool.title} | ${t.siteName}`,
      description: t.aiTool.description,
    })
  }

  if (slug === 'image-compressor') {
    return buildPageMetadata({
      locale: lang,
      pathname: `/${lang}/tools/image-compressor`,
      title: `${t.imageTool.title} | ${t.siteName}`,
      description: t.imageTool.description,
    })
  }

  const copy = IMAGE_COMPRESSOR_LANDING_COPY[slug][lang]

  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/tools/${slug}`,
    title: `${copy.seoTitle} | ${t.siteName}`,
    description: copy.seoDescription,
  })
}
