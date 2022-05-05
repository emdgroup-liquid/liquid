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
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-header',
  styleUrl: 'ld-sidenav-header.shadow.css',
  shadow: true,
})
export class LdSidenavHeader {
  @Element() el: HTMLLdSidenavHeaderElement
  private sidenav: HTMLLdSidenavElement
  private tooltipRef: HTMLLdTooltipElement

  /** href to be used on the anchor element within the sidenav header. */
  @Prop() href?: string

  /** aria-label to be used on the anchor element within the sidenav header. */
  @Prop() ariaLabel: string

  /** Label to be used for the toggle button when navigation is expanded. */
  @Prop() labelCollapse = 'Collapse side navigation'
  /** Label to be used for the toggle button when navigation is collapsed. */
  @Prop() labelExpand = 'Expand side navigation'

  @State() sidenavAlignement: 'left' | 'right'
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean
  @State() sidenavCollapsedFully: boolean
  @State() sidenavOpen: boolean

  /** Emitted on toggle click. */
  @Event() ldSidenavHeaderToggleClick: EventEmitter

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(
    ev: CustomEvent<{
      collapsed: boolean
      fully: boolean
    }>
  ) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail.collapsed
    this.sidenavCollapsedFully = ev.detail.collapsed && ev.detail.fully
    this.tooltipRef?.hideTooltip()
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
    this.tooltipRef?.hideTooltip()
  }

  @Listen('ldSidenavOpenChange', { target: 'window', passive: true })
  handleSidenavOpenChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavOpen = this.sidenav.open
  }

  private handleToggleClick = () => {
    this.ldSidenavHeaderToggleClick.emit()
  }

  componentWillLoad() {
    this.sidenav = this.el.closest<HTMLLdSidenavElement>('ld-sidenav')
    if (this.sidenav) this.sidenavAlignement = this.sidenav.align
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-header',
      !this.sidenavOpen && this.sidenavClosable && 'ld-sidenav-header--closed',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-header--collapsed',
      this.sidenavCollapsedFully &&
        !this.sidenavClosable &&
        'ld-sidenav-header--collapsed-fully',
      this.sidenavAlignement === 'right' && 'ld-sidenav-header--right-aligned',
    ])

    return (
      <Host class={cl}>
        {/*Inner toggle*/}
        {this.sidenav.collapsible && (
          <ld-tooltip
            arrow
            size="sm"
            class="ld-sidenav-header__tooltip"
            ref={(el) => (this.tooltipRef = el)}
            show-delay="1000"
            position={
              this.sidenavAlignement === 'left' ? 'right middle' : 'left middle'
            }
            tag="span"
          >
            <button
              slot="trigger"
              role="switch"
              brand-color
              aria-checked={this.sidenavCollapsed ? 'false' : 'true'}
              class="ld-sidenav-header__toggle"
              onClick={this.handleToggleClick}
              part="toggle"
            >
              <ld-icon
                class="ld-sidenav-header__toggle-icon"
                name="sidenav-right"
                part="toggle-icon"
              ></ld-icon>
              <ld-sr-only>
                {this.sidenavCollapsed ? this.labelExpand : this.labelCollapse}
              </ld-sr-only>
            </button>
            <ld-typo>
              {this.sidenavCollapsed ? this.labelExpand : this.labelCollapse}
            </ld-typo>
          </ld-tooltip>
        )}
        <a
          class="ld-sidenav-header__anchor"
          href={this.href}
          part="anchor"
          aria-label={this.ariaLabel}
        >
          <slot name="logo">
            <svg
              class="ld-sidenav-header__initial-m"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 6 24 12"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.5921 7.5H19.1a.2955.2955 0 0 0-.1926.0727l-2.9895 2.6378c-1.0241.9043-2.4024 1.412-3.9177 1.412-1.5796 0-3.0088-.5544-4.0444-1.5266 0 0-2.199-1.9406-2.2179-1.958-.422-.369-1.0028-.624-1.6714-.6379h-1.785C2.126 7.5 2 7.6184 2 7.7645v7.4118c0 .7316.6301 1.3237 1.4083 1.3237h.9133c.1564 0 .2831-.1194.2831-.2661l.0007-2.6375c0-.6893.5987-1.2579 1.3204-1.2579 1.3434 0 2.3067 1.0814 3.177 1.8037 1.0661.8849 1.8871 1.7374 2.8974 1.7374 1.0092 0 1.8306-.8525 2.8966-1.7374.8707-.7223 1.834-1.8037 3.1767-1.8037.718 0 1.3137.5629 1.3208 1.2468v1.591c0 .7316.6305 1.3224 1.4089 1.3224h.6079c.1588 0 .3061.0013.3061.0013.1561 0 .2828-.1194.2828-.2658V8.8237C22 8.0925 21.3692 7.5 20.5921 7.5Z"
                fill="currentcolor"
              ></path>
            </svg>
          </slot>
          <span class="ld-sidenav-header__slot-wrapper">
            <slot></slot>
          </span>
        </a>
      </Host>
    )
  }
}
