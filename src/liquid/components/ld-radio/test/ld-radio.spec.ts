import { newSpecPage } from '@stencil/core/testing'
import { LdRadio } from '../ld-radio'

describe('ld-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio class="ld-radio">
        <input type="radio">
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </ld-radio>
    `)
  })
  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio disabled></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio class="ld-radio" disabled>
        <input type="radio" disabled>
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </ld-radio>
    `)
  })
  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="highlight"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio class="ld-radio ld-radio--highlight" mode="highlight">
        <input type="radio">
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </ld-radio>
    `)
  })
  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio mode="danger"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio class="ld-radio ld-radio--danger" mode="danger">
        <input type="radio">
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </ld-radio>
    `)
  })
  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio tone="dark"></ld-radio>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-radio class="ld-radio ld-radio--dark" tone="dark">
        <input type="radio">
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
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

    const input = ldRadio.querySelector('input')
    expect(input.checked).toBe(false)

    input.checked = true
    input.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(ldRadio.checked).toBe(true)

    expect(page.root).toEqualHtml(`
      <ld-radio checked class="ld-radio">
        <input checked type="radio">
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </ld-radio>
    `)
  })
  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdRadio],
      html: `<ld-radio></ld-radio>`,
    })
    const ldRadio = page.root
    const input = ldRadio.querySelector('input')

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
    const input = root.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })
})
