import { JSXBase } from '@stencil/core/internal'
import { MockAttr, MockHTMLElement } from '@stencil/core/mock-doc'

export const cloneAttributes = <B extends MockHTMLElement>(
  el: B,
  attributesToIgnore: string[] = []
) =>
  // TODO: Remove as soon as Stencil properly typed MockHTMLElement
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // Property '__items' does not exist on type 'MockAttributeMap'.ts(2339)
  Object.values(el.attributes.__items as MockAttr[]).reduce<
    JSXBase.HTMLAttributes<B>
  >(
    // TODO: Remove as soon as Stencil properly typed MockAttr
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // Property '_name' does not exist on type 'MockAttr'.ts(2339)
    // Property '_value' does not exist on type 'MockAttr'.ts(2339)
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
