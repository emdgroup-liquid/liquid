import { Component, Element, h, Host, Listen, State } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'
import { toggleStackToTop } from '../utils/toggleStackToTop'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-separator',
  styleUrl: 'ld-sidenav-separator.shadow.css',
  shadow: true,
})
export class LdSidenavSeparator {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement

  @State() sidenavCollapsed: boolean
  @State() sidenavClosable: boolean
  @State() scaleXCollapsed = 1

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(
    ev: CustomEvent<{
      collapsed: boolean
      fully: boolean
    }>
  ) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail.collapsed
    if (
      this.el.parentElement &&
      !['LD-SIDENAV-SLIDER', 'LD-SIDENAV-SUBNAV'].includes(
        this.el.parentElement.tagName
      )
    ) {
      return
    }
    if (this.sidenav.narrow) {
      toggleStackToTop(this.el, this.sidenavCollapsed)
    }
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
    this.updateStackToTop()
  }

  private computeScaleXCollapsed = () => {
    const sidenavWidth = parseFloat(
      window
        .getComputedStyle(this.sidenav)
        .getPropertyValue('--ld-sidenav-width')
    )
    const sidenavPaddingX = parseFloat(
      window
        .getComputedStyle(this.sidenav)
        .getPropertyValue('--ld-sidenav-padding-x')
    )
    const sidenavNavitemIconSize = parseFloat(
      window
        .getComputedStyle(this.sidenav)
        .getPropertyValue('--ld-sidenav-navitem-icon-size')
    )
    return sidenavNavitemIconSize / (sidenavWidth - 2 * sidenavPaddingX)
  }

  private updateStackToTop = () => {
    if (this.sidenavClosable) {
      toggleStackToTop(this.el, false)
    } else {
      toggleStackToTop(this.el, this.sidenav.narrow && this.sidenavCollapsed)
    }
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    if (this.sidenav) {
      this.scaleXCollapsed = this.computeScaleXCollapsed() || 1
      this.sidenavCollapsed = this.sidenav.collapsed
    }
  }

  componentDidLoad() {
    // The ldSidenavCollapsedChange event can be fired before this component is loaded.
    // So we need to update the stacking here.
    setTimeout(() => {
      this.updateStackToTop()
    })
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-separator',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-separator--collapsed',
    ])

    return (
      <Host
        style={{
          '--ld-sidenav-separator-scale-x-collapsed':
            this.scaleXCollapsed.toString(),
        }}
        class={cl}
      >
        <hr part="hr" />
      </Host>
    )
  }
}
