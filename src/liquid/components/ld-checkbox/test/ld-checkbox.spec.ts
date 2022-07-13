import { newSpecPage } from '@stencil/core/testing'
import { LdCheckbox } from '../ld-checkbox'
import '../../../utils/mutationObserver'

describe('ld-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox disabled></ld-checkbox>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="highlight"></ld-checkbox>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="danger"></ld-checkbox>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox tone="dark"></ld-checkbox>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('updates checked prop on checked value change', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    expect(ldCheckbox.checked).toBe(false)

    const input = ldCheckbox.shadowRoot.querySelector('input')
    expect(input.checked).toBe(false)

    ldCheckbox.click()
    await page.waitForChanges()

    expect(ldCheckbox.checked).toBe(true)
    expect(input.checked).toBe(true)
  })

  it('prevents changes if disabled', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox disabled></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    expect(ldCheckbox.checked).toBe(false)

    const input = ldCheckbox.shadowRoot.querySelector('input')
    expect(input.checked).toBe(false)

    ldCheckbox.click()
    await page.waitForChanges()

    expect(ldCheckbox.checked).toBe(false)
    expect(input.checked).toBe(false)
  })

  it('prevents changes if aria-disabled', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox aria-disabled="true"></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    expect(ldCheckbox.checked).toBe(false)

    const input = ldCheckbox.shadowRoot.querySelector('input')
    expect(input.checked).toBe(false)

    ldCheckbox.click()
    await page.waitForChanges()

    expect(ldCheckbox.checked).toBe(false)
    expect(input.checked).toBe(false)
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits focus and blur events', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    const focusHandler = jest.fn()
    ldCheckbox.addEventListener('focus', focusHandler)
    input.dispatchEvent(new FocusEvent('focus'))
    jest.advanceTimersByTime(0)
    expect(focusHandler).toHaveBeenCalled()

    const blurHandler = jest.fn()
    ldCheckbox.addEventListener('blur', blurHandler)
    input.dispatchEvent(new FocusEvent('blur'))
    jest.advanceTimersByTime(0)
    expect(blurHandler).toHaveBeenCalled()
  })

  it('emits change and ldchange events', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    const changeHandler = jest.fn()
    ldCheckbox.addEventListener('change', changeHandler)
    const ldchangeHandler = jest.fn()
    ldCheckbox.addEventListener('ldchange', ldchangeHandler)

    input.dispatchEvent(new InputEvent('change', { bubbles: true }))
    expect(changeHandler).toHaveBeenCalled()
    expect(ldchangeHandler).toHaveBeenCalled()
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits input event', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    const inputHandler = jest.fn()
    ldCheckbox.addEventListener('input', inputHandler)

    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    expect(inputHandler).toHaveBeenCalled()
  })

  it('emits ldinput event', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    const ldinputHandler = jest.fn()
    ldCheckbox.addEventListener('ldinput', ldinputHandler)

    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    expect(ldinputHandler).toHaveBeenCalled()
  })

  it('emits events on programmatic click', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const changeHandler = jest.fn()
    const ldchangeHandler = jest.fn()
    const inputHandler = jest.fn()
    const ldinputHandler = jest.fn()

    ldCheckbox.addEventListener('change', changeHandler)
    ldCheckbox.addEventListener('ldchange', ldchangeHandler)
    ldCheckbox.addEventListener('input', inputHandler)
    ldCheckbox.addEventListener('ldinput', ldinputHandler)
    ldCheckbox.click()

    expect(changeHandler).toHaveBeenCalled()
    expect(ldchangeHandler).toHaveBeenCalled()
    expect(inputHandler).toHaveBeenCalled()
    expect(ldinputHandler).toHaveBeenCalled()
  })

  it('allows to set inner focus', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox />`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await ldCheckbox.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })

  it('creates hidden input field, if inside a form', async () => {
    const { root } = await newSpecPage({
      components: [LdCheckbox],
      html: `<form><ld-checkbox name="example" /></form>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('sets initial state on hidden input', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: '<form><ld-checkbox name="example" checked value="yolo" /></form>',
    })
    const ldCheckbox = page.root
    expect(ldCheckbox.querySelector('input')).toHaveProperty('name', 'example')
    expect(ldCheckbox.querySelector('input')).toHaveProperty('value', 'yolo')
  })

  it('updates hidden input field', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdCheckbox],
      html: `<form><ld-checkbox name="example" /></form>`,
    })
    const ldCheckbox = root
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('name', 'example')
    expect(ldCheckbox.querySelector('input')).toHaveProperty('checked', false)

    ldCheckbox.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('name', 'test')

    ldCheckbox.removeAttribute('name')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toEqual(null)

    ldCheckbox.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('name', 'test')

    ldCheckbox.dispatchEvent(new Event('click'))
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('checked', true)

    ldCheckbox.setAttribute('value', 'test')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('value', 'test')

    ldCheckbox.setAttribute('form', 'my-form')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('form', 'my-form')

    ldCheckbox.removeAttribute('form')
    await waitForChanges()

    expect(ldCheckbox.querySelector('input').getAttribute('form')).toEqual(null)

    ldCheckbox.removeAttribute('value')
    ldCheckbox.value = undefined
    await waitForChanges()

    expect(ldCheckbox.querySelector('input').getAttribute('value')).toEqual(
      null
    )
  })

  it('removes hidden input field with removal of form prop when there is no outer form', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox name="example" form="my-form" />`,
    })
    const ldCheckbox = root
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('form', 'my-form')

    ldCheckbox.removeAttribute('form')
    await waitForChanges()

    expect(ldCheckbox.querySelectorAll('input').length).toEqual(0)
  })

  it('uses hidden input field with referenced form', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdCheckbox],
      html: '<ld-checkbox name="example" form="yolo" />',
    })
    const ldCheckbox = root
    await waitForChanges()

    expect(ldCheckbox.querySelector('input')).toHaveProperty('name', 'example')
  })

  describe('autofocus', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('sets focus if element is first with autofocus in DOM', async () => {
      const page = await newSpecPage({
        components: [LdCheckbox],
        html: `<ld-checkbox autofocus />`,
      })
      const ldCheckbox = page.root as HTMLLdCheckboxElement
      const input = ldCheckbox.shadowRoot.querySelector('input')
      jest
        .spyOn(document, 'querySelectorAll')
        .mockImplementation(() => page.body.querySelectorAll('*'))

      input.focus = jest.fn()

      jest.advanceTimersByTime(200)
      await page.waitForChanges()

      expect(input.focus).toHaveBeenCalled()
    })

    it('does not set focus if element is not first with autofocus in DOM', async () => {
      const page = await newSpecPage({
        components: [LdCheckbox],
        html: `
          <form>
            <input type="text" name="yolo" autofocus />
            <ld-checkbox autofocus />
          </form>`,
      })
      const ldCheckbox = page.root as HTMLLdCheckboxElement
      const input = ldCheckbox.shadowRoot.querySelector('input')
      jest
        .spyOn(document, 'querySelectorAll')
        .mockImplementation(() => page.body.querySelectorAll('form *'))

      input.focus = jest.fn()

      jest.advanceTimersByTime(200)
      await page.waitForChanges()

      expect(input.focus).not.toHaveBeenCalled()
    })
  })
})
