import { newSpecPage } from '@stencil/core/testing'
import { LdToggle } from '../ld-toggle'

describe('ld-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-toggle class="ld-toggle">
        <input type="toggle">
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
  })
  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle disabled></ld-toggle>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-toggle class="ld-toggle" disabled>
        <input type="toggle" disabled>
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
  })
  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle mode="highlight"></ld-toggle>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-toggle class="ld-toggle ld-toggle--highlight" mode="highlight">
        <input type="toggle">
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
  })
  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle mode="danger"></ld-toggle>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-toggle class="ld-toggle ld-toggle--danger" mode="danger">
        <input type="toggle">
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
  })
  it('tone', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle tone="dark"></ld-toggle>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-toggle class="ld-toggle ld-toggle--dark" tone="dark">
        <input type="toggle">
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
  })
  it('updates checked prop on checked value change', async () => {
    const page = await newSpecPage({
      components: [LdToggle],
      html: `<ld-toggle></ld-toggle>`,
    })
    const ldToggle = page.root
    expect(ldToggle.checked).toBe(undefined)

    const input = ldToggle.querySelector('input')
    expect(input.checked).toBe(false)

    input.checked = true
    await input.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    expect(ldToggle.checked).toBe(true)

    expect(page.root).toEqualHtml(`
      <ld-toggle checked class="ld-toggle">
        <input checked type="toggle">
        <svg class="ld-toggle__check" fill="none" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L5.40795 10L2 6.63964" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
        </svg>
        <div class="ld-toggle__box"></div>
      </ld-toggle>
    `)
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
})
