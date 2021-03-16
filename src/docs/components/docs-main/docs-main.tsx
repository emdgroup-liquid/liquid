import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-main',
  styleUrl: 'docs-main.css',
  shadow: false,
})
export class DocsNav {
  render() {
    return (
      <Host class="docs-main">
        <main>
          <slot></slot>
        </main>
      </Host>
    )
  }
}
