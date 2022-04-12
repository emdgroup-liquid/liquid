import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'
import { toggleStackToTop } from '../utils/toggleStackToTop'
import { LdTooltip } from '../../ld-tooltip/ld-tooltip'

/**
 * @slot - default slot for the nav item label.
 * @slot icon - slot for svg or icon component.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-navitem',
  styleUrl: 'ld-sidenav-navitem.shadow.css',
  shadow: true,
})
export class LdSidenavNavitem implements InnerFocusable {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement
  private focusableElement: HTMLAnchorElement | HTMLButtonElement
  private tooltipRef: HTMLLdTooltipElement
  private slotContainerRef: HTMLElement

  /** Sets visual indicator to denote that the nav item is currently active. */
  @Prop() active = false

  /**
   * Transforms the nav item to an anchor element.
   */
  @Prop() href?: string

  /**
   * Display mode.
   * In secondary mode the navitem is less high, displays a filled dot
   * instead of the icon and is hidden when the sidenav collapses.
   * The tertiary mode is similar to secondary mode, with the navitem
   * indented and the dot being empty and having a border.
   */
  @Prop() mode?: 'secondary' | 'tertiary'

  /** Applies full border-radius. */
  @Prop() rounded = false

  /** Tab index of the button. */
  @Prop() ldTabindex: number | undefined

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  /** Accepts an id of an ld-subnav component to navigate to it on click. */
  @Prop({ reflect: true }) to?: string

  /** Emitted on click if prop to is set. */
  @Event() ldSidenavNavitemTo: EventEmitter<{ id: string; label: string }>

  @State() tooltipContent: string
  @State() abbreviation: string
  @State() sidenavAlignement: 'left' | 'right'
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean
  @State() sidenavExpandsOnMouseEnter: boolean

  /**
   * Sets focus on the anchor or button
   */
  @Method()
  async focusInner() {
    this.focusableElement?.focus()
  }

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail
    if (this.sidenav.narrow) {
      toggleStackToTop(this.el, this.sidenavCollapsed)
    }
    ;(this.tooltipRef as unknown as LdTooltip)?.hideTooltip()
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
  }

  private getabbreviation = () => {
    try {
      const words = this.el.textContent.trim().split(' ')
      const chars =
        words.length > 1
          ? words.map((s) => s.match(/[a-zA-Z]/)[0])
          : words[0].match(/[a-zA-Z]/g)
      return (
        chars
          // The M character is twice as wide as other characters in the M-Font.
          .slice(0, chars.some((char) => char.toLowerCase() === 'm') ? 1 : 2)
          .join('')
          .toUpperCase()
      )
    } catch (err) {
      return ''
    }
  }

  private onClick = () => {
    if (this.to) {
      this.ldSidenavNavitemTo.emit({ id: this.to, label: this.el.textContent })
    }
    ;(this.tooltipRef as unknown as LdTooltip)?.hideTooltip()
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    this.sidenavAlignement = this.sidenav.align
    this.sidenavExpandsOnMouseEnter =
      this.sidenav.expandTrigger === 'mouseenter'
    if (!['secondary', 'tertiary'].includes(this.mode)) {
      this.tooltipContent = this.el.textContent.trim()

      if (!this.el.querySelector('[slot="icon"]')) {
        this.abbreviation = this.getabbreviation()
      }
    }
  }

  componentDidLoad() {
    // HACK: Due to Safari's buggy line-clamp implementation we need
    //  to trigger a re-render after a certain timeout in order for the
    //  ellipsis to be rendered. In most cases the first timeout is enough
    //  to trigger a re-render in Safari. However, in rare cases we need
    //  to wait a little longer.
    //  A re-render can be triggered by changing certain styles; in our
    //  case we use box-sizing and align-items which otherwhise do not
    //  effect the appearence of the element.
    setTimeout(() => {
      this.slotContainerRef.style.boxSizing = 'border-box'
    })
    setTimeout(() => {
      this.slotContainerRef.style.alignItems = 'center'
    }, 200)
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-navitem',
      this.active && 'ld-sidenav-navitem--active',
      this.rounded && 'ld-sidenav-navitem--rounded',
      this.mode && `ld-sidenav-navitem--${this.mode}`,
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-navitem--collapsed',
    ])

    const Tag = this.href ? 'a' : 'button'

    return (
      <Tag
        part="navitem focusable"
        class={cl}
        href={this.href}
        ref={(el) => (this.focusableElement = el)}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        onClick={this.onClick}
        aria-haspopup={this.to ? 'true' : undefined}
        aria-expanded={this.to ? 'false' : undefined}
        tabIndex={this.ldTabindex}
      >
        <div class="ld-sidenav-navitem__bg" part="bg">
          <div class="ld-sidenav-navitem__bg-left"></div>
          <div class="ld-sidenav-navitem__bg-center"></div>
          <div class="ld-sidenav-navitem__bg-right"></div>
        </div>
        <div class="ld-sidenav-navitem__dot" part="dot"></div>
        <div
          class="ld-sidenav-navitem__slot-container-icon"
          role="presentation"
          part="slot-container-icon"
        >
          <slot name="icon"></slot>
          {this.abbreviation && (
            <span class="ld-sidenav-navitem__abbr" part="abbreviation">
              {this.abbreviation}
            </span>
          )}

          <ld-tooltip
            show-delay="250"
            tag="span"
            ref={(el) => (this.tooltipRef = el)}
            class="ld-sidenav-navitem__tooltip"
            disabled={!this.sidenavCollapsed}
            arrow
            position={
              this.sidenavAlignement === 'left' ? 'right middle' : 'left middle'
            }
          >
            <div
              class="ld-sidenav-navitem__tooltip-trigger"
              slot="trigger"
              onClick={this.onClick}
            />
            <div class="ld-sidenav-navitem__tooltip-content">
              <ld-typo>{this.tooltipContent}</ld-typo>
            </div>
          </ld-tooltip>
        </div>
        <div
          ref={(el) => (this.slotContainerRef = el)}
          class="ld-sidenav-navitem__slot-container"
          part="slot-container"
        >
          <slot></slot>
        </div>
        <div class="ld-sidenav-navitem__slot-icon-secondary-container">
          <slot name="icon-secondary"></slot>
        </div>
      </Tag>
    )
  }
}
