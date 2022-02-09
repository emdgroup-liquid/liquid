import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdToggle } from '../ld-toggle'
import '../../../utils/mutationObserver'

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
    expect(ldToggle.checked).toBe(false)

    const input = ldToggle.shadowRoot.querySelector('input')
    expect(input).toHaveProperty('checked', false)

    ldToggle.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(input).toHaveProperty('checked', true)
    expect(ldToggle.checked).toBe(true)
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits focus and blur events', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.shadowRoot.querySelector('input')

    const focusHandler = jest.fn()
    ldToggle.addEventListener('focus', focusHandler)
    input.dispatchEvent(
      new FocusEvent('focus', { bubbles: true, composed: true })
    )
    expect(focusHandler).toHaveBeenCalled()

    const blurHandler = jest.fn()
    ldToggle.addEventListener('blur', blurHandler)
    input.dispatchEvent(
      new FocusEvent('blur', { bubbles: true, composed: true })
    )
    expect(blurHandler).toHaveBeenCalled()
  })

  it('emits change and ldchange events', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.shadowRoot.querySelector('input')
    const changeHandler = jest.fn()
    const ldchangeHandler = jest.fn()

    ldToggle.addEventListener('change', changeHandler)
    ldToggle.addEventListener('ldchange', ldchangeHandler)
    input.dispatchEvent(new InputEvent('change', { bubbles: true }))

    expect(changeHandler).toHaveBeenCalled()
    expect(ldchangeHandler).toHaveBeenCalled()
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits input event', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.shadowRoot.querySelector('input')

    const inputHandler = jest.fn()
    ldToggle.addEventListener('input', inputHandler)
    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    expect(inputHandler).toHaveBeenCalled()
  })

  it('emits ldinput event', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const input = ldToggle.shadowRoot.querySelector('input')

    const ldinputHandler = jest.fn()
    ldToggle.addEventListener('ldinput', ldinputHandler)
    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    expect(ldinputHandler).toHaveBeenCalled()
  })

  it('emits events on programmatic click', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    const changeHandler = jest.fn()
    const ldchangeHandler = jest.fn()
    const inputHandler = jest.fn()
    const ldinputHandler = jest.fn()

    ldToggle.addEventListener('change', changeHandler)
    ldToggle.addEventListener('ldchange', ldchangeHandler)
    ldToggle.addEventListener('input', inputHandler)
    ldToggle.addEventListener('ldinput', ldinputHandler)
    ldToggle.click()

    expect(changeHandler).toHaveBeenCalled()
    expect(ldchangeHandler).toHaveBeenCalled()
    expect(inputHandler).toHaveBeenCalled()
    expect(ldinputHandler).toHaveBeenCalled()
  })

  it('prevents input value changes with an aria-disabled attribute', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle aria-disabled="true"></ld-toggle>`,
    })
    const ldToggle = page.root

    expect(ldToggle.checked).toBe(false)

    const input = ldToggle.shadowRoot.querySelector('input')

    ldToggle.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(input).toHaveProperty('checked', false)
    expect(ldToggle.checked).toBe(false)
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
    ldToggle.name = undefined
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
    ldToggle.value = undefined
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
