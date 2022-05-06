import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdLink } from '../ld-link'
import '../../../utils/mutationObserver'

describe('ld-link', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link>Link</ld-link>,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with small size', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link size="sm">Link</ld-link>,
    })

    const smallElement = page.root.shadowRoot.querySelector('.ld-link--sm')
    expect(smallElement).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders with large size', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link size="lg">Link</ld-link>,
    })

    const largeElement = page.root.shadowRoot.querySelector('.ld-link--lg')
    expect(largeElement).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link disabled>Link</ld-link>,
    })

    const disabledElement =
      page.root.shadowRoot.querySelector('.ld-link--disabled')
    expect(disabledElement).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders with icon on start', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link icon-start>Link</ld-link>,
    })

    const icon = page.root.shadowRoot.querySelector<HTMLElement>('ld-icon')
    expect(icon).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders with icon on end', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link icon-end>Link</ld-link>,
    })

    const icon = page.root.shadowRoot.querySelector<HTMLElement>('ld-icon')
    expect(icon).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders with href', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      html: '<ld-link href="#">Link</ld-link>',
    })

    const anchorElement = page.root.shadowRoot.querySelector<HTMLElement>('a')
    expect(anchorElement).toHaveProperty('href')
    expect(page.root).toMatchSnapshot()
  })
})
