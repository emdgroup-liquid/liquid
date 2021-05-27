import '../../../components' // type definitions for type checking and intelliSense
import { Component, h, Host, Prop, Listen, State } from '@stencil/core'
import { ThemeName } from '../../../liquid/types/theme'

/** @internal **/
@Component({
  tag: 'docs-example',
  styleUrl: 'docs-example.css',
  shadow: false,
})
export class DocsExample {
  /** Web component markup encoded as URI component. */
  @Prop() code!: string

  /** CSS component markup encoded as URI component. */
  @Prop() codeCssComponent: string

  /** Stack examples (use display block). */
  @Prop() stacked = false

  /** Opens code view on initial load. */
  @Prop() opened = false

  /** Current theme. */
  @State() currentTheme: ThemeName = ThemeName.ocean

  /** Is code toggled to be visible */
  @State() isCodeVisible = this.opened

  /** Is web component visible (as opposed to the css component version) */
  @State() isWebComponent = true

  @Listen('pickTheme')
  handlePickTheme(event: CustomEvent<ThemeName>) {
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
    let cl = 'docs-example'
    if (this.isCodeVisible) {
      cl += ' docs-example--code-visible'
    }
    if (this.isWebComponent) {
      cl += ' docs-example--web-component'
    } else {
      cl += ' docs-example--css-component'
    }

    let clShow = 'docs-example__show'
    if (this.currentTheme) {
      clShow += ' ld-theme-' + this.currentTheme.toLowerCase()
    }
    if (this.stacked) clShow += ' docs-example__show--stacked'

    return (
      <Host class={cl}>
        <div class={clShow}>
          <slot name="show"></slot>
          <slot name="showCssComponent"></slot>
        </div>
        <div class="docs-example__tools-scroll-container">
          <div class="docs-example__tools">
            {this.codeCssComponent && (
              <docs-switch-web-css></docs-switch-web-css>
            )}
            <div class="docs-example__tool-buttons">
              <docs-pick-theme />
              <docs-copy-to-cb textToCopy={decodeURIComponent(this.code)} />
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
