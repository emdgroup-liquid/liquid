---
eleventyNavigation:
  key: Circular Progress
  parent: Components
layout: layout.njk
title: Circular Progress
permalink: components/ld-circular-progress/
tags:
  - gauge
  - analogue display
  - analogue instrument meter
  - dial indicator
  - probe indicator
---

<link rel="stylesheet" href="css_components/ld-circular-progress.css">
<link rel="stylesheet" href="css_components/ld-typo.css">
<link rel="stylesheet" href="css_components/ld-sr-only.css">

# ld-circular-progress

The `ld-circular-progress` component can be used to display measurements or certain dimensional information.

---

## Default

{% example %}
<ld-sr-only id="progress-label">Progress</ld-sr-only>
<ld-circular-progress aria-labeledby="progress-label" aria-valuenow="25">
  <ld-typo variant="b6">25%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>

<!-- React component -->

<LdSrOnly id="progress-label">Progress</LdSrOnly>
<LdCircularProgress aria-labelledby="progress-label" aria-valuenow={25}>
  <LdTypo variant="b6">25%</LdTypo>
  <LdTypo variant="label-s">complete</LdTypo>
</LdCircularProgress>

<!-- CSS component -->

<span class="ld-sr-only" id="progress-label-css">Progress</span>
<div class="ld-circular-progress"
     aria-labeledby="progress-label-css"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-circular-progress-valuenow: 25">
  <span class="ld-typo ld-typo--b6">25%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
{% endexample %}

Interactive example:

{% example '{ "stacked": true, "centered": true }' %}
<ld-sr-only id="progress-label">Progress</ld-sr-only>
<ld-circular-progress aria-labeledby="progress-label" aria-valuenow="25">
  <ld-typo variant="b6">25%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>

<ld-slider value="25" max="200" width="14rem"></ld-slider>

<script>
  void function() {
    const slider = document.currentScript.previousElementSibling
    const progress = slider.previousElementSibling
    const progressLabel = progress.children[0]
    slider.addEventListener('ldchange', ev => {
      const val = ev.detail[0]
      progress.ariaValuenow = val
      progressLabel.innerText = `${val}%`
      progressLabel.style.color = `var(--ld-thm-${val > 100 ? 'error' : 'primary'})`
    })
  }()
</script>

<!-- React component -->

const App = () => {
  const [val, setVal] = useState(25)
  return (
    <>
      <LdSrOnly id="progress-label">Progress</LdSrOnly>
      <LdCircularProgress aria-labelledby="progress-label" aria-valuenow={val}>
        <LdTypo
          variant="b6"
          style={ {
            color: `var(--ld-thm-${val > 100 ? 'error' : 'primary'})`,
          } }
        >
          {val}%
        </LdTypo>
        <LdTypo variant="label-s">complete</LdTypo>
      </LdCircularProgress>

      <LdSlider
        onLdchange={(ev) => {
          setVal(ev.detail[0])
        }}
        value={val}
        max={200}
        width="14rem"
      />
    </>
  )
}

<!-- CSS component -->

<span class="ld-sr-only" id="progress-label-css">Progress</span>
<div class="ld-circular-progress"
     aria-labeledby="progress-label-css"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-circular-progress-valuenow: 25">
  <span class="ld-typo ld-typo--b6">25%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>

<ld-slider value="25" max="200" width="14rem"></ld-slider>

<script>
  void function() {
    const slider = document.currentScript.previousElementSibling
    const progress = slider.previousElementSibling
    const progressLabel = progress.children[0]
    slider.addEventListener('ldchange', ev => {
      const val = ev.detail[0]
      progress.ariaValuenow = val
      progress.style.setProperty('--ld-circular-progress-valuenow', val)
      progressLabel.innerText = `${val}%`
      progressLabel.style.color = `var(--ld-thm-${val > 100 ? 'error' : 'primary'})`
    })
  }()
</script>
{% endexample %}

## With custom min and max values

