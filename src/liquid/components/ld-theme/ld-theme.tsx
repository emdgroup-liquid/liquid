import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

export type ThemeName = 'bubblegum' | 'ocean' | 'shake' | 'solvent' | 'tea'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
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
