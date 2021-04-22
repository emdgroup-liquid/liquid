import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../ld-icon'

describe('ld-icon', () => {
  it('renders with name prop', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon name="alarm"></ld-icon>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-icon name="alarm">
        <span class="ld-icon" role="presentation">
          Not Found
        </span>
      </ld-icon>
    `)
  })
  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon name="alarm"></ld-icon><ld-icon name="education"></ld-icon><ld-icon name="alarm"></ld-icon>`,
    })
    expect(page.body).toEqualHtml(`
      <ld-icon name="alarm">
        <span class="ld-icon" role="presentation">
          Not Found
        </span>
      </ld-icon>
      <ld-icon name="education">
        <span class="ld-icon" role="presentation">
          Not Found
        </span>
      </ld-icon>
      <ld-icon name="alarm">
        <span class="ld-icon" role="presentation">
          Not Found
        </span>
      </ld-icon>
    `)
  })
  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon name="atoms" size="sm"></ld-icon>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-icon name="atoms" size="sm">
        <span class="ld-icon ld-icon--sm" role="presentation">
          Not Found
        </span>
      </ld-icon>
    `)
  })
  it('renders with slot', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon><span>fake icon</span></ld-icon>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-icon>
        <span class="ld-icon" role="presentation">
          <span>fake icon</span>
        </span>
      </ld-icon>
    `)
  })
})
