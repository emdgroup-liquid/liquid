import { newSpecPage } from '@stencil/core/testing'
import { LdSrOnly } from '../ld-sr-only'

describe('ld-sr-only', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSrOnly],
      html: `<ld-sr-only>Hello screen reader</ld-sr-only>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-sr-only class="ld-sr-only">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Hello screen reader
      </ld-sr-only>
    `)
  })
})
