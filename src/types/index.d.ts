interface InnerFocusable {
  focusInner: () => Promise<void>
}

interface ClonesAttributes {
  clonedAttributes: Record<string, string | number | boolean> // should use State decorator
}
