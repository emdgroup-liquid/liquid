import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Event, EventEmitter, State } from '@stencil/core'
import { ThemeName } from '../../../liquid/types/theme'

/** @internal **/
@Component({
  tag: 'docs-pick-theme',
  styleUrl: 'docs-pick-theme.css',
  shadow: false,
})
export class DocsPickTheme {
  @State() currentTheme: ThemeName = ThemeName.ocean

  /** Theme pick change event. */
  @Event() pickTheme: EventEmitter<'' | ThemeName>

  private handleChange(event) {
    this.pickTheme.emit(event.target.value)
    this.currentTheme = event.target.value
  }

  private themes = [
    ThemeName.ocean,
    ThemeName.bubblegum,
    ThemeName.shake,
    ThemeName.solvent,
    ThemeName.tea,
  ]

  render() {
    return (
      <Host class="docs-pick-theme">
        <form>
          <fieldset class="docs-pick-theme__fieldset">
            <ld-sr-only>
              <legend>Pick a theme</legend>
            </ld-sr-only>

            {this.themes.map((theme) => (
              <label
                class={`docs-pick-theme__label docs-pick-theme__label--${theme.toLowerCase()}${
                  this.currentTheme === theme
                    ? ' docs-pick-theme__label--checked'
                    : ''
                }`}
              >
                <ld-sr-only>{theme.toLowerCase()}</ld-sr-only>
                <input
                  onInput={(event) => this.handleChange(event)}
                  type="radio"
                  name="theme"
                  value={theme}
                  checked={this.currentTheme === theme}
                />
              </label>
            ))}
          </fieldset>
        </form>
      </Host>
    )
  }
}
