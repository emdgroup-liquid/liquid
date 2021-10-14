import { JSXBase } from '@stencil/core/internal'

export const cloneAttributes = <B extends HTMLElement>(el: B) =>
  Object.values(el.attributes).reduce<JSXBase.HTMLAttributes<B>>(
    (acc, attr) => {
      if (['style', 'id', 'class', 'slot'].includes(attr.name)) {
        return acc
      }

      acc[attr.name] = attr.value || true

      return acc
    },
    {}
  )
