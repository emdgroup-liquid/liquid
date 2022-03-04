// This helper function is similar to Element.closest(),
// however it also traverses shadow DOM boundaries.
export const closest = (selector: string, el: Element) => {
  return (
    el &&
    (el.closest(selector) ||
      closest(selector, (el.getRootNode() as unknown as ShadowRoot).host))
  )
}
