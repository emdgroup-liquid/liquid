import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Method,
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

export type SelectedDetail = { index: number; label: string }

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part description - `span` element wrapping the description text
 * @part button - actual `button` element
 * @part li - actual `li` element
 */
@Component({
  tag: 'ld-step',
  styleUrl: 'ld-step.css',
  shadow: true,
})
export class LdStep implements InnerFocusable {
  private button: HTMLButtonElement

  /** Step is the current step */
  @Prop() current = false
  /** Description text to display below the step name (vertical mode only) */
  @Prop() description: string
  /** Step is done */
  @Prop() done = false
  /** Tab index of the step. */
  @Prop() ldTabindex: number | undefined
  /** Step may be skipped */
  @Prop() optional = false
  /** Step was skipped */
  @Prop() skipped = false
  /** Vertical layout */
  @Prop() vertical = false

  @Event() ldstepselected: EventEmitter<SelectedDetail>

  /** Sets focus on the step */
  @Method()
  async focusInner() {
    this.button?.focus()
  }

  handleClick = () => {
    console.log('bla')
  }

  render() {
    return (
      <Host>
        <li
          class={getClassNames([
            'ld-step',
            this.current && 'ld-step--current',
            this.done && 'ld-step--done',
            this.optional && 'ld-step--optional',
            this.skipped && 'ld-step--skipped',
            this.vertical && 'ld-step--vertical',
          ])}
          part="li"
          role="listitem"
        >
          <button
            disabled={!this.done && !this.skipped}
            onClick={this.handleClick}
            part="button focusable"
            ref={(ref) => (this.button = ref)}
            tabIndex={this.ldTabindex}
            type="button"
          >
            {this.done && <ld-icon name="checkmark" />}
            <slot></slot>
          </button>
          {this.description && this.vertical && (
            <span class="ld-step__description" part="description">
              {this.description}
            </span>
          )}
        </li>
      </Host>
    )
  }
}
