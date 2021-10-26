import { newSpecPage } from '@stencil/core/testing'
import { LdButton } from '../ld-button'

describe('ld-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button disabled>Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('highlight', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="highlight">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('secondary', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="secondary">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('on-brand-color', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="on-brand-color">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('secondary-on-brand-color', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="secondary-on-brand-color">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('ghost', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="ghost">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="danger">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('size', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button size="sm">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('justify content', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button justify-content="end">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('align text', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button align-text="right">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('as anchor', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button href="#" target="_blank">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('as progress button', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button progress="0.75">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('as progress button pending', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button progress="pending">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('allows adding click handlers', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button disabled>Text</ld-button>`,
    })
    const ldButton = page.root
    const clickHandler = jest.fn()

    ldButton.addEventListener('click', clickHandler)
    ldButton.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )

    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  xit('prevents click handlers from being invoked, if disabled', async () => {
    // FIXME: the event handlers being called might be a stencil "jsdom" issue
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button disabled>Text</ld-button>`,
    })
    const ldButton = page.root
    const clickHandler = jest.fn()

    ldButton.addEventListener('click', clickHandler)
    ldButton.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )

    expect(clickHandler).not.toHaveBeenCalled()
  })

  xit('prevents click handlers from being invoked, if aria-disabled', async () => {
    // FIXME: the event handlers being called might be a stencil "jsdom" issue
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button aria-disabled="true">Text</ld-button>`,
    })
    const ldButton = page.root
    const clickHandler = jest.fn()

    ldButton.addEventListener('click', clickHandler)
    ldButton.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true })
    )

    expect(clickHandler).not.toHaveBeenCalled()
  })

  it('allows to set inner focus', async () => {
    const { root } = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Text</ld-button>`,
    })
    const button = root.shadowRoot.querySelector('button')

    button.focus = jest.fn()
    await root.focusInner()

    expect(button.focus).toHaveBeenCalled()
  })

  describe('implicit form submission', () => {
    beforeAll(() => {
      // Mock clickFakeButton (actual implementation tested in e2e test).
      jest
        .spyOn(
          (LdButton.prototype as unknown) as { clickFakeButton },
          'clickFakeButton'
        )
        .mockImplementation(
          (form: HTMLFormElement, buttonType: 'submit' | 'reset') => {
            form.dispatchEvent(new Event(buttonType))
          }
        )
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('submits a form implicitly', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button>Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()
      const resetHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      form.addEventListener('reset', resetHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      jest.advanceTimersByTime(0)

      expect(submitHandler).toHaveBeenCalled()
      expect(resetHandler).not.toHaveBeenCalled()
    })

    it('does not submit a form as an anchor', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button href="#">Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()
      const resetHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      form.addEventListener('reset', resetHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      expect(submitHandler).not.toHaveBeenCalled()
      expect(resetHandler).not.toHaveBeenCalled()
    })

    it('does not submit a form if event is prevented', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button>Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()
      const resetHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      form.addEventListener('reset', resetHandler)
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      ev.preventDefault()
      ldButton.dispatchEvent(ev)

      expect(submitHandler).not.toHaveBeenCalled()
      expect(resetHandler).not.toHaveBeenCalled()
    })

    it('resets a form', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button type="reset">Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()
      const resetHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      form.addEventListener('reset', resetHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      jest.advanceTimersByTime(0)

      expect(submitHandler).not.toHaveBeenCalled()
      expect(resetHandler).toHaveBeenCalled()
    })
  })
})
