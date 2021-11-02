import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part tag - Actual tag
 */
@Component({
  tag: 'ld-typo',
  styleUrl: 'ld-typo.css',
  shadow: true,
})
export class LdTypo {
  @Element() el: HTMLElement

  private root: HTMLElement

  /** The rendered HTML tag. Overrides tag inferred from the variant. */
  @Prop() tag: string

  /** The font style. Every variant has a default tag that it renders with. */
  @Prop({ mutable: true }) variant!:
    | 'body-xs'
    | 'body-s'
    | 'body-m'
    | 'body-l'
    | 'body-xl'
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
   * Since b* and xb* variants are uppercase, screen readers need to be served a
   * (non-uppercase) aria-label (otherwise they will read out the heading letter by letter).
   * If you're using a b* or xb* variant, an aria-label will be
   * set automatically on the element. The component will use the inner HTML for the
   * label implicitly. If you want to set an aria-label explicitly (such as when you have
   * inner HTML that should not be part of the label), you can use this property.
   */
  @Prop() ariaLabel: string

  private applyAriaLabel() {
    const isBrandHeading =
      this.variant.includes('b') && !this.variant.includes('body')
    if (isBrandHeading) {
      this.root.setAttribute(
        'aria-label',
        this.ariaLabel || this.el.innerHTML.trim()
      )
    }
  }

  private getDefaultTag = () =>
    ({
      'body-xs': 'p',
      'body-s': 'p',
      'body-m': 'p',
      'body-l': 'p',
      'body-xl': 'p',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      b1: 'h1',
      b2: 'h2',
      b3: 'h3',
      b4: 'h4',
      b5: 'h5',
      b6: 'h6',
      xb1: 'h1',
      xb2: 'h2',
      xb3: 'h3',
      xh1: 'h1',
      xh2: 'h2',
      xh3: 'h3',
      xh4: 'h4',
      xh5: 'h5',
      xh6: 'h6',
    }[this.variant] ?? 'p')

  componentDidRender() {
    this.applyAriaLabel()
  }

  render() {
    const HTag = this.tag || this.getDefaultTag()

    return (
      <HTag
        class={`ld-typo ld-typo--${this.variant}`}
        part="tag"
        ref={(ref: HTMLElement) => (this.root = ref)}
        {...cloneAttributes(this.el)}
      >
        <slot></slot>
      </HTag>
    )
  }
}
