import { Component, h } from '@stencil/core'

/**
 * @part figcaption - the actual figcaption element
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-caption',
  styleUrl: 'ld-table-caption.shadow.css',
  shadow: true,
})
export class LdTableCaption {
  render() {
    return (
      <figcaption class="ld-table-caption" part="figcaption">
        <slot></slot>
      </figcaption>
    )
  }
}
