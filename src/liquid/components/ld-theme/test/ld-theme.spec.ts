import { newSpecPage } from '@stencil/core/testing'
import { LdTheme } from '../ld-theme'

describe('ld-theme', () => {
  it('renders default theme', async () => {
    const page = await newSpecPage({
      components: [LdTheme],
      html: `<ld-theme>yolo</ld-theme>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders explicit theme', async () => {
    const page = await newSpecPage({
      components: [LdTheme],
      html: `<ld-theme name="tea">yolo</ld-theme>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
