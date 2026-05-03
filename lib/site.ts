/** Production site origin — canonicals, Open Graph, prefetch. */
export const SITE_ORIGIN = 'https://fasttools.ahmadbarish.xyz'

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/favicon.svg`

export function siteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${normalized}`
}
