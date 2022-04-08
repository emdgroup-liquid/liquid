import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop } from '@stencil/core'
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
  /** Simulates card elevation by setting the size of the card box shadow. */
  @Prop() shadow: 'active' | 'hover' | 'stacked' | 'sticky' = 'stacked'

  /**
   * Adds cursor pointer as well as hover and focus-within states using an
   * elevation transition from `shadow` (see above) to `shadowInteractive`.
   */
  @Prop() shadowInteractive?: 'active' | 'hover' | 'stacked' | 'sticky'

  /** The size prop effects the card padding only. */
  @Prop() size?: 'sm'

  /** The rendered HTML tag for the card. Use `li` to group cards in a list. */
  @Prop() tag = 'div'

  render() {
    const cl = getClassNames([
      'ld-card',
      this.size && `ld-card--${this.size}`,
      this.shadow && `ld-card--${this.shadow}`,
      this.shadowInteractive &&
        `ld-card--interactive-${this.shadowInteractive}`,
    ])

    const Tag = this.tag

    return (
      <Tag class={cl} part="card">
        <slot></slot>
      </Tag>
    )
  }
}
