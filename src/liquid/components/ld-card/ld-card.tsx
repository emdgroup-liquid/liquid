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
  /** Adds cursor pointer as well as hover and focus-within states. */
  @Prop() interactive: boolean

  /** Card elevation determins the size of the card box shadow. */
  @Prop() shadow: 'active' | 'hover' | 'stacked' | 'sticky' = 'stacked'

  /** The size prop effects the card padding only. */
  @Prop() size?: 'sm'

  /** The rendered HTML tag for the card. Use `li` to group cards in a list. */
  @Prop() tag = 'div'

  render() {
    const cl = getClassNames([
      'ld-card',
      this.interactive && 'ld-card--interactive',
      this.shadow && `ld-card--${this.shadow}`,
      this.size && `ld-card--${this.size}`,
    ])

    const Tag = this.tag

    return (
      <Tag class={cl} part="card">
        <slot></slot>
      </Tag>
    )
  }
}
