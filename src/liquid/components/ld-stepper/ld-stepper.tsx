import { Component, Element, Host, h, Prop, State } from '@stencil/core'
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

  /** Template for the screen-reader label, containing the label and index of the current step and the overall number of steps */
  @Prop() labelTemplate = '$label, step $1 of $2'

  /** Vertical layout */
  @Prop() vertical = false

  @State() currentLabel: string
  @State() currentIndex: number
  @State() steps: NodeListOf<HTMLLdStepElement>

  private getLabel() {
    return this.labelTemplate
      .replace('$label', this.currentLabel)
      .replace('$1', String(this.currentIndex))
      .replace('$2', String(this.steps.length))
  }

  updateCurrent = (event: CustomEvent<SelectedDetail>) => {
    this.currentIndex = event.detail.index
    this.currentLabel = event.detail.label
  }

  private propagateProps() {
    this.el.querySelectorAll('ld-step').forEach((ldStep) => {
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
