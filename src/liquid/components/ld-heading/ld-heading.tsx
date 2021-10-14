import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { applyPropAliases } from '../../utils/applyPropAliases'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part tag - Actual h-tag
 */
@Component({
  tag: 'ld-heading',
  styleUrl: 'ld-heading.css',
  shadow: true,
})
export class LdHeading {
  @Element() el: HTMLHeadingElement

  private headingRef: HTMLHeadingElement

  /** The heading level. */
  @Prop() level!: 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

  /**
   * The heading style. Overrides the style inferred from the heading level.
   */
  @Prop({
    mutable: true,
  })
  visualLevel:
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
   * Since b* and xb* headings are uppercase headings, screen readers need to be served a
   * (non-uppercase) aria-label (otherwise they will read out the heading letter by letter).
   * If you're using a b* or xb* visual level heading, an aria-label will be
   * set automatically on the heading element. The component will use the inner HTML for the
   * label implicitly. If you want to set an aria-label explicitly (such as when you have
   * inner HTML that should not be part of the label), you can use this property.
   */
  @Prop()
  ariaLabel: string

  private validateLevel() {
    if (![1, 2, 3, 4, 5, 6].includes(parseInt(this.level + '', 10))) {
      throw new TypeError(`ld-heading level prop invalid; got ${this.level}`)
    }
  }

  private validateVisualLevel() {
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
      ].includes(this.visualLevel)
    ) {
      throw new TypeError(
        `ld-heading visualLevel prop invalid; got ${this.visualLevel}`
      )
    }
  }

  private applyAriaLabel() {
    const isBHeading =
      this.visualLevel?.indexOf('b') === 0 ||
      this.visualLevel?.indexOf('xb') === 0
    if (isBHeading) {
      this.headingRef.setAttribute(
        'aria-label',
        this.ariaLabel || this.el.innerHTML.trim()
      )
    }
  }

  componentWillLoad() {
    applyPropAliases.apply(this)

    this.validateLevel()
    this.validateVisualLevel()
  }

  componentDidRender() {
    this.applyAriaLabel()
  }

  render() {
    const HTag = `h${this.level}`
    const cl = `ld-heading ld-heading--${this.visualLevel || 'h' + this.level}`

    return (
      <HTag
        class={cl}
        part="tag"
        ref={(ref: HTMLHeadingElement) => (this.headingRef = ref)}
        {...cloneAttributes(this.el)}
      >
        <slot></slot>
      </HTag>
    )
  }
}
