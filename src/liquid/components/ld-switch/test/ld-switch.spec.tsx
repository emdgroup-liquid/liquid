import { newSpecPage } from '@stencil/core/testing'
import { LdSwitch } from '../ld-switch'
import { LdSwitchItem } from '../ld-switch-item/ld-switch-item'
import { LdIcon } from '../../ld-icon/ld-icon'
import '../../../utils/mutationObserver'

const components = [LdSwitch, LdSwitchItem, LdIcon]

describe('ld-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch legend="Dress" name="dress">
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
          <ld-switch-item value="mummy" disabled>Mummy</ld-switch-item>
          <ld-switch-item value="vampire" aria-disabled="true">Vampire</ld-switch-item>
        </ld-switch>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('with icons only', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch legend="Dress" name="dress">
          <ld-switch-item value="werewolf" checked>
            <ld-icon slot="icon-start" name="placeholder" aria-label="Werewolf"></ld-icon>
          </ld-switch-item>
          <ld-switch-item value="zombie">
            <ld-icon slot="icon-start" name="placeholder" aria-label="Zombie"></ld-icon>
          </ld-switch-item>
        </ld-switch>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('css classes', () => {
    it('brand-color', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" brand-color>
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
          </ld-switch>
        `,
      })
      expect(page.root).toHaveClass('ld-switch--brand-color')
    })

    it('fit-content', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" fit-content>
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
          </ld-switch>
        `,
      })
      expect(page.root).toHaveClass('ld-switch--fit-content')
    })

    it('size', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" size="sm">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
          </ld-switch>
        `,
      })
      expect(page.root).toHaveClass('ld-switch--sm')
    })
  })

  describe('mouse interactions', () => {
    it('changes item via click', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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

      ldSwitchItem.click()
      await page.waitForChanges()

      expect(switchItemInput).not.toHaveAttribute('tabindex')
      expect(switchItemInput.checked).toBe(true)
    })

    it('does not change item via click on disabled item', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie" disabled>Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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

    it('does not select item if switch is disabled', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" disabled>
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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

      ldSwitchItem.click()
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)

      const disabledLdSwitchItems = Array.from(ldSwitchItems).filter(
        (item) => item.disabled
      )
      expect(disabledLdSwitchItems.length).toEqual(3)
    })

    it('does not select item if switch is readonly', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" readonly>
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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
      expect(ldSwitchItem.readonly).toBe(true)

      ldSwitchItem.click()
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)

      const readonlyLdSwitchItems = Array.from(ldSwitchItems).filter(
        (item) => item.readonly
      )
      expect(readonlyLdSwitchItems.length).toEqual(3)
    })

    it('does not change item via click on aria-disabled item', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie" aria-disabled="true">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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
      expect(switchItemInput.getAttribute('aria-disabled')).toEqual('true')

      ldSwitchItem.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)
    })

    it('does not select item while switch is aria-disabled', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" aria-disabled="true">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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
      expect(ldSwitch.getAttribute('aria-disabled')).toEqual('true')

      ldSwitchItem.click()
      await page.waitForChanges()

      expect(switchItemInput.getAttribute('tabindex')).toEqual('-1')
      expect(switchItemInput.checked).toBe(false)

      const disabledLdSwitchItems = Array.from(ldSwitchItems).filter(
        (item) => item.ariaDisabled
      )
      expect(disabledLdSwitchItems.length).toEqual(3)
    })
  })

  describe('keyboard interactions', () => {
    it('changes swichItem via arrow keys', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
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

      item0.focus = jest.fn()
      item1.focus = jest.fn()
      item2.focus = jest.fn()

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

      item2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()

      expect(item0.getAttribute('tabindex')).toEqual('-1')
      expect(item0.checked).toBe(false)

      expect(item1).not.toHaveAttribute('tabindex')
      expect(item1.checked).toBe(true)

      expect(item2.getAttribute('tabindex')).toEqual('-1')
      expect(item2.checked).toBe(false)

      item1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
      )
      await page.waitForChanges()

      expect(item0).not.toHaveAttribute('tabindex')
      expect(item0.checked).toBe(true)

      expect(item1.getAttribute('tabindex')).toEqual('-1')
      expect(item1.checked).toBe(false)

      expect(item2.getAttribute('tabindex')).toEqual('-1')
      expect(item2.checked).toBe(false)
    })
  })

  describe('events', () => {
    it('emits ldswitchchange event', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy" disabled>Mummy</ld-switch-item>
          </ld-switch>
        `,
      })

      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      const ldSwitchItem = ldSwitchItems[1]

      const handleSwitchChange = jest.fn()
      ldSwitch.addEventListener('ldswitchchange', handleSwitchChange)

      ldSwitchItem.click()
      await page.waitForChanges()

      expect(handleSwitchChange).toHaveBeenCalled()
    })
  })

  describe('focus', () => {
    it('sets inner focus on checked item', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      const ldSwitchItem = ldSwitchItems[0]
      const input = ldSwitchItem.shadowRoot.querySelector('input')

      input.focus = jest.fn()
      await ldSwitch.focusInner()

      expect(input.focus).toHaveBeenCalled()
    })

    it('updates tabindices on focus and focusout', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      const ldSwitchItem0 = ldSwitchItems[0]
      const ldSwitchItem1 = ldSwitchItems[1]
      const ldSwitchItem2 = ldSwitchItems[2]
      const input0 = ldSwitchItem0.shadowRoot.querySelector('input')
      const input1 = ldSwitchItem1.shadowRoot.querySelector('input')
      const input2 = ldSwitchItem2.shadowRoot.querySelector('input')

      expect(ldSwitch.tabIndex).toEqual(0)
      expect(input0.tabIndex).toEqual(-1)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)

      input0.focus = jest.fn()
      ldSwitch.dispatchEvent(new FocusEvent('focus'))

      await page.waitForChanges()

      expect(input0.focus).toHaveBeenCalled()

      input0.dispatchEvent(new FocusEvent('focus'))

      await page.waitForChanges()

      expect(ldSwitch.tabIndex).toEqual(-1)
      expect(input0.tabIndex).toEqual(-1)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)

      ldSwitch.dispatchEvent(new FocusEvent('focusout'))

      await page.waitForChanges()

      expect(ldSwitch.tabIndex).toEqual(0)
      expect(input0.tabIndex).toEqual(-1)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)
    })

    it('updates tabindices on focus and focusout with custom tabindex', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress" ld-tabindex="2">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      const ldSwitchItem0 = ldSwitchItems[0]
      const ldSwitchItem1 = ldSwitchItems[1]
      const ldSwitchItem2 = ldSwitchItems[2]
      const input0 = ldSwitchItem0.shadowRoot.querySelector('input')
      const input1 = ldSwitchItem1.shadowRoot.querySelector('input')
      const input2 = ldSwitchItem2.shadowRoot.querySelector('input')

      expect(ldSwitch.tabIndex).toEqual(2)
      expect(input0.tabIndex).toEqual(2)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)

      input0.focus = jest.fn()
      ldSwitch.dispatchEvent(new FocusEvent('focus'))

      await page.waitForChanges()

      expect(input0.focus).toHaveBeenCalled()

      input0.dispatchEvent(new FocusEvent('focus'))

      await page.waitForChanges()

      expect(ldSwitch.tabIndex).toEqual(-1)
      expect(input0.tabIndex).toEqual(2)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)

      ldSwitch.dispatchEvent(new FocusEvent('focusout'))

      await page.waitForChanges()

      expect(ldSwitch.tabIndex).toEqual(2)
      expect(input0.tabIndex).toEqual(2)
      expect(input1.tabIndex).toEqual(-1)
      expect(input2.tabIndex).toEqual(-1)
    })

    it('sets inner focus on first item if none is checked', async () => {
      const page = await newSpecPage({
        components,
        html: `
          <ld-switch name="dress">
            <ld-switch-item value="werewolf">Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
          </ld-switch>
        `,
      })
      const ldSwitch = page.root
      const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
      const ldSwitchItem = ldSwitchItems[0]
      const input = ldSwitchItem.shadowRoot.querySelector('input')

      input.focus = jest.fn()
      await ldSwitch.focusInner()

      expect(input.focus).toHaveBeenCalled()
    })
  })

  it('creates hidden input field, if inside a form', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-switch name="dress">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
            <ld-switch-item value="mummy">Mummy</ld-switch-item>
          </ld-switch>
        </form>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('uses hidden input field with referenced form', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch name="dress" form="yolo">
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
          <ld-switch-item value="mummy">Mummy</ld-switch-item>
        </ld-switch>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('is required', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch name="dress" required>
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
          <ld-switch-item value="mummy" disabled>Mummy</ld-switch-item>
          <ld-switch-item value="vampire" aria-disabled="true">Vampire</ld-switch-item>
        </ld-switch>
      `,
    })
    const ldSwitch = page.root
    const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
    expect(ldSwitchItems.length).toEqual(4)

    const requiredInputs = Array.from(ldSwitchItems).filter(
      (ldSwitchItem) => ldSwitchItem.required
    )
    expect(requiredInputs.length).toEqual(4)
  })

  it('removes hidden input field if name prop is removed', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch name="dress" form="my-form">
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
        </ld-switch>
      `,
    })
    const ldSwitch = page.root
    const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty(
      'name',
      'dress'
    )

    ldSwitch.removeAttribute('name')
    await page.waitForChanges()

    expect(ldSwitchItems[0].querySelectorAll('input').length).toEqual(0)
  })

  it('removes value prop on hidden input', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch name="dress" form="my-form">
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
        </ld-switch>
      `,
    })
    const ldSwitch = page.root
    const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty(
      'value',
      'werewolf'
    )

    ldSwitchItems[0].removeAttribute('value')
    await page.waitForChanges()

    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty('value', '')
  })

  it('removes form prop on hidden input', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-switch name="dress" form="my-form">
            <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
            <ld-switch-item value="zombie">Zombie</ld-switch-item>
          </ld-switch>
        </form>
      `,
    })
    const ldSwitch = page.body.querySelector('ld-switch')
    const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty(
      'form',
      'my-form'
    )

    ldSwitch.removeAttribute('form')
    await page.waitForChanges()

    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty('form', '')
  })

  it('removes hidden input field with removal of form prop when there is no outer form', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-switch name="dress" form="my-form">
          <ld-switch-item value="werewolf" checked>Werewolf</ld-switch-item>
          <ld-switch-item value="zombie">Zombie</ld-switch-item>
        </ld-switch>
      `,
    })
    const ldSwitch = page.root
    const ldSwitchItems = ldSwitch.querySelectorAll('ld-switch-item')
    expect(ldSwitchItems[0].querySelector('input')).toHaveProperty(
      'form',
      'my-form'
    )

    ldSwitch.removeAttribute('form')
    await page.waitForChanges()

    expect(ldSwitchItems[0].querySelectorAll('input').length).toEqual(0)
  })
})
