'use client'

import { useEffect } from 'react'
import { RTL_LANGUAGES } from '@/lib/constants/languages'
import type { AppLocale } from '@/lib/locale'

export function LangHtmlAttributes({ lang }: { lang: AppLocale }) {
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr'
  }, [lang])

  return null
}
