import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../../ld-input/ld-input'
import { LdLabel } from '../ld-label'

describe('ld-label', () => {
  it('renders with slot', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label>Yada-yada</ld-label>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('renders with position left', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label position="left">Yada-yada</ld-label>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('renders with position right', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label position="right">Yada-yada</ld-label>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('renders with size "m"', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label size="m">Yada-yada</ld-label>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('clicks on associated input element, when label is clicked', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label size="m">
        <span>Label text</span>
        <input type="text" />
      </ld-label>`,
    })
    const input = root.querySelector('input')

    input.click = jest.fn()
    input.focus = jest.fn()
    // A click on the label actually triggers a click on the slot in the shadow DOM.
    root.shadowRoot.querySelector('slot').click()
    root.querySelector('span').click()

    expect(input.click).toHaveBeenCalledTimes(1)
  })

  it('focuses associated input element, when label is clicked', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label size="m">
        <span>Label text</span>
        <input type="text" />
      </ld-label>`,
    })
    const input = root.querySelector('input')

    input.click = jest.fn()
    input.focus = jest.fn()
    // A click on the label actually triggers a click on the slot in the shadow DOM.
    root.shadowRoot.querySelector('slot').click()
    root.querySelector('span').click()

    expect(input.focus).toHaveBeenCalledTimes(1)
  })

  it('focuses associated input web component, when label is clicked', async () => {
    const { root } = await newSpecPage({
      components: [LdInput, LdLabel],
      html: `<ld-label size="m">
        <span>Label text</span>
        <ld-input />
      </ld-label>`,
    })
    const input = root.querySelector('ld-input')

    input.click = jest.fn()
    input.focus = jest.fn()
    Object.defineProperty(input, 'focusInner', { value: jest.fn() })
    // A click on the label actually triggers a click on the slot in the shadow DOM.
    root.shadowRoot.querySelector('slot').click()
    root.querySelector('span').click()

    expect(input.focus).not.toHaveBeenCalled()
    expect(input.focusInner).toHaveBeenCalledTimes(1)
  })
})
