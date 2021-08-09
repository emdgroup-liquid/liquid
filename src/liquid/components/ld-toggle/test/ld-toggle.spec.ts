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
      html: `<ld-toggle mode="large"></ld-toggle>`,
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

    const input = ldToggle.querySelector('input')
    expect(input).toHaveProperty('checked', false)

    input.checked = true
    input.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    expect(ldToggle.checked).toBe(true)

    expect(page.root).toMatchSnapshot()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.querySelector('input')

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
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldToggle.addEventListener('blur', handlers.onBlur)
    input.dispatchEvent(new Event('blur'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyBlur).toHaveBeenCalled()
  })

  it('prevents input value changes with an aria-disabled attribute', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle aria-disabled="true"></ld-toggle>`,
    })
    const ldToggle = page.root

    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.querySelector('input')

    input.checked = false
    input.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(ldToggle.checked).toBe(undefined)
    expect(page.root).toMatchSnapshot()
  })
})
