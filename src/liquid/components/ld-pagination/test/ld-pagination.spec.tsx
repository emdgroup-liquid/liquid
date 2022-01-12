import { h, Fragment } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdPagination } from '../ld-pagination'

describe('ld-pagination', () => {
  it('renders with name prop', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination name="add" />,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => (
        <>
          <ld-pagination name="add" />
          <ld-pagination name="education" />
          <ld-pagination name="add" />
        </>
      ),
    })
    expect(page.body).toMatchSnapshot()
  })
  it('renders with size prop', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination name="atom" size="sm" />,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with slot', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => (
        <ld-pagination>
          <span>fake pagination</span>
        </ld-pagination>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })
})
