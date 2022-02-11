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
import '../../../utils/mutationObserver'
import { getSidenavWithSubnavigation } from './utils'

let matchMedia

async function transitionEnd(page) {
  const transitionEndHandler = page.root
    .querySelector('ld-sidenav-slider')
    ['__listeners'].find((l) => l.type === 'transitionEnd').handler
  transitionEndHandler()
  await page.waitForChanges()
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
  beforeAll(() => {
    matchMedia = new MatchMediaMock()
  })

  afterEach(() => {
    matchMedia.clear()
    jest.advanceTimersToNextTimer()
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    expect(page.root).toMatchSnapshot()
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

  describe('collapsible mode', () => {
    beforeAll(() => {
      matchMedia = new MatchMediaMock()
    })

    afterEach(() => {
      matchMedia.clear()
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
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )
      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)
    })

    it('expands on mouse enter', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapsed expand-trigger="mouseenter"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      const ev = new MouseEvent('mouseenter')
      ldSidenav.dispatchEvent(ev)
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )
      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)
    })

    it('collapses on toggle', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)
    })

    it('collapses on click outside', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapse-trigger="clickoutside"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)
    })

    it('collapses on mouse out', async () => {
      const page = await newSpecPage({
        components: [LdSidenav],
        html: '<ld-sidenav collapsible collapse-trigger="mouseout"></ld-sidenav>',
      })
      const ldSidenav = page.root
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      const ev = new MouseEvent('mouseout', {
        relatedTarget: page.body,
      })
      ldSidenav.dispatchEvent(ev)

      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      const btnToggle = ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        '.ld-sidenav__toggle'
      )

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      page.body.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)

      btnToggle.click()
      await page.waitForChanges()
      expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)
    })
  })

  it('opens and closes via prop', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    const ldSidenav = page.root
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(false)

    ldSidenav.setAttribute('open', '')
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(true)

    ldSidenav.removeAttribute('open')
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(false)
  })

  it('opens and closes via events', async () => {
    const page = await newSpecPage({
      components: [LdSidenav],
      html: '<ld-sidenav></ld-sidenav>',
    })
    const ldSidenav = page.root
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(false)

    ldSidenav.dispatchEvent(new CustomEvent('ldSidenavOpen'))
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(true)

    ldSidenav.dispatchEvent(new CustomEvent('ldSidenavClose'))
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--open')).toBe(false)
  })

  it('slides', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation(),
    })
    const ldSidenav = page.root
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

  it('slides back', async () => {
    const page = await newSpecPage({
      components: sidenavComponents,
      html: getSidenavWithSubnavigation({
        currentSubnav: 'artificial-intelligence',
      }),
    })
    const ldSidenav = page.root
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
    expect(ldSidenav.classList.contains('ld-sidenav--collapsible')).toBe(true)
    expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      true
    )

    const ldSidenavToggle =
      ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        'ld-button[role="switch"]'
      )
    ldSidenavToggle.click()

    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)
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
    expect(ldSidenav.classList.contains('ld-sidenav--collapsible')).toBe(true)
    expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(false)
    expect(ldSidenav.classList.contains('ld-sidenav--fully-collapsible')).toBe(
      false
    )

    const ldSidenavToggle =
      ldSidenav.shadowRoot.querySelector<HTMLButtonElement>(
        'ld-button[role="switch"]'
      )
    ldSidenavToggle.click()

    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--collapsed')).toBe(true)

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
    await page.waitForChanges()
    expect(ldSidenav.classList.contains('ld-sidenav--has-active-subnav')).toBe(
      false
    )
  })
})
