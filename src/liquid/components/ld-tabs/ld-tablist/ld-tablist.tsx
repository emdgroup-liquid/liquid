import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { isInnerFocusable } from '../../../utils/focus'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part active-tab-indicator - Active tab indicator in floating mode
 * @part arrow - Both arrow button elements
 * @part arrow-icon - Both arrow icon SVGs
 * @part arrow-icon-left - Left arrow icon SVG
 * @part arrow-icon-right - Right arrow icon SVG
 * @part arrow-left - Left arrow button element
 * @part arrow-right - Right arrow button element
 * @part scroll-container - Container wrapping the slot
 * @part wrapper - Container wrapping the arrows and the scroll-container
 */
@Component({
  tag: 'ld-tablist',
  styleUrl: 'ld-tablist.shadow.css',
  shadow: true,
})
export class LdTablist {
  @Element() el: HTMLElement

  /** Size of the tabs. */
  @Prop() size?: 'sm' | 'lg'

  /** Display mode. */
  @Prop() mode?:
    | 'ghost'
    | 'brand-color'
    | 'floating'
    | 'floating-on-brand-color'

  /** Sets border radii. */
  @Prop() rounded?: 'all' | 'all-lg' | 'top' | 'top-lg'

  private slotContainerRef!: HTMLElement
  private selectedTabIndicatorRef: HTMLElement
  private btnScrollLeftRef!: HTMLButtonElement
  private resizeObserver: ResizeObserver
  private mutationObserver: MutationObserver

  @State() initialized = false
  @State() selectedTab?: HTMLLdTabElement
  @State() scrollable: boolean
  @State() scrollLeftEnabled: boolean
  @State() scrollRightEnabled: boolean
  @State() focusVisible = true
  @State() selectedIsFocused = true

  private isFloating = () =>
    ['floating', 'floating-on-brand-color'].includes(this.mode)

  private updateScrollable() {
    if (this.isFloating()) return
    const scrollButtonsWidth =
      2 * this.btnScrollLeftRef.getBoundingClientRect().width
    const scrollContainerWidth =
      this.slotContainerRef.getBoundingClientRect().width
    const contentWidth = Array.from(this.el.children)
      .map((child) => child.getBoundingClientRect().width)
      .reduce((a, b) => a + b)
    this.scrollable =
      scrollContainerWidth + (this.scrollable ? scrollButtonsWidth : 0) <
      contentWidth
  }

  private updateScrollButtons() {
    if (this.isFloating()) return
    if (!this.scrollable) return
    this.scrollLeftEnabled = this.slotContainerRef.scrollLeft > 0
    this.scrollRightEnabled =
      this.slotContainerRef.scrollLeft +
        this.slotContainerRef.getBoundingClientRect().width -
        this.slotContainerRef.scrollWidth <
      0
  }

  private scroll(dir: 'left' | 'right') {
    this.slotContainerRef.scrollTo({
      left:
        this.slotContainerRef.scrollLeft +
        ((dir === 'left' ? -1 : 1) *
          this.slotContainerRef.getBoundingClientRect().width) /
          2,
      behavior: 'smooth',
    })
  }

  private focusTab(prevLdTab: HTMLElement, dir: 'left' | 'right') {
    const currentTab =
      dir === 'left'
        ? prevLdTab.previousElementSibling
        : prevLdTab.nextElementSibling
    if (isInnerFocusable(currentTab)) {
      currentTab.focusInner()
      currentTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
      this.selectedIsFocused = currentTab === this.selectedTab
    }
  }

  private setFocusOnSelectedTabpanel() {
    // TODO: fix Stencils DOM implementation for unit testing and replace
    // ;(this.el
    //   .closest('ld-tabs')
    //   .querySelector('ld-tabpanel:not([hidden])') as HTMLElement)?.focus()
    Array.from(this.el.closest('ld-tabs').querySelectorAll('ld-tabpanel'))
      .find((tabpanel) => !tabpanel.hasAttribute('hidden'))
      ?.focus()
  }

  private onClick = (ev) => {
    if (ev.pointerType === 'mouse') {
      this.focusVisible = false
    }
  }

  private onFocusout = (ev) => {
    if (
      !ev.relatedTarget ||
      ev.relatedTarget.closest('ld-tablist') !== this.el
    ) {
      this.focusVisible = true
      this.selectedIsFocused = true
    }
  }

  private onKeydown = (ev) => {
    switch (ev.key) {
      case 'ArrowLeft':
        ev.preventDefault()
        this.focusVisible = true
        this.focusTab(ev.target, 'left')
        return
      case 'ArrowRight': {
        ev.preventDefault()
        this.focusVisible = true
        this.focusTab(ev.target, 'right')
        return
      }
      case 'ArrowDown': {
        ev.preventDefault()
        this.focusVisible = true
        this.setFocusOnSelectedTabpanel()
        return
      }
    }
  }

  private handleResize = () => {
    if (this.isFloating()) {
      this.updateSelectedTabIndicator()
    } else {
      this.updateScrollable()
      this.updateScrollButtons()
    }
  }

