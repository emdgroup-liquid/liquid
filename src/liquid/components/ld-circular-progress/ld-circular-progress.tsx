import { Component, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-circular-progress',
  styleUrl: 'ld-circular-progress.css',
  shadow: true,
})
export class LdCircularProgress {
  /**
   * Defines the string value or identifies the element (or elements)
   * that label the progressbar element providing an accessible name.
   */
  @Prop({ reflect: true }) ariaLabeledby?: string

  /**
   * Set to a decimal value representing the maximum value, and greater
   * than aria-valuemin. If not present, the default value is 100.
   */
  @Prop({ reflect: true }) ariaValuemax? = 100

  /**
   * Set to a decimal value representing the minimum value, and less
   * than aria-valuemax. If not present, the default value is 0.
   */
  @Prop({ reflect: true }) ariaValuemin? = 0

  /**
   * Only present and required if the value is not indeterminate.
   * Set to a decimal value between 0, or valuemin if present,
   * and aria-valuemax indicating the current value of the progress bar.
   */
  @Prop({ reflect: true }) ariaValuenow?: number

  /**
   * Assistive technologies often present the value of aria-valuenow
   * as a percentage. If this would not be accurate use this property
   * to make the progress bar value understandable.
   */
  @Prop({ reflect: true }) ariaValuetext?: string

  // `onBrandColor` is not possible: Stencil expects `on*` props to be event handlers.
  /**
   * Styles the progress bar in a way that it looks good on the
   * primary color of the current theme.
   */
  @Prop() brandColor?: boolean

  render() {
    const cl = getClassNames([
      'ld-circular-progress',
      this.brandColor && 'ld-circular-progress--brand-color',
    ])

    return (
      <Host
        class={cl}
        role="progressbar"
        style={{
          ...(this.ariaValuemax !== undefined && {
            '--ld-circular-progress-valuemax': this.ariaValuemax + '',
          }),
          ...(this.ariaValuemin !== undefined && {
            '--ld-circular-progress-valuemin': this.ariaValuemin + '',
          }),
          ...(this.ariaValuenow !== undefined && {
            '--ld-circular-progress-valuenow': this.ariaValuenow + '',
          }),
        }}
      >
        <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
          <circle cx="5" cy="5" r="5" />
          <circle cx="5" cy="5" r="5" />
        </svg>
        <slot></slot>
      </Host>
    )
  }
}
