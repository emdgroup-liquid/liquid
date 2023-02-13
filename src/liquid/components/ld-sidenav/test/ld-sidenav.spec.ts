import { LdAccordion } from '../../ld-accordion/ld-accordion'

jest.mock('../../../utils/focus')

import MatchMediaMock from 'jest-matchmedia-mock'
import { newSpecPage } from '@stencil/core/testing'
import { LdAccordionSection } from '../../ld-accordion/ld-accordion-section/ld-accordion-section'
import { LdAccordionToggle } from '../../ld-accordion/ld-accordion-toggle/ld-accordion-toggle'
import { LdAccordionPanel } from '../../ld-accordion/ld-accordion-panel/ld-accordion-panel'
import { LdButton } from '../../ld-button/ld-button'
import { LdSidenav } from '../ld-sidenav'
import { LdSidenavAccordion } from '../ld-sidenav-accordion/ld-sidenav-accordion'
import { LdSidenavBack } from '../ld-sidenav-back/ld-sidenav-back'
import { LdSidenavHeader } from '../ld-sidenav-header/ld-sidenav-header'
import { LdSidenavHeading } from '../ld-sidenav-heading/ld-sidenav-heading'
import { LdSidenavNavitem } from '../ld-sidenav-navitem/ld-sidenav-navitem'
import { LdSidenavScrollerInternal } from '../ld-sidenav-scroller-internal/ld-sidenav-scroller-internal'
import { LdSidenavSeparator } from '../ld-sidenav-separator/ld-sidenav-separator'
import { LdSidenavSlider } from '../ld-sidenav-slider/ld-sidenav-slider'
import { LdSidenavSubnav } from '../ld-sidenav-subnav/ld-sidenav-subnav'
import { LdSidenavToggleOutside } from '../ld-sidenav-toggle-outside/ld-sidenav-toggle-outside'
import { LdTooltip } from '../../ld-tooltip/ld-tooltip'
import { getFirstFocusable } from '../../../utils/focus'
import { getSidenavWithAccordion, getSidenavWithSubnavigation } from './utils'
import '../../../utils/resizeObserver'
import '../../../utils/mutationObserver'

let matchMedia
const mockedGetFirstFocusable = getFirstFocusable as jest.Mock

async function transitionEnd(page, transitionTarget = undefined) {
  const ldSidenav = page.body.querySelector('ld-sidenav')
  if (!transitionTarget) {
    transitionTarget = ldSidenav
  }
  const transitionEndHandler = transitionTarget['__listeners'].find(
    (l) => l.type === 'transitionEnd'
  ).handler
  transitionEndHandler({ target: transitionTarget })
  await page.waitForChanges()
}

function mockFocus(ldSidenav) {
  ldSidenav
    .querySelectorAll('ld-sidenav-navitem')
    .forEach(
      (item) =>
        (item.shadowRoot.querySelector('.ld-sidenav-navitem').focus = jest.fn())
    )
  const ldSidenavBack = ldSidenav.querySelector('ld-sidenav-back')
  if (ldSidenavBack) {
    ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back').focus = jest.fn()
  }
}

const sidenavComponents = [
  LdAccordion,
  LdAccordionSection,
  LdAccordionToggle,
  LdAccordionPanel,
  LdButton,
  LdSidenav,
  LdSidenavAccordion,
  LdSidenavBack,
  LdSidenavHeader,
  LdSidenavHeading,
  LdSidenavNavitem,
  LdSidenavScrollerInternal,
  LdSidenavSeparator,
  LdSidenavSlider,
  LdSidenavSubnav,
  LdSidenavToggleOutside,
  LdTooltip,
]

