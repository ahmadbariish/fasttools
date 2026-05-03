'use client'

import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/lib/i18n/init'
import type { AppLocale } from '@/lib/locale'

export function I18nProvider({
  lang,
  children,
}: {
  lang: AppLocale
  children: React.ReactNode
}) {
  useEffect(() => {
    void i18n.changeLanguage(lang)
  }, [lang])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
