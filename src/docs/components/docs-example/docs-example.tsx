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
  /** Code encoded as URI component. */
  @Prop() code!: string

  /** Stack examples (use display block). */
  @Prop() stacked = false

  /** Opens code view on initial load. */
  @Prop() opened = false

  /** Current theme. */
  @State() currentTheme: ThemeName = ThemeName.ocean

  /** Is code toggled to be visible */
  @State() isCodeVisible = this.opened

  @Listen('pickTheme')
  handlePickTheme(event: CustomEvent<ThemeName>) {
    this.currentTheme = event.detail
  }

  @Listen('toggleCode')
  handleToggleCode(event: CustomEvent<boolean>) {
    this.isCodeVisible = event.detail
  }

  render() {
    let clShow = 'docs-example__show'
    if (this.currentTheme) {
      clShow += ' ld-theme-' + this.currentTheme.toLowerCase()
    }
    if (this.stacked) clShow += ' docs-example__show--stacked'

    return (
      <Host
        class={`docs-example${
          this.isCodeVisible ? ' docs-example--code-visible' : ''
        }`}
      >
        <div class={clShow}>
          <slot name="show"></slot>
        </div>
        <div class="docs-example__tools">
          <docs-pick-theme />
          <docs-copy-to-cb textToCopy={decodeURIComponent(this.code)} />
          <docs-toggle-code isOn={this.isCodeVisible} />
        </div>
        <div class="docs-example__code">
          <slot name="code"></slot>
        </div>
      </Host>
    )
  }
}
