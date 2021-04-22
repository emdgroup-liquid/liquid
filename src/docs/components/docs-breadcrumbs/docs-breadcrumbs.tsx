import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-breadcrumbs',
  styleUrl: 'docs-breadcrumbs.css',
  shadow: false,
  assetsDirs: ['assets'],
})
export class DocsBreadcrumbs {
  render() {
    return (
      <Host class="docs-breadcrumbs">
        <nav aria-label="Breadcrumbs">
          <ol class="docs-breadcrumbs__list">
            <slot></slot>
          </ol>
        </nav>
      </Host>
    )
  }
}
