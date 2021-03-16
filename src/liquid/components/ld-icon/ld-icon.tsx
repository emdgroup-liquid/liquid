import { Build, Component, Host, h, Prop, State, Watch } from '@stencil/core'
import { fetchIcon } from './fetchIcon'

/** @slot - (optional) Custom SVG icon (only valid without name prop). */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-icon',
  styleUrl: 'ld-icon.css',
  shadow: true,
})
export class LdIcon {
  /** The icon name. */
  @Prop() name: string = null

  /** (optional) Set to true for a filled icon. */
  @Prop() filled: boolean = null

  /** (optional) Sets both width and height. */
  @Prop() size = 'var(--ld-sp-24)'

  @State() private svg: string

  @Watch('name')
  @Watch('filled')
  private async loadIconPathData(): Promise<void> {
    const { name, filled } = this

    console.log('Build', Build)
    if ((!Build.isBrowser && !Build.isTesting) || !name) {
      return
    }

    this.svg = await fetchIcon(name, filled)
  }

  async componentWillLoad(): Promise<void> {
    this.loadIconPathData()
  }

  render() {
    return (
      <Host role="presentation">
        <div
          style={{ width: this.size, height: this.size }}
          innerHTML={this.svg}
        >
          {!this.name && <slot></slot>}
        </div>
      </Host>
    )
  }
}
