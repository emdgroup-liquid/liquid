import { Build, Component, Host, h, Prop, State, Watch } from '@stencil/core'
import { fetchIcon } from './fetchIcon'

/** @slot - (optional) Custom SVG icon (only valid without name prop). */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-icon',
  styleUrl: 'ld-icon.css',
  shadow: false,
})
export class LdIcon {
  /** The icon name. */
  @Prop() name: string = null

  /** (optional) Set to true for a filled icon. */
  @Prop() filled: boolean = null

  /** Size of the icon. */
  @Prop() size?: 'sm' | 'lg'

  @State() private svg: string

  @Watch('name')
  @Watch('filled')
  private async loadIconPathData(): Promise<void> {
    const { name, filled } = this

    if ((!Build.isBrowser && !Build.isTesting) || !name) {
      return
    }

    this.svg = await fetchIcon(name, filled)
  }

  async componentWillLoad(): Promise<void> {
    this.loadIconPathData()
  }

  render() {
    let cl = 'ld-icon'
    if (this.size) cl += ` ld-icon--${this.size}`

    return (
      <Host>
        <span class={cl} role="presentation" innerHTML={this.svg}>
          {!this.name && <slot></slot>}
        </span>
      </Host>
    )
  }
}
