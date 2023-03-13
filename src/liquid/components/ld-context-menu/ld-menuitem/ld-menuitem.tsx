import { Component, Element, Host, h, Prop, State, Method } from '@stencil/core'
import { cloneAttributes } from '../../../utils/cloneAttributes'

type Mode = 'highlight' | 'danger' | 'neutral'

const modeMap: Record<Mode, HTMLLdButtonElement['mode']> = {
  danger: 'danger-ghost',
  highlight: 'ghost',
  neutral: 'neutral-ghost',
}

@Component({
  tag: 'ld-menuitem',
  styleUrl: 'ld-menuitem.css',
  shadow: true,
})
export class LdMenuitem implements InnerFocusable {
  @Element() el: HTMLLdMenuitemElement
  private attributesObserver: MutationObserver
  private buttonRef?: HTMLLdButtonElement

  /** Disabled state of the menu item. */
  @Prop() disabled?: boolean

  /**
   * Transforms the menu item to an anchor element.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
   * for more information on the `href` attribute.
   */
  @Prop() href?: HTMLLdButtonElement['href']

  /** Tab index of the menu item. */
  @Prop() ldTabindex: number | undefined

  /** Display mode. */
  @Prop() mode?: Mode = 'neutral'

  /**
   * Size of the menu item.
   * @internal
   */
  @Prop() size?: 'sm' | 'lg'

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: HTMLLdButtonElement['target']

  @State() clonedAttributes: Record<string, string>

  /** Sets focus on the anchor or button */
  @Method()
  async focusInner() {
    this.buttonRef?.focusInner()
  }

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'ld-tabindex',
      'mode',
      'size',
    ])
  }

  disconnectedCallback() {
    this.attributesObserver?.disconnect()
  }

  render() {
    return (
      <Host>
        <li class="ld-menuitem" role="menuitem">
          <ld-button
            {...this.clonedAttributes}
            class="ld-menuitem__button"
            disabled={this.disabled}
            href={this.href}
            iconOnly={false}
            justifyContent="start"
            ldTabindex={this.ldTabindex}
            mode={modeMap[this.mode]}
            ref={(element) => (this.buttonRef = element)}
            size={this.size}
            target={this.target}
            type="button"
          >
            <slot></slot>
          </ld-button>
        </li>
      </Host>
    )
  }
}
