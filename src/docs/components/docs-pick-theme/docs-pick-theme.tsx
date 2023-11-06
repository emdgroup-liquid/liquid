import { Component, h, Host, Event, EventEmitter, State } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-pick-theme",
  styleUrl: "docs-pick-theme.css",
  shadow: false,
})
export class DocsPickTheme {
  @State() currentTheme = "ocean";

  /** Theme pick change event. */
  @Event() pickTheme: EventEmitter<string>;

  private handleChange(ev) {
    this.pickTheme.emit(ev.detail[0]);
    this.currentTheme = ev.detail[0];
  }

  private themes = ["ocean", "bubblegum", "shake", "solvent", "tea"];

  render() {
    return (
      <Host
        class={`docs-pick-theme ld-theme-${this.currentTheme.toLowerCase()}`}
      >
        <form>
          <fieldset class="docs-pick-theme__fieldset">
            <ld-sr-only>
              <legend>Pick a theme</legend>
            </ld-sr-only>

            <ld-select
              class="docs-pick-theme__select"
              onLdchange={this.handleChange.bind(this)}
              preventDeselection
              mode="ghost"
              tetherOptions={JSON.stringify({
                attachment: "top right",
                targetAttachment: "bottom right",
                offset: "-2px -8px",
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
                    role={"presentation"}
                    class="docs-pick-theme__option-pattern"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    clip-rule="evenodd"
                    viewBox="0 0 88 41"
                  >
                    <path
                      class="docs-pick-theme__option-pattern-primary"
                      d="M88 41V0H72.894L50.257 15.408c-6.465 4.408-5.884 5.492-6.428 8.6-.262 1.493-.256 9.29-.173 16.992H88z"
                    />
                    <path
                      class="docs-pick-theme__option-pattern-accent"
                      d="M9.372 14.479c.445-.889.369-1.265 2.712-2.031 2.339-.753 12.084-3.895 12.088-3.908 1.067-.574 2.663-.369 3.547.461l10.055 9.513c.879.844 1.581 2.515 1.549 3.737l-.236 10.345c-.033 1.221-1.048 2.314-2.255 2.42l-19.07 1.741c-1.208.106-2.918-.5-3.78-1.354l-7.428-7.431c-.863-.854-.714-1.793-.207-3.302 0 0 2.581-9.302 3.025-10.191z"
                    />
                  </svg>
                </ld-option>
              ))}
              <ld-icon slot="icon">
                <svg
                  class="docs-pick-theme__icon"
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
            </ld-select>
          </fieldset>
        </form>
      </Host>
    );
  }
}
