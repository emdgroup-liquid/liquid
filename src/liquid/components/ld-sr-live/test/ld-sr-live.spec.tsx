import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdSrLive } from '../ld-sr-live'

describe('ld-sr-live', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSrLive],
      template: () => <ld-sr-live />,
    })
    expect(page.root).toMatchSnapshot()
  })
})
