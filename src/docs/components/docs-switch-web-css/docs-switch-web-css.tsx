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
  tag: 'docs-switch-web-css',
  styleUrl: 'docs-switch-web-css.css',
  shadow: false,
})
export class DocsSwitchWebCss {
  /** On stands for Web Component; off stands for CSS component */
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
      <Host class="docs-switch-web-css">
        <button role="switch" aria-checked={this.isOn ? 'true' : 'false'}>
          <ld-sr-only>
            <slot></slot>
          </ld-sr-only>
          <span
            class={`docs-switch-web-css__option${
              this.isOn ? ' docs-switch-web-css__option--active' : ''
            }`}
          >
            <svg class="docs-switch-web-css__icon" viewBox="0 0 800 800">
              <title>Web Component</title>
              <path
                fill="currentColor"
                d="M196.3 400l200 346.4H200L0 400 200 53.6h196.3L196.3 400zM505.4 53.6H600L800 400 600 746.4h-94.6l-98-169.8H502L604 400 502 223.4h-94.7l98-169.8z"
              />
            </svg>
          </span>
          <span
            class={`docs-switch-web-css__option${
              !this.isOn ? ' docs-switch-web-css__option--active' : ''
            }`}
          >
            <svg class="docs-switch-web-css__icon" viewBox="0 0 800 300">
              <title>CSS Component</title>
              <path
                fill="currentColor"
                d="M0 0h238.7v99.8H99.8v99.8h139v99.9H0V0zM283.2 0h235.3v85.6H381.6v17h136.9v196.9H283.2v-89.9h136.9v-17H283.2V0zM564.7 0H800v85.6H663.1v17H800v196.9H564.7v-89.9h136.9v-17H564.7V0z"
              />
            </svg>
          </span>
        </button>
      </Host>
    )
  }
}
