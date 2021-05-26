import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-web-css-switch',
  styleUrl: 'docs-web-css-switch.css',
  shadow: false,
})
export class DocsWebCssSwitch {
  /** On stands for web component; off stands for CSS component */
  @Prop({ mutable: true }) isOn = true

  /** Theme select change event. */
  @Event() switchComponent: EventEmitter<boolean>

  @Listen('click', { capture: true })
  handleClick(ev) {
    ev.preventDefault()
    this.isOn = !this.isOn
    this.switchComponent.emit(this.isOn)
  }

  render() {
    return (
      <Host class="docs-web-css-switch">
        <button role="switch" aria-checked={this.isOn ? 'true' : 'false'}>
          <ld-sr-only>
            <slot></slot>
          </ld-sr-only>
          <span
            class={`docs-web-css-switch__option${
              this.isOn ? ' docs-web-css-switch__option--active' : ''
            }`}
          >
            Web Component
          </span>
          <span
            class={`docs-web-css-switch__option${
              !this.isOn ? ' docs-web-css-switch__option--active' : ''
            }`}
          >
            CSS Component
          </span>
        </button>
      </Host>
    )
  }
}
