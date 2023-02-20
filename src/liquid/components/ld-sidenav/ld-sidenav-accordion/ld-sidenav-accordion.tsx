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
import { closest } from '../../../utils/closest'
import { getClassNames } from '../../../utils/getClassNames'
import { toggleStackToTop } from '../utils/toggleStackToTop'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-accordion',
  styleUrl: 'ld-sidenav-accordion.shadow.css',
  shadow: true,
})
export class LdSidenavAccordion {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement
  private sectionRef: HTMLLdAccordionSectionElement
  private panelRef: HTMLLdAccordionPanelElement

  @State() expandOnSidenavExpansion: boolean
  @State() inAccordion: boolean
  @State() noIcon: boolean
  @State() rounded: boolean
  @State() sidenavClosable: boolean
  @State() sidenavCollapsed: boolean
  @State() transitionsEnabled = true

  /** Indicates that the accordion section is expanded. */
  @Prop({ mutable: true }) expanded?: boolean

  /**
   * Set to false to make the accordion collapse on sidenav collapse
   * or slide change.
   */
  @Prop() preserveState?: boolean = true

  /**
   * Split the accordion toggle in two parts with the second part containing
   * the caret icon and being responsible for expanding / collapsing
   * the accordion panel.
   */
  @Prop() split?: boolean

  /** Emitted on accordion expand or collaps transition end. */
  @Event() ldSidenavAccordionTransitionEnd: EventEmitter

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
    this.updateStackToTop()
  }

  @Listen('ldSidenavSliderChange', { target: 'window', passive: true })
  handleSidenavSliderChange(ev: CustomEvent<boolean>) {
    // Collapse accordion on sidenav slide change.
    if (
      (ev.target as HTMLLdSidenavSliderElement).closest('ld-sidenav') !==
      this.sidenav
    ) {
      return
    }
    if (!this.preserveState) {
      this.sectionRef.expanded = false
      this.expanded = false
    }
    this.transitionsEnabled = false
    setTimeout(() => {
      this.transitionsEnabled = true
    }, 200)
  }

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(
    ev: CustomEvent<{
      collapsed: boolean
      fully: boolean
    }>
  ) {
    // Collapse or expand accordion on sidenav collapse or expansion.
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail.collapsed
    this.updateStackToTop()
    if (this.sidenavCollapsed) {
      if (this.preserveState) {
        this.expandOnSidenavExpansion = this.sectionRef.expanded
      }
      this.sectionRef.expanded = false
      this.expanded = false
    } else {
      if (this.expandOnSidenavExpansion) {
        this.sectionRef.expanded = true
        this.expanded = true
      }
    }
  }

  @Watch('expanded')
  handleExpandedChange(expanded) {
    this.sectionRef.expanded = expanded
  }

  private onTransitionEnd = (ev: TransitionEvent) => {
    // Emit transition end event to trigger scroll shadow update.
    if (ev.target === this.panelRef) {
      this.ldSidenavAccordionTransitionEnd.emit()
    }
  }

  private updateStackToTop = () => {
    if (this.sidenavClosable) {
      toggleStackToTop(this.el, false)
    } else {
      toggleStackToTop(this.el, this.sidenav.narrow && this.sidenavCollapsed)
    }
  }

  componentWillLoad() {
    this.inAccordion = this.el.parentElement.tagName === 'LD-SIDENAV-ACCORDION'
    this.rounded = !!this.el.querySelector(
      'ld-sidenav-navitem[slot="toggle"][rounded]'
    )
    this.noIcon = !!this.el.querySelector(
      'ld-sidenav-navitem[slot="toggle"][mode="secondary"],ld-sidenav-navitem[slot="toggle"][mode="tertiary"]'
    )
    this.sidenav = closest('ld-sidenav', this.el)
    if (this.sidenav) {
      this.sidenavCollapsed = this.sidenav.collapsed
    }
  }

  componentDidLoad() {
    // The ldSidenavCollapsedChange event can be fired before this component is loaded.
    // So we need to update the stacking here.
    setTimeout(() => {
      this.updateStackToTop()
    })
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-accordion',
      this.noIcon && 'ld-sidenav-accordion--no-icon',
      this.rounded && 'ld-sidenav-accordion--rounded',
      this.inAccordion && 'ld-sidenav-accordion--in-accordion',
      this.transitionsEnabled && 'ld-sidenav-accordion--transitions-enabled',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-accordion--collapsed',
      this.split && 'ld-sidenav-accordion--split',
    ])

    return (
      <Host class={cl}>
        <ld-accordion class="ld-sidenav-accordion__accordion">
          <ld-accordion-section
            expanded={this.expanded}
            ref={(el) => (this.sectionRef = el)}
            class="ld-sidenav-accordion__accordion-section"
          >
            <ld-accordion-toggle
              labelTag="div"
              class="ld-sidenav-accordion__accordion-toggle"
              split={this.split}
              ld-tabindex="-1"
            >
              <slot name="toggle"></slot>
            </ld-accordion-toggle>
            <ld-accordion-panel
              ref={(el) => (this.panelRef = el)}
              onTransitionEnd={this.onTransitionEnd}
              class="ld-sidenav-accordion__accordion-panel"
            >
              <slot></slot>
            </ld-accordion-panel>
          </ld-accordion-section>
        </ld-accordion>
      </Host>
    )
  }
}
