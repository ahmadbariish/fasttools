import { useMemo, useState } from 'react'
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
import { siteUrl } from '../../shared/constants/site'

type Mode = 'improve' | 'shorten' | 'expand'

const MODES: Mode[] = ['improve', 'shorten', 'expand']

function transformText(text: string, mode: Mode): string {
  const normalized = text.trim().replace(/\s+/g, ' ')
  if (!normalized) return ''

  if (mode === 'improve') {
    return normalized
      .replace(/\bi\b/g, 'I')
      .replace(/\s([,.!?])/g, '$1')
  }

  if (mode === 'shorten') {
    const words = normalized.split(/\s+/)
    return words.slice(0, Math.max(1, Math.ceil(words.length * 0.7))).join(' ')
  }

  return `${normalized}\n\n${normalized}`
}

function AITextToolsPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [mode, setMode] = useState<Mode>(
    getLocalStorageValue<Mode>(STORAGE_KEYS.aiMode, 'improve')
  )

  const result = useMemo(() => transformText(text, mode), [text, mode])

  const handleModeChange = (nextMode: Mode) => {
    setMode(nextMode)
    setLocalStorageValue(STORAGE_KEYS.aiMode, nextMode)
  }

  const copyResult = async () => {
    if (!result) return

    await navigator.clipboard.writeText(result)
    setCopied(true)

    window.setTimeout(() => setCopied(false), 1500)
  }

  const clearText = () => {
    setText('')
    setCopied(false)
  }

  return (
    <>
      <SEO
        title={`${t('aiTool.title')} | ${t('siteName')}`}
        description={t('aiTool.description')}
        canonical={siteUrl(`/${lang}/tools/ai-text-tools`)}
        lang={lang === 'ar' ? 'ar' : 'en'}
      />

      <header className="mb-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('aiTool.title')}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {t('aiTool.description')}
        </p>
        <p className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
          {t('common.demoMode')}
        </p>
      </header>

      <AdSlot slotName={AD_SLOTS.toolHeader} format="horizontal" />

      <section className="space-y-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <label className="block">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-900">
              {t('aiTool.input')}
            </span>
            <span className="text-xs text-slate-500">
              {text.length} chars
            </span>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={7}
            placeholder={t('aiTool.input')}
            className="min-h-40 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </label>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {MODES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleModeChange(item)}
              className={[
                'min-h-11 rounded-xl px-3 py-2 text-sm font-semibold transition',
                mode === item
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
              ].join(' ')}
            >
              {t(`aiTool.${item}`)}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">
              {t('aiTool.output')}
            </p>
            <span className="text-xs text-slate-500">
              {result.length} chars
            </span>
          </div>

          <p className="min-h-20 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
            {result || '-'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={copyResult}
            disabled={!result}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            {copied ? 'Copied' : t('common.copy')}
          </button>

          <button
            type="button"
            onClick={clearText}
            disabled={!text}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {t('common.clear')}
          </button>
        </div>
      </section>

      <AdSlot slotName={AD_SLOTS.toolMiddle} format="in-content" />

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.howItWorks')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'تستخدم هذه النسخة التجريبية قواعد نصية محلية فقط، ولا يتم إرسال النص إلى أي خادم خارجي.'
            : 'This demo uses local text rules only and does not send your content to external servers.'}
        </p>
      </section>

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.faq')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'لا يتم استخدام أي API خارجي في الوضع التجريبي. يمكن إضافة ذكاء اصطناعي حقيقي لاحقاً مع توضيح الخصوصية للمستخدم.'
            : 'No external AI API is used in demo mode. Real AI can be added later with clear privacy notices.'}
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
          to={`/${lang}/tools/qr-code-generator`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('tools.qrGenerator')}
        </Link>
      </section>

      <AdSlot slotName={AD_SLOTS.toolRelated} format="rectangle" />
    </>
  )
}

export default AITextToolsPage