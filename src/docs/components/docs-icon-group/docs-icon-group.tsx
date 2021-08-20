import { Component, Prop, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-icon-group',
  styleUrl: 'docs-icon-group.css',
  shadow: false,
})
export class DocsIconGroup {
  /** Group name */
  @Prop() name: string

  render() {
    return (
      <Host class="docs-icon-group">
        <ld-heading level="4">{this.name}</ld-heading>
        <div class="docs-icon-group__icons">
          <slot />
        </div>
      </Host>
    )
  }
}
