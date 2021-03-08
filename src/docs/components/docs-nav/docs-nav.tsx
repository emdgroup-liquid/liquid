import { Component, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-nav',
  styleUrl: 'docs-nav.css',
  shadow: false,
})
export class DocsNav {
  render(): HTMLDivElement {
    return (
      <div class="docs-nav">
        <slot></slot>
      </div>
    )
  }
}
