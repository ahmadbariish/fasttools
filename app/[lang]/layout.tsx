import { I18nProvider } from '@/components/i18n/I18nProvider'
import { LangHtmlAttributes } from '@/components/i18n/LangHtmlAttributes'
import { MainLayout } from '@/components/layout/MainLayout'
import { parseLang } from '@/lib/locale'

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang: raw } = await params
  const lang = parseLang(raw)

  return (
    <I18nProvider lang={lang}>
      <LangHtmlAttributes lang={lang} />
      <MainLayout lang={lang}>{children}</MainLayout>
    </I18nProvider>
  )
}
