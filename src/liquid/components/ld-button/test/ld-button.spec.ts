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
})
