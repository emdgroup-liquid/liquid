import { Component, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-main',
  styleUrl: 'docs-main.css',
  shadow: false,
})
export class DocsNav {
  render(): HTMLDivElement {
    return (
      <div class="docs-main">
        <slot></slot>
      </div>
    )
  }
}
