'use client'

import { useEffect, useRef } from 'react'
import {
  ADSENSE_CLIENT_ID,
  AD_SLOT_HEIGHT,
  ADS_ENABLED,
  type AdFormat,
} from '@/lib/constants/ads'

type AdSlotProps = {
  slotName: string
  format: AdFormat
}

export function AdSlot({ slotName, format }: AdSlotProps) {
  const height = AD_SLOT_HEIGHT[format]
  const adRef = useRef<HTMLModElement | null>(null)

  useEffect(() => {
    if (!ADS_ENABLED) return

    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  if (!ADS_ENABLED) {
    return (
      <div
        className="my-4 flex w-full items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-3 text-center text-sm text-slate-500 sm:my-6"
        style={{ minHeight: `${height}px` }}
        aria-label={slotName}
      >
        <span className="opacity-70">Advertisement / إعلان</span>
      </div>
    )
  }

  return (
    <div
      className="my-4 w-full overflow-hidden sm:my-6"
      style={{ minHeight: `${height}px` }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotName}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
