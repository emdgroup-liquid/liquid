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

  it('renders with li tag', async () => {
    const page = await newSpecPage({
      components: [LdCard],
      html: `<ld-card tag="li">Hello</ld-card>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('adds classes according to props', () => {
    it('adds size class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card size="sm">Hello</ld-card>`,
      })
      const card = page.root.shadowRoot.querySelector('.ld-card')
      expect(card).toHaveClass('ld-card--sm')
    })

    it('adds shadow class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card shadow="sticky">Hello</ld-card>`,
      })
      const card = page.root.shadowRoot.querySelector('.ld-card')
      expect(card).toHaveClass('ld-card--sticky')
    })

    it('adds interactive class', async () => {
      const page = await newSpecPage({
        components: [LdCard],
        html: `<ld-card interactive>Hello</ld-card>`,
      })
      const card = page.root.shadowRoot.querySelector('.ld-card')
      expect(card).toHaveClass('ld-card--interactive')
    })
  })
})
