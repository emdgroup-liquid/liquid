import { Component, Element, h, Host } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-main',
  styleUrl: 'docs-main.css',
  shadow: false,
})
export class DocsNav {
  @Element() el: HTMLElement

  componentDidLoad() {
    this.el
      .querySelectorAll('#css-variables + table code, #properties + table code')
      .forEach((code) => {
        code.innerHTML = code.innerHTML.replace(/\\\|/g, '|')
      })
  }

  render() {
    return (
      <Host class="docs-main">
        <main id="main">
          <slot></slot>
        </main>
      </Host>
    )
  }
}
