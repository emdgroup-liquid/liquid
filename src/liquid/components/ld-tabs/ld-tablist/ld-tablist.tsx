import '../../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core'
import { LdTab } from '../ld-tab/ld-tab'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
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
  styleUrl: 'ld-tablist.css',
  shadow: true,
})
export class LdTablist {
  @Element() el: HTMLElement

  /** Size of the tabs. */
  @Prop() size?: 'sm' | 'lg'

  /** Display mode. */
  @Prop() mode?: 'ghost' | 'brand-color'

  /** Sets border radii. */
  @Prop() rounded?: 'all' | 'all-lg' | 'top' | 'top-lg'

  private slotContainerRef!: HTMLElement
  private btnScrollLeftRef!: HTMLButtonElement

  @State() scrollable: boolean
  @State() scrollLeftEnabled: boolean
  @State() scrollRightEnabled: boolean

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    this.updateScrollable()
    this.updateScrollButtons()
  }

  private updateScrollable() {
    const scrollButtonsWidth =
      2 * this.btnScrollLeftRef.getBoundingClientRect().width
    const scrollContainerWidth = this.slotContainerRef.getBoundingClientRect()
      .width
    const contentWidth = Array.from(this.el.children)
      .map((child) => child.getBoundingClientRect().width)
      .reduce((a, b) => a + b)
    this.scrollable =
      scrollContainerWidth + (this.scrollable ? scrollButtonsWidth : 0) <
      contentWidth
  }

  private updateScrollButtons() {
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
    if (currentTab) {
      ;((currentTab as unknown) as LdTab).focusInner()
      currentTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
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

  private onKeydown(ev) {
    switch (ev.key) {
      case 'ArrowLeft':
        ev.preventDefault()
        this.focusTab(ev.target, 'left')
        return
      case 'ArrowRight': {
        ev.preventDefault()
        this.focusTab(ev.target, 'right')
        return
      }
      case 'ArrowDown': {
        ev.preventDefault()
        this.setFocusOnSelectedTabpanel()
        return
      }
    }
  }

  componentWillLoad() {
    this.el.querySelectorAll('ld-icon').forEach((icon) => {
      if (this.size !== undefined) {
        icon.setAttribute('size', this.size)
      } else {
        icon.removeAttribute('size')
      }
    })
    this.el.querySelectorAll('.ld-icon').forEach((icon) => {
      icon.classList.remove('ld-icon--sm', 'ld-icon--lg')
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

  componentDidLoad() {
    setTimeout(() => {
      this.updateScrollable()
      this.updateScrollButtons()
    })
  }

  render() {
    return (
      <Host onKeydown={this.onKeydown.bind(this)} role="tablist">
        <div
          class={getClassNames([
            'ld-tablist',
            this.size && `ld-tablist--${this.size}`,
            this.mode && `ld-tablist--${this.mode}`,
            this.rounded && `ld-tablist--rounded-${this.rounded}`,
          ])}
          part="wrapper"
        >
          <button
            aria-disabled={this.scrollLeftEnabled ? undefined : 'true'}
            class="ld-tablist__btn-scroll ld-tablist__btn-scroll--left"
            hidden={!this.scrollable}
            onClick={this.scroll.bind(this, 'left')}
            part="arrow arrow-left"
            ref={(el) => (this.btnScrollLeftRef = el)}
            tabindex="-1"
          >
            <svg
              fill="none"
              height="16"
              part="arrow-icon arrow-icon-left"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
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
          <div
            class="ld-tablist__scroll-container"
            onScroll={this.updateScrollButtons.bind(this)}
            part="scroll-container"
            ref={(el) => (this.slotContainerRef = el)}
          >
            <slot></slot>
          </div>
          <button
            aria-disabled={this.scrollRightEnabled ? undefined : 'true'}
            class="ld-tablist__btn-scroll ld-tablist__btn-scroll--right"
            hidden={!this.scrollable}
            onClick={this.scroll.bind(this, 'right')}
            part="arrow arrow-right"
            tabindex="-1"
          >
            <svg
              fill="none"
              height="16"
              part="arrow-icon arrow-icon-right"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
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
        </div>
      </Host>
    )
  }
}
