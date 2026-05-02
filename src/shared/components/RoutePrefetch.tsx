import { useEffect } from 'react'
import { SITE_ORIGIN } from '../constants/site'

type Props = {
  lang: 'en' | 'ar'
}

/**
 * Hints the browser to prefetch key HTML routes for the active locale (SPA shell).
 * Does not fetch user uploads or API data.
 */
export function RoutePrefetch({ lang }: Props) {
  useEffect(() => {
    const paths = [`/${lang}/`, `/${lang}/tools`]
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
