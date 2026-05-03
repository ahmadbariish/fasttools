import type { Metadata } from 'next'
import { HomePageClient } from '@/components/pages/HomePageClient'
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
    pathname: `/${lang}`,
    title: t.home.title,
    description: t.home.description,
  })
}

export default async function HomePage({ params }: Props) {
  const { lang: raw } = await params
  const lang = parseLang(raw)
  return <HomePageClient lang={lang} />
}
