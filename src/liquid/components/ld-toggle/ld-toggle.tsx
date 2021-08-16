import { Component, Element, h, Host, Prop } from '@stencil/core'
import '../../components' // type definitions for type checks and intelliSense
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-toggle',
  styleUrl: 'ld-toggle.css',
  shadow: false,
})
export class LdToggle {
  @Element() element: HTMLElement
  private hasIcons: boolean

  /** Size of the toggle. */
  @Prop() size?: 'sm' | 'lg'

  /** Disabled state of the toggle. */
  @Prop() disabled = false

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the toggle as required. */
  @Prop() required: false

  componentWillLoad() {
    this.hasIcons =
      !!this.element.querySelector('[slot="icon-start"]') ||
      !!this.element.querySelector('[slot="icon-end"]')
  }

  private handleBlur(event) {
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleFocus(event) {
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleClick(event) {
    if (event.target.getAttribute('aria-disabled') === 'true') {
      event.preventDefault()
      return
    }

    this.checked = event.target.checked
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-toggle',
          this.size === 'lg' && 'ld-toggle--lg',
          this.hasIcons && 'ld-toggle--with-icons',
        ])}
      >
        <input
          aria-disabled={this.ariaDisabled}
          checked={this.checked}
          disabled={this.disabled}
          onBlur={this.handleBlur.bind(this)}
          onClick={this.handleClick.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          required={this.required}
          type="checkbox"
        />
        <span class="ld-toggle__knob" />
        {this.hasIcons && (
          <div class="ld-toggle__icon-start">
            <slot name="icon-start" />
          </div>
        )}
        {this.hasIcons && (
          <div class="ld-toggle__icon-end">
            <slot name="icon-end" />
          </div>
        )}
      </Host>
    )
  }
}
