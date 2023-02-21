import { Build, Component, Element, h, Host, Prop, Watch } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { fetchPattern } from '../../utils/fetchAsset'

export type CellType =
  | 'bioreliance'
  | 'f' // Functional
  | 'functional'
  | 'hexagon' // Synthetic
  | 'mdo'
  | 'millipore'
  | 'milliq'
  | 'o' // Organic
  | 'organic'
  | 'plastic'
  | 'qa-x2f-qc' // Supelco
  | 'safc'
  | 'sigma-aldrich'
  | 'supelco'
  | 'synthetic'
  | 't' // Technical
  | 'technical'
  | 'tile' // Plastic

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part layer - the primary cell layer
 * @part secondary-layer - the secondary cell layer
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-bg-cells',
  styleUrl: 'ld-bg-cells.css',
  shadow: true,
})
export class LdBgCells {
  @Element() el: HTMLElement

  /** Cells pattern */
  @Prop() type: CellType = 'hexagon'

  /** Use 3 color layers */
  @Prop() threeLayers? = false

  /** Animate the pattern */
  @Prop() animated? = false

  @Watch('type')
  private async loadPatternPathData(): Promise<void> {
    if ((!Build.isBrowser && !Build.isTesting) || !this.type) {
      return
    }

    const patternString = await fetchPattern(this.type)
    this.el.shadowRoot.querySelectorAll('svg').forEach((layer) => {
      const div = document.createElement('div')
      div.innerHTML = patternString
      Array.from(div.children[0]?.children || []).forEach((child) => {
        if (child.tagName !== 'script') {
          layer.appendChild(child)
        }
      })
    })
  }

  componentWillLoad() {
    this.loadPatternPathData()
  }

  render() {
    // Handle aliases (for backward compatibility).
    let cellType = this.type

    if (cellType === 'qa-x2f-qc') cellType = 'supelco'
    if (cellType === 'functional') cellType = 'f'
    if (cellType === 'technical') cellType = 't'
    if (cellType === 'plastic') cellType = 'tile'
    if (cellType === 'synthetic') cellType = 'hexagon'
    if (cellType === 'organic') cellType = 'o'

    return (
      <Host
        class={getClassNames([
          'ld-bg-cells',
          `ld-bg-cells--${cellType}`,
          this.threeLayers && 'ld-bg-cells--three-layers',
        ])}
      >
        <svg
          class={getClassNames([
            'ld-bg-cells__secondary-layer',
            this.animated && 'ld-bg-cells__secondary-layer--animated',
          ])}
          viewBox="0 0 8000 8000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          part="secondary-layer"
        ></svg>
        <svg
          class={getClassNames([
            'ld-bg-cells__layer',
            this.animated && 'ld-bg-cells__layer--animated',
          ])}
          viewBox="0 0 8000 8000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          part="layer"
        ></svg>
      </Host>
    )
  }
}
