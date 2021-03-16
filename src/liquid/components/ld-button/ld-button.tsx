import { Component, h } from '@stencil/core'

@Component({
  tag: 'ld-button',
  styleUrl: 'ld-button.css',
  shadow: true,
})
export class LdButton {
  render() {
    return (
      <button class="ld-button">
        <slot />
      </button>
    )
  }
}
