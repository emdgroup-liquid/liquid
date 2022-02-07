import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part headline - `ld-typo` element used for the headline
 * @part icon - Image tag used for the icon
 */
@Component({
  tag: 'ld-notice',
  styleUrl: 'ld-notice.css',
  shadow: true,
})
export class LdNotice {
  /** Headline of the notice. */
  @Prop() headline?: string

  /** Mode of the notice. */
  @Prop() mode: 'error' | 'info' | 'warning' = 'info'

  render() {
    return (
      <Host class={`ld-notice ld-notice--${this.mode}`}>
        <ld-icon class="ld-notice__icon" name="info" part="icon" size="lg" />
        {this.headline && (
          <ld-typo
            class="ld-notice__headline"
            variant="h4"
            tag="p"
            part="headline"
          >
            {this.headline}
          </ld-typo>
        )}
        <slot></slot>
      </Host>
    )
  }
}
