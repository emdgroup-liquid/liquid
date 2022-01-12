import '../../../components' // type definitions for type checking and intelliSense
import { Component, h, Host, Prop, Listen, State } from '@stencil/core'
import { getClassNames } from '../../../liquid/utils/getClassNames'

/** @internal **/
@Component({
  tag: 'docs-example',
  styleUrl: 'docs-example.css',
  shadow: false,
})
export class DocsExample {
  /** Background color mode. */
  @Prop() background: 'brand' | 'light'

  /** Center examples. */
  @Prop() centered = false

  /** Web Component markup encoded as URI component. */
  @Prop() code!: string

  /** CSS component markup encoded as URI component. */
  @Prop() codeCssComponent: string

  /** Adds a thin border to the container. */
  @Prop() hasBorder = false

  /** Puts some space between content and container. */
  @Prop() hasPadding = false

  /** Opens code view on initial load. */
  @Prop() opened = false

  /** Stack examples (use display block). */
  @Prop() stacked = false

  /** Custom show-container styles. */
  @Prop() styles = '{}'

  /** Enables theme switch. */
  @Prop() themable = false

  /** Current theme. */
  @State() currentTheme = 'ocean'

  /** Is code toggled to be visible */
  @State() isCodeVisible = this.opened

  /** Is Web Component visible (as opposed to the css component version) */
  @State() isWebComponent = true

  @Listen('pickTheme')
  handlePickTheme(event: CustomEvent<string>) {
    this.currentTheme = event.detail
  }

  @Listen('toggleCode')
  handleToggleCode(event: CustomEvent<boolean>) {
    this.isCodeVisible = event.detail
  }

  @Listen('switchComponent')
  handleSwitchComponent(event: CustomEvent<boolean>) {
    this.isWebComponent = event.detail
  }

  render() {
    const cl = [
      'docs-example',
      this.isCodeVisible && 'docs-example--code-visible',
      this.hasBorder && 'docs-example--has-border',
      this.hasPadding && 'docs-example--has-padding',
      this.isWebComponent
        ? 'docs-example--web-component'
        : ' docs-example--css-component',
    ]

    let clShow = 'docs-example__show'
    if (this.themable && this.currentTheme) {
      clShow += ' ld-theme-' + this.currentTheme.toLowerCase()
    }
    if (this.centered) clShow += ' docs-example__show--centered'
    if (this.stacked) clShow += ' docs-example__show--stacked'
    if (this.background) clShow += ` docs-example__show--${this.background}`

    return (
      <Host class={getClassNames(cl)}>
        <div class={clShow} style={JSON.parse(this.styles)}>
          <slot name="show"></slot>
          <slot name="showCssComponent"></slot>
        </div>
        <div class="docs-example__tools-scroll-container">
          <div class="docs-example__tools">
            {this.codeCssComponent && (
              <docs-switch-web-css></docs-switch-web-css>
            )}
            <div class="docs-example__tool-buttons">
              {this.themable && <docs-pick-theme />}
              <docs-copy-to-cb
                textToCopy={decodeURIComponent(
                  this.isWebComponent ? this.code : this.codeCssComponent
                )}
              />
              <docs-toggle-code isOn={this.isCodeVisible} />
            </div>
          </div>
        </div>
        <div class="docs-example__code">
          <slot name="code"></slot>
          <slot name="codeCssComponent"></slot>
        </div>
      </Host>
    )
  }
}
