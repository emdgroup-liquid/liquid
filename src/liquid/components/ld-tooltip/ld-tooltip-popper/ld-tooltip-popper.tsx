import { Component, Element, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import '../../../components' // type definitions for type checks and intelliSense

/** @internal **/
@Component({
  tag: 'ld-tooltip-popper',
  styleUrl: 'ld-tooltip-popper.shadow.css',
  shadow: true,
})
export class LdTooltipPopper {
  @Element() element: HTMLElement

  /** Show arrow */
  @Prop() arrow: boolean

  /** Event type that triggers the tooltip */
  @Prop() triggerType: 'click' | 'hover' = 'hover'

  /** Whether the tooltip has a custom trigger or not */
  @Prop() hasDefaultTrigger: boolean

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-tooltip',
          this.arrow && 'ld-tooltip--with-arrow',
          this.hasDefaultTrigger && 'ld-tooltip--with-default-trigger',
          this.triggerType === 'click' && 'ld-tooltip--interactive',
        ])}
        role="tooltip"
      >
        {this.arrow && <span class="ld-tooltip__arrow" />}
        <slot />
      </Host>
    )
  }
}
