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

## Custom steps

{% example %}
<ld-slider step="5"></ld-slider>
{% endexample %}

## Strict mode

The strict mode prevents swapping the thumbs.

{% example %}
<ld-slider strict></ld-slider>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `max`    | `max`     |             | `number`  | `100`       |
| `min`    | `min`     |             | `number`  | `0`         |
| `step`   | `step`    |             | `number`  | `undefined` |
| `strict` | `strict`  |             | `boolean` | `false`     |
| `width`  | `width`   |             | `string`  | `'20rem'`   |


----------------------------------------------

 
