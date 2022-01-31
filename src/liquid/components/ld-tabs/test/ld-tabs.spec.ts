import { newSpecPage } from '@stencil/core/testing'
import { LdTabs } from '../ld-tabs'
import { LdTablist } from '../ld-tablist/ld-tablist'
import { LdTab } from '../ld-tab/ld-tab'
import { LdTabpanellist } from '../ld-tabpanellist/ld-tabpanellist'
import { LdTabpanel } from '../ld-tabpanel/ld-tabpanel'

class FocusManager {
  focus(el) {
    const doc = document as unknown as { activeElement: Element }
    doc.activeElement = el
  }
}
const focusManager = new FocusManager()

const components = [LdTabs, LdTablist, LdTab, LdTabpanellist, LdTabpanel]

describe('ld-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, strawberry</ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('shows tabpanel according to the preselected tab', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab>Fruits</ld-tab>
            <ld-tab selected>Vegetables</ld-tab>
            <ld-tab selected="false">Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, strawberry</ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('mouse interactions', () => {
    it('changes tab via click with preselected tab', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, strawberry</ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(4)

      const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
      const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
      expect(ldTabpanels.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].shadowRoot.querySelector('button')
      const tabBtn2 = ldTabItems[2].shadowRoot.querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0).not.toHaveAttribute('hidden')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel2 = ldTabpanels[2]
      expect(ldTabpanel2).toHaveAttribute('hidden')

      ldTabItems[2].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[2], 'scrollIntoView')

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel0).toHaveAttribute('hidden')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel2).not.toHaveAttribute('hidden')

      expect(spyScrollIntoView).toHaveBeenCalled()
    })

    it('changes tab via click with no preselected tab', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, strawberry</ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(4)

      const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
      const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
      expect(ldTabpanels.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].shadowRoot.querySelector('button')
      const tabBtn2 = ldTabItems[2].shadowRoot.querySelector('button')
      const ldTabpanel0 = ldTabpanels[0]
      const ldTabpanel2 = ldTabpanels[2]

      ldTabItems[2].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[2], 'scrollIntoView')

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel0).toHaveAttribute('hidden')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel2).not.toHaveAttribute('hidden')

      expect(spyScrollIntoView).toHaveBeenCalled()
    })

    it('changes tab with no target tabpanel', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].shadowRoot.querySelector('button')
      const tabBtn2 = ldTabItems[2].shadowRoot.querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

      ldTabItems[2].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[2], 'scrollIntoView')

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)

      expect(spyScrollIntoView).toHaveBeenCalled()
    })

    it('does not change tab via click on disabled tab', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, strawberry</ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(4)

      const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
      const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
      expect(ldTabpanels.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].shadowRoot.querySelector('button')
      const tabBtn3 = ldTabItems[3].shadowRoot.querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0).not.toHaveAttribute('hidden')

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel3 = ldTabpanels[3]
      expect(ldTabpanel3).toHaveAttribute('hidden')

      ldTabItems[3].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[3], 'scrollIntoView')

      tabBtn3.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel0).not.toHaveAttribute('hidden')

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel3).toHaveAttribute('hidden')

      expect(spyScrollIntoView).not.toHaveBeenCalled()
    })

    it('does not change tab via click on already selected tab', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].shadowRoot.querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      ldTabItems[0].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[0], 'scrollIntoView')

      tabBtn0.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      expect(spyScrollIntoView).not.toHaveBeenCalled()
    })
  })

  describe('keyboard interactions', () => {
    it('changes focus via arrow keys and selection via enter or space', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
            <ld-tab>Nuts</ld-tab>
            <ld-tab disabled>Grain</ld-tab>
          </ld-tablist>
          <ld-tabpanellist>
            <ld-tabpanel>Apple, orange, banana</ld-tabpanel>
            <ld-tabpanel>Potato, cucumber, tomato</ld-tabpanel>
            <ld-tabpanel>Walnut, chestnut, <a href="#">strawberry</a></ld-tabpanel>
            <ld-tabpanel>Maize, rice, soybeans, wheat</ld-tabpanel>
          </ld-tabpanellist>
        </ld-tabs>
      `,
      })
      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      const [ldTab0, ldTab1, ldTab2, ldTab3] = Array.from(ldTabItems)
      expect(ldTabItems.length).toEqual(4)

      const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
      const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
      expect(ldTabpanels.length).toEqual(4)

      const tabBtn0 = ldTab0.shadowRoot.querySelector('button')
      const tabBtn1 = ldTab1.shadowRoot.querySelector('button')
      const tabBtn2 = ldTab2.shadowRoot.querySelector('button')
      const tabBtn3 = ldTab3.shadowRoot.querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0).not.toHaveAttribute('hidden')

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel1 = ldTabpanels[1]
      expect(ldTabpanel1).toHaveAttribute('hidden')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel2 = ldTabpanels[2]
      expect(ldTabpanel2).toHaveAttribute('hidden')

      ldTabpanel2.focus = jest.fn(focusManager.focus)
      const spyTabpanelFocus2 = jest.spyOn(ldTabpanel2, 'focus')

      const ldTabpanel3 = ldTabpanels[3]
      expect(ldTabpanel3).toHaveAttribute('hidden')

      ldTab0.scrollIntoView = jest.fn()
      ldTab1.scrollIntoView = jest.fn()
      ldTab2.scrollIntoView = jest.fn()
      ldTab3.scrollIntoView = jest.fn()
      const spyScrollIntoView0 = jest.spyOn(ldTab0, 'scrollIntoView')
      const spyScrollIntoView1 = jest.spyOn(ldTab1, 'scrollIntoView')
      const spyScrollIntoView2 = jest.spyOn(ldTab2, 'scrollIntoView')
      const spyScrollIntoView3 = jest.spyOn(ldTab3, 'scrollIntoView')

      tabBtn0.focus = jest.fn(focusManager.focus)
      tabBtn1.focus = jest.fn(focusManager.focus)
      tabBtn2.focus = jest.fn(focusManager.focus)
      tabBtn3.focus = jest.fn(focusManager.focus)

      ldTab0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()

      expect(spyScrollIntoView1).toHaveBeenCalledTimes(1)

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(ldTabpanel0).not.toHaveAttribute('hidden')

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')

      ldTab1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView2).toHaveBeenCalledTimes(1)

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(spyScrollIntoView2).toHaveBeenCalledTimes(2)

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel0).toHaveAttribute('hidden')

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel1).toHaveAttribute('hidden')

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)
      expect(ldTabpanel2).not.toHaveAttribute('hidden')

      ldTab2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView3).toHaveBeenCalledTimes(1)

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)
      expect(ldTabpanel2).not.toHaveAttribute('hidden')

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel3).toHaveAttribute('hidden')

      ldTab3.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView3).toHaveBeenCalledTimes(1)

      ldTab3.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView2).toHaveBeenCalledTimes(3)

      ldTab2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView1).toHaveBeenCalledTimes(2)

      ldTab1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      ldTab0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      ldTab0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      ldTab0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      )
      await page.waitForChanges()

      expect(spyTabpanelFocus2).toHaveBeenCalled()
    })
  })

  describe('events', () => {
    it('emits ldtabchange event', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs>
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })

      const ldTabs = page.root
      const ldTablist = ldTabs.querySelector('ld-tablist')

      const ldTabItems = ldTablist.querySelectorAll('ld-tab')
      expect(ldTabItems.length).toEqual(2)

      const ldTabBtn1 = ldTabItems[1]
      ldTabBtn1.scrollIntoView = jest.fn()
      const tabBtn1 = ldTabBtn1.shadowRoot.querySelector('button')
      const handleLdtabchange = jest.fn()

      ldTabs.addEventListener('ldtabchange', handleLdtabchange)
      tabBtn1.dispatchEvent(new Event('click'))
      await page.waitForChanges()
      expect(handleLdtabchange).toHaveBeenCalled()
    })
  })
})
