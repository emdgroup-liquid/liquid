import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop, getAssetPath, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part icon - Image tag used for the icon
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-input-message',
  styleUrl: 'ld-input-message.css',
  shadow: true,
})
export class LdInputMessage {
  /** Input message mode. */
  @Prop() mode: 'error' | 'info' | 'valid' = 'error'

  render() {
    return (
      <Host class={`ld-input-message ld-input-message--${this.mode}`}>
        <img
          alt=""
          class="ld-input-message__icon"
          part="icon"
          role="presentation"
          src={getAssetPath(`./assets/${this.mode}.svg`)}
        />
        <span aria-live="assertive">
          <slot></slot>
        </span>
      </Host>
    )
  }
}
