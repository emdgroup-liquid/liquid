import { newSpecPage } from '@stencil/core/testing'
import { LdToggle } from '../ld-toggle'

describe('ld-toggle', () => {
  it('renders correctly', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('allows for disable', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle disabled></ld-toggle>`,
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

    await input.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    expect(input).toHaveProperty('checked', true)

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
    await input.dispatchEvent(new Event('focus'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldToggle.addEventListener('blur', handlers.onBlur)
    await input.dispatchEvent(new Event('blur'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyBlur).toHaveBeenCalled()
  })

  it('does not prevent input value changes without an aria-disabled attribute', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root

    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.querySelector('input')

    await input.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(input).toHaveProperty('checked', true)
    expect(page.root).toMatchSnapshot()
  })

  it('prevents input value changes with an aria-disabled attribute', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle aria-disabled="true"></ld-toggle>`,
    })
    const ldToggle = page.root

    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.querySelector('input')

    await input.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(input).toHaveProperty('checked', false)
    expect(page.root).toMatchSnapshot()
  })
})
