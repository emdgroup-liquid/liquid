import { h, Fragment } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdPagination } from '../ld-pagination'

describe('ld-pagination', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with custom item label', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination itemLabel="Slide" />,
    })
    expect(page.body).toMatchSnapshot()
  })

  it('renders with determined length', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={15} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with pre-selected index', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination selectedIndex={7} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with custom offset', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination offset={1} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders without offset', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination offset={0} selectedIndex={2} length={5} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with different size', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination size="lg" />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with sticky items', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination sticky={2} length={15} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with sticky items only on one side', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination sticky={2} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders without dots', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={5} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders without slidable elements', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={6} sticky={3} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with one item only', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={1} />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with one sticky item only', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={1} sticky={3} />,
    })
    expect(page.root).toMatchSnapshot()
  })
})
