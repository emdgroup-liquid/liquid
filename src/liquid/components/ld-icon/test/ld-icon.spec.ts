import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../ld-icon'

describe('ld-icon', () => {
  it('renders with name prop', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon name="alarm"></ld-icon>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-icon name="alarm" role="presentation">
        <mock:shadow-root>
          <div style="width: var(--ld-sp-24); height: var(--ld-sp-24);">
            Not Found
          </div>
        </mock:shadow-root>
      </ld-icon>
    `)
  })
  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon name="alarm"></ld-icon><ld-icon name="education"></ld-icon><ld-icon name="alarm"></ld-icon>`,
    })
    expect(page.body).toEqualHtml(`
      <ld-icon name="alarm" role="presentation">
        <mock:shadow-root>
          <div style="width: var(--ld-sp-24); height: var(--ld-sp-24);">
            Not Found
          </div>
        </mock:shadow-root>
      </ld-icon>
      <ld-icon name="education" role="presentation">
        <mock:shadow-root>
          <div style="width: var(--ld-sp-24); height: var(--ld-sp-24);">
            Not Found
          </div>
        </mock:shadow-root>
      </ld-icon>
      <ld-icon name="alarm" role="presentation">
        <mock:shadow-root>
          <div style="width: var(--ld-sp-24); height: var(--ld-sp-24);">
            Not Found
          </div>
        </mock:shadow-root>
      </ld-icon>
    `)
  })
  it('renders with slot', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      html: `<ld-icon><span>fake icon</span></ld-icon>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-icon role="presentation">
        <mock:shadow-root>
          <div style="width: var(--ld-sp-24); height: var(--ld-sp-24);">
            <slot></slot>
          </div>
        </mock:shadow-root>
        <span>
          fake icon
        </span>
      </ld-icon>
    `)
  })
})
