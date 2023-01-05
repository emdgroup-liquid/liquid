interface InnerFocusable {
  focusInner: () => Promise<void>
  ldTabindex: number | undefined
}

interface ClonesAttributes {
  clonedAttributes: Record<string, string | number | boolean> // should use State decorator
}

interface CollatorOptions {
  numeric?: boolean
  numberingSystem?: string
}
declare type NumberingSystem = typeof Intl.NumberingSystem
