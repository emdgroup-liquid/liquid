import { newSpecPage } from '@stencil/core/testing'
import { LdButton } from '../ld-button'
import '../../../utils/mutationObserver'

let originalClickHiddenButton
const mockClickHiddenButton = (
  form: HTMLFormElement,
  buttonType: 'submit' | 'reset'
) => {
  originalClickHiddenButton = (
    LdButton.prototype as unknown as { clickHiddenButton: (ev) => void }
  ).clickHiddenButton
  jest
    .spyOn(
      LdButton.prototype as unknown as { clickHiddenButton: () => void },
      'clickHiddenButton'
    )
    .mockImplementation(() => {
      form.dispatchEvent(new Event(buttonType))
    })
}

const unmockClickHiddenButton = () => {
  if (originalClickHiddenButton) {
    ;(
      LdButton.prototype as unknown as { clickHiddenButton: () => void }
    ).clickHiddenButton = originalClickHiddenButton
  }
}

describe('ld-button', () => {
  afterEach(() => {
    unmockClickHiddenButton()
  })

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

  it('brand-color (default)', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button brand-color>Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('brand-color (secondary)', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="secondary" brand-color>Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('brand-color (ghost)', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="ghost" brand-color>Text</ld-button>`,
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

  it('danger-secondary', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="danger-secondary">Text</ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('icon only', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `
      <ld-button>
        <ld-icon name="placeholder"></ld-icon>
      </ld-button>`,
    })
    const button = page.root.shadowRoot.querySelector('button')
    expect(button).toHaveClass('ld-button--icon-only')
  })

  it('icon only without icon only class using internal prop', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `
      <ld-button icon-only="false">
        <ld-icon name="placeholder"></ld-icon>
      </ld-button>`,
    })
    const button = page.root.shadowRoot.querySelector('button')
    expect(button).not.toHaveClass('ld-button--icon-only')
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

  it('prevents default and propagation of click events, if disabled', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button disabled>Text</ld-button>`,
    })
    const ldButton = page.root

    const ev = new MouseEvent('click', { bubbles: true, cancelable: true })

    ldButton.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ev.defaultPrevented).toBeTruthy()
    expect(ev.cancelBubble).toBeTruthy()
  })

  it('prevents default and propagation of click events, if aria-disabled', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button aria-disabled="true">Text</ld-button>`,
    })
    const ldButton = page.root

    const ev = new MouseEvent('click', { bubbles: true, cancelable: true })

    ldButton.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ev.defaultPrevented).toBeTruthy()
    expect(ev.cancelBubble).toBeTruthy()
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

  it('should not throw when calling focus inner before hydration', () => {
    const ldButton = new LdButton()
    ldButton.focusInner()
  })

  describe('implicit form submission', () => {
    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('submits a form implicitly', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button>Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      mockClickHiddenButton(form, page.rootInstance.type)

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      jest.advanceTimersByTime(0)

      expect(submitHandler).toHaveBeenCalled()
    })

    it('does not submit a form as an anchor', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button href="#">Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      mockClickHiddenButton(form, page.rootInstance.type)

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      jest.advanceTimersByTime(0)

      expect(submitHandler).not.toHaveBeenCalled()
    })

    it('does not submit a form if event is prevented', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button>Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      mockClickHiddenButton(form, page.rootInstance.type)

      const ldButton = page.body.querySelector('ld-button')
      const submitHandler = jest.fn()

      form.addEventListener('submit', submitHandler)
      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      ldButton.dispatchEvent(ev)
      // preventing after dispatching only works with setTimeout implementation
      // which is required in order to check for ev.defaultPrevented
      ev.preventDefault()

      jest.advanceTimersByTime(0)

      expect(submitHandler).not.toHaveBeenCalled()
    })

    it('resets a form', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `<form><ld-button type="reset">Text</ld-button></form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      let resetClickEvent
      const clickHandler = (ev) => {
        if (ev.target.nodeName === 'BUTTON') {
          resetClickEvent = ev
        }
      }

      form.addEventListener('click', clickHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )

      jest.advanceTimersByTime(0)

      expect(resetClickEvent).toBeTruthy()
      expect(resetClickEvent.target.type).toEqual('reset')
    })

    it('resets a form via form prop', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `
          <div>
            <form id="yolo"></form>
            <ld-button type="reset" form="yolo">Text</ld-button>
          </div>`,
      })
      const form = page.body.querySelector('form')

      mockClickHiddenButton(form, 'reset')

      const ldButton = page.body.querySelector('ld-button')
      const resetHandler = jest.fn()

      form.addEventListener('reset', resetHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      jest.advanceTimersByTime(0)

      expect(resetHandler).toHaveBeenCalled()
    })

    it('applies form related props to form button', async () => {
      const page = await newSpecPage({
        components: [LdButton],
        html: `
          <form>
            <ld-button
              name="yolo"
              form="foobar"
              formaction="/do-stuff"
              formenctype="multipart/form-data"
              formmethod="post"
              formnovalidate
              formtarget="_self"
              type="submit"
              value="chacka">
              Text
            </ld-button>
          </form>`,
      })
      const form = page.body.querySelector('form')

      const ldButton = page.body.querySelector('ld-button')
      let submitClickEvent
      const clickHandler = (ev) => {
        if (ev.target.nodeName === 'BUTTON') {
          submitClickEvent = ev
        }
      }

      form.addEventListener('click', clickHandler)
      ldButton.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true })
      )
      jest.advanceTimersByTime(0)

      expect(submitClickEvent).toBeTruthy()
      expect(submitClickEvent.target.type).toEqual('submit')
      expect(submitClickEvent.target.getAttribute('form')).toEqual('foobar')
      expect(submitClickEvent.target.formAction).toEqual('/do-stuff')
      expect(submitClickEvent.target.formMethod).toEqual('post')
      expect(submitClickEvent.target.formNoValidate).toEqual('')
      expect(submitClickEvent.target.formTarget).toEqual('_self')
      expect(submitClickEvent.target.formEnctype).toEqual('multipart/form-data')
      expect(submitClickEvent.target.name).toEqual('yolo')
      expect(submitClickEvent.target.value).toEqual('chacka')
    })
  })

  it('clones attributes to inner button', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button size="sm" aria-label="yolo" hidden></ld-button>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
