import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'

/** @internal **/
@Component({
  tag: 'ld-sidenav-scroller-internal',
  styleUrl: 'ld-sidenav-scroller-internal.shadow.css',
  shadow: true,
})
export class LdSidenavScrollerInternal {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement

  @State() hasShadowBottom = false
  @State() hasShadowTop = false
  @State() needsHRBottom: boolean
  @State() needsHRTop: boolean
  @State() relative: boolean
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
  }

  /**
   * Makes shadows either appear or disappear on top and bottom of the
   * scroll container, depending on the current scroll position.
   */
  @Method()
  async updateShadows() {
    const scrollContainer = this.el
    if (!scrollContainer) return
    this.hasShadowBottom =
      scrollContainer.scrollTop <
      scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
    this.hasShadowTop = scrollContainer.scrollTop > 10
  }

  /** Scrolls the scroll container to the top instantly. */
  @Method()
  async scrollToTop(smoothly = false) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    try {
      this.el.scrollTo({
        top: 0,
        behavior: smoothly && !prefersReducedMotion ? 'smooth' : 'auto',
      })
    } catch (err) {
      // js-dom seems to not know scrollTo - ignoring for now
    }
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    if (!this.sidenav) return

    this.needsHRTop = !!this.sidenav.querySelector('[slot="top"]')
    this.needsHRBottom = !!this.sidenav.querySelector('[slot="bottom"]')
    this.relative = !this.sidenav.querySelector('ld-sidenav-slider')
  }

  componentDidLoad() {
    setTimeout(() => {
      this.updateShadows()
    })
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-scroller-internal',
      this.relative && 'ld-sidenav-scroller-internal--relative',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-scroller-internal--collapsed',
    ])

    return (
      <Host
        class={cl}
        onScroll={this.updateShadows.bind(this)}
        onLdSidenavAccordionTransitionEnd={this.updateShadows.bind(this)}
        data-needs-bottom={this.needsHRBottom}
        data-needs-top={this.needsHRTop}
      >
        <div
          class="ld-sidenav-scroller-internal__shadow-top"
          style={{ opacity: this.hasShadowTop ? '1' : '0' }}
          part="shadow-top"
        ></div>
        <div
          class="ld-sidenav-scroller-internal__shadow-bottom"
          style={{ opacity: this.hasShadowBottom ? '1' : '0' }}
          part="shadow-bottom"
        ></div>
        {this.needsHRTop && (
          <ld-sidenav-separator
            class="ld-sidenav-scroller-internal__hr-top"
            style={{ opacity: this.hasShadowTop ? '0' : '1' }}
          ></ld-sidenav-separator>
        )}
        {this.needsHRBottom && (
          <ld-sidenav-separator
            class="ld-sidenav-scroller-internal__hr-bottom"
            style={{ opacity: this.hasShadowBottom ? '0' : '1' }}
          ></ld-sidenav-separator>
        )}
        <slot></slot>
      </Host>
    )
  }
}
