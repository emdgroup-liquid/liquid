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

                  <svg
                    role={'presentation'}
                    class="docs-pick-theme__option-pattern"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 88 41"
                  >
                    <g clip-path="url(#clip0)">
                      <path
                        class="docs-pick-theme__option-pattern-primary"
                        d="M50.2571 15.4078c-6.4648 4.4085-5.8837 5.4925-6.4285 8.6002-.5448 3.1076.0727 33.5336.0727 33.5336-.1816 5.0228.2179 7.9859 3.6319 9.7565l29.4912 15.7551c3.4503 1.8067 9.1887 2.0958 12.748.6504L146.43 61.2274c3.596-1.4093 5.702-5.6371 4.686-9.3229l-8.717-31.4378c-1.017-3.6858-4.685-8.1666-8.136-9.865L94.8571-9.09204c-3.4503-1.73446-8.535-.90338-11.259 1.80677 0 0-26.8762 18.28447-33.341 22.69307z"
                      />
                      <path
                        class="docs-pick-theme__option-pattern-accent"
                        d="M9.37232 14.4789c.44456-.8891.36845-1.2653 2.71118-2.0314 2.339-.7522 12.0844-3.89401 12.0881-3.90785 1.0677-.57389 2.6637-.36869 3.547.461l10.055 9.51385c.8796.8435 1.5818 2.5143 1.5492 3.7362l-.2359 10.3449c-.0325 1.2218-1.0474 2.314-2.2552 2.4204l-19.0698 1.7409c-1.2078.1064-2.9175-.4999-3.7797-1.3536l-7.42866-7.4315c-.86215-.8536-.71382-1.7924-.20618-3.3022 0 0 2.58039-9.3016 3.02496-10.1907z"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <path fill="#fff" d="M0 0h88v41H0z" />
                      </clipPath>
                    </defs>
                  </svg>
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
