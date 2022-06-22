import { Component, Element, h, Listen, Prop, State } from '@stencil/core'
import { copyToClipboard } from '../../utils/copyToClipboard'

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

  @Listen('click', { capture: true })
  async handleClick(ev) {
    ev.preventDefault()
    await copyToClipboard(this.textToCopy)
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
          <ld-icon size="sm" name="checkmark" key="check" />
        ) : (
          <ld-icon size="sm" key="success">
            <svg fill="none" viewBox="0 0 17 17">
              <rect
                stroke="currentcolor"
                width="11"
                height="11"
                x="5"
                y="5"
                stroke-width="2"
                rx="1"
              />
              <path
                stroke="currentcolor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 1H4C2 1 1 2 1 4v8"
              />
            </svg>
          </ld-icon>
        )}
      </ld-button>
    )
  }
}
