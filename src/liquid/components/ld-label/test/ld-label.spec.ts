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
})
