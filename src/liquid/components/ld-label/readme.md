---
eleventyNavigation:
  key: Label
  parent: Components
layout: layout.njk
title: Label
permalink: components/ld-label/
---

# ld-label

This component is meant to be used in conjunction with form input components, such as the [`ld-input`](/components/ld-input/) component, and the [`ld-input-message`](/components/ld-input-message/) component.

## Example

{% example %}
<ld-label>Email Address</ld-label>

<!-- CSS component -->

<label class="ld-label">Email Address</label>
{% endexample %}

### Size

The default size is small. You can use a slightly bigger label (size medium) by applying the `size="m"` property.

{% example %}
<ld-label size="m">
  Email Address
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--m">
  Email Address
</label>
{% endexample %}

### Position

#### Top (default position)

{% example %}
<ld-label>
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<!-- CSS component -->

<label class="ld-label">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>
{% endexample %}

#### Left

{% example %}
<ld-label position="left">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--left">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>
{% endexample %}

#### Right

{% example %}
<ld-label position="right">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                              | Type                | Default     |
| ---------- | ---------- | -------------------------------------------------------- | ------------------- | ----------- |
| `key`      | `key`      | for tracking the node's identity when working with lists | `string \| number`  | `undefined` |
| `position` | `position` | Relative position to labeled element. Default is top.    | `"left" \| "right"` | `undefined` |
| `ref`      | `ref`      | reference to component                                   | `any`               | `undefined` |
| `size`     | `size`     | Size of the label. Default is small.                     | `"m"`               | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
