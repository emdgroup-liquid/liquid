import { Component, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { getLdAssetPath } from '../../utils/getLdAssetPath'

export type CellType =
  | 'bioreliance'
  | 'f'
  | 'hexagon'
  | 'millipore'
  | 'qa-x2f-qc'
  | 'safc'
  | 'sigma-aldrich'
  | 'supelco'
  | 't'
  | 'tile'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part pattern - Element containing the cells pattern
 * @part content - Element wrapping the slot
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

  render() {
    // Handle aliases (for backward compatibility).
    let cellType = this.type
    if (cellType === 'qa-x2f-qc') cellType = 'supelco'

    const assetPath = getLdAssetPath(`./assets/${cellType}-cell.svg`)

    return (
      <Host class={getClassNames(['ld-bg-cells', `ld-bg-cells--${cellType}`])}>
        <div
          class="ld-bg-cells__pattern"
          part="pattern"
          style={{
            '--ld-bg-cells-image': `url(${assetPath})`,
          }}
        />
        <div class="ld-bg-cells__content" part="content">
          <slot />
        </div>
      </Host>
    )
  }
}
