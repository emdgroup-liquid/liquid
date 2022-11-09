import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-layout',
  styleUrl: 'docs-layout.css',
  shadow: false,
})
export class DocsLayout {
  render(): HTMLDivElement {
    return (
      <Host class="docs-layout">
        <slot></slot>
      </Host>
    )
  }
}
