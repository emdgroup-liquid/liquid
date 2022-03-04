export const getFirstFocusable = (el: HTMLElement): HTMLElement | undefined => {
  const focusableSelector = [
    '.hydrated',
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
  const focusableElements = [
    el,
    ...Array.from(el.querySelectorAll<HTMLElement>(focusableSelector)),
  ]

  return focusableElements.find((el) => {
    return (
      !el.classList.contains('hydrated') ||
      Array.from(
        el.shadowRoot.querySelectorAll<HTMLElement>(focusableSelector)
      ).find(getFirstFocusable)
    )
  })
}
