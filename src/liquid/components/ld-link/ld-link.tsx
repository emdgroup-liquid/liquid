import '../../components' // type definitions for type checks and intelliSense
import { Component, Host, h, Prop } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part arrow - adds chevron arrow before link text
 * @part size - sets the size of the text
 * @part href - sets the link address
 * @part disabled - sets the disabled state
 * @part target - sets target of the link
 * @part showIcon - displays chevron icon as prefix
 */

@Component({
  tag: 'ld-link',
  styleUrl: 'ld-link.css',
  shadow: true,
})
export class LdLink {
  /** Sets the size of the text */
  @Prop() size?: 'sm' | 'lg'

  /** Sets the link address */
  @Prop() href?: string

  /** Sets the disabled state */
  @Prop() disabled?: boolean

  /** Sets target of the link - _blank|_self|_parent|_top|framename */
  @Prop() target?: string

  /** Displays chevron icon as prefix */
  @Prop() showIcon?: boolean

  render() {
    return (
      <Host>
        <a
          href={this.href}
          target={this.target ?? '_self'}
          class={getClassNames([
            'ld-link',
            this.size && `ld-link--${this.size}`,
            this.disabled && `ld-link--disabled`,
          ])}
        >
          {this.showIcon && (
            <ld-icon
              class="ld-link__icon"
              name="arrow-right"
              part="icon"
              size={this.size}
            />
          )}
          <slot></slot>
        </a>
      </Host>
    )
  }
}
