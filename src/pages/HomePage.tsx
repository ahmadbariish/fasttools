import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEO } from '../shared/components/SEO'
import { AdSlot } from '../shared/components/ads/AdSlot'
import { AD_SLOTS } from '../shared/constants/ads'
import { ToolCard } from '../shared/components/ToolCard'

function HomePage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()

  return (
    <>
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        canonical={`https://example.com/${lang}`}
      />
      <section className="rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
        <h1 className="mx-auto mb-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
          {t('home.heroTitle')}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-slate-600">{t('home.heroText')}</p>
        <Link
          to={`/${lang}/tools`}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white sm:text-base"
        >
          {t('home.cta')}
        </Link>
      </section>
      <AdSlot slotName={AD_SLOTS.homeHero} format="horizontal" />
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ToolCard
          to={`/${lang}/tools/image-compressor`}
          icon="🖼️"
          title={t('tools.imageCompressor')}
          description={t('tools.imageDescription')}
          cta={t('tools.openTool')}
        />
        <ToolCard
          to={`/${lang}/tools/qr-code-generator`}
          icon="🔳"
          title={t('tools.qrGenerator')}
          description={t('tools.qrDescription')}
          cta={t('tools.openTool')}
        />
        <ToolCard
          to={`/${lang}/tools/ai-text-tools`}
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

export default HomePage
