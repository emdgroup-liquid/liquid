/**
 * Returns the scroll parent (the first scrollable ancestor of a given element).
 * This is a vanilla JS port of the jQuery UI scrollParent method:
 * https://github.com/jquery/jquery-ui/blob/main/ui/scroll-parent.js
 */
export function getScrollParent(element: HTMLElement, includeHidden?: boolean) {
  let style = getComputedStyle(element);
  if (style.position === "fixed") {
    return document.scrollingElement;
  }

  const excludeStaticParent = style.position === "absolute";
  const overflowRegex = includeHidden
    ? /(auto|scroll|hidden)/
    : /(auto|scroll)/;

  // Using for loop instead of recursion in order to save memory.
  for (let parent = element; (parent = parent.parentElement); ) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === "static") {
      continue;
    }
    if (
      overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
    ) {
      return parent;
    }
  }

  return document.scrollingElement;
}
