export interface LdCookieConsentConfig {
  backdropBlur?: boolean
  buttonAcceptAll?: string
  buttonAcceptCookies: string
  buttonAcceptNone?: string
  buttonAcceptSelected?: string
  buttonAcknowledge?: string
  buttonDismiss?: string
  buttonPreferences?: string
  categories?: {
    autoclear?: {
      name: string
      domain?: string
      path?: string
    }[]
    details: {
      description: string
      cookieTable?: {
        headers?: string[]
        rows: string[][]
      }
    }
    title: string
    toggle: {
      checked?: boolean
      disabled?: boolean
      value: string
    }
  }[]
  disclaimerAlignement: 'center' | 'left' | 'right'
  dismissable?: boolean
  localStorageKey?: string
  mode?: 'notice-only' | 'opt-in' | 'opt-out'
  privacyStatementURL: string
  rejectable?: boolean
  revision?: number
  scriptSelector?: string
  showOnLoad?: boolean
  showOnLoadDelay?: number
}
