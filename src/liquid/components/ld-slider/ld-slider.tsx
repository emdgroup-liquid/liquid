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
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

@Component({
  tag: 'ld-slider',
  styleUrl: 'ld-slider.css',
  shadow: true,
})
export class LdSlider {
  @Element() el: HTMLLdSliderElement

  /** Makes the current values always visible above the thumbs */
  @Prop() alwaysShowValues = false
  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string
  /** Disabled state of the slider */
  @Prop() disabled = false
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
  /** Offset inside which a thumb snaps to a stop point */
  @Prop() snapOffset?: number
  /** Specifies the legal number intervals */
  @Prop() step?: number
  /** Adds custom stop points to the slider (instead of steps) */
  @Prop() stops?: string
  /** Prevents swapping of thumbs */
  @Prop() strict = false
  /** Specifies the default value */
  @Prop({ mutable: true, reflect: true }) value?: string = String(this.min)
  /** Width of the slider */
  @Prop() width? = '100%'

  @State() edges: number[] = []
  @State() steps: number[] = []
  @State() values: number[] = []

  @Event() ldchange: EventEmitter<typeof this.values>
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
      return this.steps.reduce((prevStep, step) =>
        Math.abs(step - currValue) < Math.abs(prevStep - currValue)
          ? step
          : prevStep
      )
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
          ...this.stops.split(',').map((edge) => Number.parseInt(edge, 10)),
          this.max,
        ]
      : this.step
      ? Array(Math.floor((this.max - this.min) / this.step) + 1)
          .fill(this.min)
          .map((min, index) => min + index * this.step)
      : []

    this.edges = this.stops ? [...this.steps] : [this.min, this.max]
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
          (this.disabled || this.ariaDisabled === 'true') &&
            'ld-slider--disabled',
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
      var(--ld-slider-radius) + (var(--v${index}) - var(--min)) /
        var(--ld-slider-diff) * var(--ld-slider-useful-width)
    ),
  transparent 0
)`
              )
              .join(','),
        }}
      >
        {this.values.map((value, index) => (
          <>
            <label class="sr-only" htmlFor={`v${index}`}>
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
              step={this.snapOffset !== undefined ? undefined : this.step}
              style={
                // prevents that thumb is not movable in strict mode
                index === this.values.length - 2 && value === this.max
                  ? {
                      zIndex: '2',
                    }
                  : undefined
              }
              type="range"
              value={value}
            />
            <output
              class={getClassNames([
                'ld-slider__output',
                this.alwaysShowValues && 'ld-slider__output--permanent',
              ])}
              htmlFor={`v${index}`}
              style={{ '--c': `var(--v${index})` }}
            />
          </>
        ))}
        {this.indicators &&
          this.steps.map((stop) => (
            <div
              class="ld-slider__indicator"
              key={stop}
              style={{ '--c': String(stop) }}
            />
          ))}
        {this.edges.map((edge, index) => (
          <div
            class={getClassNames([
              'ld-slider__edge',
              index === 0 && 'ld-slider__edge--first',
              index === this.edges.length - 1 && 'ld-slider__edge--last',
            ])}
            key={edge}
            style={{ '--c': String(edge) }}
          >
            {edge}
          </div>
        ))}
      </Host>
    )
  }
}
