import { newSpecPage } from '@stencil/core/testing'
import { LdLabel } from '../ld-label'

describe('ld-label', () => {
  it('renders with slot', async () => {
    const page = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label>Yada-yada</ld-label>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-label>
        <label class="ld-label">
          Yada-yada
        </label>
      </ld-label>
    `)
  })
  it('renders with position left', async () => {
    const page = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label position="left">Yada-yada</ld-label>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-label position="left">
        <label class="ld-label ld-label--left">
          Yada-yada
        </label>
      </ld-label>
    `)
  })
  it('renders with position right', async () => {
    const page = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label position="right">Yada-yada</ld-label>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-label position="right">
        <label class="ld-label ld-label--right">
          Yada-yada
        </label>
      </ld-label>
    `)
  })
  it('renders with size "m"', async () => {
    const page = await newSpecPage({
      components: [LdLabel],
      html: `<ld-label size="m">Yada-yada</ld-label>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-label size="m">
        <label class="ld-label ld-label--m">
          Yada-yada
        </label>
      </ld-label>
    `)
  })
})
