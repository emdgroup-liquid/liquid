import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'
import { toggleStackToTop } from '../utils/toggleStackToTop'

/**
 * @slot - default slot for the nav item label.
 * @slot icon - slot for svg or icon component.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-navitem',
  styleUrl: 'ld-sidenav-navitem.css',
  shadow: true,
})
export class LdSidenavNavitem {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement

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

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  /** Accepts an id of an ld-subnav component to navigate to it on click. */
  @Prop() to?: string

  /** Emitted on click if prop to is set. */
  @Event() ldSidenavNavitemTo: EventEmitter<{ id: string; label: string }>

  @State() abbreviation: string
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail
    if (this.sidenav.narrow) {
      toggleStackToTop(this.el, this.sidenavCollapsed)
    }
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
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    if (
      !['secondary', 'tertiary'].includes(this.mode) &&
      !this.el.querySelector('[slot="icon"]')
    ) {
      this.abbreviation = this.getabbreviation()
    }
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
        class={cl}
        href={this.href}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        onClick={this.onClick}
        aria-haspopup={this.to ? 'true' : undefined}
        aria-expanded={this.to ? 'false' : undefined}
      >
        <div class="ld-sidenav-navitem__dot" part="dot"></div>
        <div
          class="ld-sidenav-navitem__slot-container-icon"
          aria-hidden="true"
          part="slot-container-icon"
        >
          <slot name="icon"></slot>
          {this.abbreviation && (
            <span class="ld-sidenav-navitem__abbr" part="abbreviation">
              {this.abbreviation}
            </span>
          )}
        </div>
        <div class="ld-sidenav-navitem__slot-container" part="slot-container">
          <slot></slot>
        </div>
      </Tag>
    )
  }
}
