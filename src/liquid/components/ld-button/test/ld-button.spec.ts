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
        <button class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button aria-disabled="true" class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive" disabled>
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
        <button class="ld-button ld-button--highlight ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--secondary ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--ghost ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--danger ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--sm ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--justify-end ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <button class="ld-button ld-button--align-text-right ld-theme-bg-primary ld-theme-bg-primary--interactive">
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
        <a class="ld-button ld-theme-bg-primary ld-theme-bg-primary--interactive" href="#" target="_blank" rel="noreferrer noopener">
          Text
        </a>
      </ld-button>
    `)
  })
})
