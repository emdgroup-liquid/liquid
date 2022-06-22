import { Component, h, Prop, Host, Element } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part headline - `ld-typo` element used for the headline
 * @part icon - Image tag used for the icon
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-notice',
  styleUrl: 'ld-notice.css',
  shadow: true,
})
export class LdNotice {
  @Element() hostElement: HTMLStencilElement

  /** Headline of the notice. */
  @Prop() headline?: string

  /** Mode of the notice. */
  @Prop() mode: 'error' | 'info' | 'warning' | 'success' = 'info'

  render() {
    return (
      <Host class={`ld-notice ld-notice--${this.mode}`}>
        <slot name="custom-icon">
          <ld-icon
            class="ld-notice__icon"
            name={
              this.mode === 'success'
                ? 'ld-input-message-success'
                : 'ld-input-message-info'
            }
            part="icon"
            size="lg"
          />
        </slot>
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
