import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { SelectedDetail } from './ld-step/ld-step'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ol` element wrapping the slot
 * @part label - `ld-sr-only` element containing the label
 */
@Component({
  tag: 'ld-stepper',
  styleUrl: 'ld-stepper.css',
  shadow: true,
})
export class LdStepper {
  @Element() el: HTMLLdStepperElement

  /** Switch colors for brand background. */
  @Prop() brandColor? = false
  /** Indicates whether the steps should be evenly distributed or fit to their content */
  @Prop() fitContent? = false
  /** Template for the screen-reader label, containing the label of the current step and the steps summary */
  @Prop() labelTemplate? = '$1, $2'
  /** Step summary template for the screen-reader label, containing the index of the current step and the overall number of steps */
  @Prop() labelSummaryTemplate? = 'step $1 of $2'
  /** Step size */
  @Prop() size?: HTMLLdStepElement['size']
  /** Vertical layout */
  @Prop() vertical? = false

  // The following event is not used within the ld-stepper component itself.
  // Its only purpose is to create a type definition on the ld-stepper component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-step components.
  /**
   * Emitted when the focusable element of a step is
   * clicked and step is neither current nor disabled.
   */
  @Event() ldstepselected: EventEmitter<SelectedDetail>

  @State() currentLabel: string
  @State() currentIndex: number
  @State() steps: NodeListOf<HTMLLdStepElement>

  private getLabel() {
    const summary = this.labelSummaryTemplate
      .replace('$1', String(this.currentIndex + 1))
      .replace('$2', String(this.steps.length))

    return this.currentLabel
      ? this.labelTemplate
          .replace('$1', this.currentLabel)
          .replace('$2', summary)
      : summary
  }

  updateCurrent = (event: CustomEvent<SelectedDetail>) => {
    this.currentIndex = event.detail.index
    this.currentLabel = event.detail.label
  }

  @Watch('brandColor')
  @Watch('size')
  @Watch('vertical')
  private propagateProps() {
    this.steps.forEach((ldStep) => {
      ldStep.brandColor = this.brandColor
      ldStep.size = this.size
      ldStep.vertical = this.vertical
    })
  }

  componentWillLoad() {
    this.steps = this.el.querySelectorAll('ld-step')

    this.propagateProps()
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-stepper',
          this.fitContent && 'ld-stepper--fit-content',
          this.size && `ld-stepper--${this.size}`,
          this.vertical && 'ld-stepper--vertical',
        ])}
        role="navigation"
        onLdstepselected={this.updateCurrent}
      >
        <ld-sr-only>{this.getLabel()}</ld-sr-only>
        <ol part="list">
          <slot></slot>
        </ol>
      </Host>
    )
  }
}
