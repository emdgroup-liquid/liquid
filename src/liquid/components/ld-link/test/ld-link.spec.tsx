import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdLink } from '../ld-link'

describe('ld-notice', () => {
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

  it('renders with chevron icon', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link show-icon>Link</ld-link>,
    })

    const icon = page.root.shadowRoot.querySelector<HTMLElement>('ld-icon')
    expect(icon).not.toBeNull()
    expect(page.root).toMatchSnapshot()
  })

  it('renders with href', async () => {
    const url = 'http://testing.stenciljs.com/introduction/getting-started/'
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link href={url}>Link</ld-link>,
    })

    const anchorElement = page.root.shadowRoot.querySelector<HTMLElement>('a')
    expect(anchorElement).toHaveProperty('href', url)
    expect(page.root).toMatchSnapshot()
  })

  it('renders with target _blank', async () => {
    const url = 'http://testing.stenciljs.com/introduction/getting-started/'
    const target = '_blank'
    const page = await newSpecPage({
      components: [LdLink],
      template: () => (
        <ld-link href={url} target={target}>
          Link
        </ld-link>
      ),
    })

    const anchorElement = page.root.shadowRoot.querySelector<HTMLElement>('a')
    expect(anchorElement).toEqualAttribute('target', target)
    expect(page.root).toMatchSnapshot()
  })
})
