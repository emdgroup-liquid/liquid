---
eleventyNavigation:
  key: Progress
  parent: Components
layout: layout.njk
title: Progress
permalink: components/ld-progress/
---

<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-progress.css">
<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-sr-only.css">

# ld-progress

The `ld-progress` component can be used to displays the progress status for tasks that take a long time.

---

## Default

{% example %}
<ld-sr-only id="progress-label">Progress</ld-sr-only>
<ld-progress aria-labeledby="progress-label" aria-valuenow="25"></ld-progress>

<!-- React component -->

<LdSrOnly id="progress-label">Progress</LdSrOnly>
<LdProgress aria-labeledby="progress-label" aria-valuenow={25} />

<!-- CSS component -->

<span class="ld-sr-only" id="progress-label-css">Progress</span>
<div class="ld-progress"
     aria-labeledby="progress-label-css"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-progress-valuenow: 25"></div>
{% endexample %}

Interactive example:

{% example '{ "stacked": true, "centered": true }' %}
<ld-sr-only id="progress-label">Progress</ld-sr-only>
<ld-progress aria-labeledby="progress-label" aria-valuenow="25"></ld-progress>

<ld-slider value="25" max="200" width="14rem"></ld-slider>

<script>
  void function() {
    const slider = document.currentScript.previousElementSibling
    const progress = slider.previousElementSibling

    slider.addEventListener('ldchange', ev => {
      progress.ariaValuenow = ev.detail[0]
    })
  }()
</script>

<!-- React component -->

const progressRef = useRef(null)

return (
  <>
    <LdSrOnly id="progress-label">Progress</LdSrOnly>
    <LdProgress
      aria-labeledby="progress-label"
      aria-valuenow={25}
      ref={progressRef}
     />

    <LdSlider
      value="25"
      max={200}
      width="14rem"
      onLdchange={(ev) => {
        progressRef.current.ariaValuenow = ev.detail[0]
      }}
    />
  </>
)

<!-- CSS component -->

<span class="ld-sr-only" id="progress-label-css">Progress</span>
<div class="ld-progress"
     aria-labeledby="progress-label-css"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-progress-valuenow: 25"></div>

<ld-slider value="25" max="200" width="14rem"></ld-slider>

<script>
  void function() {
    const slider = document.currentScript.previousElementSibling
    const progress = slider.previousElementSibling
    slider.addEventListener('ldchange', ev => {
      const val = ev.detail[0]
      progress.ariaValuenow = val
      progress.style.setProperty('--ld-progress-valuenow', val)
    })
  }()
</script>
{% endexample %}

## With custom min and max values

{% example %}
<ld-progress aria-valuemax="300"
             aria-valuemin="100"
             aria-valuenow="150"></ld-progress>

<!-- React component -->

<LdProgress aria-valuemax={300}
            aria-valuemin={100}
            aria-valuenow={150} />

<!-- CSS component -->

<div class="ld-progress"
     aria-valuemax="300"
     aria-valuemin="100"
     aria-valuenow="150"
     role="progressbar"
     style="--ld-progress-valuemax: 300; --ld-progress-valuemin: 100; --ld-progress-valuenow: 150"></div>
{% endexample %}

## Overflow

The component can visualize an overflow value up to 200% of the maximum progress value.

{% example %}
<ld-progress aria-valuenow="125"></ld-progress>
<ld-progress aria-valuenow="225"></ld-progress>

<!-- React component -->

<LdProgress aria-valuenow={125} />
<LdProgress aria-valuenow={225} />

<!-- CSS component -->

<div class="ld-progress"
     aria-valuenow="125"
     role="progressbar"
     style="--ld-progress-valuenow: 125"></div>
<div class="ld-progress"
     aria-valuenow="225"
     role="progressbar"
     style="--ld-progress-valuenow: 225"></div>
{% endexample %}

## Steps

{% example %}
<ld-progress aria-valuemax="4" aria-valuenow="1" steps></ld-progress>

<!-- React component -->

<LdProgress aria-valuemax={4} aria-valuenow={1} steps />

<!-- CSS component -->

<div class="ld-progress ld-progress--steps"
     aria-valuemax="4"
     aria-valuenow="1"
     role="progressbar"
     style="--ld-progress-valuemax: 4; --ld-progress-valuenow: 1"></div>
{% endexample %}

## Pending

{% example %}
<ld-progress pending aria-valuetext="indeterminate"></ld-progress>
<ld-progress pending aria-valuenow="25"></ld-progress>

<!-- React component -->

<LdProgress pending aria-valuetext="indeterminate" />
<LdProgress pending aria-valuenow={25} />

<!-- CSS component -->

<div class="ld-progress ld-progress--pending"
     aria-valuetext="indeterminate"
     role="progressbar"
     style="--ld-progress-valuenow: 100"></div>
<div class="ld-progress ld-progress--pending"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-progress-valuenow: 25"></div>
{% endexample %}

## On brand color

Use this mode on backgrounds with brand color.

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-progress brand-color aria-valuenow="25"></ld-progress>

<!-- React component -->

<LdProgress brandColor aria-valuenow={25} />

<!-- CSS component -->

<div class="ld-progress ld-progress--brand-color"
     aria-valuenow="25"
     role="progressbar"
     style="--ld-progress-valuenow: 25"></div>
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
| `pending`       | `pending`        | Used to show indeterminate or pending progress state.                                                                                                                                      | `boolean`          | `undefined` |
| `ref`           | `ref`            | reference to component                                                                                                                                                                     | `any`              | `undefined` |
| `steps`         | `steps`          | Devides progress bar in multiple progress steps.                                                                                                                                           | `boolean`          | `undefined` |


## Dependencies

### Used by

 - [ld-upload-item](../ld-file-upload/ld-upload-item)

### Graph
```mermaid
graph TD;
  ld-upload-item --> ld-progress
  style ld-progress fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
