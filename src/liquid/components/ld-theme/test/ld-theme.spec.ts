import { newSpecPage } from '@stencil/core/testing'
import { LdTheme } from '../ld-theme'

describe('ld-theme', () => {
  it('renders default theme', async () => {
    const page = await newSpecPage({
      components: [LdTheme],
      html: `<ld-theme>yolo</ld-theme>`,
    })
    expect(page.root).toEqualHtml(
      `<ld-theme class="ld-theme-ocean">yolo</ld-theme>`
    )
  })
  it('renders explicit theme', async () => {
    const page = await newSpecPage({
      components: [LdTheme],
      html: `<ld-theme name="tea">yolo</ld-theme>`,
    })
    expect(page.root).toEqualHtml(
      `<ld-theme class="ld-theme-tea" name="tea">yolo</ld-theme>`
    )
  })
})
