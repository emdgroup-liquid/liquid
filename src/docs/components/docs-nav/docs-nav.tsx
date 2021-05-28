import '../../../components' // type definitions for intelliSense
import { Component, h, Host, State, Listen } from '@stencil/core'
import eventBus from '../../utils/eventBus'
import { NavEventType } from '../../utils/eventTypes'

/** @internal **/
@Component({
  tag: 'docs-nav',
  styleUrl: 'docs-nav.css',
  shadow: false,
  assetsDirs: ['assets'],
})
export class DocsNav {
  @State() isNavOpen = false

  private onNavOpen() {
    this.isNavOpen = true
    document.getElementById('main').setAttribute('inert', 'true')
  }
  private onNavClose() {
    this.isNavOpen = false
    document.getElementById('main').removeAttribute('inert')
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    const isNarrow = window.matchMedia('(max-width: 48rem)').matches
    if (!isNarrow) {
      document.getElementById('main').removeAttribute('inert')
    } else if (this.isNavOpen) {
      document.getElementById('main').setAttribute('inert', 'true')
    }
  }

  /**
   * This click handler is needed on mobile safari.
   * @param ev
   */
  @Listen('click', { capture: false })
  handleClick(ev) {
    const closestLink = ev.target.closest('a')
    if (closestLink) {
      window.location.href = closestLink.href
    }
  }

  componentDidLoad() {
    eventBus.on(NavEventType.open, this.onNavOpen.bind(this))
    eventBus.on(NavEventType.close, this.onNavClose.bind(this))
  }

  render() {
    return (
      <Host class="docs-nav" id="sidenav-open">
        <div class="docs-nav__content">
          <div class="docs-nav__section">
            <ld-heading level={1} visualLevel="h5">
              Liquid Design System
            </ld-heading>
          </div>
          <div class="docs-nav__section">
            <docs-switch-dark-light />
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
