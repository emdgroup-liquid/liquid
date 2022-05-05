import { Component, Event, EventEmitter, h, Listen, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-toggle-code',
  styleUrl: 'docs-toggle-code.css',
  shadow: false,
})
export class DocsToggleCode {
  /** Is code toggled to be visible */
  @Prop() isOn: boolean

  /** Theme select change event. */
  @Event() toggleCode: EventEmitter<boolean>

  @Listen('click', { capture: true })
  handleClick(ev) {
    ev.preventDefault()
    this.toggleCode.emit(!this.isOn)
  }

  render() {
    return (
      <ld-button
        role="switch"
        aria-checked={this.isOn ? 'true' : 'false'}
        class="docs-toggle-code"
        mode={this.isOn ? undefined : 'ghost'}
        size="sm"
      >
        <ld-sr-only>Toggle code</ld-sr-only>
        <ld-icon size="sm">
          <svg fill="none" viewBox="0 0 22 22">
            <path
              stroke="currentcolor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m8 18 6-13m3 10 4-4-4-4M5 7l-4 4 4 4"
            />
          </svg>
        </ld-icon>
      </ld-button>
    )
  }
}
