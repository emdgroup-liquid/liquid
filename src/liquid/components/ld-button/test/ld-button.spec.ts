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
        <button class="ld-button ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
      <ld-button disabled="">
        <button class="ld-button ld-theme-bg-primary" disabled="">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--highlight ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--secondary ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--ghost ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--danger ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--sm ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--justify-end ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
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
        <button class="ld-button ld-button--align-text-right ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
        </button>
      </ld-button>
    `)
  })
  it('passes down attributes', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button attrs='{ "type": "reset" }'>Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button attrs='{ "type": "reset" }'>
        <button type="reset" class="ld-button ld-theme-bg-primary">
          <span class="ld-button__content">
            Text
          </span>
        </button>
      </ld-button>
    `)
  })
  it('passes down invalid attributes', async () => {
    try {
      await newSpecPage({
        components: [LdButton],
        html: `<ld-button attrs='{ "asdfasd" }'>Text</ld-button>`,
      })
      expect(true).toBe(false)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError('ld-button attrs prop invalid; got { "asdfasd" }')
      )
    }
  })
  it('uses custom tag', async () => {
    const page = await newSpecPage({
      components: [LdButton],
      html: `<ld-button tag="a" attrs='{ "href": "#" }'>Text</ld-button>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-button attrs='{ "href": "#" }' tag="a">
        <a class="ld-button ld-theme-bg-primary" href="#">
          <span class="ld-button__content">
            Text
          </span>
        </a>
      </ld-button>
    `)
  })
})
