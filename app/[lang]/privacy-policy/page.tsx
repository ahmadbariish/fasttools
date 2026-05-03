import type { Metadata } from 'next'
import { PrivacyPageClient } from '@/components/pages/PrivacyPageClient'
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
      ? 'تعرف على كيفية حماية خصوصيتك عند استخدام أدواتنا المجانية داخل المتصفح.'
      : 'Learn how we protect your privacy when using our free browser-based tools.'
  return buildPageMetadata({
    locale: lang,
    pathname: `/${lang}/privacy-policy`,
    title: `${t.pages.privacyTitle} | ${t.siteName}`,
    description,
  })
}

export default async function Page({ params }: Props) {
  const { lang: raw } = await params
  const lang = parseLang(raw)
  return <PrivacyPageClient lang={lang} />
}
