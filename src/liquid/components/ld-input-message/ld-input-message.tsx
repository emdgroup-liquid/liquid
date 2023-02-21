import { Component, h, Prop, Host } from '@stencil/core'

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
  @Prop() mode?: 'error' | 'info' | 'valid' = 'error'

  render() {
    return (
      <Host class={`ld-input-message ld-input-message--${this.mode}`}>
        <ld-icon
          class="ld-input-message__icon"
          name={'ld-input-message-' + this.mode}
          part="icon"
          size="sm"
        />
        <span aria-live="assertive">
          <slot></slot>
        </span>
      </Host>
    )
  }
}
