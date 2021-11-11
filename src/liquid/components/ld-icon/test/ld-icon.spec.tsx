import { h, Fragment } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../ld-icon'

describe('ld-icon', () => {
  it('renders with name prop', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => <ld-icon name="add" />,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => (
        <>
          <ld-icon name="add" />
          <ld-icon name="education" />
          <ld-icon name="add" />
        </>
      ),
    })
    expect(page.body).toMatchSnapshot()
  })
  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => <ld-icon name="atom" size="sm" />,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with slot', async () => {
    const page = await newSpecPage({
      components: [LdIcon],
      template: () => (
        <ld-icon>
          <span>fake icon</span>
        </ld-icon>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })
})
