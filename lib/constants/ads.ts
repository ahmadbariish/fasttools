export const ADS_ENABLED = false

export const ADSENSE_CLIENT_ID = 'ca-pub-xxxxxxxxxxxxxxxx'

export type AdFormat = 'horizontal' | 'rectangle' | 'sidebar' | 'in-content'

export const AD_SLOT_HEIGHT: Record<AdFormat, number> = {
  horizontal: 90,
  rectangle: 250,
  sidebar: 300,
  'in-content': 180,
}

export type AdSlotKey =
  | 'homeHero'
  | 'homeFooter'
  | 'toolsIntro'
  | 'toolsList'
  | 'toolHeader'
  | 'toolMiddle'
  | 'toolRelated'

export const AD_SLOTS: Record<AdSlotKey, string> = {
  homeHero: '1234567890',
  homeFooter: '1234567891',
  toolsIntro: '1234567892',
  toolsList: '1234567893',
  toolHeader: '1234567894',
  toolMiddle: '1234567895',
  toolRelated: '1234567896',
}
