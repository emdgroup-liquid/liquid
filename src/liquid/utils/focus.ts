export const getFirstFocusable = (el: HTMLElement | ShadowRoot) => {
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

  return Array.from(el.querySelectorAll(focusableSelector)).find((el) => {
    return (
      !el.classList.contains('.hydrated') || getFirstFocusable(el.shadowRoot)
    )
  })
}
