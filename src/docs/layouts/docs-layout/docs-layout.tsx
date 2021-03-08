import { Component, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-layout',
  styleUrl: 'docs-layout.css',
  shadow: false,
})
export class DocsNav {
  render(): HTMLDivElement {
    return (
      <div class="docs-layout">
        <slot></slot>
      </div>
    )
  }
}
