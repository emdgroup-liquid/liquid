import '../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch,
} from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tab',
  styleUrl: 'ld-tab.css',
  shadow: false,
})
export class LdTab {
  @Element() el: HTMLElement

  /**
   * If present, this boolean attribute indicates that the tab is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected?: boolean

  /**
   * Disables the tab.
   */
  @Prop() disabled?: boolean

  /**
   * Emitted with the id of the selected tab.
   */
  @Event() tabChange: EventEmitter<string>

  private handleTabClick(ev) {
    ev.preventDefault()

    if (this.disabled) return

    if (ev.currentTarget.getAttribute('aria-selected')) return

    this.selected = true
  }

  @Watch('selected')
  emitEvent(newSelected: boolean, oldSelected: boolean) {
    if (!newSelected || newSelected === oldSelected) return

    const index = Array.prototype.indexOf.call(
      this.el.closest('.ld-tablist__scroll-container').children,
      this.el
    )

    this.tabChange.emit(index)
  }

  render() {
    return (
      <button
        class="ld-tab"
        role="tab"
        aria-selected={this.selected ? 'true' : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
        onClick={this.handleTabClick.bind(this)}
        tabindex={this.selected ? undefined : '-1'}
      >
        <span class="ld-tab__spacer"></span>
        <span class="ld-tab__content">
          <slot></slot>
        </span>
        <span class="ld-tab__spacer"></span>
      </button>
    )
  }
}
