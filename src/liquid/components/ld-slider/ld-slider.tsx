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
  @Prop() disabled? = false
  /** "From" value label (when exactly 2 values are given) */
  @Prop() labelFrom? = 'From'
  /** "Value" label (when exactly 2 values are given) */
  @Prop() labelValue? = 'Value'
  /** "To" value label (when exactly 2 values are given) */
  @Prop() labelTo? = 'To'
  /** Specifies the maximum value allowed */
  @Prop() max? = 100
  /** Specifies the minimum value allowed */
  @Prop() min? = 0
  /** Swap which areas are being marked as selected and deselected */
  @Prop() negative? = false
  /** Radix to parse the value(s) with */
  @Prop() radix = 10
  /** Specifies the legal number intervals */
  @Prop() step?: number
  /** Adds custom stop points to the slider (instead of steps) */
  @Prop() stops?: string
  /** Prevents swapping of thumbs */
  @Prop() strict? = false
  /** Specifies the default value */
  @Prop({ mutable: true, reflect: true }) value?: string = '0'
  /** Width of the slider */
  @Prop() width? = '100%'

  @State() edges: number[] = []
  @State() values: number[] = []

  @Event() ldchange: EventEmitter<typeof this.values>
  handleInput = (ev: Event, index: number) => {
    const target = ev.target as HTMLInputElement

    if (this.ariaDisabled === 'true') {
      target.value = String(this.values[index])
      return
    }

    const currValue = Number.parseInt(target.value, this.radix)
    const prevValue = this.values[index - 1]
    const nextValue = this.values[index + 1]
    const values = [...this.values]

    if (this.strict && prevValue > currValue) {
      target.value = String(prevValue)
      values[index] = prevValue
    } else if (this.strict && nextValue < currValue) {
      target.value = String(nextValue)
      values[index] = nextValue
    } else {
      values[index] = currValue
    }

    this.value = values.join(',')
  }

  validateValue = (currValue: number, index: number, values: number[]) => {
    const prevValue = values[index - 1]
    const nextValue = values[index + 1]

    if (this.strict && prevValue > currValue) {
      return false
    }

    if (this.strict && nextValue < currValue) {
      return false
    }

    return true
  }

  @Watch('value')
  handleValueChange() {
    const success = this.updateValues()

    if (success) {
      this.ldchange.emit(this.values)
    }
  }

  updateValues = () => {
    const values = this.value
      .split(',')
      .map((value) => Number.parseInt(value, this.radix))

    if (!values.every(this.validateValue)) {
      return false
    }

    this.values = values
    return true
  }

  componentWillLoad() {
    this.edges = this.stops
      ? [
          this.min,
          ...this.stops.split(',').map((edge) => Number.parseInt(edge)),
          this.max,
        ]
      : [this.min, this.max]
    const success = this.updateValues()

    if (!success) {
      throw new Error('Invalid combination of values supplied.')
    }
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
                  ? 'From'
                  : 'To'
                : `Value ${index + 1}`}
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
              step={this.step}
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
        {this.edges.map((edge, index) => (
          <div
            class={getClassNames([
              'ld-slider__edge',
              index === 0 && 'ld-slider__edge--first',
              index === this.edges.length - 1 && 'ld-slider__edge--last',
            ])}
            style={{ '--c': String(edge) }}
          >
            {edge}
          </div>
        ))}
      </Host>
    )
  }
}
