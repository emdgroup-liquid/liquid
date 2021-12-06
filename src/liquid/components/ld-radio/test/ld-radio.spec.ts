import { newSpecPage } from '@stencil/core/testing'
import { LdRadio } from '../ld-radio'

describe('ld-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio disabled></ld-radio>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="highlight"></ld-radio>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="danger"></ld-radio>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio tone="dark"></ld-radio>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('updates checked prop on checked value change', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    const ldRadio = page.root
    expect(ldRadio.checked).toBe(undefined)

    const input = ldRadio.shadowRoot.querySelector('input')
    expect(input.checked).toBe(false)

    ldRadio.click()
    await page.waitForChanges()

    expect(ldRadio.getAttribute('checked')).not.toBe(null)
    expect(input.checked).toBe(true)
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    const ldRadio = page.root
    const input = ldRadio.shadowRoot.querySelector('input')

    const handlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldRadio.addEventListener('focus', handlers.onFocus)
    input.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldRadio.addEventListener('blur', handlers.onBlur)
    input.dispatchEvent(new Event('blur'))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalled()
  })

  it('emits input event on click', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio />`,
    })
    const ldRadio = page.root

    const spyInput = jest.fn()
    ldRadio.addEventListener('input', spyInput)
    ldRadio.click()

    expect(spyInput).toHaveBeenCalled()
  })

  it('allows to set inner focus', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio />`,
    })
    const ldRadio = page.root
    const input = ldRadio.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await ldRadio.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })

  it('unchecks radios with same name when checked', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `
        <ld-radio name="foo" />
        <ld-radio name="bar" />
        <ld-radio name="foo" checked />
        <ld-radio name="baz" checked />
      `,
    })

    const ldRadios = Array.from(page.body.querySelectorAll('ld-radio'))

    expect(ldRadios[0].getAttribute('checked')).toBe(null)
    expect(ldRadios[1].getAttribute('checked')).toBe(null)
    expect(ldRadios[2].getAttribute('checked')).not.toBe(null)
    expect(ldRadios[3].getAttribute('checked')).not.toBe(null)

    ldRadios[0].click()
    await page.waitForChanges()

    expect(ldRadios[0].getAttribute('checked')).not.toBe(null)
    expect(ldRadios[1].getAttribute('checked')).toBe(null)
    expect(ldRadios[2].getAttribute('checked')).toBe(null)
    expect(ldRadios[3].getAttribute('checked')).not.toBe(null)
  })

  it('moves focus and selection', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `
        <ld-radio name="foo" checked />
        <ld-radio name="bar" />
        <ld-radio name="foo" />
        <ld-radio name="baz" />
        <ld-radio name="foo" />
      `,
    })

    const ldRadios = Array.from(page.body.querySelectorAll('ld-radio'))
    const radios = ldRadios.map((ldRadio) =>
      ldRadio.shadowRoot.querySelector('input')
    )
    ldRadios.forEach((ldRadio) => {
      ldRadio.click = jest.fn()
    })
    radios.forEach((radio) => {
      radio.focus = jest.fn()
    })

    radios[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    ) // nothing shall happen
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(0)

    expect(radios[0].focus).toHaveBeenCalledTimes(0)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(0)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(0)

    radios[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(1)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(0)

    expect(radios[0].focus).toHaveBeenCalledTimes(0)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(1)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(0)

    radios[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(1)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(1)

    expect(radios[0].focus).toHaveBeenCalledTimes(0)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(1)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(1)

    radios[4].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(1)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(1)

    expect(radios[0].focus).toHaveBeenCalledTimes(0)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(1)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(1)

    radios[4].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(2)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(1)

    expect(radios[0].focus).toHaveBeenCalledTimes(0)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(2)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(1)

    radios[2].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(1)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(2)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(1)

    expect(radios[0].focus).toHaveBeenCalledTimes(1)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(2)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(1)

    radios[0].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldRadios[0].click).toHaveBeenCalledTimes(1)
    expect(ldRadios[1].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[2].click).toHaveBeenCalledTimes(2)
    expect(ldRadios[3].click).toHaveBeenCalledTimes(0)
    expect(ldRadios[4].click).toHaveBeenCalledTimes(1)

    expect(radios[0].focus).toHaveBeenCalledTimes(1)
    expect(radios[1].focus).toHaveBeenCalledTimes(0)
    expect(radios[2].focus).toHaveBeenCalledTimes(2)
    expect(radios[3].focus).toHaveBeenCalledTimes(0)
    expect(radios[4].focus).toHaveBeenCalledTimes(1)
  })

  it('creates hidden input field, if inside a form', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio name="example" /></form>`,
    })
    const ldRadio = page.root
    expect(ldRadio).toMatchSnapshot()
  })

  it('sets initial state on hidden input', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio name="example" checked value="test" /></form>`,
    })
    const ldRadio = page.root
    expect(ldRadio.querySelector('input')).toHaveProperty('checked', true)
    expect(ldRadio.querySelector('input')).toHaveProperty('name', 'example')
    expect(ldRadio.querySelector('input')).toHaveProperty('value', 'test')
  })

  it('updates hidden input field', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio name="example" /></form>`,
    })
    const ldRadio = root
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('name', 'example')
    expect(ldRadio.querySelector('input')).toHaveProperty('checked', false)

    ldRadio.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('name', 'test')

    ldRadio.removeAttribute('name')
    ldRadio.name = undefined
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toEqual(null)

    ldRadio.setAttribute('name', 'test')
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('name', 'test')

    ldRadio.dispatchEvent(new Event('click'))
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('checked', true)

    ldRadio.setAttribute('value', 'test')
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('value', 'test')

    ldRadio.removeAttribute('value')
    ldRadio.value = undefined
    await waitForChanges()

    expect(ldRadio.querySelector('input').getAttribute('value')).toEqual(null)
  })

  it('uses hidden input field with referenced form', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdRadio],
      html: '<ld-radio name="example" form="yolo" />',
    })
    const ldRadio = root
    await waitForChanges()

    expect(ldRadio.querySelector('input')).toHaveProperty('name', 'example')
  })
})
