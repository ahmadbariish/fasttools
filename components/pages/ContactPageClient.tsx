'use client'

import { useTranslation } from 'react-i18next'
import type { AppLocale } from '@/lib/locale'

export function ContactPageClient({ lang }: { lang: AppLocale }) {
  const { t } = useTranslation()
  const isAr = lang === 'ar'

  const whatsappNumber = '00352681512102'
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/^00/, '')}`
  const email = 'ahmad.bariish@gmail.com'

  return (
    <>
      <header className="mb-6">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {t('pages.contactTitle')}
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {isAr
            ? 'للاستفسارات، الشراكات، أو الإعلانات يمكنك التواصل معنا مباشرة.'
            : 'For inquiries, partnerships, or advertising, contact us directly.'}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <p className="mb-1 text-sm font-semibold text-green-600">WhatsApp</p>
            <p className="text-lg font-bold text-slate-900">{whatsappNumber}</p>
          </div>

          <span className="mt-4 inline-flex items-center text-sm font-semibold text-green-600 group-hover:underline">
            {isAr ? 'تواصل مباشرة' : 'Chat now'}
          </span>
        </a>

        <a
          href={`mailto:${email}`}
          className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <p className="mb-1 text-sm font-semibold text-blue-600">Email</p>
            <p className="text-lg font-bold break-all text-slate-900">{email}</p>
          </div>

          <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 group-hover:underline">
            {isAr ? 'إرسال بريد' : 'Send email'}
          </span>
        </a>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          {isAr ? 'ملاحظات مهمة' : 'Important Notes'}
        </h2>

        <p className="text-sm leading-7 text-slate-600 sm:text-base">
          {isAr
            ? 'يرجى عدم إرسال معلومات حساسة. جميع الأدوات تعمل داخل المتصفح ولا يتم تخزين البيانات.'
            : 'Please do not send sensitive information. All tools run locally in your browser and no data is stored.'}
        </p>
      </section>
    </>
  )
}
