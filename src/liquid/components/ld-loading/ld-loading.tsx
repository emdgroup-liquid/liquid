import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-loading',
  styleUrl: 'ld-loading.css',
  shadow: false,
})
export class LdLoading {
  render() {
    return <Host class="ld-loading"></Host>
  }
}
