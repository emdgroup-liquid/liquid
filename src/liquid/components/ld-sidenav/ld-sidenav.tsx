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
import { LdSidenavSlider } from './ld-sidenav-slider/ld-sidenav-slider'
import { LdSidenavBack } from './ld-sidenav-back/ld-sidenav-back'

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
  @Element() el: HTMLElement

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

  /** Indicates that the navigation is visible in a narrow viewport. */
  @Prop({ mutable: true }) open = false

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

    if (this.closable) {
      this.ldSidenavOpenChange.emit(open)
    }
  }

  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev) {
    if (
      ['clickoutside', 'mouseout'].includes(this.collapseTrigger) &&
      ev.target.closest('ld-sidenav') !== this.el
    ) {
      this.collapsed = true
    }
  }

  @Listen('mouseout')
  handleMouseOut(ev) {
    if (
      this.collapseTrigger === 'mouseout' &&
      ev.relatedTarget &&
      ev.relatedTarget.closest('ld-sidenav') !== this.el
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
    this.open = false
  }

  @Listen('ldSidenavBack')
  handleSlideBack() {
    ;(
      this.el.querySelector('.ld-sidenav-slider') as unknown as LdSidenavSlider
    ).navigateBack()
  }

  @Listen('ldSidenavSliderChange')
  slideToHandler(ev: CustomEvent<{ id: string; label: string } | undefined>) {
    ;(
      this.el.querySelector('ld-sidenav-back') as unknown as LdSidenavBack
    )?.updateLabel(ev.detail?.label)

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
  }

  private toggleCollapsedState = () => {
    this.collapsed = !this.collapsed
  }

  private onMatchMediaChange = (ev) => {
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
                {this.collapsed ? this.labelCollapse : this.labelExpand}
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
