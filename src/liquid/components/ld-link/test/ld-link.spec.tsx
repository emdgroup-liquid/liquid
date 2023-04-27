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

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      template: () => <ld-link disabled>Link</ld-link>,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with href', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      html: '<ld-link href="#">Link</ld-link>',
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with chevron', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      html: '<ld-link chevron="end" href="#">Link</ld-link>',
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with target _blank and rel', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      html: '<ld-link href="#" target="_blank">Link</ld-link>',
    })
    expect(page.root).toMatchSnapshot()
  })

  it('allows to set inner focus', async () => {
    const page = await newSpecPage({
      components: [LdLink],
      html: '<ld-link href="#">Link</ld-link>',
    })
    const ldLink = page.root
    const anchor = ldLink.shadowRoot.children[0] as HTMLAnchorElement

    anchor.focus = jest.fn()
    await ldLink.focusInner()

    expect(anchor.focus).toHaveBeenCalled()
  })

  it('prevents default when disabled', () => {
    const component = new LdLink()
    component.disabled = true
    const ev = new MouseEvent('click')
    component['handleClick'](ev)
    expect(ev.defaultPrevented).toBeTruthy()
  })

  it('prevents default when aria-disabled', () => {
    const component = new LdLink()
    component.el.ariaDisabled = 'true'
    const ev = new MouseEvent('click')
    component['handleClick'](ev)
    expect(ev.defaultPrevented).toBeTruthy()
  })

  it('does not throw when disconnecting before hydration', () => {
    const component = new LdLink()
    component.disconnectedCallback()
  })
})
