import { JSXBase } from '@stencil/core/internal'

export const cloneAttributes = <B extends HTMLElement>(
  el: B,
  attributesToIgnore: string[] = []
) =>
  Object.values(el.attributes).reduce<JSXBase.HTMLAttributes<B>>(
    (acc, { name, value }) => {
      if (
        !name ||
        [
          'style',
          'id',
          'class',
          'slot',
          'part',
          ...attributesToIgnore,
        ].includes(name)
      ) {
        return acc
      }

      acc[name] = value || true

      return acc
    },
    {}
  )
