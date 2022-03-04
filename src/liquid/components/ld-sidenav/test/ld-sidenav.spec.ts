jest.mock('../../../utils/focus')

import MatchMediaMock from 'jest-matchmedia-mock'
import { newSpecPage } from '@stencil/core/testing'
import { LdSidenav } from '../ld-sidenav'
import { LdSidenavSlider } from '../ld-sidenav-slider/ld-sidenav-slider'
import { LdSidenavSubnav } from '../ld-sidenav-subnav/ld-sidenav-subnav'
import { LdSidenavNavitem } from '../ld-sidenav-navitem/ld-sidenav-navitem'
import { LdSidenavBack } from '../ld-sidenav-back/ld-sidenav-back'
import { LdSidenavSeparator } from '../ld-sidenav-separator/ld-sidenav-separator'
import { LdSidenavHeading } from '../ld-sidenav-heading/ld-sidenav-heading'
import { LdSidenavScrollerInternal } from '../ld-sidenav-scroller-internal/ld-sidenav-scroller-internal'
import { LdButton } from '../../ld-button/ld-button'
import { getFirstFocusable } from '../../../utils/focus'
import '../../../utils/mutationObserver'
import { getSidenavWithSubnavigation } from './utils'

let matchMedia
const mockedGetFirstFocusable = getFirstFocusable as jest.Mock

async function transitionEnd(page) {
  const transitionEndHandler = page.root
    .querySelector('ld-sidenav-slider')
    ['__listeners'].find((l) => l.type === 'transitionEnd').handler
  transitionEndHandler({ target: page.root.querySelector('ld-sidenav-slider') })
  await page.waitForChanges()
}

function mockFocus(page) {
  page.root
    .querySelectorAll('ld-sidenav-navitem')
    .forEach(
      (item) =>
        (item.shadowRoot.querySelector('.ld-sidenav-navitem').focus = jest.fn())
    )
  page.root
    .querySelector('ld-sidenav-back')
    .shadowRoot.querySelector('.ld-sidenav-back').focus = jest.fn()
}

const sidenavComponents = [
  LdButton,
  LdSidenav,
  LdSidenavBack,
  LdSidenavHeading,
  LdSidenavNavitem,
  LdSidenavScrollerInternal,
  LdSidenavSeparator,
  LdSidenavSlider,
  LdSidenavSubnav,
]

