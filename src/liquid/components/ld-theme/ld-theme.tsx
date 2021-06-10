import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

@Component({
  tag: 'ld-theme',
  styleUrl: 'ld-theme.css',
  shadow: false,
})
export class LdTheme {
  /** The theme name. */
  @Prop() name: 'ocean' | 'solvent' | 'bubblegum' | 'shake' | 'tea' = 'ocean'

  render() {
    return (
      <Host class={`ld-theme-${this.name}`}>
        <slot></slot>
      </Host>
    )
  }
}
