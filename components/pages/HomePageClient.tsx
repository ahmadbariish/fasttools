'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { AdSlot } from '@/components/ads/AdSlot'
import { ToolCard } from '@/components/ToolCard'
import { AD_SLOTS } from '@/lib/constants/ads'
import type { AppLocale } from '@/lib/locale'

export function HomePageClient({ lang }: { lang: AppLocale }) {
  const { t } = useTranslation()

  return (
    <>
      <section className="rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <h1 className="mx-auto mb-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
          {t('home.heroTitle')}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-slate-600">{t('home.heroText')}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/${lang}/tools`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white sm:text-base"
          >
            {t('home.cta')}
          </Link>
          <nav
            aria-label={lang === 'ar' ? 'روابط سريعة للأدوات' : 'Quick links to tools'}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold text-slate-700"
          >
            <Link
              href={`/${lang}/tools/image-compressor`}
              className="underline-offset-4 hover:underline"
            >
              {t('tools.imageCompressor')}
            </Link>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href={`/${lang}/tools/qr-code-generator`}
              className="underline-offset-4 hover:underline"
            >
              {t('tools.qrGenerator')}
            </Link>
            <span className="hidden text-slate-300 sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href={`/${lang}/tools/ai-text-tools`}
              className="underline-offset-4 hover:underline"
            >
              {t('tools.aiText')}
            </Link>
          </nav>
        </div>
      </section>
      <AdSlot slotName={AD_SLOTS.homeHero} format="horizontal" />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ToolCard
          href={`/${lang}/tools/image-compressor`}
          icon="🖼️"
          title={t('tools.imageCompressor')}
          description={t('tools.imageDescription')}
          cta={t('tools.openTool')}
        />
        <ToolCard
          href={`/${lang}/tools/qr-code-generator`}
          icon="🔳"
          title={t('tools.qrGenerator')}
          description={t('tools.qrDescription')}
          cta={t('tools.openTool')}
        />
        <ToolCard
          href={`/${lang}/tools/ai-text-tools`}
          icon="✍️"
          title={t('tools.aiText')}
          description={t('tools.aiDescription')}
          cta={t('tools.openTool')}
        />
      </section>
      <AdSlot slotName={AD_SLOTS.homeFooter} format="rectangle" />
    </>
  )
}
