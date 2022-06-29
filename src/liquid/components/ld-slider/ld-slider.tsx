import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Host,
  h,
  Prop,
  State,
  Watch,
  Method,
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

const findClosest = (items: number[], currValue: number) =>
  items.length
    ? items.reduce((prevItem, item) =>
        Math.abs(item - currValue) < Math.abs(prevItem - currValue)
          ? item
          : prevItem
      )
    : currValue

const findNext = (items: number[], currValue: number) =>
  findClosest(
    items.filter((item) => item > currValue),
    currValue
  )

const findPrev = (items: number[], currValue: number) =>
  findClosest(
    items.filter((item) => item < currValue),
    currValue
  )

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part indicator - Stop/step indicator div elements
 * @part input - `input` elements
 * @part label - `label` element labelling an input (screen-reader only)
 * @part output - `output` elements
 * @part value-label - `div` element containing the max/min/stops values + unit
 */
@Component({
  tag: 'ld-slider',
  styleUrl: 'ld-slider.css',
  shadow: true,
})
export class LdSlider implements InnerFocusable {
  @Element() el: HTMLLdSliderElement
  firstSliderRef?: HTMLInputElement

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string
  /** Disabled state of the slider */
  @Prop() disabled = false
  /** Prevents rendering of the stop labels below the slider */
  @Prop() hideStopLabels = false
  /** Prevents rendering of the value labels below the slider */
  @Prop() hideValueLabels = false
  /** Makes the current values only visible on interaction */
  @Prop() hideValues = false
  /** Specifies the legal number intervals */
  @Prop() indicators = false
  /** "From" value label (when exactly 2 values are given) */
  @Prop() labelFrom = 'From'
  /** "To" value label (when exactly 2 values are given) */
  @Prop() labelTo = 'To'
  /** "Value" label (when exactly 2 values are given) */
  @Prop() labelValue = 'Value'
  /** Specifies the maximum value allowed */
  @Prop() max = 100
  /** Specifies the minimum value allowed */
  @Prop() min = 0
  /** Swap which areas are being marked as selected and deselected */
  @Prop() negative? = false
  /** Size of the thumb(s). */
  @Prop() size?: 'sm' | 'lg'
  /** Offset inside which a thumb snaps to a stop point */
  @Prop() snapOffset?: number
  /** Specifies the legal number intervals */
  @Prop() step?: number
  /** Adds custom stop points to the slider (instead of steps) */
  @Prop() stops?: string
  /** Prevents swapping of thumbs */
  @Prop() strict = false
  /** Tab index of the input(s). */
  @Prop() ldTabindex: number | undefined
  /** Adds custom stop points to the slider (instead of steps) */
  @Prop() unit?: string
  /** Specifies the default value */
  @Prop({ mutable: true, reflect: true }) value?: string = String(this.min)
  /** Width of the slider */
  @Prop() width? = '100%'

  @State() valueLabels: number[] = []
  @State() steps: number[] = []
  @State() values: number[] = []

  @Event() ldchange: EventEmitter<typeof this.values>

  /** Focuses the toggle */
  @Method()
  async focusInner() {
    this.firstSliderRef?.focus({ preventScroll: true })
  }

  handleInput = (ev: Event, index: number) => {
    const target = ev.target as HTMLInputElement

    if (this.ariaDisabled === 'true') {
      target.value = String(this.values[index])
      return
    }

    const currValue = Number.parseInt(target.value, 10)
    const values = [...this.values]
    const correctedValue = this.getCorrectedValue(
      currValue,
      index,
      values,
      true
    )

    values[index] = correctedValue

    if (correctedValue !== currValue) {
      target.value = String(correctedValue)
    }

    const newValue = values.join(',')

    if (this.value !== newValue) {
      this.value = values.join(',')
    }
  }

  handleKeyDown = (ev: KeyboardEvent, index: number) => {
    const target = ev.target as HTMLInputElement

    if (this.ariaDisabled === 'true') {
      target.value = String(this.values[index])
      return
    }

    const prevValue = Number.parseInt(target.value, 10)
    const values = [...this.values]
    let currValue: number

    if (this.stops && !this.snapOffset) {
      switch (ev.key) {
        case 'ArrowDown':
        case 'ArrowLeft':
          currValue = findPrev(this.steps, prevValue)
          break
        case 'ArrowRight':
        case 'ArrowUp':
          currValue = findNext(this.steps, prevValue)
      }
    } else if (this.snapOffset) {
      switch (ev.key) {
        case 'ArrowDown':
        case 'ArrowLeft':
          currValue = prevValue - 1
          break
        case 'ArrowRight':
        case 'ArrowUp':
          currValue = prevValue + 1
      }
    }

    if (currValue === undefined) {
      return
    }

    ev.preventDefault()
    const correctedValue = this.getCorrectedValue(currValue, index, values)

    if (correctedValue === prevValue) {
      return
    }

    values[index] = correctedValue
    target.value = String(correctedValue)

    const newValue = values.join(',')

    if (this.value !== newValue) {
      this.value = values.join(',')
    }
  }

