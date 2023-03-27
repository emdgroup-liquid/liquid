export const isElement = (node: Node): node is Element =>
  'querySelectorAll' in node

export const isHtmlElement = (element?: Element): element is HTMLElement =>
  'focus' in element

export const isMenuItem = (
  element: Element
): element is HTMLLdMenuitemElement => element.tagName === 'LD-MENUITEM'

export const isSlot = (element: Element): element is HTMLSlotElement =>
  element.tagName === 'SLOT'
