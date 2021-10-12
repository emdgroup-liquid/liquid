import { newSpecPage } from '@stencil/core/testing'
import { LdTablist } from '../../ld-tablist/ld-tablist'
import { LdTab } from '../../ld-tab/ld-tab'

const components = [LdTablist, LdTab]

describe('ld-tablist', () => {
  describe('modifiers', () => {
    it('size', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist size="sm">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('mode', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist mode="ghost">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('rounded', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist rounded="all-lg">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      expect(page.root).toMatchSnapshot()
    })
  })
})
