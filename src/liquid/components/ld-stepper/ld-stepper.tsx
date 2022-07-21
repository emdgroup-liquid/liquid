import { Component, Element, Host, h, Prop, State, Watch } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'
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
  @Prop() brandColor = false
  /** Indicates whether the steps should be evenly distributed or fit to their content */
  @Prop() fitContent = false
  /** Template for the screen-reader label, containing the label of the current step and the steps summary */
  @Prop() labelTemplate = '$1, $2'
  /** Step summary template for the screen-reader label, containing the index of the current step and the overall number of steps */
  @Prop() labelSummaryTemplate = 'step $1 of $2'
  /** Step size */
  @Prop() size?: HTMLLdStepElement['size']
  /** Vertical layout */
  @Prop() vertical = false

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
