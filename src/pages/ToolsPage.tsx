import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEO } from '../shared/components/SEO'
import { AD_SLOTS } from '../shared/constants/ads'
import { AdSlot } from '../shared/components/ads/AdSlot'
import { ToolCard } from '../shared/components/ToolCard'

function ToolsPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()
  const isAr = lang === 'ar'

  return (
    <>
      <SEO
        title={`${t('tools.title')} | ${t('siteName')}`}
        description={t('tools.description')}
        canonical={`https://example.com/${lang}/tools`}
        lang={isAr ? 'ar' : 'en'}
      />

      <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <span className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {isAr ? 'أدوات مجانية' : 'Free Tools'}
        </span>

        <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {t('tools.title')}
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {t('tools.intro')}
        </p>
      </header>

      <AdSlot slotName={AD_SLOTS.toolsIntro} format="horizontal" />

      <section className="mb-6">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {isAr ? 'اختر الأداة المناسبة' : 'Choose your tool'}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {isAr
                ? 'كل أداة مصممة لتكون سريعة، واضحة، ومناسبة للموبايل.'
                : 'Each tool is built to be fast, clear, and mobile-friendly.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        </div>
      </section>

      <AdSlot slotName={AD_SLOTS.toolsList} format="in-content" />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {isAr ? 'لماذا تستخدم هذه الأدوات؟' : 'Why use these tools?'}
        </h2>

        <div className="grid gap-3 text-sm leading-7 text-slate-600 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <strong className="mb-1 block text-slate-950">
              {isAr ? 'خصوصية أعلى' : 'Privacy-first'}
            </strong>
            {isAr
              ? 'تعمل الأدوات داخل المتصفح بدون رفع ملفاتك أو نصوصك.'
              : 'Tools run in your browser without uploading your files or text.'}
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <strong className="mb-1 block text-slate-950">
              {isAr ? 'سريعة ومجانية' : 'Fast and free'}
            </strong>
            {isAr
              ? 'استخدم الأدوات مباشرة بدون تسجيل أو إعدادات معقدة.'
              : 'Use the tools instantly without signup or complex setup.'}
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <strong className="mb-1 block text-slate-950">
              {isAr ? 'مناسبة للموبايل' : 'Mobile-friendly'}
            </strong>
            {isAr
              ? 'تصميم واضح وسهل الاستخدام على شاشات الهاتف.'
              : 'A clean experience designed for small screens and quick actions.'}
          </div>
        </div>
      </section>
    </>
  )
}

export default ToolsPage