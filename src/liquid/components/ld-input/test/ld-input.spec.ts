import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../ld-input'

describe('ld-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders as dark input with prop tone set to "dark"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input tone="dark" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders type file', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders type file (multiline)', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" multiline />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('updates value prop on value change', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada" />`,
    })
    const ldInput = page.root
    expect(ldInput.value).toBe('yada-yada')

    const input = ldInput.shadowRoot.querySelector('input')
    expect(input.value).toBe('yada-yada')

    input.value = 'yoda-yoda'
    input.dispatchEvent(new Event('input'))
    await page.waitForChanges()

    expect(ldInput).toMatchSnapshot()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const ldInput = page.root
    const input = page.root.shadowRoot.querySelector('input')

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
    expect(page.root).toMatchSnapshot()
  })

  it('renders with slot end', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with both slots', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('focuses the input on click of non-interactive elment inside the component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root
    const banana = ldInput.querySelector('#banana') as HTMLElement
    const input = ldInput.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    banana.dispatchEvent(new Event('click', { bubbles: true }))
    ldInput.dispatchEvent(new Event('click'))

    expect(input.focus).toHaveBeenCalledTimes(2)
  })

  it('forwards click to input (default)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    const dispatchSpy = jest.spyOn(input, 'dispatchEvent')
    root.click()

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ bubbles: false })
    )
  })

  it('forwards click to input (multiline)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input multiline />`,
    })
    const textarea = root.shadowRoot.querySelector('textarea')

    textarea.focus = jest.fn()
    const dispatchSpy = jest.spyOn(textarea, 'dispatchEvent')
    root.click()

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ bubbles: false })
    )
  })

  it('allows to set inner focus (default)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })

  it('allows to set inner focus (multiline)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input multiline />`,
    })
    const textarea = root.shadowRoot.querySelector('textarea')

    textarea.focus = jest.fn()
    await root.focusInner()

    expect(textarea.focus).toHaveBeenCalled()
  })

  it('removes size from ld-icon web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <ld-icon name="placeholder" size="sm" slot="start"></ld-icon>
        <ld-icon name="placeholder" size="lg" slot="end"></ld-icon>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-icon css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <svg class="ld-icon ld-icon--sm" slot="start"></svg>
        <svg class="ld-icon ld-icon--lg" slot="end"></svg>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size on ld-icon web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <ld-icon name="placeholder" slot="start"></ld-icon>
        <ld-icon name="placeholder" size="lg" slot="end"></ld-icon>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size on ld-icon css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <svg class="ld-icon" slot="start"></svg>
        <svg class="ld-icon ld-icon--lg" slot="end"></svg>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-button web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <ld-button size="sm" slot="start">X</ld-button>
        <ld-button size="lg" slot="end">Y</ld-button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-button css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <button class="ld-button ld-button--sm" slot="start">X</button>
        <button class="ld-button ld-button--lg" slot="end">Y</button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size on ld-button web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <ld-button slot="start">X</ld-button>
        <ld-button size="lg" slot="end">Y</ld-button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size on ld-button css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <button class="ld-button" slot="start">X</button>
        <button class="ld-button ld-button--lg" slot="end">Y</button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
