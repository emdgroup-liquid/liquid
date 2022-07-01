import { newSpecPage } from '@stencil/core/testing'
import { LdSwitch } from '../../ld-switch'
import { LdSwitchItem } from '../ld-switch-item'
import '../../../../utils/mutationObserver'

const components = [LdSwitch, LdSwitchItem]

describe('ld-switch-item', () => {
  describe('modifiers', () => {
    it('size', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-switch label="Food Type" name="foodType" size="lg">
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
        </ld-switch>
        `,
      })

      expect(page.root).toMatchSnapshot()
    })

    it('disabled', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-switch label="Food Type" name="foodType" disabled>
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
        </ld-switch>
        `,
      })

      expect(page.root).toMatchSnapshot()
    })

    it('single disabled', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-switch label="Food Type" name="foodType">
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables" disabled></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
        </ld-switch>
        `,
      })

      expect(page.root).toMatchSnapshot()
    })

    it('brand-color', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-switch label="Food Type" name="foodType" brand-color>
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables" disabled></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts"></ld-switch-item>
        </ld-switch>
        `,
      })

      expect(page.root).toMatchSnapshot()
    })
  })
})
