import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-accordion-section',
  styleUrl: 'ld-accordion-section.shadow.css',
  shadow: true,
})
export class LdAccordionSection {
  @Element() el: HTMLElement

  /** Indicates that the accordion section is expanded. */
  @Prop({ mutable: true }) expanded?: boolean

  @State() initialized = false

  /** Emitted on expansion and collapse. */
  @Event() ldaccordionchange: EventEmitter<boolean>

  @Watch('expanded')
  updateExpandedState(newExpanded: boolean) {
    Array.from(this.el.children).forEach(
      (child: HTMLLdAccordionPanelElement | HTMLLdAccordionToggleElement) => {
        if (typeof child.setExpanded === 'function') {
          child.setExpanded(newExpanded)
        }
      }
    )

    if (this.initialized) {
      this.ldaccordionchange.emit(newExpanded)
    }
  }

  private handleToggleClick(ev) {
    if (ev.target.closest('ld-accordion-section') !== this.el) {
      return
    }
    this.expanded = !this.expanded
  }

  componentWillLoad() {
    this.updateExpandedState(this.expanded)
    this.initialized = true
  }

  render() {
    const cl = getClassNames([
      'ld-accordion-section',
      this.expanded && 'ld-accordion-section--expanded',
    ])

    return (
      <Host
        class={cl}
        onLdaccordiontoggleclick={this.handleToggleClick.bind(this)}
      >
        <slot></slot>
      </Host>
    )
  }
}