describe('ld-sidenav', () => {
  beforeEach(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    jest.advanceTimersToNextTimer()
    jest.clearAllMocks()
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets initialized class after timeout in order to enable transitions', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).not.toHaveClass('ld-sidenav--initialized')

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(page.root).toHaveClass('ld-sidenav--initialized')
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
    expect(page.root).toMatchSnapshot()
  })

  it('applies neutral class', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav neutral></ld-sidenav>',
    })
    expect(page.root).toHaveClass('ld-sidenav--neutral')
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
      expect(page.root).toMatchSnapshot()
    })

    it('is collapsed', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapsed></ld-sidenav>',
      })
      expect(page.root).toMatchSnapshot()
    })

    it('expands on toggle', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapsed></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )
      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on mouse enter', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapsed expand-trigger="mouseenter"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )
      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    })

    it('expands on focus inside', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav collapsible collapsed>
          <button>foobar</button>
        </ld-sidenav>`,
      })
      const ldSidenav = page.root
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
        components: [LdSidenav],
        html: '<ld-sidenav collapsible></ld-sidenav>',
      })
      const ldSidenav = page.root
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

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })

    it('collapses on click outside', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapse-trigger="clickoutside"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
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
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapse-trigger="mouseout"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      page.body.click()
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
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapse-trigger="mouseout"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      const ev = new FocusEvent('focusout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')
    })
  })

  it('opens and closes via prop', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    const ldSidenav = page.root
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
    const ldSidenav = page.root
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
    const ldSidenav = page.root
    mockFocus(page)
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
    const ldSidenav = page.root
    mockFocus(page)
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(page.root).toHaveClass('ld-sidenav--initialized')
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
    const ldSidenav = page.root
    mockFocus(page)
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

    await transitionEnd(page)
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
    const ldSidenav = page.root
    mockFocus(page)
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

    await transitionEnd(page)
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
    const ldSidenav = page.root
    mockFocus(page)
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

    await transitionEnd(page)
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
    const ldSidenav = page.root
    mockFocus(page)
    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    ldSidenavBack.shadowRoot
      .querySelector<HTMLElement>('[role="button"]')
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()

    await transitionEnd(page)
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
    const ldSidenav = page.root
    mockFocus(page)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      true
    )

    const ldSidenavToggle =
      ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        'ld-button[role="switch"]'
      )
    ldSidenavToggle.click()

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
    const ldSidenav = page.root
    mockFocus(page)
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsible')
    expect(ldSidenav).not.toHaveClass('ld-sidenav--collapsed')
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      false
    )

    const ldSidenavToggle =
      ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        'ld-button[role="switch"]'
      )
    ldSidenavToggle.click()

    await page.waitForChanges()
    expect(ldSidenav).toHaveClass('ld-sidenav--collapsed')

    expect(page.root).toMatchSnapshot()
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
    const ldSidenav = page.root
    mockFocus(page)

    const ldSidenavToggle =
      ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        'ld-button[role="switch"]'
      )
    ldSidenavToggle.click()

    await page.waitForChanges()

    const ldSidenavBack =
      ldSidenav.querySelector<HTMLLdSidenavBackElement>('ld-sidenav-back')
    const ldSidenavBackButton =
      ldSidenavBack.shadowRoot.querySelector('.ld-sidenav-back')
    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(true)

    ldSidenavToggle.click()

    await page.waitForChanges()

    expect(
      ldSidenavBackButton.classList.contains('ld-sidenav-back--collapsed')
    ).toBe(false)

    ldSidenavToggle.click()

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
    const ldSidenav = page.root
    mockFocus(page)

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
    const ldSidenav = page.root
    mockFocus(page)
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
    const ldSidenav = page.root
    mockFocus(page)
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
    const ldSidenav = page.root
    mockFocus(page)
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
      const ldSidenav = page.root
      mockFocus(page)

      expect(ldSidenav).toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page)

      expect(ldSidenav).toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      doc.activeElement = ldSidenav
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page)

      expect(ldSidenav).not.toHaveClass('ld-sidenav--has-active-subnav')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')
    })

    it('does not close on escape key press when not closable', async () => {
      const page = await newSpecPage({
        components: sidenavComponents,
        html: '<ld-sidenav open></ld-sidenav>',
      })
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root
      mockFocus(page)

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--open')
      expect(ldSidenav).toHaveClass('ld-sidenav--closable')

      const doc = document as unknown as { activeElement: Element }
      doc.activeElement = document.body
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
      await page.waitForChanges()
      await transitionEnd(page)

      expect(ldSidenav).not.toHaveClass('ld-sidenav--open')
    })

    it('does not trap the focus if the trap-focus prop is is not set', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: `<ld-sidenav open>
          <a href="#">I'm focusable</a>
        </ld-sidenav>`,
      })
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
        components: [LdButton, LdSidenav],
        html: `<ld-sidenav open trap-focus="">
          <ld-button>I'm focusable</ld-button>
        </ld-sidenav>`,
      })
      const ldSidenav = page.root
      await page.waitForChanges()

      const mediaQueries = matchMedia.getMediaQueries()
      matchMedia.useMediaQuery(mediaQueries[0])
      await page.waitForChanges()

      expect(ldSidenav).toHaveClass('ld-sidenav--closable')
      expect(ldSidenav).toHaveClass('ld-sidenav--open')

      const ldButton = ldSidenav.querySelector('ld-button')
      await page.waitForChanges()
      jest.advanceTimersToNextTimer()
      await page.waitForChanges()

      const button = ldButton.shadowRoot.querySelector('button')
      button.focus = jest.fn()
      mockedGetFirstFocusable.mockImplementationOnce(() => ldButton)

      const ev = {
        type: 'focusout',
        relatedTarget: page.body,
        bubbles: true,
        composed: true,
      } as unknown as FocusEvent
      ldButton.dispatchEvent(ev)

      await page.waitForChanges()

      expect(button.focus).toHaveBeenCalled()
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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
      const ldSidenav = page.root

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
  })
})
