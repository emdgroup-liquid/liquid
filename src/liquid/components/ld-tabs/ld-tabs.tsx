import '../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

let tabsCount = 0

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tabs',
  styleUrl: 'ld-tabs.css',
  shadow: true,
})
export class LdTabs {
  @Element() el: HTMLElement

  /** Size of the tabs. */
  @Prop() size?: 'sm' | 'lg'

  /** Display mode. */
  @Prop() mode?: 'ghost' | 'brand-color'

  /** Sets border radii. */
  @Prop() rounded?: 'all' | 'all-lg' | 'top' | 'top-lg'

  /**
   * Emitted with the id of the selected tab.
   */
  @Event() tabChange: EventEmitter<string>

  private idDescriber = `ld-tabs-${tabsCount++}`

  private updateTabs(currentLdTab) {
    this.el.querySelector('[selected]')?.removeAttribute('selected')
    currentLdTab.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  private updateTabPanels(tabId: string) {
    this.el
      .querySelector('ld-tabpanel:not([hidden])')
      ?.setAttribute('hidden', undefined)
    this.el
      .querySelector(`[aria-labelledby="${tabId}"]`)
      ?.removeAttribute('hidden')
  }

  private handleTabSelect(ev) {
    const index = Array.prototype.indexOf.call(
      this.el.querySelector('ld-tablist').children,
      ev.target
    )

    ev.stopImmediatePropagation()
    const currentLdTab = ev.target
    this.updateTabs(currentLdTab)
    this.updateTabPanels(currentLdTab.id)
    this.tabChange.emit(index)
  }

  componentDidRender() {
    // Assign ids to tabs and use them in aria-describedby attributes of the corresponding tabpanels.
    // Memorize the index of the selected tab in order to hide all non-selected tabpanels.
    let selectedIndex
    this.el.querySelectorAll('ld-tab').forEach((tab, index) => {
      tab.id = `${this.idDescriber}-tab-${index}`
      if (tab.hasAttribute('selected')) {
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
      <Host
        onTabSelect={this.handleTabSelect.bind(this)}
        class={getClassNames([
          'ld-tabs',
          this.size && `ld-tabs--${this.size}`,
          this.mode && `ld-tabs--${this.mode}`,
          this.rounded && `ld-tabs--rounded-${this.rounded}`,
        ])}
      >
        <slot></slot>
      </Host>
    )
  }
}
