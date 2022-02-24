import '../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { getFirstFocusable } from '../../utils/focus'

/**
 * @slot - default slot, vertically scrollable.
 * @slot top - slot fixed at the top, above scrollable default slot.
 * @slot bottom - slot fixed at the bottom, below scrollable default slot.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav',
  styleUrl: 'ld-sidenav.css',
  shadow: true,
})
export class LdSidenav {
  @Element() el: HTMLLdSidenavElement

  private mediaQuery: MediaQueryList

  /** Whether the nav should be aligned to the left or the right side of its container. */
  @Prop() align: 'left' | 'right' = 'left'

  /**
   * The breakpoint at which the sidenav takes full width and can be
   * opened and closed as opposed to being expanded and collapsed.
   * The prop value is used in a max-width media query.
   */
  @Prop() breakpoint = '23.4375rem'

  /** Indicates that the navigation is collapsed to the side of its container. */
  @Prop({ mutable: true }) collapsed = false

  /**
   * Makes the navigation collapse either on
   * - explicit toggle button click,
   * - when the user clicks somewhere outside the element or
   * - when the user moves the cursor outside the element.
   * The modes are inclusive from right to left:
   * - clickoutside applies if the collapse trigger is set to mouseout
   * - toggle applies if the collapse trigger is set to clickoutside
   */
  @Prop() collapseTrigger: 'toggle' | 'clickoutside' | 'mouseout' = 'toggle'

  /**
   * Allows the side navigation to be collapsed to the side of its container.
   */
  @Prop() collapsible = false

  /**
   * Makes the navigation expand either on
   * - explicit toggle button click,
   * - when the user moves the cursor over the element.
   * The modes are inclusive from right to left:
   * - toggle applies if the expand trigger is set to mouseenter
   */
  @Prop() expandTrigger: 'toggle' | 'mouseenter' = 'toggle'

  /** Label to be used for the landmark element (the sidenav itself). */
  @Prop() label = 'Side navigation'
  /** Label to be used for the toggle button when navigation is expanded. */
  @Prop() labelCollapse = 'Collapse side navigation'
  /** Label to be used for the toggle button when navigation is collapsed. */
  @Prop() labelExpand = 'Expand side navigation'

  /**
   * Set to true if where you'd like to have a sidenav which partially
   * collapses in way, that slotted ld-navitem components are displayed
   * as icon buttons.
   */
  @Prop() narrow = false

  /**
   * Indicates that the navigation is visible in a viewport
   * which is smaller than the value of the `breakpoint` prop.
   */
  @Prop({ mutable: true }) open = false

  /**
   * Enables focus trapping. Accespts a CSS selector which indicates
   * what is still focusable outside the sidenav, when the sidenav is
   * closable and open (i.e. "ld-header *"). Use an empty string to
   * enable focus trapping without specifying focusable elements
   * outside the sidenav component.
   */
  @Prop() trapFocus?: string // The focus trap feature is
  // disabled by default in order to not violate WCAG 2.1.2 (see
  // https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html).
  // It needs to be enabled explicitly, making sure that all visible
  // UI elements are still focusable when the sidenav is opened.

  @State() closable
  @State() fullyCollapsible = false
  @State() hasActiveSubnav = false
  @State() hasShadowBottom = false
  @State() hasShadowTop = false
  @State() initialized = false

  /** Emitted when the sidenav collapses or expands. */
  @Event() ldSidenavCollapsedChange: EventEmitter<boolean>

  /** Emitted when the sidenav opens or closes. */
  @Event() ldSidenavOpenChange: EventEmitter<boolean>

  /** Emitted when the sidenav registers a match media change event. */
  @Event() ldSidenavBreakpointChange: EventEmitter<boolean>

  @Watch('collapsed')
  onCollapsedChange(collapsed) {
    // Apply transitions class explicitly on collapsed state change
    // in order to prevent transitions when closable state changes to false
    // which may happen on screen resize or orientation change events.
    if (!this.closable) {
      this.el.classList.add('ld-sidenav--transitions')

      this.ldSidenavCollapsedChange.emit(collapsed)
    }
  }

  @Watch('open')
  onOpenChange(open) {
    // Same applies here as for onCollapsedChange.
    this.el.classList.add('ld-sidenav--transitions')

    this.ldSidenavOpenChange.emit(open)
  }

  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev: MouseEvent) {
    if (
      ['clickoutside', 'mouseout'].includes(this.collapseTrigger) &&
      (ev.target as HTMLElement).closest('ld-sidenav') !== this.el
    ) {
      this.collapsed = true
    }
  }

  @Listen('mouseout')
  handleMouseOut(ev: MouseEvent) {
    if (
      this.collapseTrigger === 'mouseout' &&
      ev.relatedTarget &&
      (ev.relatedTarget as HTMLElement).closest('ld-sidenav') !== this.el
    ) {
      this.collapsed = true
    }
  }

  @Listen('mouseenter')
  handleMouseIn() {
    if (this.expandTrigger === 'mouseenter') {
      this.collapsed = false
    }
  }

  @Listen('ldSidenavOpen')
  handleOpen() {
    this.open = true
  }

  @Listen('ldSidenavClose')
  handleClose() {
    clearTimeout(this.focusTimeout)
    this.open = false
  }

  @Listen('ldSidenavBack')
  handleSlideBack() {
    clearTimeout(this.focusTimeout)
    const currentSubnav = Array.from(
      this.el.querySelectorAll('.ld-sidenav-subnav--active')
    ).pop()
    const currentSubnavId = currentSubnav?.id
    const parentSubnav = currentSubnav?.parentElement
    this.el.querySelector('ld-sidenav-slider').navigateBack()

    // Set focus on parent nav-item element as soon as back button looses focus.
    this.toFocus = parentSubnav
      ?.querySelector<HTMLLdSidenavNavitemElement>(`[to='${currentSubnavId}']`)
      .shadowRoot.querySelector<HTMLButtonElement | HTMLAnchorElement>(
        '[part*="focusable"]'
      )
  }

  @Listen('ldSidenavNavitemTo')
  slideToHandler() {
    clearTimeout(this.focusTimeout)
    // set focus on back button
    const ldSidenavBack = this.el
      .querySelector('ld-sidenav-back')
      ?.shadowRoot.querySelector<HTMLElement>('.ld-sidenav-back')
    this.toFocus = ldSidenavBack
    this.updateFocus()
  }

  @Listen('ldSidenavSliderChange')
  slideChangeHandler(
    ev: CustomEvent<{ id: string; label: string } | undefined>
  ) {
    clearTimeout(this.focusTimeout)
    this.el.querySelector('ld-sidenav-back')?.updateLabel(ev.detail?.label)

    // Check if current subnav is fully collapsable.
    this.hasActiveSubnav = !!ev.detail
    const activeSubnav = ev.detail
      ? document.getElementById(ev.detail.id)
      : this.el.querySelector('ld-sidenav-slider')
    const activeSubnavContainsSubnav =
      !!activeSubnav.querySelectorAll('ld-sidenav-subnav').length
    this.fullyCollapsible = !this.narrow || !activeSubnavContainsSubnav

    // Always expand sidebar on slide change, except for
    // when the sidebar is initially loaded.
    if (this.initialized) {
      this.collapsed = false
    }

    this.updateFocus()
  }

  @Listen('keydown', { passive: true, target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    // Ignore events if sidenav has no focus and is not closable.
    const hasSidenavFocus =
      document.activeElement.closest('ld-sidenav') === this.el

    if (
      hasSidenavFocus &&
      ev.key === 'Tab' &&
      !ev.shiftKey &&
      document.activeElement === this.el.querySelector('ld-sidenav-back')
    ) {
      const { currentSubnav } = this.el.querySelector('ld-sidenav-slider')

      if (currentSubnav) {
        const firstItemOfCurrentSubnav = getFirstFocusable(
          this.el.querySelector<HTMLLdSidenavSubnavElement>(`#${currentSubnav}`)
        )

        setTimeout(async () => {
          if ('focusInner' in firstItemOfCurrentSubnav) {
            await (
              firstItemOfCurrentSubnav as unknown as InnerFocusable
            ).focusInner()
          } else {
            firstItemOfCurrentSubnav.focus()
          }
        })
      }
    }

    if (!hasSidenavFocus && !this.closable) {
      return
    }

    const slider = this.el.querySelector('ld-sidenav-slider')

    if (ev.key === 'Escape') {
      if (!slider && this.closable) {
        this.open = false
        return
      }

      if (this.hasActiveSubnav) {
        this.handleSlideBack()
      } else if (this.closable) {
        this.open = false
      }
    }
  }

  @Listen('focusout', { passive: true, target: 'window' })
  async handleFocusout(ev: FocusEvent) {
    // If the sidenav is closable, trap the focus.
    // Do not trap the focus as long as the sidenav is not closable or not open.
    if (!this.closable || !this.open) return

    // Do not trap the focus if the trap focus prop is not set.
    if (typeof this.trapFocus === 'undefined') return

    const relatedTarget = ev.relatedTarget as HTMLElement | undefined

    // Do not trap the focus as long as the focus remains within the sidenav.
    const isFocusInSidenav = relatedTarget?.closest('ld-sidenav') === this.el
    if (isFocusInSidenav) return

    // Do not trap the focus when it moves to an element which matches
    // the trap focus selector or no element will be focused.
    const isFocusInKeepFocusable =
      this.trapFocus !== '' &&
      (!relatedTarget || relatedTarget?.matches(this.trapFocus))
    if (isFocusInKeepFocusable) return

    // Loop the focus between the ld-sidenav and the elements matching
    // the trap focus selector.
    const target = ev.target as HTMLElement
    const isLeavingSidenav = target.closest('ld-sidenav') === this.el
    const isLeavingFocusSelectorElement =
      this.trapFocus !== '' && !!target.closest(this.trapFocus)

    if (!isLeavingSidenav && !isLeavingFocusSelectorElement) return

    const firstFocusableInSidenav = getFirstFocusable(this.el)
    const trapFocusSelectorElements =
      this.trapFocus === ''
        ? [firstFocusableInSidenav]
        : Array.from(document.querySelectorAll<HTMLElement>(this.trapFocus))
    const firstFocusableFromSelectorElements =
      trapFocusSelectorElements.find(getFirstFocusable)
    const isLeavingFirstFocusableInSidenav = firstFocusableInSidenav === target
    const isLeavingFirstFocusableFromSelectorElements =
      firstFocusableFromSelectorElements === target
    const lastFocusableInSidenav = Array.from(
      this.el.querySelectorAll<HTMLElement>('*')
    )
      .reverse()
      .find(getFirstFocusable)
    const lastFocusableFromSelectorElements = trapFocusSelectorElements
      .reverse()
      .find(getFirstFocusable)
    const nextFocused = isLeavingSidenav
      ? isLeavingFirstFocusableInSidenav
        ? lastFocusableFromSelectorElements
        : firstFocusableFromSelectorElements
      : isLeavingFirstFocusableFromSelectorElements
      ? lastFocusableInSidenav
      : firstFocusableInSidenav

    if (!nextFocused) return

    if ('focusInner' in nextFocused) {
      await (nextFocused as unknown as InnerFocusable).focusInner()
    } else {
      nextFocused?.focus()
    }
  }

  private toFocus: HTMLElement = undefined
  private focusTimeout = undefined
  private updateFocus = () => {
    // HACK: Using recursive call with timeout to account for fast user interactions during transitions.
    clearTimeout(this.focusTimeout)
    if (this.toFocus) {
      if (
        this.toFocus.tabIndex === -1 ||
        window.getComputedStyle(this.toFocus).visibility === 'hidden'
      ) {
        this.focusTimeout = setTimeout(this.updateFocus, 10)
        return
      }
      this.toFocus.focus()
      this.toFocus = undefined
    }
  }

  private toggleCollapsedState = () => {
    this.collapsed = !this.collapsed
  }

  private onMatchMediaChange = (ev: MediaQueryListEvent) => {
    this.closable = ev.matches
    if (this.closable) {
      this.el.classList.remove('ld-sidenav--transitions')
    }
    this.ldSidenavBreakpointChange.emit(this.closable)
  }

  componentWillLoad() {
    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`)
    this.mediaQuery.addEventListener('change', this.onMatchMediaChange)
    this.closable = this.mediaQuery.matches
    this.fullyCollapsible =
      !this.narrow || !this.el.querySelector('ld-sidenav-slider')
  }

  componentDidLoad() {
    this.ldSidenavCollapsedChange.emit(this.collapsed)
    this.ldSidenavOpenChange.emit(this.open)
    this.ldSidenavBreakpointChange.emit(this.closable)

    setTimeout(() => {
      this.initialized = true
    })
  }

  disconnectedCallback() {
    this.mediaQuery?.removeEventListener('change', this.onMatchMediaChange)
  }

  render() {
    const cl = [
      'ld-sidenav',
      this.align === 'right' && 'ld-sidenav--right',
      this.initialized && 'ld-sidenav--initialized',
      this.collapsible && this.collapsed && 'ld-sidenav--collapsed',
      this.collapsible && 'ld-sidenav--collapsible',
      this.fullyCollapsible && 'ld-sidenav--fully-collapsible',
      this.open && 'ld-sidenav--open',
      this.hasActiveSubnav && 'ld-sidenav--has-active-subnav',
      this.hasShadowTop && 'ld-sidenav--has-shadow-top',
      this.hasShadowBottom && 'ld-sidenav--has-shadow-bottom',
      this.closable && 'ld-sidenav--closable',
    ]

    return (
      <Host class={getClassNames(cl)} role="navigation" aria-label={this.label}>
        {!this.closable && this.collapsible && (
          <ld-button
            role="switch"
            aria-checked={this.collapsed ? 'false' : 'true'}
            class="ld-sidenav__toggle"
            size="sm"
            onClick={this.toggleCollapsedState}
            part="toggle"
          >
            <svg
              class="ld-sidenav__toggle-icon"
              width="7"
              height="10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              part="toggle-icon"
            >
              <title>
                {this.collapsed ? this.labelExpand : this.labelCollapse}
              </title>
              <path
                d="m2 2 3 3-3 3"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </ld-button>
        )}
        <div class="ld-sidenav__content">
          <div class="ld-sidenav__slot-container-top" part="slot-container-top">
            <slot name="top"></slot>
          </div>
          <ld-sidenav-scroller-internal
            class="ld-sidenav__scroller"
            part="scroll-container"
          >
            <div
              class="ld-sidenav__slot-container-default"
              part="slot-container"
            >
              <slot></slot>
            </div>
          </ld-sidenav-scroller-internal>
          <div
            class="ld-sidenav__slot-container-bottom"
            part="slot-container-bottom"
          >
            <slot name="bottom"></slot>
          </div>
        </div>
      </Host>
    )
  }
}
