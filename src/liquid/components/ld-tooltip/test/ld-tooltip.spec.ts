import { newSpecPage } from '@stencil/core/testing'
import { LdTooltip } from '../ld-tooltip'

describe('ld-tooltip', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdTooltip],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
