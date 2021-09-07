import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop, getAssetPath } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-input-message',
  styleUrl: 'ld-input-message.css',
  shadow: false,
})
export class LdInputMessage {
  /** Input message mode. */
  @Prop() mode: 'error' | 'info' | 'valid' = 'error'

  render() {
    let cl = 'ld-input-message'
    cl += ` ld-input-message--${this.mode}`

    return (
      <span class={cl}>
        <img
          class="ld-input-message__icon"
          alt=""
          role="presentation"
          src={getAssetPath(`./assets/${this.mode}.svg`)}
        />
        <span aria-live="assertive">
          <slot></slot>
        </span>
      </span>
    )
  }
}
