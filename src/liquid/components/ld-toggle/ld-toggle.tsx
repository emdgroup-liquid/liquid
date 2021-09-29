import { Component, Element, h, Host, Method, Prop } from '@stencil/core'
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
export class LdToggle implements InnerFocusable {
  @Element() element: HTMLElement
  private input: HTMLInputElement
  private hasIcons: boolean

  /** Size of the toggle. */
  @Prop() size?: 'sm' | 'lg'

  /** Disabled state of the toggle. */
  @Prop() disabled: boolean

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the toggle as required. */
  @Prop() required: false

  /**
   * Sets focus on the toggle
   */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  componentWillLoad() {
    this.hasIcons =
      !!this.element.querySelector('[slot="icon-start"]') ||
      !!this.element.querySelector('[slot="icon-end"]')
  }

  private handleBlur = (ev: FocusEvent) => {
    setTimeout(() => {
      this.element.dispatchEvent(ev)
    })
  }

  private handleFocus = (event: FocusEvent) => {
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleClick = (event: MouseEvent) => {
    if (this.input.getAttribute('aria-disabled') === 'true') {
      event.preventDefault()
      return
    }

    this.checked =
      event.target === this.element ? !this.input.checked : this.input.checked
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-toggle',
          this.size === 'lg' && 'ld-toggle--lg',
          this.hasIcons && 'ld-toggle--with-icons',
        ])}
        onClick={this.handleClick}
      >
        <input
          aria-disabled={this.ariaDisabled}
          checked={this.checked}
          disabled={this.disabled}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={(ref) => (this.input = ref)}
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
