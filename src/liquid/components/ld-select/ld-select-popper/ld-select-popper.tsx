import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Method, Prop } from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/** @internal **/
@Component({
  tag: 'ld-select-popper',
  styleUrl: 'ld-select-popper.css',
  shadow: true,
})
export class LdSelectPopper {
  private shadowRef!: HTMLElement

  /**
   * Indicates if select element is expanded.
   */
  @Prop() expanded = false

  /** Size of the select trigger button (required for applying the correct shadow height). */
  @Prop() size?: 'sm' | 'lg'

  /** Popper is visually detached from the select trigger element (there's a gap between the two). */
  @Prop() detached: boolean

  /** Since the select popper is located outside the select element, the theme needs to be applied as a prop. */
  @Prop() theme: string

  /** Attaches CSS class to the select popper element. */
  @Prop() popperClass?: string

  /**
   * Focuses the tab
   */
  @Method()
  async updateShadowHeight(height: string) {
    this.shadowRef.style.setProperty('height', height)
  }

  render() {
    return (
      <Host class={this.popperClass && { [this.popperClass]: true }}>
        <div
          class={getClassNames([
            'ld-select-popper',
            this.expanded && 'ld-select-popper--expanded',
            this.detached && 'ld-select-popper--detached',
            this.size && `ld-select-popper--${this.size}`,
            this.theme && `ld-theme-${this.theme}`,
          ])}
          part="popper"
        >
          <div
            class="ld-select-popper__scroll-container"
            part="popper-scroll-container"
          >
            <slot></slot>
            <div
              class="ld-select-popper__shadow"
              ref={(el) => (this.shadowRef = el as HTMLElement)}
              part="shadow"
            ></div>
          </div>
        </div>
      </Host>
    )
  }
}
