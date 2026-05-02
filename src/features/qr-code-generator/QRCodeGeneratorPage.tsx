import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEO } from '../../shared/components/SEO'
import { AdSlot } from '../../shared/components/ads/AdSlot'
import { AD_SLOTS } from '../../shared/constants/ads'
import {
  STORAGE_KEYS,
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../shared/utils/storage'
import { SITE_ORIGIN, siteUrl } from '../../shared/constants/site'

function QRCodeGeneratorPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()

  const [input, setInput] = useState(`${SITE_ORIGIN}/`)
  const [foreground, setForeground] = useState(
    getLocalStorageValue<string>(STORAGE_KEYS.qrColor, '#0f172a')
  )
  const [background, setBackground] = useState(
    getLocalStorageValue<string>(STORAGE_KEYS.qrBackground, '#ffffff')
  )
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    let isMounted = true

    const generateQr = async () => {
      try {
        setIsGenerating(true)

        const dataUrl = await QRCode.toDataURL(input.trim() || ' ', {
          color: { dark: foreground, light: background },
          margin: 1,
          width: 360,
          errorCorrectionLevel: 'M',
        })

        if (isMounted) {
          setQrDataUrl(dataUrl)
        }
      } finally {
        if (isMounted) {
          setIsGenerating(false)
        }
      }
    }

    void generateQr()

    setLocalStorageValue(STORAGE_KEYS.qrColor, foreground)
    setLocalStorageValue(STORAGE_KEYS.qrBackground, background)

    return () => {
      isMounted = false
    }
  }, [background, foreground, input])

  return (
    <>
      <SEO
        title={`${t('qrTool.title')} | ${t('siteName')}`}
        description={t('qrTool.description')}
        canonical={siteUrl(`/${lang}/tools/qr-code-generator`)}
        lang={lang === 'ar' ? 'ar' : 'en'}
      />

      <header className="mb-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('qrTool.title')}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {t('qrTool.description')}
        </p>
      </header>

      <AdSlot slotName={AD_SLOTS.toolHeader} format="horizontal" />

      <section className="grid gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block font-semibold text-slate-900">
              {t('qrTool.input')}
            </span>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={`${SITE_ORIGIN}/`}
              className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-semibold text-slate-900">
                {t('qrTool.foreground')}
              </span>

              <input
                type="color"
                value={foreground}
                onChange={(event) => setForeground(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-slate-300 bg-white p-1"
              />
            </label>

            <label className="block">
              <span className="mb-2 block font-semibold text-slate-900">
                {t('qrTool.background')}
              </span>

              <input
                type="color"
                value={background}
                onChange={(event) => setBackground(event.target.value)}
                className="h-12 w-full cursor-pointer rounded-xl border border-slate-300 bg-white p-1"
              />
            </label>
          </div>

          <a
            href={qrDataUrl || undefined}
            download="qr-code.png"
            aria-disabled={!qrDataUrl || isGenerating}
            className={[
              'inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition sm:w-auto',
              qrDataUrl && !isGenerating
                ? 'bg-slate-950 text-white hover:bg-slate-800'
                : 'pointer-events-none bg-slate-300 text-white',
            ].join(' ')}
          >
            {isGenerating ? t('common.generating') : t('common.download')}
          </a>
        </div>

        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="QR code"
              className="aspect-square w-full max-w-72 rounded-xl bg-white object-contain p-2 shadow-sm"
            />
          ) : (
            <div className="flex aspect-square w-full max-w-72 items-center justify-center rounded-xl bg-white text-sm text-slate-500">
              QR
            </div>
          )}
        </div>
      </section>

      <AdSlot slotName={AD_SLOTS.toolMiddle} format="in-content" />

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.howItWorks')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'أدخل النص أو الرابط، اختر الألوان المناسبة، ثم حمّل رمز QR كصورة PNG.'
            : 'Enter text or a URL, choose your colors, then download your QR code as a PNG image.'}
        </p>
      </section>

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.faq')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'يتم إنشاء رمز QR داخل المتصفح فقط، ولا يتم حفظ النص أو إرساله إلى أي خادم.'
            : 'Your QR code is generated in the browser only. The entered text is not stored or sent to any server.'}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to={`/${lang}/`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('nav.home')}
        </Link>
        <Link
          to={`/${lang}/tools`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('nav.tools')}
        </Link>
        <Link
          to={`/${lang}/tools/image-compressor`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('tools.imageCompressor')}
        </Link>

        <Link
          to={`/${lang}/tools/ai-text-tools`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('tools.aiText')}
        </Link>
      </section>

      <AdSlot slotName={AD_SLOTS.toolRelated} format="rectangle" />
    </>
  )
}

export default QRCodeGeneratorPage