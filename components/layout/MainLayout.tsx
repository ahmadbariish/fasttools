'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LANGUAGE,
  RTL_LANGUAGES,
  type SupportedLanguage,
} from '@/lib/constants/languages'
import { STORAGE_KEYS, setLocalStorageValue } from '@/lib/utils/storage'
import { RoutePrefetch } from '@/components/RoutePrefetch'
import type { AppLocale } from '@/lib/locale'

export function MainLayout({
  lang,
  children,
}: {
  lang: AppLocale
  children: React.ReactNode
}) {
  const { t, i18n } = useTranslation()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const currentLang: SupportedLanguage = lang || DEFAULT_LANGUAGE
  const isRtl = RTL_LANGUAGES.includes(currentLang)
  const switchTo: SupportedLanguage = currentLang === 'en' ? 'ar' : 'en'

  const pathAfterLang = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const rest = segments.slice(1).join('/')
    return rest ? `/${rest}` : ''
  }, [pathname])

  const switchedPath = `/${switchTo}${pathAfterLang}`

  const navLinks = useMemo(
    () => [
      { href: `/${currentLang}`, label: t('nav.home') },
      { href: `/${currentLang}/tools`, label: t('nav.tools') },
      { href: `/${currentLang}/privacy-policy`, label: t('nav.privacy') },
      { href: `/${currentLang}/terms`, label: t('nav.terms') },
      { href: `/${currentLang}/contact`, label: t('nav.contact') },
    ],
    [currentLang, t]
  )

  useEffect(() => {
    void i18n.changeLanguage(currentLang)
    setLocalStorageValue(STORAGE_KEYS.language, currentLang)
  }, [currentLang, i18n])

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIsMenuOpen(false))
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <RoutePrefetch lang={currentLang === 'ar' ? 'ar' : 'en'} />
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link
            href={`/${currentLang}`}
            className="min-w-0 truncate text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl"
          >
            {t('siteName')}
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <nav className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 text-sm md:flex">
              {navLinks.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'rounded-full px-4 py-2 font-medium transition',
                      isActive
                        ? 'bg-white text-slate-950 shadow-sm'
                        : 'text-slate-600 hover:bg-white/70 hover:text-slate-950',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <Link
              href={switchedPath}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              {switchTo.toUpperCase()}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-800 shadow-sm transition hover:bg-slate-50 md:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 shadow-sm md:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navLinks.map((item) => {
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition',
                      isActive
                        ? 'bg-slate-950 text-white'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100',
                    ].join(' ')}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70">{isRtl ? '←' : '→'}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {t('siteName')}
          </span>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${currentLang}/privacy-policy`}
              className="hover:text-slate-950"
            >
              {t('nav.privacy')}
            </Link>
            <Link href={`/${currentLang}/terms`} className="hover:text-slate-950">
              {t('nav.terms')}
            </Link>
            <Link href={`/${currentLang}/contact`} className="hover:text-slate-950">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
