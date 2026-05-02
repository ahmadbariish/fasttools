import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE } from '../constants/site'

type SEOProps = {
  title: string
  description: string
  canonical: string
  /** Absolute image URL for og:image / twitter:image (defaults to site placeholder). */
  image?: string
  lang?: 'ar' | 'en'
}

export function SEO({ title, description, canonical, image, lang = 'en' }: SEOProps) {
  const shareImage = image ?? DEFAULT_OG_IMAGE

  useEffect(() => {
    // 🔹 Title
    document.title = title

    // 🔹 HTML lang + dir
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'

    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attr, key)
        document.head.appendChild(tag)
      }

      tag.content = value
    }

    // 🔹 Basic SEO
    setMeta('name', 'description', description)

    // 🔹 Open Graph (Facebook / WhatsApp)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', shareImage)

    // 🔹 Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:url', canonical)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', shareImage)

    // 🔹 Canonical
    let canonicalTag = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.rel = 'canonical'
      document.head.appendChild(canonicalTag)
    }

    canonicalTag.href = canonical

    // 🔹 Hreflang (مهم جداً للـ AR/EN)
    const setAltLang = (hreflang: string, href: string) => {
      let link = document.head.querySelector(
        `link[rel="alternate"][hreflang="${hreflang}"]`
      ) as HTMLLinkElement | null

      if (!link) {
        link = document.createElement('link')
        link.rel = 'alternate'
        link.hreflang = hreflang
        document.head.appendChild(link)
      }

      link.href = href
    }

    if (canonical.includes('/ar')) {
      setAltLang('ar', canonical)
      setAltLang('en', canonical.replace('/ar', '/en'))
    } else {
      setAltLang('en', canonical)
      setAltLang('ar', canonical.replace('/en', '/ar'))
    }
  }, [title, description, canonical, lang, shareImage])

  return null
}