import { Build, Component, Host, h, Prop, Watch, Element } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { fetchIcon } from './fetchIcon'

/**
 * @slot - (optional) Custom SVG icon (only valid without name prop).
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part icon - Actual SVG element
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-icon',
  styleUrl: 'ld-icon.css',
  shadow: true,
})
export class LdIcon {
  @Element() element: HTMLElement

  /** The icon name. */
  @Prop() name: string = null

  /** Size of the icon. */
  @Prop() size?: 'sm' | 'lg'

  @Watch('name')
  private async loadIconPathData(): Promise<void> {
    if ((!Build.isBrowser && !Build.isTesting) || !this.name) {
      return
    }

    const div = document.createElement('div')
    const iconString = await fetchIcon(this.name)

    div.innerHTML = iconString.replace(
      '<svg',
      '<svg class="ld-icon__svg" part="icon"'
    )
    Array.from(this.element.shadowRoot.children).forEach((child) => {
      if (child.tagName !== 'STYLE') {
        this.element.shadowRoot.removeChild(child)
      }
    })
    this.element.shadowRoot.appendChild(div.firstChild)
  }

  async componentWillLoad(): Promise<void> {
    this.loadIconPathData()
  }

  render() {
    return (
      <Host
        class={getClassNames(['ld-icon', this.size && `ld-icon--${this.size}`])}
        role="presentation"
      >
        {!this.name && <slot></slot>}
      </Host>
    )
  }
}
