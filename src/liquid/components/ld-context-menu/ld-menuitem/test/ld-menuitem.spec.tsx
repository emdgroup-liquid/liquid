import { newSpecPage } from '@stencil/core/testing'
import { LdMenuitem } from '../ld-menuitem'

describe('ld-menuitem', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem></ld-menuitem>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-menuitem>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ld-menuitem>
    `)
  })
})
