import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../../ld-input/ld-input'
import { LdCheckbox } from '../../ld-checkbox/ld-checkbox'
import { LdLabel } from '../ld-label'
import '../../../utils/mutationObserver'

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
      html: `<ld-label>
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

  it('clicks on associated web component, when label is clicked', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox, LdLabel],
      html: `<ld-label>
        <span>Label text</span>
        <ld-checkbox></ld-checkbox>
      </ld-label>`,
    })
    const ldLabel = page.root
    const ldCheckbox = ldLabel.querySelector('ld-checkbox')

    ldCheckbox.click = jest.fn()
    ldCheckbox.shadowRoot.querySelector('input').focus = jest.fn()
    // A click on the label actually triggers a click on the slot in the shadow DOM.
    ldLabel.shadowRoot.querySelector('slot').click()
    ldLabel.querySelector('span').click()

    await page.waitForChanges()

    expect(ldCheckbox.click).toHaveBeenCalledTimes(1)
  })

  it('focuses associated input element, when label is clicked', async () => {
    const { root } = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label>
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
      html: `<ld-label>
        <span>Label text</span>
        <ld-input />
      </ld-label>`,
    })
    const ldInput = root.querySelector('ld-input')

    ldInput.click = jest.fn()
    ldInput.focus = jest.fn()
    Object.defineProperty(ldInput, 'focusInner', { value: jest.fn() })
    // A click on the label actually triggers a click on the slot in the shadow DOM.
    root.shadowRoot.querySelector('slot').click()
    root.querySelector('span').click()

    expect(ldInput.focus).not.toHaveBeenCalled()
    expect(ldInput.focusInner).toHaveBeenCalledTimes(1)
  })
})
