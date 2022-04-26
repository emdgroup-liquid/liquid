import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop, Host, State, Element } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal';

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
  @Element() hostElement: HTMLStencilElement;

  /** Headline of the notice. */
  @Prop() headline?: string

  /** Mode of the notice. */
  @Prop() mode: 'error' | 'info' | 'warning' | 'success' = 'info'

  @State() hasCustomIcon: boolean

  componentWillLoad() {
    this.hasCustomIcon = !!this.hostElement.querySelector('[slot="custom-icon"]')
  }

  render() {
    return (
      <Host class={`ld-notice ld-notice--${this.mode}`}>
        {this.hasCustomIcon ? <slot name="custom-icon"></slot> : (
          <ld-icon
            class="ld-notice__icon"
            name={this.mode === 'success' ? 'checkmark-filled' : 'info'}
            part="icon"
            size="lg"
          />
        )}
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
