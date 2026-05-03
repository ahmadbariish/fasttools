'use client'

import { useEffect } from 'react'
import { SITE_ORIGIN } from '@/lib/site'
import type { AppLocale } from '@/lib/locale'

export function RoutePrefetch({ lang }: { lang: AppLocale }) {
  useEffect(() => {
    const paths = [`/${lang}`, `/${lang}/tools`]
    const created: HTMLLinkElement[] = []

    for (const path of paths) {
      const href = `${SITE_ORIGIN}${path}`
      if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) continue
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = href
      link.as = 'document'
      document.head.appendChild(link)
      created.push(link)
    }

    return () => {
      created.forEach((el) => el.remove())
    }
  }, [lang])

  return null
}
