import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEO } from '../../shared/components/SEO'
import { AdSlot } from '../../shared/components/ads/AdSlot'
import { AD_SLOTS } from '../../shared/constants/ads'
import { formatBytes } from '../../shared/utils/format'
import {
  STORAGE_KEYS,
  getLocalStorageValue,
  setLocalStorageValue,
} from '../../shared/utils/storage'

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp'

function ImageCompressorPage() {
  const { t } = useTranslation()
  const { lang = 'en' } = useParams()

  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const [quality, setQuality] = useState<number>(
    getLocalStorageValue<number>(STORAGE_KEYS.imageQuality, 0.8)
  )

  const [format, setFormat] = useState<OutputFormat>(
    getLocalStorageValue<OutputFormat>(STORAGE_KEYS.imageFormat, 'image/jpeg')
  )

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  const compress = async (
    file: File,
    nextQuality = quality,
    nextFormat = format
  ) => {
    try {
      setIsProcessing(true)

      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height

      const context = canvas.getContext('2d')
      if (!context) return

      context.drawImage(bitmap, 0, 0)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, nextFormat, nextQuality)
      )

      bitmap.close()

      if (blob) setOutputBlob(blob)
    } finally {
      setIsProcessing(false)
    }
  }

  const onUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) return

    setOriginalFile(file)
    setOutputBlob(null)

    setPreview((oldPreview) => {
      if (oldPreview) URL.revokeObjectURL(oldPreview)
      return URL.createObjectURL(file)
    })

    await compress(file)
  }

  const stats = useMemo(() => {
    if (!originalFile || !outputBlob) return null

    const saved = ((originalFile.size - outputBlob.size) / originalFile.size) * 100

    return {
      original: formatBytes(originalFile.size, lang === 'ar' ? 'ar' : 'en'),
      output: formatBytes(outputBlob.size, lang === 'ar' ? 'ar' : 'en'),
      saved: `${Math.max(0, saved).toFixed(1)}%`,
    }
  }, [originalFile, outputBlob, lang])

  const download = () => {
    if (!outputBlob) return

    const extension = format.split('/')[1] === 'jpeg' ? 'jpg' : format.split('/')[1]
    const url = URL.createObjectURL(outputBlob)
    const link = document.createElement('a')

    link.href = url
    link.download = `compressed-image.${extension}`
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SEO
        title={`${t('imageTool.title')} | ${t('siteName')}`}
        description={t('imageTool.description')}
        canonical={`https://example.com/${lang}/tools/image-compressor`}
        lang={lang === 'ar' ? 'ar' : 'en'}
      />

      <header className="mb-5">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('imageTool.title')}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {t('imageTool.privacy')}
        </p>
      </header>

      <AdSlot slotName={AD_SLOTS.toolHeader} format="horizontal" />

      <section className="space-y-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <label className="block">
          <span className="mb-2 block font-semibold text-slate-900">
            {t('imageTool.upload')}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm file:me-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </label>

        <label className="block">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-900">
              {t('imageTool.quality')}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {Math.round(quality * 100)}%
            </span>
          </div>

          <input
            type="range"
            min={0.2}
            max={1}
            step={0.05}
            value={quality}
            onChange={(event) => {
              const value = Number(event.target.value)
              setQuality(value)
              setLocalStorageValue(STORAGE_KEYS.imageQuality, value)
              if (originalFile) void compress(originalFile, value, format)
            }}
            className="w-full"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-semibold text-slate-900">
            {t('imageTool.format')}
          </span>
          <select
            value={format}
            onChange={(event) => {
              const value = event.target.value as OutputFormat
              setFormat(value)
              setLocalStorageValue(STORAGE_KEYS.imageFormat, value)
              if (originalFile) void compress(originalFile, quality, value)
            }}
            className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 sm:w-auto"
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </label>

        {preview && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <img
              src={preview}
              alt="Preview"
              className="max-h-72 w-full rounded-xl object-contain"
            />
          </div>
        )}

        {stats && (
          <div className="grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-500">{t('imageTool.originalSize')}</p>
              <p className="font-bold text-slate-900">{stats.original}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-500">{t('imageTool.newSize')}</p>
              <p className="font-bold text-slate-900">{stats.output}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-500">{t('imageTool.saved')}</p>
              <p className="font-bold text-slate-900">{stats.saved}</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={download}
          disabled={!outputBlob || isProcessing}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
        >
          {isProcessing ? 'Processing...' : t('common.download')}
        </button>
      </section>

      <AdSlot slotName={AD_SLOTS.toolMiddle} format="in-content" />

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.howItWorks')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'ارفع الصورة، اختر الجودة والصيغة، ثم يتم ضغطها محلياً داخل المتصفح لتتمكن من تحميلها فوراً.'
            : 'Upload an image, choose quality and output format, then compress it locally in your browser and download the result.'}
        </p>
      </section>

      <section className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-950">
          {t('common.faq')}
        </h2>
        <p className="leading-7 text-slate-600">
          {lang === 'ar'
            ? 'لا يتم رفع الصور إلى أي سيرفر. تتم المعالجة داخل ذاكرة المتصفح فقط.'
            : 'Images are never uploaded to a server. Processing happens only in your browser memory.'}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <Link
          to={`/${lang}/tools/qr-code-generator`}
          className="rounded-2xl border border-slate-200 bg-white p-4 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          {t('tools.qrGenerator')}
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

export default ImageCompressorPage