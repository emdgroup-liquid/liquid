import { newSpecPage } from '@stencil/core/testing'
import { LdSwitch } from '../ld-switch'
import { LdSwitchItem } from '../ld-switch-item/ld-switch-item'
import '../../../utils/mutationObserver'

class FocusManager {
  focus(el) {
    const doc = document as unknown as { activeElement: Element }
    doc.activeElement = el
  }
}
const focusManager = new FocusManager()

const components = [LdSwitch, LdSwitchItem]

describe('ld-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch label="Food Type" name="foodType">
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts" disabled></ld-switch-item>
        </ld-switch>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('shows switch with preseleted switchItem', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch label="Food Type" name="foodType">
          <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
          <ld-switch-item label="Vegetables" value="vegetables" checked></ld-switch-item>
          <ld-switch-item label="Nuts" value="nuts"></ld-switch-item> 
        </ld-switch>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('mouse interactions', () => {
    it('changes switchItem via click', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch label="Food Type" name="foodType">
            <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
            <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
            <ld-switch-item label="Nuts" value="nuts"></ld-switch-item> 
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      expect(ldSwitchItems.length).toEqual(3)

      const ldSwitchItem = ldSwitchItems[2]
      const switchItemInput = ldSwitchItem.shadowRoot.querySelector('input')

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)

      ldSwitchItem.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(switchItemInput).not.toHaveAttribute('tabindex')
      expect(switchItemInput.checked).toBe(true)
    })

    it('does not change switchItem via click on disabled item', async () => {
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
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      expect(ldSwitchItems.length).toEqual(3)

      const ldSwitchItem = ldSwitchItems[1]
      const switchItemInput = ldSwitchItem.shadowRoot.querySelector('input')

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)
      expect(ldSwitchItem.disabled).toBe(true)
      expect(switchItemInput.disabled).toBe(true)

      ldSwitchItem.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)
    })

    it('does not select item while switch is disabled', async () => {
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
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      expect(ldSwitchItems.length).toEqual(3)

      const ldSwitchItem = ldSwitchItems[1]
      const switchItemInput = ldSwitchItem.shadowRoot.querySelector('input')

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)
      expect(ldSwitchItem.disabled).toBe(true)
      expect(switchItemInput.disabled).toBe(true)

      ldSwitchItem.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)

      const disabledLdSwitchItems = Array.from(ldSwitchItems).filter(
        (item) => item.disabled
      )
      expect(disabledLdSwitchItems.length).toEqual(3)
    })
  })

  describe('keyboard interactions', () => {
    it('changes swichItem via arrow keys', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch label="Food Type" name="foodType"> 
            <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
            <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
            <ld-switch-item label="Nuts" value="nuts"></ld-switch-item> 
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      expect(ldSwitchItems.length).toEqual(3)

      const [ldSwitchItem0, ldSwitchItem1, ldSwitchItem2] =
        Array.from(ldSwitchItems)

      const item0 = ldSwitchItem0.shadowRoot.querySelector('input')
      const item1 = ldSwitchItem1.shadowRoot.querySelector('input')
      const item2 = ldSwitchItem2.shadowRoot.querySelector('input')

      expect(item0).not.toHaveAttribute('tabindex')
      expect(item1.getAttribute('tabindex')).toEqual('-1')
      expect(item2.getAttribute('tabindex')).toEqual('-1')

      item0.focus = jest.fn(focusManager.focus)
      item1.focus = jest.fn(focusManager.focus)
      item2.focus = jest.fn(focusManager.focus)

      item0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()

      expect(item0.getAttribute('tabindex')).toEqual('-1')
      expect(item0.checked).toBe(false)

      expect(item1).not.toHaveAttribute('tabindex')
      expect(item1.checked).toBe(true)

      expect(item2.getAttribute('tabindex')).toEqual('-1')
      expect(item2.checked).toBe(false)

      item1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      )
      await page.waitForChanges()

      expect(item0.getAttribute('tabindex')).toEqual('-1')
      expect(item0.checked).toBe(false)

      expect(item1.getAttribute('tabindex')).toEqual('-1')
      expect(item1.checked).toBe(false)

      expect(item2).not.toHaveAttribute('tabindex')
      expect(item2.checked).toBe(true)
    })
  })

  describe('events', () => {
    it('emits ldchange event', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch label="Food Type" name="foodType">
            <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
            <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
            <ld-switch-item label="Nuts" value="nuts" disabled></ld-switch-item>
          </ld-switch>
        `,
      })

      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      expect(ldSwitchItems.length).toEqual(3)

      const ldSwitchItem = ldSwitchItems[1]

      const handleSwitchItemChange = jest.fn()
      ldSwitch.addEventListener('ldswitchchange', handleSwitchItemChange)

      ldSwitchItem.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(handleSwitchItemChange).toHaveBeenCalled()
    })
  })
})
