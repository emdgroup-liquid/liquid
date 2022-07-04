import { newSpecPage } from '@stencil/core/testing'
import { LdCircularProgress } from '../ld-circular-progress'
import { h } from '@stencil/core'

describe('ld-circular-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdCircularProgress],
      template: () => <ld-circular-progress aria-valuenow="25" />,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('adds classes according to props', () => {
    it('adds brand-color class', async () => {
      const page = await newSpecPage({
        components: [LdCircularProgress],
        template: () => <ld-circular-progress aria-valuenow="25" brand-color />,
      })
      expect(page.root).toHaveClass('ld-circular-progress--brand-color')
    })
  })

  describe('applies css custom props according to props', () => {
    it('applies valuemax prop', async () => {
      const page = await newSpecPage({
        components: [LdCircularProgress],
        template: () => <ld-circular-progress aria-valuemax="200" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('applies valuemin prop', async () => {
      const page = await newSpecPage({
        components: [LdCircularProgress],
        template: () => <ld-circular-progress aria-valuemin="10" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('applies valuenow prop', async () => {
      const page = await newSpecPage({
        components: [LdCircularProgress],
        template: () => <ld-circular-progress aria-valuenow="25" />,
      })
      expect(page.root).toMatchSnapshot()
    })
  })
})