{% example %}
<ld-circular-progress
  aria-valuemax="360"
  aria-valuemin="0"
  aria-valuenow="90"
>
  <ld-typo variant="b6">90°</ld-typo>
</ld-circular-progress>

<ld-circular-progress aria-valuemax="4" aria-valuenow="1">
  <ld-typo variant="h4" style="color: var(--ld-thm-primary)">
    Step
  </ld-typo>
  <ld-typo variant="label-s">1 of 4</ld-typo>
</ld-circular-progress>

<!-- React component -->

<LdCircularProgress
  aria-valuemax={360}
  aria-valuemin={0}
  aria-valuenow={90}
>
  <LdTypo variant="b6">90°</LdTypo>
</LdCircularProgress>

<LdCircularProgress aria-valuemax={4} aria-valuenow={1}>
  <LdTypo variant="h4" style={ { color: 'var(--ld-thm-primary)' } }>
    Step
  </LdTypo>
  <LdTypo variant="label-s">1 of 4</LdTypo>
</LdCircularProgress>

<!-- CSS component -->

<div class="ld-circular-progress"
     aria-valuemax="360"
     aria-valuemin="0"
     aria-valuenow="90"
     role="progressbar"
     style="--ld-circular-progress-valuemax: 360; --ld-circular-progress-valuemin: 0; --ld-circular-progress-valuenow: 90">
  <span class="ld-typo ld-typo--b6">90°</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>

<div class="ld-circular-progress"
     aria-valuemax="4"
     aria-valuenow="1"
     role="progressbar"
     style="--ld-circular-progress-valuemax: 4; --ld-circular-progress-valuenow: 1">
  <span class="ld-typo ld-typo--h4" style="color: var(--ld-thm-primary)">Step</span>
  <span class="ld-typo ld-typo--label-s">1 of 4</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
{% endexample %}

## Overflow

The component can visualize an overflow value up to 200% of the maximum progress value.

{% example %}
<ld-circular-progress aria-valuenow="125">
  <ld-typo variant="b6" style="color: var(--ld-thm-error)">125%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>
<ld-circular-progress aria-valuenow="175">
  <ld-typo variant="b6" style="color: var(--ld-thm-error)">175%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>
<ld-circular-progress aria-valuenow="225">
  <ld-typo variant="b6" style="color: var(--ld-thm-error)">225%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>

<!-- React component -->

<LdCircularProgress aria-valuenow={125}>
  <LdTypo variant="b6" style={ { color: 'var(--ld-thm-error)' } }>125%</LdTypo>
  <LdTypo variant="label-s">complete</LdTypo>
</LdCircularProgress>
<LdCircularProgress aria-valuenow={175}>
  <LdTypo variant="b6" style={ { color: 'var(--ld-thm-error)' } }>175%</LdTypo>
  <LdTypo variant="label-s">complete</LdTypo>
</LdCircularProgress>
<LdCircularProgress aria-valuenow={225}>
  <LdTypo variant="b6" style={ { color: 'var(--ld-thm-error)' } }>225%</LdTypo>
  <LdTypo variant="label-s">complete</LdTypo>
</LdCircularProgress>

<!-- CSS component -->

<div class="ld-circular-progress ld-circular-progress--overflow"
     aria-valuenow="125"
     role="progressbar"
     style="--ld-circular-progress-valuenow: 125">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-error)">125%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
<div class="ld-circular-progress ld-circular-progress--overflow"
     aria-valuenow="175"
     role="progressbar"
     style="--ld-circular-progress-valuenow: 175">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-error)">175%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
<div class="ld-circular-progress ld-circular-progress--overflow"
     aria-valuenow="225"
     role="progressbar"
     style="--ld-circular-progress-valuenow: 225">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-error)">225%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
{% endexample %}

## Custom color

{% example %}
<ld-circular-progress aria-valuenow="25" style="--ld-circular-progress-bar-col: var(--ld-thm-secondary)">
  <ld-typo variant="b6">25%</ld-typo>
  <ld-typo variant="label-s">complete</ld-typo>
