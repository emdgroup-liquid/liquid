import { newSpecPage } from '@stencil/core/testing'
import { LdLoading } from '../ld-loading'

describe('ld-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdLoading],
      html: `<ld-loading></ld-loading>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-loading class="ld-loading"></ld-loading>
    `)
  })
})