describe('ld-sidenav', () => {
  beforeEach(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.body).toMatchSnapshot()
  })

  it('sets initialized class after timeout in order to enable transitions', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).not.toHaveClass('ld-sidenav--transitions')

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(page.root).toHaveClass('ld-sidenav--transitions')
  })

  it('updates closable state on breakpoint change', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).not.toHaveClass('ld-sidenav--closable')

    const mediaQueries = matchMedia.getMediaQueries()
    matchMedia.useMediaQuery(mediaQueries[0])
    await page.waitForChanges()

    expect(page.root).toHaveClass('ld-sidenav--closable')
  })

  it('applies open class', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).not.toHaveClass('ld-sidenav--open')
    page.root.setAttribute('open', '')
    await page.waitForChanges()
    expect(page.root).toHaveClass('ld-sidenav--open')
  })

  it('aligns to the right', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav align="right"></ld-sidenav>',
    })
    expect(page.body).toMatchSnapshot()
  })

  it('aligns toggle outside to the right', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: `
        <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
        <ld-sidenav align="right"></ld-sidenav>
      `,
    })
    expect(page.body).toMatchSnapshot()
  })

  it('aligns header to the right', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: `
        <ld-sidenav align="right">
          <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
        </ld-sidenav>
      `,
    })
    expect(page.body).toMatchSnapshot()
  })

  describe('collapsible mode', () => {
    beforeAll(() => {
      matchMedia = new MatchMediaMock()
    })

    it('is collapsible', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible></ld-sidenav>',
      })
      expect(page.body).toMatchSnapshot()
    })

    it('is collapsed', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapsed></ld-sidenav>',
      })
      expect(page.body).toMatchSnapshot()
    })

    it('does not expand on mouse enter when narrow', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapsed narrow>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on toggle', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapsed narrow>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )
      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on toggle outside', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
          <ld-sidenav collapsible collapsed>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      expect(ldSidenav).toHaveClass('ld-sidenav--fully-collapsible')

      const ldSidenavToggleOutside = page.body.querySelector(
        'ld-sidenav-toggle-outside'
      )
      const btnToggleOutside =
        ldSidenavToggleOutside.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnHeaderToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )
      btnHeaderToggle.focus = jest.fn()

      const ev = new MouseEvent('click', { bubbles: true, cancelable: true })
      btnToggleOutside.dispatchEvent(ev)
      await page.waitForChanges()

      // event propagation must be stopped to prevent call of click outside handler
      expect(ev.cancelBubble).toBeTruthy()

      jest.advanceTimersByTime(200)
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on mouse enter when narrow with explicit expand-trigger', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapsed narrow expand-trigger="mouseenter">
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('does not expands on focus inside', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav collapsible collapsed>
          <button>foobar</button>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const button = ldSidenav.querySelector('button')

      const ev = {
        type: 'focusout',
        relatedTarget: button,
        bubbles: true,
      } as unknown as FocusEvent
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on focus inside with expand trigger mouseenter', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav collapsible collapsed expand-trigger="mouseenter">
          <button>foobar</button>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const button = ldSidenav.querySelector('button')

      const ev = {
        type: 'focusout',
        relatedTarget: button,
        bubbles: true,
      } as unknown as FocusEvent
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('collapses on toggle', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('collapses on click outside', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapse-trigger="clickoutside">
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const event = {
        type: 'click',
        isTrusted: true,
      }
      page.body.dispatchEvent(event as Event)
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('collapses on mouse out', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapse-trigger="mouseout">
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const event = {
        type: 'click',
        isTrusted: true,
      }
      page.body.dispatchEvent(event as Event)
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('collapses on focus out', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav collapsible collapse-trigger="mouseout">
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new FocusEvent('focusout', {
        relatedTarget: page.body,
      })
      window.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const event = {
        type: 'click',
        isTrusted: true,
      }
      page.body.dispatchEvent(event as Event)
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('does not expand on click of navitem without to prop', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector('ld-sidenav-navitem')

      ldSidenavNavitem.shadowRoot
        .querySelector('button')
        .dispatchEvent(new Event('mousedown'))
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on click of navitem with to prop', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed narrow>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem to="mathematical-foundations">Mathematical foundations</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector('ld-sidenav-navitem')

      ldSidenavNavitem.shadowRoot.querySelector('button').click()
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('does not expands on click of navitem with to prop with expand-on-click set to false', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem to="mathematical-foundations" expand-on-click="false">Mathematical foundations</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector('ld-sidenav-navitem')

      ldSidenavNavitem.shadowRoot.querySelector('button').click()
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on click of navitem without to prop with expand-on-click set to true', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem expand-on-click="true">Mathematical foundations</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector('ld-sidenav-navitem')

      ldSidenavNavitem.shadowRoot.querySelector('button').click()
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on click of sidenav accordion toggle', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-accordion slot="toggle">
              <ld-sidenav-navitem expand-on-click="true">Mathematical foundations</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="secondary">Coding theory</ld-sidenav-navitem>
            </ld-sidenav-accordion>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector(
        'ld-sidenav-navitem:first-of-type'
      )
      const ldAccordionSection = ldSidenav
        .querySelector('ld-sidenav-accordion')
        .shadowRoot.querySelector('ld-accordion-section')
      expect(ldAccordionSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )

      ldSidenavNavitem.shadowRoot.querySelector('button').click()
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
      expect(ldAccordionSection).toHaveClass('ld-accordion-section--expanded')
    })

    it('is expanded initially', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-accordion slot="toggle" expanded>
              <ld-sidenav-navitem expand-on-click="true">Mathematical foundations</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="secondary">Coding theory</ld-sidenav-navitem>
            </ld-sidenav-accordion>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      const ldAccordionSection = ldSidenav
        .querySelector('ld-sidenav-accordion')
        .shadowRoot.querySelector('ld-accordion-section')
      expect(ldAccordionSection).toHaveClass('ld-accordion-section--expanded')
    })

    it('does not expands on click of sidenav accordion toggle with expand-on-click set to false', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `<ld-sidenav collapsible collapsed>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-accordion slot="toggle">
              <ld-sidenav-navitem expand-on-click="false">Mathematical foundations</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="secondary">Coding theory</ld-sidenav-navitem>
            </ld-sidenav-accordion>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })

      const ldSidenav = page.body.querySelector('ld-sidenav')
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      const ldSidenavNavitem = ldSidenav.querySelector(
        'ld-sidenav-navitem:first-of-type'
      )
      const ldAccordionSection = ldSidenav
        .querySelector('ld-sidenav-accordion')
        .shadowRoot.querySelector('ld-accordion-section')
      expect(ldAccordionSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )

      ldSidenavNavitem.shadowRoot.querySelector('button').click()
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
      expect(ldAccordionSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )
    })
  })

  it('opens and closes via prop', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--open')

    ldSidenav.setAttribute('open', '')
    await page.waitForChanges()
    expect(ldSidenav).toHaveClass('ld-sidenav--open')

    ldSidenav.removeAttribute('open')
    await page.waitForChanges()
    expect(ldSidenav).not.toHaveClass('ld-sidenav--open')
  })

  it('opens and closes via events', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--open')

    ldSidenav.dispatchEvent(new CustomEvent('ldSidenavOpen'))
    await page.waitForChanges()
    expect(ldSidenav).toHaveClass('ld-sidenav--open')

    ldSidenav.dispatchEvent(new CustomEvent('ldSidenavClose'))
    await page.waitForChanges()
    expect(ldSidenav).not.toHaveClass('ld-sidenav--open')
  })

  it('slides', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation(),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      false
    )

    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    expect(ldSidenavBack.textContent.trim()).toBe('Outline of Computer Science')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--is-back')
    ).toBe(false)

    const ldSidenavNavitemArtInt =
      ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
        'ld-sidenav-slider > ld-sidenav-navitem:nth-child(4)'
      )
    ldSidenavNavitemArtInt.shadowRoot.querySelector('button').click()
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      true
    )
    expect(
      ldSidenav
        .querySelector('#artificial-intelligence')
        .classList.contains('ld-sidenav-subnav--active')
    ).toBe(true)

    expect(ldSidenavBack.textContent.trim()).toBe('Outline of Computer Science')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--is-back')
    ).toBe(true)
  })

  it('expands on slide', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        collapsible: true,
        collapsed: true,
        narrow: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(ldSidenav).toHaveClass('ld-sidenav--transitions')
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

    const ldSidenavNavitemArtInt =
      ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
        'ld-sidenav-slider > ld-sidenav-navitem:nth-child(4)'
      )
    ldSidenavNavitemArtInt.shadowRoot.querySelector('button').click()
    await page.waitForChanges()

    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
  })

  it('slides back', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      true
    )

    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    expect(ldSidenavBack.textContent.trim()).toBe('Outline of Computer Science')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--is-back')
    ).toBe(true)

    ldSidenavBack.shadowRoot
      .querySelector<HTMLElement>('[role="button"]')
      .click()
    await page.waitForChanges()

    await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--is-back')
    ).toBe(false)
  })

  it('hides subnavs when navigating to other subnavs', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()

    const subnavArtInt = ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
      '#artificial-intelligence'
    )
    expect(
      subnavArtInt.shadowRoot.querySelector('ld-sidenav-scroller-internal')
        .style.visibility
    ).not.toBe('hidden')

    const ldSidenavNavitemSoftComp =
      ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
        '#artificial-intelligence > ld-sidenav-navitem:nth-child(6)'
      )
    ldSidenavNavitemSoftComp.shadowRoot.querySelector('button').click()
    await page.waitForChanges()

    await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
    expect(
      subnavArtInt.shadowRoot.querySelector('ld-sidenav-scroller-internal')
        .style.visibility
    ).toBe('hidden')
  })

  it('navigates to subnav on current subnav prop change', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'algorithms-and-data-structures',
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()

    const subnavAlgDS = ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
      '#algorithms-and-data-structures'
    )
    const subnavMath = ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
      '#mathematical-foundations'
    )
    expect(
      subnavAlgDS.shadowRoot.querySelector('ld-sidenav-scroller-internal').style
        .visibility
    ).not.toBe('hidden')
    expect(
      subnavMath.shadowRoot.querySelector('ld-sidenav-scroller-internal').style
        .visibility
    ).toBe('hidden')

    const ldSidenavNavitemMath =
      ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
        '#algorithms-and-data-structures > ld-sidenav-navitem:nth-child(4)'
      )
    ldSidenavNavitemMath.shadowRoot.querySelector('button').click()
    await page.waitForChanges()

    await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
    expect(
      subnavAlgDS.shadowRoot.querySelector('ld-sidenav-scroller-internal').style
        .visibility
    ).toBe('hidden')
    expect(
      subnavMath.shadowRoot.querySelector('ld-sidenav-scroller-internal').style
        .visibility
    ).not.toBe('hidden')
  })

  it('slides back via keyboard', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    ldSidenavBack.shadowRoot
      .querySelector<HTMLElement>('[role="button"]')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()

    await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--is-back')
    ).toBe(false)
  })

  it('collapses', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
        collapsible: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      true
    )

    const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
    const btnToggle =
      ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
        'button[role="switch"]'
      )
    btnToggle.click()

    await page.waitForChanges()
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
  })

  it('collapses to narrow', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
        collapsible: true,
        narrow: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      false
    )

    const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
    const btnToggle =
      ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
        'button[role="switch"]'
      )
    btnToggle.click()

    await page.waitForChanges()
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

    expect(page.body).toMatchSnapshot()
  })

  it('collapses to narrow if it has a back button', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: `
        <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
        <ld-sidenav collapsible narrow>
          <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          <ld-sidenav-back slot="top">
            <ld-sidenav-navitem>Outline of Computer Science</ld-sidenav-navitem>
          </ld-sidenav-back>
          <ld-sidenav-slider label="Outline of Computer Science" current-subnav="hacking">
            <ld-sidenav-heading>Subfields</ld-sidenav-heading>
            <ld-sidenav-navitem to="cs-hacking">Hacking</ld-sidenav-navitem>
            <ld-sidenav-subnav
              id="hacking"
              label="Hacking"
            >
              <ld-sidenav-heading>Hacking</ld-sidenav-heading>
              <p>Almost before we knew it, we had left the ground.</p>
            </ld-sidenav-subnav>
          </ld-sidenav-slider>
        </ld-sidenav>
      `,
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      true
    )
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      false
    )
  })

  it('collapses to narrow if it has a nav item as a direct child', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: `
        <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
        <ld-sidenav collapsible narrow>
          <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
          <ld-sidenav-slider label="Outline of Computer Science" current-subnav="hacking">
            <ld-sidenav-heading>Subfields</ld-sidenav-heading>
            <ld-sidenav-navitem to="cs-hacking">Hacking</ld-sidenav-navitem>
            <ld-sidenav-subnav
              id="hacking"
              label="Hacking"
            >
              <ld-sidenav-heading>Hacking</ld-sidenav-heading>
              <p>Almost before we knew it, we had left the ground.</p>
            </ld-sidenav-subnav>
          </ld-sidenav-slider>
          <ld-sidenav-navitem slot="bottom" rounded>Student profile</ld-sidenav-navitem>
        </ld-sidenav>
      `,
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      true
    )
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      false
    )
  })

  it('updates back button collapsed state', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
        collapsible: true,
        narrow: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)

    const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
    const btnToggle =
      ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
        'button[role="switch"]'
      )
    btnToggle.click()

    await page.waitForChanges()

    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(true)

    btnToggle.click()

    await page.waitForChanges()

    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(false)

    btnToggle.click()

    await page.waitForChanges()

    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(true)

    const mediaQueries = matchMedia.getMediaQueries()
    matchMedia.useMediaQuery(mediaQueries[0])
    await page.waitForChanges()

    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(false)
  })

  it('applies rounded prop to back button', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
        collapsible: true,
        narrow: true,
        roundedBackButton: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)

    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--rounded')
    ).toBe(true)
  })

  it('shows slider on load if active', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation(),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const ldSidenavSlider = ldSidenav.querySelector('ld-sidenav-slider')
    expect(ldSidenavSlider.style.visibility).not.toBe('hidden')
  })

  it('hides slider on load if inactive', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const ldSidenavSlider = ldSidenav.querySelector('ld-sidenav-slider')
    expect(ldSidenavSlider.style.visibility).toBe('hidden')
  })

  it('ignores invalid prop for current subnav', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({ currentSubnav: 'yolo' }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      false
    )
  })

  describe('keyboard navigation', () => {
    beforeEach(() => {
      matchMedia = new MatchMediaMock()
    })

    it('navigates back on escape key press', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithSubnavigation({
          currentSubnav: 'artificial-intelligence',
        }),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      expect(ldSidenav).toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))

      expect(ldSidenav).toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      doc.activeElement = ldSidenav
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))

      expect(ldSidenav).not.toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')
    })

    it('does not close on escape key press when not closable', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: '<ld-sidenav open></ld-sidenav>',
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      expect(ldSidenav).toHaveClass('ld-sidenav--open')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--closable')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--open')
    })

    it('closes on escape key press when closable', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: '<ld-sidenav open></ld-sidenav>',
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--open')
      expect(ldSidenav).toHaveClass('ld-sidenav--closable')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()

      expect(ldSidenav).not.toHaveClass('ld-sidenav--open')
    })

    it('closes on escape key press when in first level and closable', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithSubnavigation(),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--open')
      expect(ldSidenav).toHaveClass('ld-sidenav--closable')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))

      expect(ldSidenav).not.toHaveClass('ld-sidenav--open')
    })

    it('does not trap the focus if the trap-focus prop is is not set', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open>
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      expect(anchor.focus).not.toHaveBeenCalled()
    })

    it('does not trap the focus if the sidebar is not closable', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="">
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      expect(ldSidenav).not.toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      expect(anchor.focus).not.toHaveBeenCalled()
    })

    it('does not trap the focus if the sidebar is closable but not open', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav trap-focus="">
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).not.toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      expect(anchor.focus).not.toHaveBeenCalled()
    })

    it('does not trap the focus as long as the focus remains in the sidenav', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="">
          <a href="#">I'm focusable</a>
          <button>I'm also focusable</button>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const button = ldSidenav.querySelector('button')
      button.focus = jest.fn()

      const ev = {
        type: 'focusout',
        relatedTarget: button,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor.focus).not.toHaveBeenCalled()
    })

    it('does not trap the focus when it moves to an element which matches the trap focus selector', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="#asdf">
          <a href="#">I'm focusable</a>
        </ld-sidenav><button id="asdf">I'm also focusable</button>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const button = page.body.querySelector('button')
      button.focus = jest.fn()

      const ev = {
        type: 'focusout',
        relatedTarget: button,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor.focus).not.toHaveBeenCalled()
    })

    it('traps the focus if the sidebar is closable and open with trap-focus set', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="">
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()
      mockedGetFirstFocusable.mockImplementationOnce(() => anchor)

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor.focus).toHaveBeenCalled()
    })

    it('traps the focus in the shadow dom of a web component within the sidenav', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="">
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      await page.waitForChanges()

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      jest.advanceTimersToNextTimer()
      await page.waitForChanges()

      anchor.focus = jest.fn()
      mockedGetFirstFocusable.mockImplementationOnce(() => anchor)

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
        composed: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor.focus).toHaveBeenCalledTimes(1)
    })

    it('loops the focus back to the first focusable element in the sidenav, when it moves out from an element which matches the trap focus selector', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="#asdf">
          <a href="#">I'm focusable</a>
        </ld-sidenav>
        <button id="asdf">I'm also focusable</button>
        <main tabindex="-1"></main>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')
      anchor.focus = jest.fn()

      const button = page.body.querySelector('button')
      mockedGetFirstFocusable
        .mockImplementationOnce(() => anchor)
        .mockImplementationOnce(() => button)

      const main = page.body.querySelector('main')

      const ev = {
        type: 'focusout',
        relatedTarget: main,
        bubbles: true,
      } as unknown as FocusEvent
      button.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor.focus).toHaveBeenCalled()
    })

    it('loops the focus back to the first focusable element matching the focus selector, when it moves out from the sidenav', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="#asdf">
          <a href="#">I'm focusable</a>
        </ld-sidenav>
        <button id="asdf">I'm also focusable</button>
        <main tabindex="-1"></main>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor = ldSidenav.querySelector('a')

      const button = page.body.querySelector('button')
      button.focus = jest.fn()
      mockedGetFirstFocusable
        .mockImplementationOnce(() => anchor)
        .mockImplementationOnce(() => button)

      const main = page.body.querySelector('main')

      const ev = {
        type: 'focusout',
        relatedTarget: main,
        bubbles: true,
      } as unknown as FocusEvent
      anchor.dispatchEvent(ev)

      await page.waitForChanges()

      expect(button.focus).toHaveBeenCalled()
    })

    it('loops the focus back to the last focusable element in the sidenav, when it moves out from the first element matching the trap focus selector', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<div id="asdf">
          <button id="button1">I'm also focusable</button>
          <button id="button2">I'm also focusable</button>
        </div>
        <ld-sidenav open trap-focus="#asdf *">
          <a id="anchor1" href="#">I'm focusable</a>
          <a id="anchor2" href="#">I'm focusable</a>
        </ld-sidenav>
        <main tabindex="-1"></main>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor1 = ldSidenav.querySelector<HTMLElement>('#anchor1')
      const anchor2 = ldSidenav.querySelector<HTMLElement>('#anchor2')
      anchor2.focus = jest.fn()

      const button1 = page.body.querySelector<HTMLElement>('#button1')
      const button2 = page.body.querySelector<HTMLElement>('#button2')
      mockedGetFirstFocusable
        .mockImplementationOnce(() => anchor1)
        .mockImplementationOnce(() => button1)
        .mockImplementationOnce(() => button2)
        .mockImplementationOnce(() => anchor2)

      const main = page.body.querySelector('main')

      const ev = {
        type: 'focusout',
        relatedTarget: main,
        bubbles: true,
      } as unknown as FocusEvent
      button1.dispatchEvent(ev)

      await page.waitForChanges()

      expect(anchor2.focus).toHaveBeenCalled()
    })

    it('loops the focus back to the last focusable element matching the focus selector, when it moves out backwards from the sidenav', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open trap-focus="#asdf *">
          <a id="anchor1" href="#">I'm focusable</a>
          <a id="anchor2" href="#">I'm focusable</a>
        </ld-sidenav>
        <div id="asdf">
          <button id="button1">I'm also focusable</button>
          <button id="button2">I'm also focusable</button>
        </div>
        <main tabindex="-1"></main>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const anchor1 = ldSidenav.querySelector<HTMLElement>('#anchor1')
      const anchor2 = ldSidenav.querySelector<HTMLElement>('#anchor2')

      const button1 = page.body.querySelector<HTMLElement>('#button1')
      const button2 = page.body.querySelector<HTMLElement>('#button2')
      button2.focus = jest.fn()
      mockedGetFirstFocusable
        .mockImplementationOnce(() => anchor1)
        .mockImplementationOnce(() => button1)
        .mockImplementationOnce(() => button2)
        .mockImplementationOnce(() => anchor2)

      const main = page.body.querySelector('main')

      const ev = {
        type: 'focusout',
        relatedTarget: main,
        bubbles: true,
      } as unknown as FocusEvent
      anchor1.dispatchEvent(ev)

      await page.waitForChanges()

      expect(button2.focus).toHaveBeenCalled()
    })

    it('sets focus on toggle outside, when the sidenav collapses fully', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
          <ld-sidenav open collapsible>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>
                Artificial intelligence
              </ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>`,
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')

      const ldSidenavToggleOutside = page.body.querySelector(
        'ld-sidenav-toggle-outside'
      )
      const btnToggleOutside =
        ldSidenavToggleOutside.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )
      btnToggleOutside.focus = jest.fn()

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnHeaderToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )

      btnHeaderToggle.click()
      await page.waitForChanges()
      await transitionEnd(page)

      expect(btnToggleOutside.focus).toHaveBeenCalled()
    })
  })

  describe('navitem abbreviation', () => {
    it('should abbreviate to two character if M is not included', async () => {
      const page = await newSpecPage({
        components: [LdSidenav, LdSidenavSlider, LdSidenavNavitem, LdTooltip],
        html: `<ld-sidenav open>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem>
              Artificial intelligence
            </ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })
      await page.waitForChanges()

      const ldSidenavNavitem = page.root.querySelector('ld-sidenav-navitem')
      const abbr = ldSidenavNavitem.shadowRoot.querySelector(
        '.ld-sidenav-navitem__abbr'
      )

      expect(abbr.textContent).toEqual('AI')
    })

    it('should abbreviate and ignore special characters', async () => {
      const page = await newSpecPage({
        components: [LdSidenav, LdSidenavSlider, LdSidenavNavitem, LdTooltip],
        html: `<ld-sidenav open>
          <ld-sidenav-slider label="Outline of Computer Science">
            <ld-sidenav-navitem>
              Algorithms & data structures
            </ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`,
      })
      await page.waitForChanges()

      const ldSidenavNavitem = page.root.querySelector('ld-sidenav-navitem')
      const abbr = ldSidenavNavitem.shadowRoot.querySelector(
        '.ld-sidenav-navitem__abbr'
      )

      expect(abbr.textContent).toEqual('AD')
    })
  })

  describe('sidenav accordion', () => {
    it('renders with expanded accordion section', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithAccordion({
          currentSubnav: 'artificial-intelligence',
        }),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      const ldSidenavAccordionSoftComputing =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion'
        )
      const ldSidenavAccordionSoftComputingSection =
        ldSidenavAccordionSoftComputing.shadowRoot.querySelector(
          'ld-accordion-section'
        )
      const ldSidenavAccordionMachineLearning =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion > ld-sidenav-accordion'
        )
      const ldSidenavAccordionMachineLearningSection =
        ldSidenavAccordionMachineLearning.shadowRoot.querySelector(
          'ld-accordion-section'
        )

      ldSidenavAccordionSoftComputing.expanded = true

      await page.waitForChanges()

      expect(ldSidenavAccordionSoftComputingSection).toHaveClass(
        'ld-accordion-section--expanded'
      )
      expect(ldSidenavAccordionMachineLearningSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )
    })

    it('accordion does not collapses on sidenav slide change by default', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithAccordion({
          currentSubnav: 'artificial-intelligence',
        }),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      const ldSidenavAccordionSoftComputing =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion'
        )
      const ldSidenavAccordionSoftComputingSection =
        ldSidenavAccordionSoftComputing.shadowRoot.querySelector(
          'ld-accordion-section'
        )
      const ldSidenavAccordionMachineLearning =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion > ld-sidenav-accordion'
        )
      const ldSidenavAccordionMachineLearningSection =
        ldSidenavAccordionMachineLearning.shadowRoot.querySelector(
          'ld-accordion-section'
        )

      ldSidenavAccordionSoftComputing.expanded = true
      ldSidenavAccordionMachineLearning.expanded = true

      await page.waitForChanges()

      expect(ldSidenavAccordionSoftComputingSection).toHaveClass(
        'ld-accordion-section--expanded'
      )
      expect(ldSidenavAccordionMachineLearningSection).toHaveClass(
        'ld-accordion-section--expanded'
      )

      const ldSidenavBack =
        ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')

      ldSidenavBack.shadowRoot
        .querySelector<HTMLElement>('[role="button"]')
        .click()

      await page.waitForChanges()

      await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
      expect(ldSidenavAccordionSoftComputingSection).toHaveClass(
        'ld-accordion-section--expanded'
      )
      expect(ldSidenavAccordionMachineLearningSection).toHaveClass(
        'ld-accordion-section--expanded'
      )
    })

    it('accordion collapses on sidenav slide change with preserve state set to false', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithAccordion({
          currentSubnav: 'artificial-intelligence',
          preserveAccordionState: false,
        }),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      const ldSidenavAccordionSoftComputing =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion'
        )
      const ldSidenavAccordionSoftComputingSection =
        ldSidenavAccordionSoftComputing.shadowRoot.querySelector(
          'ld-accordion-section'
        )
      const ldSidenavAccordionMachineLearning =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion > ld-sidenav-accordion'
        )
      const ldSidenavAccordionMachineLearningSection =
        ldSidenavAccordionMachineLearning.shadowRoot.querySelector(
          'ld-accordion-section'
        )

      ldSidenavAccordionSoftComputing.expanded = true
      ldSidenavAccordionMachineLearning.expanded = true

      await page.waitForChanges()

      expect(ldSidenavAccordionSoftComputingSection).toHaveClass(
        'ld-accordion-section--expanded'
      )
      expect(ldSidenavAccordionMachineLearningSection).toHaveClass(
        'ld-accordion-section--expanded'
      )

      const ldSidenavBack =
        ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')

      ldSidenavBack.shadowRoot
        .querySelector<HTMLElement>('[role="button"]')
        .click()

      await page.waitForChanges()

      await transitionEnd(page, ldSidenav.querySelector('ld-sidenav-slider'))
      expect(ldSidenavAccordionSoftComputingSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )
      expect(ldSidenavAccordionMachineLearningSection).not.toHaveClass(
        'ld-accordion-section--expanded'
      )
    })

    it('accordion collapses to narrow', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: getSidenavWithAccordion({
          currentSubnav: 'artificial-intelligence',
          collapsible: true,
          narrow: true,
        }),
      })
      const ldSidenav = page.body.querySelector('ld-sidenav')
      mockFocus(ldSidenav)

      const ldSidenavAccordionSoftComputing =
        ldSidenav.querySelector<HTMLLdSidenavAccordionElement>(
          '#artificial-intelligence > ld-sidenav-accordion'
        )

      ldSidenavAccordionSoftComputing.expanded = true

      await page.waitForChanges()

      const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')
      const btnToggle =
        ldSidenavHeader.shadowRoot.querySelector<HTMLButtonElement>(
          'button[role="switch"]'
        )
      btnToggle.click()

      await page.waitForChanges()

      expect(page.body).toMatchSnapshot()
    })
  })

  it('updates hidden state for compoenents in slider and subnavs on slide change when closable', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        collapsible: true,
        collapsed: true,
        narrow: true,
      }),
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    mockFocus(ldSidenav)
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--closable')

    const mediaQueries = matchMedia.getMediaQueries()
    matchMedia.useMediaQuery(mediaQueries[0])
    await page.waitForChanges()

    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav).toHaveClass('ld-sidenav--closable')

    const ldSidenavNavitemArtInt =
      ldSidenav.querySelector<HTMLLdSidenavNavitemElement>(
        'ld-sidenav-slider > ld-sidenav-navitem:nth-child(4)'
      )
    ldSidenavNavitemArtInt.shadowRoot.querySelector('button').click()
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      true
    )
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav).toHaveClass('ld-sidenav--closable')

    expect(
      ldSidenav.querySelectorAll('.ld-sidenav-slider__hidden').length
    ).toEqual(0)

    expect(
      ldSidenav.querySelectorAll('.ld-sidenav-subnav__hidden').length
    ).toEqual(0)
  })

  it('throws if ld-sidenav-toggle-outside component does not have an ld-sidenav component as its next element sibling', async () => {
    expect.assertions(1)
    try {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: `
          <ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>
          <span>Something else.</span>
          <ld-sidenav collapsible collapsed>
            <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
            <ld-sidenav-slider label="Outline of Computer Science">
              <ld-sidenav-navitem>Mathematical foundations</ld-sidenav-navitem>
            </ld-sidenav-slider>
          </ld-sidenav>
        `,
      })

      await page.waitForChanges()
    } catch (err) {
      expect(err).toStrictEqual(
        Error(
          'The ld-sidenav-toggle-outside component is expecting to have an ld-sidenav component as its next element sibling, but instead there was: Something else.'
        )
      )
    }
  })

  it('dispatches collapsed change event on collapsible change', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: '<ld-sidenav collapsible collapsed />',
    })
    const handler = jest.fn()
    window.addEventListener('ldSidenavCollapsedChange', handler)

    const ldSidenav = page.body.querySelector('ld-sidenav')

    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(handler).not.toHaveBeenCalled()

    ldSidenav.removeAttribute('collapsible')
    await page.waitForChanges()

    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsible')
    expect(handler).toHaveBeenCalled()
  })

  it('updates collapsible state on sidenav header', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: `<ld-sidenav>
        <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
      </ld-sidenav>`,
    })
    const ldSidenav = page.body.querySelector('ld-sidenav')
    const ldSidenavHeader = ldSidenav.querySelector('ld-sidenav-header')

    expect(
      ldSidenavHeader.shadowRoot.querySelector('.ld-sidenav-header__toggle')
    ).toBeNull()

    ldSidenav.setAttribute('collapsible', 'true')
    await page.waitForChanges()

    expect(
      ldSidenavHeader.shadowRoot.querySelector('.ld-sidenav-header__toggle')
    ).not.toBeNull()
  })
})