</ld-circular-progress>

<!-- React component -->

<LdCircularProgress
  aria-valuenow={25}
  style={ { '--ld-circular-progress-bar-col': 'var(--ld-thm-secondary)' } }
>
  <LdTypo variant="b6">25%</LdTypo>
  <LdTypo variant="label-s">complete</LdTypo>
</LdCircularProgress>

<!-- CSS component -->

<div class="ld-circular-progress"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-circular-progress-bar-col: var(--ld-thm-secondary); --ld-circular-progress-valuenow: 25">
  <span class="ld-typo ld-typo--b6">25%</span>
  <span class="ld-typo ld-typo--label-s">complete</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
{% endexample %}

## Custom size

You can change the size of the circular progress bar. However, with a smaller size there is less space for a label inside the component. In such cases you may want to place a label below the progress indicator.

{% example %}
<style>
.report {
  display: grid;
  place-items: center;
  gap: var(--ld-sp-4);
}
.report ld-circular-progress {
  --ld-circular-progress-size: 4rem;
}
.report-value {
  transform: scale(0.8);
}
</style>

<div class="report">
  <ld-circular-progress aria-valuenow="75" aria-labeledby="performance" style="--ld-circular-progress-bar-col: var(--ld-thm-warning)">
    <ld-typo class="report-value" variant="b6">75</ld-typo>
  </ld-circular-progress>
  <ld-typo id="performance" variant="label-s">Performance</ld-typo>
</div>
<div class="report">
  <ld-circular-progress aria-valuenow="75" aria-labeledby="accessibility" style="--ld-circular-progress-bar-col: var(--ld-thm-warning)">
    <ld-typo class="report-value" variant="b6">75</ld-typo>
  </ld-circular-progress>
  <ld-typo id="accessibility" variant="label-s">Accessibility</ld-typo>
</div>
<div class="report">
  <ld-circular-progress aria-valuenow="100" aria-labeledby="best-practices" style="--ld-circular-progress-bar-col: var(--ld-thm-ocean-success)">
    <ld-typo class="report-value" variant="b6" style="color: var(--ld-thm-success)">100</ld-typo>
  </ld-circular-progress>
  <ld-typo id="best-practices" variant="label-s">Best Practices</ld-typo>
</div>
<div class="report">
  <ld-circular-progress aria-valuenow="98" aria-labeledby="seo" style="--ld-circular-progress-bar-col: var(--ld-thm-ocean-success)">
    <ld-typo class="report-value" variant="b6" style="color: var(--ld-thm-success)">98</ld-typo>
  </ld-circular-progress>
  <ld-typo id="seo" variant="label-s">SEO</ld-typo>
</div>

<!-- React component -->

<style>{`
  .report {
    display: grid;
    place-items: center;
    gap: var(--ld-sp-4);
  }
  .report ld-circular-progress {
    --ld-circular-progress-size: 4rem;
  }
  .report-value {
    transform: scale(0.8);
  }
`}</style>

<div className="report">
  <LdCircularProgress
    aria-valuenow={75}
    aria-labeledby="performance"
    style={ { '--ld-circular-progress-bar-col': 'var(--ld-thm-warning)' } }
  >
    <LdTypo className="report-value" variant="b6">
      75
    </LdTypo>
  </LdCircularProgress>
  <LdTypo id="performance" variant="label-s">
    Performance
  </LdTypo>
</div>
<div className="report">
  <LdCircularProgress
    aria-valuenow={75}
    aria-labeledby="accessibility"
    style={ { '--ld-circular-progress-bar-col': 'var(--ld-thm-warning)' } }
  >
    <LdTypo className="report-value" variant="b6">
      75
    </LdTypo>
  </LdCircularProgress>
  <LdTypo id="accessibility" variant="label-s">
    Accessibility
  </LdTypo>
