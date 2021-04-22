import { Component, h, Host } from '@stencil/core'
import eventBus from '../../utils/eventBus'
import { NavEventType } from '../../utils/eventTypes'

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
      eventBus.emit(NavEventType.close)
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
