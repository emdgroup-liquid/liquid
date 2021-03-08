import { Component, h } from '@stencil/core'

@Component({
  tag: 'lds-button',
  styleUrl: 'lds-button.css',
  shadow: true,
})
export class LdsButton {
  render(): HTMLButtonElement {
    return (
      <button class="lds-button">
        <slot />
      </button>
    )
  }
}
