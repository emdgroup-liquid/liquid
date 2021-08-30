---
eleventyNavigation:
  key: Label
  parent: Components
layout: layout.njk
title: Label
permalink: components/ld-label/
---

# ld-label

This component is meant to be used in conjunction with form input components, such as the [`ld-input`](components/ld-input/) component, and the [`ld-input-message`](components/ld-input-message/) component.

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
<ld-label position="left" size="m">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--left ld-label--m">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>
{% endexample %}

#### Right

{% example %}
<ld-label position="right" size="m">
  Email Address
  <ld-input placeholder="jane.doe@example.com" type="email"></ld-input>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right ld-label--m">
  Email Address
  <div class="ld-input">
    <input placeholder="jane.doe@example.com" type="email">
  </div>
</label>
{% endexample %}

### HTML Content

{% example %}
<ld-label position="right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <ld-checkbox></ld-checkbox>
</ld-label>

<!-- CSS component -->

<label class="ld-label ld-label--right">
  <span>I love to <code style="line-height: 0">code</code>.</span>
  <div class="ld-checkbox">
    <input type="checkbox">
    <svg
      class="ld-checkbox__check"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L5.40795 10L2 6.63964"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <div class="ld-checkbox__box"></div>
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
