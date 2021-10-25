import { newSpecPage } from '@stencil/core/testing'
import { LdParagraph } from '../ld-paragraph'

describe('ld-paragraph', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdParagraph],
      html: `<ld-paragraph>Text</ld-paragraph>`,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [LdParagraph],
      html: `<ld-paragraph size="xs">Text</ld-paragraph>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
