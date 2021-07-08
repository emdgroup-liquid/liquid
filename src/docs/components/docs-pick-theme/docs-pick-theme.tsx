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

  private handleChange(ev) {
    this.pickTheme.emit(ev.detail[0])
    this.currentTheme = ev.detail[0]
  }

  private themes = [
    ThemeName.ocean,
    ThemeName.bubblegum,
    ThemeName.shake,
    ThemeName.solvent,
    ThemeName.tea,
  ]

  render() {
    let cl = 'docs-pick-theme'
    cl += ` ld-theme-${this.currentTheme.toLowerCase()}`

    return (
      <Host class={cl}>
        <form>
          <fieldset class="docs-pick-theme__fieldset">
            <ld-sr-only>
              <legend>Pick a theme</legend>
            </ld-sr-only>

            <ld-select
              class="docs-pick-theme__select"
              onInput={this.handleChange.bind(this)}
              preventDeselection
              mode="ghost"
              tetherOptions={JSON.stringify({
                attachment: 'top right',
                targetAttachment: 'bottom right',
                offset: '-2px -8px',
              })}
              popperClass="docs-pick-theme__popper"
            >
              {this.themes.map((theme) => (
                <ld-option
                  value={theme.toLowerCase()}
                  class={`docs-pick-theme__option ld-theme-${theme.toLowerCase()}`}
                  selected={theme === this.currentTheme}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1).toLowerCase()}

                  <span
                    role="presentation"
                    class="docs-pick-theme__option-pattern-wrapper"
                  >
                    <svg
                      class="docs-pick-theme__option-pattern"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 108 95"
                    >
                      <path
                        fill="currentColor"
                        d="M6.65 25.4C.2 29.83.77 30.9.22 34-.32 37.13.3 67.55.3 67.55c-.18 5.02.22 7.99 3.63 9.76l29.49 15.75c3.45 1.81 9.19 2.1 12.75.65l56.66-22.47a8.02 8.02 0 004.68-9.33L98.8 30.47c-1.01-3.69-4.68-8.17-8.13-9.87L51.26.9C47.8-.82 42.71 0 39.98 2.72L6.65 25.41z"
                      />
                    </svg>
                  </span>
                </ld-option>
              ))}
              <span slot="icon">
                <ld-icon>
                  <svg
                    class="docs-pick-theme__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      d="M9 20l-.7-.7a1 1 0 00-.3.7h1zm3.5 3.5v1a1 1 0 00.7-.3l-.7-.7zm9-9l.7.7a1 1 0 000-1.4l-.7.7zM18 11l.7-.7a1 1 0 00-1.4 0l.7.7zM8 20v2.5h2V20H8zm2 4.5h2.5v-2H10v2zm3.2-.3l9-9-1.4-1.4-9 9 1.4 1.4zm9-10.4l-3.5-3.5-1.4 1.4 3.5 3.5 1.4-1.4zm-4.9-3.5l-9 9 1.4 1.4 9-9-1.4-1.4zM8 22.5c0 1.1.9 2 2 2v-2H8z"
                    />
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      d="M17.58 10.33L19.92 8a2 2 0 012.83 0l1.79 1.79a2 2 0 010 2.83l-2.35 2.34-4.61-4.62zM9 23v-4l4 4H9z"
                    />
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M23 16l-6.5-6.5"
                    />
                  </svg>
                </ld-icon>
              </span>
            </ld-select>
          </fieldset>
        </form>
      </Host>
    )
  }
}
