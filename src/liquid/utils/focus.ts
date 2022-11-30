const focusableSelector = [
  'a[href]',
  'area[href]',
  'input:not([type="hidden"]):not([type="radio"]):not(:disabled)',
  'input[type="radio"]:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  'button:not(:disabled)',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]',
]
  .map((selector) => selector + ':not([tabindex^="-"])')
  .join(',')

export const getFirstFocusable = (el: HTMLElement): HTMLElement | undefined => {
  // Directly focusable element.
  if (el.matches(focusableSelector)) {
    return el
  }

  // Slot.
  if (el.tagName === 'SLOT') {
    const hostEl = el.getRootNode()['host']
    const slotName = el.getAttribute('name')
    const slottedEl = slotName
      ? hostEl.querySelector(`[slot="${el.getAttribute('name')}"]`)
      : Array.from(hostEl.children).find(
          (child) => !(child as HTMLElement).hasAttribute('slot')
        )
    if (slottedEl) {
      return getFirstFocusable(slottedEl)
    }
    return null
  }

  // Web Component.
  if (el.shadowRoot) {
    const shadowRootChildren = Array.from(el.shadowRoot.children)
    for (const child of shadowRootChildren) {
      const focusable = getFirstFocusable(child as HTMLElement)
      if (focusable) return focusable
    }
  }

  // Element with children.
  const children = Array.from(el.children)
  for (const child of children) {
    const focusable = getFirstFocusable(child as HTMLElement)
    if (focusable) return focusable
  }

  return null
}

export const isInnerFocusable = <T extends object>(
  element?: T
): element is T & InnerFocusable => element && 'focusInner' in element

let autofocusHandlerTimeout
export const registerAutofocus = (autofocus: boolean) => {
  if (!autofocus || autofocusHandlerTimeout) return
  autofocusHandlerTimeout = setTimeout(() => {
    const firstWithAutofocus = Array.from(
      document.querySelectorAll<HTMLInputElement>('[autofocus]')
    ).find((el) => !el.disabled)
    if (isInnerFocusable(firstWithAutofocus)) {
      firstWithAutofocus.focusInner()
    }
  }, 200)
}
