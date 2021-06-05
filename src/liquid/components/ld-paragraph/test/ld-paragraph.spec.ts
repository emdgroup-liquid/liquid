import { newSpecPage } from '@stencil/core/testing'
import { LdParagraph } from '../ld-paragraph'

describe('ld-paragraph', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdParagraph],
      html: `<ld-paragraph>Text</ld-paragraph>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-paragraph>
        <p class="ld-paragraph">Text</p>
      </ld-paragraph>
    `)
  })
  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [LdParagraph],
      html: `<ld-paragraph size="xs">Text</ld-paragraph>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-paragraph size="xs">
        <p class="ld-paragraph ld-paragraph--xs">Text</p>
      </ld-paragraph>
    `)
  })
})