  getCorrectedValue = (
    currValue: number,
    index: number,
    values: number[],
    snap = false
  ) => {
    const prevValue = values[index - 1]
    const nextValue = values[index + 1]

    if (currValue < this.min) {
      return this.min
    }

    if (currValue > this.max) {
      return this.max
    }

    if (this.strict && prevValue > currValue) {
      return prevValue
    }

    if (this.strict && nextValue < currValue) {
      return nextValue
    }

    if (snap && this.snapOffset !== undefined) {
      const stepToSnapTo = this.steps.find(
        (step) =>
          currValue <= step + this.snapOffset &&
          currValue >= step - this.snapOffset
      )

      return stepToSnapTo ?? currValue
    }

    if (this.steps.length && this.snapOffset === undefined) {
      return findClosest(this.steps, currValue)
    }

    return currValue
  }

  validateValue = (currValue: number, index: number, values: number[]) =>
    currValue === this.getCorrectedValue(currValue, index, values)

  @Watch('max')
  @Watch('min')
  @Watch('step')
  @Watch('stops')
  updateState() {
    this.steps = this.stops
      ? [
          this.min,
          ...this.stops
            .split(',')
            .map((valueLabel) => Number.parseInt(valueLabel, 10)),
          this.max,
        ]
      : this.step
      ? Array(Math.floor((this.max - this.min) / this.step) + 1)
          .fill(this.min)
          .map((min, index) => min + index * this.step)
      : []

    this.valueLabels = this.stops ? [...this.steps] : [this.min, this.max]
  }

  @Watch('value')
  handleValueChange() {
    const success = this.updateValues()

    if (success) {
      this.ldchange.emit(this.values)
    }
  }

  correctValues = (values: number[]) => {
    const correctedValues = values.map(this.getCorrectedValue)

    if (!correctedValues.every(this.validateValue)) {
      return this.correctValues(correctedValues)
    }

    return correctedValues
  }

  updateValues = (autoCorrectValues = false) => {
    const values = this.value
      .split(',')
      .map((value) => Number.parseInt(value, 10))

    if (!values.every(this.validateValue)) {
      if (autoCorrectValues) {
        this.value = this.correctValues(values).join(',')
      }
      return false
    }

    this.values = values
    return true
  }

  componentWillLoad() {
    this.updateState()
    this.updateValues(true)
  }

  render() {
    const cssValues = this.values.reduce<Record<string, number>>(
      (prev, curr, index) => {
        prev[`--v${index}`] = curr
        return prev
      },
      {}
    )

    return (
      <Host
        class={getClassNames([
          'ld-slider',
          this.hideValueLabels && 'ld-slider--padded',
          this.size && `ld-slider--${this.size}`,
        ])}
        role="group"
        style={{
          ...cssValues,
          '--ld-slider-width': this.width,
          '--min': String(this.min),
          '--max': String(this.max),
          '--fill':
            (this.negative
              ? `
linear-gradient(
  90deg,
  red 100%,
  transparent 0
),`
              : '') +
            this.values
              .map(
                (_, index) => `
linear-gradient(
  90deg,
  red
    calc(
      var(--ld-slider-radius) - var(--ld-slider-margin) +
        (var(--v${index}) - var(--min)) / var(--ld-slider-diff) *
        (var(--ld-slider-useful-width)${
          this.width === '100%' ? ' + 2 * var(--ld-slider-margin)' : ''
        })
    ),
  transparent 0
)`
              )
              .join(','),
        }}
      >
        {this.values.map((value, index) => (
          <>
            <label class="sr-only" htmlFor={`v${index}`} part="label">
              {this.values.length === 2
                ? index === 0
                  ? this.labelFrom
                  : this.labelTo
                : `${this.labelValue} ${index + 1}`}
            </label>
            <input
              aria-disabled={
                this.disabled || this.ariaDisabled === 'true'
                  ? 'true'
                  : undefined
              }
              class="ld-slider__input"
              disabled={this.disabled}
              id={`v${index}`}
              max={this.max}
              min={this.min}
              onInput={(ev) => this.handleInput(ev, index)}
              onKeyDown={(ev) => this.handleKeyDown(ev, index)}
              part="input focusable"
              ref={
                index === 0
                  ? (ref) => {
                      this.firstSliderRef = ref
                    }
                  : undefined
              }
              step={this.snapOffset !== undefined ? undefined : this.step}
              style={
                // prevents that thumb is not movable in strict mode
                index === this.values.length - 2 && value === this.max
                  ? {
                      zIndex: '2',
                    }
                  : undefined
              }
              tabindex={this.ldTabindex}
              type="range"
              value={value}
            />
            <output
              class={getClassNames([
                'ld-slider__output',
                !this.hideValues && 'ld-slider__output--permanent',
              ])}
              htmlFor={`v${index}`}
              part="output"
              style={{
                '--c': `var(--v${index})`,
                '--u': `"${this.unit ?? ''}"`,
              }}
            />
          </>
        ))}
        {this.indicators &&
          this.steps.map((stop) => (
            <div
              class="ld-slider__indicator"
              key={stop}
              part="indicator"
              style={{ '--c': String(stop) }}
            />
          ))}
        {!this.hideValueLabels &&
          this.valueLabels.map(
            (valueLabel, index) =>
              (index === 0 ||
                index === this.valueLabels.length - 1 ||
                !this.hideStopLabels) && (
                <div
                  class={getClassNames([
                    'ld-slider__value-label',
                    index === 0 && 'ld-slider__value-label--first',
                    index === this.valueLabels.length - 1 &&
                      'ld-slider__value-label--last',
                  ])}
                  key={valueLabel}
                  part="value-label"
                  style={{ '--c': String(valueLabel) }}
                >
                  {valueLabel}
                  {this.unit}
                </div>
              )
          )}
      </Host>
    )
  }
}
