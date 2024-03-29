import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { getFirstFocusable } from '../../utils/focus'
import { closest } from '../../utils/closest'

/**
 * @slot - default slot, vertically scrollable.
 * @slot top - slot fixed at the top, above scrollable default slot.
 * @slot bottom - slot fixed at the bottom, below scrollable default slot.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav',
  styleUrl: 'ld-sidenav.shadow.css',
  shadow: true,
})
export class LdSidenav {
  @Element() el: HTMLLdSidenavElement
  private mediaQuery: MediaQueryList

  /** Whether the nav should be aligned to the left or the right side of its container. */
  @Prop() align?: 'left' | 'right' = 'left'

  /**
   * The breakpoint at which the sidenav takes full width and can be
   * opened and closed as opposed to being expanded and collapsed.
   * The prop value is used in a max-width media query.
   */
  @Prop() breakpoint? = '23.4375rem'

  /** Indicates that the navigation is collapsed to the side of its container. */
  @Prop({ mutable: true }) collapsed? = false

  /**
   * Makes the navigation collapse either on
   * - explicit toggle button click,
   * - when the user clicks somewhere outside the element or
   * - when the user moves the cursor / focus outside the element.
   * The modes are inclusive from right to left:
   * - clickoutside applies if the collapse trigger is set to mouseout
   * - toggle applies if the collapse trigger is set to clickoutside
   */
  @Prop() collapseTrigger?: 'toggle' | 'clickoutside' | 'mouseout' = 'toggle'

  /**
   * Allows the side navigation to be collapsed to the side of its container.
   */
  @Prop() collapsible? = false

  /**
   * Makes the navigation expand either on
   * - explicit toggle button click,
   * - when the user moves the cursor over the element.
   * The modes are inclusive from right to left:
   * - toggle applies if the expand trigger is set to mouseenter
   */
  @Prop() expandTrigger?: 'toggle' | 'mouseenter' = 'toggle'

  /** Label to be used for the landmark element (the sidenav itself). */
  @Prop() label? = 'Side navigation'

  /**
   * Set to true if you'd like to have a sidenav which partially
   * collapses in way, that slotted ld-navitem components are displayed
   * as icon buttons.
   */
  @Prop() narrow? = false

  /**
   * Indicates that the navigation is visible in a viewport
   * which is smaller than the value of the `breakpoint` prop.
   */
  @Prop({ mutable: true }) open? = false

  /**
   * Disables transitions on collapsing and expansion of the sidenav.
   * This is especially usefull when the page content gets pushed to
   * the side on sidenav expansion, and you want to prevent too many
   * layout shifts during the transition.
   */
  @Prop() toggleTransitionDisabled? = false

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
  @State() transitions = false

  /**
   * Toggles sidenav.
   */
  @Method()
  async toggle() {
    if (this.closable) {
      this.open = !this.open
    } else {
      this.toggleCollapsedState()
    }
  }

  /** Emitted when the sidenav collapses or expands. */
  @Event() ldSidenavCollapsedChange: EventEmitter<{
    collapsed: boolean
    fully: boolean
  }>

  /** Emitted when the sidenav opens or closes. */
  @Event() ldSidenavOpenChange: EventEmitter<boolean>

  /** Emitted when the sidenav registers a match media change event. */
  @Event() ldSidenavBreakpointChange: EventEmitter<boolean>

  // The following event is not used within the ld-sidenav component itself.
  // Its only purpose is to create a type definition on the ld-sidenav component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-sidenav-back components.
  /** Emitted on click of the ld-sidenav-back component. */
  @Event() ldSidenavBack: EventEmitter

  // The following event is not used within the ld-sidenav component itself.
  // Its only purpose is to create a type definition on the ld-sidenav component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-sidenav-navitem components.
  /** Emitted on click of the ld-sidenav-navitem component if prop to is set. */
  @Event() ldSidenavNavitemTo: EventEmitter<{ id: string; label: string }>

  // The following event is not used within the ld-sidenav component itself.
  // Its only purpose is to create a type definition on the ld-sidenav component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-sidenav-navitem components.
  /** Emitted on click of the ld-sidenav-navitem component. */
  @Event() ldSidenavNavitemClick: EventEmitter

  // The following event is not used within the ld-sidenav component itself.
  // Its only purpose is to create a type definition on the ld-sidenav component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-sidenav-slider components.
  /** Emitted on navigation (before transition ends) of the ld-sidenav-slider component. */
  @Event() ldSidenavSliderChange: EventEmitter<
    { id: string; label: string } | undefined
  >

  @Watch('collapsed')
  onCollapsedChange(collapsed) {
    // The ldSidenavCollapsedChange event needs to be emitted even if the
    // sidenav is currently not collapsible (when it is closable), because
    // on breakpoint change its subcomponents need to be rendered according
    // to the new state and thus need to update their state using the event.
    this.ldSidenavCollapsedChange.emit({
      collapsed,
      fully: this.fullyCollapsible,
    })

    if (collapsed) {
      this.open = false
    }
  }

  @Watch('open')
  onOpenChange(open) {
    this.ldSidenavOpenChange.emit(open)

    if (!open && this.collapsible) {
      this.collapsed = true
    }
  }

  @Watch('collapsible')
  @Watch('narrow')
  updateFullyCollapsible() {
    this.fullyCollapsible =
      this.collapsible &&
      (!this.narrow || !this.activeSubnavContainsIconsOrHasBack())
    if (!this.collapsible) this.collapsed = false
    this.el.querySelector('ld-sidenav-header')?.updateCollapsible()
  }

  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev: MouseEvent) {
    if (
      ev.isTrusted &&
      ['clickoutside', 'mouseout'].includes(this.collapseTrigger) &&
      closest('ld-sidenav', ev.target as HTMLElement) !== this.el
    ) {
      this.collapsed = this.collapsible
    }
  }

  @Listen('mouseout')
  handleMouseOut(ev: MouseEvent) {
    if (
      this.collapseTrigger === 'mouseout' &&
      ev.relatedTarget &&
      (ev.relatedTarget as HTMLElement).closest('ld-sidenav') !== this.el
    ) {
      this.collapsed = this.collapsible
    }
  }

  @Listen('mouseenter')
  handleMouseIn() {
    if (this.fullyCollapsible || this.expandTrigger === 'mouseenter') {
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
      ?.shadowRoot.querySelector<HTMLButtonElement | HTMLAnchorElement>(
        '[part*="focusable"]'
      )

    // Always expand side navigation on back button click.
    this.collapsed = false
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

    this.hasActiveSubnav = !!ev.detail

    this.updateFullyCollapsible()
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
      // This block prevents the focus from being set to the wrong element,
      // when a user quickly hits the [Tab] key after triggering the
      // transition to a subnav.
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
    const relatedTarget = ev.relatedTarget as HTMLElement | undefined
    const isFocusInSidenav = closest('ld-sidenav', relatedTarget) === this.el

    // If focus is outside the sidenav and the collapse trigger is set
    // to 'mouseout', collapse the sidenav.
    if (!isFocusInSidenav && relatedTarget !== null) {
      if (this.collapseTrigger === 'mouseout') {
        this.collapsed = this.collapsible
      }
    }

    // If focus is inside the sidenav expand the sidenav.
    if (this.expandTrigger === 'mouseenter' && isFocusInSidenav) {
      this.collapsed = false
    }

    // If the sidenav is closable, trap the focus.
    // Do not trap the focus as long as the sidenav is not closable or not open.
    if (!this.closable || !this.open) return

    // Do not trap the focus if the trap focus prop is not set.
    if (this.trapFocus === undefined) return

    // Do not trap the focus as long as the focus remains within the sidenav.
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

  @Listen('ldSidenavHeaderToggleClick')
  handleHeaderToggleClick() {
    this.toggle()
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

  private activeSubnavContainsIconsOrHasBack = () => {
    // Return true if we have a back button or a nav items as a direct child.
    const children = Array.from(this.el.children)
    const hasBack = children.some(
      (child) => child.tagName === 'LD-SIDENAV-BACK'
    )
    const hasPrimaryChild = children.some(
      (child) =>
        child.tagName === 'LD-SIDENAV-NAVITEM' &&
        !['secondary', 'tertiary'].includes(
          (child as HTMLLdSidenavNavitemElement).mode
        )
    )
    if (hasBack || hasPrimaryChild) {
      return true
    }

    // Otherwise, check if the current subnav contains a nav item.
    const slider = this.el.querySelector('ld-sidenav-slider')
    const activeSubnav = slider.currentSubnav
      ? this.el.querySelector(`#${slider.currentSubnav}`)
      : slider
    const navitemsModePrimaryChildren = Array.from(
      activeSubnav.children
    ).filter(
      (child) =>
        child.tagName === 'LD-SIDENAV-NAVITEM' &&
        (child as HTMLLdSidenavNavitemElement).mode === 'primary'
    )
    const navitemsModePrimaryInAccordion = Array.from(
      activeSubnav.querySelectorAll(
        'ld-sidenav-accordion > ld-sidenav-navitem[slot="toggle"]'
      )
    ).filter(
      (child: HTMLLdSidenavNavitemElement) =>
        (child as HTMLLdSidenavNavitemElement).mode === 'primary'
    )
    const totalNavitemsModePrimary =
      navitemsModePrimaryChildren.length + navitemsModePrimaryInAccordion.length
    return !!totalNavitemsModePrimary
  }

  private isToggleOutside = (
    element?: Element
  ): element is HTMLLdSidenavToggleOutsideElement =>
    element?.tagName === 'LD-SIDENAV-TOGGLE-OUTSIDE'

  private onTransitionEnd = (ev: TransitionEvent) => {
    if (ev.target === this.el) {
      this.transitions = true

      // If the sidenav was fully collapsed and is being expanded, set the focus
      // on the first focusable element. If it is being collapsed and has focus inside,
      // set the focus on the toggle outside if it is there.
      if (this.fullyCollapsible) {
        if (!this.collapsed) {
          const firstFocusableInSidenav = getFirstFocusable(this.el)
          firstFocusableInSidenav.focus()
        } else if (document.activeElement.closest('ld-sidenav') === this.el) {
          const previousElementSibling = this.el.previousElementSibling
          if (this.isToggleOutside(previousElementSibling)) {
            previousElementSibling.focusInner()
          }
        }
      }
    }
  }

  private onMatchMediaChange = (ev: MediaQueryListEvent) => {
    this.closable = ev.matches

    // Remove transitions class on breakpoint change in order to prevent
    // weird looking transitions on screen resize or orientation change events.
    // Add it back on transition end / after style changes have been applied.
    this.transitions = false

    // When there is less space available than before the breakpoint change,
    // collapse the side nav if it is collapsible.
    if (this.closable && this.collapsible) this.collapsed = true

    this.ldSidenavBreakpointChange.emit(this.closable)
  }

  componentWillLoad() {
    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`)
    this.mediaQuery.addEventListener('change', this.onMatchMediaChange)
    this.closable = this.mediaQuery.matches
    this.updateFullyCollapsible()
  }

  componentDidLoad() {
    this.ldSidenavCollapsedChange.emit({
      collapsed: this.collapsible && this.collapsed,
      fully: this.fullyCollapsible,
    })
    this.ldSidenavOpenChange.emit(this.open)
    this.ldSidenavBreakpointChange.emit(this.closable)

    setTimeout(() => {
      this.transitions = true
    })
  }

  disconnectedCallback() {
    this.mediaQuery?.removeEventListener('change', this.onMatchMediaChange)
  }

  render() {
    const cl = [
      'ld-sidenav',
      this.align === 'right' && 'ld-sidenav--right',
      this.transitions && 'ld-sidenav--transitions',
      this.closable && 'ld-sidenav--closable',
      this.collapsible && this.collapsed && 'ld-sidenav--collapsed',
      this.collapsible && 'ld-sidenav--collapsible',
      this.fullyCollapsible && 'ld-sidenav--fully-collapsible',
      this.hasActiveSubnav && 'ld-sidenav--has-active-subnav',
      this.hasShadowTop && 'ld-sidenav--has-shadow-top',
      this.hasShadowBottom && 'ld-sidenav--has-shadow-bottom',
      this.open && 'ld-sidenav--open',
      this.toggleTransitionDisabled && 'ld-sidenav--toggle-transition-disabled',
    ]

    return (
      <Host
        onTransitionEnd={this.onTransitionEnd}
        class={getClassNames(cl)}
        role="navigation"
        aria-label={this.label}
      >
        <slot name="header"></slot>
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
        <div
          onClick={this.toggle.bind(this)}
          class="ld-sidenav__fully-collapsed-click-area"
        ></div>
      </Host>
    )
  }
}
