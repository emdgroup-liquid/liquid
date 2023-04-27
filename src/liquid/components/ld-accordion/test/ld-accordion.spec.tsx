import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdAccordion } from '../ld-accordion'
import { LdAccordionPanel } from '../ld-accordion-panel/ld-accordion-panel'
import { LdAccordionSection } from '../ld-accordion-section/ld-accordion-section'
import { LdAccordionToggle } from '../ld-accordion-toggle/ld-accordion-toggle'
import { getTriggerableResizeObserver } from '../../../utils/resizeObserver'

const components = [
  LdAccordion,
  LdAccordionSection,
  LdAccordionToggle,
  LdAccordionPanel,
]

async function transitionEnd(page, target) {
  const transitionEndHandler = page.root['__listeners'].find(
    (l) => l.type === 'transitionEnd'
  ).handler
  transitionEndHandler({ target })
  await page.waitForChanges()
}

describe('ld-accordion', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components,
      template: () => (
        <ld-accordion>
          <ld-accordion-section expanded>
            <ld-accordion-toggle>Fruits</ld-accordion-toggle>
            <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
          </ld-accordion-section>
          <ld-accordion-section>
            <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
            <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
          </ld-accordion-section>
          <ld-accordion-section>
            <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
            <ld-accordion-panel>
              Walnut, chestnut, strawberry
            </ld-accordion-panel>
          </ld-accordion-section>
        </ld-accordion>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('observes panel content for changes to its size', async () => {
    const page = await newSpecPage({
      components,
      template: () => (
        <ld-accordion>
          <ld-accordion-section>
            <ld-accordion-toggle>Fruits</ld-accordion-toggle>
            <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
          </ld-accordion-section>
          <ld-accordion-section>
            <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
            <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
          </ld-accordion-section>
          <ld-accordion-section>
            <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
            <ld-accordion-panel>
              Walnut, chestnut, strawberry
            </ld-accordion-panel>
          </ld-accordion-section>
        </ld-accordion>
      ),
    })

    expect(getTriggerableResizeObserver()).toBeUndefined()

    const ldAccordion = page.root

    const ldAccordionPanels = ldAccordion.querySelectorAll('ld-accordion-panel')
    expect(ldAccordionPanels.length).toEqual(3)

    const firstPanel = ldAccordionPanels[0]

    expect(firstPanel).not.toHaveClass('ld-accordion-panel--initialized')

    jest.advanceTimersByTime(0)
    await page.waitForChanges()
    await transitionEnd(page, firstPanel)
    expect(firstPanel).toHaveClass('ld-accordion-panel--initialized')

    const resizeObserver = getTriggerableResizeObserver()
    expect(resizeObserver).not.toBeUndefined()

    resizeObserver.trigger()
    expect(firstPanel.style.cssText).toEqual(
      '--ld-accordion-panel-max-height: 0px;'
    )
  })

  describe('mouse interactions', () => {
    it('expands sections via click with preselected section', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
              <ld-accordion-panel>
                Walnut, chestnut, strawberry
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })

      const ldAccordion = page.root

      const ldAccordionToggles = ldAccordion.querySelectorAll(
        'ld-accordion-toggle'
      )
      expect(ldAccordionToggles.length).toEqual(3)

      const ldAccordionPanels =
        ldAccordion.querySelectorAll('ld-accordion-panel')
      expect(ldAccordionPanels.length).toEqual(3)

      const triggerBtn0 =
        ldAccordionToggles[0].shadowRoot.querySelector('button')
      const triggerBtn1 =
        ldAccordionToggles[1].shadowRoot.querySelector('button')

      expect(triggerBtn0.getAttribute('aria-expanded')).toEqual('true')
      expect(triggerBtn1.getAttribute('aria-expanded')).toEqual('false')

      triggerBtn1.dispatchEvent(new Event('click'))
      await page.waitForChanges()
      await transitionEnd(page, ldAccordionPanels[1])

      expect(triggerBtn0).toHaveAttribute('aria-expanded')
      expect(triggerBtn1).toHaveAttribute('aria-expanded')
    })

    it('does not expands on click in nested accordion', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle id="toggle-outer">Outer</ld-accordion-toggle>
              <ld-accordion-panel>
                <ld-accordion>
                  <ld-accordion-section>
                    <ld-accordion-toggle id="toggle-inner">
                      Inner
                    </ld-accordion-toggle>
                    <ld-accordion-panel>Yolo</ld-accordion-panel>
                  </ld-accordion-section>
                </ld-accordion>
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })

      const ldAccordion = page.root

      const ldAccordionToggleOuter = ldAccordion.querySelector('#toggle-outer')
      const ldAccordionToggleInner = ldAccordion.querySelector('#toggle-inner')

      const triggerBtnOuter =
        ldAccordionToggleOuter.shadowRoot.querySelector('button')
      const triggerBtnInner =
        ldAccordionToggleInner.shadowRoot.querySelector('button')

      expect(triggerBtnOuter.getAttribute('aria-expanded')).toEqual('true')
      expect(triggerBtnInner.getAttribute('aria-expanded')).toEqual('false')

      triggerBtnInner.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(triggerBtnOuter).toHaveAttribute('aria-expanded')
      expect(triggerBtnInner).toHaveAttribute('aria-expanded')
    })

    it('collapses sections in single mode', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion single>
            <ld-accordion-section expanded>
              <ld-accordion-toggle>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
              <ld-accordion-panel>
                Walnut, chestnut, strawberry
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })

      const ldAccordion = page.root

      const ldAccordionToggles = ldAccordion.querySelectorAll(
        'ld-accordion-toggle'
      )
      expect(ldAccordionToggles.length).toEqual(3)

      const ldAccordionPanels =
        ldAccordion.querySelectorAll('ld-accordion-panel')
      expect(ldAccordionPanels.length).toEqual(3)

      const triggerBtn0 =
        ldAccordionToggles[0].shadowRoot.querySelector('button')
      const triggerBtn1 =
        ldAccordionToggles[1].shadowRoot.querySelector('button')

      expect(triggerBtn0.getAttribute('aria-expanded')).toEqual('true')
      expect(triggerBtn1.getAttribute('aria-expanded')).toEqual('false')

      triggerBtn1.dispatchEvent(new Event('click'))
      await page.waitForChanges()

      expect(triggerBtn0.getAttribute('aria-expanded')).toEqual('false')
      expect(triggerBtn1.getAttribute('aria-expanded')).toEqual('true')
    })
  })

  describe('keyboard interactions', () => {
    it('changes focus via arrow keys', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
              <ld-accordion-panel>
                Walnut, chestnut, strawberry
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })
      const ldAccordion = page.root

      const ldAccordionToggles = ldAccordion.querySelectorAll(
        'ld-accordion-toggle'
      )
      const [ldAccordionToggle0, ldAccordionToggle1, ldAccordionToggle2] =
        Array.from(ldAccordionToggles)
      expect(ldAccordionToggles.length).toEqual(3)

      const triggerBtn0 = ldAccordionToggle0.shadowRoot.querySelector('button')
      const triggerBtn1 = ldAccordionToggle1.shadowRoot.querySelector('button')
      const triggerBtn2 = ldAccordionToggle2.shadowRoot.querySelector('button')

      triggerBtn0.focus = jest.fn()
      triggerBtn1.focus = jest.fn()
      triggerBtn2.focus = jest.fn()

      ldAccordionToggle0.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(0)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(0)

      ldAccordion.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(0)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(0)

      ldAccordionToggle1.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(0)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(1)

      ldAccordionToggle2.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(0)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(1)

      ldAccordionToggle1.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(1)

      ldAccordionToggle0.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
        })
      )
      await page.waitForChanges()

      expect(triggerBtn0.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn1.focus).toHaveBeenCalledTimes(1)
      expect(triggerBtn2.focus).toHaveBeenCalledTimes(1)
    })
  })

  describe('events', () => {
    it('emits ldaccordionchange and ldaccordiontoggleclick events', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
              <ld-accordion-panel>
                Walnut, chestnut, strawberry
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })

      const ldAccordion = page.root

      jest.advanceTimersByTime(0)
      await page.waitForChanges()
      await transitionEnd(
        page,
        ldAccordion.querySelectorAll('ld-accordion-panel')[1]
      )

      const handleLdaccordionchange = jest.fn()
      const handleLdaccordiontoggleclick = jest.fn()
      ldAccordion.addEventListener('ldaccordionchange', handleLdaccordionchange)
      ldAccordion.addEventListener(
        'ldaccordiontoggleclick',
        handleLdaccordiontoggleclick
      )

      const ldAccordionToggles = ldAccordion.querySelectorAll(
        'ld-accordion-toggle'
      )
      const triggerBtn0 =
        ldAccordionToggles[0].shadowRoot.querySelector('button')
      const triggerBtn2 =
        ldAccordionToggles[2].shadowRoot.querySelector('button')

      triggerBtn0.dispatchEvent(new Event('click'))

      expect(handleLdaccordionchange).toHaveBeenCalledTimes(1)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(1)

      triggerBtn0.dispatchEvent(new Event('click'))
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(2)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(2)

      triggerBtn2.dispatchEvent(new Event('click'))
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(2)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(2)
    })

    it('emits ldaccordionchange, ldaccordionlabelclick and ldaccordiontoggleclick events in split mode', async () => {
      const page = await newSpecPage({
        components,
        template: () => (
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle split>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>Apple, orange, banana</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle split>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>Potato, cucumber, tomato</ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle split disabled>
                Nuts
              </ld-accordion-toggle>
              <ld-accordion-panel>
                Walnut, chestnut, strawberry
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
        ),
      })

      const ldAccordion = page.root

      const handleLdaccordionchange = jest.fn()
      const handleLdaccordionlabelclick = jest.fn()
      const handleLdaccordiontoggleclick = jest.fn()
      ldAccordion.addEventListener('ldaccordionchange', handleLdaccordionchange)
      ldAccordion.addEventListener(
        'ldaccordionlabelclick',
        handleLdaccordionlabelclick
      )
      ldAccordion.addEventListener(
        'ldaccordiontoggleclick',
        handleLdaccordiontoggleclick
      )

      const ldAccordionToggles = ldAccordion.querySelectorAll(
        'ld-accordion-toggle'
      )
      const toggleTriggerBtn0 = ldAccordionToggles[0].shadowRoot.querySelector(
        'button.ld-accordion-toggle__trigger'
      )
      const toggleLabelBtn0 = ldAccordionToggles[0].shadowRoot.querySelector(
        'button.ld-accordion-toggle__label'
      )
      const toggleTriggerBtn2 = ldAccordionToggles[2].shadowRoot.querySelector(
        'button.ld-accordion-toggle__trigger'
      )
      const toggleLabelBtn2 = ldAccordionToggles[2].shadowRoot.querySelector(
        'button.ld-accordion-toggle__label'
      )

      toggleLabelBtn0.dispatchEvent(new Event('click'))
      expect(handleLdaccordionlabelclick).toHaveBeenCalledTimes(1)
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(0)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(0)

      toggleTriggerBtn0.dispatchEvent(new Event('click'))
      expect(handleLdaccordionlabelclick).toHaveBeenCalledTimes(1)
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(1)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(1)

      toggleLabelBtn2.dispatchEvent(new Event('click'))
      expect(handleLdaccordionlabelclick).toHaveBeenCalledTimes(1)
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(1)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(1)

      toggleTriggerBtn2.dispatchEvent(new Event('click'))
      expect(handleLdaccordionlabelclick).toHaveBeenCalledTimes(1)
      expect(handleLdaccordionchange).toHaveBeenCalledTimes(1)
      expect(handleLdaccordiontoggleclick).toHaveBeenCalledTimes(1)
    })
  })

  it('does not throw when disconnecting before hydration', () => {
    const component = new LdAccordionPanel()
    component.disconnectedCallback()
  })
})
