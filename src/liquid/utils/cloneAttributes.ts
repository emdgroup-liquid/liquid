import { JSXBase } from '@stencil/core/internal'
import HTMLAttributes = JSXBase.HTMLAttributes

export function cloneAttributes<T = HTMLAttributes | NamedNodeMap>(el: {
  attributes: HTMLAttributes | NamedNodeMap
}) {
  const attrClone = { ...el.attributes }
  Object.keys(attrClone).forEach((key) => {
    if (['style', 'id', 'class'].includes(attrClone[key].name)) {
      delete attrClone[key]
    }
  })
  return Object.values(<T>attrClone).reduce((acc: T, attr: Attr): T => {
    if (!attr.name) return acc
    if (attr.value === 'false') {
      acc[attr.name] = false
    } else {
      acc[attr.name] = attr.value || true
    }
    return acc
  }, {})
}
