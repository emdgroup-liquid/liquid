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

  it('emits input event on click', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle />`,
    })
    const ldCheckbox = page.root

    const spyInput = jest.fn()
    ldCheckbox.addEventListener('input', spyInput)
    ldCheckbox.click()

    expect(spyInput).toHaveBeenCalled()
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

  it('creates hidden input field, if inside a form', async () => {
    const { root } = await newSpecPage({
      components: [LdToggle],
      html: `<form><ld-toggle name="example" /></form>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('sets initial state on hidden input', async () => {
    const { root } = await newSpecPage({
      components: [LdToggle],
      html: `<form><ld-toggle name="example" checked /></form>`,
    })
    expect(root.querySelector('input')).toHaveProperty('name', 'example')
  })

  it('updates hidden input field', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdToggle],
      html: `<form><ld-toggle name="example" /></form>`,
    })
    const ldToggle = root
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('name', 'example')
    expect(ldToggle.querySelector('input')).toHaveProperty('checked', false)

    ldToggle.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('name', 'test')

    ldToggle.removeAttribute('name')
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toEqual(null)

    ldToggle.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('name', 'test')

    ldToggle.dispatchEvent(new Event('click'))
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('checked', true)

    ldToggle.setAttribute('value', 'test')
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('value', 'test')

    ldToggle.removeAttribute('value')
    await waitForChanges()

    expect(ldToggle.querySelector('input').getAttribute('value')).toEqual(null)
  })

  it('uses hidden input field with referenced form', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdToggle],
      html: '<ld-toggle name="example" form="yolo" />',
    })
    const ldToggle = root
    await waitForChanges()

    expect(ldToggle.querySelector('input')).toHaveProperty('name', 'example')
  })
})
