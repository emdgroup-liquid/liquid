export const getFirstFocusable = (el: HTMLElement | ShadowRoot) => {
  const focusableSelector =
    ':is(' +
    [
      '.hydrated',
      'a[href]',
      'area[href]',
      'input',
      'select',
      'textarea',
      'button',
      'iframe',
      '[tabindex]',
      '[contentEditable=true]',
    ].join(',') +
    '):not([tabindex^="-"]):not(:disabled):not([type="hidden"])'

  return Array.from(el.querySelectorAll(focusableSelector)).find((el) => {
    return (
      !el.classList.contains('.hydrated') || getFirstFocusable(el.shadowRoot)
    )
  })
}
