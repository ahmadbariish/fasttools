export const STORAGE_KEYS = {
  language: 'mt_language',
  imageQuality: 'mt_image_quality',
  imageFormat: 'mt_image_format',
  qrColor: 'mt_qr_color',
  qrBackground: 'mt_qr_background',
  aiMode: 'mt_ai_mode',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export function getLocalStorageValue<T>(key: StorageKey, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback

    const value = window.localStorage.getItem(key)
    if (!value) return fallback

    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function setLocalStorageValue<T>(key: StorageKey, value: T): void {
  try {
    if (typeof window === 'undefined') return

    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // private mode / quota
  }
}
