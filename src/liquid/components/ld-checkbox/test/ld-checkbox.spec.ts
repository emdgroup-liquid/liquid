import { newSpecPage } from '@stencil/core/testing'
import { LdCheckbox } from '../ld-checkbox'

describe('ld-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox class="ld-checkbox">
        <input type="checkbox">
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
      </ld-checkbox>
    `)
  })
  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox disabled></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox class="ld-checkbox" disabled>
        <input type="checkbox" disabled>
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
      </ld-checkbox>
    `)
  })
  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="highlight"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox class="ld-checkbox ld-checkbox--highlight" mode="highlight">
        <input type="checkbox">
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
      </ld-checkbox>
    `)
  })
  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox mode="danger"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox class="ld-checkbox ld-checkbox--danger" mode="danger">
        <input type="checkbox">
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
      </ld-checkbox>
    `)
  })
  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox tone="dark"></ld-checkbox>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-checkbox class="ld-checkbox ld-checkbox--dark" tone="dark">
        <input type="checkbox">
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
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

    const input = ldCheckbox.querySelector('input')
    expect(input.checked).toBe(false)

    input.checked = true
    input.dispatchEvent(new Event('click', { bubbles: true }))
    await page.waitForChanges()
    expect(ldCheckbox.checked).toBe(true)

    expect(page.root).toEqualHtml(`
      <ld-checkbox checked class="ld-checkbox">
        <input checked type="checkbox">
        <svg class="ld-checkbox__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-checkbox__box"></div>
      </ld-checkbox>
    `)
  })
  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdCheckbox],
      html: `<ld-checkbox></ld-checkbox>`,
    })
    const ldCheckbox = page.root
    const input = ldCheckbox.querySelector('input')

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
    const input = root.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })
})
