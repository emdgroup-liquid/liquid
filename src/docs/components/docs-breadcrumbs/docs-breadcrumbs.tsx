import { Component, h } from '@stencil/core'

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
      <nav class="docs-breadcrumbs" aria-label="Breadcrumbs">
        <ol class="docs-breadcrumbs__list">
          <slot></slot>
        </ol>
      </nav>
    )
  }
}
