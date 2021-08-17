import { Component, Element, getAssetPath, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import '../../components' // type definitions for type checks and intelliSense

type CellType =
  | 'bioreliance'
  | 'f'
  | 'hexagon'
  | 'millipore'
  | 'qa-x2f-qc'
  | 'safc'
  | 'sigma-aldrich'
  | 't'
  | 'tile'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-bg-cells',
  styleUrl: 'ld-bg-cells.css',
  shadow: false,
})
export class LdBgCells {
  /** Cells pattern */
  @Prop() type: CellType = 'safc'

  render() {
    const assetPath = getAssetPath(`./assets/${this.type}-cell.svg`)

    return (
      <Host
        class={getClassNames(['ld-bg-cells', `ld-bg-cells--${this.type}`])}
        style={{
          '--ld-bg-cells-image': `url(${assetPath})`,
        }}
      >
        <div class="ld-bg-cells__pattern" />
        <div class="ld-bg-cells__content">
          <slot />
        </div>
      </Host>
    )
  }
}
