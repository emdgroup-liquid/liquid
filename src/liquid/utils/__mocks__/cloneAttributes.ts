import { JSXBase } from '@stencil/core/internal'
import { MockAttr, MockHTMLElement } from '@stencil/core/mock-doc'

export const cloneAttributes = <B extends MockHTMLElement>(
  el: B,
  attributesToIgnore: string[] = []
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.values(el.attributes.__items as MockAttr[]).reduce<
    JSXBase.HTMLAttributes<B>
  >(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (acc, { _name: name, _value: value }) => {
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
