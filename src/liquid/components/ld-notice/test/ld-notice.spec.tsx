import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdNotice } from '../ld-notice'

describe('ld-notice', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdNotice],
      template: () => <ld-notice>Lorem ipsum dolor sit amet.</ld-notice>,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with headline', async () => {
    const page = await newSpecPage({
      components: [LdNotice],
      template: () => (
        <ld-notice headline="Headline">Lorem ipsum dolor sit amet.</ld-notice>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with mode', async () => {
    const page = await newSpecPage({
      components: [LdNotice],
      template: () => (
        <ld-notice mode="error">Lorem ipsum dolor sit amet.</ld-notice>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })
})
