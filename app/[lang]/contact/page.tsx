import type { Metadata } from 'next'
import { ContactPageClient } from '@/components/pages/ContactPageClient'
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
    pathname: `/${lang}/contact`,
    title: `${t.pages.contactTitle} | ${t.siteName}`,
    description: t.pages.contactText,
  })
}

export default async function Page({ params }: Props) {
  const { lang: raw } = await params
  const lang = parseLang(raw)
  return <ContactPageClient lang={lang} />
}
