import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tablist',
  styleUrl: 'ld-tablist.css',
  shadow: false,
})
export class LdTablist {
  @Element() el: HTMLElement

  private focusTab(prevTab: HTMLElement, dir: 'left' | 'right') {
    const prevLdTab = prevTab.closest('ld-tab')
    const currentTab = prevLdTab[
      dir === 'left' ? 'previousElementSibling' : 'nextElementSibling'
    ]?.querySelector('[role="tab"]') as HTMLButtonElement
    if (currentTab) {
      currentTab.focus({ preventScroll: true })
      currentTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }

  private setFocusOnSelectedTabpanel() {
    ;(this.el
      .closest('ld-tabs')
      .querySelector(
        'ld-tabpanel:not([hidden]) > [role="tabpanel"]'
      ) as HTMLElement)?.focus()
  }

  private onKeydown(ev) {
    switch (ev.key) {
      case 'ArrowLeft':
        ev.preventDefault()
        this.focusTab(ev.target, 'left')
        return
      case 'ArrowRight': {
        ev.preventDefault()
        this.focusTab(ev.target, 'right')
        return
      }
      case 'ArrowDown': {
        ev.preventDefault()
        this.setFocusOnSelectedTabpanel()
        return
      }
    }
  }

  render() {
    return (
      <Host
        onKeydown={this.onKeydown.bind(this)}
        class="ld-tablist"
        role="tablist"
      >
        <div class="ld-tablist__scroll-container">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
