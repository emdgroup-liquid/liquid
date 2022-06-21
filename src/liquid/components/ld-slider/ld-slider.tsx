import { Component, Element, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'ld-slider',
  styleUrl: 'ld-slider.css',
  shadow: true,
})
export class LdSlider {
  @Element() el: HTMLLdSliderElement

  @Prop() max? = 100
  @Prop() min? = 0
  @Prop() step?: number
  @Prop() strict? = false
  @Prop() width? = '20rem'

  componentDidLoad() {
    this.el.shadowRoot.querySelectorAll('input').forEach((input, index) => {
      input.addEventListener(
        'input',
        (ev) => {
          const target = ev.target as HTMLInputElement
          const currValue = Number.parseInt(target.value)
          const prevValue = Number.parseInt(
            this.el.style.getPropertyValue(`--v${index - 1}`)
          )
          const nextValue = Number.parseInt(
            this.el.style.getPropertyValue(`--v${index + 1}`)
          )

          if (this.strict && prevValue > currValue) {
            target.value = String(prevValue)
            return
          }

          if (this.strict && nextValue < currValue) {
            target.value = String(nextValue)
            return
          }

          this.el.style.setProperty(`--v${index}`, target.value)
        },
        false
      )
    })
  }

  render() {
    return (
      <Host
        class="ld-slider"
        role="group"
        aria-labelledby="multi-lbl"
        style={{
          '--v0': '35',
          '--v1': '70',
          '--ld-slider-width': this.width,
          '--min': String(this.min),
          '--max': String(this.max),
          '--fill': `
linear-gradient(
  90deg,
  red
    calc(
      var(--ld-slider-radius) + (var(--v0) - var(--min)) /
        var(--ld-slider-diff) * var(--ld-slider-useful-width)
    ),
  transparent 0
),
linear-gradient(
  90deg,
  red
    calc(
      var(--ld-slider-radius) + (var(--v1) - var(--min)) /
        var(--ld-slider-diff) * var(--ld-slider-useful-width)
    ),
  transparent 0
)`,
        }}
      >
        <div class="sr-only" id="multi-lbl">
          Multi thumb slider:
        </div>
        <label class="sr-only" htmlFor="v0">
          Value A
        </label>
        <input
          type="range"
          id="v0"
          min={this.min}
          value="35"
          max={this.max}
          step={this.step}
        />
        <output htmlFor="v0" style={{ '--c': 'var(--v0)' }} />
        <label class="sr-only" htmlFor="v1">
          Value B
        </label>
        <input
          type="range"
          id="v1"
          min={this.min}
          value="70"
          max={this.max}
          step={this.step}
        />
        <output htmlFor="v1" style={{ '--c': 'var(--v1)' }} />
      </Host>
    )
  }
}
