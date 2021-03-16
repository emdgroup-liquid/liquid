import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-btn-open-nav',
  styleUrl: 'docs-btn-open-nav.css',
  shadow: false,
})
export class DocsBtnOpenNav {
  render() {
    return (
      <Host class="docs-btn-open-nav">
        <a href="#sidenav-open" title="Open Menu" aria-label="Open Menu">
          Open nav
        </a>
      </Host>
    )
  }
}
