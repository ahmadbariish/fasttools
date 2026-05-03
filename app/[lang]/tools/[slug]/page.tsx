import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AITextToolsClient } from '@/components/tools/AITextToolsClient'
import { ImageCompressorClient } from '@/components/tools/ImageCompressorClient'
import { QRCodeGeneratorClient } from '@/components/tools/QRCodeGeneratorClient'
import { parseLang, type AppLocale } from '@/lib/locale'
import {
  TOOL_SLUGS,
  buildToolMetadata,
  isImageToolSlug,
  isToolSlug,
} from '@/lib/pseo/pages'

type Props = { params: Promise<{ lang: string; slug: string }> }

export function generateStaticParams() {
  return ['en', 'ar'].flatMap((lang) =>
    TOOL_SLUGS.map((slug) => ({
      lang,
      slug,
    }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params
  const lang: AppLocale = parseLang(rawLang)

  if (!isToolSlug(slug)) {
    return {}
  }

  return buildToolMetadata(lang, slug)
}

export default async function ToolPage({ params }: Props) {
  const { lang: rawLang, slug } = await params
  const lang = parseLang(rawLang)

  if (!isToolSlug(slug)) {
    notFound()
  }

  if (slug === 'qr-code-generator') {
    return <QRCodeGeneratorClient lang={lang} />
  }

  if (slug === 'ai-text-tools') {
    return <AITextToolsClient lang={lang} />
  }

  if (isImageToolSlug(slug)) {
    return <ImageCompressorClient lang={lang} slug={slug} />
  }

  notFound()
}
