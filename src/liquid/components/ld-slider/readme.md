---
eleventyNavigation:
  key: Slider
  parent: Components
layout: layout.njk
title: Slider
permalink: components/ld-slider/
---

<!-- <link rel="stylesheet" href="css_components/ld-slider.css"> -->

# ld-slider

The `ld-slider` component can be used to select a single numeric value or a range of numeric values.

---

## Default

{% example %}
<ld-slider></ld-slider>
{% endexample %}

## Predefined value

{% example %}
<ld-slider value="40"></ld-slider>
{% endexample %}

## Size

{% example %}
<ld-slider size="sm"></ld-slider>
<ld-slider></ld-slider>
<ld-slider size="lg"></ld-slider>
{% endexample %}

## Disabled

{% example %}
<ld-slider disabled value="40"></ld-slider>
<ld-slider aria-disabled="true" value="40" hide-values></ld-slider>
{% endexample %}

## Custom steps

{% example %}
<ld-slider step="5"></ld-slider>
{% endexample %}

## Custom stops

Custom stops behave just like steps, but without the need for an even distance between them.

{% example %}
<ld-slider stops="20,35,45,60,85"></ld-slider>
{% endexample %}

<ld-notice mode="warning">
  Use the prop `snap-offset="0"` to just add the labels for the custom stops without forcing them to behave like steps.
</ld-notice>

## With step/stop indicators

{% example %}
<ld-slider indicators step="10"></ld-slider>
<ld-slider indicators stops="20,35,45,60,85"></ld-slider>
{% endexample %}

## With step/stop snapping

{% example %}
<ld-slider indicators snap-offset="2" step="10"></ld-slider>
<ld-slider snap-offset="2" stops="20,35,45,60,85"></ld-slider>
{% endexample %}

## Multiple values

You can add 2 or more comma-separated values to the slider. This results in additional thumbs being added.

{% example %}
<ld-slider value="40,90"></ld-slider>
<ld-slider value="30,60,90"></ld-slider>
<ld-slider value="20,50,70,90"></ld-slider>
{% endexample %}

## Strict mode

The strict mode prevents swapping the thumbs.

{% example %}
<ld-slider strict value="40,90"></ld-slider>
{% endexample %}

## Hide values

{% example %}
<ld-slider hide-values value="40,90"></ld-slider>
{% endexample %}

## Hide value labels

{% example %}
<ld-slider hide-value-labels value="40,90"></ld-slider>
{% endexample %}

## Hide stop labels

{% example %}
<ld-slider hide-stop-labels indicators stops="20,40,60,90" value="40,90"></ld-slider>
{% endexample %}

## Negative

The negative mode highlights deselected ranges as selected and vice versa.

{% example %}
<ld-slider negative value="50"></ld-slider>
<ld-slider negative value="40,90"></ld-slider>
{% endexample %}

## Integration

{% example %}
<div class="flex">
  <ld-input id="from" type="number" value="40"></ld-input>
  <ld-slider id="slider" value="40,90" width="20rem"></ld-slider>
  <ld-input id="to" type="number" value="90"></ld-input>
</div>

<style>
  .flex {
    align-items: end;
    display: flex;
    gap: var(--ld-sp-16);
  }

  #from, #to {
    margin-bottom: 0.875rem;
    width: 3rem;
  }

  #from::part(input), #to::part(input) {
    text-align: center;
  }
</style>

<script>
  const slider = document.getElementById('slider')
  const from = document.getElementById('from')
  const to = document.getElementById('to')
  const handleInput = (event) => {
    if (!from.value || !to.value) {
      return
    }
    slider.value = [from.value, to.value].join(',')
  }

  slider.addEventListener('ldchange', (event) => {
    const [newFrom, newTo] = event.detail

    from.value = newFrom
    to.value = newTo
  })
  from.addEventListener('input', handleInput)
  to.addEventListener('input', handleInput)
</script>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                  | Type           | Default            |
| ----------------- | ------------------- | ------------------------------------------------------------ | -------------- | ------------------ |
| `ariaDisabled`    | `aria-disabled`     | Alternative disabled state that keeps element focusable      | `string`       | `undefined`        |
| `disabled`        | `disabled`          | Disabled state of the slider                                 | `boolean`      | `false`            |
| `hideStopLabels`  | `hide-stop-labels`  | Prevents rendering of the stop labels below the slider       | `boolean`      | `false`            |
| `hideValueLabels` | `hide-value-labels` | Prevents rendering of the value labels below the slider      | `boolean`      | `false`            |
| `hideValues`      | `hide-values`       | Makes the current values only visible on interaction         | `boolean`      | `false`            |
| `indicators`      | `indicators`        | Specifies the legal number intervals                         | `boolean`      | `false`            |
| `labelFrom`       | `label-from`        | "From" value label (when exactly 2 values are given)         | `string`       | `'From'`           |
| `labelTo`         | `label-to`          | "To" value label (when exactly 2 values are given)           | `string`       | `'To'`             |
| `labelValue`      | `label-value`       | "Value" label (when exactly 2 values are given)              | `string`       | `'Value'`          |
| `max`             | `max`               | Specifies the maximum value allowed                          | `number`       | `100`              |
| `min`             | `min`               | Specifies the minimum value allowed                          | `number`       | `0`                |
| `negative`        | `negative`          | Swap which areas are being marked as selected and deselected | `boolean`      | `false`            |
| `size`            | `size`              | Size of the thumb(s).                                        | `"lg" \| "sm"` | `undefined`        |
| `snapOffset`      | `snap-offset`       | Offset inside which a thumb snaps to a stop point            | `number`       | `undefined`        |
| `step`            | `step`              | Specifies the legal number intervals                         | `number`       | `undefined`        |
| `stops`           | `stops`             | Adds custom stop points to the slider (instead of steps)     | `string`       | `undefined`        |
| `strict`          | `strict`            | Prevents swapping of thumbs                                  | `boolean`      | `false`            |
| `unit`            | `unit`              | Adds custom stop points to the slider (instead of steps)     | `string`       | `undefined`        |
| `value`           | `value`             | Specifies the default value                                  | `string`       | `String(this.min)` |
| `width`           | `width`             | Width of the slider                                          | `string`       | `'100%'`           |


## Events

| Event      | Description | Type                    |
| ---------- | ----------- | ----------------------- |
| `ldchange` |             | `CustomEvent<number[]>` |


----------------------------------------------

 
