import '../../../components' // type definitions for intelliSense
import { Component, h, Listen, Prop, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-copy-to-cb',
  styleUrl: 'docs-copy-to-cb.css',
  shadow: false,
})
export class DocsCopyToCb {
  @State() copyTimeout: number | undefined

  /** Text to be copied to clipboard */
  @Prop() textToCopy!: string

  private clearCopyTimeout() {
    window.clearTimeout(this.copyTimeout)
    this.copyTimeout = undefined
  }

  @Listen('click', { capture: true })
  handleClick(ev) {
    ev.preventDefault()
    navigator.clipboard.writeText(this.textToCopy)
    const timeoutID = window.setTimeout(this.clearCopyTimeout.bind(this), 500)
    this.copyTimeout = timeoutID
  }

  render() {
    return (
      <ld-button class="docs-copy-to-cb" mode="ghost" size="sm">
        <ld-sr-only>
          {this.copyTimeout ? 'Copied to clipboard' : 'Copy to clipboard'}
        </ld-sr-only>
        {this.copyTimeout ? <ld-icon name="check" /> : <ld-icon name="copy" />}
      </ld-button>
    )
  }
}
