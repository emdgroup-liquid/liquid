import { newSpecPage } from '@stencil/core/testing'
import { LdButton } from '../ld-button'

describe('ld-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button>
        <button aria-live="polite" class="ld-button">
          Text
        </button>
      </ld-button>
    `)
  })
  it('disabled', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button disabled>Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button disabled>
        <button aria-live="polite" aria-disabled="true" class="ld-button" disabled>
          Text
        </button>
      </ld-button>
    `)
  })
  it('heighlight', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="highlight">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="highlight">
        <button aria-live="polite" class="ld-button ld-button--highlight">
          Text
        </button>
      </ld-button>
    `)
  })
  it('secondary', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="secondary">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="secondary">
        <button aria-live="polite" class="ld-button ld-button--secondary">
          Text
        </button>
      </ld-button>
    `)
  })
  it('on-brand-color', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="on-brand-color">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="on-brand-color">
        <button aria-live="polite" class="ld-button ld-button--on-brand-color">
          Text
        </button>
      </ld-button>
    `)
  })
  it('secondary-on-brand-color', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="secondary-on-brand-color">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="secondary-on-brand-color">
        <button aria-live="polite" class="ld-button ld-button--secondary-on-brand-color">
          Text
        </button>
      </ld-button>
    `)
  })
  it('ghost', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="ghost">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="ghost">
        <button aria-live="polite" class="ld-button ld-button--ghost">
          Text
        </button>
      </ld-button>
    `)
  })
  it('danger', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button mode="danger">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button mode="danger">
        <button aria-live="polite" class="ld-button ld-button--danger">
          Text
        </button>
      </ld-button>
    `)
  })
  it('size', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button size="sm">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button size="sm">
        <button aria-live="polite" class="ld-button ld-button--sm">
          Text
        </button>
      </ld-button>
    `)
  })
  it('justify content', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button justify-content="end">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button justify-content="end">
        <button aria-live="polite" class="ld-button ld-button--justify-end">
          Text
        </button>
      </ld-button>
    `)
  })
  it('align text', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button align-text="right">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button align-text="right">
        <button aria-live="polite" class="ld-button ld-button--align-text-right">
          Text
        </button>
      </ld-button>
    `)
  })
  it('as anchor', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button href="#" target="_blank">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button href="#" target="_blank">
        <a aria-live="polite" class="ld-button" href="#" target="_blank" rel="noreferrer noopener">
          Text
        </a>
      </ld-button>
    `)
  })
  it('as progress button', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button progress="0.75">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button progress="0.75">
        <button aria-busy="true" aria-live="polite" class="ld-button">
          Text
          <span class="ld-button__progress" style="--ld-button-progress:0.75;"></span>
        </button>
      </ld-button>
    `)
  })
  it('as progress button pending', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button progress="pending">Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button progress="pending">
        <button aria-busy="true" aria-live="polite" class="ld-button">
          Text
          <span class="ld-button__progress ld-button__progress--pending"></span>
        </button>
      </ld-button>
    `)
  })
  it('allows adding click handlers', async () => {
    const handlers = {
      onClick() {
        return
      },
    }

    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button>Text</ld-button>`,
    })
    const ldButton = page.root
    const button = ldButton.querySelector('button')

    const spyClick = jest.spyOn(handlers, 'onClick')
    ldButton.addEventListener('click', handlers.onClick)
    button.dispatchEvent(
      new Event('click', { bubbles: true, cancelable: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)
    expect(spyClick).toHaveBeenCalled()
  })
})
