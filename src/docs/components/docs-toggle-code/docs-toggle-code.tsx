import '../../../components' // type definitions for type checks and intelliSense
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
        aria-checked={this.isOn}
        class="docs-toggle-code"
        mode={this.isOn ? undefined : 'ghost'}
        size="sm"
      >
        <ld-sr-only>Toggle code</ld-sr-only>
        <ld-icon name="markup" />
      </ld-button>
    )
  }
}
