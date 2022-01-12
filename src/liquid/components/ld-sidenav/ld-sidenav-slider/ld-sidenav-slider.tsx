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
import { LdSidenavSubnav } from '../ld-sidenav-subnav/ld-sidenav-subnav'
import { getClassNames } from '../../../utils/getClassNames'
import { LdSidenavScrollerInternal } from '../ld-sidenav-scroller-internal/ld-sidenav-scroller-internal'
import { closest } from '../../../utils/closest'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-slider',
  styleUrl: 'ld-sidenav-slider.css',
  shadow: true,
})
export class LdSidenavSlider {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement
  private scrollerRef: LdSidenavScrollerInternal

  private sidenavsToDeactivate: HTMLLdSidenavSubnavElement[] = []

  /** ID of the subnav that shall be shown on initial render. */
  @Prop({ mutable: true }) currentSubnav: string

  /** Used in the ld-sidenav-back component to display parent nav label. */
  @Prop() label: string

  @State() currentNavLevel: number
  @State() transitioning = false
  @State() activeSubnavs: HTMLLdSidenavSubnavElement[] = []
  @State() isInert = false

  /**
   * Emitted on navigation (after transition, if applicable).
   */
  @Event() ldSidenavSliderChange: EventEmitter<
    { id: string; label: string } | undefined
  >

  @Watch('currentSubnav')
  navigateToSubnav() {
    this.transitioning = true

    // Make current subnav and all ancestor subnavs active.
    let parentSubnav
    let subnavId = this.currentSubnav
    this.sidenavsToDeactivate = [...this.activeSubnavs]
    this.activeSubnavs = []
    while (subnavId) {
      const subnav = document.querySelector<HTMLLdSidenavSubnavElement>(
        `#${subnavId}`
      )
      if (subnav) {
        ;(subnav as unknown as LdSidenavSubnav).active = true
        parentSubnav = subnav.closest<HTMLLdSidenavSubnavElement>(
          `ld-sidenav-subnav:not(#${subnavId})`
        )
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
      if (needsInertUpdate) this.updateInert()
    } else {
      // This condition applies if navigating to a subnav
      // which has the same level as the currently active subnav.
      // This happens on change of the currentSubnav prop from
      // the outside.
      this.updateActive()
      this.updateAncestor()
      this.updateInert()
      this.scrollInactiveToTop()
      this.transitioning = false
    }

    this.updateActiveBeforeTransition()
    this.emitSlidenavChange()
  }

  @Listen('ldSidenavNavitemTo')
  slideToHandler(ev: CustomEvent<{ id: string; label: string }>) {
    if (!this.transitioning) {
      this.currentSubnav = ev.detail.id
    }
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
    if (this.currentNavLevel > 0 && !this.transitioning) {
      const parentSubnav = this.activeSubnavs[this.activeSubnavs.length - 2]
      this.currentSubnav = parentSubnav?.id || ''
    }
  }

  private emitSlidenavChange() {
    const activeSubnav = this.activeSubnavs[this.activeSubnavs.length - 1]
    if (activeSubnav) {
      const parentSubnav = (this.activeSubnavs[this.activeSubnavs.length - 2] ||
        this.el) as unknown as LdSidenavSubnav
      this.ldSidenavSliderChange.emit({
        id: activeSubnav.id,
        label: parentSubnav.label,
      })
    } else {
      this.ldSidenavSliderChange.emit()
    }
  }

  private updateActiveBeforeTransition = () => {
    // reset
    this.sidenavsToDeactivate.forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.activeBeforeTransition = false
    })

    // update
    this.activeSubnavs.forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.activeBeforeTransition = true
    })
  }

  private updateActive = () => {
    // reset
    this.sidenavsToDeactivate.forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.active = false
    })
    this.sidenavsToDeactivate = []

    // update
    this.activeSubnavs.forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.active = true
    })
  }

  private updateAncestor = () => {
    // reset
    this.sidenavsToDeactivate.forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.ancestor = false
    })

    // update
    this.activeSubnavs.forEach((subnav, index) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      subnavComponent.ancestor = index < this.activeSubnavs.length - 1
    })
  }

  private updateInert = () => {
    this.isInert = this.currentNavLevel > 0
  }

  private scrollInactiveToTop = () => {
    // Scroll all inactive subnav scroll containers to top.
    Array.from(
      this.el.querySelectorAll<HTMLLdSidenavSubnavElement>('ld-sidenav-subnav')
    ).forEach((subnav) => {
      const subnavComponent = subnav as unknown as LdSidenavSubnav
      if (!subnavComponent.active) {
        subnavComponent.scrollToTop()
      }
    })
  }

  private onTransitionEnd = () => {
    this.transitioning = false
    this.updateActive()
    this.updateAncestor()
    this.updateInert()
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
      this.navigateToSubnav()
      this.transitioning = false
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      if (this.currentNavLevel === undefined) {
        this.currentNavLevel = 0
      }
    })
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
          visibility: this.isInert ? 'hidden' : 'inherit',
        }}
      >
        <ld-sidenav-scroller-internal
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
