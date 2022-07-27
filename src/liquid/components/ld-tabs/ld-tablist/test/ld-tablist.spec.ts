import { newSpecPage } from '@stencil/core/testing'
import { LdTablist } from '../ld-tablist'
import { LdTab } from '../../ld-tab/ld-tab'
import '../../../../utils/resizeObserver'
import { getTriggerableMutationObserver } from '../../../../utils/mutationObserver'
import { LdIcon } from '../../../ld-icon/ld-icon'

const components = [LdTablist, LdTab, LdIcon]

describe('ld-tablist', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  describe('modifiers', () => {
    it('size', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist size="sm">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab><ld-icon name="placeholder" />Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('watches size', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist size="sm">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab><ld-icon name="placeholder" />Vegetables</ld-tab>
          <ld-tab><span class="ld-icon" />Nuts</ld-tab>
        </ld-tablist>
      `,
      })
      await page.waitForChanges()

      const ldIcon = page.root.querySelector('ld-icon')
      const icon = page.root.querySelector('.ld-icon')
      expect(ldIcon.size).toEqual('sm')
      expect(icon).toHaveClass('ld-icon--sm')

      page.root.size = 'lg'
      page.waitForChanges()
      expect(ldIcon.size).toEqual('lg')
      expect(icon).not.toHaveClass('ld-icon--sm')
      expect(icon).toHaveClass('ld-icon--lg')

      page.root.size = undefined
      page.waitForChanges()
      expect(ldIcon.size).toEqual(undefined)
      expect(icon).not.toHaveClass('ld-icon--sm')
      expect(icon).not.toHaveClass('ld-icon--lg')
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

  describe('floating mode', () => {
    it('adds and removes focus visible class on click and focus out', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist mode="floating">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      const tabList = page.root.shadowRoot.querySelector('.ld-tablist')
      expect(tabList).toHaveClass('ld-tablist--focus-visible')

      const evClick = {
        type: 'click',
        pointerType: 'mouse',
      } as unknown as MouseEvent
      page.root.dispatchEvent(evClick)
      await page.waitForChanges()
      expect(tabList).not.toHaveClass('ld-tablist--focus-visible')

      const evFocus = {
        type: 'focusout',
        relatedTarget: page.body,
      } as unknown as FocusEvent
      page.root.dispatchEvent(evFocus)
      await page.waitForChanges()
      expect(tabList).toHaveClass('ld-tablist--focus-visible')
    })

    it('updates selected tab indicator', async () => {
      const page = await newSpecPage({
        components,
        html: `
        <ld-tablist mode="floating">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
      })
      const tabList = page.root.shadowRoot.querySelector('.ld-tablist')
      expect(tabList).toHaveClass('ld-tablist--focus-visible')

      const indicator = page.root.shadowRoot.querySelector(
        '.ld-tablist__active-tab-indicator'
      )

      page.root
        .querySelectorAll('ld-tab')[1]
        .dispatchEvent(new CustomEvent('ldtabselect', { bubbles: true }))
      await page.waitForChanges()

      expect((indicator as HTMLElement).style.opacity).toEqual('1')

      page.root.querySelectorAll('ld-tab')[0].remove()
      getTriggerableMutationObserver().trigger([])
      page.waitForChanges()
      expect((indicator as HTMLElement).style.opacity).toEqual('0')
    })
  })

  it('sets initialized class for enabling transitions after initialization', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-tablist mode="floating">
          <ld-tab selected>Fruits</ld-tab>
          <ld-tab>Vegetables</ld-tab>
        </ld-tablist>
      `,
    })
    const tabList = page.root.shadowRoot.querySelector('.ld-tablist')
    expect(tabList).not.toHaveClass('ld-tablist--initialized')
    jest.advanceTimersByTime(0)
    await page.waitForChanges()
    expect(tabList).toHaveClass('ld-tablist--initialized')
  })
})