  private updateSelectedTab = () => {
    this.selectedTab = Array.from(this.el.querySelectorAll('ld-tab')).find(
      (tab) => tab.selected
    )
  }

  @Listen('ldtabselect')
  handleTabSelect(ev) {
    this.selectedIsFocused = true
    this.selectedTab = ev.target
  }

  @Watch('selectedTab')
  private updateSelectedTabIndicator() {
    if (!this.selectedTabIndicatorRef) return

    const indicatorStyle = this.selectedTabIndicatorRef.style
    if (!this.selectedTab) {
      // hide indicator
      indicatorStyle.opacity = '0'
      return
    }

    const selectedTabBcr = this.selectedTab.getBoundingClientRect()
    const parentBcr = this.selectedTab.parentElement.getBoundingClientRect()
    const offsetLeft = selectedTabBcr.left - parentBcr.left
    indicatorStyle.transform = `translateX(${offsetLeft - 8}px)`
    indicatorStyle.width = `${selectedTabBcr.width}px`
    indicatorStyle.opacity = '1'
  }

  @Watch('size')
  updateIconSize() {
    this.el.querySelectorAll('ld-icon').forEach((icon) => {
      if (this.size !== undefined) {
        icon.size = this.size
      } else {
        icon.size = undefined
      }
    })
    this.el.querySelectorAll('.ld-icon').forEach((icon) => {
      if (this.size === 'sm') {
        icon.classList.remove('ld-icon--lg')
        icon.classList.add('ld-icon--sm')
      } else if (this.size === 'lg') {
        icon.classList.remove('ld-icon--sm')
        icon.classList.add('ld-icon--lg')
      } else {
        icon.classList.remove('ld-icon--sm', 'ld-icon--lg')
      }
    })
  }

  componentWillLoad() {
    // Attribute selector fails in test env, hance filtering with js below.
    this.selectedTab = Array.from(this.el.querySelectorAll('ld-tab')).find(
      (tab) => tab.selected
    )
    this.updateIconSize()

    this.mutationObserver = new MutationObserver(this.updateSelectedTab)
    this.mutationObserver.observe(this.el, {
      subtree: true,
      childList: true,
      attributes: false,
    })
  }

  componentDidLoad() {
    setTimeout(() => {
      this.updateScrollable()
      this.updateScrollButtons()
      this.initialized = true
    })
    this.resizeObserver = new ResizeObserver(this.handleResize)
    this.resizeObserver.observe(this.slotContainerRef)
  }

  disconnectedCallback() {
    /* istanbul ignore next */
    this.resizeObserver?.unobserve(this.slotContainerRef)
    /* istanbul ignore next */
    this.mutationObserver?.disconnect()
  }

  render() {
    return (
      <Host
        onClick={this.onClick}
        onKeydown={this.onKeydown}
        onFocusout={this.onFocusout}
        role="tablist"
      >
        <div
          class={getClassNames([
            'ld-tablist',
            this.initialized && 'ld-tablist--initialized',
            this.focusVisible && 'ld-tablist--focus-visible',
            this.selectedIsFocused && 'ld-tablist--selected-focused',
            this.size && `ld-tablist--${this.size}`,
            this.mode && `ld-tablist--${this.mode}`,
            this.rounded && `ld-tablist--rounded-${this.rounded}`,
          ])}
          part="wrapper"
        >
          {!this.isFloating() && (
            <button
              aria-disabled={this.scrollLeftEnabled ? undefined : 'true'}
              class="ld-tablist__btn-scroll ld-tablist__btn-scroll--left"
              hidden={!this.scrollable}
              onClick={this.scroll.bind(this, 'left')}
              part="arrow arrow-left"
              ref={(el) => (this.btnScrollLeftRef = el)}
              tabindex="-1"
            >
              {/* custom icon arrow-left */}
              <svg
                fill="none"
                height="16"
                part="arrow-icon arrow-icon-left"
                viewBox="0 0 16 16"
                width="16"
              >
                <title>Scroll left</title>
                <path
                  d="M10 13L6 8L10 3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          )}
          <div
            class="ld-tablist__scroll-container"
            onScroll={this.updateScrollButtons.bind(this)}
            part="scroll-container"
            ref={(el) => (this.slotContainerRef = el)}
          >
            <slot></slot>
            {this.isFloating() && (
              <div
                part="active-tab-indicator"
                class="ld-tablist__active-tab-indicator"
                ref={(el) => (this.selectedTabIndicatorRef = el)}
              />
            )}
          </div>
          {!this.isFloating() && (
            <button
              aria-disabled={this.scrollRightEnabled ? undefined : 'true'}
              class="ld-tablist__btn-scroll ld-tablist__btn-scroll--right"
              hidden={!this.scrollable}
              onClick={this.scroll.bind(this, 'right')}
              part="arrow arrow-right"
              tabindex="-1"
            >
              {/* custom icon arrow-right */}
              <svg
                fill="none"
                height="16"
                part="arrow-icon arrow-icon-right"
                viewBox="0 0 16 16"
                width="16"
              >
                <title>Scroll right</title>
                <path
                  d="M6 13L10 8L6 3"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </Host>
    )
  }
}
