import { Component, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-nav-backdrop',
  styleUrl: 'docs-nav-backdrop.css',
  shadow: false,
})
export class DocsNavBackdrop {
  private onClick() {
    setTimeout(() => {
      history.replaceState({}, '', window.location.pathname)
    })
  }

  render() {
    return (
      <Host class="docs-nav-backdrop">
        <a
          class="docs-nav-backdrop__a"
          href="#backdrop"
          id="sidenav-close"
          title="Close Menu"
          aria-label="Close Menu"
          onClick={this.onClick}
        >
          Close nav
        </a>
      </Host>
    )
  }
}
