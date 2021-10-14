import { newSpecPage } from '@stencil/core/testing'
import { LdCheckbox } from '../ld-checkbox'

const checkIcon = `
  <svg part="check" class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
  </svg>`

describe('ld-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox>
        <mock:shadow-root>
          <div class="ld-checkbox" part="root">
            <input type="checkbox" part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox disabled></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox disabled>
        <mock:shadow-root>
          <div class="ld-checkbox" part="root">
            <input type="checkbox" disabled part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="highlight"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox mode="highlight">
        <mock:shadow-root>
          <div class="ld-checkbox ld-checkbox--highlight" part="root">
            <input type="checkbox" part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="danger"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox mode="danger">
        <mock:shadow-root>
          <div class="ld-checkbox ld-checkbox--danger" part="root">
            <input type="checkbox" part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox tone="dark"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox tone="dark">
        <mock:shadow-root>
          <div class="ld-checkbox ld-checkbox--dark" part="root">
            <input type="checkbox" part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('updates checked prop on checked value change', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    expect(ldCheckbox.checked).toBe(undefined)

    const input = ldCheckbox.shadowRoot.querySelector('input')
    expect(input.checked).toBe(false)

    input.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(ldCheckbox.checked).toBe(true)

    expect(page.root).toEqualHtml(`
      <ld-checkbox checked>
        <mock:shadow-root>
          <div class="ld-checkbox" part="root">
            <input checked type="checkbox" part="input focusable">
            ${checkIcon}
            <div class="ld-checkbox__box" part="box"></div>
          </div>
        </mock:shadow-root>
      </ld-checkbox>
    `)
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.shadowRoot.querySelector('input')

    const handlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldCheckbox.addEventListener('focus', handlers.onFocus)
    input.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldCheckbox.addEventListener('blur', handlers.onBlur)
    input.dispatchEvent(new Event('blur'))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalled()
  })

  it('allows to set inner focus', async () => {
    const { root } = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })
})
