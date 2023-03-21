import { Component, h, Host, State, Listen, Watch } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-switch-dark-light',
  styleUrl: 'docs-switch-dark-light.css',
  shadow: false,
})
export class DocsSwitchDarkLight {
  @State() isDark: boolean

  @Watch('isDark')
  updateIFrames(darkMode: boolean) {
    const iframe = document.querySelector('docs-iframe')

    if (iframe) {
      iframe.setDarkMode(darkMode)
    }
  }

  componentWillLoad() {
    const storedUIPref = window.localStorage.getItem('docs-ui')
    if (storedUIPref) {
      this.isDark = storedUIPref === 'dark' ? true : false
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
        window.localStorage.setItem('docs-ui', this.isDark ? 'dark' : 'light')
      })

    document.body.classList.add(`docs-ui-${this.isDark ? 'dark' : 'light'}`)
    document.body.classList.remove(`docs-ui-${!this.isDark ? 'dark' : 'light'}`)
    document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'auto'
  }

  @Listen('click', { capture: true })
  handleClick() {
    this.isDark = !this.isDark
    window.localStorage.setItem('docs-ui', this.isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('ld-dark', this.isDark)
    document.documentElement.style.colorScheme = this.isDark ? 'dark' : 'auto'
  }

  render() {
    return (
      <Host class="docs-switch-dark-light">
        <button
          id="docs-switch-dark-light"
          class="docs-switch-dark-light__btn"
          role="switch"
          aria-checked={this.isDark ? 'true' : 'false'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke-width="2" />
            <path d="M0.800049 7.99999C0.800049 4.02354 4.0236 0.799988 8.00005 0.799988V15.2C4.0236 15.2 0.800049 11.9764 0.800049 7.99999Z" />
          </svg>
          {this.isDark ? 'Light' : 'Dark'} UI
        </button>
      </Host>
    )
  }
}
