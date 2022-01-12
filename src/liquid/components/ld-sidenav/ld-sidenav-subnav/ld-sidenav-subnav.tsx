import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { LdSidenavScrollerInternal } from '../ld-sidenav-scroller-internal/ld-sidenav-scroller-internal'
import { closest } from '../../../utils/closest'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-subnav',
  styleUrl: 'ld-sidenav-subnav.css',
  shadow: true,
})
export class LdSidenavSubnav {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement
  private scrollerRef: LdSidenavScrollerInternal
  private bgRef: HTMLElement

  /**
   * @internal
   * Internal prop indicating that the subnav is about to become active which
   * may happen before a transition finishes after which it actually becomes active.
   */
  @Prop() activeBeforeTransition = false

  /**
   * @internal
   * Internal prop indicating that the subnav is either ancestor of the
   * currently visible subnav or the currently visible subnav itself.
   */
  @Prop() active = false

  /**
   * @internal
   * Internal prop indicating that the subnav is ancestor of the
   * currently visible subnav.
   */
  @Prop() ancestor = false

  /** Used in the ld-sidenav-back component to display parent nav label. */
  @Prop() label: string

  @State() hasParentSubnav: boolean

  /** Scrolls the subnav scroll container to the top. */
  @Method()
  async scrollToTop(smoothly = false) {
    this.scrollerRef.scrollToTop(smoothly)
  }

  @Watch('active')
  onActiveChange(active) {
    if (active) {
      this.scrollerRef?.updateShadows()
    }
  }

  @Watch('activeBeforeTransition')
  onActiveBeforeTransitionChange(activeBeforeTransition) {
    this.updateBackground(activeBeforeTransition)
  }

  private updateBackground(activeBeforeTransition: boolean) {
    // HACK: Timeout is required to make the transition work on nav item click
    setTimeout(() => {
      this.bgRef.classList.toggle(
        'ld-sidenav-subnav__background--active',
        activeBeforeTransition
      )
    }, 20)
  }

  private toggleVisibilityOnHidableContent = (visible: boolean) => {
    Array.from(this.el.children).forEach((el) => {
      // To also hide one of the following elements,
      // it is possible to wrap it in a div with display contents.
      if (
        ![
          'LD-SIDENAV-SEPARATOR',
          'LD-SIDENAV-NAVITEM',
          'LD-SIDENAV-SUBNAV',
        ].includes(el.tagName)
      ) {
        el.classList.toggle('ld-sidenav-subnav__hidden', !visible)
      }
    })
  }

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev) {
    if (ev.target !== this.sidenav) return
    if (ev.detail) {
      this.scrollToTop(true)
      this.toggleVisibilityOnHidableContent(false)
    } else {
      this.toggleVisibilityOnHidableContent(true)
    }
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    this.hasParentSubnav = this.el.parentElement.tagName === 'LD-SIDENAV-SUBNAV'
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-subnav',
      this.active && 'ld-sidenav-subnav--active',
      this.hasParentSubnav && 'ld-sidenav-subnav--has-parent-subnav',
    ])

    return (
      <Host class={cl}>
        <div
          ref={(el) => (this.bgRef = el)}
          class="ld-sidenav-subnav__background"
        ></div>
        <ld-sidenav-scroller-internal
          style={{
            visibility: !this.active || this.ancestor ? 'hidden' : 'visible',
          }}
          part="scroll-container"
          ref={(el) =>
            (this.scrollerRef = el as unknown as LdSidenavScrollerInternal)
          }
        >
          <slot></slot>
        </ld-sidenav-scroller-internal>
      </Host>
    )
  }
}
