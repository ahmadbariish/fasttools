/** Production site origin — use for canonicals, Open Graph, and prefetch URLs. */
export const SITE_ORIGIN = 'https://fasttools.ahmadbarish.xyz'

/**
 * Default share image (placeholder). Replace with a 1200×630 PNG/WebP in /public for best social previews.
 * SVG works in some crawlers; raster is recommended for production.
 */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/favicon.svg`

export function siteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${normalized}`
}
