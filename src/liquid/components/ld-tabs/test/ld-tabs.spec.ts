import { newSpecPage } from '@stencil/core/testing'
import { LdTabs } from '../ld-tabs'
import { LdTablist } from '../ld-tablist'
import { LdTab } from '../ld-tab'
import { LdTabpanellist } from '../ld-tabpanellist'
import { LdTabpanel } from '../ld-tabpanel'

class FocusManager {
  focus(el) {
    const doc = (document as unknown) as { activeElement: Element }
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
    const ldTabs = page.root
    const ldTablist = ldTabs.querySelector('ld-tablist')
    expect(ldTablist.getAttribute('role')).toEqual('tablist')

    const ldTabItems = ldTablist.querySelectorAll('ld-tab')
    expect(ldTabItems.length).toEqual(4)

    const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
    const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
    expect(ldTabpanels.length).toEqual(4)

    const tabBtn0 = ldTabItems[0].querySelector('button')
    expect(tabBtn0.getAttribute('id')).toEqual('ld-tabs-0-tab-0')
    expect(tabBtn0.getAttribute('role')).toEqual('tab')
    expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
    expect(tabBtn0.getAttribute('aria-disabled')).toEqual(null)
    expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

    const ldTabpanel0 = ldTabpanels[0]
    expect(ldTabpanel0.querySelector('section').getAttribute('role')).toEqual(
      'tabpanel'
    )
    expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(false)

    const tabBtn2 = ldTabItems[2].querySelector('button')
    expect(tabBtn2.getAttribute('id')).toEqual('ld-tabs-0-tab-2')
    expect(tabBtn2.getAttribute('role')).toEqual('tab')
    expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
    expect(tabBtn2.getAttribute('aria-disabled')).toEqual(null)
    expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

    const ldTabpanel2 = ldTabpanels[2]
    expect(ldTabpanel2.querySelector('section').getAttribute('role')).toEqual(
      'tabpanel'
    )
    expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(true)

    const tabBtn3 = ldTabItems[3].querySelector('button')
    expect(tabBtn3.getAttribute('id')).toEqual('ld-tabs-0-tab-3')
    expect(tabBtn3.getAttribute('role')).toEqual('tab')
    expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
    expect(tabBtn3.getAttribute('aria-disabled')).toEqual('true')
    expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')

    const ldTabpanel3 = ldTabpanels[3]
    expect(ldTabpanel3.querySelector('section').getAttribute('role')).toEqual(
      'tabpanel'
    )
    expect(ldTabpanel3.classList.contains('ld-tabpanel--hidden')).toEqual(true)
  })

  describe('mouse interactions', () => {
    it('changes tab via click', async () => {
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

      const tabBtn0 = ldTabItems[0].querySelector('button')
      const tabBtn2 = ldTabItems[2].querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel2 = ldTabpanels[2]
      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      ldTabItems[2].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[2], 'scrollIntoView')

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

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

      const tabBtn0 = ldTabItems[0].querySelector('button')
      const tabBtn2 = ldTabItems[2].querySelector('button')
      const ldTabpanel0 = ldTabpanels[0]
      const ldTabpanel2 = ldTabpanels[2]

      ldTabItems[2].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[2], 'scrollIntoView')

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

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

      const tabBtn0 = ldTabItems[0].querySelector('button')
      const tabBtn2 = ldTabItems[2].querySelector('button')

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

      const tabBtn0 = ldTabItems[0].querySelector('button')
      const tabBtn3 = ldTabItems[3].querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel3 = ldTabpanels[3]
      expect(ldTabpanel3.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      ldTabItems[3].scrollIntoView = jest.fn()
      const spyScrollIntoView = jest.spyOn(ldTabItems[3], 'scrollIntoView')

      tabBtn3.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')

      expect(ldTabpanel3.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

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

      const tabBtn0 = ldTabItems[0].querySelector('button')

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
      expect(ldTabItems.length).toEqual(4)

      const ldTabpanellist = ldTabs.querySelector('ld-tabpanellist')
      const ldTabpanels = ldTabpanellist.querySelectorAll('ld-tabpanel')
      expect(ldTabpanels.length).toEqual(4)

      const tabBtn0 = ldTabItems[0].querySelector('button')
      const tabBtn1 = ldTabItems[1].querySelector('button')
      const tabBtn2 = ldTabItems[2].querySelector('button')
      const tabBtn3 = ldTabItems[3].querySelector('button')

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn0.getAttribute('tabindex')).toEqual(null)

      const ldTabpanel0 = ldTabpanels[0]
      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel1 = ldTabpanels[1]
      expect(ldTabpanel1.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      expect(tabBtn2.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn2.getAttribute('tabindex')).toEqual('-1')

      const ldTabpanel2 = ldTabpanels[2]
      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )
      const tabpanelSection2 = ldTabpanel2.querySelector('section')
      tabpanelSection2.focus = jest.fn(focusManager.focus)
      const spyTabpanelFocus2 = jest.spyOn(tabpanelSection2, 'focus')

      const ldTabpanel3 = ldTabpanels[3]
      expect(ldTabpanel3.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      ldTabItems[0].scrollIntoView = jest.fn()
      ldTabItems[1].scrollIntoView = jest.fn()
      ldTabItems[2].scrollIntoView = jest.fn()
      ldTabItems[3].scrollIntoView = jest.fn()
      const spyScrollIntoView0 = jest.spyOn(ldTabItems[0], 'scrollIntoView')
      const spyScrollIntoView1 = jest.spyOn(ldTabItems[1], 'scrollIntoView')
      const spyScrollIntoView2 = jest.spyOn(ldTabItems[2], 'scrollIntoView')
      const spyScrollIntoView3 = jest.spyOn(ldTabItems[3], 'scrollIntoView')

      tabBtn0.focus = jest.fn(focusManager.focus)
      tabBtn1.focus = jest.fn(focusManager.focus)
      tabBtn2.focus = jest.fn(focusManager.focus)
      tabBtn3.focus = jest.fn(focusManager.focus)

      tabBtn0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()

      expect(spyScrollIntoView1).toHaveBeenCalledTimes(1)

      expect(tabBtn0.getAttribute('aria-selected')).toEqual('true')
      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')

      tabBtn1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView2).toHaveBeenCalledTimes(1)

      tabBtn2.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(spyScrollIntoView2).toHaveBeenCalledTimes(2)

      expect(tabBtn0.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn0.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel0.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      expect(tabBtn1.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn1.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel1.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)
      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      tabBtn2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView3).toHaveBeenCalledTimes(1)

      expect(tabBtn2.getAttribute('aria-selected')).toEqual('true')
      expect(tabBtn2.getAttribute('tabindex')).toEqual(null)
      expect(ldTabpanel2.classList.contains('ld-tabpanel--hidden')).toEqual(
        false
      )

      expect(tabBtn3.getAttribute('aria-selected')).toEqual(null)
      expect(tabBtn3.getAttribute('tabindex')).toEqual('-1')
      expect(ldTabpanel3.classList.contains('ld-tabpanel--hidden')).toEqual(
        true
      )

      tabBtn3.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView3).toHaveBeenCalledTimes(1)

      tabBtn3.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView2).toHaveBeenCalledTimes(3)

      tabBtn2.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView1).toHaveBeenCalledTimes(2)

      tabBtn1.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      tabBtn0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      tabBtn0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      )
      await page.waitForChanges()
      expect(spyScrollIntoView0).toHaveBeenCalledTimes(1)

      tabBtn0.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
      )
      await page.waitForChanges()

      expect(spyTabpanelFocus2).toHaveBeenCalled()
    })
  })

  describe('events', () => {
    it('emits tabChange event', async () => {
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
      const tabBtn1 = ldTabBtn1.querySelector('button')

      const handlers = {
        onTabChange() {
          return
        },
      }

      const spyTabChange = jest.spyOn(handlers, 'onTabChange')
      ldTabs.addEventListener('tabChange', handlers.onTabChange)
      tabBtn1.dispatchEvent(new Event('click'))
      await page.waitForChanges()
      expect(spyTabChange).toHaveBeenCalled()
    })
  })

  describe('modifiers', () => {
    it('size', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs size="sm">
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })
      expect(page.root.classList.contains('ld-tabs--sm')).toBeTruthy()
    })

    it('mode', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs mode="ghost">
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })
      expect(page.root.classList.contains('ld-tabs--ghost')).toBeTruthy()
    })

    it('rounded', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tabs rounded="all-lg">
          <ld-tablist>
            <ld-tab selected>Fruits</ld-tab>
            <ld-tab>Vegetables</ld-tab>
          </ld-tablist>
        </ld-tabs>
      `,
      })
      expect(
        page.root.classList.contains('ld-tabs--rounded-all-lg')
      ).toBeTruthy()
    })
  })
})
