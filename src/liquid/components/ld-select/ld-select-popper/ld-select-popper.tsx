import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/** @internal **/
@Component({
  tag: 'ld-select-popper',
  styleUrl: 'ld-select-popper.css',
  shadow: true,
})
export class LdSelectPopper {
  @Element() el: HTMLElement

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

  /** A watcher is applied to the CSS class in order to be able to react to tether changes. */
  @Prop({ mutable: true, reflect: true }) class: string

  @State() isPinned = false
  @State() shadowHeight = '100%'

  @Watch('class')
  updatePinnedState() {
    this.isPinned = this.el.classList.contains('ld-tether-pinned')
  }

  /**
   * Focuses the tab
   */
  @Method()
  async updateShadowHeight(height: string) {
    this.shadowHeight = height
  }

  render() {
    return (
      <Host
        class={this.popperClass && { [this.popperClass]: true }}
        style={{ zIndex: this.isPinned ? '2147483647' : '2147483646' }}
      >
        <div
          class={getClassNames([
            'ld-select-popper',
            this.expanded && 'ld-select-popper--expanded',
            this.detached && 'ld-select-popper--detached',
            this.size && `ld-select-popper--${this.size}`,
            this.isPinned && 'ld-select-popper--pinned',
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
              style={{ height: this.isPinned ? '100%' : this.shadowHeight }}
              part="shadow"
            ></div>
          </div>
        </div>
      </Host>
    )
  }
}
