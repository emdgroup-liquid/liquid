import { newSpecPage } from '@stencil/core/testing'
import { LdRadio } from '../ld-radio'

describe('ld-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio>
        <mock:shadow-root>
          <div class="ld-radio" part="root">
            <input type="radio" part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
  })

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio disabled></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio disabled>
        <mock:shadow-root>
          <div class="ld-radio" part="root">
            <input type="radio" disabled part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
  })

  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="highlight"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio mode="highlight">
        <mock:shadow-root>
          <div class="ld-radio ld-radio--highlight" part="root">
            <input type="radio" part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
  })

  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="danger"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio mode="danger">
        <mock:shadow-root>
          <div class="ld-radio ld-radio--danger" part="root">
            <input type="radio" part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
  })

  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio tone="dark"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio tone="dark">
        <mock:shadow-root>
          <div class="ld-radio ld-radio--dark" part="root">
            <input type="radio" part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
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

    input.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(ldRadio.getAttribute('checked')).not.toBe(null)

    expect(page.root).toEqualHtml(`
      <ld-radio checked>
        <mock:shadow-root>
          <div class="ld-radio" part="root">
            <input checked type="radio" part="input focusable">
            <div class="ld-radio__dot" part="dot"></div>
            <div class="ld-radio__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-radio>
    `)
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

  it('allows to set inner focus', async () => {
    const { root } = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

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

    expect(ldRadios.length).toEqual(4)

    expect(ldRadios[0].getAttribute('checked')).toBe(null)
    expect(ldRadios[1].getAttribute('checked')).toBe(null)
    expect(ldRadios[2].getAttribute('checked')).not.toBe(null)
    expect(ldRadios[3].getAttribute('checked')).not.toBe(null)

    ldRadios[0].shadowRoot
      .querySelector('input')
      .dispatchEvent(new Event('click', { bubbles: true }))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(ldRadios[0].getAttribute('checked')).not.toBe(null)
    expect(ldRadios[1].getAttribute('checked')).toBe(null)
    expect(ldRadios[2].getAttribute('checked')).toBe(null)
    expect(ldRadios[3].getAttribute('checked')).not.toBe(null)
  })

  it('creates hidden input field, if inside a form', async () => {
    const { root } = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio /></form>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('sets initial state on hidden input', async () => {
    const { root } = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio name="example" checked required value="test" /></form>`,
    })
    expect(root.querySelector('input')).toHaveProperty('checked', true)
    expect(root.querySelector('input')).toHaveProperty('name', 'example')
    expect(root.querySelector('input')).toHaveProperty('required', true)
    expect(root.querySelector('input')).toHaveProperty('value', 'test')
  })

  it('updates hidden input field', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdRadio],
      html: `<form><ld-radio name="example" /></form>`,
    })
    const wrapper = root.shadowRoot.querySelector('> div')

    root.setAttribute('name', 'test')
    await waitForChanges()

    expect(root.querySelector('input')).toHaveProperty('value', '')
    expect(root.querySelector('input')).toHaveProperty('checked', false)
    expect(root.querySelector('input')).toHaveProperty('required', false)
    expect(root.querySelector('input')).toHaveProperty('name', '')

    wrapper.dispatchEvent(new Event('click'))
    root.setAttribute('required', '')
    await waitForChanges()

    expect(root.querySelector('input')).toHaveProperty('checked', true)
    expect(root.querySelector('input')).toHaveProperty('required', true)
    expect(root.querySelector('input')).toHaveProperty('value', 'on')

    root.setAttribute('name', '')
    root.setAttribute('value', 'test')
    await waitForChanges()

    expect(root.querySelector('input')).toHaveProperty('value', 'test')
    expect(root.querySelector('input')).toHaveProperty('checked', true)
    expect(root.querySelector('input')).toHaveProperty('name', '')

    root.setAttribute('name', 'test')
    await waitForChanges()

    expect(root.querySelector('input')).toHaveProperty('value', 'test')
    expect(root.querySelector('input')).toHaveProperty('checked', true)
    expect(root.querySelector('input')).toHaveProperty('name', 'test')

    root.setAttribute('value', '')
    await waitForChanges()

    expect(root.querySelector('input')).toHaveProperty('value', '')
    expect(root.querySelector('input')).toHaveProperty('checked', true)
    expect(root.querySelector('input')).toHaveProperty('name', 'test')
  })
})
