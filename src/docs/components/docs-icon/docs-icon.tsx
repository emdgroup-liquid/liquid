import { Component, Prop, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-icon',
  styleUrl: 'docs-icon.css',
  shadow: false,
})
export class DocsIcon {
  /** Icon file name */
  @Prop() identifier: string

  /** Human readable icon name */
  @Prop() name: string

  private async copyIdentifier() {
    await navigator.clipboard.writeText(this.identifier)

    dispatchEvent(
      new CustomEvent('ldNotificationAdd', {
        detail: {
          content: `Copied "${this.identifier}" to clipboard.`,
          type: 'info',
        },
      })
    )
  }

  render() {
    return (
      <ld-tooltip arrow class="docs-icon__tooltip">
        <button
          class="docs-icon"
          onClick={this.copyIdentifier.bind(this)}
          slot="trigger"
          type="button"
        >
          <ld-icon name={this.identifier} size="lg" />
          <ld-paragraph class="docs-icon__name">{this.name}</ld-paragraph>
        </button>
        <ld-paragraph>Click to copy identifier to clipboard.</ld-paragraph>
      </ld-tooltip>
    )
  }
}
