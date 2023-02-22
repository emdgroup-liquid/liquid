import { Component, Host, h, Prop } from '@stencil/core'

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
export class LdMenuitem {
  /**
   * Transforms the menu item to an anchor element.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
   * for more information on the `href` attribute.
   */
  @Prop() href?: HTMLLdButtonElement['href']

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

  render() {
    return (
      <Host>
        <li class="ld-menuitem" role="menuitemradio">
          <ld-button
            class="ld-menuitem__button"
            href={this.href}
            iconOnly={false}
            justifyContent="start"
            mode={modeMap[this.mode]}
            size={this.size}
            target={this.target}
          >
            <slot></slot>
          </ld-button>
        </li>
      </Host>
    )
  }
}