</div>
<div className="report">
  <LdCircularProgress
    aria-valuenow={100}
    aria-labeledby="best-practices"
    style={ {
      '--ld-circular-progress-bar-col': 'var(--ld-thm-ocean-success)',
    } }
  >
    <LdTypo
      className="report-value"
      variant="b6"
      style={ { color: 'var(--ld-thm-success)' } }
    >
      100
    </LdTypo>
  </LdCircularProgress>
  <LdTypo id="best-practices" variant="label-s">
    Best Practices
  </LdTypo>
</div>
<div className="report">
  <LdCircularProgress
    aria-valuenow={98}
    aria-labeledby="seo"
    style={ {
      '--ld-circular-progress-bar-col': 'var(--ld-thm-ocean-success)',
    } }
  >
    <LdTypo
      className="report-value"
      variant="b6"
      style={ { color: 'var(--ld-thm-success)' } }
    >
      98
    </LdTypo>
  </LdCircularProgress>
  <LdTypo id="seo" variant="label-s">
    SEO
  </LdTypo>
</div>

<!-- CSS component -->

<style>
.report {
  display: grid;
  place-items: center;
  gap: var(--ld-sp-4);
}
.report .ld-circular-progress {
  --ld-circular-progress-size: 4rem;
}
.report-value {
  transform: scale(0.8);
}
</style>

<div class="report">
  <div class="ld-circular-progress"
       aria-labeledby="performance-css"
       aria-valuenow="75"
       role="progressbar"
       style="--ld-circular-progress-bar-col: var(--ld-thm-warning); --ld-circular-progress-valuenow: 75">
    <span class="report-value ld-typo ld-typo--b6">75</span>
    <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
      <circle cx="5" cy="5" r="5" />
    </svg>
  </div>
  <span class="ld-typo ld-typo--label-s" id="performance-css">Performance</span>
</div>
<div class="report">
  <div class="ld-circular-progress"
       aria-labeledby="accessibility-css"
       aria-valuenow="75"
       role="progressbar"
       style="--ld-circular-progress-bar-col: var(--ld-thm-warning); --ld-circular-progress-valuenow: 75">
    <span class="report-value ld-typo ld-typo--b6">75</span>
    <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
      <circle cx="5" cy="5" r="5" />
    </svg>
  </div>
  <span class="ld-typo ld-typo--label-s" id="accessibility-css">Accessibility</span>
</div>
<div class="report">
  <div class="ld-circular-progress"
       aria-labeledby="best-practices-css"
       aria-valuenow="100"
       role="progressbar"
       style="--ld-circular-progress-bar-col: var(--ld-thm-success); --ld-circular-progress-valuenow: 100">
    <span class="report-value ld-typo ld-typo--b6" style="color: var(--ld-thm-success)">100</span>
    <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
      <circle cx="5" cy="5" r="5" />
    </svg>
  </div>
  <span class="ld-typo ld-typo--label-s" id="best-practices-css">Best Practices</span>
</div>
<div class="report">
  <div class="ld-circular-progress"
       aria-labeledby="seo-css"
       aria-valuenow="98"
       role="progressbar"
       style="--ld-circular-progress-bar-col: var(--ld-thm-success); --ld-circular-progress-valuenow: 98">
    <span class="report-value ld-typo ld-typo--b6" style="color: var(--ld-thm-success)">98</span>
    <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" />
      <circle cx="5" cy="5" r="5" />
    </svg>
  </div>
  <span class="ld-typo ld-typo--label-s" id="seo-css">SEO</span>
</div>
{% endexample %}

## On brand color

Use this mode on backgrounds with brand color.

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-circular-progress
  brand-color
  aria-valuemax="360"
  aria-valuenow="90"
>
  <ld-typo variant="b6" style="color: var(--ld-col-wht)">
    90°
  </ld-typo>
</ld-circular-progress>
<ld-circular-progress
  brand-color
  aria-valuemax="360"
  aria-valuenow="350"
  style="--ld-circular-progress-bar-col: var(--ld-thm-warning)"
