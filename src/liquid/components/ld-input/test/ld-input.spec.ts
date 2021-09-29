import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../ld-input'

describe('ld-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input">
        <input>
      </ld-input>
    `)
  })

  it('renders as dark input with prop tone set to "dark"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input tone="dark"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input tone="dark" class="ld-input ld-input--dark">
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
      <ld-input value="yada-yada" class="ld-input">
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
    input.dispatchEvent(new Event('input'))
    await page.waitForChanges()
    expect(ldInput.value).toBe('yoda-yoda')

    expect(page.root).toEqualHtml(`
      <ld-input value="yoda-yoda" class="ld-input">
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
    input.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalled()

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldInput.addEventListener('blur', handlers.onBlur)
    input.dispatchEvent(new Event('blur'))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalled()
  })

  it('renders with slot start', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input class="ld-input">
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
      <ld-input class="ld-input">
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
      <ld-input class="ld-input">
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

  it('clicks the input on click of non-interactive elment inside the component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root
    const banana = ldInput.querySelector('#banana') as HTMLElement
    const input = ldInput.querySelector('input')

    input.click = jest.fn()
    banana.dispatchEvent(new Event('click', { bubbles: true }))

    expect(input.click).toHaveBeenCalled()
  })

  it('allows to set inner focus (input)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })

  it('allows to set inner focus (textarea)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input multiline />`,
    })
    const textarea = root.querySelector('textarea')

    textarea.focus = jest.fn()
    await root.focusInner()

    expect(textarea.focus).toHaveBeenCalled()
  })
})
