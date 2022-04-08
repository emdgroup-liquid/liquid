import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-iframe',
  styleUrl: 'docs-iframe.css',
  shadow: false,
})
export class DocsIFrame {
  private iframe: HTMLIFrameElement

  /** URL to the IFrame content */
  @Prop() src?: string

  @State() darkMode: boolean
  @State() loaded = false

  /** Setting the dark mode on the component */
  @Method()
  async setDarkMode(darkMode?: boolean) {
    this.darkMode = darkMode
  }

  @Watch('darkMode')
  updateDarkMode(darkMode: boolean) {
    if (!this.loaded) return

    this.iframe.contentWindow.postMessage(
      { mode: 'updateDarkmode', darkMode: darkMode },
      this.src
    )
  }

  componentDidLoad() {
    this.iframe.addEventListener('load', () => {
      this.loaded = true
      this.updateDarkMode(this.darkMode)
    })
  }

  render() {
    return (
      <Host class="docs-iframe">
        <iframe ref={(ref) => (this.iframe = ref)} src={this.src} />
      </Host>
    )
  }
}
