interface InnerFocusable {
  focusInner: () => Promise<void>
}

interface ClonesAttributes {
  clonedAttributes: { name: string; value: string }[] // should use State decorator
}
