import { newSpecPage } from '@stencil/core/testing'
import { LdContextMenu } from '../ld-context-menu'

describe('ld-context-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu],
      html: `<ld-context-menu></ld-context-menu>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-context-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ld-context-menu>
    `)
  })
})
