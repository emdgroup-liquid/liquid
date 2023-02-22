import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-toggle-outside',
  styleUrl: 'ld-sidenav-toggle-outside.shadow.css',
  shadow: true,
})
export class LdSidenavToggleOutside implements InnerFocusable {
  @Element() el: HTMLLdSidenavToggleOutsideElement
  private sidenav: HTMLLdSidenavElement
  private tooltipRef: HTMLLdTooltipElement
  private toggle: HTMLButtonElement

  /** Label to be used for the toggle button when navigation is collapsed. */
  @Prop() labelExpand? = 'Expand side navigation'

  /** Tab index of the toggle. */
  @Prop() ldTabindex?: number

  /** Tooltip tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean
  @State() sidenavCollapsedFully: boolean
  @State() sidenavAlignement: 'left' | 'right'

  /** Sets focus on the radio button. */
  @Method()
  async focusInner() {
    this.toggle.focus()
  }

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
    this.tooltipRef.hideTooltip()
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
    this.tooltipRef.hideTooltip()
  }

  private toggleSidenavCollapsedState = (ev) => {
    ev.stopPropagation() // prevents call of click outside handler
    this.sidenav.toggle()
  }

  componentWillLoad() {
    this.sidenav = this.el.nextElementSibling as HTMLLdSidenavElement
    if (!this.sidenav || this.sidenav.tagName !== 'LD-SIDENAV') {
      throw new Error(
        `The ld-sidenav-toggle-outside component is expecting to have an ld-sidenav component as its next element sibling, but instead there was: ${this.sidenav}`
      )
    }
    this.sidenavAlignement = this.sidenav.align || 'left'
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-toggle-outside',
      `ld-sidenav-toggle-outside--${this.sidenavAlignement}`,
      this.sidenavClosable && 'ld-sidenav-toggle-outside--closable',
      this.sidenavCollapsedFully &&
        'ld-sidenav-toggle-outside--collapsed-fully',
    ])

    return (
      <Host class={cl}>
        <ld-tooltip
          arrow
          size="sm"
          ref={(el) => (this.tooltipRef = el)}
          show-delay="1000"
          position={
            this.sidenavAlignement === 'left' ? 'right middle' : 'left middle'
          }
          tag="span"
          tetherOptions={this.tetherOptions}
        >
          <button
            slot="trigger"
            role="switch"
            brand-color
            aria-checked={this.sidenavCollapsed ? 'false' : 'true'}
            class="ld-sidenav-toggle-outside__toggle"
            onClick={this.toggleSidenavCollapsedState}
            part="toggle focusable"
            ref={(ref) => (this.toggle = ref)}
            tabIndex={this.ldTabindex}
          >
            <ld-icon
              class="ld-sidenav-toggle-outside__icon"
              name="sidenav-right"
              part="toggle-icon"
            ></ld-icon>
            <ld-sr-only>{this.labelExpand}</ld-sr-only>
          </button>
          <ld-typo>{this.labelExpand}</ld-typo>
        </ld-tooltip>
      </Host>
    )
  }
}
