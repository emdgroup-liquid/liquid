import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop, Element } from '@stencil/core'

@Component({
  tag: 'ld-option',
  styleUrl: 'ld-option.css',
  shadow: false,
})
export class LdOption {
  @Element() el: HTMLElement

  /**
   * The content of this attribute represents the value to be submitted with the form,
   * should this option be selected. If this attribute is omitted, the value is taken
   * from the text content of the option element.
   */
  @Prop({ mutable: true, reflect: true }) value: string

  /**
   * If present, this boolean attribute indicates that the option is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected: false

  private handleInput(ev) {
    this.selected = ev.target.checked
  }

  componentWillLoad() {
    if (typeof this.value === 'undefined') {
      setTimeout(() => {
        this.value = this.el.innerText
      })
    }
  }

  render() {
    return (
      <Host class="ld-option" role="option" tabindex="-1">
        <ld-label position="right" size="m">
          <ld-checkbox
            checked={this.selected}
            onInput={this.handleInput.bind(this)}
          ></ld-checkbox>
          <slot></slot>
        </ld-label>
      </Host>
    )
  }
}
