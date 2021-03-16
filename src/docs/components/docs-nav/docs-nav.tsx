import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-nav',
  styleUrl: 'docs-nav.css',
  shadow: false,
})
export class DocsNav {
  render() {
    return (
      <Host class="docs-nav" id="sidenav-open">
        <div class="docs-nav__content">
          <div class="docs-nav__section">
            <docs-switch-theme></docs-switch-theme>
            <docs-btn-search></docs-btn-search>
          </div>
          <div class="docs-nav__section">
            <nav class="docs-nav__nav" role="navigation">
              <slot></slot>
            </nav>
          </div>
        </div>
      </Host>
    )
  }
}
