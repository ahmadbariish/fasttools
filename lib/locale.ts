export type AppLocale = 'en' | 'ar'

export function parseLang(raw: string): AppLocale {
  return raw === 'ar' ? 'ar' : 'en'
}
