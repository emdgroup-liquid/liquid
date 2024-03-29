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
import Tether from 'tether'

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
  private mainlineRef: HTMLElement
  private sublineRef: HTMLElement

  /** Sets visual indicator to denote that the nav item is currently selected. */
  @Prop() selected? = false

  /**
   * Transforms the nav item to an anchor element.
   */
  @Prop() href?: string

  /**
   * Display mode. Primary is the default value. It shows an icon
   * and the item uses the regular size.
   * In secondary mode the navitem is less high, displays a filled dot
   * instead of the icon and is hidden when the sidenav collapses.
   * The tertiary mode is similar to secondary mode, with the navitem
   * indented and the dot being empty and having a border.
   */
  @Prop() mode?: 'primary' | 'secondary' | 'tertiary' = 'primary'

  /** Applies full border-radius. */
  @Prop({ reflect: true }) rounded? = false

  /** Tab index of the button. */
  @Prop() ldTabindex?: number

  /**
   * By default, the sidenav automatically expands on click of a navitem,
   * which has a `to` property or acts as an accordion toggle. You can
   * overwrite this behavior by using this prop to explicitly force or
   * prevent expansion of the sidenav.
   */
  @Prop() expandOnClick?: boolean

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  /** Tooltip tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  /** Accepts an id of a ld-subnav component to navigate to it on click. */
  @Prop({ reflect: true }) to?: string

  /** Emitted on click if prop to is set. */
  @Event() ldSidenavNavitemTo: EventEmitter<{ id: string; label: string }>

  /** Emitted on click. */
  @Event() ldSidenavNavitemClick: EventEmitter

  @State() tooltipContent: string
  @State() abbreviation: string
  @State() inAccordion: boolean
  @State() isAccordionToggle: boolean
  @State() sidenavAlignement: 'left' | 'right'
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean
  @State() sidenavExpandsOnMouseEnter: boolean
  @State() secondaryIconHTML: string
  @State() closestTheme: string
  @State() themeClass: string
  @State() hasSubline: boolean
  @State() hasSecondaryIcon: boolean

  /**
   * Sets focus on the anchor or button
   */
  @Method()
  async focusInner() {
    this.focusableElement?.focus()
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
    this.updateStackToTop()
    this.tooltipRef?.hideTooltip()
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
    this.updateStackToTop()
  }

  private updateStackToTop = () => {
    if (this.sidenavClosable) {
      toggleStackToTop(this.el, false)
    } else {
      toggleStackToTop(this.el, this.sidenav.narrow && this.sidenavCollapsed)
    }
  }

  private getabbreviation = () => {
    try {
      const words = this.el.textContent.trim().split(' ')
      const chars =
        words.length > 1
          ? words.map((s) => {
              const char = s.match(/[a-zA-Z]/)
              return (char && char[0]) || ''
            })
          : words[0].match(/[a-zA-Z]/g)
      return chars
        .filter((c) => c)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    } catch (err) {
      return ''
    }
  }

  private onClick = () => {
    if (this.to) {
      // Trigger navigation to subnav.
      this.ldSidenavNavitemTo.emit({ id: this.to, label: this.el.textContent })
    } else if (this.el.parentElement.tagName === 'LD-SIDENAV-ACCORDION') {
      // Expand accordion.
      if (this.expandOnClick !== false && this.sidenavCollapsed) {
        ;(this.el.parentElement as HTMLLdSidenavAccordionElement).expanded =
          true
      }
    }
    this.ldSidenavNavitemClick.emit()

    // Hide tooltip.
    ;(this.tooltipRef as unknown as LdTooltip)?.hideTooltip()

    // Expand sidenav.
    if (
      this.expandOnClick ||
      ((this.to || this.el.parentElement.tagName === 'LD-SIDENAV-ACCORDION') &&
        this.expandOnClick !== false)
    ) {
      this.sidenav.collapsed = false
    }
  }

  // We need to have an explicit keydown handler for keyboard navigation
  // since we do not use click events (see comment above).
  private onKeyDown = (ev) => {
    if ([' ', 'Enter'].includes(ev.key)) {
      if (this.to) {
        ev.preventDefault()
      }
      this.onClick()
    }
  }

  private updateTooltipIcon = () => {
    const themeEl = this.el.closest('[class*="ld-theme-"]')
    if (!themeEl) return

    // Array.from(themeEl.classList).find doesn't work in JSDom.
    this.themeClass = themeEl.classList
      .toString()
      .split(' ')
      .find((cl) => cl.startsWith('ld-theme-'))

    this.secondaryIconHTML = this.el.querySelector('[slot="icon-secondary"]')
      ?.outerHTML
  }

  componentWillLoad() {
    this.inAccordion = this.el.parentElement.tagName === 'LD-SIDENAV-ACCORDION'
    this.isAccordionToggle =
      this.inAccordion && this.el.getAttribute('slot') === 'toggle'
    this.hasSubline = Boolean(this.el.querySelector('[slot="subline"]'))
    this.hasSecondaryIcon = Boolean(
      this.el.querySelector('[slot="icon-secondary"]')
    )
    this.sidenav = closest('ld-sidenav', this.el)
    if (this.sidenav) {
      this.sidenavAlignement = this.sidenav.align
      this.sidenavExpandsOnMouseEnter =
        this.sidenav.expandTrigger === 'mouseenter'
      this.sidenavCollapsed = this.sidenav.collapsed
    }
    if (this.mode === 'primary') {
      this.tooltipContent = this.el.textContent.trim().split('\n')[0].trim()

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
      this.mainlineRef.style.boxSizing = 'border-box'
      this.sublineRef.style.boxSizing = 'border-box'
    })
    setTimeout(() => {
      this.mainlineRef.style.alignItems = 'center'
      this.sublineRef.style.alignItems = 'center'
    }, 200)

    // The ldSidenavCollapsedChange event can be fired before this component is loaded.
    // So we need to update the stacking here.
    setTimeout(() => {
      this.updateStackToTop()
    })
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-navitem',
      this.selected && 'ld-sidenav-navitem--selected',
      this.inAccordion && 'ld-sidenav-navitem--in-accordion',
      this.hasSubline && 'ld-sidenav-navitem--subline',
      this.hasSecondaryIcon && 'ld-sidenav-navitem--secondary-icon',
      this.rounded && 'ld-sidenav-navitem--rounded',
      this.mode !== 'primary' && `ld-sidenav-navitem--${this.mode}`,
      this.sidenavAlignement === 'right' && 'ld-sidenav-navitem--right-aligned',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-navitem--collapsed',
    ])

    const Tag = this.href ? 'a' : 'button'

    const tooltipIconStyle = {
      color: 'var(--ld-thm-primary)',
      display: 'inline-flex',
      marginLeft: 'var(--ld-sp-6)',
    }

    const hasPopup = this.to || this.isAccordionToggle ? 'true' : undefined

    return (
      <Tag
        part="navitem focusable"
        class={cl}
        href={this.href}
        ref={(el) => (this.focusableElement = el)}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        aria-haspopup={hasPopup}
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
            arrow
            size="sm"
            class="ld-sidenav-navitem__tooltip"
            disabled={!this.sidenavCollapsed}
            ref={(el) => (this.tooltipRef = el)}
            show-delay="250"
            onMouseEnter={this.updateTooltipIcon}
            position={
              this.sidenavAlignement === 'left' ? 'right middle' : 'left middle'
            }
            tetherOptions={this.tetherOptions}
            tag="span"
          >
            <div class="ld-sidenav-navitem__tooltip-trigger" slot="trigger" />
            <div
              class={this.themeClass}
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                alignItems: 'center',
              }}
            >
              <ld-typo>{this.tooltipContent}</ld-typo>
              {this.to ? (
                <ld-icon style={tooltipIconStyle} name="real-arrow" />
              ) : (
                this.secondaryIconHTML && (
                  <span
                    style={tooltipIconStyle}
                    innerHTML={this.secondaryIconHTML}
                  />
                )
              )}
            </div>
          </ld-tooltip>
        </div>
        <div class="ld-sidenav-navitem__slot-container" part="slot-container">
          <span
            ref={(el) => (this.mainlineRef = el)}
            class="ld-sidenav-navitem__mainline"
            part="mainline"
          >
            <slot />
          </span>
          <span
            ref={(el) => (this.sublineRef = el)}
            class="ld-sidenav-navitem__subline"
            part="subline"
          >
            <slot name="subline" />
          </span>
        </div>
        <div class="ld-sidenav-navitem__slot-icon-secondary-container">
          {this.to ? (
            <ld-icon class="ld-sidenav-navitem__icon-to" name="real-arrow" />
          ) : (
            <slot name="icon-secondary"></slot>
          )}
        </div>
      </Tag>
    )
  }
}
