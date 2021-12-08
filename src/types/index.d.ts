interface InnerFocusable {
  focusInner: () => Promise<void>
}

interface ClonesAttributes {
  clonedAttributes: Record<string, string | number> // should use State decorator
}
