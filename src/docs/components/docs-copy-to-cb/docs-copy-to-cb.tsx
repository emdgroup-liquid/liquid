import '../../../components' // type definitions for intelliSense
import { Component, Element, h, Listen, Prop, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-copy-to-cb',
  styleUrl: 'docs-copy-to-cb.css',
  shadow: false,
})
export class DocsCopyToCb {
  @Element() el: HTMLElement

  /** Text to be copied to clipboard */
  @Prop() textToCopy!: string

  @State() copyTimeout: number | undefined

  private clearCopyTimeout() {
    window.clearTimeout(this.copyTimeout)
    this.copyTimeout = undefined
  }

  private async copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
    } else {
      // text area method
      const textArea = document.createElement('textarea')
      textArea.value = textToCopy
      textArea.classList.add('ld-sr-only')
      document.body.appendChild(textArea)
      textArea.focus({ preventScroll: true })
      textArea.select()
      await document.execCommand('copy')
      textArea.remove()
      this.el.querySelector('button').focus({ preventScroll: true })
    }
  }

  @Listen('click', { capture: true })
  handleClick(ev) {
    ev.preventDefault()
    this.copyToClipboard(this.textToCopy)
    const timeoutID = window.setTimeout(this.clearCopyTimeout.bind(this), 500)
    this.copyTimeout = timeoutID
  }

  render() {
    return (
      <ld-button class="docs-copy-to-cb" mode="ghost" size="sm">
        <ld-sr-only>
          {this.copyTimeout ? 'Copied to clipboard' : 'Copy to clipboard'}
        </ld-sr-only>
        {this.copyTimeout ? (
          <ld-icon name="checkmark" />
        ) : (
          <ld-icon name="copy" />
        )}
      </ld-button>
    )
  }
}
