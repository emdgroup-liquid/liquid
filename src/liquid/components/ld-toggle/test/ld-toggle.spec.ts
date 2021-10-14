import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdToggle } from '../ld-toggle'

describe('ld-toggle', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle disabled></ld-toggle>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders large mode', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle size="lg"></ld-toggle>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with icons', async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdToggle],
      html: `<ld-toggle>
        <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
        <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
      </ld-toggle>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('updates checked prop on checked value change', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.shadowRoot.querySelector('input')
    expect(input).toHaveProperty('checked', false)

    ldToggle.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(input).toHaveProperty('checked', true)
    expect(ldToggle.checked).toBe(true)

    expect(page.root).toMatchSnapshot()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.shadowRoot.querySelector('input')

    const handlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldToggle.addEventListener('focus', handlers.onFocus)
    input.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldToggle.addEventListener('blur', handlers.onBlur)
    input.dispatchEvent(new Event('blur'))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalled()
  })

  it('prevents input value changes with an aria-disabled attribute', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle aria-disabled="true"></ld-toggle>`,
    })
    const ldToggle = page.root

    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.shadowRoot.querySelector('input')

    ldToggle.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(input).toHaveProperty('checked', false)
    expect(ldToggle.checked).toBe(undefined)
    expect(page.root).toMatchSnapshot()
  })

  it('allows to set inner focus', async () => {
    const { root } = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })
})
