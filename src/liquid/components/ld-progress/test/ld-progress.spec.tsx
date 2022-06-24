import { newSpecPage } from '@stencil/core/testing'
import { LdProgress } from '../ld-progress'
import { h } from '@stencil/core'

describe('ld-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdProgress],
      template: () => <ld-progress aria-valuenow="25" />,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('adds classes according to props', () => {
    it('adds indeterminate class', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress />,
      })
      expect(page.root).toHaveClass('ld-progress--indeterminate')
    })

    it('adds brand-color class', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress aria-valuenow="25" brand-color />,
      })
      expect(page.root).toHaveClass('ld-progress--brand-color')
    })

    it('adds pending class', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress aria-valuenow="25" pending />,
      })
      expect(page.root).toHaveClass('ld-progress--pending')
    })

    it('adds steps class', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => (
          <ld-progress aria-valuemax="5" aria-valuenow="2" steps />
        ),
      })
      expect(page.root).toHaveClass('ld-progress--steps')
    })
  })

  describe('applies css custom props according to props', () => {
    it('applies valuemax prop', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress aria-valuemax="200" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('applies valuemin prop', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress aria-valuemin="10" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('applies valuenow prop', async () => {
      const page = await newSpecPage({
        components: [LdProgress],
        template: () => <ld-progress aria-valuenow="25" />,
      })
      expect(page.root).toMatchSnapshot()
    })
  })
})
