import { Component, h, Host, State, Listen } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-switch-theme',
  styleUrl: 'docs-switch-theme.css',
  shadow: false,
})
export class DocsSwitchTheme {
  @State() isDark: boolean

  componentWillLoad() {
    const storedThemePref = window.localStorage.getItem('docs-theme')
    if (storedThemePref) {
      this.isDark = storedThemePref === 'dark' ? true : false
    } else {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.isDark = true
      } else {
        this.isDark = false
      }
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.isDark = e.matches
        window.localStorage.setItem(
          'docs-theme',
          this.isDark ? 'dark' : 'light'
        )
      })

    document.body.classList.add(`docs-theme-${this.isDark ? 'dark' : 'light'}`)
    document.body.classList.remove(
      `docs-theme-${!this.isDark ? 'dark' : 'light'}`
    )
  }

  @Listen('click', { capture: true })
  handleClick() {
    this.isDark = !this.isDark
    window.localStorage.setItem('docs-theme', this.isDark ? 'dark' : 'light')
    document.body.classList.add(`docs-theme-${this.isDark ? 'dark' : 'light'}`)
    document.body.classList.remove(
      `docs-theme-${!this.isDark ? 'dark' : 'light'}`
    )
  }

  render() {
    return (
      <Host class="docs-switch-theme">
        <button
          id="docs-switch-theme"
          class="docs-switch-theme__btn"
          role="switch"
          aria-checked={this.isDark ? 'true' : 'false'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" stroke-width="2" />
            <path d="M0.800049 7.99999C0.800049 4.02354 4.0236 0.799988 8.00005 0.799988V15.2C4.0236 15.2 0.800049 11.9764 0.800049 7.99999Z" />
          </svg>
          {this.isDark ? 'Light' : 'Dark'} theme
        </button>
      </Host>
    )
  }
}
