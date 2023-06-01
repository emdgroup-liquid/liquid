import { Component, Element, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-card',
  styleUrl: 'ld-card.css',
  shadow: true,
})
export class LdCard {
  @Element() el: HTMLLdCardElement

  /** Simulates card elevation by setting the size of the card box shadow. */
  @Prop() shadow?: 'active' | 'hover' | 'stacked' | 'sticky' = 'stacked'

  /**
   * Adds hover and focus-within states using an elevation transition from
   * `shadow` (see above) to `shadowInteractive`.
   */
  @Prop() shadowInteractive?: 'active' | 'hover' | 'stacked' | 'sticky'

  /** The size prop effects the card padding only. */
  @Prop() size?: 'sm'

  componentWillLoad() {
    if (this.el.parentElement?.tagName === 'LD-CARD-STACK') {
      this.el.setAttribute('role', 'listitem')
    }
  }

  render() {
    const cl = getClassNames([
      'ld-card',
      this.size && `ld-card--${this.size}`,
      this.shadow && `ld-card--${this.shadow}`,
      this.shadowInteractive &&
        `ld-card--interactive-${this.shadowInteractive}`,
    ])

    return (
      <Host class={cl}>
        <slot></slot>
      </Host>
    )
  }
}
