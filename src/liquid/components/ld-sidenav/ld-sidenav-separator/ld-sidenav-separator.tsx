import '../../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Listen, State } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'
import { toggleStackToTop } from '../utils/toggleStackToTop'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-separator',
  styleUrl: 'ld-sidenav-separator.css',
  shadow: true,
})
export class LdSidenavSeparator {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement

  @State() sidenavCollapsed: boolean
  @State() sidenavClosable: boolean
  @State() scaleXCollapsed: number

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev: CustomEvent<boolean>) {
    if (ev.target !== this.sidenav) return
    if (
      this.el.parentElement &&
      !['LD-SIDENAV-SLIDER', 'LD-SIDENAV-SUBNAV'].includes(
        this.el.parentElement.tagName
      )
    ) {
      return
    }
    this.sidenavCollapsed = ev.detail
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
    const sidenavPaddingY = parseFloat(
      window
        .getComputedStyle(this.sidenav)
        .getPropertyValue('--ld-sidenav-padding-y')
    )
    const sidenavWidthCollapsed = parseFloat(
      window
        .getComputedStyle(this.sidenav)
        .getPropertyValue('--ld-sidenav-width-collapsed')
    )
    return (
      (sidenavWidthCollapsed - 2 * sidenavPaddingY) /
      (sidenavWidth - 2 * sidenavPaddingY)
    )
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    this.scaleXCollapsed = this.computeScaleXCollapsed() || 1
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-separator',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-separator--collapsed',
    ])

    return (
      <hr
        style={{
          '--ld-sidenav-separator-scale-x-collapsed':
            this.scaleXCollapsed.toString(),
        }}
        class={cl}
        part="hr"
      ></hr>
    )
  }
}
