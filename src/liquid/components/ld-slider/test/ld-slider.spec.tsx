import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdSlider } from '../ld-slider'

describe('ld-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider />,
    })
    expect(page.root).toMatchSnapshot()
  })
})
