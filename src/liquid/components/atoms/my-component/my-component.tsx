import { Component, Prop, h } from '@stencil/core'
import { format } from 'src/liquid/utils/utils'

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.shadow.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string

  /**
   * The middle name
   */
  @Prop() middle: string

  /**
   * The last name
   */
  @Prop() last: string

  private getText(): string {
    return format(this.first, this.middle, this.last)
  }

  render(): HTMLDivElement {
    return <div>Hello, World! I'm {this.getText()}</div>
  }
}
