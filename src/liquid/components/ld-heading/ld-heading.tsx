import { Component, h, Prop } from '@stencil/core'

@Component({
  tag: 'ld-heading',
  styleUrl: 'ld-heading.css',
  shadow: false,
})
export class LdHeading {
  /** The heading level. */
  @Prop() level!: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

  /**
   * The heading style. Overrides the style inferred from the heading level.
   */
  @Prop() visualLevel:
    | undefined
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'b1'
    | 'b2'
    | 'b3'
    | 'b4'
    | 'b5'
    | 'b6'
    | 'xb1'
    | 'xb2'
    | 'xb3'
    | 'xh1'
    | 'xh2'
    | 'xh3'
    | 'xh4'
    | 'xh5'
    | 'xh6'

  /**
   * **This prop is required if you're using a b1 to b6 or xb1 to xb3 visual level**:
   * Since b1 to b6 headings are uppercase headings, screen readers need to be served a
   * (non-uppercase) aria-label (otherwise they will read out the heading letter by letter).
   */
  @Prop() ariaLabel: string | undefined

  private validateLevel(newValue: number | string) {
    if (![1, 2, 3, 4, 5, 6].includes(parseInt(newValue + '', 10))) {
      throw new TypeError(`ld-heading level prop invalid; got ${newValue}`)
    }
  }

  private validateVisualLevel(newValue: undefined | string) {
    if (
      ![
        undefined,
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'b1',
        'b2',
        'b3',
        'b4',
        'b5',
        'b6',
        'xb1',
        'xb2',
        'xb3',
        'xh1',
        'xh2',
        'xh3',
        'xh4',
        'xh5',
        'xh6',
      ].includes(newValue)
    ) {
      throw new TypeError(
        `ld-heading visualLevel prop invalid; got ${newValue}`
      )
    }

    const isBHeading = this.visualLevel?.indexOf('b') === 0
    if (isBHeading && !this.ariaLabel) {
      throw new TypeError(
        'ld-heading with visualLevel prop b* requires an ariaLabel prop'
      )
    }
  }

  componentWillLoad() {
    this.validateLevel(this.level)
    this.validateVisualLevel(this.visualLevel)
  }

  render() {
    const HTag = `h${this.level}`
    const cl = `ld-heading ld-heading--${this.visualLevel || 'h' + this.level}`

    return (
      <HTag class={cl} aria-label={this.ariaLabel}>
        <slot></slot>
      </HTag>
    )
  }
}