>
  <ld-typo variant="b6" style="color: var(--ld-thm-warning)">
    350°
  </ld-typo>
</ld-circular-progress>
<ld-circular-progress
  brand-color
  aria-valuemax="360"
  aria-valuenow="450"
>
  <ld-typo variant="b6" style="color: var(--ld-thm-warning)">
    450°
  </ld-typo>
</ld-circular-progress>

<!-- React component -->

<LdCircularProgress
  brand-color
  aria-valuemax={360}
  aria-valuenow={90}
>
  <LdTypo variant="b6" style={ { color: 'var(--ld-col-wht)' } }>
    90°
  </LdTypo>
</LdCircularProgress>
<LdCircularProgress
  brand-color
  aria-valuemax={360}
  aria-valuenow={350}
  style={ { '--ld-circular-progress-bar-col': 'var(--ld-thm-warning)' } }
>
  <LdTypo variant="b6" style={ { color: 'var(--ld-thm-warning)' } }>
    350°
  </LdTypo>
</LdCircularProgress>
<LdCircularProgress
  brand-color
  aria-valuemax={360}
  aria-valuenow={450}
>
  <LdTypo variant="b6" style={ { color: 'var(--ld-thm-warning)' } }>
    450°
  </LdTypo>
</LdCircularProgress>

<!-- CSS component -->

<div class="ld-circular-progress ld-circular-progress--brand-color"
     aria-valuemax="360"
     aria-valuenow="90"
     role="progressbar"
     style="--ld-circular-progress-valuemax: 360; --ld-circular-progress-valuenow: 90">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-col-wht)">90°</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
<div class="ld-circular-progress ld-circular-progress--brand-color"
     aria-valuemax="360"
     aria-valuenow="350"
     role="progressbar"
     style="--ld-circular-progress-bar-col: var(--ld-thm-warning); --ld-circular-progress-valuemax: 360; --ld-circular-progress-valuenow: 350">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-warning)">350°</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
<div class="ld-circular-progress ld-circular-progress--brand-color ld-circular-progress--overflow"
     aria-valuemax="360"
     aria-valuenow="450"
     role="progressbar"
     style="--ld-circular-progress-valuemax: 360; --ld-circular-progress-valuenow: 450">
  <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-warning)">450°</span>
  <svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
    <circle cx="5" cy="5" r="5" />
    <circle cx="5" cy="5" r="5" />
  </svg>
</div>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                | Type               | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----------- |
| `ariaLabeledby` | `aria-labeledby` | Defines the string value or identifies the element (or elements) that label the progressbar element providing an accessible name.                                                          | `string`           | `undefined` |
| `ariaValuemax`  | `aria-valuemax`  | Set to a decimal value representing the maximum value, and greater than aria-valuemin. If not present, the default value is 100.                                                           | `number`           | `100`       |
| `ariaValuemin`  | `aria-valuemin`  | Set to a decimal value representing the minimum value, and less than aria-valuemax. If not present, the default value is 0.                                                                | `number`           | `0`         |
| `ariaValuenow`  | `aria-valuenow`  | Only present and required if the value is not indeterminate. Set to a decimal value between 0, or valuemin if present, and aria-valuemax indicating the current value of the progress bar. | `number`           | `undefined` |
| `ariaValuetext` | `aria-valuetext` | Assistive technologies often present the value of aria-valuenow as a percentage. If this would not be accurate use this property to make the progress bar value understandable.            | `string`           | `undefined` |
| `brandColor`    | `brand-color`    | Styles the progress bar in a way that it looks good on the primary color of the current theme.                                                                                             | `boolean`          | `undefined` |
| `key`           | `key`            | for tracking the node's identity when working with lists                                                                                                                                   | `string \| number` | `undefined` |
| `ref`           | `ref`            | reference to component                                                                                                                                                                     | `any`              | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
