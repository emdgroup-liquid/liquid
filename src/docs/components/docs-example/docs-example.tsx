import { Component, h, Host, Prop, State } from '@stencil/core'
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

  private handlePickTheme = (event: CustomEvent<string>) => {
    this.currentTheme = event.detail
  }

  private handleToggleCode = (event: CustomEvent<boolean>) => {
    this.isCodeVisible = event.detail
  }

  private handleSwitchComponent = () => {
    this.isWebComponent = !this.isWebComponent
    this.isCodeVisible = true
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
              <ld-switch
                onLdswitchchange={this.handleSwitchComponent}
                class="docs-example__tool-switch"
                size="sm"
              >
                <ld-switch-item checked={this.isWebComponent}>
                  <ld-icon
                    slot="icon-start"
                    size="sm"
                    aria-label="Web Component"
                  >
                    <svg viewBox="0 0 800 800">
                      <path
                        fill="currentColor"
                        d="M196.3 400l200 346.4H200L0 400 200 53.6h196.3L196.3 400zM505.4 53.6H600L800 400 600 746.4h-94.6l-98-169.8H502L604 400 502 223.4h-94.7l98-169.8z"
                      />
                    </svg>
                  </ld-icon>
                </ld-switch-item>
                <ld-switch-item checked={!this.isWebComponent}>
                  <ld-icon
                    slot="icon-start"
                    size="sm"
                    aria-label="CSS component"
                  >
                    <svg
                      viewBox="0 0 800 300"
                      style={{ transform: 'scale(1.2)' }}
                    >
                      <path
                        fill="currentColor"
                        d="M0 0h238.7v99.8H99.8v99.8h139v99.9H0V0zM283.2 0h235.3v85.6H381.6v17h136.9v196.9H283.2v-89.9h136.9v-17H283.2V0zM564.7 0H800v85.6H663.1v17H800v196.9H564.7v-89.9h136.9v-17H564.7V0z"
                      />
                    </svg>
                  </ld-icon>
                </ld-switch-item>
              </ld-switch>
            )}
            <div class="docs-example__tool-buttons">
              {this.themable && (
                <docs-pick-theme onPickTheme={this.handlePickTheme} />
              )}
              <docs-toggle-code
                onToggleCode={this.handleToggleCode}
                isOn={this.isCodeVisible}
              />
            </div>
          </div>
        </div>
        <div class="docs-example__code">
          <docs-copy-to-cb
            class="docs-example__copy-to-clipboard"
            textToCopy={decodeURIComponent(
              this.isWebComponent ? this.code : this.codeCssComponent
            )}
          />
          <slot name="code"></slot>
          <slot name="codeCssComponent"></slot>
        </div>
      </Host>
    )
  }
}
