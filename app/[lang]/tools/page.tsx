import type { Metadata } from 'next'
import { ToolsPageClient } from '@/components/pages/ToolsPageClient'
import { buildPageMetadata } from '@/lib/metadata/buildPageMetadata'
import { messages } from '@/lib/i18n/messages'
import { parseLang, type AppLocale } from '@/lib/locale'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw } = await params
  const lang: AppLocale = parseLang(raw)
  const t = messages[lang]
  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/tools`,
    title: `${t.tools.title} | ${t.siteName}`,
    description: t.tools.description,
  })
}

export default async function ToolsPage({ params }: Props) {
  const { lang: raw } = await params
  const lang = parseLang(raw)
  return <ToolsPageClient lang={lang} />
}
