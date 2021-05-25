import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../ld-input'

describe('ld-input', () => {
  it('renders as dark input by default', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input ld-input--dark">
        <input>
      </ld-input>
    `)
  })
  it('renders as dark input with prop mode set to "dark"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input mode="dark"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input mode="dark" class="ld-input ld-input--dark">
        <input>
      </ld-input>
    `)
  })
  it('renders as light input with prop mode set to "light"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input mode="light"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input mode="light" class="ld-input ld-input--light">
        <input>
      </ld-input>
    `)
  })
  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input value="yada-yada" class="ld-input ld-input--dark">
        <input value="yada-yada">
      </ld-input>
    `)
  })
  it('updates value prop on value change', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada"></ld-input>`,
    })
    const ldInput = page.root
    expect(ldInput.value).toBe('yada-yada')

    const input = page.root.querySelector('input')
    expect(input.value).toBe('yada-yada')

    input.value = 'yoda-yoda'
    await input.dispatchEvent(new Event('input'))
    await page.waitForChanges()
    expect(ldInput.value).toBe('yoda-yoda')

    expect(page.root).toEqualHtml(`
      <ld-input value="yoda-yoda" class="ld-input ld-input--dark">
        <input value="yoda-yoda">
      </ld-input>
    `)
  })
  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input></ld-input>`,
    })
    const ldInput = page.root
    const input = page.root.querySelector('input')

    const handlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldInput.addEventListener('focus', handlers.onFocus)
    await input.dispatchEvent(new Event('focus'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldInput.addEventListener('blur', handlers.onBlur)
    await input.dispatchEvent(new Event('blur'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyBlur).toHaveBeenCalled()
  })
  it('renders with slot start', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input ld-input--dark">
        <span slot="start">
          hi
        </span>
        <input>
      </ld-input>
    `)
  })
  it('renders with slot end', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input ld-input--dark">
        <input>
        <span slot="end">
          hello
        </span>
      </ld-input>
    `)
  })
  it('renders with both slots', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input ld-input--dark">
        <span slot="start">
          hi
        </span>
        <input>
        <span slot="end">
          hello
        </span>
      </ld-input>
    `)
  })
  it('focuses the input on click of non-interactive elment inside the component', async () => {
    const handlers = {
      onFocus() {
        return
      },
    }
    // Mocking focus due to unresolved issue "Jest throwing TypeError: this.inputEl.focus is not a function"
    // See https://github.com/ionic-team/stencil/issues/1964
    const prevProtoFocus = HTMLInputElement.prototype.focus
    HTMLInputElement.prototype.focus = () => {
      handlers.onFocus()
    }
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root

    const banana = ldInput.querySelector('#banana')

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldInput.addEventListener('focus', handlers.onFocus)
    await new Promise((resolve) => setTimeout(resolve))
    ;(banana as HTMLElement).click()
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalled()

    HTMLInputElement.prototype.focus = prevProtoFocus
  })
})
