import { newSpecPage } from '@stencil/core/testing'
import { LdCard } from '../ld-card'
import { h } from '@stencil/core'

describe('ld-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdCard],
      html: `<ld-card>Hello</ld-card>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('adds classes according to props', () => {
    it('adds size class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card size="sm">Hello</ld-card>`,
      })
      expect(page.root).toHaveClass('ld-card--sm')
    })

    it('adds shadow class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card shadow="sticky">Hello</ld-card>`,
      })
      expect(page.root).toHaveClass('ld-card--sticky')
    })

    it('adds shadow interactive class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card shadow-interactive="sticky">Hello</ld-card>`,
      })
      expect(page.root).toHaveClass('ld-card--interactive-sticky')
    })
  })

  describe('as listitem', () => {
    it('adds listitem role if in card stack', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        template: () => (
          <ld-card-stack>
            <ld-card>Card A</ld-card>
          </ld-card-stack>
        ),
      })
      expect(page.body.querySelector('ld-card').getAttribute('role')).toEqual(
        'listitem'
      )
    })

    it('does not add listitem role if not in card stack', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        template: () => (
          <div>
            <ld-card>Card A</ld-card>
          </div>
        ),
      })
      expect(
        page.body.querySelector('ld-card').getAttribute('role')
      ).not.toEqual('listitem')
    })

    it('does not throw if there is no parent element', async () => {
      const component = new LdCard()
      component.componentWillLoad()
    })
  })
})
