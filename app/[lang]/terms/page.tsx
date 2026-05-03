import type { Metadata } from 'next'
import { TermsPageClient } from '@/components/pages/TermsPageClient'
import { buildPageMetadata } from '@/lib/metadata/buildPageMetadata'
import { messages } from '@/lib/i18n/messages'
import { parseLang, type AppLocale } from '@/lib/locale'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: raw } = await params
  const lang: AppLocale = parseLang(raw)
  const t = messages[lang]
  const description =
    lang === 'ar'
      ? 'شروط استخدام منصة الأدوات المجانية وكيفية استخدام الخدمات بشكل قانوني.'
      : 'Terms of service for using our free online tools and platform.'
  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/terms`,
    title: `${t.pages.termsTitle} | ${t.siteName}`,
    description,
  })
}

export default async function Page({ params }: Props) {
  const { lang: raw } = await params
  const lang = parseLang(raw)
  return <TermsPageClient lang={lang} />
}
