import { newSpecPage } from '@stencil/core/testing'
import { LdMenu } from '../ld-menu'

describe('ld-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdMenu],
      html: `<ld-menu></ld-menu>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ld-menu>
    `)
  })
})
