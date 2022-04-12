import '../../../components' // type definitions for type checks and intelliSense
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
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-slider',
  styleUrl: 'ld-sidenav-slider.shadow.css',
  shadow: true,
})
export class LdSidenavSlider {
  @Element() el: HTMLLdSidenavSliderElement
  private sidenav: HTMLLdSidenavElement
  private scrollerRef: HTMLLdSidenavScrollerInternalElement

  /** ID of the subnav that shall be shown on initial render. */
  @Prop({ mutable: true }) currentSubnav: string

  /** Used in the ld-sidenav-back component to display parent nav label. */
  @Prop() label: string

  @State() currentNavLevel: number
  @State() activeSubnavs: HTMLLdSidenavSubnavElement[] = []
  @State() isFirstLevelHidden = false

  /**
   * Emitted on navigation (before transition ends).
   */
  @Event() ldSidenavSliderChange: EventEmitter<
    { id: string; label: string } | undefined
  >

  private navigateToSubnav() {
    // Make current subnav and all ancestor subnavs active.
    let parentSubnav: HTMLLdSidenavSubnavElement
    let subnavId = this.currentSubnav
    this.activeSubnavs = []
    while (subnavId) {
      const subnav = document.querySelector<HTMLLdSidenavSubnavElement>(
        `#${subnavId}`
      )
      if (subnav) {
        subnav.active = true
        parentSubnav = subnav.closest(`ld-sidenav-subnav:not(#${subnavId})`)
        this.activeSubnavs.unshift(subnav)
        if (parentSubnav) {
          subnavId = parentSubnav.id
        } else {
          subnavId = undefined
        }
      } else {
        subnavId = undefined
      }
    }

    if (this.activeSubnavs.length !== this.currentNavLevel) {
      // Condition is true for almost all use cases.
      let needsInertUpdate = false
      if (
        this.currentNavLevel === undefined ||
        this.currentNavLevel > this.activeSubnavs.length
      ) {
        needsInertUpdate = true
        this.updateAncestor()
      }
      this.currentNavLevel = this.activeSubnavs.length
      if (needsInertUpdate) this.updateFirstLevelHidden()

      this.updateActiveBeforeTransition()
    } else if (this.activeSubnavs.length > 0) {
      // This condition applies if navigating to a subnav
      // which has the same level as the currently active subnav.
      // This happens on change of the currentSubnav prop from
      // the outside.
      this.updateActive()
      this.updateAncestor()
      this.updateFirstLevelHidden()
      this.scrollInactiveToTop()
    }
  }

  @Watch('currentSubnav')
  handleSubnavChange() {
    this.navigateToSubnav()
    this.emitChange()
  }

  @Listen('ldSidenavNavitemTo')
  slideToHandler(ev: CustomEvent<{ id: string; label: string }>) {
    this.currentSubnav = ev.detail.id
  }

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev) {
    if (ev.target !== this.sidenav) return
    if (ev.detail) {
      this.scrollerRef.scrollToTop(true)
      this.toggleVisibilityOnHidableContent(false)
    } else {
      this.toggleVisibilityOnHidableContent(true)
    }
  }

  /** Navigates back to the parent nav. */
  @Method()
  async navigateBack() {
    if (this.currentNavLevel > 0) {
      const parentSubnav = this.activeSubnavs[this.activeSubnavs.length - 2]
      this.currentSubnav = parentSubnav?.id || ''
    }
  }

  private emitChange() {
    const activeSubnav = this.activeSubnavs[this.activeSubnavs.length - 1]
    if (activeSubnav) {
      const parentSubnav =
        this.activeSubnavs[this.activeSubnavs.length - 2] || this.el
      this.ldSidenavSliderChange.emit({
        id: activeSubnav.id,
        label: parentSubnav.label,
      })
    } else if (!this.currentSubnav) {
      this.ldSidenavSliderChange.emit()
    }
  }

  private updateActiveBeforeTransition = () => {
    // reset
    this.el.querySelectorAll('ld-sidenav-subnav').forEach((subnav) => {
      subnav.activeBeforeTransition = false
    })

    // update
    this.activeSubnavs.forEach((subnav) => {
      subnav.activeBeforeTransition = true
    })
  }

  private updateActive = () => {
    // reset
    this.el.querySelectorAll('ld-sidenav-subnav').forEach((subnav) => {
      subnav.active = false
    })

    // update
    this.activeSubnavs.forEach((subnav) => {
      subnav.active = true
    })
  }

  private updateAncestor = () => {
    // reset
    this.el.querySelectorAll('ld-sidenav-subnav').forEach((subnav) => {
      subnav.ancestor = false
    })

    // update
    this.activeSubnavs.forEach((subnav, index) => {
      subnav.ancestor = index < this.activeSubnavs.length - 1
    })
  }

  private updateFirstLevelHidden = () => {
    this.isFirstLevelHidden = this.currentNavLevel > 0
  }

  private scrollInactiveToTop = () => {
    // Scroll all inactive subnav scroll containers to top.
    Array.from(
      this.el.querySelectorAll<HTMLLdSidenavSubnavElement>('ld-sidenav-subnav')
    ).forEach((subnav) => {
      if (!subnav.active) {
        subnav.scrollToTop()
      }
    })
  }

  private onTransitionEnd = (event) => {
    if (event.target !== this.el) return

    this.updateActive()
    this.updateAncestor()
    this.updateFirstLevelHidden()
    this.scrollInactiveToTop()
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
        el.classList.toggle('ld-sidenav-slider__hidden', !visible)
      }
    })
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    if (this.currentSubnav) {
      this.handleSubnavChange()
    }
    if (this.currentNavLevel === undefined) {
      this.currentNavLevel = 0
    }
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-slider',
      this.currentNavLevel > 0 && 'ld-sidenav-slider--subnav-active',
    ])

    return (
      <Host
        onTransitionEnd={this.onTransitionEnd}
        class={cl}
        style={{
          transform: `translateX(-${this.currentNavLevel}00%)`,
          visibility: this.isFirstLevelHidden ? 'hidden' : 'inherit',
        }}
      >
        <ld-sidenav-scroller-internal
          part="scroll-container"
          ref={(el) => (this.scrollerRef = el)}
        >
          <slot></slot>
        </ld-sidenav-scroller-internal>
      </Host>
    )
  }
}
