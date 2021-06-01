import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop, getAssetPath } from '@stencil/core'

@Component({
  assetsDirs: ['assets'],
  tag: 'ld-input-message',
  styleUrl: 'ld-input-message.css',
  shadow: false,
})
export class LdInputMessage {
  /** Input message mode. */
  @Prop() mode: 'error' | 'info' | 'valid' = 'error'

  /**
   * This property does **not** change the visual appearance of the input message.
   * Set this property to `true` if the message is hidden initially and change it to
   * `false` as soon as you make the message visible again. It changes the `aria-hidden`
   * attribute on the slot which is wrapped by an element that has an `aria-live`
   * attribute with the value `assertive`. This means that the slot is wrapped by a
   * so called “live region”, which is conveyed to screen readers and other assistive
   * technology. The value “assertive” emphasizes the importance of the message and
   * causes screen readers to interrupt their current tasks to read aloud this message.
   * Thus the message is read aloud before the next element that received the focus
   * is announced to the user.
   */
  @Prop() covert = false

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
          <span aria-hidden={this.covert ? 'true' : undefined}>
            <slot></slot>
          </span>
        </span>
      </span>
    )
  }
}
