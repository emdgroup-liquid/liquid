import { newSpecPage } from '@stencil/core/testing'
import { LdCard } from '../ld-card'

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
})
