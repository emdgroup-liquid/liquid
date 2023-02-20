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
          >
            <slot></slot>
          </ld-button>
        </li>
      </Host>
    )
  }
}
