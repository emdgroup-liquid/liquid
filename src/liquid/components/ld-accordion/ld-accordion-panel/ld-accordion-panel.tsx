import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-accordion-panel',
  styleUrl: 'ld-accordion-panel.shadow.css',
  shadow: true,
})
export class LdAccordionPanel {
  @Element() el: HTMLElement

  // Container to be observed for size changes.
  // Note that we can not observe size changes on the element itself,
  // As with the max-height prop applied to it changes to the content
  // will not trigger a resize event. Hence, we use a container element.
  private contentRef: HTMLDivElement

  @State() expanded: boolean
  @State() initialized = false
  @State() transitionEnabled = false
  @State() maxHeight: number
  @State() resizeObserver: ResizeObserver
  @State() innerPanelExpanding = false

  /**
   * @internal
   * Emitted on accordion panel max-height change.
   */
  @Event() ldaccordionmaxheightchange: EventEmitter<number>

  /**
   * @internal
   * Updates expanded state.
   */
  @Method()
  async setExpanded(expanded: boolean) {
    this.expanded = expanded

    this.applyMaxHeight()
  }

  private applyMaxHeight = (additionalHeightFromInnerPanel = 0) => {
    if (additionalHeightFromInnerPanel) {
      this.innerPanelExpanding = true
    }

    // Apply max-height on outer panel inside nested accordion.
    if (this.expanded) {
      this.ldaccordionmaxheightchange.emit(this.el.scrollHeight)
    }

    this.maxHeight = this.expanded
      ? this.el.scrollHeight + additionalHeightFromInnerPanel
      : 0
  }

  private handleInnerMaxHeightChange = (ev: CustomEvent) => {
    if (ev.target === this.el) return

    ev.stopImmediatePropagation()
    this.applyMaxHeight(ev.detail)
  }

  private onTransitionEnd = (ev: TransitionEvent) => {
    if (ev.target === this.el) {
      this.innerPanelExpanding = false
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      this.resizeObserver = new ResizeObserver(() => {
        // When a panel is expanding inside a nested accordion, the nested panel
        // takes over the responsibility for updating the max-height on the outer
        // panel. In other words: We disable the observer callback function in
        // order to instantly update the max-height for a better performance.
        if (!this.innerPanelExpanding) {
          this.applyMaxHeight()
        }
      })
      this.resizeObserver.observe(this.contentRef)
      this.initialized = true
    })
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.resizeObserver) this.resizeObserver.unobserve(this.contentRef)
  }

  render() {
    const cl = getClassNames([
      'ld-accordion-panel',
      this.expanded && 'ld-accordion-panel--expanded',
      this.initialized && 'ld-accordion-panel--initialized',
    ])

    return (
      <Host
        style={{ '--ld-accordion-panel-max-height': this.maxHeight + 'px' }}
        class={cl}
        onTransitionEnd={this.onTransitionEnd}
        onLdaccordionmaxheightchange={this.handleInnerMaxHeightChange}
      >
        <div
          part="content"
          ref={(ref) => (this.contentRef = ref)}
          class="ld-accordion-panel__content"
        >
          <slot></slot>
        </div>
      </Host>
    )
  }
}
