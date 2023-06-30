import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
} from '@stencil/core'
import { LdTab } from './ld-tab/ld-tab'

let tabsCount = 0

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tabs',
  styleUrl: 'ld-tabs.shadow.css',
  shadow: true,
})
export class LdTabs {
  @Element() el: HTMLElement

  /** Emitted with the id of the selected tab. */
  @Event() ldtabchange: EventEmitter<string>

  private idDescriber = `ld-tabs-${tabsCount++}`

  private updateTabs() {
    // TODO: fix Stencils DOM implementation for unit testing and replace
    // this.el.querySelector('[selected]')?.removeAttribute('selected')
    Array.from(this.el.querySelectorAll('ld-tab'))
      .find((tab) => tab.hasAttribute('selected'))
      ?.removeAttribute('selected')
  }

  private updateTabPanels(tabId: string) {
    // TODO: fix Stencils DOM implementation for unit testing and replace
    const tabPanels = Array.from(this.el.querySelectorAll('ld-tabpanel'))
    // this.el.querySelector('ld-tabpanel:not([hidden])')
    tabPanels
      .find((tabpanel) => !tabpanel.hasAttribute('hidden'))
      ?.setAttribute('hidden', undefined)
    // this.el.querySelector(`[aria-labelledby="${tabId}"]`)
    tabPanels
      .find((tabpanel) => tabpanel.getAttribute('aria-labelledby') === tabId)
      ?.removeAttribute('hidden')
  }

  private handleLdtabselect = (ev: CustomEvent<undefined>) => {
    ev.stopImmediatePropagation()
    const currentLdTab = ev.target as HTMLLdTabElement
    this.updateTabs()
    this.updateTabPanels(currentLdTab.id)
    this.ldtabchange.emit(currentLdTab.id)
  }

  /** Set selected tab to a certain index */
  @Method()
  async switchTab(identifier: number | string) {
    const newActiveTab =
      typeof identifier === 'number'
        ? this.el.querySelectorAll('ld-tab')[identifier]
        : this.el.querySelector(`ld-tab#${identifier}`)

    if (!newActiveTab) {
      throw new Error(
        `Could not find ld-tab with ${
          typeof identifier === 'number' ? 'index' : 'id'
        } ${typeof identifier === 'number' ? identifier : `"${identifier}"`}.`
      )
    }

    ;(newActiveTab as unknown as LdTab).select()
  }

  componentDidRender() {
    // Assign ids to tabs and use them in aria-describedby attributes of the corresponding tabpanels.
    // Memorize the index of the selected tab in order to hide all non-selected tabpanels.
    let selectedIndex
    this.el.querySelectorAll('ld-tab').forEach((tab, index) => {
      tab.id = `${this.idDescriber}-tab-${index}`
      if (tab.selected) {
        selectedIndex = index
      }
    })
    this.el.querySelectorAll('ld-tabpanel').forEach((tabpanel, index) => {
      tabpanel.setAttribute(
        'aria-labelledby',
        `${this.idDescriber}-tab-${index}`
      )
      if (selectedIndex === index) {
        tabpanel.removeAttribute('hidden')
      } else {
        tabpanel.setAttribute('hidden', 'true')
      }
    })
  }

  render() {
    return (
      <Host onLdtabselect={this.handleLdtabselect} class="ld-tabs">
        <slot></slot>
      </Host>
    )
  }
}
