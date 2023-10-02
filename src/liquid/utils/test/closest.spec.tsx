import { closest } from '../closest'

describe('closest', () => {
  it('returns undefined if element has no closest method', () => {
    // Document has no closest method. However, in js-dom it has.
    // So we need to use a fake Document to have a realistic test.
    const docWithoutClosest = {
      getRootNode: document.getRootNode,
    } as Document

    expect(closest('html', docWithoutClosest)).toBe(undefined)
  })

  it('returns closest element if there is a closest element', () => {
    expect(closest('html', document.body)).toBe(document.documentElement)
  })

  it('returns closest element traversing shadow DOM boundaries', () => {
    class CustomElement extends HTMLElement {
      constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'closed' })

        const inner = document.createElement('span')
        inner.classList.add('inner')

        shadow.appendChild(inner)
      }
    }

    customElements.define('custom-element', CustomElement)

    const el = document.createElement('custom-element')
    document.body.appendChild(el)

    expect(closest('html', el.shadowRoot.querySelector('.inner'))).toBe(
      document.documentElement
    )
  })
})
