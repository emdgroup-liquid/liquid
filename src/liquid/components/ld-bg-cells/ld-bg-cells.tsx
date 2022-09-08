import { Component, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { getLdAssetPath } from '../../utils/getLdAssetPath'

export type CellType =
  | 'bioreliance'
  | 'f' // Functional
  | 'functional'
  | 'hexagon' // Synthetic
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
 * @part layer - Element containing the cells pattern
 * @part secondary-layer - Element containing the second cells pattern
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-bg-cells',
  styleUrl: 'ld-bg-cells.css',
  shadow: true,
})
export class LdBgCells {
  /** Cells pattern */
  @Prop() type: CellType = 'hexagon'

  /** Use 3 color layers */
  @Prop() threeLayers = false

  render() {
    // Handle aliases (for backward compatibility).
    let cellType = this.type

    if (cellType === 'qa-x2f-qc') cellType = 'supelco'
    if (cellType === 'functional') cellType = 'f'
    if (cellType === 'technical') cellType = 't'
    if (cellType === 'plastic') cellType = 'tile'
    if (cellType === 'synthetic') cellType = 'hexagon'
    if (cellType === 'organic') cellType = 'o'

    const assetPath = getLdAssetPath(`./assets/${cellType}-cell.svg`)

    return (
      <Host
        class={getClassNames([
          'ld-bg-cells',
          `ld-bg-cells--${cellType}`,
          this.threeLayers && 'ld-bg-cells--three-layers',
        ])}
      >
        <div
          class="ld-bg-cells__secondary-layer"
          part="secondary-layer"
          style={{
            '--ld-bg-cells-image': `url(${assetPath})`,
          }}
        ></div>
        <div
          class="ld-bg-cells__layer"
          part="layer"
          style={{
            '--ld-bg-cells-image': `url(${assetPath})`,
          }}
        ></div>
      </Host>
    )
  }
}
