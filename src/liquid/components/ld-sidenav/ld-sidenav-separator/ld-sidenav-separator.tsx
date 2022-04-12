import '../../../components' // type definitions for type checks and intelliSense
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
  handleSidenavCollapsedChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail
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

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    if (this.sidenav) {
      this.scaleXCollapsed = this.computeScaleXCollapsed() || 1
    }
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
        <hr class="ld-sidenav-separator-line" part="hr" />
      </Host>
    )
  }
}
