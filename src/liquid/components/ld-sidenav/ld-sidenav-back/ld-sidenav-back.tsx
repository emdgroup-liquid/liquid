import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'
import { closest } from '../../../utils/closest'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-sidenav-back',
  styleUrl: 'ld-sidenav-back.css',
  shadow: true,
})
export class LdSidenavBack {
  @Element() el: HTMLElement
  private sidenav: HTMLLdSidenavElement

  /** Emitted on click. */
  @Event() ldSidenavBack: EventEmitter

  /** Used as aria-label for the back button */
  @Prop() backLabel = 'Back'

  @State() parentLabel = ''
  @State() rounded = false
  @State() sidenavCollapsed: boolean
  @State() sidenavClosable: boolean

  @Listen('ldSidenavCollapsedChange', { target: 'window', passive: true })
  handleSidenavCollapsedChange(ev) {
    if (ev.target !== this.sidenav) return
    this.sidenavCollapsed = ev.detail
  }

  @Listen('ldSidenavBreakpointChange', { target: 'window', passive: true })
  handleSidenavBreakpointChange(ev) {
    if (ev.target !== this.sidenav) return
    this.sidenavClosable = ev.detail
  }

  /**
   * @internal
   * Updates the label of the back button.
   */
  @Method()
  async updateLabel(text?: string) {
    this.parentLabel = text || ''
  }

  private onClick = () => {
    this.ldSidenavBack.emit()
  }

  private onKeyDown = (ev) => {
    if ([' ', 'Enter'].includes(ev.key)) {
      ev.preventDefault()
      this.ldSidenavBack.emit()
    }
  }

  componentWillLoad() {
    this.sidenav = closest('ld-sidenav', this.el)
    this.rounded = !!this.el.querySelector('ld-sidenav-navitem[rounded]')
  }

  render() {
    const cl = getClassNames([
      'ld-sidenav-back',
      this.parentLabel && 'ld-sidenav-back--is-back',
      this.rounded && 'ld-sidenav-back--rounded',
      this.sidenavCollapsed &&
        !this.sidenavClosable &&
        'ld-sidenav-back--collapsed',
    ])

    return (
      <div
        tabIndex={this.parentLabel ? 0 : undefined}
        role={this.parentLabel ? 'button' : undefined}
        aria-label={this.backLabel}
        class={cl}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        part="back focusable"
      >
        <div class="ld-sidenav-back__btn-back" part="btn-back">
          <div class="ld-sidenav-back__bg" part="bg">
            <div class="ld-sidenav-back__bg-left"></div>
            <div class="ld-sidenav-back__bg-center"></div>
            <div class="ld-sidenav-back__bg-right"></div>
          </div>
          <div class="ld-sidenav-back__icon" part="icon-container">
            <svg
              part="icon"
              width="12"
              height="12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.333 1.832 1 5.999l3.333 4.166M1 6h10"
                stroke="#F8F8FC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="ld-sidenav-back__btn-back-label" part="label">
            {this.parentLabel}
          </span>
        </div>
        <div class="ld-sidenav-back__slot-container" part="slot-container">
          <slot></slot>
        </div>
      </div>
    )
  }
}
