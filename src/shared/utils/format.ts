export function formatBytes(
  bytes: number,
  locale: 'en' | 'ar' = 'en'
): string {
  if (!bytes || bytes <= 0) {
    return locale === 'ar' ? '0 بايت' : '0 B'
  }

  const units =
    locale === 'ar'
      ? ['بايت', 'كيلوبايت', 'ميغابايت', 'غيغابايت']
      : ['B', 'KB', 'MB', 'GB']

  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )

  const value = bytes / 1024 ** exponent

  // 🔥 decimals ذكية
  let decimals = 2
  if (value >= 100) decimals = 0
  else if (value >= 10) decimals = 1

  const formatted = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)

  return `${formatted} ${units[exponent]}`
}