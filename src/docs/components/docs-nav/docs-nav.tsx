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
    const closestLink = ev.target.closest('.docs-nav__li a')
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
            <docs-switch-dark-light />
            <docs-btn-search></docs-btn-search>
          </div>
          <div class="docs-nav__section">
            <nav class="docs-nav__nav" role="navigation">
              <slot></slot>
            </nav>
          </div>
          <div class="docs-nav__section">
            <div class="docs-nav__footer">
              <p>
                <span class="docs-nav__dimmed">
                  © 2021, Merck KGaA, Darmstadt,&nbsp;Germany
                </span>
              </p>
              <br />
              <p>
                <span class="docs-nav__dimmed">Get in touch:</span>
                <div class="docs-nav__footer-links">
                  <a
                    href="https://github.com/emdgroup-liquid/liquid/discussions"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GitHub discussions
                  </a>
                  <br />
                  <a
                    href="https://teams.microsoft.com/l/channel/19%3aeae3b35b0cbf42659e45c2b5592e0c0e%40thread.tacv2/General?groupId=88f23881-53e2-4a99-ad5c-8188c1087bbf&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Teams
                  </a>
                </div>
              </p>
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
