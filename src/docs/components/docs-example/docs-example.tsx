import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-example',
  styleUrl: 'docs-example.css',
  shadow: false,
})
export class DocsExample {
  render() {
    return (
      <Host class="docs-example">
        <div class="docs-example__show">
          <slot name="show"></slot>
        </div>
        <div class="docs-example__tools"></div>
        <div class="docs-example__code">
          <slot name="code"></slot>
        </div>
      </Host>
    )
  }
}
