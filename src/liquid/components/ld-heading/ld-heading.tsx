import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import HeadingHTMLAttributes = JSXBase.HTMLAttributes
import { applyPropAliases } from '../../utils/applyPropAliases'

@Component({
  tag: 'ld-heading',
  styleUrl: 'ld-heading.css',
  shadow: false,
})
export class LdHeading {
  @Element() el: HTMLHeadingElement

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
   * Since b1 to b6 headings are uppercase headings, screen readers need to be served a
   * (non-uppercase) aria-label (otherwise they will read out the heading letter by letter).
   * If you're using a b1 to b6 or xb1 to xb3 visual level heading, an aria-label will be
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
      const heading = this.el.querySelector('.ld-heading')
      heading.setAttribute(
        'aria-label',
        this.ariaLabel || heading.innerHTML.trim()
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
        {...cloneAttributes<HeadingHTMLAttributes<HTMLHeadingElement>>(this.el)}
      >
        <slot></slot>
      </HTag>
    )
  }
}
