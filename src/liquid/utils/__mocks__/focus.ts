export const getFirstFocusable = jest.fn((element: HTMLElement) => element)

export const isInnerFocusable = jest.fn(
  (element: HTMLElement) => element && 'focusInner' in element
)

export const focusableSelector = [
  'a',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  'button:not(:disabled)',
  'iframe',
].join(',')
