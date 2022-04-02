import { Component, Element, h, Host, Prop, State } from '@stencil/core'
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

  @State() initialized = false

  /** Show arrow */
  @Prop() arrow: boolean

  /** The tooltip size (effects tooltip padding only) */
  @Prop() size?: 'sm'

  /** Event type that triggers the tooltip */
  @Prop() triggerType: 'click' | 'hover' = 'hover'

  /** Whether the tooltip has a custom trigger or not */
  @Prop() hasDefaultTrigger: boolean

  componentDidLoad() {
    setTimeout(() => {
      this.initialized = true
    })
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-tooltip',
          this.arrow && 'ld-tooltip--with-arrow',
          this.hasDefaultTrigger && 'ld-tooltip--with-default-trigger',
          this.initialized && 'ld-tooltip--initialized',
          this.size && `ld-tooltip--${this.size}`,
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
