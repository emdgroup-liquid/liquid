import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Prop } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @part link - Breadcrumb link
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-crumb',
  styleUrl: 'ld-crumb.css',
  shadow: true,
})
export class LdCrumb {
  /** @internal */
  @Prop() current?: boolean

  /** The URL that the hyperlink points to. */
  @Prop() href?: string

  render() {
    return (
      <li class="ld-crumb">
        <ld-link
          href={this.href}
          class={getClassNames([
            'ld-crumb__link',
            this.current && 'ld-crumb__link--current',
          ])}
          part="link"
          aria-current={this.current ? 'page' : undefined}
          chevron={this.current ? undefined : 'end'}
        >
          <slot></slot>
        </ld-link>
      </li>
    )
  }
}
