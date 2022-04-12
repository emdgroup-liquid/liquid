import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-heading',
  styleUrl: 'ld-sidenav-heading.shadow.css',
  shadow: true,
})
export class LdSidenavHeading {
  render() {
    return (
      <Host class="ld-sidenav-heading">
        <ld-typo variant="cap-m" part="typo">
          <slot></slot>
        </ld-typo>
      </Host>
    )
  }
}
